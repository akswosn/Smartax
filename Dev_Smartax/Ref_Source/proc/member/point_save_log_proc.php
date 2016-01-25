<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$memWork = new DBMemberWork();
	//pageSize, pageGroupSize, maxPageIndex
	$memWork->setPageInfo(30, 10, 100);
	$total_count = 0;
	
	try
	{
		$memWork->createWork($_POST, true);
		$total_count = $memWork->requestPointSaveLog();
		
		$data = array();
		//첫번째 원소로 댓글 전체 개수를 셋팅함
		array_push($data, $total_count);
		//실제 댓글 정보 셋팅
		while($cmt=$brdWork->fetchMapRow())
		{
			//htmlspecialchars 는 클라이언트 js 에서 처리한다.
			$cmt['message'] = stripslashes($cmt['message']);
			array_push($data, $cmt);
		}
		
		//json 객체를 json 문자열로 변환
   		$data = json_encode($data);
		echo "<result><code>y</code><data><![CDATA[$data]]></data></result>";
	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		$errmsg = $e->getMessage();
		Util::serverLog($e);
		echo "<result><code>n</code><data>$errmsg</data></result>";
		exit;
	}
	
	$brdWork->destoryWork();
    
?>