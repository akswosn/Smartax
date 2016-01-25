<?php
class DBTaxWork extends DBWork
{
	public function __get($name)
	{
		return $this->$name;	
	}
	
	/**
	 * Tax List 조회(가맹 회원 매입/매출 정보 조회)
	 * **/
	public function requestTaxList()
	{
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$type = (int)$this->param['type'];
		
		$sql = "SELECT header.*, detail.*
					FROM(
						 SELECT 
							  head._id as header_id, head.co_id, head.customer_id
							  , head.yyyymmdd, head.amt_supply_value, head.amt_atax
							  , head.type, head.bigo, head.reg_date
							  , head.reg_uid, usr.user_name as reg_user_nm
							  , com.co_saup_no, com.co_nm, com.co_ceo_nm
							  , com.co_addr, com.co_up, com.co_jong
							  , cust.tr_saup_no, cust.tr_nm, cust.tr_daepyo
							  , cust.tr_addr, cust.tr_up, cust.tr_jong
						  FROM 
							    atax_input_paper_header head 
							    left outer join  company_info as com
							    on head.co_id = com.co_id
							    left outer join customer as cust 
							    on head.customer_id = cust.customer_id and head.co_id = cust.co_id
							    join user_info usr
							    on head.reg_uid = usr.uid
						  WHERE head.co_id = $co_id and head.type = $type
					) header left outer join (
						  SELECT 
						    d._id as detail_id, d.header_id, d.atax_id
						    , d.yyyymmdd, d.type, d.item_nm
						    , d.item_cnt, d.item_danga, d.item_supply_value
						    , d.item_atax, d.item_bigo, d.item_standard
						    , (d.item_supply_value + d.item_atax) as item_tot
						    , a.atax_elect_flag, a.atax_elect_no
						    , t.atax_type_nm 
						  FROM 
						  atax_input_paper_detail d 
						  join add_tax a
						  on d.atax_id = a.atax_id and d._id = a.atax_input_type_id
						  join add_tax_type t
						  on a.atax_type = t.atax_type
						  WHERE d.co_id = $co_id and d.type = $type
					) detail
					on header.header_id = detail.header_id;
				";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) {
			//조회된 데이터가 없을 경우 회사정보만 조회~~~
			$sql = "SELECT 
						  co_saup_no, co_nm, co_ceo_nm
							, co_addr, co_up, co_jong
						FROM company_info
						WHERE co_id = $co_id;
			";
			$this->querySql($sql);
		}
				
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//가맹 회원  매입/매출 계산서 거래처 정보 조회
	public function requestTaxCustomer(){
		//$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$tr_saup_no = $this->param['tr_saup_no'];
		$tr_nm = $this->param['tr_nm'];
		
		$sql = "SELECT customer_id, co_id
						, tr_nm, tr_daepyo, tr_saup_no, tr_jumin_no
						, tr_addr, tr_up, tr_jong
				   FROM customer
				   WHERE co_id = $co_id";
		
		if(!empty($tr_saup_no)){
			$sql = $sql." AND tr_saup_no = '$tr_saup_no' ";
		}
		
		else if(!empty($tr_nm)){
			$sql = $sql." AND tr_nm = '$tr_nm' ";
		}
		
		else {
			return null;
		}
		
// 		var_dump($sql);
		
		$this->querySql($sql);
		if($this->getNumRows() == 0) {
			return null;
		}
		else {
			$row = $this->fetchObjectRow();
			return $row;
		}
	}
	
	/**
	 * 매입/매출 정보 저장 및 수정
	 * */
	public function updateTaxInfomation(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		
		//<--1. 거래처 정보 확인 후 insert & update!!
		$tr_use_yn = $this->param["tr_use_yn"];
		$tr_saup_no = $this->param["tr_saup_no"];
		$tr_nm = $this->param["tr_nm"];
		$tr_daepyo = $this->param["tr_daepyo"];
		$tr_addr =  $this->param["tr_addr"];
		$tr_up=  $this->param["tr_up"];
		$tr_jong =  $this->param["tr_jong"];
		
		//트랜잭션 시작
		$this->startTransaction();
		
		//$this->commit();
		//$this->rollback();
		
		try{
			$customer_id = (int) $this->param["customer_id"];
			if($tr_use_yn == 'y'){
				//update process customer_id check
				if($customer_id < 1) throw new Exception('update process customer id enabled');
				
				//조회된 데이터로 update
				$sql = "UPDATE customer
							SET tr_nm = '$tr_nm'
								, tr_daepyo = '$tr_daepyo'
								, tr_saup_no = '$tr_saup_no'
								, tr_up = '$tr_up'
								, tr_jong = '$tr_jong'
								, tr_addr = '$tr_addr' 
								, reg_date = now()
								, reg_uid = $uid 
							WHERE customer_id = $customer_id and co_id = $co_id;";		
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
				
				if($row < 0){
					$this->rollback();
					throw new Exception('customer update fail row : ' + $row);
				}
			}
			else {
				//insert
				//1. customer id 생성
				$sql = "SELECT ifnull(max(customer_id), 0)+1 as customer_id 
				FROM customer
				WHERE co_id = $co_id;";
					
				$this->querySql($sql);
				$row = $this->fetchArrayRow(); //조회한 거래처 코드로 insert 진행
				$customer_id = $row[0];
// 				if($customer_id < 1) throw new Exception('customer id create fail customer_id : ' + $customer_id);
				//2. insert
				$sql = "INSERT INTO customer(
							   customer_id, co_id
							  ,tr_nm  ,tr_daepyo
							  ,tr_saup_no ,tr_up
							  ,tr_jong ,tr_addr
							  ,reg_date ,reg_uid
							) VALUES (
							  $customer_id, $co_id
							  , '$tr_nm', '$tr_daepyo'
							  , '$tr_saup_no' ,'$tr_up'
							  , '$tr_jong', '$tr_addr'
							  , now(), $uid
							);";
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
				
				if($row < 0){
					$this->rollback();
					throw new Exception('customer insert fail row : ' + $row);
				}
			}
			
			//<--1. end
			
			//<--2.Header 정보 등록 및 수정!!
			$header_id = (int)$this->param["header_id"];
			$yyyymmdd =(int) $this->param["yyyymmdd"];
			$amt_supply_value = (int)$this->param["amt_supply_value"];
			$amt_atax = (int)$this->param["amt_atax"];
			$bigo = $this->param["bigo"];
			$type =(int) $this->param["type"];
			
			if($header_id == 0){
				//등록
				$sql = "INSERT INTO atax_input_paper_header(
							  co_id, customer_id
							  , yyyymmdd, amt_supply_value
							  , amt_atax, type
							  , bigo, reg_date
							  , reg_uid
							) VALUES (
							  $co_id, $customer_id
							  , $yyyymmdd, $amt_supply_value
							  , $amt_atax , $type
							  , '$bigo', now()
							  , $uid
							);";
				 $this->updateSql($sql);
				 $row = $this->insert_id();
				 
				 //등록된 header_id 저장
				 $header_id = $row;
				 
				 if($row < 0){
				 	$this->rollback();
				  	throw new Exception('atax_input_paper_header insert fail row : ' + $row);
				 }
			}
			else {
				//수정
				$sql = "UPDATE atax_input_paper_header
							SET
							  co_id = $co_id
							  ,customer_id = $customer_id
							  ,yyyymmdd = $yyyymmdd
							  ,amt_supply_value = $amt_supply_value
							  ,amt_atax = $amt_atax
							  ,type = $type
							  ,bigo = '$bigo'
							  ,reg_date = now()
							  ,reg_uid = $uid
							WHERE _id = $header_id;";
				
				$this->updateSql($sql);
				$row = $this->getAffectedRows();
				
				if($row < 0){
					$this->rollback();
					throw new Exception('atax_input_paper_header update fail row : ' + $row);
				}
			}
			//<--2. end
			//<--3. detail 정보 등록[Array]
			$json = $this->param['detail'];
			
			
			$jdata = stripslashes($json);
			$detail = json_decode($jdata, true);
			$atax_type =(int) $this->param['atax_type'];
			
			
			if(count($detail) != 0){
				foreach ($detail as $idx => $obj) {
					$atax_id = (int)$obj['item_atax_id'];
					$detail_id = (int)$obj['item_detail_id'];
					$item_nm =  $obj['item_nm'];
					$item_standard =  $obj['item_standard'];
					$item_cnt =  (int)$obj['item_cnt'];
					$item_danga =  (int)$obj['item_danga'];
					$item_supply_value =  (int)$obj['item_supply_value'];
					$item_atax =  (int)$obj['item_atax'];
					$item_yyyymmdd = (int)$obj['item_yyyymmdd'];
					$item_bigo =  $obj['item_bigo'];
					
					if($detail_id == 0 && $atax_id == 0){
						//insert
						$sql="INSERT INTO atax_input_paper_detail(
								  co_id ,atax_id
								  ,header_id ,yyyymmdd
								  ,type ,item_nm 
								  ,item_standard ,item_cnt
								  ,item_danga ,item_supply_value
								  ,item_atax ,item_bigo
								  ,reg_date ,reg_uid
								) VALUES (
								  $co_id, $atax_id
								  ,$header_id ,$item_yyyymmdd
								  ,$type ,'$item_nm'
								  ,'$item_standard' , $item_cnt
								  ,$item_danga ,'$item_supply_value'
								  ,$item_atax , '$item_bigo'
								  , now() , $uid
								);";
						  $this->updateSql($sql);
						  $row = $this->insert_id();
						  	
						  //등록된 header_id 저장
						  $detail_id = $row;
						  	
						  if($detail_id < 0){
						  	$this->rollback();
						  	throw new Exception('atax_input_paper_detail insert fail row : ' + $row);
						  }
						  
						  $sql = "INSERT INTO add_tax(
									  co_id ,atax_yyyymmdd
									  ,atax_type ,atax_item_nm
									  ,atax_item_cnt ,atax_item_danga
									  ,atax_supply_price ,atax_tax
									  ,atax_customer_id ,atax_elect_flag
									  ,atax_elect_no ,atax_input_type
									  ,atax_input_type_id ,atax_reg_date
									  ,atax_reg_uid
									) VALUES (
										$co_id, $item_yyyymmdd
										, $atax_type , '$item_nm'
										, $item_cnt , $item_danga
										, $item_supply_value, $item_atax
										, $customer_id , 'n'
										, '' ,  $type
										, $detail_id, now()
										,$uid
									);";
							$this->updateSql($sql);
							$row = $this->insert_id();
								
							//등록된 header_id 저장
							$atax_id = $row;
								
							if($atax_id < 0){
								$this->rollback();
								throw new Exception('add_tax insert fail row : ' + $row);
							}
						  
						 	$sql = "UPDATE atax_input_paper_detail
										SET atax_id = $atax_id
										WHERE _id = $detail_id";
						    
						 	$this->updateSql($sql);
						 	$row = $this->getAffectedRows();
						 	
						 	if($row < 0){
						 		$this->rollback();
						 		throw new Exception('atax_input_paper_detail atax_id update fail row : ' + $row);
						 	}
					}
					else {
						//update
						$sql = "UPDATE atax_input_paper_detail
									SET co_id = $co_id
									  ,atax_id = $atax_id
									  ,header_id = $header_id
									  ,yyyymmdd = $item_yyyymmdd
									  ,type = $type
									  ,item_nm = '$item_nm'
									  ,item_standard = '$item_standard'
									  ,item_cnt = $item_cnt
									  ,item_danga = $item_danga
									  ,item_supply_value = $item_supply_value
									  ,item_atax = $item_atax
									  ,item_bigo = '$item_bigo'
									  ,reg_date = now()
									  ,reg_uid = $uid
									WHERE _id = $detail_id";
						
						$this->updateSql($sql);
						$row = $this->getAffectedRows();
						
						if($row < 0){
							$this->rollback();
							throw new Exception('atax_input_paper_detail update fail row : ' + $row);
						}
						else {
							$sql = "UPDATE add_tax
										SET co_id = $co_id
										  ,atax_yyyymmdd = $item_yyyymmdd
										  ,atax_type = $atax_type
										  ,atax_item_nm = '$item_nm'
										  ,atax_item_cnt = $item_cnt
										  ,atax_item_danga = $item_danga
										  ,atax_supply_price = $item_supply_value
										  ,atax_tax = $item_atax
										  ,atax_customer_id = $customer_id
										  ,atax_elect_flag = 'n'
										  ,atax_elect_no = ''
										  ,atax_input_type = $type
										  ,atax_input_type_id = $detail_id
										  ,atax_reg_date = now()
										  ,atax_reg_uid = $uid
										WHERE atax_id = $atax_id;";
						}
						$this->updateSql($sql);
						$row = $this->getAffectedRows();
						
						if($row < 0){
							$this->rollback();
							throw new Exception('add_tax update fail row : ' + $row);
						}
					}
					
				}
			}
			else {
				$this->rollback();
				throw new Exception('array insert / update fail row = 0 ');
			}
		}
		catch (Exception $e){
			//Exception 발생시 rollback
			$this->rollback();
			
			throw new Exception($e);
		}
		
		$this->commit();
		return 1;
	}
	//가맹 회원 매입/.매출 정보 삭제(리스트)
	public function deleteTaxInfomation() {
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$header_id = (int) $this->param['header_id'];
		$type = (int) $this->param['type'];
		
		try{
			$this->startTransaction();
			
			$sql = "DELETE FROM atax_input_paper_header 
						WHERE _id = $header_id and type = $type;";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				$this->rollback();
				throw new Exception('atax_input_paper_header delete fail row : ' + $row);
			}
			
			$sql = "DELETE FROM add_tax
			WHERE atax_id IN(
				SELECT atax_id
				FROM atax_input_paper_detail
				WHERE header_id = $header_id and type = $type
			);";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				$this->rollback();
				throw new Exception('add_tax delete fail row : ' + $row);
			}
			
			$sql = "DELETE FROM atax_input_paper_detail
			WHERE header_id = $header_id and type = $type;";
			
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
			
			if($row < 0){
				$this->rollback();
				throw new Exception('atax_input_paper_detail delete fail row : ' + $row);
			}
		}
		catch (Exception $e){
			//Exception 발생시 rollback
			$this->rollback();
			
			throw new Exception($e);
		}
		
		$this->commit();
		return 1;
	}
	
	//가맹 회원 매입/.매출 정보  단건 삭제
	public function deleteTaxForDid(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$detail_id = (int) $this->param['detail_id'];
		
		try{
			$sql = "DELETE FROM add_tax
						WHERE atax_id IN(
							SELECT atax_id
							FROM atax_input_paper_detail
							WHERE _id = $detail_id
						);";
				
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
				
			if($row < 0){
				$this->rollback();
				throw new Exception('add_tax delete fail row : ' + $row);
			}
				
			$sql = "DELETE FROM atax_input_paper_detail
						WHERE _id = $detail_id;";
				
			$this->updateSql($sql);
			$row = $this->getAffectedRows();
				
			if($row < 0){
				$this->rollback();
				throw new Exception('atax_input_paper_detail delete fail row : ' + $row);
			}
		}
		catch (Exception $e){
			//Exception 발생시 rollback
			$this->rollback();
				
			throw new Exception($e);
		}
		
		$this->commit();
		return 1;
	}
	
	/*
	 * 영업회원 매출 자료업로드 고정 회사 정보 조회
	 * */
	public function selectSalesCompany(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['eriod_flag'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT co_id, co_nm, co_ceo_nm
						, co_saup_no, co_co_no, co_tel
					FROM company_info 
					WHERE co_id IN (
						SELECT c.co_id
						FROM sales_member s
					  	join company_member c
					  	on s.cus_uid = c.uid
						WHERE sales_uid = $uid
					);";
	
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//세무회원 회사 정보 조회
	public function selectTaxCompany(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['eriod_flag'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT co_id, co_nm, co_ceo_nm
					, co_saup_no, co_co_no, co_tel
					FROM company_info
					WHERE tax_uid = $uid;
					";
		
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	/*
	 * 영업회원 매출 자료업로드 정보 조회
	 * */
	public function selectSalesData(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		/* 
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['period_flag'];
		 * WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT c.co_id, c.co_nm, c.co_ceo_nm
					  , c.co_saup_no, c.co_co_no, co_tel
					  , a._id as atax_van_id, a.yyyy, a.period_flag
					  , a.sales_upload_flag, a.sales_upload_pdf
					  , a.bigo, a.reg_uid, a.reg_date
					FROM company_info c
					join atax_input_sales_van a
					on a.co_id = c.co_id
					WHERE c.co_id IN (
					  SELECT c.co_id
					  FROM sales_member s 
					  join company_member c
					  on s.cus_uid = c.uid 
					  WHERE sales_uid = $uid
					);";
		
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	//영업회훤 매출 자료업로드 등록 후 정보 조회
	public function selectSalesDataAffterInsert(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = $this->param['co_id'];
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['period_flag'];
		$sql = "SELECT _id as atax_van_id ,bigo , 
						co_id, period_flag,
						reg_date, reg_uid,
						sales_upload_flag, sales_upload_pdf,
						yyyy
				   FROM atax_input_sales_van
				   WHERE co_id=$co_id AND yyyy=$yyyy AND period_flag = '$period_flag';";
	
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	//영업회훤 매출 자료업로드 등록
	public  function insertSalesUpload($pdfName){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = $this->param['co_id'];
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['period_flag'];
		$bigo = $this->param['bigo'];
		$pdfNameYn = 'n';
		
		if(!empty($pdfName)){
			$pdfNameYn = 'y';
		}
		
		//mysql unique 제약조건 추가
		//ALTER TABLE atax_input_sales_van ADD UNIQUE INDEX (co_id, yyyy, period_flag);
		$sql = "INSERT INTO atax_input_sales_van(
					   co_id
					  ,yyyy
					  ,period_flag
					  ,sales_upload_flag
					  ,sales_upload_pdf
					  ,reg_uid
					  ,reg_date
					  ,bigo
					) VALUES (
					  $co_id
					  ,$yyyy
					  ,'$period_flag'
					  ,'$pdfNameYn'
					  ,'$pdfName' 
					  ,$uid
					  ,now()
					  ,'$bigo'
					)
					ON DUPLICATE KEY UPDATE 
					  sales_upload_flag='$pdfNameYn', sales_upload_pdf='$pdfName'
					  , reg_uid=$uid , reg_date=now() ,bigo='$bigo';";
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
			
		if($row < 0){
			$this->rollback();
			throw new Exception('atax_input_sales_van insert fail row : ' + $row);
		}
		
		return 1;
	}
	
	public function insertSalesUploadForBigo(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$atax_van_id =(int) $this->param['atax_van_id'];
		$bigo = $this->param['bigo'];
		
		
		$sql = "UPDATE atax_input_sales_van
					SET bigo = '$bigo'
					WHERE _id = $atax_van_id;";
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
			
		if($row < 0){
			throw new Exception('atax_input_sales_van update fail row : ' + $row);
		}
		
		return 1;
	}
	
	//세무회원 회사 정보 조회
	public function selectTaxDataByCompanyAsCust(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		
		$sql = " SELECT b.co_id, b.period_flag, b.yyyy
					    , sum(if(b.atax_type in('11', '13'), (b.num), 0
					    )) sales_count
					    , sum(if(b.atax_type in('51', '53'), (b.num), 0
					    )) purchase_count
					 FROM (
					  SELECT a.*
					    , count(*) as num
					   FROM(
					    SELECT co_id
					        , IF (month(cast(atax_yyyymmdd as datetime)) < 7, '1', '2') period_flag
					        , floor(atax_yyyymmdd / 10000)  as yyyy
					        , atax_type
					    FROM add_tax
					   )a
						WHERE co_id in (
					      SELECT co_id 
					      FROM company_info 
					      WHERE tax_uid = $uid 
					   )
					   group by co_id, period_flag, yyyy, atax_type
					 ) b
					 group by b.co_id, b.period_flag, b.yyyy;	 ";
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//세무 회원 회사정보 조회
	public function selectTaxDataByCompanyAsSales(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		
		$sql = "SELECT 
				    com.co_id, com.co_nm, com.co_ceo_nm
				  	, com.co_saup_no, com.co_co_no, com.co_tel
				    , van.yyyy, van.period_flag, van.sales_upload_flag, van.sales_upload_pdf, van.tax_complete_flag
				  FROM company_info com
				  left outer join atax_input_sales_van van
				  on com.co_id = van.co_id
				  WHERE com.tax_uid = $uid ";
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
		
	}
	
	//세무회원 영업 등록 정보 수정
	public function updateTaxDataFlag(){
		$tax_complete_flag =  $this->param['tax_complete_flag'];
		$co_id =  $this->param['co_id'];
		$yyyy =  $this->param['yyyy'];
		$period_flag =  $this->param['period_flag'];
		
		$sql = "UPDATE atax_input_sales_van
					SET tax_complete_flag = '$tax_complete_flag'
					WHERE co_id = $co_id and yyyy = $yyyy and period_flag = '$period_flag';";
			
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
			
		if($row < 0){
			$this->rollback();
			throw new Exception('atax_input_paper_detail delete fail row : ' + $row);
		}
		
		return 1;
	}
	
	
	public function selectExcelDownloadData(){
		
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id =  $this->param['co_id'];
		$yyyy =  $this->param['yyyy'];
		$period_flag =  $this->param['period_flag'];
		$atax_type = $this->param['atax_type'];
		
		$sql = "
				SELECT a.*, b.*
				FROM
				(
				  SELECT * 
				  , IF (month(cast(atax_yyyymmdd as datetime)) < 7, '1', '2') period_flag 
				  , floor(atax_yyyymmdd / 10000)  as yyyy
				  FROM add_tax
				  WHERE atax_type in ($atax_type)
				  AND co_id = $co_id
				) a
				join customer b
				on a.co_id = b.co_id and a.atax_customer_id = b.customer_id
				WHERE a.period_flag = '$period_flag'  AND a.yyyy = $yyyy;";
		
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	//세무회원 excel정보 조회(회사정보)
	public function selectExcelDownloadDataAsComp(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)$_SESSION[DBWork::companyKey];
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['eriod_flag'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT  co_nm, co_saup_no
					FROM company_info
					WHERE co_id in (
					  select co_id
					  from company_member
					  where uid=$uid 
					)";
	
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	public function selectExcelDownloadDataAsCompany($co_id){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$yyyy = $this->param['yyyy'];
		$period_flag = $this->param['eriod_flag'];
		/* WHERE yyyy = $yyyy AND period_flag = '$period_flag'*/
		$sql = "SELECT  co_nm, co_saup_no
					FROM company_info
					WHERE co_id = $co_id";
		$this->querySql($sql);
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
}

?>