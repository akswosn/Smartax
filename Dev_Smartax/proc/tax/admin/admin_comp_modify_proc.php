<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBAdminWork.php");

	$aWork = new DBAdminWork(true);

	try
	{
		$aWork->createWork($_POST, true);
		
		$res = $aWork->updateComp();
		
		$aWork->destoryWork();

		if($res > 0){
			$ret['CODE']='00';
		}
		else {
			$ret['CODE']='99';
			$ret['DATA']='변경실패';
		}
		echo json_encode($ret);
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$e'}";
		exit;
	}
?>