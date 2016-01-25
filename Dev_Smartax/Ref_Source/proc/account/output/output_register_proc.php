<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBOutputWork.php");

	$oWork = new DBOutputWork(true);

	try
	{
		$oWork->createWork($_POST, true);
		$res = $oWork->requestRegArray();
		$oWork->destoryWork();
		
		echo "{ CODE: '00', DATA:".json_encode($res)." }";
	}
  	catch (Exception $e) 
	{
		$oWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>