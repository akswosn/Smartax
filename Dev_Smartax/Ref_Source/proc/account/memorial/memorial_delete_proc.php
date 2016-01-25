<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBMemorialWork.php");

	$mWork = new DBMemorialWork(true);
	
	try
	{
		$mWork->createWork($_POST, true);
		$res = $mWork->requestDelete();
		$mWork->destoryWork();
		
		if($res > 0) echo '{CODE: "00"}';
		else echo '{CODE: "99"}';
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