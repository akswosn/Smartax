<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../class/DBAdminWork.php");

	$aWork = new DBAdminWork(true);

	try
	{
		//$_POST : [login_id], [login_pw]
		$aWork->AdminCreateWork($_POST, false);
		$res = $aWork->requestLogin();
		$aWork->destoryWork();
 		
		if($res) 
		{
			//성공
			echo " { 'CODE' : '00' }";
		}
		else
		{
			//실패
			echo " { 'CODE' : '99' }";
		}
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		echo " { 'CODE' : '99' }";
		Util::serverLog($e);
		exit;
	}
?>