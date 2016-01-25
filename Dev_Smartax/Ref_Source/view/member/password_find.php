<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>비밀번호찾기</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<form class="form-join" action="#" method="POST">
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
								<input type="text" id="phone1" name="phone1" style="width: 60px;" title="핸드폰번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="phone2" name="phone2" style="width: 60px;" title="핸드폰번호 중간자리 입력">
								<span>-</span>
								<input type="text" id="phone3" name="phone3" style="width: 60px;" title="핸드폰번호 뒷자리 입력">
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
						<img src="./img/member/btn_modify_01.png" alt="정보수정">
					</button>
				</div>
			</fieldset>
		</form>
	</div>
</div>
<script>
(function() {
	var isReq = false;
	var isCert = false;
	var t1 = null;

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
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					//timer_start();
					alert('문자로 발송된 인증 번호를 하단에 입력해주세요.');
				} else if (code == 'd') {
					alert('아이디와 휴대폰 번호가 일치하지 않습니다.');
				} else {
					isReq = false;
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
			return;
		}
		
		if (pwd1 == '' || pwd2 == '') {
			alert('변경하실 비밀번호를 입력해 주세요.');
			return;
		}
		
		if (pwd1 != pwd2) {
			alert('비밀번호확인이 다릅니다.');
			return;
		}
		
		$.ajax({
	        type: 'POST',
	        url: './proc/member/change_pwd_proc.php',
	        data: { pwd: pwd1 },
	        success : function(result) {
	        	var code = $(result).find('code').text();
                
                if (code == 'y') {
					isCert = true;
					alert('비밀번호가 변경되었습니다.');
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