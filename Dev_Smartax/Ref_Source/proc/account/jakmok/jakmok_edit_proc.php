<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJakmokWork.php");

	$jWork = new DBJakmokWork(true);

	try
	{
		$jWork->createWork($_POST, true);
		$res = $jWork->requestModify();
		$jWork->destoryWork();
		
		echo '{CODE: "00"}';
	}
  	catch (Exception $e) 
	{
		$jWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>