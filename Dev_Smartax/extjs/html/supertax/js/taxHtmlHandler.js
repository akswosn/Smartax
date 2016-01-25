
/*
 * 계산서 HTML HANDLER!!!!
 * */
var HTML_HANDLER = {
	onViewRefresh : function(){
		window.location.reload(true);
	},	
		
	priceValueUpdate : function(el){
		el.value = (el.value+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var type = $('#type').val();
		
		var count = el.id.charAt(el.id.length-1);
		
		this.onSupplyPriceUpdate(count);
		
		if(Number(type) > 2){
			this.onCheckPriceUpdate();
		}
		else {
			this.onAtaxPriceUpdate(count);
			this.onInvoicePriceUpdate();
		}
	},
	
	countValueUpdate : function(el){
		var type = $('#type').val();
		var count = el.id.charAt(el.id.length-1);
		
		this.onSupplyPriceUpdate(count);
		
		if(Number(type) > 2){
			this.onCheckPriceUpdate();
		}
		else {
			this.onAtaxPriceUpdate(count);
			this.onInvoicePriceUpdate();
		}
	},
	
	onSupplyPriceUpdate : function(count){
		var num = $('#item_cnt'+count).val();
		if(num == '') num = 1;
		
		var supply = Number($('#item_danga'+count).val().replace(/,/g,'')) * Number(num);
		$('#item_supply_value'+count).val((supply+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	},
	
	onAtaxPriceUpdate : function(count){
		var atax = Math.round(Number($('#item_supply_value'+count).val().replace(/,/g,'') / 10));
		$('#item_atax'+count).val((atax+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	},
	
	onCheckPriceUpdate : function(){
		var total_supply = 0;
		$('.supply_val').each(function(){
			if(this.value){
				total_supply += Number(this.value.replace(/,/g,''));
			}
		});
		$('#amt_supply_value').val((total_supply+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		$('#atax_tot_view').text((total_supply+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	},
	
	onInvoicePriceUpdate : function(){
		var total_supply = 0;
		var total_atax = 0;
		$('.supply_val').each(function(){
			if(this.value){
				total_supply += Number(this.value.replace(/,/g,''));
			}
		});
		$('.atax_val').each(function(){
			if(this.value){
				total_atax += Number(this.value.replace(/,/g,''));
			}
		});
		
		$('#amt_supply_value').val((total_supply+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		$('#amt_atax').val((total_atax+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		$('#atax_tot_view').text(((total_supply+total_atax)+"").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	},
	
	//공급받는자 거래처 검색
	onSelectCustomer : function(text){
		var type = $('#type').val();
		var controller;
		if(type % 2== 0){
			controller = parent.Smartax.app.getController('supertax.TaxPerchaseController');
		}
		else {
			controller = parent.Smartax.app.getController('supertax.TaxSalesController');
		}
		var tr_saup_no = '';
		var tr_nm = '';
		
		if(text == 'tr_nm'){
		    tr_nm = $('#tr_nm').val();
			controller.onCustomerData('', tr_nm);	
		}
		else if(text == 'tr_saup_no'){
			tr_saup_no = this.getSaupjaNumber($('#tr_saup_no').val());
			$('#tr_saup_no').val(tr_saup_no);
			controller.onCustomerData(tr_saup_no, '');	
		}
	},
	
	//삭제
	deleteTaxDetail : function(val){
		var type = $('#type').val();
		var controller;
		if(type % 2== 0){
			controller = parent.Smartax.app.getController('supertax.TaxPerchaseController');
		}
		else {
			controller = parent.Smartax.app.getController('supertax.TaxSalesController');
		}
		var detail_id = $('#detail_id'+val).val();
		if(detail_id < 1){
			return;
		}
		
		controller.onDeleteTaxDetail(detail_id);	
		//controller 호출
		//console.log(parent.Smartax.app.getController('supertax.TaxSalesController'));
		//console.log(parent.Smartax.app.getController('supertax.TaxPerchaseController'));
	},
	
	getSaupjaNumber : function(text){
		var Saupja = (text+'').replace(/-/g,"");
    	var len = Saupja.length; 
    	if(len < 4) return Saupja;
    	else if(len < 6) return Saupja.substring(0,3)+'-'+Saupja.substring(3,5);  
    	else return Saupja.substring(0,3)+'-'+Saupja.substring(3,5)+'-'+Saupja.substring(5,10);    	
	}
};

