<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBInquireBoardWork.php");
	
	$mWork = new DBInquireBoardWork(true);
	try
	{
		$mWork->createWork($_POST, true);
		$ret = array();
		$res = $mWork->updateInquireBoard();
		$mWork->destoryWork();
		
		$ret['CODE']='00';
		$ret['DATA'] =$res;
		
		echo json_encode($ret);
	}
  	catch (Exception $e) 
	{
		$mWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>