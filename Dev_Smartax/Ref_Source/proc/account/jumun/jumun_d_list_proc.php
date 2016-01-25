<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJumunWork.php");

	$jWork = new DBJumunWork(true);

	try
	{
		$jWork->createWork($_POST, true);
		$jWork->requestDetailList();
		
		$result=array();
		while($item=$jWork->fetchMapRow()){
			$item['jumun_item_cd'] = sprintf("%05d", $item['jumun_item_cd']);
			array_push($result,$item);
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$jWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$jWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>