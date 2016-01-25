<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");

	$listWork = new DBWork();
	$updateWork = new DBWork();
	//localhost/FarmSaver/proc/DataConvert/junpyo_fix_customer_proc.php
	//localhost/proc/DataConvert/junpyo_fix_customer_proc.php
	try
	{
		$co_id = $_GET['co_id'];
		$listWork->createWork(-1,$login_id);
		$updateWork->createWork(-1,$login_id);
		
		$listWork->querySql("SELECT * FROM junpyo WHERE jp_view = 'y' and jp_view_gubun>4;");
		$idx=0;
		
		$updateWork->startTransaction();
		while($row=$listWork->fetchMapRow())
		{
			$customer_id=$row['customer_id'];
			if($customer_id==0)continue;
			$jp_id=$row['jp_match_id'];
			if($jp_id==0) throw new Exception($row['jp_id']);
			
			$updateWork->updateSql("UPDATE junpyo SET `customer_id` = $customer_id WHERE jp_id=$jp_id;");
			$idx++;
		}
		$updateWork->commit();
		
		$listWork->destoryWork();
		$updateWork->destoryWork();
		
		echo $idx;
	}
  	catch (Exception $e) 
	{
		$listWork->destoryWork();
		$updateWork->rollback();
		$updateWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>