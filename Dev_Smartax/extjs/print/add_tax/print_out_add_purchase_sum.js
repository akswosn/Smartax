$(document).ready(function() {
	console.log(opener.Global.temp);
	var page1 = opener.Global.temp.page1;
	var page2 = opener.Global.temp.page2;
	console.log(page2.num);
	//페이지 세팅
	if(page2.num > 1)
	{
		//페이지 추가
		var oriItem = $('.content1');
		var container = $('body');
		for(var i=1;i<=page2.num;i++)
		{
			if(i==1)
			{
				$('.content1').eq(0).css('display','block');
			}
			else
			{
				cloneItem = oriItem.clone();
				cloneItem.css('display','block');
				container.eq(0).append(cloneItem);
			}
		}
	}
	
	for(var i=0;i<=page2.num;i++)
	{
		$('.page_num').eq(i).text(i+1);
	}
	
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
	$('.title_yyyy').text(page1.title.yyyy);
	$('.title_gi').text(page1.title.gi);
	
	$('.co_saup_no1').text(page1.top_info.co_no.split('-')[0]);
	$('.co_saup_no2').text(page1.top_info.co_no.split('-')[1]);
	$('.co_saup_no3').text(page1.top_info.co_no.split('-')[2]);
	
	$("#co_nm").text(page1.top_info.co_nm);
	$("#co_ceo_nm").text(page1.top_info.daepyo_nm);
	$("#co_addr").text(page1.top_info.co_addr);
	
	$("#from_yyyy").text(page1.top_info.from_yyyy);
	$("#from_mouth").text(page1.top_info.from_mouth);
	$("#from_day").text(page1.top_info.from_day);
	$("#to_yyyy").text(page1.top_info.to_yyyy);
	$("#to_mouth").text(page1.top_info.to_mouth);
	$("#to_day").text(page1.top_info.to_day);
	
	$("#yyyy").text(page1.top_info.yyyy);
	$("#mm").text(page1.top_info.mm);
	$("#dd").text(page1.top_info.dd);
	
	
	//2. 매출계산서 총합계 
	console.log(page1.sum_data);
	
	var setSplit = function(id,value,split_ltr){
		value = value+'';
		var tmp = value.split(split_ltr);
		var s_idx = 5-tmp.length+1;
		
		console.log()
		
		for(var i=0;i<tmp.length;i++)
		{
			$("#"+id+"_"+s_idx).text(tmp[i]);
			s_idx++;
		}
	};
	
	for(var i=1; i<=3; i++)
	{
		if(i>2)
		{
			setSplit('sum'+i,page1.sum_data['sum'+i],',');
			setSplit('val1_'+i,page1.sum_data['val1_'+i],',');
			setSplit('val2_'+i,page1.sum_data['val2_'+i],',');
			setSplit('val3_'+i,page1.sum_data['val3_'+i],',');
			setSplit('val4_'+i,page1.sum_data['val4_'+i],',');
			setSplit('val5_'+i,page1.sum_data['val5_'+i],',');
			setSplit('val6_'+i,page1.sum_data['val6_'+i],',');
		}
		else
		{
			$("#sum"+i).text(page1.sum_data['sum'+i]);
			$("#val1_"+i).text(page1.sum_data['val1_'+i]);
			$("#val2_"+i).text(page1.sum_data['val2_'+i]);
			$("#val3_"+i).text(page1.sum_data['val3_'+i]);
			$("#val4_"+i).text(page1.sum_data['val4_'+i]);
			$("#val5_"+i).text(page1.sum_data['val5_'+i]);
			$("#val6_"+i).text(page1.sum_data['val6_'+i]);
		}
	}
	
	//atax_customer_id: "901"atax_supply_price: 27000atax_tax: 2700cnt: 1tr_daepyo: ""tr_jong: ""tr_nm: "홍길동센차"tr_saup_no: ""tr_up: ""
	var setListVal = function(idx,obj){
		
		$('.list_num').eq(idx).text(idx+1);
		if(obj.tr_saup_no)
		{
			$('.list_co_saup_no1').eq(idx).text(obj.tr_saup_no.split('-')[0]);
			$('.list_co_saup_no2').eq(idx).text(obj.tr_saup_no.split('-')[1]);
			$('.list_co_saup_no3').eq(idx).text(obj.tr_saup_no.split('-')[2]);
		}
		else
		{
			$('.list_co_saup_no1').eq(idx).html('&nbsp;&nbsp;&nbsp;');
			$('.list_co_saup_no2').eq(idx).html('&nbsp;&nbsp;&nbsp;');
			$('.list_co_saup_no3').eq(idx).html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		}
		
		$('.list_co_nm').eq(idx).text(obj.tr_nm);
		$('.list_cnt').eq(idx).text(obj.cnt);
		
		//console.log(obj.atax_supply_price.toLocaleString());
		//console.log(obj.atax_tax.toLocaleString());
		
		var tmp = obj.atax_supply_price.toLocaleString().split(',');
		var s_idx = 5-tmp.length+1;
		for(var i=0;i<tmp.length;i++)
		{
			$(".atax_supply_price"+s_idx).eq(idx).text(tmp[i]);
			s_idx++;
		}
		
		tmp = obj.atax_tax.toLocaleString().split(',');
		s_idx = 5-tmp.length+1;
		for(var i=0;i<tmp.length;i++)
		{
			$(".atax_tax"+s_idx).eq(idx).text(tmp[i]);
			s_idx++;
		}
		
	};
	
	//리스트 값
	if(page2.tmp_list)
	{
		console.log(page2.tmp_list);
		
		for(var i=0;i<page2.tmp_list.length;i++)
		{
			setListVal(i,page2.tmp_list[i]);
		}
	}
});


