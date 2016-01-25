<?php
	require_once("./class/Defines.php");
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBFaqWork.php");
	require_once("./class/Display.php");
	
	
	$faqWork = new DBFaqWork();
	$faqPost = null;
	//pageSize, pageGroupSize, maxPageIndex
	$faqWork->setPageInfo(10, 10, 100);
	$total_count = 0;

	try
	{
		//$_GET : ['pg_inx'], (['svalue']) 검색 옵션
		$faqWork->createWork($_GET, FALSE);
		$total_count = $faqWork->requestList();
 	}
  	catch (Exception $e)
	{
		$faqWork->destoryWork();
		echo $e->getMessage();
		exit;
	}
	
	function displayFaqList($bWork)
	{
		$idx = 1;
		while($post=$bWork->fetchMapRow())
		{
			?>
			<div class="support_fag_menu">
				<span class="faq_menu_num"><?=$idx?></span> <!-- 여기에 번호가 들어옵니다. -->
				<?=Util::changeHtmlSpecialchars($post['faq_ques'])?>
				
				<?   
					if(DBFaqWork::isWriteTable($_GET['tbl_kind']))
					{
				?>
				<a class="faq_btn_modify" href="./faq_write_form.php?wtype=2&tbl_kind=<?=$_GET['tbl_kind']?>&faq_id=<?=$post['faq_id']?>">
					<img src="../../img/board/ico_write.png" alt="수정">
				</a>
				<a class="faq_btn_delete" href="../../../proc/board/faq_delete_proc.php?tbl_kind=<?=$_GET['tbl_kind']?>&faq_id=<?=$post['faq_id']?>">
					<img src="../../img/board/ico_delete.png" alt="삭제">
				</a>
				<?
					}
				?>
			</div>
			<div class="support_fag_menuitem" dir="./faq_view.php?tbl_kind=<?=$_GET['tbl_kind']?>&faq_id=<?=$post['faq_id']?>"></div>
			<?
			$idx++;
		}
	}
?>
<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>태극회계 자주 묻는 질문들</span>
			<small>전국 농업인들의 사랑을 받는 태극회계 프로그램</small>
		</h2>	
	</div>
	<div class="content-inner">
		
		<div class="faq_tab_menu">
			<a href="#" data-tbl="1" data-pgn="1"><span>회계</span></a>
			<a href="#" data-tbl="2" data-pgn="1"><span>재고</span></a>
		</div>
		
		<div id="faq_search_area">
			<form method="get" action="./faq_list.php">
				<input type="text" name="svalue" value="">
				<input type="hidden" name="pg_inx" value="1">
				<input type="submit" id="faq_search_btn" value="">
			</form>
		</div>
		
		<div id="faq_contents">
			<div class="faq_head">
				<span class="faq_head_num">번호</span>
				<span class="faq_head_title">제목</span>
			</div>
				<?
					if($total_count>0) displayFaqList($faqWork);
				?>
		</div>
	
		<div class="list_page_area" >
				<?
					//페이지 번호 구현부
					Display::pageNumber($total_count, $faqWork, './faq_list.php', $_GET['tbl_kind'] , $_GET['pg_inx']);
				?>
		</div>
		<div id="faq_tool_btns">
			<?   
				if(DBFaqWork::isWriteTable($_GET['tbl_kind']))
				{
			?>
			<a href="./faq_write_form.php?wtype=1&tbl_kind=<?=$_GET['tbl_kind']?>">
				<img src="../../img/board/write_btn.gif" alt="글쓰기">
			</a>
			<?
				}
			?>
		</div>
		
	</div>
</div>
<script type="text/javascript" src="./js/vendor/ljquery-0.0.1.js"></script>
<script>
(function(){
	//url에서 파라미터 받아옴
    var paramArray = location.search.substr(1).split('&');
    var param = new Object();
    for (var i = 0, len = paramArray.length; i < len; i++) {
        var temp = paramArray[i].split('=');
        param[temp[0]] = temp[1];
    }
    
    //tbl_kind 값과 같은 탭 메뉴 활성화
    if (param.tbl_kind) {
        $('.faq_tab_menu a').filter('[data-tbl=' + param.tbl_kind + ']').addClass('on');
    }
    
    //탭 메뉴 클릭시 현재 iframe에 새로고침
    $('.faq_tab_menu a').click(function(){
        var popup = $(parent.document).contents().find('#board_iframe');
        popup.attr('src', './board/faq_list.php?tbl_kind=' + $(this).data('tbl') + '&pg_inx=' + $(this).data('pgn'));
    });
    
    //arc.setMenuPadding('10px','5px');
    //arc.setMenuBgImage('popup/images/title_img.gif','left top');
    //arc.setAccordionOption({ showEvent:'mousedown' });
    
    var arc = new $lj.Accordion('support_fag_menu', 'support_fag_menuitem', '25px');
    arc.applyAccordion();
}())
</script>