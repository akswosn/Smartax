<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork(true);

	try
	{
		//$_POST : [brd_title], [brd_message], [post_id], [tbl_kind], [poster_uid]
		$brdWork->createWork($_POST, true);
		$wtype = $_POST['wtype'];
		
		
		if ($wtype == 3) 
		{ //게시글 수정인 경우 작성자의 user_id 가 넘어온다.
			$res = $brdWork->requestEdit2();
		}
		else { //새글이나 답글 추가
			$res = $brdWork->requestInsert2();	
		}
		
		$brdWork->destoryWork();
 
		if ($res)
		{
			if($wtype == 3) header("Location:../../view/board/board_list_faq.php?tbl_kind=" . $_POST['tbl_kind'] . "&pg_inx=".$_POST['pg_inx']."&t_idx=".$_POST['t_idx']);
			else header("Location:../../view/board/board_list_faq.php?tbl_kind=" . $_POST['tbl_kind'] . "&pg_inx=1&t_idx=".$_POST['t_idx']);
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