<?php
class DBWorkCdWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//작업 코드 등록
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$work_cd = (int)$this->param['work_cd'];
		$work_nm = $this->param['work_nm'];
				
		//작목 이름 체크
		if($work_nm){
			if(!$work_nm || !Util::lengthCheck($work_nm, 2, 45)) throw new Exception('Work Code Name length');
			$this->escapeString($work_nm);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		$sql = "call sp_work_cd_register($co_id, $work_cd, '$work_nm' , $uid)";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
	//작업 코드 리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$in_type = (int)$this->param['in_type'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "call sp_work_cd_list($co_id)";
		
		$this->querySql($sql);
		
	}

	//작업 코드 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$work_cd = (int)$this->param['work_cd'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//영농일지에 있는지 확인 --> -1 불가
		$sql = "SELECT count(*) FROM workdairy WHERE co_id=$co_id AND work_cd = $work_cd;";
		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		if($row[0]!=0) return -1;
		
		$sql = "DELETE FROM work_cd WHERE  co_id = $co_id and work_cd = $work_cd;";
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
		$work_cd = (int)$this->param['work_cd'];
		$work_nm = $this->param['work_nm'];
		$use_yn = $this->param['use_yn'];
				
		//작목 이름 체크
		if($work_nm){
			if(!$work_nm || !Util::lengthCheck($work_nm, 2, 45)) throw new Exception('Work Code Name length');
			$this->escapeString($work_nm);
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		$sql = "call sp_work_cd_edit($co_id, $work_cd, '$work_nm' , $uid, '$use_yn')";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	
}

?>