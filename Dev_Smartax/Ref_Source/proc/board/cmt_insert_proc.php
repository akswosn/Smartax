<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork(true);

	try
	{
		//$_POST : ['post_id'], ['tbl_kind'], ['cmt_message']
		$brdWork->createWork($_POST, true);
		//댓글 추가
		$cmtid = $brdWork->requestCommentInsert();
		$brdWork->destoryWork();

		echo "<result><code>y</code><data>$cmtid</data></result>";
	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		$errmsg = $e->getMessage();
		Util::serverLog($e);
		echo "<result><code>n</code><data>$errmsg</data></result>";
		exit;
	}
?>