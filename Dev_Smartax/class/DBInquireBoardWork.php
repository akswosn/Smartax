<?php 
class DBInquireBoardWork extends DBWork
{
	//한 페이지에 보여줄 게시글의 개수
	protected $page_size = 5; //site
	
	public function __get($name)
	{
		return $this->$name;
	}
	
	//페이지 시작 끝 리턴
	protected function getPage($pageNum){
		return $result = array(
				"startPage" => (($pageNum-1) * $this->page_size) + 1,
				"endPage" => $pageNum * $this->page_size
		);
	}
	
	
	//Site 1:1 문의 조회
	public function selectInquireBoardList(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$pageNum = $this->param['pageNum'];
		
		
		$page = $this->getPage($pageNum);
		
		$startPage = (int)$page['startPage'];
		$endPage = (int)$page['endPage'];
		
		
		$sql = " SELECT  *
					FROM (
							SELECT @ROWNUM := @ROWNUM + 1 AS ROWNUM
								, _id, title, contents, inquire_contents, reg_date, reg_uid, inquire_yn
							FROM inquire_board i, (SELECT @ROWNUM := 0) r
							WHERE reg_uid = $uid 
							order by _id desc
					) a
					WHERE ROWNUM >= $startPage AND ROWNUM <= $endPage ;";
		
		$this->querySql($sql);
		
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	} 
	
	// 1:1 문의 등록
	public function insertInquireBoard(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$title = $this->param['title'];
		$contents = $this->param['contents'];
		
		//조회된 데이터로 update
		$sql="INSERT INTO inquire_board(
				  title
				  ,contents
				  ,reg_date
				  ,reg_uid
				) VALUES (
				  '$title'
				  ,'$contents'
				  ,now()
				  ,$uid
				)";
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
		
		if($row < 0){
			$this->rollback();
			throw new Exception('inquire_board insert fail row : ' + $row);
		}
		
		return 1;
	}
	
	//관리자용 
	//Site 1:1 문의 조회
	public function selectInquireBoardListForAdmin(){
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$pageNum = $this->param['pageNum'];
		
		$inquire_yn = $this->param['inquire_yn'];
		$user_id = $this->param['user_id'];
		
		$page = $this->getPage($pageNum);
		
		$startPage = (int)$page['startPage'];
		$endPage = (int)$page['endPage'];
		
		$sql = " SELECT  *
					FROM (
						SELECT @ROWNUM := @ROWNUM + 1 AS ROWNUM
						, _id, title, contents, inquire_contents, reg_date, reg_uid, inquire_yn
						FROM inquire_board i, (SELECT @ROWNUM := 0) r
						WHERE inquire_yn = '$inquire_yn' order by _id desc
 					) a ";
		
		if(!empty($user_id)){
			$sql = $sql." join (SELECT uid, user_id FROM user_info WHERE user_id like '%$user_id%') u ";
		}
		else {
			$sql = $sql." join (SELECT uid, user_id FROM user_info) u ";
		}
		
		$sql = $sql." on a.reg_uid = u.uid WHERE ROWNUM >= $startPage AND ROWNUM <= $endPage ;";
	
		$this->querySql($sql);
	
		$res=array();
			
		while($item=$this->fetchMapRow())
		{
			array_push($res,$item);
		}
			
		return $res;
	}
	
	public function updateInquireBoard(){
		$id = (int)$this->param['_id'];
		$inquire_contents = $this->param['inquire_contents'];
		
		$sql = "UPDATE inquire_board
					SET inquire_yn='y', inquire_contents='$inquire_contents'
					WHERE _id = $id";
		
		$this->updateSql($sql);
		$row = $this->getAffectedRows();
		
		if($row < 0){
			$this->rollback();
			throw new Exception('inquire_board update fail row : ' + $row);
		}
		
		return 1;
	}
}
?>