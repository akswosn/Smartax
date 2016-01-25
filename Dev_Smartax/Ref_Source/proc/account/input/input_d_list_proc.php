<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBInputWork.php");

	$iWork = new DBInputWork(true);

	try
	{
		$iWork->createWork($_POST, true);
		$iWork->requestDetailList();
		
		$result=array();
		while($item=$iWork->fetchMapRow()){
			$item['io_item_cd'] = sprintf("%05d", $item['io_item_cd']);
			array_push($result,$item);
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$iWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$iWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>