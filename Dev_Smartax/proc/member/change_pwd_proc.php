<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");

	$memWork = new DBMemberWork(true);

	try
	{
		//$_POST : [value], [type]
		$memWork->createWork($_POST, false);
		//$memWork->createWork($_GET, false);
		$code = $memWork->changePwd();
		$memWork->destoryWork();
		
		echo "<result><code>$code</code></result>";
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		$code = 'n';
		$res = $e->getMessage();
		echo "<result><code>$code</code><data>$res</data></result>";
	}
		
?>