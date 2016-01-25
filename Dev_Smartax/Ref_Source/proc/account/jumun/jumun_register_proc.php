<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJumunWork.php");

	$jWork = new DBJumunWork(true);

	try
	{
		$jWork->createWork($_POST, true);
		$res = $jWork->requestRegArray();
		$jWork->destoryWork();
		
		// 리턴
		if($res) echo "{ CODE: '00', DATA:".json_encode($res)." }";
		else echo "{ CODE: '999' DATA: '마감된 연도 입니다.' }"; //마감 데이터
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