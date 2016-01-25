<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../class/DBAdminWork.php");

	$aWork = new DBAdminWork(true);

	try
	{
		$aWork->AdminCreateWork(-1, true);
		$res = $aWork->requestMemberList();
		
		$result=array();
		while($item=$aWork->fetchMapRow())
		{
			array_push($result,$item);
		};
		
		echo '{ CODE: "00", ';
		echo 'DATA: '.json_encode($result).' }';
		
		$aWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>