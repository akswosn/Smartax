<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBMemorialWork.php");

	$mWork = new DBMemorialWork(true);

	try
	{
		$mWork->createWork($_POST, true);
		$res = $mWork->requestRegister();
		$mWork->destoryWork();
		echo "{CODE: '00', DATA: '$res'}";
	}
  	catch (Exception $e) 
	{
		$mWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>