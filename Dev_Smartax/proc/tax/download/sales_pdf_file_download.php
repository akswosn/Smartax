<?php
	// 파일 Path를 지정합니다.
	// id값등을 이용해 Database에서 찾아오거나 GET이나 POST등으로 가져와 주세요.
	require_once("../../../class/DBWork.php");

	//경호~~~
 	$localPath = DBWork::rootPath.'/upload/service/sales/';	
	

	$filePath = $_POST['fileName'];
	$outputFileName = $_POST['downFileName'];
	//downFileName
	
	$file = $_SERVER['DOCUMENT_ROOT'].$localPath.$filePath;
	$file_size = filesize($file);
	$filename = urlencode($filePath);
	// 접근경로 확인 (외부 링크를 막고 싶다면 포함해주세요)
	if (!eregi($_SERVER['HTTP_HOST'], $_SERVER['HTTP_REFERER']))
	{
		echo "{ CODE: '99' , DATA : '외부 다운로드는 불가능합니다.'}";
		return;
	}
	
	if (is_file($file)) // 파일이 존재하면
	{
		// 파일 전송용 HTTP 헤더를 설정합니다.
		if(strstr($HTTP_USER_AGENT, "MSIE 5.5"))
		{
			header("Content-Type: doesn/matter");
			Header("Content-Length: ".$file_size);
			header("Content-Disposition: filename=".$outputFileName);
			header("Content-Transfer-Encoding: binary");
			header("Pragma: no-cache");
			header("Expires: 0");
		}
		else
		{
			Header("Content-type: file/unknown");
			Header("Content-Disposition: attachment; filename=".$outputFileName);
			Header("Content-Transfer-Encoding: binary");
			Header("Content-Length: ".$file_size);
			Header("Content-Description: PHP3 Generated Data");
			header("Pragma: no-cache");
			header("Expires: 0");
		}
		$fp = fopen($file, "rb");
		if (!fpassthru($fp))
			fclose($fp);
	}
	else {
		echo "{ CODE: '99' , DATA : '파일이 존재하지 않습니다. file path : $file'}";
		return;
	}
?>