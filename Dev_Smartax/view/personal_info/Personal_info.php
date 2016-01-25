<?php 
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBMemberWork.php");
	require_once("./class/SessionManager.php");
	
	$memWork = new DBMemberWork(true);
	try
	{
		//$_POST : [value], [type]
		//user정보
		$memWork->createWork(-1, false);
		$user_info = $memWork->selectUserInfo();
		$memWork->destoryWork();
	}
	catch (Exception $e)
	{
		$memWork->destoryWork();
		echo $e;
	}
	
	//생년 월일 구하기
	$birth = '';
	if(strLen($user_info[0]['user_jumin']) < 8){
		$birth = $user_info[0]['user_jumin'];
	}
	else {
		if(substr($user_info[0]['user_jumin'], 7, 1) == '1' 
				|| substr($user_info[0]['user_jumin'], 7, 1) == '2'){
			$birth = '19'.substr($user_info[0]['user_jumin'], 0, 2).'년 ';
		}
		else {
			$birth = '20'.substr($user_info[0]['user_jumin'], 0, 2).'년 ';
		}
		$birth = $birth.substr($user_info[0]['user_jumin'], 2, 2).'월 '.substr($user_info[0]['user_jumin'], 4, 2).'일';
	}
	
	
	//회사 정보
	$companyArray = $_SESSION[DBWork::companyArray];
	$co_id = $_SESSION[DBWork::companyKey];
	
	//서비스 호출 정보
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
	
	$profilePath = 'upload/member/profile/';
?>
<html>
<head>
	<meta charset="utf-8">
	<title >Smartax Service</title>
	<link rel="shortcut icon" href="images/main/smartax.png">
	<!-- <link rel="stylesheet" href="css/Personal_info.css"> -->
	<!-- 
	<link rel="stylesheet" href="css/jquery.mobile.structure-1.4.0.css">
	<script type="text/javascript" src="js/jquery.mobile-1.4.0.min.js"></script>
	 -->
	<script>
		$(function(){
			//회원 수정 폼 출력 이벤트
			$('#user_info_form_req').click(function(){
				$('#user_info_view').hide();
				$('#user_info_form').show();
			});

			$('#emailDomain').change(function(){
				$('#user_email2').val(this.value);
			});

			$('#btn_update_form').click(function(){

				if($('#user_name').val() == ''){
					alert('성명을 입력해 주세요');
					return;
				}
				if($('#user_phone1').val() == ''){
					alert('휴대폰 번호를 입력해 주세요');
					return;
				}
				if($('#user_phone2').val() == ''){
					alert('휴대폰 번호를 입력해 주세요');
					return;
				}
				if($('#user_phone3').val() == ''){
					alert('휴대폰 번호를 입력해 주세요');
					return;
				}
				if($('#user_tel1').val() == ''){
					alert('전화 번호를 입력해 주세요');
					return;
				}
				if($('#user_tel2').val() == ''){
					alert('전화 번호를 입력해 주세요');
					return;
				}
				if($('#user_tel3').val() == ''){
					alert('전화 번호를 입력해 주세요');
					return;
				}
				if($('#user_email1').val() == ''){
					alert('이메일을 입력해 주세요');
					return;
				}
				if($('#user_email2').val() == ''){
					alert('이메일을 입력해 주세요');
					return;
				}
				
				document.userFrm.submit();
			});

			$('#btn_cancel_form').click(function(){
				$('#user_info_view').show();
				$('#user_info_form').hide();
			});

			$('#co_nm').show(function(){
				var json = jQuery.parseJSON($('#co_nm').val());
				compChange(json);
			});
			$('#co_nm').change(function(){
				var json = jQuery.parseJSON($('#co_nm').val());
				var value =  $("#co_nm option").index($("#co_nm option:selected"));
				compChange(json);
				compChangeSession(value);
			});

			//이미지수정
			$('#btn_user_profile').click(function(){
				var w = 500;    //팝업창의 너비
				var h = 250;    //팝업창의 높이
				var LeftPosition=(screen.width-w)/2;
				var TopPosition=(screen.height-h)/2;
				window.open('./view/personal_info/Personal_info_popup.html'
						, ''
						,'scrollbars=no,toolbar=no,resizable=yes,width='+w+',height='+h+',left='+LeftPosition+',top='+TopPosition);
			});

			$('#btn_user_profile_del').click(function(){
				if($('#user_profile_img').attr('src') == 'images/Personal/noImage.gif'){
					alert('등록된 이미지가 없습니다.');
					return;
				}
				
				var r = confirm("이미지를 삭제하시겠습니까?");
				if (r == true) {
					document.delImgFrm.submit();
				} else {
					return false;
				}
			});

			$('#user_profile_img').show(function(){
				profileImgView('<?php echo $user_info[0]['user_profile_img'];?>');
			});

			//회사 수정
			$('#btn_comp_update').click(function(){
				parent.openApp('<?php echo $user_nm;?>','<?php echo $comp_name;?>','<?php echo $user_type;?>', 'Smartax.view.basic.CompanyInfo', '<?php echo DBWork::rootPath?>');
			});

			//문의게시판 상세조회
// 			$('.list_header').click(function(){
// 				console.log('11111');
// 				var index = $(".list_header").index(this);
// 				$('.list_contents').hide();
// 				$('.list_contents:eq('+index+')').show();
// 			});

			//문의게시판 조회~
			$('.qnalist').show(function(){
				var pageNum = $('#list_page').val();
				selectInquireBoard(pageNum);
			});

			$('#inquire_search').click(function(){
				$('#list_page').val('1');
				selectInquireBoard('1');
			});

			$('.QNA_write_btn').click(function(){
				$('.QNA1').show();
			});

			$('#inquire_write').click(function(){
				var title = $('#input_title').val();
				var contents = $('#input_contents').val();

				if(title == ''){
					alert('문의 제목을 입력해주세요');
					return;
				}

				if(contents == ''){
					alert('문의 내용을 입력해주세요');
					return;
				}
				contents = contents.replace(/\n/g, "<br>");
				$('#contents').val(contents);
				document.writeFrm.submit();
			})
		});
		
		//문의 계시판 로직
		function selectInquireBoard(pageNum){

			var yn = $('#search_inquire_yn').val();
			var search_user_id = $('#search_user_id').val();
			$.ajax({
				url:'./proc/member/inquireBoard/select_inquire_board_proc.php',
		        data : {pageNum : pageNum, inquire_yn : yn, user_id : search_user_id},
		        method : 'post',
		        success:function(data){
					var json = $.parseJSON(data);

					 if(json.CODE != '00'){
						alert(json.MSG);
					 }
					 else {
						if(pageNum == 1){
							$('.qnalist .list').remove();
						}
						 
						// 화면 구현
						if(pageNum == 1 && json.DATA == ''){
							$('.qnalist').append(jQuery(
		        					'<li class="none">문의하신 내용이 존재하지 않습니다.</li>'
		        			));
						}
						else if(pageNum != 1 && json.DATA == ''){
							$('.qnalist .li_more').remove();							
						}
						else {
							<? 
								if($_SESSION[DBWork::adminKey] == "9001"){
									echo "randerViewForAdmin(json.DATA)";
								}
								else {
									echo "randerView(json.DATA)";
								}
							?>
							
						}
					 }
				}
			});
		}

		function inquire_answer_write(id){
			var inquire_contents = $('#inquire_contents_'+id).val();
			inquire_contents = inquire_contents.replace(/\n/g, "<br>");
			if(inquire_contents == ''){
				alert('답변을 입력해주세요');
				return;
			}
			
			$.ajax({
				url:'./proc/member/inquireBoard/reply_inquire_board_proc.php',
		        data : {inquire_contents : inquire_contents, _id:id},
		        method : 'post',
		        success:function(data){
					var json = $.parseJSON(data);

					 if(json.CODE != '00'){
						alert(json.MSG);
					 }
					 else {
						location.href = './route.php?contents=011';
					 }
				}
			});
			
		}

		function randerViewForAdmin(param){
			$('.qnalist_search').show();
			
			var i = 0;
			$('.qnalist .li_more').remove();
			for(i = 0 ; i < param.length;i++){
				var li = '';
				var obj = param[i];
				li += '<li class="list">';	
				li += '	<span class="list_header" id="list_header_'+obj.ROWNUM+'">';
				li += '		<div class="title">';
				li += '			<span>'+obj.ROWNUM+'</span>';
				li += '			<span>[ '+obj.user_id+' ] '+obj.title+' </span>';
				li += '			<span>'+obj.reg_date+'</span>';
				if(obj.inquire_yn == 'y'){
					li += '			<span class="reply">처리완료</span>';
				}
				else {
					li += '			<span class="noreply">미처리</span>';
				}
				li += '		</div>';
				li += '	</span>';
				li += '	<div class="list_contents" id="list_contents_'+obj.ROWNUM+'">';
				li += '		<div class="words">';
				li += '			<span class="icon">[문의]</span>';
				li += '			'+obj.contents;
				li += '		</div>';
				if(obj.inquire_yn == 'y'){
					li += '		<div class="answer">';
					li += '			<textarea class="QNA_wrSpace" id="inquire_contents_'+obj._id+'" name="inquire_contents">'+obj.inquire_contents.replace("<br>", "\n")+'</textarea><br>';
					li += '			<div class="answer_write_btn" onclick="javascript:inquire_answer_write('+obj._id+');">답변 등록</div>';
					li += '		</div>';
				}
				else {
					li += '		<div class="answer">';
					li += '			<textarea class="QNA_wrSpace" id="inquire_contents_'+obj._id+'" name="inquire_contents"></textarea><br>';
					li += '			<div class="answer_write_btn" onclick="javascript:inquire_answer_write('+obj._id+');">답변 등록</div>';
					li += '		</div>';
				}
				li += '	</div>';
				li += '</li>';
				
				$('.qnalist').append(jQuery(li).on('click', '.list_header', function(){
					var index = $(".list_header").index(this);
					$('.list_contents').hide();
					$('.list_contents:eq('+index+')').show();
				}));
			}
			
			if(i == 5){
				var more = '<li class="li_more"><div class="more">더보기</div></li>';
				$('.qnalist').append(jQuery(more).on('click', '.more', function(){
					var pageNum = Number($('#list_page').val())+1;
					$('#list_page').val(pageNum);
					
					selectInquireBoard(pageNum);
				}));
			}
		}

		function randerView(param){
			var i = 0;
			$('.qnalist .li_more').remove();
			for(i = 0 ; i < param.length;i++){
				var li = '';
				var obj = param[i];
				li += '<li class="list">';	
				li += '	<span class="list_header" id="list_header_'+obj.ROWNUM+'">';
				li += '		<div class="title">';
				li += '			<span>'+obj.ROWNUM+'</span>';
				li += '			<span>'+obj.title+'</span>';
				li += '			<span>'+obj.reg_date+'</span>';
				if(obj.inquire_yn == 'y'){
					li += '			<span class="reply">처리완료</span>';
				}
				else {
					li += '			<span class="noreply">미처리</span>';
				}
				li += '		</div>';
				li += '	</span>';
				li += '	<div class="list_contents" id="list_contents_'+obj.ROWNUM+'">';
				li += '		<div class="words">';
				li += '			<span class="icon">[문의]</span>';
				li += '			'+obj.contents;
				li += '		</div>';
				if(obj.inquire_yn == 'y'){
					li += '		<div class="answer">';
					li += '			<span class="icon">[답변]</span>';
					li += '			' + obj.inquire_contents;
					li += '		</div>';
				}
				li += '	</div>';
				li += '</li>';
				
				$('.qnalist').append(jQuery(li).on('click', '.list_header', function(){
					var index = $(".list_header").index(this);
					$('.list_contents').hide();
					$('.list_contents:eq('+index+')').show();
				}));
			}
			
			if(i == 5){
				var more = '<li class="li_more"><div class="more">더보기</div></li>';
				$('.qnalist').append(jQuery(more).on('click', '.more', function(){
					var pageNum = Number($('#list_page').val())+1;
					$('#list_page').val(pageNum);
					
					selectInquireBoard(pageNum);
				}));
			}
		}

		//이미지 설정
		function profileImgView(fileName){
			if(fileName == '' || fileName == null ){
				$('#user_profile_img').attr('src', 'images/Personal/noImage.gif');
			}
			else {
				$('#user_profile_img').attr('src', '<?echo $profilePath; ?>'+fileName);
			}
		}

		
		function compChange(val){
			$('#comp_saup_no').html('&nbsp;'+val.co_saup_no);
			$('#comp_co_tel').html('&nbsp;'+val.co_tel);
			$('#comp_co_fax').html('&nbsp;'+val.co_fax);
			$('#comp_co_email').html('&nbsp;'+val.co_email);
			$('#comp_co_addr').html('&nbsp;'+val.co_addr);
		}
		
		function compChangeSession(value){
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
				}
			});
		}
		
	</script>
</head>

<body>

<!-- 상단 네이게이션, 사진바 종료 -->

<!-- Personal information 시작 -->
<!-- 이미지 삭제폼 -->
	<form id="delImgFrm" name="delImgFrm" action="./proc/member/user_profile_img_modify_proc.php" method="post">
		<input type="hidden" name="user_profile_img">
		<input type="hidden" name="isPopup" value="n">
	</form>

	<div class="P_info_bg"> <!-- Personal information 전체 배경 영역 -->
		<div class="menuwrap">
			<div class="mid_for_personal">
				<img src="images/Personal/Pesonaltitle_header.png" width="1100" height="95">
			</div>
		</div>
		
			<div class="Person_bd">
				<div class="Person_info_1_bg">
					<div class="Person_info_1">
					<span class="p_info_title"></span><span class="p_info_title">&nbsp;개인정보 현황</span> <span id="user_info_form_req" class="p_info_revise_btn">수정하기</span>
					</div>
					<div class="Person_info_1_pic">
						<img id="user_profile_img" src="images/Personal/noImage.gif" width="150" height="150" alt="">
						<div id="btn_user_profile"class="Person_info_1_pic_revise_btn1">수정</div><div class="Person_info_1_pic_delete_btn2" id="btn_user_profile_del">삭제</div>
					</div>
					<div class="Person_info_1_con1" id="user_info_view">
						<table class="Person_info_1_tb">
							<tr>
								<td>성명</td>
								<td><a>&nbsp;<?echo $user_info[0]['user_name'] ;?></a></td>
							</tr>
							<tr>
								<td>생년월일</a></td>
								<td><a>&nbsp;<?echo $birth; ?></a></td>
							</tr>
							<tr>
								<td>휴대폰 번호</td>
								<td><a>&nbsp;<?echo $user_info[0]['user_phone'] ;?></a></td>
							</tr>
							<tr>
								<td>전화번호</td>
								<td><a>&nbsp;<?echo $user_info[0]['user_tel'] ;?></a></td>
							</tr>
							<tr>
								<td>E-mail</td>
								<td><a>&nbsp;<?echo $user_info[0]['user_email'] ;?></a></td>
							</tr>							
							<tr>
								<td>주소</td>
								<td><a>&nbsp;<?echo $user_info[0]['user_addr'] ;?></a></td>
							</tr>
						</table>
					</div>
					<!-- 회원 수정 화면 -->
					<?php 
						//휴대폰 분리 $user_info[0]['user_phone']
						$phone = explode ('-' , $user_info[0]['user_phone']);
						$phone1 = $phone[0];
						$phone2 = $phone[1];
						$phone3 = $phone[2];
						
						$tel = explode('-' , $user_info[0]['user_tel']);
						$tel1 = $tel[0];
						$tel2 = $tel[1];
						$tel3 = $tel[2];
						
						$email = explode('@', $user_info[0]['user_email']);
						$user_email1 = $email[0];
						$user_email2 = $email[1];
					?>
					<div class="Person_info_1_con1" id="user_info_form" style="display: none;">
						<form name="userFrm" id="userFrm" action="./proc/member/modify_user_info.php" method="post">
							<table class="Person_info_1_tb">
								<colgroup>
									<col style="width: 20%">
									<col style="width: 60%">
									<col style="width: 20%">
								</colgroup>
								<tr>
									<td>성명</td>
									<td>
										<div class="block-nor-divide">
											<div>
												<input class="common_input_1" type="text"  id="user_name" name="user_name" value="<?echo $user_info[0]['user_name'] ;?>">
											</div>
										</div>
									</td>
									<td rowspan="5" class="block-bg-white">
										<div class="per_btn1" id="btn_update_form">저장 </div>
										<div class="per_btn2" id="btn_cancel_form">취소</div>
									</td>
								</tr>
								<tr>
									<td>휴대폰 번호</td>
									<td>
										<div class="block-3-divide">
											<div>
												<input class="common_input_1" type="text"  id="user_phone1" name="user_phone1" maxlength="3" value="<?echo $phone1;?>">
											</div>
											<div class="divider">-</div>
											<div>
												<input class="common_input_1" type="text"  id="user_phone2" name="user_phone2" maxlength="4" value="<?echo $phone2;?>">  
											</div>
											<div class="divider">-</div>
											<div>
												<input class="common_input_1" type="text"  id="user_phone3" name="user_phone3" maxlength="4"value="<?echo $phone3;?>">
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>전화번호</td>
									<td>
										<div class="block-3-divide">
											<div>
												<input class="common_input_1" type="text"  id="user_tel1" name="user_tel1" maxlength="3" value="<?echo $tel1;?>">
											</div>
											<div class="divider">-</div>
											<div>
												<input class="common_input_1" type="text"  id="user_tel2" name="user_tel2" maxlength="4" value="<?echo $tel2;?>">  
											</div>
											<div class="divider">-</div>
											<div>
												<input class="common_input_1" type="text"  id="user_tel3" name="user_tel3" maxlength="4" value="<?echo $tel3;?>">
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>E-mail</td>
									<td>
										<div class="block-3-divide">
											<div>
												<input class="common_input_1" type="text"  id="user_email1" name="user_email1" value="<?echo $user_email1;?>">
											</div>
											<div class="divider">@</div>
											<div>
												<input class="common_input_1" type="text"  id="user_email2" name="user_email2" value="<?echo $user_email2;?>">  
											</div>
											<div class="divider">&nbsp;</div>
											<div>
												<select id="emailDomain" class="common_select_1">
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
											</div>
										</div>
									</td>
								</tr>							
								<tr>
									<td>주소</td>
									<td>
									<div class="block-nor-divide">
											<div>
												<input class="common_input_1" type="text"  id="user_addr" name="user_addr" value="<?echo $user_info[0]['user_addr'] ;?>">
											</div>
										</div>
									</td>
								</tr>
							</table>
						</form>
					</div>
					<div class="Person_info_1_con2">
						<div class="Person_info_1_con2_lv">회원등급</div>
						<div class="Person_info_1_con2_lv"><img src="images/Personal/lv3.png" width="150" height="150"></div>
					</div>
				</div>
				
				<div class="Person_info_2_bg">
					<div class="Person_info_2">
						<span class="p_info_title"></span>
						<span class="p_info_title">&nbsp;회사정보</span>
						<span class="p_info_revise_btn" id="btn_comp_update">수정하기</span>
					</div>
					<div class="Person_info_2_con1">
						
						<table class="Person_info_2_tb">
							<tr>
								<td>회사명</td>
								<td><a>&nbsp;
											<select id="co_nm" name="co_nm" style="width: 80%">
												<?
												foreach ($companyArray as $idx => $obj) 
				        						{
				        							if($co_id == $obj["co_id"]){
				        						?>
				        							<option value='<? echo json_encode($obj);?>' selected="selected"><?php echo $obj["co_nm"];?></option>
				        						<?
				        							}
				        							else {
				        						?>
				        							<option value='<? echo json_encode($obj);?>'><?php echo $obj["co_nm"];?></option>
				        						<?
				        							}
				        						}
												?>
											</select>
								</a></td>
							</tr>
							<tr>
								<td>사업자번호</a></td>
								<td><a id="comp_saup_no"></a></td>
							</tr>
							<tr>
								<td>전화번호</td>
								<td><a id="comp_co_tel"></a></td>
							</tr>
							<tr>
								<td>Fax번호</td>
								<td><a id="comp_co_fax"></a></td>
							</tr>
							<tr>
								<td>E-mail</td>
								<td><a id="comp_co_email"></a></td>
							</tr>							
							<tr>
								<td>회사주소</td>
								<td><a id="comp_co_addr"></a></td>
							</tr>
						</table>
					</div>					
				</div>
				
				<!--  기능 미구현 -->
				<div class="Person_info_2_bg">
					<div class="Person_info_2">
						<span class="p_info_title"></span><span class="p_info_title">&nbsp;납부할 세액</span>
					</div>
					<div class="Person_info_2_con2">
						<select class="kisu">
							<option>2015 / 1기</option>
							<option>2015 / 2기</option>
							<option>2016 / 1기</option>
							<option>2016 / 2기</option>
						</select>
						<span class="p_info_print_btn">출력하기</span>
						<table>
							<tr>
								<td>관할세무서</td>
								<td><a>&nbsp;가산 세무서</a></td>
							</tr>
							<tr>
								<td>부가가치세</a></td>
								<td><a>&nbsp;2,100,000</a></td>
							</tr>
							<tr>
								<td>교육세</td>
								<td><a>&nbsp;30,000</a></td>
							</tr>
							<tr>
								<td>농어촌특별세</td>
								<td><a>&nbsp;5,000</a></td>
							</tr>
							<tr>
								<td><strong>Total</strong></td>
								<td><strong><a>2,135,000</a>원</strong></td>
							</tr>
						</table>
					</div>	
				</div>
				<!--  기능 미구현 -->
				
				<div class="Person_info_3_bg">
					<div class="Person_info_3">
						<span class="p_info_title"></span><span class="p_info_title">&nbsp;1:1 문의현황</span>
					</div>

					<div class="QNA_wr">
						<br>
						<p class="QNA_hdtext"><strong>[1:1문의 안내]</strong><br>
						&emsp; 고객님께서 궁금하신 사항을 FAQ에서 찾지 못하셨을 경우 이용해주세요.<br>
						&emsp; 1:1 문의에 등록된 내용은 본인만 확인 할 수 있습니다.<br>
						&emsp; 임시점검 및 휴무 시간에는 답변이 늦어질 수 있으니 양해 부탁드립니다.
						</p><br>
					</div>
				
					<div class="QNA_list_contents">
						<div class="qnalist_search">
							<label for="search_inquire_yn">처리상태 </label> 
							<select name="search_inquire_yn" id="search_inquire_yn">
								<option value="n" selected="selected">미처리</option>
								<option value="y">답변완료</option>
							</select>
							&nbsp;&nbsp;&nbsp;
							<label for="search_inquire_yn">검색 아이디 </label> 
							<input type="text" id="search_user_id" name="search_user_id">
							<button class="qna_search_btn" id="inquire_search">검색</button>
						</div>
						<!-- 리스트 -->			
						<input type="hidden" id="list_page" name="list_page" value="1">		
						<ul class="qnalist">
							<li class="header">
								<div class="text">개인 문의 현황</div>
							</li>
						</ul>
						<div class="QNA_list_footer">
							<div class="QNA_write_btn">글쓰기</div>
						</div>
						<div class="QNA1">
							<form action="./proc/member/inquireBoard/insert_inquire_board_proc.php" method="post"id="writeFrm" name="writeFrm">
								<div class="text_div_title bg_gray_style">개인 문의 등록</div>
								<div class="QNA_input">
								<div class="Qt_title">	&emsp; 제목 &emsp; &emsp; <input class="input_1" id="input_title" name="title" type="text">
								</div>
								<div class="neyong"> &emsp; 내용 &emsp; &emsp;</div> <textarea class="QNA_wrSpace" id="input_contents"name="input_contents"></textarea><br>
								<input class="input_1" id="contents" name="contents" type="hidden">
								<div class="QNA_entrbtn1" id="inquire_write">문의등록</div>
							</form>
							</div>
						</div>
					</div>
		</div>
	</div>
<?php
if($_SESSION['isUpdate'] == 'y')
{
	unset($_SESSION['isUpdate']);
?>
	<script>
		alert('회원 정보가 성공적으로 변경 되었습니다.');
	</script>
<?php 
}
else if($_SESSION['isUpdate'] == 'n')
{
	unset($_SESSION['isUpdate']);
?>
	<script>
		alert('회원 정보 변경중 오류가 발생하였습니다.');
	</script>
<?	
}
?>
 </body>
</html>