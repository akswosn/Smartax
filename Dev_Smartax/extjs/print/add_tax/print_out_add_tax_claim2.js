$(document).ready(function() {
	console.log(opener.Global.temp);
	var page1 = opener.Global.temp.page1;
	var page2 = opener.Global.temp.page2;
	
	// @@@@@@@ 부가세 신고서
	//page1 
	//## 0. 상단 타이틀 [ 1 : 예정, 2 :확정, 3 : 기한후과세표준,  4: 영세율 등 조기환급 ]
	//title.key
	$('#title'+page1.title.key).text('v');
	
	//## 1. 상단 기본 정보표
	//# 신고 기한 -  년, 기, 월 , 일[From - to]  
	//top_info.yyyy
	//top_info.gi
	//top_info.from_mouth
	//top_info.from_day
	//top_info.to_mouth
	//top_info.to_day
	$("#yyyy").text(page1.top_info.yyyy);
	$("#gi").text(page1.top_info.gi);
	$("#from_mouth").text(page1.top_info.from_mouth);
	$("#from_day").text(page1.top_info.from_day);
	$("#to_mouth").text(page1.top_info.from_mouth);
	$("#to_day").text(page1.top_info.to_day);
	
	//# 사업자 정보 -  상호, 성명, 사업자번호, 주민(법인)등록 번호, 전화번호[사업장, 주소지, 휴대전화 ], 사업장 주소, 전자우편 주소
	//@@있음  - 상호, 성명, 전화번호, 주소지 전화번호,  
	//@@없음  - 사업자번호, 주민등록번호[사업자번호], 
	
	//top_info.co_nm
	//top_info.daepyo_nm
	//top_info.co_no
	//top_info.co_reg_no
	//top_info.tel.co
	//top_info.tel.home
	//top_info.tel.phone
	//top_info.address
	//top_info.email
	$("#co_nm").text(page1.top_info.co_nm);
	$("#daepyo_nm").text(page1.top_info.daepyo_nm);
	
	var idx = 0, num = page1.top_info.co_no, tmp = null;
	$('.co_no').each(function(){
		tmp = num.substr(idx,1);
		if(tmp =='-')
		{
			idx++;
			tmp = num.substr(idx,1);
		}
		$(this).text(tmp);
		idx++;
	});
	
	$("#co_reg_no").text(page1.top_info.co_reg_no);
	
	if(page1.top_info.tel_co) $("#tel_co").text(page1.top_info.tel_co);
	else $("#tel_co").html('&nbsp;');
	
	if(page1.top_info.tel_home) $("#tel_home").text(page1.top_info.tel_home);
	else $("#tel_home").html('&nbsp;');
	
	if(page1.top_info.tel_phone) $("#tel_phone").text(page1.top_info.tel_phone);
	else $("#tel_phone").html('&nbsp;');
	
	$("#address").text(page1.top_info.address);
	$("#email").text(page1.top_info.email);
	
	//# 신고 내용 1 - 1~25 [tax1, price1...] + sum1, sum2 ---> 완료 
	for(var i=1; i<=25; i++)
	{
		$("#price"+i).text(page1.claim_amt['price'+i]);
		$("#tax"+i).text(page1.claim_amt['tax'+i]);
	}
	
	$("#sum1").text(page1.claim_amt.sum1);
	$("#sum2").text(page1.claim_amt.sum2);
	
	//#국세 환급금 계좌 신고 - 거래 은행 , 지점, 계좌번호
	//bottom_info.bank_nm
	//bottom_info.bank_branch
	//bottom_info.bank_num
	
	$("#bank_nm").text(page1.bottom_info.bank_nm);
	$("#bank_branch").text(page1.bottom_info.bank_branch);
	$("#bank_num").text(page1.bottom_info.bank_num);
	
	//#폐업 신고 - 폐업일 , 폐업 사유
	$("#close_date").text(page1.bottom_info.close_date);
	$("#close_reason").text(page1.bottom_info.close_reason);
	
	//#과세 표준 명세 - 업태1~4, 종목 1-4 , 업종코드 1-4, 금액 1-4
	//bottom_info.uptea1~4
	//bottom_info.jong1~4
	//bottom_info.up_code1~4
	//bottom_info.amt1~4
	
	$("#uptea1").text(page1.bottom_info.uptea1);
	$("#jong1").text(page1.bottom_info.jong1);
	
	var idx = 0, num = page1.bottom_info.up_code1, tmp = null;
	$('.up_code1').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#amt1").text(page1.bottom_info.amt1);
	
	$("#uptea2").text(page1.bottom_info.uptea2);
	$("#jong2").text(page1.bottom_info.jong2);
	
	var idx = 0, num = page1.bottom_info.up_code2, tmp = null;
	$('.up_code2').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#amt2").text(page1.bottom_info.amt2);
	
	//71
	$("#uptea3").text(page1.bottom_info.uptea3);
	$("#jong3").text(page1.bottom_info.jong3);
	
	var idx = 0, num = page1.bottom_info.up_code3, tmp = null;
	$('.up_code3').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#amt3").text(page1.bottom_info.amt3);
	
	$("#jong4").text(page1.bottom_info.jong4);
	
	var idx = 0, num = page1.bottom_info.up_code4, tmp = null;
	$('.up_code4').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#amt4").text(page1.bottom_info.amt4);
	$("#amt_sum").text(page1.bottom_info.amt_sum);
	
	//#신고 날짜
	//bottom_info.claim_yyyy = 
	//bottom_info.claim_mm
	//bottom_info.claim_dd
	//bottom_info.claim_obj - 신고인
	
	$("#claim_yyyy").text(page1.bottom_info.claim_yyyy);
	$("#claim_mm").text(page1.bottom_info.claim_mm);
	$("#claim_dd").text(page1.bottom_info.claim_dd);
	$("#claim_obj").text(page1.bottom_info.claim_obj);
	
	//#세무대리인 , 세무서
	//bottom_info.tax_claim_office
	$("#tax_claim_office").text(page1.bottom_info.tax_claim_office);
	
	
	//뒷면 - page2
	var idx = 0, num = page1.top_info.co_no, tmp = null;
	$('.bizno-val').each(function(){
		tmp = num.substr(idx,1);
		if(tmp =='-')
		{
			idx++;
			tmp = num.substr(idx,1);
		}
		$(this).text(tmp);
		idx++;
	});
	
	//# 신고 내용 1 - 31~68 [tax1, price1...] 
	for(var i=31; i<=77; i++)
	{
		$("#price"+i).text(page2.claim_amt['price'+i]);
		$("#tax"+i).text(page2.claim_amt['tax'+i]);
	}
	
	//# 면세 사업 수입 금액 -  업태1~3, 종목 1-3 , 업종코드 1-3, 금액 1-3
	//tax_free_info.uptea1~3
	//tax_free_info.jong1~3
	//tax_free_info.up_code1~3
	//tax_free_info.amt1~3
	
	//78
	$("#val78_uptea").text(page2.tax_free_info.uptea1);
	$("#val78_jong").text(page2.tax_free_info.jong1);
	
	var idx = 0, num = page2.tax_free_info.up_code1, tmp = null;
	$('.val78_up_code').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#val78_amt").text(page2.tax_free_info.amt1);
	
	//79
	$("#val79_uptea").text(page2.tax_free_info.uptea2);
	$("#val79_jong").text(page2.tax_free_info.jong2);
	
	var idx = 0, num = page2.tax_free_info.up_code2, tmp = null;
	$('.val79_up_code').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#val79_amt").text(page2.tax_free_info.amt2);
	
	//80
	//$("#val71_uptea3").text(page2.tax_free_info.uptea3);
	$("#val80_jong").text(page2.tax_free_info.jong3);
	
	var idx = 0, num = page2.tax_free_info.up_code3, tmp = null;
	$('.val80_up_code').each(function(){
		tmp = num.substr(idx,1);
		$(this).text(tmp);
		idx++;
	});
	$("#val80_amt").text(page2.tax_free_info.amt3);
	
	//합계
	$("#price81").text(page2.tax_free_info.amt_sum);
	
	//# 계산서 발급 금액 , 계산서 수취 금액
	//claim.give_amt
	//claim.receive_amt
	$("#price82").text(page2.claim.give_amt);
	$("#price83").text(page2.claim.receive_amt);
	
});


