<?php

class DBOutputWork extends DBWork
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
	
	//주문리스트 -> 거래처 [출고 안됨]
	public function requestJumunList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jumun_tr_cd = (int)$this->param['jumun_tr_cd'];
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT A.jumun_dt,A.jumun_no, A.jumun_seq, A.jumun_item_cd, A.jumun_su, A.jumun_dan
							, A.jumun_amt,A.jumun_rem, B.jumun_tr_cd FROM jumun_detail A, jumun_master B 
					WHERE B.jumun_tr_cd=$jumun_tr_cd AND B.co_id=$co_id 
							AND A.co_id=B.co_id AND A.jumun_dt=B.jumun_dt AND A.jumun_no=B.jumun_no AND A.io_cd='';";
		
		$this->querySql($sql);
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
		
		$sql = "SELECT io_dt, io_no, io_tax_gubun, io_tr_cd, io_tamt, io_tax, io_tax_no,io_cash, io_bigo, jp_no ,io_pay_customer_id, parcel_com, parcel_no
					FROM output_master WHERE co_id=$co_id AND io_dt>=$from_yyyymmdd AND io_dt<=$to_yyyymmdd;";
		
		$this->querySql($sql);
		
	}
	
	//리스트
	public function requestDetailList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$io_dt = (int)$this->param['io_dt'];
		$io_no = (int)$this->param['io_no'];
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "SELECT co_id, io_dt, io_no, io_seq, io_item_cd, io_su, io_dan, io_amt, io_rem,jumun_no,jumun_seq,jumun_dt FROM output_detail
				WHERE co_id=$co_id AND io_dt=$io_dt AND io_no = $io_no;";
		
		$this->querySql($sql);
	}
	
	//프린트 페이지 Info
	public function requestPrintPageInfo(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "SELECT `co_nm`, `co_ceo_nm`, `co_saup_no`, `co_up`, `co_jong`, `co_addr` FROM `company_info` WHERE co_id=$co_id;";
		
		$this->querySql($sql);
	}
	
	
	
	
	private function createOutputNo($co_id,$io_dt)
	{
		$yyyy=(int)substr($io_dt, 0,4);
		$from=$yyyy.'0000';
		$to=$yyyy.'1232';
		
		$sql_input_no ="SELECT max(io_no) FROM output_master WHERE co_id = $co_id AND io_dt > $from AND io_dt < $to ";
		$this->querySql($sql_input_no);
		$row =$this->fetchArrayRow();
		return $row[0]+1;
	}
	
	private function createOutputSeq($co_id,$io_dt,$io_no)
	{
		$sql_input_seq ="SELECT max(io_seq) FROM output_detail WHERE co_id = $co_id AND io_dt=$io_dt AND io_no=$io_no ";
		$this->querySql($sql_input_seq);
		$row =$this->fetchArrayRow();
		return $row[0]+1;
	}
	
	private function createJpNum($co_id,$jp_yyyymmdd)
	{
		//전표 번호 구하기 [5000번 이상 10000미만] - 자동분개
		$sql_jp_no ="SELECT max(jp_no) FROM junpyo WHERE co_id = $co_id AND jp_yyyymmdd=$jp_yyyymmdd AND jp_no>=5000 AND jp_no<10000;";
		$this->querySql($sql_jp_no);
		$row =$this->fetchArrayRow();
		if($row[0]==0) return 5000;
		return $row[0]+1;
	}
	
	//자동 분개 3,4으로 모두 
	
	//등록(마스터) & 추가(디테일)
	public function requestRegArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$io_no = (int)$this->param['io_no'];
		$io_dt = (int)$this->param['io_dt'];
		if($this->isCloseYear($io_dt)=='y') return;
		
		//신규 등록
		if($io_no==0 or $io_no=='') $io_no=$this->createOutputNo($co_id, $io_dt);
		
		$io_tax_gubun = $this->param['io_tax_gubun'];
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		$io_tamt = (int)$this->param['io_tamt'];
		$io_tax = (int)$this->param['io_tax'];
		$io_tax_no = $this->param['io_tax_no'];
		$io_cash = $this->param['io_cash'];
		$io_pay_customer_id = (int)$this->param['io_pay_customer_id'];
		$io_bigo =$this->param['io_bigo'];
		$jp_no = (int)$this->param['jp_no'];
		
		$parcel_com =$this->param['parcel_com'];
		$parcel_no =$this->param['parcel_no'];

		if($jp_no=='') $jp_no=0;
		if($io_pay_customer_id=='') $io_pay_customer_id=0;
		if($io_tr_cd=='') $io_tr_cd=0;
		//json
		$json = $this -> param["data"];
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result = null;
		$res = null;
		$length =count($dec);
		//if($length<1) throw new Exception("디테일 데이터 오류");
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$this->startTransaction();
		
		//디테일
		for($idx=0;$idx<count($dec);$idx++){
    		$obj = $dec[$idx];
			$io_seq = (int)$obj['io_seq'];
			//신규 등록
			if($io_seq==0 or $io_seq=='') $io_seq=$this->createOutputSeq($co_id, $io_dt,$io_no);
			
			$io_item_cd =  (int)$obj['io_item_cd'];
			$io_su = (int)$obj['io_su'];
			$io_dan =  (int)$obj['io_dan'];
			$io_amt = (int)$obj['io_amt'];
			$io_rem =   $obj['io_rem']; 
			$row_idx =(int)$obj['row_idx'];
			
			//주문번호
			$jumun_dt =  (int)$obj['jumun_dt'];
			$jumun_no =  (int)$obj['jumun_no'];
			$jumun_seq = (int)$obj['jumun_seq'];
			
			if($jumun_dt=='' or $jumun_no=='' or $jumun_seq==''){
				$jumun_dt=0;
				$jumun_no=0;
				$jumun_seq=0;
			}
			//seq 와 jumun_dt.. 같이 있으면 오류
			
			
			$dSql ="INSERT INTO output_detail (`co_id`, `io_dt`, `io_no`, `io_seq`, `io_item_cd`, `io_su`, `io_dan`, `io_amt`, `io_rem`,
												`reg_date`, `reg_uid`,`jumun_no`, `jumun_seq`,`jumun_dt`)
					VALUES ($co_id, $io_dt, $io_no, $io_seq, $io_item_cd, $io_su, $io_dan, $io_amt, '$io_rem', now(), $uid, $jumun_no, $jumun_seq ,$jumun_dt )
			ON DUPLICATE KEY UPDATE
				`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_seq` = $io_seq, `io_item_cd` = $io_item_cd, `io_su` = $io_su,
					`io_dan` = $io_dan,`io_amt` = $io_amt,`io_rem` = '$io_rem',`reg_date` = now(),`reg_uid` = $uid,`jumun_no` = $jumun_no,`jumun_seq` = $jumun_seq,`jumun_dt` = $jumun_dt;";
			//throw new Exception("$dSql");
			$this->updateSql($dSql);
			
			//주문서에 출고 내용 기입
			$jSql = "UPDATE jumun_detail SET `io_cd` = '$io_dt-$io_no-$io_seq'
						WHERE `co_id` = $co_id AND `jumun_dt` = $jumun_dt AND `jumun_no` = $jumun_no AND `jumun_seq` = $jumun_seq;";
			$this->updateSql($jSql);
			
			$res[$row_idx] = $io_seq;
		}
		
		$sql = "SELECT `io_item_cd` FROM `output_detail` where  `co_id` = $co_id and `io_dt` = $io_dt and `io_no` = $io_no;";
		$this->querySql($sql);
		
		if($this->getNumRows()==0)
		{
			$tmp =$dec[0];
			$sql = "SELECT `item_nm` FROM `item` where  `item_cd` =$tmp[io_item_cd] and `co_id` = $co_id;";
			$this->querySql($sql);
			$item=$this->fetchMixedRow();
			$jp_io_bigo = '';
				
			if(count($dec) == 1)
			{
				//1개
				$jp_io_bigo = "$item[item_nm] ".$io_bigo;
			}
			else
			{
				//2개 이상
				$jp_io_bigo = "$item[item_nm] 외 ".$io_bigo;
			}
		}
		else
		{
			$num =$this->getNumRows();
			//기존 데이터가 있는 경우
			$data=$this->fetchMixedRow();
			$sql = "SELECT `item_nm` FROM `item` where  `item_cd` = $data[0] and `co_id` = $co_id;";
			$this->querySql($sql);
			$item=$this->fetchMixedRow();
			$jp_io_bigo = '';
			
			if(count($dec) == 1)
			{
				//1개
				$jp_io_bigo = "$item[item_nm] ".$io_bigo;
			}
			else
			{
				//2개 이상
				$jp_io_bigo = "$item[item_nm] 외 ".$io_bigo;
			}
		}

		//자동 분개 -------------------------------->		
		$jp_no=$this->autoOutputJournal($io_tax_gubun,$io_cash,$jp_io_bigo,$co_id,$io_dt, $io_tr_cd, $io_tamt,$io_tax ,$io_pay_customer_id,$uid,$jp_no);
		//자동 분개 -------------------------------->
		
		//마스터 -------------------------------->
		$mSql ="INSERT INTO output_master (`co_id`, `io_dt`, `io_no`, `io_tax_gubun`, `io_tr_cd`, `io_tamt`, `io_tax`, `io_tax_no`, `io_cash`,
											`io_pay_customer_id`, `io_bigo`, `jp_no`, `reg_date`, `reg_uid`,`parcel_com`,`parcel_no`)
					VALUES ($co_id, $io_dt, $io_no, '$io_tax_gubun' , $io_tr_cd, $io_tamt, $io_tax, '$io_tax_no', '$io_cash',
											$io_pay_customer_id,'$io_bigo',$jp_no,now(),$uid, '$parcel_com','$parcel_no')
			ON DUPLICATE KEY UPDATE
				`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_tax_gubun` = '$io_tax_gubun', `io_tr_cd` = $io_tr_cd,
					`io_tamt` = $io_tamt, `io_tax` = $io_tax, `io_tax_no` = '$io_tax_no', `io_cash` = '$io_cash', `io_pay_customer_id` = $io_pay_customer_id,
					`io_bigo` = '$io_bigo', `jp_no` = $jp_no, `reg_date` = now(), `reg_uid` = $uid, `parcel_com` = '$parcel_com', `parcel_no` = '$parcel_no';";
		$this->updateSql($mSql);
						
		$this->commit();
			
		$result['io_no']=$io_no;
		$result['jp_no']=$jp_no;
		$result['seq']=$res;
		
		return $result;
	}

	private function autoOutputJournal($io_tax_gubun,$io_cash,$io_bigo,$co_id,$io_dt, $io_tr_cd, $io_tamt,$io_tax ,$io_pay_customer_id,$uid,$jp_no){
		if($io_tax_gubun=='2' or $io_tax_gubun=='3' or $io_tax_gubun=='5')
			$tax_flag=false;
		else
			$tax_flag=true;
		
		//1,2,3,4  --> 자동분개
		switch ($io_cash) {
			//현금
			case '1': 
					$gycode2=101;
					$io_pay_customer_id=$io_tr_cd;
			 break;
			//외상
			case '2': 
					$gycode2=108; 
					$io_pay_customer_id=$io_tr_cd; 
			break;
			//예금
			case '3': 
					$gycode2=103; 
					if($io_pay_customer_id==0) $io_pay_customer_id=$io_tr_cd;
					break;
			//카드
			case '4': 
					$gycode2=112; 
					if($io_pay_customer_id==0) $io_pay_customer_id=$io_tr_cd;
					break;
		}
		
		//5 --> 자동분개 안함
		//자동분개 -> 분개 id
		if($io_cash!='5'){
			//공통
			//불필요 밸유
			$jp_match_id=0;
			$jakmok_code=0;
			
			//공통 값
			$gycode1=301; //매출액 계정코드 - 대변 4
			$gycode3=208; //부가세예수금
			
			// 자동 분개 주석
			$jp_rem="[자동 분개] ".$io_bigo;
			
			$jp_list=array();
			//신규 - 기존 수정  0 
			//자동분개 없음 -> 자동분개 있음 -1
			if($jp_no==0 || $jp_no==-1){
				//신규 분개
				//전표 번호 생성
				$jp_no=$this->createJpNum($co_id,$io_dt);
				$jp_list[0]=0;
				$jp_list[1]=0;
				$jp_list[2]=0;
			}
			else {
				//기존 수정
				$jpIdListSql = "SELECT jp_id FROM junpyo WHERE co_id=$co_id AND jp_no=$jp_no AND jp_yyyymmdd=$io_dt";
				$this->querySql($jpIdListSql);
				
				while($row=$this->fetchMixedRow()){
					array_push($jp_list,$row[0]);
				}
			}							
			
			//부가세 여부에 따른 다른 분개
			//저장							
			if($tax_flag){
				//3줄
				$jp_view_gubun1=4;
				$customer_id1=$io_tr_cd;
				$debit1=0;
				$credit1=$io_tamt;
				
				$jp_view_gubun2=3;
				$customer_id2=$io_pay_customer_id;
				$debit2=$io_tamt+$io_tax;
				$credit2=0;
				
				//부가세
				$jp_view_gubun3=4;
				$customer_id3=$io_tr_cd;
				$debit3=0;
				$credit3=$io_tax;
				
				//저장
				//차변
				$this->regDebitCreditJunpyo($jp_list[0],$co_id,$io_dt,$jp_no,$jp_view_gubun1,$gycode1
													,$customer_id1,$jakmok_code,$debit1,$credit1,$jp_rem,$uid,$jp_match_id,$uid);
				$this->regDebitCreditJunpyo($jp_list[1],$co_id,$io_dt,$jp_no,$jp_view_gubun3,$gycode3
												,$customer_id3,$jakmok_code,$debit3,$credit3,$jp_rem,$uid,$jp_match_id,$uid);
				
				if(count($jp_list)<3) $jp_list[2]=0;
				//대변
				$this->regDebitCreditJunpyo($jp_list[2],$co_id,$io_dt,$jp_no,$jp_view_gubun2,$gycode2
												,$customer_id2,$jakmok_code,$debit2,$credit2,$jp_rem,$uid,$jp_match_id,$uid);	
			}
			else
			{
				//2줄
				$jp_view_gubun1=4;
				$customer_id1=$io_tr_cd;
				$debit1=0;
				$credit1=$io_tamt;
				
				$jp_view_gubun2=3;
				$customer_id2=$io_pay_customer_id;
				
				//저장
				//대변
				$this->regDebitCreditJunpyo($jp_list[0],$co_id,$io_dt,$jp_no,$jp_view_gubun1,$gycode1
											,$customer_id1,$jakmok_code,$debit1,$credit1,$jp_rem,$uid,$jp_match_id,$uid);
											
				//차변
				$this->regDebitCreditJunpyo($jp_list[1],$co_id,$io_dt,$jp_no,$jp_view_gubun2,$gycode2
											,$customer_id2,$jakmok_code,$credit1,$debit1,$jp_rem,$uid,$jp_match_id,$uid);
				
				
				//마지막 로우 있으면 삭제
				if($jp_list[2]!=0 && count($jp_list)==3){
					$delJpSql = "DELETE FROM junpyo WHERE co_id=$co_id AND jp_id=$jp_list[2]";
					$this->updateSql($delJpSql);
				}
			}								
		}else {
			
			if($jp_no!=0){
				//자동분개 있음-> 자동분개 없음(자체생산)
				$delJpSql = "DELETE FROM junpyo WHERE co_id=$co_id AND jp_no=$jp_no AND jp_yyyymmdd=$io_dt;";
				$this->updateSql($delJpSql);
			}
			
			//자체 생산[첫 등록]
			$jp_no=-1;
			
		}
		return $jp_no;
	}

	//저장
	private function regDebitCreditJunpyo($jp_id,$co_id,$jp_yyyymmdd,$jp_no,$jp_view_gubun,$gycode
											,$customer_id,$jakmok_code,$debit,$credit,$jp_rem,$uid,$jp_match_id,$uid)
	{
		//분개
		$sql ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
						debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id)
			VALUES ($jp_id,$co_id,$jp_yyyymmdd,$jp_no,$jp_view_gubun,$gycode,$customer_id,$jakmok_code,
						$debit,$credit,'$jp_rem','y',$jp_view_gubun,$uid,now(),$jp_match_id)
			ON DUPLICATE KEY UPDATE 
				`jp_id` = $jp_id,`jp_yyyymmdd` = $jp_yyyymmdd, `jp_no` = $jp_no, `jp_gubun` = $jp_view_gubun, `gycode` = $gycode, 
				`customer_id` = $customer_id,`jakmok_code` = $jakmok_code, `debit` = $debit,	`credit` = $credit, `jp_rem` = '$jp_rem', 
				`jp_view` = 'y',`jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = $jp_match_id;";
			
					
		$this->updateSql($sql);	
		
		return $this->insert_id();
	}	
	
	//디테일 삭제  --> 마스터 삭제
	//1. 디테일 삭제
	//2. 디테일 남겨진 여부 
	//3. 있으면 마스터,자동분개 업데이트  || 없으면 마스터, 자동분개 삭제
	public function requestDelArray(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$io_no = (int)$this->param['io_no'];
		
		//throw new Exception($this->param['io_dt']);
		$io_dt = (int)$this->param['io_dt'];
		if($this->isCloseYear($io_dt)=='y') return;
		
		if($io_no==0 or $io_no=='') throw new Exception("입고 번호 없음");
		
		$io_tax_gubun = $this->param['io_tax_gubun'];
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		$io_tamt = (int)$this->param['io_tamt'];
		$io_tax = (int)$this->param['io_tax'];
		$io_tax_no = $this->param['io_tax_no'];
		$io_cash = $this->param['io_cash'];
		$io_pay_customer_id = (int)$this->param['io_pay_customer_id'];
		$io_bigo = $this->param['io_bigo'];
		$jp_no = (int)$this->param['jp_no'];
		if($jp_no=='' or $jp_no==0)throw new Exception("전표 번호 없음");
		
		$parcel_com =$this->param['parcel_com'];
		$parcel_no =$this->param['parcel_no'];
		
		//$json = "[{\"gycode\":\"100\",\"gy_am\":\"1243234\"},{\"gycode\":\"102\",\"gy_am\":\"2341232\"},{\"gycode\":\"120\",\"gy_am\":\"23423423\"}]";
		//$json = "[{'gycode':'100','gy_am':'1243234'},{'gycode':'101','gy_am':'2342341'},{'gycode':'120','gy_am':'23423423'}]";
		//json
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
			$io_seq = (int)$obj['io_seq'];
			$row_idx = (int)$obj['row_idx'];
			$io_amt = (int)$obj['io_amt'];
			$sum+=$io_amt;
			//오류 체크
			if($io_seq==0 or $io_seq=='') throw new Exception("출고 디테일 시퀀스 없음");
			
			//삭제
			$dSql ="DELETE FROM output_detail 
						WHERE `co_id` = $co_id AND `io_dt` = $io_dt AND `io_no` = $io_no AND `io_seq` = $io_seq;";
			//throw new Exception("$dSql");
			$this->updateSql($dSql);
			
			//주문서 출고해제
			$jumun_dt = (int)$obj['jumun_dt'];
			$jumun_no = (int)$obj['jumun_no'];
			$jumun_seq = (int)$obj['jumun_seq'];
			
			
			if(!($jumun_dt=='' or $jumun_no=='' or $jumun_seq=='' or $jumun_dt==0 or $jumun_no==0 or $jumun_seq==0)){
				//주문서에 출고 내용 삭제
				$uSql = "UPDATE jumun_detail SET `io_cd` = ''
							WHERE `co_id` = $co_id AND `jumun_dt` = $jumun_dt AND `jumun_no` = $jumun_no AND `jumun_seq` = $jumun_seq;";
				$this->updateSql($uSql);
			}
			
			array_push($result, $row_idx);
		}
		
		//디테일 갯수 체크
		$countDetail = "SELECT count(*) FROM output_detail 
							WHERE `co_id` = $co_id AND `io_dt` = $io_dt AND `io_no` = $io_no;";
		$this->querySql($countDetail);
		$row=$this->fetchMixedRow();
		if($row[0]==0){
			//삭제
			$delMaster="DELETE FROM output_master 
						WHERE `co_id` = $co_id AND `io_dt` = $io_dt AND `io_no` = $io_no;";
			$this->updateSql($delMaster);			
			$delJunpyo="DELETE FROM junpyo 
						WHERE `co_id` = $co_id AND `jp_yyyymmdd` = $io_dt AND `jp_no` = $jp_no;";
			$this->updateSql($delJunpyo);
			
		}else{
			//수정 분개
			//자동 분개 -------------------------------->		
			$this->autoOutputJournal($io_tax_gubun,$io_cash,$io_bigo,$co_id,$io_dt, $io_tr_cd, $io_tamt,$io_tax ,$io_pay_customer_id,$uid,$jp_no);
			//자동 분개 -------------------------------->
			//마스터 -------------------------------->
			$io_tamt=$io_tamt-$sum;
			
			$mSql ="INSERT INTO output_master (`co_id`, `io_dt`, `io_no`, `io_tax_gubun`, `io_tr_cd`, `io_tamt`, `io_tax`, `io_tax_no`, `io_cash`,
												`io_pay_customer_id`, `io_bigo`, `jp_no`, `reg_date`, `reg_uid`,`parcel_com`,`parcel_no`)
						VALUES ($co_id, $io_dt, $io_no, '$io_tax_gubun' , $io_tr_cd, $io_tamt, $io_tax, '$io_tax_no', '$io_cash',
												$io_pay_customer_id,'$io_bigo',$jp_no,now(),$uid,'$parcel_com','$parcel_no')
				ON DUPLICATE KEY UPDATE
					`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_tax_gubun` = '$io_tax_gubun', `io_tr_cd` = $io_tr_cd,
						`io_tamt` = $io_tamt, `io_tax` = $io_tax, `io_tax_no` = '$io_tax_no', `io_cash` = '$io_cash', `io_pay_customer_id` = $io_pay_customer_id,
						`io_bigo` = '$io_bigo', `jp_no` = $jp_no, `reg_date` = now(), `reg_uid` = $uid, `parcel_com` = '$parcel_com', `parcel_no` = '$parcel_no';";
			$this->updateSql($mSql);
		}	
						
		$this->commit();
			
		return $result;
	}

	//일자별 출고 현황
	public function requestDayReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		if($io_tr_cd!=0 or $io_tr_cd!=''){
			$tr_cd="AND B.io_tr_cd=$io_tr_cd";
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
		$sql = "SELECT A.io_dt, B.io_tr_cd , A.io_item_cd, A.io_su, A.io_dan, A.io_amt, A.io_rem
					FROM output_detail A, output_master B 
				WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd $tr_cd
		 			AND A.io_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.io_dt = B.io_dt AND A.io_no = B.io_no;";
		
		$this->querySql($sql);
	}

	//거래처별 출고 현황
	public function requestCustomerReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		if($io_tr_cd!=0 or $io_tr_cd!=''){
			$tr_cd="AND B.io_tr_cd=$io_tr_cd";
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
		$sql = "SELECT A.io_dt, B.io_tr_cd , A.io_item_cd, A.io_su, A.io_dan, A.io_amt, A.io_rem
					FROM output_detail A, output_master B 
				WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd $tr_cd
		 			AND A.io_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.io_dt = B.io_dt AND A.io_no = B.io_no order by B.io_tr_cd ,A.io_dt; ";
		
		$this->querySql($sql);
	}

	//상품별 출고 현황
	public function requestItemCdReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		if($io_tr_cd!=0 or $io_tr_cd!=''){
			$tr_cd="AND B.io_tr_cd=$io_tr_cd";
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
		$sql = "SELECT A.io_dt, B.io_tr_cd , A.io_item_cd, A.io_su, A.io_dan, A.io_amt, A.io_rem
					FROM output_detail A, output_master B 
				WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd $tr_cd
		 			AND A.io_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.io_dt = B.io_dt AND A.io_no = B.io_no order by A.io_item_cd, A.io_dt;";
		
		$this->querySql($sql);
	}

	//일별 출고 현황
	public function requestDaySumReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		if($io_tr_cd!=0 or $io_tr_cd!=''){
			$tr_cd="AND B.io_tr_cd=$io_tr_cd";
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
		$sql = "SELECT A.io_dt, A.io_item_cd, sum(A.io_su) io_su, sum(A.io_amt) io_amt 
					FROM output_detail A, output_master B 
				WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd $tr_cd
		 			AND A.io_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
		 			AND A.co_id = B.co_id AND A.io_dt = B.io_dt AND A.io_no = B.io_no
				group by A.io_item_cd, A.io_dt order by A.io_dt ;";
		
		$this->querySql($sql);
	}

	//월별 출고 현황
	public function requestMonthSumReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		//선택
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		if($io_tr_cd!=0 or $io_tr_cd!=''){
			$tr_cd="AND B.io_tr_cd=$io_tr_cd";
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
		$sql = "SELECT  left(CONVERT(A.io_dt USING utf8), 6) io_dt, A.io_item_cd, sum(A.io_su) io_su, sum(A.io_amt) io_amt
					FROM output_detail A, output_master B 
				WHERE A.co_id = $co_id AND A.io_dt>=$from_yyyymmdd AND A.io_dt<=$to_yyyymmdd $tr_cd
		 			AND A.io_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.io_dt = B.io_dt AND A.io_no = B.io_no 
				group by A.io_item_cd, io_dt order by io_dt,A.io_item_cd;";
		
		$this->querySql($sql);
	}

	//상품별 출고 현황
	public function requestItemSumReport(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		//필수
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_yyyymmdd = (int)$this->param['from_yyyymmdd'];
		$to_yyyymmdd = (int)$this->param['to_yyyymmdd'];
		
		$yyyy=substr($from_yyyymmdd, 0,4);
		$from=$yyyy."0101";
		$to=$yyyy.'1231';
		
		//선택
		$io_tr_cd = (int)$this->param['io_tr_cd'];
		if($io_tr_cd!=0 or $io_tr_cd!=''){
			$tr_cd="AND B.io_tr_cd=$io_tr_cd";
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
		$sql = "SELECT  left(CONVERT(A.io_dt USING utf8), 6) io_dt, A.io_item_cd, sum(A.io_su) io_su, sum(A.io_amt) io_amt
					FROM output_detail A, output_master B 
				WHERE A.co_id = $co_id AND A.io_dt>=$from AND A.io_dt<=$to $tr_cd
		 			AND A.io_item_cd in (SELECT item_cd from item WHERE co_id = $co_id $itemgrp $item)
					AND A.co_id = B.co_id AND A.io_dt = B.io_dt AND A.io_no = B.io_no 
				group by A.io_item_cd, io_dt order by A.io_item_cd;";
		
		$this->querySql($sql);
	}
	
}
?>