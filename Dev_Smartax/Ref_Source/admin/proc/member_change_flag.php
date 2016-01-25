<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../class/DBAdminWork.php");
	
	$aWork = new DBAdminWork(true);
	
	try
	{
		$aWork->AdminCreateWork($_POST, true);
		$res = $aWork->requestUpdateValid();
	
		echo '{ CODE: "00", ';
		echo 'DATA: '.json_encode($res).' }';
	
		$aWork->destoryWork();
	}
	catch (Exception $e)
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>