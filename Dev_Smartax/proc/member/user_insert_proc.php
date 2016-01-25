<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork();

	try
	{
		$memWork->createWork($_POST, false);
		//$res = $memWork->requestRegister();
		$res = $memWork->RegisterMemberCompany();
		$memWork->destoryWork();
		
		if ($res)
		{
			header("Location:../../route.php");
		}
		else
		{
			header("Location:../../route.php");
		}
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>