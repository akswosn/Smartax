<?php

class DBBoardWork extends DBWork
{
	//한 페이지에 보여줄 게시글의 개수
	protected $page_size = 20;
	//한 그룹에 보여줄 페이지의 개수 
	protected $page_group_size = 10;
	//페이지 인덱스의 최대값, 성능상의 이유로 제한을 둠.
	//메모리에 따라 차이가 나지만 limit 의 페이지가 100 을 넘어가면
	//index 를 사용하지 못하고 file sort를 하게 된다. 
	//메모리에 따라 explain 을 실행해 보고 값을 설정한다. 
	protected $max_page_index = 100;
	//계산할 수 있는 게시글 개수의 최대값, $page_size * $max_page_index
	protected $max_tot_count = 2000;

	public function setPageInfo($pageSize, $pageGroupSize, $maxPageIndex)
	{
		$this->page_size = $pageSize;
		$this->page_group_size = $pageGroupSize;
		$this->max_page_index = $maxPageIndex;
		$this->max_tot_count = $pageSize * $maxPageIndex;
	}
	
	public function __get($name)
	{
		return $this->$name;
	}
		
	public function getTableName($tblKind)
	{
		switch((int)$tblKind)
		{
			//community
			case 1: return 'qna';
			
			//report
			case 11: return 'noti';
			
			//자료실
			case 21: return 'data';
			
			default: return null;
		}
	}
	
	//게시판에 새로운 글 입력
	//param : ['brd_title'], ['brd_message'], ['post_id'], ['tbl_kind']
	public function requestInsert()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$brd_title = $this->param['brd_title'];
		$brd_message = $this->param['brd_message'];
		$parent_id = (int)$this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//parent_id 가 0 인 경우는 새글쓰기이므로 유효하다.
		if($parent_id<0) throw new Exception('Board Invalid param. - id');
		
		//길이 체크
		if(!Util::lengthCheck($brd_title, 2, 100)) throw new Exception('Board Invalid param - title length');
		//if($tblName!='data'&&!Util::lengthCheck($brd_message, 2, 10000)) throw new Exception('Board Invalid param - message length '.$tblName.strlen($brd_message));

		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param - table name');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$this->escapeString($brd_title);
		$this->escapeString($brd_message);
		
		$uid = (int)$_SESSION['uid'];
		$nick = $_SESSION['nickname'];
		
		$sql = "call sp_board_write($parent_id, '$tblName', $uid, '$nick', '$brd_title', '$brd_message')";

		$this->querySql($sql);
		//성공, 실패값 리턴
		
		$row = $this->fetchArrayRow();
		//성공:1, 에러 0
		return $row[0];
	}

	//게시글 수정
	//param : ['brd_title'], ['brd_message'], ['post_id'], ['tbl_kind'], ['poster_uid']
	public function requestEdit()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$brd_title = $this->param['brd_title'];
		$brd_message = $this->param['brd_message'];
		$postid = (int)$this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		//poster_uid, 게시자의 uid
		$puid = (int)$this->param['poster_uid'];
		
		//글 수정이므로 1 보다 작으면 유효하지 않다.
		if($postid<=0) throw new Exception('Board Invalid param.');
		
		//길이 체크
		if(!Util::lengthCheck($brd_title, 2, 60)) throw new Exception('Board Invalid param - title length');
		//if($tblName!='data'&&!Util::lengthCheck($brd_message, 2, 10000)) throw new Exception('Board Invalid param - message length '.$tblName.strlen($brd_message));
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
		
		//자신의 글이 아니면 오류, 
		$uid = (int)($_SESSION['uid']);
		if($uid==0) throw new Exception('Invalid Session.');
		if($uid!=$puid) throw new Exception('Invalid request');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$this->escapeString($brd_title);
		$this->escapeString($brd_message);
		
		$sql = "call sp_board_edit($postid, '$tblName', $uid, '$brd_title', '$brd_message')";
		$this->querySql($sql);
		
		//성공, 실패값 리턴
		$row = $this->fetchArrayRow();
		
		//성공:1, 에러 0
		return $row[0];
	}
	
	//글목록 보기 용, $tot_count 로 전체 게시글 개수를 리턴한다.
	//param : ['tbl_kind'], ['pg_inx'], (['stype'], ['svalue']) 검색 옵션, 생략하면 전체 게시글
	public function requestList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$tblName = $this->getTableName($this->param['tbl_kind']);
		$pageIndex = (int)$this->param['pg_inx'];
		$searchType = $this->param['stype'];
		$searchValue = "";
		
		if($searchType)
		{
			$searchValue = $this->param['svalue'];
			
			if(!$searchValue || !Util::lengthCheck($searchValue, 2, 20)) throw new Exception('Board search param - title length');
			
			$this->escapeString($searchValue);
		}
		
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
		//페이지 인덱스 체크		
		if($pageIndex<1 || $pageIndex>$this->max_page_index) throw new Exception('Board Invalid param.');

		//------------------------------------
		//	db work
		//-------------------------------------

		//게시글 리스트를 얻어온다.
		if($searchType) $sql = "call sp_board_search('$tblName', $pageIndex, $this->page_size, $this->max_tot_count, $searchType, '$searchValue')";
		else $sql = "call sp_board_list('$tblName', $pageIndex, $this->page_size, $this->max_tot_count)"; 
		
		$this->multiQuerySql($sql);
		
		//첫번째 쿼리 결과가 기본 셋팅되어져 있다.
		//전체 게시글 수 결과를 가져온다.
		$row = $this->fetchArrayRow();
		
		//게시글 리스트 결과를 가져온다.
		if(!$this->nextQueryResult()) throw new Exception('Board Query Error.');
		
		//전체 개시글 개수 리턴
		return $row[0];
	}
		
	//게시글 내용을 얻어온다.
	//param : ['post_id'], ['tbl_kind'] ...
	//$foruse : 게시글을 얻어서 사용하는 용도, 1 이면 답글이나 편집과 같은 수정용, 0이면 조회용
	public function requestPost($foruse = 0)
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$postid = (int)$this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//유효하지 않은 postid
		if($postid<=0) throw new Exception('Invalid request');
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "call sp_board_view($foruse, '$tblName', $postid)";
		$this->querySql($sql);
		
		return $this->fetchObjectRow();
	}
	
	//게시글 삭제
	//param : ['post_id'], ['tbl_kind'], ['poster_uid']
	public function requestDelete()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$postid = (int)$this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		//poster_uid, 게시자의 uid
		$puid = (int)$this->param['poster_uid'];
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
		
		//유효하지 않은 postid
		if($postid<=0) throw new Exception('Invalid request');
		
		//자신의 글이 아니면 오류, 
		$uid = (int)($_SESSION['uid']);
		if($uid==0) throw new Exception('Invalid Session.');
		if($uid!=$puid) throw new Exception('Invalid request');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "call sp_board_delete('$tblName', $postid, $uid)";
		//$sql = "delete from noti_board_header where post_id = $postid and poster_uid = $puid";
		$this->querySql($sql);

		//성공, 실패값 리턴
		$row = $this->fetchArrayRow();
		
		//성공:1, 에러 0
		return $row[0];
	}
	
	//------------------------------------------------------------------------
	// 여기부터 게시판 댓글 함수
	//------------------------------------------------------------------------
	
	//param : ['post_id'], ['tbl_kind'], ['cmt_message'] 
	//새로 추가된 comment_id 를 리턴한다.
	public function requestCommentInsert()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$postid = (int)$this->param['post_id'];		//댓글의 원본 게시글 아이디
		$tblName = $this->getTableName($this->param['tbl_kind']);
		$cmt_message = $this->param['cmt_message'];
		
		//유효하지 않은 postid
		if($postid<=0) throw new Exception('Invalid request');
		//길이 체크
		if(!Util::lengthCheck($cmt_message, 2, 500)) throw new Exception('Comment Invalid param - message length');
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Comment Invalid param - table name');
		
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$this->escapeString($cmt_message);
		
		$uid = (int)$_SESSION['uid'];
		$nick = $_SESSION['nickname'];
		
		//query-----------------------------
		$sql = "insert into $tblName" . "_comment values (NULL, $postid, $uid, now(), '$nick', '$cmt_message')";
		$this->updateSql($sql);
		
		$sql = "select LAST_INSERT_ID()";
		$this->querySql($sql);
		//-------------------------------
		
		$row = $this->fetchArrayRow();
		
		//새로 추가된 comment_id 를 리턴한다.
		return $row[0];
	}
	
	//댓글 수정
	//param : ['post_id'], ['tbl_kind'], ['cmt_message'], ['user_id'], ['comment_id']
	public function requestCommentEdit()
	{
		//------------------------------------
		//	param valid check
		//------------------------------------
		
		$postid = (int)$this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		$cmt_message = $this->param['cmt_message'];
		//댓글 아이디
		$cmtid = (int)$this->param['comment_id'];
		//댓글 작성자 user_id
		$userid = (int)$this->param['user_id'];
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Comment Invalid param - table name');
		//유효하지 않은 postid
		if($postid<=0) throw new Exception('Invalid request');
		if($cmtid<=0) throw new Exception('Invalid request');
		//길이 체크
		if(!Util::lengthCheck($cmt_message, 2, 500)) throw new Exception('Comment Invalid param - message length');
		
		//자신의 글이 아니면 오류
		$uid = (int)($_SESSION['uid']);
		if($uid==0) throw new Exception('Invalid Session.');
		if($uid!=$userid) throw new Exception('Invalid request');
		
		//------------------------------------
		//	db work
		//------------------------------------
		
		$this->escapeString($cmt_message);
		
		$sql = "update $tblName" . "_comment set comment_date = now(), message = '$cmt_message' where comment_id = $cmtid and post_id = $postid and user_id = $uid";
		$this->updateSql($sql);
		
		return ($this->getAffectedRows()>0);
	}
	
	//전체 댓글 개수 리턴
	//param : ['post_id'], ['tbl_kind'], ['pg_inx'] 
	public function requestCommentList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$postid = $this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		$pageIndex = (int)$this->param['pg_inx'];
		
		//유효하지 않은 postid
		if($postid<=0) throw new Exception('Invalid request');
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Comment Invalid param.');
		//페이지 인덱스 체크
		if($pageIndex<1 || $pageIndex>$this->max_page_index) throw new Exception('Comment Invalid param.');

		//------------------------------------
		//	db work
		//-------------------------------------

		//전체 댓글 개수	
		$sql = "select count(*) from $tblName" . "_comment where post_id = $postid limit " . $this->max_tot_count;
		$this->querySql($sql);
		$row = $this->fetchArrayRow();

		//댓글 리스트를 얻어온다.
    	$pageStart = $this->page_size * ($pageIndex-1);
		//$sql = "select * from $tblName" . "_comment where post_id = $postid order by comment_id limit $pageStart, " . $this->page_size;
		//기본으로 comment_id 순으로 불러오므로 order by 가 필요없다.
		$sql = "select * from $tblName" . "_comment where post_id = $postid limit $pageStart, " . $this->page_size;
		$this->querySql($sql);
		
		//전체 댓글 개수 리턴
		return $row[0];
	}

	//댓글 삭제
	//param : ['post_id'], ['tbl_kind'], ['user_id'], ['comment_id']
	public function requestCommentDelete()
	{
		//------------------------------------
		//	param valid check
		//------------------------------------
		
		$postid = (int)$this->param['post_id'];
		$tblName = $this->getTableName($this->param['tbl_kind']);
		//댓글 아이디
		$cmtid = (int)$this->param['comment_id'];
		//댓글 작성자 user_id
		$userid = (int)$this->param['user_id'];
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
		//유효하지 않은 postid
		if($postid<=0) throw new Exception('Invalid request');
		if($cmtid<=0) throw new Exception('Invalid request');
		
		//자신의 글이 아니면 오류, 
		$uid = (int)($_SESSION['uid']);
		if($uid==0) throw new Exception('Invalid Session.');
		if($uid!=$userid) throw new Exception('Invalid request');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "delete from $tblName" . "_comment where comment_id = $cmtid and post_id = $postid and user_id = $uid";
		$this->updateSql($sql);
		
		return ($this->getAffectedRows()>0);
	}

	//------------------------------------------------------------------------
	// 여기부터 피드백 함수
	//------------------------------------------------------------------------
	
	
	//피드백 넣기
	//param : ['user_id'], ['nickname'], ['fdb_message']
	//새로 추가된 comment_id 를 리턴한다.
	public function requestFeedbackInsert()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$fdb_message = $this->param['fdb_message'];
		$uid =  $this->param['user_id'];
		$nick =  $this->param['nickname'];
		
		//길이 체크
		if(!Util::lengthCheck($fdb_message, 2, 500)) throw new Exception('Feedback Invalid param - message length');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$this->escapeString($fdb_message);
		
		//query-----------------------------
		$sql = "insert into feedback_comment values (NULL, $uid, now(), '$nick', '$fdb_message')";
		$this->updateSql($sql);
		
		$sql = "select LAST_INSERT_ID()";
		$this->querySql($sql);
		//-------------------------------
		
		$row = $this->fetchArrayRow();
		
		//새로 추가된 comment_id 를 리턴한다.
		return $row[0];
	}
	
	//피드백 리스트
	//param : ['pg_inx']
	public function requestFeedbackList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$pageIndex = (int)$this->param['pg_inx'];
		
		//페이지 인덱스 체크
		if($pageIndex<1 || $pageIndex>$this->max_page_index) throw new Exception('Comment Invalid param.');

		//------------------------------------
		//	db work
		//-------------------------------------

		$pageStart = $this->page_size * ($pageIndex-1);
		$sql = "select * from feedback_comment order by comment_id desc limit $pageStart, " . $this->page_size;
		$this->querySql($sql);
		
		return true;
	}
	
	//메인 화면 포틀릿 데이터
	//param : ['post_id'], ['tbl_kind'], ['user_id'], ['comment_id']
	public function requestPortlet()
	{
		//------------------------------------
		//	param valid check
		//------------------------------------
		$tblName = $this->getTableName($this->param['tbl_kind']);
		
		//유효한 게시판 종류가 아니면
		if($tblName==null) throw new Exception('Board Invalid param.');
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT post_id, post_title FROM $tblName" . "_board_header ORDER BY group_id LIMIT 0,10";
		$this->querySql($sql);
	}
	
	public function getBoardList() {
		
	}
}

?>