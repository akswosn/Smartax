<?php
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBBoardWork.php");
	
	$brdWork = new DBBoardWork();
	$brdWork->setPageInfo(5, 10, 100);
	$total_count = 0;
	
	$contents = $_GET['contents'];
	$_GET['tbl_kind'] = 11;
	$_GET['pg_inx'] = 1;
	
	try
	{
		$brdWork->createWork($_GET, FALSE);
		$total_count = $brdWork->requestList();
 	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
	
	function displayBoardList($bWork)
	{
		$tblKind = $_GET['tbl_kind'];
		$contents = $_GET['contents'];
		
		while ($post = $bWork->fetchMixedRow())
		{
			$step = strlen($post['group_level']) - 1;
			?>
				<li>
					<a class="line_cut" href="./route.php?contents=200&post_id=<?=$post['post_id']?>&tbl_kind=<?=$tblKind?>&pg_inx=1" >
						<?= Util::changeHtmlSpecialchars($post['post_title']) ?>
					</a>
				</li>
			<?
		}
	}
?>
<div>
	&emsp;&emsp;<strong>| 공지사항</strong><a href="./route.php?contents=200">more</a>
</div>
<ul></ul>
<ul>
	<? if ($total_count > 0) displayBoardList($brdWork); ?>
</ul>
<? $brdWork->destoryWork(); ?>