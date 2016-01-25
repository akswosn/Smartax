<?php 
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/SessionManager.php");
	require_once("../../class/DBMemberWork.php");
	$memWork = new DBMemberWork(true);
	
	$index = (int)$_POST["index"];
	$ret = array();
	
	if($index > -1){
		$ret["CODE"]='00';
		
		$companyArray = $_SESSION[DBWork::companyArray];
		$comp = $companyArray[$index];
		if(!empty($comp)){
			//세션 설정
			$_SESSION[DBWork::companyKey] = $comp["co_id"];
			
			$manager = new SessionManager();
			$manager->setCoNm($comp["co_nm"]);
		}
		else {
			$ret["CODE"]='99';
			$ret['MSG'] = "회사정보를 불러오는데 문제가 발생하였습니다.";
		}
		$ret['DATA'] =$comp;
	}
	else {
		$ret["CODE"]='99';
		$ret['DATA'] =$index;
		$ret['MSG'] = "회사정보를 불러오는데 문제가 발생하였습니다.";
	}
	
	echo json_encode($ret);
	$memWork->destoryWork();
	exit;
?>
