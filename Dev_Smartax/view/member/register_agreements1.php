<!DOCTYPE html>

<head>
	<meta charset="utf-8">
	<title>Smartax Service</title>
	<link rel="shortcut icon" href="./images/main/smartax.png">
	<!-- <link rel="stylesheet" href="./css/register_agreements1.css"> -->
	<script type="text/javascript">
		$(function(){

			//id 중복 체크
			$('#idJungbokCheckBtn').click(function(){
				$('#isIdCheck').val('false');
				var reg_id =/^[a-z]+[a-z0-9]{5,12}$/g;
				 if($('#user_id').val().length == 0){
					alert('회원 아이디를 입력해주세요.');
					return; 	
				 }			
				 
				 if(!reg_id.test($('#user_id').val())){
					 alert('아이디는 영문 혹은 영문, 숫자를 혼합하여 6~12자 이내로 입력 바랍니다.');
					 return;
				 }
					
		         $.ajax({
		             url:'./proc/member/join/join_id_jungbok_check_proc.php',
		             data : {user_id : $('#user_id').val()},
		             method : 'post',
		             success:function(data){
						 var json = $.parseJSON(data);
	//						 console.log(json);
			             if(json.CODE == '00'){
			                 $('#isIdCheck').val('true');
			                 alert('사용가능합니다.');
			                 return;
			             }
			             else {
			            	 $('#isIdCheck').val('false');
							alert('이미 가입된 아이디가 존재합니다.');
							return;
				         }
		             }
		         })
		    });

			//이메일 도메인
			$('#emailDomain').change(function(){
				$('#user_email2').val(this.value);
			});

			//폼 초기화
			$('#form_cancel').click(function(){
				document.frm1.reset();
			});
			
		    //등록 버튼
			$('#form_excute').click(function(){
				$("#user_aree_sms").val($("input[name=radio_user_aree_sms]:checked").val());
				$("#user_aree_email").val($("input[name=radio_user_aree_email]:checked").val());
				
				//validate 체크
				if($("input[name=radio_user_license_gubun]:checked").val() != null){
					$("#user_license_gubun").val($("input[name=radio_user_license_gubun]:checked").val());
				}
				else {
					alert('사업장 구분을 선택해 주세요.');
					return;
				}

				if($('#user_name').val().length == 0){
					alert('회원님의 성명을 입력해 주세요.');
					return;
				}

				if($('#user_jumin1').val().length  < 6 ){
					alert('주민번호 앞자리를 확인해 주세요.');
					return;
				}

				if($('#user_jumin2').val().length  < 7 ){
					alert('주민번호 뒷자리를 확인해 주세요.');
					return;
				}
				// 주민번호 유효성 검증
				// 1. 주민번호의 형태와 7번째 자리(성별) 유효성 검사
				var fmt = /^[1234]\d{6}$/;
				if (!fmt.test($('#user_jumin2').val())) {
				    alert("잘못된 주민등록번호입니다."); 
				    return;
				}

				// 2. 날짜 유효성 검사
				var birthYear = ($('#user_jumin2').val().charAt(1) <= "2") ? "19" : "20";
				birthYear += $('#user_jumin1').val().substr(0, 2);
				var birthMonth = $('#user_jumin1').val().substr(2, 2) - 1;
				var birthDate = $('#user_jumin1').val().substr(4, 2);
				var birth = new Date(birthYear, birthMonth, birthDate);

				if ( birth.getYear() % 100 != $('#user_jumin1').val().substr(0, 2) ||
				     birth.getMonth() != birthMonth ||
				     birth.getDate() != birthDate) {
					alert("잘못된 주민등록번호입니다."); 
					return;
				}
				
				// 3. Check Sum 코드의 유효성 검사
				var buf = new Array(13);
				for (i = 0; i < 6; i++) buf[i] = parseInt($('#user_jumin1').val().charAt(i));
				for (i = 0; i < 7; i++) buf[i+6] = parseInt($('#user_jumin2').val().charAt(i));

				var multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
				
				for (i = 0, sum = 0; i < 12; i++) {
					sum += (buf[i] *= multipliers[i]);
				}
				
				if ((11 - (sum % 11)) % 10 != buf[12]) {
				    alert("잘못된 주민등록번호입니다."); 
				    return;
				}
				var reg = /^.*(?=.{8,12})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
				var reg_id =/^[a-z]+[a-z0-9]{5,12}$/g;
				if($('#user_id').val().length  == 0){
					alert('아이디를 입력해 주세요');
					return;
				}
				

				if(!reg_id.test($('#user_id').val()) ){
					 alert('아이디는 영문 혹은 영문+숫자를 혼합하여 6~12자 이내로 입력 바랍니다.');
					 return;
				}

				if($('#isIdCheck').val() != 'true'){
					alert('아이디 중복확인 후 이용바랍니다.');
					return;
				}

				if($('#user_pwd').val().length  == 0){
					alert('비밀번호를 입력해 주세요');
					return;
				}

				if(!reg.test($('#user_pwd').val())){
					 alert('비밀번호는 영문,숫자를 혼합하여 8~12자 이내로 입력 바랍니다.');
					 return;
				}

				if($('#user_pwd_confirm').val().length  == 0){
					alert('비밀번호 확인을 입력해 주세요');
					return;
				}

				if(!reg.test($('#user_pwd_confirm').val())){
					 alert('비밀번호는 영문,숫자를 혼합하여 8~12자 이내로 입력 바랍니다.');
					 return;
				}
				if($('#user_pwd_confirm').val() != $('#user_pwd').val()){
					alert('비밀번호 와 비밀번호 확인이 서로다릅니다. 다시 입력해 주세요.');
					return;
				}

				if($('#user_tel2').val().length  == 0 || $('#user_tel3').val().length  == 0){
					alert('자택/직장 전화번호를 입력해 주세요');
					return;
				}
				if($('#user_phone2').val().length  == 0 || $('#user_phone3').val().length  == 0){
					alert('휴대폰 번호를 입력해 주세요');
					return;
				}
				if($('#user_email1').val().length  == 0 || $('#user_email2').val().length  == 0){
					alert('이메일을 입력해 주세요');
					return;
				}
				//validate 체크 끝

				
// 				$('#frm1').submit();
				document.frm1.submit();
			});
		});
	</script>
</head>

<body>
		<div class="bdwrap">
		<div class="mid">
			<img src="images/register/register_head.png" width="1100" height="95">

		</div>
</div>
<!-- 상단 네이게이션, 사진바 종료 -->

<!-- 게시판 시작 -->
<form id="frm1" name="frm1" action="./proc/member/join/join_userinfo_insert_proc.php" onsubmit="return false;" method="post">
	<input type="hidden" id="isIdCheck" name="isIdCheck" value="false">
	<input type="hidden" id="user_license_gubun" name="user_license_gubun">
	<input type="hidden" id="user_aree_sms" name="user_aree_sms">
	<input type="hidden" id="user_aree_email" name="user_aree_email">
	
	<!-- user_aree_sms -->
		<div class="menuwrap">
			<div class="agr_img">
			<img class="regi_process_img" src="images/register/register1.png" style="height: 96px;">
				<div class="agr_title">
				<img src="images/register/agreement1.png">
				'- 없이 입력하세요
				</div>
			</div>
			
			<div class="agrwrap1">
				<table class="agr_table">
					<colgroup>
						<col width="20%">
						<col width="10%">
						<col width="10%">
						<col width="10%">
						<col width="10%">
					</colgroup>
					<tr>						
						<td>
							사업장 구분
						</td>
						<td colspan="4">
                           <input type="radio" id ="radio_1" name="radio_user_license_gubun" value="1"><label for="radio_1">개인사업자</label> 
                           <input type="radio" id ="radio_2"name="radio_user_license_gubun" value="2"><label for="radio_2">법인사업자</label>
					</tr>
					<tr>
						<td>
							이 름
						</td>
						<td colspan="4">
							<!-- maxlength="3" -->
							<input type="text"  name="user_name" id="user_name">
						</td>
					</tr>
					<tr>
						<td>
							주민등록번호
						</td>
						<td colspan="4">
							<input type="text" style="width:128px;" name="user_jumin1" id="user_jumin1" maxLength="6">
								- <input type="text" style="width:140px;" name="user_jumin2" id="user_jumin2" maxLength="7">
						</td>
					</tr>
					<tr>
						<td>
							아이디
						</td>
						<td colspan="4">
							<input type="text" name="user_id" id="user_id" maxlength="12">&nbsp;<button id="idJungbokCheckBtn">중복확인</button> &nbsp;영문 또는 영문+숫자 6~12자 가능
						</td>

					</tr>
					<tr>
						<td>
							비밀번호
						</td>
						<td colspan="4">
							<input type="password" name="user_pwd" id="user_pwd" maxlength="12">&nbsp; 영문+숫자 8~12자 가능
						</td>

					</tr>
					<tr>
						<td>
							비밀번호 확인
						</td>
						<td colspan="4">
							<input type="password" name="user_pwd_confirm" id="user_pwd_confirm" maxlength="12">&nbsp; 비밀번호 확인을 위해 한번 더 입력해주세요
						</td>
						
					</tr>
					<tr>
						<td>
							자택/직장
						</td>
						<td colspan="4">
							<select name="user_tel1" id="user_tel1">
								<optgroup>
									<option value="02" >02 </option>
								    <option value="031">031</option>
								    <option value="032">032</option>
								    <option value="033">033</option>
								    <option value="041">041</option>
								    <option value="042">042</option>
								    <option value="043">043</option>
								    <option value="051">051</option>
								    <option value="052">052</option>
								    <option value="053">053</option>
								    <option value="054">054</option>
								    <option value="055">055</option>
								    <option value="061">061</option>
								    <option value="062">062</option>
								    <option value="063">063</option>
								    <option value="064">064</option>
								    <option value="064">070</option>
								</optgroup>
							</select>
							-<input type="text" name="user_tel2" id="user_tel2" maxLength="4"/>-<input maxLength="4" type="text" name="user_tel3" id="user_tel3"/>
						</td>
						
					</tr>
					<tr>
						<td>
							휴대폰
						</td>
						<td colspan="4">
							<select name="user_phone1" id="user_phone1">
								<optgroup>
									<option value="010" >010 </option>
								    <option value="011">011</option>
								    <option value="016">016</option>
								    <option value="017">017</option>
								    <option value="018">018</option>
								</optgroup>
							</select>
							-<input type="text" maxLength="4" name="user_phone2" id="user_phone2"/>-<input type="text" maxLength="4" name="user_phone3" id="user_phone3"/>						
						</td>
						
					</tr>
					<tr>
						<td>
							이메일
						</td>
						<td colspan="4">
							<input type="text" name="user_email1" id="user_email1"/>@<input type="text" name="user_email2" id="user_email2"/>
							<select id="emailDomain">
								<optgroup>
								 <option value="" selected>직접입력</option>
								 <option value="naver.com" >naver.com</option>
								 <option value="hanmail.net">hanmail.net</option>
								 <option value="hotmail.com">hotmail.com</option>
								 <option value="nate.com">nate.com</option>
								 <option value="yahoo.co.kr">yahoo.co.kr</option>
								 <option value="empas.com">empas.com</option>
								 <option value="dreamwiz.com">dreamwiz.com</option>
								 <option value="freechal.com">freechal.com</option>
								 <option value="lycos.co.kr">lycos.co.kr</option>
								 <option value="korea.com">korea.com</option>
								 <option value="gmail.com">gmail.com</option>
								 <option value="hanmir.com">hanmir.com</option>
								 <option value="paran.com">paran.com</option>
								</optgroup>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							sms 수신여부
						</td>
						<td colspan="4">
	                       <input type="radio" name="radio_user_aree_sms" value="y" checked="checked">예
                           <input type="radio" name="radio_user_aree_sms" value="n">아니오
                           SMS를 수신하시면 세무신고 일정, 공지사항을 보내드립니다.
						</td>

					</tr>				
					<tr>
						<td>
							이메일 수신여부
						</td>
						<td colspan="4">
						   <input type="radio" name="radio_user_aree_email" value="y" checked="checked">예
                           <input type="radio" name="radio_user_aree_email" value="n">아니오
                                              이메일을 수신하시면 세무정보, 레터를 보대드립니다.		
						</td>

					</tr>						
				</table>
					<div class="regi_btn1" id="form_excute">등록 </div>
					<div class="regi_btn2" id="form_cancel">취소 </div>

			</div>
		</div>
	</form>
	
	
 </body>

</html>
