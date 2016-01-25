<?php
class DBCustomerWork extends DBWork
{
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
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
		$tr_homepage = $this->param['tr_homepage'];
		$tr_email = $this->param['tr_email'];
		$tr_manager = $this->param['tr_manager'];
		$tr_sdate = $this->param['tr_sdate'];
		$tr_edate = $this->param['tr_edate'];
		$cid_tel1 = $this->param['cid_tel1'];
		$cid_tel2 = $this->param['cid_tel2'];
		$cid_tel3 = $this->param['cid_tel3'];
		$tr_bigo = $this->param['tr_bigo'];
		$tr_chuchun = (int)$this->param['tr_chuchun'];
		
		//작목 이름 체크
		if($tr_nm){
			if(!$tr_nm || !Util::lengthCheck($tr_nm, 2, 120)) throw new Exception('Customer Name length');
			$this->escapeString($tr_nm);
		}
		/*
		echo $customer_id.' -------> '.'customer_id'.'<br>';
		echo $tr_nm.' -------> '.'tr_nm'.'<br>';
		echo $tr_daepyo.' -------> '.'tr_daepyo'.'<br>';
		echo $tr_saup_no.' -------> '.'tr_saup_no'.'<br>';
		echo $tr_jumin_no.' -------> '.'tr_jumin_no'.'<br>';
		echo $tr_up.' -------> '.'tr_up'.'<br>';
		echo $tr_jong.' -------> '.'tr_jong'.'<br>';
		echo $tr_zip.' -------> '.'tr_zip'.'<br>';
		echo $tr_addr.' -------> '.'tr_addr'.'<br>';
		echo $tr_tel.' -------> '.'tr_tel'.'<br>';
		echo $tr_phone.' -------> '.'tr_phone'.'<br>';
		echo $tr_fax.' -------> '.'tr_fax'.'<br>';
		echo $tr_homepage.' -------> '.'tr_homepage'.'<br>';
		echo $tr_email.' -------> '.'tr_email'.'<br>';
		echo $tr_manager.' -------> '.'tr_manager'.'<br>';
		echo $tr_sdate.' -------> '.'tr_sdate'.'<br>';
		echo $tr_edate.' -------> '.'tr_edate'.'<br>';
		echo $cid_tel1.' -------> '.'cid_tel1'.'<br>';
		echo $cid_tel2.' -------> '.'cid_tel2'.'<br>';
		echo $cid_tel3.' -------> '.'cid_tel3'.'<br>';
		echo $tr_bigo.' -------> '.'tr_bigo'.'<br>';
		echo $tr_chuchun.' -------> '.'tr_chuchun'.'<br>';
		*/	
		
		//------------------------------------
		//	db work
		//-------------------------------------		
		$sql = "call sp_customer_register($customer_id, $co_id, '$tr_nm',  '$tr_daepyo',  '$tr_saup_no', 
											 '$tr_jumin_no',  '$tr_up',  '$tr_jong',  '$tr_zip',  '$tr_addr', 
											  '$tr_tel',  '$tr_phone',  '$tr_fax',  '$tr_homepage',  '$tr_email', 
											   '$tr_manager',  '$tr_sdate',  '$tr_edate',  '$cid_tel1',  '$cid_tel2', 
											    '$cid_tel3',  '$tr_bigo', $tr_chuchun,  $uid)";
		
		$this->querySql($sql);
		
		$row = $this->fetchMixedRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
	//거래처 리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "call sp_customer_list($co_id)";
		
		$this->querySql($sql);
		
	}

	//거래처 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$customer_id = (int)$this->param['customer_id'];

		//------------------------------------
		//	db work
		//-------------------------------------
		//기초에 데이터 있는지 확인  --> -1 불가
		$gichoSql ="SELECT count(*) FROM gicho_detail WHERE co_id=$co_id AND customer_id = $customer_id";
		$this->querySql($gichoSql);
		$row = $this->fetchMixedRow();
		if($row[0]!=0) return -1;
		
		//전표에 데이터 있는지 확인 --> -2 불가
		$junpyoSql ="SELECT count(*) FROM junpyo WHERE co_id=$co_id AND customer_id = $customer_id";
		$this->querySql($junpyoSql);
		$row = $this->fetchMixedRow();
		if($row[0]!=0) return -2;
		
		//삭제 
		$sql = "DELETE FROM customer WHERE  co_id = $co_id and customer_id = $customer_id;";
		$this->updateSql($sql);
		return '00';
	}
	
	//작목 수정
	public function requestModify(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
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
		$tr_homepage = $this->param['tr_homepage'];
		$tr_email = $this->param['tr_email'];
		$tr_manager = $this->param['tr_manager'];
		$tr_sdate = $this->param['tr_sdate'];
		$tr_edate = $this->param['tr_edate'];
		$cid_tel1 = $this->param['cid_tel1'];
		$cid_tel2 = $this->param['cid_tel2'];
		$cid_tel3 = $this->param['cid_tel3'];
		$tr_bigo = $this->param['tr_bigo'];
		$tr_chuchun = (int)$this->param['tr_chuchun'];
		
		
		//작목 이름 체크
		if($tr_nm){
			if(!$tr_nm || !Util::lengthCheck($tr_nm, 2, 45)) throw new Exception('Customer Name length');
			$this->escapeString($tr_nm);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------		
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
		$tr_homepage = $this->param['tr_homepage'];
		$tr_email = $this->param['tr_email'];
		$tr_manager = $this->param['tr_manager'];
		$tr_sdate = $this->param['tr_sdate'];
		$tr_edate = $this->param['tr_edate'];
		$cid_tel1 = $this->param['cid_tel1'];
		$cid_tel2 = $this->param['cid_tel2'];
		$cid_tel3 = $this->param['cid_tel3'];
		$tr_bigo = $this->param['tr_bigo'];
		$tr_chuchun = (int)$this->param['tr_chuchun'];
		
		$sql = "call sp_customer_edit($customer_id, $co_id, '$tr_nm',  '$tr_daepyo',  '$tr_saup_no', 
											 '$tr_jumin_no',  '$tr_up',  '$tr_jong',  '$tr_zip',  '$tr_addr', 
											  '$tr_tel',  '$tr_phone',  '$tr_fax',  '$tr_homepage',  '$tr_email', 
											   '$tr_manager',  '$tr_sdate',  '$tr_edate',  '$cid_tel1',  '$cid_tel2', 
											    '$cid_tel3',  '$tr_bigo', $tr_chuchun,  $uid)";
		
		$this->querySql($sql);
		
		$row = $this->fetchMixedRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
}

?>