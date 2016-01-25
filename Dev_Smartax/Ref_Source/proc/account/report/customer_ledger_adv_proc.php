<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBAcctReportWork.php");

	$acctWork = new DBAcctReportWork(true);

	try
	{
		$acctWork->createWork($_POST, true);
		$res = $acctWork->requestCustomerLedger();
		
		$gycode=$acctWork -> param["gycode"];
		$gycode_calc=false;
		if(((int)($gycode/100))==1 or (int)($gycode/100)==4){
			$gycode_calc=true;
		}
		
		$yyyy =(int)substr($acctWork -> param["from_yyyymmdd"],0,4);
		
		$tmp_sum = 0;
		$month_credit_sum = 0;
		$month_debit_sum = 0;
		$month_credit_total_sum = 0;
		$month_debit_total_sum = 0;
		
		$data = array();
		$month=0;
		$tmp_month=0;
		
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
					$item['jp_yyyymmdd']='';
					
					if($gycode_calc)
						$tmp_sum=$tmp_sum+$debit-$credit;
					else
						$tmp_sum=$tmp_sum+$credit-$debit;
					$item['sum']=$tmp_sum;
					
					$month_credit_total_sum+=$credit;
					$month_debit_total_sum+=$debit;	
					
					array_push($data,$item);
					continue;
				}
				
				// 월계,누계 넣을지 결정  
				$tmp_month=substr($jp_yyyymmdd, 4, 2);
				if($month!=$tmp_month && $month!=0){
					//월계
					$info['type']=2;
					$info['jp_rem']='월계';
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
			$info['jp_rem']='월계';
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
		/*
		{"jp_yyyymmdd":"","customer_id":"-1","jp_rem":"\uc804\uc6d4\uc774\uc6d4","debit":"0","credit":"0","jp_no":"-1","jp_id":"-1","jp_match_id":"-1","type":1,"sum":0},
		{"jp_yyyymmdd":"20140123","customer_id":"301","jp_rem":"[\uc790\ub3d9 \ubd84\uac1c] ","debit":"18000","credit":"0","jp_no":"5001","jp_id":"526287","jp_match_id":"0","sum":18000},
		{"type":2,"jp_rem":"\uc6d4\uacc4","customer_id":-1,"debit":18000,"credit":0,"jp_id":-1,"jp_no":-1,"jp_match_id":-1,"sum":0},
		{"type":3,"jp_rem":"\ub204\uacc4","customer_id":-1,"debit":18000,"credit":0,"jp_id":-1,"jp_no":-1,"jp_match_id":-1,"sum":18000},
		{"jp_yyyymmdd":"20140228","customer_id":"301","jp_rem":"","debit":"0","credit":"18000","jp_no":"13","jp_id":"538809","jp_match_id":"538808","sum":0},
		{"type":2,"jp_rem":"\uc6d4\uacc4","customer_id":-1,"debit":0,"credit":18000,"jp_id":-1,"jp_no":-1,"jp_match_id":-1,"sum":0},
		{"type":3,"jp_rem":"\ub204\uacc4","customer_id":-1,"debit":18000,"credit":18000,"jp_id":-1,"jp_no":-1,"jp_match_id":-1,"sum":0},
		{"jp_yyyymmdd":"20141105","customer_id":"301","jp_rem":"","debit":"585000","credit":"0","jp_no":"5","jp_id":"660562","jp_match_id":"0","sum":585000},
		{"jp_yyyymmdd":"20141105","customer_id":"301","jp_rem":"","debit":"585000","credit":"0","jp_no":"6","jp_id":"660564","jp_match_id":"0","sum":1170000},
		{"jp_yyyymmdd":"20141105","customer_id":"301","jp_rem":"","debit":"585000","credit":"0","jp_no":"7","jp_id":"660566","jp_match_id":"0","sum":1755000},
		{"jp_yyyymmdd":"20141105","customer_id":"301","jp_rem":"","debit":"390000","credit":"0","jp_no":"9","jp_id":"660589","jp_match_id":"0","sum":2145000},
		{"jp_yyyymmdd":"20141106","customer_id":"301","jp_rem":"","debit":"0","credit":"1560000","jp_no":"5","jp_id":"660711","jp_match_id":"0","sum":585000},
		{"type":2,"jp_rem":"\uc6d4\uacc4","customer_id":-1,"debit":2145000,"credit":1560000,"jp_id":-1,"jp_no":-1,"jp_match_id":-1,"sum":0},
		{"type":3,"jp_rem":"\ub204\uacc4","customer_id":-1,"debit":2163000,"credit":1578000,"jp_id":-1,"jp_no":-1,"jp_match_id":-1,"sum":585000}
		 */
		//108외상채권, 201 외상채무 선택시 실행
		if( $_POST['gycode'] == 108 ||  $_POST['gycode'] == 201  )
		{
			//출고 내용 확인
			//입고 내용 확인
			$data_adv = array();
			
			foreach ($data as $item) 
			{
				array_push($data_adv,$item);
				if($item['jp_no'] >= 5000) 
				{
					//해당 내용 찾아서 붙이기
					$acctWork->requestDetailLedger($item['jp_yyyymmdd'], $item['jp_no']);
					if(count($acctWork->result)> 0)
					{
						while($ret=$acctWork->fetchMapRow())
						{
							$rem = '['.sprintf("%05d",$ret['io_item_cd']).']'.$ret['item_nm'];
							if($ret['item_qty'] != '') $rem.='('.$ret['item_qty'].')';
							if($ret['item_danwi'] != '') $rem.='   ---  '.$ret['io_amt'].'원('.$ret['io_su'].' '.$ret['item_danwi'].'*'.$ret['io_dan'].'원)';
							else $rem.='  '.$ret['io_amt'].'원('.$ret['io_su'].'*'.$ret['io_dan'].'원)';
							if($ret['io_rem'] != '') $rem.=' - '.$ret['io_rem'] ;
							
							$info['type']=4;
							$info['jp_rem']=$rem;
							$info['customer_id']=-1;
							
							if($_POST['gycode'] == 108) 
							{
								$info['debit']=$ret['io_amt'];
								$info['credit']='';
							}
							else if($_POST['gycode'] == 201 )
							{
								$info['debit']='';
								$info['credit']=$ret['io_amt'];
							}
							
							$info['jp_id']=-1;
							$info['jp_no']=-1;
							$info['jp_match_id']=-1;
							$info['sum']='';
							
							array_push($data_adv,$info);
						}
					}
					
					
				}
			}
			
			
			$result['CODE']='00';
			$result['DATA']=$data_adv;
			
		}
		else
		{
			$result['CODE']='00';
			$result['DATA']=$data;
		}
		
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