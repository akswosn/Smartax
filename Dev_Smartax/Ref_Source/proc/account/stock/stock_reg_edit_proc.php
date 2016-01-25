<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBStockWork.php");

	$sWork = new DBStockWork(true);

	try
	{
		$sWork->createWork($_POST, true);
		$res = $sWork->requestRegModifyArray();
		$sWork->destoryWork();
		
		if($res>0)
			echo "{CODE: '00' , DATA :[".json_encode($res)."]}";
		else
			echo '{CODE: "99"}';
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