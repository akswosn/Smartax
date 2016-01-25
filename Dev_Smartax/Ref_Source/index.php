<?
//캐시 사용 억제 코드 - 나중에 제거
header("Cache-Control:no-cache");
header("Pragma:no-cache");
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>태극회계온라인 | 산천경제연구소</title>
        <meta name="description" content="세계 최초 비차대 복식부기 시스템. 현금출납장 복식회계 프로그램은 역시 태극회계!! 차변, 대변없이 입금, 출금에 계정만 입력하면 OK!!">
        <meta name="viewport" content="width=device-width, initial-scale=0.1">
		
		<!-- Javascript Library -->
		<script type="text/javascript" src="./js/vendor/modernizr-2.6.2.min.js"></script>
        <script type="text/javascript" src="./extjs/lib/ext-all.js"></script>
        
        <!-- CSS Library -->
        <link rel="stylesheet" href="./extjs/lib/resources/css/ext-all.css"/>
        <link rel="stylesheet" href="./extjs/css/default.css"/>
        <link rel="stylesheet" href="./css/global.css">
        
        <!-- Excel Library -->
		<script src="./extjs/ux/exporter/swfobject.js"></script>
		<script src="./extjs/ux/exporter/downloadify.js"></script>
		<script src="./js/excellib/xlsx.core.min.js"></script>
		<script src="./js/excellib/xls.core.min.js"></script>
		<script src="./js/excellib/CSV.js"></script>
		<script src="./js/excellib/ExcelMgr.js"></script>
		
		<!-- ExtJS Common  -->
		<script src="./extjs/js/Define.js?ver=08"></script>
		<script src="./extjs/js/ValidateFunc.js?ver=08"></script>
		<script src="./extjs/js/Global.js?ver=08"></script>	
		<script src="./extjs/js/StoreInfo.js?ver=08"></script>
		
		<!-- ExtJS Popup -->
		<script src="./extjs/popup/Common_Pop_FileUpload.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Config.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Help.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Accounts_P28.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Accounts.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Accounts_Search.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_ShowAccounts.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Jakmok.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Trds_Search.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Trds.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Zip.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Workcode.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_WorkcodeAdd.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Workjak.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_WorkJakAdd.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Search.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Oridata.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Oridata_DM.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_AccountsAdd.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_JakmokAdd.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_TrdsAdd.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Items_Output.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Items_Input.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_ItemsAdd.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Order.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_InputExam.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_InputHelper.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_CustomersLedger.js?ver=07"></script><!-- 거래처 원장 팝업 -->
		<script src="./extjs/popup/Common_Pop_CreditSPDetail.js?ver=07"></script><!-- 외상채권, 외상채무 거래명세표 팝업 -->
		<script src="./extjs/popup/Common_Pop_BalanceCarried.js?ver=07"></script><!-- 잔액이월 팝업 -->
		<script src="./extjs/popup/Common_Pop_StockCarried.js?ver=07"></script><!-- 재고이월 팝업 -->
		<script src="./extjs/popup/Common_Pop_CloseYear.js?ver=07"></script><!-- 마감작업 팝업 -->
		<script src="./extjs/popup/Common_Pop_ExcelUpload.js?ver=08"></script><!-- 엑셀업로드 팝업 -->
		<script src="./extjs/popup/Common_Pop_Trds_Mgr.js?ver=08"></script><!-- 거래처 엑셀 수정 팝업 -->
		<script src="./extjs/popup/Common_Pop_Items_Mgr.js?ver=08"></script><!-- 상품 엑셀 수정 팝업 -->
		<script src="./extjs/popup/Common_Pop_Stock_Mgr.js?ver=08"></script><!-- 초기재고 엑셀 등록 팝업 -->
		<script src="./extjs/popup/Common_Pop_BalanceSheet.js?ver=07"></script><!-- 대차표 팝업 -->
		<script src="./extjs/popup/Common_Pop_Atax_Type_Search.js?ver=07"></script><!-- 부가세 과세 유형 팝업 -->
		
		<!-- ExtJS Menu -->
		<script src="./extjs/view/Menu01_Page.js?ver=08"></script><!-- 분개장 화면 -->
		<script src="./extjs/view/Menu02_Page.js?ver=08"></script><!-- 회계표 화면 -->
		<script src="./extjs/view/Menu03_Page.js?ver=08"></script><!-- 월별손익 화면 -->
		<script src="./extjs/view/Menu04_Page.js?ver=08"></script><!-- 현금출납부 화면 -->
		<script src="./extjs/view/Menu05_Page.js?ver=08"></script><!-- 과목원장 화면 -->
		<script src="./extjs/view/Menu06_Page.js?ver=08"></script><!-- 거래처원장 화면 -->
		<script src="./extjs/view/Menu07_Page.js?ver=08"></script><!-- 결산서 화면 -->
		<script src="./extjs/view/Menu08_Page.js?ver=08"></script><!-- 계정코드 등록 화면 -->
		<script src="./extjs/view/Common_AccountReg.js?ver=08"></script>
		<script src="./extjs/view/Menu09_Page.js?ver=08"></script><!-- 거래처등록 화면 -->
		<script src="./extjs/view/Common_TrdReg.js?ver=08"></script>
		<script src="./extjs/view/Menu10_Page.js?ver=08"></script><!-- 작목코드등록 화면 -->
		<script src="./extjs/view/Common_JakmokReg.js?ver=08"></script>
		<script src="./extjs/view/Menu11_Page.js?ver=08"></script><!-- 기초금액등록 화면 -->
		<script src="./extjs/view/Menu12_Page.js?ver=08"></script><!-- 영농일지등록 화면 -->
		<script src="./extjs/view/Common_WorkdiaryReg.js?ver=08"></script>
		<script src="./extjs/view/Menu13_Page.js?ver=08"></script><!-- 영농작목코드등록 화면 -->
		<script src="./extjs/view/Menu14_Page.js?ver=08"></script><!-- 영농작업코드등록 화면 -->
		<script src="./extjs/view/Common_WorkCodeReg.js?ver=08"></script>
		<script src="./extjs/view/Menu15_Page.js?ver=08"></script><!-- 입고등록 화면 -->
		<script src="./extjs/view/Menu16_Page.js?ver=08"></script><!-- 입고현황 화면 -->
		<script src="./extjs/view/Menu17_Page.js?ver=08"></script><!-- 주문등록 화면 -->
		<script src="./extjs/view/Menu18_Page.js?ver=08"></script><!-- 주문현황 화면 -->
		<script src="./extjs/view/Menu19_Page.js?ver=08"></script><!-- 출고등록 화면 -->
		<script src="./extjs/view/Menu20_Page.js?ver=08"></script><!-- 출고현황 화면 -->
		<script src="./extjs/view/Menu21_Page.js?ver=08"></script><!-- 재고현황 화면 -->
		<script src="./extjs/view/Menu22_Page.js?ver=08"></script><!-- 상품수불부 화면 -->
		<script src="./extjs/view/Common_ItemgrpReg.js?ver=08"></script><!-- 상품분류등록 화면 -->
		<script src="./extjs/view/Menu23_Page.js?ver=08"></script>
		<script src="./extjs/view/Common_ItemReg.js?ver=08"></script><!-- 상품등록 화면 -->
		<script src="./extjs/view/Menu24_Page.js?ver=08"></script>
		<script src="./extjs/view/Menu25_Page.js?ver=08"></script><!-- 초기재고등록 화면 -->
		<script src="./extjs/view/Menu26_Page.js?ver=08"></script><!-- 일정관리등록 화면 -->
		<script src="./extjs/view/Menu27_Page.js?ver=08"></script>
		<script src="./extjs/view/Menu28_Page.js?ver=08"></script><!-- 통장 엑셀 업로드 화면 -->
		<script src="./extjs/view/Menu29_Page.js?ver=08"></script><!-- 일계표 월계표 화면 -->
		<script src="./extjs/view/Menu30_Page.js?ver=08"></script><!-- 부가세 화면 -->
		<script src="./extjs/view/Menu31_Page.js?ver=08"></script><!-- 수지표 화면 -->
		<script src="./extjs/view/Menu32_Page.js?ver=08"></script><!-- 세금계산서합계표 -->
		<script src="./extjs/view/Menu33_Page.js?ver=08"></script><!-- 세금계산서집계표 -->
		<script src="./extjs/view/Menu34_Page.js?ver=08"></script><!-- 세금계산서햡계표검증  -->
		<script src="./extjs/view/Menu35_Page.js?ver=08"></script><!-- 부가가치세신고서 -->
		<script src="./extjs/view/Menu36_Page.js?ver=08"></script><!-- 신용카드매출전표등 발행금액 집계표 -->
		<script src="./extjs/view/Menu37_Page.js?ver=08"></script><!-- 계산서합계표 -->
		
		<script src="./extjs/view/App.js?ver=08"></script><!-- 화면 컨트롤 -->
    </head>
    <body>
    	<!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        
    	<!-- Web Site -->
    	<iframe id="web_site_area" src="./route.php"></iframe>
        <!-- ExtJS Flatform -->
        <div id="app_area">&nbsp;</div>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.1.min.js"><\/script>')</script>

        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>
    </body>
</html>