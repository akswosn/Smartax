<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBStockWork.php");

	$sWork = new DBStockWork(true);

	try
	{
		$sWork->createWork($_POST, true);
		$res = $sWork->requestStockIoReport();
		
		$result = array();
		
		$rest = 0 ;
		$in_su_month_sum=0;
		$in_su_sum=0;
		$in_amt_month_sum=0;
		$in_amt_sum=0;
		
		
		$out_su_month_sum=0;
		$out_su_sum=0;
		$out_amt_month_sum=0;
		$out_amt_sum=0;
		
		$month=-1;
		$yyyy=-1;
		while($item=$sWork->fetchMapRow()){
			
			$tmp_month=substr($item['io_dt'],4,2);
			if($yyyy==-1) $yyyy=substr($item['io_dt'],0,4);
			
			//echo "tmp_month -> $tmp_month<br>";
			//echo "month -> $month<br>";
			//echo "item['io_dt'] -> $item[io_dt]<br><br>";
			
			
			if($tmp_month>$month && $month!=-1 && $item['io_dt']!=-1){
				
				$in_su_sum+=$in_su_month_sum;
				$in_amt_sum+=$in_amt_month_sum;
				$out_su_sum+=$out_su_month_sum;
				$out_amt_sum+=$out_amt_month_sum;
				//기본 변수
				
				$month_str=sprintf("%02d", $month);
				
				$month=$tmp_month;
				//월계
				$obj=null;
				$obj['io_dt']=-2;	
				$obj['in_su']=$in_su_month_sum;
				$obj['in_dan']='';
				$obj['in_amt']=$in_amt_month_sum;
				$obj['out_su']=$out_su_month_sum;
				$obj['out_dan']='';
				$obj['out_amt']=$out_amt_month_sum;
				
				$obj['rest']=$in_su_month_sum - $out_su_month_sum;
				array_push($result,$obj);

				//누계
				$obj['io_dt']=-3;
				$obj['in_su']=$in_su_sum;
				$obj['in_dan']='';
				$obj['in_amt']=$in_amt_sum;
				$obj['out_su']=$out_su_sum;
				$obj['out_dan']='';
				$obj['out_amt']=$out_amt_sum;
				$obj['rest']=$in_su_sum - $out_su_sum;
				array_push($result,$obj);
				
				//월계 초기화
				$in_su_month_sum = 0;
				$in_amt_month_sum = 0;
				$out_su_month_sum = 0;
				$out_amt_month_sum = 0;
				
			}
			
			if($month==-1 && $item['io_dt']!=-1) $month=$tmp_month;
			
			if($item['io_dt']==-1)
			{
				$in_su_sum+=$item['in_su'];
				$in_amt_sum+=$item['out_su'];
				$out_su_sum+=$item['in_amt'];
				$out_amt_sum+=$item['out_amt'];
				$rest = $in_su_sum - $out_su_sum;
				$item['rest']=$rest;
			}
			
			if($item['io_dt']!=-1)
			{
				$in_su_month_sum+=$item['in_su'];
				$out_su_month_sum+=$item['out_su'];
				$in_amt_month_sum+=$item['in_amt'];
				$out_amt_month_sum+=$item['out_amt'];
				
				$rest=$rest+$item['in_su']-$item['out_su'];
				//$item['rest']=$rest;
			}
			
			array_push($result,$item);
			
		}

		if($yyyy!=-1){
			$in_su_sum+=$in_su_month_sum;
			$in_amt_sum+=$in_amt_month_sum;
			$out_su_sum+=$out_su_month_sum;
			$out_amt_sum+=$out_amt_month_sum;
			
			//기본 변수
			$month_str=sprintf("%02d", $month);
			
			$month=$tmp_month;
			//월계
			$obj=null;
			$obj['io_dt']=-2;	
			$obj['in_su']=$in_su_month_sum;
			$obj['in_dan']='';
			$obj['in_amt']=$in_amt_month_sum;
			$obj['out_su']=$out_su_month_sum;
			$obj['out_dan']='';
			$obj['out_amt']=$out_amt_month_sum;
			$obj['rest']=0;
			array_push($result,$obj);
	
			//누계
			$obj['io_dt']=-3;	
			$obj['in_su']=$in_su_sum;
			$obj['in_dan']='';
			$obj['in_amt']=$in_amt_sum;
			$obj['out_su']=$out_su_sum;
			$obj['out_dan']='';
			$obj['out_amt']=$out_amt_sum;
			$obj['rest']=$rest;
			array_push($result,$obj);
			
			//월계 초기화
			$in_su_month_sum = 0;
			$in_amt_month_sum = 0;
			$out_su_month_sum = 0;
			$out_amt_month_sum = 0;
		}
		
		echo "{ CODE: '00', DATA : ".json_encode($result)."}";
		
		$sWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$sWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>