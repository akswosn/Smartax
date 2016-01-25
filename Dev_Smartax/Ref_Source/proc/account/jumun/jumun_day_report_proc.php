<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJumunWork.php");

	$jWork = new DBJumunWork(true);

	try
	{
		$jWork->createWork($_POST, true);
		$res = $jWork->requestDayReport();
		
		$result=array();
		$yyyymmdd=-1;
		
		$su_sum=0;
		$amt_sum=0;
		
		$total_su_sum=0;
		$total_amt_sum=0;
		
		while($item=$jWork->fetchMapRow()){
			
			if($yyyymmdd!=-1 and $yyyymmdd!=$item['jumun_dt']){
				//일계 넣기 type -1
				$obj=null;
				$obj['jumun_dt']='(일계)';
				$obj['jumun_su']=$su_sum;
				$obj['jumun_amt']=$amt_sum;
				$obj['type']=-1;
				
				array_push($result,$obj);
				
				$su_sum=0;
				$amt_sum=0;
				
				//날짜 갱신
				$yyyymmdd=$item['jumun_dt'];
			}
			
			if($yyyymmdd==-1) 	$yyyymmdd=$item['jumun_dt'];
			
			$su_sum+=$item['jumun_su'];
			$amt_sum+=$item['jumun_amt'];
			$total_su_sum+=$item['jumun_su'];
			$total_amt_sum+=$item['jumun_amt'];
			
			$item['jumun_item_cd'] = sprintf("%05d", $item['jumun_item_cd']);
			$item['jumun_tr_cd'] = sprintf("%05d", $item['jumun_tr_cd']);
			array_push($result,$item);
		}
		
		$obj=null;
		$obj['jumun_dt']='(일계)';
		$obj['jumun_su']=$su_sum;
		$obj['jumun_amt']=$amt_sum;
		$obj['type']=-1;
		
		array_push($result,$obj);
				
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