<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBMemberWork.php");
	require_once("../../../class/SessionManager.php");
	
	$mWork = new DBMemberWork(true);

	try
	{
		$mWork->createWork($_POST, false);
		$ret = array();
		$res = $mWork->selectUserAsSaleCode();
		$mWork->destoryWork();
		
		if($res != null){
			$ret['CODE']='00';
			$ret['DATA'] =$res;
		}
		else {
			$ret['CODE']='99';
		}
// 		var_dump($res[0]);
		//세션저장
		if ($is_sessionStart) session_start();
		$sessionManager = new SessionManager();
		$sessionManager->setJoinUserInfoStep1($res[0]);
		
// 		var_dump($sessionManager->getJoinUserInfoStep1());
		
		echo json_encode($ret);
	}
  	catch (Exception $e) 
	{
		$mWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>