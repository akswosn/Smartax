<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");
	require_once("../../class/Display.php");
	
	
	$brdWork = new DBBoardWork();
	//pageSize, pageGroupSize, maxPageIndex
	$brdWork->setPageInfo(20, 10, 100);
	$total_count = 0;

	try
	{
		//$_GET : ['tbl_kind'], ['pg_inx'], (['stype'], ['svalue']) 검색 옵션, 생략하면 전체 게시글 
		$brdWork->createWork($_GET, FALSE);
		$total_count = $brdWork->requestList();
 	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		echo $e->getMessage();
		exit;
	}

	function displayBoardList($bWork)
	{
		$tblKind = $_GET['tbl_kind'];
		
		while($post=$bWork->fetchMixedRow())
		{
			$step = strlen($post['group_level']) - 1;
			
			$gap = "";
			for($i=0; $i<$step; $i++)
				$gap = "&nbsp;&nbsp;&nbsp;" . $gap;
			
			if($step>0) $gap = $gap . '<img src="../../img/board_reply_icon.gif">';
			
			$post['post_date']
			?>
				<tr>
					<td><?=$post['post_id']?></td>
					<td class="ellipsis">
						<?=$gap?> 
						<a href="./brd_view.php?post_id=<?=$post['post_id']?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$_GET['pg_inx']?>">
							<?=Util::changeHtmlSpecialchars($post['post_title'])?>
						</a>
						<?
							if($post['comment_count']>0) 
							{
								?>
								<font color="#048CB6">&nbsp;[<?=$post['comment_count']?>]</font>
								<?
							}
						?>
					</td>
					<?
						if($_GET['tbl_kind']!=67)
						{
					?>
						<td><?=$post['poster_nick']?>&nbsp;</td>
					<?
						}
					?>
					<td><?=substr($post['post_date'],0,10)?>&nbsp;</td>
					<td><?=$post['readn']?>&nbsp;</td>
				</tr> 
			<?
		}
	}
?>

<!DOCTYPE html>
<html>

<head>

<?
	require '../cmnview/content_iframe_header.html';
?>

	<link rel="stylesheet" href="../../css/board/brd_list.css"/>
	<script src="../../js/board/brd_list.js"></script>
</head>

<body>
	<div id="board_list_area"> 
		<table id="board_list_table">
			<thead align="center">
				<tr>
					<td width="15%">번호</td> 
					<td width="40%">제목</td> 
					<?
						if($_GET['tbl_kind']!=67)
						{
					?>
						<td width="15%">글쓴이</td> 
					<?
						}
					?>
					<td width="20%">작성일</td> 
					<td width="10%">조회</td>
				</tr>
			</thead>
			<tbody align="center">
				<?
					if($total_count>0) displayBoardList($brdWork);
				?>
			</tbody>
		</table>
	</div>
	<div id="board_tool_btns">
		
		<span id="board_search_area">
			<form method="get" action="./brd_list.php">
				<select name="stype" value="<?=$_GET['stype']?>">
					<?
						if($_GET['tbl_kind']!=67)
						{
					?>
						<option value="1">작성자</option>
					<?
						}
					?>
					<option value="2">제목</option>
					<option value="3">글번호</option>
				</select>
				<input type="text" name="svalue" value="<?=$_GET['svalue']?>" id="svalue">
				<input type="hidden" name="tbl_kind" value="<?=$_GET['tbl_kind']?>">
				<input type="hidden" name="pg_inx" value="1">
				<input type="submit" value="검 색" id="search_btn">
			</form>
		</span>
		
		<?
		if(!((int)$_GET['tbl_kind']!=11&&(int)$_GET['tbl_kind']!=12&&(int)$_GET['tbl_kind']!=13))
		{
			if((int)$_SESSION['uid']==1)
			{
				?>
				<a href="./brd_write_form.php?wtype=1&post_id=0&tbl_kind=<?=$_GET['tbl_kind']?>" id="write_btn" data-tbl="<?=$_GET['tbl_kind']?>">
					<span id="brd_write_btn">글쓰기</span>
				</a>
				<?		
			}
		}
		else if((int)$_SESSION['uid'])
		{
				?>
				<a href="./brd_write_form.php?wtype=1&post_id=0&tbl_kind=<?=$_GET['tbl_kind']?>" id="write_btn" data-tbl="<?=$_GET['tbl_kind']?>">
					<span id="brd_write_btn">글쓰기</span>
				</a>
				<?
		}
		?>
	</div>
	
	
	<div class="list_page_area">
		<?
			//페이지 번호 구현부
			//Display::pageNumber($total_count, $brdWork, './brd_list.php', 'tbl_kind='.$_GET['tbl_kind'], $_GET['pg_inx']);
			Display::pageNumberSearch($total_count, $brdWork, './brd_list.php', 'tbl_kind='.$_GET['tbl_kind'], $_GET['pg_inx'],$_GET['stype'],$_GET['svalue']);
		?>
	</div>

</body>
</html>

<?
	$brdWork->destoryWork();
?>


