<!-- 공지사항 게시판 -->
<?
	if($_GET['post_id'])
	{
?>
	<iframe id="iframe_board" style="min-height: 767px" width="100%" height="100%" frameborder="0" src="./view/board/board_view.php?tbl_kind=11&pg_inx=1&post_id=<?=$_GET['post_id']?>" scrolling="no"> 
	</iframe>
<?	
	}
	else 
	{
?>
	<iframe id="iframe_board" style="min-height: 767px" width="100%" height="100%" frameborder="0" src="./view/board/board_list.php?tbl_kind=11&pg_inx=1" scrolling="no"> 
	</iframe>
<?
	}
?>

