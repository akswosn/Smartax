<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Smartax Service</title>
	<link rel="shortcut icon" href="./images/main/smartax.png">
	<!-- <link rel="stylesheet" href="./css/register_agree.css"> -->
	<script type="text/javascript">
		$(function(){

			//영업 코드 조회 ajax action 실행
			$('#saleCodeCheck').click(function(){
				 if(!$('#sale_code').val()){
					alert('영업코드를 입력해주세요.');
					return; 	
				 }			
		         $.ajax({
		             url:'./proc/member/join/join_salecode_select_proc.php',
		             data : {sale_code : $('#sale_code').val()},
		             method : 'post',
		             success:function(data){
						 var json = $.parseJSON(data);
// 						 console.log(json);
			             if(json.CODE == '00'){
			            	 var data = json.DATA[0]
			            	 var html = ' &nbsp; 회사이름 : '+data.co_nm+' <br/> &nbsp; 사업자번호 : '+data.co_saup_no+'<br/> &nbsp; 전화번호 : '+data.co_tel;
						     $('#result_comp').html(html);
				             
			                 $('#isSaleCodeCheck').val('true');
			             }

			             else {
			            	 $('#isSaleCodeCheck').val('false');
			            	 $('#result_comp').html(' &nbsp; 회사이름 ');
							alert('조회된 결과가 없습니다.');
							return;
				         }
		             }
		         })
		    });

		    //다음 페이지로 이동
			$('#excute').click(function(){
				if(!$('#isHometaxJoin').is(':checked')) {
					alert('홈텍스 가입후 홈텍스 가입 확인 체크해주세요.'); 
					return;
				}
				if($('#isSaleCodeCheck').val() != 'true') {
					alert('발급받은 영업코드 확인 후 이용 바랍니다.'); 
					return;	
				}
				window.location.href='./route.php?contents=002';
			});


			//엔터키 이벤트 추가(영업코드 조회 실행)
			$('#sale_code').keydown(function(e){
				if(e.keyCode == '13' ){
					$('#saleCodeCheck').trigger('click');
				}
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

<!-- 상단 네이게이션, 사진바 종료 -->
	<input type="hidden" id="isSaleCodeCheck" value="false">
		<div class="menuwrap">
			<div class="">
			<img class="regi_process_ex_img" src="images/register/process_ex.png" style="height: 578px;">
			</div>
			<div class="pc_bottom_loc">
				<div class="process_chk1">
				  <div class="pc_chk"> &emsp; <label for="isHometaxJoin"> 홈택스에 가입하셨습니까?</label> <input type="checkbox" id="isHometaxJoin"></div>
				  <div class="pc_chk"> &emsp; 홈택스 가입 메뉴얼 &emsp;&emsp;&emsp; <img src="images/register/ppt_img.png" style="height: 15px;" onclick="javascript:location.href='./upload/member/홈택스_가입절차.pptx'"></div>
				</div>
				<div class="process_chk2">
				  <div class="pc_chk">&emsp;영업코드를 발급 받으셨습니까? </div>
				  <div class="pc_chk">&emsp;발급받은 영업코드를 확인해 주십시오. </div>
				</div>
 				<div class="process_chk3">
				  <div class="pc_search">&emsp;<input class="search_box" type="text" id="sale_code" name="sale_code"><div class="s_btn"  id="saleCodeCheck">확인</div></div>
				  <div class="pc_search_box" id="result_comp">&emsp;회사이름</div>
				</div>
 
            </div>

			<div class="agrwrap">
		       <div class="next_btn" id="excute">다음</div>
			</div>
		</div>
 </body>

</html>
