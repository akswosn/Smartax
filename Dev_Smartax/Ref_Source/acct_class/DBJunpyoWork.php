<?php
//
define(JP_GUBUN_CASH_OUT,1);
define(JP_GUBUN_CASH_IN,2);
define(JP_GUBUN_DEBIT,3);
define(JP_GUBUN_CREDIT,4);

define(GYCODE_CASH,101);
define(GYCODE_BANK,103);
define(GYCODE_CARD_CREDIT,202);
define(GYCODE_CARD_DEBIT,112);
define(GYCODE_PAYABLES,201);
define(GYCODE_RECEIVABLES,108);

//$r['code']= -999; // 마감 오류
class DBJunpyoWork extends DBWork
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
	
	//등록 및 수정
	public function requestRegBankData(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
			  
		  //5 -> 예금 지급  // 209 차입금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"200","credit":"0","jp_rem":"예금 지급"
							,"jp_view_gubun":"5", "match_customer_id":"97662"}
						]
					"0":[
							{"jp_id":"68","jp_no":"1","jp_match_id":"67",
		  	 				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"20012300","credit":"0","jp_rem":"예금 지급"
							,"jp_view_gubun":"5", "match_customer_id":"97662"}
						]	  
		   
		  */
		  
		  //6 -> 예금 수취  // 241 자본금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"241","debit":"0","credit":"20000","jp_rem":"예금 수취"
							,"jp_view_gubun":"6"}
						]
					"0":[
							{"jp_id":"77","jp_no":"5","jp_match_id":"76",
		  	 				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"241","debit":"0","credit":"20012300","jp_rem":"예금 수취"
							,"jp_view_gubun":"6"}
						]		  
		   
		  
		 
		$json='{"0":[{"row_idx":1,"jp_id":"","customer_id":"","gycode":"401","jakmok_code":"","jp_no":"","jp_view_gubun":2,"jp_rem":"","debit":"","credit":1000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130502"}]
,"1":[{"row_idx":2,"jp_id":"","customer_id":"","gycode":"401","jakmok_code":"","jp_no":"","jp_view_gubun":2,"jp_rem":"","debit":"","credit":2000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130503"}]
,"2":[{"row_idx":3,"jp_id":"","customer_id":"","gycode":"301","jakmok_code":"","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":4500,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130504"}]
,"3":[{"row_idx":4,"jp_id":"","customer_id":"","gycode":"301","jakmok_code":"","jp_no":"","jp_view_gubun":6,"jp_rem":"","debit":"","credit":50000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130504"}]
,"4":[{"row_idx":0,"jp_id":"","customer_id":"","gycode":"301","jakmok_code":"","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":25000,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130501"}]}  ';
		 
		$json='{"0":[{"row_idx":0,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":3,"jp_rem":"","debit":45000,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130501"}
						,{"row_idx":1,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":4,"jp_rem":"","debit":"","credit":45000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130501"}]
				,"1":[{"row_idx":2,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":1,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130502"}]
				,"2":[{"row_idx":3,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":2,"jp_rem":"","debit":"","credit":3,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130502"}]
				,"3":[{"row_idx":4,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":4,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130503"}]} ';
		*/
		
		 //json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result=array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		for($idx=0;$idx<count($dec);$idx++){
			$r=array();
    		$obj = $dec[$idx];
    		
			//echo "idx  ---> $idx<br>";
			
			if(count($obj)==1)
			{
				//echo "$idx --> 한줄 전표<br>";
				//한줄 전표
				$info = $obj[0];
				
				//대변 차변 오류 -> 오류 코드 99
				$re=$this->vaildationAmt($info);
				if($re==null){
					$r['code']='99';
					$result[$idx]=$r;
					continue;
				}
				
				switch ($info['jp_view_gubun']) {
					//예금 지급
					case '5':
						//if($re['amt']='debit' && $info['gycode']!=GYCODE_BANK){
						if($re['amt']='debit'){
							//echo "case 5-1 <br/>";
							if($info['match_customer_id'] == '' || $info['match_customer_id'] == 0) $info['match_customer_id'] = -1;
							$r=$this->regExceptCashJunpyo2($info,$re,$co_id,$uid,JP_GUBUN_DEBIT,JP_GUBUN_CREDIT,GYCODE_BANK,$info['match_customer_id']);
						}
						else
						{
							//echo "case 5-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;

					//예금 수취
					case '6':
						//if($re['amt']='credit' && $info['gycode']!=GYCODE_BANK){
						if($re['amt']='credit'){
							//echo "case 6-1 <br/>";
							if($info['match_customer_id'] == '' || $info['match_customer_id'] == 0) $info['match_customer_id'] = -1;
							$r=$this->regExceptCashJunpyo2($info,$re,$co_id,$uid,JP_GUBUN_CREDIT,JP_GUBUN_DEBIT,GYCODE_BANK,$info['match_customer_id']);
						}
						else
						{
							//echo "case 6-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
				}
				$result[$idx][0]=$r;
			}
			else if(count($obj)>1)
			{
				//echo "$idx --> 두줄 이상 전표<br>";
				//두줄 이상 전표(대체 전표)
				$result[$idx]=$this->regDebitCreditJunpyo($obj,$co_id,$uid); 
			}
			$info=null;
		}
		return $result;
	}

	private function regExceptCashJunpyo2($info,$re,$co_id,$uid,$jp_gubun,$match_jp_gubun,$match_gycode,$match_customer_id)
	{
		//값 가져오기
		$jp_yyyymmdd = $info['jp_yyyymmdd'];
		if($this->isCloseYear($jp_yyyymmdd)=='y')
		{
			$result['code']= -999;
			return $result;
		}
		
		$gycode = $info['gycode'];
		$customer_id = (int)$info['customer_id'];
		$jakmok_code = $info['jakmok_code'];
		$debit = $info['debit'];
		$credit = $info['credit'];
		
		$match_debit = $re['match_debit'];
		$match_credit = $re['match_credit'];
		
		if($match_customer_id != 0 ){
			$sql = "SELECT `tr_nm` FROM `customer` where `customer_id` = $match_customer_id and `co_id` = $co_id;";
			$this->querySql($sql);
			$item=$this->fetchMixedRow();
			
			$jp_rem = "[통장, $match_customer_id $item[tr_nm]] ".$info['jp_rem'];
		}
		else $jp_rem = "[통장] ".$info['jp_rem'];
		
		$jp_input_flag = "1";   // 통장 입력 
		$jp_view_gubun = $info['jp_view_gubun'];
		
		$row_idx = $info['row_idx'];
		
		//업데이트 여부
		$jp_id=$info['jp_id'];
		$pre_date=$info['pre_date'];
		$jp_no=$info['jp_no'];
		$jp_match_id=$info['jp_match_id'];
		
		
		if($jp_match_id==0)
			$jp_match_id=0;
		
		if($jp_id==0)
			 $jp_id=0;
		
		//초기값 없으면 기본 값으로 세팅
		if($match_customer_id==null or $match_customer_id=='')	$match_customer_id = 0;
		if($customer_id==null or $customer_id=='')	$customer_id = 0;
		if($jakmok_code==null or $jakmok_code=='')	$jakmok_code = 0;
		if($debit==null or $debit=='')		$debit = 0;
		if($credit==null or $credit=='')	$credit = 0;
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//전표 번호 구하기
		if($pre_date!='' or $jp_no==0)
			$jp_no=$this->createJpNum($co_id,$jp_yyyymmdd);
		
		//저장 1-> 논리 데이터 
		$sql1 ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
								debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id,jp_input_flag)
					VALUES ($jp_match_id,$co_id,$jp_yyyymmdd,$jp_no,$match_jp_gubun,$match_gycode,$match_customer_id,$jakmok_code,
								$match_debit,$match_credit,'$jp_rem','n',$jp_view_gubun,$uid,now(),0,$jp_input_flag)
					ON DUPLICATE KEY UPDATE 
						`jp_id` = $jp_match_id,`co_id` = $co_id,`jp_yyyymmdd` = $jp_yyyymmdd, `jp_no` = $jp_no, `jp_gubun` = $match_jp_gubun, `gycode` = $match_gycode, 
						`customer_id` = $match_customer_id,`jakmok_code` = $jakmok_code, `debit` = $match_debit,	`credit` = $match_credit, `jp_rem` = '$jp_rem', 
						`jp_view` = 'n',`jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = 0, `jp_input_flag` = $jp_input_flag";
		
		//echo "<br/>".$sql1."<br/>";
										
		$this->updateSql($sql1);
		//echo "1<br/>";
		if($jp_match_id==0)
			$jp_match_id = $this->insert_id();
		//echo "2<br/>";										
		//저장 2 -> 입력 데이터
		$sql2 ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
								debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id,jp_input_flag)
					VALUES ($jp_id,$co_id,$jp_yyyymmdd,$jp_no,$jp_gubun,$gycode, $customer_id ,$jakmok_code,
								$debit,$credit,'$jp_rem','y',$jp_view_gubun,$uid,now(),$jp_match_id,$jp_input_flag)
					ON DUPLICATE KEY UPDATE 
						`jp_id` = $jp_id,`co_id` = $co_id,`jp_yyyymmdd` = $jp_yyyymmdd, `jp_no` = $jp_no, `jp_gubun` = $jp_gubun, `gycode` = $gycode, 
						`customer_id` = $customer_id ,`jakmok_code` = $jakmok_code, `debit` = $debit,	`credit` = $credit, `jp_rem` = '$jp_rem', 
						`jp_view` = 'y',`jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = $jp_match_id , `jp_input_flag` = $jp_input_flag";
		//echo "<br/>".$sql2."<br/>";
		
		$this->updateSql($sql2);
		//echo "3<br/>";
		//throw new Exception($sql1." <--------------> ". $sql2 );
		//확인
		if($jp_id==$this->insert_id())
		{
			//업데이트
			$result['jp_id'] =$jp_id;
			$this->commit();
			$result['code']=$row_idx;
		}
		else if($jp_id==0)
		{
			//인써트
			$result['jp_id'] = $this->insert_id();
			$this->commit();
			$result['code']=$row_idx;
		}
		else if($jp_match_id==0)
		{
			//오류 
			$this->rollback();
			//쿼리 오류
			$result['code']=-99;
		}
		
		$result['jp_match_id'] = $jp_match_id;
		$result['jp_yyyymmdd'] = $jp_yyyymmdd;
		$result['jp_no'] = $jp_no;
		
		return $result;
	}
	
	//등록 및 수정
	public function requestRegData(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
		
		//1 -> 현금 출금  // 402 비료비 , 금액 100;
		/*
		 			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"402","debit":"100","credit":"0","jp_rem":"현금 출금"
							,"jp_view_gubun":"1"}
						]

		  		 		"0":[{"jp_id":"50","jp_no":"1",
							"jp_yyyymmdd":"20131013","customer_id":"2","jakmok_code":"1"
							,"gycode":"402","debit":"10000","credit":"0","jp_rem":"현금 출금"
							,"jp_view_gubun":"1"}]
		  
		 
		  
		  		 */
		 //1 -> 현금 출금  // 209 차입금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"200","credit":"0","jp_rem":"현금 출금"
							,"jp_view_gubun":"1"}
						]
		  			"0":[
							{"jp_id":"51","jp_no":"1",
		   					"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"20000","credit":"0","jp_rem":"현금 출금"
							,"jp_view_gubun":"1"}
						]
		   
		  */
		
		//2 -> 현금입금  // 301 비료비 , 금액 100;
		/*
		 			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"100","jp_rem":"현금입금"
							,"jp_view_gubun":"2"}
						]
					"0":[
							{"jp_id":"57","jp_no":"1",
		  					"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"1000000","jp_rem":"현금입금"
							,"jp_view_gubun":"2"}
						]		 
		 */
		 //2 -> 현금입금  // 209 차입금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"20000","jp_rem":"현금입금"
							,"jp_view_gubun":"2"}
						]
					"0":[
							{"jp_id":"58","jp_no":"2",
		  	 				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"20012300","jp_rem":"현금입금"
							,"jp_view_gubun":"2"}
						]	  
		   
		  */
		  
		  
		  //5 -> 예금 지급  // 209 차입금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"200","credit":"0","jp_rem":"예금 지급"
							,"jp_view_gubun":"5"}
						]
					"0":[
							{"jp_id":"68","jp_no":"1","jp_match_id":"67",
		  	 				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"20012300","credit":"0","jp_rem":"예금 지급"
							,"jp_view_gubun":"5"}
						]	  
		   
		  */
		  
		  //6 -> 예금 수취  // 241 자본금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"241","debit":"0","credit":"20000","jp_rem":"예금 수취"
							,"jp_view_gubun":"6"}
						]
					"0":[
							{"jp_id":"77","jp_no":"5","jp_match_id":"76",
		  	 				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"241","debit":"0","credit":"20012300","jp_rem":"예금 수취"
							,"jp_view_gubun":"6"}
						]		  
		   
		  */
		  
		  //7 -> 카드지출  // 429 차입금 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"429","debit":"30000","credit":"0","jp_rem":"카드지출"
							,"jp_view_gubun":"7"}
						]
					"0":[
							{ "jp_id":"81","jp_no":"1","jp_match_id":"80",
							"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"429","debit":"3012000","credit":"0","jp_rem":"카드지출"
							,"jp_view_gubun":"7"}
						]		  
		   
		  */
		  
		  //8 -> 카드매출  // 301 판매수입 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20000","jp_rem":"카드매출"
							,"jp_view_gubun":"8"}
						]
					"0":[
							{ "jp_id":"81","jp_no":"1","jp_match_id":"80",
		  	 				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20012300","jp_rem":"카드매출"
							,"jp_view_gubun":"8"}
						]	  
		   
		  */
		  
		  //9 -> 외상매입  // 401 종묘비 , 금액 200
		  /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"20000","jp_rem":"외상매입"
							,"jp_view_gubun":"9"}
						]
					"0":[
							{"jp_id":"86","jp_no":"3","jp_match_id":"87",
							"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"2001200","jp_rem":"외상매입"
							,"jp_view_gubun":"9"}
						]		  
		  */
		  
		  //10 -> 외상매출  // 301 판매수입 , 금액 200
		 /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20000","jp_rem":"외상매출"
							,"jp_view_gubun":"10"}
						]
					"0":[
							{"jp_id":"88","jp_no":"3","jp_match_id":"89",
								"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"222000","jp_rem":"외상매출"
							,"jp_view_gubun":"10"}
						]		  
		   
		  */
		  
		  /*
		  "0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"402","debit":"100","credit":"0","jp_rem":"현금 출금"
							,"jp_view_gubun":"1"}
						]
					,"1":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"100","jp_rem":"현금입금"
							,"jp_view_gubun":"2"}
						]
					,"2":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"200","credit":"0","jp_rem":"예금 지급"
							,"jp_view_gubun":"5"}
						]
					,"3":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"241","debit":"0","credit":"20000","jp_rem":"예금 수취"
							,"jp_view_gubun":"6"}
						]
					,"4":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"429","debit":"30000","credit":"0","jp_rem":"카드지출"
							,"jp_view_gubun":"7"}
						]
					,"5":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20000","jp_rem":"카드매출"
							,"jp_view_gubun":"8"}
						]
					,"6":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"20000","jp_rem":"외상매입"
							,"jp_view_gubun":"9"}
						]
					,"7":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20000","jp_rem":"외상매출"
							,"jp_view_gubun":"10"}
						]
		   
		   */
		
		//3,4 -> 외상매입  // 402 비료비, 403 농약비, 201 외상매입금
		  /*			
		  			"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"402","debit":"3000","credit":"0","jp_rem":"대체전표"
							,"jp_view_gubun":"3"} ,   
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"403","debit":"3000","credit":"0","jp_rem":"대체전표"
							,"jp_view_gubun":"3"} , 
		    				{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"6000","jp_rem":"대체전표"
							,"jp_view_gubun":"4"}
						]
					"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"402","debit":"3000","credit":"0","jp_rem":"대체전표"
							,"jp_view_gubun":"3"} ,   
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"403","debit":"3000","credit":"0","jp_rem":"대체전표"
							,"jp_view_gubun":"3"} , 
		    				{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"6000","jp_rem":"대체전표"
							,"jp_view_gubun":"4"}
						]		  
		  */
		
		/*
		$json='{
					"0":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"402","debit":"100","credit":"0","jp_rem":"현금 출금"
							,"jp_view_gubun":"1"}
						]
					,"1":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"100","jp_rem":"현금입금"
							,"jp_view_gubun":"2"}
						]
					,"2":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"200","credit":"0","jp_rem":"예금 지급"
							,"jp_view_gubun":"5"}
						]
					,"3":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"241","debit":"0","credit":"20000","jp_rem":"예금 수취"
							,"jp_view_gubun":"6"}
						]
					,"4":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"429","debit":"30000","credit":"0","jp_rem":"카드지출"
							,"jp_view_gubun":"7"}
						]
					,"5":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20000","jp_rem":"카드매출"
							,"jp_view_gubun":"8"}
						]
					,"6":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"20000","jp_rem":"외상매입"
							,"jp_view_gubun":"9"}
						]
					,"7":[
							{"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"301","debit":"0","credit":"20000","jp_rem":"외상매출"
							,"jp_view_gubun":"10"}
						]
					,"8":[
							{
							"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"402","debit":"5000","credit":"0","jp_rem":"대체전표"
							,"jp_view_gubun":"3"} ,   
							{
							"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"403","debit":"3000","credit":"0","jp_rem":"대체전표"
							,"jp_view_gubun":"3"} , 
		    				{
		    				"jp_yyyymmdd":"20131013","customer_id":"1","jakmok_code":"1"
							,"gycode":"209","debit":"0","credit":"8000","jp_rem":"대체전표"
							,"jp_view_gubun":"4"}
						]
				}'; 
		$json='{"0":[{"row_idx":1,"jp_id":"","customer_id":"","gycode":"401","jakmok_code":"","jp_no":"","jp_view_gubun":2,"jp_rem":"","debit":"","credit":1000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130502"}]
,"1":[{"row_idx":2,"jp_id":"","customer_id":"","gycode":"401","jakmok_code":"","jp_no":"","jp_view_gubun":2,"jp_rem":"","debit":"","credit":2000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130503"}]
,"2":[{"row_idx":3,"jp_id":"","customer_id":"","gycode":"301","jakmok_code":"","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":4500,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130504"}]
,"3":[{"row_idx":4,"jp_id":"","customer_id":"","gycode":"301","jakmok_code":"","jp_no":"","jp_view_gubun":6,"jp_rem":"","debit":"","credit":50000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130504"}]
,"4":[{"row_idx":0,"jp_id":"","customer_id":"","gycode":"301","jakmok_code":"","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":25000,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130501"}]}  ';
		 
		$json='{"0":[{"row_idx":0,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":3,"jp_rem":"","debit":45000,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130501"}
						,{"row_idx":1,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":4,"jp_rem":"","debit":"","credit":45000,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130501"}]
				,"1":[{"row_idx":2,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":1,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130502"}]
				,"2":[{"row_idx":3,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":2,"jp_rem":"","debit":"","credit":3,"jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130502"}]
				,"3":[{"row_idx":4,"jp_id":"","customer_id":"","gycode":"108","jakmok_code":"03","jp_no":"","jp_view_gubun":1,"jp_rem":"","debit":4,"credit":"","jp_match_id":"","pre_date":"","jp_yyyymmdd":"20130503"}]} ';
		*/
		
		 //json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result=array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		for($idx=0;$idx<count($dec);$idx++){
			$r=array();
    		$obj = $dec[$idx];
    		
			//echo "idx  ---> $idx<br>";
			
			if(count($obj)==1)
			{
				//echo "$idx --> 한줄 전표<br>";
				//한줄 전표
				$info = $obj[0];
				
				//대변 차변 오류 -> 오류 코드 99
				$re=$this->vaildationAmt($info);
				if($re==null){
					$r['code']='99';
					$result[$idx]=$r;
					continue;
				}
				
				switch ($info['jp_view_gubun']) {
					//현금 출금  
					case '1':
						if($re['amt']=='debit' && $info['gycode']!=GYCODE_CASH){
							//echo "case 1-1 <br/>";
							$r=$this->regCashJunpyo($info,$co_id,$uid,JP_GUBUN_CASH_OUT);
						}
						else
						{
							//echo "case 1-2 <br/>";
							//대변 차변 오류
							//개정오류
							$r['code']='99';
						}
						break;
					
					//현금 입금
					case '2':
						if($re['amt']='credit' && $info['gycode']!=GYCODE_CASH){
							//echo "case 2-1 <br/>";
							$r=$this->regCashJunpyo($info,$co_id,$uid,JP_GUBUN_CASH_IN);
						}
						else
						{
							//echo "case 2-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
					
					//오류	
					case '3':
					case '4':
						//type2 오류
						$r['code']='98';
						break;
					
					//예금 지급
					case '5':
						if($re['amt']='debit' && $info['gycode']!=GYCODE_BANK){
							//echo "case 5-1 <br/>";
							if($info['match_customer_id'] == '' || $info['match_customer_id'] == 0) $info['match_customer_id'] = -1;
							$r=$this->regExceptCashJunpyo($info,$re,$co_id,$uid,JP_GUBUN_DEBIT,JP_GUBUN_CREDIT,GYCODE_BANK,$info['match_customer_id']);
						}
						else
						{
							//echo "case 5-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;

					//예금 수취
					case '6':
						if($re['amt']='credit' && $info['gycode']!=GYCODE_BANK){
							//echo "case 6-1 <br/>";
							if($info['match_customer_id'] == '' || $info['match_customer_id'] == 0) $info['match_customer_id'] = -1;
							$r=$this->regExceptCashJunpyo($info,$re,$co_id,$uid,JP_GUBUN_CREDIT,JP_GUBUN_DEBIT,GYCODE_BANK,$info['match_customer_id']);
						}
						else
						{
							//echo "case 6-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
					
					//카드 매입
					case '7':
						if($re['amt']='debit' && $info['gycode']!=GYCODE_CARD_CREDIT){
							//echo "case 7-1 <br/>";
							if($info['match_customer_id'] == '' || $info['match_customer_id'] == 0) $info['match_customer_id'] = -1;
							$r=$this->regExceptCashJunpyo($info,$re,$co_id,$uid,JP_GUBUN_DEBIT,JP_GUBUN_CREDIT,GYCODE_CARD_CREDIT,$info['match_customer_id']);
						}
						else
						{
							//echo "case 7-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
					
					//카드 매출
					case '8':
						if($re['amt']='credit' && $info['gycode']!=GYCODE_CARD_DEBIT){
							//echo "case 8-1 <br/>";
							if($info['match_customer_id'] == '' || $info['match_customer_id'] == 0) $info['match_customer_id'] = -1;
							$r=$this->regExceptCashJunpyo($info,$re,$co_id,$uid,JP_GUBUN_CREDIT,JP_GUBUN_DEBIT,GYCODE_CARD_DEBIT,$info['match_customer_id']);
						}
						else
						{
							//echo "case 8-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
					
					//외상 매입
					case '9':
						if($re['amt']='debit' && $info['gycode']!=GYCODE_PAYABLES){
							//echo "case 9-1 <br/>";
							$r=$this->regExceptCashJunpyo($info,$re,$co_id,$uid,JP_GUBUN_DEBIT,JP_GUBUN_CREDIT,GYCODE_PAYABLES,0);
						}
						else
						{
							//echo "case 9-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
					
					//외상 매출
					case '10':
						if($re['amt']='credit' && $info['gycode']!=GYCODE_RECEIVABLES){
							//echo "case 10-1 <br/>";
							$r=$this->regExceptCashJunpyo($info,$re,$co_id,$uid,JP_GUBUN_CREDIT,JP_GUBUN_DEBIT,GYCODE_RECEIVABLES,0);
						}
						else
						{
							//echo "case 10-2 <br/>";
							//대변 차변 오류
							$r['code']='99';
						}
						break;
					
					
				}
				$result[$idx][0]=$r;
			}
			else if(count($obj)>1)
			{
				//echo "$idx --> 두줄 이상 전표<br>";
				//두줄 이상 전표(대체 전표)
				$result[$idx]=$this->regDebitCreditJunpyo($obj,$co_id,$uid); 
			}
			$info=null;
		}
		return $result;
	}
	
	private function regCashJunpyo($info,$co_id,$uid,$jp_gubun)
	{
		//echo "regCashJunpyo <br/>";
		//리턴
		$result = null;
		
		//값 가져오기
		$jp_yyyymmdd = $info['jp_yyyymmdd'];
		if($this->isCloseYear($jp_yyyymmdd)=='y')
		{
			$result['code']= -999;
			//$result['code']= $this->isCloseYear($jp_yyyymmdd);
			//$result['code']= $_SESSION['close_year']['2014'];
			
			return $result;
		}
		
		$gycode = $info['gycode'];
		$customer_id = $info['customer_id'];
		$jakmok_code = $info['jakmok_code'];
		$debit = $info['debit'];
		$credit = $info['credit'];
		$jp_rem = $info['jp_rem'];
		$jp_view_gubun = $info['jp_view_gubun'];
		$row_idx = $info['row_idx'];
		
		//업데이트 여부
		$jp_id=$info['jp_id'];
		$pre_date=$info['pre_date'];
		$jp_no=$info['jp_no'];
		$jp_match_id=$info['jp_match_id'];
		
		
		if($jp_id=='') $jp_id=0;
		
		//초기값 없으면 기본 값으로 세팅
		if($customer_id==null or $customer_id=='')	$customer_id = 0;
		if($jakmok_code==null or $jakmok_code=='')	$jakmok_code = 0;
		if($debit==null or $debit=='')		$debit = 0;
		if($credit==null or $credit=='')	$credit = 0;
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//전표 번호 만들기
		if($pre_date!='' or $jp_no==0){
			$jp_no=$this->createJpNum($co_id,$jp_yyyymmdd);
		}
		
		//업데이트 1 -> 입력 데이터
		$sql1 ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
								debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id)
					VALUES ($jp_id,$co_id,$jp_yyyymmdd,$jp_no,$jp_gubun,$gycode,$customer_id,$jakmok_code,
								$debit,$credit,'$jp_rem','y',$jp_view_gubun,$uid,now(), 0 )
					ON DUPLICATE KEY UPDATE 
						`co_id` = $co_id, `jp_no` = $jp_no,
						`jp_yyyymmdd` = $jp_yyyymmdd, `jp_id` = $jp_id, `jp_gubun` = $jp_gubun, `gycode` = $gycode, 
						`customer_id` = $customer_id,`jakmok_code` = $jakmok_code, `debit` = $debit,	`credit` = $credit, `jp_rem` = '$jp_rem', 
						`jp_view` = 'y', `jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = 0;";
		
		//throw new Exception("$sql1");
		
		//echo "<br>".$sql1."<br>";						
		
		$this->updateSql($sql1);
		
		if($jp_id==0){
			$jp_id= $this->insert_id();
			$result['jp_id'] = $jp_id;
			//echo "insert_id  --> $jp_id <br>";
			$result['code']=$row_idx;
		}
		else
		{
			//echo "update_id  --> $jp_id<br>";
			$result['code']=$row_idx;
			$result['jp_id'] = $jp_id;
			
			//업데이트
			//매칭 전표 번호
			if($jp_match_id!=0){
				$sql3 = "DELETE FROM junpyo WHERE jp_id =$jp_match_id;";
				$this->updateSql($sql3);
			}
		}
		
		//리턴
		$result['jp_no'] = $jp_no;
		$result['jp_yyyymmdd'] = $jp_yyyymmdd;
		
		if($result['jp_no']==0){
			$result['code']=-99;
			$this->rollback();
			return $result; 
		}
		
		$this->commit();
		return $result;
	}
	
	private function regExceptCashJunpyo($info,$re,$co_id,$uid,$jp_gubun,$match_jp_gubun,$match_gycode,$match_customer_id)
	{
		//echo "regExceptCashJunpyo <br/>";
		//값 가져오기
		$jp_yyyymmdd = $info['jp_yyyymmdd'];
		if($this->isCloseYear($jp_yyyymmdd)=='y')
		{
			$result['code']= -999;
			return $result;
		}
		
		$gycode = $info['gycode'];
		$customer_id = (int)$info['customer_id'];
		
		//$match_customer_id = (int)$info['customer_id'];
		$jakmok_code = $info['jakmok_code'];
		$debit = $info['debit'];
		$credit = $info['credit'];
		
		$match_debit = $re['match_debit'];
		$match_credit = $re['match_credit'];
		
		$jp_rem = $info['jp_rem'];
		$jp_view_gubun = $info['jp_view_gubun'];
		
		if($jp_view_gubun != 5 &&$jp_view_gubun != 6 && $jp_view_gubun != 7  && $jp_view_gubun != 8 ) $match_customer_id = (int)$info['customer_id'];
		if($match_customer_id == -1)  $match_customer_id = (int)$info['customer_id'];
		
		$row_idx = $info['row_idx'];
		
		//업데이트 여부
		$jp_id=$info['jp_id'];
		$pre_date=$info['pre_date'];
		$jp_no=$info['jp_no'];
		$jp_match_id=$info['jp_match_id'];
		
		if($jp_match_id==0)
			$jp_match_id=0;
		
		if($jp_id=='')
			 $jp_id=0;
		
		//초기값 없으면 기본 값으로 세팅
		if($match_customer_id==null or $match_customer_id=='')	$match_customer_id = 0;
		if($customer_id==null or $customer_id=='')	$customer_id = 0;
		if($jakmok_code==null or $jakmok_code=='')	$jakmok_code = 0;
		if($debit==null or $debit=='')		$debit = 0;
		if($credit==null or $credit=='')	$credit = 0;
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//전표 번호 구하기
		if($pre_date!='' or $jp_no==0)
			$jp_no=$this->createJpNum($co_id,$jp_yyyymmdd);
		
		//저장 1-> 논리 데이터 
		$sql1 ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
								debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id)
					VALUES ($jp_match_id,$co_id,$jp_yyyymmdd,$jp_no,$match_jp_gubun,$match_gycode,$match_customer_id,$jakmok_code,
								$match_debit,$match_credit,'$jp_rem','n',$jp_view_gubun,$uid,now(),0)
					ON DUPLICATE KEY UPDATE 
						`jp_id` = $jp_match_id,`co_id` = $co_id,`jp_yyyymmdd` = $jp_yyyymmdd, `jp_no` = $jp_no, `jp_gubun` = $match_jp_gubun, `gycode` = $match_gycode, 
						`customer_id` = $match_customer_id,`jakmok_code` = $jakmok_code, `debit` = $match_debit,	`credit` = $match_credit, `jp_rem` = '$jp_rem', 
						`jp_view` = 'n',`jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = 0";
		
		//echo "<br/>".$sql1."<br/>";
										
		$this->updateSql($sql1);
		//echo "1<br/>";
		if($jp_match_id==0)
			$jp_match_id = $this->insert_id();
		//echo "2<br/>";										
		//저장 2 -> 입력 데이터
		$sql2 ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
								debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id)
					VALUES ($jp_id,$co_id,$jp_yyyymmdd,$jp_no,$jp_gubun,$gycode, $customer_id ,$jakmok_code,
								$debit,$credit,'$jp_rem','y',$jp_view_gubun,$uid,now(),$jp_match_id)
					ON DUPLICATE KEY UPDATE 
						`jp_id` = $jp_id,`co_id` = $co_id,`jp_yyyymmdd` = $jp_yyyymmdd, `jp_no` = $jp_no, `jp_gubun` = $jp_gubun, `gycode` = $gycode, 
						`customer_id` = $customer_id ,`jakmok_code` = $jakmok_code, `debit` = $debit,	`credit` = $credit, `jp_rem` = '$jp_rem', 
						`jp_view` = 'y',`jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = $jp_match_id";
		//echo "<br/>".$sql2."<br/>";
		
		//throw new Exception("$sql1 <--------------> $sql2" );
		$this->updateSql($sql2);
		//echo "3<br/>";
		
		//확인
		if($jp_id==$this->insert_id())
		{
			//업데이트
			$result['jp_id'] =$jp_id;
			$this->commit();
			$result['code']=$row_idx;
		}
		else if($jp_id==0)
		{
			//인써트
			$result['jp_id'] = $this->insert_id();
			$this->commit();
			$result['code']=$row_idx;
		}
		else if($jp_match_id==0)
		{
			//오류 
			$this->rollback();
			//쿼리 오류
			$result['code']=-99;
		}
		
		$result['jp_match_id'] = $jp_match_id;
		$result['jp_yyyymmdd'] = $jp_yyyymmdd;
		$result['jp_no'] = $jp_no;
		
		return $result;
	}
	
	private function regDebitCreditJunpyo($obj,$co_id,$uid){
		//echo "regDebitCreditJunpyo <br/>"; 
		$result=array();
		
		$sum_debit = 0;
		$sum_credit = 0;		
		//트랜젝션 시작
		$this->startTransaction();
		
		$jp_yyyymmdd=$obj[0]['jp_yyyymmdd'];
		
		if($this->isCloseYear($jp_yyyymmdd)=='y')
		{
			$result[0]['code']=-999;
			return $result;
		}
		
		$jp_no=$obj[0]['jp_no'];
		
		//전표 번호 만들기
		if($obj[0]['pre_date']!='' or $obj[0]['jp_no']==0)
			$jp_no=$this->createJpNum($co_id,$jp_yyyymmdd);
		
		$count=count($obj);
		
		for($i=0;$i<$count;$i++)
		{
			$info = $obj[$i];
			
			//
			$gycode = $info['gycode'];
			$customer_id = $info['customer_id'];
			$jakmok_code = $info['jakmok_code'];
			$debit = $info['debit'];
			$credit = $info['credit'];
			$jp_rem = $info['jp_rem'];
			$jp_view_gubun = $info['jp_view_gubun'];
			$row_idx = $info['row_idx'];
			
			//update
			$jp_id=$info['jp_id'];
			if($jp_id=='')
				$jp_id=0;
				
			//vaild
			$sum_debit+=$debit;
			$sum_credit+=$credit;
			
			//초기값 없으면 기본 값으로 세팅
			if($customer_id==null or $customer_id=='')	$customer_id = 0;
			if($jakmok_code==null or $jakmok_code=='')	$jakmok_code = 0;
			if($debit==null or $debit=='')		$debit = 0;
			if($credit==null or $credit=='')	$credit = 0;
			
			switch($info['jp_view_gubun']) {
				case '3':
				case '4':
					//넣기
					$sql1 ="INSERT INTO junpyo (jp_id,co_id,jp_yyyymmdd,jp_no,jp_gubun,gycode,customer_id,jakmok_code,
								debit,credit,jp_rem,jp_view,jp_view_gubun,reg_uid,reg_date,jp_match_id)
					VALUES ($jp_id,$co_id,$jp_yyyymmdd,$jp_no,$jp_view_gubun,$gycode,$customer_id,$jakmok_code,
								$debit,$credit,'$jp_rem','y',$jp_view_gubun,$uid,now(),0)
					ON DUPLICATE KEY UPDATE 
						`jp_id` = $jp_id,`jp_yyyymmdd` = $jp_yyyymmdd, `jp_no` = $jp_no, `jp_gubun` = $jp_view_gubun, `gycode` = $gycode, 
						`customer_id` = $customer_id,`jakmok_code` = $jakmok_code, `debit` = $debit,	`credit` = $credit, `jp_rem` = '$jp_rem', 
						`jp_view` = 'y',`jp_view_gubun` = $jp_view_gubun, `reg_uid` = $uid, `modify_date` = now() ,`jp_match_id` = 0;";
					
					//echo "<br/>".$sql1."<br/>";
					
					$this->updateSql($sql1);	
					
					//확인
					if($jp_id==0)
					{
						//인써트
						$result[$i]['jp_id'] = $this->insert_id();
						$result[$i]['code']=$row_idx;
					}
					else if($jp_id==$this->insert_id())
					{
						//업데이트
						$result[$i]['jp_id'] =$jp_id;
						$result[$i]['code']=$row_idx;
					}
					$result[$i]['jp_yyyymmdd'] = $jp_yyyymmdd;
					$result[$i]['jp_no'] = $jp_no;
					
					break;
				
				default:
					//하나 3,4가 아니면 롤백
					//롤백
					$result[0]['code']=-99;
					$this->rollback();
					return $result;
			}
		}
		if($sum_debit!=$sum_credit){
			//커밋
			$result[0]['code']=-99;
			$this->rollback();
		}
		
		$this->commit();
		return $result;
	}
	
	private function createJpNum($co_id,$jp_yyyymmdd)
	{
		//전표 번호 구하기 [5000번 미만]
		$sql_jp_no ="SELECT max(jp_no) FROM junpyo WHERE co_id = $co_id AND jp_yyyymmdd=$jp_yyyymmdd AND jp_no<5000 ";
		$this->querySql($sql_jp_no);
		$row =$this->fetchArrayRow();
		return $row[0]+1;
	}

	//마이너스 가능 코드 
	private function vaildationAmt($value)
	{
		$return =null;
		$gycode = $value['gycode'];
		$debit = $value['debit'];
		$credit = $value['credit'];
		//echo "1 -> $gycode<br>";
		if($debit<>0 and $credit==0) {
			$return['amt']="debit";
			$return['match_credit']=$debit;
			$return['match_debit']=0;
			return $return;
		}else if($debit==0 and $credit<>0) {
			$return['amt']='credit';
			$return['match_debit']=$credit;
			$return['match_credit']=0;
			return $return;
		}
	}
	
	/*
	private function vaildationAmt($value)
	{
		$return =null;
		$gycode = $value['gycode'];
		$debit = $value['debit'];
		$credit = $value['credit'];
		//echo "1 -> $gycode<br>";
		if($debit>0 and $credit==0) {
			$return['amt']="debit";
			$return['match_credit']=$debit;
			$return['match_debit']=0;
			return $return;
		}else if($debit==0 and $credit>0) {
			$return['amt']='credit';
			$return['match_debit']=$credit;
			$return['match_credit']=0;
			return $return;
		}
	}
	*/
	//전표 삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
		/*
		$json='{
					"0": {"jp_yyyymmdd":"20131013","jp_no":"1"} 
				}'; 
		*/
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		
		//echo  $dec['0']."<br/>";
		//echo "count ".count($dec)."<br/>";
		
		$result=array();
		
		for($idx=0;$idx<count($dec);$idx++)
		{
    		$obj = $dec[$idx];
			
			$jp_yyyymmdd=$obj['jp_yyyymmdd'];
			if($this->isCloseYear($jp_yyyymmdd)=='y')
			{
				$result[$idx]['code']='-1';
				continue;
			}
			
			$jp_no=$obj['jp_no'];
			$row_idx=$obj['row_idx'];
			
			$sql = "DELETE FROM junpyo WHERE co_id=$co_id and jp_yyyymmdd=$jp_yyyymmdd and jp_no=$jp_no;";
			//echo $sql."<br>"; 
			$this->updateSql($sql);
			
			$sql = "SELECT ROW_COUNT()";
			//echo $sql."<br>";
			$this->querySql($sql);
			$row = $this->fetchArrayRow();
			
			if($row[0]>0){
				$result[$idx]['code']=$row_idx;
			}else{
				$result[$idx]['code']='-1';
			}
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
		$jp_yyyymm = (int)$this->param['jp_yyyymm'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$jp_yyyymmfrom = $jp_yyyymm.'00';
		$jp_yyyymmto = $jp_yyyymm.'32';
		
		$sql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id
				FROM junpyo
				WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto and jp_view='y'; ";
		
		//echo $sql."<br/>";
		//throw new Exception("$sql");
		
		$this->querySql($sql);
	}
	
	//리스트 업 - 통장 코드로 보여짐
	public function requestAdvList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymm = (int)$this->param['jp_yyyymm'];
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$jp_yyyymmfrom = $jp_yyyymm.'00';
		$jp_yyyymmto = $jp_yyyymm.'32';
	
		$sql = "SELECT A.jp_id, A.jp_yyyymmdd,  A.jp_no,  A.gycode,  A.customer_id,  A.jakmok_code,  A.debit,  A.credit
				, A.jp_rem,  A.jp_view_gubun,  A.jp_match_id , match_customer_id
			FROM (SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit
						, jp_rem, jp_view_gubun, jp_match_id , CONCAT(CAST(jp_yyyymmdd AS CHAR CHARSET utf8), '-', CAST(jp_no AS CHAR CHARSET utf8)) gubun
			FROM junpyo	WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto and jp_view='y' order by jp_yyyymmdd, jp_no) AS A
		LEFT OUTER JOIN (SELECT  CONCAT(CAST(jp_yyyymmdd AS CHAR CHARSET utf8), '-', CAST(jp_no AS CHAR CHARSET utf8)) gubun
				, customer_id  match_customer_id
				FROM junpyo WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto
				 and jp_view='n' and jp_view_gubun>=5 and  jp_view_gubun<=8) AS B
		ON A.gubun = B.gubun; ";
		
		//echo $sql."<br/>";
		//throw new Exception("$sql");
	
		$this->querySql($sql);
	}
	
	//한 페이지에 보여줄 전표 개수
	protected $page_size = 20;
	//protected $max_page_index = 100;
	//계산할 수 있는 게시글 개수의 최대값, $page_size * $max_page_index
	//protected $max_tot_count = 1000;
	
	//리스트 업
	public function requestPagingList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymm = (int)$this->param['jp_yyyymm'];
		$pageIndex = (int)$this->param['page'];
		$page_size = (int)$this->param['size'];
		
		$pageStart = $page_size*($pageIndex-1);
		
		$jp_yyyymmfrom = $jp_yyyymm.'00';
		$jp_yyyymmto = $jp_yyyymm.'32';
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$sql = "SELECT count(*) FROM junpyo WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto 
								and jp_view='y'; ";
		*/
		$MaxSql = "SELECT count(*) FROM (SELECT count(*) FROM farmsaver.junpyo WHERE co_id=$co_id AND jp_view='y' and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd, jp_no) A;";
		$this->querySql($MaxSql);
		
		$maxCount=0;
		if($row=$this->fetchMixedRow())
			$maxCount=$row[0];
				
		$pageStart = $page_size*($pageIndex-1);
		/*
		if($pageIndex==-1)
			$pageStart=((int)($maxCount/$page_size))*$page_size;
		else
			$pageStart = $page_size*($pageIndex-1);
		
		$basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
					B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no  limit $pageStart, $page_size) A
							 ,junpyo B					 
					WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y'; ";
		*/
		/*
		//수정 04-04
		 $basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no limit $pageStart, $page_size ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y';  ";
						*/
		//수정		
		$basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no DESC limit $pageStart, $page_size ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y';  ";
								
		/*
		$sql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id
				FROM junpyo
				WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto and jp_view='y' limit $pageStart, $page_size; ";
		 */
		//throw new Exception($basicSql);
		
		$this->querySql($basicSql);
		
		return $maxCount;
	}
	
	//리스트 업
	public function requestPrintPagingList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymm = (int)$this->param['jp_yyyymm'];
		$pageIndex = (int)$this->param['page'];
		$page_size = (int)$this->param['size'];
		
		$pageStart = $page_size*($pageIndex-1);
		
		$jp_yyyymmfrom = $jp_yyyymm.'00';
		$jp_yyyymmto = $jp_yyyymm.'32';
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$sql = "SELECT count(*) FROM junpyo WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto 
								and jp_view='y'; ";
		*/
		$MaxSql = "SELECT count(*) FROM (SELECT count(*) FROM farmsaver.junpyo WHERE co_id=$co_id AND jp_view='y' and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd, jp_no) A;";
		$this->querySql($MaxSql);
		
		$maxCount=0;
		if($row=$this->fetchMixedRow())
			$maxCount=$row[0];
				
		$pageStart = $page_size*($pageIndex-1);
		/*
		if($pageIndex==-1)
			$pageStart=((int)($maxCount/$page_size))*$page_size;
		else
			$pageStart = $page_size*($pageIndex-1);
		
		$basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
					B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no  limit $pageStart, $page_size) A
							 ,junpyo B					 
					WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y'; ";
		*/
		 $basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no limit $pageStart, $page_size ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no;  ";
					
								
		/*
		$sql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id
				FROM junpyo
				WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto and jp_view='y' limit $pageStart, $page_size; ";
		 */
		//throw new Exception($basicSql);
		
		$this->querySql($basicSql);
		
		return $maxCount;
	}
	
	//리스트 업
	public function requestBockSikPagingList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymm = (int)$this->param['jp_yyyymm'];
		
		$jp_yyyymmfrom = $jp_yyyymm.'00';
		$jp_yyyymmto = $jp_yyyymm.'32';
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$sql = "SELECT count(*) FROM junpyo WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto 
								and jp_view='y'; ";
		*/
		$maxCount=0;
		/*
		if($pageIndex==-1)
			$pageStart=((int)($maxCount/$page_size))*$page_size;
		else
			$pageStart = $page_size*($pageIndex-1);
		
		$basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
					B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no  limit $pageStart, $page_size) A
							 ,junpyo B					 
					WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y'; ";
		*/
		/*
		//기본 복식 회계 전표 조회 
		 $basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no;  ";
		 */
		
		//계좌입력 5~8번 구분만 나오도록
		 $basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto group by jp_yyyymmdd DESC, jp_no ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view_gubun>=5 AND jp_view_gubun<=8; ";				
								
		/*
		$sql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id
				FROM junpyo
				WHERE co_id = $co_id and jp_yyyymmdd > $jp_yyyymmfrom and jp_yyyymmdd < $jp_yyyymmto and jp_view='y' limit $pageStart, $page_size; ";
		 */
		//throw new Exception($basicSql);
		
		$this->querySql($basicSql);
		
		return $maxCount;
	}
	
	
	//전표 1건씩 보여주기
	public function requestBockSikTransaction(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$jp_yyyymmdd = (int)$this->param['jp_yyyymmdd'];
		$jp_no = (int)$this->param['jp_no'];
	
		//계좌입력 5~8번 구분만 나오도록
		$basicSql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit, jp_rem, jp_view_gubun, jp_match_id from junpyo
		 					WHERE co_id = $co_id and jp_yyyymmdd =$jp_yyyymmdd and jp_no = $jp_no ; ";
		$this->querySql($basicSql);

		 return $maxCount;
	}
	
	//전표 검색 
	public function requestSearch(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$basicSql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id 
				FROM junpyo
				WHERE co_id = $co_id AND jp_view='y' ";
		
		$condition='';
				
		//검색 구분
		//발생일자  --> jp_yyyymmdd
		$from_jp_yyyymmdd = (int)$this->param['from_jp_yyyymmdd'];
		$to_jp_yyyymmdd = (int)$this->param['to_jp_yyyymmdd'];
		if($from_jp_yyyymmdd!='' and $to_jp_yyyymmdd!='')
			$condition=$condition." AND $from_jp_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_jp_yyyymmdd";
		
		//전표 구분  --> jp_view_gubun
		$jp_view_gubun = (int)$this->param['jp_view_gubun'];
		if($jp_view_gubun!='' )
			$condition=$condition." AND jp_view_gubun = $jp_view_gubun";
		
		//작목명   --> jakmok_code
		$jakmok_code = (int)$this->param['jakmok_code'];
		if($jakmok_code!='' )
			$condition=$condition." AND jakmok_code = $jakmok_code";
		
		//계정코드  --> gycode
		$gycode = (int)$this->param['gycode'];
		if($gycode!='')
			$condition=$condition." AND gycode = $gycode";
		
		//금액  --> debit, credit
		$min_amt = (int)$this->param['min_amt'];
		$max_amt = (int)$this->param['max_amt'];
		
		if($min_amt!='' )
			$condition=$condition." AND (credit>=$min_amt or debit>=$min_amt)";
		
		if($max_amt!='' )
			$condition=$condition." AND (credit<=$max_amt or debit<=$max_amt)";
		
		//거래처명  --> customer_id
		$customer_id = (int)$this->param['customer_id'];
		if($customer_id!='' )
			$condition=$condition." AND customer_id = $customer_id";
		
		//적요  --> jp_rem
		$jp_rem = $this->param['jp_rem'];
		if($jp_rem!='' )
			$condition=$condition." AND jp_rem like '%$jp_rem%'";
		
		//echo $sql."<br/>";
		$this->querySql($basicSql.$condition);
	}
	
	//전표 검색 - 통장 코드 조회 추가
	public function requestAdvSearch(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$condition="WHERE co_id = $co_id ";
		
		$first_con = " and jp_view='y' ";
		$second_con = "  and jp_view='n' and jp_view_gubun>=5 and  jp_view_gubun<=8 ";
				
		//검색 구분
		//발생일자  --> jp_yyyymmdd
		$from_jp_yyyymmdd = (int)$this->param['from_jp_yyyymmdd'];
		$to_jp_yyyymmdd = (int)$this->param['to_jp_yyyymmdd'];
		if($from_jp_yyyymmdd!='' and $to_jp_yyyymmdd!='')
			$condition=$condition." AND $from_jp_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_jp_yyyymmdd";
	
		//전표 구분  --> jp_view_gubun
		$jp_view_gubun = (int)$this->param['jp_view_gubun'];
		if($jp_view_gubun!='' )
			$condition=$condition." AND jp_view_gubun = $jp_view_gubun";
	
		//작목명   --> jakmok_code
		$jakmok_code = (int)$this->param['jakmok_code'];
		if($jakmok_code!='' )
			$condition=$condition." AND jakmok_code = $jakmok_code";
	
		//계정코드  --> gycode
		$gycode = (int)$this->param['gycode'];
		if($gycode!='')
			$condition=$condition." AND gycode = $gycode";
	
		//금액  --> debit, credit
		$min_amt = (int)$this->param['min_amt'];
		$max_amt = (int)$this->param['max_amt'];
	
		if($min_amt!='' )
			$condition=$condition." AND (credit>=$min_amt or debit>=$min_amt)";
	
		if($max_amt!='' )
			$condition=$condition." AND (credit<=$max_amt or debit<=$max_amt)";
	
		//거래처명  --> customer_id
		$customer_id = (int)$this->param['customer_id'];
		if($customer_id!='' )
			$condition=$condition." AND customer_id = $customer_id";
	
		//적요  --> jp_rem
		$jp_rem = $this->param['jp_rem'];
		if($jp_rem!='' )
			$condition=$condition." AND jp_rem like '%$jp_rem%'";
	
		
		$basicSql = "SELECT A.jp_id, A.jp_yyyymmdd,  A.jp_no,  A.gycode,  A.customer_id,  A.jakmok_code,  A.debit,  A.credit
		, A.jp_rem,  A.jp_view_gubun,  A.jp_match_id , match_customer_id
		FROM (SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit
		, jp_rem, jp_view_gubun, jp_match_id , CONCAT(CAST(jp_yyyymmdd AS CHAR CHARSET utf8), '-', CAST(jp_no AS CHAR CHARSET utf8)) gubun
		FROM junpyo	$condition $first_con order by jp_yyyymmdd, jp_no) AS A
		LEFT OUTER JOIN (SELECT  CONCAT(CAST(jp_yyyymmdd AS CHAR CHARSET utf8), '-', CAST(jp_no AS CHAR CHARSET utf8)) gubun
		, customer_id  match_customer_id
		FROM junpyo $condition $second_con) AS B
		ON A.gubun = B.gubun; ";
		
		//echo $sql."<br/>";
		$this->querySql($basicSql);
	}

	//전표 검색 
	public function requestBockSikSearch(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$basicSql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id 
				FROM junpyo
				WHERE co_id = $co_id ";
		
		$condition='';
				
		//검색 구분
		//발생일자  --> jp_yyyymmdd
		$from_jp_yyyymmdd = (int)$this->param['from_jp_yyyymmdd'];
		$to_jp_yyyymmdd = (int)$this->param['to_jp_yyyymmdd'];
		if($from_jp_yyyymmdd!='' and $to_jp_yyyymmdd!='')
			$condition=$condition." AND $from_jp_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_jp_yyyymmdd";
		
		//전표 구분  --> jp_view_gubun
		$jp_view_gubun = (int)$this->param['jp_view_gubun'];
		if($jp_view_gubun!='' )
			$condition=$condition." AND jp_view_gubun = $jp_view_gubun";
		
		//작목명   --> jakmok_code
		$jakmok_code = (int)$this->param['jakmok_code'];
		if($jakmok_code!='' )
			$condition=$condition." AND jakmok_code = $jakmok_code";
		
		//계정코드  --> gycode
		$gycode = (int)$this->param['gycode'];
		if($gycode!='')
			$condition=$condition." AND gycode = $gycode";
		
		//금액  --> debit, credit
		$min_amt = (int)$this->param['min_amt'];
		$max_amt = (int)$this->param['max_amt'];
		
		if($min_amt!='' )
			$condition=$condition." AND (credit>=$min_amt or debit>=$min_amt)";
		
		if($max_amt!='' )
			$condition=$condition." AND (credit<=$max_amt or debit<=$max_amt)";
		
		//거래처명  --> customer_id
		$customer_id = (int)$this->param['customer_id'];
		if($customer_id!='' )
			$condition=$condition." AND customer_id = $customer_id";
		
		//적요  --> jp_rem
		$jp_rem = (int)$this->param['jp_rem'];
		if($jp_rem!='' )
			$condition=$condition." AND jp_rem like '%jp_rem%'";
		
		//echo $sql."<br/>";
		$this->querySql($basicSql.$condition);
	}

	//전표 검색 
	public function requestPagingSearch(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$pageIndex = (int)$this->param['page'];
		$page_size = (int)$this->param['size'];
		$pageStart = $page_size*($pageIndex-1);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$basicSql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id 
				FROM junpyo
				WHERE co_id = $co_id AND jp_view='y' ";
		*/	
		
				
		$condition='';
		
		//발생일자  --> jp_yyyymmdd
		$from_jp_yyyymmdd = (int)$this->param['from_jp_yyyymmdd'];
		$to_jp_yyyymmdd = (int)$this->param['to_jp_yyyymmdd'];
				
		//검색 구분
		if($from_jp_yyyymmdd!='' and $to_jp_yyyymmdd!='')
			$condition=$condition." AND $from_jp_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_jp_yyyymmdd";
		
		//전표 구분  --> jp_view_gubun
		$jp_view_gubun = (int)$this->param['jp_view_gubun'];
		if($jp_view_gubun!='' )
			$condition=$condition." AND jp_view_gubun = $jp_view_gubun";
		
		//작목명   --> jakmok_code
		$jakmok_code = (int)$this->param['jakmok_code'];
		if($jakmok_code!='' )
			$condition=$condition." AND jakmok_code = $jakmok_code";
		
		//계정코드  --> gycode
		$gycode = (int)$this->param['gycode'];
		if($gycode!='')
			$condition=$condition." AND gycode = $gycode";
		
		//금액  --> debit, credit
		$min_amt = (int)$this->param['min_amt'];
		$max_amt = (int)$this->param['max_amt'];
		
		if($min_amt!='' )
			$condition=$condition." AND (credit>=$min_amt or debit>=$min_amt)";
		
		if($max_amt!='' )
			$condition=$condition." AND (credit<=$max_amt or debit<=$max_amt)";
		
		//거래처명  --> customer_id
		$customer_id = (int)$this->param['customer_id'];
		if($customer_id!='' )
			$condition=$condition." AND customer_id = $customer_id";
		
		//적요  --> jp_rem
		$jp_rem =$this->param['jp_rem'];
		if($jp_rem!='')
			$condition=$condition." AND jp_rem like '%$jp_rem%'";
					
		$paging = " limit $pageStart, $page_size";
		/*
		$basicSql = "SELECT A.jp_id, A.jp_yyyymmdd, A.jp_no, A.gycode, A.customer_id, A.jakmok_code, A.debit, A.credit,
					A.jp_rem, A.jp_view_gubun, A.jp_match_id from junpyo A, 
						(SELECT co_id,jp_yyyymmdd,jp_no FROM farmsaver.junpyo WHERE co_id=$co_id $condition group by jp_yyyymmdd, jp_no $paging) B 
					WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y'";
		*/
					
		$basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 $condition group by jp_yyyymmdd DESC, jp_no $paging ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no AND jp_view='y';  ";
									
		$MaxSql = "SELECT count(*) FROM (SELECT count(*) FROM farmsaver.junpyo WHERE co_id=$co_id AND jp_view='y' $condition group by jp_yyyymmdd, jp_no) A";
		$this->querySql($MaxSql);
		$maxCount=0;
		if($row=$this->fetchMixedRow())
			$maxCount=$row[0];
			
		$this->querySql($basicSql);
		
		return $maxCount;
	}
	
	//전표 프린트 검색 
	public function requestPrintPagingSearch(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$pageIndex = (int)$this->param['page'];
		$page_size = (int)$this->param['size'];
		$pageStart = $page_size*($pageIndex-1);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		/*
		$basicSql = "SELECT jp_id, jp_yyyymmdd, jp_no, gycode, customer_id, jakmok_code, debit, credit,
					jp_rem, jp_view_gubun, jp_match_id 
				FROM junpyo
				WHERE co_id = $co_id AND jp_view='y' ";
		*/	
		
				
		$condition='';
		
		//발생일자  --> jp_yyyymmdd
		$from_jp_yyyymmdd = (int)$this->param['from_jp_yyyymmdd'];
		$to_jp_yyyymmdd = (int)$this->param['to_jp_yyyymmdd'];
				
		//검색 구분
		if($from_jp_yyyymmdd!='' and $to_jp_yyyymmdd!='')
			$condition=$condition." AND $from_jp_yyyymmdd<=jp_yyyymmdd AND jp_yyyymmdd<=$to_jp_yyyymmdd";
		
		//전표 구분  --> jp_view_gubun
		$jp_view_gubun = (int)$this->param['jp_view_gubun'];
		if($jp_view_gubun!='' )
			$condition=$condition." AND jp_view_gubun = $jp_view_gubun";
		
		//작목명   --> jakmok_code
		$jakmok_code = (int)$this->param['jakmok_code'];
		if($jakmok_code!='' )
			$condition=$condition." AND jakmok_code = $jakmok_code";
		
		//계정코드  --> gycode
		$gycode = (int)$this->param['gycode'];
		if($gycode!='')
			$condition=$condition." AND gycode = $gycode";
		
		//금액  --> debit, credit
		$min_amt = (int)$this->param['min_amt'];
		$max_amt = (int)$this->param['max_amt'];
		
		if($min_amt!='' )
			$condition=$condition." AND (credit>=$min_amt or debit>=$min_amt)";
		
		if($max_amt!='' )
			$condition=$condition." AND (credit<=$max_amt or debit<=$max_amt)";
		
		//거래처명  --> customer_id
		$customer_id = (int)$this->param['customer_id'];
		if($customer_id!='' )
			$condition=$condition." AND customer_id = $customer_id";
		
		//적요  --> jp_rem
		$jp_rem =$this->param['jp_rem'];
		if($jp_rem!='')
			$condition=$condition." AND jp_rem like '%$jp_rem%'";
					
		$paging = " limit $pageStart, $page_size";
					
		$basicSql = "SELECT B.jp_id, A.jp_yyyymmdd, A.jp_no, B.gycode, B.customer_id, B.jakmok_code, B.debit, B.credit,
							B.jp_rem, B.jp_view_gubun, B.jp_match_id from (SELECT co_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id 
							 $condition group by jp_yyyymmdd DESC, jp_no $paging ) A
								,junpyo B 
						WHERE A.co_id=B.co_id AND A.jp_yyyymmdd=B.jp_yyyymmdd AND A.jp_no=B.jp_no;  ";
									
		$MaxSql = "SELECT count(*) FROM (SELECT count(*) FROM farmsaver.junpyo WHERE co_id=$co_id AND jp_view='y' $condition group by jp_yyyymmdd, jp_no) A";
		$this->querySql($MaxSql);
		$maxCount=0;
		if($row=$this->fetchMixedRow())
			$maxCount=$row[0];
			
		$this->querySql($basicSql);
		
		return $maxCount;
	}
	
	
	//전표 프린트(수정)
	//수정
	public function requestPrintUpdate(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$json = $this -> param["data"];
		 //json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		$result=array();
		
		//------------------------------------
		//	db work
		//-------------------------------------
		for($idx=0;$idx<count($dec);$idx++)
		{
    		$obj = $dec[$idx];
    		$customer_id=$obj['customer_id'];
    		if($customer_id == '' || $customer_id == null) $customer_id = 0;
    		$jp_id=$obj['jp_id'];
    		
    		$sql = " UPDATE junpyo SET `customer_id` = $customer_id, `reg_uid` = $uid, `reg_date` = now()
						WHERE `jp_id` = $jp_id;";
			try{
				$this->updateSql($sql);
				$r=null;
				$r['cd']=$obj['row_idx'];
				
				array_push($result, $r);
			}catch(Exception $e){
				$r=null;
				$r['cd']=-99;
				
				array_push($result, $r);
			}
		}
		
		return $result;
	}
}

?>