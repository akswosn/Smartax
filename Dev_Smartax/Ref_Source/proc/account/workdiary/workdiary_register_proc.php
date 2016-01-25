<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBWorkDairyWork.php");

	$wWork = new DBWorkDairyWork(true);

	try
	{
		$wWork->createWork($_POST, true);
		$res = $wWork->requestRegister();
		$wWork->destoryWork();
		
		echo "{CODE: '00', DATA: '$res'}";
		
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