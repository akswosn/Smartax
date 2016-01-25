<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJunpyoWork.php");

	$gWork = new DBJunpyoWork(true);

	try
	{
		//$gWork->createWork($_GET, true);
		$gWork->createWork($_POST, true);
		$gWork->requestBockSikTransaction();
		$data = array();
		while($item=$gWork->fetchMapRow())
		{
			if($item['jakmok_code'] == 0 or $item['jakmok_code'] == '' or $item['jakmok_code'] == null) $item['jakmok_code'] = '';
			else $item['jakmok_code'] = sprintf("%02d",$item['jakmok_code']);
			
			if($item["customer_id"] == 0 or $item["customer_id"] == '' or $item["customer_id"] == null) $item["customer_id"] = '';
			else $item["customer_id"] = sprintf("%05d",$item["customer_id"]);
			
			$month = (int)substr($item['jp_yyyymmdd'], 4, 2);
			$day = (int)substr($item['jp_yyyymmdd'], 6, 2);
			
			$item['jp_date_m'] = $month;
			$item['jp_date_d'] = $month;
			
			array_push($data, $item);
			
			if($item['jp_view_gubun'] == 1 || $item['jp_view_gubun'] == 2)
			{
				$item['jp_id'] = '-1';
				$item['gycode'] = 101;
				if($item['debit'] != 0)
				{
					$item['credit'] = $item['debit'];
					$item['debit'] = 0;
				}
				else 
				{
					$item['debit'] = $item['credit'];
					$item['credit'] = 0;
				}
				
				array_push($data, $item);
			}
			
		}
		
		$result['CODE']='00';
		$result['DATA']=$data;
		
		echo json_encode($result);
		
		$gWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$gWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>