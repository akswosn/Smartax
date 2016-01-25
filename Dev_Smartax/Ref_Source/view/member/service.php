<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>서비스신청</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<ul class="tab-01">
			<li><a href="./route.php?contents=006">회사정보</a></li>
			<li><a href="./route.php?contents=007">회사등록</a></li>
			<li><a href="./route.php?contents=008">서비스정보</a></li>
			<li class="on"><a href="./route.php?contents=009">서비스신청</a></li>
		</ul>
		<form class="form-join" action="#" method="POST">
			<fieldset class="form-join-inner">
				<legend>서비스신청</legend>
				<table class="board-list-01 mgT20">
					<caption>서비스정보</caption>
					<colgroup>
						<col style="width: 25%;">
						<col style="width: 25%;">
						<col style="width: 25%;">
						<col style="width: 25%;">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">상품</th>
							<th scope="col">상태</th>
							<th scope="col">시작일</th>
							<th scope="col">종료일</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>회계</td>
							<td>사용중</td>
							<td>2014.01.01</td>
							<td>2014.12.31</td>
						</tr>
						<tr>
							<td>물류</td>
							<td>사용중</td>
							<td>2014.01.01</td>
							<td>2014.12.31</td>
						</tr>
						<tr>
							<td>부가세</td>
							<td>사용중</td>
							<td>2014.01.01</td>
							<td>2014.12.31</td>
						</tr>
					</tbody>
				</table>
				<table class="form-table-01 mgT20">
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
				</table>
				<table class="form-table-01 mgT20">
					<caption>상품</caption>
					<colgroup>
						<col style="width: 20%;">
						<col style="width: 80%;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">상품선택</th>
							<td class="pdT8 pdB8">
								<ul class="list-product-01">
									<li>
										<input type="radio" id="product_1" name="product" checked="checked">
										<label for="product_1">회계 1개월 (1000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_2" name="product">
										<label for="product_2">회계 6개월 (5000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_3" name="product">
										<label for="product_3">회계 12개월 (10000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_4" name="product">
										<label for="product_4">물류 1개월 (1000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_5" name="product">
										<label for="product_5">물류 6개월 (5000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_6" name="product">
										<label for="product_6">물류 12개월 (10000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_7" name="product">
										<label for="product_7">부가세 1개월 (1000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_8" name="product">
										<label for="product_8">부가세 6개월 (5000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_9" name="product">
										<label for="product_9">부가세 12개월 (10000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_10" name="product">
										<label for="product_10">통합 1개월 (3000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_11" name="product">
										<label for="product_11">통합 6개월 (15000포인트)</label>
									</li>
									<li>
										<input type="radio" id="product_12" name="product">
										<label for="product_12">통합 12개월 (30000포인트)</label>
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</fieldset>
			<div class="mgT20 alignC">
				<button class="btn-img-blue-w160" type="submit">
					<img src="./img/member/btn_apply_01.png" alt="신청하기">
				</button>
			</div>
		</form>
	</div>
</div>