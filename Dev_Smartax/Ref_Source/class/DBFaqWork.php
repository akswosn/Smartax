<?php
class DBFaqWork extends DBWork
{
	//const FAQ=1; // FAQ 상수
	
	//한 페이지에 보여줄 리스트 개수
	protected $page_size=10;
	//한 그룹에 보여줄 페이지의 개수
	protected $page_group_size=5;
	//페이지 인덱스의 최대값, 성능상의 이유로 제한을 둠.
	protected $max_page_index=50;
	//계산할 수 있는 게시글 개수의 최대값, $page_size * $max_page_index
	protected $max_tot_count=500;
	
	public function setPageInfo($pageSize, $pageGroupSize, $maxPageIndex)
	{
		$this->page_size=$pageSize;
		$this->page_group_size=$pageGroupSize;
		$this->max_page_index=$maxPageIndex;
		$this->max_tot_count=$pageSize*$maxPageIndex;	
	}
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	public static function isAdminUser()
	{
		return $_SESSION[DBWork::adminKey]==ADMIN_LEVEL;
	}
	
	public static function isWriteTable($tblKind)
	{
		//로그인 여부 확인
		if(!DBWork::isValidUser())
			return false;
			
		switch ($tblKind) {
			//공지사항
			case 1:
				//회계 FAQ
			case 2:
				//재고 FAQ
				if(self::isAdminUser())
						return true;
					else
						return false;
	
			default:
				//건의/질문하기
				return true;
		}
	}
	
	public function getTableName($tblKind)
	{
		switch((int)$tblKind)
		{
			//회계 FAQ
			case 1: return 'faq_acc';
				
			//재고 FAQ
			case 2: return 'faq_stock';
				
			default: return null;
		}
	}
	
	//FAQ리스트를 얻어온다.
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$pageIndex = (int)$this->param['pg_inx'];
		$searchValue = $this->param['svalue'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//검색어 체크
		if($searchValue){
			if(!$searchValue || !Util::lengthCheck($searchValue, 2, 20)) throw new Exception('Board search param - title length');
			$this->escapeString($searchValue);
		}
		
		//페이지 인덱스 체크		
		if($pageIndex<1 || $pageIndex>$this->max_page_index) throw new Exception('Board Invalid param.');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$pageStart = $this->page_size * ($pageIndex - 1);
		
		if($searchValue) 
			$sql = "select count(*) from $tblName"."_board where faq_ques like $searchValue limit $this->max_tot_count";
		else
			$sql = "select count(*) from $tblName"."_board limit $this->max_tot_count";
		
		$this->querySql($sql);
		
		//전체 질문 개수를 가져온다.
		$row = $this->fetchArrayRow();

		if($searchValue) 
			$sql = "select faq_id, faq_ques from $tblName"."_board where faq_ques like $searchValue order by faq_id limit $pageStart, $this->page_size";
		else 
			$sql = "select faq_id, faq_ques from $tblName"."_board order by faq_id limit $pageStart, $this->page_size";
		
		$this->querySql($sql);
		
		//전체 아이템 개수 리턴
		return $row[0];
	}

	//FAQ 게시글 내용을 얻어온다.
	//param : ['faq_id']
	//$foruse : 게시글을 얻어서 사용하는 용도, 1 이면 답글이나 편집과 같은 수정용, 0이면 조회용
	public function requestPost()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$faqid = (int)$this->param['faq_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//유효하지 않은 faqid
		if($faqid<=0) throw new Exception('Invalid request');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "select * from $tblName"."_board where faq_id=$faqid";
		$this->querySql($sql);
		
		return $this->fetchObjectRow();
	}
	
	//게시글 삭제
	//param : ['faqid'], ['tbl_kind']
	public function requestDelete()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$faqid = (int)$this->param['faq_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//유효하지 않은 faqid
		if($faqid<=0) throw new Exception('Invalid request');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "delete from $tblName"."_board where faq_id=$faqid;";
		$this->updateSql($sql);

		//성공, 실패값 리턴
		$row = $this->getAffectedRows();
		
		//성공:1, 에러 0
		return $row;
	}
	
	//게시판에 새로운 글 입력
	//param : ['faq_ques'], ['faq_answer'], ['tbl_kind']
	public function requestInsert()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$faq_ques = $this->param['faq_ques'];
		$faq_answer = $this->param['faq_answer'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param - table name');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$this->escapeString($faq_ques);
		$this->escapeString($faq_answer);
		
		$sql = "insert into $tblName"."_board (faq_ques, faq_answer) values ('$faq_ques', '$faq_answer');";

		$this->updateSql($sql);
		//성공, 실패값 리턴
		
		$row = $this->getAffectedRows();
		//성공:1, 에러 0
		return $row;
	}
	
	//게시글 수정
	//param : ['faq_ques'], ['faq_answer'], ['faq_id'], ['tbl_kind']
	public function requestEdit()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
	
		$faq_ques = $this->param['faq_ques'];
		$faq_answer = $this->param['faq_answer'];
		$faq_id = $this->param['faq_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
	
		//------------------------------------
		//	db work
		//-------------------------------------
	
		$this->escapeString($faq_ques);
		$this->escapeString($faq_answer);
		
		$sql = "update $tblName"."_board set faq_ques = '$faq_ques', faq_answer = '$faq_answer' where faq_id = '$faq_id';";
		
		$this->updateSql($sql);
		//성공, 실패값 리턴
		
		$row = $this->getAffectedRows();
		//성공:1, 에러 0
		return $row;
	}
}
?>