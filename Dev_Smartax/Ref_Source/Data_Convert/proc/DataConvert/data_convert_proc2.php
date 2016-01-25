<?php
	require_once("../../class/Utils.php");
	require_once("../../class/ConvertWork.php");
	require_once("./ConvertUtils.php");

	$fromWork = new ConvertWork();
	$toWork = new ConvertWork();
	$toWork2 = new ConvertWork();
	
	//localhost/FarmSaver/proc/DataConvert/data_convert_proc2.php?id=bluelkc&co_id=32
	
	
	
	try
	{
		$login_id=$_GET['id'];
		$co_list['001']=$_GET['co_id'];
		
		$fromWork->createWork($_GET,'io_sample2');
		$toWork->createWork($_GET, false);
		$toWork2->createWork($_GET, false);
		
		$toWork->querySql("SELECT uid FROM user_info WHERE user_id='$login_id';");
		$uid=0;
		
		if($row=$toWork->fetchMixedRow())
		{
			$uid=(int)$row[0];
		}
		else
		{
			throw new Exception("user_id Not Match");
		}
		
		//일정  --> Complete
		//echo "--> memorial<br>";
		//$result['memorial']=ConvertUtils::convertMemorial($fromWork,$toWork,$co_list,$uid);
		
		//상품 그룹 --> Complete
		//echo "--> itemgrp<br>";
		//$result['itemgrp']=ConvertUtils::convertItemGrp($fromWork,$toWork,$co_list,$uid);
		
		//상품  --> Complete
		//echo "--> item<br>";
		//$result['item']=ConvertUtils::convertItem($fromWork,$toWork,$co_list,$uid);

		
		//입고 마스터 -> 
		//echo "--> input_master<br>";
		//$result['input_master']=ConvertUtils::convertInputMaster($fromWork,$toWork,$co_list,$uid);
		
		//입고 디테일 
		//echo "--> input_detail<br>";
		//$result['input_detail']=ConvertUtils::convertInputDetail($fromWork,$toWork,$co_list,$uid);
		
		//-->
		
		//출고 마스터 -> 
		//echo "--> output_master<br>";
		//$result['output_master']=ConvertUtils::convertOutputMaster($fromWork,$toWork,$co_list,$uid);
		
		//출고 디테일
		//echo "--> output_detail<br>";
		//$result['output_detail']=ConvertUtils::convertOutputDetail($fromWork,$toWork,$co_list,$uid);
		
		//주문 마스터
		//echo "--> jumun_master<br>";
		//$result['jumun_master']=ConvertUtils::convertJumunMaster($fromWork,$toWork,$co_list,$uid);
				
		//주문 디테일
		//echo "--> jumun_detail<br>";
		//$result['jumun_detail']=ConvertUtils::convertJumunDetail($fromWork,$toWork,$co_list,$uid);
		
		//주문 데이터에 플레그 넣기(출고 데이터 참고)
		//echo "--> fix_jumun_detail<br>";
		//$result['fix_jumun_detail']=ConvertUtils::convertFixJumunDetail($toWork,$toWork2,$co_list,$uid);
		
		foreach ($result as $key => $value) {
			echo "$key -> $value <br/>";	
		}
		
		$fromWork->destoryWork();
		$toWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$toWork->rollback();
		
		$fromWork->destoryWork();
		$toWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>