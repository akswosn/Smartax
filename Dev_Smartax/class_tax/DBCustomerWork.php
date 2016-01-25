<?php
class DBCustomerWork extends DBWork
{
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//거래처 조회 
	public function requestSelect(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT `customer_id`, `co_id`, `tr_nm`, `tr_daepyo`, `tr_saup_no`, `tr_jumin_no`, `tr_up`, 
						`tr_jong`,  `tr_zip`, `tr_addr`, `tr_tel`, `tr_phone`, `tr_fax`, `tr_email`,
    					`tr_bigo`, `reg_date`, `reg_uid`
				FROM `customer` WHERE `co_id` = $co_id; ";
		
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			
			$res=array();
			
			while($item=$this->fetchMapRow())
			{
				array_push($res,$item);
				
			}
			
			return $res;
		}
	}
	
	//거래처 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		$customer_id = (int)$this->param['customer_id'];

		//------------------------------------
		//	db work
		//-------------------------------------
		//삭제 
		$sql = "DELETE FROM customer WHERE  `co_id` = $co_id and customer_id = $customer_id;";
		$this->updateSql($sql);
		return '00';
	}
	
	//거래처 등록/수정 
	public function requestRegModify(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		
		$customer_id = (int)$this->param['customer_id'];
		$tr_nm = $this->param['tr_nm'];
		$tr_daepyo = $this->param['tr_daepyo'];
		$tr_saup_no = $this->param['tr_saup_no'];
		$tr_jumin_no = $this->param['tr_jumin_no'];
		$tr_up = $this->param['tr_up'];
		$tr_jong = $this->param['tr_jong'];
		$tr_zip = $this->param['tr_zip'];
		$tr_addr = $this->param['tr_addr'];
		$tr_tel = $this->param['tr_tel'];
		$tr_phone = $this->param['tr_phone'];
		$tr_fax = $this->param['tr_fax'];
		$tr_email = $this->param['tr_email'];
		$tr_bigo = $this->param['tr_bigo'];
		$tr_bigo = $this->param['tr_bigo'];
		
		//필수 항목 체크 
		if(!$tr_nm || $tr_nm == '') throw new Exception('tr_nm Not Value');
		
		//길이 체크 
		if($tr_nm && !Util::lengthCheck($tr_nm, 2, 120)) throw new Exception('tr_nm Invaild length');
//2015-11-13  필수 미필수 정의후 재정리		
// 		if($tr_daepyo && !Util::lengthCheck($tr_daepyo, 2, 20)) throw new Exception('tr_daepyo Invaild length');
// 		if($tr_saup_no && !Util::lengthCheck($tr_saup_no, 2, 12)) throw new Exception('tr_saup_no Invaild length');
// 		if($tr_jumin_no && !Util::lengthCheck($tr_jumin_no, 2, 14)) throw new Exception('tr_jumin_no Invaild length');
// 		if($tr_up && !Util::lengthCheck($tr_up, 2, 45)) throw new Exception('tr_up Invaild length');
// 		if($tr_jong && !Util::lengthCheck($tr_jong, 2, 45)) throw new Exception('tr_jong Invaild length');
// 		if($tr_zip && !Util::lengthCheck($tr_zip, 2, 7)) throw new Exception('tr_zip Invaild length');
// 		if($tr_addr && !Util::lengthCheck($tr_addr, 2, 90)) throw new Exception('tr_addr Invaild length');
// 		if($tr_tel && !Util::lengthCheck($tr_tel, 2, 20)) throw new Exception('tr_tel Invaild length');
// 		if($tr_phone && !Util::lengthCheck($tr_phone, 2, 20)) throw new Exception('tr_phone Invaild length');
// 		if($tr_fax && !Util::lengthCheck($tr_fax, 2, 20)) throw new Exception('tr_fax Invaild length');
// 		if($tr_email && !Util::lengthCheck($tr_email, 2, 40)) throw new Exception('tr_email Invaild length');
// 		if($tr_bigo && !Util::lengthCheck($tr_bigo, 2, 45)) throw new Exception('tr_bigo Invaild length');
		
		//특수 문자 제외 
		$this->escapeString($tr_nm);
		//------------------------------------
		//	db work
		//-------------------------------------		
		$sql = "INSERT INTO `customer` (`customer_id`, `co_id`, `tr_nm`, `tr_daepyo`, `tr_saup_no`, `tr_jumin_no`, `tr_up`
					, `tr_jong`, `tr_zip`, `tr_addr`, `tr_tel`, `tr_phone`, `tr_fax`, `tr_email`, `tr_bigo`, `reg_date`, `reg_uid`)
					VALUES ($customer_id , $co_id, '$tr_nm', '$tr_daepyo', '$tr_saup_no', '$tr_jumin_no','$tr_up'
						, '$tr_jong', '$tr_zip',  '$tr_addr', '$tr_tel', '$tr_phone',  '$tr_fax',  '$tr_email','$tr_bigo', now(),  $uid)						
				ON DUPLICATE KEY UPDATE
					`customer_id` = $customer_id , `co_id` = $co_id, `tr_nm` = '$tr_nm', `tr_daepyo` = '$tr_daepyo', `tr_saup_no` = '$tr_saup_no', `tr_jumin_no` = '$tr_jumin_no',
					`tr_up` = '$tr_up', `tr_jong` = '$tr_jong', `tr_zip` = '$tr_zip', `tr_addr` = '$tr_addr',
					`tr_tel` = '$tr_tel', `tr_phone` = '$tr_phone', `tr_fax` = '$tr_fax', `tr_email` = '$tr_email',
					`tr_bigo` = '$tr_bigo', `reg_date` = now(), `reg_uid` = $uid;";
		
		$this->updateSql($sql);
		return '00';
	}
	
	/**
	 * 영업 - 미가입  고객관리 등록
	 * */
	public function registerSaleCust($saupFile, $deapyoFile){
		
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		$saupFileYn='n';
		$deapyoFileYn='n';
		$co_nm = $this->param['co_nm'];
		$co_saup_no = $this->param['co_saup_no'];
		$co_tel = $this->param['co_tel'];
		$bigo = $this->param['bigo'];
		
		if(!empty($saupFile)){
			$saupFileYn = 'y';
		}
		
		if(!empty($deapyoFile)){
			$deapyoFileYn = 'y';
		}
		
		try {
			//1. 영업 등록회원 수 조회(고객코드 생성용
			$sql = "SELECT count(_id) + 1 as count
			FROM sale_customer
			WHERE sale_uid = $uid";
			
			$this->querySql($sql);
			$row = $this->fetchArrayRow(); //조회한 거래처 코드로 insert 진행
			
			if($row[0] < 1){
				throw new Exception('sale_customer select fail row : ' + $row);
			}
			
			$sale_code =$uid. '_' . $row[0];
			
			
			//2.insert!!!
			$sql = "INSERT INTO sale_customer(
					   sale_uid ,sale_code
					  ,co_nm ,co_saup_no ,co_tel
					  ,upload_saup_flag ,upload_saup_file
					  ,upload_deapyo_flag ,upload_deapyo_file
					  ,bigo ,reg_date ,reg_uid, reg_flag
					) VALUES (
					  $uid ,'$sale_code'
					  ,'$co_nm' ,'$co_saup_no', '$co_tel'
					  ,'$saupFileYn' ,'$saupFile'  
					  ,'$deapyoFileYn'  ,'$deapyoFile' 
					  ,'$bigo'  , now(), $uid, 'n'
					)";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
				
			if($row < 0){
				$this->rollback();
				throw new Exception('sale_customer insert fail row : ' + $row);
			}
			
		} catch (Exception $e) {
			throw new Exception($e);
		}
		
	}
	
	//영업 - 미가입 고객관리 조회
	public function selectSaleCustomer(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		
		$sql = "SELECT _id as sale_id, uid, sale_uid, sale_code, co_nm, co_saup_no, co_tel, upload_saup_flag, upload_saup_file
						, upload_deapyo_flag, upload_deapyo_file, bigo, complain_comment, complain_flag
						, reg_date, reg_uid
					FROM sale_customer
					where sale_uid = $uid AND reg_flag = 'n';	";
		
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
				
			$res=array();
				
			while($item=$this->fetchMapRow())
			{
				array_push($res,$item);
		
			}
				
			return $res;
		}
	}
	
	//미가입  고객관리 수정
	public function updateSaleCust($saupFile, $deapyoFile){
	
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		$co_nm = $this->param['co_nm'];
		$co_saup_no = $this->param['co_saup_no'];
		$co_tel = $this->param['co_tel'];
		$bigo = $this->param['bigo'];
		$sale_id = $this->param['sale_id'];
		if(!empty($saupFile)){
// 			$saupFileYn = 'y';
		}
	
		if(!empty($deapyoFile)){
// 			$deapyoFileYn = 'y';
		}
	
		try {
				
			$sql = "UPDATE sale_customer
						SET sale_uid = $uid
								,co_nm ='$co_nm' ,co_saup_no = '$co_saup_no' ,co_tel = '$co_tel'
								,bigo =  $bigo, reg_date = now()";

			if(!empty($saupFile)){
				$sql=$sql.", upload_saup_flag='y' ,upload_saup_file='$saupFile'";
			}
			
			if(!empty($deapyoFile)){
				$sql=$sql.", upload_deapyo_flag='y' ,upload_deapyo_file='$deapyoFile'";
			}			
			$sql=$sql." WHERE _id=$sale_id;";
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
	
			if($row < 0){
				$this->rollback();
				throw new Exception('sale_customer insert fail row : ' + $row);
			}
				
		} catch (Exception $e) {
			throw new Exception($e);
		}
		return 1;
	}
	
	//영업 - 고객관리 삭제
	public function deleteSaleCust(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		$del = $this->param['del'];
		
		$sql = "DELETE FROM sale_customer WHERE _id in ($del);";
		
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
		
		if($row < 0){
			$this->rollback();
			throw new Exception('sale_customer delte fail row : ' + $row);
		}
		return 1;
	}
	
	
	//영업 - 고객관리 조회(가입된 회원)
	public function selectSaleCustomerByJoin(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
	
		$sql = "SELECT a.co_id, b.uid as co_uid, co_nm, sale_code, co_saup_no, co_tel, co_handphone
			  , upload_saup_flag, upload_saup_file, upload_deapyo_flag, upload_deapyo_file
			  , a.reg_uid, a.reg_date, bigo
		FROM company_info a
		join company_member b
		on a.co_id = b.co_id
		where a.co_id in (
		  SELECT c.co_id
		  FROM sales_member s
		  join company_member c
		  on s.cus_uid = c.uid
		  WHERE s.sales_uid = $uid
		);";
	
		$this->querySql($sql);
	
		if($this->getNumRows()==0) return null;
		else
		{
	
			$res=array();
	
			while($item=$this->fetchMapRow())
			{
				array_push($res,$item);
	
			}
	
			return $res;
		}
	}
	
	//영업 - 고객관리 수정
	public function updateSaleCustByJoin($saupFile, $deapyoFile){
	
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$this->param['co_id'];
		$co_nm = $this->param['co_nm'];
		$co_saup_no = $this->param['co_saup_no'];
		$co_tel = $this->param['co_tel'];
		$bigo = $this->param['bigo'];
		$sale_code = $this->param['sale_code'];
		$co_handphone = $this->param['co_handphone'];
		$saupFileYn = 'y';
		$deapyoFileYn = 'y';
		
		try {
	
			$sql = "UPDATE company_info
			SET sale_code ='$sale_code'
			,co_nm ='$co_nm' ,co_saup_no = '$co_saup_no' ,co_tel = '$co_tel'
			,bigo =  '$bigo', co_handphone='$co_handphone', reg_date = now()";
	
			if(!empty($saupFile)){
				$sql=$sql.", upload_saup_flag='$saupFileYn' ,upload_saup_file='$saupFile'";
			}
				
			if(!empty($deapyoFile)){
				$sql=$sql.", upload_deapyo_flag='$deapyoFileYn' ,upload_deapyo_file='$deapyoFile'";
			}
			
			
			$sql=$sql." WHERE co_id=$co_id;";
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
	
			if($row < 0){
				$this->rollback();
				throw new Exception('sale_customer insert fail row : ' + $row);
			}
	
		} catch (Exception $e) {
			throw new Exception($e);
		}
		return 1;
	}
	
	/* 영업 - 고객관리 삭제*/
	public function deleteSaleCustByJoin(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::companyKey]);
		
		$del = $this->param['del'];
		
		$sql = "DELETE FROM sales_member WHERE sales_uid=$uid AND cus_uid in ($del);";
		
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
		
		if($row < 0){
			throw new Exception('sale_customer delte fail row : ' + $row);
		}
		return 1;
	}
	//세무 - 고객관리 조회
	public function selectTaxCustomer(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		$sql = "SELECT a.co_id, b.uid as co_uid, co_nm, sale_code, co_saup_no, co_tel, co_handphone
					  , upload_saup_flag, upload_saup_file, upload_deapyo_flag, upload_deapyo_file
					  , a.reg_uid, a.reg_date, bigo, tax_delegate_flag, tax_account_flag, tax_uid
					  , hometax_id , hometax_pwd
				FROM company_info a
				  join company_member b
					on a.co_id = b.co_id
				WHERE a.tax_uid = $uid;";
		$this->querySql($sql);
	
		if($this->getNumRows()==0) return null;
		else
		{
	
			$res=array();
	
			while($item=$this->fetchMapRow())
			{
				array_push($res,$item);
	
			}
	
			return $res;
		}
	}
	
	public function updateTaxCustomer(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$this->param['co_id'];
		$bigo = $this->param['bigo'];
		
		$tax_account_flag = $this->param['tax_account_flag'];
		$tax_delegate_flag = $this->param['tax_delegate_flag'];
		
		
		$sql = "UPDATE company_info 
					SET bigo = '$bigo', tax_account_flag='$tax_account_flag', tax_delegate_flag='$tax_delegate_flag'
					, reg_date = now(), reg_uid = $uid
					WHERE co_id=$co_id;";
		
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
		
		if($row < 0){
			throw new Exception('sale_customer delte fail row : ' + $row);
		}
		return 1;
	}
}
	

?>