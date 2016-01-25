<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);

	try
	{
		$memWork->createWork($_GET, false);
		$res=$memWork->requestComInfo();
		$result = array();
		
		if($res==null)
		{
			$result['CODE']='99';
		}
		else
		{
			$result['DATA']=$res;
			$result['CODE']='00';
		}
		echo json_encode($result);
		
		$memWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		Util::serverLog($e);
		echo '{ "CODE": "99" }';
		exit;
	}
?>