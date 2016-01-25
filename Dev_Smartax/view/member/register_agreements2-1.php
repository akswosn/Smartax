<!DOCTYPE html>

<head>
	<meta charset="utf-8">
	<title>Smartax Service</title>
	<link rel="shortcut icon" href="./images/main/smartax.png">
	<!-- <link rel="stylesheet" href="./css/register_agreements2-1.css"> -->
	
	<script type="text/javascript">
		$(function(){
			//다음페이지로 이동
			$('#form_excute').click(function(){
				document.frm1.submit();
			});
			//폼 초기화
			$('#form_cancel').click(function(){
				document.frm1.reset();
			});
		});
		//기타 금액 계산
		function totalCost(){
			var co_expense_deposit = $('#co_expense_deposit').val()*1;
			var co_expense_m_rent = $('#co_expense_m_rent').val()*1;
			var co_expense_elect = $('#co_expense_elect').val()*1;
			var co_expense_water = $('#co_expense_water').val()*1;
			var co_expense_man = $('#co_expense_man').val()*1;
			var co_expense_etc = $('#co_expense_etc').val()*1;

			var total = co_expense_deposit+co_expense_m_rent+co_expense_elect+co_expense_water+co_expense_man+co_expense_etc;

			$('#totCost').val(total);
		}
	
	</script>
</head>

<body>
	<div class="bdwrap">
		<div class="mid">
			<img src="./images/register/register_head.png" width="1100" height="95">

		</div>
	</div>
<!-- 상단 네이게이션, 사진바 종료 -->

<!-- 게시판 시작 -->


<form action="./proc/member/join/join_compinfo_detail_insert_proc.php" id="frm1" name="frm1" onsubmit="return false;" method="post">

		<div class="menuwrap">
			<div class="agr_img">
			<img class="regi_process_img" src="./images/register/register2.png" style="height: 96px;">
				<div class="agr_title">
				<img src="./images/register/agreement3.png">
				</div>
			</div>

			<div class="agrwrap1">
				<table class="agr_info_input_table">
					<tbody>
					<tr>						
						<td>
							자가/타가(임대)
						</td>
                        <td>
                        	<select id="co_lease" name="co_lease">
                        		<option value="y">자가</option>
                        		<option value="n">타가(임대)</option>
                        	</select>
                        	<!-- 
                        	<input type="text" style="width:340px;">
                        	 -->
						</td>
						<td >
							대지(㎡)
						</td>
						<td>
							<input id="co_area" name="co_area" type="number" style="width:200px;"> (㎡)
						</td>

					</tr>
					<tr>						
						<td>
							건물[지하](층)
						</td>
                        <td>
                        	<input id="co_building_downstairs" name="co_building_downstairs" type="number" style="width:200px;" max-length="3"> (층)
						</td>
						<td>
							지상(층)
						</td>
							
						<td>
							<input id="co_building_upstairs" name="co_building_upstairs" type="number" style="width:200px;" max-length="3"> (층)
						</td>

					</tr>
					<tr>						
						<td>
							건물[바닥면적]
						</td>
                        <td>
                        	<input type="text" id="co_building_t_area" name="co_building_t_area" style="width:200px;"> (㎡)
						</td>
						<td>
							면면적
						</td>
						<td>
							<input type="text" id="co_building_area" name="co_building_area" style="width:200px;"> (㎡)
						</td>

					</tr>
					<tr>						
						<td>
							객실수
						</td>
                        <td>
                        	<input  id="co_room_cnt" name="co_room_cnt" type="number" style="width:200px;"> 개
						</td>
						<td>
							의자수
						</td>
							
						<td>
							<input  id="co_chair_cnt" name="co_chair_cnt" type="number" style="width:200px;"> 개
						</td>

					</tr>
					<tr>						
						<td>
							테이블수
						</td>
                        <td>
                        	<input id="co_table_cnt" name="co_table_cnt"  type="text" style="width:200px;"> 개
						</td>						
						<td>
							주차장(유/무)
						</td>
                        <td>
                        	<select id="co_is_parking_area" name="co_is_parking_area">
                        		<option value="y">유</option>
                        		<option value="n">무</option>
                        	</select>
						</td>

					</tr>
					<tr>						
						<td>
							차량[화물]
						</td>	 	
						<td>
							<input id="co_vehicle_truck" name="co_vehicle_truck" type="number" style="width:200px;"> 대
						</td>
						<td>
							영업용차량
						</td>
                        <td>
                        	<input id="co_vehicle_car" name="co_vehicle_car" type="number" style="width:200px;"> 대
						</td>						
					</tr>
					<tr>						
						<td>
							종업원수
						</td>
						<td colspan="4">
							<input type="number" style="width:340px;" id="co_vehicle_business" name="co_vehicle_business" > 명
						</td>
					</tr>
					
				</tbody>
				
				</table>
				<div class="agr_title">	
				<div class="agr_img">
				<img src="./images/register/agreement4.png">
				</div>				
				</div>
				<table class="agr_info_input_table">	
				<tbody>	
					<tr>						
						<td>
							임차료[보증금]
						</td>
                        <td>
                        	<input id="co_expense_deposit" name="co_vehicle_business" type="number" style="width:200px;" onchange="javascript:totalCost();"> 원
						</td>
						<td>
							월세
						</td>
						<td>
							<input id="co_expense_m_rent" name="co_expense_m_rent" type="number" style="width:200px;"onchange="javascript:totalCost();"> 원
						</td>
					</tr>
					<tr>						
						<td>
							전기,가스비
						</td>
                        <td>
                        	<input id="co_expense_elect" name="co_expense_elect" type="number" style="width:200px;"onchange="javascript:totalCost();"> 원
						</td>
						<td>
							수도료
						</td>
						<td>
							<input id="co_expense_water" name="co_expense_water" type="number" style="width:200px;"onchange="javascript:totalCost();"> 원
						</td>

					</tr>
					<tr>						
						<td>
							인건비
						</td>
                        <td>
                        	<input id="co_expense_man" name="co_expense_man" type="number" style="width:200px;"onchange="javascript:totalCost();">  원
						</td>
						<td>
							기타(인터넷 등)
						</td>
						<td>
							<input id="co_expense_etc" name="co_expense_etc" type="number" style="width:200px;"onchange="javascript:totalCost();">  원
						</td>
					</tr>
					</tbody>
				</table>
				
				<br/>
				<div class="form-box-div">
					<label for="totCost"> &nbsp; 월기본경비계 &nbsp; </label><input type="number" id="totCost" name="totCost"/> 원
				</div>
				
				<div class="regi_btn1" id="form_excute">등록 </div>
				<div class="regi_btn2" id="form_cancel">취소 </div>

			</div>
		</div>
</form>
 </body>

</html>
