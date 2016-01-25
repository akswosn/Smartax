/* 매입/매출관리 - 출고현황 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu20_Page', {
    extend: 'Ext.container.Container',
    id:'Menu20_Page',
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
                            id:'menu20_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu20_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu20_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu20_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                        { xtype: 'textfield', id: 'menu20_tr_cd', fieldLabel: '거래처', width:120, labelSeparator: '', labelWidth: 60, labelAlign:'right', selectOnFocus: true,
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
	                                    	Ext.getCmp('menu20_itemgrp_cd').focus();
	                                    }
	                                }
	                            }
	                        }
	                    },		
	            		{ 	xtype: 'combobox',
	            			id: 'menu20_tr_nm',
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
		                            		Ext.getCmp('menu20_itemgrp_cd').focus();	
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
	                                    	Ext.getCmp('menu20_itemgrp_cd').focus();
	                                    }
	                                }
	                            }
	                        }
					    },
						{
			                xtype: 'combobox',
			                id: 'menu20_itemgrp_cd',
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
			                id: 'menu20_item_cd',
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
		                                	me.onMenu20_SearchBtnClick(true);
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
                                    fn: me.onMenu20_SearchBtnClick,
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
		                            title: '일자별 출고현황',
		                            itemId: 'output_day_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu20_Grid1,
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
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '출고일자', width: 80 },
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
										               			var fromDt = Ext.getCmp('menu20_date_str').getValue();
																var toDt = Ext.getCmp('menu20_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 일자별 출고현황 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '일자별 출고현황', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '거래처별 출고현황',
		                            itemId: 'output_customer_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu20_Grid2,
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
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '출고일자', width: 80 },
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
										               			var fromDt = Ext.getCmp('menu20_date_str').getValue();
																var toDt = Ext.getCmp('menu20_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 거래처별 출고현황 ]'; 
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '거래처별 출고현황', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '상품별 출고현황',
		                            itemId: 'output_item_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu20_Grid3,
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
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '출고일자', width: 80 },
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
										               			var fromDt = Ext.getCmp('menu20_date_str').getValue();
																var toDt = Ext.getCmp('menu20_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 상품별 출고현황 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '상품별 출고현황', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '일별 출고집계',
		                            itemId: 'output_sum_day_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu20_Grid4,
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
						                    	{	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '출고일자', width: 80 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_cd', style:'text-align:center;', text: '상품명', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_su', style:'text-align:center;', text: '수량', align: 'right', format:'0,000', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_amt', style:'text-align:center;', text: '금액', align: 'right', format:'0,000', width: 100 }
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
										               			var fromDt = Ext.getCmp('menu20_date_str').getValue();
																var toDt = Ext.getCmp('menu20_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 일별 출고집계 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '일별 출고집계', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '월별 출고집계',
		                            itemId: 'output_sum_month_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu20_Grid5,
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
						                    	{	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_dt', style:'text-align:center;', text: '출고일자', width: 80 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_cd', style:'text-align:center;', text: '상품명', width: 120 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60 },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_su', style:'text-align:center;', text: '수량', align: 'right', format:'0,000', width: 60 },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'io_amt', style:'text-align:center;', text: '금액', align: 'right', format:'0,000', width: 100 }
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
										               			var fromDt = Ext.getCmp('menu20_date_str').getValue();
																var toDt = Ext.getCmp('menu20_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 월별 출고집계 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '월별 출고집계', cls:'bottomChild'}
													]
												}
											]
						              	}
		                            ]
		                       	},
		                        {
		                            xtype: 'panel',
		                            title: '상품별 출고집계',
		                            itemId: 'output_sum_item_report',
		                            layout:{ type:'vbox', align: 'stretch' },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu20_Grid6,
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
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_cd', style:'text-align:center;', text: '상품명', width: 120, locked:true },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60, locked:true },
						                        {	xtype: 'gridcolumn', sortable: false, dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60, locked:true },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'su_sum', style:'text-align:center;', text: '수량합계', align: 'right', format:'0,000', width: 80, locked:true },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: 'amt_sum', style:'text-align:center;', text: '금액합계', align: 'right', format:'0,000', width: 100, locked:true },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '01', style:'text-align:center;', text: '1월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '02', style:'text-align:center;', text: '2월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '03', style:'text-align:center;', text: '3월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '04', style:'text-align:center;', text: '4월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '05', style:'text-align:center;', text: '5월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '06', style:'text-align:center;', text: '6월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '07', style:'text-align:center;', text: '7월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '08', style:'text-align:center;', text: '8월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '09', style:'text-align:center;', text: '9월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '10', style:'text-align:center;', text: '10월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '11', style:'text-align:center;', text: '11월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                },
						                        {   xtype: 'numbercolumn', sortable: false, dataIndex: '12', style:'text-align:center;', text: '12월', align: 'right', format:'0,000', width: 60,
						                        	renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
														return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
								                	}
								                }
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
										               			var fromDt = Ext.getCmp('menu20_date_str').getValue();
																var toDt = Ext.getCmp('menu20_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 상품별 출고집계 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
											            	}
											            },
										               	{ xtype: 'exporterbutton', downloadName: '상품별 출고집계', cls:'bottomChild'}
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
    		this.onMenu20_SearchBtnClick(null);
    		newCard.isCall = true;
    	}
    },

    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
		var now = new Date();
		Ext.getCmp('menu20_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu20_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		//계정코드검색 데이터 셋팅
		this.onContainerShowRender();
		this.onMenu20_SearchBtnClick(true);
    },
    
    //화면이 숨겨졌다 보여질때
    
    onContainerShowRender: function(component, eOpts) {
    	
    	var kbnVal = Ext.getCmp('menu20_itemgrp_cd').getValue();
    	var itemVal = Ext.getCmp('menu20_item_cd').getValue();
    	
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
    	
    	var selVal = Ext.getCmp('menu20_itemgrp_cd').getValue();
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
    		Ext.getCmp('menu20_item_cd').setValue('전체');
    	}
    },

    //조회버튼을 눌렀을 경우
    onMenu20_SearchBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var fromDt = Ext.getCmp('menu20_date_str').getValue();
		var toDt = Ext.getCmp('menu20_date_end').getValue();
		var io_tr_cd = Ext.getCmp('menu20_tr_cd').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var itemgrp_cd = Ext.getCmp('menu20_itemgrp_cd').getValue();
		var item_cd = Ext.getCmp('menu20_item_cd').getValue();
		
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
			url: './proc/account/output/'+tabId+'_proc.php',
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
    	
    	//상품별 출고집계는 합계로우를 적용해주어야 함
    	if(actTab.itemId == 'output_sum_item_report')
    	{	
    		var sumRow = {
    			'type': -2, 'io_item_cd': '(합계)', 'su_sum': store.sum('su_sum'), 'amt_sum': store.sum('amt_sum'),
    			'01': store.sum('01'), '02': store.sum('02'), '03': store.sum('03'), '04': store.sum('04'),
    			'05': store.sum('05'), '06': store.sum('06'), '07': store.sum('07'), '08': store.sum('08'),
    			'09': store.sum('09'), '10': store.sum('10'), '11': store.sum('11'), '12': store.sum('12')
    		};
    		store.add(sumRow);
    	}
    	actTab.isCall = true;
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(출고현황)', 'Menu20');
    },
});

