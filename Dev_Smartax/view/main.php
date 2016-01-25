<?
	require_once("./class/DBWork.php");
	require_once("./class/SessionManager.php");
	$isLogin = false;
	//1. 회원 정보 조회
	//세션확인
	
	$user_nm = '';
	$comp_name = '';
	$user_type = '';
	
	if (DBWork::isValidUser()) {
		$isLogin = true;
		$manager = new SessionManager();
		$user_nm = $manager->getUserNm();
		$comp_name = $manager->getCoNm();
		$user_type = $manager->getUserTypeNm();
		$manager->destory();
	}
	$co_id = $_SESSION[DBWork::companyKey];
	$companyArray = $_SESSION[DBWork::companyArray];
?>

<div class="_mid">
	<div class="_midpeople">
		<img class="midpeople" src="images/main/midpeople1.png"/>
		<form class="form-login" action="./proc/member/login_proc.php?contents=900" method="POST">
			<div class="login">
				<?php 
					if(!$isLogin){
				?>
					<div class="logintext">
						<strong>로그인</strong>
					</div>
					<div class="lgbtn">
						<input class="btn1" type="text" id="login_id" name="login_id">
						<br>
						<input class="btn1"  type="password" id="login_pw" name="login_pw">
						<br>
						<div class="btn3" onclick="$('.form-login').submit();">
							로그인
						</div>
					</div>
					<div class="btn4">
						<a href="./route.php?contents=001">회원가입</a>  |
					</div>
					<div class="btn4">
						&nbsp; <a href="./route.php?contents=020">아이디/비번찾기</a>
					</div>
				<?php 
					}//로그인 했을때~
					else {
				?>
						<span class="login_welcome"><?php echo $user_nm;?>님 환영합니다.</span><a  href="./proc/member/logout_proc.php"> <div class="logout_Btn">Logout</div></a><br>
						<img class="csloc1" src="images/main/loginbar.png"><br>
				        <span class="login_welcome_event">[Event]</span> <br>
				        <span class="login_welcome_event"> 부가세 신고기간</span><span class="login_welcome"> 입니다.</span> <br>
				        <!-- 아래 링크 확인 -->
				        <img class="login_baro_icon" src="images/main/mypage.png" id="login_baro_icon_mypage">
				        <img class="login_baro_icon" src="images/main/mycompany.png" id="btn_comp_update">
				        <img class="login_baro_icon" src="images/main/mytax.png">
		        		
		        		<select class="login_baro_select" name="comp" id="comp" onchange="changeComp(this.value);">
		        			<?php 
			        			foreach ($companyArray as $idx => $obj) 
				        		{
				        			if($co_id == $obj["co_id"]){
					        			echo"<option value='".$idx."' selected='selected'>".$obj["co_nm"]."</option>";
				        			}
				        			else {
				        				echo"<option value='".$idx."'>".$obj["co_nm"]."</option>";
				        			}
				        		}
		        			?>
						</select>
				        
				<?php 
					}
				?>
				<div class="consult">
					<img class="csloc1" src="images/main/loginbar.png">
					<img class="csloc" src="images/main/plus1.png">
					<img class="csloc1" src="images/main/loginbar.png">
					<img class="csloc" src="images/main/plus2.png">
				</div>
			</div>
		</form>
	</div>
</div>

<input type="hidden" id="service_purchase_btn_flag" value="n"/>
<input type="hidden" id="service_sales_btn_flag" value="n"/>
<input type="hidden" id="co_nm" value="<?php echo $comp_name;?>"/>

<script>

enrollProcess = function(e){
	 window.open('./view/pdfTest.html', '_blank'); 
}

changeComp = function(value){
	//comp 세션변경
	$.ajax({
		url:'./proc/member/change_company_proc.php',
        data : {index : value},
        method : 'post',
        success:function(data){
			var json = $.parseJSON(data);
			 if(json.CODE != '00'){
				alert(json.MSG);
			 }
			 else {
				$('#co_nm').val(json.DATA.co_nm);
			}
		}
	});
}

mainserviceFlag = false;
serviceOpen = function(){
	if(!mainserviceFlag){
	<?php 
		if($isLogin){//로그인시
			echo "var coNm = $('#co_nm').val();";
			echo "parent.openApp('$user_nm',coNm,'$user_type', '','".DBWork::rootPath."');";
			echo "mainserviceFlag=true;";
		}
		else {
			echo "alert('로그인후 이용하시기바랍니다.');";
			echo "location.href='./route.php?contents=000';";
		}
	?>
	}
}

$(function(){
	$('#login_pw').keydown(function(e){
		 if(e.keyCode==13){
			 $('.form-login').submit();
         }
	});
	
	$('#login_baro_icon_mypage').click(function(){
		window.location.href = './route.php?contents=011';
	});
	
	$('#service_purchase_btn').click(function(){
		if($('#service_purchase_btn_flag').val() == 'n'){
			$('#service_purchase_btn_flag').val('y');
			goServiceTarget('Smartax.view.supertax.TaxPerchaseMain');
		}
	});

	$('#service_sales_btn').click(function(){
		if($('#service_sales_btn_flag').val() == 'n'){
			$('#service_sales_btn_flag').val('y');
			goServiceTarget('Smartax.view.supertax.TaxSalesMain');
		}
	});

	//회사 수정
	$('#btn_comp_update').click(function(){
		parent.openApp('<?php echo $user_nm;?>','<?php echo $comp_name;?>','<?php echo $user_type;?>', 'Smartax.view.basic.CompanyInfo', '<?php echo DBWork::rootPath?>');
	});

	function goServiceTarget(target){
		<?php 
			if($isLogin){//로그인시
				
				if($user_type == 'C'){
					echo "var coNm = $('#co_nm').val();";
					echo "parent.openApp('$user_nm',coNm,'$user_type', target , '".DBWork::rootPath."');";
				}
				else {
					echo "alert('고객회원만 이용가능합니다.');";
				}
			}
			else {
				echo "alert('로그인후 이용하시기바랍니다.');";
				echo "location.href='./route.php?contents=000';";
			}
		?>
	}
});

</script>

<div class="menuwrap">
	<!-- <div class="row_name">1234</div> -->
	<div class="row">

		<div class="row_center1">
			<div class="row_loc">
				<div class="col"><a href="#"><img class="col_image" src="images/main/startBtn.png"  onmouseover="this.src='images/main/startBtn_1.png'" onmouseout="this.src='images/main/startBtn.png'"    onclick="javascript:serviceOpen()"></a>
				</div>
			</div>
			<div class="row_loc">
				<div class="col"><a href="#"><img class="col_image" src="images/main/fast1.png" onmouseover="this.src='images/main/fast1_1.png'" onmouseout="this.src='images/main/fast1.png'" onclick="javascript:enrollProcess()" ></a>
				</div>
			</div>
			<div class="row_loc">
				<div class="col"><a href="#"><img class="col_image" src="images/main/fast2.png" onmouseover="this.src='images/main/fast2_1.png'" onmouseout="this.src='images/main/fast2.png'"></a>
				</div>
			</div>
		</div>
		<div class="row_center2">
			<div class="row_loc1">
				<div class="col"><a href="#"><img class="col_image" src="images/main/fast3.png" onmouseover="this.src='images/main/fast3_1.png'" onmouseout="this.src='images/main/fast3.png'"></a>
				</div>
			</div>
			<div class="row_loc1">
				<div class="col"><a href="#"><img class="col_image" id="service_purchase_btn" src="images/main/fast4.png" onmouseover="this.src='images/main/fast4_1.png'" onmouseout="this.src='images/main/fast4.png'"> </a>
				</div>
			</div>
			<div class="row_loc1">
				<div class="col"><a href="#"><img class="col_image" id="service_sales_btn" src="images/main/fast5.png" onmouseover="this.src='images/main/fast5_1.png'" onmouseout="this.src='images/main/fast5.png'"> </a>
					
				</div>
			</div>

			<!-- <div class="row_name"></div> -->
		</div>
	</div>
</div>

<div class="menuwrap_app">
	<div class="appWrap">
		<img class="appPic" src="images/main/appPic.png">
		<div class="apploc">
			<span class="apptxt">귀찮고, 번거로운 세무신고는 그만!
				<br>
				쉽고, 간편한 세무신고를 위해
				<br>
				<strong style="color:#404040;">스마택스 앱을 지금 다운받아 보세요.</strong>
				<br>
				<br>
				<a href="#"><img class="app1" src="images/main/google.png"></a><a href="#"><img class="app2"src="images/main/apple.png"></a> 
			</span>
			<br>
		</div>
	</div>
</div>

<div class="menuwrap">
	<div class="M_portlet">
		<div class="M_ptl">
			<? require'./view/contents/notice.php'; ?>
		</div>
		<div class="M_ptl">
			<? require'./view/contents/tax_info.php'; ?>
		</div>
	</div>
</div>

<!-- 로그인 실패 팝업 처리 -->
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
