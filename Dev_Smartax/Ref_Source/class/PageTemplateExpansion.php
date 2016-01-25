<?php
class PageTemplateExpansion extends PageTemplate
{
	protected $templateHeaderTopUrl = '';
	protected $templateHeaderMiddleUrl = '';
	protected $templateHeaderBottomUrl = '';
	
	public function __construct($isSessionUse = false)
	{
		parent::__construct($isSessionUse);
		
		$this->templateHeaderTopUrl = './view/common/body_header_top.php';
	    $this->templateHeaderMiddleUrl = './view/common/body_header_middle.php';
	    $this->templateHeaderBottomUrl = './view/common/body_header_bottom.php';
		
		$this->templateFooterUrl = './view/common/body_footer.php';
	}
	
	protected function templateHeader()
	{
		?><div class="header"><?
		$this->templateHeaderTop();
		$this->templateHeaderMiddle();
		$this->templateHeaderBottom();
		?></div><?
	}
	
	protected function templateHeaderTop()
	{
		if ($this->templateHeaderTopUrl != '') require($this->templateHeaderTopUrl);
	}

	protected function templateHeaderMiddle()
	{
		if ($this->templateHeaderMiddleUrl != '') require($this->templateHeaderMiddleUrl);
	}
	
	protected function templateHeaderBottom()
	{
		if ($this->templateHeaderBottomUrl != '') require($this->templateHeaderBottomUrl);
	}
	
	protected function templateBody()
	{
		?><div class="container"><?
		$this->templateContents();
		?></div><?
	}
	
	protected function templateContents()
	{
		if ($this->templateContentsUrl != '') require($this->templateContentsUrl);
	}
}
?>