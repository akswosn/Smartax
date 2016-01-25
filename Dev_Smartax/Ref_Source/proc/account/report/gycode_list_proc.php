<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestGyCodeList();
		
		$data = array();
		while($item=$acctWork->fetchMixedRow())
		{
			$codeData['gycode'] = $item['gycode'];
			array_push($data, $codeData);
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