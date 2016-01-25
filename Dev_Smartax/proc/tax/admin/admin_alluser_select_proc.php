<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBAdminWork.php");

	$aWork = new DBAdminWork(true);

	try
	{
		$aWork->createWork(-1, true);
		$ret = array();
		$res = $aWork->selectAllUserList();
		$aWork->destoryWork();
		
		$ret['DATA'] =$res;
		$ret['CODE']='00';
		
		echo json_encode($ret);
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>