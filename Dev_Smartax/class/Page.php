<?php
class Page
{
	protected $htmlHeaderUrl = '';
	protected $htmlBodyUrl = '';

	public function __construct()
	{
		session_start();
		
		
		//체험 고객의 플래그 있으면 회사랑 유저 아이디 값 초기화
		if(isset($_SESSION['ex_flag']))
		{
			unset($_SESSION['uid']);
			unset($_SESSION['co_id']);
			unset($_SESSION['ex_flag']);
		}
		
		$this->htmlHeaderUrl = './view/common/html_header.php';
	}

	public function display()
	{
		$this->beginHtml();
		$this->htmlHeader();
		$this->htmlBody();
		$this->endHtml();
	}

	protected function beginHtml()
	{
		?>
		<!DOCTYPE html>
		<html>
		<?
	}

	protected function endHtml()
	{
		?></html><?
	}

	protected function htmlHeader()
	{
		?><head><?
		if($this->htmlHeaderUrl != '') require($this->htmlHeaderUrl);
		?></head><?
	}

	protected function htmlBody()
	{
		?><body><?
		if($this->htmlBodyUrl != '') require($this->htmlBodyUrl);
		?></body><?
	}
}
?>