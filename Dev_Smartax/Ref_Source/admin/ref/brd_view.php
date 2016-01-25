<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork();
	$brdPost = null;

	try
	{
		//$_GET : ['post_id'], ['tbl_kind'] 
		/*
		if(!((int)$_GET['tbl_kind']!=11&&(int)$_GET['tbl_kind']!=12&&(int)$_GET['tbl_kind']!=13))
		//if((int)$_GET['tbl_kind']>10&&(int)$_GET['tbl_kind']<14)
			$brdWork->createWork($_GET, false);
		else
			$brdWork->createWork($_GET, true);
		*/
		$brdWork->createWork($_GET, false);
		
		$brdPost = $brdWork->requestPost();
		
		//다음 결과를 가져온다
		$avatar_wear = $brdWork->fetchArrayRow();
		
		$brdWork->nextQueryResult();
		$infoPost_prev = $brdWork->fetchArrayRow();
		$infoPost_next = $brdWork->fetchArrayRow();
		
		//테이블명
		$brdPost->tname=$brdWork->getTableName($_GET['tbl_kind']);
		
		if($brdPost==null) 
			throw new Exception('Board view error.');
		
		$brdWork->destoryWork();
		
		$tblKind = $_GET['tbl_kind'];
		$pg_inx = $_GET['pg_inx'];
	}
	catch (Exception $e)
	{
		$brdWork->destoryWork();
		echo $e->getMessage();
		exit;
	}
?>

<!DOCTYPE html>
<html>

<head>
	
<?
	require '../cmnview/content_iframe_header.html';
?>
	<link rel="stylesheet" href="../../css/board/brd_view.css"/>
	<script src="../../js/board/avatar_canvas.js"></script>
	<script src="../../js/board/brd_view.js"></script>
</head>

<body>

<h3 id="board_view_subject">
	<?=Util::changeHtmlSpecialchars($brdPost->post_title)?>
	<div>
		  <?=$brdPost->post_date?>  
	</div>
</h3>
<div id="board_view_body">
	<div id="board_view_info">
		<div>
			<?
				if($_GET['tbl_kind']!=67)
				{
			?>
			글쓴이 : <?=$brdPost->poster_nick?>
			<?
				}
			?>
		</div>
		<div>조회 : <?=$brdPost->readn?> </div>
	</div>
	
	<?
		if($_GET['tbl_kind']!=11&&$_GET['tbl_kind']!=12&&$_GET['tbl_kind']!=13&&$_GET['tbl_kind']!=67)
		{
	?>
	<div id="board_avatar_area">
		<canvas width="120px" height="120px"></canvas>
		<input type="hidden" value="<?=$avatar_wear[0]?>">
	</div>
	<?
		}
	?>
	
	<?
		echo $brdPost->pic_data1;
		
		if($brdPost->pic_data1)
		{
	?>
	<div id="board_view_img">
		<img src="../../upload/<?=$brdPost->tname?>/<?=$brdPost->pic_data1?>" alt="이미지">
	</div>
	<?
		}
	?>
	<div id="board_view_content">
		<?=Util::cleanBoardTags($brdPost->post_message)?>
	</div>
	
	<div id="board_prev_next">
		<div>
			<?
			if($brdPost->post_id<$infoPost_prev[0])
			{
				$infoPost_next = $infoPost_prev;
				$infoPost_prev[0] = '';
			}	
			
				if($infoPost_prev[0]!='')
				{
			?>
			<a href="./brd_view.php?post_id=<?=$infoPost_prev[0]?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>">
			<span class="img_click">이전</span> 
			</a>	
			<label id="prev_title"><?=$infoPost_prev[1]?></label>
			<?
				}
			?>
		</div>
		<div>
			<?
				if($infoPost_next[0]!='')
				{
			?>
			<label id="next_title"><?=$infoPost_next[1]?></label> 
			<a href="./brd_view.php?post_id=<?=$infoPost_next[0]?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>">
			<span class="img_click">다음</span> 
			</a>
			<?
				}
			?>
		</div>
	</div>
	
	<div id="board_banner">
		<div></div>
	</div>	
	<div id="board_view_btns">
		<a href="javascript:copyToClipboard();">
			<span>퍼가기</span>
		</a>
		<a href="#">
			<span></span>
		</a>
		<a id="report" href="../../proc/board/board_report_proc.php">
			<span>신고</span>
		</a>
		<a id="brd_list" href="./brd_list.php?tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>">
			<span>목록</span>
		</a>
		<?
		if((int)$_SESSION['uid'] == $brdPost->poster_uid || (int)$_SESSION['uid'] == 1)
		{
				?>
				<a id="delete" href="../../proc/board/brd_delete_proc.php">
					<span>삭제</span>
				</a>
				<?
		}
		?>
		<!--
		<a href="../community/strategy_board.php">
			<span>목록</span>
		</a>
		
		-->
	</div>
	
	<?
	//if((int)$_GET['tbl_kind']!=11&&(int)$_GET['tbl_kind']!=13)
	//		{
	?>
	<div id="board_comment_area">
		<!--
		<p>댓글 : <span id="comment_total_count">3</span></p>
		-->
		<div id="board_comment_list">
			<!-- 여기는 차후에 ajax 콜로 데이터가 채워진다.-->
			<div>
				<div style="float:right">
					<!--
					<a class="board_comment_edit" href="../../proc/board/cmt_edit_proc.php">수정</a>|
					-->
					<a class="board_comment_delete" href="../../proc/board/cmt_delete_proc.php">삭제</a>
				</div>
				<?
				if($_GET['tbl_kind']!=67)
					{
				?>
					<span style="font-weight: bold; color:#ffffff;" class="comment_nick">배달</span>
				<?
					}
				?>
				<span style="color:#b0b0b0;" class="comment_date">2012/08/04</span>
				<p></p>
				<input type="hidden" value="0"><!-- comment_id -->
				<input type="hidden" value="0"><!-- comment writer user_id -->
			</div>
		</div>
		
		<?
			if($_SESSION['uid'] !=0)
			{
		?>
		<div id="board_comment_write">
			<span>꼬리말 달기</span>
			<textarea></textarea>
			<a href="../../proc/board/cmt_insert_proc.php">
				<span>등록</span>
			</a>
		</div>
		<?
			}
		?>
		<input type="hidden" value="<?=$brdPost->post_id?>">
		<input type="hidden" value="<?=$tblKind?>">
		<input type="hidden" value="<?=$_SESSION['uid']?>">
		<input type="hidden" value="<?=$_SESSION['user_nick']?>">
		<input type="hidden" value="<?=$pg_inx?>">
	</div>
</div>	
<?
		//}
?>
</body>
</html>