<?php
	require_once("../../class/DBWork.php");

	session_start();

	if (isset($_SESSION[DBWork::sessionKey]))
	{
		unset($_SESSION[DBWork::sessionKey]);
		unset($_SESSION[DBWork::companyKey]);
		session_destroy();
	}

	header("Location:../../route.php");
?>