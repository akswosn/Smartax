<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/FileUtil.php");
	require_once("../../../class_tax/DBTaxWork.php");

	$tWork = new DBTaxWork(true);

	try
	{
		$pdfFile = null;
		if(!empty($_FILES['pdf']['name'])){
			$pdfFile = FileUtil::fileSaveForPdf($_FILES['pdf'], $_POST['pdf_password']);
			if(empty($pdfFile)){
				throw new Exception('pdf 파일 업로드 오류');
			}
		}
		
		$tWork->createWork($_POST, true);
		$res = $tWork->insertSalesUpload($pdfFile);
		$res = $tWork->selectSalesDataAffterInsert();
		$tWork->destoryWork();
		
		$response1 = array('success' => true,
		// 				'data' => array('name' => $new_name, 'size' => $file_size1),
				'msg' => 'OK',
				'CODE' => '00',
				'DATA'=>$res
		);
		
		
		echo  json_encode($response1);
	}
  	catch (Exception $e) 
	{
		$tWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , msg : '$err'}";
		exit;
	}
?>