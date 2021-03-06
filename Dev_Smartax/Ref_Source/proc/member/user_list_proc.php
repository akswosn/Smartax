<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);

	try
	{
		$memWork->createWork(-1, false);
		$res=$memWork->requestUserList();
		
		if($res==null)
		{
			$res->CODE='99';
		}
		else
		{
			$res->CODE='00';
		}
		echo json_encode($res);
		
		$memWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>