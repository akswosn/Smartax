<?php

class ConvertUtils
{
	public static function convertCompany($fromWork, $toWork,$uid) 
	{
		$toWork->startTransaction();
		
		//result
		$co_list=array();
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM mycom;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_nm = $item['CO_NM'];
			$co_ceo_nm = $item['CO_CEO'];
			$co_saup_no = $item['CO_SAUP_NO'];
			$co_co_no = $item['CO_CO_NO'];
			$co_up = $item['CO_UP'];
			$co_jong = $item['CO_JONG'];
			$co_zip = $item['CO_ZIP'];
			$co_addr = $item['CO_ADDR'];
			$co_tel = $item['CO_TEL'];
			$co_fax = $item['CO_FAX'];
			$co_handphone = $item['co_nm'];
			$use_jakmok = $item['USE_JAKMOK'];
			$use_company = $item['USE_COMPANY'];
			$use_gyulsan_date = $item['USER_GYULSAN_DATE'];
			
			$insertSql = "INSERT INTO company_info 
						(`co_nm`,`co_ceo_nm`,`co_saup_no`,`co_co_no`,`co_up`,
							`co_jong`,`co_zip`,`co_addr`,`co_tel`,`co_fax`,
							`co_handphone`,`use_jakmok`,`use_company`,`use_gyulsan_date`,`reg_date`,
							`reg_uid`)
						VALUES
					('$co_nm','$co_ceo_nm','$co_saup_no','$co_co_no','$co_up',
						'$co_jong','$co_zip','$co_addr','$co_tel','$co_fax',
						'$co_handphone','$use_company','$use_company',$use_gyulsan_date,now(),
						$uid);";
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			
			$co_cd = $item['CO_CD'];
			$result["$co_cd"]=$toWork->insert_id();
			echo "<br> Company -> $co_cd --> ".$result["$co_cd"]."<br>";
			
			$idx++;
		}
		$toWork->commit();
		return $result;
	}
	
	public static function convertGycode($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//system gycode
		$sysGycodeSql = "SELECT gycode FROM gycode_system where modify_yn='0';";
		$toWork->querySql($sysGycodeSql);
		
		$system_gycode=null;
		
		//data inserts 
		while($item=$toWork->fetchMixedRow())
		{
			$system_gycode[$item['gycode']]='y';
		}
		//echo json_encode($system_gycode)."<br/>";
		
		//data query
		$dataSql = 'SELECT * FROM gycode;';
		$fromWork->querySql($dataSql);
		
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list["$item[CO_CD]"];
			$gycode = $item['GYCODE'];
			if($system_gycode[$gycode]=='y'){
				//echo "out --> $gycode <br>";
				continue;
			}
			//echo "in --> $gycode <br>";
			
			$gy_name = $item['GY_NAME'];
			$gy_rem = $item['GY_REM'];
			$use_yn = $item['USE_YN'];

			if($co_id =='') 
			{
				continue;
			}
			
			$insertSql = "INSERT INTO gycode 
							(`co_id`,`gycode`,`gy_name`,`gy_rem`,`use_yn`,`reg_date`,`reg_uid`)
						VALUES
							($co_id, $gycode ,'$gy_name','$gy_rem','$use_yn',now(),$uid)
							ON DUPLICATE KEY UPDATE 
						`co_id` = $co_id,`gycode` = $gycode, `gy_name` = '$gy_name', `gy_rem` = '$gy_rem', `use_yn` = '$use_yn', `reg_date` = now(), `reg_uid` = $uid;";
			
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertSystemGycode($fromWork, $toWork) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM gycode_org;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$gycode = $item['GYCODE'];
			$gy_name = $item['GY_NAME'];
			$gy_rem = $item['GY_REM'];
			$use_yn = $item['USE_YN'];
			
			$insertSql = "INSERT INTO gycode_system
							(`gycode`,`gy_name`,`gy_rem`,`modify_yn`,`reg_date`)
						VALUES
							($gycode ,'$gy_name','$gy_rem','$use_yn',now())
						ON DUPLICATE KEY UPDATE 
						`gycode` = $gycode, `gy_name` = '$gy_name', `gy_rem` = '$gy_rem', `modify_yn` = '$use_yn', `reg_date` = now();";	
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		
		$toWork->commit();
		return $idx;
	}
	
	public static function convertJakmok($isWork, $fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$FromTable ='jakmok';
		if($isWork)
			$FromTable = 'workjakmok';
		
		$dataSql = "SELECT * FROM $FromTable;";
		$fromWork->querySql($dataSql);
				
		//data query
		$toTable ='jakmok';
		if($isWork)
			$toTable = 'work_jakmok';
		
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list[$item[CO_CD]];
			$jakmok_code = $item['JAKMOK_CODE'];
			$jakmok_name = $item['JAKMOK_NAME'];
			$use_yn = $item['USE_YN'];
			
			if($isWork){
				$co_id= $co_list["$item[co_cd]"];
				if($co_id=="") $co_id= $co_list[$item[CO_CD]];
				
				$use_yn = $item['use_yn'];
				if($use_yn=="") $use_yn = $item['USE_YN'];
				
				//$co_id= $co_list["$item[co_cd]"];
				//$use_yn = $item['use_yn'];
			}
						
			$insertSql = "INSERT INTO $toTable 
							(`co_id`,`jakmok_code`,`jakmok_name`,`reg_uid`,`reg_date`,`use_yn`)
						VALUES
							($co_id,$jakmok_code,'$jakmok_name',$uid,now(),$use_yn);";
			
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertWorkCd($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM work_cd;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list["$item[co_cd]"];
			$work_cd = $item['Work_cd'];
			$work_nm = $item['Work_nm'];
			$use_yn = $item['use_yn'];
			
			$insertSql = "INSERT INTO work_cd
							(`co_id`,`work_cd`,`work_nm`,`use_yn`,`reg_date`,`reg_uid`)
						VALUES
							($co_id,$work_cd,'$work_nm','$use_yn',now(),$uid);";
			
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertWorkDairy($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM workdiary;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list["$item[CO_CD]"];
			$work_date = $item['w_dt'];
			if($work_date == '') $work_date = $item['W_DT'];
				
			$work_date=str_replace('-', '', $work_date); 
			$work_date_token = "STR_TO_DATE($work_date, '%Y%m%d')";
			
			$jakmok_cd = $item['jakmok_cd'];
			$work_cd = $item['Work_CD'];
			$weather_cd = $item['weather_cd'];
			$work_area = $item['Work_Area'];
			$work_man = $item['Work_Man'];
			$work_time = $item['Work_Time'];
			$work_job = $item['Work_job'];
		
			$insertSql = "INSERT INTO workdairy
							(`co_id`,`work_date`,`jakmok_cd`,`work_cd`,`weather_cd`,
							`reg_uid`,`reg_date`,`work_area`,`work_man`,`work_time`,
							`work_job`,`work_pic`)
						VALUES
							($co_id, $work_date_token ,$jakmok_cd,$work_cd,$weather_cd,
							$uid ,now(),$work_area,$work_man,$work_time,
							'$work_job','');";
			
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertGichoMaster($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM gicho_master;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list["$item[CO_CD]"];
			$gycode = (int)$item['GYCODE'];
			$year =  (int)substr($item['YYYYMMDD'], 0, 4);
			$debit =(int) $item['DEBIT'];
			$credit =(int) $item['CREDIT'];
			$gubun = $item['GUBUN'];
			
			if($gubun!='1') continue;
			/*
			$r_debit = 0;
			$r_credit = 0;
			
			if(((int)$gycode/100)==1 or ((int)$gycode/100)==4){
				$r_debit=$debit-$credit;
				if($r_debit<0) $r_credit=$r_debit*(-1);
			}else{
				$r_credit=$credit-$debit;
				if($r_credit<0) $r_debit=$r_credit*(-1);
			}
			
			$insertSql = "INSERT INTO gicho_master
							(`co_id`,`gycode`,`year`,`debit`,`credit`,`gubun`,`reg_date`,`reg_uid`)
						VALUES
							($co_id,$gycode,$year,$r_debit,$r_credit,'$gubun',now(),$uid);";
			*/
			$insertSql = "INSERT INTO gicho_master
							(`co_id`,`gycode`,`year`,`debit`,`credit`,`gubun`,`reg_date`,`reg_uid`)
						VALUES
							($co_id,$gycode,$year,$debit,$credit,'$gubun',now(),$uid)
						ON DUPLICATE KEY UPDATE 
						`co_id` = $co_id,`gycode` = $gycode, `year` = $year, `debit` = $debit, `credit` = $credit, 
						`gubun` = $gubun,`reg_date` = now(), `reg_uid` = $uid;";	
			
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertGichoDetail($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM gicho_detail;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list["$item[CO_CD]"];
			$gycode = (int)$item['GYCODE'];
			$year =  (int)substr($item['YYYYMMDD'], 0, 4);
			$debit =(int) $item['DEBIT'];
			$credit =(int) $item['CREDIT'];
			$gubun = $item['GUBUN'];
			$customer_id = (int)$item['COM_CODE'];
			
			if($gubun!='1') continue;
			/*
			$r_debit = 0;
			$r_credit = 0;
			
			if(((int)$gycode/100)==1 or ((int)$gycode/100)==4){
				$r_debit=$debit-$credit;
				if($r_debit<0) $r_credit=$r_debit*(-1);
			}else{
				$r_credit=$credit-$debit;
				if($r_credit<0) $r_debit=$r_credit*(-1);
			}
			
			$insertSql = "INSERT INTO gicho_detail
							(`co_id`,`gycode`,`year`,`customer_id`,`debit`,`credit`,`gubun`,`reg_date`,`reg_uid`)
						VALUES
							($co_id,$gycode,$year,$customer_id,$r_debit,$r_credit,'$gubun',now(),$uid);";
			*/
			$insertSql = "INSERT INTO gicho_detail
							(`co_id`,`gycode`,`year`,`customer_id`,`debit`,`credit`,`gubun`,`reg_date`,`reg_uid`)
						VALUES
							($co_id,$gycode,$year,$customer_id,$debit,$credit,'$gubun',now(),$uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id,`gycode` = $gycode, `year` = $year, `customer_id` = $customer_id, `debit` = $debit, `credit` = $credit, 
							`gubun` = $gubun,`reg_date` = now(), `reg_uid` = $uid;";
			
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertCustomer($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM company;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			$co_id= $co_list["$item[CO_CD]"];
			//필수
			$customer_id = (int)$item['TR_CD'];
			$tr_nm = $item['TR_NM'];
			$tr_daepyo = $item['TR_DAEPYO'];
			$tr_saup_no = $item['TR_SAUP_NO'];
			$tr_jumin_no = $item['TR_JUMIN_NO'];
			$tr_up = $item['TR_UP'];
			$tr_jong = $item['TR_JONG'];
			$tr_zip = $item['TR_ZIP'];
			$tr_addr = $item['TR_ADDR'];
			$tr_tel = $item['TR_TEL'];
			$tr_phone = $item['TR_PHON'];
			$tr_fax = $item['TR_FAX'];
			$tr_homepage = $item['TR_HOMEPAGE'];
			$tr_email = $item['TR_EMAIL'];
			$tr_manager = $item['TR_MANAGER'];
			$tr_sdate = str_replace('-', '', $item['TR_SDATE']);
			$tr_edate = str_replace('-', '', $item['TR_EDATE']);
			$tr_s_e=true;
			if (strpos($tr_sdate,'_')!==false or strpos($tr_edate,'_')!==false) { 
				 $tr_s_e=false;
			}
			
			$cid_tel1 = $item['CID_TEL1'];
			$cid_tel2 = $item['CID_TEL2'];
			$cid_tel3 = $item['CID_TEL3'];
			$tr_bigo = $item['TR_BIGO'];
			
			if($tr_s_e){
				$insertSql = "INSERT INTO customer
							(`customer_id`,`co_id`,`tr_nm`,`tr_daepyo`,`tr_saup_no`,`tr_jumin_no`,`tr_up`,`tr_jong`,`tr_zip`,`tr_addr`,
								`tr_tel`,`tr_phone`,`tr_fax`,`tr_homepage`,`tr_email`,`tr_manager`,`tr_sdate`,`tr_edate`,`cid_tel1`,`cid_tel2`,
								`cid_tel3`,`tr_bigo`,`tr_chuchun`,`reg_date`,`reg_uid`)
						VALUES
							($customer_id,$co_id,'$tr_nm','$tr_daepyo','$tr_saup_no','$tr_jumin_no','$tr_up','$tr_jong','$tr_zip','$tr_addr',
								'$tr_tel','$tr_phone','$tr_fax','$tr_homepage','$tr_email','$tr_manager',STR_TO_DATE($tr_sdate, '%Y%m%d'),STR_TO_DATE($tr_edate, '%Y%m%d')
								,'$cid_tel1','$cid_tel2','$cid_tel3','$tr_bigo',0,now(),$uid);";
								}
			else{
				$insertSql = "INSERT INTO customer
							(`customer_id`,`co_id`,`tr_nm`,`tr_daepyo`,`tr_saup_no`,`tr_jumin_no`,`tr_up`,`tr_jong`,`tr_zip`,`tr_addr`,
								`tr_tel`,`tr_phone`,`tr_fax`,`tr_homepage`,`tr_email`,`tr_manager`,`cid_tel1`,`cid_tel2`,
								`cid_tel3`,`tr_bigo`,`tr_chuchun`,`reg_date`,`reg_uid`)
						VALUES
							($customer_id,$co_id,'$tr_nm','$tr_daepyo','$tr_saup_no','$tr_jumin_no','$tr_up','$tr_jong','$tr_zip','$tr_addr',
								'$tr_tel','$tr_phone','$tr_fax','$tr_homepage','$tr_email','$tr_manager','$cid_tel1','$cid_tel2'
								,'$cid_tel3','$tr_bigo',0,now(),$uid);";
			}
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertJunpyo($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM junpyo;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= $co_list["$item[CO_CD]"];
			$jp_yyyymmdd =(int)str_replace('-', '', $item['JP_DATE']);
			$jp_no = (int)$item['JP_NO'];
			$jp_gubun = (int)$item['JP_GUBUN'];
			$gycode = (int)$item['JP_GYCODE'];
			$customer_id = (int)$item['JP_COM_CODE'];
			$jakmok_code = (int)$item['JP_JAKMOK'];
			$debit = (int)$item['JP_DEBIT'];
			$credit = (int)$item['JP_CREDIT'];
			$jp_rem = $item['JP_REM'];
			$jp_view = $item['JP_VIEW'];
			$jp_view_gubun = $item['JP_VIEW_GUBUN'];
			
			switch ($jp_view_gubun) {
				case 'A': $jp_view_gubun=5;	break;
				case 'B': $jp_view_gubun=6;	break;
				case 'C': $jp_view_gubun=9;	break;
				case 'D': $jp_view_gubun=10;break;
				case 'E': $jp_view_gubun=7;	break;
				case 'F': $jp_view_gubun=8;break;
			}
			
			if($jakmok_code=='' or $jakmok_code==null) $jakmok_code=0;
			if($customer_id=='' or $customer_id==null) $customer_id=0;
			if($debit=='' or $debit==null) $debit=0;
			if($credit=='' or $credit==null) $credit=0;
			if($jp_view =='Y') $jp_view='y';
			if($jp_view =='N') $jp_view='n';
			
			$fromWork->escapeString($jp_rem);
			
			$insertSql = "INSERT INTO junpyo
							(`co_id`,`jp_yyyymmdd`,`jp_no`,`jp_gubun`,`gycode`,`customer_id`,
								`jakmok_code`,`debit`,`credit`,`jp_rem`,`jp_view`,`jp_view_gubun`,`reg_uid`,
								`reg_date`,`jp_match_id`)
						VALUES
							($co_id,$jp_yyyymmdd,$jp_no,$jp_gubun,$gycode,$customer_id,
								$jakmok_code,$debit,$credit,'$jp_rem','$jp_view',$jp_view_gubun,$uid,
							now(),0);";
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}

	public static function fixedJunpyo($toWork,$co_list,$uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		foreach( $co_list as $key => $value){
			$co_id=$value;
			//data query
			$dataSql = "SELECT jp_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id AND jp_view='n';";
			$toWork->querySql($dataSql);
					
			while($item=$toWork->fetchMixedRow())
			{
				//필수
				$jp_id = $item['jp_id'];
				$jp_yyyymmdd =$item['jp_yyyymmdd'];
				$jp_no = $item['jp_no'];
				
				$insertSql = "UPDATE junpyo 
								SET `jp_match_id` = $jp_id
								WHERE jp_yyyymmdd=$jp_yyyymmdd AND jp_no=$jp_no AND co_id=$co_id AND jp_view='y';";
								
				//echo $insertSql."<br/>";						
							
				$toWork->updateSql($insertSql);
				$idx++;
			}
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function fixedJunpyo2($toWork,$co_id) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT jp_id,jp_yyyymmdd,jp_no FROM junpyo WHERE co_id=$co_id AND jp_view='n';";
		$toWork->querySql($dataSql);
				
		//$r_data=$toWork->result;
		//while($item=$r_data->fetch_array()){
		//data inserts 
		while($item=$toWork->fetchMixedRow())
		{
			//필수
			$jp_id = $item['jp_id'];
			$jp_yyyymmdd =$item['jp_yyyymmdd'];
			$jp_no = $item['jp_no'];
			
			$insertSql = "UPDATE junpyo 
							SET `jp_match_id` = $jp_id
							WHERE jp_yyyymmdd=$jp_yyyymmdd AND jp_no=$jp_no AND co_id=$co_id AND jp_view='y';";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	
	public static function connectMyCom($toWork,$co_list,$uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data inserts 
		foreach($co_list as $key => $value){
			$insertSql = "INSERT INTO company_member
							(`uid`,`co_id`,`mem_level`,`reg_date`,`reg_uid`)
						VALUES
							($uid,$value,100,now(),$uid);";
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	//2차
	public static function convertItem($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM item;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= (int)$co_list["$item[CO_CD]"];
			$item_cd = (int)$item['ITEM_CD'];
			$itemgrp_cd = (int)$item['ITEMGRP_CD'];
			$item_nm = $item['ITEM_NM'];
			$item_qty = $item['ITEM_QTY'];
			$item_danwi = $item['ITEM_DANWI'];
			$item_in_danga = $item['ITEM_IN_DANGA'];
			$item_out_danga = $item['ITEM_OUT_DANGA'];
			
			$insertSql = "INSERT INTO item
							(`co_id`, `item_cd`, `itemgrp_cd`, `item_nm`, `item_qty`, `item_danwi`, `item_in_danga`, `item_out_danga`,
								`reg_date`, `reg_uid`)
						VALUES
							($co_id, $item_cd, $itemgrp_cd, '$item_nm', '$item_qty', '$item_danwi', $item_in_danga, $item_out_danga,
								now(),$uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `item_cd` = $item_cd, `itemgrp_cd` = $itemgrp_cd, `item_nm` = '$item_nm',
							`item_qty` = '$item_qty', `item_danwi` = '$item_danwi', `item_in_danga` = $item_in_danga,
							`item_out_danga` = $item_out_danga, `reg_date` = now(), `reg_uid` = $uid;";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertItemGrp($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM itemgrp;';
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id= (int)$co_list["$item[CO_CD]"];
			$itemgrp_cd = (int)$item['ITEMGRP_CD'];
			$itemgrp_nm = $item['ITEMGRP_NM'];
			
			$insertSql = "INSERT INTO item_grp
							(`co_id`,`itemgrp_cd`,`itemgrp_nm`,`reg_date`,`reg_uid`)
						VALUES
							($co_id,$itemgrp_cd,'$itemgrp_nm',now(),$uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `itemgrp_cd` = $itemgrp_cd, `itemgrp_nm` = '$itemgrp_nm', `reg_date` = now(), `reg_uid` = $uid;";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertMemorial($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = 'SELECT * FROM memorial_day;';
		$fromWork->querySql($dataSql);
				
		$co_id= (int)$co_list["001"];
		
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$yyyymmdd =(int)str_replace('-', '', $item['yyyymmdd']);
			$memorial = $item['memorial'];
			
			$insertSql = "INSERT INTO memorial_day
							(`co_id`, `yyyymmdd`, `memorial`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $yyyymmdd, '$memorial', now(), $uid);";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	
	public static function convertInputMaster($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT * FROM io_master WHERE IO_GUBUN='1';";
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id = (int)$co_list["$item[CO_CD]"];
			$io_dt = (int)str_replace('-', '', $item['IO_DT']); 
			$io_no = (int)$item['IO_NO'];
			//$io_tax_gubun = $item['IO_tax_gubun'];
			$io_tax_gubun = '2';
			$io_tr_cd = (int)$item['IO_tr_cd'];
			$io_tamt = (int)$item['IO_Tamt'];
			$io_tax = (int)$item['IO_tax'];
			$IO_tax_no = $item['IO_tax_no'];
			$IO_CASH = $item['IO_CASH'];
			$IO_BIGO = $item['IO_BIGO'];
			$TAEKBAE_CO_NM = $item['TAEKBAE_CO_NM'];
			$TAEKBAE_NO = $item['TAEKBAE_NO'];
			$JP_NO = (int)$item['JP_NO'];
			
			/*
			$jpSql = "SELECT jp_id FROM junpyo WHERE jp_no=$JP_NO AND co_id=$co_id AND jp_yyyymmdd=$io_dt";
			//echo "$jpSql<br>";
			$toWork->querySql($jpSql);
			
			$jp_id = 0;
			if($row=$toWork->fetchMixedRow())
			{
				$jp_id =  $row[0];
				//echo " --> $jp_id <br>";
			}
			*/
			 /*
			$insertSql = "INSERT INTO input_master
							(`co_id`, `io_dt`, `io_no`, `io_tax_gubun`, `io_tr_cd`, `io_tamt`, `io_tax`, `io_tax_no`, `io_cash`, `io_bigo`,
								`taekbae_co_nm`, `taekbae_no`, `jp_id`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $io_dt, $io_no, '$io_tax_gubun', $io_tr_cd, $io_tamt, $io_tax, '$IO_tax_no', '$IO_CASH' , '$IO_BIGO',
								'$TAEKBAE_CO_NM', '$TAEKBAE_NO',$jp_id, now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_tax_gubun` = '$io_tax_gubun', `io_tr_cd` = $io_tr_cd,
							`io_tamt` = $io_tamt, `io_tax` = $io_tax, `io_tax_no` = '$IO_tax_no', `io_cash` = '$IO_CASH', `io_bigo` = '$IO_BIGO',
							`taekbae_co_nm` = '$TAEKBAE_CO_NM', `taekbae_no` = '$TAEKBAE_NO', `jp_id` = $jp_id, `reg_date` = now(),
							`reg_uid` = $uid;";
				*/
			$insertSql = "INSERT INTO input_master
							(`co_id`, `io_dt`, `io_no`, `io_tax_gubun`, `io_tr_cd`, `io_tamt`, `io_tax`, `io_tax_no`, `io_cash`, `io_bigo`,
								 `jp_no`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $io_dt, $io_no, '$io_tax_gubun', $io_tr_cd, $io_tamt, $io_tax, '$IO_tax_no', '$IO_CASH' , '$IO_BIGO',
								$JP_NO, now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_tax_gubun` = '$io_tax_gubun', `io_tr_cd` = $io_tr_cd,
							`io_tamt` = $io_tamt, `io_tax` = $io_tax, `io_tax_no` = '$IO_tax_no', `io_cash` = '$IO_CASH', `io_bigo` = '$IO_BIGO',
							 `jp_no` = $JP_NO, `reg_date` = now(),`reg_uid` = $uid;";	
						
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}

	public static function convertInputDetail($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT * FROM io_detail WHERE IO_GUBUN='1';";
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id = (int)$co_list["$item[CO_CD]"];
			$io_dt = (int)str_replace('-', '', $item['IO_DT']); 
			$io_no = (int)$item['IO_NO'];
			$IO_SEQ = (int)$item['IO_SEQ'];
			$IO_ITEM_CD = (int)$item['IO_ITEM_CD'];
			$IO_SU = (int)$item['IO_SU'];
			$IO_DAN = (int)$item['IO_DAN'];
			$IO_AMT = (int)$item['IO_AMT'];
			$IO_REM = $item['IO_REM'];
			
			$insertSql = "INSERT INTO input_detail
							(`co_id`, `io_dt`, `io_no`, `io_seq`, `io_item_cd`, `io_su`, `io_dan`, `io_amt`, `io_rem`,
								`reg_date`, `reg_uid`)
						VALUES
							($co_id, $io_dt, $io_no, $IO_SEQ, $IO_ITEM_CD, $IO_SU, $IO_DAN, $IO_AMT, '$IO_REM' 
								, now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_seq` = $IO_SEQ, `io_item_cd` = $IO_ITEM_CD,
							`io_su` = $IO_SU, `io_dan` = $IO_DAN, `io_amt` = $IO_AMT, `io_rem` = '$IO_REM', `reg_date` = now(),
							`reg_uid` = $uid;";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}

	public static function convertOutputMaster($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT * FROM io_master WHERE IO_GUBUN='2';";
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id = (int)$co_list["$item[CO_CD]"];
			$io_dt = (int)str_replace('-', '', $item['IO_DT']); 
			$io_no = (int)$item['IO_NO'];
			$io_tax_gubun = $item['IO_tax_gubun'];
			$io_tr_cd = (int)$item['IO_tr_cd'];
			$io_tamt = (int)$item['IO_Tamt'];
			$io_tax = (int)$item['IO_tax'];
			$IO_tax_no = $item['IO_tax_no'];
			$IO_CASH = $item['IO_CASH'];
			$IO_BIGO = $item['IO_BIGO'];
			$TAEKBAE_CO_NM = $item['TAEKBAE_CO_NM'];
			$TAEKBAE_NO = $item['TAEKBAE_NO'];
			$JP_NO = (int)$item['JP_NO'];
			
			/*
			$jpSql = "SELECT jp_id FROM junpyo WHERE jp_no=$JP_NO AND co_id=$co_id AND jp_yyyymmdd=$io_dt";
			//echo "$jpSql<br>";
			$toWork->querySql($jpSql);
			$jp_id = 0;
			
			if($row=$toWork->fetchMixedRow())
			{
				$jp_id =  $row[0];
				//echo " --> $jp_id <br>";
			}
			*/
			
			$insertSql = "INSERT INTO output_master
							(`co_id`, `io_dt`, `io_no`, `io_tax_gubun`, `io_tr_cd`, `io_tamt`, `io_tax`, `io_tax_no`, `io_cash`, `io_bigo`,
								 `jp_no`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $io_dt, $io_no, '$io_tax_gubun', $io_tr_cd, $io_tamt, $io_tax, '$IO_tax_no', '$IO_CASH' , '$IO_BIGO',
								$JP_NO, now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_tax_gubun` = '$io_tax_gubun', `io_tr_cd` = $io_tr_cd,
							`io_tamt` = $io_tamt, `io_tax` = $io_tax, `io_tax_no` = '$IO_tax_no', `io_cash` = '$IO_CASH', `io_bigo` = '$IO_BIGO',
							 `jp_no` = $JP_NO, `reg_date` = now(),
							`reg_uid` = $uid;";
			/*				
			
			$insertSql = "INSERT INTO output_master
							(`co_id`, `io_dt`, `io_no`, `io_tax_gubun`, `io_tr_cd`, `io_tamt`, `io_tax`, `io_tax_no`, `io_cash`, `io_bigo`,
								`taekbae_co_nm`, `taekbae_no`, `jp_id`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $io_dt, $io_no, '$io_tax_gubun', $io_tr_cd, $io_tamt, $io_tax, '$IO_tax_no', '$IO_CASH' , '$IO_BIGO',
								'$TAEKBAE_CO_NM', '$TAEKBAE_NO',$jp_id, now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_tax_gubun` = '$io_tax_gubun', `io_tr_cd` = $io_tr_cd,
							`io_tamt` = $io_tamt, `io_tax` = $io_tax, `io_tax_no` = '$IO_tax_no', `io_cash` = '$IO_CASH', `io_bigo` = '$IO_BIGO',
							`taekbae_co_nm` = '$TAEKBAE_CO_NM', `taekbae_no` = '$TAEKBAE_NO', `jp_id` = $jp_id, `reg_date` = now(),
							`reg_uid` = $uid;";
						*/
			 
			 //echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}

	public static function convertOutputDetail($fromWork, $toWork,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT * FROM io_detail WHERE IO_GUBUN='2';";
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id = (int)$co_list["$item[CO_CD]"];
			$io_dt = (int)str_replace('-', '', $item['IO_DT']); 
			$io_no = (int)$item['IO_NO'];
			$IO_SEQ = (int)$item['IO_SEQ'];
			$IO_ITEM_CD = (int)$item['IO_ITEM_CD'];
			$IO_SU = (int)$item['IO_SU'];
			$IO_DAN = (int)$item['IO_DAN'];
			$IO_AMT = (int)$item['IO_AMT'];
			$IO_REM = $item['IO_REM'];
						
			$jumun_no = (int)$item['JUMUN_NO'];
			$jumun_seq = (int)$item['JUMUN_SEQ'];
			
						
			$insertSql = "INSERT INTO output_detail
							(`co_id`, `io_dt`, `io_no`, `io_seq`, `io_item_cd`, `io_su`, `io_dan`, `io_amt`, `io_rem`,
								`reg_date`, `reg_uid`, `jumun_no`, `jumun_seq`)
						VALUES
							($co_id, $io_dt, $io_no, $IO_SEQ, $IO_ITEM_CD, $IO_SU, $IO_DAN, $IO_AMT, '$IO_REM' 
								, now(), $uid,  $jumun_no, $jumun_seq)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `io_dt` = $io_dt, `io_no` = $io_no, `io_seq` = $IO_SEQ, `io_item_cd` = $IO_ITEM_CD,
							`io_su` = $IO_SU, `io_dan` = $IO_DAN, `io_amt` = $IO_AMT, `io_rem` = '$IO_REM', `reg_date` = now(),
							`reg_uid` = $uid, `jumun_no` = $jumun_no, `jumun_seq` = $jumun_seq;";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	public static function convertJumunMaster($fromWork, $toWork,$co_list, $uid) 
	{
		//테이블 유무 확인
		$db_name=$_GET['id'];
		
		$sql = "SELECT count(*) FROM information_schema.tables WHERE table_schema = '$db_name' AND table_name = 'jumun_master';";
		$fromWork->querySql($sql);
		
		$row = $fromWork->fetchMixedRow();
		if($row[0] == 0){
			echo "--------- Skip <br>";
			return;
		}
		
		
		//프로세스 처리
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT * FROM jumun_master;";
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id = (int)$co_list["$item[CO_CD]"];
			$JUMUN_DT = (int)str_replace('-', '', $item['JUMUN_DT']); 
			$JUMUN_NO = (int)$item['JUMUN_NO'];
			$JUMUN_TR_CD = (int)$item['JUMUN_TR_CD'];
			$JUMUN_TAMT = (int)$item['JUMUN_TAMT'];
			$JUMUN_TTAX = (int)$item['JUMUN_TTAX'];
			$JUMUN_BIGO = $item['JUMUN_BIGO'];
			$JUMUN_POINT_ADD = (int)$item['JUMUN_POINT_ADD'];
			$JUMUN_POINT_MINUS = (int)$item['JUMUN_POINT_MINUS'];
			$JUMUN_MAN = $item['JUMUN_MAN'];
			$JUMUN_ZIP = $item['JUMUN_ZIP'];
			$JUMUN_ADDR = $item['JUMUN_ADDR'];
			
			$insertSql = "INSERT INTO jumun_master
							(`co_id`, `jumun_dt`, `jumun_no`, `jumun_tr_cd`, `jumun_tamt`, `jumun_bigo`, 
								`jumun_man`, `jumun_zip`, `jumun_addr`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $JUMUN_DT, $JUMUN_NO, $JUMUN_TR_CD, $JUMUN_TAMT,'$JUMUN_BIGO', 
								 '$JUMUN_MAN', '$JUMUN_ZIP', '$JUMUN_ADDR', now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `jumun_dt` = $JUMUN_DT, `jumun_no` = $JUMUN_NO, `jumun_tr_cd` = $JUMUN_TR_CD, 
								`jumun_tamt` = $JUMUN_TAMT,`jumun_bigo` = '$JUMUN_BIGO',`jumun_man` = '$JUMUN_MAN'
								,`jumun_zip` = '$JUMUN_ZIP',`jumun_addr` = '$JUMUN_ADDR',`reg_date` = now(),`reg_uid` = $uid;";
			/*				
			$insertSql = "INSERT INTO jumun_master
							(`co_id`, `jumun_dt`, `jumun_no`, `jumun_tr_cd`, `jumun_tamt`, `jumun_ttax`, `jumun_bigo`, `jumun_point_add`,
								`jumun_point_minus`, `jumun_man`, `jumun_zip`, `jumun_addr`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $JUMUN_DT, $JUMUN_NO, $JUMUN_TR_CD, $JUMUN_TAMT, $JUMUN_TTAX, '$JUMUN_BIGO', $JUMUN_POINT_ADD
								, $JUMUN_POINT_MINUS ,  '$JUMUN_MAN', '$JUMUN_ZIP', '$JUMUN_ADDR', now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `jumun_dt` = $JUMUN_DT, `jumun_no` = $JUMUN_NO, `jumun_tr_cd` = $JUMUN_TR_CD, 
								`jumun_tamt` = $JUMUN_TAMT,`jumun_ttax` = $JUMUN_TTAX,`jumun_bigo` = '$JUMUN_BIGO',`jumun_point_add` = $JUMUN_POINT_ADD,
								`jumun_point_minus` = $JUMUN_POINT_MINUS,`jumun_man` = '$JUMUN_MAN',`jumun_zip` = '$JUMUN_ZIP',
								`jumun_addr` = '$JUMUN_ADDR',`reg_date` = now(),`reg_uid` = $uid;";
							
			*/
			  //echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}

	public static function convertJumunDetail($fromWork, $toWork,$co_list, $uid) 
	{
		//테이블 유무 확인
		$db_name=$_GET['id'];
		
		$sql = "SELECT count(*) FROM information_schema.tables WHERE table_schema = '$db_name' AND table_name = 'jumun_detail';";
		$fromWork->querySql($sql);
		
		$row = $fromWork->fetchMixedRow();
		if($row[0] == 0){
			echo "--------- Skip <br>";
			return;
		}
		
		
		$toWork->startTransaction();
		//result 
		$idx=0;
		
		//data query
		$dataSql = "SELECT * FROM jumun_detail;";
		$fromWork->querySql($dataSql);
				
		//data inserts 
		while($item=$fromWork->fetchMixedRow())
		{
			//필수
			$co_id = (int)$co_list["$item[CO_CD]"];
			$JUMUN_DT = (int)str_replace('-', '', $item['JUMUN_DT']); 
			$JUMUN_NO = (int)$item['JUMUN_NO'];
			$JUMUN_SEQ = (int)$item['JUMUN_SEQ'];
			$JUMUN_ITEM_CD = (int)$item['JUMUN_ITEM_CD'];
			$JUMUN_SU = (int)$item['JUMUN_SU'];
			$JUMUN_DAN = (int)$item['JUMUN_DAN'];
			$JUMUN_AMT = (int)$item['JUMUN_AMT'];
			$JUMUN_REM = $item['JUMUN_REM'];
			
			$insertSql = "INSERT INTO jumun_detail
							(`co_id`, `jumun_dt`, `jumun_no`, `jumun_seq`, `jumun_item_cd`, `jumun_su`, `jumun_dan`, `jumun_amt`,
								`jumun_rem`, `reg_date`, `reg_uid`)
						VALUES
							($co_id, $JUMUN_DT, $JUMUN_NO, $JUMUN_SEQ, $JUMUN_ITEM_CD, $JUMUN_SU, $JUMUN_DAN, $JUMUN_AMT
								, '$JUMUN_REM' ,  now(), $uid)
						ON DUPLICATE KEY UPDATE 
							`co_id` = $co_id, `jumun_dt` = $JUMUN_DT, `jumun_no` = $JUMUN_NO, `jumun_seq` = $JUMUN_SEQ,
								`jumun_item_cd` = $JUMUN_ITEM_CD, `jumun_su` = $JUMUN_SU, `jumun_dan` = $JUMUN_DAN, 
								`jumun_amt` = $JUMUN_AMT, `jumun_rem` = '$JUMUN_REM',`reg_date` =  now(), `reg_uid` = $uid;";
							
			//echo $insertSql."<br/>";						
						
			$toWork->updateSql($insertSql);
			$idx++;
		}
		$toWork->commit();
		return $idx;
	}
	
	
	
	public static function convertFixJumunDetail($toWork, $toWork2,$co_list, $uid) 
	{
		$toWork->startTransaction();
		//result 
		$idx=0;
		$idx2=0;
		foreach ($co_list as $key => $value) {
			$co_id=$value;
			
			//data query
			$dataSql = "SELECT * FROM output_detail where co_id=$co_id;";
			$toWork2->querySql($dataSql);
					
			//data inserts 
			while($item=$toWork2->fetchMixedRow())
			{
				//필수
				$io_dt = (int)$item['io_dt']; 
				$io_no = (int)$item['io_no'];
				$io_seq = (int)$item['io_seq'];
				
				$io_cd = $io_dt.'-'.$io_no.'-'.$io_seq;
				
				$jumun_dt = (int)$item['jumun_dt'];
				$jumun_no = (int)$item['jumun_no'];
				$jumun_seq = (int)$item['jumun_seq'];
				
				if($jumun_no==0 or $jumun_seq==0)
					continue;
					
				/*	
				$jumun = "SELECT count(*) FROM jumun_detail where co_id=$co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no AND jumun_seq=$jumun_seq;";
				$toWork -> querySql($jumun);
				
				$idx2++;
				if($row=$toWork->fetchMixedRow())
				{
					if($row[0]>0){
						$idx++;
						echo "$row[0] --> jumun_dt : $jumun_dt // jumun_no : $jumun_no // jumun_seq : $jumun_seq <br>";
					}else{
						echo "$row[0] ---------> jumun_dt : $jumun_dt // jumun_no : $jumun_no // jumun_seq : $jumun_seq <br>";
					}	 	
				}
				else
				{
					echo "---------------------------------> jumun_dt : $jumun_dt // jumun_no : $jumun_no // jumun_seq : $jumun_seq <br>";
				}
				*/
				$jumunUpdate="UPDATE jumun_detail SET `io_cd` = '$io_cd' 
							where co_id=$co_id AND jumun_dt=$jumun_dt AND jumun_no=$jumun_no AND jumun_seq=$jumun_seq;";
				$toWork -> updateSql($jumunUpdate);
			}
		}
		$toWork->commit();
		echo "$idx2 ======> $idx  -->".($idx2-$idx)."<br>";
		return $idx;
	}
}

?>