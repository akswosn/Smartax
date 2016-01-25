/* 매입/매출관리 - 출고등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
var Printer_Val_Output = null;    
var Printer_Val = null;
var Printer_Val_BASIC = {};


Ext.define('Menu19_Page', {
    extend: 'Ext.container.Container',
    id:'Menu19_Page',
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
                            fieldLabel: '출고기간',
                            id:'menu19_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu19_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu19_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu19_SearchBtnClick();
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
                                    fn: me.onMenu19_SearchBtnClick,
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
		                    xtype: 'gridpanel',
		                    cls:'grid',
		                    width: 200,
		                    autoScroll:true,
		                    style: 'margin-right:5px;',
		                    store: StoreInfo.Menu19_Grid1,
		                    columns: [
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'io_dt',
		                            align:'center',
		                            sortable: true,
		                            text: '출고일자',
		                            width: 80
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            style: 'text-align:center',
		                            dataIndex: 'io_tr_cd',
		                            flex:1,
		                            text: '거래처',
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var code = Ext.String.leftPad(value, 5, '0');
                        				var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                        				
                        				if(codeRecord) Printer_Val_BASIC.io_tr_cd = codeRecord.get('tr_nm');
       									else Printer_Val_BASIC.io_tr_cd = '자체생산';
       									
                        				if(codeRecord) return codeRecord.get('tr_nm');
                        				else return '자체생산';
                            		}
		                        }
		                    ],
		                    listeners: {
		                        itemclick: {
		                            fn: me.onGridpanelItemClick,
		                            scope: me
		                        }
		                    }
						},
						{
		                    xtype: 'container',
		                    layout: {
						        type: 'vbox',
						        align: 'stretch'
						    },
						    flex:1,
						    items:[
						   		{
				                    xtype: 'form',
				                    bodyPadding: 10,
				                    bodyStyle: 'background-color:#DBE6F4 !important;',
				                    plain: true,
				                    cls:'formArea',
				                    width: 450,
				                    items: [
					                    {
			                    			xtype: 'container',
					                    	layout: {
										        type: 'hbox',
										        align: 'stretch'
										    },
										    items:[
											    { xtype: 'datefield', name: 'io_dt',  fieldLabel: '출고일자', tabIndex:1, width:317, labelSeparator: '', labelWidth: 60, format:'Y-m-d', selectOnFocus: true,
								                	enableKeyEvents : true,
								                	value: new Date(),
													allowBlank: false,
								            		listeners:{
								        				specialkey: {
								                            fn: function(field, e, options) {
								                                if(e.getKey()==13){
								                                	this.next().next().focus();
								                                }
								                            }
								                        }
								        			}
										        },
										        { xtype: 'hiddenfield', name:'io_no', width:70, readOnly: true, margin: '0 0 0 5' },
										        
										        {
									                xtype: 'combobox',
									                cls:'tax_kbn',
									                name: 'io_tax_gubun',
									                hidden: true,
									                tabIndex:2,
									                //width:180,
									                width:0,
									                value: StoreInfo.TAX_KBN.findRecord('tax_cd', 2, null, null, null, true),
													editable: false,
									                //fieldLabel: '과세구분',
									                labelSeparator: '',
									                labelWidth: 72,
									                labelAlign: 'right',
									                selectOnFocus: true,
									                displayField: 'tax_nm',
									                queryMode: 'local',
									                store:  StoreInfo.TAX_KBN,
									                valueField: 'tax_cd',
									                enableKeyEvents : true,
									                listeners:{
											        				specialkey: {
											                            fn: function(field, e, options) {
											                                if(e.getKey()==13){
											                                	this.next().focus();
											                                }
											                            }
											                       	},
											                       	change:{
											                       		fn: function(field, e, options) {
													                       			if(field.value == 1 || field.value == 4 )
													                       			{
													                       				if(Ext.getCmp('io_tot_vat1'))
													                       					Ext.getCmp('io_tot_vat1').show();	
													                       			}
													                       			else
													                       			{
													                       				if(Ext.getCmp('io_tot_vat1'))
														                       				Ext.getCmp('io_tot_vat1').hide();
													                       				
													                       			}
												                            	}
								                       						}
								        							}
									           			 }
						                	]
							           	},
					                    {
			                    			xtype: 'container',
			                    			margin: '5 0 0 0',
					                    	layout: {
										        type: 'hbox',
										        align: 'stretch'
										    },
										    items:[
											    { xtype: 'textfield', name: 'io_tr_cd', fieldLabel: '거래처', tabIndex:3, width:120, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
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
							                                    	Ext.select('*[name=io_bigo]').focus();
							                                    }
							                                }
							                            }
							                        }
							                    },		
						                		{ 	xtype: 'combobox',
						                			id: 'menu19_tr_nm_field',
						                			width:192,
						                			tabIndex:4,
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
								                            		Ext.select('*[name=io_bigo]').focus();	
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
							                                    	Ext.select('*[name=io_bigo]').focus();
							                                    }
							                                }
							                            }
						                            }
											    },		
						                		{ xtype: 'button', text:'주문서 가져오기', margin: '0 0 0 22',
							                		listeners:{
							                			click:{
							                				fn: me.getOrderList,
							                				scope: me
							                			}
							                		}
						                		}
						                	]
							           	},
							            {
			                    			xtype: 'container',
			                    			margin: '5 0 0 0',
					                    	layout: {
										        type: 'hbox',
										        align: 'stretch'
										    },
										    items:[
				                                {
		                                            xtype: 'radiogroup',
		                                            tabIndex:4,
		                                            width:320, 
		                                            defaults: {
		                                                name: 'io_cash'
		                                            },
		                                            fieldLabel: '대금결제',
		                                            labelSeparator: '',
		                                            labelWidth: 55,
		                                            items: [
		                                                { boxLabel: '현금', inputValue: 1,  checked: true },
		                                                { boxLabel: '외상', inputValue: 2 },
		                                                { boxLabel: '예금', inputValue: 3 },
		                                                { boxLabel: '카드', inputValue: 4 }
		                                                //{ boxLabel: '자체생산', inputValue: 5 }
		                                            ],
		                                             listeners: {
										                change: {
										                    fn: function(field, newValue, oldValue, eOpts) {
										                    	var nextTar = this.next();
										                    	if(newValue.io_cash == 3 || newValue.io_cash == 4) nextTar.show();
										                    	else nextTar.hide();
										             			/*       	
										                    	var trField = this.up().prev().items.items[0];
										                    	if(newValue.io_cash == 5)
										                    	{
										                    		trField.setValue('');
										                    		trField.next().setValue('');
										                    		trField.setReadOnly(true);
										                    	} 
										                    	else trField.setReadOnly(false);
										                    	*/
										                    }
										                }
										            }
		                                       },
		                                       {
			                                       	xtype: 'container',
			                                       	hidden: true,
							                    	layout: {
												        type: 'hbox',
												        align: 'stretch'
												    },
												    items:[
				                                       { xtype: 'textfield', name: 'io_pay_customer_id', fieldLabel: '예금/카드거래처', tabIndex:5, width:180, labelSeparator: '', labelWidth: 110, selectOnFocus: true,
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
									                                    	Ext.select('*[name=io_bigo]').focus();
									                                    }
									                                }
									                            }
									                        }
									                    },		
								                		{ 	xtype: 'combobox',
								                			id: 'menu19_card_field',
								                			width:102,
								                			tabIndex:5,
								                			margin: '0 0 0 5',
								                			emptyText: '거래처명 검색',
								                			store: StoreInfo.Menu09_Grid,
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
										                            		Ext.select('*[name=io_bigo]').focus();	
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
									                                    	Ext.select('*[name=io_bigo]').focus();
									                                    }
									                                }
									                            }
								                            }
													    }
								                	]
								                }
	                          				]
		                          		},
		                          		{
			                    			xtype: 'container',
			                    			margin: '5 0 0 0',
					                    	layout: {
										        type: 'hbox',
										        align: 'stretch'
										    },
										    items:[
											    {
						                			xtype: 'textfield',
						                			name: 'io_bigo',
						                			tabIndex:6,
						                			fieldLabel: '비고',
						                			selectOnFocus: true,
										            maxLength : 45,
						                			width:317,
						                			labelSeparator: '',
						                			labelWidth: 60
			            						},
			            						{
		                                            xtype: 'radiogroup',
		                                            tabIndex:7,
		                                            width:210, 
		                                            defaults: {
		                                                name: 'print_type'
		                                            },
		                                            fieldLabel: '거래명세서 유형',
		                                            labelSeparator: '',
		                                            labelAlign:'right',
		                                            labelWidth: 110,
		                                            items: [
		                                                { boxLabel: '1장', inputValue: 1, checked: true },
		                                                { boxLabel: '2장', inputValue: 2 }
		                                            ],
		                                             listeners: {
										                change: {
										                    fn: function(field, newValue, oldValue, eOpts) {
										                    }
										                }
										            }
										        }
										    ]
										},
										{
						                	xtype:'container',
						                	layout:{
						                		type:'hbox',
						                		align: 'middle'
						                	},
						                	style:'margin-top:5px;margin-bottom:5px;',
						                	items:[
						                		{
						                			xtype: 'textfield',
						                			name: 'parcel_com',
						                			tabIndex:8,
						                			fieldLabel: '택배사',
						                			selectOnFocus: true,
						                			width:150,
						                			labelSeparator: '',
						                			labelWidth: 60
						                		},
						                		{
						                			xtype: 'textfield',
						                			name: 'parcel_no',
						                			tabIndex:8,
						                			fieldLabel: '송장번호',
						                			labelAlign:'right',
						                			selectOnFocus: true,
						                			labelAlign:'right',
						                			width:167,
						                			labelSeparator: '',
						                			labelWidth: 60
					                			}
						                	]
					                	}
	                          		]
				               },
				               {
				                    xtype: 'gridpanel',
				                    cls:'grid',
				                    id:'Menu19_Grid2',
				                    flex:1,
				                    autoScroll:true,
				                    store: StoreInfo.Menu19_Grid2,
				                    viewConfig: {
									    getRowClass: function(record, rowIndex, rowParams, store){
									    	var cls = "row-valid";
									    	var rec = record.get('jumun_no');
								        	if( rec == '0' || rec == '') cls = "row-valid";
								        	else cls = "row-dis";
									    	return cls;
									    }
									},
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'io_item_cd',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '코드',
				                            align:'center',
								            width: 50,
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu24_Grid,
											    autoSelect: false,
											    minChars: 1,
											    selectOnFocus: true,
											    hideTrigger: true,  
											    queryMode: 'local',
											    displayField: 'item_nm',
											    valueField: 'item_cd',
											    enableKeyEvents : true,
											    listeners: {
											    	focus: {
						                                fn: function(field, e, options) {
						                                	field.lastSelection = [];
						                                }
						                            },
											    	keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Items_Output');
						                                    	var grid = Ext.getCmp('Menu19_Grid2'); 
						                                    	grid.getPlugin().cancelEdit();
						                                    	pop.grid = grid;
						                                    	pop.type = 'io',
						                                    	pop.record = grid.getSelectionModel().getSelection()[0];
						                                    	Global.openPopup(pop);
						                                    	return false;
						                                    }
						                                }
						                            },
					                                specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	field.clearInvalid();
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
					                            }
											})
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'io_item_nm',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '상품명',
								            width: 100
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'io_item_qty',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '규격',
								            width: 60
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'io_item_danwi',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '단위',
								            width: 60
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'io_su',
				                            width: 50,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            format:'0,000',
				                            text: '수량',
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'io_dan',
				                            style: 'text-align:center',
				                            sortable: false,
				                            align: 'right',
				                            format:'0,000',
				                            text: '단가',
				                            width: 90,
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
				                				enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                	
						                                    if(e.getKey()==13){
						                                    	//console.log(e);
						                                    	Global.isEnter = true;
						                                    }
						                                    if(e.getKey() == Ext.EventObject.TAB){
						                                    	Ext.Msg.alert("알림", '이동시 Enter키를 눌러주세요.');
						                                    	//console.log(e);
						                                    	//e.button = 12;
						                                    	//e.keyCode = 13;
						                                    	//Global.isEnter = true;
						                                    	/*
						                                    	var movePos = null;	//다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
						                                    	
						                                    	if(e.field == 'io_item_cd')
						                                    	{
						                                    		if(!e.value)
						                                    		{
						                                    			    e.record.set('io_item_cd', '');
						                                    				e.record.set('io_item_nm', '');
						                                    				e.record.set('io_item_qty', '');
						                                    				e.record.set('io_item_danwi', '');
						                                    				e.record.set('io_su', '');
						                                    				e.record.set('io_dan', '');
						                                    				e.record.set('io_amt', '');
						                                    				e.record.set('io_rem', '');
						                                    		}
						                                    		else
						                                    		{
						                                    			var code = Ext.String.leftPad(e.value, 5, '0');
						                                	    		var codeRecord = StoreInfo.Menu24_Grid.findRecord('item_cd', code, null, null, null, true);
						                                	    		if(!codeRecord)
						                                	    		{
						                                	    			if(e.value == '')
						                                	    			{
						                                	    				e.record.set('io_item_cd', '');
						                                	    				e.record.set('io_item_nm', '');
						                                	    				e.record.set('io_item_qty', '');
						                                	    				e.record.set('io_item_danwi', '');
						                                	    				e.record.set('io_su', '');
						                                	    				e.record.set('io_dan', '');
						                                	    				e.record.set('io_amt', '');
						                                	    				e.record.set('io_rem', '');
						                                	    			} 
						                                	    			else e.record.set('io_item_cd', e.originalValue); 
						                                	    		}
						                                	    		else
						                                	    		{
						                                	    			if( code != e.originalValue )
						                                	    			{
						                                						e.record.set('io_item_cd', codeRecord.get('item_cd'));
						                                						e.record.set('io_item_nm', codeRecord.get('item_nm'));
						                                						e.record.set('io_item_qty', codeRecord.get('item_qty'));
						                                						e.record.set('io_item_danwi', codeRecord.get('item_danwi'));
						                                						e.record.set('io_su', '');
						                                						e.record.set('io_dan', codeRecord.get('item_out_danga'));
						                                						e.record.set('io_amt', '');
						                                						e.record.set('io_rem', '');    				
						                                	    			}
						                                	    			else e.record.set('io_item_cd', e.originalValue);
						                                	    		}
						                                    		}
						                                    	}
						                                    	else if(e.field == 'io_su' || e.field == 'io_dan')
						                                    	{
						                                    		var su = 0; 
						                                    		var danga = 0; 
						                                    		
						                                    		if(e.record.get('io_su').replace) su = Number(e.record.get('io_su').replace(',',''));
						                                   			else su += e.record.get('io_su');
						                                    		
						                                    		if(e.record.get('io_dan').replace) danga = Number(e.record.get('io_dan').replace(',',''));
						                                   			else danga += e.record.get('io_dan');
						                                    		
						                                    		if(isNaN(su) || isNaN(danga) || su ==0 || danga == 0) e.record.set('io_amt', 0);
						                                    		else e.record.set('io_amt', su*danga);
						                                    	}
						                                    	
						                                    	//합계금액과 부가세에 금액 셋팅하기
						                                    	me.sumTotal();
						                                    	
						                                    	
						                                    	console.log(field);
						                                    	
					                                        	//extjs4.2에서의 e.colIdx와 4.2 미만 버전의 e.colIdx는 1씩 차이가남
					                                    		if(e.grid.columns.length == e.colIdx){
					                                    			
					                                				if(e.grid.getStore().getCount() == (e.rowIdx+1))
					                                				{
					                                					Ext.getCmp('Menu19_Grid2').getStore().insert(e.rowIdx+1, new Object());	
					                                				}
					                                    			movePos = {row: e.rowIdx+1, column: 1};
					                                    		} 
					                                    		else
					                                    		{
					                                    			if(e.field == 'io_item_cd') movePos = {row: e.rowIdx, column: e.colIdx+4};
					                                    			else movePos = {row: e.rowIdx, column: e.colIdx+1};
					                                    		} 
					                                    		//field.startEditByPosition(movePos);
					                                    		
					                                    		field.startEditByPosition({row: e.rowIdx, column: e.colIdx+1});
						                                    	*/
						                                    	
						                                    	return false;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'io_amt',
				                            style: 'text-align:center',
				                            sortable: false,
				                            align: 'right',
				                            format:'0,000',
				                            text: '금액',
				                            width: 90,
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
				                				enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'io_rem',
				                            style: 'text-align:center',
				                            sortable: false,
				                            minWidth: 200,
				                            flex:1,
				                            text: '적요',
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
				                				enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        }
				                    ],
				                    selModel: Ext.create('Ext.selection.CheckboxModel', {
				                    	pruneRemoved: false,
				                    	checkOnly: true,
				                		mode: 'MULTI' 
				                    }),
				                    plugins: [Ext.create('Ext.grid.plugin.CellEditing',         
									{             
									    clicksToEdit: 1,
								        listeners: {
								        	beforeedit:{
								        		fn: function(editor, e, eOpts){
								        			var rec = e.record.get('jumun_no');
								        			if( rec == '0' || rec == '') return true;
								        			else return false;
								        		} 
							              	},
								            edit:{
								        		fn: me.onAfterEditCheck,
								        		scope: me 
							              	},
							              	canceledit: function (editor, e, eOpts) {
										    	Global.cellPos = {row: e.rowIdx, column: e.colIdx};
										    } 
								        }         
									})],
						    		dockedItems: [
										{
											xtype: 'toolbar',
											layout: {
				                                type: 'hbox'
				                            },
											dock: 'bottom',
											items: [
												{
								               		xtype:'textfield',
								               		width: 300,
								               		value: '반품일경우 수량을 (-)로 입력합니다.',
								               		cls:'bottomChild',
								               		readOnly : true
								               	},
												{
								               		xtype: 'textfield', 
								               		margin: '0 0 0 80',
								               		id: 'io_tot_am1',
								               		fieldLabel: '합계금액',
								               		width: 150,
								               		labelAlign:'right',
								               		readOnly: true,
								               		labelSeparator: '',
								               		labelWidth: 50,
								               		labelCls: 'toolbar_label_tot',
								               		fieldCls: 'toolbar_field_tot',
								               		cls:'bottomChild'
								              	},
												{
								               		xtype: 'textfield', 
								               		margin: '0 0 0 20',
								               		id: 'io_tot_vat1',
								               		hidden:true,
								               		fieldLabel: '부가세',
								               		width: 140,
								               		labelAlign:'right',
								               		labelSeparator: '',
								               		labelWidth: 40,
								               		labelCls: 'toolbar_label_vat',
								               		fieldCls: 'toolbar_field_vat',
								               		cls:'bottomChild',
								               		listeners: {
														change: Global.formatAm
													}
								             	}
											]
										}
									],
				                    listeners: {
				                        celldblclick: {
				                            fn: me.onGridpanelCellDblClick,
				                            scope: me
				                        }
				                    }
				                }
			               	]
		              	}
				    ]
               },
               {
					xtype: 'container',
                    layout: {
				        align: 'middle',
				        type: 'hbox'
				    },
                    cls:'bottomBar',
                    items: [
		               	{
		               		xtype:'label',
		               		flex:1
		               	},
		               	{
		               		xtype:'button',
		               		text: '1장 인쇄',
		               		cls:'bottomChild',
		               		listeners: {
	                            click: {
                                    fn: me.onMenu19_1page_print,
                                    scope: me
                                }
	                        }
		               	},
		               	{
		               		xtype:'button',
		               		text: '2장 인쇄',
		               		cls:'bottomChild',
		               		listeners: {
	                            click: {
                                    fn: me.onMenu19_2page_print,
                                    scope: me
                                }
	                        }
		               	},
		               	{
		               		xtype:'button',
		               		text: '추가',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: me.resetData,
                                    scope: me
                                }
                            }
		               	},
		               	{
		               		xtype:'button',
		               		text: '저장',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: me.onRegisterCode,
                                    scope: me
                                }
                            }
		               	},
		               	{
		               		xtype:'button',
		               		text: '삭제',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: me.onDeleteCode,
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
                }
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//

//화면이 처음 보여질시 셋팅    
    onContainerAfterRender: function(component, eOpts) {
    	var now = new Date();
    	Ext.getCmp('menu19_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu19_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		this.form = this.query('form')[0];
		Global.settingTax();
		this.tempRowInit();
		this.onMenu19_SearchBtnClick();
    },
    
    tempRowInit: function(isRemove)
    {
    	var store = StoreInfo.Menu19_Grid2;
    	var strCnt = store.getCount(); 
    	var now = new Date();
    	if(strCnt < 1) store.add(new Object());
    	else
    	{
    		if(store.last().get('io_item_cd')) store.add(new Object());
    	}
    	if(!isRemove) store.commitChanges();
    },
    
    //데이터 초기화
    resetData: function(){
    	this.form = this.query('form')[0];
    	this.form.setDisabled(false);
    	this.isModify = true;
    	this.form.getForm().reset(true);
    	//this.query('[name=io_tr_cd]')[0].setReadOnly(true);
    	this.form.record = null;
    	this.form.query('[xtype=datefield]')[0].setReadOnly(false);
    	StoreInfo.Menu19_Grid2.removeAll();
    	Ext.getCmp('io_tot_am1').setValue('0');
    	this.form.query('[xtype=textfield]')[1].focus();
    	this.tempRowInit();
   	},
   	
    //그리드 상세데이터를 수정한 후 체크로직
	onAfterEditCheck: function (editor, e, eOpts) {
		
		console.log(editor);
		console.log(e);
		console.log(eOpts);
    	var movePos = null;	//다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
    	
    	if(e.field == 'io_item_cd')
    	{
    		if(!e.value)
    		{
    			    e.record.set('io_item_cd', '');
    				e.record.set('io_item_nm', '');
    				e.record.set('io_item_qty', '');
    				e.record.set('io_item_danwi', '');
    				e.record.set('io_su', '');
    				e.record.set('io_dan', '');
    				e.record.set('io_amt', '');
    				e.record.set('io_rem', '');
    		}
    		else
    		{
    			var code = Ext.String.leftPad(e.value, 5, '0');
	    		var codeRecord = StoreInfo.Menu24_Grid.findRecord('item_cd', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			if(e.value == '')
	    			{
	    				e.record.set('io_item_cd', '');
	    				e.record.set('io_item_nm', '');
	    				e.record.set('io_item_qty', '');
	    				e.record.set('io_item_danwi', '');
	    				e.record.set('io_su', '');
	    				e.record.set('io_dan', '');
	    				e.record.set('io_amt', '');
	    				e.record.set('io_rem', '');
	    			} 
	    			else e.record.set('io_item_cd', e.originalValue); 
	    		}
	    		else
	    		{
	    			if( code != e.originalValue )
	    			{
						e.record.set('io_item_cd', codeRecord.get('item_cd'));
						e.record.set('io_item_nm', codeRecord.get('item_nm'));
						e.record.set('io_item_qty', codeRecord.get('item_qty'));
						e.record.set('io_item_danwi', codeRecord.get('item_danwi'));
						e.record.set('io_su', '');
						e.record.set('io_dan', codeRecord.get('item_out_danga'));
						e.record.set('io_amt', '');
						e.record.set('io_rem', '');    				
	    			}
	    			else e.record.set('io_item_cd', e.originalValue);
	    		}
    		}
    	}
    	else if(e.field == 'io_su' || e.field == 'io_dan')
    	{
    		var su = 0; 
    		var danga = 0; 
    		
    		if(e.record.get('io_su').replace) su = Number(e.record.get('io_su').replace(',',''));
   			else su += e.record.get('io_su');
    		
    		if(e.record.get('io_dan').replace) danga = Number(e.record.get('io_dan').replace(',',''));
   			else danga += e.record.get('io_dan');
    		
    		if(isNaN(su) || isNaN(danga) || su ==0 || danga == 0) e.record.set('io_amt', 0);
    		else e.record.set('io_amt', su*danga);
    	}
    	
    	//합계금액과 부가세에 금액 셋팅하기
    	this.sumTotal();
    	
		//1. 금액입력을 완료했을때 줄바꾸면서 column: 1부터 다시 에디트 포커스 주기		      
        if(Global.isEnter)
        {
        	//extjs4.2에서의 e.colIdx와 4.2 미만 버전의 e.colIdx는 1씩 차이가남
    		if(e.grid.columns.length == e.colIdx){
    			
				if(e.grid.getStore().getCount() == (e.rowIdx+1))
				{
					Ext.getCmp('Menu19_Grid2').getStore().insert(e.rowIdx+1, new Object());	
				}
    			movePos = {row: e.rowIdx+1, column: 1};
    		} 
    		else
    		{
    			if(e.field == 'io_item_cd') movePos = {row: e.rowIdx, column: e.colIdx+4};
    			else movePos = {row: e.rowIdx, column: e.colIdx+1};
    		} 
        	editor.startEditByPosition(movePos);
        } 
        Global.isEnter = false;
        return true;
   	},
   	
   	
   	//합계금액과 부가세 셋팅하기
   	sumTotal: function()
   	{
   		var sumAm = 0;
   		StoreInfo.Menu19_Grid2.each(function(record, i){
   			if(record.data.io_amt.replace) sumAm += Number(record.data.io_amt.replace(/,/g,''));
   			else sumAm += record.data.io_amt;
    	});
   		
   		Ext.getCmp('io_tot_am1').setValue( Ext.util.Format.number(sumAm, '0,000'));
   		Ext.getCmp('io_tot_vat1').setValue( Ext.util.Format.number((sumAm*0.1), '0,000'));
   	},
   	
   	//거래처 주문서 가져오기
   	getOrderList: function(button, e, eOpts) {
   		var thisObj = this;
   		var trVal = this.query('[name=io_tr_cd]')[0].getValue();
   		if(trVal)
   		{
   			Global.showMask(Ext.getBody());
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/output/output_jumun_proc.php',
				params: {
					jumun_tr_cd: trVal 
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						StoreInfo.OrderList.removeAll();
						StoreInfo.OrderList.add(json.DATA);
						var pop = Ext.create('Common_Pop_Order');
						pop.outview = thisObj;
                    	Global.openPopup(pop);
					}
					else{
						Ext.Msg.alert("", '호출 실패 :'+json.DATA);
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
				}
			});
   		}
   		else Ext.Msg.alert("", '거래처를 입력해주세요.');
    },
    
    //조회버튼을 눌렀을 경우
    onMenu19_SearchBtnClick: function(button, e, eOpts) {
		
		var thisObj = this;
		var fromDt = Ext.getCmp('menu19_date_str').getValue();
		var toDt = Ext.getCmp('menu19_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		Global.showMask(Ext.getBody());
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/output/output_m_list_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu19_Grid1.removeAll();
					StoreInfo.Menu19_Grid1.add(json.DATA);
					thisObj.isModify = true;
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
    
     //1장 인쇄를 눌렀을때
    onMenu19_1page_print : function(button, e, eOpts) {
    	
    	/*
    	Printer_Val_Output = [];
    	Printer_Val_BASIC.total_amt = 0;
    	
		StoreInfo.Menu19_Grid2.each(function(record, i){
			Printer_Val_Output[i] = record.data;
			Printer_Val_BASIC.total_amt += record.data.io_amt;
			
			Printer_Val_Output[i].io_amt = Ext.util.Format.number(record.data.io_amt, '0,000');
			Printer_Val_Output[i].io_dan = Ext.util.Format.number(record.data.io_dan, '0,000');
			
    	});
    	console.log(Printer_Val_BASIC);
    	Printer_Val_BASIC.total_amt = Ext.util.Format.number(Printer_Val_BASIC.total_amt, '0,000');
    	*/
    	
    	if(!Printer_Val_Output||Printer_Val_Output.length<2) 
    	{
    		alert('출고 데이터를 선택해주세요.');
    		return;
    	}
    	
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/output/output_print_page.php',
			params: { },
			success: function(response, opts) {
				var json = Ext.JSON.decode(response.responseText);
				console.log(json.DATA); 
				Printer_Val = json.DATA; 
				//window.open("./extjs/print/print_output_type1.html", "", "width=680, height=800, toolbar=no, menubar=no, scrollbars=yes, location=no" );
				window.open("./extjs/print/output/print_out_type1_output.html", "", "width=680, height=800, toolbar=no, menubar=no, scrollbars=yes, location=no" );
			},
			failure: function(form, action) {
				Ext.Msg.alert("", '출고 인쇄를 위한 데이터를 가져오는데 실패했습니다.');
			}
		});
    },
    
     //2장 인쇄를 눌렀을때
    onMenu19_2page_print : function(button, e, eOpts) {
    	
    	/*
    	Printer_Val_Output = [];
    	Printer_Val_BASIC.total_amt = 0;
    	
		StoreInfo.Menu19_Grid2.each(function(record, i){
			Printer_Val_Output[i] = record.data;
			Printer_Val_BASIC.total_amt += record.data.io_amt;
			
			Printer_Val_Output[i].io_amt = Ext.util.Format.number(record.data.io_amt, '0,000');
			Printer_Val_Output[i].io_dan = Ext.util.Format.number(record.data.io_dan, '0,000');
			
			
    	});
    	console.log(Printer_Val_BASIC);
    	Printer_Val_BASIC.total_amt = Ext.util.Format.number(Printer_Val_BASIC.total_amt, '0,000');
    	*/
    	
    	if(!Printer_Val_Output||Printer_Val_Output.length<2) 
    	{
    		alert('출고 데이터를 선택해주세요.');
    		return;
    	}
    	
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/output/output_print_page.php',
			params: { },
			success: function(response, opts) {
				var json = Ext.JSON.decode(response.responseText);
				console.log(json.DATA); 
				Printer_Val = json.DATA; 
				//window.open("./extjs/print/print_output_type2.html", "", "width=720, height=800, toolbar=no, menubar=no, scrollbars=yes, location=no" );
				window.open("./extjs/print/output/print_out_type2_output.html", "", "width=720, height=800, toolbar=no, menubar=no, scrollbars=yes, location=no" );
			},
			failure: function(form, action) {
				Ext.Msg.alert("", '출고 인쇄를 위한 데이터를 가져오는데 실패했습니다.');
			}
		});
    },
    
    
    //주문 헤더에 대한 상세 정보 호출
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	
		var thisObj = this;
		this.form.getForm().reset(true);
    	this.form.getForm().loadRecord(record);
    	this.form.record = record;
    	this.form.query('[xtype=datefield]')[0].setReadOnly(true);
    	var io_rec = StoreInfo.Menu09_Grid.findRecord('customer_id', record.get('io_tr_cd'), null, null, null, true);
    	var trNm = ''; 
    	if(io_rec) trNm = io_rec.data.tr_nm;
    	Ext.getCmp('menu19_tr_nm_field').setValue(trNm);
    	
    	var io_rec = StoreInfo.Menu09_Grid.findRecord('customer_id', record.get('io_pay_customer_id'), null, null, null, true);
    	var trNm = '';
    	if(io_rec) trNm = io_rec.data.tr_nm;
    	Ext.getCmp('menu19_card_field').setValue(trNm);
    	
    	Ext.getCmp('io_tot_am1').setValue( Ext.util.Format.number(record.get('io_tamt'), '0,000'));
   		Ext.getCmp('io_tot_vat1').setValue( Ext.util.Format.number(record.get('io_tax'), '0,000'));
    	
    	this.form.form.setValues({
    		io_tax_gubun: StoreInfo.TAX_KBN.findRecord('tax_cd', record.get('io_tax_gubun'), null, null, null, true)
    	});
    	
		Global.showMask(Ext.getBody());
		
        //프린터값
		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', record.get('io_tr_cd'), null, null, null, true);
        if(codeRecord) {
        	Printer_Val_BASIC.co_nm = codeRecord.get('tr_nm');
        	Printer_Val_BASIC.io_tr_cd = codeRecord.get('tr_saup_no');
        	Printer_Val_BASIC.co_addr = codeRecord.get('tr_addr');
        	Printer_Val_BASIC.co_jung = codeRecord.get('tr_jong');
        	Printer_Val_BASIC.co_ceo_nm = codeRecord.get('tr_daepyo');
        	Printer_Val_BASIC.co_up = codeRecord.get('tr_up');
        }
        else {
        	Printer_Val_BASIC.co_nm = '자체생산';
        	Printer_Val_BASIC.io_tr_cd = '';
        }
       
		Printer_Val_BASIC.io_dt = record.get('io_dt');  
		console.log(record.get('io_dt'));
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/output/output_d_list_proc.php',
			params: {
				io_dt: record.get('io_dt').replace(/-/g,""),
				io_no: record.get('io_no')
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu19_Grid2.removeAll();
					StoreInfo.Menu19_Grid2.add(json.DATA);
					(thisObj.isModifyCheck()) ?  thisObj.enablePage() : thisObj.disablePage(); 
					
					//프린터 내용 세팅
					Printer_Val_Output = [];
			    	Printer_Val_BASIC.total_amt = 0;
			    	
					StoreInfo.Menu19_Grid2.each(function(record, i){
						Printer_Val_Output[i] = record.data;
						Printer_Val_BASIC.total_amt += record.data.io_amt;
						
						Printer_Val_Output[i].io_amt = Ext.util.Format.number(record.data.io_amt, '0,000');
						Printer_Val_Output[i].io_dan = Ext.util.Format.number(record.data.io_dan, '0,000');
						
			    	});
			    	
			    	Printer_Val_BASIC.total_amt = Ext.util.Format.number(Printer_Val_BASIC.total_amt, '0,000');
			    	
			    	console.log(Printer_Val_BASIC);
			    	console.log(Printer_Val_Output);
			    	
			    	Ext.getCmp('io_tot_am1').setValue( Printer_Val_BASIC.total_amt);
			   		Ext.getCmp('io_tot_vat1').setValue( Ext.util.Format.number((Printer_Val_BASIC.total_amt*0.1), '0,000'));
			   		
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
	
	
	//수정/삭제불가 체크    
    isModifyCheck: function(){
    	var thisObj = this;
    	this.isModify = true;
    	/*
    	StoreInfo.Menu19_Grid2.each(function(record, i){
    		if(record.get('io_no')) thisObj.isModify = false;
    	});
    	*/
    	return thisObj.isModify; 
    },
    
    //수정 및 삭제 안되는 상태 만들기
    disablePage: function(){
		this.form.setDisabled(true);
    },
    
    //수정 및 삭제 가능 상태 만들기
    enablePage: function(){
    	this.form.setDisabled(false);
    	this.tempRowInit();
    },
    
    //저장하는 로직
    onRegisterCode: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	if(this.isModify)
    	{
    		var selRecord = this.form.record;
    		var values = thisObj.form.getForm().getValues();
    		/*
    		if(values.io_tr_cd)
    		{
    		*/
    			var detailArr = [];
				var modiArr = StoreInfo.Menu19_Grid2.getModifiedRecords();
				modiArr = Global.sortModelArr(modiArr);
				var len =  modiArr.length;
		    	for(var i=0; i<len; i++)
				{
					var record = modiArr[i];
					if(record.get('io_item_cd'))
					{
						detailArr.push({
							'io_item_cd': record.get('io_item_cd'),
							'io_seq': record.get('io_seq'),
							'io_su': record.get('io_su'),
							'io_dan': record.get('io_dan'),
							'io_amt': record.get('io_amt'),
							'io_rem': record.get('io_rem'),
							'jumun_dt': record.get('jumun_dt'),
							'jumun_no': record.get('jumun_no'),
							'jumun_seq': record.get('jumun_seq'),
							'row_idx': StoreInfo.Menu19_Grid2.indexOf(record)
						});		
					} 
				}
				
				if(detailArr.length > 0 || selRecord)
				{
					values['io_dt'] = values.io_dt.replace(/-/g,"");
					values['io_tamt'] = parseInt(Ext.getCmp('io_tot_am1').getValue().replace(/,/g,""), 10);
					if (values['io_tamt'] == null || values['io_tamt'] == undefined || values['io_tamt'] == 0) {
					    Ext.Msg.alert('알림', '합계금액이 없습니다. 다시 확인해주세요.');
					    return;
					}
					if(values.io_tax_gubun == 1 || values.io_tax_gubun == 4)
					{
						values['io_tax'] = parseInt(Ext.getCmp('io_tot_vat1').getValue().replace(/,/g,""), 10);
					}
					else values['io_tax'] = '';
					if(selRecord)
					{
						values['io_no'] = selRecord.get('io_no');
						values['jp_no'] = selRecord.get('jp_no');
					} 
					values['data'] = JSON.stringify(detailArr);
					
					Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/output/output_register_proc.php',
						params: values,
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								values['io_no'] = json.DATA.io_no; 
								values['jp_no'] = json.DATA.jp_no;
								thisObj.sucessRowHeadAdd(values, selRecord, detailArr, json.DATA.seq);
							}
							else{
								Ext.Msg.alert("", '저장 실패 :'+json.DATA);
							}
						},
						failure: function(form, action) {
							Global.hideMask();
							Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
						}
					});
				}
			/*
    		}
    		else Ext.Msg.alert("", '거래처는 필수입력입니다.');
    		*/
    	}
    	else Ext.Msg.alert("", '출고등록이 완료된 내역은 수정할 수 없습니다.');
    },
    
    //저장 성공시 헤더 그리드에 데이터 추가
    sucessRowHeadAdd: function(values, selRecord, detailArr, seqObj){
    	
    	//selRecord가 있으면 수정, 없으면 신규
    	for(var i=0; i<detailArr.length; i++)
    	{
    		var idx = detailArr[i].row_idx;
    		var detailRec = StoreInfo.Menu19_Grid2.getAt(idx);
    		detailRec.set('io_seq', seqObj[idx]);
    		StoreInfo.Menu19_Grid2.commitChanges();
    	}
    	
    	if(selRecord){
    		selRecord.set(values);
    		selRecord.commit();
    		Ext.Msg.alert("", '수정되었습니다.');
    	}
    	else
    	{
    		var insertRec = StoreInfo.Menu19_Grid1.add(values);
    		this.form.record = insertRec[0];
    		this.form.getForm().setValues({
				'io_no': values.io_no
			});
    		StoreInfo.Menu19_Grid1.sort('io_dt', 'ASC');
    		this.resetData();
    		Ext.Msg.alert("", '저장되었습니다.');
    	} 
    },
    
    //삭제하는 로직
    onDeleteCode: function(button, e, eOpts) {
    	
    	if(this.isModify)
    	{
	    	var thisObj = this;
	    	var store = StoreInfo.Menu19_Grid2;
	    	var selRecord = this.form.record;
    		var values = thisObj.form.getForm().getValues();
	    	var selRecArr = Ext.getCmp('Menu19_Grid2').getSelectionModel().getSelection();
	    	selRecArr = Global.sortModelArr(selRecArr);
	    	
	    	var modiArr = StoreInfo.Menu19_Grid2.getModifiedRecords();
	    	
	    	var len = selRecArr.length;
	    	
	    	if(!selRecord)
	    	{
    			for(var i=0; i<selRecArr.length; i++)
		    	{
		    		StoreInfo.Menu19_Grid2.remove(selRecArr[i]);
		    	}
		    	this.tempRowInit(true);
		    	this.sumTotal();
	    	}
	    	else
	    	{
	    		if(modiArr.length > 0)
		    	{
		    		Ext.Msg.alert("경고!", '작성중인 데이터가 있습니다.</br></br>작성중인 데이터 저장후 삭제 가능합니다.');
		    		return;
		    	}
		    	
		    	if(len > 0)
		    	{
		    		var detailArr = [];
		    		Ext.MessageBox.confirm('경고!', '선택한 정보를 삭제하시겠습니까?', function(btn){
			            if(btn=='yes'){
			            	
			            	for(var i=0; i<len; i++)
					    	{
					    		var record = selRecArr[i];
					    		if(record.get('io_item_cd'))
					    		{
									detailArr.push({
										"io_seq": record.get('io_seq'),
										"io_amt": record.get('io_amt'),
										"row_idx": record.get('io_seq'),
										'jumun_dt': record.get('jumun_dt'),
										'jumun_no': record.get('jumun_no'),
										'jumun_seq': record.get('jumun_seq')
									});  
					    		}
					    	}
					    	values['io_dt'] = values.io_dt.replace(/-/g,"");
							values['io_tamt'] = parseInt(Ext.getCmp('io_tot_am1').getValue().replace(/,/g,""), 10);
							values['jp_no'] = thisObj.form.record.get('jp_no');
							values['io_no'] = thisObj.form.record.get('io_no');
							values['data'] = JSON.stringify(detailArr);
							
					    	Global.showMask(Ext.getBody());
							Ext.Ajax.request({
								method: 'POST',
								url: './proc/account/output/output_delete_proc.php',
								params: values,
								success: function(response, opts) {
									Global.hideMask();
									var json = Ext.JSON.decode(response.responseText);
									if(json.CODE == '00'){
										thisObj.sucessRowDelete(json.DATA, values, selRecord);
									}
									else{
										Ext.Msg.alert("", '삭제 실패! '+json.DATA);
									}
								},
								failure: function(form, action) {
									Global.hideMask();
									Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
								}
							});	
			            }
			        });
		    	}
		    	else Ext.Msg.alert("", '삭제할 정보를 선택해주세요.');	
	    	}
    	}
    	else Ext.Msg.alert("", '이 주문서는 이미 출고가 완료되었습니다.</br></br>출고가 완료된 주문내역은 수정할 수 없습니다.');
    },
    
    //삭제성공에 따른 클라이언트 그리드 로우 삭제
    sucessRowDelete: function(rowIdxArr, values, selRecord){
    	for(var i=0; i<rowIdxArr.length; i++)
    	{
    		var delRec = StoreInfo.Menu19_Grid2.findRecord("io_seq", rowIdxArr[i]);
    		if(delRec) StoreInfo.Menu19_Grid2.remove(delRec);
    	}
    	
    	var isHeaderRemove = true;
    	
    	StoreInfo.Menu19_Grid2.each(function(record, i){
    		if(record.get('io_item_cd')) isHeaderRemove = false;
    	});
    	
    	if(isHeaderRemove)
    	{
    		StoreInfo.Menu19_Grid1.remove(selRecord);
    		this.resetData();
    		Ext.Msg.alert("", '상세정보가 모두 삭제되어 해당 출고정보가 삭제되었습니다.');
    	}
    	else
    	{
    		this.sumTotal();
    		if(selRecord){
	    		selRecord.set(values);
	    		Ext.Msg.alert("", '상세정보의 삭제로 헤더정보가 수정되었습니다.');
	    	}	
    	}
    },
	    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(출고등록)', 'Menu19');
    }
    
});

