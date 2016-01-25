<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$tWork->createWork($_POST, true);
		$res = $tWork->deleteTaxInfomation();
		$tWork->destoryWork();
		
		$ret = array();
		if($res > 0)
		{
			echo "{ CODE: '00'}";
		}
		else
		{
			echo "{ CODE: '99'}";
		}
	}
  	catch (Exception $e) 
	{
		$tWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>