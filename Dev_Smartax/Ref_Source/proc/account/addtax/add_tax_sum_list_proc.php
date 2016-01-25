<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/AddTaxWork.php");

	$aWork = new AddTaxWork(true);
	
	//http://localhost/FarmSaver/proc/account/addtax/add_tax_sum_list_proc.php?from_atax_yyyymm=201410&to_atax_yyyymm=201412&type1=11
	//{ CODE: '00' , DATA : {"n":{"sum":{"cnt":7,"atax_supply_price":9128000,"atax_tax":912800,"custumer_cnt":3},"data":[{"atax_customer_id":"1","tr_nm":"\uc0b0\ucc9c\uacbd\uc81c\uc5f0\uad6c\uc18c","tr_daepyo":"","tr_saup_no":"","tr_up":"","tr_jong":"","atax_supply_price":78000,"atax_tax":7800},{"atax_customer_id":"2","tr_nm":"\uc11c\uc6b8\uccad\uacfc","tr_daepyo":"","tr_saup_no":"","tr_up":"","tr_jong":"","atax_supply_price":50000,"atax_tax":5000},{"atax_customer_id":"901","tr_nm":"\ud64d\uae38\ub3d9\uc13c\ucc28","tr_daepyo":"","tr_saup_no":"","tr_up":"","tr_jong":"","atax_supply_price":9000000,"atax_tax":900000}]},"y":{"sum":{"custumer_cnt":1,"cnt":2,"atax_supply_price":36000,"atax_tax":3600},"data":[{"atax_customer_id":"1","tr_nm":"\uc0b0\ucc9c\uacbd\uc81c\uc5f0\uad6c\uc18c","tr_daepyo":"","tr_saup_no":"","tr_up":"","tr_jong":"","atax_supply_price":36000,"atax_tax":3600}]},"total":{"custumer_cnt":4,"cnt":9,"atax_supply_price":9164000,"atax_tax":916400}}}
	try
	{
		//$aWork->createWork($_GET, true);
		$aWork->createWork($_POST, true);
		$res = $aWork->requestSumList();
		
		$result=array();
		$ret = array();
		$ret_sum = null;
		
		$sum_item = null;
		$tmp_cus = null;
		$tmp_flag = null;
		
		$total_sum = null;
		
		while($item=$aWork->fetchMapRow())
		{
			//사업자별 값
			if($tmp_cus != $item['atax_customer_id'])
			{
				
				if($sum_item != null){
					array_push($ret,$sum_item);
					$sum_item = null;
					
					//사업자 갯수
					$ret_sum['custumer_cnt']++;
				}
					
				$tmp_cus =  $item['atax_customer_id'];
				$sum_item['atax_customer_id'] = $item['atax_customer_id'];
				$sum_item['tr_nm'] = $item['tr_nm'];
				$sum_item['tr_daepyo'] = $item['tr_daepyo'];
				$sum_item['tr_saup_no'] = $item['tr_saup_no'];
				$sum_item['tr_up'] = $item['tr_up'];
				$sum_item['tr_jong'] = $item['tr_jong'];
			}
			
			if($tmp_flag != $item['atax_elect_flag'])
			{
				if($tmp_flag != null)
				{
					$result[$tmp_flag] = array();
					//합계값
					$result[$tmp_flag]['sum'] = $ret_sum;
					//데이터
					$result[$tmp_flag]['data'] = $ret;
						
					//총합계 계산
					$total_sum['custumer_cnt'] = $total_sum['custumer_cnt'] + $ret_sum['custumer_cnt'];
					$total_sum['cnt'] = $total_sum['cnt'] + $ret_sum['cnt'];
					$total_sum['atax_supply_price'] = $total_sum['atax_supply_price'] + $ret_sum['atax_supply_price'];
					$total_sum['atax_tax'] = $total_sum['atax_tax'] + $ret_sum['atax_tax'];
						
					$ret_sum = null;
					$ret = array();
						
					//사업자 갯수 초기화, 매수 초기화
					$ret_sum['custumer_cnt'] = 0;
					$ret_sum['cnt'] = 0;
				}
		
				$tmp_flag = $item['atax_elect_flag'];
			}
			
			//각 매수
			$ret_sum['cnt']++;
			
			//사업자별 합계값
			$sum_item['atax_supply_price'] = $sum_item['atax_supply_price'] +$item['atax_supply_price'];
			$sum_item['atax_tax'] = $sum_item['atax_tax'] +$item['atax_tax'];
			$sum_item['cnt'] = $sum_item['cnt'] +1;
			
			//종이, 전자 합계값
			$ret_sum['atax_supply_price'] = $ret_sum['atax_supply_price'] +$item['atax_supply_price'];
			$ret_sum['atax_tax'] = $ret_sum['atax_tax'] +$item['atax_tax'];
		}
		
		array_push($ret,$sum_item);
		//사업자 갯수
		$ret_sum['custumer_cnt']++;
		
		//마지막 값 넣기
		$result[$tmp_flag] = array();
		//합계값
		$result[$tmp_flag]['sum'] = $ret_sum;
		//데이터
		$result[$tmp_flag]['data'] = $ret;
		
		//총합계 계산
		$total_sum['custumer_cnt'] = $total_sum['custumer_cnt'] + $ret_sum['custumer_cnt'];
		$total_sum['cnt'] = $total_sum['cnt'] + $ret_sum['cnt'];
		$total_sum['atax_supply_price'] = $total_sum['atax_supply_price'] + $ret_sum['atax_supply_price'];
		$total_sum['atax_tax'] = $total_sum['atax_tax'] + $ret_sum['atax_tax'];
			
		$result["total"] = $total_sum;
		
		if($res == 0){
			$ret = null;
			$ret['cnt'] = 0;
			$ret['custumer_cnt'] = 0; 
			$ret['atax_supply_price'] = 0;
			$ret['atax_tax'] = 0;
			
			$result = array();
			$result["total"] = $ret;
			$result["y"] = $ret;
			$result["n"] = $ret;
			
			echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		}
		else echo "{ CODE: '00' , DATA : ".json_encode($result)."}";
		
		$aWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>