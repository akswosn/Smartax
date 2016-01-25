<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/AddTaxWork.php");

	$aWork = new AddTaxWork(true);
	
	try
	{
		//$aWork->createWork($_GET, true);
		$aWork->createWork($_POST, true);
		$res = $aWork->requestClaim();
		
		$result=array();
		
		array_push($result,$res);
		
		while($item=$aWork->fetchMapRow())
		{
			//고정자산매입 - 51
			if($item['atax_type']== 51)
			{
				$item['atax_supply_price'] = $item['atax_supply_price'] - $res['atax_supply_price'];
				$item['atax_tax'] = $item['atax_tax'] - $res['atax_tax'];
			}
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