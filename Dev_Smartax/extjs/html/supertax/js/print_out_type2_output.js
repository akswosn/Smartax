$(document).ready(function() {
	
	console.log(opener.Printer_Val);
	console.log(opener.Printer_Val_BASIC);
	
	$(".io_tr_cd1").text(opener.Printer_Val.co_saup_no);
	$(".io_tr_cd2").text(opener.Printer_Val_BASIC.io_tr_cd);
	
	$(".total_amt").text('￦'+ opener.Printer_Val_BASIC.total_amt);
	
	$(".co_nm1").text(opener.Printer_Val.co_nm);
	$(".co_nm2").text(opener.Printer_Val_BASIC.co_nm);
	$(".co_ceo_nm1").text(opener.Printer_Val.co_ceo_nm);
	$(".co_ceo_nm2").text(opener.Printer_Val_BASIC.co_ceo_nm);
	
	$(".co_addr1").text(opener.Printer_Val.co_addr);
	$(".co_addr2").text(opener.Printer_Val_BASIC.co_addr);
	$(".co_up1").text(opener.Printer_Val.co_up);
	$(".co_up2").text(opener.Printer_Val_BASIC.co_up);
	
	$(".co_jung1").text(opener.Printer_Val.co_jung);
	$(".co_jung2").text(opener.Printer_Val_BASIC.co_jung);
	$(".co_saup_no1").text(opener.Printer_Val.co_saup_no);
	$(".co_saup_no2").text(opener.Printer_Val_BASIC.co_saup_no);
	
	var sheet = [];
	sheet[0] = [];
	sheet[1] = [];
	
	sheet[0][0] =$("#sheet1_col1");
	sheet[0][1] =$("#sheet1_col2");
	sheet[0][2] =$("#sheet1_col3");
	sheet[0][3] =$("#sheet1_col4");
	sheet[0][4] =$("#sheet1_col5");
	sheet[0][5] =$("#sheet1_col6");
	sheet[0][6] =$("#sheet1_col7");
	
	sheet[1][0] =$("#sheet2_col1");
	sheet[1][1] =$("#sheet2_col2");
	sheet[1][2] =$("#sheet2_col3");
	sheet[1][3] =$("#sheet2_col4");
	sheet[1][4] =$("#sheet2_col5");
	sheet[1][5] =$("#sheet2_col6");
	sheet[1][6] =$("#sheet2_col7");
	
	var tmp_val = null;
	var tmp = null;
	var io_dt = opener.Printer_Val_BASIC.io_dt.split('-');
	
	for(var i=0;i<opener.Printer_Val_Output.length;i++)
	{
		tmp_val = opener.Printer_Val_Output[i];
		if(tmp_val.io_amt==0) continue;
		
		/*
		 tmp = $('<td></td>');
 		tmp.append($('<span>'+io_dt[1]+'.'+io_dt[2]+'</span>'));

		 */
		tmp = $('<p>'+io_dt[1]+'.'+io_dt[2]+'</p>');
		sheet[0][0].append(tmp);
		
		tmp = $('<p>'+io_dt[1]+'.'+io_dt[2]+'</p>');
		sheet[1][0].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_item_nm+'</p>');
		sheet[0][1].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_item_nm+'</p>');
		sheet[1][1].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_item_danwi+'</p>');
		sheet[0][2].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_item_danwi+'</p>');
		sheet[1][2].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_su+'</p>');
		sheet[0][3].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_su+'</p>');
		sheet[1][3].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_dan+'</p>');
		sheet[0][4].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_dan+'</p>');
		sheet[1][4].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_amt+'</p>');
		sheet[0][5].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_amt+'</p>');
		sheet[1][5].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_rem+'</p>');
		sheet[0][6].append(tmp);
		
		tmp = $('<p>'+tmp_val.io_rem+'</p>');
		sheet[1][6].append(tmp);
	}
	
	
});


