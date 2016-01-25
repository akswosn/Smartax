<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBGycodeWork.php");

	$gWork = new DBGycodeWork(true);

	try
	{
		$gWork->createWork(-1, true);
		$res = $gWork->requestList();
		
		
		$item=$gWork->fetchMixedRow();
		
		echo '{ CODE: "00", ';
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				$group = substr($item["gycode"], 0, 1); 
				echo "{ gycode : '$item[gycode]' ,  gy_name : '$item[gy_name]' ,  gy_rem : '$item[gy_rem]' ,  gy_group: '$group', use_yn : $item[use_yn], modify_yn : $item[modify_yn] }";
				if($item=$gWork->fetchMixedRow()) echo ',';
				else break;
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		
		$gWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$gWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>