<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBInputWork.php");

	$iWork = new DBInputWork(true);

	try
	{
		$iWork->createWork($_POST, true);
		$res = $iWork->requestItemCdReport();
		
		$result=array();
		$item_cd=-1;
		
		$su_sum=0;
		$amt_sum=0;
		
		$total_su_sum=0;
		$total_amt_sum=0;
		
		while($item=$iWork->fetchMapRow()){
			$item['io_item_cd'] = sprintf("%05d", $item['io_item_cd']);
			$item['io_tr_cd'] = sprintf("%05d", $item['io_tr_cd']);
			
			if($item_cd!=-1 and $item_cd!=$item['io_item_cd']){
				//일계 넣기 type -1
				$obj=null;
				$obj['io_item_cd']='(상품 계)';
				$obj['io_su']=$su_sum;
				$obj['io_amt']=$amt_sum;
				$obj['type']=-1;
				
				array_push($result,$obj);
				
				$su_sum=0;
				$amt_sum=0;
				
				//날짜 갱신
				$item_cd=$item['io_item_cd'];
			}
			
			if($item_cd==-1) 	$item_cd=$item['io_item_cd'];
			
			$su_sum+=$item['io_su'];
			$amt_sum+=$item['io_amt'];
			$total_su_sum+=$item['io_su'];
			$total_amt_sum+=$item['io_amt'];
			
			array_push($result,$item);
		}
		
		$obj=null;
		$obj['io_item_cd']='(상품 계)';
		$obj['io_su']=$su_sum;
		$obj['io_amt']=$amt_sum;
		$obj['type']=-1;
		
		array_push($result,$obj);
				
		$obj=null;
		$obj['io_item_cd']='(합계)';
		$obj['io_su']=$total_su_sum;
		$obj['io_amt']=$total_amt_sum;
		$obj['type']=-2;
		
		array_push($result,$obj);
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$iWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$iWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>