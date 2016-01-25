<?php
class DBItemWork extends DBWork
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
		$sql = "SELECT item_cd, itemgrp_cd, item_nm, item_qty, item_danwi, item_in_danga, item_out_danga 
					FROM item WHERE co_id=$co_id;";
		
		$this->querySql($sql);
	}
	
	//삭제
	public function requestDelete(){
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$co_id = (int)($_SESSION[DBWork::accountKey]);
		$item_cd = (int)$this->param['item_cd'];
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		
		$sql = "SELECT count(*) FROM input_detail WHERE co_id=$co_id AND io_item_cd=$item_cd;";
		$this->querySql($sql);
		$row=$this->fetchMixedRow();
		if($row[0]>0) return 0;
		
		$sql = "SELECT count(*) FROM output_detail WHERE co_id=$co_id AND io_item_cd=$item_cd;";
		$this->querySql($sql);
		$row=$this->fetchMixedRow();
		if($row[0]>0) return 0;
		
		$sql = "SELECT count(*) FROM gicho_io WHERE co_id=$co_id AND io_item_cd=$item_cd;";
		$this->querySql($sql);
		$row=$this->fetchMixedRow();
		if($row[0]>0) return 0;
		
		$sql = "SELECT count(*) FROM jumun_detail WHERE co_id=$co_id AND jumun_item_cd=$item_cd;";
		$this->querySql($sql);
		$row=$this->fetchMixedRow();
		if($row[0]>0) return 0;
		
		$sql = "DELETE FROM item WHERE co_id = $co_id and item_cd = $item_cd;";
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
	
		$item_cd = (int)$this->param['item_cd'];
		$itemgrp_cd = (int)$this->param['itemgrp_cd'];
		$item_nm = $this->param['item_nm'];
		$item_qty = $this->param['item_qty'];
		$item_danwi = $this->param['item_danwi'];
		$item_in_danga = (int)$this->param['item_in_danga'];
		$item_out_danga = (int)$this->param['item_out_danga'];
		

		if(!$item_nm || !Util::lengthCheck($item_nm, 1, 45)) throw new Exception('Data length');
		//------------------------------------
		//	db work
		//------------------------------------		
		//itemgrp 와 외래키 설정
		
		$sql = "INSERT INTO item (`co_id`, `item_cd`, `itemgrp_cd`, `item_nm`, `item_qty`, `item_danwi`, `item_in_danga`, 
									`item_out_danga`, `reg_date`, `reg_uid`)
								VALUES 
								($co_id, $item_cd, $itemgrp_cd, '$item_nm', '$item_qty', '$item_danwi',
									$item_in_danga, $item_out_danga, now(), $uid)
								ON DUPLICATE KEY UPDATE 
								`item_cd` = $item_cd, `itemgrp_cd` = $itemgrp_cd, `item_nm` = '$item_nm',
								`item_qty` = '$item_qty', `item_danwi` = '$item_danwi', `item_in_danga` = $item_in_danga, 
								`item_out_danga` = $item_out_danga, `reg_date` = now(), `reg_uid` = $uid;";
		
		$this->updateSql($sql);
		
		return 1;
	}
}

?>