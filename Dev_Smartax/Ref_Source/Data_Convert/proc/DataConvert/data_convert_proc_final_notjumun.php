<?php
	require_once("../../class/Utils.php");
	require_once("../../class/ConvertWork.php");
	require_once("./ConvertUtils.php");

	$fromWork = new ConvertWork();
	$toWork = new ConvertWork();
	$toWork2 = new ConvertWork();
	
	/*
	localhost/proc/DataConvert/data_convert_proc_final_notjumun.php?id=ukifarm   83  --> 	201	-->  198
	
	http://localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=lkh6301  
	--> 원래 회사 (44) [미삭제] - 528,529,530
	--> 컨버팅 회사 - 563,564,565
	
	
	//우선 순위 회사
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=kang710 	   53 -->  old_com 97 --> 581 
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=mdalove		205 -->old_com 325 --> 582 - 619 
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=saverius49   68 -->  old_com 154 -->622
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=shinkwang   78 --> old_com 193 -->  624
	
	//후 순위 회사
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=700aks		- 매칭 아이디 없음
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=dream5531 89 -->old_com 206 -->625
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=knam3004  69  --> old_com 151 --> 626
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=narchis2   88 --> old_com 205 --> 627 628 629 
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=ppoky77   42 --> old_com 73 --> 630
	
	-->예전회사 유지 localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=yooil2002  66 --> old_com 159 --> 631
	
	
	
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=mscho12    434 --> old_com 632 --> 637 
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=holybjh	435 --> old_com 633 --> 638  
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=woolee47  436 --> old_com 634 --> 639  
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=gsf3258	438 --> old_com 636 --> 640
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=sa1380     437 --> old_com 635 --> 641
	 
	** 회사 삭제
	- 620, 621, 623, 648, 649, 652, 653 
	
	//영농일지 없음
	kang710
	saverius49
	shinkwang
	knam3004
	narchis2
	ppoky77
	mscho12
	
	//영농일지 있음 - 변환 완료
	mdalove  
	yooil2002
	
	
	//영농일지 있음 - 미변환
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=dream5531 89 -->old_com 206 -->625 --> 646 
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=holybjh	435 --> old_com 633 --> 638  --> 647
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=woolee47  436 --> old_com 634 --> 639 --> 650   
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=gsf3258	438 --> old_com 636 --> 640 --> 651
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=sa1380     437 --> old_com 635 --> 641 --> 654
	
	//미 컨버팅 회사
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=700aks		- 매칭 아이디 없음
	
	
	
	
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=jeju62    448 --> old_com 660 --> 662 663
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=shinkwang    78 --> old_com 624 --> 672
	삭제  --> 664 665 666
	
	
	
	
	
	localhost/FarmSaver_Data_Convert/proc/DataConvert/data_convert_proc_final_notjumun.php?id=saverius49   68 -->  old_com 154 -->622 -->678
	
	
	
	
	
	
	
	*/
	
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
		
		echo "--> $co_list[001]";
		
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
		
		/*
		//주문 마스터
		echo "--> jumun_master<br>";
		$result['jumun_master']=ConvertUtils::convertJumunMaster($fromWork,$toWork,$co_list,$uid);
				
		//주문 디테일
		echo "--> jumun_detail<br>";
		$result['jumun_detail']=ConvertUtils::convertJumunDetail($fromWork,$toWork,$co_list,$uid);
		
		//주문 데이터에 플레그 넣기(출고 데이터 참고)
		echo "--> fix_jumun_detail<br>";
		$result['fix_jumun_detail']=ConvertUtils::convertFixJumunDetail($toWork,$toWork2,$co_list,$uid);
		*/
		
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