<?php

class DBAcctReportWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//회계표
	public function requestAcctReportList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymm = $this -> param["jp_yyyymm"];
		$jp_yyyy=substr($jp_yyyymm,0,4);
		//$jp_yyyy2= substr($jp_yyyymm,0,6);
		
		//$to_yyyymmdd = $jp_yyyy2.'40';
		
		$to_yyyymmdd = $jp_yyyymm;
		$from_yyyymmdd = $jp_yyyy.'0000';
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//현금 쿼리 (입금, 출금)
		//리턴 
		/*
		$cashSql = "SELECT cash_debit, cash_credit
					FROM (SELECT 101 gycode,sum(debit) cash_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=1) AS A 
					LEFT OUTER JOIN (SELECT 101 gycode,sum(credit) cash_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=2) AS B
	 				ON A.gycode = B.gycode;";
		*/
		
		$cashSql = "SELECT cash_debit+cash_credit2 cash_debit, cash_credit+cash_debit2 cash_credit
					FROM (SELECT 101 gycode,COALESCE(sum(debit),0) cash_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=1) AS A 
					LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=2) AS B
	 				ON A.gycode = B.gycode
	 				LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit2,COALESCE(sum(debit),0) cash_debit2 FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode=101) AS C
	 				ON A.gycode = C.gycode;";
		
		//throw new Exception($cashSql1);
		
		$this->querySql($cashSql);
		$cash_data=$this->fetchMixedRow();
		
		//나머지  + 현금 데이터
		$acctSql = "SELECT A.gycode gycode,B.debit gicho_debit,B.credit gicho_credit, C.sum_credit ,C.sum_debit 
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id UNION SELECT gycode FROM gycode_system order by gycode) AS A 
						LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$jp_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode 
						LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo 
						WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C 
						ON A.gycode=C.gycode;";
	 					
		$this->querySql($acctSql);
		
		return $cash_data;
		
	}
	
	//회계표 - 일계표
	public function requestAcctReportDayList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymmdd = $this -> param["jp_yyyymmdd"]; //20141004
		$jp_yyyy=substr($jp_yyyymmdd,0,4); //2014
		$to_yyyymmdd = ((int)$jp_yyyymmdd)-1; //20141003		
		$from_yyyymmdd = $jp_yyyy.'0000'; //20140000
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//현금 쿼리 (입금, 출금)
		//리턴 
		$cashSql = "SELECT cash_debit+cash_credit2 cash_debit, cash_credit+cash_debit2 cash_credit, c_debit, c_credit
										FROM 
					(SELECT 101 gycode,COALESCE(sum(debit),0) cash_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=1) AS A 
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=2) AS B
						ON A.gycode = B.gycode
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit2,COALESCE(sum(debit),0) cash_debit2 FROM junpyo
						Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode=101) AS C
					ON A.gycode = C.gycode
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(debit),0)+COALESCE(sum(credit),0) c_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd=$jp_yyyymmdd AND (jp_gubun=2 or (jp_gubun=3 AND gycode=101))) AS D
					ON A.gycode = D.gycode
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(credit),0)+COALESCE(sum(debit),0) c_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd=$jp_yyyymmdd AND (jp_gubun=1 or (jp_gubun=4 AND gycode=101))) AS E
					ON A.gycode = E.gycode;";
		
		//throw new Exception($cashSql1);
		
		$this->querySql($cashSql);
		$cash_data=$this->fetchMixedRow();
		
		//나머지  + 현금 데이터
		$acctSql = "SELECT A.gycode gycode,B.debit gicho_debit,B.credit gicho_credit, C.sum_credit ,C.sum_debit , D.r_debit, D.r_credit
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id UNION SELECT gycode FROM gycode_system order by gycode) AS A 
						LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$jp_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode 
						LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo 
						WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C 
						ON A.gycode=C.gycode
						LEFT OUTER JOIN (SELECT gycode,sum(credit) r_credit ,sum(debit) r_debit FROM junpyo 
						WHERE co_id = $co_id AND jp_yyyymmdd=$jp_yyyymmdd Group by gycode) AS D 
						ON A.gycode=D.gycode;";
	 					
		$this->querySql($acctSql);
		
		return $cash_data;
		
	}
	
	//회계표 - 월계표
	public function requestAcctReportMonthList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		/*
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymmdd = 20140800;
		$from_yyyymmdd = 20140000; 
		$to_yyyymmdd1 = 20140800;
		$to_yyyymmdd2 = 20140900;
		$jp_yyyy = 2014;
		*/
		$to_yyyymmdd = ((int)$jp_yyyymmdd)-1; //20141003		
		$from_yyyymmdd = $jp_yyyy.'0000'; //20140000
		
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymmdd = $this -> param["jp_yyyymmdd"]; //20141200
		$jp_yyyy=substr($jp_yyyymmdd,0,4); //2014
		$from_yyyymmdd = $jp_yyyy.'0000'; //20140000
		
		$jp_mm=(int)substr($jp_yyyymmdd,4,2); //12
		//$to_yyyymmdd1 = $jp_yyyy.$jp_mm.'00'; //20141200
		$to_yyyymmdd1 = $jp_yyyymmdd; //20141200
						
		if($jp_mm<9){
			 $to_yyyymmdd2 = $jp_yyyy.'0'.($jp_mm+1).'00';	//20141300
		}else{
			 $to_yyyymmdd2 = $jp_yyyy.($jp_mm+1).'00';	//20141300
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		//현금 쿼리 (입금, 출금)
		//리턴 
		
		$cashSql = "SELECT cash_debit+cash_credit2 cash_debit, cash_credit+cash_debit2 cash_credit, c_debit, c_credit
					FROM 
					(SELECT 101 gycode,COALESCE(sum(debit),0) cash_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd1 AND jp_gubun=1) AS A 
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd1 AND jp_gubun=2) AS B
						ON A.gycode = B.gycode
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit2,COALESCE(sum(debit),0) cash_debit2 FROM junpyo
						Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd1 AND gycode=101) AS C
					ON A.gycode = C.gycode
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(debit),0)+COALESCE(sum(credit),0) c_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$to_yyyymmdd1 AND jp_yyyymmdd<$to_yyyymmdd2 AND (jp_gubun=2 or (jp_gubun=3 AND gycode=101))) AS D
					ON A.gycode = D.gycode
					LEFT OUTER JOIN 
					(SELECT 101 gycode,COALESCE(sum(credit),0)+COALESCE(sum(debit),0) c_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$to_yyyymmdd1 AND jp_yyyymmdd<$to_yyyymmdd2 AND (jp_gubun=1 or (jp_gubun=4 AND gycode=101)))  AS E
					ON A.gycode = E.gycode;";
		
		$this->querySql($cashSql);
		$cash_data=$this->fetchMixedRow();
		
		//나머지  + 현금 데이터
	 	$acctSql = "SELECT A.gycode gycode,B.debit gicho_debit,B.credit gicho_credit, C.sum_credit ,C.sum_debit , D.r_debit, D.r_credit
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id UNION SELECT gycode FROM gycode_system order by gycode) AS A 
						LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$jp_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode 
						LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo 
						WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd1 Group by gycode) AS C 
						ON A.gycode=C.gycode
						LEFT OUTER JOIN (SELECT gycode,sum(credit) r_credit ,sum(debit) r_debit FROM junpyo 
						WHERE co_id = $co_id AND jp_yyyymmdd>$to_yyyymmdd1 AND jp_yyyymmdd<$to_yyyymmdd2 Group by gycode) AS D 
						ON A.gycode=D.gycode;";
						
		$this->querySql($acctSql);
		
		return $cash_data;
		
	}

	
	//월별 손익
	public function requestProfitReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymm = $this -> param["from_yyyymm"];
		$to_yyyymm = $this -> param["to_yyyymm"];
		$jakmok_code = $this -> param["jakmok_code"];
		
		$start_yyyy =(int)substr($from_yyyymm,0,4);
		$start_mm =(int)substr($from_yyyymm,4,2);
		$end_yyyy =(int)substr($to_yyyymm,0,4);
		$end_mm =(int)substr($to_yyyymm,4,2);
		
		$col_array =array();
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$idx_yyyy=$start_yyyy;
		$idx_mm=$start_mm;
		
		$profitSql1 = "SELECT GYCODE.gycode gycode";
		$profitSql2 = " FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>299 
								UNION 
								SELECT gycode FROM gycode_system WHERE gycode>299 order by gycode) AS GYCODE";
		$profitSql3 ="";
		while(TRUE){
			if($idx_mm<9){
				 $idx_mm='0'.$idx_mm;
			 }else if($idx_mm==9){
				$idx_mm='0'.$idx_mm;
			 }
			
			
			$col1='C'.$idx_yyyy.$idx_mm;
			$col2='D'.$idx_yyyy.$idx_mm;
			$outputCol = $idx_yyyy.'-'.$idx_mm;
			
			$start_yyyyddmm =$idx_yyyy.$idx_mm.'00'; 
			$end_yyyyddmm =$idx_yyyy.$idx_mm.'32';
			
			array_push($col_array,$col1,$col2,$outputCol);
			
			$profitSql1 =$profitSql1." , $col1, $col2";
			if($jakmok_code==0 or $jakmok_code==null)
			{
				$profitSql3 =$profitSql3." LEFT OUTER JOIN (SELECT gycode,sum(credit) $col1, sum(debit) $col2 FROM junpyo
										Where co_id = $co_id AND jp_yyyymmdd>$start_yyyyddmm AND jp_yyyymmdd<$end_yyyyddmm AND gycode>299 
										Group by gycode) AS $col1 ON GYCODE.gycode=$col1.gycode ";
			}
			else {
					$profitSql3 =$profitSql3." LEFT OUTER JOIN (SELECT gycode,sum(credit) $col1, sum(debit) $col2 FROM junpyo
										Where co_id = $co_id AND jp_yyyymmdd>$start_yyyyddmm AND jp_yyyymmdd<$end_yyyyddmm AND gycode>299 
										AND jakmok_code=$jakmok_code Group by gycode) AS $col1 ON GYCODE.gycode=$col1.gycode ";
			}
									
			//인덱스 체크
			if($end_yyyy==$idx_yyyy and $end_mm==$idx_mm) break;
			
			$idx_mm++;
			if($idx_mm==13)
			{
				$idx_yyyy++;
				$idx_mm=1;
			}
		}
		
		//throw new Exception($profitSql1.$profitSql2.$profitSql3);
		// $profitSql1.$profitSql2.$profitSql3."<br><br>";
						
		$this->querySql($profitSql1.$profitSql2.$profitSql3);
		
		return $col_array;
	}
	
	
	//결산서 -> 대차대조표, 손익 게산서
	public function requestBalanceSheet(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$to_yyyymm = $this -> param["to_yyyymm"];
		
		$start_yyyy =substr($to_yyyymm,0,4);
		$from_yyyymmdd = $start_yyyy.'0000';
		$to_yyyymmdd = $to_yyyymm.'32';
		//------------------------------------
		//	db work
		//-------------------------------------
		//total
		
		$sql = "SELECT A.gycode gycode, COALESCE(debit,0)-COALESCE(credit,0)+COALESCE(cash_credit,0)-COALESCE(cash_debit,0)-COALESCE(cash_credit2,0)+COALESCE(cash_debit2,0) tr_am
					FROM (SELECT 101 gycode) AS A
						LEFT OUTER JOIN (SELECT 101 gycode, debit, credit FROM gicho_master
								Where co_id = $co_id AND gycode=101 AND year=$start_yyyy) AS B
						ON A.gycode = B.gycode
						LEFT OUTER JOIN (SELECT 101 gycode, sum(debit) cash_debit FROM junpyo
								Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd AND jp_gubun=1) AS C 
						ON A.gycode = C.gycode
						LEFT OUTER JOIN (SELECT 101 gycode ,sum(credit) cash_credit FROM junpyo
								Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd AND jp_gubun=2) AS D
						ON A.gycode = D.gycode
						LEFT OUTER JOIN (SELECT 101 gycode,sum(credit) cash_credit2,sum(debit) cash_debit2 FROM junpyo
									Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd AND gycode=101) AS E
						ON A.gycode = E.gycode
				UNION ALL
				SELECT A.gycode gycode,COALESCE(B.debit,0)-COALESCE(B.credit,0)+COALESCE(C.sum_debit,0)-COALESCE(C.sum_credit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>101 AND gycode<200 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>101 AND gycode<200 order by gycode) AS A 
	 				LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode
				UNION ALL
				SELECT A.gycode gycode,COALESCE(B.credit,0)-COALESCE(B.debit,0)+COALESCE(C.sum_credit,0)-COALESCE(C.sum_debit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>199 AND gycode<300 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>199 AND gycode<300 order by gycode) AS A 
	 				LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode
				UNION ALL	
				SELECT A.gycode gycode,COALESCE(C.sum_credit,0)-COALESCE(C.sum_debit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>299 AND gycode<400 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>299 AND gycode<400 order by gycode) AS A 
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode
				UNION ALL
				SELECT A.gycode gycode,COALESCE(C.sum_debit,0)-COALESCE(C.sum_credit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>399 AND gycode<500 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>399 AND gycode<500 order by gycode) AS A
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode;";
		
		
		
		/*
		$sql = "SELECT A.gycode gycode, COALESCE(debit,0)-COALESCE(credit,0)+COALESCE(cash_credit,0)-COALESCE(cash_debit,0) tr_am
				FROM (SELECT 101 gycode, sum(debit) cash_debit FROM junpyo
						Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd AND jp_gubun=1) AS A 
				LEFT OUTER JOIN (SELECT 101 gycode ,sum(credit) cash_credit FROM junpyo
						Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd AND jp_gubun=2) AS B
				ON A.gycode = B.gycode
				LEFT OUTER JOIN (SELECT 101 gycode, debit, credit FROM gicho_master
						Where co_id = $co_id AND gycode=101 AND year=$start_yyyy) AS C
				ON A.gycode = C.gycode
				UNION ALL
				SELECT A.gycode gycode,COALESCE(B.debit,0)-COALESCE(B.credit,0)+COALESCE(C.sum_debit,0)-COALESCE(C.sum_credit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>101 AND gycode<200 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>101 AND gycode<200 order by gycode) AS A 
	 				LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode
				UNION ALL
				SELECT A.gycode gycode,COALESCE(B.credit,0)-COALESCE(B.debit,0)+COALESCE(C.sum_credit,0)-COALESCE(C.sum_debit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>199 AND gycode<300 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>199 AND gycode<300 order by gycode) AS A 
	 				LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id) AS B 
						ON A.gycode=B.gycode
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode
				UNION ALL	
				SELECT A.gycode gycode,COALESCE(C.sum_credit,0)-COALESCE(C.sum_debit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>299 AND gycode<400 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>299 AND gycode<400 order by gycode) AS A 
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode
				UNION ALL
				SELECT A.gycode gycode,COALESCE(C.sum_debit,0)-COALESCE(C.sum_credit,0) tr_am
						FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>399 AND gycode<500 UNION 
								SELECT gycode FROM gycode_system WHERE gycode>399 AND gycode<500 order by gycode) AS A
	 				LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
									WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<$to_yyyymmdd Group by gycode) AS C 
	 					ON A.gycode=C.gycode;";
		*/
		//throw new Exception($sql);
		$this->querySql($sql);
	}
	
	//결산서 -> 대차대조표, 손익 게산서
	public function requestBalanceSheetAdv(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =substr($to_yyyymmdd,0,4);
		$from_yyyymmdd = $start_yyyy.'0000';
		//------------------------------------
		//	db work
		//-------------------------------------
		//total
	
		$sql = "SELECT A.gycode gycode, COALESCE(debit,0)-COALESCE(credit,0)+COALESCE(cash_credit,0)-COALESCE(cash_debit,0)-COALESCE(cash_credit2,0)+COALESCE(cash_debit2,0) tr_am
		FROM (SELECT 101 gycode) AS A
		LEFT OUTER JOIN (SELECT 101 gycode, debit, credit FROM gicho_master
		Where co_id = $co_id AND gycode=101 AND year=$start_yyyy) AS B
		ON A.gycode = B.gycode
		LEFT OUTER JOIN (SELECT 101 gycode, sum(debit) cash_debit FROM junpyo
		Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=1) AS C
		ON A.gycode = C.gycode
		LEFT OUTER JOIN (SELECT 101 gycode ,sum(credit) cash_credit FROM junpyo
		Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=2) AS D
		ON A.gycode = D.gycode
		LEFT OUTER JOIN (SELECT 101 gycode,sum(credit) cash_credit2,sum(debit) cash_debit2 FROM junpyo
		Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode=101) AS E
		ON A.gycode = E.gycode
		UNION ALL
		SELECT A.gycode gycode,COALESCE(B.debit,0)-COALESCE(B.credit,0)+COALESCE(C.sum_debit,0)-COALESCE(C.sum_credit,0) tr_am
		FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>101 AND gycode<200 UNION
		SELECT gycode FROM gycode_system WHERE gycode>101 AND gycode<200 order by gycode) AS A
		LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id) AS B
		ON A.gycode=B.gycode
		LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
		WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C
		ON A.gycode=C.gycode
		UNION ALL
		SELECT A.gycode gycode,COALESCE(B.credit,0)-COALESCE(B.debit,0)+COALESCE(C.sum_credit,0)-COALESCE(C.sum_debit,0) tr_am
		FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>199 AND gycode<300 UNION
		SELECT gycode FROM gycode_system WHERE gycode>199 AND gycode<300 order by gycode) AS A
		LEFT OUTER JOIN (SELECT gycode,debit,credit FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id) AS B
		ON A.gycode=B.gycode
		LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
		WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C
		ON A.gycode=C.gycode
		UNION ALL
		SELECT A.gycode gycode,COALESCE(C.sum_credit,0)-COALESCE(C.sum_debit,0) tr_am
		FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>299 AND gycode<400 UNION
		SELECT gycode FROM gycode_system WHERE gycode>299 AND gycode<400 order by gycode) AS A
		LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
		WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C
		ON A.gycode=C.gycode
		UNION ALL
		SELECT A.gycode gycode,COALESCE(C.sum_debit,0)-COALESCE(C.sum_credit,0) tr_am
		FROM (SELECT gycode FROM gycode WHERE co_id= $co_id AND gycode>399 AND gycode<500 UNION
		SELECT gycode FROM gycode_system WHERE gycode>399 AND gycode<500 order by gycode) AS A
		LEFT OUTER JOIN (SELECT gycode,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo
		WHERE co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by gycode) AS C
		ON A.gycode=C.gycode;";
	
		$this->querySql($sql);
	}
	
	
	//현금 출납부
	public function requestCashReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		$from_dd = substr($from_yyyymmdd,6,2);
		$from_dd-=1;
		
		if($from_dd>9)
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
		else
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$sql = "SELECT -1 jp_yyyymmdd, '전월이월' jp_rem, -1 customer_id, debit_1+credit_2 credit,credit_1+debit_2 debit,-1 jp_id,-1 jp_no,-1 jp_match_id 
				FROM (SELECT sum(credit) credit_1, sum(debit) debit_1 FROM gicho_master	Where co_id = $co_id AND year=$start_yyyy AND gycode=101) AS A,
					(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND (jp_gubun=1 or jp_gubun=2) 						
						AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 ) AS B
				UNION ALL
				SELECT  jp_yyyymmdd,jp_rem,customer_id, credit, debit,  jp_id ,jp_no ,jp_match_id FROM junpyo
					Where co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd
					AND (jp_gubun=1 or jp_gubun=2);";
		*/
		
		$sql = "SELECT A.jp_yyyymmdd jp_yyyymmdd,-1 jp_no,-1 jp_id, '전월이월' jp_rem, -1 customer_id, debit_1+credit_2+debit_3 credit,credit_1+debit_2+credit_3 debit,-1 jp_match_id 
						FROM (SELECT -1 jp_yyyymmdd,COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM gicho_master	Where co_id = $co_id AND year=$start_yyyy AND gycode=101) AS A
							LEFT OUTER JOIN (SELECT -1 jp_yyyymmdd,COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND (jp_gubun=1 or jp_gubun=2) 						
												AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 ) AS B ON A.jp_yyyymmdd = B.jp_yyyymmdd
							LEFT OUTER JOIN (SELECT -1 jp_yyyymmdd,COALESCE(sum(credit),0) credit_3, COALESCE(sum(debit),0) debit_3 FROM junpyo Where co_id = $co_id AND gycode=101	 						
												AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 ) AS C ON A.jp_yyyymmdd = C.jp_yyyymmdd
				UNION ALL
				SELECT  jp_yyyymmdd,jp_no ,  jp_id ,jp_rem,customer_id, credit, debit,jp_match_id FROM junpyo
					Where co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd
					AND (jp_gubun=1 or jp_gubun=2)
				UNION ALL
				SELECT  jp_yyyymmdd ,jp_no,  jp_id ,jp_rem,customer_id, debit,credit ,jp_match_id FROM junpyo
					Where co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd
					AND  gycode=101 order by jp_yyyymmdd, jp_no;";
				
					
		//throw new Exception($sql);
		
					
		$this->querySql($sql);
	}
	
	//현금 출납부
	public function requestCashReportDM(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$flag = $this -> param["flag"];
		
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		
		$from_yyyymmdd_2 = $from_yyyymmdd;
		/*
		if($flag == 'd')
		{
			$from_dd = substr($from_yyyymmdd,6,2);
			$from_dd-=1;
			
			if($from_dd>9)
				$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
			else
				$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		}
		else 
		{
			$from_yyyymmdd_2 = $from_yyyymmdd;
		}
		*/
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$cashSql = "SELECT cash_debit+cash_credit2 cash_debit, cash_credit+cash_debit2 cash_credit
					FROM (SELECT 101 gycode,COALESCE(sum(debit),0) cash_debit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=1) AS A 
					LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND jp_gubun=2) AS B
	 				ON A.gycode = B.gycode
	 				LEFT OUTER JOIN (SELECT 101 gycode,COALESCE(sum(credit),0) cash_credit2,COALESCE(sum(debit),0) cash_debit2 FROM junpyo
							Where co_id = $co_id AND jp_yyyymmdd>$from_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode=101) AS C
	 				ON A.gycode = C.gycode;";
		*/
		
		$sql = "SELECT A.jp_yyyymmdd jp_yyyymmdd,'전월이월' jp_rem, -1 customer_id, debit_1+credit_2+debit_3 credit,credit_1+debit_2+credit_3 debit,-1 jp_id,-1 jp_no,-1 jp_match_id 
						FROM (SELECT -1 jp_yyyymmdd,COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM gicho_master	Where co_id = $co_id AND year=$start_yyyy AND gycode=101) AS A
							LEFT OUTER JOIN (SELECT -1 jp_yyyymmdd, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND jp_gubun=1 						
												AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<$from_yyyymmdd_2 ) AS B ON A.jp_yyyymmdd = B.jp_yyyymmdd
							LEFT OUTER JOIN (SELECT -1 jp_yyyymmdd, COALESCE(sum(credit),0) credit_2 FROM junpyo Where co_id = $co_id AND jp_gubun=2 						
												AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<$from_yyyymmdd_2 ) AS C ON A.jp_yyyymmdd = C.jp_yyyymmdd
							LEFT OUTER JOIN (SELECT -1 jp_yyyymmdd,COALESCE(sum(credit),0) credit_3, COALESCE(sum(debit),0) debit_3 FROM junpyo Where co_id = $co_id AND gycode=101	 						
												AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<$from_yyyymmdd_2 ) AS D ON A.jp_yyyymmdd = D.jp_yyyymmdd
				UNION ALL
				SELECT  jp_yyyymmdd,jp_rem,customer_id, credit, debit,  jp_id ,jp_no ,jp_match_id FROM junpyo
					Where co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd
					AND (jp_gubun=1 or jp_gubun=2)
				UNION ALL
				SELECT  jp_yyyymmdd,jp_rem,customer_id, debit,credit ,  jp_id ,jp_no ,jp_match_id FROM junpyo
					Where co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd
					AND  gycode=101 order by jp_yyyymmdd;";
		//throw new Exception($sql);
		
		$this->querySql($sql);
	}
	
	//계정 과목별 조회 - 작목 옵션 추가
	public function requestGycodeReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$jakmok_code = (int) $this -> param["jakmok_code"];
		$flag = $this -> param["flag"];
		
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		$from_dd = substr($from_yyyymmdd,6,2);
		$from_dd-=1;
		
		if($from_dd>9)
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
		else
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		
		$sql_jakmok="";
		if($jakmok_code!=0 OR $jakmok_code!='')
		{
			$sql_jakmok=" AND jakmok_code=$jakmok_code";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql ="SELECT -1 jp_yyyymmdd, '전월이월' jp_rem, -1 customer_id, debit_1+debit_2 debit,credit_1+credit_2 credit,-1 jp_id,-1 jp_no,-1 jp_match_id 
			FROM (SELECT COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM gicho_master Where co_id = $co_id AND year=$start_yyyy AND gycode=$gycode) AS A,
			(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND gycode=$gycode 
						AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 $sql_jakmok) AS B
			UNION ALL
			SELECT jp_yyyymmdd, jp_rem, customer_id, debit, credit, jp_id, jp_no, jp_match_id
			FROM junpyo Where co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd $sql_jakmok;";
			
		//throw new Exception($sql);		
		$this->querySql($sql);	
	}

//계정 과목별 조회 - 작목 옵션 추가
	public function requestGycodeReportDM(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$jakmok_code = (int) $this -> param["jakmok_code"];
		
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		
		$from_yyyymmdd_2 = $from_yyyymmdd;
		/*
		if($flag == 'd')
		{
			$from_dd = substr($from_yyyymmdd,6,2);
			$from_dd-=1;
			
			if($from_dd>9)
				$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
			else
				$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		}
		else 
		{
			$from_yyyymmdd_2 = $from_yyyymmdd;
		}
		 */
		
		//작목옵션		
		$sql_jakmok="";
		if($jakmok_code!=0 OR $jakmok_code!='')
		{
			$sql_jakmok=" AND jakmok_code=$jakmok_code";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql ="SELECT -1 jp_yyyymmdd, '전월이월' jp_rem, -1 customer_id, debit_1+debit_2 debit,credit_1+credit_2 credit,-1 jp_id,-1 jp_no,-1 jp_match_id 
			FROM (SELECT COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM gicho_master Where co_id = $co_id AND year=$start_yyyy AND gycode=$gycode) AS A,
			(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND gycode=$gycode 
						AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<$from_yyyymmdd_2 $sql_jakmok) AS B
			UNION ALL
			SELECT jp_yyyymmdd, jp_rem, customer_id, debit, credit, jp_id, jp_no, jp_match_id
			FROM junpyo Where co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd $sql_jakmok;";
			
		//throw new Exception($sql);		
		$this->querySql($sql);	
	}
	
	/*
	 //계정 과목별 조회 - 작목 옵션 추가
	public function requestGycodeReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$jakmok_code = (int) $this -> param["jakmok_code"];
		
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		$from_dd = substr($from_yyyymmdd,6,2);
		$from_dd-=1;
		
		if($from_dd>9)
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
		else
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		
		$sql_jakmok="";
		if($jakmok_code!=0 OR $jakmok_code!='')
		{
			$sql_jakmok=" AND jakmok_code=$jakmok_code";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql ="SELECT -1 jp_yyyymmdd, '전월이월' jp_rem, -1 customer_id, debit_1+debit_2 debit,credit_1+credit_2 credit,-1 jp_id,-1 jp_no,-1 jp_match_id 
			FROM (SELECT sum(credit) credit_1, sum(debit) debit_1 FROM gicho_master Where co_id = $co_id AND year=$start_yyyy AND gycode=$gycode) AS A,
			(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND gycode=$gycode 
						AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 $sql_jakmok) AS B
			UNION ALL
			SELECT jp_yyyymmdd, jp_rem, customer_id, debit, credit, jp_id, jp_no, jp_match_id
			FROM junpyo Where co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd $sql_jakmok;";
				
		$this->querySql($sql);		
	} 
	*/
	/*
  	//계정 과목별 조회
	public function requestGycodeReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		$from_dd = substr($from_yyyymmdd,6,2);
		$from_dd-=1;
		
		if($from_dd>9)
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
		else
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql ="SELECT -1 jp_yyyymmdd, '전월이월' jp_rem, -1 customer_id, debit_1+debit_2 debit,credit_1+credit_2 credit,-1 jp_id,-1 jp_no,-1 jp_match_id 
			FROM (SELECT sum(credit) credit_1, sum(debit) debit_1 FROM gicho_master Where co_id = $co_id AND year=$start_yyyy AND gycode=$gycode) AS A,
			(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo Where co_id = $co_id AND gycode=$gycode 
						AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 ) AS B
			UNION ALL
			SELECT jp_yyyymmdd, jp_rem, customer_id, debit, credit, jp_id, jp_no, jp_match_id
			FROM junpyo Where co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd ;";
				
		$this->querySql($sql);		
	}
  
 	*/

	//월별 손익 (손익계정)팝업 조회
	public function requestMonthProfitGycodeReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$jakmok_code = (int) $this -> param["jakmok_code"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		$from_dd = substr($from_yyyymmdd,6,2);
		$from_dd-=1;
		
		if($from_dd>9)
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
		else
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
		
		if($gycode<200 OR $gycode>499) throw new Exception("Gycode Error");
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql_jakmok="";
		if($jakmok_code!=0 OR $jakmok_code!='')
		{
			$sql_jakmok=" AND jakmok_code=$jakmok_code";
		}		
		
		$sql ="SELECT -1 jp_yyyymmdd, '전월이월' jp_rem, -1 customer_id, debit_1 debit,credit_1 credit,-1 jp_id,-1 jp_no,-1 jp_match_id 
			FROM (SELECT COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM junpyo Where co_id = $co_id AND gycode=$gycode 
						AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 $sql_jakmok) AS A
			UNION ALL
			SELECT jp_yyyymmdd, jp_rem, customer_id, debit, credit, jp_id, jp_no, jp_match_id
			FROM junpyo Where co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd $sql_jakmok;";
		
		$this->querySql($sql);		
	}


	//계정별 거래처 코드 리스트업
	public function requestGyCodeList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.gycode gycode FROM 
			(SELECT gycode FROM gicho_master WHERE year=$start_yyyy AND co_id= $co_id AND (debit<>0 OR credit<>0) AND gycode<>101
				UNION
			SELECT gycode FROM junpyo WHERE co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode<>101 group by gycode) A
				ORDER BY gycode;";
				
		$this->querySql($sql);
	}

	//계정별 거래처 코드 리스트업
	public function requestCustomerList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.customer_id customer_id FROM 
			(SELECT customer_id FROM gicho_detail WHERE year=$start_yyyy AND co_id= $co_id AND gycode=$gycode AND (debit<>0 OR credit<>0)
				UNION
			SELECT customer_id FROM junpyo WHERE co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd  AND customer_id<>0 group by customer_id) A
				ORDER BY customer_id";
		
		//throw new Exception($sql);
				
		$this->querySql($sql);
	}
	
	//거래처 원장
	public function requestCustomerLedger(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$customer_id = $this -> param["customer_id"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0000';
		$from_yyyymmdd_2 = $from_yyyymmdd;
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT -1 jp_yyyymmdd ,-1 customer_id ,'전월이월' jp_rem ,debit_1+debit_2 debit ,credit_1+credit_2 credit ,-1 jp_no ,-1 jp_id ,-1 jp_match_id
					FROM (SELECT COALESCE(sum(credit),0) credit_1, COALESCE(sum(debit),0) debit_1 FROM gicho_detail 
								Where co_id = $co_id AND year=$start_yyyy AND gycode=$gycode AND customer_id=$customer_id) AS A,
						(SELECT COALESCE(sum(credit),0) credit_2, COALESCE(sum(debit),0) debit_2 FROM junpyo 
							Where co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd_1<jp_yyyymmdd AND jp_yyyymmdd<$from_yyyymmdd_2 AND customer_id=$customer_id ) AS B
				UNION ALL
				SELECT jp_yyyymmdd,customer_id,jp_rem, debit,credit , jp_no, jp_id, jp_match_id  
						FROM junpyo Where co_id = $co_id AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd AND gycode=$gycode and customer_id = $customer_id;";
		//throw new Exception($sql);
		
		$this->querySql($sql);				
	}
	
	//거래처 원장 - 자동 분개 세부 내용 요청 함수
	public function requestDetailLedger($jp_yyyymmdd, $jp_no){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		//------------------------------------
		//	db work
		//-------------------------------------
		if($gycode == 108)
		{
			$sql = "SELECT `io_item_cd`, ITEM.`item_nm` item_nm , ITEM.`item_qty` item_qty,   ITEM.`item_danwi` item_danwi, `io_su`, `io_dan`, `io_amt`, `io_rem`
				   FROM `output_detail` , (SELECT item_nm,item_cd,item_qty,item_danwi FROM item where co_id = $co_id) ITEM 
				where io_dt = $jp_yyyymmdd and co_id = $co_id and io_no = (SELECT io_no FROM output_master where io_dt = $jp_yyyymmdd and co_id = $co_id and jp_no = $jp_no) 
				and output_detail.io_item_cd = ITEM.item_cd;";
		}
		else if($gycode == 201)
		{
			$sql = "SELECT `io_item_cd`, ITEM.`item_nm` item_nm , ITEM.`item_qty` item_qty,   ITEM.`item_danwi` item_danwi, `io_su`, `io_dan`, `io_amt`, `io_rem`
			FROM `input_detail` , (SELECT item_nm,item_cd,item_qty,item_danwi FROM item where co_id = $co_id) ITEM
			where io_dt = $jp_yyyymmdd and co_id = $co_id and io_no = (SELECT io_no FROM input_master where io_dt = $jp_yyyymmdd and co_id = $co_id and jp_no = $jp_no)
			and input_detail.io_item_cd = ITEM.item_cd;";
		}
		//throw new Exception($sql);
	
	
		$this->querySql($sql);
	}
	
	//거래처 잔액명세
	public function requestCustomerBalance(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$gycode = (int) $this -> param["gycode"];
		$from_yyyymmdd = $this -> param["from_yyyymmdd"];
		$to_yyyymmdd = $this -> param["to_yyyymmdd"];
		$start_yyyy =(int)substr($from_yyyymmdd,0,4);
		
		$from_yyyymmdd_1 = $start_yyyy.'0101';
		$from_yyyymmdd_2 = '';
		$from_dd = substr($from_yyyymmdd,6,2);
		$from_dd-=1;
		
		if($from_dd>9)
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).$from_dd;
		else
			$from_yyyymmdd_2 = substr($from_yyyymmdd,0,6).'0'.$from_dd;
			
		//------------------------------------
		//	db work
		//-------------------------------------
		//
		if((int)($gycode/100)==2 or ((int)($gycode/100)==3))
			$gicho="COALESCE(B.credit,0)+COALESCE(C.sum_credit,0)-COALESCE(B.debit,0)-COALESCE(C.sum_debit,0)";
		else 
			$gicho="COALESCE(B.debit,0)+COALESCE(C.sum_debit,0)-COALESCE(B.credit,0)-COALESCE(C.sum_credit,0)";
		
		$sql = "SELECT A.customer_id, $gicho gicho
						,value_credit ,value_debit FROM ( SELECT customer_id FROM customer WHERE co_id= $co_id) A
				LEFT OUTER JOIN
					(SELECT customer_id, credit, debit FROM gicho_detail Where co_id = $co_id AND gycode=$gycode AND year=$start_yyyy group by customer_id) AS B
				ON A.customer_id= B.customer_id
				LEFT OUTER JOIN
					(SELECT customer_id,sum(credit) sum_credit ,sum(debit) sum_debit FROM junpyo 
						WHERE co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd_1<=jp_yyyymmdd AND jp_yyyymmdd<=$from_yyyymmdd_2 Group by customer_id) AS C
				ON A.customer_id= C.customer_id 
				LEFT OUTER JOIN
					(SELECT customer_id,sum(credit) value_credit ,sum(debit) value_debit FROM junpyo 
						WHERE co_id = $co_id AND gycode=$gycode AND $from_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_yyyymmdd Group by customer_id) AS D
				ON A.customer_id= D.customer_id;";
	 	
	 	//echo $sql."<br>";
	 	//throw new Exception("$sql");
		 
	 	
	 	$this->querySql($sql);
	}

	//외상매입금, 외상 매출금 디테일 팝업 함수
	public function requestCreditSPDetail(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymmdd = (int)$this->param['jp_yyyymmdd'];
		$jp_no = (int)$this->param['jp_no'];
		$gycode = (int)$this->param['gycode'];
		//------------------------------------
		//	db work
		//-------------------------------------
		if($gycode == 108)
		{
			$sql = "SELECT A.io_dt, A.io_no, A.io_seq, A.io_item_cd, A.io_su, A.io_dan,A. io_amt, A.io_rem,A.jumun_no,A.jumun_seq,A.jumun_dt FROM output_detail A, output_master B
			WHERE A.io_dt = B.io_dt AND A.io_no = B.io_no AND B.io_dt=$jp_yyyymmdd AND B.jp_no = $jp_no AND B.co_id=$co_id;";
		}
		else if($gycode == 201)
		{
			$sql = "SELECT A.io_dt, A.io_no, A.io_seq, A.io_item_cd, A.io_su, A.io_dan,A. io_amt, A.io_rem FROM input_detail A, input_master B
			WHERE A.io_dt = B.io_dt AND A.io_no = B.io_no AND B.io_dt=$jp_yyyymmdd AND B.jp_no = $jp_no AND B.co_id=$co_id;";
		}
		else
		{
			throw new Exception("Invalid Gycode");
		}
	
		$this->querySql($sql);
	}
	
}
?>