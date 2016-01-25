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
		$_POST['login_id'] = 'sample';
		$_POST['login_pw'] = 'sample';
		$memWork->createWork($_POST, false);
		$res = $memWork->requestLogin();
		
		//세션 정보 저장
		$manager = new SessionManager();
		$manager->setUserNm($res[3]);
		$manager->setCoNm($res[4]);
		$manager->setUserType($res[1]);
		
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
			header($headContent);
		}
		
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		echo $e->getMessage();
		Util::serverLog($e);
		exit;
	}
?>