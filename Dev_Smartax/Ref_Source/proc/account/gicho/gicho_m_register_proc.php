<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBGichoWork.php");

	$gWork = new DBGichoWork(true);

	try
	{
		$gWork->createWork($_POST, true);
		$res = $gWork->requestMasterInsertArray();
		$gWork->destoryWork();
		
		//저장 100
		//저장 오류 101
		//삭제 200
		//삭제 오류 201		
		//업데이트 300
		//업데이트 오류 301
		//쿼리 오류 99
		
		// 리턴
		echo "{ CODE: '00', DATA:".json_encode($res)." }";
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