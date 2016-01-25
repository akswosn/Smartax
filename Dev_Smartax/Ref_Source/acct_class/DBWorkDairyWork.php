<?php
class DBWorkDairyWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//등록
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		$work_date = $this->param['work_date'];
		$jakmok_cd = (int)$this->param['jakmok_cd'];
		$work_cd = (int)$this->param['work_cd'];
		$weather_cd = (int)$this->param['weather_cd'];
		$work_area = (int)$this->param['work_area'];
		$work_man  = (int)$this->param['work_man'];
		$work_time = (int)$this->param['work_time'];
		$work_job = $this->param['work_job'];
		
		if($work_date){
			if(!$work_date || !Util::lengthCheck($work_date, 8, 8)) throw new Exception('Work Date length');
		}
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		//$sql = "call sp_workdairy_register($co_id, '$work_date', $jakmok_cd, $work_cd, $weather_cd, $uid, $work_area, $work_man, $work_time , '$work_job')";
		
		$sql = "INSERT INTO workdairy	(co_id, work_date, jakmok_cd, work_cd, weather_cd, reg_uid, reg_date, work_area, work_man,
											work_time, work_job)
					VALUES ($co_id, STR_TO_DATE('$work_date', '%Y%m%d'),$jakmok_cd,$work_cd, $weather_cd,$uid,now(), $work_area, $work_man,
											$work_time,'$work_job');";
		
		$this->updateSql($sql);
		
		$id = $this->insert_id();

		if($id==0) return 0;
		else return $id;
	}
	
	//리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$work_date = (int)$this->param['work_date'];
		
		if($work_date){
			if(!$work_date || !Util::lengthCheck($work_date, 6, 6)) throw new Exception('Work Date length');
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//$sql = "call sp_workdairy_list($co_id ,$work_date)";
		$sql = "SELECT _id,co_id,work_date,jakmok_cd,work_cd,weather_cd,reg_uid,work_area,work_man,work_time,work_job
				FROM workdairy WHERE date(work_date) >= date(STR_TO_DATE(concat($work_date,'01'), '%Y%m%d')) 
						AND date(STR_TO_DATE(concat($work_date,'01'), '%Y%m%d')) <= LAST_DAY(STR_TO_DATE(concat($work_date,'01'), '%Y%m%d')) AND co_id=$co_id
				order by work_date ASC;";
		
		$this->querySql($sql);
	}
	
	//검색+ 조회
	public function requestSearch(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_work_date = (int)$this->param['from_work_date'];
		$to_work_date = (int)$this->param['to_work_date'];
		$jakmok_cd = (int)$this->param['jakmok_cd'];
		
		if(!$from_work_date || !Util::lengthCheck($from_work_date, 8, 8)) throw new Exception('Work Date length');
		if(!$to_work_date || !Util::lengthCheck($to_work_date, 8, 8)) throw new Exception('Work Date length');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//$sql = "call sp_workdairy_list($co_id ,$work_date)";
		$sql = "SELECT _id,co_id,work_date,jakmok_cd,work_cd,weather_cd,reg_uid,work_area,work_man,work_time,work_job
				FROM workdairy WHERE co_id=$co_id AND date(work_date) >= date(STR_TO_DATE('$from_work_date', '%Y%m%d')) 
						AND date(work_date) <= date(STR_TO_DATE('$to_work_date', '%Y%m%d')) ";
		if($jakmok_cd) $sql=$sql." AND jakmok_cd=$jakmok_cd";
		$sql=$sql." order by work_date ASC;";
		
		//throw new Exception($sql);
		
		$this->querySql($sql);
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
		$sql = "DELETE FROM workdairy WHERE co_id = $co_id and `_id` = $_id;";
		
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
		$work_date = $this->param['work_date'];
		$jakmok_cd = (int)$this->param['jakmok_cd'];
		$work_cd = (int)$this->param['work_cd'];
		$weather_cd = (int)$this->param['weather_cd'];
		$work_area = (int)$this->param['work_area'];
		$work_man  = (int)$this->param['work_man'];
		$work_time = (int)$this->param['work_time'];
		$work_job = $this->param['work_job'];
		
				
		if($work_date){
			if(!$work_date || !Util::lengthCheck($work_date, 8, 8)) throw new Exception('Work Date length');
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------		
		
		//$sql = "call sp_workdairy_edit($_id, $co_id, '$work_date', $jakmok_cd, $work_cd, $weather_cd, $uid, $work_area, $work_man, $work_time , '$work_job')";
		
		$sql = "UPDATE workdairy 
					SET
						`work_date` = '$work_date', `jakmok_cd` = $jakmok_cd, `work_cd` = $work_cd,	`weather_cd` = $weather_cd,
						`reg_uid` = $uid,	`reg_date` = NOW(), `work_area` = $work_area, `work_man` = $work_man,
						`work_time` = $work_time, `work_job` = '$work_job'
			WHERE _id=$_id and co_id = $co_id;";

		$this->updateSql($sql);
	}
	
}

?>