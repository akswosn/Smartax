<?php

class DBBoardWork extends DBWork {
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

	public function setPageInfo($pageSize, $pageGroupSize, $maxPageIndex) {
		$this -> page_size = $pageSize;
		$this -> page_group_size = $pageGroupSize;
		$this -> max_page_index = $maxPageIndex;
		$this -> max_tot_count = $pageSize * $maxPageIndex;
	}

	public function __get($name) {
		return $this -> $name;
	}

	public function getTableName($tblKind) {
		switch((int)$tblKind) {
			//new 10
			case 11 :
				return 'notify';
			case 12 :
				return 'event';
			case 13 :
				return 'patch';

			//community 60
			case 61 :
				return 'strategy';
			case 62 :
				return 'free';
			case 63 :
				return 'art';
			case 64 :
				return 'tip';
			case 65 :
				return 'user';
			case 66 :
				return 'debate';
			case 67 :
				return 'anony';

			/*
			 //community
			 case 1: return 'free';
			 case 2: return 'tip';
			 case 3: return 'ques';
			 case 4: return 'debate';
			 case 5: return 'screen';

			 //report
			 case 11: return 'notify';
			 case 12: return 'event';
			 case 13: return 'update';

			 //clan
			 case 21: return 'clan';

			 //support
			 case 61: return 'down';
			 */

			default :
				return null;
		}
	}

	//게시판에 새로운 글 입력 -- new
	//param : ['brd_title'], ['brd_message'], ['post_id'], ['tbl_kind'],['ufile']
	public function requestInsert($ufile) {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$brd_title = $this -> param['brd_title'];
		$brd_message = $this -> param['brd_message'];
		$parent_id = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);

		//echo $ufile;
		//-------------------------------------
		if (!strcmp('notify', $tblName) || !strcmp('event', $tblName) || !strcmp('update', $tblName))
			if ((int)$_SESSION['uid'] != 1)
				throw new Exception('Invalid Insert. - Notify');
		//--------------------------------------

		//parent_id 가 0 인 경우는 새글쓰기이므로 유효하다.
		if ($parent_id < 0)
			throw new Exception('Board Invalid param. - id');

		//길이 체크
		if (!Util::lengthCheck($brd_title, 2, 60))
			throw new Exception('Board Invalid param - title length');
		if (!Util::lengthCheck($brd_message, 2, 10000))
			throw new Exception('Board Invalid param - message length');

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param - table name');

		//------------------------------------
		//	db work
		//-------------------------------------

		$this -> escapeString($brd_title);
		$this -> escapeString($brd_message);

		$uid = (int)$_SESSION['uid'];
		$nick = $_SESSION['user_nick'];

		//echo $parent_id."//".$tblName."//".$uid."//".$nick."//".$brd_title."//".$brd_message."//".$ufile."//";
		//$sql = "call sp_board_write($parent_id, '$tblName', $uid, '$nick', '$brd_title', '$brd_message','$ufile')";

		$header_t = $tblName . "_board_header";
		$body_t = $tblName . "_board_body";

		//답글을 입력하는 경우
		if ($parent_id > 0) {
			$sql = "select group_id, child_count, group_level from $header_t where post_id = $parent_id limit 1 ";
			//into @nGroupId, @childCount, @groupLevel
			$this -> querySql($sql);
			$row = $this -> fetchArrayRow();
			if (!$row[0])
				new Exception('Board Invalid - group_id');

			$child_count = $row[0]['child_count'];
			$group_id = $row[0]['group_id'];
			$group_level = $row[0]['group_level'];

			$updateSql = "update $header_t set child_count = ($child_count+1) where post_id = $parent_id";
			echo $updateSql;
		} else {
			$group_id = round(microtime(true)) * (-1);
			$child_count = -1;
			$group_level = "";
			$parent_id = 0;
		}

		$tmpLevel = $group_level . ($child_count + 1);
		$insertSql1 = "INSERT INTO `$header_t` 
						(`group_id`, `parent_id`, `poster_uid`, `readn`, `child_count`, `post_date`,`group_level`, `poster_nick`, `post_title`)
					VALUES ($group_id, $parent_id, $uid, 0, 0, now(), '$tmpLevel', '$nick', '$brd_title');";

		$this -> startTransaction();

		//echo $insertSql1;
		$this -> updateSql($insertSql1);

		$post_id = $this -> insert_id();
		
		if($ufile)
		{
			$insertSql2 = "INSERT INTO `$body_t` (`post_id`, `post_message`, `pic_data1`) 
						VALUES ($post_id,'$brd_message','$ufile');";
			
		}
		else
		{
			$insertSql2 = "INSERT INTO `$body_t` (`post_id`, `post_message`) 
						VALUES ($post_id,'$brd_message');";
				
		}
				//echo $insertSql2;

		$this -> updateSql($insertSql2);

		if ($parent_id > 0)
			$this -> updateSql($updateSql);

		//커밋
		$this -> commit();

		//성공:1, 에러 0
		return 1;
	}

	//게시판에 새로운 글 입력 -- new
	//param : ['brd_title'], ['brd_message'], ['post_id'], ['tbl_kind'],['ufile']
	public function requestReport() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$post_id = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$user_id = (int)$_SESSION['uid'];
		
		if($user_id == 0)
		{
			return l;
		}
		
		//길이 체크
		if (!Util::lengthCheck($tblName, 1, 15))
			throw new Exception('Board Invalid param - tbl_name length');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		$selSql = "SELECT count(*) FROM board_report where report_uid = $user_id and report_board_pid = $post_id;";
		$this -> querySql($selSql);

		//성공, 실패값 리턴
		$row = $this -> fetchArrayRow();
		if($row[0]>0)
		{
			return d;
		}

		$InsertSql = "INSERT INTO `board_report` (`report_uid`,`report_content`,`report_board_nm`,`report_board_pid`,`report_datetime`,`report_flag`)
					VALUES ($user_id,'','$tblName',$post_id,now(),'0');";

		$this -> updateSql($InsertSql);
		return y;
	}

	//게시글 수정
	//param : ['brd_title'], ['brd_message'], ['post_id'], ['tbl_kind'], ['poster_uid']
	public function requestEdit($ufile) {
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$brd_title = $this -> param['brd_title'];
		$brd_message = $this -> param['brd_message'];
		$postid = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		//poster_uid, 게시자의 uid
		$puid = (int)$this -> param['poster_uid'];

		//글 수정이므로 1 보다 작으면 유효하지 않다.
		if ($postid <= 0)
			throw new Exception('Board Invalid param.');

		//길이 체크
		if (!Util::lengthCheck($brd_title, 2, 60))
			throw new Exception('Board Invalid param - title length');
		if (!Util::lengthCheck($brd_message, 2, 2000))
			throw new Exception('Board Invalid param - message length');

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param.');

		//자신의 글이 아니면 오류,
		$uid = (int)($_SESSION['uid']);
		if ($uid == 0)
			throw new Exception('Invalid Session.');
		if ($uid != $puid)
			throw new Exception('Invalid request');

		//------------------------------------
		//	db work
		//-------------------------------------

		$this -> escapeString($brd_title);
		$this -> escapeString($brd_message);

		//echo $postid."//".$tblName."//".$uid."//".$brd_title."//".$brd_message."//".$ufile."//";

		$sql = "call sp_board_edit($postid, '$tblName', $uid, '$brd_title', '$brd_message','$ufile')";
		$this -> querySql($sql);

		//성공, 실패값 리턴
		$row = $this -> fetchArrayRow();

		//성공:1, 에러 0
		return $row[0];
	}
	
	
	//상위 랭커 3명의 랭킹과 아바타 정보를 가져온다
	//$_GET : ['ranking_type']
	public function requestRankerList() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$ranking_type = $this -> param['ranking_type'];
		
		/*
		<div data-key = "s">점수</div>
		<div data-key = "r">승률</div>
		<div data-key = "p">인기도</div>
		*/
		
		//------------------------------------
		//	db work
		//-------------------------------------
		if($ranking_type == 'p')
		{
			$field = "`play_pop` rank_point";
			$order = "`pop_rank`";
			$order2 = "`pop_rank`";
		}
		else if($ranking_type == 'r') 
		{
			$field = "`play_win_rate` rank_point";
			$order = "`rate_rank`";
			$order2 = "`rate_rank` , `play_win` DESC ";
		}
		else
		{
			$field = "`play_score` rank_point";
			$order = "`score_rank`";
			$order2 = "`score_rank`";
		} 
		
		$sql = "SELECT A.`partner_nick`, B.`user_nick`, B.`avatar_item_list`, $field FROM `game_ranking` A ,`avatar_wear` B
		where $order > 0 AND A.`user_id` = B.`user_id` order by $order2 limit 0,3 ;";
		$this -> querySql($sql);
	}
	
	
	//글목록 보기 용, $tot_count 로 전체 게시글 개수를 리턴한다.
	//$_GET : ['ranking_type'], ['pg_inx'], (['stype'], ['svalue']) 검색 옵션, 생략하면 전체 게시글 
	public function requestRankList() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$ranking_type = $this -> param['ranking_type'];
		$pageIndex = (int)$this -> param['pg_inx'];
		$searchType = $this -> param['stype'];
		$searchValue = "";
	
		if ($searchType) {
			$searchValue = $this -> param['svalue'];
	
			if (!$searchValue) $searchType = '';
			$this -> escapeString($searchValue);
		}
	
		//페이지 인덱스 체크
		if ($pageIndex < 1 || $pageIndex > $this -> max_page_index)
			throw new Exception('Board Invalid param.');
	
		//------------------------------------
		//	db work
		//-------------------------------------
	
		if($ranking_type == 'p')
		{
			$field = "`pop_rank` rank,`play_pop` rank_point";
			$order = "`pop_rank`";
		}
		else if($ranking_type == 'r')
		{
			$field = "`rate_rank` rank, `play_win_rate` rank_point";
			$order = "`rate_rank`,  `play_win` DESC ";
		}
		else
		{
			$field = "`score_rank` rank, `play_score` rank_point";
			$order = "`score_rank`";
		}
		
		
		
		//게시글 리스트를 얻어온다.
		if ($searchType) {
			
			$pageStart = $this -> page_size * ($pageIndex - 1);
			
			switch ($searchType) {
				//닉네임
				case 1:
					
					$cntSql = "select count(*) from `game_ranking`  where `user_nick` like '%$searchValue%' limit $this->max_tot_count";
					$selSql = "select `partner_nick`, `user_nick`, `play_win` , $field from `game_ranking`  where `user_nick` like '%$searchValue%' order by $order limit $pageStart, $this->page_size";
					break;
			}
		} else {
			$pageStart = $this -> page_size * ($pageIndex - 1) + 3;
			
			//리스트
			$cntSql = "select count(*) from `game_ranking` limit $this->max_tot_count";
			$selSql = "SELECT `partner_nick`, `user_nick`, `play_win` , $field FROM `game_ranking` 
						order by $order limit $pageStart, $this->page_size;";
		}
		//throw new Exception($selSql);
		
		$this -> querySql($cntSql);
	
		//첫번째 쿼리 결과가 기본 셋팅되어져 있다.
		//전체 게시글 수 결과를 가져온다.
		$row = $this -> fetchArrayRow();
	
		//게시글 리스트 결과를 가져온다.
		$this -> querySql($selSql);
	
		//전체 개시글 개수 리턴
		return $row[0];
	}
	
	//글목록 보기 용, $tot_count 로 전체 게시글 개수를 리턴한다.
	//param : ['tbl_kind'], ['pg_inx'], (['stype'], ['svalue']) 검색 옵션, 생략하면 전체 게시글
	public function requestList() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$pageIndex = (int)$this -> param['pg_inx'];
		$searchType = $this -> param['stype'];
		$searchValue = "";

		if ($searchType) {
			$searchValue = $this -> param['svalue'];

			if (!$searchValue)
				throw new Exception('Board search param - title length');

			$this -> escapeString($searchValue);
		}

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param.');
		//페이지 인덱스 체크
		if ($pageIndex < 1 || $pageIndex > $this -> max_page_index)
			throw new Exception('Board Invalid param.');

		//------------------------------------
		//	db work
		//-------------------------------------
		$header_t = $tblName . "_board_header";
		$pageStart = $this -> page_size * ($pageIndex - 1);
		
		//게시글 리스트를 얻어온다.
		if ($searchType) {
			
			switch ($searchType) {
				//작성자
				case 1:
					$cntSql = "select count(*) from $header_t where post_flag = 0  and poster_nick = '$searchValue' limit $this->max_tot_count";
					$selSql = "select * from $header_t where post_flag = 0  and poster_nick = '$searchValue' order by group_id, group_level limit $pageStart, $this->page_size";
				break;
				//제목
				case 2:
					$cntSql = "select count(*) from $header_t where post_flag = 0 and post_title like '%$searchValue%' limit $this->max_tot_count";
					$selSql = "select * from $header_t where post_flag = 0 and post_title like '%$searchValue%' order by group_id, group_level limit $pageStart, $this->page_size";
				break;
				//글번호
				case 3:
					$cntSql = "select count(*) from $header_t where post_flag = 0 and post_id = $searchValue limit $this->max_tot_count";
					$selSql = "select * from $header_t where post_flag=0 and post_id = $searchValue order by group_id, group_level limit $pageStart, $this->page_size";
				break;
			}
		} else {
			//리스트
			$cntSql = "select count(*) from $header_t where post_flag=0 limit $this->max_tot_count";
			$selSql = "select * from $header_t where post_flag=0 order by group_id, group_level limit $pageStart, $this->page_size";
		}

		$this -> querySql($cntSql);

		//첫번째 쿼리 결과가 기본 셋팅되어져 있다.
		//전체 게시글 수 결과를 가져온다.
		$row = $this -> fetchArrayRow();

		//게시글 리스트 결과를 가져온다.
		$this -> querySql($selSql);

		//전체 개시글 개수 리턴
		return $row[0];
	}

	//전체 댓글 개수 리턴
	//param : ['post_id'], ['tbl_kind'], ['pg_inx']
	public function requestPortletCenterList() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$pageIndex = 1;

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Portlet Invalid param.1');
		//페이지 인덱스 체크
		if ($pageIndex < 1 || $pageIndex > $this -> max_page_index)
			throw new Exception('Portlet Invalid param.2');

		//------------------------------------
		//	db work
		//-------------------------------------
		$body_t = $tblName . "_board_body";
		$header_t = $tblName . "_board_header";
		$selSql = "select A.post_id, B.pic_data1 from $header_t A , $body_t B where A.post_flag = 0 and A.post_id = B.post_id order by post_id DESC limit 0, 4";
		$this -> querySql($selSql);
		
		return $this->getTableName($this -> param['tbl_kind']);
	}
	
	//전체 댓글 개수 리턴
	//param : ['post_id'], ['tbl_kind'], ['pg_inx']
	public function requestPortletList() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$pageIndex = 1;
	
		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Portlet Invalid param.');
		//페이지 인덱스 체크
		if ($pageIndex < 1 || $pageIndex > $this -> max_page_index)
			throw new Exception('Portlet Invalid param.');
	
		//------------------------------------
		//	db work
		//-------------------------------------
		$header_t = $tblName . "_board_header";
		$pageStart = $this -> page_size * ($pageIndex - 1);
		$selSql = "select post_id,post_title,post_date from $header_t where post_flag=0 order by group_id, group_level limit 0, 5";
		$this -> querySql($selSql);
	}

	//게시글 내용을 얻어온다.
	//param : ['post_id'], ['tbl_kind'] ...
	//$foruse : 게시글을 얻어서 사용하는 용도, 1 이면 답글이나 편집과 같은 수정용, 0이면 조회용
	public function requestPost() {
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$postid = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);

		//유효하지 않은 postid
		if ($postid <= 0)
			throw new Exception('Invalid request');
		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param.');

		//------------------------------------
		//	db work
		//-------------------------------------
		$header_t = $tblName . "_board_header";
		$body_t = $tblName . "_board_body";

		$updateSql = "update $header_t set readn = (readn + 1) where post_id = $postid;";
		$this -> updateSql($updateSql);
		
		
		$selSql1 = "select bh.*, bb.* from $header_t as bh,$body_t as bb where bh.post_id = $postid and bb.post_id = $postid;";
		$this -> querySql($selSql1);
		$postData = $this -> fetchObjectRow();
		$poster_uid = $postData->poster_uid;
		
		$selSql2 = "SELECT avatar_item_list FROM geniuszone.avatar_wear where user_id= $poster_uid;
					SELECT post_id, post_title FROM $header_t where post_id in 
						((select post_id from $header_t where post_id<$postid and parent_id = 0 and post_flag=0 order by post_id desc limit 1),
						(select post_id from $header_t where post_id>$postid and parent_id = 0 and post_flag=0 order by post_id limit 1));";
		
		$this -> multiQuerySql($selSql2);

		return $postData;
	}

	//게시글 삭제
	//param : ['post_id'], ['tbl_kind'], ['poster_uid']
	public function requestDelete() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$postid = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$uid = (int)($_SESSION['uid']);

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param.');

		//유효하지 않은 postid
		if ($postid <= 0)
			throw new Exception('Invalid request');
		//------------------------------------
		//	db work
		//-------------------------------------
		$header_t = $tblName . "_board_header";
		$comment_t = $tblName . "_comment";
		
		if($uid == 1)
		{
			$selSql = "select parent_id from $header_t where post_id = $postid limit 1";
			$this -> querySql($selSql);
			$row = $this -> fetchArrayRow();
			$parent_id = $row[0];
			
			$updateSql1 = "UPDATE `$header_t` SET `post_flag` = 1 WHERE post_id = $postid;";
			$updateSql2 = "UPDATE `$header_t` SET child_count = (child_count-1) where post_id = $parent_id;";
			$updateSql3 = "UPDATE `$comment_t` SET comment_flag = 1 where post_id = $postid;";
		}
		else 
		{
			$selSql = "select parent_id from $header_t where post_id = $postid and poster_uid = $uid limit 1";
			$this -> querySql($selSql);
			$row = $this -> fetchArrayRow();
			
			if(isset($row[0]))
			{
				$parent_id = $row[0];
			} 
			else 
			{
				throw new Exception('Invalid poster_uid');
			}
			
			$updateSql1 = "UPDATE `$header_t` SET `post_flag` = 1 WHERE post_id = $postid and poster_uid = $uid;";
			$updateSql2 = "UPDATE `$header_t` SET child_count = (child_count-1) where post_id = $parent_id;";
			$updateSql3 = "UPDATE `$comment_t` SET comment_flag = 1 where post_id = $postid;";
			
		}
		//트랜젝션 시작
		$this -> startTransaction();
		
		$this -> updateSql($updateSql1);
		$this -> updateSql($updateSql2);
		$this -> updateSql($updateSql3);
		
		//커밋
		$this -> commit();
		
		return y;
	}

	//------------------------------------------------------------------------
	// 여기부터 게시판 댓글 함수
	//------------------------------------------------------------------------

	//param : ['post_id'], ['tbl_kind'], ['cmt_message']
	//새로 추가된 comment_id 를 리턴한다.
	public function requestCommentInsert() {
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$postid = (int)$this -> param['post_id'];
		//댓글의 원본 게시글 아이디
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$cmt_message = $this -> param['cmt_message'];

		//유효하지 않은 postid
		if ($postid <= 0)
			throw new Exception('Invalid request');
		//길이 체크
		if (!Util::lengthCheck($cmt_message, 2, 500))
			throw new Exception('Comment Invalid param - message length');
		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Comment Invalid param - table name');

		//------------------------------------
		//	db work
		//-------------------------------------
		$this -> escapeString($cmt_message);

		$uid = (int)$_SESSION['uid'];
		$nick = $_SESSION['user_nick'];
		
		$header_t = $tblName . "_board_header";
		$comment_t = $tblName . "_comment";
	
		//query-----------------------------
		$updateSql = "update $header_t set `comment_count` = (comment_count + 1) where post_id = $postid;";
		$this -> updateSql($updateSql);
		
		$sql = "INSERT INTO `$comment_t` (`post_id`,`user_id`,`comment_date`,`user_nickname`,`message`,`comment_flag`)
					VALUES ($postid,$uid,now(),'$nick','$cmt_message',0);";
		$this -> updateSql($sql);

		$sql = "select LAST_INSERT_ID()";
		$this -> querySql($sql);
		//-------------------------------
		$row = $this -> fetchArrayRow();

		//새로 추가된 comment_id 를 리턴한다.
		return $row[0];
	}

	//댓글 수정
	//param : ['post_id'], ['tbl_kind'], ['cmt_message'], ['user_id'], ['comment_id']
	public function requestCommentEdit() {
		//------------------------------------
		//	param valid check
		//------------------------------------

		$postid = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$cmt_message = $this -> param['cmt_message'];
		//댓글 아이디
		$cmtid = (int)$this -> param['comment_id'];
		//댓글 작성자 user_id
		$userid = (int)$this -> param['user_id'];

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Comment Invalid param - table name');
		//유효하지 않은 postid
		if ($postid <= 0)
			throw new Exception('Invalid request');
		if ($cmtid <= 0)
			throw new Exception('Invalid request');
		//길이 체크
		if (!Util::lengthCheck($cmt_message, 2, 500))
			throw new Exception('Comment Invalid param - message length');

		//자신의 글이 아니면 오류
		$uid = (int)($_SESSION['uid']);
		if ($uid == 0)
			throw new Exception('Invalid Session.');
		if ($uid != $userid)
			throw new Exception('Invalid request');

		//------------------------------------
		//	db work
		//------------------------------------

		$this -> escapeString($cmt_message);

		$sql = "update $tblName" . "_comment set comment_date = now(), message = '$cmt_message' where comment_id = $cmtid and post_id = $postid and user_id = $uid";
		$this -> updateSql($sql);

		return ($this -> getAffectedRows() > 0);
	}

	//전체 댓글 개수 리턴
	//param : ['post_id'], ['tbl_kind'], ['pg_inx']
	public function requestCommentList() {
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$postid = $this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$pageIndex = (int)$this -> param['pg_inx'];

		//유효하지 않은 postid
		if ($postid <= 0)
			throw new Exception('Invalid request1');
		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Comment Invalid param.');
		//페이지 인덱스 체크
		if ($pageIndex < 1 || $pageIndex > $this -> max_page_index)
			throw new Exception('Comment Invalid param.');

		//------------------------------------
		//	db work
		//-------------------------------------

		//전체 댓글 개수
		$sql = "select count(*) from $tblName" . "_comment where post_id = $postid and comment_flag=0 limit " . $this -> max_tot_count;
		$this -> querySql($sql);
		$row = $this -> fetchArrayRow();

		//댓글 리스트를 얻어온다.
		$pageStart = $this -> page_size * ($pageIndex - 1);
		//$sql = "select * from $tblName" . "_comment where post_id = $postid order by comment_id limit $pageStart, " . $this->page_size;
		$sql = "select * from $tblName" . "_comment where post_id = $postid and comment_flag=0 limit $pageStart, " . $this -> page_size;
		$this -> querySql($sql);

		//전체 댓글 개수 리턴
		return $row[0];
	}

	//댓글 삭제
	//param : ['post_id'], ['tbl_kind'], ['user_id'], ['comment_id']
	public function requestCommentDelete() {
		//------------------------------------
		//	param valid check
		//------------------------------------
		$postid = (int)$this -> param['post_id'];
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		//댓글 아이디
		$cmtid = (int)$this -> param['comment_id'];
		//댓글 작성자 user_id
		$userid = (int)$this -> param['user_id'];

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param.');
		//유효하지 않은 postid
		if ($postid <= 0)
			throw new Exception('Invalid request');
		if ($cmtid <= 0)
			throw new Exception('Invalid request');

		//자신의 글이 아니면 오류,
		$uid = (int)($_SESSION['uid']);
		if ($uid == 0)
			throw new Exception('Invalid Session.');
		if ($uid != $userid && $uid!=1 )
			throw new Exception('다른 사람의 글은 지울 수 없습니다.');

		//------------------------------------
		//	db work
		//-------------------------------------
		$header_t = $tblName . "_board_header";
		$comment_t = $tblName . "_comment";
		
		$updateSql = "update $header_t set `comment_count` = (comment_count - 1) where post_id = $postid;";
		$this -> updateSql($updateSql);
		
		if($uid!=1)	$sql = "update $comment_t set comment_flag = 1 where comment_id = $cmtid and post_id = $postid and user_id = $uid;";
		else $sql = "update $comment_t set comment_flag = 1 where comment_id = $cmtid and post_id = $postid;";
		$this -> updateSql($sql);

		return ($this -> getAffectedRows() > 0);
	}

	//메인 화면 포틀릿 데이터
	//param : ['post_id'], ['tbl_kind'], ['user_id'], ['comment_id']
	public function requestPortlet() {

		//------------------------------------
		//	param valid check
		//------------------------------------
		$tblName = $this -> getTableName($this -> param['tbl_kind']);

		//유효한 게시판 종류가 아니면
		if ($tblName == null)
			throw new Exception('Board Invalid param.');
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT post_id, post_title FROM $tblName" . "_board_header ORDER BY group_id LIMIT 0,10";
		$this -> querySql($sql);
	}
	
	
	//글쓰기 인터	벌 체크
	//param : ['tbl_kind']
	public function checkWriteTime() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$tblName = $this -> getTableName($this -> param['tbl_kind']);
		$header_t = $tblName . "_board_header";
		$uid = (int)($_SESSION['uid']);
		
		$sql = "select post_date from $header_t where post_flag = 0 and poster_uid = $uid order by group_id limit 1";
		
		$this -> querySql($sql);

		$row = $this -> fetchArrayRow();
		
		$year = date('Y',time());
		$month = date('m',time());
		$day = date('d',time());
		$hour = date('H',time());
		
		$p_year = substr($row[0],0,4);
		$p_month = substr($row[0],5,2);
		$p_day = substr($row[0],8,2);
		$p_hour = substr($row[0],11,2);
		
		if($year!=$p_year ||$month!=$p_month ||$day!=$p_day ||$hour!=$p_hour)
		{
			return 'y';
		} 
		else 
		{
			return 'n';
		}
		
		//전체 개시글 개수 리턴
		//return $p_hour;
	}

}
?>