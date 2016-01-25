<!DOCTYPE html>

<head>
	<meta charset="utf-8">
	<title>Smartax Service</title>
	<link rel="shortcut icon" href="./images/main/smartax.png">
	<!-- <link rel="stylesheet" href="./css/register_agreements3.css"> -->
	<script type="text/javascript">
		$(function(){
			$('#goHome').click(function(){
				location.href = './route.php';
			});
		});
	</script>
</head>

<body>
		<div class="bdwrap">

		<div class="mid">
			<img src="./images/register/register_head.png" width="1100" height="95">

		</div>
</div>
<?
require_once("./class/SessionManager.php");
$sessionManager = new SessionManager();
$userNm = $sessionManager->getJoinUserNm();
$userId = $sessionManager->getJoinUserId();
$compNm = $sessionManager->getJoinCompNm();

//회원가입 세션 삭제
$sessionManager->destroyJoinInfo();
?>

<!-- 상단 네이게이션, 사진바 종료 -->

<!-- 게시판 시작 -->
		<div class="menuwrap">
			<div class="agr_img">
			<img class="regi_process_img" src="./images/register/register3.png" style="height: 96px;">
				<div class="agr_title">
				<img src="./images/register/agreement5.png">
				</div>
			</div>

			<div class="agrwrap1">
				<div class="comp_register">
					<img class="comp_img" src="./images/register/com_regis_people.png">
					<div class="com_id">
					<span class="com_id_span1"><span style="color: #007ACC"><? echo $userNm;?> </span>님의 회원 가입을 축하합니다!</span><br>
					<br>
					<span class="com_id_span2">아이디 : <span style="color: #007ACC;font-weight: bold;text-decoration: underline;"><? echo $userId;?></span></span><br>
					<span class="com_id_span2">회사명 : <span style="color: #007ACC;font-weight: bold;text-decoration: underline;"><? echo $compNm;?></span></span><br>
					<br>
					</div>
				</div>
	
					<div class="regi_btn1" id="goHome">홈으로 </div>
			</div>
		</div>
 </body>

</html>

