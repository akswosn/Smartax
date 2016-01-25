<?php
require_once("../../../class/Utils.php");
require_once("../../../class/DBWork.php");
require_once("../../../class_tax/DBTaxWork.php");

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

header( "Content-type: application/vnd.ms-excel" );
header( "Content-type: application/vnd.ms-excel; charset=utf-8");
header( "Content-Disposition: attachment; filename = $_downloadFilename" );
header( "Content-Description: PHP4 Generated Data" );
/*
 * */
function createContents($content){
// 	var_dump($content);
	for($i=0;$i < count($content);$i++){
		$obj = $content[$i];
// 		var_dump($obj);
		echo "<tr  style='height:16.02pt;'>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>".$obj['atax_yyyymmdd']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['atax_type']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['tr_nm']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['tr_saup_no']."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>".$obj['atax_item_nm']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['atax_item_cnt']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['atax_item_danga']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['atax_supply_price']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['atax_tax']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".($obj['atax_supply_price']+$obj['atax_tax'])."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['tr_deapyo']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['tr_up']."</td>";
		echo "<td class = 'flx2' style = 'border:1px solid gray;'>".$obj['tr_jong']."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>".$obj['tr_addr']."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>".$obj['tr_bigo']."</td>";
		echo "<td class = 'flx2' style = 'border-left:1px solid gray;border-top:1px solid gray;border-bottom:1px solid gray;'>"."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>"."</td>";
		echo "<td class = 'flx4' style = 'border:1px solid gray;'>"."</td>";
		echo "</tr>";
	}
}

?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Style-Type" content="text/css">
<title>

</title>
<style type = 'text/css'>
<!--
table.flxmain_table td {overflow:hidden;padding: 0 1.5pt}
 .imagediv {position:absolute;border:none}
 table td.imagecell {vertical-align:top;text-align:left;padding:0}
 .flxHeading {background-color:#E7E7E7;text-align:center;border: 0px solid gray;font-family:helvetica,arial,sans-serif;font-size:10pt}
 .flx0 {
  background-color:white;
  color:black;
  font-size:10pt;
  font-weight:normal;
  font-style:normal;
  font-family:Arial;
  text-align:left;
  vertical-align:bottom;
  white-space:nowrap;
 }

 .flx1 {
  background-color:white;
  color:blue;
  font-size:20pt;
  font-weight:bold;
  font-style:normal;
  font-family:'굴림';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx2 {
  background-color:white;
  color:black;
  font-size:9pt;
  font-weight:normal;
  font-style:normal;
  font-family:'맑은고딩';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx3 {
  background-color:white;
  color:black;
  font-size:20pt;
  font-weight:normal;
  font-style:normal;
  font-family:'굴림'
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx4 {
  background-color:white;
  color:black;
  font-size:9pt;
  font-weight:normal;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:left;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx5 {
  background-color:white;
  color:black;
  font-size:12pt;
  font-weight:bold;
  font-style:normal;
  font-family:'Droid Sans Mono';
  text-align:left;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx6 {
  background-color:white;
  color:black;
  font-size:10pt;
  font-weight:bold;
  font-style:normal;
  font-family:'Droid Sans Mono';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx7 {
  background-color:white;
  color:black;
  font-size:10pt;
  font-weight:bold;
  font-style:normal;
  font-family:'Droid Sans Mono';
  text-align:left;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx8 {
  background-color:white;
  color:black;
  font-size:10pt;
  font-weight:normal;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:left;
  vertical-align:middle;
  white-space:normal;
 }

 .flx9 {
  background-color:#c6d9f0;
  color:black;
  font-size:11pt;
  font-weight:bold;
  font-style:normal;
  font-family:굴림;
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx10 {
  background-color:#c6d9f0;
  color:black;
  font-size:9pt;
  font-weight:bold;
  font-style:normal;
  font-family:굴림;
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx11 {
  background-color:white;
  color:black;
  font-size:10pt;
  font-weight:normal;
  font-style:normal;
  font-family:굴림;
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx12 {
  background-color:#c6d9f0;
  color:red;
  font-size:11pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:normal;
 }

 .flx13 {
  background-color:white;
  color:black;
  font-size:11pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx14 {
  background-color:#c6d9f0;
  color:black;
  font-size:9pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:normal;
 }

 .flx15 {
  background-color:#c6d9f0;
  color:black;
  font-size:9pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx16 {
  background-color:#d8d8d8;
  color:black;
  font-size:9pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:normal;
 }

 .flx17 {
  background-color:#d8d8d8;
  color:black;
  font-size:9pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx18 {
  background-color:#99cc00;
  color:black;
  font-size:11pt;
  font-weight:bold;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx19 {
  background-color:#d8d8d8;
  color:black;
  font-size:9pt;
  font-weight:normal;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:center;
  vertical-align:middle;
  white-space:nowrap;
 }

 .flx20 {
  background-color:#d8d8d8;
  color:black;
  font-size:9pt;
  font-weight:normal;
  font-style:normal;
  font-family:'맑은고딕';
  text-align:left;
  vertical-align:middle;
  white-space:nowrap;
 }

-->
</style>
</head>
<body>
<table class='flxmain_table' border='0' cellpadding='0' cellspacing='0' style='min-width:2033.24pt; table-layout:fixed; border-collapse:collapse; border:0px solid silver;'>
 <col class='flx0' span='3' style ='min-width:77.36pt;'>
 <col class='flx0' style ='min-width:108.14pt;'>
 <col class='flx0' style ='min-width:95.51pt;'>
 <col class='flx0' style ='min-width:55.26pt;'>
 <col class='flx0' style ='min-width:61.56pt;'>
 <col class='flx0' style ='min-width:106.56pt;'>
 <col class='flx0' style ='min-width:96.29pt;'>
 <col class='flx0' span='2' style ='min-width:89.19pt;'>
 <col class='flx0' style ='min-width:61.56pt;'>
 <col class='flx0' span='2' style ='min-width:89.19pt;'>
 <col class='flx0' span='3' style ='min-width:95.51pt;'>
 <col class='flx0' style ='min-width:176.82pt;'>
 <col class='flx0' style ='min-width:96.29pt;'>
 <col class='flx0' style ='min-width:47.36pt;'>
 <col class='flx0' span='4' style ='min-width:63.13pt;'>
  <tr style='display:none'>
    <td style = 'padding:0;min-width:77.36pt;'></td>
    <td style = 'padding:0;min-width:77.36pt;'></td>
    <td style = 'padding:0;min-width:77.36pt;'></td>
    <td style = 'padding:0;min-width:108.14pt;'></td>
    <td style = 'padding:0;min-width:95.51pt;'></td>
    <td style = 'padding:0;min-width:55.26pt;'></td>
    <td style = 'padding:0;min-width:61.56pt;'></td>
    <td style = 'padding:0;min-width:106.56pt;'></td>
    <td style = 'padding:0;min-width:96.29pt;'></td>
    <td style = 'padding:0;min-width:89.19pt;'></td>
    <td style = 'padding:0;min-width:89.19pt;'></td>
    <td style = 'padding:0;min-width:61.56pt;'></td>
    <td style = 'padding:0;min-width:89.19pt;'></td>
    <td style = 'padding:0;min-width:89.19pt;'></td>
    <td style = 'padding:0;min-width:95.51pt;'></td>
    <td style = 'padding:0;min-width:95.51pt;'></td>
    <td style = 'padding:0;min-width:95.51pt;'></td>
    <td style = 'padding:0;min-width:176.82pt;'></td>
    <td style = 'padding:0;min-width:96.29pt;'></td>
    <td style = 'padding:0;min-width:47.36pt;'></td>
    <td style = 'padding:0;min-width:63.13pt;'></td>
    <td style = 'padding:0;min-width:63.13pt;'></td>
    <td style = 'padding:0;min-width:63.13pt;'></td>
    <td style = 'padding:0;min-width:63.13pt;'></td>
  </tr>
 <tr  style='height:34.96pt;'>
  <td class='flx1' colspan = '5' rowspan ='1' >매입 자료입력</td>
  <td class='flx2'>1.3</td>
  <td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx3'></td>
<td class = 'flx3'></td>
<td class = 'flx3'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:45.88pt;'>
  <td class='flx5' colspan = '2'><span>Ⅰ. 공급받는자 인적사항</span></td>
  <td class = 'flx6'></td>
<td class = 'flx7'></td>
<td class = 'flx6'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>

  <td class='flx8' style ='border:1px solid gray;' colspan = '6' rowspan ='5'> </td>
  <td class = 'flx0'></td>
<td class = 'flx0'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:45.88pt;'>
  <td class='flx9' style ='border:1px solid gray;' colspan = '3' rowspan ='1'>① 회 사 명</td>
  <td class='flx10' style ='border:1px solid gray;' >②사업자등록번호</td>
  <td class='flx11' style ='border-left:1px solid gray;'> </td>
  <td class='flx12' colspan = '1' rowspan ='2'><span class='flx12' style ='height:91.76pt;'>입력필수 항목 임.</span></td>
  <td class = 'flx8'></td>

  <td class = 'flx0'></td>
<td class = 'flx0'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:45.88pt;'>
  <td class='flx11' style ='border:1px solid gray;' colspan = '3' rowspan ='1'><?php echo $comp[0]['co_nm']?></td>
  <td class = 'flx11' style = 'border:1px solid gray;'><?php echo $comp[0]['co_saup_no']?></td>

  <td class='flx11' style ='border-left:1px solid gray;'> </td>
  <td class = 'flx8'></td>

  <td class = 'flx0'></td>
<td class = 'flx0'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:18.21pt;'>
  <td class = 'flx4'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx8'></td>
<td class = 'flx8'></td>

  <td class = 'flx0'></td>
<td class = 'flx0'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:43.7pt;'>
  <td class='flx5' style ='border-left:1px solid gray;' colspan = '2'>Ⅱ. 매입 부가세 거래내역</td>
  <td class = 'flx2'></td>

  <td class='flx13'> </td>
  <td class = 'flx4'></td>
<td class = 'flx8'></td>
<td class = 'flx8'></td>

  <td class = 'flx0'></td>
<td class = 'flx0'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:11.65pt;'>
  <td class = 'flx4'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx2'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>
<td class = 'flx4'></td>

</tr>
 <tr  style='height:38.6pt;'>
  <td class='flx14' style ='border:1px solid gray;'>년도월일 (숫자만 8자리)</td>
  <td class='flx14' style ='border:1px solid gray;'>유형 (숫자만 2자리)</td>
  <td class='flx14' style ='border-top:1px solid gray;border-right:1px solid gray;border-bottom:1px solid gray;'>거래처명 (30자리)</td>
  <td class='flx15' style ='border:1px solid gray;'>사업자등록번호</td>
  <td class='flx16' style ='border:1px solid gray;'>품     목      (30자리)</td>
  <td class='flx17' style ='border:1px solid gray;'>  수 량</td>
  <td class='flx17' style ='border:1px solid gray;'> 단 가</td>
  <td class='flx15' style ='border:1px solid gray;'>공급가액</td>
  <td class='flx15' style ='border:1px solid gray;'>세액</td>
  <td class='flx15' style ='border:1px solid gray;'>합계금액</td>
  <td class='flx16' style ='border:1px solid gray;'>기본계정 (차 변)</td>
  <td class='flx16' style ='border:1px solid gray;'>의제, 재활용 적요번호 (차 변)</td>
  <td class='flx16' style ='border:1px solid gray;'>상대계정 (대 변)</td>
  <td class='flx17' style ='border:1px solid gray;'>영수/청구</td>
  <td class='flx16' style ='border:1px solid gray;'>대표자 (15자리)</td>
  <td class='flx16' style ='border:1px solid gray;'>업 태 (20자리)</td>
  <td class='flx16' style ='border:1px solid gray;'>종 목 (30자리)</td>
  <td class='flx16' style ='border:1px solid gray;'>사업장주소 (80자리)</td>
  <td class='flx16' style ='border:1px solid gray;'>비고 (30자리)</td>
  <td class='flx17' style ='border-left:1px solid gray;border-top:1px solid gray;border-bottom:1px solid gray;' >전자</td>
  <td class='flx16' style ='border:1px solid gray;'>부서/사원 코드</td>
  <td class='flx17' style ='border:1px solid gray;'>현장코드</td>
  <td class='flx17' style ='border:1px solid gray;'>PJT코드</td>
  <td class='flx17' style ='border:1px solid gray;'>불공제사유</td>
</tr>
 <tr  style='height:26.22pt;'>
  <td class='flx18' style ='border-left:1px solid gray;border-right:1px solid gray;' colspan = '7' rowspan ='1'>합           계</td>
  <td class = 'flx2' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;' ><?php echo $tot_supply?></td>
  
<td class = 'flx2' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'><?php echo $tot_tax?></td>
<td class = 'flx2' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'><?php echo $tot_total?></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx20' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx20' style = 'border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid gray;'></td>
<td class = 'flx19' style = 'border-left:1px solid gray;border-top:1px solid gray;'></td>
<td class = 'flx20' style = 'border:1px solid gray;'></td>
<td class = 'flx20' style = 'border:1px solid gray;'></td>
<td class = 'flx20' style = 'border:1px solid gray;'></td>
<td class = 'flx20' style = 'border:1px solid gray;'></td>

</tr>
<?php createContents($res)?>

 
</table>
</body>
</html>


