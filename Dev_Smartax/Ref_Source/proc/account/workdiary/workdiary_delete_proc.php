<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBWorkDairyWork.php");

	$wWork = new DBWorkDairyWork(true);

	try
	{
		$wWork->createWork($_POST, true);
		$res = $wWork->requestDelete();
		$wWork->destoryWork();
		
		if($res > 0) echo '{CODE: "00"}';
		else echo '{CODE: "99"}';
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