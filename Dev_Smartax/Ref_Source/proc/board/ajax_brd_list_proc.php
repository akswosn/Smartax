<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBBoardWork.php");

	$brdWork = new DBBoardWork();
	$brdWork->setPageInfo(10, 10, 100);

	try
	{
		$brdWork->createWork($_GET, FALSE);
		$brdWork->requestList();
		$result = array();
		
		while ($item = $brdWork->fetchArrayRow()) {
			array_push($result, $item);
		}
		
		//$encode = iconv('ASCII', 'UTF-8//IGNORE', $result);
		
		echo '{ "CODE": "00" , "DATA": "'.json_encode($result).'" }';
		
		$brdWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$brdWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo '{ "CODE": "99" , "DATA" : "'.$err.'" }";
		exit;
	}
?>