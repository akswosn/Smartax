<?php
//$file_root = '../../xls_data/';

$document_root = $_SERVER['DOCUMENT_ROOT'];
$project_folder_name = 'FarmSaver';

$file_root = $_SERVER['DOCUMENT_ROOT'].'/'.$project_folder_name.'/xls_data/';
if($document_root == '/var/www/#FarmSaver') $file_root = $_SERVER['DOCUMENT_ROOT'].'/xls_data/';

try
	{
		if (isset($_FILES) && !$_FILES['file']['error']) 
		{
		  $temp_file_name = $_FILES['file']['tmp_name'];
		  $original_file_name = $_FILES['file']['name'];

		  //$temp_file_name = iconv('utf-8', 'euc-kr', $temp_file_name); 
		  //$original_file_name = iconv('utf-8', 'euc-kr', $original_file_name); 

		  // Find file extention
		  $ext = explode ('.', $original_file_name);
		  $ext = $ext [count ($ext) - 1];
		
		  // Remove the extention from the original file name
		  //$file_name = str_replace ($ext, '', $original_file_name);
		  $file_name = date("YmdHis"); 
		
		  $new_name = $file_root.'_'.$file_name .'.'. $ext;  
		  
		  // $new_name = iconv('utf-8', 'euc-kr', $new_name); 
		

		  if(move_uploaded_file($temp_file_name, $new_name)) {	
				  $file_name1 = $_FILES['file']["name"];
				  $file_type1 = $_FILES['file']["type"];
				  $file_size1 = round($_FILES['file']["size"] / 1024, 2) . "  Kilo Bytes";

				  $response1 = array('success' => true, 
				    'data' => array('name' => $new_name, 'size' => $file_size1),
				    'msg' => 'File Uploaded successfully'
			  	);
		  		echo json_encode($response1);
			}
			else
			{
			  	$error  = $_FILES['file']["error"];
			  	$response1 = array('success' => false, 'msg' => $error);
			  	echo json_encode($response1);
			}
			
	
		}
		else 
		{
		 switch ($_FILES['file']['error']) 
			{
				case 1:
					$msg = 'php.ini 파일의 upload_max_filesize 설정값을 초과함(업로드 최대용량 초과)';
					break;
				case 2:
					$msg = 'Form에서 설정된 MAX_FILE_SIZE 설정값을 초과함(업로드 최대용량 초과)';
					break;
				case 3:
					$msg = '파일 일부만 업로드 됨';
					break;
				case 4:
					$msg = '업로드된 파일이 없음';
					break;
				case 6:
					$msg = '사용가능한 임시폴더가 없음';
					break;
				case 7:
					$msg = '디스크에 저장할수 없음';
					break;
				case 8:
					$msg = '파일 업로드가 중지됨';
					break;
				default:
					$msg = '시스템 오류가 발생';
					break;
			} 
				
			 	$response1 = array('success' => false, 
						    'data' => array('name' => $temp_file_name, 'size' => $original_file_name),
						    'msg' => $msg
					  	);
			  	echo json_encode($response1);
		}
		
	}
  	catch (Exception $e) 
	{
		$error  = $e -> getMessage();
		//$error  = "오류입니다.";
	  	$response1 = array('success' => false, 'msg' => $error);
	  	echo json_encode($response1);
	}

?>
