<?php
if(isset($_FILES["uploadFile"]) && $_FILES["uploadFile"]["error"]== UPLOAD_ERR_OK)
{
	$UploadDirectory	= '/var/www/html/Saver_Farm/upload/'; //specify upload directory ends with / (slash)
	
	//check if this is an ajax request
	if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])){
		die('HTTP_X_REQUESTED_WITH');
	}
	
	if(move_uploaded_file($_FILES['uploadFile']['tmp_name'], $UploadDirectory.$_FILES['uploadFile']['name'] ))
	{
		die($_FILES['uploadFile']['name'] +' 업로드 되었습니다.');
	}else{
		die('업로드 오류입니다.');
	}
}
else
{
	die('Something wrong with upload! Is "upload_max_filesize" set correctly?');
}