<?php
	require_once("../../class/Utils.php");
	require_once("../../class/ConvertWork.php");
	require_once("./ConvertUtils.php");

	$fromWork = new ConvertWork();
	$toWork = new ConvertWork();
	
	//kimgj1212
	//choice4410
	
	//localhost/FarmSaver/proc/DataConvert/data_convert_proc.php?id=bluelkc
	
	
	//http://localhost/FarmSaver/proc/DataConvert/data_convert_proc.php?id=choice4410
	
	
	//localhost/proc/DataConvert/data_convert_proc.php?id=lkh6301
	
	
	
	
	try
	{
		$login_id=$_GET['id'];
		
		$fromWork->createWork($_GET,$login_id);
		$toWork->createWork($_GET, false);
		
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
		
		//아이디랑 회사 연결
		echo "--> connectMyCom<br>";
		$result['mycom']=ConvertUtils::connectMyCom($toWork,$co_list,$uid);






		//1번만
		// 시스템 계정 ->덮어쓰는 것 가능 
		//$result['gycode']=ConvertUtils::convertSystemGycode($fromWork,$toWork);
		/*
		echo "---> result <---";
		foreach ($result as $key => $value) {
			echo "$key -> $value <br/>";	
		}
		*/
		
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