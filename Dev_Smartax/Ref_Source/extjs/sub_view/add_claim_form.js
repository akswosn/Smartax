/**
 * @author DESIGNER
 */

window.onload = function() {
	if(parent.Menu35_Req_Callback) parent.Menu35_Req_Callback();
	
	$(".sub_table1").click(function(){
		$("#sub_table1").show();
		$("#sub_table2").hide();
	});
	
	$(".sub_table2").click(function(){
		$("#sub_table1").hide();
		$("#sub_table2").show();
	});
};

