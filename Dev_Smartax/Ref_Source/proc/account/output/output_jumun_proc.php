<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBOutputWork.php");

	$oWork = new DBOutputWork(true);

	try
	{
		$oWork->createWork($_POST, true);
		$oWork->requestJumunList();
		
		$result=array();
		while($item=$oWork->fetchMapRow()){
			$item['jumun_item_cd'] = sprintf("%05d", $item['jumun_item_cd']);
			array_push($result,$item);
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$oWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$oWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>