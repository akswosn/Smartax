<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBCustomerWork.php");

	$cWork = new DBCustomerWork(true);

	try
	{
		$cWork->createWork(-1, true);
		$res = $cWork->requestSelect();
		
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

		$cWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$cWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>