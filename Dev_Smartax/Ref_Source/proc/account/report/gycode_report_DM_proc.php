<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestGycodeReportDM();
		
		$gycode=$acctWork -> param["gycode"];
		$gycode_calc=false;
		if(((int)($gycode/100))==1 or (int)($gycode/100)==4){
			$gycode_calc=true;
		}
		
		$yyyy =(int)substr($acctWork -> param["from_yyyymmdd"],0,4);
		$flag = $acctWork -> param["flag"];
		
		$tmp_sum = 0;
		$month_credit_sum = 0;
		$month_debit_sum = 0;
		$month_credit_total_sum = 0;
		$month_debit_total_sum = 0;
		
		$data = array();
		$month=0;
		$tmp_month=0;
		
		$gicho_credit = 0;
		$gicho_debit = 0;
		
		if(count($acctWork->result)> 0)
		{
			while($item=$acctWork->fetchMapRow())
			{
				$jp_yyyymmdd = (int)$item['jp_yyyymmdd'];
				$jp_rem = $item['jp_rem'];
				$customer_id = $item['customer_id'];
				$debit = $item['debit'];
				$credit = $item['credit'];
				$jp_id = $item['jp_id'];
				$jp_no = $item['jp_no'];
				$jp_match_id = $item['jp_match_id'];
				
				//전월 이월
				if($jp_yyyymmdd==-1){
					$item['type']=1;
					$item['jp_yyyymmdd'] = '';
					
					//전월 입금, 출금 잔액 표시 안함
					$item['debit'] = 0;
					$item['credit'] = 0;
					
					$gicho_credit = $credit;
					$gicho_debit = $debit;
					//$month_credit_total_sum+=$credit;
					//$month_debit_total_sum+=$debit;
					
					if($gycode_calc)
						$tmp_sum=$tmp_sum+$debit-$credit;
					else
						$tmp_sum=$tmp_sum+$credit-$debit;
					$item['sum']=$tmp_sum;
					
					array_push($data,$item);
					continue;
				}
				
				// 월계,누계 넣을지 결정  
				$tmp_month=substr($jp_yyyymmdd, 4, 2);
				if($month!=$tmp_month && $month!=0){
					//월계
					$info['type']=2;
					if($flag =='d') $info['jp_rem']='일계';
					else $info['jp_rem']='월계';
					$info['customer_id']=-1;
					$info['debit']=$month_debit_sum;
					$info['credit']=$month_credit_sum;
					$info['jp_id']=-1;
					$info['jp_no']=-1;
					$info['jp_match_id']=-1;
					$info['sum']=0;
					
					$month_credit_total_sum+=$month_credit_sum;
					$month_debit_total_sum+=$month_debit_sum;	
					$month_credit_sum=0;
					$month_debit_sum=0;
					
					array_push($data,$info);
					
					//누계
					$info['type']=3;
					$info['jp_rem']='누계';
					$info['debit']=$month_debit_total_sum;
					$info['credit']=$month_credit_total_sum;
					
					if($gycode_calc)
						$info['sum']=$month_debit_total_sum-$month_credit_total_sum;
					else
						$info['sum']=$month_credit_total_sum-$month_debit_total_sum;
					
					array_push($data,$info);
				}
				
				//일반
				$month=$tmp_month;
				// - 잔액 연산
				if($gycode_calc)
					$tmp_sum=$tmp_sum+$debit-$credit;
				else
					$tmp_sum=$tmp_sum+$credit-$debit;
				
				$item['sum']=$tmp_sum;
				$month_credit_sum+=$credit;
				$month_debit_sum+=$debit;	
				
				array_push($data,$item);
			}

			//마지막
			//월계
			$info['type']=2;
			if($flag =='d') $info['jp_rem']='일계';
					else $info['jp_rem']='월계';
			$info['customer_id']=-1;
			$info['debit']=$month_debit_sum;
			$info['credit']=$month_credit_sum;
			$info['jp_id']=-1;
			$info['jp_no']=-1;
			$info['jp_match_id']=-1;
			$info['sum']=0;
			
			$month_credit_total_sum+=$month_credit_sum;
			$month_debit_total_sum+=$month_debit_sum;	
			$month_credit_sum=0;
			$month_debit_sum=0;
			
			array_push($data,$info);
			
			//누계
			$info['type']=3;
			$info['jp_rem']='누계';
			$info['debit']=$month_debit_total_sum;
			$info['credit']=$month_credit_total_sum;
			
			if($gycode_calc)
				$info['sum']=$month_debit_total_sum+$gicho_debit-$month_credit_total_sum-$gicho_credit;
			else
				$info['sum']=$month_credit_total_sum+$gicho_credit-$month_debit_total_sum-$gicho_debit;
			
			array_push($data,$info);
		}
		$result['CODE']='00';
		$result['DATA']=$data;
		
		echo json_encode($result);
		
		$acctWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$acctWork->destoryWork();
		
		$err=$e->getMessage();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>