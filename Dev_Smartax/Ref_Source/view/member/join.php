<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>회원가입</span>
			<small>산천경제연구소에 가입하시면 다양한 서비스를 이용할 수 있습니다</small>
		</h2>	
	</div>
	<div class="content-inner">
		<form class="form-join" method="POST" action="./proc/member/register_proc.php">
			<fieldset class="form-join-inner">
				<legend>회원가입</legend>
				<table id="required" class="form-table-01">
					<caption>필수항목</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="login_id">아이디</label></th>
							<td>
								<input type="text" id="login_id" name="login_id" style="width: 180px;" title="아이디 입력">
								<input type="button" id="login_id_check" class="btn-fixed-black-w60" value="중복확인">
								<span class="msg-01">아이디는 6자 이상의 영문, 숫자 조합만 가능합니다. 아이디 입력 후 중복확인 버튼을 눌러주세요.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="nickname">이름</label></th>
							<td><input type="text" id="nickname" name="nickname" style="width: 180px;" title="이름 입력"></td>
						</tr>
						<tr>
							<th scope="row"><label for="login_pw">비밀번호</label></th>
							<td>
								<input type="password" id="login_pw" name="login_pw" style="width: 180px;" title="비밀번호 입력">
								<span class="msg-01">비밀번호는 6자 이상의 영문, 숫자 조합만 가능합니다.</span>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="login_pwc">비밀번호확인</label></th>
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
							<td><input type="text" id="homepage" name="homepage" style="width: 300px;" title="홈페이지 주소 입력"></td>
						</tr>
					</tbody>
				</table>
			</fieldset>
			<div class="mgT20 alignC">
				<button id="btn-join" class="btn-join-01" type="submit">회원가입</button>
			</div>
		</form>
	</div>
</div>
<script>
$(document).ready(function()
{
    var isIdCheck = false;
    var isNickCheck = false;
    
    //실명 인증
    var isCertk = false;
    
    //여기서 입력값 유효성 체크, submit 
    $('#btn-join').click(function()
    {
    	if (!emptyCheck()) return false;
       
        if (!isIdCheck)
        {
            alert('아이디 중복 체크를 해주세요.');
            return false;
        }
        /*
        if(!isNickCheck)
        {
            alert('성명 중복 체크를 해주세요.');
            return false;
        }
        */
        /*
		if(!isCertk)
        {
            alert('실명을 인증해 주세요.');
            return false;
        }
         */
       
        return true;
    });
    
    //실명 인증
	
    //아이디 중복 체크
    $('#login_id_check').click(function()
    {
        requestCheck($("#login_id").val(), 1);
    });
    
    //주소 검색
	$("#zip_search").click(function()
	{
		var _win = new $asoo.Window('zipcode_popup', './view/popup/zipcode_popup.html');
	    
	    _win.setWindowOption(
	    {
	        isModal : true,
	        dragAreaId : 'pop_title' //특정 드래그 영역을 지정한다.
	    });
	    
	    var cenX = $(window).width()/2 - 500/2;
	    var cenY = $(window).height()/2 ;
	    
	    //팝업 오픈
	    _win.open(cenX, cenY, 500, 0, function()
	    {
	    	_zip_func.bindZipcodeFind("payer");
	        //드래그 되지 않게 하기 위해
			$('.pop_close').mousedown(function() 
			{
				return false;
			});
			
			$('.pop_close').click(function() 
			{
				$asoo.windowClose('zipcode_popup');
				return false;
			});
	    });
	});
	
    function requestCheck(value, type)
    {
        if(value == '')
        {
            $('#login_id').focus();
            alert("아이디를 입력해 주세요.");
            return;
        }
        
		$asoo.requestData(
        {
            url: './proc/member/exist_check_proc.php',
            postData: "value=" + value + "&type=" + type,
    
            success : function(code, data)
            {
                if(code=='y')
                {
                    //아이디 중복 체크 결과
                    if(type==1)
                    {
                        //존재하지 않는 회원이면 성공
                        if(data==-1) 
                        {
                            isIdCheck = true;
                            alert('사용 가능한 아이디 입니다.');
                        }
                        else alert('사용중인 아이디 입니다.');
                    }
                    
                    //닉네임 중복 체크 결과
                    else
                    {
                        //존재하지 않는 회원이면 성공
                        if(data==-1) 
                        {
                            isNickCheck = true;
                            alert('사용 가능한 닉네임 입니다. (O)');
                        }
                        else alert('사용중인 닉네임 입니다. (X)');
                    }
                }
                else
                {
                    alert('오류 발생!');
                }
            }, 
            
            error : function(xhr, status, error)
            {
                alert('오류 발생!');
            }
        });
    }
    
    function emptyCheck()
    {
    	if ($('#login_id').val() == '')
    	{
    		$('#login_id').focus();
    		alert('아이디를 입력해 주세요.');
    		return false;
    	}
    	
    	if ($('#nickname').val() == '')
    	{
    		$('#nickname').focus();
    		alert('닉네임을 입력해 주세요.');
    		return false;
    	}
    	
    	var pw = $('#login_pw').val(); 
    	if (pw == '')
    	{
    		$('#login_pw').focus();
    		alert('비밀번호를 입력해 주세요.');
    		return false;
    	}
    	
    	if ($('#login_pwc').val() == '')
    	{
    		$('#login_pwc').focus();
    		alert('비밀번호확인을 입력해 주세요.');
    		return false;
    	}
    	else {
    		if (pw != $('#login_pwc').val())
	    	{
	    		$('#login_pwc').focus();
	    		alert('비밀번호확인이 다릅니다.');
	    		return false;
	    	}
    	}
    	
    	if ($('#farmname').val() == '')
    	{
    		$('#farmname').focus();
    		alert('회사 이름을 입력해 주세요.');
    		return false;
    	}
    	
    	if ($('#phone1').val() == '' || $('#phone2').val() == '' || $('#phone3').val() == '')
    	{
    		$('#phone1').focus();
    		alert('핸드폰 번호를 입력해 주세요.');
    		return false;
    	}
    	
    	return true;
    }
});
</script>