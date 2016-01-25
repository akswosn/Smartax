<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		//파라미터
		//$jp_yyyymmdd = (int)$this->param['jp_yyyymmdd'];
		//$jp_no = (int)$this->param['jp_no'];
		//$gycode = (int)$this->param['gycode'];
		
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestCreditSPDetail();
		
		$result=array();
		while($item=$acctWork->fetchMapRow()){
			$item['io_item_cd'] = sprintf("%05d", $item['io_item_cd']);
			array_push($result,$item);
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
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