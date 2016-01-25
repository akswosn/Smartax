<?php
	require_once("../../class/Utils.php");
	require_once("../../class/DBWork.php");
	require_once("../../class/DBMemberWork.php");
	require_once("../../class_tax/FileUtil.php");
	$memWork = new DBMemberWork(true);
	try
	{
		$imgFile = null;
		if(!empty($_FILES['user_profile_img'])){
			if(!empty($_FILES['user_profile_img']['name'])){
				$imgFile = FileUtil::fileSaveForImg($_FILES['user_profile_img'], 'profile');
			}
			else {
				$imgFile = '';
			}
		}
		else {
			$imgFile = '';
		}
		$memWork->createWork(-1, true);
		$res = $memWork->requestProfileModify($imgFile);
		$memWork->destoryWork();
	}
  	catch (Exception $e) 
	{
		$memWork->destoryWork();
		Util::serverLog($e);
		echo $e;
		exit;
	}
	
	if($_POST['isPopup'] == 'y'){
?>
<script>
	window.opener.profileImgView('<?php echo $imgFile;?>');
	window.close();
</script>
<?
	}else {
		header("Location:../../route.php?contents=011");
	}
?>



