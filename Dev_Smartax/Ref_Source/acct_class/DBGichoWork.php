<?php
class DBGichoWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//등록 - 프로시져 해체 및 트랜젝션 - 마이너스 적용
	public function requestMasterInsertArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$year = (int)$this->param['year'];
		//$gubun = (int)$this->param['gubun'];
		$gubun = 1;
		$json = $this -> param["data"];
		
		//$json = "[{\"gycode\":\"100\",\"gy_am\":\"1243234\"},{\"gycode\":\"102\",\"gy_am\":\"2341232\"},{\"gycode\":\"120\",\"gy_am\":\"23423423\"}]";
		//$json = "[{'gycode':'100','gy_am':'1243234'},{'gycode':'101','gy_am':'2342341'},{'gycode':'120','gy_am':'23423423'}]";
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		
		$result=array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//$this->startTransaction();
		//$this->commit();
		//$this->rollback();
		
		for($idx=0;$idx<count($dec);$idx++){
    		$obj = $dec[$idx];
			$gycode = $obj['gycode'];
			$gy_am =  $obj['gy_am'];
			$gy_rem = "";
			$result[$gycode]='99';
			
			if(99<$gycode and $gycode<200) $gy_rem = "debit";
			else if(199<$gycode and $gycode<300) $gy_rem = "credit";
			$this->startTransaction();
			//마스터 테이블에 값넣기
			$sql = "INSERT INTO gicho_master (`co_id`,`gycode`,`year`,$gy_rem , `gubun`,`reg_date`,`reg_uid`)
						VALUES($co_id,$gycode,$year,  $gy_am, $gubun ,now(),$uid)
					ON DUPLICATE KEY UPDATE 
						`co_id` = $co_id,`gycode` = $gycode,`year` = $year, `$gy_rem` = $gy_am, `gubun` = $gubun, `reg_date` = now(), `reg_uid` = $uid;";
			$this->updateSql($sql);
			
			//디테일 합계가 마스터 보다 작은지 체크
			$sum_sql = "select COALESCE(sum($gy_rem),0) from gicho_detail where co_id = $co_id and gycode = $gycode and `year`=$year and gubun=$gubun;";
			$this->querySql($sum_sql);
			$row = $this->fetchArrayRow();
			
			//절대값 변경
			$row[0] = abs($row[0]);
			$gy_am = abs($gy_am);
			
			//비교
			if($gy_am>=$row[0])
			{
				$this->commit();
				//성공
				$result[$gycode]='100';
			}
			else
			{
				$this->rollback();
				//오류
				$result[$gycode]='999';
				//-- 거래처별 잔액보다 계정별 잔액이 작으면  999
			}
		}
		
		//기초 금액 대차 맞추기
		$co_idbalanceSql="SELECT sum(debit)-sum(credit) FROM gicho_master WHERE year=$year AND co_id=$co_id and gycode<>249";
		$this->querySql($co_idbalanceSql);
		$row = $this->fetchArrayRow();
		$value =  $row[0];
		$result['249']=$value;
		
		$fixSql ="INSERT INTO `farmsaver`.`gicho_master` (`co_id`, `gycode`, `year`, `debit`, `credit`,`gubun`, `reg_date`, `reg_uid`)
			VALUES ($co_id,249,$year,0,$value,1,now(),$uid)
			ON DUPLICATE KEY UPDATE
			`co_id` = $co_id,`gycode` = 249,`year` = $year,`debit` = 0,`credit` = $value,
			`gubun` = 1 ,`reg_date` = now() ,`reg_uid` = $uid;";
						
		$this->updateSql($fixSql);
			
		return $result;
	}
	/*
	 //등록
	public function requestMasterInsertArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$year = (int)$this->param['year'];
		//$gubun = (int)$this->param['gubun'];
		$gubun = 1;
		$json = $this -> param["data"];
		
		//$json = "[{\"gycode\":\"100\",\"gy_am\":\"1243234\"},{\"gycode\":\"102\",\"gy_am\":\"2341232\"},{\"gycode\":\"120\",\"gy_am\":\"23423423\"}]";
		//$json = "[{'gycode':'100','gy_am':'1243234'},{'gycode':'101','gy_am':'2342341'},{'gycode':'120','gy_am':'23423423'}]";
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		
		$result=array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		for($idx=0;$idx<count($dec);$idx++){
    		$obj = $dec[$idx];
			$gycode = $obj['gycode'];
			$gy_am =  $obj['gy_am'];
			
			if(99<$gycode and $gycode<200)
				$sql = "call sp_gicho_m_register($co_id, $gycode, $year , $gy_am, 0, $gubun, $uid);";
			else if(199<$gycode and $gycode<300)
				$sql = "call sp_gicho_m_register($co_id, $gycode, $year , 0, $gy_am, $gubun, $uid);";
			
			
			$this->querySql($sql);
			$row = $this->fetchArrayRow();
			
			//array_push($result, $row[0]);
			$result[$gycode]=$row[0];
			$this->mysqli->next_result(); 
		}
		
		//기초 금액 대차 맞추기
		$co_idbalanceSql="SELECT sum(debit)-sum(credit) FROM gicho_master WHERE year=$year AND co_id=$co_id and gycode<>249";
		$this->querySql($co_idbalanceSql);
		$row = $this->fetchArrayRow();
		$value =  $row[0];
		$result['249']=$value;
		
		
		$fixSql ="INSERT INTO `farmsaver`.`gicho_master` (`co_id`, `gycode`, `year`, `debit`, `credit`,`gubun`, `reg_date`, `reg_uid`)
			VALUES ($co_id,249,$year,0,$value,1,now(),$uid)
			ON DUPLICATE KEY UPDATE
			`co_id` = $co_id,`gycode` = 249,`year` = $year,`debit` = 0,`credit` = $value,
			`gubun` = 1 ,`reg_date` = now() ,`reg_uid` = $uid;";
		$this->updateSql($fixSql);
			
		return $result;
	}
	
	
	
	 public function requestMasterRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int)$this->param['gycode'];
		$year = (int)$this->param['year'];
		//$gubun = (int)$this->param['gubun'];
		$gy_am = (int)$this->param['gy_am'];
					
		if($gycode<100 OR $gycode>499)  throw new Exception('GyCode Numbering Error');
		//------------------------------------
		//	db work
		//-------------------------------------
		
		if(99<$gycode and $gycode<200)
			$sql = "call sp_gicho_m_register($co_id, $gycode, $year , $gy_am, 0,1, $uid)";
		else if(199<$gycode and $gycode<300)
			$sql = "call sp_gicho_m_register($co_id, $gycode, $year , 0, $gy_am,1, $uid)";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	 */
	//리스트
	public function requestMasterList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$year = (int)$this->param['year'];
		//$gubun = (int)$this->param['gubun'];	
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "call sp_gicho_m_list($co_id, $year , 1)";
		
		$this->querySql($sql);
		
	}

	/*
	//등록 - 현재 사용 안함
	public function requestDetailRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int)$this->param['gycode'];
		$year = (int)$this->param['year'];
		//$debit = (int)$this->param['debit'];
		//$credit = (int)$this->param['credit'];
		//$gubun = (int)$this->param['gubun'];	
		$customer_id = (int)$this->param['customer_id'];
		$gy_am = (int)$this->param['gy_am'];


		if($gycode<100 OR $gycode>499)  throw new Exception('GyCode Numbering Error');			
		//------------------------------------
		//	db work
		//-------------------------------------
		
		if(99<$gycode and $gycode<200)
			$sql = "call sp_gicho_d_register($co_id, $gycode, $year , $gy_am, 0,1, $uid,$customer_id)";
		else if(199<$gycode and $gycode<300)
			$sql = "call sp_gicho_d_register($co_id, $gycode, $year , 0, $gy_am,1, $uid,$customer_id)";
		
		$this->querySql($sql);
		
		$row = $this->fetchArrayRow();

		if($row[0]==0) return 0;
		else return $row[0];
	}
	*/

	//등록
	//마스터 테이블 값이 크다 99
	//성공 100 - 프로시져 해체, 마이너스 적용
	public function requestDetailInsertArray(){
		$gubun = 1;
		$year =(int) $this -> param["year"];
		$gycode =(int) $this -> param["gycode"];
		
		if($gycode==0 or $year==0) return new Exception("gycode //year param error!");
		
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		$json = $this -> param["data"];
		//echo "$json<br/>"; 
		//$json = "[{\"gy_am\":\"3000\",\"customer_id\":\"92\"},{\"gy_am\":\"2000\",\"customer_id\":\"91\"},{\"gy_am\":\"1000\",\"customer_id\":\"90\"}]";
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$sum = 0;
		$length = count($dec);
		$result['cd'] = array();
		$f_result['cd'] = array();
		
		$amt="debit";
		// 계정
		if(99<$gycode and $gycode<200) $amt="debit";
		else if(199<$gycode and $gycode<300) $amt="credit";
		
		//마스터 값
		$sql = "select $amt from gicho_master where co_id = $co_id and gycode = $gycode	and year=$year and gubun=$gubun";
		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		$sum=$row[0];
		
		//트랜젝션 시작
		$this->startTransaction();
				
		//데이터 입력
		for($idx=0;$idx<$length;$idx++){
    		$obj = $dec[$idx];
			$mt=(int)$obj['tr_am'];
			$cus=(int)$obj['customer_id'];
			
			if($cus==0) return new Exception("cus --> $cus param error!");
			
			$row_idx=$obj['row_idx'];
    		//$sum+=(int)$obj["gy_am"];
    		
    		if($mt==0){
    			//Delete
	    		$sql = "DELETE FROM gicho_detail
	    					WHERE `co_id` = $co_id AND `gycode` =$gycode AND `year` = $year AND `customer_id` = $cus;";
			}
			else
			{
				//Insert and Update
				$sql = "INSERT INTO gicho_detail (co_id,gycode,year,$amt,gubun,reg_date,reg_uid,customer_id) 
						VALUES($co_id,$gycode,$year,$mt,$gubun,now(),$uid, $cus)
					ON DUPLICATE KEY UPDATE 				
					`co_id` = $co_id,`gycode` = $gycode,`year` = $year,`customer_id` = $cus,
						$amt = $mt,`gubun` = 1 ,`reg_date` = now(), `reg_uid` = $uid ";
			}
			//echo "$sql <br/>";
			$this->updateSql($sql);
			array_push($result['cd'],$row_idx);
		}
		//echo "5 <br/>";
		
		$sql= "select sum($amt) sum from gicho_detail where co_id = $co_id and gycode = $gycode and year= $year and gubun=$gubun";
		$this->querySql($sql);
		$row = $this->fetchArrayRow();

		if($row[0] >=0)
		{
			if($sum>=$row[0])
			{
				//종료 커밋
				$this->commit();
				//성공
				return $result;
			}
			else
			{
				//오류
				$this->rollback();
				//오류
				return $f_result;
			}
		}
		else
		{
			if($sum<=$row[0])
			{
				//종료 커밋
				$this->commit();
				//성공
				return $result;
			}
			else
			{
				//오류
				$this->rollback();
				//오류
				return $f_result;
			}
		}
		
	}
	
	
	//리스트
	public function requestDetailList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int)$this->param['gycode'];
		$year = (int)$this->param['year'];
		//$gubun = (int)$this->param['gubun'];	
		
		if($gycode<100 OR $gycode>499)  throw new Exception('GyCode Numbering Error');
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "call sp_gicho_d_list($co_id, $gycode, $year , 1)";
		
		$this->querySql($sql);
		
	}
}

?>