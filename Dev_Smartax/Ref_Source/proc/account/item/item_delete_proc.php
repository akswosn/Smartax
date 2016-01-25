<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBItemWork.php");

	$iWork = new DBItemWork(true);

	try
	{
		$iWork->createWork($_POST, true);
		$res = $iWork->requestDelete();
		$iWork->destoryWork();
		
		echo "{CODE: '00', DATA : '$res'}";
	}
  	catch (Exception $e) 
	{
		$iWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>