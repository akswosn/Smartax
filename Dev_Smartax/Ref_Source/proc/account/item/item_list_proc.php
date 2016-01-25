<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBItemWork.php");

	$iWork = new DBItemWork(true);

	try
	{
		$iWork->createWork(-1, true);
		$iWork->requestList();
		
		$result = array();
		while($item=$iWork->fetchMapRow()){
			$item['item_cd'] = sprintf("%05d",$item['item_cd']);
			if($item['item_in_danga'] == 0) $item['item_in_danga'] = '';
			if($item['item_out_danga'] == 0) $item['item_out_danga'] = '';
			if($item['itemgrp_cd'] == 0) $item['itemgrp_cd'] = '';
			else $item['itemgrp_cd'] = sprintf("%03d",$item['itemgrp_cd']);	
			array_push($result,$item);
		}
		
		echo "{ CODE: '00', DATA : ".json_encode($result)."}";
		
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