<?php
	require_once("../../../class/Utils.php");
	require_once("../../../class/DBWork.php");
	require_once("../../../class_tax/DBAdminWork.php");

	$aWork = new DBAdminWork(true);

	try
	{
		$aWork->createWork($_POST, true);
		
		$type = $_POST['type'];
		$mem_level = $_POST['mem_level'];
		
		if($mem_level == '3'){//세무(등록 삭제 동일)
			$res = $aWork->registUserAsCompForSales();
		}
		else {
			if($type == 'R'){
				$res = $aWork->registUserAsComp();
			}
			else if($type == 'D'){
				$res = $aWork->deleteUserAsComp();
			}
			else{
				echo "{ CODE: '99' , DATA : '타입오류입니다.'}";
				exit;
			}
		}
		
		$aWork->destoryWork();

		if($res > 0){
			$ret['CODE']='00';
		}
		else {
			$ret['CODE']='99';
			$ret['DATA']='변경실패';
		}
		echo json_encode($ret);
	}
  	catch (Exception $e) 
	{
		$aWork->destoryWork();
		$err = $e -> getMessage();
		Util::serverLog($e);
		echo "{ CODE: '99' }";
		exit;
	}
?>