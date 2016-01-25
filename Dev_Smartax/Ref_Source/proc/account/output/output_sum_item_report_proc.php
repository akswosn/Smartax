<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBOutputWork.php");

	$oWork = new DBOutputWork(true);
	try
	{
		$oWork->createWork($_POST, true);
		$oWork->requestItemSumReport();
		
		$result=array();
		$row=null;
		
		
		$item_cd=-1;
		
		$su_sum=0;
		$amt_sum=0;
		
		while($item=$oWork->fetchMapRow()){
			$item['io_item_cd'] = sprintf("%05d", $item['io_item_cd']);
			
			if($item_cd!=-1 and $item_cd!=$item['io_item_cd']){
				$row['io_item_cd']=$item_cd;
				$row['su_sum']=$su_sum;
				$row['amt_sum']=$amt_sum;
				
				array_push($result,$row);
				
				$su_sum=0;
				$amt_sum=0;
				$row=null;
				
				$item_cd=$item['io_item_cd'];
			}
			
			if($item_cd==-1) $item_cd=$item['io_item_cd'];
			
			$su_sum+=$item['io_su'];
			$amt_sum+=$item['io_amt'];
			
			if($item['io_su']!='' or $item['io_su']!=0) {
				$key = substr($item['io_dt'], 4,2);
				$row[$key]=$item['io_su'];
			}
		}
		
		$row['io_item_cd']=$item_cd;
		$row['su_sum']=$su_sum;
		$row['amt_sum']=$amt_sum;
		
		array_push($result,$row);
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$oWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$oWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>