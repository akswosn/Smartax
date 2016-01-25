<?php
class DBItemGrpWork extends DBWork
{
	
	public function __get($name)
	{
		return $this->$name;	
	}
	
	
	//리스트
	public function requestList(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT itemgrp_cd, itemgrp_nm FROM item_grp WHERE co_id=$co_id;";
		
		$this->querySql($sql);
	}
	
	//삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$sql = "SELECT count(*) FROM item WHERE co_id=$co_id AND itemgrp_cd=$itemgrp_cd;";
		$this->querySql($sql);
		$row=$this->fetchMixedRow();
		if($row[0]>0) return 0;

		$sql = "DELETE FROM item_grp WHERE co_id = $co_id and itemgrp_cd = $itemgrp_cd;";
		$this->updateSql($sql);
		
		return 1;
	}

	//등록 및 수정
	//-> 아이템 그룹이랑 외래키 잡기
	public function requestRegModify(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		$itemgrp_nm = $this->param['itemgrp_nm'];

		if(!$itemgrp_nm || !Util::lengthCheck($itemgrp_nm, 1, 45)) throw new Exception('Data length');
		//------------------------------------
		//	db work
		//------------------------------------		
		
		$sql = "INSERT INTO item_grp (`co_id`, `itemgrp_cd`, `itemgrp_nm`, `reg_date`, `reg_uid`)
								VALUES 
							  	 ($co_id, $itemgrp_cd, '$itemgrp_nm', now(), $uid)
								ON DUPLICATE KEY UPDATE 
								`itemgrp_cd` = $itemgrp_cd, `itemgrp_nm` = '$itemgrp_nm',
								`reg_date` = now(), `reg_uid` = $uid;";
		
		$this->updateSql($sql);
		
		return 1;
	}
}

?>