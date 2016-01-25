<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);

	try
	{
		$memWork->createWork($_POST, false);
		$res=$memWork->requestComInfo();
		
		if($res==null)
		{
			$res->CODE='99';
		}
		else
		{
			$res->CODE='00';
		}
		echo json_encode($res);
		
		$memWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		Util::serverLog($e);
		echo '{ "CODE": "99" }';
		exit;
	}
?>