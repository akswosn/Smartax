<?php
class DBMemorialWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	
	//리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		$search = $this->param['search'];
		
		if(!$from_yyyymmdd || !Util::lengthCheck($from_yyyymmdd, 8, 8)) throw new Exception('Date length');
		if(!$to_yyyymmdd || !Util::lengthCheck($to_yyyymmdd, 8, 8)) throw new Exception('Date length');
		
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT _id, co_id, yyyymmdd, memorial, input_type, reg_uid, user_nick
					FROM memorial_day, user_info WHERE co_id=$co_id AND yyyymmdd>=$from_yyyymmdd AND yyyymmdd<=$to_yyyymmdd AND user_info.uid = memorial_day.reg_uid 
					 ";
		
		if($search){
			$sql=$sql." AND memorial like '%$search%' order by yyyymmdd;";
		}
		else 
		{
			$sql=$sql." order by yyyymmdd;";
		}
		
		$this->querySql($sql);
	}
	

	
	
	//등록
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		$yyyymmdd = (int)$this->param['yyyymmdd'];
		$memorial = $this->param['memorial'];
		$input_type = (int)$this->param['input_type'];

		if(!$yyyymmdd || !Util::lengthCheck($yyyymmdd, 8, 8)) throw new Exception('Date length');
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		$sql = "INSERT INTO memorial_day ( `co_id`, `yyyymmdd`, `memorial`, `input_type`, `reg_date`, `reg_uid`)
					VALUES ($co_id, $yyyymmdd, '$memorial', '$input_type', now(), $uid);";
		
		$this->updateSql($sql);
		
		return $this->insert_id();
	}
	
	
	
	//삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$_id = (int)$this->param['_id'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "DELETE FROM memorial_day WHERE co_id = $co_id and `_id` = $_id;";
		$this->updateSql($sql);
		
		return 1;
	}
	
	
	// 수정
	public function requestModify(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		$_id = (int)$this->param['_id'];
		$yyyymmdd = (int)$this->param['yyyymmdd'];
		$memorial = $this->param['memorial'];
		$input_type = (int)$this->param['input_type'];
				
		if(!$yyyymmdd || !Util::lengthCheck($yyyymmdd, 8, 8)) throw new Exception('Date length');
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		$sql = "UPDATE memorial_day SET
				`yyyymmdd` = $yyyymmdd, `memorial` = '$memorial', `input_type` = $input_type,
				`reg_date` = now(), `reg_uid` = $uid WHERE co_id = $co_id and `_id` = $_id;";

		$this->updateSql($sql);
		
		return 1;
	}
	
}

?>