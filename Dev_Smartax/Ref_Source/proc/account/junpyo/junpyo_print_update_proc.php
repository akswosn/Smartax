<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJunpyoWork.php");

	$gWork = new DBJunpyoWork(true);

	try
	{
		$gWork->createWork($_POST, true);
		$res = $gWork->requestPrintUpdate();
		$gWork->destoryWork();
		
		echo  "{ CODE: '00', DATA : ".json_encode($res)."}";
		/*
		echo "{ CODE: '00', ";
		echo "DATA: [";
		
		if(count($res) > 0)
		{
			for($idx=0;$idx<count($res);$idx++){
					echo "{ cd: '".$res[$idx]['code']."', jp_id: '".$res[$idx]['jp_id']."', jp_match_id: '".$res[$idx]['jp_match_id']."', jp_no: '".$res[$idx][$i]['jp_no']."', jp_yyyymmdd: '".$res[$idx][$i]['jp_yyyymmdd']."' },";
			}
			echo "]}";
		}
		else
		{
			echo ']}';	
		}
		
		 */
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