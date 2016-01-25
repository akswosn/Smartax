<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBMemorialWork.php");

	$mWork = new DBMemorialWork(true);

	try
	{
		$mWork->createWork($_POST, true);
		$mWork->requestList();
		
		$result = array();
		while($item=$mWork->fetchMapRow()){
			$yyyymmdd = $item['yyyymmdd'];
			$item['yyyymmdd'] = substr($yyyymmdd, 0, 4).'-'.substr($yyyymmdd, 4, 2).'-'.substr($yyyymmdd, 6, 2);
			array_push($result,$item);
		}
		
		echo "{ CODE: '00', DATA : ".json_encode($result)."}";
		
		$mWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$mWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>