<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/FileUtil.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$tWork->createWork($_POST, true);
		$res = $tWork->updateTaxDataFlag();
		$tWork->destoryWork();
		
		echo  "{CODE:00}";
	}
  	catch (Exception $e) 
	{
		$tWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , msg : '$err'}";
		exit;
	}
?>