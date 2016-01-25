<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBMemberWork.php");
	
	$mWork = new DBMemberWork(true);

	try
	{
		$mWork->createWork($_POST, false);
		$ret = array();
		$res = $mWork->selectUserAsUserId();
		$mWork->destoryWork();
		
		if($res == 0){
			$ret['CODE']='00';
			$ret['DATA'] =$res;
		}
		else {
			$ret['CODE']='99';
			$ret['DATA'] =$res;
		}
		
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