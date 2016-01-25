<?php
	require_once("./class/Utils.php");				// Utils PHP 파일(글자형식 및 제한, 로그인 등)을 한번만 Require 한다.
	require_once("./class/DBWork.php");             // DBWork PHP 파일(DB관련 정보)을 한번만 Require 한다.
	require_once("./class/DBBoardWork.php");        // DBBoardWork PHP 파일(게시판 관련 정보)을 한번만 Require 한다.
	require_once("./class/Display.php");            // Display PHP 파일(Display 정보 게시판 관련)을 한번만 Require 한다.
	
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
				<tr>                                  <!-- table을 만든다 --> 
					<td><?=$post['post_id']?></td>    <!-- post_id를 post한다  -->
					<td class="subject">                <!-- td에 subject 클레스를 지정한다 -->
						<a href="./route.php?contents=201&post_id=<?=$post['post_id']?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$post['pg_inx']?>">  <!--./route.php?contents=20~~~를 링크한다.  --> 
							<?= Util::changeHtmlSpecialchars($post['post_title']) ?>     <!--특수문자를 인식할수 있는 함수에 post_title을 post한다 -->
							<? if ($post[10]>0) { ?><span class="color-01">[<?=$post[10]?>]</span><? } ?>  <!--만약 포스트[10]된 것이 0보다 크면 color-01 클레스에 post[10]을 넣어준다-->
						</a>
					</td>
					<td><?=$post['poster_nick']?></td>     <!-- poster_nick을 post한다   -->
					<td><?=$post['post_date']?></td>       <!-- post_date를 post한다   -->
					<td><?=$post['readn']?></td>           <!-- readn을 post한다   -->
				</tr> 
			<?
		}
	}
    
	function displayContetnsTitle() { // displayContentsTitle함수를 만든다.
	    $tblKind = $_GET['tbl_kind']; // tblKind 테이블의 종류는  tbl_kind를 get한다.
		switch ($tblKind) {           //tblkind가 1일때 질의응답 11일때 공지사항, 21일때 자료실, 31일때 FAQ, 41일때 경영컨설팅을 넣는다.
			case '1': ?><span>질의응답 Q&amp;A</span><?; break;
            case '11': ?><span>공지사항</span><?; break;
            case '21': ?><span>자료실</span><?; break;
            case '31': ?><span>FAQ</span><?; break;
            case '41': ?><span>경영컨설팅</span><?; break;
        }
	}
?>

<div class="content">   					<!-- div를 만들고 클레스를 content로 지정한다  -->
	<div class="content-title"> 			<!-- div를 만들고 클레스를 content-title로 지정한다  -->
		<h2 class="content-title-inner"> 	<!-- h2에 클레스를 content-title-inner로 지정한다  -->
			<? displayContetnsTitle() ?>  	<!-- displayContentsTitle함수를 선언한다-->
			<small>전국 농업인들의 사랑을 받는 태극회계 프로그램</small>   <!-- 작은 텍스트로 만들어준다 -->
		</h2>	
	</div>
	<div class="content-inner">             <!-- div를 만들고 클레스를 content-inner로 지정한다  -->
		<div class="form-search-01">        <!-- div를 만들고 클레스를 form-search-01로 지정한다  -->
			<form method="get" action="./route.php">  <!--form을 get한다  ./route.php 위치에서 수신 -->
				<select name="stype" style="width: 80px;">  <!-- stype을 선택하고 길이를 80px로 준다 -->
					<option value="2">제목</option>     <!-- 옵션벨료 2는 제목으로 지정-->
					<option value="1">작성자</option>    <!-- 옵션벨료 1는 작성자로 지정-->
				</select>
				<input type="text" name="svalue" style="width: 240px;">  <!-- input박스에 text타입에 이름을 svalue로 지정하고 240px 길이로 만든다 -->
				<input type="hidden" name="contents" value="<?=$_GET['contents']?>">  <!-- input박스를 숩기고 이름을 contents로 지정하고 값은 contents에서 받는다 -->
				<input type="hidden" name="tbl_kind" value="<?=$_GET['tbl_kind']?>">  <!-- input박스를 숩기고 이름을 tbl_kind로 지정하고 값은 tbl_kind에서 받는다 -->
				<input type="hidden" name="pg_inx" value="1"> <!-- input박스를 숩기고 이름을 pg_inx로 지정하고 값은 1로 지정한다 -->
				<input type="submit" class="btn-flow-black" value="검색"> <!-- input박스에 submit 할수 있게 하고 btn-flow-black을 클레스로 지정하고 값은 검색으로 지정한다 -->
			</form>
		</div>
		<table class="board-list-01">  <!-- 테이블을 만들고 board-list-01으로 클레스를 지정한다 -->
			<caption>게시글 목록</caption>   <!--캡션으로 게시글 목록을 단다-->
			<colgroup>                  <!-- 열그룹을 만든다-->
				<col style="width:8%;">   <!-- 열의 스타일을 길이 8%, 없고 , 12%, 18%, 8%로 만든다-->
				<col style="">
				<col style="width:12%;">
				<col style="width:18%;">
				<col style="width:8%;">
			</colgroup>
			<thead>                           <!-- 테이블의 머릿글을 지정한다 -->
				<tr>                          <!-- 행만들기 -->
					<th scope="col">번호</th>   <!-- 행 내부 제목 달기 범주는 col,  각각 번호, 제목, 글쓴이, 작성일, 조회 를 만든다 -->
					<th scope="col">제목</th>
					<th scope="col">글쓴이</th>
					<th scope="col">작성일</th>
					<th scope="col">조회</th>
				</tr>
			</thead>
			<tbody>
				<? if ($total_count > 0) displayBoardList($brdWork); ?>  <!--토탈카운트가 0보다 크면 displayBoardList(brdWork를 넣어)함수를 실행한다  -->
			</tbody>
		</table>
		<div class="board-bottom">      <!-- div 추가 클래스 명은 board-bottom -->
    		<div class="board-button">   <!-- div 추가 클래스 명은 board-buttom -->
                <? if (Util::isWriteTable($_GET['tbl_kind'])) { ?>    <!-- Util에 있는 isWriteTable 함수에 tbl_kind를 받는다면 -->
        			<a class="btn-flow-black" href="./route.php?contents=202&wtype=1&post_id=0&tbl_kind=<?=$_GET['tbl_kind']?>">글쓰기</a>  <!-- 클래스명 btn-flow-black지정하고 tbl_kind를 받은 ./route.php?contents=~~를 링크한다  -->  
				<? } ?>
			</div>
            <div class="board-paging-01"> <!-- div 추가 클래스명은 board-paging-01 -->
                <? Display::pageNumber($total_count, $brdWork, './route.php', 'contents='.$_GET['contents'].'&tbl_kind='.$_GET['tbl_kind'], $_GET['pg_inx']); ?>
                <!--Display에서 pageNuber함수를 호출하고 (토탈카운트, brdWork, ./route.php~~~링크,contents~~~를 받는다. -->
            </div>
		</div>
	</div>
</div>

<? $brdWork->destoryWork(); ?>    <!-- brdWork는 destoryWork함수를 받는다 -->