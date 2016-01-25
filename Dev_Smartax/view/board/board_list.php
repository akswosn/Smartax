<?php
	require_once("../../class/Utils.php");				// Utils PHP 파일(글자형식 및 제한, 로그인 등)을 한번만 Require 한다.
	require_once("../../class/DBWork.php");             // DBWork PHP 파일(DB관련 정보)을 한번만 Require 한다.
	require_once("../../class/DBBoardWork.php");        // DBBoardWork PHP 파일(게시판 관련 정보)을 한번만 Require 한다.
	require_once("../../class/Display.php");            // Display PHP 파일(Display 정보 게시판 관련)을 한번만 Require 한다.
	
	$brdWork = new DBBoardWork();                   // brdWork에 새로운 DDBoardWork 함수를 선언한다(클래스를 생성하는 문법)
	//pageSize, pageGroupSize, maxPageIndex
	$brdWork->setPageInfo(12, 10, 100);             // setPageInfo함수에 파라미터로 (pageSize:20,pageGroupSize:10,maxPageIndex:100)을 지정한다
	$total_count = 0;                               // 토탈 카운트는 0부터 시작하는 것으로 한다.
	
	$contents = $_GET['contents'];                  // 컨텐츠는 '컨텐츠'에서 받는다
	//$_POST
	
	//www.naver.com?contents=2423&...
	try                                            // 예외처리
	{
		//$_GET : ['tbl_kind'], ['pg_inx'], (['stype'], ['svalue']) 검색 옵션, 생략하면 전체 게시글 
		$brdWork->createWork($_GET, FALSE);        // brdWork는 createWork 함수에서 파라미터로 ($_GET, FALSE(거짓))을 지정한다.
		$total_count = $brdWork->requestList();    // 토탈카운트는 brdwor에서 requestList함수의 결과를 받는다.
		
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
				<tr class="board_list_mouseOver">                                  <!-- table을 만든다 --> 
					<td class="board_tb_centering"><?=$post['post_id'] ?></td>    <!-- post_id를 post한다  -->
					<td class="board_tb_title click_pt">                <!-- td에 subject 클레스를 지정한다 -->
						<a href="./board_view.php?post_id=<?=$post['post_id'] ?>&tbl_kind=<?=$tblKind ?>&pg_inx=<?=$_GET['pg_inx'] ?>">  <!--./route.php?contents=20~~~를 링크한다.  --> 
							<?= Util::changeHtmlSpecialchars($post['post_title']) ?>     <!--특수문자를 인식할수 있는 함수에 post_title을 post한다 -->
							<? if ($post[10]>0) { ?><span class="color-01">[<?=$post[10] ?>]</span><? } ?>  <!--만약 포스트[10]된 것이 0보다 크면 color-01 클레스에 post[10]을 넣어준다-->
						</a>
					</td>
					<td class="board_tb_centering"><?=$post['poster_nick'] ?></td>     <!-- poster_nick을 사람 post한다   -->
					<td class="board_tb_centering"><?=substr($post['post_date'], 0, 10) ?></td>       <!-- post_date를 post한다   -->
					<td class="board_tb_centering"><?=$post['readn'] ?></td>           <!-- readn을 post한다   -->
				</tr> 
			<?
			}
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
		<img src="../../images/board/midpic.png" width="1100" height="95">
	</div>
	
	<div class="menuwrap_board">
		<div class="mid_1">
			<ul class="mid_1_1" >
				<form method="get" action="./board_list.php">
				<select class="selectStyle click_pt" name="stype">
					<optgroup label="검색 조건">
						<option value="1">제목</option>
						<option value="2">글쓴이</option>
						<!-- <option value="3">내용</option>
						<option value="4">제목 + 내용</option> -->
					</optgroup>
	
					<input type="text" class="writePlace" name="svalue">
					<input type="submit" class="input_btn click_pt" value="검색하기">
					<input type="hidden" name="tbl_kind" value="<?=$_GET['tbl_kind']?>">  <!-- input박스를 숩기고 이름을 tbl_kind로 지정하고 값은 tbl_kind에서 받는다 -->
					<input type="hidden" name="pg_inx" value="1"> <!-- input박스를 숩기고 이름을 pg_inx로 지정하고 값은 1로 지정한다 -->
					<!-- <p class="SearchBtn click_pt">
						조회하기
					</p> -->
				</select>
				</form>
			</ul>
		</div>
	</div>
</div>



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
 ?>  <!--토탈카운트가 0보다 크면 displayBoardList(brdWork를 넣어)함수를 실행한다  -->
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








