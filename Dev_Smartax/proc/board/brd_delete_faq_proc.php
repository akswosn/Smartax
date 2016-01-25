<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork(true);

	try
	{
		//$_GET : ['post_id'], ['tbl_kind'], ['poster_uid']
		$brdWork->createWork($_GET, true);
		$res = $brdWork->requestDelete2();
		$brdWork->destoryWork();
		
		if ($res)
		{
			header("Location:../../view/board/board_list_faq.php?tbl_kind=" . $_GET['tbl_kind'] . "&pg_inx=".$_GET['pg_inx']. "&t_idx=".$_GET['t_idx']);
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