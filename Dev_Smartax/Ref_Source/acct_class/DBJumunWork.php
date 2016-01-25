<?php

class DBJumunWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	//마감 정보 체크
	public function isCloseYear($jp_yyyymmdd)
	{
		$year = substr($jp_yyyymmdd,0,4);
		if(isset($_SESSION['close_year'][$year]))
			return 'y';
		else
			return 'n';
	}
	
	//리스트
	public function requestMasterList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "SELECT jumun_dt, jumun_no, jumun_tr_cd, jumun_tamt, jumun_bigo, jumun_man, jumun_zip, jumun_addr 
					FROM jumun_master WHERE co_id=$co_id AND jumun_dt>=$from_yyyymmdd AND jumun_dt<=$to_yyyymmdd;";
		
		$this->querySql($sql);
		
	}
	
	//리스트
	public function requestDetailList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jumun_no = (int)$this->param['jumun_no'];
		$jumun_dt = (int)$this->param['jumun_dt'];
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT jumun_dt, jumun_seq, jumun_item_cd, jumun_su, jumun_dan, jumun_amt, jumun_rem, io_cd
				FROM jumun_detail WHERE co_id=$co_id AND jumun_no=$jumun_no AND jumun_dt = $jumun_dt;";
		
		$this->querySql($sql);
	}
	
	private function createJumunNo($co_id,$jumun_dt)
	{
		$yyyy=(int)substr($jumun_dt, 0,4);
		$from=$yyyy.'0000';
		$to=$yyyy.'1232';
		
		//전표 번호 구하기 [5000번 미만]
		$sql_jumun_no ="SELECT max(jumun_no) FROM jumun_master WHERE co_id = $co_id AND jumun_dt > $from AND jumun_dt < $to ";
		$this->querySql($sql_jumun_no);
		$row =$this->fetchArrayRow();
		return $row[0]+1;
	}
	
	private function createJumunSeq($co_id,$jumun_dt,$jumun_no)
	{
		//전표 번호 구하기 [5000번 미만]
		$sql_jumun_seq ="SELECT max(jumun_seq) FROM jumun_detail WHERE co_id = $co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no ";
		$this->querySql($sql_jumun_seq);
		$row =$this->fetchArrayRow();
		return $row[0]+1;
	}
	
	//등록(마스터) & 추가(디테일)
	public function requestRegArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jumun_no = (int)$this->param['jumun_no'];
		$jumun_dt = (int)$this->param['jumun_dt'];
		if($this->isCloseYear($jumun_dt)=='y') return;
		
		//신규 등록
		if($jumun_no==0 or $jumun_no=='') $jumun_no=$this->createJumunNo($co_id, $jumun_dt);
		
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		$jumun_tamt = (int)$this->param['jumun_tamt'];
		$jumun_bigo = $this->param['jumun_bigo'];
		$jumun_man = $this->param['jumun_man'];
		$jumun_zip = $this->param['jumun_zip'];
		$jumun_addr = $this->param['jumun_addr'];
		
		
		//$json = "[{\"gycode\":\"100\",\"gy_am\":\"1243234\"},{\"gycode\":\"102\",\"gy_am\":\"2341232\"},{\"gycode\":\"120\",\"gy_am\":\"23423423\"}]";
		//$json = "[{'gycode':'100','gy_am':'1243234'},{'gycode':'101','gy_am':'2342341'},{'gycode':'120','gy_am':'23423423'}]";
		//json
		$json = $this -> param["data"];
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		
		$result = null;
		$res = null;
		
		$length =count($dec);
		//if($length<1) throw new Exception("디테일 데이터 오류");
		
		$sum=0;
		//------------------------------------
		//	db work
		//-------------------------------------
		$this->startTransaction();
		//마스터
		$mSql ="INSERT INTO jumun_master (`co_id`, `jumun_dt`, `jumun_no`, `jumun_tr_cd`, `jumun_tamt`, `jumun_bigo`, `jumun_man`,
							`jumun_zip`,`jumun_addr`,`reg_date`, `reg_uid`)
					VALUES ($co_id, $jumun_dt, $jumun_no, $jumun_tr_cd, $jumun_tamt, '$jumun_bigo', '$jumun_man',
							'$jumun_zip', '$jumun_addr', now(), $uid)
			ON DUPLICATE KEY UPDATE
				`co_id` = $co_id, `jumun_dt` = $jumun_dt, `jumun_no` = $jumun_no, `jumun_tr_cd` = $jumun_tr_cd, `jumun_tamt` = $jumun_tamt,
				`jumun_bigo` = '$jumun_bigo', `jumun_man` = '$jumun_man', `jumun_zip` = '$jumun_zip', `jumun_addr` = '$jumun_addr',
				`reg_date` = now(), `reg_uid` = $uid;";
		
		$this->updateSql($mSql);
		
		//디테일
		for($idx=0;$idx<count($dec);$idx++){
    		$obj = $dec[$idx];
			$io_cd =$obj['io_cd'];
			if($io_cd!=''){
				$this->rollback();
				throw new Exception("출고 데이터 수정 불가 오류");
			}
			
			$jumun_seq = (int)$obj['jumun_seq'];
			//신규 등록
			if($jumun_seq==0 or $jumun_seq=='') $jumun_seq=$this->createJumunSeq($co_id, $jumun_dt,$jumun_no);
			
			$jumun_item_cd =  (int)$obj['jumun_item_cd'];
			$jumun_su = (int)$obj['jumun_su'];
			$jumun_dan =  (int)$obj['jumun_dan'];
			$jumun_amt = (int)$obj['jumun_amt'];
			$jumun_rem =  $obj['jumun_rem']; 
			$row_idx =(int)$obj['row_idx'];
			
			$dSql ="INSERT INTO jumun_detail (`co_id`, `jumun_dt`, `jumun_no`, `jumun_seq`, `jumun_item_cd`, `jumun_su`, `jumun_dan`, 
											`jumun_amt`, `jumun_rem`, `reg_date`, `reg_uid`, `io_cd`)
					VALUES ($co_id, $jumun_dt, $jumun_no, $jumun_seq, $jumun_item_cd, $jumun_su, $jumun_dan,
								$jumun_amt, '$jumun_rem', now(), $uid , '$io_cd')
			ON DUPLICATE KEY UPDATE
				`co_id` = $co_id, `jumun_dt` = $jumun_dt, `jumun_no` = $jumun_no, `jumun_seq` = $jumun_seq, `jumun_item_cd` = $jumun_item_cd, 
				`jumun_su` = $jumun_su, `jumun_dan` = $jumun_dan, `jumun_amt` = $jumun_amt, `jumun_rem` = '$jumun_rem', 
				`reg_date` = now(), `reg_uid` = $uid, `io_cd` = '$io_cd';";
			
			$this->updateSql($dSql);
			$sum+=$jumun_amt;
			
			$res[$row_idx] = $jumun_seq;
		}
		
		/*
		if($sum!=$jumun_tamt){
			$this->rollback();
			throw new Exception("합계 오류");
		}
		 */
						
		$this->commit();
			
		//return $result;
		$result['jumun_no']=$jumun_no;
		$result['seq']=$res;
		
		return $result;
	}
	
	//디테일 삭제
	public function requestDelArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jumun_no = (int)$this->param['jumun_no'];
		$jumun_dt = (int)$this->param['jumun_dt'];
		if($this->isCloseYear($jumun_dt)=='y') return;
		
		$jumun_tamt = (int)$this->param['jumun_tamt'];
		//$json = "[{\"gycode\":\"100\",\"gy_am\":\"1243234\"},{\"gycode\":\"102\",\"gy_am\":\"2341232\"},{\"gycode\":\"120\",\"gy_am\":\"23423423\"}]";
		//$json = "[{'gycode':'100','gy_am':'1243234'},{'gycode':'101','gy_am':'2342341'},{'gycode':'120','gy_am':'23423423'}]";
		//json
		
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		$jumun_bigo = $this->param['jumun_bigo'];
		$jumun_man = $this->param['jumun_man'];
		$jumun_zip = $this->param['jumun_zip'];
		$jumun_addr = $this->param['jumun_addr'];
		
		$json = $this -> param["data"];
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result = array();
		$length =count($dec);
		if($length<1) throw new Exception("디테일 데이터 오류");
		
		$sum=0;
		//------------------------------------
		//	db work
		//-------------------------------------
		$this->startTransaction();
		
		//디테일
		for($idx=0;$idx<count($dec);$idx++){
    		$obj = $dec[$idx];
			$io_cd =$obj['io_cd'];
			$jumun_amt = (int)$obj['jumun_amt'];
			
			if($io_cd!=''){
				$this->rollback();
				throw new Exception("출고 데이터 수정 불가 오류");
			}
			$jumun_seq = (int)$obj['jumun_seq'];
			$row_idx =(int)$obj['row_idx'];
			
			$dSql ="DELETE FROM jumun_detail
						WHERE co_id=$co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no AND jumun_seq=$jumun_seq;";
			
			$this->updateSql($dSql);
			$sum+=$jumun_amt;
			array_push($result, $jumun_seq);
		}

		//마스터
		//디테일 몇개 존재 하는지
		$mCountSql = "SELECT count(*) FROM jumun_detail WHERE co_id=$co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no";
		$this->querySql($mCountSql);
		$row=$this->fetchMixedRow();
		
		if($row[0]>0){
			$jumun_tamt=$jumun_tamt-$sum;
			//합계 금액 수정
			$mSql ="UPDATE jumun_master SET
						`jumun_tr_cd` = $jumun_tr_cd, `jumun_tamt` = $jumun_tamt,`jumun_bigo` = '$jumun_bigo'
						, `jumun_man` = '$jumun_man', `jumun_zip` = '$jumun_zip', `jumun_addr` = '$jumun_addr',
						`reg_date` = now(), `reg_uid` = $uid
					WHERE co_id=$co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no;";
		}
		else{
			//삭제
			$mSql ="DELETE FROM jumun_master
					WHERE co_id=$co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no;";
		}
		
		$this->updateSql($mSql);
						
		$this->commit();
			
		return $result;
	}
	
	//일자별 주문현황
	public function requestDayReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		if($jumun_tr_cd!=0 or $jumun_tr_cd!=''){
			$tr_cd="AND B.jumun_tr_cd=$jumun_tr_cd";
		}
		
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		if($itemgrp_cd!=0 or $itemgrp_cd!=''){
			$itemgrp="AND itemgrp_cd=$itemgrp_cd";
		}
		
		$item_cd = (int)$this->param['item_cd'];
		if($item_cd!=0 or $item_cd!=''){
			$item="AND item_cd=$item_cd";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.jumun_dt, B.jumun_tr_cd , A.jumun_item_cd, A.jumun_su, A.jumun_dan, A.jumun_amt, A.jumun_rem
					FROM jumun_detail A, jumun_master B 
				WHERE A.co_id = $co_id AND A.jumun_dt>=$from_yyyymmdd AND A.jumun_dt<=$to_yyyymmdd $tr_cd
		 			AND A.jumun_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.jumun_dt = B.jumun_dt AND A.jumun_no = B.jumun_no order by A.jumun_dt;";
		
		$this->querySql($sql);
	}

	//거래처별 주문 현황
	public function requestCustomerReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		if($jumun_tr_cd!=0 or $jumun_tr_cd!=''){
			$tr_cd="AND B.jumun_tr_cd=$jumun_tr_cd";
		}
		
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		if($itemgrp_cd!=0 or $itemgrp_cd!=''){
			$itemgrp="AND itemgrp_cd=$itemgrp_cd";
		}
		
		$item_cd = (int)$this->param['item_cd'];
		if($item_cd!=0 or $item_cd!=''){
			$item="AND item_cd=$item_cd";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.jumun_dt, B.jumun_tr_cd , A.jumun_item_cd, A.jumun_su, A.jumun_dan, A.jumun_amt, A.jumun_rem
					FROM jumun_detail A, jumun_master B 
				WHERE A.co_id = $co_id AND A.jumun_dt>=$from_yyyymmdd AND A.jumun_dt<=$to_yyyymmdd $tr_cd
		 			AND A.jumun_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.jumun_dt = B.jumun_dt AND A.jumun_no = B.jumun_no order by B.jumun_tr_cd, A.jumun_dt;";
		
		$this->querySql($sql);
	}
	
	//상품별 주문 현황
	public function requestItemCdReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		if($jumun_tr_cd!=0 or $jumun_tr_cd!=''){
			$tr_cd="AND B.jumun_tr_cd=$jumun_tr_cd";
		}
		
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		if($itemgrp_cd!=0 or $itemgrp_cd!=''){
			$itemgrp="AND itemgrp_cd=$itemgrp_cd";
		}
		
		$item_cd = (int)$this->param['item_cd'];
		if($item_cd!=0 or $item_cd!=''){
			$item="AND item_cd=$item_cd";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.jumun_dt, B.jumun_tr_cd , A.jumun_item_cd, A.jumun_su, A.jumun_dan, A.jumun_amt, A.jumun_rem
					FROM jumun_detail A, jumun_master B 
				WHERE A.co_id = $co_id AND A.jumun_dt>=$from_yyyymmdd AND A.jumun_dt<=$to_yyyymmdd $tr_cd
		 			AND A.jumun_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.jumun_dt = B.jumun_dt AND A.jumun_no = B.jumun_no order by A.jumun_item_cd, A.jumun_dt;";
		
		$this->querySql($sql);
	}

	//주문대비 출고 현황
	public function requestOutputReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		if($jumun_tr_cd!=0 or $jumun_tr_cd!=''){
			$tr_cd="AND B.jumun_tr_cd=$jumun_tr_cd";
		}
		
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		if($itemgrp_cd!=0 or $itemgrp_cd!=''){
			$itemgrp="AND itemgrp_cd=$itemgrp_cd";
		}
		
		$item_cd = (int)$this->param['item_cd'];
		if($item_cd!=0 or $item_cd!=''){
			$item="AND item_cd=$item_cd";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.jumun_dt, B.jumun_tr_cd , A.jumun_item_cd, A.jumun_su, A.jumun_dan, A.jumun_amt 
					, A.jumun_rem , left(CONVERT(A.io_cd USING utf8), 8) io_dt  ,C.parcel_com , C.parcel_no
				FROM jumun_detail A, jumun_master B , output_master C
					WHERE A.co_id = $co_id AND A.jumun_dt>=$from_yyyymmdd AND A.jumun_dt<=$to_yyyymmdd AND A.io_cd<>'' $tr_cd
					AND A.jumun_item_cd in (SELECT item_cd from item WHERE co_id = $co_id )
					AND A.co_id = B.co_id AND A.jumun_dt = B.jumun_dt AND A.jumun_no = B.jumun_no
					AND A.co_id = C.co_id AND left(CONVERT(A.io_cd USING utf8), 8) = C.io_dt
					AND C.io_no = SPLIT_STRING(CONVERT(A.io_cd USING utf8),'-',2);";
		
		$this->querySql($sql);
	}

	//주문대비 미출고 현황
	public function requestNoOutputReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		if($jumun_tr_cd!=0 or $jumun_tr_cd!=''){
			$tr_cd="AND B.jumun_tr_cd=$jumun_tr_cd";
		}
		
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		if($itemgrp_cd!=0 or $itemgrp_cd!=''){
			$itemgrp="AND itemgrp_cd=$itemgrp_cd";
		}
		
		$item_cd = (int)$this->param['item_cd'];
		if($item_cd!=0 or $item_cd!=''){
			$item="AND item_cd=$item_cd";
		}
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.jumun_dt, B.jumun_tr_cd , A.jumun_item_cd, A.jumun_su, A.jumun_dan, A.jumun_amt, A.jumun_rem
					FROM jumun_detail A, jumun_master B 
				WHERE A.co_id = $co_id AND A.jumun_dt>=$from_yyyymmdd AND A.jumun_dt<=$to_yyyymmdd AND A.io_cd='' $tr_cd
		 			AND A.jumun_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.jumun_dt = B.jumun_dt AND A.jumun_no = B.jumun_no order by A.jumun_item_cd, A.jumun_dt;";
		
		$this->querySql($sql);
	}
	
}
?>