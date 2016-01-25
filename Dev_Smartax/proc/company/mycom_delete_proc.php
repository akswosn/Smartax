<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);

	try
	{
		$memWork->createWork($_POST, true);
		$res = $memWork->requestRegisterCompany();
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