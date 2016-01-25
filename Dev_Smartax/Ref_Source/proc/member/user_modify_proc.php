<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);

	try
	{
		$memWork->createWork($_POST, false);
		$res = $memWork->requestModify();
		$memWork->destoryWork();
		
		echo $res;
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		Util::serverLog($e);
		echo 0;
		exit;
	}
?>