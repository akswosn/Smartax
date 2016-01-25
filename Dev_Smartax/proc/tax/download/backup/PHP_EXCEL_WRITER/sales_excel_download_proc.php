<?php

require_once("../../../class/Utils.php");
require_once("../../../class/DBWork.php");
require_once("../../../class_tax/DBTaxWork.php");
require_once ('EXCEL_LIB/Spreadsheet/Excel/Writer.php');
$tWork = new DBTaxWork(true);

try{
	$tWork->createWork($_POST, true);
	$res = $tWork->selectExcelDownloadData();
	$comp = $tWork->selectExcelDownloadDataAsComp();
}
catch (Exception $e){
	$tWork->destoryWork();
	$err = $e -> getMessage();
	Util::serverLog($e);
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


//Excel 파일 생성
$workbook = new Spreadsheet_Excel_Writer();
$workbook->setVersion(8);


// $format_bold =&$workbook->addFormat();
// $format_bold->setBold();

//title
$format_title =&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "20",
		"Color" => "red"
));

//sub title
$format_sub_title =&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "12",
));

$format_use_border =&$workbook->addFormat(array(
		"align" => "merge",
));

$format_table_title=&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "11",
		// 		"FgColor"=>"blue"
));
$format_table_content=&$workbook->addFormat(array(
		"Size" => "11",
));
$format_table_content_merge=&$workbook->addFormat(array(
		"align" => "merge",
		"Size" => "11",
));

$format_style=&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "11",
		// 		"FgColor"=>"blue",
		"Color" => "red"
));

$format_table_green=&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "11",
		// 		"FgColor"=>"green",
));

$format_table_gray=&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "11",
		// 		"FgColor"=>"gray",
));

$format_table_blue=&$workbook->addFormat(array(
		"align" => "merge",
		"bold" => true,
		"Size" => "11",
		// 		"FgColor"=>"blue",
));


$worksheet =& $workbook->addWorksheet('매출 부가세 자료입력');

$worksheet->setInputEncoding('utf-8');
$worksheet->write(0, 0, "매출자료입력", $format_title);
// Couple of empty cells to make it look better
$worksheet->write(0, 1, "", $format_title);
$worksheet->write(0, 2, "", $format_title);
$worksheet->write(0, 3, "", $format_title);
$worksheet->write(0, 4, "", $format_title);
$worksheet->write(0, 5, "1.3");

$worksheet->write(1, 0, "Ⅰ. 공급자 인적사항", $format_sub_title);
$worksheet->write(1, 1, "", $format_sub_title);
$worksheet->write(1, 2, "", $format_sub_title);
$worksheet->write(1, 7, "", $format_use_border);
$worksheet->write(1, 8, "", $format_use_border);
$worksheet->write(1, 9, "", $format_use_border);
$worksheet->write(1, 10, "", $format_use_border);
$worksheet->write(1, 11, "", $format_use_border);
$worksheet->write(1, 12, "", $format_use_border);

$worksheet->write(2, 0, "① 회 사 명", $format_table_title);
$worksheet->write(2, 1, "", $format_table_title);
$worksheet->write(2, 2, "", $format_table_title);
$worksheet->write(2, 3, "②사업자등록번호", $format_table_title);
$worksheet->write(2, 5, "입력필수 항목 임.", $format_style);
$worksheet->write(2, 7, "", $format_use_border);
$worksheet->write(2, 8, "", $format_use_border);
$worksheet->write(2, 9, "", $format_use_border);
$worksheet->write(2, 10, "", $format_use_border);
$worksheet->write(2, 11, "", $format_use_border);
$worksheet->write(2, 12, "", $format_use_border);

$worksheet->write(3, 0, $comp[0]['co_nm'], $format_table_content_merge);
$worksheet->write(3, 1, "", $format_table_content_merge);
$worksheet->write(3, 2, "", $format_table_content_merge);
$worksheet->write(3, 3, $comp[0]['co_saup_no'], $format_table_content);
$worksheet->write(3, 5, "", $format_style);
$worksheet->write(3, 7, "", $format_use_border);
$worksheet->write(3, 8, "", $format_use_border);
$worksheet->write(3, 9, "", $format_use_border);
$worksheet->write(3, 10, "", $format_use_border);
$worksheet->write(3, 11, "", $format_use_border);
$worksheet->write(3, 12, "", $format_use_border);

$worksheet->write(4, 7, "", $format_use_border);
$worksheet->write(4, 8, "", $format_use_border);
$worksheet->write(4, 9, "", $format_use_border);
$worksheet->write(4, 10, "", $format_use_border);
$worksheet->write(4, 11, "", $format_use_border);
$worksheet->write(4, 12, "", $format_use_border);

$worksheet->write(5, 0, "Ⅱ. 매출 부가세 거래내역", $format_sub_title);
$worksheet->write(5, 1, "", $format_sub_title);
$worksheet->write(5, 2, "", $format_sub_title);
$worksheet->write(5, 7, "", $format_use_border);
$worksheet->write(5, 8, "", $format_use_border);
$worksheet->write(5, 9, "", $format_use_border);
$worksheet->write(5, 10, "", $format_use_border);
$worksheet->write(5, 11, "", $format_use_border);
$worksheet->write(5, 12, "", $format_use_border);

$worksheet->write(7, 0, "년도월일\n(숫자만 8자리",$format_table_blue);
$worksheet->write(7, 1, "유형\n(숫자만 2자리)",$format_table_blue);
$worksheet->write(7, 2, "거래처명\n(30자리)",$format_table_blue);
$worksheet->write(7, 3, "사업자등록번호",$format_table_blue);
$worksheet->write(7, 4, "품     목\n(30자리)",$format_table_gray);
$worksheet->write(7, 5, "수 량",$format_table_gray);
$worksheet->write(7, 6, "단 가",$format_table_gray);
$worksheet->write(7, 7, "공급가액",$format_table_blue);
$worksheet->write(7, 8, "세액",$format_table_blue);
$worksheet->write(7, 9, "합계금액",$format_table_blue);
$worksheet->write(7, 10, "기본계정\n(대 변)",$format_table_gray);
$worksheet->write(7, 11, "상대계정\n(차 변)",$format_table_gray);
$worksheet->write(7, 12, "영수/청구",$format_table_gray);
$worksheet->write(7, 13, "대표자\n(15자리)",$format_table_gray);
$worksheet->write(7, 14, "업 태\n(20자리)",$format_table_gray);
$worksheet->write(7, 15, "종 목\n(30자리)",$format_table_gray);
$worksheet->write(7, 16, "사업장주소\n(80자리)",$format_table_gray);
$worksheet->write(7, 17, "비고\n(30자리)",$format_table_gray);
$worksheet->write(7, 18, "전자",$format_table_gray);
$worksheet->write(7, 19, "부서/사원\n코드",$format_table_gray);
$worksheet->write(7, 20, "현장코드",$format_table_gray);
$worksheet->write(7, 21, "PJT코드",$format_table_gray);
$worksheet->write(7, 22, "불공제사유",$format_table_gray);

$worksheet->write(8, 0, "합            계",$format_table_green);
$worksheet->write(8, 1, "",$format_table_green);
$worksheet->write(8, 2, "",$format_table_green);
$worksheet->write(8, 3, "",$format_table_green);
$worksheet->write(8, 4, "",$format_table_green);
$worksheet->write(8, 5, "",$format_table_green);
$worksheet->write(8, 6, "",$format_table_green);
$worksheet->write(8, 7, $tot_supply,$format_table_content);
$worksheet->write(8, 8, $tot_tax,$format_table_content);
$worksheet->write(8, 9, $tot_total,$format_table_content);
$worksheet->write(8, 10, "",$format_table_gray);
$worksheet->write(8, 11, "",$format_table_gray);
$worksheet->write(8, 12, "",$format_table_gray);
$worksheet->write(8, 13, "",$format_table_gray);
$worksheet->write(8, 14, "",$format_table_gray);
$worksheet->write(8, 15, "",$format_table_gray);
$worksheet->write(8, 16, "",$format_table_gray);
$worksheet->write(8, 17, "",$format_table_gray);
$worksheet->write(8, 18, "",$format_table_gray);
$worksheet->write(8, 19, "",$format_table_gray);
$worksheet->write(8, 20, "",$format_table_gray);
$worksheet->write(8, 21, "",$format_table_gray);
$worksheet->write(8, 22, "",$format_table_gray);

for($i=0;$i < count($res);$i++){
	$obj = $res[$i];
	$worksheet->write(9+$i, 0, $obj['atax_yyyymmdd'],$format_table_content);
	$worksheet->write(9+$i, 1, $obj['atax_type'],$format_table_content);
	$worksheet->write(9+$i, 2, $obj['tr_nm'],$format_table_content);
	$worksheet->write(9+$i, 3, $obj['tr_saup_no'],$format_table_content);
	$worksheet->write(9+$i, 4, $obj['atax_item_nm'],$format_table_content);
	$worksheet->write(9+$i, 5, $obj['atax_item_cnt'],$format_table_content);
	$worksheet->write(9+$i, 6, $obj['atax_item_danga'],$format_table_content);
	$worksheet->write(9+$i, 7, $obj['atax_supply_price'],$format_table_content);
	$worksheet->write(9+$i, 8, $obj['atax_tax'],$format_table_content);
	$worksheet->write(9+$i, 9,  ($obj['atax_supply_price']+$obj['atax_tax']),$format_table_content,$format_table_content);
	$worksheet->write(9+$i, 10, "",$format_table_content);
	$worksheet->write(9+$i, 11, "",$format_table_content);
	$worksheet->write(9+$i, 12, "",$format_table_content);
	$worksheet->write(9+$i, 13, $obj['tr_deapyo'],$format_table_content);
	$worksheet->write(9+$i, 14, $obj['tr_up'],$format_table_content);
	$worksheet->write(9+$i, 15, $obj['tr_jong'],$format_table_content);
	$worksheet->write(9+$i, 16, $obj['tr_addr'],$format_table_content);
	$worksheet->write(9+$i, 17, $obj['tr_bigo'],$format_table_content);
	$worksheet->write(9+$i, 18, "",$format_table_content);
	$worksheet->write(9+$i, 19, "",$format_table_content);
	$worksheet->write(9+$i, 20, "",$format_table_content);
	$worksheet->write(9+$i, 21, "",$format_table_content);
	$worksheet->write(9+$i, 22, "",$format_table_content);
}

$workbook->send($_downloadFilename);
$workbook->close();
?>
