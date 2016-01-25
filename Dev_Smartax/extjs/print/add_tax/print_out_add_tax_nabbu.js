$(document).ready(function() {
	
	console.log(opener.Global.temp);
	var elect = opener.Global.temp.elect;
	
	//분류기호 
	$(".value1").text(elect.giho);
	
	//서코드
	$(".value2").text(elect.office_code);
	
	//납부년월
	$(".value3").text(elect.yymm);
	
	//결정구분
	$(".value4").text(elect.gubun);
	
	//세목
	$(".value5").text(elect.semok);
	
	//수입징수관서
	$(".value6").text(elect.office_nm);
	
	//계좌번호
	$(".value7").text(elect.bank_num);
	
	//성명
	$(".value8").text(elect.co_nm);
	
	//주민/사업자번호
	$(".value9").text(elect.co_num);
	
	//회계연도
	$(".value10").text(elect.acc_year);
	
	//주소
	$(".value11").text(elect.address);
	
	//# 세금 - 부가가치세, 교육세, 농어촌 특별세, 계,  납부기한 
	var tax_val = opener.Global.temp.tax_val;
	
	//귀속연도/기분
	$(".value12").text(tax_val.include_gi);
	
	//부가가치세
	$(".value14").text(tax_val.add_tax);
	
	//교육세
	$(".value15").text(tax_val.edu_tax);
	
	//농어촌 특별세
	$(".value16").text(tax_val.country_tax);
	
	//계
	$(".value17").text(tax_val.sum);
	
	//납부기한(년)
	$(".value18").text(tax_val.gihan_yyyy);
	
	//납부기한(월)
	$(".value19").text(tax_val.gihan_mm);
	
	//납부기한(일)
	$(".value20").text(tax_val.gihan_dd);
	
});


