<!-- 
	Smartax 메인페이지
 -->
<?
	require_once("./class/DBWork.php");
	
	$isLogin = false;
	//1. 회원 정보 조회
	
	if (DBWork::isValidUser()) {
		$isLogin = true;
	}
	
?>
    <link rel="stylesheet" href="./css/login.css">
	<div class="content">
		<div class="content-title">
			<h2 class="content-title-inner">
				<span>로그인</span>
				<small></small>
			</h2>	
		</div>
		<div class="content-inner">
			<form class="form-login" action="./proc/member/login_proc.php" method="POST">
				<fieldset class="form-login-inner">
					<legend>로그인</legend>
					<div class="form-login-row">
						<label for="login_id">아이디</label>
						<input type="text" id="login_id" name="login_id" style="width: 200px;">
					</div>
					<div class="form-login-row">
						<label for="login_pw">비밀번호</label>
						<input type="password" id="login_pw" name="login_pw" style="width: 200px;">
					</div>
					<input type="hidden" name="contents" id="contents" value="900	">
					<button class="btn-login-01" type="submit">로그인</button>
					<div class="form-login-menu">
						<a href="./route.php?contents=001"">회원가입</a>
						<a href="./route.php?contents=020">아이디/비밀번호 찾기</a>
					</div>	
				</fieldset>
			</form>
		</div>
	</div>
