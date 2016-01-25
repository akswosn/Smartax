<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$col_array= $acctWork->requestProfitReport();
		
		$item=$acctWork->fetchMapRow();
		$sum_array=array();
		
		$result=array();
		
		if(count($acctWork->result)> 0)
		{
			while(true)
			{
				$gycode=(int)$item['gycode'];
				//계산
				$calc=($gycode>399);
				$group = (int)($gycode/100);
				
				$item['group']=$group;
				$sum = 0;
				$checksum = 0;
				for($idx=0;$idx<count($col_array);$idx=$idx+3){
					$col1=$col_array[$idx];
					$col2=$col_array[$idx+1];
					$col3=$col_array[$idx+2];
					
					$Cvalue=$item[$col1];
					$Dvalue=$item[$col2];
					$key=$col3;
					$checksum=$checksum+$Cvalue+$Dvalue;
					
					if(!$calc)
					{
						$Cvalue=$Cvalue-$Dvalue;
					}
					else
					{
						$Cvalue=$Dvalue-$Cvalue;	
					}
					
					$sum=$sum+$Cvalue;
					if($group==3)
						$sum_array[$key]=$sum_array[$key]+$Cvalue;
					else
						$sum_array[$key]=$sum_array[$key]-$Cvalue;
					
					$item[$key]=$Cvalue;
				}
				$item["sum"]=$sum;
				if($checksum==0){
					$item=$acctWork->fetchMapRow();
					
					if(!$item) break;
					else continue;
				} 
				
				array_push($result,$item);
				$checksum = 0;
				if(!$item=$acctWork->fetchMapRow()) break;
			}
			
			$sumdata = 0;
			
			$sum_item['gycode']='TOTAL';
			//$sum_output= " { 'gycode' : 'TOTAL' , ";
			//마지막 합라인
			foreach ($sum_array as $key => $value) {
				$sumdata=$sumdata+$value;
				//$sum_output=$sum_output." '$key' : $value ,";
				$sum_item[$key]=$value;
			}
			//$sum_output=$sum_output." 'group' : 5, 'sum': $sumdata }";
			$sum_item['group']=5;
			$sum_item['sum']=$sumdata;
			array_push($result,$sum_item);
		}
		
		echo "{ CODE: '00', DATA:".json_encode($result)." }";
		
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