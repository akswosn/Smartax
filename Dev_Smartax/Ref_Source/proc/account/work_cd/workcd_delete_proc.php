<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBWorkCdWork.php");

	$wWork = new DBWorkCdWork(true);

	try
	{
		$wWork->createWork($_POST, true);
		$res = $wWork->requestDelete();
		$wWork->destoryWork();
		
		echo "{CODE: '$res'}";
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