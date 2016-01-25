<?
class DBAdminWork extends DBWork
{
	public function __get($name)
	{
		return $this->$name;
	}
	
	//Default 회사 정보 조회
	public function selectCompList(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT *
					FROM company_info;";
		
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//모든 회원 정보 조회
	public function selectAllUserList(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$this->param['co_id'];
		
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT u.uid, auth_id, user_id, user_pwd, user_name, user_jumin, user_phone, reg_date, user_valid 
					, user_email, user_zip, user_addr, user_tel, user_fax, user_homepage
					FROM user_info u
					left outer join user_info_detail d
					on u.uid = d.u_id;";
	
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//회사 연결 고객 조회
	public function selectLinkUserList(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$this->param['co_id'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT u.uid, auth_id, user_id, user_pwd, user_name, user_jumin, user_phone, reg_date, user_valid
						, user_email, user_zip, user_addr, user_tel, user_fax, user_homepage
						FROM user_info u
						left outer join user_info_detail d
						on u.uid = d.u_id
						WHERE u.uid in (
							  SELECT uid
							  FROM company_member
							  WHERE co_id = $co_id
							)";
		
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	//회사 연결 고객 조회(for TAX)
	public function selectLinkUserListForTax(){
		$uid = (int)($this->param['uid']);
		$co_id = (int)$this->param['co_id'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT u.uid, auth_id, user_id, user_pwd, user_name, user_jumin, user_phone, reg_date, user_valid
						, user_email, user_zip, user_addr, user_tel, user_fax, user_homepage
						FROM user_info u
						left outer join user_info_detail d
						on u.uid = d.u_id
						WHERE u.uid in (
							SELECT tax_uid
							FROM company_info
							WHERE co_id = $co_id
						); ";
		
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//회사 고객 연결
	public function registUserAsComp(){
		$uid = $_SESSION[DBWork::sessionKey];
		$co_id = (int)$this->param['co_id'];
		$mem_level = (int)$this->param['mem_level'];
		
		$json = $this->param['uidList'];
		$jdata = stripslashes($json);
		$detail = json_decode($jdata, true);
		
		$this->startTransaction();
		
		if(count($detail) != 0){
			foreach ($detail as $idx => $obj) {
				$add_uid = (int)$obj;
				
				$sql = "INSERT INTO company_member(
						   uid
						  ,co_id
						  ,mem_level
						  ,reg_date
						  ,reg_uid
						) VALUES (
						   $add_uid
						  ,$co_id
						  ,1
						  ,now()
						  ,$uid
						)
						ON DUPLICATE KEY UPDATE
							uid=$add_uid, co_id=$co_id, mem_level=1, reg_date=now()
							, reg_uid=$uid
						;";
// 				var_dump($sql);
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
				
				if($row < 0){
					$this->rollback();
					throw new Exception('customer update fail row : ' + $row);
				}
			}
		}
		
		$this->commit();
		return 1;
	}
	
	//회사 고객 연결(영업회원)
	public function registUserAsCompForSales(){
		$uid = $_SESSION[DBWork::sessionKey];
		$co_id = (int)$this->param['co_id'];
		$mem_level = (int)$this->param['mem_level'];
	
		$uidList = $this->param['uidList'];
	
		$sql = "UPDATE company_info
					SET tax_uid = $uidList
					WHERE co_id = $co_id; ";
		
		$this->updateSql($sql);
		$row = $this->getAffectedRows();

		if($row < 0){
			$this->rollback();
			throw new Exception('customer update fail row : ' + $row);
		}
	
		$this->commit();
		return 1;
	}
	
	
	//회사 고객 연결 삭제
	public function deleteUserAsComp(){
		$uid = $_SESSION[DBWork::sessionKey];
		$co_id = (int)$this->param['co_id'];
		$mem_level = (int)$this->param['mem_level'];
		
		$json = $this->param['uidList'];
		$jdata = stripslashes($json);
		$detail = json_decode($jdata, true);
		
		$this->startTransaction();
		$add_uid = '';
		if(count($detail) != 0){
			foreach ($detail as $idx => $obj) {
				$add_uid = $add_uid.($obj).' ,';
			}
		}
		$add_uid = substr($add_uid, 0, strlen($add_uid)-1);
		
		$sql = "DELETE FROM company_member WHERE uid in ($add_uid)";
// 		var_dump($sql);
		
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
		
		if($row < 0){
			$this->rollback();
			throw new Exception('customer update fail row : ' + $row);
		}
		
		$this->commit();
		return 1;
	}
	//회사 수정
	public function updateComp(){
		//필수
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		// 		$co_id = $this->param['co_id'];
		$co_id = $this->param['co_id'];
		$co_ceo_nm = $this->param['co_ceo_nm'];
		$co_saup_no = $this->param['co_saup_no'];
		$co_co_no = $this->param['co_co_no'];
		
		$zipcode = $this->param['co_zip'];
		$addr = $this->param['co_addr'];
		$co_up = $this->param['co_up'];
		$co_jong = $this->param['co_jong'];
		$co_tel = $this->param['co_tel'];
		
		$co_handphone = $this->param['co_handphone'];
		$co_fax = $this->param['co_fax'];
		
		//신규
		$co_up_code = $this->param['co_up_code'];
		$co_email = $this->param['co_email'];
		$co_tel_juso = $this->param['co_tel_juso'];
		
		$co_tax_office = $this->param['co_tax_office'];
		$co_tax_office_code = $this->param['co_tax_office_code'];
		$co_tax_office_acc = $this->param['co_tax_office_acc'];
		
		$co_bank = $this->param['co_bank'];
		$co_bank_branch = $this->param['co_bank_branch'];
		$co_bank_acc = $this->param['co_bank_acc'];
		
		$co_nm = $this->param['co_nm'];
		
		$hometax_id = $this->param['hometax_id'];
		$hometax_pwd = $this->param['hometax_pwd'];
		
		$co_joint = $this->param['co_joint'];
		
		$tax_type = $this->param['tax_type'];
		$co_tax_type = $this->param['co_tax_type'];
		//추가정보
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		
		$this->startTransaction();
		
		
		try {
			$sql = "UPDATE `company_info` SET
			`co_nm` = '$co_nm',
			`co_ceo_nm` = '$co_ceo_nm',
			`co_saup_no` = '$co_saup_no',
			`co_co_no` = '$co_co_no',
			`co_up` = '$co_up',
			`co_up_code` = '$co_up_code',
			`co_jong` = '$co_jong',
			`co_zip` = '$zipcode',
			`co_addr` = '$addr',
			`co_tel` = '$co_tel',
			`co_tel_juso` = '$co_tel_juso',
			`co_handphone` = '$co_handphone',
			`co_email` = '$co_email',
			`co_fax` = '$co_fax',
			`co_tax_office` = '$co_tax_office',
			`co_tax_office_code` = '$co_tax_office_code',
			`co_tax_office_acc` = '$co_tax_office_acc',
			`co_bank` = '$co_bank',
			`co_bank_branch` = '$co_bank_branch',
			`co_bank_acc` = '$co_bank_acc',
			`reg_date` = now(),
			`co_joint` = '$co_joint',
			`tax_type` = '$tax_type',
			`co_tax_type` = '$co_tax_type',
			`hometax_id` = '$hometax_id',
			`hometax_pwd` = '$hometax_pwd'
			WHERE `co_id`=$co_id;";
			$this->updateSql($sql);
				
			$row = $this->getAffectedRows();
			if($row == 0){
				$this->rollback();
				throw new Exception('company_info update fail row : ' + $row);
			}
			else
			{
				$co_lease = $this->param['co_lease'];
				$co_area = $this->param['co_area'];
				$co_building_upstairs = (int)$this->param['co_building_upstairs'];
				$co_building_downstairs = (int)$this->param['co_building_downstairs'];
				$co_building_t_area = $this->param['co_building_t_area'];
				$co_building_area = $this->param['co_building_area'];
				$co_room_cnt =(int) $this->param['co_room_cnt'];
				$co_table_cnt = (int)$this->param['co_table_cnt'];
				$co_is_parking_area = $this->param['co_is_parking_area'];
				$co_vehicle_car = (int)$this->param['co_vehicle_car'];
				$co_vehicle_truck = (int)$this->param['co_vehicle_truck'];
				$co_vehicle_business = (int)$this->param['co_vehicle_business'];
				$co_employee_cnt = (int)$this->param['co_employee_cnt'];
				$co_chair_cnt = (int)$this->param['co_chair_cnt'];
				$co_etc_bigo = $this->param['co_etc_bigo'];
				$co_expense_deposit = (int)$this->param['co_expense_deposit'];
				$co_expense_m_rent = (int)$this->param['co_expense_m_rent'];
				$co_expense_elect = (int)$this->param['co_expense_elect'];
				$co_expense_water = (int)$this->param['co_expense_water'];
				$co_expense_man = (int)$this->param['co_expense_man'];
				$co_expense_etc = (int)$this->param['co_expense_etc'];
					
				//선택사항 정보 저장
				$sql = "INSERT INTO `company_info_detail`(
				co_id				  ,co_lease				  ,co_area				  ,co_building_upstairs
				,co_building_downstairs				  ,co_building_t_area				  ,co_building_area
				,co_room_cnt				  ,co_table_cnt				  ,co_is_parking_area
				,co_vehicle_car				  ,co_vehicle_truck				  ,co_vehicle_business
				,co_employee_cnt				  ,co_chair_cnt				  ,co_etc_bigo
				,co_expense_deposit				  ,co_expense_m_rent				  ,co_expense_elect
				,co_expense_water				  ,co_expense_man				  ,co_expense_etc
				,reg_date				  ,reg_uid
				)
				VALUES(
				$co_id,'$co_lease','$co_area',$co_building_upstairs
				,$co_building_downstairs,'$co_building_t_area','$co_building_area'
				,$co_room_cnt,$co_table_cnt,'$co_is_parking_area'
				,$co_vehicle_car,$co_vehicle_truck,$co_vehicle_business
				,$co_employee_cnt,$co_chair_cnt,'$co_etc_bigo'
				,$co_expense_deposit,$co_expense_m_rent,$co_expense_elect
				,$co_expense_water,$co_expense_man,$co_expense_etc
				,now(),$uid
				) ON DUPLICATE KEY UPDATE
				`co_id` = $co_id	 ,`co_lease` = '$co_lease'	  ,`co_area` = '$co_area'	  ,co_building_upstairs=$co_building_upstairs
				,`co_building_downstairs` = $co_building_downstairs	  ,`co_building_t_area`='$co_building_t_area'		  ,`co_building_area` = '$co_building_area'
				,`co_room_cnt` = $co_room_cnt		  ,`co_table_cnt` = $co_table_cnt		  ,`co_is_parking_area` = '$co_is_parking_area'
				,`co_vehicle_car` = $co_vehicle_car		  ,`co_vehicle_truck` = $co_vehicle_truck		  ,`co_vehicle_business` = $co_vehicle_business
				,`co_employee_cnt` = $co_employee_cnt		  ,`co_chair_cnt` = $co_chair_cnt		  ,`co_etc_bigo` = '$co_etc_bigo'
				,`co_expense_deposit` = $co_expense_deposit		  ,`co_expense_m_rent` = $co_expense_m_rent		  ,`co_expense_elect` = $co_expense_elect
				,`co_expense_water` = $co_expense_water		  ,`co_expense_man` = $co_expense_man		  ,`co_expense_etc` = $co_expense_etc
				,`reg_date` = now()		  ,`reg_uid` = $uid";
					
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
					
				if($row == 0){
					$this->rollback();
					throw new Exception('company_info_detail update fail row : ' + $row);
				}
			}
		} catch (Exception $e) {
			$this->rollback();
			throw new Exception($e);
		}
		
		$this->commit();
		
		return $row;
	}
	
	//회원 - 회원 조회
	public function selectLinkUserListAsMember(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
// 		$co_id = (int)$this->param['co_id'];
		$select_uid = (int)$this->param['uid'];
		$member_level =(int)$this->param['member_level'];
		
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT u.uid, auth_id, user_id, user_pwd, user_name, user_jumin, user_phone, reg_date, user_valid
					, user_email, user_zip, user_addr, user_tel, user_fax, user_homepage
					FROM user_info u
					left outer join user_info_detail d
					on u.uid = d.u_id	 WHERE auth_id in (100,200,300) ";
		
		if($member_level == 100){
			$sql = $sql." AND u.uid in (SELECT cus_uid
								FROM sales_member
								WHERE sales_uid = $select_uid);";
		}
		else if($member_level == 200){
			$sql = $sql." AND u.uid in (SELECT sales_uid
								FROM sales_member
								WHERE cus_uid = $select_uid);";
		}
		
	
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	//회원 - 회원 연결
	public function registSalesMember(){
		$uid = $_SESSION[DBWork::sessionKey];
		$mainUser = (int)$this->param['mainUser'];
		$auth_id = (int)$this->param['auth_id'];
		
		$json = $this->param['uidList'];
		$jdata = stripslashes($json);
		$detail = json_decode($jdata, true);
	
		$this->startTransaction();
		
		$sql = '';
		
		if(count($detail) != 0){
			foreach ($detail as $idx => $obj) {
				$add_uid = (int)$obj;
				
				if($auth_id == 100){
					$sql = "INSERT INTO sales_member(
					sales_uid
					,cus_uid
					,reg_date
					) VALUES (
					$add_uid
					,$mainUser
					,now()
					)
					ON DUPLICATE KEY UPDATE
					sales_uid = $add_uid, cus_uid=$mainUser, reg_date=now();";
				
				}
				else if($auth_id == 200){
					$sql = "INSERT INTO sales_member(
					sales_uid
					,cus_uid
					,reg_date
					) VALUES (
					$mainUser
					,$add_uid
					,now()
					)
					ON DUPLICATE KEY UPDATE
					sales_uid = $mainUser, cus_uid=$add_uid, reg_date=now();";
				}
	
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
	
				if($row < 0){
					$this->rollback();
					throw new Exception('customer update fail row : ' + $row);
				}
			}
		}
	
		$this->commit();
		return 1;
	}
	//회원 -회원 연결 삭제
	public function deleteSalesMember(){
		$uid = $_SESSION[DBWork::sessionKey];
		$mainUser = (int)$this->param['mainUser'];
		$auth_id = (int)$this->param['auth_id'];
		
		$json = $this->param['uidList'];
		$jdata = stripslashes($json);
		$detail = json_decode($jdata, true);
	
		$this->startTransaction();
		
		$sql = '';
		
		if(count($detail) != 0){
			foreach ($detail as $idx => $obj) {
				$add_uid = (int)$obj;
				
				if($auth_id == 100){
					$sql = "DELETE FROM sales_member
								WHERE sales_uid = $add_uid AND cus_uid=$mainUser;";
				
				}
				else if($auth_id == 200){
					$sql = "DELETE FROM sales_member
								WHERE sales_uid = $mainUser AND cus_uid=$add_uid;";
				}
	
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
	
				if($row < 0){
					$this->rollback();
					throw new Exception('customer update fail row : ' + $row);
				}
			}
		}
	
		$this->commit();
		return 1;
	}
	
	//회원 정보 수정
	public function updateUserInfo(){
		$uid = (int)$_SESSION[DBWork::sessionKey];
		$uuid= (int)$this->param['uid'];
		$auth_id = $this->param['auth_id'];
		$user_valid= $this->param['user_valid'];
		$user_phone= $this->param['user_phone'];
		$user_email= $this->param['user_email'];
		$user_addr= $this->param['user_addr'];
		$user_fax= $this->param['user_fax'];
		$user_tel= $this->param['user_tel'];
		$user_zip= $this->param['user_zip'];
		
		$this->startTransaction();
		
		try{
			$sql = "UPDATE user_info
						SET user_phone='$user_phone' , user_valid='$user_valid'
						, reg_date = now(), auth_id=$auth_id
						WHERE uid = $uuid;";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				$this->rollback();
				throw new Exception('user_info update fail row : ' + $row);
			}
			else {
				$sql = "INSERT INTO user_info_detail(u_id , user_email, user_addr, user_fax, user_tel, user_zip)
							VALUES($uuid, '$user_email', '$user_addr', '$user_fax', '$user_tel', '$user_zip')
							ON DUPLICATE KEY UPDATE
							u_id=$uuid, user_email='$user_email', user_addr='$user_addr'
							, user_fax = '$user_fax',  user_tel='$user_tel', user_zip='$user_zip';";
					
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
					
				if($row < 0){
					$this->rollback();
					throw new Exception('user_info_detail update fail row : ' + $row);
				}
			}
		}
		catch(Exception $e){
			$this->rollback();
			throw new Exception($e);
		}
		$this->commit();
		return 1;
	}
	
}
?>