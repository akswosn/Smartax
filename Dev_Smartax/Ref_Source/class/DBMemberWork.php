<?php

class DBMemberWork extends DBWork
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
	
	/**
	 * 회원가입 처리 요청
	 * @return uid
	 * @throws Exception
	 */
	 public function requestRegister()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$loginId = $this->param['login_id'];
		$nickname = $this->param['nickname'];
		$loginPw = $this->param['login_pw'];
		$loginPwc = $this->param['login_pwc'];
		
		$jumin1 = $this->param['jumin1'];
		$jumin2 = $this->param['jumin2'];
		
		$jumin = $jumin1.'-'.$jumin2;
		$username = $this->param['username'];
		$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		
		$zipcode = $this->param['zipcode1'].'-'.$this->param['zipcode2'];
		$addr = $this->param['addr1'].' '.$this->param['addr2'];
		
		$tel = $this->param['tel1'].'-'.$this->param['tel2'].'-'.$this->param['tel3'];
		$phone = $this->param['phone1'].'-'.$this->param['phone2'].'-'.$this->param['phone3'];
		$fax = $this->param['fax1'].'-'.$this->param['fax2'].'-'.$this->param['fax3'];
		
		$homepage = $this->param['homepage'];
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($nickname, 4, 30)) throw new Exception('Invalid userNick(length)');
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		if(!Util::lengthCheck($email, 6, 40)) throw new Exception('Invalid email(length)');

		//유저 아이디 (영문,숫자만 허용)
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		//유저 성명 (한글,영문,숫자 허용)
		if(!Util::isKorAlNum($nickname)) throw new Exception('Invalid userNick(special character)');
		//이메일 (이메일 형식 체크)
		if(!Util::isValidEmail($email)) throw new Exception('Invalid Email');
		
		//비밀번호 확인 문자열 비교
		if($loginPw!=$loginPwc) throw new Exception('pwc is wrong');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		$sql = "call sp_user_register('$loginId', '$loginPw', '$nickname', '$jumin','$username'
							,'$email','$farmname', '$zipcode','$addr','$tel',
							'$phone','$fax','$homepage')";
		
		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		
		if($row[0]==0) return 0;
		else 
		{
			$_SESSION[DBWork::sessionKey] = $row[0];
			
			return $row[0];
		}
	}

	public function RegisterMemberCompany()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$loginId = $this->param['login_id'];
		$nickname = $this->param['nickname'];
		$loginPw = $this->param['login_pw'];
		$loginPwc = $this->param['login_pwc'];
		
		$jumin1 = $this->param['jumin1'];
		$jumin2 = $this->param['jumin2'];
		
		$jumin = $jumin1.'-'.$jumin2;
		if($jumin=='-')$jumin='';
		
		$username = $this->param['username'];
		//$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		
		$zipcode = $this->param['zipcode1'].'-'.$this->param['zipcode2'];
		$addr = $this->param['addr1'].' '.$this->param['addr2'];
		
		$tel = $this->param['tel1'].'-'.$this->param['tel2'].'-'.$this->param['tel3'];
		$phone = $this->param['phone1'].'-'.$this->param['phone2'].'-'.$this->param['phone3'];
		$fax = $this->param['fax1'].'-'.$this->param['fax2'].'-'.$this->param['fax3'];
		
		$homepage = $this->param['homepage'];
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($nickname, 4, 30)) throw new Exception('Invalid userNick(length)');
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		//if(!Util::lengthCheck($email, 6, 40)) throw new Exception('Invalid email(length)');

		//유저 아이디 (영문,숫자만 허용)
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		//유저 성명 (한글,영문,숫자 허용)
		if(!Util::isKorAlNum($nickname)) throw new Exception('Invalid userNick(special character)');
		//이메일 (이메일 형식 체크)
		//if(!Util::isValidEmail($email)) throw new Exception('Invalid Email');
		
		//비밀번호 확인 문자열 비교
		if($loginPw!=$loginPwc) throw new Exception('pwc is wrong');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//회원 등록
		$sqlRegMember = "insert into user_info(user_jumin, user_id, user_pwd,
								user_name, user_nick, user_email, reg_date, user_farm_name,
								user_zip, user_addr, user_tel, user_phone, user_fax, 
								user_homepage)
				values (sha1('$jumin'), '$loginId', sha1('$loginPw'), 
						'$username','$nickname', '$email', now(), '$farmname',
						'$zipcode','$addr', '$tel', '$phone', '$fax', '$homepage');";
		
		$this->updateSql($sqlRegMember);
		$uid = $this->insert_id();
		
		if($uid==0) {
			echo "sqlRegMember";
			$this->rollback();
			return null;
		}
		
		//회사 등록
		$sqlRegCompany ="insert into company_info(co_nm, co_ceo_nm, co_saup_no,
											co_co_no, co_up, co_jong, co_zip, co_addr,
											co_tel, co_fax, co_handphone, reg_date, reg_uid)
								values ('$farmname','', '', 
										'', '', '', '$zipcode', '$addr',
										'$tel', '$fax', '$phone', now(), $uid);";
		
		$this->updateSql($sqlRegCompany);
		$co_id = $this->insert_id();
		
		if($co_id==0) {
			echo "sqlRegCompany";
			$this->rollback();
			return null;
		}
		
		//계정 과목 등록
		$sqlRegGycode ="INSERT INTO gycode (`co_id`,`gycode`,`gy_name`,`gy_rem`,`reg_date`,`reg_uid`)
							SELECT $co_id co_id ,gycode ,gy_name, gy_rem ,now() reg_date, $uid reg_uid FROM gycode_system WHERE modify_yn='1'";
		
		$this->updateSql($sqlRegGycode);
		
		//회사 연결
		$sqlRegComMember="INSERT INTO company_member (`uid`,`co_id`,`mem_level`,`reg_date`,`reg_uid`)
						VALUES ($uid,$co_id,100,now(),$uid);";
		
		$this->updateSql($sqlRegComMember);
		
		//기본 작업 코드
		$workcd = array("101"=>"종자예조 및 소독","102"=>"묘상준비 및 설치","103"=>"파종"
						,"104"=>"접목","105"=>"가식","106"=>"묘판관리"
						,"107"=>"경운정지","108"=>"퇴비 및 기비살포","109"=>"정식"
						,"110"=>"지주, 네트세우기","111"=>"추비살포","112"=>"병충해 방제"
						,"113"=>"제초","114"=>"비닐 및 흙덮기","116"=>"적심적아"
						,"117"=>"물관리","118"=>"하우스 설치 및 관리","119"=>"온도관리"
						,"120"=>"수확","121"=>"선별 및 포장","122"=>"운반 및 저장"
						,"123"=>"기 타(수정 등)" );
		
		//기본 작업 코드 등록
		foreach($workcd as $work_cd=>$work_nm)
		{
			$sqlWorkcd="INSERT INTO work_cd (`co_id`, `work_cd`, `work_nm`, `reg_date`, `reg_uid`)
						VALUES ( $co_id, $work_cd, '$work_nm' ,  now() , $uid);";
		
			$this->updateSql($sqlWorkcd);
		}
		
		//로그인 및 커밋
		$this->commit();
			
		$_SESSION[DBWork::sessionKey] = $uid;
		$_SESSION[DBWork::accountKey] = $co_id;

		return $uid;
	}
	
	/**
	 * 회원가입 처리 요청
	 * @return uid
	 * @throws Exception
	 */
	public function requestRegisterCompany()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_nm = $this->param['co_nm'];
		
		//추가정보
		$co_ceo_nm = $this->param['co_ceo_nm'];
		$co_saup_no = $this->param['co_saup_no1'].'-'.$this->param['co_saup_no2'].'-'.$this->param['co_saup_no3'];
		$co_co_no = $this->param['co_co_no1'].'-'.$this->param['co_co_no2'];
		
		$zipcode = $this->param['zipcode1'].'-'.$this->param['zipcode2'];
		$addr = $this->param['addr1'].'  '.$this->param['addr2'];
		
		$co_up = $this->param['co_up'];
		$co_jong = $this->param['co_jong'];
		$co_tel = $this->param['co_tel1'].'-'.$this->param['co_tel2'].'-'.$this->param['co_tel3'];
		$co_handphone = $this->param['co_handphone1'].'-'.$this->param['co_handphone2'].'-'.$this->param['co_handphone3'];
		$co_fax = $this->param['co_fax1'].'-'.$this->param['co_fax2'].'-'.$this->param['co_fax3'];
		
		//길이 체크
		if(!Util::lengthCheck($co_nm, 4, 45)) throw new Exception('Invalid co_nm(length)');
			
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		
		//트랜젝션 시작
		$this->startTransaction();
		
		//회사 등록
		$sqlRegCompany ="insert into company_info(co_nm, co_ceo_nm, co_saup_no,
											co_co_no, co_up, co_jong, co_zip, co_addr,
											co_tel, co_fax, co_handphone, reg_date, reg_uid)
								values ('$co_nm','', '', 
										'', '', '', '$zipcode', '$addr',
										'$tel', '$fax', '$phone', now(), $uid);";
		
		$this->updateSql($sqlRegCompany);
		$co_id = $this->insert_id();
		
		if($co_id==0) {
			echo "sqlRegCompany";
			$this->rollback();
			return null;
		}
		
		//계정 과목 등록
		$sqlRegGycode ="INSERT INTO gycode (`co_id`,`gycode`,`gy_name`,`gy_rem`,`reg_date`,`reg_uid`)
							SELECT $co_id co_id ,gycode ,gy_name, gy_rem ,now() reg_date, $uid reg_uid FROM gycode_system WHERE modify_yn='1'";
		
		$this->updateSql($sqlRegGycode);
		
		//회사 연결
		$sqlRegComMember="INSERT INTO company_member (`uid`,`co_id`,`mem_level`,`reg_date`,`reg_uid`)
						VALUES ($uid,$co_id,100,now(),$uid);";
		
		$this->updateSql($sqlRegComMember);
		
		//기본 작업 코드
		$workcd = array("101"=>"종자예조 및 소독","102"=>"묘상준비 및 설치","103"=>"파종"
						,"104"=>"접목","105"=>"가식","106"=>"묘판관리"
						,"107"=>"경운정지","108"=>"퇴비 및 기비살포","109"=>"정식"
						,"110"=>"지주, 네트세우기","111"=>"추비살포","112"=>"병충해 방제"
						,"113"=>"제초","114"=>"비닐 및 흙덮기","116"=>"적심적아"
						,"117"=>"물관리","118"=>"하우스 설치 및 관리","119"=>"온도관리"
						,"120"=>"수확","121"=>"선별 및 포장","122"=>"운반 및 저장"
						,"123"=>"기 타(수정 등)" );
		
		//기본 작업 코드 등록
		foreach($workcd as $work_cd=>$work_nm)
		{
			$sqlWorkcd="INSERT INTO work_cd (`co_id`, `work_cd`, `work_nm`, `reg_date`, `reg_uid`)
						VALUES ( $co_id, $work_cd, '$work_nm' ,  now() , $uid);";
		
			$this->updateSql($sqlWorkcd);
		}
		
		//로그인 및 커밋
		$this->commit();
		return true;
		//throw new Exception($sql);
		
		
		
	}
	
	/**
	 * 회원탈퇴 처리 요청
	 * @return Boolean
	 * @throws Exception
	 */
	public function requestCancel()
	{
		
	}	

	/**
	 * 로그인 처리 요청
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
		
		$sql = "select uid, auth_id from user_info where user_id = '$loginId' and user_pwd = sha1('$loginPw') and user_valid = 'y';";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			//uid 값이 들어있다. $reqInfo 값이 1 정보까지 포함. 0 이면 uid 만
			$row = $this->fetchArrayRow();
			$_SESSION[DBWork::sessionKey] = $row[0];
			//임시
			$_SESSION[DBWork::accountKey] = 0;
			
			if($row[1]!=100) $_SESSION[DBWork::adminKey]= $row[1];
			
			//INSERT INTO play_info (`uid`,`last_login_time`, `modify_date`, `config`) 
			//VALUES (25,now(), now(), '') ON DUPLICATE KEY UPDATE `uid` = 25,`last_login_time` = now(), `modify_date` = now();
		
			$logSql = "INSERT INTO play_info (`uid`,`last_login_time`) VALUES ($row[0],now())
						ON DUPLICATE KEY UPDATE 
						`uid` = $row[0],`last_login_time` = now();";
			$this->updateSql($logSql);
			
			return $_SESSION[DBWork::sessionKey];
		}
	}


	/**
	 * 로그인 성공 후 유저 정보 요청
	 * @throws Exception
	 */
	public function requestUserInfo()
	{
		//세션이 존재하는 지는 이미 검사하므로 여기는 유효성 검사이다.
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		if($uid==0) throw new Exception('Invalid Session.');

		$sql = "call sp_user_info($uid)";
		$this->multiQuerySql($sql);
	
		if($this->getNumRows()==0) throw new Exception('user info query error.');
		else 
		{
			$info = $this->fetchObjectRow();
		
			//차후 쿼리없이 사용할 수 있도록 세션에 저장해 둔다.
			$_SESSION['nickname'] = $info->user_nick;
			$_SESSION['user_name'] = $info->user_name;
			$_SESSION['auth_level'] = $info->auth_id;
			
			//회사 리스트 업
			if($this->nextQueryResult()){
				$_SESSION['co_list']=array();
				while($info=$this->fetchMixedRow())
				{
					array_push($_SESSION['co_list'],$info); 	
				}
			}
		}
	}
	
	
	public function requestUserList()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		if($uid==0) throw new Exception('Invalid Session.');
		//------------------------------------
		//	db work
		//-------------------------------------
		
		$sql = "call sp_user_list($uid)";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			$row = $this->fetchObjectRow();
			return $row;
		}
	}

	public function requestComInfo()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = $this->param['co_id'];
		
		if($uid==0) throw new Exception('Invalid Session.');
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//$sql = "call sp_company_info($uid,$co_id)";
		$sql = "SELECT  `co_nm`, `co_ceo_nm`, `co_saup_no`, `co_co_no`, `co_up`, `co_up_code`, `co_jong`, `co_zip`,
				    `co_addr`,  `co_tel`, `co_tel_juso`,  `co_handphone`,  `co_email`,  `co_fax`,  `co_tax_office`,
				    `co_tax_office_code`, `co_tax_office_acc`, `co_bank`, `co_bank_branch`, `co_bank_acc`
				FROM `farmsaver`.`company_info` WHERE co_id = $co_id;";
		$this->querySql($sql);
		
		if($this->getNumRows()==0) return null;
		else
		{
			$row = $this->fetchObjectRow();
			return $row;
		}
	}
	
	public function requestCurComInfo()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = (int)($_SESSION[DBWork::accountKey]);
	
		if($uid==0) throw new Exception('Invalid Session.');
		//------------------------------------
		//	db work
		//-------------------------------------
	
		//$sql = "call sp_company_info($uid,$co_id)";
		$sql = "SELECT  `co_nm`, `co_ceo_nm`, `co_saup_no`, `co_co_no`, `co_up`, `co_up_code`, `co_jong`, `co_zip`,
		`co_addr`,  `co_tel`, `co_tel_juso`,  `co_handphone`,  `co_email`,  `co_fax`,  `co_tax_office`,
		`co_tax_office_code`, `co_tax_office_acc`, `co_bank`, `co_bank_branch`, `co_bank_acc`
		FROM `company_info` WHERE co_id = $co_id;";
		$this->querySql($sql);
	
		if($this->getNumRows()==0) return null;
		else
		{
			$row = $this->fetchObjectRow();
			return $row;
		}
	}


	//존재할 경우 user_id 값을 리턴한다.
	public function requestExistCheck()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$value = $this->param['value'];
		$type = $this->param['type'];

		
		//login id check
		if($type==1)
		{
			//길이 체크
			if(!Util::lengthCheck($value, 6, 20)) throw new Exception('Invalid value(length)'); 
			//영문,숫자만 허용
			if(!Util::isAlNum($value)) throw new Exception('Invalid login Id.');
			
			$sql = "select user_id from user_info where user_id = '$value' limit 1";
		}
		
		//nickname check
		else if($type==2)
		{
			//길이 체크
			if(!Util::lengthCheck($value, 4, 20)) throw new Exception('Invalid value(length)'); 
			//유저 성명 (한글,영문,숫자 허용)
			if(!Util::isKorAlNum($value)) throw new Exception('Invalid nickname.');
			
			$sql = "select user_id from user_info where user_nick = '$value' limit 1";
		}
		
		else throw new Exception('Invalid type'); 
		
		//------------------------------------
		//	db work
		//-------------------------------------

		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		
		if($row==null) return -1;
		
		return $row[0];
	}
	
	
	/**
	 * 회원가입 처리 요청
	 * @return uid
	 * @throws Exception
	 */
	public function requestModify()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		
		//필수
		$loginId = $this->param['login_id'];
		$nickname = $this->param['nickname'];
		$loginoldPw = $this->param['login_pw_old'];
		$loginPw = $this->param['login_pw'];
		$loginPwc = $this->param['login_pwc'];
		$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		$zipcode = $this->param['user_zip'];
		$addr = $this->param['user_addr'];
		$tel = $this->param['user_tel'];
		$phone = $this->param['user_phone'];
		$fax = $this->param['user_fax'];
		$homepage = $this->param['user_homepage'];
		
		/*
		//log
		echo $loginId."<br/>";
		echo $nickname."<br/>";
		echo $loginoldPw."<br/>";
		echo $loginPw."<br/>";
		echo $loginPwc."<br/>";
		echo $email."<br/>";
		echo $zipcode."<br/>";
		echo $farmname."<br/>";
		echo $addr."<br/>";
		echo $tel."<br/>";
		echo $phone."<br/>";
		echo $fax."<br/>";
		echo $homepage."<br/>";
		*/
		
		//길이 체크
		if(!Util::lengthCheck($loginId, 6, 20)) throw new Exception('Invalid userId(length)');
		if(!Util::lengthCheck($nickname, 4, 30)) throw new Exception('Invalid userNick(length)');
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('Invalid password(length)');
		if(!Util::lengthCheck($email, 6, 40)) throw new Exception('Invalid email(length)');

		//유저 아이디 (영문,숫자만 허용)
		if(!Util::isAlNum($loginId)) throw new Exception('Invalid userId(special character)');
		//유저 성명 (한글,영문,숫자 허용)
		if(!Util::isKorAlNum($nickname)) throw new Exception('Invalid userNick(special character)');
		//이메일 (이메일 형식 체크)
		if(!Util::isValidEmail($email)) throw new Exception('Invalid Email');
		
		//비밀번호 확인 문자열 비교
		if($loginPw!=$loginPwc) throw new Exception('pwc is wrong');

		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
		
		$loginoldPw = $this->param['login_pw_old'];
		$loginPw = $this->param['login_pw'];
		$email = $this->param['email'];
		
		//추가정보
		$farmname = $this->param['farmname'];
		$zipcode = $this->param['user_zip'];
		$addr = $this->param['user_addr'];
		$tel = $this->param['user_tel'];
		$phone = $this->param['user_phone'];
		$fax = $this->param['user_fax'];
		$homepage = $this->param['user_homepage'];
		
		$sql = "call sp_user_modify($uid, '$loginoldPw', '$loginPw', '$email', '$farmname'
							,'$zipcode','$addr','$tel','$phone','$fax'
							,'$homepage')";
							
		$this->querySql($sql);
		$row = $this->fetchArrayRow();
		
		return $row[0];
	}
	
	public function requestChangeCoId()
	{
		$_SESSION[DBWork::accountKey]=$this->param['co_id'];
		
		//차후 검증 및 권한 로직 부여 
		
		
		
		return $_SESSION[DBWork::accountKey];
	}

	public function requestComModify()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		//필수
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$co_id = $this->param['co_id'];
		$co_ceo_nm = $this->param['co_ceo_nm'];
		$co_saup_no = $this->param['co_saup_no'];
		$co_co_no = $this->param['co_co_no'];
		
		$zipcode = $this->param['co_zip'];
		$addr = $this->param['co_addr'];
		$co_up = $this->param['co_up'];
		$co_jong = $this->param['co_jong'];
		$co_tel = $this->param['co_tel'];
		
		$co_handphone = $this->param['co_handphone'];
		$co_fax = $this->param['co_fax'];
		
		//신규
		$co_up_code = $this->param['co_up_code'];
		$co_email = $this->param['co_email'];
		$co_tel_juso = $this->param['co_tel_juso'];
		
		$co_tax_office = $this->param['co_tax_office'];
		$co_tax_office_code = $this->param['co_tax_office_code'];
		$co_tax_office_acc = $this->param['co_tax_office_acc'];
		
		$co_bank = $this->param['co_bank'];
		$co_bank_branch = $this->param['co_bank_branch'];
		$co_bank_acc = $this->param['co_bank_acc'];
		
		$co_nm = $this->param['co_nm'];
		//추가정보
		//------------------------------------
		//	db work
		//-------------------------------------
		
		//다른 값들은 특정문자만 허용하도록 이미 체크했으므로
		//비밀번호만 금칙문자 처리를 하면 된다.
		
		$sql = "UPDATE `company_info` SET
					`co_nm` = '$co_nm',
					`co_ceo_nm` = '$co_ceo_nm',
					`co_saup_no` = '$co_saup_no',
					`co_co_no` = '$co_co_no',
					`co_up` = '$co_up',
					`co_up_code` = '$co_up_code',
					`co_jong` = '$co_jong',
					`co_zip` = '$zipcode',
					`co_addr` = '$addr',
					`co_tel` = '$co_tel',
					`co_tel_juso` = '$co_tel_juso',
					`co_handphone` = '$co_handphone',
					`co_email` = '$co_email',
					`co_fax` = '$co_fax',
					`co_tax_office` = '$co_tax_office',
					`co_tax_office_code` = '$co_tax_office_code',
					`co_tax_office_acc` = '$co_tax_office_acc',
					`co_bank` = '$co_bank',
					`co_bank_branch` = '$co_bank_branch',
					`co_bank_acc` = '$co_bank_acc',
					`reg_date` = now()
					WHERE `co_id`=$co_id and `reg_uid`=$uid;";
		$this->updateSql($sql);
		
		$row = $this->getAffectedRows();
		
		/* 선택 항목 확인!!!*/
		
		return $row;
	}

	public function requestSetConfig()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------

		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$jdata = stripslashes($this->param['config']);
		$dec = json_decode($jdata,true);
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$configSql = "INSERT INTO play_info (`uid`,`config`) VALUES ($uid,'$jdata')
						ON DUPLICATE KEY UPDATE 
						`uid` = $uid,`config` = '$jdata';";
		$this->updateSql($configSql);
	}

	public function requestGetConfig()
	{
		//------------------------------------
		//	param valid check
		//------------------------------------- 
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		//------------------------------------
		//	db work
		//-------------------------------------
		$configSql = "SELECT config from play_info WHERE uid=$uid;";
		$this->querySql($configSql);
	}
	
	//사용
	//인증번호 요청 - 문자 서비스
	public function requestSmsNumber() {
		$phone_num = $this -> param['number'];
		$login_id = $this -> param['login_id'];
		
		//인증요청시 초기화
		$_SESSION['cert'] = 'n';
		
		//아이디와 폰번호 일치하는지 확인
		$sql = "SELECT count(*) from user_info  where user_id = '$login_id' and user_phone = '$phone_num'  limit 1";
		//throw new Exception($sql);
		
		$this -> querySql($sql);
		$row = $this -> fetchArrayRow();
	
		if ($row[0] == 0) {
			return 'd';
		}
		//------------------------------------
		//	param valid check
		//-------------------------------------
	
		$cert_num = Util::get_random_string(6, '09');
		$msg = "[" . $cert_num . "]";
	
		$sMsg = iconv("UTF-8", "EUC-KR", $msg . " 웹페이지에 인증번호를 입력하세요.-산천농업회계-");
	
		$arr = Util::makeSmsToken($phone_num, 'GeniusZone', $sMsg, DBWork::UserId, DBWork::receiveNum, '');
		//return $res;
	
		$res = Util::SocketPost($arr);
	
		$success = substr($res, 0, 1);
	
		if ($success == 1) {
			$_SESSION['cert_num'] = $cert_num;
			$_SESSION['phone'] = $phone_num;
			$_SESSION['login_id'] = $login_id;
			return 'y';
		} else {
			return 'n';
		}
	}
	
	//사용
	//인증번호 확인
	public function chkNumber() {
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$cert_num = $this -> param['number'];
	
		if ($_SESSION['cert_num'] == $cert_num) {
			$_SESSION['cert'] = 'y';
			return 'y';
		} else {
			return 'n';
		}
	}
	
	/**
	 * 비밀번호 변경
	 * @return uid
	 * @throws Exception
	 */
	public function changePwd()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
	
		//필수
		$cert = $_SESSION['cert'] ;
		$login_id = $_SESSION['login_id'];
		$loginPw = $this->param['pwd'];
		
		//인증 체크
		if($cert != 'y') throw new Exception('휴대폰 인증을 해주십시요.');
	
		//길이 체크
		if(!Util::lengthCheck($loginPw, 6, 20)) throw new Exception('비밀번호 길이는 6~20자입니다.');
	
		//------------------------------------
		//	db work
		//-------------------------------------
		//비밀번호만 금칙문자 처리를 하면 된다.
		$this->escapeString($loginPw);
	
		$sql = "UPDATE `user_info` SET `user_pwd` = sha1('$loginPw') WHERE `user_id` = '$login_id';";
		$this->updateSql($sql);
	
		return 'y';
	}
	
	//포인트 적립로그 조회
	public function requestPointSaveLog()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$pageIndex = (int)$this->param['pg_inx'];
		$pageSize = $this->page_size;
		$pageStart = $page_size * ($pageIndex - 1);
		
		if($uid == 0) throw new Exception('Invalid Uid.');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$countSql = "SELECT count(*) FROM `log_point_save` where  `ps_uid` = $uid;";
		$this->querySql($countSql);
		
		$total_count = 0;
		
		if ($row = $this->fetchArrayRow()) {
			$total_count = $row[0];
		}
		
		$basicSql = "SELECT `ps_id`, `pt_code`,`ps_pg`, `ps_amt`, `ps_point` , `ps_reg_date` 
							FROM `log_point_save` where  `ps_uid` = $uid order by `ps_id` desc limit $pageStart, $pageSize;";
		
		$this->querySql($basicSql);
		
		return $total_count;
	}
	
	//포인트 사용로그 조회
	public function requestPointUseLog()
	{
		//------------------------------------
		//	param valid check
		//-------------------------------------
		$uid = (int)($_SESSION[DBWork::sessionKey]);
		$pageIndex = (int)$this->param['pg_inx'];
		$pageSize = $this->page_size;
		$pageStart = $pageSize * ($pageIndex - 1);
		
		if($uid == 0) throw new Exception('Invalid Uid.');
		
		//------------------------------------
		//	db work
		//-------------------------------------
		$countSql = "SELECT count(*) FROM `log_point_use` where  `pu_uid` = $uid;";
		$this->querySql($countSql);
		
		$total_count = 0;
		
		if ($row = $this->fetchArrayRow()) {
			$total_count = $row[0];
		}
		//throw new Exception($pageStart);
		
		$basicSql = "SELECT `pu_id`, `pu_co_nm`,`pu_nm`, `pu_point`, `pu_reg_date`, `pu_start_date`, `pu_expire_date`
							FROM `log_point_use` where  `pu_uid` = $uid order by `pu_id` desc limit $pageStart, $pageSize;";
		
		$this->querySql($basicSql);
		
		return $total_count;
	}
}

?>