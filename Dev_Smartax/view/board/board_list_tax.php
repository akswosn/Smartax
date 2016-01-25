<?php
	require_once("../../class/Utils.php");				// Utils PHP 파일(글자형식 및 제한, 로그인 등)을 한번만 Require 한다.
	require_once("../../class/DBWork.php");             // DBWork PHP 파일(DB관련 정보)을 한번만 Require 한다.
	require_once("../../class/DBBoardWork.php");        // DBBoardWork PHP 파일(게시판 관련 정보)을 한번만 Require 한다.
	require_once("../../class/Display.php");            // Display PHP 파일(Display 정보 게시판 관련)을 한번만 Require 한다.
	
	$brdWork = new DBBoardWork();                   // brdWork에 새로운 DDBoardWork 함수를 선언한다(클래스를 생성하는 문법)
	//pageSize, pageGroupSize, maxPageIndex
	$brdWork->setPageInfo(3, 10, 30);             // setPageInfo함수에 파라미터로 (pageSize:20,pageGroupSize:10,maxPageIndex:100)을 지정한다
	$total_count = 0;                               // 토탈 카운트는 0부터 시작하는 것으로 한다.
	
	$contents = $_GET['contents'];                  // 컨텐츠는 '컨텐츠'에서 받는다
	//$_POST
	
	try                                            // 예외처리
	{
		//$_GET : ['tbl_kind'], ['pg_inx'], (['stype'], ['svalue']) 검색 옵션, 생략하면 전체 게시글 
		$brdWork->createWork($_GET, FALSE);        // brdWork는 createWork 함수에서 파라미터로 ($_GET, FALSE(거짓))을 지정한다.
		$total_count = $brdWork->requestList3();    // 토탈카운트는 brdwor에서 requestList함수의 결과를 받는다.
		
 	}
  	catch (Exception $e)        // e 예외지정
	{
		$brdWork->destoryWork();   // 예외일 경우 brdWork는 destoryWork함수를 받는다.
		echo $e->getMessage();     // e는 getMessage함수를 받는다.
		Util::serverLog($e);       // Util에 있는 서버로그함수에 e(getMessage함수)를 띄운다.
		exit;                      // 빠져나온다.
	}
	
	function displayBoardList($bWork)                 // displayBoardList함수에 파라미터를 bWork를 지정한다.
	{
		$tblKind = $_GET['tbl_kind'];                 // tblKind에 tbl_kind에서 get한 값을 넣는다.
		$contents = $_GET['contents'];                // contents에 contents에서 get한 값을 넣는다.
		
		while ($post = $bWork->fetchMixedRow())       // post가  bWork(함수 fetchMixedRow의 결과값을 받음)와 같다면
		{
			$step = strlen($post['group_level']) - 1; // step은 group_level를 Post한 길이 -1을 받는다 
			?>
				<div class="agrwrap">
					<div class="info_wrap">
						<div class="TaxInfo_board1" onclick="javascript:location.href='../../view/board/board_list_tax_view.php?tbl_kind=13&post_id=<?=$post['post_id'] ?>'">
					<div class="info_tag">
					<img src="../../images/TaxInfo/new.png"><img class="info_tag_img1" src="../../images/TaxInfo/newcata.png" style="">
					  <p class="p_title"><?= Util::changeHtmlSpecialchars($post['post_title']) ?> </p>
					  <p class="p_title1">&emsp; 등록일자: <?=substr($post['post_date'], 0, 10) ?>  | 작성자: <?=$post['poster_nick'] ?> 세무사 </p>
					  <p class="p_title2"><?=$post['post_headline'] ?></p>
					  <p class="p_title3">&emsp;&emsp;---------------------(중략)--------------------- </p>
					</div>
					</div>
					<div class="TaxInfo_board2">
					<img class="info" src="../../images/TaxInfo/info.png" height="150px;">
					</div>
			        </div>
			    </div>
			<?
			}
		}
	?>


<?
require '../common/content_iframe_header.html';
?>
<script>
	function iResizeManage() {
		var area = $('#item_area');
		var nHeight = parseInt(area.height(), 10) + parseInt(area.css('padding-top'), 10) + parseInt(area.css('padding-bottom'), 10) + 700;
		console.log('iResizeManage  -> ' + nHeight);
		parent.jQuery('#iframe_board').height(nHeight);
	}

	$(document).ready(function() {
		setTimeout(iResizeManage, 10);
		
		$(".more_see_btn").click(function(){
			var tbl_kind = <?=$_GET['tbl_kind']?>;                 // tblKind에 tbl_kind에서 get한 값을 넣는다.
			var pg_inx_next = (<?=$_GET['pg_inx']?>+1);                 	  // tblKind에 pg_inx에서 get한 값을 넣는다. 
			
			requestData({
				 url : '../../proc/board/ajax_brd_tax_list_proc.php'
				,postData : ('tbl_kind='+tbl_kind+'&pg_inx=' +pg_inx_next) 
				,success : function(result)
	            {
	            	console.log(result);
	            	
	            	var jdata = JSON.parse(result);
	            	
	            	for(var idx =0 ; idx<jdata.length; idx++)
	            	{
	            		console.log(jdata[idx]);
	            		$("#tax_post_area").append("<div>fddf</div>");	
	            	}
	            	
	            	/*
	            	parent.after('<tr class="FAQ_toggle"><td colspan="5"><div id="toggle_'+pid+'" style="display: none;"><div style=";width:820px;height:300px;overflow-y:auto;overflow-x:hidden;text-align:left;padding:25px;">'+result
	            	+'</div><div class="FAQ_btnWrap">'
	            	+'<a class="btn-flow-black" href="./board_write_faq.php?wtype=3&post_id='+pid+'&t_idx='+t_idx+'&tbl_kind='+tbl_kind+'&pg_inx='+pg_inx+'">'
					+ '<div class="FAQ_toggle_revise_del">수정</div></a>'
					+'<a class="btn-flow-black" href="../../proc/board/brd_delete_faq_proc.php?wtype=3&post_id='+pid+'&t_idx='+t_idx+'&tbl_kind='+tbl_kind+'&pg_inx='+pg_inx+'">'
					+'<div class="FAQ_toggle_revise_del">삭제</div></a></div></div></td></tr>');
					
					var tds = parent.find('td');
					var t = $(tds[4]);
					$(tds[4]).text(Number($(tds[4]).text())+1);

	                toggle_sel = pid;
	                 $("#toggle_"+toggle_sel).slideDown(400, function(){ iResizeManage(true); });
	                 */
	            }, 
	            
	            error : function(xhr, status, error)
	            {
	                alert(status + ":" + xhr.status);
	            }
			});
		});
		
	}); 
</script>

<div class="menuwrap">
	<div>
	<div class="mid">
		<img src="../../images/TaxInfo/headtitle.png" width="1100" height="95">
	</div>
	
	<div class="agr_img">
			<img src="../../images/TaxInfo/calender_title.png" style="height:65px;">
			</div>
			<div class="TaxInfo_title">
	
			</div>
			<br>
			<table class="TaxCal">
						<colgroup>
							<col width="120">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
							<col width="60">
						</colgroup>


				<tr class="Tax_1">
					<td>연간일정</td>
					<td>1월</td>
					<td>2월</td>
					<td>3월</td>
					<td>4월</td>
					<td>5월</td>
					<td>6월</td>
					<td>7월</td>
					<td>8월</td>
					<td>9월</td>
					<td>10월</td>
					<td>11월</td>
					<td>12월</td>
					<td>1월</td>
				</tr>
				<tr>
					<td>부가세 1기 </td>
					<td class="cal_1" colspan="5">부가세 1기 (예정)</td>
					<!-- <td class="cal_2">신 고</td> -->
					<td class="cal_2">신 고</td>
					<td class="cal_3" colspan="7"></td>
					

				</tr>				
				<!-- <tr>
					<td>부가세 1기 (확정)</td>
					<td></td>
					<td></td>
					<td class="cal_1" colspan="3">부가세 1기 (확정)</td>
					<td class="cal_2">신 고</td>
					<td class="cal_3" colspan="6"></td>

				</tr>	 -->
				<tr>
					<td>부가세 2기 </td>
					<td class="cal_3" colspan="6"></td>
					<td class="cal_1" colspan="6">부가세 2기 (예정)</td>
					<!-- <td class="cal_2">신 고</td> -->
					<!-- <td class="cal_3" colspan="0"></td> -->
					<td class="cal_2">신 고</td>
				</tr>

				<!-- <tr>
					<td>부가세 2기 (확정)</td>
					<td class="cal_3" colspan="8"></td>
					<td class="cal_1" colspan="3">부가세 2기 (확정)</td>
					<td class="cal_2">신 고</td>
				</tr>	 -->				
	
				<tr>
					<td>종합소득세</td>
					<td class="cal_1" colspan="4"></td>
					<td class="cal_2">신 고</td>
					<td class="cal_1" colspan="8"></td>
					
				</tr>		
			</table>
			<br>


			
			<table class="TaxCal2">
						<colgroup>
							<col width="100">
							<col width="60">
							<col width="95">
							<col width="95">
							<col width="95">
							<col width="95">
							<col width="95">
							<col width="95">
							<col width="95">
							<col width="95">
							<col width="90">
						</colgroup>


				<tr class="Tax_1">
					<td>월간일정</td>
					<td>1월</td>
					<td colspan="2">1st Week</td>
					<td colspan="2">2st Week</td>
					<td colspan="2">3st Week</td>
					<td colspan="2">4st Week</td>
											
				</tr>
				<tr>
					<td colspan="2">Event 1</td>
					<td class="cal_4"  colspan="3">Event 1</td>
					<td class="cal_2" colspan="1">res</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td colspan="2">Event 2</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td colspan="2">Event 3</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td colspan="2">Event 4</td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
					<td colspan="2"></td>
				</tr>				
			</table>
			<br>
			</div>
			
			
			
			<div id="item_area">
				<div class="agr_img">
					<img src="../../images/TaxInfo/calender_title1.png" style="height:65px;"><div class="infoWrite">글쓰기</div>
				</div>
				<div id="tax_post_area">
					<?
					displayBoardList($brdWork);
					?>
				</div>
			    <div class="more_see_btn">더보기</div>
			</div>
</div>

<!--

<div class="menuwrap">
	<div class="list_up">
		<div class="B_ptl">
			<a class="btn-flow-black" href="./board_write.php?wtype=1&post_id=0&tbl_kind=<?=$_GET['tbl_kind'] ?>&pg_inx=<?=$_GET['pg_inx'] ?>">
				<div class="list_write_btn">글쓰기</div>
			</a>
			<table class="board_tb">
				<colgroup>
					<col width="100">
					<col width="500">
					<col width="75">
					<col width="94">
					<col width="94">
				</colgroup>
				<thead class="board_list_header">
					<tr>
						<th scope="col">번호</th>
						<th scope="col">제목</th>
						<th scope="col">작성자</th>
						<th scope="col">작성일</th>
						<th scope="col">조회</th>
					</tr>
				</thead>
				<tbody  id="board_msg">
					<?
					if ($total_count > 0)
						displayBoardList($brdWork);
 ?>  
				</tbody>
			</table>
		</div>

		 
<table class="paging">
			<tbody>
				<tr>
					<? Display::pageNumber($total_count, $brdWork, './board_list.php', 'contents=' . $_GET['contents'] . '&tbl_kind=' . $_GET['tbl_kind'], $_GET['pg_inx']); ?>
				 </tr>
			</tbody>
		</table>

</div>

<? $brdWork -> destoryWork(); ?>    <!-- brdWork는 destoryWork함수를 받는다 -->



</div>








