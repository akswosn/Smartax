<?php
require_once("../../../class/Utils.php");
require_once("../../../class/DBWork.php");
require_once("../../../class_tax/DBTaxWork.php");
require_once("../../../class/SessionManager.php");
require_once './PHPExcel.php';
$tWork = new DBTaxWork(true);

try{
	$tWork->createWork($_POST, true);
	$res = $tWork->selectExcelDownloadData();
	$comp = $tWork->selectExcelDownloadDataAsCompany($_POST['co_id']);
}
catch (Exception $e){
	$tWork->destoryWork();
	$err = $e -> getMessage();
	Util::serverLog($e);
 	var_dump($err);
	exit;
}

$_downloadFilename = $_POST['downFileName'];

$tot_supply = 0;
$tot_tax = 0;
$tot_total = 0;

for($i=0;$i < count($res);$i++){
	$obj = $res[$i];
	$tot_supply = $tot_supply+$obj['atax_supply_price'];
	$tot_tax = $tot_tax+$obj['atax_tax'];
}
$tot_total = $tot_tax+$tot_supply;


//Excel Start
try{
	$objPHPExcel = new PHPExcel();
    
    $file = 'purchase_sample.xlsx';
    
//[K.S] sample 파일 리드시 php.ini ;extension=php_zip.dll <- 주석 해제 필요!!!!
    $objReader = PHPExcel_IOFactory::createReaderForFile($file);
    $objPHPExcel = $objReader->load($file);
	
	$sheet      = $objPHPExcel->getActiveSheet();
	
	// 글꼴
// 	$sheet->getDefaultStyle()->getFont()->setName('맑은 고딕');
	
	$sheetIndex = $objPHPExcel->setActiveSheetIndex(0);
	
	//-->>>>>>>>>>> STYLE
	//title
// 	$sheetIndex->mergeCells('A1:E1');
// 	$sheetIndex->getStyle('A1')->getFont()->setName('굴림체')->setSize(20)->setBold(true);
// 	$sheetIndex->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	
// 	$sheetIndex->getStyle('A2')->getFont()->setSize(12)->setBold(true);
// 	//
// 	$sheetIndex->mergeCells('H2:M6');
// 	$sheetIndex->getStyle('H2')->getFont()->setSize(10);
// 	$sheetIndex->getStyle('H2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	
// 	//인적사항 테이블
// 	$sheetIndex->mergeCells('A3:C3');
// 	$sheetIndex->getStyle('A3')->getFont()->setName('굴림체')->setSize(11)->setBold(true);
// 	$sheetIndex->getStyle('A3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
// 	$sheetIndex->getStyle('D3')->getFont()->setName('굴림체')->setSize(11)->setBold(true);
// 	//
// 	$sheetIndex->mergeCells('A4:C4');
// 	$sheetIndex->getStyle('A4')->getFont()->setName('굴림체')->setSize(10);
// 	$sheetIndex->getStyle('A4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
// 	$sheetIndex->getStyle('D4')->getFont()->setName('굴림체')->setSize(10);
	
// 	$sheetIndex->mergeCells('F3:F4');
// 	$sheetIndex->getStyle('F3')->getFont()->setSize(11)->setBold(true);
// 	$sheetIndex->getStyle('F3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	
// 	$sheetIndex->getStyle('A6')->getFont()->setSize(12)->setBold(true);
	
// 	$sheetIndex->getStyle('A8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('B8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('C8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('D8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('E8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('F8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('G8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('H8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('I8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('J8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('K8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('L8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('M8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('N8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('O8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('P8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('W8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('R8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('S8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('T8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('U8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('V8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('W8')->getFont()->setSize(9)->setBold(true);
// 	$sheetIndex->getStyle('X8')->getFont()->setSize(9)->setBold(true);
	
// 	$sheetIndex->mergeCells('A9:G9');
// 	$sheetIndex->getStyle('A9')->getFont()->setSize(11)->setBold(true);
// 	$sheetIndex->getStyle('A9')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	//-->>>>>>>>>>> End
	
	//-->>>>>>>>>>> 내용 Contents
// 	$sheetIndex->setCellValue('A1','매입 자료입력');
// 	$sheetIndex->setCellValue('F1','1.3');
	
// 	$sheetIndex->setCellValue('A2','Ⅰ. 공급받는자 인적사항');
	
// 	$sheetIndex->setCellValue('A3','① 회 사 명');
// 	$sheetIndex->setCellValue('D3','②사업자등록번호');
// 	$sheetIndex->setCellValue('F3','입력필수 항목 임.');
	
	$sheetIndex->setCellValue('A4',$comp[0]['co_nm']);
	$sheetIndex->setCellValue('D4',str_replace( "-" , "" , $comp[0]['co_saup_no']));
	
// 	$sheetIndex->setCellValue('A6','Ⅱ. 매입 부가세 거래내역');
	
// 	$sheetIndex->setCellValue('A8', "년도월일 (숫자만 8자리)");
// 	$sheetIndex->setCellValue('B8', "유형 (숫자만 2자리)");
// 	$sheetIndex->setCellValue('C8', "거래처명 (30자리)");
// 	$sheetIndex->setCellValue('D8', "사업자등록번호");
// 	$sheetIndex->setCellValue('E8', "품     목 (30자리)");
// 	$sheetIndex->setCellValue('F8', "수 량");
// 	$sheetIndex->setCellValue('G8', "단 가");
// 	$sheetIndex->setCellValue('H8', "공급가액");
// 	$sheetIndex->setCellValue('I8', "세액");
// 	$sheetIndex->setCellValue('J8', "합계금액");
// 	$sheetIndex->setCellValue('K8', "기본계정 (차 변)");
// 	$sheetIndex->setCellValue('L8', "의제, 재활용 적요번호 (차 변)");
// 	$sheetIndex->setCellValue('M8', "상대계정 (대 변)");
// 	$sheetIndex->setCellValue('N8', "영수/청구");
// 	$sheetIndex->setCellValue('O8', "대표자 (15자리)");
// 	$sheetIndex->setCellValue('P8', "업 태 (20자리)");
// 	$sheetIndex->setCellValue('Q8', "종 목 (30자리)");
// 	$sheetIndex->setCellValue('R8', "사업장주소 (80자리)");
// 	$sheetIndex->setCellValue('S8', "비고 (30자리)");
// 	$sheetIndex->setCellValue('T8', "전자");
// 	$sheetIndex->setCellValue('U8', "부서/사원 코드");
// 	$sheetIndex->setCellValue('V8', "현장코드");
// 	$sheetIndex->setCellValue('W8', "PJT코드");
// 	$sheetIndex->setCellValue('X8', "불공제사유");
	
// 	$sheetIndex->setCellValue('A9', "합계");
	$sheetIndex->setCellValue('H9', $tot_supply);
	$sheetIndex->setCellValue('I9', $tot_tax);
	$sheetIndex->setCellValue('J9', $tot_total);
	
	for($i=0;$i < count($res);$i++){
		$obj = $res[$i];
		$sheetIndex->setCellValue('A'.(10+$i), $obj['atax_yyyymmdd']);
		$sheetIndex->setCellValue('B'.(10+$i), $obj['atax_type']);
		$sheetIndex->setCellValue('C'.(10+$i), $obj['tr_nm']);
		$sheetIndex->setCellValue('D'.(10+$i), str_replace( "-" , "" , $obj['tr_saup_no']));
		$sheetIndex->setCellValue('E'.(10+$i), $obj['atax_item_nm']);
		$sheetIndex->setCellValue('F'.(10+$i), $obj['atax_item_cnt']);
		$sheetIndex->setCellValue('G'.(10+$i), $obj['atax_item_danga']);
		$sheetIndex->setCellValue('H'.(10+$i), $obj['atax_supply_price']);
		$sheetIndex->setCellValue('I'.(10+$i), $obj['atax_tax']);
		$sheetIndex->setCellValue('J'.(10+$i),  ($obj['atax_supply_price']+$obj['atax_tax']));
		$sheetIndex->setCellValue('K'.(10+$i), "");
		$sheetIndex->setCellValue('L'.(10+$i), "");
		$sheetIndex->setCellValue('M'.(10+$i), "");
		$sheetIndex->setCellValue('N'.(10+$i), "");
		$sheetIndex->setCellValue('O'.(10+$i), $obj['tr_daepyo']);
		$sheetIndex->setCellValue('P'.(10+$i), $obj['tr_up']);
		$sheetIndex->setCellValue('Q'.(10+$i), $obj['tr_jong']);
		$sheetIndex->setCellValue('R'.(10+$i), $obj['tr_addr']);
		$sheetIndex->setCellValue('S'.(10+$i), $obj['tr_bigo']);
		$sheetIndex->setCellValue('T'.(10+$i), "");
		$sheetIndex->setCellValue('U'.(10+$i), "");
		$sheetIndex->setCellValue('V'.(10+$i), "");
		$sheetIndex->setCellValue('W'.(10+$i), "");
		$sheetIndex->setCellValue('X'.(10+$i), "");
	}
	//-->>>>>>>>>>> End
	
	
	
	header( "Content-type: application/vnd.ms-excel; charset=utf-8");
	header( "Content-Disposition: attachment; filename = $_downloadFilename" );
	header('Cache-Control: max-age=0');
	
// 	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
	$objWriter->save('php://output');
	
	//세션저장
	if ($is_sessionStart) session_start();
	$sessionManager = new SessionManager();
	$sessionManager->setExcelDownFlag('y');
	
	exit;
}
catch (Exception $e){
	var_dump($err);
	exit;
}

?>

