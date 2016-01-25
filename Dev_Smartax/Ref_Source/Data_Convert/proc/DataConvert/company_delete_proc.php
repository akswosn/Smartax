<?php
	require_once("../../class/Utils.php");
	require_once("../../class/ConvertWork.php");

	$toWork = new ConvertWork();
	
	//localhost/FarmSaver/proc/DataConvert/company_delete_proc.php?co_id=29
	//localhost/FarmSaver_Data_Convert/proc/DataConvert/company_delete_proc.php?co_id=2
	
	//91,84,85,86,88,54,80,89,90,8,87
	
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=91
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=84
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=85
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=86
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=88
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=54
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=80
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=89
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=90
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=8
	//localhost/proc/DataConvert/company_delete_proc.php?co_id=87
	
	/*
	http://localhost/FarmSaver_Data_Convert/proc/DataConvert/company_delete_proc.php?co_id=
	
	
	*/
	try
	{
		$co_id=$_GET['co_id'];
		
		$toWork->createWork($_GET, false);
		
		$toWork->startTransaction();
		
		//company_member
		$delSql="DELETE FROM company_member WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//company_info
		$delSql="DELETE FROM company_info WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//customer
		$delSql="DELETE FROM customer WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//gicho_detail
		$delSql="DELETE FROM gicho_detail WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//gicho_master
		$delSql="DELETE FROM gicho_master WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//gycode
		$delSql="DELETE FROM gycode WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//jakmok
		$delSql="DELETE FROM jakmok WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//junpyo
		$delSql="DELETE FROM junpyo WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//work_cd
		$delSql="DELETE FROM work_cd WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//work_jakmok
		$delSql="DELETE FROM work_jakmok WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//workdairy
		$delSql="DELETE FROM workdairy WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//일정  --> Complete
		$delSql="DELETE FROM memorial_day WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//상품 그룹 --> Complete
		$delSql="DELETE FROM item_grp WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//상품  --> Complete
		$delSql="DELETE FROM item WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//입고 마스터 -> 
		$delSql="DELETE FROM input_master WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//입고 디테일 
		$delSql="DELETE FROM input_detail WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//출고 마스터 -> 
		$delSql="DELETE FROM output_master WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//출고 디테일
		$delSql="DELETE FROM output_detail WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//주문 마스터
		$delSql="DELETE FROM jumun_master WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
				
		//주문 디테일
		$delSql="DELETE FROM jumun_detail WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		//부가세 add_tax
		$delSql="DELETE FROM add_tax WHERE co_id=$co_id;";
		$toWork->updateSql($delSql);
		
		
		$toWork->commit();
		echo "Del Complete --> $co_id";
		$toWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$toWork->rollback();
		$toWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>