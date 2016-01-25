<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestCustomerBalance();

		$data = array();
		
		$sum_gicho=0;
		$sum_credit=0;
		$sum_debit=0;
		$sum_rest=0;
		
		$gycode=$_POST['gycode'];
		
		while($item=$acctWork->fetchMapRow())
			{
				$gicho=$item['gicho'];
				$credit=$item['value_credit'];
				$debit=$item['value_debit'];
				
				if($gicho==0 and $credit==0 and $debit==0) continue;
				
				if((int)($gycode/100)==2 or ((int)($gycode/100)==3))
					$rest = $gicho+$credit-$debit;
				else 
					$rest = $gicho+$debit-$credit;
				
				$sum_gicho+=$gicho;
				$sum_credit+=$credit;
				$sum_debit+=$debit;
				$sum_rest+=$rest;
				
				$item['rest']=$rest;
				
				$item['customer_id']= sprintf("%05d",$item['customer_id']);
				array_push($data,$item);
			}
		$last_item['customer_id']='합계';
		$last_item['type']= 1;
		$last_item['gicho']=$sum_gicho;
		$last_item['value_credit']=$sum_credit;
		$last_item['value_debit']=$sum_debit;
		$last_item['rest']=$sum_rest;
		array_push($data,$last_item);
		
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