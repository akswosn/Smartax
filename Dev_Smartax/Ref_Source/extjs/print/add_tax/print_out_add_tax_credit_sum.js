$(document).ready(function() {
	console.log(opener.Global.temp);
	
	var page1 = opener.Global.temp.page1;
	
	//top_info.co_nm
	//top_info.daepyo_nm
	//top_info.co_no
	//top_info.address
	
	//top_info.from_yyyy
	//top_info.from_mouth
	//top_info.from_day
	//top_info.to_yyyy
	//top_info.to_mouth
	//top_info.to_day
	
	//값 세팅
	$('.title_yyyy').text(page1.top_info.yyyy);
	$('.title_gi').text(page1.top_info.gi);
	
	$('#co_saup_no1').text(page1.top_info.co_no.split('-')[0]);
	$('#co_saup_no2').text(page1.top_info.co_no.split('-')[1]);
	$('#co_saup_no3').text(page1.top_info.co_no.split('-')[2]);
	
	$("#co_nm").text(page1.top_info.co_nm);
	$("#co_ceo_nm").text(page1.top_info.daepyo_nm);
	$("#co_addr").text(page1.top_info.co_addr);
	
	
	for(var i=1;i<6;i++)
	{
		$('#val'+i+'_1').text(page1.values['val'+i+'_1']);
		$('#val'+i+'_2').text(page1.values['val'+i+'_2']);
		$('#val'+i+'_3').text(page1.values['val'+i+'_3']);
	}
	
});


