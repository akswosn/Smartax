<?php 
require_once './PHPExcel.php';
$objPHPExcel = new PHPExcel();

$sheet      = $objPHPExcel->getActiveSheet();

// 글꼴
$sheet->getDefaultStyle()->getFont()->setName('맑은 고딕');

$sheetIndex = $objPHPExcel->setActiveSheetIndex(0);

// 제목
$sheetIndex->setCellValue('A1','제 목');
$sheetIndex->mergeCells('A1:D1');
$sheetIndex->getStyle('A1')->getFont()->setSize(20)->setBold(true);
$sheetIndex->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

// 내용
$sheetIndex ->setCellValue('A2', '하나')
->setCellValue('B2', '둘')
->setCellValue('C2', '셋')
->setCellValue('D2', '넷');

header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename=sample.xls');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');

exit;
?>