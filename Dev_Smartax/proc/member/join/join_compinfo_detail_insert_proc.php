<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBMemberWork.php");
	require_once("../../../class/SessionManager.php");
	
	$mWork = new DBMemberWork(true);
	$sessionManager = new SessionManager();
// 	$co_id = $sessionManager->getJoinCoid();
// 	$user_id = $sessionManager->getJoinUid();
	$join_user_info_step1 = $sessionManager->getJoinUserInfoStep1();
	$join_user_info_step2 = $sessionManager->getJoinUserInfoStep2();
	$join_user_info_step3 = $sessionManager->getJoinUserInfoStep3();
	try
	{
		$mWork->createWork($_POST, false);
// 		$res = $mWork->insertCompInfoDetail($co_id, $user_id);
		$res = $mWork->insertUserJoin($join_user_info_step1, $join_user_info_step2, $join_user_info_step3);
		$mWork->destoryWork();
		
		if($res != null){
// 			$sessionManager->destroyJoinInfo();
			
			header("Location:../../../route.php?contents=006");
		}
		else {
			throw new Exception('회원 가입 실패.');
		}
	}
  	catch (Exception $e) 
	{
		$mWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		
		echo $err;
	}
?>