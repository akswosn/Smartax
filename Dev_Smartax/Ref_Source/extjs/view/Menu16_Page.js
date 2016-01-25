/* 매입/매출관리 - 입고현황 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu16_Page', {
    extend: 'Ext.container.Container',
    id:'Menu16_Page',
    cls:'page',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex:1,
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
				        align: 'middle',
				        type: 'hbox'
				    },
                    cls:'searchBar',
                    items: [
                         {
                            xtype: 'datefield',
                            fieldLabel: '조회기간',
                            id:'menu16_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu16_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu16_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu16_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                        { xtype: 'textfield', id: 'menu16_tr_cd', fieldLabel: '거래처', width:120, labelSeparator: '', labelAlign:'right', labelWidth: 60, selectOnFocus: true,
	            			enableKeyEvents : true,
	            			listeners: {
	                            blur: {
	                                fn: function(field, e, options) {
	                                    var value = field.getValue();
	                                    var textVal = '';
	                                    var modiVal = Ext.String.leftPad(value, 5, '0');
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', modiVal, null, null, null, true);
		                            		if(codeRecord)
		                            		{
		                            			value = modiVal;
		                            			textVal = codeRecord.data.tr_nm;
		                            		} 
		                            		else
		                            		{
		                            			value = '';
		                            			textVal = '';
		                            		}  
		                            	}
		                            	field.setValue(value);
		                            	this.next().setValue(textVal);
	                                }
	                            },
	                            keydown: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==113){
	                                    	var pop = Ext.create('Common_Pop_Trds');
	                                    	pop.Cfield = this;
	                                    	pop.Vfield = this.next();
	                                    	Global.openPopup(pop);
	                                    	return false;
	                                    }
	                                }
	                            },
	                            specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.getCmp('menu16_itemgrp_cd').focus();
	                                    }
	                                }
	                            }
	                        }
	                    },		
	            		{ 	xtype: 'combobox',
	            			id: 'menu16_tr_nm',
	            			width:102,
	            			margin: '0 0 0 5',
	            			store: StoreInfo.Menu09_Grid,
	            			emptyText: '거래처명 검색',
						    autoSelect: false,
						    minChars: 1,
						    hideTrigger: true,  
						    queryMode: 'local',
						    displayField: 'tr_nm',
						    valueField: 'customer_id',
						    enableKeyEvents : true,
						    listeners: {
						    	select: {
	                                fn: function(field, e, options) {
	                                    var value = field.getValue();
	                                    var textVal = '';
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', value, null, null, null, true);
		                            		if(codeRecord)
		                            		{
		                            			value = codeRecord.data.customer_id;
		                            			textVal = codeRecord.data.tr_nm;
		                            		} 
		                            		else
		                            		{
		                            			value = '';
		                            			textVal = '';
		                            		}
		                            	}
		                            	field.setRawValue(textVal);
		                            	this.prev().setValue(value);
		                            	window.setTimeout(function(){
		                            		Ext.getCmp('menu16_itemgrp_cd').focus();	
		                            	}, 100);
	                                }
	                            },
						    	keydown: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==113){
	                                    	var pop = Ext.create('Common_Pop_Trds');
	                                    	pop.Cfield = this.prev();
	                                    	pop.Vfield = this;
	                                    	Global.openPopup(pop);
	                                    	return false;
	                                    }
	                                }
	                           },
	                           specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	var value = field.getRawValue();
	                                    	var textVal = '';
											if(value)
			                            	{
			                            		var codeRecord = StoreInfo.Menu09_Grid.findRecord('tr_nm', value, null, null, null, true);
			                            		if(codeRecord)
			                            		{
			                            			value = codeRecord.data.customer_id;
			                            			textVal = codeRecord.data.tr_nm;
			                            		} 
			                            		else
			                            		{
			                            			value = '';
			                            			textVal = '';
			                            		}
			                            	}
			                            	field.setRawValue(textVal);
			                            	this.prev().setValue(value); 
	                                    	Ext.getCmp('menu16_itemgrp_cd').focus();
	                                    }
	                                }
	                            }
	                        }
					    },
						{
			                xtype: 'combobox',
			                id: 'menu16_itemgrp_cd',
			                labelAlign: 'right',
			                cls:'searchChild',
			                width:130,
			                value: '전체',
							editable: false,
			                fieldLabel: '상품',
			                labelSeparator: '',
			                labelWidth: 40,
			                selectOnFocus: true,
			                displayField: 'itemgrp_nm',
			                queryMode: 'local',
			                store: StoreInfo.Menu23_Grid_SEAR,
			                valueField: 'itemgrp_cd',
			                enableKeyEvents : true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                      	},
			                    select: {
			                    	fn: me.onComboboxSelect,
			                        scope: me
			                    }
		        			}
			            },
						{
			                xtype: 'combobox',
			                id: 'menu16_item_cd',
			                labelAlign: 'right',
			                cls:'searchChild',
			                width:100,
			                value: '전체',
							editable: false,
			                labelSeparator: '',
			                selectOnFocus: true,
			                displayField: 'item_nm',
			                queryMode: 'local',
			                store: StoreInfo.Menu24_Grid_SEAR,
			                valueField: 'item_cd',
			                enableKeyEvents : true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	me.onMenu16_SearchBtnClick(true);
		                                }
		                            }
		                        }
		        			}
			            },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '조회',
                            listeners: {
                                click: {
                                    fn: me.onMenu16_SearchBtnClick,
                                    scope: me
                                }	
                            }
                            
                        },
                        {
                            xtype: 'label',
                            cls:'searchChild',
                            margin: '4 0 0 10',
                            flex:1,
                            text: '화면 갱신은 조회단추를 다시 눌러주세요.'
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            style:'float:right',
                            text: '사용방법',
                            listeners: {
                                click: {
                                    fn: me.onMenu01_DescriptBtnClick,
                                    scope: me
                                }
                            }
                            
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
				        type: 'hbox',
				        align: 'stretch'
				    },
				    flex:1,
				    items:[
		                {
		                    xtype: 'tabpanel',
		                    flex: 1,
		                    activeTab: 0,
		                    items: [
		                        {
		                            xtype: 'panel',
		                            title: '일자별 입고현황',
		                            itemId: 'input_day_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu16_Grid1,
						                    viewConfig: {
											    getRowClass: function(record, rowIndex, rowParams, store){
											    	var cls = "row-valid";
											    	var type = record.get('type');
											    	if(type == -1) cls = "row-month";
											    	else if(type == -2) cls = "row-sum";
											    	return cls;
											    }
											},
						                    columns: [
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '입고일자', width: 80 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_tr_cd', style:'text-align:center;', text: '거래처', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_cd', style:'text-align:center;', text: '상품명', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_su', style:'text-align:center;', text: '수량', align: 'right', format:'0,000', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_dan', style:'text-align:center;', text: '단가', align: 'right', format:'0,000', width: 100 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_amt', style:'text-align:center;', text: '금액', align: 'right', format:'0,000', width: 100 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_rem', style:'text-align:center;', text: '비고', width: 140 }
						                    ],
						                    plugins: [ Ext.create('Ext.grid.plugin.BufferedRenderer', {}) ],
						     				dockedItems: [
												{
													xtype: 'toolbar',
													layout: { pack: 'end', type: 'hbox' },
													dock: 'bottom',
													items: [
														{ xtype:'button', text: '인쇄', cls:'bottomChild',
															handler : function(){
										               			var fromDt = Ext.getCmp('menu16_date_str').getValue();
																var toDt = Ext.getCmp('menu16_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 일자별 입고현황 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '일자별 입고현황', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '거래처별 입고현황',
		                            itemId: 'input_customer_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu16_Grid2,
						                    viewConfig: {
											    getRowClass: function(record, rowIndex, rowParams, store){
											    	var cls = "row-valid";
											    	var type = record.get('type');
											    	if(type == -1) cls = "row-month";
											    	else if(type == -2) cls = "row-sum";
											    	return cls;
											    }
											},
						                    columns: [
						                    	{	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_tr_cd', style:'text-align:center;', text: '거래처', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '입고일자', width: 80 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_cd', style:'text-align:center;', text: '상품명', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_su', style:'text-align:center;', text: '수량', align: 'right', format:'0,000', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_dan', style:'text-align:center;', text: '단가', align: 'right', format:'0,000', width: 100 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_amt', style:'text-align:center;', text: '금액', align: 'right', format:'0,000', width: 100 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_rem', style:'text-align:center;', text: '비고', width: 140 }
						                    ],
						                    plugins: [ Ext.create('Ext.grid.plugin.BufferedRenderer', {}) ],
						     				dockedItems: [
												{
													xtype: 'toolbar',
													layout: { pack: 'end', type: 'hbox' },
													dock: 'bottom',
													items: [
														{ xtype:'button', text: '인쇄', cls:'bottomChild',
															handler : function(){
										               			var fromDt = Ext.getCmp('menu16_date_str').getValue();
																var toDt = Ext.getCmp('menu16_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 거래처별 입고현황 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '거래처별 입고현황', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '상품별 입고현황',
		                            itemId: 'input_item_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu16_Grid3,
						                    viewConfig: {
											    getRowClass: function(record, rowIndex, rowParams, store){
											    	var cls = "row-valid";
											    	var type = record.get('type');
											    	if(type == -1) cls = "row-month";
											    	else if(type == -2) cls = "row-sum";
											    	return cls;
											    }
											},
						                    columns: [
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_cd', style:'text-align:center;', text: '상품명', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '입고일자', width: 80 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_tr_cd', style:'text-align:center;', text: '거래처', width: 120 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_su', style:'text-align:center;', text: '수량', align: 'right', format:'0,000', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_dan', style:'text-align:center;', text: '단가', align: 'right', format:'0,000', width: 100 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_amt', style:'text-align:center;', text: '금액', align: 'right', format:'0,000', width: 100 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_rem', style:'text-align:center;', text: '비고', width: 140 }
						                    ],
						                    plugins: [ Ext.create('Ext.grid.plugin.BufferedRenderer', {}) ],
						     				dockedItems: [
												{
													xtype: 'toolbar',
													layout: { pack: 'end', type: 'hbox' },
													dock: 'bottom',
													items: [
														{ xtype:'button', text: '인쇄', cls:'bottomChild',
															handler : function(){
										               			var fromDt = Ext.getCmp('menu16_date_str').getValue();
																var toDt = Ext.getCmp('menu16_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 상품별 입고현황 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '상품별 입고현황', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	}
		                    ],
		                    listeners: {
		                        tabchange: {
		                            fn: me.onTabpanelTabChange,
		                            scope: me
		                        }
		                    }
		                }
		            ]
		        }
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                },
                show:{
                	fn: me.onContainerShowRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	if(!newCard.isCall)
    	{
    		this.onMenu16_SearchBtnClick(null);
    		newCard.isCall = true;
    	}
    },

    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
		var now = new Date();
		Ext.getCmp('menu16_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu16_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		//계정코드검색 데이터 셋팅
		this.onContainerShowRender();
		this.onMenu16_SearchBtnClick(true);
    },
    
    //화면이 숨겨졌다 보여질때
    
    onContainerShowRender: function(component, eOpts) {
    	
    	var kbnVal = Ext.getCmp('menu16_itemgrp_cd').getValue();
    	var itemVal = Ext.getCmp('menu16_item_cd').getValue();
    	
    	StoreInfo.Menu23_Grid_SEAR.removeAll();
    	StoreInfo.Menu23_Grid_SEAR.insert(0, {'itemgrp_cd':'', 'itemgrp_nm':'전체'});
		var copyRecs = StoreInfo.Menu23_Grid.getNewRecords();
		for(var i=0; i<copyRecs.length; i++)
			StoreInfo.Menu23_Grid_SEAR.insert(i+1, {'itemgrp_cd':copyRecs[i].get('itemgrp_cd'), 'itemgrp_nm':copyRecs[i].get('itemgrp_nm')});
		
		//이전에 선택된 데이터가 없으면 상품목록 초기화    	
    	if(itemVal == '' || itemVal == '전체')
    		if(kbnVal == '' || kbnVal == '전체') this.onComboboxSelect();
    		
    },
    
    onComboboxSelect: function(combo, records, eOpts) {
    	
    	var selVal = Ext.getCmp('menu16_itemgrp_cd').getValue();
    	StoreInfo.Menu24_Grid_SEAR.removeAll();
    	StoreInfo.Menu24_Grid_SEAR.insert(0, {'item_cd':'', 'item_nm':'전체'});
    	
    	if(selVal == '전체' || selVal == '')
    	{
			var copyRecs = StoreInfo.Menu24_Grid.getNewRecords();
			for(var i=0; i<copyRecs.length; i++)
				StoreInfo.Menu24_Grid_SEAR.insert(i+1, {'item_cd':copyRecs[i].get('item_cd'), 'item_nm':copyRecs[i].get('item_nm')});
    	}
    	else
    	{
    		StoreInfo.Menu24_Grid.each(function(item, index, count){
    			if(item.get('itemgrp_cd') == selVal)
    				StoreInfo.Menu24_Grid_SEAR.add({'item_cd':item.get('item_cd'), 'item_nm':item.get('item_nm')});
    		});
    		Ext.getCmp('menu16_item_cd').setValue('전체');
    	}
    },

    //조회버튼을 눌렀을 경우
    onMenu16_SearchBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var fromDt = Ext.getCmp('menu16_date_str').getValue();
		var toDt = Ext.getCmp('menu16_date_end').getValue();
		var io_tr_cd = Ext.getCmp('menu16_tr_cd').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var itemgrp_cd = Ext.getCmp('menu16_itemgrp_cd').getValue();
		var item_cd = Ext.getCmp('menu16_item_cd').getValue();
		
		var actTab = this.down('tabpanel').getActiveTab();
		var tabId = actTab.itemId;
		var store = actTab.down('gridpanel').getStore(); 
		
		var params = {
			from_yyyymmdd: from_yyyymmdd,
			to_yyyymmdd: to_yyyymmdd,
		};
		
		if(io_tr_cd) params['io_tr_cd'] = io_tr_cd;
		if(itemgrp_cd && itemgrp_cd != '전체') params['itemgrp_cd'] = itemgrp_cd;
		if(item_cd && item_cd != '전체') params['item_cd'] = item_cd;
		
		Global.showMask(Ext.getBody());

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/input/'+tabId+'_proc.php',
			params: params,
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.sucessCallData(actTab, store, json.DATA, button);
				}
				else{
					Ext.Msg.alert("", '조회 실패');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
    },
    
    //성공했을시 탭패널 초기화 함수
    sucessCallData: function(actTab, store, data, isSearch)
    {
    	//조회버튼을 눌렀을시 기존 탭 검색여부 초기화
    	if(isSearch)
    	{
    		Ext.each(this.down('tabpanel').items.items, function(tab){
				tab.isCall = null;
			});
    	}
    	store.removeAll();
    	store.add(data);
    	actTab.isCall = true;
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(입고현황)', 'Menu16');
    },
});

