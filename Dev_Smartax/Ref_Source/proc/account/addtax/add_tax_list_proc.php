<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/AddTaxWork.php");

	$aWork = new AddTaxWork(true);

	try
	{
		//$aWork->createWork($_GET, true);
		$aWork->createWork($_POST, true);
		$aWork->requestList();
		
		$result=array();
		while($item=$aWork->fetchMapRow()){
			$item['atax_date_m'] = (int)substr($item['atax_yyyymmdd'], 4, 2);
			$item['atax_date_d'] = (int)substr($item['atax_yyyymmdd'], 6, 2);
			$item['isModify'] = false;
			$item['jp_valid'] = false;
			array_push($result,$item);
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$aWork->destoryWork();
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