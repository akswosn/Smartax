<?php
class DBCloseWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//# 추가 작업 
	//마감  - 세션 정보로 분개장 수정, 삭제, 추가시 조건 체크
	
	//마감 리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT `close_year` FROM `junpyo_close` where `co_id` = $co_id ;";
		$this->querySql($sql);
		
		$result = array();
		$values = array();
		
		while($item=$this->fetchMapRow()){
			array_push($result,$item['close_year']);
			array_push($values,'1');
		}
		if($this->getNumRows()> 0) $_SESSION['close_year'] = array_combine($result, $values);
		
		/*
		 $keys = array('1','2','3','4');
		 $values = array('a','b','c','d');
		 $arr = array_combine($keys, $values) ; 하면
		 */
		return $result;
	}
	
	//마감 등록
	public function requestRegister(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$close_year = (int)$this->param['close_year'];
	
		//------------------------------------
		//	db work
		//-------------------------------------
	
		$sql = "INSERT INTO `junpyo_close` (`co_id`, `close_year`, `reg_date`, `reg_uid`) 
					VALUES ($co_id, $close_year, now(), $uid);";
		$this->updateSql($sql);
		
		return $this->requestList();
	}
	
	
	//마감 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$close_year = (int)$this->param['close_year'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//삭제 
		$sql = "DELETE FROM `junpyo_close` WHERE  `co_id` = $co_id and `close_year` = $close_year;";
		$this->updateSql($sql);
		
		return $this->requestList();
	}
	
	//잔액 이월
	//1. 계정 잔액 이월
	//2. 거래처별 잔액 이월
	public function balanceCarriedOver()
	{
		//값 가져오기
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$close_year = (int)$this->param['close_year'];
		$next_year = $close_year +1;
		
		$from_yyyymmdd = $close_year.'0000'; 
		$to_yyyymmdd = $close_year.'1231';
		//산천 250
		//매직 294
		$profit_gycode = 250;
		
		$this->startTransaction();
		
		//1. 계정 잔액 이월
		/*
		 
					SELECT cash_debit+cash_credit2 cash_debit, cash_credit+cash_debit2 cash_credit
					FROM (SELECT 101 gycode,COALESCE(sum(debit),0) cash_debit FROM junpyo
					Where co_id = 30 AND jp_yyyymmdd>20140000 AND jp_yyyymmdd<=20141231 AND jp_gubun=1) AS A
					LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit FROM junpyo
					Where co_id = 30 AND jp_yyyymmdd>20140000 AND jp_yyyymmdd<=20141231 AND jp_gubun=2) AS B
					ON A.gycode = B.gycode
					LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit2,COALESCE(sum(debit),0) cash_debit2 FROM junpyo
					Where co_id = 30 AND jp_yyyymmdd>20140000 AND jp_yyyymmdd<=20141231 AND gycode=101) AS C
					ON A.gycode = C.gycode; 
		  
		 */
		//현금
		$cashSql = "SELECT cash_debit+cash_credit2 cash_debit, cash_credit+cash_debit2 cash_credit
					FROM (SELECT 101 gycode,COALESCE(sum(debit),0) cash_debit FROM junpyo
					Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=1) AS A
					LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit FROM junpyo
					Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=2) AS B
					ON A.gycode = B.gycode
					LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit2,COALESCE(sum(debit),0) cash_debit2 FROM junpyo
					Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode=101) AS C
					ON A.gycode = C.gycode;";
		
		$this->querySql($cashSql);
		$res=$this->fetchMixedRow();
		
		//기타계정
		$acctSql = "SELECT A.gycode gycode,B.debit gicho_debit,B.credit gicho_credit, C.sum_credit ,C.sum_debit
			FROM (SELECT gycode FROM gycode WHERE co_id= $co_id UNION SELECT gycode FROM gycode_system order by gycode) AS A
			LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$close_year AND co_id= $co_id) AS B
			ON A.gycode=B.gycode
			LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
			WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C
			ON A.gycode=C.gycode;";
			
		$this->querySql($acctSql);
		
		//합산 및 기초 계정에 넣기
		//1. 101 현금
		//2. 101~299 기초 계정
		//3. 손익 -> 산천 250  
		//3. 손익 -> 매직 294
		$item=$this->fetchMixedRow();
		
		/*
		$type1 = array('gycode' => '자산',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type1['children'] = array();
		$type2 = array('gycode' => '부채',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type2['children'] = array();
		$type3 = array('gycode' => '수익',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type3['children'] = array();
		$type4 = array('gycode' => '비용',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type4['children'] = array();
		*/
		$profit = 0;
		if($this->getNumRows() > 0)
		{
			while(true)
			{
				$gycode = (int)$item['gycode'];
				$gicho_debit = $item['gicho_debit'];
				$gicho_credit = $item['gicho_credit'];
				$sum_credit = $item['sum_credit'];
				$sum_debit = $item['sum_debit'];
				$sum = 0;
		
				if($gycode==101)
				{
					$sum_credit = $res['cash_credit'];
					$sum_debit = $res['cash_debit'];
				}
		
				//테이터가 없으면 리턴 안함
				if($gicho_debit==0 and $gicho_credit==0 and $sum_credit==0 and $sum_debit==0){
					if($item=$this->fetchMixedRow())  continue;
					else break;
				}
		
				if($gicho_debit=='') $gicho_debit=0;
				if($gicho_credit=='') $gicho_credit=0;
				if($sum_credit=='') $sum_credit=0;
				if($sum_debit=='') $sum_debit=0;
		
				switch ((int)($gycode/100)) {
					case 1 :
						$gicho=$gicho_debit-$gicho_credit;
						if($gycode==101)	//현금
							$sum = $sum_credit-$sum_debit+$gicho;
						else				//기타 자산 계정
							$sum = $sum_debit-$sum_credit+$gicho;
						
						$sql = "INSERT INTO `gicho_master` (`co_id`, `gycode`, `year`, `debit`, `credit`, `gubun`, `reg_date`, `reg_uid`)
									VALUES 	($co_id, $gycode, $next_year, $sum, 0, 1, now(), $uid)
								ON DUPLICATE KEY UPDATE
									`co_id` = $co_id, `gycode` = $gycode, `year` = $next_year, `debit` = $sum, `credit` = 0, `gubun` = 1, `reg_date` = now(), `reg_uid` = $uid;";
						$this->updateSql($sql);
						
						break;
					case 4 :
						//비용 계정
						$gicho=$gicho_debit-$gicho_credit;
						$sum = $sum_debit-$sum_credit+$gicho;
						$profit = $profit-$sum;
						break;
					case 2 :
						//부채 계정
						$gicho=$gicho_credit-$gicho_debit;
						$sum = $sum_credit-$sum_debit+$gicho;
						$sql = "INSERT INTO `gicho_master` (`co_id`, `gycode`, `year`, `debit`, `credit`, `gubun`, `reg_date`, `reg_uid`)
									VALUES 	($co_id, $gycode, $next_year, 0 , $sum, 1, now(), $uid)
								ON DUPLICATE KEY UPDATE
									`co_id` = $co_id, `gycode` = $gycode, `year` = $next_year, `debit` = 0, `credit` = $sum, `gubun` = 1, `reg_date` = now(), `reg_uid` = $uid;";
						$this->updateSql($sql);
						break;
					case 3 :
						//수익 계정
						$gicho=$gicho_credit-$gicho_debit;
						$sum = $sum_credit-$sum_debit+$gicho;
						$profit = $profit+$sum;
						break;
				}
					
				if($item=$this->fetchMixedRow()) echo '';
				else break;
			}
			
			//이익잉여금 넣기 - 이익잉여금 계산후 수익,비용을 통한 손익 합 
			$sql = "INSERT INTO `gicho_master` (`co_id`, `gycode`, `year`, `debit`, `credit`, `gubun`, `reg_date`, `reg_uid`)
						VALUES 	($co_id, $profit_gycode, $next_year, 0, $profit,  1, now(), $uid)
					ON DUPLICATE KEY UPDATE
						`co_id` = $co_id, `gycode` = $profit_gycode, `year` = $next_year, `debit` = 0, `credit` = $profit, `gubun` = 1, `reg_date` = now(), `reg_uid` = $uid;";
			$this->updateSql($sql);
		}
		
		//2. 거래처별 잔액 이월
		//계정 리스트 뽑기[101~299]
		$gycodeSql = "SELECT gycode FROM gycode where co_id = $co_id and gycode<300
						UNION ALL
					  SELECT gycode FROM gycode_system where modify_yn='0' and gycode<300;";
			
		$this->querySql($gycodeSql);
		
		$gycode_arr = array();
		while($item=$this->fetchMapRow()){
			array_push($gycode_arr,$item['gycode']);
		}

		foreach ($gycode_arr as $gycode) 
		{
			//1.각 계정별 거래처 뽑기
			$customerSql = " SELECT A.customer_id customer_id FROM 
								(SELECT customer_id FROM gicho_detail WHERE year=$close_year AND co_id= $co_id AND gycode=$gycode AND (debit<>0 OR credit<>0)
							UNION
								SELECT customer_id FROM junpyo WHERE co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd  
									AND customer_id<>0 group by customer_id) A ORDER BY customer_id;";
			$this->querySql($customerSql);
			
			$customer_arr = array();
			while($item=$this->fetchMapRow()){
				array_push($customer_arr,$item['customer_id']);
			}
			
			//2.거래처의 잔액 산출 - 반복
			//2-1.다음년도 거래처 기초 금액으로 등록 - 반복
			foreach ($customer_arr as $customer_id)
			{
				$sql = "SELECT debit_1+debit_2 debit ,credit_1+credit_2 credit
							FROM (SELECT COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM gicho_detail
						Where co_id = $co_id AND year=$close_year AND gycode=$gycode AND customer_id=$customer_id) AS A,
							(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo
						Where co_id = $co_id AND gycode= $gycode AND $from_yyyymmdd<jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND customer_id= $customer_id ) AS B;";
				$this->querySql($sql);
				$item=$this->fetchMapRow();
				
				//2-1.다음년도 거래처 기초 금액으로 등록 - 반복
				switch ((int)($gycode/100)) {
					case 1 :
						$sum = $item['debit']-$item['credit'];
						$sql = "INSERT INTO `gicho_detail` (`co_id`, `gycode`, `year`, `customer_id`, `debit`, `credit`, `gubun`, `reg_date`, `reg_uid`)
									VALUES 	($co_id, $gycode, $next_year,$customer_id , $sum, 0, 1, now(), $uid)
								ON DUPLICATE KEY UPDATE
								`co_id` = $co_id, `gycode` = $gycode, `year` = $next_year, `customer_id` = $customer_id, `debit` = $sum, `credit` = 0, `gubun` = 1, `reg_date` = now(), `reg_uid` = $uid;";
						$this->updateSql($sql);
						break;
					case 2 :
						//부채 계정
						$sum = $item['credit']-$item['debit'];
						$sql = "INSERT INTO `gicho_detail` (`co_id`, `gycode`, `year`, `customer_id`, `debit`, `credit`, `gubun`, `reg_date`, `reg_uid`)
									VALUES 	($co_id, $gycode, $next_year,$customer_id , 0, $sum, 1, now(), $uid)
								ON DUPLICATE KEY UPDATE
								`co_id` = $co_id, `gycode` = $gycode, `year` = $next_year, `customer_id` = $customer_id, `debit` = 0, `credit` = $sum, `gubun` = 1, `reg_date` = now(), `reg_uid` = $uid;";
						$this->updateSql($sql);
						break;
				}
			}
		}
		
		$this->commit();
		return '00';
	}
	
	//재고 이월
	public function stockCarriedOver()
	{
		//값 가져오기
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$close_year = (int)$this->param['close_year'];
		$next_year = $close_year +1;
	
		$from_yyyymmdd = $close_year.'0000';
		$to_yyyymmdd = $close_year.'1231';

	
		$this->startTransaction();
		
		//1.아이템별 기말 금액 구하기		
		$sql = "SELECT A.io_item_cd item_cd, COALESCE(io_gicho,0)+COALESCE(input,0)-COALESCE(output,0) sum
					FROM (SELECT item_cd io_item_cd FROM item WHERE co_id=$co_id) AS A 
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) io_gicho FROM gicho_io
							WHERE co_id=$co_id AND io_yyyy=$close_year  group by io_item_cd) AS B 
				ON A.io_item_cd=B.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) input FROM input_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd AND io_dt<=$to_yyyymmdd group by io_item_cd) AS E
				ON A.io_item_cd=E.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) output FROM output_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd AND io_dt<=$to_yyyymmdd group by io_item_cd) AS F 
				ON A.io_item_cd=F.io_item_cd;";
		$this->querySql($sql);
		
		//2. 아이템별로 삽입
		while($item=$this->fetchMapRow()){
			$io_item_cd = $item['item_cd'];
			$io_su = $item['sum'];
			
			$sql = "INSERT INTO gicho_io (`co_id`, `io_yyyy`, `io_item_cd`, `io_su`, `reg_date`, `reg_uid`)
								VALUES ($co_id, $next_year, $io_item_cd, $io_su, now(), $uid)
						ON DUPLICATE KEY UPDATE
					`io_yyyy` = $next_year, `io_item_cd` = $io_item_cd, `io_su` = $io_su, `reg_date` = now(),`reg_uid` = $uid;";
			$this->updateSql($sql);
		}
		
		$this->commit();
		return '00';
	}
	
}

?>