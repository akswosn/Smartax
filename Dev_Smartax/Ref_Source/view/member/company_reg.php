<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>회사등록</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<ul class="tab-01">
			<li><a href="./route.php?contents=006">회사정보</a></li>
			<li class="on"><a href="./route.php?contents=007">회사등록</a></li>
			<li><a href="./route.php?contents=008">서비스정보</a></li>
			<li><a href="./route.php?contents=009">서비스신청</a></li>
		</ul>
		<form class="form-join" action="./proc/member/reg_company_proc.php" method="POST">
			<fieldset class="form-join-inner">
				<legend>회사등록</legend>
				<table class="form-table-01 mgT20">
					<caption>필수항목</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="co_nm">회사명</label></th>
							<td>
								<input type="text" id="co_nm" name="co_nm" style="width: 180px;" title="회사명 입력">
							</td>
						</tr>
					</tbody>
				</table>
				<table class="form-table-01 mgT20">
					<caption>부가세 신고 필수항목</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="co_ceo_nm">대표자</label></th>
							<td><input type="text" id="co_ceo_nm" name="co_ceo_nm" style="width: 180px;" title="대표자 입력"></td>
						</tr>
						<tr>
							<th scope="row"><label for="co_saup_no1">사업자번호</label></th>
							<td>
								<input type="text" id="co_saup_no1" name="co_saup_no1" style="width: 60px;" title="사업자번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_saup_no2" name="co_saup_no2" style="width: 60px;" title="사업자번호 중간자리 입력">
								<span>-</span>
								<input type="text" id="co_saup_no3" name="co_saup_no3" style="width: 60px;" title="사업자번호 뒷자리 입력">
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="co_co_no1">법인등록번호</label></th>
							<td>
								<input type="text" id="co_co_no1" name="co_co_no1" style="width: 100px;" title="법인등록번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_co_no2" name="co_co_no2" style="width: 100px;" title="법인등록번호 뒷자리 입력">
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="co_up">업태</label></th>
							<td><input type="text" id="co_up" name="co_up" style="width: 180px;" title="업태 입력"></td>
						</tr>
						<tr>
							<th scope="row"><label for="co_jong">종목</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 업종 코드 -->
						<tr>
							<th scope="row"><label for="co_jong">업종 코드</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 업종 코드 -->
						<tr>
							<th class="row-large" scope="row"><label for="zipcode1">사업장 소재지</label></th>
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
							<th scope="row"><label for="co_tel1">사업장 전화번호</label></th>
							<td>
								<input type="text" id="co_tel1" name="co_tel1" style="width: 60px;" title="전화번호 국번 입력">
								<span>-</span>
								<input type="text" id="co_tel2" name="co_tel2" style="width: 60px;" title="전화번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_tel3" name="co_tel3" style="width: 60px;" title="전화번호 뒷자리 입력">
							</td>
						</tr>
						<!--  신규  : 주소지 전화번호 -->
						<tr>
							<th scope="row"><label for="co_tel1">주소지 전화번호</label></th>
							<td>
								<input type="text" id="co_tel1" name="co_tel1" style="width: 60px;" title="전화번호 국번 입력">
								<span>-</span>
								<input type="text" id="co_tel2" name="co_tel2" style="width: 60px;" title="전화번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_tel3" name="co_tel3" style="width: 60px;" title="전화번호 뒷자리 입력">
							</td>
						</tr>
						<!--  신규  : 주소지 전화번호 -->
						
						<tr>
							<th scope="row"><label for="co_handphone1">핸드폰</label></th>
							<td>
								<input type="text" id="co_handphone1" name="co_handphone1" style="width: 60px;" title="핸드폰번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_handphone2" name="co_handphone2" style="width: 60px;" title="핸드폰번호 중간자리 입력">
								<span>-</span>
								<input type="text" id="co_handphone3" name="co_handphone3" style="width: 60px;" title="핸드폰번호 뒷자리 입력">
							</td>
						</tr>
						
						
						<!--  신규  : 부가세 전자우편주소 -->
						<tr>
							<th scope="row"><label for="co_handphone1">부가세 전자우편주소</label></th>
							<td>
								<input type="text" id="co_handphone1" name="co_handphone1" style="width: 60px;" title="핸드폰번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_handphone2" name="co_handphone2" style="width: 60px;" title="핸드폰번호 중간자리 입력">
								<span>-</span>
								<input type="text" id="co_handphone3" name="co_handphone3" style="width: 60px;" title="핸드폰번호 뒷자리 입력">
							</td>
						</tr>
						<!--  신규  : 부가세 전자우편주소 -->
						
						<!--  신규  : 관할세무서 -->
						<tr>
							<th scope="row"><label for="co_jong">관할세무서</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 관할세무서 -->
						
						<!--  신규  : 서코드 -->
						<tr>
							<th scope="row"><label for="co_jong">서코드</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 서코드 -->
						
						<!--  신규  : 관할세무서 계좌번호 -->
						<tr>
							<th scope="row"><label for="co_jong">관할세무서 계좌번호</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 관할세무서 계좌번호 -->
						
						<!--  신규  : 환급금 거래은행 -->
						<tr>
							<th scope="row"><label for="co_jong">환급금 거래은행</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 환급금 거래은행 -->
						
						<!--  신규  : 환급금 지점 -->
						<tr>
							<th scope="row"><label for="co_jong">환급금 지점</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 환급금 지점 -->
						
						<!--  신규  : 환급금 계좌 -->
						<tr>
							<th scope="row"><label for="co_jong">환급금 계좌</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 환급금 계좌 -->
						
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
							<th scope="row"><label for="co_fax1">팩스</label></th>
							<td>
								<input type="text" id="co_fax1" name="co_fax1" style="width: 60px;" title="팩스번호 국번 입력">
								<span>-</span>
								<input type="text" id="co_fax2" name="co_fax2" style="width: 60px;" title="팩스번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_fax3" name="co_fax3" style="width: 60px;" title="팩스번호 뒷자리 입력">
							</td>
						</tr>
					</tbody>
				</table>
			</fieldset>
			<div class="mgT20 alignC">
				<button id="btn-reg" class="btn-img-blue-w160" type="submit">
					<img src="./img/member/btn_reg_01.png" alt="정보수정">
				</button>
			</div>
		</form>
	</div>
</div>
<script>
	//정보수정
	$("#btn-modify").click(function() {
		$.ajax({
	        type: 'POST',
	        url: './proc/member/reg_company_proc.php',
	        data: {
	        	co_id: -1,
				co_ceo_nm: $('#co_ceo_nm').val(),
				co_saup_no: $('#co_saup_no1').val() + '-' + $('#co_saup_no2').val() + '-' + $('#co_saup_no3').val(),
				co_co_no: $('#co_co_no1').val() + '-' + $('#co_co_no2').val(),
				co_zip: $('#zipcode1').val() + '-' + $('#zipcode2').val(),
				co_addr: $('#addr1').val() + '  ' + $('#addr2').val(),
				co_up: $('#co_up').val(),
				co_jong: $('#co_jong').val(),
				co_tel: $('#co_tel1').val() + '-' + $('#co_tel2').val() + '-' + $('#co_tel3').val(),
				co_handphone: $('#co_handphone1').val() + '-' + $('#co_handphone2').val() + '-' + $('#co_handphone3').val(),
				co_fax: $('#co_fax1').val() + '-' + $('#co_fax2').val() + '-' + $('#co_fax3').val()
	        },
	        dataType: 'text',
	        success : function(result) {
	        	if (result == 1) {
					alert("등록되었습니다.");
				}
				else {
					alert("네트 워크 오류 입니다.");
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(xhr+"//"+status+"//"+error);
	        }
	    });
	    return false;
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
</script>