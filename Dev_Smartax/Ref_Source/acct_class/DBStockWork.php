<?php
class DBStockWork extends DBWork
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
		$io_yyyy = (int)$this->param['io_yyyy'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT io_item_cd,io_su FROM gicho_io WHERE co_id=$co_id AND io_yyyy=$io_yyyy;";
		$this->querySql($sql);
	}
	
	//삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$io_yyyy = (int)$this->param['io_yyyy'];
		$io_item_cd = (int)$this->param['io_item_cd'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "DELETE FROM gicho_io WHERE co_id=$co_id AND io_yyyy=$io_yyyy AND io_item_cd=$io_item_cd;";
		$this->updateSql($sql);
		
		return 1;
	}

	//등록 및 수정
	//-> 아이템 그룹이랑 외래키 잡기
	public function requestRegModify(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		$io_yyyy = (int)$this->param['io_yyyy'];
		$io_item_cd = (int)$this->param['io_item_cd'];
		$io_su = (int)$this->param['io_su'];

		//------------------------------------
		//	db work
		//------------------------------------		
		
		if($io_su==0)
		{
			$sql = "DELETE FROM gicho_io WHERE co_id=$co_id AND io_yyyy=$io_yyyy AND io_item_cd=$io_item_cd;";
		}
		else
		{
			$sql = "INSERT INTO gicho_io (`co_id`, `io_yyyy`, `io_item_cd`, `io_su`, `reg_date`, `reg_uid`)
						VALUES ($co_id, $io_yyyy, $io_item_cd, $io_su, now(), $uid)
							ON DUPLICATE KEY UPDATE 
						`io_yyyy` = $io_yyyy, `io_item_cd` = $io_item_cd, `io_su` = $io_su, `reg_date` = now(),`reg_uid` = $uid;";
		}
		$this->updateSql($sql);
		
		return 1;
	}
	
	//등록
	public function requestRegModifyArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		$io_yyyy = (int)$this -> param["io_yyyy"];
		$json = $this -> param["data"];
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$length = count($dec);
		$result = array();
		
		//echo "$length -> $length<br>";
		//트랜젝션 시작
		$this->startTransaction();
		
		//데이터 입력
		for($idx=0;$idx<$length;$idx++){
    		$obj = $dec[$idx];
			
			$io_item_cd = (int)$obj['io_item_cd'];
			$io_su = (int)$obj['io_su'];
			$row_idx=$obj['row_idx'];
			
			if($io_su==0)
			{
				$sql = "DELETE FROM gicho_io WHERE co_id=$co_id AND io_yyyy=$io_yyyy AND io_item_cd=$io_item_cd;";
			}
			else
			{
				$sql = "INSERT INTO gicho_io (`co_id`, `io_yyyy`, `io_item_cd`, `io_su`, `reg_date`, `reg_uid`)
							VALUES ($co_id, $io_yyyy, $io_item_cd, $io_su, now(), $uid)
								ON DUPLICATE KEY UPDATE 
							`io_yyyy` = $io_yyyy, `io_item_cd` = $io_item_cd, `io_su` = $io_su, `reg_date` = now(),`reg_uid` = $uid;";
									
			}
			//echo $sql."<br>";
			$this->updateSql($sql);		
			array_push($result, $row_idx);
		}
	
		$this->commit();
		return $result;
	}

	//이월
	public function requestForward(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$io_yyyy = ((int)$this->param['io_yyyy'])-1;
		$from_yyyymmdd = $io_yyyy.'0000';
		$to_yyyymmdd = $io_yyyy.'1232';
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.io_item_cd , COALESCE(io_gicho,0)+COALESCE(input_gicho,0)-COALESCE(output_gicho,0) io_su
					FROM (SELECT item_cd io_item_cd FROM item WHERE co_id=$co_id) AS A 
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) io_gicho FROM gicho_io
							WHERE co_id=$co_id AND io_yyyy=$io_yyyy group by io_item_cd) AS B 
				ON A.io_item_cd=B.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) input_gicho FROM input_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd AND io_dt<$to_yyyymmdd group by io_item_cd) AS C 
				ON A.io_item_cd=C.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) output_gicho FROM output_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd AND io_dt<$to_yyyymmdd group by io_item_cd) AS D 
				ON A.io_item_cd=D.io_item_cd;";
		$this->querySql($sql);
	
		/*
		$io_yyyy+=1;
		while($item=$this->fetchMapRow()){
			$io_su=(int)$item['io_su'];
			$io_item_cd=(int)$item['io_su'];
			if($io_su==0) continue;
			$sql2 = "INSERT INTO gicho_io (`co_id`, `io_yyyy`, `io_item_cd`, `io_su`, `reg_date`, `reg_uid`)
							VALUES ($co_id, $io_yyyy, $io_item_cd, $io_su, now(), $uid)
								ON DUPLICATE KEY UPDATE 
							`io_yyyy` = $io_yyyy, `io_item_cd` = $io_item_cd, `io_su` = $io_su, `reg_date` = now(),`reg_uid` = $uid;";
			$this->updateSql($sql2);				
		}
		*/
	}
	
	//재고현황
	public function requestStockReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		$item_grp = (int)$this->param['item_grp'];
		
		$from_yyyy = substr($from_yyyymmdd, 0,4);
		$from_yyyymmdd_1 = $from_yyyy.'0000';
		
		$test1 = '';
		$test2 = '';
		//$item_grp
		if($item_grp!=0){
			$test1 = "AND itemgrp_cd=$item_grp";
			$test2 = "AND io_item_cd in (SELECT item_cd FROM item WHERE co_id=$co_id AND itemgrp_cd=$item_grp)";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$sql = "SELECT A.io_item_cd , COALESCE(io_gicho,0)+COALESCE(input_gicho,0)-COALESCE(output_gicho,0) gicho, input ,output
					FROM (SELECT item_cd io_item_cd FROM item WHERE co_id=$co_id $test1) AS A 
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) io_gicho FROM gicho_io
							WHERE co_id=$co_id AND io_yyyy=$from_yyyy $test2 group by io_item_cd) AS B 
				ON A.io_item_cd=B.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) input_gicho FROM input_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd_1 AND io_dt<$from_yyyymmdd $test2 group by io_item_cd) AS C 
				ON A.io_item_cd=C.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) output_gicho FROM output_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd_1 AND io_dt<$from_yyyymmdd $test2 group by io_item_cd) AS D 
				ON A.io_item_cd=D.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) input FROM input_detail
							WHERE co_id=$co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd $test2 group by io_item_cd) AS E
				ON A.io_item_cd=E.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) output FROM output_detail
							WHERE co_id=$co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd $test2 group by io_item_cd) AS F 
				ON A.io_item_cd=F.io_item_cd;";
		
		 */
		 $sql = "SELECT A.io_item_cd , COALESCE(io_gicho,0)+COALESCE(input_gicho,0)-COALESCE(output_gicho,0) gicho, COALESCE(input,0) input ,COALESCE(output,0) output
					FROM (SELECT item_cd io_item_cd FROM item WHERE co_id=$co_id $test1) AS A 
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) io_gicho FROM gicho_io
							WHERE co_id=$co_id AND io_yyyy=$from_yyyy $test2 group by io_item_cd) AS B 
				ON A.io_item_cd=B.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) input_gicho FROM input_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd_1 AND io_dt<$from_yyyymmdd $test2 group by io_item_cd) AS C 
				ON A.io_item_cd=C.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) output_gicho FROM output_detail
							WHERE co_id=$co_id AND io_dt>$from_yyyymmdd_1 AND io_dt<$from_yyyymmdd $test2 group by io_item_cd) AS D 
				ON A.io_item_cd=D.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) input FROM input_detail
							WHERE co_id=$co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd $test2 group by io_item_cd) AS E
				ON A.io_item_cd=E.io_item_cd
				LEFT OUTER JOIN (SELECT io_item_cd, sum(io_su) output FROM output_detail
							WHERE co_id=$co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd $test2 group by io_item_cd) AS F 
				ON A.io_item_cd=F.io_item_cd;";
		
		 $this->querySql($sql);
	}
	
	//상품 수불부 상품코드 리스트업
	public function requestStockIoItemList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		$from_yyyy = substr($from_yyyymmdd, 0,4);
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT io_item_cd from input_detail 
					WHERE co_id = $co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd group by io_item_cd
				UNION
				SELECT io_item_cd from output_detail 
					WHERE co_id = $co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd group by io_item_cd
				UNION    
                SELECT io_item_cd FROM gicho_io WHERE co_id = $co_id AND io_yyyy=$from_yyyy order by io_item_cd";
		
		$this->querySql($sql);
	}
	
	//상품 수불부 --> 같은 연도
	public function requestStockIoReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		$item_cd = (int)$this->param['item_cd'];
		
		$from_yyyy = substr($from_yyyymmdd, 0,4);
		$from_yyyymmdd_1 = $from_yyyy.'0000';
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT -1 io_dt,COALESCE(io_gicho,0)+COALESCE(input_gicho,0)-COALESCE(output_gicho,0) in_su ,0 in_dan,0 in_amt, 0 out_su,0 out_dan,0 out_amt , '' io_rem , -1 io_tr_cd
					FROM (SELECT sum(io_su) io_gicho FROM gicho_io
							WHERE co_id=$co_id AND io_item_cd=$item_cd AND io_yyyy=$from_yyyy) AS A
						, (SELECT sum(io_su) input_gicho FROM input_detail
							WHERE co_id=$co_id AND io_item_cd=$item_cd AND io_dt>$from_yyyymmdd_1 AND io_dt<$from_yyyymmdd) AS B
						, (SELECT  sum(io_su) output_gicho FROM output_detail
							WHERE co_id=$co_id AND io_item_cd=$item_cd AND io_dt>$from_yyyymmdd_1 AND io_dt<$from_yyyymmdd) AS C
					UNION ALL
				SELECT A.io_dt,A.io_su in_su,A.io_dan in_dan,A.io_amt in_amt, 0 out_su,0 out_dan,0 out_amt, A.io_rem , COALESCE(B.io_tr_cd,-1) io_tr_cd
					from input_detail A,input_master B WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd AND A.io_item_cd = $item_cd
					 AND A.co_id=B.co_id AND A.io_dt=B.io_dt AND A.io_no=B.io_no 
					UNION ALL
				SELECT A.io_dt,0 in_su,0 in_dan,0 in_amt,A.io_su out_su,A.io_dan out_dan,A.io_amt out_amt , A.io_rem , COALESCE(B.io_tr_cd,-1) io_tr_cd
					from output_detail A,output_master B WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd AND A.io_item_cd = $item_cd
					AND A.co_id=B.co_id AND A.io_dt=B.io_dt AND A.io_no=B.io_no 
				order by io_dt;";
		
		$this->querySql($sql);
	}
	
}

?>