<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBMemberWork.php");
	require_once("../../../class/SessionManager.php");
	
	$mWork = new DBMemberWork(true);
	
	//세션저장
	if ($is_sessionStart) session_start();
	
	$sessionManager = new SessionManager();
// 	$sessionManager->setJoinUid($res);
	$sessionManager->setJoinUserId($_POST['user_id']);
	$sessionManager->setJoinUserNm($_POST['user_name']);
	$ret = array(
			'user_id' => $_POST['user_id'],
			"isIdCheck"=> $_POST['isIdCheck'],
			"user_license_gubun"=>$_POST['user_license_gubun'],
			"user_aree_sms"=> $_POST['user_aree_sms'],
			"user_aree_email"=>$_POST['user_aree_email'],
			"radio_user_license_gubun"=> $_POST['radio_user_license_gubun'],
			"user_name"=> $_POST['user_name'],
			"user_jumin1"=> $_POST['user_jumin1'],
			"user_jumin2"=> $_POST['user_jumin2'],
			"user_pwd"=> $_POST['user_pwd'],
			"user_pwd_confirm"=> $_POST['user_pwd_confirm'],
			"user_tel1"=> $_POST['user_tel1'],
			"user_tel2"=>$_POST['user_tel2'],
			"user_tel3"=> $_POST['user_tel3'],
			"user_phone1"=> $_POST['user_phone1'],
			"user_phone2"=> $_POST['user_phone2'],
			"user_phone3"=> $_POST['user_phone3'],
			"user_email1"=> $_POST['user_email1'],
			"user_email2"=> $_POST['user_email2'],
			"radio_user_aree_sms"=> $_POST['radio_user_aree_sms'],
			"radio_user_aree_email"=> $_POST['radio_user_aree_email'],
	);
	
	$sessionManager->setJoinUserInfoStep2($ret);
	
	$mWork->destoryWork();
 	header("Location:../../../route.php?contents=004");
	
// 	try
// 	{
// 		$mWork->createWork($_POST, false);
// 		$res = $mWork->insertUserInfo();
// 		$mWork->destoryWork();
		
// 		if($res != null){
// 		//세션저장
// 			if ($is_sessionStart) session_start();
// 			$sessionManager = new SessionManager();
// 			$sessionManager->setJoinUid($res);
// 			$sessionManager->setJoinUserId($_POST['user_id']);
// 			$sessionManager->setJoinUserNm($_POST['user_name']);
// 		header("Location:../../../route.php?contents=004");
// 		}
// 		else {
// 			throw new Exception('회원 가입 실패.');
// 		}
// 	}
//   	catch (Exception $e) 
// 	{
// 		$mWork->destoryWork();
// 		$err = $e -> getMessage();
// 		Util::serverLog($e);
		
// 		echo $err;
// 	}
?>