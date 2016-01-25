<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBInquireBoardWork.php");
	
	$mWork = new DBInquireBoardWork(true);
	try
	{
		$mWork->createWork($_POST, true);
		$ret = array();
		$res = $mWork->insertInquireBoard();
		$mWork->destoryWork();
		
		if($res != null){
			header("Location:../../../route.php?contents=011");
		}
		else {
			throw new Exception('문의 등록 실패');
		}
	}
  	catch (Exception $e) 
	{
		$mWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		
		echo $err;
	}
?>