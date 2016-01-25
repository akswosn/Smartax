<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork();
	$result = array();
	$code = 'n';
	$data = null;

	try
	{
		//$_POST : [value], [type]
		$memWork->createWork($_POST, false);
		$res = $memWork->requestExistCheck();
		$memWork->destoryWork();
		
		$code = 'y';
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		$code = 'n';
		$res = $e->getMessage();
		Util::serverLog($e);
	}
	
	echo "<result><code>$code</code><data>$res</data></result>";
?>