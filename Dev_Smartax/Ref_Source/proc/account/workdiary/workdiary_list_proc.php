<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBWorkDairyWork.php");

	$wWork = new DBWorkDairyWork(true);

	try
	{
		$wWork->createWork($_POST, true);
		$res = $wWork->requestSearch();
		
		//$item = $wWork->fetchMixedRow();
		
		$result=array();
		
		while($item = $wWork->fetchMapRow())
		{
			$tmp=null;
			$tmp=$item;
			$tmp['id']=$item['_id'];
			$tmp['jakmok_cd']= sprintf("%02d", $item['jakmok_cd']);
			$tmp['work_cd']=sprintf("%03d", $item['work_cd']);
			
			array_push($result,$tmp);
			
		}
		
		echo "{ CODE : '00' , DATA : ".json_encode($result)."}";
		
		/*
		echo '{ CODE: "00", ';
		
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				$wcode = $item['work_cd'];
				$wcode = sprintf("%03d",$wcode);
				$jcode = $item['jakmok_cd'];
				$jcode = sprintf("%02d",$jcode);
				
				
				
				echo "{ id: '$item[_id]', work_date : '$item[work_date]' ,  jakmok_cd: '$jcode', work_cd : '$wcode' , weather_cd : $item[weather_cd], ";
				echo " work_area : '$item[work_area]' ,  work_man : '$item[work_man]' , work_time : $item[work_time], ";
				echo " work_job : '$item[work_job]' ,  work_pic : '$item[work_pic]' }";
				if($item=$wWork->fetchMixedRow()) echo ',';
				else break;
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		 */
		$wWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$wWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>