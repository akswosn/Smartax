<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/FileUtil.php");
	require_once("../../../class_tax/DBCustomerWork.php");
	$cWork = new DBCustomerWork(true);
	try
	{
		$saupFile = "";
		$deapyoFile = "";
		//사업등록증 파일 업로드
		if(!empty($_FILES['upload_saup_file']['name'])){
			$saupFile = FileUtil::fileSaveForImg($_FILES['upload_saup_file'], 'saup');
			if(empty($saupFile)){
				throw new Exception('사업자등록증 파일 업로드 오류');
			}
		}
		
		//대표자 신분증 파일 업로드
		if(!empty($_FILES['upload_deapyo_file']['name'])){
			$deapyoFile = FileUtil::fileSaveForImg($_FILES['upload_deapyo_file'], 'deapyo');
			if(empty($deapyoFile)){
				throw new Exception('대표자 신분증 파일 업로드 오류');
			}
		}
		$cWork->createWork($_POST, true);
		$res = $cWork->updateSaleCustByJoin($saupFile, $deapyoFile);
		$cWork->destoryWork();
		
		$response1 = array('success' => true,
// 				'data' => array('name' => $new_name, 'size' => $file_size1),
				'msg' => 'OK',
				'CODE' => '00'
		);
		
		
		echo  json_encode($response1);
// 		echo '{CODE: "00", success:true}';
	}
  	catch (Exception $e) 
	{
		$cWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , msg : '$err', success:false}";
		exit;
	}
?>