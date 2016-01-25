<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");
	
	$brdWork = new DBBoardWork();
	$brdPost = null;
	
	$contents = $_GET['contents'];
	
	try
	{
		$brdWork->createWork($_GET, $chk);
		$brdPost = $brdWork->requestPost3();
		
		if ($brdPost==null) {
			throw new Exception('Board view error.');
		}
		
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


	<?
		require '../common/content_iframe_header.html';
	?>
	<script>
		function iResizeManage()
		{
			//console.log('iResizeManage');
		    //var bdy = $('body');
		    var area = $('#board_msg');
		    
		    
		    //var nHeight = bdy.height() + parseInt(bdy.css('padding-top'), 10) + parseInt(bdy.css('padding-bottom'), 10)+2; 
		    var nHeight = parseInt(area.height(), 10) + parseInt(area.css('padding-top'), 10) 
		    					+ parseInt(area.css('padding-bottom'), 10)+400;
		    //console.log('iResizeManage  -> '+nHeight);
		        
		    //parent.jQuery('#container iframe').height(nHeight);
		    parent.jQuery('#iframe_board').height(nHeight);
		}
		
		$(document).ready(function()
		{
		    
		   //iResizeManage();
		    setTimeout(iResizeManage, 10);
		    
		});
	</script>

	<div class="menuwrap">
			<div class="mid">
				<img src="../../images/TaxInfo/headtitle.png" width="1100" height="95">
			</div>
	</div>

<!-- 상단 네이게이션, 사진바 종료 -->

<!-- 게시판 시작 -->

	    <div class="menuwrap_board">
			<div class="mid_1"> 
					<div class="board_title">제 목&emsp; &emsp; |</div>					
					<div class="board_title1"><?=Util::changeHtmlSpecialchars($brdPost->post_title)?></div>
			</div>
		</div>


		
		<div class="menuwrap">
	
		<div class="portlet">
			<div class="ptl">
					<table class="">
						<colgroup>
							<col width="800">
						</colgroup>
						<thead>
						<div class="firstline">
								<th  class="title" scope="col">&emsp; &emsp; 작성일 &emsp; | &emsp; &emsp; <?=$brdPost->post_date?></th>
						</div>
						</thead>
						<tbody>
								<tr id="board_msg">
									<td class="title_con tax_msg"><?=$brdPost->post_message?></td>
								</tr>
								<?
								if($brdPost->post_id<$infoPost_prev[0])
								{
									$infoPost_next = $infoPost_prev;
									$infoPost_prev[0] = '';
								}	
								
									if($infoPost_prev[0]!='')
									{
								?>
									<tr>
										
											<td class="title_pre_next">
												&emsp; <img class="title_bottom_btn" src="../../images/board/up.png" alt="처음으로 가기">&emsp;  이전글 &emsp; 
												<a href="./board_view.php?post_id=<?=$infoPost_prev[0]?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>">
												<?=$infoPost_prev[1]?>
												</a>		
											</td>
										
									</tr>
								<?
									}
								?>
							</div>
							<div>
								<?
									if($infoPost_next[0]!='')
									{
								?>
									<tr>
										
											<td class="title_pre_next">
												
												&emsp; <img class="title_bottom_btn" src="../../images/board/down.png" alt="처음으로 가기">&emsp;  다음글 &emsp; 
												<a href="./board_view.php?post_id=<?=$infoPost_next[0]?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>">
												<?=$infoPost_next[1]?>
												</a>		
											</td>
										
									</tr>
								<?
									}
								?>
						</tbody>
					</table>
                    
					<a href="./board_list.php?tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>">
						<div class="contlist_btn">목차</div>
					</a>
					<?
					if($tblKind == 11 & Util::isAdminUser())
					{
					?>
					<a href="../../proc/board/brd_delete_proc.php?post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>&poster_uid=<?=$brdPost->poster_uid?>&pg_inx=<?=$pg_inx?>">
						<div class="contlist_btn">삭제</div>
					</a>
					<a href="./board_write.php?tbl_kind=<?=$tblKind?>&pg_inx=<?=$pg_inx?>&post_id=<?=$brdPost->post_id?>&poster_uid=<?=$brdPost->poster_uid?>&wtype=3">
						<div class="contlist_btn">수정</div>
					</a>
					
					<?
					}
					?>
					
		   </div>		
					


		</div>
		</div>














<!-- 
<div class="content">
    <div class="content-title">
        <h2 class="content-title-inner">
            <? displayContetnsTitle() ?>
            <small>전국 농업인들의 사랑을 받는 태극회계 프로그램</small>
        </h2>   
    </div>
    <div class="content-inner">
        <div class="form-search-01">
            <form method="get" action="./route.php">
                <select name="stype" style="width: 80px;">
                    <option value="2">제목</option>
                    <option value="1">작성자</option>
                </select>
                <input type="text" name="svalue" style="width: 240px;">
                <input type="hidden" name="contents" value="<?=$_GET['contents']?>">
                <input type="hidden" name="tbl_kind" value="<?=$_GET['tbl_kind']?>">
                <input type="hidden" name="pg_inx" value="1">
                <input type="submit" class="btn-flow-black" value="검색">
            </form>
        </div>
        <table class="board-view-01">
            <caption>게시글 목록</caption>
            <colgroup>
                <col style="width:7%;">
                <col style="width:54%;">
                <col style="width:7%;">
                <col style="width:18%;">
                <col style="width:7%;">
                <col style="width:7%;">
            </colgroup>
            <thead>
                <tr>
                	<th scope="row">제목</th>
                    <th scope="col" colspan="5"><?=Util::changeHtmlSpecialchars($brdPost->post_title)?></th>
                </tr>
                <tr>
                    <th scope="row">글쓴이</th>
                    <td><?=$brdPost->poster_nick?></td>
                    <th scope="row">작성일</th>
                    <td><?=$brdPost->post_date?></td>
                    <th scope="row">조회수</th>
                    <td><?=$brdPost->readn?></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="board-view-contents alignL" colspan="6">
                        <?=$brdPost->post_message?>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="board-bottom">
            <div class="board-button">
                <a class="btn-flow-black" href="javascript:history.back()">목록</a>
                <? if (Util::isWriteTable($_GET['tbl_kind'])) { ?>
                <a class="btn-flow-black" href="./route.php?contents=202&wtype=2&post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>">답글</a>
                <a class="btn-flow-black" href="./route.php?contents=202&wtype=3&post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>&poster_uid=<?=$brdPost->poster_uid?>">수정</a>
                <a class="btn-flow-black" href="./proc/board/brd_delete_proc.php?post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>&poster_uid=<?=$brdPost->poster_uid?>">삭제</a>
                <? } ?>
            </div>
        </div>
        <div id="board_comment_area">
			<div id="board_comment_list">
				<div class="board_comment_list_item">
					<span style="font-weight: bold; color:#3b3b3b;">&nbsp;</span>
					<span style="color:#b0b0b0;">&nbsp;</span>
					<p class="board_comment_list_contents"></p>
					<a class="board_comment_edit" href="./proc/board/cmt_edit_proc.php">수정</a>
					<a class="board_comment_delete color-02" href="./proc/board/cmt_delete_proc.php">삭제</a>
					<input type="hidden" value="0">
					<input type="hidden" value="0">
				</div>
			</div>
			
			<?   
				if(Util::isWriteTable($_GET['tbl_kind']))
				{
			?>
			<div id="board_comment_write">
				<textarea class="board_comment_write_contents"></textarea>
				<a class="board_comment_submit" href="./proc/board/cmt_insert_proc.php">등록</a>
			</div>
			<?
				}
			?>
			
			<input type="hidden" value="<?=$brdPost->post_id?>">
			<input type="hidden" value="<?=$tblKind?>">
			<input type="hidden" value="<?=$_SESSION['uid']?>">
			<input type="hidden" value="<?=$_SESSION['nickname']?>">
		</div>
    </div>
</div> -->