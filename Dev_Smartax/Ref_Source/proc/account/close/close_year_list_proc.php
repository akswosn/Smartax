<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBCloseWork.php");

	$gWork = new DBCloseWork(true);

	//http://localhost/FarmSaver/proc/account/close/close_year_list_proc.php
	
	try
	{
		$gWork->createWork(-1, true);
		$res = $gWork->requestList();
		
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


