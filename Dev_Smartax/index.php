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
        <title>Smartax Service</title>
		<link rel="shortcut icon" href="images/main/smartax.png">
		
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=0.15, minimum-scale=0.15, user-scalable=yes " />  
        <!-- <meta name="viewport" content="width=device-width,user-scalable=no">  -->            <!-- 모바일 최적화 viewport -->
		<!-- <meta name="viewport" content="width=device-width, initial-scale=0.1">       <- 기존 view port  -->
		<!-- Javascript Library 
		<script type="text/javascript" src="./js/vendor/modernizr-2.6.2.min.js"></script>
		-->
        <script type="text/javascript" src="./extjs/lib/ext-all.js"></script>
        
        <!-- CSS Library -->
        <link rel="stylesheet" href="./extjs/lib/resources/css/ext-all.css"/>
        <link rel="stylesheet" href="./extjs/css/default.css"/>
        <link rel="stylesheet" href="./css/global.css">
        
        <!-- Excel Library 
		<script src="./extjs/ux/exporter/swfobject.js"></script>
		<script src="./extjs/ux/exporter/downloadify.js"></script>
		<script src="./js/excellib/xlsx.core.min.js"></script>
		<script src="./js/excellib/xls.core.min.js"></script>
		<script src="./js/excellib/CSV.js"></script>
		<script src="./js/excellib/ExcelMgr.js"></script>
        -->
		
		<!-- ExtJS Common  -->
		<script src="./extjs/js/Define.js?ver=08"></script>
		<script src="./extjs/js/ValidateFunc.js?ver=08"></script>
		<script src="./extjs/js/Global.js?ver=08"></script>	
		<!-- 
		<script src="./extjs/js/StoreInfo.js?ver=08"></script>
		 -->
		<script src="./extjs/js/SmartaxCommonStore.js"></script>
		<!-- ExtJS Popup 
		<script src="./extjs/popup/Common_Pop_FileUpload.js?ver=08"></script>
		<script src="./extjs/popup/Common_Pop_Config.js?ver=08"></script>
		-->
		<script src="./extjs/js/pdfobject.js"></script><!-- 화면 컨트롤 -->
		<script src="./extjs/App.js?ver=08"></script><!-- 화면 컨트롤 -->
    </head>
    <body>
    	<!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        
    	<!-- Web Site -->
    	<script src="./js/Toast.js"></script>
    	<iframe id="web_site_area" name="web_site_area" src="./route.php"></iframe>
        <!-- ExtJS Flatform -->
        <div id="app_area">&nbsp;</div>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.1.min.js"><\/script>')</script>
		
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
		
		<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
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