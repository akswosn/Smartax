<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);
		
	try
	{
		//$_POST : [login_id], [login_pw]
		$memWork->createWork($_POST, false);
		$res = $memWork->requestLogin();
		$memWork->destoryWork();
		
		if ($res)
		{
			unset($_SESSION['Login']);
			header("Location:../../route.php");
		}
		else
		{
			$_SESSION['isLoginFail'] = 'y';
			header("Location:../../route.php?contents=000");
		}
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>