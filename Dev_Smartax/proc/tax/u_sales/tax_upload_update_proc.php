<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$tWork->createWork($_POST, true);
		$ret = array();
		$res = $tWork->insertSalesUploadForBigo();
		$tWork->destoryWork();
		
		$ret['DATA'] =$res;
		$ret['CODE']='00';
		
		echo json_encode($ret);
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