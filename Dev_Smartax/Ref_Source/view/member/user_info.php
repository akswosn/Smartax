<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>내정보</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<ul class="tab-01">
			<li class="on"><a href="./route.php?contents=002">내정보</a></li>
			<!-- <li><a href="./route.php?contents=003&pg_inx=1">결제내역</a></li>
			<li><a href="./route.php?contents=004&pg_inx=1">포인트사용내역</a></li>
			<li><a href="./route.php?contents=005">포인트결제</a></li> -->
		</ul>
		<form class="form-join" action="#" method="POST">
			<fieldset class="form-join-inner">
				<legend>내정보</legend>
				<!-- <table class="form-table-01 mgT20">
					<caption>포인트</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="point">사용가능 포인트</label></th>
							<td>
								<input type="text" id="point" name="point" style="width: 180px;" disabled="disabled">
								<a href="./route.php?contents=005" class="btn-fixed-black-w80">포인트결제</a>
							</td>
						</tr>
					</tbody>
				</table> -->
				<table id="required" class="form-table-01 mgT20">
					<caption>필수항목</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="login_id">아이디</label></th>
							<td><input type="text" id="login_id" name="login_id" style="width: 180px;" title="아이디 입력" disabled="disabled"></td>
						</tr>
						<tr>
							<th scope="row"><label for="nickname">이름</label></th>
							<td><input type="text" id="nickname" name="nickname" style="width: 180px;" title="이름 입력" disabled="disabled"></td>
						</tr>
						<tr>
							<th scope="row"><label for="login_pw_old">기존비밀번호</label></th>
							<td>
								<input type="password" id="login_pw_old" name="login_pw_old" style="width: 180px;" title="비밀번호 입력">
								<span class="msg-01">정보수정 시 필수 입력사항 입니다.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="login_pw">신규비밀번호</label></th>
							<td>
								<input type="password" id="login_pw" name="login_pw" style="width: 180px;" title="비밀번호 입력">
								<span class="msg-01">비밀번호는 6자 이상의 영문, 숫자 조합만 가능합니다.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="login_pwc">신규비밀번호확인</label></th>
							<td>
								<input type="password" id="login_pwc" name="login_pwc" style="width: 180px;" title="비밀번호 입력">
								<span class="msg-01">위에서 입력한 비밀번호를 한번 더 입력해주세요.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="farmname">농장(회사)명</label></th>
							<td>
								<input type="text" id="farmname" name="farmname" style="width: 180px;" title="농장이름(회사이름) 입력">
								<span class="msg-01">회계장부에 표시되는 농장(회사)명 입니다.</span>
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
							</td>
						</tr>
					</tbody>
				</table>
				<table class="form-table-01 mgT20">
					<caption>추가항목</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="email">이메일</label></th>
							<td>
								<input type="text" id="email" name="email" style="width: 300px;" title="이메일 입력">
								<span class="msg-01">아이디, 비밀번호를 분실한 경우 입력한 이메일로 찾을 수 있습니다.</span>
							</td>
						</tr>
						<tr>
							<th class="row-large" scope="row"><label for="zipcode1">주소</label></th>
							<td>
								<input type="text" id="zipcode1" name="zipcode1" style="width: 60px;" title="우편번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="zipcode2" name="zipcode2" style="width: 60px;" title="우편번호 뒷자리 입력">
								<input type="button" id="zip_search" class="btn-fixed-black-w60" value="우편번호">
								<div class="mgT6"><input type="text" id="addr1" name="addr1" style="width: 300px;" title="주소 입력"></div>
								<div class="mgT6"><input type="text" id="addr2" name="addr2" style="width: 300px;" title="주소 입력"></div>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="tel1">전화번호</label></th>
							<td>
								<input type="text" id="tel1" name="tel1" style="width: 60px;" title="전화번호 국번 입력">
								<span>-</span>
								<input type="text" id="tel2" name="tel2" style="width: 60px;" title="전화번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="tel3" name="tel3" style="width: 60px;" title="전화번호 뒷자리 입력">
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="fax1">팩스</label></th>
							<td>
								<input type="text" id="fax1" name="fax1" style="width: 60px;" title="팩스번호 국번 입력">
								<span>-</span>
								<input type="text" id="fax2" name="fax2" style="width: 60px;" title="팩스번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="fax3" name="fax3" style="width: 60px;" title="팩스번호 뒷자리 입력">
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="homepage">홈페이지</label></th>
							<td><input type="text" id="homepage" name="homepage" style="width: 500px;" title="홈페이지 주소 입력"></td>
						</tr>
					</tbody>
				</table>
			</fieldset>
			<div class="mgT20 alignC">
				<button id="btn-modify" class="btn-img-blue-w160" type="submit">
					<img src="./img/member/btn_modify_01.png" alt="정보수정">
				</button>
			</div>
		</form>
	</div>
</div>
<script>
(function() {
	//데이터 셋팅
	$.ajax({
        type: 'POST',
        url: './proc/member/user_list_proc.php',
        dataType: 'json',
        success : function(result) {
        	$('#login_id').val(result.user_id);
			$('#nickname').val(result.user_nick);
			$('#farmname').val(result.user_farm_name);
			$('#phone1').val(result.user_phone.split('-')[0]);
			$('#phone2').val(result.user_phone.split('-')[1]);
			$('#phone3').val(result.user_phone.split('-')[2]);
            $('#email').val(result.user_email);
			$('#zipcode1').val(result.user_zip.split('-')[0]);
			$('#zipcode2').val(result.user_zip.split('-')[1]);
			$('#addr1').val(result.user_addr.split('  ')[0]);
			$('#addr2').val(result.user_addr.split('  ')[1]);
			$('#tel1').val(result.user_tel.split('-')[0]);
			$('#tel2').val(result.user_tel.split('-')[1]);
			$('#tel3').val(result.user_tel.split('-')[2]);
			$('#fax1').val(result.user_fax.split('-')[0]);
			$('#fax2').val(result.user_fax.split('-')[1]);
			$('#fax3').val(result.user_fax.split('-')[2]);
			$('#homepage').val(result.user_homepage);
        },
        error: function(xhr, status, error) {
        	console.log(xhr+"//"+status+"//"+error);
        }
    });
    
    //주소 검색
	$("#zip_search").click(function() {
		var _win = new $asoo.Window('zipcode_popup', './view/popup/zipcode_popup.html');
	    var cenX = $(window).width()/2 - 500/2;
	    var cenY = $(window).height()/2 ;
	    
	    _win.setWindowOption({
	        isModal : true,
	        dragAreaId : 'pop_title' //특정 드래그 영역을 지정한다.
	    });
	    
	    //팝업 오픈
	    _win.open(cenX, cenY, 500, 0, function() {
	    	_zip_func.bindZipcodeFind("payer");
	        //드래그 되지 않게 하기 위해
			$('.pop_close').mousedown(function() {
				return false;
			});
			
			$('.pop_close').click(function() {
				$asoo.windowClose('zipcode_popup');
				return false;
			});
	    });
	});
	
	//정보수정
	$("#btn-modify").click(function() {
		$.ajax({
	        type: 'POST',
	        url: './proc/member/user_modify_proc.php',
	        data: {
	        	login_id: $('#login_id').val(),
	        	nickname: $('#nickname').val(),
	        	login_pw_old: $('#login_pw_old').val(),
	        	login_pw: $('#login_pw').val(),
	        	login_pwc: $('#login_pwc').val(),
	        	farmname: $('#farmname').val(),
	        	user_phone: $('#phone1').val() + '-' + $('#phone2').val() + '-' + $('#phone3').val(),
	        	email: $('#email').val(),
	        	user_zip: $('#zipcode1').val() + '-' + $('#zipcode2').val(),
	        	user_addr: $('#addr1').val() + '  ' + $('#addr2').val(),
	        	user_tel: $('#tel1').val() + '-' + $('#tel2').val() + '-' + $('#tel3').val(),
	        	user_fax: $('#fax1').val() + '-' + $('#fax2').val() + '-' + $('#fax3').val(),
	        	user_homepage: $('#homepage').val()
	        },
	        dataType: 'json',
	        success : function(result) {
	        	if (result == 1) {
					alert("정보가 수정되었습니다.");
					$('#login_pw_old').val('');
					$('#login_pw').val('');
					$('#login_pwc').val('');
				}
				else {
					alert("비밀번호를 확인해 주세요.");
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(xhr+"//"+status+"//"+error);
	        }
	    });
	    return false;
	});
}());
</script>