<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork();
	$brdWork->setPageInfo(10, 10, 100);

	try
	{
		
		$brdWork->createWork($_POST, FALSE);
		//$res = $brdWork->requestPostByPid();
		$brdWork->requestPostByPid();
		$item = $brdWork->fetchArrayRow();
		//echo '{ "CODE": "y" , "DATA": "'.$item[0].'" }';
		//echo '<DATA>'.$item[0].'</DATA>';
		//echo '<DATA><MSG>'.$item[0].'</MSG><T_IDX>'.$res.'</T_IDX></DATA>';
		echo $item[0];
		
		$brdWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo '{ "CODE": "99" , "DATA" : "'.$err.'" }';
		exit;
	}
?>