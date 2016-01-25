$(document).ready(function() {
	
	console.log(opener.Printer_Val);
	console.log(opener.Printer_Val_BASIC);

	$("#io_tr_cd").text(opener.Printer_Val_BASIC.co_nm);
	$("#io_dt").text(opener.Printer_Val_BASIC.io_dt);
	$("#total_amt").text(opener.Printer_Val_BASIC.total_amt);

	$("#co_addr").text(opener.Printer_Val.co_addr);
	$("#co_ceo_nm").text(opener.Printer_Val.co_ceo_nm);
	$("#co_jong").text(opener.Printer_Val.co_jong);
	$("#co_nm").text(opener.Printer_Val.co_nm);
	$("#co_saup_no").text(opener.Printer_Val.co_saup_no);
	$("#co_up").text(opener.Printer_Val.co_up);
	
	
	var list = $("#item_list");
	var tmp = null;
	var tmp_val = null;
	for(var i=0;i<opener.Printer_Val_Output.length;i++)
	{
		tmp_val = opener.Printer_Val_Output[i];
		if(tmp_val.io_amt==0) continue;
		
		tmp = $('<tr></tr>');
		tmp.append($('<td>'+tmp_val.io_item_nm+'</td>'));
		tmp.append($('<td>'+tmp_val.io_item_danwi+'</td>'));
		tmp.append($('<td>'+tmp_val.io_su+'</td>'));
		tmp.append($('<td>'+tmp_val.io_dan+'</td>'));
		tmp.append($('<td>'+tmp_val.io_amt+'</td>'));
		tmp.append($('<td>'+tmp_val.io_rem+'</td>'));
		
		list.append(tmp);
	}
	
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
