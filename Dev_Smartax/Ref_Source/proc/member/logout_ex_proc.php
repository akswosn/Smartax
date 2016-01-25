<?php
	session_start();
	if(isset($_SESSION['ex_flag']))
	{
		unset($_SESSION['uid']);
		unset($_SESSION['co_id']);
		unset($_SESSION['ex_flag']);
	}
	echo "{ CODE : 'y' }"
?>