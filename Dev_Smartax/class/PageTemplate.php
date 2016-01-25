<?php
class PageTemplate extends Page
{
	protected $templateHeaderUrl = '';
	protected $templateBodyUrl = '';
	protected $templateFooterUrl = '';
	
	public function __construct($isSessionUse = false)
	{
		parent::__construct($isSessionUse);
		
	    $this->templateHeaderUrl = './view/common/header.php';
		$this->templateFooterUrl = './view/common/footer.php';
	}

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
		?><div class="header"><?
		if($this->templateHeaderUrl != '') require($this->templateHeaderUrl); 
		?></div><?
	}

	protected function templateBody()
	{
		?><div class="container"><?
		if($this->templateBodyUrl != '') require($this->templateBodyUrl);
		?></div><?
	}

	protected function templateFooter()
	{
		if($this->templateFooterUrl != '') require($this->templateFooterUrl);
	}
}
?>