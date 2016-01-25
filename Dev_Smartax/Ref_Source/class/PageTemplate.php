<?php
class PageTemplate extends Page
{
	protected $templateHeaderUrl = '';
	protected $templateBodyUrl = '';
	protected $templateFooterUrl = '';

	public function __set($name, $value)
	{
		$this->$name = $value;
	}

	protected function htmlBody()
	{
		?><body><?
		$this->templateHeader();
		$this->templateBody();
		$this->templateFooter();
		?></body><?
	}

	protected function templateHeader()
	{
		if($this->templateHeaderUrl != '') require($this->templateHeaderUrl); 
	}

	protected function templateBody()
	{
		if($this->templateBodyUrl != '') require($this->templateBodyUrl);
	}

	protected function templateFooter()
	{
		if($this->templateFooterUrl != '') require($this->templateFooterUrl);
	}
}
?>