<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork(true);

	try
	{
		//$_POST : [brd_title], [brd_message], [post_id], [tbl_kind], [poster_uid]
		$brdWork->createWork($_POST, true);
		$puid = (int)$_POST['poster_uid'];
		
		if ($puid > 0) 
		{ //게시글 수정인 경우 작성자의 user_id 가 넘어온다.
			$res = $brdWork->requestEdit();
		}
		else { //새글이나 답글 추가
			$res = $brdWork->requestInsert();	
		}
		
		$brdWork->destoryWork();
 
		if ($res)
		{
			header("Location:../../route.php?contents=200&tbl_kind=" . $_POST['tbl_kind'] . "&pg_inx=1");
		}
		else
		{
			echo "board write fail!";
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