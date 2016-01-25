<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$tWork->createWork($_POST, true);
		$res = $tWork->requestTaxList();
		$tWork->destoryWork();
		
		$ret = array();
		if($res==null)
		{
			$ret['CODE']='00';
		}
		else
		{
			$ret['CODE']='00';
		}
		
		$ret['DATA'] =$res;
		
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