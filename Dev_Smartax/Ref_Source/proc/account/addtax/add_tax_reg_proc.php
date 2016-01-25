<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/AddTaxWork.php");

	$aWork = new AddTaxWork(true);
	
	try
	{
		//$aWork->createWork(-1, true);
		$aWork->createWork($_POST, true);
		$res = $aWork->requestRegData();
		$aWork->destoryWork();
		
		$result = array();
		
		for($idx=0;$idx<count($res);$idx++){
			for($i=0;$i<count($res[$idx]);$i++){
				array_push($result, $res[$idx][$i]);				
			}
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>
