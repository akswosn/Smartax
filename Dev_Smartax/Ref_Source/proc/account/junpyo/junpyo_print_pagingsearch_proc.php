<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJunpyoWork.php");

	$gWork = new DBJunpyoWork(true);

	try
	{
		$gWork->createWork($_POST, true);
		$res = $gWork->requestPrintPagingSearch();
		
		$item=$gWork->fetchMixedRow();
		
		echo "{ CODE: '00', TOTAL : $res , ";
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				$jp_group = '';
				if($item['jp_view_gubun'] == 3 || $item['jp_view_gubun'] == 4) $jp_group = $item['jp_yyyymmdd'].$item['jp_no'];
				
				$jcode = $item['jakmok_code'];
				if($jcode == 0 or $jcode == '' or $jcode == null) $jcode = '';
				else $jcode = sprintf("%02d",$jcode);
				
				$cuscode = $item["customer_id"];
				if($cuscode == 0 or $cuscode == '' or $cuscode == null) $cuscode = '';
				else $cuscode = sprintf("%05d",$cuscode);
				
				$month = (int)substr($item['jp_yyyymmdd'], 4, 2);
				$day = (int)substr($item['jp_yyyymmdd'], 6, 2);
				 
				$gubun = (int)$item['jp_view_gubun'];
				if($gubun > 2)
				{
					$jp_group = $item[jp_yyyymmdd]+'.'+$item[jp_no];
				}
				
				echo "{ jp_id : '$item[jp_id]' ,  jp_yyyymmdd : '$item[jp_yyyymmdd]' ,  jp_no : '$item[jp_no]', jp_group: '$jp_group' , jp_date_m : '$month', jp_date_d: '$day',  
						gycode : '$item[gycode]' ,  customer_id : '$cuscode' ,  jakmok_code : '$jcode', debit : $item[debit] ,  credit : $item[credit] ,
						jp_rem : '$item[jp_rem]', jp_view_gubun : '$item[jp_view_gubun]' ,  jp_match_id : '$item[jp_match_id]', valid:'11' }";
				if($item=$gWork->fetchMixedRow()) echo ',';
				else break;
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		
		$gWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$gWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>