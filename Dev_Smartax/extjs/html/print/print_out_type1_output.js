$(document).ready(function() {
	
	console.log(opener.Printer_Val);

	$('#imgView').attr('src', opener.Printer_Val.src);
	window.print();
});

function viewPrint(){
	$('#print_btn_area').hide();
	window.print();
	$('#print_btn_area').show();
}

