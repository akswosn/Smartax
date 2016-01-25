<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJumunWork.php");

	$jWork = new DBJumunWork(true);

	try
	{
		$jWork->createWork($_POST, true);
		$res = $jWork->requestNoOutputReport();
		
		$total_su_sum=0;
		$total_amt_sum=0;
		
		$result=array();
		while($item=$jWork->fetchMapRow()){
			$item['jumun_item_cd'] = sprintf("%05d", $item['jumun_item_cd']);
			$item['jumun_tr_cd'] = sprintf("%05d", $item['jumun_tr_cd']);
			$total_su_sum+=$item['jumun_su'];
			$total_amt_sum+=$item['jumun_amt'];
			
			array_push($result,$item);
		}
		
		$obj=null;
		$obj['jumun_dt']='(합계)';
		$obj['jumun_su']=$total_su_sum;
		$obj['jumun_amt']=$total_amt_sum;
		$obj['type']=-2;
		
		array_push($result,$obj);
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$jWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$jWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>