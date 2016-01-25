<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_GET, true);
		$res = $acctWork->requestAcctReportList();
		
		$item=$acctWork->fetchMixedRow();
		
		$type1 = array('gycode' => '자산',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type1['children'] = array();
		$type2 = array('gycode' => '부채',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type2['children'] = array();
		$type3 = array('gycode' => '수익',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type3['children'] = array();
		$type4 = array('gycode' => '비용',  'gicho_am' => '' ,  'credit' => '', 'debit' => '', 'balance_am' => '', 'type' => -1 );
		$type4['children'] = array();
		
		if(count($acctWork->result)> 0)
		{
			while(true)
			{
				$gycode = (int)$item['gycode'];
				$gicho_debit = $item['gicho_debit'];
				$gicho_credit = $item['gicho_credit'];
				$sum_credit = $item['sum_credit'];
				$sum_debit = $item['sum_debit'];
				$sum = 0;
				
				if($gycode==101)
				{
					$sum_credit = $res['cash_credit'];
					$sum_debit = $res['cash_debit'];
				}
				
				//테이터가 없으면 리턴 안함
				if($gicho_debit==0 and $gicho_credit==0 and $sum_credit==0 and $sum_debit==0){
					if($item=$acctWork->fetchMixedRow())  continue;
					else break;
				}
				
				
				if($gicho_debit=='') $gicho_debit=0;
				if($gicho_credit=='') $gicho_credit=0;
				if($sum_credit=='') $sum_credit=0;
				if($sum_debit=='') $sum_debit=0;
				
				switch ((int)($gycode/100)) {
					case 1 :
						$gicho=$gicho_debit-$gicho_credit;
						if($gycode==101){
							$sum = $sum_credit-$sum_debit+$gicho;
							array_push($type1['children'], array('gycode' => $gycode ,  'gicho_am' => $gicho ,  'credit' => $sum_credit , 'debit' => $sum_debit, 'balance_am' => $sum,  'leaf' => 'true' ));
						} else{
							$sum = $sum_debit-$sum_credit+$gicho;
							array_push($type1['children'], array('gycode' => $gycode ,  'gicho_am' => $gicho ,  'credit' => $sum_debit , 'debit' => $sum_credit, 'balance_am' => $sum,  'leaf' => 'true' ));
						} 
						break;
					case 4 :
						$gicho=$gicho_debit-$gicho_credit;
						$sum = $sum_debit-$sum_credit+$gicho;
						array_push($type4['children'], array('gycode' => $gycode ,  'gicho_am' => $gicho ,  'credit' => $sum_debit , 'debit' => $sum_credit, 'balance_am' => $sum,  'leaf' => 'true' ));
						break;
					case 2 :
						$gicho=$gicho_credit-$gicho_debit;
						$sum = $sum_credit-$sum_debit+$gicho;
						array_push($type2['children'], array('gycode' => $gycode ,  'gicho_am' => $gicho ,  'credit' => $sum_debit, 'debit' => $sum_credit, 'balance_am' => $sum,  'leaf' => 'true' ));
						break;
					case 3 :
						$gicho=$gicho_credit-$gicho_debit;
						$sum = $sum_credit-$sum_debit+$gicho;
						array_push($type3['children'], array('gycode' => $gycode ,  'gicho_am' => $gicho ,  'credit' => $sum_debit, 'debit' => $sum_credit, 'balance_am' => $sum,  'leaf' => 'true' ));
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