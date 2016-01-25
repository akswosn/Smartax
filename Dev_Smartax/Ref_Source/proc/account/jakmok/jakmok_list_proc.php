<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJakmokWork.php");

	$jWork = new DBJakmokWork(true);

	try
	{
		$jWork->createWork($_POST, true);
		$res = $jWork->requestList();
		
		$item = $jWork->fetchMixedRow();
		
		echo '{ CODE: "00", ';
		echo 'DATA: [';
		
		if(count($item) > 0)
		{
			while(true)
			{
				$jcode = $item['jakmok_code'];
				$jcode = sprintf("%02d",$jcode);
				echo "{ jakmok_code : '$jcode' ,  jakmok_name : '$item[jakmok_name]' , use_yn : $item[use_yn] }";
				if($item=$jWork->fetchMixedRow()) echo ',';
				else break;
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		
		$jWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$jWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>