<?php

class DBAdminWork extends DBWork
{
	/**
	 * 회원 리스트 유효
	 * @return DATA
	 * @throws Exception
	 */
	public function requestMemberList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$sql = "SELECT A.uid, auth_id, user_jumin, user_id, user_pwd, user_name, user_nick, user_email, reg_date, 
						user_farm_name, user_zip, user_addr, user_tel, user_phone, user_fax, user_homepage, B.last_login_time
				FROM user_info AS A LEFT OUTER JOIN play_info AS B ON A.uid = B.uid WHERE user_valid = 'y'; ";
		
		$this->querySql($sql);
	}
	
	/**
	 * 회원 리스트 무효
	 * @return DATA
	 * @throws Exception
	 */
	public function requestInvalidMemberList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$sql = "SELECT A.uid, auth_id, user_jumin, user_id, user_pwd, user_name, user_nick, user_email, reg_date,
						user_farm_name, user_zip, user_addr, user_tel, user_phone, user_fax, user_homepage, B.last_login_time
				FROM user_info AS A LEFT OUTER JOIN play_info AS B ON A.uid = B.uid WHERE user_valid = 'n'; ";
	
		$this->querySql($sql);
	}
	
	
	/**
	 * 로그인 
	 * @return Object
	 * @throws Exception
	 */
	public function requestLogin()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$loginId = $this->param['login_id'];
		$loginPw = $this->param['login_pw'];
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)'); 
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		
		//영문,숫자만 허용
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		$sql = "select uid from user_info where user_id = '$loginId' and user_pwd = sha1('$loginPw') AND auth_id = '9001';";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			//uid 값이 들어있다. $reqInfo 값이 1 정보까지 포함. 0 이면 uid 만
			$row = $this->fetchArrayRow();
			$_SESSION['admin'] = $row[0];
			return $row;
		}
	}
	
	
	/**
	 * 발리드 플래그 세팅
	 * @return Object
	 * @throws Exception
	 */
	public function requestUpdateValid()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
	
		$json = $this -> param["data"];
		$flag = $this->param['flag'];
	
		//------------------------------------
		//	db work
		//-------------------------------------
	
		//json
		$jdata = stripslashes($json);
		$dec = json_decode($jdata,true);
		
		$result=array();
		
		for($idx=0;$idx<count($dec);$idx++)
		{
			$uid = $dec[$idx];
			
			$sql = "UPDATE `user_info` SET `user_valid` = '$flag' WHERE `uid` = $uid; ";
			$this->updateSql($sql);
			
			$result[$idx] = $idx;
		}
		return $result;
	}
}

?>