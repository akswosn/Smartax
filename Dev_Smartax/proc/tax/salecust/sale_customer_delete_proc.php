<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBCustomerWork.php");
	$cWork = new DBCustomerWork(true);
	try
	{
		$cWork->createWork($_POST, true);
		$res = $cWork->deleteSaleCust();
		$cWork->destoryWork();
		
		echo '{CODE: "00"}';
	}
  	catch (Exception $e) 
	{
		$cWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , msg : '$err', success:false}";
		exit;
	}
?>