<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../acct_class/DBJunpyoWork.php");

	$gWork = new DBJunpyoWork(true);

	try
	{
		$gWork->createWork($_POST, false);
		$res = $gWork->requestDelete();
		$gWork->destoryWork();
		
		echo "{ CODE: '00', ";
		echo "DATA: [";
		
		if(count($res) > 0)
		{
			for($idx=0;$idx<count($res);$idx++){
				echo "{ cd: '".$res[$idx]['code']."' }";
				if($i!=(count($res)-1)) echo ",";
			}
			echo ']}';	
		}
		else
		{
			echo ']}';	
		}
		
	}
  	catch (Exception $e) 
	{
		$gWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' , DATA : '$err'}";
		exit;
	}
?>