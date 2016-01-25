<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork(true);

	try
	{
		//$_GET : ['post_id'], ['tbl_kind'], ['poster_uid']
		$brdWork->createWork($_GET, true);
		$res = $brdWork->requestDelete();
		$brdWork->destoryWork();
		
		if ($res)
		{
			header("Location:../../route.php?contents=200&tbl_kind=" . $_GET['tbl_kind'] . "&pg_inx=1");
		}
		else
		{
			echo "board delete fail!";
		}
	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		Util::serverLog($e);
		echo $e->getMessage();
		exit;
	}
?>