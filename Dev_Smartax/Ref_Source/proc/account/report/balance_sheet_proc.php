<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");
	
	define(DEPRECIATION_COST,447);
	

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestBalanceSheet();
		
		$sum_debit = 0;
		$sum_credit = 0;
		$sum_profit = 0;
		$sum_loss = 0;
		$result = null;
		
		if(count($acctWork->result)> 0)
		{
			$result['debit']=array();
			$result['credit']=array();
			$result['sum']=array();
			$result['income']=array();
			$result['income']['group1']=array();
			$result['income']['group2']=array();
			$result['income']['group1_sum']=array();
			$result['income']['group2_sum']=array();
			$result['income']['group_sum']=array();
			
			while($item=$acctWork->fetchMixedRow())
			{
				$gycode = (int)$item['gycode'];
				$tr_am = $item['tr_am'];
				$obj = null;
				
				//감가 상각비 무조건 보여주기(0 값이라도)
				if(($tr_am==0 or $tr_am=='') AND $gycode!=DEPRECIATION_COST) continue;
				$obj['gycode']=$gycode;
				switch ((int)($gycode/100)) {
					case 1 : 
						$sum_debit+=$tr_am;
						$obj['tr_am']=$tr_am;
						array_push($result['debit'],$obj);
						break;
					case 2 : 
						$sum_credit+=$tr_am; 
						$obj['tr_am']=$tr_am;
						array_push($result['credit'],$obj);
						break;
					case 3 : 
						$sum_profit+=$tr_am; 
						$obj['tr_am']=$tr_am;
						array_push($result['income']['group1'],$obj);
						break;
					case 4 : 
						$sum_loss+=$tr_am;	
						$obj['tr_am']=$tr_am;
						array_push($result['income']['group2'],$obj);
					break;
				}
			}
			$obj = null;
			
			//대차대조표
			$obj['gycode']='자산 총계';
			$obj['tr_am']=$sum_debit;
			array_push($result['sum'],$obj);
			
			$obj['gycode']='부채 총계';
			array_push($result['sum'],$obj);
			
			$obj['gycode']='당기 순이익';
			$obj['tr_am']=$sum_debit-$sum_credit;
			array_push($result['sum'],$obj);
			

			
			//손익계산서 
			$obj = null;
			$obj['gycode']='1. 수익총계';
			$obj['type']=-1;	
			$obj['sum']=$sum_profit;
			array_push($result['income']['group1_sum'],$obj);
			$obj['gycode']='2. 비용총계';
			$obj['type']=-2;
			$obj['sum']=$sum_loss;
			array_push($result['income']['group2_sum'],$obj);
			
			$obj['gycode']='3. 당기 순이익';
			$obj['type']=-3;
			$obj['sum']=$sum_profit-$sum_loss;
			array_push($result['income']['group_sum'],$obj);
			
		}
		$result['CODE']='00';
		
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