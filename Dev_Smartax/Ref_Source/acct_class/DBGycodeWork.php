<?php
class DBGycodeWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//계정 코드 등록
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int)$this->param['gycode'];
		$gy_name = $this->param['gy_name'];
		$gy_rem = $this->param['gy_rem'];
		
		if($gycode<100 OR $gycode>499)  throw new Exception('GyCode Numbering Error');
		
		
		if($gy_name){
			if(!$gy_name || !Util::lengthCheck($gy_name, 2, 40)) throw new Exception('GyCode Name length');
			$this->escapeString($gy_name);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//if($sys)$sql = "call sp_gycode_sys_register($co_id, $gycode, '$gy_name' ,'$gy_rem' , $uid)";
		//else
			$sql = "call sp_gycode_register($co_id, $gycode, '$gy_name' ,'$gy_rem' , $uid)";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
	//계정 리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT gycode, gy_name, gy_rem, use_yn,1 modify_yn FROM gycode where co_id = $co_id
				UNION ALL
				SELECT gycode, gy_name, gy_rem,1 use_yn, modify_yn FROM gycode_system where modify_yn='0'; ";
		
		$this->querySql($sql);
	}

	//계정 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int)$this->param['gycode'];
		
		if($gycode<100 OR $gycode>499)  throw new Exception('GyCode Numbering Error');
		//------------------------------------
		//	db work
		//-------------------------------------
		//기초에 데이터 있는지 확인  --> -1 불가
		$gichoSql ="SELECT count(*) FROM gicho_master WHERE co_id=$co_id AND gycode = $gycode";
		$this->querySql($gichoSql);
		$row = $this->fetchArrayRow();
		if($row[0]!=0) return -1;
		
		//전표에 데이터 있는지 확인 --> -2 불가
		$junpyoSql ="SELECT count(*) FROM junpyo WHERE co_id=$co_id AND gycode = $gycode";
		$this->querySql($junpyoSql);
		$row = $this->fetchArrayRow();
		if($row[0]!=0) return -2;
		
		//삭제 
		$sql = "DELETE FROM gycode WHERE  co_id = $co_id and gycode = $gycode;";
		$this->updateSql($sql);
		return '00';
	}
	
	//계정 수정
	public function requestModify(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int)$this->param['gycode'];
		$gy_name = $this->param['gy_name'];
		$gy_rem = $this->param['gy_rem'];
		$use_yn = (int)$this->param['use_yn'];
		
		if($gycode<100 OR $gycode>499)  throw new Exception('GyCode Numbering Error');
		
		//작목 이름 체크
		if($gy_name){
			if(!$gy_name || !Util::lengthCheck($gy_name, 2, 40)) throw new Exception('GyCode Name length');
			$this->escapeString($gy_name);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//if($sys)$sql = "call sp_gycode_sys_edit($co_id, $gycode, '$gy_name' ,'$gy_rem' , $uid ,$use_yn)";
		//else
			$sql = "call sp_gycode_edit($co_id, $gycode, '$gy_name' ,'$gy_rem' , $uid ,$use_yn)"; 
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
}

?>