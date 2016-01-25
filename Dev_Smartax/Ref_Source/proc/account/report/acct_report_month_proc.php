<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_GET, true);
		$res = $acctWork->requestAcctReportMonthList();
		
		$item=$acctWork->fetchMixedRow();
		
		$type1 = array('gycode' => '자산',   'balance_am' => '', 'type' => -1 ,  'r_credit' => '', 'r_debit' => '', 'balance' => '');
		$type1['children'] = array();
		$type2 = array('gycode' => '부채',   'balance_am' => '', 'type' => -1 ,  'r_credit' => '', 'r_debit' => '', 'balance' => '');
		$type2['children'] = array();
		$type3 = array('gycode' => '수익',   'balance_am' => '', 'type' => -1 ,  'r_credit' => '', 'r_debit' => '', 'balance' => '');
		$type3['children'] = array();
		$type4 = array('gycode' => '비용',   'balance_am' => '', 'type' => -1 ,  'r_credit' => '', 'r_debit' => '', 'balance' => '');
		$type4['children'] = array();
		
		$c_debit = $res['c_debit'];
		$c_credit = $res['c_credit'];
		
		if(count($acctWork->result)> 0)
		{
			while(true)
			{
				$gycode = (int)$item['gycode'];
				$gicho_debit = $item['gicho_debit'];
				$gicho_credit = $item['gicho_credit'];
				$sum_credit = $item['sum_credit'];
				$sum_debit = $item['sum_debit'];
				
				$r_debit = $item['r_debit'];
				$r_credit = $item['r_credit'];
				 
				$sum = 0;
				
				if($gycode==101)
				{
					$sum_credit = $res['cash_credit'];
					$sum_debit = $res['cash_debit'];
					
					//테이터가 없으면 리턴 안함
					if(($gicho_debit==0 and $gicho_credit==0 and $sum_credit==0 and $sum_debit==0 and $r_debit==0 and $r_credit==0 and $c_debit == 0 and $c_credit == 0)){
						if($item=$acctWork->fetchMixedRow())  continue;
						else break;
					}
				}
				else
				{
					//테이터가 없으면 리턴 안함
					if(($gicho_debit==0 and $gicho_credit==0 and $sum_credit==0 and $sum_debit==0 and $r_debit==0 and $r_credit==0)){
						if($item=$acctWork->fetchMixedRow())  continue;
						else break;
					}
				}
				
				/*
				if($gycode==101)
				{
					$sum_credit = $res['cash_credit'];
					$sum_debit = $res['cash_debit'];
				}
				
				//테이터가 없으면 리턴 안함
				if($gicho_debit==0 and $gicho_credit==0 and $sum_credit==0 and $sum_debit==0 and $r_debit==0 and $r_credit==0){
					if($item=$acctWork->fetchMixedRow())  continue;
					else break;
				}
				*/
				
				if($gicho_debit=='') $gicho_debit=0;
				if($gicho_credit=='') $gicho_credit=0;
				if($sum_credit=='') $sum_credit=0;
				if($sum_debit=='') $sum_debit=0;
				
				switch ((int)($gycode/100)) {
					case 1 :
						$gicho=$gicho_debit-$gicho_credit;
						if($gycode==101){
							$sum = $sum_credit-$sum_debit+$gicho;
							$balance = $sum+$c_credit-$c_debit;
							array_push($type1['children'], array('gycode' => $gycode ,  'balance_am' => $sum,  'r_credit' => $c_credit, 'r_debit'=> $c_debit,  'leaf' => 'true', 'balance' => $balance ));
						} else{
							$sum = $sum_debit-$sum_credit+$gicho;
							$balance = $sum+$r_debit-$r_credit;
							array_push($type1['children'], array('gycode' => $gycode ,  'balance_am' => $sum ,  'r_credit' => $r_debit, 'r_debit'=> $r_credit,  'leaf' => 'true', 'balance' => $balance));
						} 
						break;
					case 4 :
						$gicho=$gicho_debit-$gicho_credit;
						$sum = $sum_debit-$sum_credit+$gicho;
						$balance = $sum+$r_debit-$r_credit;
						array_push($type4['children'], array('gycode' => $gycode , 'balance_am' => $sum ,  'r_credit' => $r_debit, 'r_debit'=> $r_credit,  'leaf' => 'true', 'balance' => $balance));
						break;
					case 2 :
						$gicho=$gicho_credit-$gicho_debit;
						$sum = $sum_credit-$sum_debit+$gicho;
						$balance = $sum+$r_credit-$r_debit;
						array_push($type2['children'], array('gycode' => $gycode ,  'balance_am' => $sum ,  'r_credit' => $r_debit, 'r_debit'=> $r_credit,  'leaf' => 'true', 'balance' => $balance));
						break;
					case 3 :
						$gicho=$gicho_credit-$gicho_debit;
						$sum = $sum_credit-$sum_debit+$gicho;
						$balance = $sum+$r_credit-$r_debit;
						array_push($type3['children'], array('gycode' => $gycode ,  'balance_am' => $sum ,  'r_credit' => $r_debit, 'r_debit'=> $r_credit,  'leaf' => 'true', 'balance' => $balance));
						break;
				}
							
				if($item=$acctWork->fetchMixedRow()) echo '';
				else break;
			}
		}
		
		$result = array('CODE' => '00');
		$result['children'][0] = $type1;
		$result['children'][1] = $type2;
		$result['children'][2] = $type3;
		$result['children'][3] = $type4;
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