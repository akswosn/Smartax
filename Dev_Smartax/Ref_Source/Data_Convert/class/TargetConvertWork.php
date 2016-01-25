<?php

class TargetConvertWork
{
		
	const fromServer= 'localhost';
	const fromUser = 'root';
	const fromPassword = 'cool74';
	
	const toServer= 'localhost';
	const toUser = 'db_farm';
	const toPassword = 'farm1024';
	const toDatabase = 'farmsaver';
	
	/*
	const fromServer= '192.168.0.4';
	const fromUser = 'db_farm';
	const fromPassword = 'farm1024';
	
	const toServer= '192.168.0.4';
	const toUser = 'db_farm';
	const toPassword = 'farm1024';
	const toDatabase = 'farmsaver'; 
	  */
	
	protected $mysqli = null;
	protected $result = null;

	protected $param = null;

	public function __construct()
	{
 		 session_start();
	}
	
	public function __destruct()
	{
		$this->destoryWork();
	}
	
	public static function isValidUser()
	{
		return isset($_SESSION[self::sessionKey]);
	}

	public function createWork($par,$from_db)
	{
		$this->param = $par;
		if($from_db) $this->mysqli = new mysqli(self::fromServer, self::fromUser, self::fromPassword,$from_db);
		else $this->mysqli = new mysqli(self::toServer, self::toUser, self::toPassword, self::toDatabase);
   		if(!$this->mysqli) throw new Exception('Could not connect to database server');
	}

	public function destoryWork()
	{
		if($this->result) 
		{
			$this->result->free();
			$this->result = null;
		}
		
		if($this->mysqli) 
		{
			$this->mysqli->close();
			$this->mysqli = null;
		}
	}
	
	public function startTransaction()
	{
		$this->mysqli->autocommit(FALSE);
	}
	
	public function commit()
	{
		$this->mysqli->commit();
	}
	
	public function rollback()
	{
		$this->mysqli->rollback();
	}

	//result 값이 존재하는데 다시 query 를 하는 경우 기존 메모리를 해제한다.
	public function querySql($sql)
	{
		if($this->result) $this->result->free();

 		$this->result = $this->mysqli->query($sql);
		if(!$this->result){
			echo $sql."<br/>";
			throw new Exception('Query Failed.');
		} 
	}

	public function multiQuerySql($sql)
	{
		if($this->result) 
		{
			$this->result->free();
			$this->result = null;
		}
		
		if(!$this->mysqli->multi_query($sql)) throw new Exception('Multi Query Failed.1');
		
		$this->result = $this->mysqli->store_result();
		if(!$this->result) throw new Exception('Multi Query Failed.2');
	}
	
	//multiQuerySql 의 result 를 순차적으로 리턴한다. 
	public function nextQueryResult()
	{
		if($this->mysqli->next_result())
		{
			if($this->result) 
			{
				$this->result->free();
				$this->result = null;
			}
			
			$this->result = $this->mysqli->store_result();
			if(!$this->result) throw new Exception('Multi Query Failed.3');
			
			return true;
		}
		
		return false;
	}

	public function updateSql($sql)
	{
		if(!$this->mysqli->query($sql)){
			echo $sql."<br/>";
			throw new Exception('update Failed.');
		} 
	}
	
	//MYSQLI_NUM, MYSQLI_ASSOC
	public function fetchMixedRow($option = MYSQLI_BOTH)
	{
		return $this->result->fetch_array($option);
	}
	
	public function fetchArrayRow()
	{
		return $this->result->fetch_row();
	}
	
	public function fetchMapRow()
	{
		return $this->result->fetch_assoc();
	}
	
	public function fetchObjectRow()
	{
		return $this->result->fetch_object();
	}

	public function getNumRows()
	{
		return $this->result->num_rows;
	}
	
	public function getAffectedRows()
	{
		return $this->mysqli->affected_rows;
	}
	
	//db 금칙 문자 처리, 원본을 변경시킨다.
	public function escapeString(&$string)
	{
		$string = $this->mysqli->real_escape_string($string);
	}
	
	//db 금칙 문자 처리, 원본을 변경시킨다.
	public function insert_id()
	{
		//return mysql_insert_id($this->mysqli);
		 return $this->mysqli->insert_id;
	}
	
}


?>