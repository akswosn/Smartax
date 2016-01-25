<?php



class Util
{
	//주의: trim 을 호출하면서 값이 비었는지 체크한다.
	//중간에 빈값이 있으면 중단하고 false 를 리턴한다.
	//trim 한 값이 비어있지 않으면 그 값으로 원본을 바꾼다. 
	public static function chkEmptyAndTrim(&$form_vars) 
	{
  		foreach ($form_vars as $key => $value) 
  		{
  			$value = trim($value);
     		//if (!isset($key) || $value == NULL) return false;
     		if (!isset($key)) return false;
     		
     		$form_vars[$key] = $value;
  		}
  		
  		return true;
	}

	//$min 이상 $max 이하면 참
	public static function lengthCheck($value, $min, $max) 
	{
		$len = strlen($value);
		//$len = mbstrlen($value);
		return ($len >= $min && $len <= $max);
	}

	//게시판에서 허용되는 태그 외의 태그를 문자열에서 제거한다. 
	public static function cleanBoardTags($string) 
	{
		//허용되는 태그 외의 태그는 문자열에서 제거한다.
		return stripslashes(strip_tags($string, '<strong><br><em><u><strike><div><a><span><img>'));
	}
	
	//html 특수문자를 인식할 수 있는 다른 기호로 변환한다.
	public static function changeHtmlSpecialchars($string)
	{
		//ENT_COMPAT - 큰 따옴표를 &quot; 로 변환하되 작은 따옴표는 그냥 둔다.
		//ENT_QUOTES - 작은 따옴표와 큰 따옴표 모두를 각각 &#39; 와 &quot; 로 변환한다.
		//ENT_NOQUOTES(기본값) - 어떠한 따옴표도 변환하지 않는다.
		
		//$string = htmlentities($string, ENT_QUOTES, "UTF-8");
		//$string = htmlspecialchars($string, ENT_NOQUOTES, "UTF-8");
		
		return stripslashes(htmlspecialchars($string, ENT_QUOTES, "UTF-8"));
	}
	
	//영문, 숫자만 있는지 체크
	public static function isAlNum($value)
	{
		return ereg('^[a-zA-Z]+[a-zA-Z0-9]+$', $value);
	}
	
	//한글, 영문, 숫자만 있는지 체크
	public static function isKorAlNum($value)
	{
		return ereg('^[가-힣a-zA-Z]+[가-힣a-zA-Z0-9]+$', $value);
	}

	public static function isValidEmail($email)
	{
		// check an email address is possibly valid
		return ereg('^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$', $email);
	}
	
	/*
	public static function logoutAndThrow($throwMsg)
	{
		if(isset($_SESSION['uid']))
		{
			unset($_SESSION['uid']);
			session_destroy();
		}
		
		throw new Exception($throwMsg);
	}
	*/
	
	public static function arrayCopy($array) 
	{
         $result = array();
         foreach( $array as $key => $val ) 
         {
             if( is_array( $val ) ) $result[$key] = arrayCopy( $val );
             else if ( is_object( $val ) ) $result[$key] = clone $val;
             else $result[$key] = $val;
         }
		 
         return $result;
 	}
	
	public static function isAdminUser()
	{
		return $_SESSION['auth_level']==ADMIN_LEVEL;
	}
	
	public static function isWriteTable($tblKind)
	{
		//로그인 여부 확인
		if(!DBWork::isValidUser())
			return false;
			
		switch ($tblKind) {
			case '11':
			case '21':
				if(self::isAdminUser())
					return true;
				else
					return false;
								
			default:
				return true;
		}
	}

	public static function serverLog($e)
	{
		$now_timestamp = time();
		error_log(date("Y-m-d h:i:s",$now_timestamp).' --> ['.$e->getFile().']'.$e->getMessage() ,0,"/log/php.log","FarmSaver");
	}
	
}


?>