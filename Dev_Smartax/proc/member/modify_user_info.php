<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);
	try
	{
		//$_POST : [value], [type]
		$memWork->createWork($_POST, true);
		//$memWork->createWork($_GET, false);
		//$code = $memWork->requestNumber();
		$code = $memWork->updateUserInfo();
		$memWork->destoryWork();
		
		
		$_SESSION['isUpdate'] = 'y';
		header("Location:../../route.php?contents=011");
		exit;
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		$res = $e->getMessage();
		$_SESSION['isUpdate'] = 'n';
		header("Location:../../route.php?contents=011");
		exit;
	}
	
?>