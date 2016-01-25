/**
 * 매입자료입력 컨트롤러
 */
Ext.define('Smartax.controller.supertax.TaxPerchaseController',{
	extend: 'Ext.app.Controller',
	
    
    views: ['supertax.TaxPerchaseMain'],
//    store : [''],
//    
    refs : [
           {
        	   ref : 'taxPerchaseMain',
        	   selector : 'taxPerchaseMain'
           },
    ],
    
    
    init: function(app) {
    	this.control({
    		taxPerchaseMain : {
    			beforerender : function(){
					this.onPerchaseInvoiceLoad();
				},
    			afterrender : function(){
    				this.onSubPage();
    				this.onDefaultRender();
    			},
    		},
    		//탭 변경 이벤트등록
    		'taxPerchaseMain > [id=taxTab]' : {
				tabchange : function(tabpanel, newCard, oldCard, eOpts){
					var thisObj = this.getTaxPerchaseMain();
					var me = this;
					//tab에 따라 그리드를 교체
					if(newCard.id == 'perchaseCheckTab'){
						thisObj.thisSelectTabId = 'perchaseCheckTab';
						this.onPerchaseCheckLoad();
						
						var ifr = $('#perchaseCheckFrameView').contents();
						if(ifr[0].baseURI == 'about:blank' || ifr[0].baseURI == null){
							setTimeout(function(){
								ifr = $('#perchaseCheckFrameView').contents();
								me.onDefaultFormLoad(ifr);
							},500);
						}
						else {
							me.onDefaultFormLoad(ifr);
						}
					}
					else {
						thisObj.thisSelectTabId = 'perchaseInvoiceTab';
						this.onPerchaseInvoiceLoad();
						var ifr = $('#perchaseInvoiceFrameView').contents();
						me.onDefaultFormLoad(ifr);
					}
				}
			},
			//검색버튼 이벤트 등록
			'taxPerchaseMain >[cls=searchBar] > [id=searchBtn]' : {
				click : function(){
					this.onGridViewSearch(Ext.getCmp('search_year').value, Ext.getCmp('search_type').value);
				}
			},
			'taxPerchaseMain > [id=taxTab] > [xtype=toolbar] > [id=formSavetBtn]' :{
				click : function(){
					this.addTaxInfomation();
				}
			},
			'taxPerchaseMain > [id=perchaseGridLay] > [id=perchase_Grid]' :{
				 itemclick: function(dataview, record, item, index, e, eOpts){
            		 this.onGridPanelItemClick(dataview, record, item, index, e, eOpts);
            	 }
			},
			'taxPerchaseMain > [id=taxTab] > [xtype=toolbar] > [id=formDelBtn]' :{
				click : function(){
					this.onDeleteTaxInfomation();
				}
			},
    	});
    },
    //최초랜딩
    onDefaultRender : function(){
    	var date = new Date();
//    	
    	var this_mm = date.getMonth()+1;
    	if(this_mm > 6){
    		Ext.getCmp('search_type').setValue(SmartaxCommonStore.SEARCH_TYPE.getAt(1));
    	}
    	else {
    		Ext.getCmp('search_type').setValue(SmartaxCommonStore.SEARCH_TYPE.getAt(0));
    	}
    },
    
    //html 페이지!!	
	onSubPage : function(){
		var thisObj = this.getTaxPerchaseMain();
		var me = this;
		Ext.getCmp('perchaseCheckTab').add(thisObj.perchaseCheckPage); 
		Ext.getCmp('perchaseInvoiceTab').add(thisObj.perchaseInvoicePage); 
		thisObj.thisSelectTabId = 'perchaseInvoiceTab';
		
		var ifr = $('#perchaseInvoiceFrameView').contents();
		if(ifr[0] == null || ifr[0].baseURI == 'about:blank' ){
			setTimeout(function(){
				var ifr = $('#perchaseInvoiceFrameView').contents();
				me.onDefaultFormLoad(ifr);
			},500);
		}
		else {
			me.onDefaultFormLoad(ifr);
		}
	},
	/**
	 * 3 : 계산서
	 * perchaseCheckGrid
	 * perchaseCheckStore
	 * perchaseCheckGridStore
	 * */
    onPerchaseCheckLoad : function(){
    	var thisObj = this.getTaxPerchaseMain();
    	var controller = this;
    	
    	if(thisObj.searchGridStore != null){
			thisObj.searchGridStore.destroy();
			thisObj.searchGridStore = null;
		}
		
		thisObj.searchGridStore = Ext.create("Smartax.store.supertax.TaxDetailStore");
		
		
    	//ajax 조회
    	if(thisObj.perchaseCheckStore == null || thisObj.perchaseCheckGridStore == null){
    		thisObj.perchaseCheckStore = Ext.create('Smartax.store.supertax.TaxListStore');
    		thisObj.perchaseCheckGridStore = Ext.create('Smartax.store.supertax.TaxDetailStore');
    		
    		Global.showMask(Ext.getBody());
    		Ext.Ajax.request({
    			method: 'POST',
    			params: {type : '4'},
    			url: './proc/tax/u_cust/tax_select_proc.php',
    			success: function(response, opts) {
    				Global.hideMask();
    				var json = Ext.JSON.decode(response.responseText);
    				
    				if(json.CODE == '00'){
    					var data = json.DATA;
    					//grid store 생성
    					thisObj.perchaseCheckStore.add(data);
    					var gridData = new Array();
    					if(data.length > 0) {
    						for(var i =0;i< data.length;i++){
    							if(data[i].detail_id > 0){
    								if(data[i].yyyymmdd.length >= 8){
    									data[i].yyyy = data[i].yyyymmdd.substring(0,4);
    									data[i].mm = data[i].yyyymmdd.substring(4,6);
    									data[i].dd = data[i].yyyymmdd.substring(6,8);
    								}
    								data[i].type_nm = '종이세금계산서';
    								data[i].item_danga = Global.numberPriceFormat(data[i].item_danga);
    								data[i].item_supply_value = Global.numberPriceFormat(data[i].item_supply_value);
    								data[i].item_atax = Global.numberPriceFormat(data[i].item_atax);
    								data[i].item_tot = Global.numberPriceFormat(data[i].item_tot);
    								
    								gridData.push(data[i]);
    								
    								var year = Ext.getCmp('search_year').value;
    		    					var type = Ext.getCmp('search_type').value;
    		    					
    								if((data[i].yyyy+"").indexOf(year) > -1)
    								{
    									if(type == '1' && Number(data[i].mm) < 7){
    										thisObj.searchGridStore.add(data[i]);	    					
    									}
    									else if(type == '2' && Number(data[i].mm) > 6) {
    										thisObj.searchGridStore.add(data[i]);	    					
    									}
    								}
    							}
    						}
    					}
    					thisObj.perchaseCheckGridStore.add(gridData);
    					
    					controller.onLoadTaxListGrid(thisObj.searchGridStore.data.items);
    				}
    				else{
    					Ext.Msg.alert("", '로딩 실패!');
    				}
    			},
    			failure: function(form, action) {
    				Global.hideMask();
    				Ext.Msg.alert("", '로딩 실패!');
    			}
    		});
    	}
    	else {
    		//그리드 생성 호출
    		var data = thisObj.perchaseCheckGridStore.data.items;
    		var year = Ext.getCmp('search_year').value;
			var type = Ext.getCmp('search_type').value;
    		var dataArr = [];
			for(var i=0; i<data.length; i++)
			{
				record = data[i];
				if((record.get('yyyy')+"").indexOf(year) > -1)
				{
					if(type == '1' && record.get('mm') < 7){
						dataArr.push(record);	    					
					}
					else if(type == '2' && record.get('mm') > 6) {
						dataArr.push(record);	    					
					}
					
				}
			}
			thisObj.searchGridStore.add(dataArr);
			
			this.onLoadTaxListGrid(thisObj.searchGridStore.data.items);	
    	}
//    	var ifr = $('#taxFrameView').contents();
//    	//console.log(ifr);
//    	//console.log(ifr.find('#type').val());
    },
    
    /**
     * 1 : 세금계산서
	 * perchaseInvoiceGrid
	 * perchaseInvoiceStore
	 * perchaseInvoiceGridStore
	 * */
    onPerchaseInvoiceLoad : function(){
    	var thisObj = this.getTaxPerchaseMain();
    	var controller = this;
    	
    	if(thisObj.searchGridStore != null){
			thisObj.searchGridStore.destroy();
			thisObj.searchGridStore = null;
		}
		
		thisObj.searchGridStore = Ext.create("Smartax.store.supertax.TaxDetailStore");
    	
    	//ajax 조회
    	if(thisObj.perchaseInvoiceStore == null || thisObj.perchaseInvoiceGridStore == null){
    		thisObj.perchaseInvoiceStore = Ext.create('Smartax.store.supertax.TaxListStore');
    		thisObj.perchaseInvoiceGridStore = Ext.create('Smartax.store.supertax.TaxDetailStore');
    		
    		Global.showMask(Ext.getBody());
    		Ext.Ajax.request({
    			method: 'POST',
    			params: {type : '2'},
    			url: './proc/tax/u_cust/tax_select_proc.php',
    			success: function(response, opts) {
    				Global.hideMask();
    				var json = Ext.JSON.decode(response.responseText);
    				
    				if(json.CODE == '00'){
    					var data = json.DATA;
    					var gridData =  new Array();
    					thisObj.perchaseInvoiceStore.add(data);
    					
    					if(data.length > 0) {
    						for(var i =0;i< data.length;i++){
    							if(data[i].detail_id > 0){
    								if(data[i].yyyymmdd.length >= 8){
    									data[i].yyyy = data[i].yyyymmdd.substring(0,4);
    									data[i].mm = data[i].yyyymmdd.substring(4,6);
    									data[i].dd = data[i].yyyymmdd.substring(6,8);
    								}
    								data[i].type_nm = '종이계산서';
    								data[i].item_danga = Global.numberPriceFormat(data[i].item_danga);
    								data[i].item_supply_value = Global.numberPriceFormat(data[i].item_supply_value);
    								data[i].item_atax = Global.numberPriceFormat(data[i].item_atax);
    								data[i].item_tot = Global.numberPriceFormat(data[i].item_tot);
    								
    								gridData.push(data[i]);
    								
    								var year = Ext.getCmp('search_year').value;
    		    					var type = Ext.getCmp('search_type').value;
    		    					
    								if((data[i].yyyy+"").indexOf(year) > -1)
    								{
    									if(type == '1' && Number(data[i].mm) < 7){
    										thisObj.searchGridStore.add(data[i]);	    					
    									}
    									else if(type == '2' && Number(data[i].mm) > 6) {
    										thisObj.searchGridStore.add(data[i]);	    					
    									}
    								}
    							}
    						}
    					}
    					thisObj.perchaseInvoiceGridStore.add(gridData);
    					
    					controller.onLoadTaxListGrid(thisObj.searchGridStore.data.items);
    				}
    				else{
    					Ext.Msg.alert("", '로딩 실패!');
    				}
    			},
    			failure: function(form, action) {
    				Global.hideMask();
    				Ext.Msg.alert("", '로딩 실패!');
    			}
    		});
    	}
    	else {
    		//그리드 생성 호출
    		var data = thisObj.perchaseInvoiceGridStore.data.items;
    		var year = Ext.getCmp('search_year').value;
			var type = Ext.getCmp('search_type').value;
    		var dataArr = [];
			for(var i=0; i<data.length; i++)
			{
				record = data[i];
				if((record.get('yyyy')+"").indexOf(year) > -1)
				{
					if(type == '1' && record.get('mm') < 7){
						dataArr.push(record);	    					
					}
					else if(type == '2' && record.get('mm') > 6) {
						dataArr.push(record);	    					
					}
					
				}
			}
			thisObj.searchGridStore.add(dataArr);
			
			this.onLoadTaxListGrid(thisObj.searchGridStore.data.items);	
    	}
    },
    
    
    /* 그리그 로드*/
    onLoadTaxListGrid : function(dataArr){
    	var viewObj = this.getTaxPerchaseMain();
//		//리스트 그리드 구성
    	viewObj.searchGridStore = Ext.create("Smartax.store.supertax.TaxDetailStore", {
		     proxy: {
		            type: 'memory',
		            enablePaging: true,
		            data: dataArr,
		            reader: {
		                type: 'array'
		            },
		        },
			        
		        autoLoad : true,
		        pageSize: 30000,
		        remoteSort: true
    	});
    	
    	
    	Ext.getCmp('perchaseGridLay').removeAll();
    	
    	if(viewObj.perchaseGrid != null){
    		viewObj.perchaseGrid.destroy();
    		viewObj.perchaseGrid = null;
    	}
    	
    	viewObj.perchaseGrid = Ext.create('Ext.grid.Panel', {
    		cls:'grid',
    		id:'perchase_Grid',
    		title:'입력리스트',
    		width:'100%',
    	    height : (25 * dataArr.length) + 45,
    		autoScroll:true,
    		flex:1,
    		store: viewObj.searchGridStore,
    		loadMask: true,
    		columns: [
    		          { xtype: 'gridcolumn', dataIndex: 'mm', align:'center', sortable: true, text: '월', width: '5%',},
    		          { xtype: 'gridcolumn', dataIndex: 'dd', align:'center', sortable: true, text: '일', width: '5%',},
    		          { xtype: 'gridcolumn', dataIndex: 'atax_type_nm', style: 'text-align:center', sortable: true, text: '과세유형', width: '10%'},
    		          { xtype: 'gridcolumn', dataIndex: 'item_nm', style: 'text-align:center', sortable: true, text: '품목', width: '13%' },
    		          { xtype: 'gridcolumn', dataIndex: 'item_cnt', style: 'text-align:center', sortable: true, text: '수량', width: '4%' },
    		          { xtype: 'gridcolumn', dataIndex: 'item_danga', style: 'text-align:center', sortable: true, text: '단가', width: '6%' },
    		          { xtype: 'gridcolumn', dataIndex: 'item_supply_value', style: 'text-align:center', sortable: true, text: '공급가액', width: '10%' },
    		          { xtype: 'gridcolumn', dataIndex: 'item_atax', style: 'text-align:center', sortable: true, text: '부가세', width: '10%' },
    		          { xtype: 'gridcolumn', dataIndex: 'item_tot', style: 'text-align:center', sortable: true, text: '총액', width: '10%' },
    		          { xtype: 'gridcolumn', dataIndex: 'type_nm', style: 'text-align:center', sortable: true, text: '자료출처', width: '11%' },
    		          { xtype: 'gridcolumn', dataIndex: 'atax_elect_flag', style: 'text-align:center', sortable: true, text: '전자', width: '4%' },
    		          { xtype: 'gridcolumn', dataIndex: 'reg_user_nm', style: 'text-align:center', sortable: true, text: '최종입력자', width: '11%' },
    		          ],
			          selModel: {
			        	  pruneRemoved: false
			          },
//    		          viewConfig: {
//    		        	  trackOver: false
//    		          },
    		          plugins : [         
		                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
		                     })
                     ],
//                     listeners: {
//                    	 itemclick: {
//                    		 fn: this.onGridPanelItemClick,
//                    		 scope: this.getTaxPerchaseMain()
//                    	 }
//                     }
    	});
    	Ext.getCmp('perchaseGridLay').add(viewObj.perchaseGrid);
//    	viewObj.perchaseGrid.setHeight(Ext.getCmp('perchaseGridLay').getHeight());
    },
    
    /**
     * 계산서, 세금계산서 디폴트 정보 로드
     * */
    onDefaultFormLoad : function(ifr){
    	var thisObj = this.getTaxPerchaseMain();
    	//console.log(ifr);
    	var type = ifr.find('#type').val();
    	var data;
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){//세금계산서
    		data = thisObj.perchaseInvoiceStore.data.items[0].data;
    	}
    	else {
    		data = thisObj.perchaseCheckStore.data.items[0].data;
    	}
    	
    	//공급자 회사정보 바인딩[디폴트 값 설정]
    	ifr.find('#co_saup_no_view').text(data.co_saup_no);
    	ifr.find('#co_nm_view').text(data.co_nm);
    	ifr.find('#co_ceo_nm_view').text(data.co_ceo_nm);
    	ifr.find('#co_addr_view').text(data.co_addr);
    	ifr.find('#co_up_view').text(data.co_up);
    	ifr.find('#co_jong_view').text(data.co_jong);
    	
    	//다른 정보 초기화
    	ifr.find('.input_data').val('');
    	ifr.find('#tr_use_yn').val('n');
    	ifr.find('#atax_tot_view').text('');
    },
    
    /**
     * 검색기능
     * */
    onGridViewSearch : function(year, type){
    	var thisObj = this.getTaxPerchaseMain();
    	var defaultGridStore;
    	
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
    		defaultGridStore = thisObj.perchaseInvoiceGridStore;
    		if(defaultGridStore.getCount() == 0){//기존데이터가 없는 경우 리턴
    			return;
    		}
    	}
    	else {
    		defaultGridStore = thisObj.perchaseCheckGridStore;
    		if(defaultGridStore.getCount() == 0){//기존데이터가 없는 경우 리턴
    			return;
    		}
    	}
    	
    	if(thisObj.searchGridStore == null){
    		thisObj.searchGridStore =  Ext.create("Smartax.store.supertax.TaxDetailStore");
    	}
    	else {
    		thisObj.searchGridStore.removeAll();
    	}
    	
    	if(year && type)
    	{
    		//초기화
//    		thisObj.customerSearchStore = null;
//    		thisObj.customerInfo_Grid = null;
    		
			var dataArr = [];
			for(var i=0; i<defaultGridStore.getCount(); i++)
			{
				record = defaultGridStore.getAt(i);
				if((record.get('yyyy')+"").indexOf(year) > -1)
				{
					if(type == '1' && record.get('mm') < 7){
						dataArr.push(record);	    					
					}
					else if(type == '2' && record.get('mm') > 6) {
						dataArr.push(record);	    					
					}
					
				}
			}
			thisObj.searchGridStore.add(dataArr);
			
			this.onLoadTaxListGrid(dataArr);				    			
    	}
    	else {//검색조건이 유효하지 않을때!!
    		//console.log('onGridViewSearch else');
			this.onLoadTaxListGrid(defaultGridStore.data.items);
    	}
    },
    
    /**
     * 상세조회
     * */
    onGridPanelItemClick : function(dataview, record, item, index, e, eOpts){
    	var headerStore, detailStore, ifr;
    	var thisObj = this.getTaxPerchaseMain();
    	
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
    		headerStore = thisObj.perchaseInvoiceStore;
    		detailStore =  thisObj.perchaseInvoiceGridStore;
    		ifr = $('#perchaseInvoiceFrameView').contents();
    	}			    
    	else {
    		headerStore = thisObj.perchaseCheckStore;
    		detailStore =  thisObj.perchaseCheckGridStore;
    		ifr = $('#perchaseCheckFrameView').contents();
    	}
    	
    	this.onDefaultFormLoad(ifr);
    	
    	//header 검색
    	var header_tmp = {};
    	for(var i = 0; i < headerStore.getCount(); i++){
    		header = headerStore.getAt(i);
    		if(record.data.header_id == header.data.header_id){//해더는 고유값이니끼~
    			header_tmp = header;
    			break;
    		}
    	}
    	//리스트
    	var detail_tmp = [];
    	for(var i = 0; i < detailStore.getCount();i++){
    		detail = headerStore.getAt(i);
    		if(record.data.header_id == detail.data.header_id){//디테일은 복수개니까~
    			detail_tmp.push(detail);
    		}
    	}
//    	//console.log(detail_tmp);
    	//화면구성[헤더영역]
    	ifr.find('#header_id').val(header_tmp.data.header_id);
    	ifr.find('#bigo').val(header_tmp.data.bigo);
    	ifr.find('#customer_id').val(header_tmp.data.customer_id);
    	if((header_tmp.data.yyyymmdd+"").length >= 8){
    		ifr.find('#yyyy').val((header_tmp.data.yyyymmdd+"").substring(0,4));
    		ifr.find('#mm').val((header_tmp.data.yyyymmdd+"").substring(4,6));
    		ifr.find('#dd').val((header_tmp.data.yyyymmdd+"").substring(6,8));
    	}
    	ifr.find('#amt_supply_value').val(Global.numberPriceFormat(header_tmp.data.amt_supply_value));
    	if(header_tmp.data.type < 3){//세금계산서(1,2) 계산서(3,4) 세금계산서는 부가세액이 붙는다~
    		ifr.find('#amt_atax').val(Global.numberPriceFormat(header_tmp.data.amt_atax));
    		ifr.find('#atax_tot_view').text(Global.numberPriceFormat(Number(header_tmp.data.amt_supply_value) + Number(header_tmp.data.amt_atax))); //세금계산서 합계는 공급가액 + 공급가액
    	}
    	else {
    		ifr.find('#atax_tot_view').text(Global.numberPriceFormat(header_tmp.data.amt_supply_value)); //계산서 합계는 공급가액
    	}
    	if(header_tmp.data.tr_saup_no){
    		ifr.find('#tr_saup_no').val(header_tmp.data.tr_saup_no);
    		ifr.find('#tr_use_yn').val('y');
    	}
    	
    	ifr.find('#tr_nm').val(header_tmp.data.tr_nm);
    	ifr.find('#tr_daepyo').val(header_tmp.data.tr_daepyo);
    	ifr.find('#tr_addr').val(header_tmp.data.tr_addr);
    	ifr.find('#tr_up').val(header_tmp.data.tr_up);
    	ifr.find('#tr_jong').val(header_tmp.data.tr_jong);
    	
    	//화면구성[디테일영역] <= 리스트임
    	for(var i =0; i < detail_tmp.length; i++){
    		if(i == 5) break;	//다섯개 이상 들어가면 버그임~~~
    		ifr.find('#detail_id'+(i+1)).val(detail_tmp[i].data.detail_id);
    		ifr.find('#atax_id'+(i+1)).val(detail_tmp[i].data.atax_id);
    		ifr.find('#yyyy'+(i+1)).val((detail_tmp[i].data.yyyymmdd+"").substring(0,4));
    		ifr.find('#mm'+(i+1)).val((detail_tmp[i].data.yyyymmdd+"").substring(4,6));
    		ifr.find('#dd'+(i+1)).val((detail_tmp[i].data.yyyymmdd+"").substring(6,8));
    		ifr.find('#item_nm'+(i+1)).val(detail_tmp[i].data.item_nm);
    		ifr.find('#item_cnt'+(i+1)).val(detail_tmp[i].data.item_cnt);
    		ifr.find('#item_danga'+(i+1)).val(Global.numberPriceFormat(detail_tmp[i].data.item_danga));
    		ifr.find('#item_supply_value'+(i+1)).val(Global.numberPriceFormat(detail_tmp[i].data.item_supply_value));
    		ifr.find('#item_standard'+(i+1)).val(detail_tmp[i].data.item_standard);
    		ifr.find('#item_bigo'+(i+1)).val(detail_tmp[i].data.item_bigo);
    		
    		if(header_tmp.data.type < 3){//부가세 정보~
    			ifr.find('#item_atax'+(i+1)).val(Global.numberPriceFormat(detail_tmp[i].data.item_atax));
    		}
    	}
    },
    
    //공급받는자 거래처 정보 조회
    onCustomerData : function( tr_saup_no , tr_nm){
    	var ifr;
    	var thisObj = this.getTaxPerchaseMain();
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
    		ifr = $('#perchaseInvoiceFrameView').contents();
    	}
    	else {
    		ifr = $('#perchaseCheckFrameView').contents();
    	}
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			params: {tr_saup_no : tr_saup_no, tr_nm : tr_nm},
			url: './proc/tax/u_cust/tax_customer_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				//console.log(response);
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					var data = json.DATA;
					//값이 존재하는 경우 화면내에 값 세팅
					ifr.find('#customer_id').val(data.customer_id);
					ifr.find('#tr_use_yn').val('y');
					ifr.find('#tr_saup_no').val(data.tr_saup_no);
					ifr.find('#tr_nm').val(data.tr_nm);
			    	ifr.find('#tr_daepyo').val(data.tr_daepyo);
			    	ifr.find('#tr_addr').val(data.tr_addr);
			    	ifr.find('#tr_up').val(data.tr_up);
			    	ifr.find('#tr_jong').val(data.tr_jong);
				}
				else {
//					ifr.find('#customer_id').val('');
					ifr.find('#tr_use_yn').val('n');
//					ifr.find('#tr_saup_no').val('');
//					ifr.find('#tr_nm').val('');
//			    	ifr.find('#tr_daepyo').val('');
//			    	ifr.find('#tr_addr').val('');
//			    	ifr.find('#tr_up').val('');
//			    	ifr.find('#tr_jong').val('');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '로딩 실패!');
			}
		});
    },
    addTaxInfomation : function(){
    	var thisObj = this.getTaxPerchaseMain();
    	var controller = this;
    	var ifr;
    	var param = {};
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
    		ifr = $('#perchaseInvoiceFrameView').contents();
    	}
    	else {
    		ifr = $('#perchaseCheckFrameView').contents();
    	}
    	
    	if(ifr.find('#header_id').val() != ''){
    		param.header_id = ifr.find('#header_id').val();
    	}
    	else {
    		param.header_id = 0;
    	}
    	if(ifr.find('#customer_id').val() != ''){
    		param.customer_id = ifr.find('#customer_id').val();
    	}
    	else {
    		param.customer_id = 0;
    	}
    	param.type = ifr.find('#type').val();
    	param.tr_use_yn = ifr.find('#tr_use_yn').val();
    	param.tr_saup_no = ifr.find('#tr_saup_no').val();
    	param.tr_nm = ifr.find('#tr_nm').val();
    	param.tr_daepyo = ifr.find('#tr_daepyo').val();
    	param.tr_addr = ifr.find('#tr_addr').val();
    	param.tr_up = ifr.find('#tr_up').val();
    	param.tr_jong = ifr.find('#tr_jong').val();
    	
    	//공급자 validation
    	if(ifr.find('#tr_saup_no').val() == '' || ifr.find('#tr_nm').val() == ''){
//    		Ext.Msg.alert("", '공급자 정보를 입력해주세요');
    		parent.whenClick('공급자 정보를 입력해주세요');
    		return;
    	}
    	
    	var mm = ifr.find('#mm').val();
		if(mm.length==1){
			mm = "0"+mm;
		}
		var dd = ifr.find('#dd').val();
		if(dd.length==1){
			dd = "0"+dd;
		}
    	param.yyyymmdd = ifr.find('#yyyy').val() +mm+dd;
    	if(isNaN(param.yyyymmdd) || param.yyyymmdd ==''){
			//Ext.Msg.alert("", '작성일 정보는 숫자만 입력 가능합니다.');
    		parent.whenClick('작성일 정보는 숫자만 입력 가능합니다.');
			return;
		}
    	param.bigo = ifr.find('#bigo').val();
    	param.atax_type = ifr.find('#atax_type').val();
    	
    	param.amt_supply_value = Global.numberPriceFormatCancel(ifr.find('#amt_supply_value').val());
    	if(param.amt_supply_value == ''){
    		param.amt_supply_value = 0;
    	}
    	
    	if(ifr.find('#amt_atax').val()){
    		param.amt_atax = Global.numberPriceFormatCancel(ifr.find('#amt_atax').val());
    	}
    	else {
    		param.amt_atax = '0';
    	}
    	param.detail = [];
    	
    	for(var i =1; i < 6; i++){
    		if(ifr.find('#item_nm'+i).val() ==''|| ifr.find('#item_cnt'+i).val() =='' || ifr.find('#item_danga'+i).val() ==''
    			|| ifr.find('#mm'+i).val() =='' ||  ifr.find('#dd'+i).val() ==''){//유효하지 않은 정보의 경우 패스
    			continue;
    		}
    		else {
    			var detail = {};
    			detail.item_detail_id =  ifr.find('#detail_id'+i).val();
    			detail.item_atax_id =  ifr.find('#atax_id'+i).val();
    			var mm = ifr.find('#mm'+i).val();
    			if(isNaN(mm) || mm ==''){
//    				Ext.Msg.alert("", '월은 숫자만 입력 가능합니다.');
    				parent.whenClick('월은 숫자만 입력 가능합니다.');
        			return;
    			}
    			if(mm.length==1){
    				mm = "0"+mm;
    			}
    			var dd = ifr.find('#dd'+i).val();
    			if(isNaN(dd) || dd == ''){
//    				Ext.Msg.alert("", '일은 숫자만 입력 가능합니다.');
    				parent.whenClick('일은 숫자만 입력 가능합니다.');
        			return;
    			}
    			if(dd.length==1){
    				dd = "0"+dd;
    			}
    			
        		detail.item_yyyymmdd = ifr.find('#yyyy').val() + mm+dd;
        		detail.item_nm = ifr.find('#item_nm'+i).val();
        		detail.item_standard = ifr.find('#item_standard'+i).val();
        		detail.item_cnt = ifr.find('#item_cnt'+i).val();
        		//수량 체크
        		if(isNaN(detail.item_cnt) || detail.item_cnt == ''){
//        			Ext.Msg.alert("", '수량은 숫자만 입력 가능합니다.');
        			parent.whenClick('수량은 숫자만 입력 가능합니다.');
        			return;
        		}
        		
        		detail.item_bigo = ifr.find('#item_bigo'+i).val();
        		detail.item_danga = Global.numberPriceFormatCancel(ifr.find('#item_danga'+i).val());
        		//금액체크
        		if(isNaN(detail.item_danga) || detail.item_danga == ''){
//        			Ext.Msg.alert("", '금액은 숫자만 입력 가능합니다.');
        			parent.whenClick('금액은 숫자만 입력 가능합니다.');
        			return;
        		}
        		
        		detail.item_supply_value = Global.numberPriceFormatCancel(ifr.find('#item_supply_value'+i).val());
        		if(ifr.find('#item_atax'+i).val()){
        			detail.item_atax = Global.numberPriceFormatCancel(ifr.find('#item_atax'+i).val());
        		}
        		else {
        			detail.item_atax = '0';
        		}
        		param.detail.push(detail);
    		}
    	}
    	if(param.detail.length == 0){
//    		Ext.Msg.alert("", '계산서 입력 정보를 확인 해주세요!');
    		parent.whenClick('계산서 입력 정보를 확인 해주세요!');
    		return;
    	}
    	else {
    		param.detail = JSON.stringify(param.detail);
    	}
    	
    	
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			params: param,
			url: './proc/tax/u_cust/tax_infomation_update_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					Ext.Msg.alert("", '처리 되었습니다.!');
					controller.onDefaultFormLoad(ifr);
//					var headerStore, detailStore;
					if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
			    		thisObj.perchaseInvoiceStore.removeAll();
			    		thisObj.perchaseInvoiceGridStore.removeAll();
			    		thisObj.perchaseInvoiceStore=null;
			    		thisObj.perchaseInvoiceGridStore=null;
			    		controller.onPerchaseInvoiceLoad();
			    	}
			    	else {
			    		thisObj.perchaseCheckStore.removeAll();
			    		thisObj.perchaseCheckGridStore.removeAll();
			    		thisObj.perchaseCheckStore=null;
			    		thisObj.perchaseCheckGridStore=null;
			    		controller.onPerchaseCheckLoad();
			    	}
					
				}
				else {
					Ext.Msg.alert("", '수정 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '로딩 실패!');
			}
		});
    	
    },
    //계산서 삭제
    onDeleteTaxInfomation : function(){
    	var thisObj = this.getTaxPerchaseMain();
    	var controller = this;
    	var ifr, listStore, detailStore;
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
    		ifr = $('#perchaseInvoiceFrameView').contents();
    		listStore = thisObj.perchaseInvoiceStore;
    		detailStore = thisObj.perchaseInvoiceGridStore;
    	}
    	else {
    		ifr = $('#perchaseCheckFrameView').contents();
    		listStore = thisObj.perchaseCheckStore;
    		detailStore = thisObj.perchaseCheckGridStore;
    	}
    	var gridStore = thisObj.searchGridStore;
    	var header_id = ifr.find('#header_id').val();
    	var type = ifr.find('#type').val();
    	
    	
    	if(header_id == ''){
//    		Ext.Msg.alert("", '삭제 대상을 선택해 주세요.');
    		parent.whenClick('삭제 대상을 선택해 주세요.');
    		return;
    	}
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">계산서 정보를</span>를 삭제하시겠습니까?', function(btn){
			if(btn=='yes')
			{
				Global.showMask(Ext.getBody());
				Ext.Ajax.request({
					method: 'POST',
					params: {header_id:header_id, type:type},
					url: './proc/tax/u_cust/tax_infomation_delete_proc.php',
					success: function(response, opts) {
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						
						if(json.CODE == '00'){
							Ext.Msg.alert("", '삭제되었습니다.!');
							controller.onDefaultFormLoad(ifr);
							listStore.removeAt(listStore.find('header_id', header_id));
							while(detailStore.find('header_id', header_id) > -1){
								detailStore.removeAt(detailStore.find('header_id', header_id));
							}
							while(gridStore.find('header_id', header_id) > -1){
								gridStore.removeAt(gridStore.find('header_id', header_id));
							}
						}
						else {
							Ext.Msg.alert("", '삭제 실패!');
						}
					},
					failure: function(form, action) {
						Global.hideMask();
						Ext.Msg.alert("", '로딩 실패!');
					}
				});
			}
    	});
    	
    },
    //계산서 상세정보 단건 삭제
    onDeleteTaxDetail : function(detail_id){
    	var thisObj = this.getTaxPerchaseMain();
    	var controller = this;
    	var ifr, listStore, detailStore;
    	
    	if(thisObj.thisSelectTabId == 'perchaseInvoiceTab'){
    		ifr = $('#perchaseInvoiceFrameView').contents();
    		detailStore = thisObj.perchaseInvoiceGridStore;
    	}
    	else {
    		ifr = $('#perchaseCheckFrameView').contents();
    		detailStore = thisObj.perchaseCheckGridStore;
    	}
    	var header_id = ifr.find('#header_id').val();
    	var type = ifr.find('#type').val();
    	var check = 0;
    	//계산서 내용중 하나만 남아있는경우 전체 삭제로 이동~ !!!
    	detailStore.each(function(record,id) {
	        if(record.get('type') == type && record.get('header_id') == header_id) {
	        	check++;
	        }
	    });	
    	if(check == 1){
    		//우회~~~
    		this.onDeleteTaxInfomation();
    	}
    	else {
    		var gridStore = thisObj.searchGridStore;
        	//console.log(detail_id);
        	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">선택한 정보를</span>를 삭제하시겠습니까?', function(btn){
    			if(btn=='yes')
    			{
    				Global.showMask(Ext.getBody());
    				Ext.Ajax.request({
    					method: 'POST',
    					params: {detail_id:detail_id},
    					url: './proc/tax/u_cust/tax_detail_delete_proc.php',
    					success: function(response, opts) {
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
    						
    						if(json.CODE == '00'){
    							Ext.Msg.alert("", '삭제되었습니다.!');
    							controller.onDefaultFormLoad(ifr);
    							detailStore.removeAt(detailStore.find('detail_id', detail_id));
    							gridStore.removeAt(gridStore.find('detail_id', detail_id));
    						}
    						else {
    							Ext.Msg.alert("", '삭제 실패!');
    						}
    					},
    					failure: function(form, action) {
    						Global.hideMask();
    						Ext.Msg.alert("", '로딩 실패!');
    					}
    				});
    			}
        	});
    	}
    }
});
	
    
