<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork(true);
	$errMsg = "";

	try
	{
		//$_POST : ['post_id'], ['tbl_kind'], ['cmt_message'], ['user_id'], ['comment_id']
		$brdWork->createWork($_POST, true);
		//댓글 수정
		$res = $brdWork->requestCommentEdit();
		$brdWork->destoryWork();
		
		if($res) $res = 'y';
		else 
		{
			$res = 'n';
			$errMsg = "댓글 수정 실패!";
		}
	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		$res = 'n';
		$errMsg = $e->getMessage();
		Util::serverLog($e);
	}
	
	echo "<result><code>$res</code><data>$errMsg</data></result>";
?>