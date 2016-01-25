<?php
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBBoardWork.php");
	
	$brdWork = new DBBoardWork();
	$brdWork->setPageInfo(10, 10, 100);
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
					<a href="./route.php?contents=201&post_id=<?=$post['post_id']?>&tbl_kind=<?=$tblKind?>&pg_inx=<?=$post['pg_inx']?>">
						<?= Util::changeHtmlSpecialchars($post['post_title']) ?>
					</a>
				</li>
			<?
		}
	}
?>
<ul class="main-notice-list">
	<? if ($total_count > 0) displayBoardList($brdWork); ?>
</ul>
<? $brdWork->destoryWork(); ?>