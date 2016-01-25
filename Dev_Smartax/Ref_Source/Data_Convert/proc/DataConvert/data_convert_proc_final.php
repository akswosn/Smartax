<?php
	require_once("../../class/Utils.php");
	require_once("../../class/ConvertWork.php");
	require_once("./ConvertUtils.php");

	$fromWork = new ConvertWork();
	$toWork = new ConvertWork();
	$toWork2 = new ConvertWork();
	
	//localhost/FarmSaver/proc/DataConvert/data_convert_proc.php?id=bluelkc
	//http://localhost/FarmSaver/proc/DataConvert/data_convert_proc.php?id=uclid2013
	
	/*
	localhost/proc/DataConvert/data_convert_proc_final.php?id=csm4187  84 	--> 200	-->  199
	localhost/proc/DataConvert/data_convert_proc_final.php?id=kyong207 79  [옛날 194 , 신규 321]

	localhost/proc/DataConvert/data_convert_proc_final.php?id=ssc0135
	
	
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final.php?id=chung990
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final.php?id=lkh6301
	
	
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final.php?id=choice4410 // 26 회사 삭제 대기
	
	
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final.php?id=sung561020 //120 회사 삭제 대기 


	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final.php?id=japcho45 //537,538 회사 삭제 대기 
	 

	*/

	//251,252,253 등록 lkh

	//77,78,79,69  삭제 대기
	//380,381,382,383, 319 삭제 대기
	
	
	
	



	try
	{
		$login_id=$_GET['id'];
		
		$fromWork->createWork($_GET,$login_id);
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

		/*
		$fromWork->createWork($_GET,'kimgj1212');
		$toWork->createWork($_GET, false);
		
		$uid=17;
		$co_list['001']=30;
				*/
		//내 회사  -> 완료
		echo "--> convertCompany<br>";
		$co_list=ConvertUtils::convertCompany($fromWork,$toWork,$uid);
		
		//계정 ->덮어쓰는 것 가능 
		echo "--> convertGycode<br>";
		$result['gycode']=ConvertUtils::convertGycode($fromWork,$toWork,$co_list,$uid);
		
		//거래처
		echo "--> convertCustomer<br>"; 
		$result['customer']=ConvertUtils::convertCustomer($fromWork,$toWork,$co_list,$uid);
		
		//작목(영농, 회계)
		//작목 - 영농
		echo "--> convertJakmok1<br>";
		$result['workjakmok']=ConvertUtils::convertJakmok(true,$fromWork,$toWork,$co_list,$uid);
		
		//작목 - 회계
		echo "--> convertJakmok2<br>";
		$result['jakmok']=ConvertUtils::convertJakmok(false,$fromWork,$toWork,$co_list,$uid);
		
		//작업 코드
		echo "--> convertWorkCd<br>";
		$result['work']=ConvertUtils::convertWorkCd($fromWork,$toWork,$co_list,$uid);
		
		//영농 일지  
		// 작업 코드가 모두 1로 들어감 ??
		echo "--> convertWorkDairy<br>";
		$result['dairy']=ConvertUtils::convertWorkDairy($fromWork,$toWork,$co_list,$uid);
		
		//기초 마스터 -> 덮어쓰는 것 가능
		echo "--> convertGichoMaster<br>";
		$result['gichom']=ConvertUtils::convertGichoMaster($fromWork,$toWork,$co_list,$uid);
		
		//기초 디테일 -> 덮어쓰는 것 가능
		echo "--> convertGichoDetail<br>";
		$result['gichod']=ConvertUtils::convertGichoDetail($fromWork,$toWork,$co_list,$uid);
		
		//전표
		echo "--> convertJunpyo<br>";
		$result['junpyo']=ConvertUtils::convertJunpyo($fromWork,$toWork,$co_list,$uid);
		
		//수정 쿼리
		echo "--> fixedJunpyo<br>";
		$result['junpyofix']=ConvertUtils::fixedJunpyo($toWork,$co_list,$uid);
		
		//-->
		//일정  --> Complete --> Complete
		echo "--> memorial<br>";
		$result['memorial']=ConvertUtils::convertMemorial($fromWork,$toWork,$co_list,$uid);
		
		//상품 그룹 --> Complete --> Complete
		echo "--> itemgrp<br>";
		$result['itemgrp']=ConvertUtils::convertItemGrp($fromWork,$toWork,$co_list,$uid);
		
		//상품  --> Complete
		echo "--> item<br>";
		$result['item']=ConvertUtils::convertItem($fromWork,$toWork,$co_list,$uid);

		//입고 마스터 -> 
		echo "--> input_master<br>";
		$result['input_master']=ConvertUtils::convertInputMaster($fromWork,$toWork,$co_list,$uid);
		
		//입고 디테일 
		echo "--> input_detail<br>";
		$result['input_detail']=ConvertUtils::convertInputDetail($fromWork,$toWork,$co_list,$uid);
		
		//출고 마스터 -> 
		echo "--> output_master<br>";
		$result['output_master']=ConvertUtils::convertOutputMaster($fromWork,$toWork,$co_list,$uid);
		
		//출고 디테일
		echo "--> output_detail<br>";
		$result['output_detail']=ConvertUtils::convertOutputDetail($fromWork,$toWork,$co_list,$uid);
		
		//주문 마스터
		echo "--> jumun_master<br>";
		$result['jumun_master']=ConvertUtils::convertJumunMaster($fromWork,$toWork,$co_list,$uid);
				
		//주문 디테일
		echo "--> jumun_detail<br>";
		$result['jumun_detail']=ConvertUtils::convertJumunDetail($fromWork,$toWork,$co_list,$uid);
		
		//주문 데이터에 플레그 넣기(출고 데이터 참고)
		echo "--> fix_jumun_detail<br>";
		$result['fix_jumun_detail']=ConvertUtils::convertFixJumunDetail($toWork,$toWork2,$co_list,$uid);
		
		///-->

		//아이디랑 회사 연결
		echo "--> connectMyCom<br>";
		$result['mycom']=ConvertUtils::connectMyCom($toWork,$co_list,$uid);

		echo "---> my company <---";
		foreach ($co_list as $key => $value) {
			echo "$value 회사 등록 <br/>";	
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