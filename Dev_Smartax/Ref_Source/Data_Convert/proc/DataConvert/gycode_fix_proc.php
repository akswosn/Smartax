<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");

	$iWork = new DBWork();
	$toWork = new DBWork();
	
	//kimgj1212
	//choice4410
	
	//localhost/FarmSaver/proc/DataConvert/gycode_fix_proc.php?id=kimgj1212
	
	//http://localhost/FarmSaver/proc/DataConvert/data_convert_proc.php?id=choice4410
	//localhost/proc/DataConvert/gycode_fix_proc.php?id=choice4410
	
	try
	{
		$login_id=$_GET['id'];
		
		$fromWork->createWork($_GET,$login_id);
		$toWork->createWork($_GET, false);
		
		$toWork->querySql("SELECT co_id FROM farmsaver.company_member A , user_info B WHERE B.user_id='$login_id' AND A.uid=B.uid;");
		$uid=0;
		
		while($row=$toWork->fetchMixedRow())
		{
			$uid=(int)$row['uid'];
			$co_list['001']=(int)$row['co_id'];
		}
		//계정 ->덮어쓰는 것 가능 
		echo "--> convertGycode<br>";
		$result['gycode']=ConvertUtils::convertGycode($fromWork,$toWork,$co_list,$uid);
		
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