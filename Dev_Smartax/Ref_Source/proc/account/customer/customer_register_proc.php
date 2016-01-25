<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBCustomerWork.php");

	$cWork = new DBCustomerWork(true);

	try
	{
		$cWork->createWork($_POST, true);
		$res = $cWork->requestRegister();
		$cWork->destoryWork();
		
		echo '{CODE: "00"}';
	}
  	catch (Exception $e) 
	{
		$cWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>