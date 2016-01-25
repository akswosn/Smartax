<?php
class AddTaxWork extends DBWork
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
	//SELECT `atax_type`, `atax_type_nm`, `atax_type_ratio` FROM farmsaver.add_tax_type where atax_type_show = 'y';
	
	//부가세 타입 리스트
	public function requestTypeList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$sql = "SELECT `atax_type`, `atax_type_nm`, `atax_type_ratio` FROM add_tax_type where atax_type_show = 'y'; ";
		$this->querySql($sql);
	}
	
	//부가세 전표 번호 구하기
	private function createAddTaxNum($co_id,$atax_yyyymmdd)
	{
		//전표 번호 구하기 [5000번 미만]
		$sql_atax_no = "SELECT COALESCE(max(atax_no),0) FROM add_tax WHERE co_id = $co_id AND atax_yyyymmdd = $atax_yyyymmdd;";
		$this->querySql($sql_atax_no);
		$row =$this->fetchArrayRow();
		return $row[0]+1;
	}
	
	//등록 및 수정
	public function requestRegData(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
		
		//신규
		/*$json='{"0":[{
			"row_idx":0, requierd
			"atax_id":"",
			"atax_yyyymmdd":"20141210", requierd
			"atax_no":"",
			"atax_type":"11", requierd
			"atax_item_nm":"테스트물품1",
			"atax_item_cnt":1, requierd
			"atax_item_danga":"50000", requierd
			"atax_supply_price":50000, requierd
			"atax_tax":5000, requierd
			"atax_customer_id":1, requierd
			"atax_elect_flag":"n",
			"atax_jp_flag":"0",
			"atax_jp_id":"",
			"atax_bank_card_id":"2" requierd
		}]*/
		/*$json='{"0":[{
			"row_idx":26,
			"atax_id":"",
			"atax_yyyymmdd":"20141211",
			"atax_no":"",
			"atax_type":"11",
			"atax_item_nm":"테스트",
			"atax_item_cnt":1,
			"atax_item_danga":50000,
			"atax_supply_price":45000,
			"atax_tax":5000,
			"atax_customer_id":"00001",
			"atax_elect_flag":"",
			"atax_jp_flag":"",
			"atax_jp_id":"1",
			"atax_bank_card_id":"00001"
		}]}';*/
		/*
		//수정
		$json='{"0":[{
			"row_idx":0,"atax_id":"7",
			"atax_yyyymmdd":"20141210",
		 	"atax_no":"1",
			"atax_type":"11",
			"atax_item_nm":"테스트물품1",
			"atax_item_cnt": 1,
			"atax_item_danga":"80000",
			"atax_supply_price": 50000,
			"atax_tax": 5000,
			"atax_customer_id": 1,
			"atax_elect_flag":"n",
			,"atax_jp_flag":"0",
			"atax_jp_id":"",
			"atax_bank_card_id":"2"
		 }]}';
		*/
		
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result = array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		for($idx=0;$idx<count($dec);$idx++){
			$r = array();
    		$obj = $dec[$idx][0];
    		
    		
    		//결과와 리턴 cd = -99 실패 , 
    		$row_idx = $obj['row_idx'];
    		
    		$atax_id = $obj['atax_id'];
    		$atax_yyyymmdd = $obj['atax_yyyymmdd'];
    		$atax_no = $obj['atax_no'];
    		$atax_type = $obj['atax_type'];
    		$atax_item_nm = $obj['atax_item_nm'];
    		$atax_item_cnt = $obj['atax_item_cnt'];
    		$atax_item_danga = $obj['atax_item_danga'];
    		$atax_supply_price = $obj['atax_supply_price'];
    		$atax_tax = $obj['atax_tax'];
    		$atax_customer_id = $obj['atax_customer_id'];
    		$atax_elect_flag = $obj['atax_elect_flag'];
    		$atax_jp_flag = $obj['atax_jp_flag'];
    		$atax_jp_no = $obj['atax_jp_no'];
    		$atax_bank_card_id = $obj['atax_bank_card_id'];
    		
    		if($atax_no == "")
    		{
    			$atax_no=$this->createAddTaxNum($co_id,$atax_yyyymmdd);
    		}
    		
    		if($atax_id == '') $atax_id = 0 ;
    		if($atax_jp_no == '') $atax_jp_no = 0 ;
    		
    		$sql = "INSERT INTO `add_tax`
							(`atax_id`, `co_id`, `atax_yyyymmdd`, `atax_no`, `atax_type`, `atax_item_nm`, `atax_item_cnt`, `atax_item_danga`, `atax_supply_price`,
								`atax_tax`, `atax_customer_id`, `atax_elect_flag`, `atax_jp_flag`, `atax_jp_no`, `atax_reg_date`, `atax_reg_uid`)
							VALUES
								($atax_id , $co_id, $atax_yyyymmdd, $atax_no, $atax_type, '$atax_item_nm', $atax_item_cnt
								, $atax_item_danga, $atax_supply_price, $atax_tax, $atax_customer_id, 
								'$atax_elect_flag', '$atax_jp_flag', $atax_jp_no, now(), $uid)
							ON DUPLICATE KEY UPDATE 
							`atax_id` = $atax_id,  `co_id` = $co_id, `atax_yyyymmdd` = $atax_yyyymmdd, `atax_no` = $atax_no, `atax_type` = $atax_type
							, `atax_item_nm` = '$atax_item_nm', `atax_item_cnt` = $atax_item_cnt, `atax_item_danga` = $atax_item_danga, `atax_supply_price` = $atax_supply_price
							, `atax_tax` = $atax_tax, `atax_customer_id` = $atax_customer_id, `atax_elect_flag` = '$atax_elect_flag', `atax_jp_flag` = '$atax_jp_flag'
							, `atax_jp_no` = $atax_jp_no, `atax_reg_uid` = $uid;";
    		
    						//, `atax_jp_no` = $atax_jp_no, `atax_reg_date` = now(), `atax_reg_uid` = $uid;";
    		
    		//throw new Exception($sql);
    		$this->updateSql($sql);
    		
    		//실패
    		$r['code']= - 99;
    		$r['row_idx']= $row_idx;
    		$r['atax_no'] = $atax_no;
    		$r['atax_id'] = $this->insert_id();
    		
    		if($r['atax_id'] != '0')
    		{
    			//성공
    			$r['code']= 200;
    		}
    		//throw new Exception($sql);
    		$result[$idx][0]=$r;
		}
		
		return $result;
	}
	
	//리스트 업
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$atax_yyyymm = (int)$this->param['atax_yyyymm'];
		$type = (int)$this->param['type'];
		
		$iftype = "";
		if($type != '') $iftype = "AND `atax_type` = $type ";
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$atax_yyyymmfrom = $atax_yyyymm.'00';
		$atax_yyyymmto = $atax_yyyymm.'32';
	
		$sql = "SELECT `atax_id`, `atax_yyyymmdd`, `atax_no`, `atax_type`, `atax_item_nm`, `atax_item_cnt`,
					`atax_item_danga`, `atax_supply_price`, `atax_tax`, `atax_customer_id`, `atax_elect_flag`,
						`atax_jp_flag`, `atax_jp_no`,  `atax_bank_card_id` 
				FROM `add_tax`
				WHERE co_id = $co_id and atax_yyyymmdd > $atax_yyyymmfrom and atax_yyyymmdd < $atax_yyyymmto $iftype order by  `atax_yyyymmdd`;";
	
		//echo $sql."<br/>";
		//throw new Exception("$sql");
	
		$this->querySql($sql);
	}
	
	/*
	- 전자 세금 계산서 
	1기 예정(1/1~3/31)
	1기 확정(4/1~6/30)
	2기 예정(7/1~9/30)
	2기 확정(10/1~12/31)
	
	11일 이전 이후는 기수별이 아니라 월별로 입니다
	예를들어 1월분은 2월11일까지 전자신고 발행해야 국세청 자동전송되게 되어 있어요. 
	 */
	//합계 조회
	public function requestSumList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_atax_yyyymm = (int)$this->param['from_atax_yyyymm'];
		$to_atax_yyyymm = (int)$this->param['to_atax_yyyymm'];
		$type1 = (int)$this->param['type1'];
		$type2 = (int)$this->param['type2'];
		//$atax_elect_flag = $this->param['atax_elect_flag'];		//y/n
		
		$from_atax_yyyymm = $from_atax_yyyymm.'00';
		$to_atax_yyyymm = $to_atax_yyyymm.'32';
				
		//11  -- 51,54
		$iftype = "";
		if($type2 != '')
		{
			$iftype = "AND (`atax_type` = $type1 or  `atax_type` = $type2) ";
		}
		else
		{
			$iftype = "AND `atax_type` = $type1 ";
		}
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$atax_yyyymmfrom = $atax_yyyymm.'00';
		$atax_yyyymmto = $atax_yyyymm.'32';
	
		$sql = "SELECT A.`atax_supply_price`, A.`atax_tax`,A.`atax_elect_flag`,  A.`atax_customer_id` , B.`tr_nm`,  B.`tr_daepyo`, B.`tr_saup_no`, B.`tr_up`, B.`tr_jong`
					FROM `add_tax` A , `customer` B
				where A.`co_id` = $co_id $iftype and `atax_yyyymmdd`>$from_atax_yyyymm and  `atax_yyyymmdd`<$to_atax_yyyymm 
						and  A.`co_id` = B.`co_id` and A.`atax_customer_id` = B.`customer_id` order by `atax_elect_flag` ,B.`tr_saup_no` , A.`atax_customer_id`";
		//where A.`co_id` = $co_id $iftype and `atax_yyyymmdd`>$from_atax_yyyymm and  `atax_yyyymmdd`<$to_atax_yyyymm  // and `atax_elect_flag` ='$atax_elect_flag'
	
		//echo $sql."<br/>";
		//throw new Exception("$sql");
	
		$this->querySql($sql);
		
		return $this->getNumRows();
	}
	
	//각 타입별 합계(계산서 발행분 , 미발행분 구별)
	public function requestAddTypeSum(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_atax_yyyymmdd = (int)$this->param['from_atax_yyyymmdd'];
		$to_atax_yyyymmdd = (int)$this->param['to_atax_yyyymmdd'];
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT 'y' flag, A.`atax_type` type, sum(A.`atax_supply_price`) sum_price, sum(A.`atax_tax`) sum_tax
					FROM `add_tax` A, `add_tax_type` B
				where A.`co_id` = $co_id and `atax_yyyymmdd`>$from_atax_yyyymmdd and  `atax_yyyymmdd`<$to_atax_yyyymmdd AND A.`atax_type` = B.`atax_type` and A.`atax_elect_flag`= 'y'
			    group by type
				UNION
			    SELECT 'n' flag, A.`atax_type` type, sum(A.`atax_supply_price`) sum_price, sum(A.`atax_tax`) sum_tax
					FROM `add_tax` A, `add_tax_type` B
				where A.`co_id` = $co_id and `atax_yyyymmdd`>$from_atax_yyyymmdd and  `atax_yyyymmdd`<$to_atax_yyyymmdd AND A.`atax_type` = B.`atax_type` and A.`atax_elect_flag`= 'n'
			    group by type";
		//throw new Exception("$sql");
		$this->querySql($sql);
	
		return $this->getNumRows();
	}
	
	//합계 검증 조회
	public function requestVerifySumList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_atax_yyyymm = (int)$this->param['from_atax_yyyymm'];
		$to_atax_yyyymm = (int)$this->param['to_atax_yyyymm'];
		$type1 = (int)$this->param['type1'];
		$type2 = (int)$this->param['type2'];
		//$atax_elect_flag = $this->param['atax_elect_flag'];		//y/n
		
		$from_atax_yyyymm = $from_atax_yyyymm.'00';
		$to_atax_yyyymm = $to_atax_yyyymm.'32';
				
		//11  -- 51,54
		$iftype = "";
		if($type2 != '')
		{
			$iftype = "AND (`atax_type` = $type1 or  `atax_type` = $type2) ";
		}
		else
		{
			$iftype = "AND `atax_type` = $type1 ";
		}
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$atax_yyyymmfrom = $atax_yyyymm.'00';
		$atax_yyyymmto = $atax_yyyymm.'32';
	
		
		$sql = "SELECT `atax_elect_flag` , count(*), sum(`atax_supply_price`), sum(`atax_tax`)
						FROM `add_tax` where `co_id` = $co_id $iftype 
								and `atax_yyyymmdd`>$from_atax_yyyymm and  `atax_yyyymmdd`<$to_atax_yyyymm group by `atax_elect_flag`;";

		//echo $sql."<br/>";
		//throw new Exception("$sql");
	
		$this->querySql($sql);
		
		return $this->getNumRows();
	}

	//세부 전표 조회 
	public function requestJpList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$atax_yyyymmdd = (int)$this->param['atax_yyyymmdd'];
		$jp_no = (int)$this->param['jp_no']; 
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT `jp_id`, `jp_no`,  `gycode`,  `customer_id`,  `jakmok_code`,  `debit`,  `credit`,  `jp_rem`,  `jp_view_gubun`    
				FROM `junpyo` where co_id = $co_id and `jp_yyyymmdd` = $atax_yyyymmdd and `jp_no` = $jp_no and `jp_view` = 'y' and `jp_input_flag` = 'a';";
		//throw new Exception($sql);
		
		$this->querySql($sql);
	}
	
	//삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
	
		
		/*$json='{
			"0": { "atax_id":"3", "atax_jp_no": "0", "row_idx" : 1 },
			"1": { "atax_id":"5",  "atax_jp_no": "0", "row_idx" : 2 }
		}';*/
		
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result=array();
		
		for($idx=0;$idx<count($dec);$idx++)
		{
			$obj = $dec[$idx];
			$atax_id=$obj['atax_id'];
			$atax_jp_no=$obj['atax_jp_no'];
			$atax_yyyymmdd=$obj['atax_yyyymmdd'];
			$row_idx=$obj['row_idx'];
			
			if($atax_jp_no == '') $atax_jp_no = 0;
			//트랜젝션 시작
			$this->startTransaction();
			
			//전표 있으면
			if($atax_jp_no!= 0 )
			{
				//삭제
				$sql = "DELETE FROM junpyo WHERE co_id=$co_id and jp_yyyymmdd=$atax_yyyymmdd and jp_no=$atax_jp_no and jp_input_flag = 'a';";
				$this->updateSql($sql);
			}
			
			//부가세 테이블 삭제
			$sql = "DELETE FROM add_tax WHERE co_id = $co_id and atax_id=$atax_id;";
			//echo $sql."<br>";
			//throw new Exception($sql);
			
			$this->updateSql($sql);
				
			$sql = "SELECT ROW_COUNT()";
				//echo $sql."<br>";
			$this->querySql($sql);
			$row = $this->fetchArrayRow();
				
			if($row[0]>0){
				//종료 커밋
				$this->commit();
				$result[$idx]['code']=200;
				$result[$idx]['row_idx']=$row_idx;
			}else{
				$this->rollback();
				$result[$idx]['code']='-1';
				$result[$idx]['row_idx']=$row_idx;
			}
		}
	
	return $result;
	}
	
	//등록 및 수정
	public function requestAdvRegData(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
	
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata, true);
		$result = array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		foreach ($dec as $idx => $obj) {
			//결과
			$master_r =  array();
			$detail_r =  array();
			
			//마스터 데이터
			$master_obj = $obj['master'];
			
			$atax_id = $master_obj['atax_id'];
			$atax_yyyymmdd = $master_obj['atax_yyyymmdd'];
			$atax_no = $master_obj['atax_no'];
			$atax_type = $master_obj['atax_type'];
			$atax_item_nm = $master_obj['atax_item_nm'];
			$atax_item_cnt = $master_obj['atax_item_cnt'];
			$atax_item_danga = $master_obj['atax_item_danga'];
			$atax_supply_price = $master_obj['atax_supply_price'];
			$atax_tax = $master_obj['atax_tax'];
			$atax_customer_id = $master_obj['atax_customer_id'];
			
			$atax_elect_flag = $master_obj['atax_elect_flag'];
			if($atax_elect_flag == '1') $atax_elect_flag = 'y';
			if($atax_elect_flag == '2') $atax_elect_flag = 'n';
			
			$atax_jp_flag = $master_obj['atax_jp_flag'];
			$atax_jp_no = $master_obj['atax_jp_no'];
			
			//트랜젝션 시작
			$this->startTransaction();
			
			if($atax_jp_flag == 0)
			{
				if($atax_jp_no!= 0 )
				{
					//삭제
					$sql = "DELETE FROM junpyo WHERE co_id=$co_id and jp_yyyymmdd=$atax_yyyymmdd and jp_no=$atax_jp_no and jp_input_flag = 'a';";
					$this->updateSql($sql);
					
					$atax_jp_no = 0;
				}
			}
			else
			{
				if($atax_jp_no!= 0)
				{
					if ($obj['detail'])
					{
						//삭제(수정)
						$sql = "DELETE FROM junpyo WHERE co_id=$co_id and jp_yyyymmdd=$atax_yyyymmdd and jp_no=$atax_jp_no and jp_input_flag = 'a';";
						$this->updateSql($sql);
						
						//전표 삽입
						$detail_arr = $obj['detail'];
						
						for($dIdx=0;$dIdx<count($detail_arr);$dIdx++)
						{
							$jp_obj = $detail_arr[$dIdx];
							
							$jp_view_gubun = $jp_obj['jp_view_gubun'];
							$gycode = $jp_obj['gycode'];
							$credit = $jp_obj['credit'];
							$debit = $jp_obj['debit'];
							$customer_id = $jp_obj['customer_id'];
							
							if($credit =='') $credit = 0;
							if($debit =='') $debit = 0;
							if($customer_id =='') $customer_id = 0;
							
							$jp_rem = $jp_obj['jp_rem'];
							$jakmok_code = $jp_obj['jakmok_code'];
							if($jakmok_code == '') $jakmok_code = 0;
							
							
							$insertSql = "INSERT INTO `junpyo` (`co_id`, `jp_yyyymmdd`, `jp_no`, `jp_gubun`, `gycode`, `customer_id`,
																`jakmok_code`,`debit`,`credit`,`jp_rem`,`jp_view`,`jp_view_gubun`,`reg_uid`,
																`reg_date`,`jp_match_id`,`jp_input_flag`)
												VALUES ($co_id, $atax_yyyymmdd, $atax_jp_no, $jp_view_gubun, $gycode, $customer_id,
														$jakmok_code, $debit, $credit, '$jp_rem', 'y', $jp_view_gubun, $uid,
														now(), 0, 'a');";
							$this->updateSql($insertSql);
							
							//인써트
							$detail_r[$dIdx]['jp_id'] = $this->insert_id();
						}
					}
				}
				else
				{
					//전표 번호 생성
					$atax_jp_no = $this->createJpNum($co_id,$atax_yyyymmdd);
					
					//전표 삽입
					$detail_arr = $obj['detail'];
						
					for($dIdx=0;$dIdx<count($detail_arr);$dIdx++)
					{
						$jp_obj = $detail_arr[$dIdx];
						
						$jp_view_gubun = $jp_obj['jp_view_gubun'];
						$gycode = $jp_obj['gycode'];
						$credit = $jp_obj['credit'];
						$debit = $jp_obj['debit'];
						$customer_id = $jp_obj['customer_id'];
						
						if($credit =='') $credit = 0;
						if($debit =='') $debit = 0;
						if($customer_id =='') $customer_id = 0;
						
						$jp_rem = $jp_obj['jp_rem'];
						$jakmok_code = $jp_obj['jakmok_code'];
						if($jakmok_code == '') $jakmok_code = 0;
						
						
						$insertSql = "INSERT INTO `junpyo` (`co_id`, `jp_yyyymmdd`, `jp_no`, `jp_gubun`, `gycode`, `customer_id`,
															`jakmok_code`,`debit`,`credit`,`jp_rem`,`jp_view`,`jp_view_gubun`,`reg_uid`,
															`reg_date`,`jp_match_id`,`jp_input_flag`)
											VALUES ($co_id, $atax_yyyymmdd, $atax_jp_no, $jp_view_gubun, $gycode, $customer_id,
													$jakmok_code, $debit, $credit, '$jp_rem', 'y', $jp_view_gubun, $uid,
													now(), 0, 'a');";
						$this->updateSql($insertSql);
						
						//인써트
						$detail_r[$dIdx]['jp_id'] = $this->insert_id();
					}
				}				
			}
			
			//부가세 테이블 - 삽입 또는 수정
			if($atax_no == "")
			{
				$atax_no=$this->createAddTaxNum($co_id, $atax_yyyymmdd);
			}
			
			if($atax_id == '') $atax_id = 0 ;
			
			
			$sql = "INSERT INTO `add_tax`(`atax_id`, `co_id`, `atax_yyyymmdd`, `atax_no`, `atax_type`, `atax_item_nm`, `atax_item_cnt`, `atax_item_danga`, `atax_supply_price`,
											`atax_tax`, `atax_customer_id`, `atax_elect_flag`, `atax_jp_flag`, `atax_jp_no`, `atax_reg_date`, `atax_reg_uid` )
									VALUES
										($atax_id , $co_id, $atax_yyyymmdd, $atax_no, $atax_type, '$atax_item_nm', $atax_item_cnt
											, $atax_item_danga, $atax_supply_price, $atax_tax, $atax_customer_id, '$atax_elect_flag', '$atax_jp_flag', $atax_jp_no, now(), $uid)
					ON DUPLICATE KEY UPDATE
						`atax_id` = $atax_id,  `co_id` = $co_id, `atax_yyyymmdd` = $atax_yyyymmdd, `atax_no` = $atax_no, `atax_type` = $atax_type
						, `atax_item_nm` = '$atax_item_nm', `atax_item_cnt` = $atax_item_cnt, `atax_item_danga` = $atax_item_danga, `atax_supply_price` = $atax_supply_price
						, `atax_tax` = $atax_tax, `atax_customer_id` = $atax_customer_id, `atax_elect_flag` = '$atax_elect_flag', `atax_jp_flag` = '$atax_jp_flag'
						, `atax_jp_no` = $atax_jp_no, `atax_reg_uid`=$uid;";
			
			//, `atax_jp_no` = $atax_jp_no, `atax_reg_date` = now(), `atax_reg_uid`=$uid;";
			
			//throw new Exception($sql);
			$this->updateSql($sql);
			
			//성공
			$master_r['atax_jp_no']= $atax_jp_no;
			$master_r['atax_no'] = $atax_no;
			$master_r['atax_id'] = $this->insert_id();
			
			//종료 커밋
			$this->commit();
			
			$result[$idx]['master']=$master_r;
			$result[$idx]['detail']=$detail_r;
		}
		
		return $result;
	}
	
	private function createJpNum($co_id,$jp_yyyymmdd)
	{
		//전표 번호 구하기 [10000번 이상 20000미만] - 자동분개
		$sql_jp_no ="SELECT max(jp_no) FROM junpyo WHERE co_id = $co_id AND jp_yyyymmdd=$jp_yyyymmdd AND jp_no>=10000 AND jp_no<20000;";
		$this->querySql($sql_jp_no);
		$row =$this->fetchArrayRow();
		if($row[0]==0) return 10000;
		return $row[0]+1;
	}
	
	//부가세 신고 
	public function requestClaim(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$from_atax_yyyymmdd = (int)$this->param['from_atax_yyyymmdd'];
		$to_atax_yyyymmdd = (int)$this->param['to_atax_yyyymmdd'];
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT 511 `atax_type` , sum(B.credit) price  FROM add_tax A , junpyo B 
				where A.atax_type = 51 and A.co_id = $co_id
				and jp_yyyymmdd >= $from_atax_yyyymmdd and jp_yyyymmdd <= $to_atax_yyyymmdd 
				and A.atax_jp_no = B.jp_no and B.gycode >= 161 and B.gycode <= 199";
		$this->querySql($sql);
		
		$res=array();
		
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
			$res['atax_tax'] = (int)$res['atax_supply_price'] * 0.1;
		}
		
		$sql = "SELECT `atax_type` type, sum(`atax_supply_price`) price, sum(`atax_tax`) tax
						FROM `add_tax` WHERE co_id = $co_id and atax_yyyymmdd >= $from_atax_yyyymmdd 
							and atax_yyyymmdd <= $to_atax_yyyymmdd group by `atax_type`;";
		//echo $sql."<br/>";
		//throw new Exception("$sql");
	
		$this->querySql($sql);
		
		return $res;
	}
}

?>