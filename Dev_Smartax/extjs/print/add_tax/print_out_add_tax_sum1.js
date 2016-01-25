$(document).ready(function() {
	
	//값 초기화
	$('.col_val').html('&nbsp;');

	var data = opener.Global.temp;
	
	//타이틀
	$("#yyyy").text(data.info.yyyy);
	$("#gi").text(data.info.gi);

	//상단 정보
	$("#co_num").text(data.info.co_num);
	$("#co_nm").text(data.info.co_nm);
	$("#co_deapyo").text(data.info.co_deapyo);
	$("#co_address").text(data.info.co_address);
	
	$("#s_from_yyyy").text(data.info.s_from_yyyy);
	$("#s_from_mm").text(data.info.s_from_mm);
	$("#s_from_dd").text(data.info.s_from_dd);
	$("#s_to_yyyy").text(data.info.s_to_yyyy);
	$("#s_to_mm").text(data.info.s_to_mm);
	$("#s_to_dd").text(data.info.s_to_dd);
	
	$("#reg_yyyy").text(data.info.reg_yyyy);
	$("#reg_mm").text(data.info.reg_mm);
	$("#reg_dd").text(data.info.reg_dd);
	
	//합계
	$("#sum1").text(data.sum.sum_customer);
	$("#sum2").text(data.sum.sum_cnt);
	
	spiltNumber('sum3',data.sum.sum_price);
	spiltNumber('sum4',data.sum.sum_tax);
	
	
	//전자세금서 발급분
	$("#val1_1").text(data.y.sum.custumer_cnt);
	$("#val1_2").text(data.y.sum.cnt);
	
	spiltNumber('val1_3',data.y.sum.atax_supply_price);
	spiltNumber('val1_4',data.y.sum.atax_tax);
	
	$("#val3_1").text(data.y.sum.custumer_cnt);
	$("#val3_2").text(data.y.sum.cnt);
	
	spiltNumber('val3_3',data.y.sum.atax_supply_price);
	spiltNumber('val3_4',data.y.sum.atax_tax);
	
	
	//비 - 전자세금서 발급분
	$("#val4_1").text(data.n.sum.custumer_cnt);
	$("#val4_2").text(data.n.sum.cnt);
	
	spiltNumber('val4_3',data.n.sum.atax_supply_price);
	spiltNumber('val4_4',data.n.sum.atax_tax);
	
	$("#val6_1").text(data.n.sum.custumer_cnt);
	$("#val6_2").text(data.n.sum.cnt);
	
	spiltNumber('val6_3',data.n.sum.atax_supply_price);
	spiltNumber('val6_4',data.n.sum.atax_tax);
    
	//과세기간 종료일 다음달 15일까지 전송된 전자세금계산서..
	$("#sum_amt1_no").text('1');
	
	$("#sum_amt1_co_no").text(data.info.co_num);
	$("#sum_amt1_1").text(data.info.co_nm);
	
	$("#sum_amt1_2").text(data.sum.sum_cnt);
	
	spiltNumber('sum_amt1_3',data.sum.sum_price);
	spiltNumber('sum_amt1_4',data.sum.sum_tax);
});

function spiltNumber(id,price)
{
	price = price.toString();
	console.log(price);
	var idx = 0, j = 1;
	for(var i=price.length;i>0;i-=3)
	{
		if((i-3)<0) idx =0;
		else idx = i-3;
		console.log(j+' --> '+price.substring(idx,i));
		$('#'+id+'_'+j).text(price.substring(idx,i));
		j++;
	}
}
