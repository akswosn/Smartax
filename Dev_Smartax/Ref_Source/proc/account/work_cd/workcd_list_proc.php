<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBWorkCdWork.php");

	$wWork = new DBWorkCdWork(true);

	try
	{
		$wWork->createWork(-1, true);
		$res = $wWork->requestList();
		
		$item = $wWork->fetchMixedRow();
		
		echo '{ CODE: "00", ';
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				$wcode = $item['work_cd'];
				$wcode = sprintf("%03d",$wcode);
				echo "{ work_cd : '$wcode' ,  work_nm : '$item[work_nm]' , use_yn : $item[use_yn] }";
				if($item=$wWork->fetchMixedRow()) echo ',';
				else break;
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		
		$wWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$wWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>