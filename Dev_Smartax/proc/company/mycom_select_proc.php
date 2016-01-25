<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBCompanyWork.php");

	$comWork = new DBCompanyWork(true);

	try
	{
		$comWork->createWork(-1, true);
		$res = $comWork->requestCurComInfo();
		
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
		
		$comWork->destoryWork();
		
	}
  	catch (Exception $e) 
	{
		$comWork->destoryWork();
		Util::serverLog($e);
		echo '{ "CODE": "99" }';
		exit;
	}
?>