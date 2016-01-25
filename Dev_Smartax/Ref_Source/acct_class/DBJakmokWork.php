<?php
class DBJakmokWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//작목등록
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jakmok_code = (int)$this->param['jakmok_code'];
		$jakmok_name = $this->param['jakmok_name'];
		$in_type = (int)$this->param['in_type'];
		
		//작목 이름 체크
		if($jakmok_name){
			if(!$jakmok_name || !Util::lengthCheck($jakmok_name, 2, 20)) throw new Exception('JokMok_Name length');
			$this->escapeString($jakmok_name);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		$sql = "call sp_jakmok_register($co_id, $jakmok_code, '$jakmok_name' , $uid, $in_type)";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
	//작목리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$in_type = (int)$this->param['in_type'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "call sp_jakmok_list($co_id, $in_type)";
		
		$this->querySql($sql);
		
	}

	//작목 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jakmok_code = (int)$this->param['jakmok_code'];
		$in_type = (int)$this->param['in_type'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//전표 또는 영농일지에 있는지 확인 --> -1 불가
		if($in_type==99)
			$sql = "SELECT count(*) FROM workdairy WHERE co_id=$co_id AND jakmok_cd = $jakmok_code;";
		else 
			$sql = "SELECT count(*) FROM junpyo WHERE co_id=$co_id AND jakmok_code = $jakmok_code;";
		
		$this->querySql($sql);
		$row = $this->fetchMixedRow();
		if($row[0]!=0) return -1;
		
		if($in_type==99)
			$sql = "DELETE FROM work_jakmok WHERE  co_id = $co_id and jakmok_code = $jakmok_code;";
		else 
			$sql = "DELETE FROM jakmok WHERE  co_id = $co_id and jakmok_code = $jakmok_code;";
		
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
		$jakmok_code = (int)$this->param['jakmok_code'];
		$jakmok_name = $this->param['jakmok_name'];
		$use_yn = (int)$this->param['use_yn'];
		$in_type = (int)$this->param['in_type'];
		
		//작목 이름 체크
		if($jakmok_name){
			if(!$jakmok_name || !Util::lengthCheck($jakmok_name, 2, 20)) throw new Exception('JokMok_Name length');
			$this->escapeString($jakmok_name);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "call sp_jakmok_edit($co_id, $jakmok_code, '$jakmok_name' , $uid, $use_yn, $in_type)";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
}

?>