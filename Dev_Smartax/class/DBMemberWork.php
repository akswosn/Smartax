<?php

class DBMemberWork extends DBWork
{
	public function __get($name)
	{
		return $this->$name;
	}
	
	/**
	 * 로그인 처리 요청
	 * @return Object
	 * @throws Exception
	 */
	public function requestLogin()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$loginId = $this->param['login_id'];
		$loginPw = $this->param['login_pw'];

		//길이 체크(회원 가입시 체크하도록 수정)
// 		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)'); 
// 		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		
		//영문,숫자만 허용
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
// 		$sql = "select a.uid, a.auth_id , b.co_id
// 					  , a.user_name, c.co_nm
// 					from user_info a
// 					left outer join company_member b
// 					on a.uid = b.uid
// 					left outer join company_info c
// 					on c.co_id = b.co_id
// 					where user_id = '$loginId' and user_pwd = sha1('$loginPw') and user_valid = 'v';";
		
		$sql = "select uid, auth_id, user_name 
					from user_info 
					where user_id = '$loginId' and user_pwd = sha1('$loginPw') and user_valid = 'v';";
		
		$this->querySql($sql);
		
		if($this->getNumRows()==0)throw new Exception('company_member select resultSet row count [' + row+' ]');
		else
		{
			//uid 값이 들어있다. $reqInfo 값이 1 정보까지 포함. 0 이면 uid 만
			$row = $this->fetchArrayRow();
			$_SESSION[DBWork::sessionKey] = $row[0];
			$_SESSION[DBWork::userTypeKey] = $row[1];		//회원타입 100 = 가맹회원, 200 = 영업회원, 300 = 세무회원
			
			if($row[1]!=100 || $row[1]!=200 || $row[1]!=300) $_SESSION[DBWork::adminKey]= $row[1];
			
			//회사정보 조회
			$sql = "SELECT co_id, co_nm, co_ceo_nm, co_saup_no, co_co_no
						, co_up , co_up_code , co_jong , co_zip , co_addr
						, co_tel ,co_tel_juso ,co_handphone ,co_email ,co_tax_office
						, co_tax_office_code ,co_tax_office_acc ,co_bank ,co_bank_branch
						, co_bank_acc ,co_fax ,co_config ,reg_date ,reg_uid
						, hometax_id ,hometax_pwd ,tax_type, co_tax_type
						, co_joint ,sale_code ,upload_saup_flag ,upload_saup_file ,upload_deapyo_flag
						, upload_deapyo_file ,bigo ,tax_delegate_flag ,tax_account_flag ,tax_uid
					FROM company_info
					WHERE co_id in (
						SELECT co_id
						FROM company_member
						WHERE uid = $row[0]
					)";
			$this->querySql($sql);
			
			$res=array();
				
			while($item=$this->fetchMapRow())
			{
				array_push($res,$item);
			}
			
			$_SESSION[DBWork::companyKey] =  $res[0]['co_id'];		//1번회사 정보 co_id 저장
			$_SESSION[DBWork::companyArray] =  $res;		//보유 회사 정보 저장
			//세무, 가맹, 영업회원외 admin키 부여
			
			//end
			
			//INSERT INTO play_info (`uid`,`last_login_time`, `modify_date`, `config`) 
			//VALUES (25,now(), now(), '') ON DUPLICATE KEY UPDATE `uid` = 25,`last_login_time` = now(), `modify_date` = now();
		
			$logSql = "INSERT INTO user_log (`uid`,`last_login_time`) VALUES ($row[0],now())
						ON DUPLICATE KEY UPDATE 
						`uid` = $row[0],`last_login_time` = now();";
			$this->updateSql($logSql);
			
			
			//result
			$result = array(
					"user_name"=> $row[2],
					"co_nm"=>$res[0]['co_nm'],
					"auth_id"=>$row[1]
			);
			
			return $result;
		}
	}
	
	
	
	
	/**
	 * 회원가입 관련 함수 
	 */
	
	//통합 회사 정보 저장 함수
	public function insertUserJoin($obj1, $obj2, $obj3){
		$this->startTransaction();
		try{
			//1. user 정보 저장
			$user_id = $obj2['user_id'];
			$user_pwd = $obj2['user_pwd'];
			$user_license_gubun = $obj2['user_license_gubun'];
			$user_name = $obj2['user_name'];
			$user_jumin = $obj2['user_jumin1'].'-'.$obj2['user_jumin2'];
			$user_phone = $obj2['user_phone1'].'-'.$obj2['user_phone2'].'-'.$obj2['user_phone3'];
			$user_license_gubun = $obj2['user_license_gubun'];
			
			if(!Util::lengthCheck($user_id, 6, 12)) throw new Exception('Invalid userId(length)');
			if(!Util::lengthCheck($user_pwd, 8, 12)) throw new Exception('Invalid password(length)');
			
			//회원 등록
			$sql = "INSERT INTO user_info(
							auth_id
							,user_id
							,user_pwd
							,user_license_gubun
							,user_name
							,user_jumin
							,user_phone
							,reg_date
							,user_valid
						) VALUES (
							100
							, '$user_id'
							, sha1('$user_pwd')
							, '$user_license_gubun'
							, '$user_name'
							, '$user_jumin'
							, '$user_phone'
							, now()
							, 'v'
						)";
			$this->updateSql($sql);
			$row = $this->insert_id();
		
// 			등록된 header_id 저장
			$uid = $row;
			if($uid < 0){
				throw new Exception('user_info insert fail uid : ' + $uid);
			}
				
			//회원 상세정보 저장
			$user_email = $obj2['user_email1'].'@'.$obj2['user_email2'];
			$user_tel = $obj2['user_tel1'].'-'.$obj2['user_tel2'].'-'.$obj2['user_tel3'];
			$user_aree_email = $obj2['user_aree_email'];
			$user_aree_sms = $obj2['user_aree_sms'];
				
			$sql ="INSERT INTO user_info_detail(
							u_id
							,user_email
							,user_tel
							,user_agree_sms
							,user_agree_email
						) VALUES (
							$uid
							,'$user_email'
							,'$user_tel'
							,'$user_aree_sms'
							,'$user_aree_email'
						)";
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
		
			if($row < 0){
				throw new Exception('user_info_detail insert fail row : ' + $row);
			}
			//2. 회사정보 저장
			$co_nm = $obj3['co_nm'];
			$co_ceo_nm = $obj3['co_ceo_nm'];
			$co_saup_no = $obj3['co_saup_no'];
			$co_co_no = $obj3['co_co_no'];
			$co_up = $obj3['co_up'];
			$co_up_code = $obj3['co_up_code'];
			$co_addr = $obj3['co_addr'];
			$co_tel = $obj3['co_tel'];
			$co_tel_juso = $obj3['co_tel_juso'];
			$co_handphone = $obj3['co_handphone'];
			$co_email = $obj3['co_email'];
			$co_tax_office = $obj3['co_tax_office'];
			$co_bank = $obj3['co_bank'];
			$co_bank_acc = $obj3['co_bank_acc'];
			$co_fax = $obj3['co_fax'];
			$hometax_id = $obj3['hometax_id'];
			$hometax_pwd = $obj3['hometax_pwd'];
			$tax_type = $obj3['tax_type'];
			$co_tax_type = $obj3['co_tax_type'];
			$co_joint = $obj3['co_joint'];
			$co_jong = $obj3['co_jong'];
			$co_tax_office_acc = $obj3['co_tax_office_acc'];
			
			$sale_code = $obj1["sale_code"];
			$upload_saup_flag = $obj1["upload_saup_flag"];
			$upload_saup_file = $obj1['upload_saup_file'];
			$upload_deapyo_flag = $obj1['upload_deapyo_flag'];
			$upload_deapyo_file = $obj1['upload_deapyo_file'];
			$bigo =  $obj1['bigo'];
			$co_zip =  $obj3['co_zip'];
			
			$sql = "INSERT INTO company_info(
				co_nm ,co_ceo_nm ,co_saup_no
				,co_co_no ,co_up ,co_up_code
				,co_jong ,co_zip ,co_addr
				,co_tel ,co_tel_juso ,co_handphone
				,co_email ,co_tax_office ,co_tax_office_code
				,co_tax_office_acc ,co_bank ,co_bank_branch
				,co_bank_acc ,co_fax ,co_config
				,reg_date ,reg_uid ,hometax_id
				,hometax_pwd ,tax_type ,co_tax_type
				,co_joint ,sale_code ,upload_saup_flag
				,upload_saup_file ,upload_deapyo_flag ,upload_deapyo_file
				,bigo ,tax_delegate_flag ,tax_account_flag
				,tax_uid
			) VALUES (
				'$co_nm' ,'$co_ceo_nm' , '$co_saup_no'
				, '$co_co_no' , '$co_up', '$co_up_code'
				, '$co_jong' ,'$co_zip' , '$co_addr'
				, '$co_tel' , '$co_tel_juso' , '$co_handphone'
				, '$co_email' ,'$co_tax_office' ,''
				, '$co_tax_office_acc' ,'$co_bank' ,''
				, '$co_bank_acc' ,'$co_fax',''
				, now() , $uid , '$hometax_id'
				, '$hometax_pwd', '$tax_type' , '$co_tax_type'
				, '$co_joint', '$sale_code' ,'$upload_saup_flag'
				, '$upload_saup_file', '$upload_deapyo_flag' , '$upload_deapyo_file'
				, '$bigo', 'n'  ,'n'
				, 0
			)";
			$this->updateSql($sql);
			$row = $this->insert_id();
			$co_id = $row;
			if($row < 0){
				$this->rollback();
				throw new Exception('company_info insert fail row : ' + $row);
			}
			
				
			//사용자 <-> 회사 관계 등록
			$sql = "INSERT INTO company_member(
			uid
			,co_id
			,mem_level
			,reg_date
			,reg_uid
			) VALUES (
			$uid
			, $co_id
			, 1
			, now()
			, $uid
			)";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			 
			if($row < 0){
				$this->rollback();
				throw new Exception('company_member insert fail row : ' + $row);
			}
			//사용자 <-> 영업 회원 관계 등록
			//3. 관계 정보 저장
			$sale_uid = $obj1["sale_uid"];
			
			$sql = "INSERT INTO sales_member(
			sales_uid
			,cus_uid
			,reg_date
			) VALUES (
			$sale_uid
			, $uid
			, now()
			)";
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				$this->rollback();
				throw new Exception('sales_member insert fail row : ' + $row);
			}
			
			
			//sale_customer update
			$sc_id = $obj1["_id"];
			
			$sql = "UPDATE sale_customer
			SET reg_flag = 'y'
			WHERE _id = $sc_id";
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
				
			if($row < 0){
				$this->rollback();
				throw new Exception('sale_customer insert fail row : ' + $row);
			}
			
			//4. 회사 상세정보 저장
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
				throw new Exception('company_info_detail insert fail row : ' + $row);
			}
		}
		catch (Exception $e){
			$this->rollback();
			throw new Exception($e);
		}
		$this->commit();
		return 1;
	}
	
	
	//회원 정보 조회 key sale_cod
	public function selectUserAsSaleCode(){
// 		$uid = (int)($_SESSION[DBWork::sessionKey]);
// 		$co_id = (int)$_SESSION[DBWork::companyKey];

		$sale_code = $this->param['sale_code'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT _id, uid, sale_uid, sale_code, co_nm, co_saup_no
						, co_tel, upload_saup_flag, upload_saup_file, upload_deapyo_flag
						, upload_deapyo_file, bigo, complain_comment, complain_flag, reg_date, reg_uid, reg_flag 
					FROM sale_customer
					WHERE sale_code = '$sale_code' AND reg_flag = 'n';";
		
		$this->querySql($sql);
		$res=array();
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//아이디 중복체크`
	public function selectUserAsUserId(){
		$user_id = $this->param['user_id'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT count(*) as user_count
		FROM user_info
		WHERE user_id = '$user_id';";
		
		$this->querySql($sql);
		$row = $this->fetchObjectRow();
		return $row->user_count;
	}
	
	//회원 정보 저장
	public function insertUserInfo(){
		
		$user_id = $this->param['user_id'];
		$user_pwd = $this->param['user_pwd'];
		$user_license_gubun = $this->param['user_license_gubun'];
		$user_name = $this->param['user_name'];
		$user_jumin = $this->param['user_jumin1'].'-'.$this->param['user_jumin2'];
		$user_phone = $this->param['user_phone1'].'-'.$this->param['user_phone2'].'-'.$this->param['user_phone3'];
		$user_license_gubun = $this->param['user_license_gubun'];
		
		if(!Util::lengthCheck($user_id, 6, 12)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($user_pwd, 8, 12)) throw new Exception('Invalid password(length)');
		
		$this->startTransaction();
		
		try{
			//회원 등록
			$sql = "INSERT INTO user_info(
							auth_id
							,user_id
							,user_pwd
							,user_license_gubun
							,user_name
							,user_jumin
							,user_phone
							,reg_date
							,user_valid
						) VALUES (
							100
							, '$user_id'
							, sha1('$user_pwd')
							, '$user_license_gubun'
							, '$user_name'
							, '$user_jumin'
							, '$user_phone'
							, now()
							, 'v'
						)";
			$this->updateSql($sql);
			$row = $this->insert_id();
				
			//등록된 header_id 저장
			$uid = $row;
			
			if($uid < 0){
				$this->rollback();
				throw new Exception('user_info insert fail uid : ' + $uid);
			}
			
			//회원 상세정보 저장
			$user_email = $this->param['user_email1'].'@'.$this->param['user_email2'];
			$user_tel = $this->param['user_tel1'].'-'.$this->param['user_tel2'].'-'.$this->param['user_tel3'];
			$user_aree_email = $this->param['user_aree_email'];
			$user_aree_sms = $this->param['user_aree_sms'];
			
			$sql ="INSERT INTO user_info_detail(
					   u_id
					  ,user_email
					  ,user_tel
					  ,user_agree_sms
					  ,user_agree_email
					) VALUES (
					   $uid
					  ,'$user_email' 
					  ,'$user_tel'
					  ,'$user_aree_sms'
					  ,'$user_aree_email'
					)";
			
		    $this->updateSql($sql);
		    $row = $this->getAffectedRows();
		    
		    if($row < 0){
		    	$this->rollback();
		    	throw new Exception('user_info_detail insert fail row : ' + $row);
		    }
			
		}
		catch (Exception $e){
			$this->rollback();
			throw new Exception($e);
		}
		$this->commit();
		 return $uid;
	}
	
	//회사 정보 저장(+관계)
	public function insertCompInfo($userInfo, $uid){
		$co_nm = $this->param['co_nm'];
		$co_ceo_nm = $this->param['co_ceo_nm'];
		$co_saup_no = $this->param['co_saup_no'];
		$co_co_no = $this->param['co_co_no'];
		$co_up = $this->param['co_up'];
		$co_up_code = $this->param['co_up_code'];
		$co_addr = $this->param['co_addr'];
		$co_tel = $this->param['co_tel'];
		$co_tel_juso = $this->param['co_tel_juso'];
		$co_handphone = $this->param['co_handphone'];
		$co_email = $this->param['co_email'];
		$co_tax_office = $this->param['co_tax_office'];
		$co_bank = $this->param['co_bank'];
		$co_bank_acc = $this->param['co_bank_acc'];
		$co_fax = $this->param['co_fax'];
		$hometax_id = $this->param['hometax_id'];
		$hometax_pwd = $this->param['hometax_pwd'];
		$tax_type = $this->param['tax_type'];
		$co_tax_type = $this->param['co_tax_type'];
		$co_joint = $this->param['co_joint'];
		$co_jong = $this->param['co_jong'];
		$co_tax_office_acc = $this->param['co_tax_office_acc'];
		
		$sale_code = $userInfo["sale_code"];
		$upload_saup_flag = $userInfo["upload_saup_flag"];
		$upload_saup_file = $userInfo['upload_saup_file'];
		$upload_deapyo_flag = $userInfo['upload_deapyo_flag'];
		$upload_deapyo_file = $userInfo['upload_deapyo_file'];
		$bigo =  $userInfo['bigo'];
		
		$this->startTransaction();
		try{
			//회사 정보 저장
			$sql = "INSERT INTO company_info(
						  co_nm ,co_ceo_nm ,co_saup_no
						  ,co_co_no ,co_up ,co_up_code
						  ,co_jong ,co_zip ,co_addr
						  ,co_tel ,co_tel_juso ,co_handphone
						  ,co_email ,co_tax_office ,co_tax_office_code
						  ,co_tax_office_acc ,co_bank ,co_bank_branch
						  ,co_bank_acc ,co_fax ,co_config
						  ,reg_date ,reg_uid ,hometax_id
						  ,hometax_pwd ,tax_type ,co_tax_type
						  ,co_joint ,sale_code ,upload_saup_flag
						  ,upload_saup_file ,upload_deapyo_flag ,upload_deapyo_file
						  ,bigo ,tax_delegate_flag ,tax_account_flag
						  ,tax_uid
						) VALUES (
						  '$co_nm' ,'$co_ceo_nm' , '$co_saup_no'
						  , '$co_co_no' , '$co_up', '$co_up_code' 
						  , '$co_jong' ,'' , '$co_addr'
						  , '$co_tel' , '$co_tel_juso' , '$co_handphone'
						  , '$co_email' ,'$co_tax_office' ,'' 
						  , '$co_tax_office_acc' ,'$co_bank' ,''
						  , '$co_bank_acc' ,'$co_fax',''
						  , now() , $uid , '$hometax_id' 
						  , '$hometax_pwd', '$tax_type' , '$co_tax_type'
						  , '$co_joint', '$sale_code' ,'$upload_saup_flag' 
						  , '$upload_saup_file', '$upload_deapyo_flag' , '$upload_deapyo_file' 
						  , '$bigo', 'n'  ,'n'   
						  , 0  
						)";
			$this->updateSql($sql);
			$row = $this->insert_id();
			$co_id = $row;
			if($row < 0){
				$this->rollback();
				throw new Exception('company_info insert fail row : ' + $row);
			}

			
			//사용자 <-> 회사 관계 등록
			$sql = "INSERT INTO company_member(
					   uid
					  ,co_id
					  ,mem_level
					  ,reg_date
					  ,reg_uid
					) VALUES (
					   $uid
					  , $co_id
					  , 1
					  , now()
					  , $uid
					)";
		    $this->updateSql($sql);
		    $row = $this->getAffectedRows();
		   
		    if($row < 0){
			   	$this->rollback();
			   	throw new Exception('company_member insert fail row : ' + $row);
		    }
			//사용자 <-> 영업 회원 관계 등록
		    $sale_uid = $userInfo["sale_uid"];
		    
		    $sql = "INSERT INTO sales_member(
					   sales_uid
					  ,cus_uid
					  ,reg_date
					) VALUES (
					   $sale_uid
					  , $uid
					  , now()
					)";
		    $this->updateSql($sql);
		    $row = $this->getAffectedRows();
		    
		    if($row < 0){
			   	$this->rollback();
			   	throw new Exception('sales_member insert fail row : ' + $row);
		    }
		    
		    
			//sale_customer update
			$sc_id = $userInfo["_id"];
		    
			$sql = "UPDATE sale_customer
						SET reg_flag = 'y'
						WHERE _id = $sc_id";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				$this->rollback();
				throw new Exception('sale_customer insert fail row : ' + $row);
			}
		    
		}
		catch (Exception $e){
			$this->rollback();
			throw new Exception($e);
		}
		$this->commit();
		 return $co_id;
	}
	
	//회사 상세정보 저장
	public function insertCompInfoDetail($co_id, $user_id){
		
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
		,now(),$user_id
		) ON DUPLICATE KEY UPDATE
		`co_id` = $co_id	 ,`co_lease` = '$co_lease'	  ,`co_area` = '$co_area'	  ,co_building_upstairs=$co_building_upstairs
		,`co_building_downstairs` = $co_building_downstairs	  ,`co_building_t_area`='$co_building_t_area'		  ,`co_building_area` = '$co_building_area'
		,`co_room_cnt` = $co_room_cnt		  ,`co_table_cnt` = $co_table_cnt		  ,`co_is_parking_area` = '$co_is_parking_area'
		,`co_vehicle_car` = $co_vehicle_car		  ,`co_vehicle_truck` = $co_vehicle_truck		  ,`co_vehicle_business` = $co_vehicle_business
		,`co_employee_cnt` = $co_employee_cnt		  ,`co_chair_cnt` = $co_chair_cnt		  ,`co_etc_bigo` = '$co_etc_bigo'
		,`co_expense_deposit` = $co_expense_deposit		  ,`co_expense_m_rent` = $co_expense_m_rent		  ,`co_expense_elect` = $co_expense_elect
		,`co_expense_water` = $co_expense_water		  ,`co_expense_man` = $co_expense_man		  ,`co_expense_etc` = $co_expense_etc
		,`reg_date` = now()		  ,`reg_uid` = $user_id";
			
		$this->updateSql($sql);
			
		$row = $this->getAffectedRows();
			
		if($row == 0){
				throw new Exception('company_info_detail insert fail row : ' + $row);
		}
		
		return 1;
	}
	
	/**
	 * 회원가입 관련 함수 끝
	 */
	/* ------------------------------ 작업중 ------------------------------ */
	
	/**
	 * 회원가입 처리 요청
	 * @return uid
	 * @throws Exception
	 */
	 public function requestRegister()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$loginId = $this->param['login_id'];
		$nickname = $this->param['nickname'];
		$loginPw = $this->param['login_pw'];
		$loginPwc = $this->param['login_pwc'];
		
		$jumin1 = $this->param['jumin1'];
		$jumin2 = $this->param['jumin2'];
		
		$jumin = $jumin1.'-'.$jumin2;
		$username = $this->param['username'];
		$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		
		$zipcode = $this->param['zipcode1'].'-'.$this->param['zipcode2'];
		$addr = $this->param['addr1'].' '.$this->param['addr2'];
		
		$tel = $this->param['tel1'].'-'.$this->param['tel2'].'-'.$this->param['tel3'];
		$phone = $this->param['phone1'].'-'.$this->param['phone2'].'-'.$this->param['phone3'];
		$fax = $this->param['fax1'].'-'.$this->param['fax2'].'-'.$this->param['fax3'];
		
		$homepage = $this->param['homepage'];
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($nickname, 4, 30)) throw new Exception('Invalid userNick(length)');
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		if(!Util::lengthCheck($email, 6, 40)) throw new Exception('Invalid email(length)');

		//유저 아이디 (영문,숫자만 허용)
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		//유저 성명 (한글,영문,숫자 허용)
		if(!Util::isKorAlNum($nickname)) throw new Exception('Invalid userNick(special character)');
		//이메일 (이메일 형식 체크)
		if(!Util::isValidEmail($email)) throw new Exception('Invalid Email');
		
		//비밀번호 확인 문자열 비교
		if($loginPw!=$loginPwc) throw new Exception('pwc is wrong');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		$sql = "call sp_user_register('$loginId', '$loginPw', '$nickname', '$jumin','$username'
							,'$email','$farmname', '$zipcode','$addr','$tel',
							'$phone','$fax','$homepage')";
		
		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		
		if($row[0]==0) return 0;
		else 
		{
			$_SESSION[DBWork::sessionKey] = $row[0];
			
			return $row[0];
		}
	}

	public function RegisterMemberCompany()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$loginId = $this->param['login_id'];
		$nickname = $this->param['nickname'];
		$loginPw = $this->param['login_pw'];
		$loginPwc = $this->param['login_pwc'];
		
		$jumin1 = $this->param['jumin1'];
		$jumin2 = $this->param['jumin2'];
		
		$jumin = $jumin1.'-'.$jumin2;
		if($jumin=='-')$jumin='';
		
		$username = $this->param['username'];
		//$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		
		$zipcode = $this->param['zipcode1'].'-'.$this->param['zipcode2'];
		$addr = $this->param['addr1'].' '.$this->param['addr2'];
		
		$tel = $this->param['tel1'].'-'.$this->param['tel2'].'-'.$this->param['tel3'];
		$phone = $this->param['phone1'].'-'.$this->param['phone2'].'-'.$this->param['phone3'];
		$fax = $this->param['fax1'].'-'.$this->param['fax2'].'-'.$this->param['fax3'];
		
		$homepage = $this->param['homepage'];
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($nickname, 4, 30)) throw new Exception('Invalid userNick(length)');
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		//if(!Util::lengthCheck($email, 6, 40)) throw new Exception('Invalid email(length)');

		//유저 아이디 (영문,숫자만 허용)
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		//유저 성명 (한글,영문,숫자 허용)
		if(!Util::isKorAlNum($nickname)) throw new Exception('Invalid userNick(special character)');
		//이메일 (이메일 형식 체크)
		//if(!Util::isValidEmail($email)) throw new Exception('Invalid Email');
		
		//비밀번호 확인 문자열 비교
		if($loginPw!=$loginPwc) throw new Exception('pwc is wrong');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//회원 등록
		$sqlRegMember = "insert into user_info(user_jumin, user_id, user_pwd,
								user_name, user_nick, user_email, reg_date, user_farm_name,
								user_zip, user_addr, user_tel, user_phone, user_fax, 
								user_homepage)
				values (sha1('$jumin'), '$loginId', sha1('$loginPw'), 
						'$username','$nickname', '$email', now(), '$farmname',
						'$zipcode','$addr', '$tel', '$phone', '$fax', '$homepage');";
		
		$this->updateSql($sqlRegMember);
		$uid = $this->insert_id();
		
		if($uid==0) {
			echo "sqlRegMember";
			$this->rollback();
			return null;
		}
		
		//회사 등록
		$sqlRegCompany ="insert into company_info(co_nm, co_ceo_nm, co_saup_no,
											co_co_no, co_up, co_jong, co_zip, co_addr,
											co_tel, co_fax, co_handphone, reg_date, reg_uid)
								values ('$farmname','', '', 
										'', '', '', '$zipcode', '$addr',
										'$tel', '$fax', '$phone', now(), $uid);";
		
		$this->updateSql($sqlRegCompany);
		$co_id = $this->insert_id();
		
		if($co_id==0) {
			echo "sqlRegCompany";
			$this->rollback();
			return null;
		}
		
		//계정 과목 등록
		$sqlRegGycode ="INSERT INTO gycode (`co_id`,`gycode`,`gy_name`,`gy_rem`,`reg_date`,`reg_uid`)
							SELECT $co_id co_id ,gycode ,gy_name, gy_rem ,now() reg_date, $uid reg_uid FROM gycode_system WHERE modify_yn='1'";
		
		$this->updateSql($sqlRegGycode);
		
		//회사 연결
		$sqlRegComMember="INSERT INTO company_member (`uid`,`co_id`,`mem_level`,`reg_date`,`reg_uid`)
						VALUES ($uid,$co_id,100,now(),$uid);";
		
		$this->updateSql($sqlRegComMember);
		
		//기본 작업 코드
		$workcd = array("101"=>"종자예조 및 소독","102"=>"묘상준비 및 설치","103"=>"파종"
						,"104"=>"접목","105"=>"가식","106"=>"묘판관리"
						,"107"=>"경운정지","108"=>"퇴비 및 기비살포","109"=>"정식"
						,"110"=>"지주, 네트세우기","111"=>"추비살포","112"=>"병충해 방제"
						,"113"=>"제초","114"=>"비닐 및 흙덮기","116"=>"적심적아"
						,"117"=>"물관리","118"=>"하우스 설치 및 관리","119"=>"온도관리"
						,"120"=>"수확","121"=>"선별 및 포장","122"=>"운반 및 저장"
						,"123"=>"기 타(수정 등)" );
		
		//기본 작업 코드 등록
		foreach($workcd as $work_cd=>$work_nm)
		{
			$sqlWorkcd="INSERT INTO work_cd (`co_id`, `work_cd`, `work_nm`, `reg_date`, `reg_uid`)
						VALUES ( $co_id, $work_cd, '$work_nm' ,  now() , $uid);";
		
			$this->updateSql($sqlWorkcd);
		}
		
		//로그인 및 커밋
		$this->commit();
			
		$_SESSION[DBWork::sessionKey] = $uid;
		$_SESSION[DBWork::companyKey] = $co_id;

		return $uid;
	}
	
	/**
	 * 회원가입 처리 요청
	 * @return uid
	 * @throws Exception
	 */
	public function requestRegisterCompany()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_nm = $this->param['co_nm'];
		
		//추가정보
		$co_ceo_nm = $this->param['co_ceo_nm'];
		$co_saup_no = $this->param['co_saup_no1'].'-'.$this->param['co_saup_no2'].'-'.$this->param['co_saup_no3'];
		$co_co_no = $this->param['co_co_no1'].'-'.$this->param['co_co_no2'];
		
		$zipcode = $this->param['zipcode1'].'-'.$this->param['zipcode2'];
		$addr = $this->param['addr1'].'  '.$this->param['addr2'];
		
		$co_up = $this->param['co_up'];
		$co_jong = $this->param['co_jong'];
		$co_tel = $this->param['co_tel1'].'-'.$this->param['co_tel2'].'-'.$this->param['co_tel3'];
		$co_handphone = $this->param['co_handphone1'].'-'.$this->param['co_handphone2'].'-'.$this->param['co_handphone3'];
		$co_fax = $this->param['co_fax1'].'-'.$this->param['co_fax2'].'-'.$this->param['co_fax3'];
		
		//길이 체크
		if(!Util::lengthCheck($co_nm, 4, 45)) throw new Exception('Invalid co_nm(length)');
			
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//회사 등록
		$sqlRegCompany ="insert into company_info(co_nm, co_ceo_nm, co_saup_no,
											co_co_no, co_up, co_jong, co_zip, co_addr,
											co_tel, co_fax, co_handphone, reg_date, reg_uid)
								values ('$co_nm','', '', 
										'', '', '', '$zipcode', '$addr',
										'$tel', '$fax', '$phone', now(), $uid);";
		
		$this->updateSql($sqlRegCompany);
		$co_id = $this->insert_id();
		
		if($co_id==0) {
			echo "sqlRegCompany";
			$this->rollback();
			return null;
		}
		
		//계정 과목 등록
		$sqlRegGycode ="INSERT INTO gycode (`co_id`,`gycode`,`gy_name`,`gy_rem`,`reg_date`,`reg_uid`)
							SELECT $co_id co_id ,gycode ,gy_name, gy_rem ,now() reg_date, $uid reg_uid FROM gycode_system WHERE modify_yn='1'";
		
		$this->updateSql($sqlRegGycode);
		
		//회사 연결
		$sqlRegComMember="INSERT INTO company_member (`uid`,`co_id`,`mem_level`,`reg_date`,`reg_uid`)
						VALUES ($uid,$co_id,100,now(),$uid);";
		
		$this->updateSql($sqlRegComMember);
		
		//기본 작업 코드
		$workcd = array("101"=>"종자예조 및 소독","102"=>"묘상준비 및 설치","103"=>"파종"
						,"104"=>"접목","105"=>"가식","106"=>"묘판관리"
						,"107"=>"경운정지","108"=>"퇴비 및 기비살포","109"=>"정식"
						,"110"=>"지주, 네트세우기","111"=>"추비살포","112"=>"병충해 방제"
						,"113"=>"제초","114"=>"비닐 및 흙덮기","116"=>"적심적아"
						,"117"=>"물관리","118"=>"하우스 설치 및 관리","119"=>"온도관리"
						,"120"=>"수확","121"=>"선별 및 포장","122"=>"운반 및 저장"
						,"123"=>"기 타(수정 등)" );
		
		//기본 작업 코드 등록
		foreach($workcd as $work_cd=>$work_nm)
		{
			$sqlWorkcd="INSERT INTO work_cd (`co_id`, `work_cd`, `work_nm`, `reg_date`, `reg_uid`)
						VALUES ( $co_id, $work_cd, '$work_nm' ,  now() , $uid);";
		
			$this->updateSql($sqlWorkcd);
		}
		
		//로그인 및 커밋
		$this->commit();
		return true;
		//throw new Exception($sql);
		
		
		
	}
	
	/**
	 * 회원탈퇴 처리 요청
	 * @return Boolean
	 * @throws Exception
	 */
	public function requestCancel()
	{
		
	}	



	/**
	 * 로그인 성공 후 유저 정보 요청
	 * @throws Exception
	 */
	public function requestUserInfo()
	{
		//세션이 존재하는 지는 이미 검사하므로 여기는 유효성 검사이다.
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		if($uid==0) throw new Exception('Invalid Session.');

		$sql = "call sp_user_info($uid)";
		$this->multiQuerySql($sql);
	
		if($this->getNumRows()==0) throw new Exception('user info query error.');
		else 
		{
			$info = $this->fetchObjectRow();
		
			//차후 쿼리없이 사용할 수 있도록 세션에 저장해 둔다.
			$_SESSION['nickname'] = $info->user_nick;
			$_SESSION['user_name'] = $info->user_name;
			$_SESSION['auth_level'] = $info->auth_id;
			
			//회사 리스트 업
			if($this->nextQueryResult()){
				$_SESSION['co_list']=array();
				while($info=$this->fetchMixedRow())
				{
					array_push($_SESSION['co_list'],$info); 	
				}
			}
		}
	}
	
	
	public function requestUserList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		if($uid==0) throw new Exception('Invalid Session.');
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "call sp_user_list($uid)";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			$row = $this->fetchObjectRow();
			return $row;
		}
	}

	public function requestComInfo()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = $this->param['co_id'];
		
		if($uid==0) throw new Exception('Invalid Session.');
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//$sql = "call sp_company_info($uid,$co_id)";
		$sql = "SELECT  `co_nm`, `co_ceo_nm`, `co_saup_no`, `co_co_no`, `co_up`, `co_up_code`, `co_jong`, `co_zip`,
				    `co_addr`,  `co_tel`, `co_tel_juso`,  `co_handphone`,  `co_email`,  `co_fax`,  `co_tax_office`,
				    `co_tax_office_code`, `co_tax_office_acc`, `co_bank`, `co_bank_branch`, `co_bank_acc`
				FROM `farmsaver`.`company_info` WHERE co_id = $co_id;";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			$row = $this->fetchObjectRow();
			return $row;
		}
	}
	
	public function requestCurComInfo()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
	
		if($uid==0) throw new Exception('Invalid Session.');
		//------------------------------------
		//	db work
		//-------------------------------------
	
		//$sql = "call sp_company_info($uid,$co_id)";
		$sql = "SELECT  `co_nm`, `co_ceo_nm`, `co_saup_no`, `co_co_no`, `co_up`, `co_up_code`, `co_jong`, `co_zip`,
		`co_addr`,  `co_tel`, `co_tel_juso`,  `co_handphone`,  `co_email`,  `co_fax`,  `co_tax_office`,
		`co_tax_office_code`, `co_tax_office_acc`, `co_bank`, `co_bank_branch`, `co_bank_acc`
		FROM `company_info` WHERE co_id = $co_id;";
		$this->querySql($sql);
	
		if($this->getNumRows()==0) return null;
		else
		{
			$row = $this->fetchObjectRow();
			return $row;
		}
	}


	//존재할 경우 user_id 값을 리턴한다.
	public function requestExistCheck()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$value = $this->param['value'];
		$type = $this->param['type'];

		
		//login id check
		if($type==1)
		{
			//길이 체크
			if(!Util::lengthCheck($value, 6, 20)) throw new Exception('Invalid value(length)'); 
			//영문,숫자만 허용
			if(!Util::isAlNum($value)) throw new Exception('Invalid login Id.');
			
			$sql = "select user_id from user_info where user_id = '$value' limit 1";
		}
		
		//nickname check
		else if($type==2)
		{
			//길이 체크
			if(!Util::lengthCheck($value, 4, 20)) throw new Exception('Invalid value(length)'); 
			//유저 성명 (한글,영문,숫자 허용)
			if(!Util::isKorAlNum($value)) throw new Exception('Invalid nickname.');
			
			$sql = "select user_id from user_info where user_nick = '$value' limit 1";
		}
		
		else throw new Exception('Invalid type'); 
		
		//------------------------------------
		//	db work
		//-------------------------------------

		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		
		if($row==null) return -1;
		
		return $row[0];
	}
	
	
	/**
	 * 회원가입 처리 요청
	 * @return uid
	 * @throws Exception
	 */
	public function requestModify()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		//필수
		$loginId = $this->param['login_id'];
		$nickname = $this->param['nickname'];
		$loginoldPw = $this->param['login_pw_old'];
		$loginPw = $this->param['login_pw'];
		$loginPwc = $this->param['login_pwc'];
		$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		$zipcode = $this->param['user_zip'];
		$addr = $this->param['user_addr'];
		$tel = $this->param['user_tel'];
		$phone = $this->param['user_phone'];
		$fax = $this->param['user_fax'];
		$homepage = $this->param['user_homepage'];
		
		/*
		//log
		echo $loginId."<br/>";
		echo $nickname."<br/>";
		echo $loginoldPw."<br/>";
		echo $loginPw."<br/>";
		echo $loginPwc."<br/>";
		echo $email."<br/>";
		echo $zipcode."<br/>";
		echo $farmname."<br/>";
		echo $addr."<br/>";
		echo $tel."<br/>";
		echo $phone."<br/>";
		echo $fax."<br/>";
		echo $homepage."<br/>";
		*/
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($nickname, 4, 30)) throw new Exception('Invalid userNick(length)');
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		if(!Util::lengthCheck($email, 6, 40)) throw new Exception('Invalid email(length)');

		//유저 아이디 (영문,숫자만 허용)
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		//유저 성명 (한글,영문,숫자 허용)
		if(!Util::isKorAlNum($nickname)) throw new Exception('Invalid userNick(special character)');
		//이메일 (이메일 형식 체크)
		if(!Util::isValidEmail($email)) throw new Exception('Invalid Email');
		
		//비밀번호 확인 문자열 비교
		if($loginPw!=$loginPwc) throw new Exception('pwc is wrong');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		$loginoldPw = $this->param['login_pw_old'];
		$loginPw = $this->param['login_pw'];
		$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		$zipcode = $this->param['user_zip'];
		$addr = $this->param['user_addr'];
		$tel = $this->param['user_tel'];
		$phone = $this->param['user_phone'];
		$fax = $this->param['user_fax'];
		$homepage = $this->param['user_homepage'];
		
		$sql = "call sp_user_modify($uid, '$loginoldPw', '$loginPw', '$email', '$farmname'
							,'$zipcode','$addr','$tel','$phone','$fax'
							,'$homepage')";
							
		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		
		return $row[0];
	}
	
	public function requestChangeCoId()
	{
		$_SESSION[DBWork::companyKey]=$this->param['co_id'];
		
		//차후 검증 및 권한 로직 부여 
		
		
		
		return $_SESSION[DBWork::companyKey];
	}

	public function requestComModify()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$uid = (int)($_SESSION[DBWork::sessionKey]);
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
		//추가정보
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		
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
					`reg_date` = now()
					WHERE `co_id`=$co_id and `reg_uid`=$uid;";
		$this->updateSql($sql);
		
		$row = $this->getAffectedRows();
		
		return $row;
	}

	public function requestSetConfig()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$jdata = stripslashes($this->param['config']);
		$dec = json_decode($jdata,true);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$configSql = "INSERT INTO play_info (`uid`,`config`) VALUES ($uid,'$jdata')
						ON DUPLICATE KEY UPDATE 
						`uid` = $uid,`config` = '$jdata';";
		$this->updateSql($configSql);
	}

	public function requestGetConfig()
	{
		//------------------------------------
		//	param valid check
		//------------------------------------- 
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		//------------------------------------
		//	db work
		//-------------------------------------
		$configSql = "SELECT config from play_info WHERE uid=$uid;";
		$this->querySql($configSql);
	}
	
	public function findUserId(){
		$phone_num = $this -> param['number'];
		$birth = $this -> param['birth'].'%';
		
		//생년월일 폰번호 일치하는지 확인
		$sql = "SELECT user_id from user_info  where user_phone = '$phone_num' and user_jumin like '$birth'  limit 1";
		//throw new Exception($sql);
		
		$this -> querySql($sql);
		$row = $this -> fetchArrayRow();
	
		if (empty($row[0]) ) {
			return 'd';
		}
		
		$msg = "회원님의 웹 회원 아이디는 [" . $row[0] . "] 입니다. -Smartax-";
		
		$sMsg = iconv("UTF-8", "EUC-KR", $msg );
		
		$arr = Util::makeSmsToken($phone_num, 'GeniusZone', $sMsg, DBWork::UserId, DBWork::receiveNum, '');
		//return $res;
		
		$res = Util::SocketPost($arr);
		
		$success = substr($res, 0, 1);
		
		if ($success == 1) {
			return 'y';
		} else {
			return 'n';
		}
	}
	
	//사용
	//인증번호 요청 - 문자 서비스
	public function requestSmsNumber() {
		$phone_num = $this -> param['number'];
		$login_id = $this -> param['login_id'];
		
		//인증요청시 초기화
		$_SESSION['cert'] = 'n';
		
		//아이디와 폰번호 일치하는지 확인
		$sql = "SELECT count(*) from user_info  where user_id = '$login_id' and user_phone = '$phone_num'  limit 1";
		//throw new Exception($sql);
		
		$this -> querySql($sql);
		$row = $this -> fetchArrayRow();
	
		if ($row[0] == 0 ) {
			return 'd';
		}
		//------------------------------------
		//	param valid check
		//-------------------------------------
	
		$cert_num = Util::get_random_string(6, '09');
		$msg = "[" . $cert_num . "]";
	
		$sMsg = iconv("UTF-8", "EUC-KR", $msg . " 웹페이지에 인증번호를 입력하세요.-Smartax-");
	
// 		$arr = Util::makeSmsToken($phone_num, 'GeniusZone', $sMsg, DBWork::UserId, DBWork::receiveNum, '');
		$arr = Util::makeSmsToken($phone_num, 'Smartax', $sMsg, DBWork::UserId, DBWork::receiveNum, '');
		//return $res;
	
		$res = Util::SocketPost($arr);
	
		$success = substr($res, 0, 1);
	
		if ($success == 1) {
			$_SESSION['cert_num'] = $cert_num;
			$_SESSION['phone'] = $phone_num;
			$_SESSION['login_id'] = $login_id;
			return 'y';
		} else {
			return 'n';
		}
	}
	
	public function requestSmsNumberForFindId(){
		$phone_num = $this -> param['number'];
		
		//인증요청시 초기화
		$_SESSION['cert'] = 'n';
		
		//아이디와 폰번호 일치하는지 확인
		$sql = "SELECT user_id from user_info  where user_phone = '$phone_num'  limit 1";
		//throw new Exception($sql);
		
		$this -> querySql($sql);
		$row = $this -> fetchArrayRow();
		
		if (empty( $row[0])) {
			return 'd';
		}
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$cert_num = Util::get_random_string(6, '09');
		$msg = "[" . $cert_num . "]";
		
		$sMsg = iconv("UTF-8", "EUC-KR", $msg . " 웹페이지에 인증번호를 입력하세요.-Smartax-");
		
// 		$arr = Util::makeSmsToken($phone_num, 'GeniusZone', $sMsg, DBWork::UserId, DBWork::receiveNum, '');
		$arr = Util::makeSmsToken($phone_num, 'Smartax', $sMsg, DBWork::UserId, DBWork::receiveNum, '');
		//return $res;
		
		$res = Util::SocketPost($arr);
		$success = substr($res, 0, 1);
		if ($success == 1) {
			$_SESSION['cert_num'] = $cert_num;
			$_SESSION['phone'] = $phone_num;
			return 'y';
		} else {
			return 'n';
		}
	}
	
	//사용
	//인증번호 확인
	public function chkNumber() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$cert_num = $this -> param['number'];
	
		if ($_SESSION['cert_num'] == $cert_num) {
			$_SESSION['cert'] = 'y';
			return 'y';
		} else {
			return 'n';
		}
	}
	
	/**
	 * 비밀번호 변경
	 * @return uid
	 * @throws Exception
	 */
	public function changePwd()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
	
		//필수
		$cert = $_SESSION['cert'] ;
		$login_id = $_SESSION['login_id'];
		$loginPw = $this->param['pwd'];
		
		//인증 체크
		if($cert != 'y') throw new Exception('휴대폰 인증을 해주십시요.');
	
		//길이 체크
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('비밀번호 길이는 6~20자입니다.');
	
		//------------------------------------
		//	db work
		//-------------------------------------
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
	
		$sql = "UPDATE `user_info` SET `user_pwd` = sha1('$loginPw') WHERE `user_id` = '$login_id';";
		$this->updateSql($sql);
	
		return 'y';
	}
	
	//포인트 적립로그 조회
	public function requestPointSaveLog()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$pageIndex = (int)$this->param['pg_inx'];
		$pageSize = $this->page_size;
		$pageStart = $page_size * ($pageIndex - 1);
		
		if($uid == 0) throw new Exception('Invalid Uid.');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$countSql = "SELECT count(*) FROM `log_point_save` where  `ps_uid` = $uid;";
		$this->querySql($countSql);
		
		$total_count = 0;
		
		if ($row = $this->fetchArrayRow()) {
			$total_count = $row[0];
		}
		
		$basicSql = "SELECT `ps_id`, `pt_code`,`ps_pg`, `ps_amt`, `ps_point` , `ps_reg_date` 
							FROM `log_point_save` where  `ps_uid` = $uid order by `ps_id` desc limit $pageStart, $pageSize;";
		
		$this->querySql($basicSql);
		
		return $total_count;
	}
	
	//포인트 사용로그 조회
	public function requestPointUseLog()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$pageIndex = (int)$this->param['pg_inx'];
		$pageSize = $this->page_size;
		$pageStart = $pageSize * ($pageIndex - 1);
		
		if($uid == 0) throw new Exception('Invalid Uid.');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$countSql = "SELECT count(*) FROM `log_point_use` where  `pu_uid` = $uid;";
		$this->querySql($countSql);
		
		$total_count = 0;
		
		if ($row = $this->fetchArrayRow()) {
			$total_count = $row[0];
		}
		//throw new Exception($pageStart);
		
		$basicSql = "SELECT `pu_id`, `pu_co_nm`,`pu_nm`, `pu_point`, `pu_reg_date`, `pu_start_date`, `pu_expire_date`
							FROM `log_point_use` where  `pu_uid` = $uid order by `pu_id` desc limit $pageStart, $pageSize;";
		
		$this->querySql($basicSql);
		
		return $total_count;
	}
	
	//회원 조회(My Page)
	public function selectUserInfo(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		$sql = "SELECT uid, user_name, user_jumin, user_phone, user_tel ,user_email, user_addr, user_profile_img
					FROM user_info a
					left outer join user_info_detail b
					on a.uid = b.u_id
					where a.uid = $uid ;";
		$this->querySql($sql);
		
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
		return $res;
	}
	
	
	/**
	 * MY page 회원정보 수정
	 */
	public function updateUserInfo(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$user_name = $this->param['user_name'];
		$user_phone = $this->param['user_phone1'].'-'.$this->param['user_phone2'].'-'.$this->param['user_phone3'];
		$user_tel = $this->param['user_tel1'].'-'.$this->param['user_tel2'].'-'.$this->param['user_tel3'];
		$user_email = $this->param['user_email1'].'@'.$this->param['user_email2'];
		$user_addr = $this->param['user_addr'];
		
		$this->startTransaction();
		try {
			
			$sql="UPDATE user_info
					SET user_name = '$user_name', user_phone = '$user_phone'
					WHERE uid = $uid;";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				throw new Exception('user_info update fail row : ' + $row);
			}
			
			$sql = "UPDATE user_info_detail
						SET user_email = '$user_email', user_tel = '$user_tel', user_addr = '$user_addr'
						WHERE u_id = $uid;";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
				
			if($row < 0){
				throw new Exception('user_info user_info_detail fail row : ' + $row);
			}
			
		} catch (Exception $e) {
			$this->rollback();
			throw new Exception($e);
		}
		
		$this->commit();
		
		return 1;
	}
	
	//회원 이미지 수정
	public function requestProfileModify($fileName){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		try
		{
			$sql = "UPDATE user_info_detail
						SET user_profile_img ='$fileName'
						WHERE u_id = $uid;";
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				throw new Exception('update(profile) user_info_detail fail row : ' + $row);
			}
		}
		catch (Exception $e){
			throw new Exception($e);
		}
	}
}

?>