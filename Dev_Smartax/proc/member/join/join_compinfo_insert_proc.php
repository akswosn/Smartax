<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class/DBMemberWork.php");
	require_once("../../../class/SessionManager.php");
	
	if ($is_sessionStart) session_start();
	$mWork = new DBMemberWork(true);
	$sessionManager = new SessionManager();
// 	$sessionManager->setJoinCoid($res);
	$sessionManager->setJoinCompNm($_POST['co_nm']);
	$ret = array(
			"co_nm"=> $_POST['co_nm'],
			"co_ceo_nm"=>$_POST['co_ceo_nm'],
			"co_saup_no"=>$_POST['co_saup_no'],
			"co_tel"=>$_POST['co_tel'],
			"co_email"=>$_POST['co_email'],
			"co_handphone"=>$_POST['co_handphone'],
			"co_fax"=> $_POST['co_fax'],
			"co_tel_juso"=> $_POST['co_tel_juso'],
			"co_co_no"=> $_POST['co_co_no'],
			"co_jong"=> $_POST['co_jong'],
			"co_up"=> $_POST['co_up'],
			"co_up_code"=>$_POST['co_up_code'],
			"co_addr"=> $_POST['co_addr'],
			"tax_type"=> $_POST['tax_type'],
			"co_tax_type"=> $_POST['co_tax_type'],
			"hometax_id"=> $_POST['hometax_id'],
			"hometax_pwd"=> $_POST['hometax_pwd'],
			"co_joint"=> $_POST['co_joint'],
			"co_tax_office"=> $_POST['co_tax_office'],
			"co_tax_office_code"=> $_POST['co_tax_office_code'],
			"co_tax_office_acc"=> $_POST['co_tax_office_acc'],
			"co_bank"=> $_POST['co_bank'],
			"co_bank_acc"=> $_POST['co_bank_acc']
	);
	$sessionManager->setJoinUserInfoStep3($ret);
	
	$mWork->destoryWork();
 	header("Location:../../../route.php?contents=005");
// 	$mWork = new DBMemberWork(true);
// 	$sessionManager = new SessionManager();
// 	$userInfo = $sessionManager->getJoinUserInfoStep1();
// 	$user_id = $sessionManager->getJoinUid();
// 	try
// 	{
// 		$mWork->createWork($_POST, false);
// 		$res = $mWork->insertCompInfo($userInfo, $user_id);
// 		$mWork->destoryWork();
		
// 		if($res != null){
// 			$sessionManager->setJoinCoid($res);
// 			$sessionManager->setJoinCompNm($_POST['co_nm']);
// 			header("Location:../../../route.php?contents=005");
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