<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/AddTaxWork.php");

	$aWork = new AddTaxWork(true);
	
	try
	{
		//$aWork->createWork($_GET, true);
		$aWork->createWork($_POST, true);
		$res = $aWork->requestVerifySumList();
		
		$result=array();
		$sum_ret = array();
		$sum_ret['flag'] = "sum";
		
		while($item=$aWork->fetchMapRow())
		{
			array_push($result,$item);
			$sum_ret['cnt'] = $sum_ret['cnt'] + $item['cnt'];
			$sum_ret['price'] = $sum_ret['price']+$item['price'];
			$sum_ret['tax'] = $sum_ret['tax']+$item['tax'];
		}
		array_push($result,$sum_ret);
		
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