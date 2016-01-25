<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBCompanyWork.php");

	$comWork = new DBCompanyWork(true);

	try
	{
		$comWork->createWork($_POST, false);
		$res = $comWork->requestComModify();
		$comWork->destoryWork();
		
		if($res == 0){
			echo '{ "CODE": "99" }';
		}
		else {
			echo '{ "CODE": "00" }';
		}
	}
  	catch (Exception $e) 
	{
		$comWork->destoryWork();
		Util::serverLog($e);
		echo $e->getMessage();
		exit;
	}
?>