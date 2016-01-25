<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork();
	$brdWork->setPageInfo(3, 10, 30);

	try
	{
		$brdWork->createWork($_POST, FALSE);
		$brdWork->requestList_Tax();
		$result = array();
		
		while ($item = $brdWork->fetchMapRow()) {
			array_push($result, $item);
		}
		
		//$encode = iconv('ASCII', 'UTF-8//IGNORE', $result);
		echo json_encode($result);
		
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