<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");
	require_once("../../class/SessionManager.php");
	$memWork = new DBMemberWork(true);
		
	try
	{
		//$_POST : [login_id], [login_pw]
		//$memWork->createWork($_GET, false);
		$memWork->createWork($_POST, false);
		$res = $memWork->requestLogin();
		
		//세션 정보 저장
		$manager = new SessionManager();
		$manager->setUserNm($res['user_name']);
		$manager->setCoNm($res['co_nm']);
		$manager->setUserType($res['auth_id']);
		
		$headContent = "Location:../../route.php";
		
		$manager->destory();
		$memWork->destoryWork();
		if($res){
			if(isset($_POST["contents"])){
				$headContent = $headContent  . '?contents=' . $_POST["contents"];
				
				header($headContent);
			}
			else {
				header($headContent);
			}
		}
		else {
			$_SESSION['isLoginFail'] = 'y';
			header($headContent);
		}
		
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		Util::serverLog($e);
		$_SESSION['isLoginFail'] = 'y';
		header("Location:../../route.php");
// 		echo $e->getMessage();
// 		exit;
	}
?>