$(document).ready(function() {
	
	console.log(opener.Printer_Val);

	$("#io_tr_cd").text(opener.Printer_Val_BASIC.io_tr_cd+' 貴下.');
	$("#io_dt").text(opener.Printer_Val_BASIC.io_dt);
	$("#total_amt").text('\\'+ opener.Printer_Val_BASIC.total_amt);

	$("#co_addr").text(opener.Printer_Val.co_addr);
	$("#co_ceo_nm").text(opener.Printer_Val.co_ceo_nm);
	$("#co_jung").text(opener.Printer_Val.co_jung);
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
		
		tmp = $('<tr align="center" style="font-size: 9pt;line-height: 12pt;"></tr>');
		tmp.append($('<td>'+tmp_val.io_item_nm+'</td>'));
		tmp.append($('<td>'+tmp_val.io_item_danwi+'</td>'));
		tmp.append($('<td>'+tmp_val.io_su+'</td>'));
		tmp.append($('<td>'+tmp_val.io_dan+'</td>'));
		tmp.append($('<td>'+tmp_val.io_amt+'</td>'));
		tmp.append($('<td>'+tmp_val.io_rem+'</td>'));
		
		list.append(tmp);
	}
	
	
});


