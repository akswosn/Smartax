<?php
if($_SESSION['isLoginFail'] == 'y')
{
	unset($_SESSION['isLoginFail']);
?>
	<script>
		alert('아이디와 패스워드를 확인해 주세요.');
	</script>
<?php 
}
?>

<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>로그인</span>
			<small>산천경제연구소에 로그인하시면 다양한 서비스를 이용할 수 있습니다</small>
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
				<button class="btn-login-01" type="submit">로그인</button>
				<div class="form-login-menu">
					<a href="./route.php?contents=001">회원가입</a>
					<a href="./route.php?contents=010">비밀번호 찾기</a>
				</div>	
			</fieldset>
		</form>
	</div>
</div>