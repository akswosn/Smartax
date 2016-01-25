<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$tWork->createWork(-1, true);
		$ret = array();
		$res = $tWork->selectTaxCompany();
		$ret['COMP'] = $res;
		$res = $tWork->selectTaxDataByCompanyAsSales();
		$res1 = $tWork->selectTaxDataByCompanyAsCust();
		
// 		var_dump($ret['COMP']);
// // 		var_dump(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ");
// 		var_dump($res1);
		
		$result = array();
		
		
		
		for($i=0;$i<count($res);$i++){
			$obj = $res[$i];
			$isFirstAdd = false;
// 			var_dump($obj);
			for($j=0;$j<count($res1);$j++){
				$obj1 = $res1[$j];
// 				var_dump($obj1);
// 				var_dump($obj['co_id']);
				
				if($obj['co_id'] == $obj1['co_id']
						&& $obj['yyyy'] == $obj1['yyyy']
						&& $obj['period_flag'] == $obj1['period_flag'])
				{
// 					$r = array();
// 					array_push($r, $obj);
// 					array_push($r, $obj['yyyy']);
// 					array_push($r, $obj['period_flag']);
// 					array_push($r, $obj['co_nm']);
// 					array_push($r, $obj['co_ceo_nm']);
// 					array_push($r, $obj['co_saup_no']);
// 					array_push($r, $obj['period_flag']);
// 					array_push($r, $obj['co_co_no']);
// 					array_push($r, $obj['co_tel']);
// 					array_push($r, $obj['sales_upload_flag']);
// 					array_push($r, $obj['sales_upload_pdf']);
// 					array_push($r, $obj['tax_complete_flag']);
					
					$r = array(
							'co_id' => $obj['co_id'],
							'yyyy' => $obj['yyyy'],
							'period_flag' => $obj['period_flag'],
							'co_nm' => $obj['co_nm'],
							'co_ceo_nm' => $obj['co_ceo_nm'],
							'co_saup_no' => $obj['co_saup_no'],
							'co_co_no' => $obj['co_co_no'],
							'co_tel' => $obj['co_tel'],
							'sales_upload_flag' => $obj['sales_upload_flag'],
							'sales_upload_pdf' => $obj['sales_upload_pdf'],
							'tax_complete_flag' => $obj['tax_complete_flag'],
							'sales_count' => $obj1['sales_count'],
							'purchase_count' => $obj1['purchase_count']
					);
					
// 					array_push($r, $obj1['sales_count']);
// 					array_push($r, $obj1['purchase_count']);
					array_push($result, $r);
					$isFirstAdd = true;
				}
			}
			
			if(!$isFirstAdd){ // pdf 기준 정보가 없는 경우 default 값 저장
				$r = array(
						'co_id' => $obj['co_id'],
						'yyyy' => $obj['yyyy'],
						'period_flag' => $obj['period_flag'],
						'co_nm' => $obj['co_nm'],
						'co_ceo_nm' => $obj['co_ceo_nm'],
						'co_saup_no' => $obj['co_saup_no'],
						'co_co_no' => $obj['co_co_no'],
						'co_tel' => $obj['co_tel'],
						'sales_upload_flag' => $obj['sales_upload_flag'],
						'sales_upload_pdf' => $obj['sales_upload_pdf'],
						'tax_complete_flag' => $obj['tax_complete_flag'],
						'sales_count' => 0,
						'purchase_count' => 0
				);
// 				array_push($r, $obj['co_id'] );
// 				array_push($r, $obj['yyyy']);
// 				array_push($r, $obj['period_flag']);
// 				array_push($r, $obj['co_nm']);
// 				array_push($r, $obj['co_ceo_nm']);
// 				array_push($r, $obj['co_saup_no']);
// 				array_push($r, $obj['period_flag']);
// 				array_push($r, $obj['co_co_no']);
// 				array_push($r, $obj['co_tel']);
// 				array_push($r, $obj['sales_upload_flag']);
// 				array_push($r, $obj['sales_upload_pdf']);
// 				array_push($r, $obj['tax_complete_flag']);
					
// 				array_push($r, '0');
// 				array_push($r, '0');
				array_push($result, $r);
			}
		}
		
		
		//매입 \매출 카운트 정보 리스트에 없는 정보 추출하여 저장
		for($j=0;$j<count($res1);$j++){
			$obj1 = $res1[$j];
			$isSecAdd = false;
			for($i=0;$i<count($result);$i++){
				
				$obj = $result[$i];
				if($obj['co_id'] == $obj1['co_id']
						&& $obj['yyyy'] == $obj1['yyyy']
						&& $obj['period_flag'] == $obj1['period_flag']){
							$isSecAdd = true;
				}
			}
			if(!$isSecAdd){//등록된 정보가 없는 경우 추가
				for($z=0;$z<count($ret['COMP']);$z++){//회사기본 추출하기위해
					if($obj1['co_id'] == $ret['COMP'][$z]['co_id']){
// 						var_dump($obj1);
						$r = array(
							'co_id' => $obj1['co_id'],
							'yyyy' => $obj1['yyyy'],
							'period_flag' => $obj1['period_flag'],
							'co_nm' => $ret['COMP'][$z]['co_nm'],
							'co_ceo_nm' => $ret['COMP'][$z]['co_ceo_nm'],
							'co_saup_no' => $ret['COMP'][$z]['co_saup_no'],
							'co_co_no' => $ret['COMP'][$z]['co_co_no'],
							'co_tel' => $ret['COMP'][$z]['co_tel'],
							'sales_upload_flag' => 'n',
							'sales_upload_pdf' => '',
							'tax_complete_flag' => 'n',
							'sales_count' => $obj1['sales_count'],
							'purchase_count' => $obj1['purchase_count']
						);
// 						array_push($r, $obj1['co_id'] );
// 						array_push($r, $obj1['yyyy']);
// 						array_push($r, $obj1['period_flag']);
// 						array_push($r, $ret['COMP'][$z]['co_nm']);
// 						array_push($r, $ret['COMP'][$z]['co_ceo_nm']);
// 						array_push($r, $ret['COMP'][$z]['co_saup_no']);
// 						array_push($r, $ret['COMP'][$z]['co_co_no']);
// 						array_push($r, $ret['COMP'][$z]['co_tel']);
// 						array_push($r, 'n');
// 						array_push($r, '');
// 						array_push($r, '');
							
// 						array_push($r, $obj1['sales_count']);
// 						array_push($r, $obj1['purchase_count']);
						array_push($result, $r);
					}
					
				}
			}
		}
		
// 		var_dump($result);
		
		
		
		
		$ret['DATA'] =$result;
		$ret['CODE']='00';
		$tWork->destoryWork();
		
		echo json_encode($ret);
	}
  	catch (Exception $e) 
	{
		$tWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>