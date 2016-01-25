<?php

class FileUtil{
	//upload path 
  	const real_path = DBWork::uploadRootPath;
	/**
	 * 파일 업로드 유틸!!
	 * 파일 경로별로 개발 필요!!
	 * Exception 발생됩니다~~~~~~~~~~~``
	 * @param unknown $fileFiled
	 * @param unknown $fileType
	 * @throws Exception
	 * @return NULL|string*/
	
	public static function fileSaveForImg($fileFiled, $fileCodeNm){
		if(empty($fileFiled) || empty($fileCodeNm)) throw new Exception('file upload parameter 값 오류');
// 		if ($fileFiled["size"] > 52428) {
// 			die('업로드 오류입니다.');
// 			return null;
// 		}
		//allowed file type Server side check
		switch($fileFiled['type'])
		{
			//allowed file types
			case 'image/png':
			case 'image/gif':
			case 'image/jpeg':
			case 'image/bmp':
				/*
					case 'image/pjpeg':
					case 'text/plain':
					case 'text/html': //html file
					case 'application/x-zip-compressed':
					case 'application/pdf':
					case 'application/msword':
					case 'application/vnd.ms-excel':
					case 'video/mp4':
					*/
				break;
			default:
				throw new Exception("bmp,png,gif,jpg만 가능합니다."); //output error
		}
		$baseFileName="";
		$addPath=""; 
		
		switch ($fileCodeNm){
			case 'deapyo':
				$baseFileName = 'D';
				$addPath = 'service/deapyo/';
				break;
				
			case 'saup';
				$baseFileName = 'S';
				$addPath = 'service/saup/';
				break;
			case 'profile';
				$baseFileName = 'P';
				$addPath = 'member/profile/';
				break;
			default:
				$baseFileName ='';
				$addPath = "";
		}
		
		
		$newFileName =  $baseFileName . date('mdYhis', time()) . substr($fileFiled["name"], strpos($fileFiled["name"], '.'), 4);
		
		if(move_uploaded_file($fileFiled['tmp_name'], FileUtil::real_path.$addPath.$newFileName ))
		{
// 			die('업로드 되었습니다.');
			return $newFileName; 
		}else{
// 			die('업로드 오류입니다.');
		switch ($_FILES['file']['error']) 
			{
				case 1:
					throw new Exception('php.ini 파일의 upload_max_filesize 설정값을 초과함(업로드 최대용량 초과)');
					break;
				case 2:
					throw new Exception('Form에서 설정된 MAX_FILE_SIZE 설정값을 초과함(업로드 최대용량 초과)');
					break;
				case 3:
					throw new Exception('파일 일부만 업로드 됨');
					break;
				case 4:
					throw new Exception('업로드된 파일이 없음');
					break;
				case 6:
					throw new Exception('사용가능한 임시폴더가 없음');
					break;
				case 7:
					throw new Exception('디스크에 저장할수 없음');
					break;
				case 8:
					throw new Exception('파일 업로드가 중지됨');
					break;
				default:
					throw new Exception( '시스템 오류가 발생');
					break;
			} 
		}
	}
	
	//PDF 파일 저장
	public function fileSaveForPdf($fileFiled, $password){
		if(empty($fileFiled)) throw new Exception('file upload parameter 값 오류');
		// 		if ($fileFiled["size"] > 52428) {
		// 			die('업로드 오류입니다.');
		// 			return null;
		// 		}
		//allowed file type Server side check
		switch($fileFiled['type'])
		{
			//allowed file types
			case 'application/pdf':
				/*
				 case 'image/png':
				 case 'image/gif':
				 case 'image/jpeg':
				 case 'image/bmp':
				 case 'image/pjpeg':
				 case 'text/plain':
				 case 'text/html': //html file
				 case 'application/x-zip-compressed':
				 case 'application/msword':
				 case 'application/vnd.ms-excel':
				 case 'video/mp4':
				 */
				break;
			default:
				throw new Exception("pdf만 가능합니다."); //output error
		}
		$baseFileName="";
		$addPath="service/sales/";
		
		if(!empty($password)){
			$newFileName = $baseFileName . date('mdYhis', time()) . substr($fileFiled["name"], strpos($fileFiled["name"], '.'), 4);
		}
		else {
			$newFileName =  'PDF'.$baseFileName . date('mdYhis', time()) . substr($fileFiled["name"], strpos($fileFiled["name"], '.'), 4);
		}
		
		if(move_uploaded_file($fileFiled['tmp_name'], FileUtil::real_path.$addPath.$newFileName ))
		{
			// 			die('업로드 되었습니다.');
			$old = FileUtil::real_path.$addPath.$newFileName;
			$new = FileUtil::real_path.$addPath.'PDF'.$newFileName;
			if(!empty($password)){
				//pdf 암호 제거
// 				var_dump("qpdf --password='".$password."' --decrypt ".FileUtil::real_path.$addPath.$newFileName." ".FileUtil::real_path.$addPath.'PDF'.$newFileName);
				$command = "qpdf --password='$password' --decrypt $old $new";
				exec($command, $output, $error);
				if($error != 0){ // 암호 해제시 오류 
					throw new Exception('PDF 암호 해제중 오류가 발생하였습니다. PDF에 설정된 암호와 입력된 암호가 일치하는지 확인 바랍니다.');
				}
				
				$newFileName =  'PDF'.$newFileName;
			}
			
			return $newFileName;
		}
		else{
			// 			die('업로드 오류입니다.');
			switch ($_FILES['file']['error'])
			{
				case 1:
					throw new Exception('php.ini 파일의 upload_max_filesize 설정값을 초과함(업로드 최대용량 초과)');
					break;
				case 2:
					throw new Exception('Form에서 설정된 MAX_FILE_SIZE 설정값을 초과함(업로드 최대용량 초과)');
					break;
				case 3:
					throw new Exception('파일 일부만 업로드 됨');
					break;
				case 4:
					throw new Exception('업로드된 파일이 없음');
					break;
				case 6:
					throw new Exception('사용가능한 임시폴더가 없음');
					break;
				case 7:
					throw new Exception('디스크에 저장할수 없음');
					break;
				case 8:
					throw new Exception('파일 업로드가 중지됨');
					break;
				default:
					throw new Exception( '시스템 오류가 발생');
					break;
			}
		}
	}
}	


?>