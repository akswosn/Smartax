<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$tWork->createWork(-1, true);
		$ret = array();
		$res = $tWork->selectSalesCompany();
		$ret['COMP'] = $res;
		$res = $tWork->selectSalesData();
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