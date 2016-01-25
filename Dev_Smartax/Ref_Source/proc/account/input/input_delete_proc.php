<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBInputWork.php");

	$iWork = new DBInputWork(true);

	try
	{
		$iWork->createWork($_POST, true);
		$res = $iWork->requestDelArray();
		$iWork->destoryWork();
		
		// 리턴
		if($res) echo "{ CODE: '00', DATA:".json_encode($res)." }";
		else echo "{ CODE: '999' DATA: '마감된 연도 입니다.' }"; //마감 데이터
	}
  	catch (Exception $e) 
	{
		$iWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>