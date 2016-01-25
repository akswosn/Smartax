<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBStockWork.php");

	$sWork = new DBStockWork(true);

	try
	{
		$sWork->createWork($_POST, true);
		$res = $sWork->requestList();
		
		$result = array();
		while($item=$sWork->fetchMapRow()){
			$item['io_item_cd'] = sprintf("%05d", $item['io_item_cd']);	
			array_push($result,$item);
		}
		
		echo "{ CODE: '00', DATA : ".json_encode($result)."}";
		
		$sWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$sWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>