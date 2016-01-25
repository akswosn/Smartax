<?php
	require_once("../class/Utils.php");
	require_once("../class/DBWork.php");
	require_once("../class/DBMemberWork.php");

	$memWork = new DBMemberWork();

	try
	{
		$memWork->createWork($_POST, false);
		$memWork->requestSetConfig();
		$memWork->destoryWork();
		
		echo '{CODE: "00"}';
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>