<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBGichoWork.php");

	$gWork = new DBGichoWork(true);

	try
	{
		$gWork->createWork($_POST, true);
		$res = $gWork->requestMasterList();
		
		
		$item=$gWork->fetchMixedRow();
		
		echo '{ CODE: "00", ';
		
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				if($item['gycode']>199)
					$gy_am=$item['credit']-$item['debit'];
				else
					$gy_am=$item['debit']-$item['credit'];
				
				echo "{ gycode : $item[gycode] ,  gy_am : $gy_am }";
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