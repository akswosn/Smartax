<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBOutputWork.php");

	$oWork = new DBOutputWork(true);
	try
	{
		$oWork->createWork($_POST, true);
		$res = $oWork->requestMonthSumReport();
		
		$result=array();
		$yyyymm=-1;
		
		$su_sum=0;
		$amt_sum=0;
		
		$total_su_sum=0;
		$total_amt_sum=0;
		
		while($item=$oWork->fetchMapRow()){
			
			if($yyyymm!=-1 and $yyyymm!=$item['io_dt']){
				//일계 넣기 type -1
				$obj=null;
				$obj['io_dt']='(월계)';
				$obj['io_su']=$su_sum;
				$obj['io_amt']=$amt_sum;
				$obj['type']=-1;
				
				array_push($result,$obj);
				
				$su_sum=0;
				$amt_sum=0;
				
				//날짜 갱신
				$yyyymm=$item['io_dt'];
			}
			
			if($yyyymm==-1) $yyyymm=$item['io_dt'];
			
			$su_sum+=$item['io_su'];
			$amt_sum+=$item['io_amt'];
			$total_su_sum+=$item['io_su'];
			$total_amt_sum+=$item['io_amt'];
			
			$item['io_item_cd'] = sprintf("%05d", $item['io_item_cd']);
			array_push($result,$item);
		}
		
		$obj=null;
		$obj['io_dt']='(월계)';
		$obj['io_su']=$su_sum;
		$obj['io_amt']=$amt_sum;
		$obj['type']=-1;
		
		array_push($result,$obj);
				
		$obj=null;
		$obj['io_dt']='(합계)';
		$obj['io_su']=$total_su_sum;
		$obj['io_amt']=$total_amt_sum;
		$obj['type']=-2;
		
		array_push($result,$obj);
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$oWork->destoryWork();
	}
 /*
  	try
	{
		$oWork->createWork($_GET, true);
		$oWork->requestDaySumReport();
		
		$result=array();
		while($item=$oWork->fetchMapRow()){
			$item['io_tr_cd'] = sprintf("%05d", $item['io_tr_cd']);
			array_push($result,$item);
		}
		
		echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$oWork->destoryWork();
	}
 */
  	catch (Exception $e) 
	{
		$oWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>