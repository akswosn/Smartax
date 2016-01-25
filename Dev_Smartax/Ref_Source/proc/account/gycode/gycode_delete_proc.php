<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBGycodeWork.php");

	$gWork = new DBGycodeWork(true);

	try
	{
		$gWork->createWork($_POST, true);
		$res = $gWork->requestDelete();
		$gWork->destoryWork();
		
		echo "{CODE: '$res'}";
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