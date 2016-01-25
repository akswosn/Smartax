<?php
	require_once("../class/Utils.php");
	require_once("../class/DBWork.php");
	require_once("../class/DBMemberWork.php");

	$memWork = new DBMemberWork();

	try
	{
		$memWork->createWork(-1, false);
		$memWork->requestGetConfig();
		if($item = $memWork->fetchMixedRow())
			echo "{ CODE: '00' , DATA : '$item[config]' }";
		else
			echo "{ CODE: '00' }";
		
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