<?php 
	require_once("class/SessionManager.php");
	$sessionManager = new SessionManager();
	$userInfo = $sessionManager->getJoinUserInfoStep1();
	$userInfoForm = $sessionManager->getJoinUserInfoStep2();
	
// 	var_dump($userInfoForm);

	if(empty($userInfoForm['user_email1']) || empty($userInfoForm['user_email2'])){
		$view_email = '';
	}
	else {
		$view_email = $userInfoForm['user_email1'].'@'.$userInfoForm['user_email2'];
	}
	
	
	if(empty($userInfoForm['user_phone1']) || empty($userInfoForm['user_phone2']) || empty($userInfoForm['user_phone3'])){
		$view_email = '';
	}
	else {
		$view_email = $userInfoForm['user_phone1'].'-'.$userInfoForm['user_phone2'].'-'.$userInfoForm['user_phone3'];
	}
?>
<!DOCTYPE html>

<head>
	<meta charset="utf-8">
	<title>Smartax Service</title>
	<link rel="shortcut icon" href="./images/main/smartax.png">
	<!-- <link rel="stylesheet" href="./css/register_agreements2.css"> -->
	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
	<script type="text/javascript">
		$(function(){

			//폼 초기화
			$('#form_cancel').click(function(){
				document.frm1.reset();
				$('#co_nm').val("<? echo $userInfo['co_nm'];?>");
				$('#co_saup_no').val("<? echo $userInfo['co_saup_no'];?>");
				$('#co_tel').val("<? echo $userInfo['co_tel'];?>");
			});

// 패턴 변경 이벤트
			$('#co_saup_no').change(function(){
				onChangeSaupNo($('#co_saup_no'), $('#co_saup_no').val());
			});
			
			$('#co_tel').change(function(){
				onChangeTelNo($('#co_tel'), $('#co_tel').val());
			});

			$('#co_handphone').change(function(){
				onChangeTelNo($('#co_handphone'), $('#co_handphone').val());
			});
			
			$('#co_fax').change(function(){
				onChangeTelNo($('#co_fax'), $('#co_fax').val());
			});
//co_co_no
			$('#co_co_no').change(function(){
				onChangeJuminNo($('#co_co_no'), $('#co_co_no').val());
			});

			//다음페이지 이동
			$('#form_excute').click(function(){
				//validation 체크
				if($('#co_nm').val().length == 0){
					alert('회사명을 입력해 주세요');
					return;
				}

				if($('#co_ceo_nm').val().length == 0){
					alert('대표자 명을 입력해 주세요');
					return;
				}
				
				if($('#co_saup_no').val().length == 0 || $('#co_saup_no').val().length != 12){
					alert('사업자 번호를 입력해 주세요');
					return;
				}

				if($('#co_tel').val().length == 0){
					alert('전화번호를 입력해 주세요');
					return;
				}

				if($('#co_handphone').val().length == 0){
					alert('휴대 전화번호를 입력해 주세요');
					return;
				}

				if($('#co_fax').val().length == 0){
					alert('팩스 번호를 입력해 주세요');
					return;
				}
				if($('#co_tel_juso').val().length == 0){
					alert('자택 주소를 입력해 주세요');
					return;
				}

				<?php 
					//
					if($userInfoForm['user_license_gubun'] == '2'){
						echo "if($('#co_co_no').val().length == 0){";
						echo "alert('법인등록번호를 입력해 주세요');"; 
						echo "return;";
						echo "}";
					}
				?>
				
				if($('#co_jong').val().length == 0){
					alert('종목를 입력해 주세요');
					return;
				}

				if($('#co_up').val().length == 0){
					alert('업태를 입력해 주세요');
					return;
				}

				if($('#co_up_code').val().length == 0){
					alert('업종코드를 입력해 주세요');
					return;
				}

				if($('#co_addr').val().length == 0){
					alert('사업장 소재지를 입력해 주세요');
					return;
				}

// 				if($('#co_tax_office').val().length == 0){
// 					alert('관할세무소를 입력해 주세요');
// 					return;
// 				}

// 				if($('#co_tax_office_code').val().length == 0){
// 					alert('관할세무소 코드를 입력해 주세요');
// 					return;
// 				}

// 				if($('#co_tax_office_acc').val().length == 0){
// 					alert('관할세무소 계좌번호를 입력해 주세요');
// 					return;
// 				}

				if($('#hometax_id').val().length == 0){
					alert('홈텍스 아이디를 입력해 주세요');
					return;
				}

				if($('#hometax_pwd').val().length == 0){
					alert('홈텍스 비밀번호를 입력해 주세요');
					return;
				}

				document.frm1.submit();
			});

			//주민번호 패턴 변경
			function onChangeJuminNo(obj, value){
				value = parent.Global.getJuminNumber(value);
				obj.val(value);
			}

			//사업자번호 패턴 변경
			function onChangeSaupNo(obj, value){
				value = parent.Global.getSaupjaNumber(value);
				obj.val(value);
			}

			//전화번호 패턴 변경
			function onChangeTelNo(obj, value){
				value = parent.Global.getPhoneNumber(value);
				obj.val(value);
			}

			//우편번호 검색
			$("#co_zip").click(function() {
				var width = 500; //팝업의 너비
				var height = 600; //팝업의 높이
	    		new daum.Postcode({
	    			width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
	    		    height: height,
			        oncomplete: function(data) {
			        	 // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

		                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
		                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
		                var fullAddr = ''; // 최종 주소 변수
		                var extraAddr = ''; // 조합형 주소 변수

		                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
		                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
		                    fullAddr = data.roadAddress;

		                } else { // 사용자가 지번 주소를 선택했을 경우(J)
		                    fullAddr = data.jibunAddress;
		                }

		                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
		                if(data.userSelectedType === 'R'){
		                    //법정동명이 있을 경우 추가한다.
		                    if(data.bname !== ''){
		                        extraAddr += data.bname;
		                    }
		                    // 건물명이 있을 경우 추가한다.
		                    if(data.buildingName !== ''){
		                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
		                    }
		                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
		                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
		                }

		                // 우편번호와 주소 정보를 해당 필드에 넣는다.
		                document.getElementById('co_zip').value = data.zonecode; //5자리 새우편번호 사용
		                document.getElementById('co_tel_juso').value = fullAddr;

		                // 커서를 상세주소 필드로 이동한다.
		                document.getElementById('co_tel_juso').focus();
			        }
			    }).open({
			    	left: (window.screen.width / 2) - (width / 2),
			        top: (window.screen.height / 2) - (height / 2)
			    });
			    
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


<!-- 게시판 시작 -->
	<form action="./proc/member/join/join_compinfo_insert_proc.php" id="frm1" name="frm1" onsubmit="return false;" method="post">
		<div class="menuwrap">
			<div class="agr_img" style="text-align: left;">
			<img class="regi_process_img" src="images/register/register2.png" style="height: 96px;">
				<div class="agr_title">
					<img src="images/register/agreement2.png">
					<br>
					&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 는 필수항목입니다.
				</div>
			</div>
			<div class="agrwrap1">
				<table class="agr_info_input_table">
					<tbody>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 회사명
						</td>
                        <td>
                        	<input id="co_nm" name="co_nm" type="text" style="width:200px;" value="">
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 대표자
						</td>
						<td>
							<input id="co_ceo_nm" name="co_ceo_nm" type="text" style="width:200px;">
						</td>

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 사업자번호
						</td>
                        <td>
                        	<input id="co_saup_no" name="co_saup_no"  type="text" style="width:200px;" value="<? echo $userInfo['co_saup_no'];?>">
						</td>
						<td></td>
						<td></td>
						<!-- 
						<td>
							주민등록번호
						</td>
							
						<td>
							<input type="text" style="width:128px;">-<input type="text" style="width:140px;">
						</td>
						 -->

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 전화번호
						</td>
                        <td>
                        	<input id="co_tel" name="co_tel"  type="text" style="width:200px;" value="<? echo $userInfo['co_tel'];?>" maxLength="11">
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> E-mail
						</td>
						<td>
							<input id="co_email" name="co_email" type="text" style="width:200px;" value="<? echo $view_email;?>">
						</td>

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 휴대폰
						</td>
                        <td>
                        	<input id="co_handphone" name="co_handphone" type="text" maxLength="11" style="width:200px;" value="<? echo $view_email; ?>">
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 팩스번호
						</td>
							
						<td>
							<input id="co_fax" name="co_fax"  type="text" style="width:200px;" maxLength="11">
						</td>

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 자택주소
						</td>
                        <td colspan="3">
                        	<input id="co_zip" name="co_zip"  type="text" style="width:200px;" placeholder="우편번호" readonly >
                        	&nbsp;
                        	<input id="co_tel_juso" name="co_tel_juso"  type="text" style="width:515px;"> 
						</td>						
					</tr>
					<tr>						
						<td>
							<?php 
								if($userInfoForm['user_license_gubun'] == '2'){
									echo "<span style='color: red;font-weight: bold;font-size: 14px;'>*</span>";
								}
							?>
							 법인등록번호
						</td>
                        <td>
                        	<input id="co_co_no" name="co_co_no" type="text" style="width:200px;"<?php 
								if($userInfoForm['user_license_gubun'] == '1'){
									echo "readonly='readonly'";
								}
							?>>
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 종목
						</td>
						 	
						<td>
							<input id="co_jong" name="co_jong" type="text" style="width:200px;">
						</td>
					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 업태
						</td>
                        <td>
                        	<input id="co_up" name="co_up" type="text" style="width:200px;">
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 업종코드
						</td>
						<td>
							<input id="co_up_code" name="co_up_code" type="text" style="width:200px;">
						</td>
					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 사업장소재지
						</td>
                        <td colspan="3">
                        	<input id="co_addr" name="co_addr" type="text" style="width:715px;">
						</td>

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 과세유형
						</td>
                        <td>
                        <!-- 
                        	<input id="tax_type" name="tax_type" type="text" style="width:200px;">
                         -->
                         	<select  id="tax_type" name="tax_type" style="width:200px;">
                         		<option value="0">일반</option>
                         		<option value="1">간이</option>
                         	</select>
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 사업자 유형
						</td>
						<td>
							<!-- 
							<input id="co_tax_type" name="co_tax_type" type="text" style="width:200px;">
							 -->
							
							<select  id="co_tax_type" name="co_tax_type" style="width:200px;">
                         		<option value="0">과세</option>
                         		<option value="1">면세</option>
                         		<option value="2">과세+면세</option>
                         	</select>
						</td>

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 홈택스ID
						</td>
                        <td>
                        	<input id="hometax_id" name="hometax_id" type="text" style="width:200px;">
						</td>
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 홈택스PW
						</td>
						<td>
							<input id="hometax_pwd" name="hometax_pwd" type="text" style="width:200px;">
						</td>

					</tr>
					<tr>						
						<td>
							<span style="color: red;font-weight: bold;font-size: 14px;">*</span> 공동사업여부
						</td>
                        <td colspan="3">
                        <!-- 
                        	<input id="co_joint" name="co_joint" type="text" style="width:715px;">
                         -->
                         	<select  id="co_joint" name="co_joint" style="width:200px;">
                         		<option value="y">예</option>
                         		<option value="n">아니오</option>
                         	</select>
						</td>
					</tr>		
					
					<tr>						
						<td>
							관할세무서
						</td>
                        <td>
                        	<input id="co_tax_office" name="co_tax_office" type="text" style="width:200px;">
						</td>
						<td>
							관할세무서 코드
						</td>
						<td>
							<input id="co_tax_office_code" name="co_tax_office_code" type="text" style="width:200px;">
						</td>

					</tr>
					<tr>						
						<td>
							관할세무서 계좌번호
						</td>
                        <td>
                        	<input id="co_tax_office_acc" name="co_tax_office_acc" type="text" style="width:200px;">
						</td>
						<td>
						<!-- 
							관할세무서 계좌번호
						 -->
						</td>
						<td>
						<!-- 
							<input type="text" style="width:200px;">
						 -->
						</td>

					</tr>
					<tr>						
						<td>
							부가세환급금 거래은행
						</td>
                        <td>
                        	<input id="co_bank" name="co_bank" type="text" style="width:200px;">
						</td>
						<td>
							부가세환급금 계좌번호
						</td>
						<td>
							<input id="co_bank_acc" name="co_bank_acc" type="text" style="width:200px;">
						</td>

					</tr>			
					</tbody>

				</table>
					<div class="regi_btn1" id="form_excute">등록 </div>
					<div class="regi_btn2" id="form_cancel">취소 </div>
			</div>
		</div>
	</form>
 </body>

</html>
