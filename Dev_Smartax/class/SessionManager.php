<?php
class SessionManager{
	//DBWORK 외 세션 정보 정의 및 데이터를 담당한다
	
	const user_nm = 'sm_user_nm';	//유저명
	const co_nm = 'sm_co_nm';			//회사명
	const user_type = 'sm_user_type';//회원 타입
	
	//회원가입 세션관리
	const join_uid = 'join_uid';
	const join_user_nm = 'join_user_nm';
	const join_user_id = 'join_user_id';
	const join_comp_nm = 'join_comp_nm';
	//Array user_info sale_code 
	const join_user_info_step1 = 'join_user_info_step1';//saleMember	
	const join_user_info_step2 = 'join_user_info_step2';//userInfo
	const join_user_info_step3 = 'join_user_info_step3';//comp
	const join_user_info_step4 = 'join_user_info_step4';//comp detail
	const join_co_id = 'join_co_id';
	
	//파일다운로드 flag
	const excel_down_flag = 'excel_down_flag';
	
	private $user_type_map = array(
			'100' =>  'C',
			'200' =>  'S',
			'300' =>  'T'
	);			//회원 타입 코드 array
	
	public function __construct(){
// 		this<-sessionManagerStart();
		$this->sessionManagerStart();
	}
	
	public function setExcelDownFlag($excel_down_flag){
		$this->sessionManagerStart();
	
		$_SESSION[self::excel_down_flag] = $excel_down_flag;
	}
	
	public function getExcelDownFlag(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::excel_down_flag];
	}
	
	
	public function destroyJoinInfo(){
		$this->sessionManagerStart();
		$_SESSION[self::join_user_info_step1] = null;
		$_SESSION[self::join_user_info_step2] = null;
		$_SESSION[self::join_user_info_step3] = null;
		$_SESSION[self::join_user_info_step4] = null;
		$_SESSION[self::join_uid] = null;
		$_SESSION[self::join_co_id] = null;
		$_SESSION[self::join_user_id] = null;
		$_SESSION[self::join_user_nm] = null;
		$_SESSION[self::join_comp_nm] = null;
	}
	
	private function sessionManagerStart(){
		if ($is_sessionStart) session_start();
	}
	
	public function setJoinUserInfoStep1($join_user_info_step1){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_user_info_step1] = $join_user_info_step1;
	}
	
	public function getJoinUserInfoStep1(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_user_info_step1];
	}
	public function setJoinUserInfoStep2($join_user_info_step2){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_user_info_step2] = $join_user_info_step2;
	}
	
	public function getJoinUserInfoStep2(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_user_info_step2];
	}
	public function setJoinUserInfoStep3($join_user_info_step3){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_user_info_step3] = $join_user_info_step3;
	}
	
	public function getJoinUserInfoStep3(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_user_info_step3];
	}
	public function setJoinUserInfoStep4($join_user_info_step4){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_user_info_step4] = $join_user_info_step4;
	}
	
	public function getJoinUserInfoStep4(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_user_info_step4];
	}
	
	
	
	public function setJoinCoid($join_co_id){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_co_id] = $join_co_id;
	}
	
	public function getJoinCoid(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_co_id];
	}
	
	public function setJoinUid($join_uid){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_uid] = $join_uid;
	}
	
	public function getJoinUId(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_uid];
	}
	
	public function setJoinUserId($join_user_id){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_user_id] = $join_user_id;
	}
	
	public function getJoinUserId(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_user_id];
	}
	public function setJoinUserNm($join_user_nm){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_user_nm] = $join_user_nm;
	}
	
	public function getJoinUserNm(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_user_nm];
	}
	
	public function setJoinCompNm($join_comp_nm){
		$this->sessionManagerStart();
	
		$_SESSION[self::join_comp_nm] = $join_comp_nm;
	}
	
	public function getJoinCompNm(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::join_comp_nm];
	}
	
	public function setUserNm($user_nm){
		$this->sessionManagerStart();
		
		$_SESSION[self::user_nm] = $user_nm;
	}
	
	public function getUserNm(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::user_nm];
	}
	
	public function setCoNm($co_nm){
		$this->sessionManagerStart();
	
		$_SESSION[self::co_nm] = $co_nm;
	}
	
	public function getCoNm(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::co_nm];
	}
	
	public function setUserType($user_type){
		$this->sessionManagerStart();
		//100, 200, 300 else admin(9001)
	
		$_SESSION[self::user_type] = $user_type;
	}
	
	public function getUserType(){
		$this->sessionManagerStart();
	
		return $_SESSION[self::user_type];
	}
	
	public function getUserTypeNm(){
		$this->sessionManagerStart();
		$result = $this->user_type_map[$_SESSION[self::user_type]];
		if(empty($result)){
			return 'A'; // 어드민
		}
		else {	
			return $result;
		}
	}
	
	
	public function destory()
	{
		if($this->user_type_map)
		{
			$this->user_type_map = null;
		}
	}
}

?>