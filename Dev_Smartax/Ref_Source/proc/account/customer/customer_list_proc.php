<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBCustomerWork.php");

	$cWork = new DBCustomerWork(true);

	try
	{
		$cWork->createWork(-1, true);
		$res = $cWork->requestList();
		
		$item = $cWork->fetchMixedRow();
		
		echo '{ CODE: "00", ';
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				$cuscode = $item["customer_id"];
				$cuscode = sprintf("%05d",$cuscode);
				echo "{ customer_id : '$cuscode' ,  co_id : '$item[co_id]' , tr_nm : '$item[tr_nm]', tr_daepyo: '$item[tr_daepyo]',  tr_saup_no: '$item[tr_saup_no]', 
						tr_jumin_no: '$item[tr_jumin_no]',  tr_up: '$item[tr_up]',  tr_jong: '$item[tr_jong]',  tr_zip: '$item[tr_zip]',
						tr_addr: '$item[tr_addr]', tr_tel: '$item[tr_tel]',  tr_phone: '$item[tr_phone]',  tr_fax: '$item[tr_fax]',  tr_homepage: '$item[tr_homepage]',
						tr_email: '$item[tr_email]', tr_manager: '$item[tr_manager]',  tr_sdate: '$item[tr_sdate]',  tr_edate: '$item[tr_edate]', cid_tel1: '$item[cid_tel1]',
						cid_tel2: '$item[cid_tel2]', cid_tel3: '$item[cid_tel3]',  tr_bigo: '$item[tr_bigo]', tr_chuchun: $item[tr_chuchun] }";
				 //echo "{ customer_id : '$cuscode' ,  tr_nm : '$item[tr_nm]', tr_daepyo: '$item[tr_daepyo]',  tr_addr: '$item[tr_addr]', tr_tel: '$item[tr_tel]',  tr_phone: '$item[tr_phone]' }";
				if($item=$cWork->fetchMixedRow()) echo ',';
				else break;
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		$cWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$cWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>