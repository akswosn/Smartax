<?php
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBMemberWork.php");
	require_once("./class/Display.php");
	
	$memWork = new DBMemberWork();
	$memWork->setPageInfo(20, 10, 100);
	$total_count = 0;
	
	$contents = $_GET['contents'];
	
	try
	{
		$memWork->createWork($_GET, FALSE);
		$total_count = $memWork->requestPointUseLog();
 	}
  	catch (Exception $e)
	{
		$memWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
	
	function displayPointList($memWork)
	{
		while ($post = $memWork->fetchMixedRow())
		{
			?>
				<tr>
					<td><?=$post['pu_id']?></td>
					<td><?=$post['pu_co_nm']?></td>
					<td><?=$post['pu_nm']?></td>
					<td><?=$post['pu_point']?></td>
					<td><?=$post['pu_reg_date']?></td>
					<td><?=$post['pu_start_date']?></td>
					<td><?=$post['pu_expire_date']?></td>
				</tr> 
			<?
		}
	}
?>
<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>포인트사용내역</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<ul class="tab-01">
			<li><a href="./route.php?contents=002">내정보</a></li>
			<li><a href="./route.php?contents=003&pg_inx=1">결제내역</a></li>
			<li class="on"><a href="./route.php?contents=004&pg_inx=1">포인트사용내역</a></li>
			<li><a href="./route.php?contents=005&pg_inx=1">포인트결제</a></li>
		</ul>
		<table class="board-list-01 mgT20">
			<caption>포인트사용내역</caption>
			<colgroup>
				<col style="width: 10%;">
				<col style="width: 10%;">
				<col style="width: 16%;">
				<col style="width: 16%;">
				<col style="width: 16%;">
				<col style="width: 16%;">
				<col style="width: 16%;">
			</colgroup>
			<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">회사</th>
					<th scope="col">상품</th>
					<th scope="col">포인트</th>
					<th scope="col">사용일</th>
					<th scope="col">시작일</th>
					<th scope="col">종료일</th>
				</tr>
			</thead>
			<tbody>
				<?	 if ($total_count > 0) displayPointList($memWork);	 ?>
			</tbody>
		</table>
		<div class="board-bottom">
    		<div class="board-paging-01">
                <? Display::pageNumber($total_count, $memWork, './route.php', 'contents='.$_GET['contents'], $_GET['pg_inx']); ?>
            </div>
		</div>
	</div>
</div>
<? $memWork->destoryWork(); ?>