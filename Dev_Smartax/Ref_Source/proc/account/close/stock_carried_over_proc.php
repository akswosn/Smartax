<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBCloseWork.php");

	$gWork = new DBCloseWork(true);
	
	//http://localhost/FarmSaver/proc/account/close/stock_carried_over_proc.php?close_year=2014
	
	try
	{
		//$gWork->createWork($_GET, true);
		$gWork->createWork($_POST, true);
		$res = $gWork->stockCarriedOver();
		echo "{ CODE: '00' , DATA : ".json_encode($res)."}";
		$gWork->destoryWork();
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