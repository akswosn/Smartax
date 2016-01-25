<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>회사정보</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<ul class="tab-01">
			<li class="on"><a href="./route.php?contents=006">회사정보</a></li>
			<!-- <li><a href="./route.php?contents=007">회사등록</a></li>
			<li><a href="./route.php?contents=008">서비스정보</a></li>
			<li><a href="./route.php?contents=009">서비스신청</a></li> -->
		</ul>
		<form class="form-join" action="./proc/member/mycom_modify_proc.php" method="POST">
			<fieldset class="form-join-inner">
				<legend>회사정보</legend>
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
								<!-- <a href="./route.php?contents=007" class="btn-fixed-black-w60">회사등록</a> -->
							</td>
						</tr>
					</tbody>
				</table>
				<table class="form-table-01 mgT20">
					<caption>부가세 신고 필수항목</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 30%;">
						<col style="width: 20%;">
						<col style="width: 30%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row"><label for="co_ceo_nm">대표자</label></th>
							<td colspan="3"><input type="text" id="co_ceo_nm" name="co_ceo_nm" style="width: 180px;" title="대표자 입력"></td>
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
							<th scope="row"><label for="co_jong">종목</label></th>
							<td><input type="text" id="co_jong" name="co_jong" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 업종 코드 -->
						<tr>
							<th scope="row"><label for="co_up_code">업종 코드</label></th>
							<td colspan="3"><input type="text" id="co_up_code" name="co_up_code" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 업종 코드 -->
						<tr>
							<th class="row-large" scope="row"><label for="zipcode1">사업장 소재지</label></th>
							<td colspan="3">
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
							<!--  신규  : 주소지 전화번호 -->
							<th scope="row"><label for="co_tel_juso1">주소지 전화번호</label></th>
							<td>
								<input type="text" id="co_tel_juso1" name="co_tel1" style="width: 60px;" title="전화번호 국번 입력">
								<span>-</span>
								<input type="text" id="co_tel_juso2" name="co_tel2" style="width: 60px;" title="전화번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_tel_juso3" name="co_tel3" style="width: 60px;" title="전화번호 뒷자리 입력">
							</td>
							<!--  신규  : 주소지 전화번호 -->
						</tr>
						
						<tr>
							<th scope="row"><label for="co_handphone1">핸드폰</label></th>
							<td colspan="3">
								<input type="text" id="co_handphone1" name="co_handphone1" style="width: 60px;" title="핸드폰번호 앞자리 입력">
								<span>-</span>
								<input type="text" id="co_handphone2" name="co_handphone2" style="width: 60px;" title="핸드폰번호 중간자리 입력">
								<span>-</span>
								<input type="text" id="co_handphone3" name="co_handphone3" style="width: 60px;" title="핸드폰번호 뒷자리 입력">
							</td>
						</tr>
						
						<tr>
							<th scope="row"><label for="co_email">회사 전자우편주소</label></th>
							<td colspan="3"><input type="text" id="co_email" name="co_email" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 관할세무서 -->
						<tr>
							<th scope="row"><label for="co_tax_office">관할세무서</label></th>
							<td>
								<input type="text" id="co_tax_office" name="co_tax_office" style="width: 180px;" title="종목 입력">
							</td>
							<!--  신규  : 서코드 -->
							<th scope="row"><label for="co_tax_office_code">관할세무서 서코드</label></th>
							<td><input type="text" id="co_tax_office_code" name="co_tax_office_code" style="width: 180px;" title="종목 입력"></td>
							<!--  신규  : 서코드 -->
						</tr>
						<!--  신규  : 관할세무서 -->
						
						<!--  신규  : 관할세무서 계좌번호 -->
						<tr>
							<th scope="row"><label for="co_tax_office_acc">관할세무서 계좌번호</label></th>
							<td colspan="3"><input type="text" id="co_tax_office_acc" name="co_tax_office_acc" style="width: 180px;" title="종목 입력"></td>
						</tr>
						<!--  신규  : 관할세무서 계좌번호 -->
						
						<tr>
							<!--  신규  : 환급금 거래은행 -->
							<th scope="row"><label for="co_bank">부가세 환급금 거래은행</label></th>
							<td><input type="text" id="co_bank" name="co_bank" style="width: 180px;" title="종목 입력"></td>
							<!--  신규  : 환급금 거래은행 -->
							<!--  신규  : 환급금 지점 -->
							<th scope="row"><label for="co_bank_branch">부가세 환급금 지점</label></th>
							<td><input type="text" id="co_bank_branch" name="co_bank_branch" style="width: 180px;" title="종목 입력"></td>
							<!--  신규  : 환급금 지점 -->
						</tr>
						
						<!--  신규  : 환급금 계좌 -->
						<tr>
							<th scope="row"><label for="co_bank_acc">부가세 환급금 계좌번호</label></th>
							<td><input type="text" id="co_bank_acc" name="co_bank_acc" style="width: 180px;" title="종목 입력"></td>
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
				<button id="btn-modify" class="btn-img-blue-w160" type="submit">
					<img src="./img/member/btn_modify_01.png" alt="정보수정">
				</button>
			</div>
		</form>
	</div>
</div>
<script>
	//데이터 셋팅
	$.ajax({
        type: 'POST',
        url: './proc/member/mycom_data_proc.php',
        data: { co_id: $('#co_select').val() },
        dataType: 'json',
        success : function(result) {
        	console.log(result);
        	$('#co_nm').val(result.co_nm);
			$('#co_ceo_nm').val(result.co_ceo_nm);
			$('#co_saup_no1').val(result.co_saup_no.split('-')[0]);
			$('#co_saup_no2').val(result.co_saup_no.split('-')[1]);
			$('#co_saup_no3').val(result.co_saup_no.split('-')[2]);
			$('#co_co_no1').val(result.co_co_no.split('-')[0]);
			$('#co_co_no2').val(result.co_co_no.split('-')[1]);
			$('#zipcode1').val(result.co_zip.split('-')[0]);
			$('#zipcode2').val(result.co_zip.split('-')[1]);
			$('#addr1').val(result.co_addr.split('  ')[0]);
			$('#addr2').val(result.co_addr.split('  ')[1]);
			$('#co_up').val(result.co_up);
			$('#co_jong').val(result.co_jong);
			$('#co_tel1').val(result.co_tel.split('-')[0]);
			$('#co_tel2').val(result.co_tel.split('-')[1]);
			$('#co_tel3').val(result.co_tel.split('-')[2]);
			$('#co_handphone1').val(result.co_handphone.split('-')[0]);
			$('#co_handphone2').val(result.co_handphone.split('-')[1]);
			$('#co_handphone3').val(result.co_handphone.split('-')[2]);
			$('#co_fax1').val(result.co_fax.split('-')[0]);
			$('#co_fax2').val(result.co_fax.split('-')[1]);
			$('#co_fax3').val(result.co_fax.split('-')[2]);

			$('#co_up_code').val(result.co_up_code);
			$('#co_email').val(result.co_email);

			$('#co_tel_juso1').val(result.co_tel_juso.split('-')[0]);
			$('#co_tel_juso2').val(result.co_tel_juso.split('-')[1]);
			$('#co_tel_juso3').val(result.co_tel_juso.split('-')[2]);

			$('#co_tax_office').val(result.co_tax_office);
			$('#co_tax_office_code').val(result.co_tax_office_code);
			$('#co_tax_office_acc').val(result.co_tax_office_acc);
			$('#co_bank').val(result.co_bank);
			$('#co_bank_branch').val(result.co_bank_branch);
			$('#co_bank_acc').val(result.co_bank_acc);
			$('#co_nm').val(result.co_nm);
			
        },
        error: function(xhr, status, error) {
        	console.log(xhr+"//"+status+"//"+error);
        }
    });
    
    //정보수정
	$("#btn-modify").click(function() {
		$.ajax({
	        type: 'POST',
	        url: './proc/member/mycom_modify_proc.php',
	        data: {
	        	co_id: $('#co_select').val(),
				co_ceo_nm: $('#co_ceo_nm').val(),
				co_saup_no: $('#co_saup_no1').val() + '-' + $('#co_saup_no2').val() + '-' + $('#co_saup_no3').val(),
				co_co_no: $('#co_co_no1').val() + '-' + $('#co_co_no2').val(),
				co_zip: $('#zipcode1').val() + '-' + $('#zipcode2').val(),
				co_addr: $('#addr1').val() + '  ' + $('#addr2').val(),
				co_up: $('#co_up').val(),
				co_jong: $('#co_jong').val(),
				co_tel: $('#co_tel1').val() + '-' + $('#co_tel2').val() + '-' + $('#co_tel3').val(),
				co_handphone: $('#co_handphone1').val() + '-' + $('#co_handphone2').val() + '-' + $('#co_handphone3').val(),
				co_fax: $('#co_fax1').val() + '-' + $('#co_fax2').val() + '-' + $('#co_fax3').val(),
				//신규
				co_up_code: $('#co_up_code').val(),
				co_email: $('#co_email').val(),
				co_tel_juso: $('#co_tel_juso1').val() + '-' + $('#co_tel_juso2').val() + '-' + $('#co_tel_juso3').val(),
				co_tax_office: $('#co_tax_office').val(),
				co_tax_office_code: $('#co_tax_office_code').val(),
				co_tax_office_acc: $('#co_tax_office_acc').val(),
				co_bank: $('#co_bank').val(),
				co_bank_branch: $('#co_bank_branch').val(),
				co_bank_acc: $('#co_bank_acc').val(),
				co_nm : $('#co_nm').val(),
	        },
	        dataType: 'text',
	        success : function(result) {
		        console.log(result);
	        	if (result == 1) {
					alert("정보가 수정되었습니다.");
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