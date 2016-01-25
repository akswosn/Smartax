<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBGichoWork.php");

	$gWork = new DBGichoWork(true);

	try
	{
		$gWork->createWork($_POST, true);
		$res = $gWork->requestDetailInsertArray();
		$gWork->destoryWork();
		
		echo "{ CODE: '00', DATA:".json_encode($res)." }";
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