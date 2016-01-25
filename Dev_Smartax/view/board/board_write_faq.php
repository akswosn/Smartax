<?php
require_once ("../../class/Utils.php");
require_once ("../../class/DBWork.php");
require_once ("../../class/DBBoardWork.php");

$brdWork = new DBBoardWork();
$brdPost = null;

$title = '';
$message = '';

try {
	//wtype 이 수정하기 이면 puid 값이 셋팅된다.
	//$_GET : wtype, tbl_kind, pid, [puid]
	//wtype : 1(새글쓰기), 2(답글쓰기), 3(수정하기)
	//$brdWork->createWork($_GET, true);
	$brdWork -> createWork($_GET, false);

	$wType = (int)$_GET['wtype'];
	$tblKind = $_GET['tbl_kind'];
	//수정인 경우는 수정하려는 게시글의 아이디
	//답글인 경우는 원본의 게시글 아이디(새글인 경우는 0)
	$postid = (int)$_GET['post_id'];
	$puid = (int)$_GET['poster_uid'];
	$pg_inx = (int)$_GET['pg_inx'];
	$t_idx = $_GET['t_idx'];
	
	//게시글 작성자 아이디(수정인 경우만 넘어옴)

	//수정인 경우는 자신의 글인지 체크
	if ($wType == 3) {
		$uid = (int)($_SESSION['uid']);
		//if ($uid == 0) throw new Exception('Invalid Session.');
		//if ($uid != $puid && $_SESSION[DBWork::adminKey] == 9001) throw new Exception('Invalid request');
	}

	//답글이나 수정인 경우는 원본의 내용을 얻어온다.
	//2 or 3
	if ($wType > 1) {
		$brdPost = $brdWork -> requestPost2(1);
		//수정, 답글용으로 얻어온다.
		if ($brdPost == null)
			throw new Exception('Board error.');
	}

	$brdWork -> destoryWork();
} catch (Exception $e) {
	$brdWork -> destoryWork();
	echo $e -> getMessage();
	exit ;
}

//-----------------------------------------------
//	답글이나 수정인 경우는 원본의 내용을 셋팅한다.
//-----------------------------------------------
//답글
if ($wType == 2) {
	$title = "Re:" . Util::changeHtmlSpecialchars($brdPost -> post_title);
	$message = ">>\n" . Util::changeHtmlSpecialchars($brdPost -> post_message);
}
//수정
else if ($wType == 3) {
	$title = Util::changeHtmlSpecialchars($brdPost -> post_title);
	$message = Util::changeHtmlSpecialchars($brdPost -> post_message);
}

switch($_GET['t_idx'])
{
	case '1' : $tab1 = 'selected'; break;
	case '2' : $tab2 = 'selected'; break;
	case '3' : $tab3 = 'selected'; break;
	case '4' : $tab4 = 'selected'; break;
	case '5' : $tab5 = 'selected'; break;
	case '6' : $tab6 = 'selected'; break;
	default : $tab1 = 'selected'; break;
}
	
	
if ($wType == 2 || $wType == 3) 
{
	switch($brdPost -> tab_idx)
	{
		case '1' : $tab1 = 'selected'; break;
		case '2' : $tab2 = 'selected'; break;
		case '3' : $tab3 = 'selected'; break;
		case '4' : $tab4 = 'selected'; break;
		case '5' : $tab5 = 'selected'; break;
		case '6' : $tab6 = 'selected'; break;
		default : $tab1 = 'selected'; break;
	}
}
?>

<?
require '../common/content_iframe_header.html';
?>

<script type="text/javascript" src="../../js/vendor/jquery-1.11.1.min.js"></script>
<script>
	function iResizeManage()
	{
		parent.jQuery('#iframe_board').height(855);
	}
	
	$(document).ready(function(){
		iResizeManage();
	});
</script>
<div class="bdwrap">
	<div class="mid">
		<img src="../../images/FAQ/FAQ.png" width="1100" height="95">
	</div>
</div>

<div class="menuwrap">
	<div class="mid_1">
	<div class="menuwrap_board_write">
		<div class="board_title">
			글쓰기&emsp; &emsp; |
		</div>
		<div class="board_title1">
			게시판 글을 작성하는 공간입니다
		</div>
	</div>
	</div>
</div>

<div class="menuwrap" id="board_area">
	<form action="../../proc/board/brd_write_faq_proc.php" method="post">
	<div class="portlet">
		<div class="ptl">
			<div class="title_input">
				<div class="title">
					<span class="input_1_faq">&emsp; 제목 &emsp; &emsp;</span>
					<select id="faq_select" class ="selectStyle" name="t_idx">
						<option <?=$tab1?> value="1">이용안내</option>
						<option <?=$tab2?> value="2">회원가입</option>
						<option <?=$tab3?> value="3">이용요금</option>
						<option <?=$tab4?> value="4">장부기입</option>
						<option <?=$tab5?> value="5">세무신고</option>
					</select>
					<input class="input_1_faq" type="text" name="brd_title" value="<?=$title?>">
				</div>
			</div>
			<textarea id="board_ckeditor1" name="brd_message" draggable="false"><?=$message?></textarea>
			<script src="../../js/ckeditor/ckeditor.js"></script>
			<script>CKEDITOR.replace( 'board_ckeditor1', { width: '806px', height: 406 });</script>
			
			<input type="hidden" name="tbl_kind" value="<?=$tblKind?>">
			<input type="hidden" name="post_id" value="<?=$postid?>">
			<input type="hidden" name="poster_uid" value="<?=$puid?>">
			<input type="hidden" name="pg_inx" value="<?=$pg_inx?>">
			<input type="hidden" name="wtype" value="<?=$wType?>">
			<input type="button" class="input_btn" onclick="javascript:history.back();" value="취소">
			<input type="submit" class="save_btn" value="저장">
		</div>
	</div>
	</form>
</div>
