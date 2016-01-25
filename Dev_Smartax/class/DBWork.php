<?php

class DBWork
{
	const isServer = 'local';
	const server = '115.68.27.105';
	const user = 'devman';
	const password = 'dev_man123';
	const database = 'smartax';
	
	const adminKey = 'admin';
	const sessionKey = 'uid';
	const companyKey = 'co_id';
	//추가
	const userTypeKey = 'auth_nm';
	const companyArray = 'company_array';
	
	
	//>>>>>>>>>>>>>> upload & download path 설정 서버 환경에 맞게 설정 필요
	//프로젝트 Root path sales_pdf_file_download.php 
	const rootPath = '/Dev_Smartax';	//local
//  	const rootPath = '/dev';	//115.68.27.105 dev
	
	//연관 파일 : FileUtil.php
	const uploadRootPath = 'E:/phpWorkspace/Dev_Smartax/upload/';	//KS pc local
//  	const uploadRootPath = '/var/www/dev/upload/'; //115.68.27.105 dev
	//>>>>>>>>>>>>>> end
	
	protected $mysqli = null;
	protected $result = null;
	protected $param = null;
	
	//sms
	const UserId = 'blackkite1';
	const receiveNum = '0315205482';
	
	public function __construct($is_sessionStart = false)
	{
 		if ($is_sessionStart) session_start();
		
		if(isset($_SESSION['ex_flag']))
		{
			$_SESSION[self::sessionKey] = 416;
			$_SESSION[self::companyKey] = 557;
		}
	}

	public function __destruct()
	{
		$this->destoryWork();
	}
	
	public static function isValidUser()
	{
		return isset($_SESSION[self::sessionKey]);
	}
	
	public static function isValidAdmin()
	{
		return isset($_SESSION[self::adminKey]);
	}

	public function createWork($par, $sessionChk)
	{
		if(!$par) throw new Exception('Invalid params.[DBWORK]');

		$this->param = $par;

		//session check
		if($sessionChk && !self::isValidUser()) throw new Exception('Login Require.');

		//param filled in check
		//-1인 경우는 파라미터 없이 디비작업을 하는 경우
		if($this->param!=-1 && !Util::chkEmptyAndTrim($this->param)) throw new Exception('Params is not filled.');

		$this->mysqli = new mysqli(self::server, self::user, self::password, self::database);
   		if(!$this->mysqli) throw new Exception('Could not connect to database server');
		
   		mysqli_set_charset($this->mysqli, 'utf8');
	}

	public function AdminCreateWork($par, $sessionChk)
	{
		if(!$par) throw new Exception('Invalid params.');

		$this->param = $par;

		//session check
		if($sessionChk && !self::isValidAdmin()) throw new Exception('Login Require.');

		//param filled in check
		//-1인 경우는 파라미터 없이 디비작업을 하는 경우
		if($this->param!=-1 && !Util::chkEmptyAndTrim($this->param)) throw new Exception('Params is not filled.');

		$this->mysqli = new mysqli(self::server, self::user, self::password, self::database);
   		if(!$this->mysqli) throw new Exception('Could not connect to database server');
   		
   		mysqli_set_charset($this->mysqli, 'utf8');
		
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
		$this->mysqli->autocommit(TRUE);
	}
	
	public function rollback()
	{
		$this->mysqli->rollback();
		$this->mysqli->autocommit(TRUE);
	}

	//result 값이 존재하는데 다시 query 를 하는 경우 기존 메모리를 해제한다.
	public function querySql($sql)
	{
		if($this->result) $this->result->free();

 		$this->result = $this->mysqli->query($sql);
		if(!$this->result) throw new Exception("Query Failed. -> $sql");
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
		if(!$this->mysqli->query($sql)) throw new Exception('update Failed. '.$sql);
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
	protected function escapeString(&$string)
	{
		$string = $this->mysqli->real_escape_string($string);
	}
	
	//마지막으로 인서트된 아이디 리턴
	protected function insert_id()
	{
		//return mysql_insert_id($this->mysqli);
		 return $this->mysqli->insert_id;
	} 
	
	
}


?>