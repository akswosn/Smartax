<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestCustomerList();
		
		$data = array();
		while($item=$acctWork->fetchMixedRow())
		{
			$searchData['customer_id'] = $item['customer_id']; 
			$searchData['customer_id'] = sprintf("%05d",$searchData['customer_id']);
			array_push($data, $searchData);
		}
		
		$result['CODE']='00';
		$result['DATA']=$data;
		
		echo json_encode($result);
		
		$acctWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$acctWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>