<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/AddTaxWork.php");

	$aWork = new AddTaxWork(true);
	
	try
	{
		//$aWork->createWork(-1, true);
		$aWork->createWork($_POST, true);
		$res = $aWork->requestAdvRegData();
		$aWork->destoryWork();
		
		if($res) echo "{ CODE: '00' , DATA : ".json_encode($res)."}";
		else echo "{ CODE: '99' }";
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
