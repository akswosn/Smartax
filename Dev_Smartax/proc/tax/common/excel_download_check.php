<?php
require_once("../../../class/Utils.php");
require_once("../../../class/DBWork.php");
require_once("../../../class_tax/DBTaxWork.php");
require_once("../../../class/SessionManager.php");
$tWork = new DBTaxWork(true);


//세션저장
if ($is_sessionStart) session_start();
$sessionManager = new SessionManager();
$excelDownFlag = $sessionManager->getExcelDownFlag();

if($excelDownFlag == 'y'){
	$sessionManager->setExcelDownFlag('n');
	echo "{CODE:'00',MSG:'파일이 다운로드 완료되었습니다.'}";
}
else {
	echo "{CODE:'99',MSG:'파일이 다운로드 완료되었습니다.'}";
}

$tWork->destoryWork();
?>