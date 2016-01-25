<div class="content">
	<div class="content-title">
		<h2 class="content-title-inner">
			<span>포인트결제</span>
			<small>&nbsp;</small>
		</h2>	
	</div>
	<div class="content-inner">
		<ul class="tab-01">
			<li><a href="./route.php?contents=002">내정보</a></li>
			<li><a href="./route.php?contents=003&pg_inx=1">결제내역</a></li>
			<li><a href="./route.php?contents=004&pg_inx=1">포인트사용내역</a></li>
			<li class="on"><a href="./route.php?contents=005&pg_inx=1">포인트결제</a></li>
		</ul>
		<table class="form-table-01 mgT20">
			<caption>포인트결제</caption>
			<colgroup>
				<col style="width: 20%;">
				<col style="width: 80%;">
			</colgroup>
			<tbody>
				<tr>
					<th scope="row"><label for="point">사용가능 포인트</label></th>
					<td>
						<input type="text" id="point" name="point" style="width: 180px;" disabled="disabled">
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
								<label for="product_1">11,000원 (1100포인트)</label>
							</li>
							<li>
								<input type="radio" id="product_2" name="product">
								<label for="product_2">55,000원 (5500포인트)</label>
							</li>
							<li>
								<input type="radio" id="product_3" name="product">
								<label for="product_3">110,000원 (11000포인트)</label>
							</li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="mgT20 alignC">
			<button class="btn-img-blue-w160" type="submit">
				<img src="./img/member/btn_payment_01.png" alt="결제하기" />
			</button>
		</div>
	</div>
</div>