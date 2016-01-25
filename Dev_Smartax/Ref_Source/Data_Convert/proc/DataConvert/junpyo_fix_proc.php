<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");

	$listWork = new DBWork();
	$updateWork = new DBWork();
	//localhost/FarmSaver/proc/DataConvert/junpyo_fix_proc.php
	try
	{
		$co_id = $_GET['co_id'];
		$listWork->createWork(-1,$login_id);
		$updateWork->createWork(-1,$login_id);
		
		$listWork->querySql("SELECT * FROM junpyo where co_id=$co_id AND jp_view_gubun>4 AND jp_view='y';");
		$idx=0;
		while($row=$listWork->fetchMapRow())
		{
			$jp_rem=$row['jp_rem'];
			if($jp_rem=='')continue;
			$jp_id=$row['jp_match_id'];
			
			$updateWork->updateSql("UPDATE junpyo SET `jp_rem` = '$jp_rem' WHERE co_id=$co_id AND jp_id=$jp_id;");
			$idx++;
		}
		
		$listWork->destoryWork();
		$updateWork->destoryWork();
		
		echo $idx;
	}
  	catch (Exception $e) 
	{
		$listWork->destoryWork();
		$updateWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>