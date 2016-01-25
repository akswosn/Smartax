<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBItemGrpWork.php");

	$iWork = new DBItemGrpWork(true);

	try
	{
		$iWork->createWork(-1, true);
		$res = $iWork->requestList();
		
		$result = array();
		while($item=$iWork->fetchMapRow()){
			$item['itemgrp_cd'] = sprintf("%03d",$item['itemgrp_cd']);
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