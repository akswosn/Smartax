<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBStockWork.php");

	$sWork = new DBStockWork(true);

	try
	{
		$sWork->createWork($_POST, true);
		$res = $sWork->requestDelete();
		$sWork->destoryWork();
		
		echo "{CODE: '00'}";
	}
  	catch (Exception $e) 
	{
		$sWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>