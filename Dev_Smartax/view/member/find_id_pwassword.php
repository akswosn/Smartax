 <link rel="stylesheet" href="./css/member.css">
<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>아이디 / 비밀번호찾기</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="menuwrap_board">
		<div class="mid_1">
			<ul class="mid_1_1" >
				<input type="button" id="tab_btn_1" name="tab_btn" class="input_btn click_pt" value="아이디 찾기" style="width:150px">
				<input type="button" id="tab_btn_2" name="tab_btn" class="input_btn click_pt" value="비밀번호 찾기" style="width:150px">
			</ul>
		</div>
	</div>
	<div class="content-inner">
	<!-- 
		<div class="radio-tab">
			<input type="radio" id="tab_btn_1" name="tab_btn" class="tab_btn" checked="checked"><label for="tab_btn_1">아이디 찾기</label>
			<input type="radio" id="tab_btn_2" name="tab_btn" class="tab_btn"><label for="tab_btn_2">비밀번호 찾기</label>
		</div>
	 -->
		<div class="content-tab-1">
			<form class="form-join" action="#" name="form1" id="form1"method="POST">
			<fieldset class="form-join-inner">
				<table id="id_find" class="form-table-01">
					<caption>아이디 찾기</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="fid_birthday">생년월일</label></th>
							<td>
							<!-- 
							<span class="ps_box">
								<input type="text" id="yy" maxlength="4" value="" onfocus="toggleLabel('yyLb','yy','in');" onblur="toggleLabel('yyLb','yy','out');checkBirthday('check')" placeholder="년(4자)" class="int"> 
								<label id="yyLb" for="yy" class="lbl">년(4자)</label> <button type="button" disabled="" title="delete" class="wrg">삭제 </button>
							</span>
								<input type="number" id="fid_birthday" name="fid_birthday" style="width: 180px;" title="생년월일 입력">
							 -->
							 	<input type="text" id="yy" maxlength="4" value="" placeholder="년(4자)" class="int"> 
								<label id="yyLb" for="yy" class="msg-01">년(4자)</label>
								<select id="mm" title="월" class="sel">
									<option value="">월</option>
					  	 			<option value="01">1</option>
					  	 			<option value="02">2</option>
					  	 			<option value="03">3</option>
					  	 			<option value="04">4</option>
					  	 			<option value="05">5</option>
					  	 			<option value="06">6</option>
					  	 			<option value="07">7</option>
					  	 			<option value="08">8</option>
					  	 			<option value="09">9</option>
					  	 			<option value="10">10</option>
					  	 			<option value="11">11</option>
					  	 			<option value="12">12</option>
								</select>
								<select id="dd" title="일" class="sel">
									<option value="">일</option>
					  	 			<option value="01">1</option>
					  	 			<option value="02">2</option>
					  	 			<option value="03">3</option>
					  	 			<option value="04">4</option>
					  	 			<option value="05">5</option>
					  	 			<option value="06">6</option>
					  	 			<option value="07">7</option>
					  	 			<option value="08">8</option>
					  	 			<option value="09">9</option>
					  	 			<option value="10">10</option>
					  	 			<option value="11">11</option>
					  	 			<option value="12">12</option>
					  	 			<option value="13">13</option>
					  	 			<option value="14">14</option>
					  	 			<option value="15">15</option>
					  	 			<option value="16">16</option>
					  	 			<option value="17">17</option>
					  	 			<option value="18">18</option>
					  	 			<option value="19">19</option>
					  	 			<option value="20">20</option>
					  	 			<option value="21">21</option>
					  	 			<option value="22">22</option>
					  	 			<option value="23">23</option>
					  	 			<option value="24">24</option>
					  	 			<option value="25">25</option>
					  	 			<option value="26">26</option>
					  	 			<option value="27">27</option>
					  	 			<option value="28">28</option>
					  	 			<option value="29">29</option>
					  	 			<option value="30">30</option>
					  	 			<option value="31">31</option>
								</select>
								<span class="msg-01"></span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="fid_p1">핸드폰번호</label></th>
							<td>
								<input type="text" id="fid_phone1" name="fid_phone1" style="width: 60px;" title="핸드폰번호 앞자리 입력" maxlength="3">
								<span>-</span>
								<input type="text" id="fid_phone2" name="fid_phone2" style="width: 60px;" title="핸드폰번호 중간자리 입력" maxlength="4">
								<span>-</span>
								<input type="text" id="fid_phone3" name="fid_phone3" style="width: 60px;" title="핸드폰번호 뒷자리 입력" maxlength="4">
								<input type="button" id="btn_fid_auth_request" class="btn-fixed-black-w80" value="인증번호요청">
								<span class="msg-01">회원가입시 입력하신 핸드폰번호와 일치해야합니다.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="fid_cert_number">인증번호</label></th>
							<td>
								<input type="text" id="fid_cert_number" name="fid_cert_number" style="width: 180px;" title="인증번호 입력">
								<input type="button" id="btn_fid_auth_submit" class="btn-fixed-black-w60" value="인증확인">
								<span class="msg-01">문자로 받으신 인증번호를 입력해주세요.</span>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="mgT20 alignC">
					<button id="btn-id-find" class="btn-img-blue-w160" type="submit">
						아이디 찾기
					</button>
				</div>
			</fieldset>
			</form>
		</div>
		<div class="content-tab-2">
			<form class="form-join"id="form2" name="form2" action="#" method="POST">
			<fieldset class="form-join-inner">
				<legend>비밀번호찾기</legend>
				<table id="password_find" class="form-table-01">
					<caption>핸드폰인증</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="login_id">아이디</label></th>
							<td>
								<input type="text" id="login_id" name="login_id" style="width: 180px;" title="아이디 입력">
								<span class="msg-01">찾으시려는 비밀번호의 아이디를 입력해주세요.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="phone1">핸드폰번호</label></th>
							<td>
								<input type="text" id="phone1" name="phone1" style="width: 60px;" title="핸드폰번호 앞자리 입력" maxlength="3">
								<span>-</span>
								<input type="text" id="phone2" name="phone2" style="width: 60px;" title="핸드폰번호 중간자리 입력" maxlength="4">
								<span>-</span>
								<input type="text" id="phone3" name="phone3" style="width: 60px;" title="핸드폰번호 뒷자리 입력" maxlength="4">
								<input type="button" id="btn_auth_request" class="btn-fixed-black-w80" value="인증번호요청">
								<span class="msg-01">회원가입시 입력하신 핸드폰번호와 일치해야합니다.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="cert_number">인증번호</label></th>
							<td>
								<input type="text" id="cert_number" name="cert_number" style="width: 180px;" title="인증번호 입력">
								<input type="button" id="btn_auth_submit" class="btn-fixed-black-w60" value="인증확인">
								<span class="msg-01">문자로 받으신 인증번호를 입력해주세요.</span>
							</td>
						</tr>
					</tbody>
				</table>
				<table id="password_modify" class="form-table-01 mgT20">
					<caption>비밀번호변경</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="login_pw">비밀번호</label></th>
							<td>
								<input type="password" id="login_pw" name="login_pw" style="width: 180px;" title="비밀번호 입력" disabled="disabled">
								<span class="msg-01">비밀번호는 6자 이상의 영문, 숫자 조합만 가능합니다.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="login_pwc">비밀번호확인</label></th>
							<td>
								<input type="password" id="login_pwc" name="login_pwc" style="width: 180px;" title="비밀번호 입력" disabled="disabled">
								<span class="msg-01">위에서 입력한 비밀번호를 한번 더 입력해주세요.</span>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="mgT20 alignC">
					<button id="btn-modify" class="btn-img-blue-w160" type="submit">
						<img src="./images/member/btn_modify_01.png" alt="정보수정">
					</button>
				</div>
			</fieldset>
			</form>
		</div>
	</div>
</div>
<script>
(function() {
	$('#tab_btn_1').click(function(){
		$('.content-tab-1').show();
		$('.content-tab-2').hide();
	});
	$('#tab_btn_2').click(function(){
		$('.content-tab-1').hide();
		$('.content-tab-2').show();
	});

	var isFidReq = false;
	var isFidCert = false;
	var isReq = false;
	var isCert = false;
	var t1 = null;

	//아이디 찾기 인증
	$('#btn_fid_auth_request').click(function(){
		if ($("#fid_phone1").val() == '' || $("#fid_phone2").val() == '' || $("#fid_phone3").val() == '') {
			alert('휴대폰 번호를 입력해 주세요.');
			return false;
		}
		
		var phoneNum = $("#fid_phone1").val() + '-' + $("#fid_phone2").val() + '-' + $("#fid_phone3").val();
		
		if (isFidReq) {
			alert('이미 요청을 했습니다.');
			return false;
		}
		
		isReq = true;
		
		$.ajax({
	        type: 'post',
	        url: './proc/member/req_number_proc2.php',
	        data: { number: phoneNum},
	        success : function(result) {
		        console.log(result);
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					//timer_start();
					alert('문자로 발송된 인증 번호를 하단에 입력해주세요.');
				} else if (code == 'd') {
					alert('일치하는 휴대폰 번호가 존재하지 않습니다.');
					isFidReq = false;
				} else {
					isFidReq = false;
					alert('인증번호 발송에 실패하였습니다.');
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(xhr + ":" + status + ":" + error);
	        }
	    });
	})

	$('#btn_fid_auth_submit').click(function(){
		var number = $('#fid_cert_number').val();

		if (number == '') {
			alert('인증번호를 입력해주세요.');
			return false;
		}
		
		$.ajax({
	        type: 'POST',
	        url: './proc/member/chk_number_proc.php',
	        data: { number: number },
	        success : function(result) {
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					//tstop("인증 완료");
					isFidCert = true;
					alert("인증이 완료되었습니다.");
				} else {
					alert('인증번호가 틀렸습니다.');
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(('error'));
	        }
	    });
	})
	
	//아이디 찾기
	$('#btn-id-find').click(function(){
		if(!isFidCert){
			alert('휴대폰 번호를 인증해 주세요.');
			return;
		}
		if($('#yy').val().length != 4){
			alert('생년년도를 입력해주세요');
			return;
		}
		if($('#mm').val().length == 0){
			alert('생년월을 입력해주세요');
			return;
		}
		if($('#dd').val().length == 0){
			alert('생년일을 입력해주세요');
			return;
		}

		var birth = $('#yy').val().substring(2,4)+''+$('#mm').val()+''+$('#dd').val();
		if ($("#fid_phone1").val() == '' || $("#fid_phone2").val() == '' || $("#fid_phone3").val() == '') {
			alert('휴대폰 번호를 입력해 주세요.');
			return false;
		}
		
		var phoneNum = $("#fid_phone1").val() + '-' + $("#fid_phone2").val() + '-' + $("#fid_phone3").val();

		$.ajax({
	        type: 'post',
	        url: './proc/member/find_id_proc.php',
	        data: { number: phoneNum, birth: birth },
	        success : function(result) {
		        console.log(result);
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					//timer_start();
					alert('등록된 휴대전화 번호로 아이디를 발송하였습니다.');
					isFidCert = false;
					document.form1.reset();
				} else {
					alert('아이디 정보 발송에 실패하였습니다.');
				}
	        },
	        error: function(xhr, status, error) {
		        console.log(xhr);
	        	console.log(xhr + ":" + status + ":" + error);
	        }
	    });
	})

	function timer_start() {//초기 설정함수
		clearInterval(t1);
		tcounter = 180;
		//3분설정
		t1 = setInterval(Timer, 1000);
	}
	
	function Timer() {//시간표및 조건검사
		tcounter = tcounter - 1;
		//1초식 감소
		temp = Math.floor(tcounter / 60);
		// 분부분 두자리 계산 mm
		if (Math.floor(tcounter / 60) < 10) {
			temp = '0' + temp;
		}
		temp = temp + ":";
		//mm:ss의 : 이부분추가
		if ((tcounter % 60) < 10) {
			temp = temp + '0';
		}//초부분 두자리 계산 ss
		temp = temp + (tcounter % 60);
		document.getElementById("reg_timer").innerHTML = temp;
		// 시간 출력
		if (tcounter < 0)
			tstop('다시 시작');
		// 3분후 완료
	}
	
	function tstop(txt) {//완료함수
		isReq = false;
		clearInterval(t1);
		document.getElementById("reg_timer").innerHTML = txt;
	}
	
	$('#btn_auth_request').click(function() {
		var login_id = $("#login_id").val();
    	    		
		if (login_id == '') {
			alert('아이디를 입력해 주세요.');
			return false;
		}
		
		if ($("#phone1").val() == '' || $("#phone2").val() == '' || $("#phone3").val() == '') {
			alert('휴대폰 번호를 입력해 주세요.');
			return false;
		}
		
		var phoneNum = $("#phone1").val() + '-' + $("#phone2").val() + '-' + $("#phone3").val();
		
		if (isReq) {
			alert('이미 요청을 했습니다.');
			return false;
		}
		
		isReq = true;
		
		$.ajax({
	        type: 'post',
	        url: './proc/member/req_number_proc.php',
	        data: { number: phoneNum, login_id: login_id },
	        success : function(result) {
		        console.log(result);
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					//timer_start();
					alert('문자로 발송된 인증 번호를 하단에 입력해주세요.');
				} else if (code == 'd') {
					isReq = false;
					alert('아이디와 휴대폰 번호가 일치하지 않습니다.');
				} else {
					isReq = false;
					alert('인증번호 발송에 실패하였습니다.');
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(xhr + ":" + status + ":" + error);
	        }
	    });
	});
	
	$('#btn_auth_submit').click(function() {
		var number = $('#cert_number').val();

		if (number == '') {
			alert('인증번호를 입력해주세요.');
			return false;
		}
		
		$.ajax({
	        type: 'POST',
	        url: './proc/member/chk_number_proc.php',
	        data: { number: number },
	        success : function(result) {
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					//tstop("인증 완료");
					isCert = true;
					$('#login_pw').removeAttr('disabled');
					$('#login_pwc').removeAttr('disabled');
					alert("인증이 완료되었습니다. 비밀번호를 변경해주세요.");
				} else {
					alert('인증번호가 틀렸습니다.');
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(('error'));
	        }
	    });
	});
	
	//비밀번호 변경
	$('#btn-modify').click(function() {
		var pwd1 = $('#login_pw').val();
		var pwd2 = $('#login_pwc').val();
		
		if (!isCert) {
			alert('휴대폰 번호를 인증해 주세요.');
			return false;
		}
		
		if (pwd1 == '' || pwd2 == '') {
			alert('변경하실 비밀번호를 입력해 주세요.');
			return false;
		}
		if (pwd1 != pwd2) {
			alert('비밀번호확인이 다릅니다.');
			return false;
		}
		
		$.ajax({
	        type: 'POST',
	        url: './proc/member/change_pwd_proc.php',
	        data: { pwd: pwd1 },
	        success : function(result) {
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					isCert = false;
					alert('비밀번호가 변경되었습니다.');
					$('#login_pw').attr('disabled', 'disabled');
					$('#login_pwc').attr('disabled', 'disabled');
					document.form2.reset();
				} else {
					console.log($(result).find('data').text());
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(('error'));
	        }
	    });
	    
	    return false;
	});
}());
</script>