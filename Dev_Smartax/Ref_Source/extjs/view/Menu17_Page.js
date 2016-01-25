/* 매입/매출관리 - 주문등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu17_Page', {
    extend: 'Ext.container.Container',
    id:'Menu17_Page',
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
                            fieldLabel: '주문기간',
                            id:'menu17_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu17_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu17_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:170,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu17_SearchBtnClick();
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
                                    fn: me.onMenu17_SearchBtnClick,
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
		                    store: StoreInfo.Menu17_Grid1,
		                    columns: [
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'jumun_dt',
		                            align:'center',
		                            sortable: true,
		                            text: '주문일자',
		                            width: 80
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'jumun_tr_cd',
		                            style: 'text-align:center',
		                            flex:1,
		                            text: '거래처',
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var code = Ext.String.leftPad(value, 5, '0');
                        				var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                        				if(codeRecord) return codeRecord.get('tr_nm');
                        				else return '';
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
				                    id:'order_head',
				                    //disabledCls:'disfield',
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
											    { xtype: 'datefield', name: 'jumun_dt',  fieldLabel: '주문일자', tabIndex:1, width:317, labelSeparator: '', labelWidth: 60, format:'Y-m-d', selectOnFocus: true,
								                	enableKeyEvents : true,
								                	disabledCls:'disfield',
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
										        { xtype: 'hiddenfield', name:'jumun_no', width:70, readOnly: true, margin: '0 0 0 5' }
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
											    { xtype: 'textfield', name: 'jumun_tr_cd', fieldLabel: '거래처', tabIndex:3, width:120, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
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
							                                    	Ext.select('*[name=jumun_bigo]').focus();
							                                    }
							                                }
							                            }
							                        }
							                    },		
						                		{ 	xtype: 'combobox',
						                			id: 'menu17_tr_nm_field',
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
								                            		Ext.select('*[name=jumun_bigo]').focus();	
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
							                                    	Ext.select('*[name=jumun_bigo]').focus();
							                                    }
							                                }
							                            }
						                            }
											    }
						                	]
							           	},
		                          		{
	                                   		margin: '5 0 0 0',
				                			xtype: 'textfield',
				                			name: 'jumun_bigo',
				                			tabIndex:4,
				                			fieldLabel: '비고',
				                			selectOnFocus: true,
								            maxLength : 45,
				                			width:317,
				                			labelSeparator: '',
				                			labelWidth: 60
	            						},
	            						{
	            							xtype:'container',
	            							width: 497,
	            							height: 1,
	            							style:'background-color:gray;margin-top:5px;'
	            						},
	            						{
	            							xtype:'container',
	            							width: 497,
	            							height: 1,
	            							style:'background-color:#ffffff;margin-bottom:5px;'
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
						                			name:'jumun_man',
						                			fieldLabel: '받는분',
						                			tabIndex:5,
						                			selectOnFocus: true,
						                			width:150,
						                			labelSeparator: '',
						                			labelWidth: 60
						                			/*
						                			listeners:{
						                				blur:{
						                					fn: function(field, e, options) {
						                						var res = ValidateFunc.checkCode(field, 2, "0");
						                                    	if(!res) field.setValue('');
						                                    	else field.setValue(res);
						                					}
						                				},
						                				specialkey: {
							                                fn: function(field, e, options) {
							                                    if(e.getKey()==13){
							                                    	Ext.select('*[name=jakmok_name]').focus();
							                                    }
							                                }
							                            }
						                			}
						                			*/
						                		},
						                		{
						                			xtype: 'textfield',
						                			name:'junmun_call',
						                			fieldLabel: '전화번호',
						                			hidden:true,
						                			tabIndex:6,
						                			selectOnFocus: true,
						                			labelAlign:'right',
						                			width:182,
						                			labelSeparator: '',
						                			labelWidth: 80
					                			},
						                		{
						                			xtype: 'textfield',
						                			name:'junmun_hp',
						                			fieldLabel: '핸드폰',
						                			hidden:true,
						                			tabIndex:7,
						                			selectOnFocus: true,
						                			labelAlign:'right',
						                			width:165,
						                			labelSeparator: '',
						                			labelWidth: 60
					                			}
						                		
						                	]
					                	},
						                {
							                xtype:'container',
						                	layout:{
						                		type:'hbox',
						                		align: 'middle'
						                	},
						                	items:[
						                		{
								                	xtype:'container',
								                	layout:'hbox',
								                	items:[
								                		{ xtype: 'textfield', name: 'jumun_zip', fieldLabel: '우편번호', width:150, labelSeparator: '', labelWidth: 60, readOnly: true },
								                		{ xtype: 'button', text:'찾기', style:'margin-left:5px;',
								                			listeners: {
												                click: {
												                    fn: me.openZipSearch,
												                    scope: me
												                }
												            }
											            },
											            { xtype: 'textfield', name: 'jumun_addr', tabIndex:8, fieldLabel: '주소', labelAlign:'right', width:304, labelSeparator: '', labelWidth: 37,
										                	listeners:{
										        				specialkey: {
										                            fn: function(field, e, options) {
										                                if(e.getKey()==13){
										                                	this.next().focus();
										                                }
										                            }
										                        }
										        			}
										        		},
								                	]
								                }
						                	]
						                }
	                          		]
				               },
				               {
				                    xtype: 'gridpanel',
				                    cls:'grid',
				                    id:'Menu17_Grid2',
				                    flex:1,
				                    autoScroll:true,
				                    store: StoreInfo.Menu17_Grid2,
				                    viewConfig: {
									    getRowClass: function(record, rowIndex, rowParams, store){
									    	var cls = "row-valid";
									    	var type = record.get('type');
									    	if(type == 1) cls = "row-pre";
									    	else if(type == 2) cls = "row-month";
									    	else if(type == 3) cls = "row-sum";
									    	return cls;
									    }
									},
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jumun_item_cd',
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
						                                    	var grid = Ext.getCmp('Menu17_Grid2'); 
						                                    	grid.getPlugin().cancelEdit();
						                                    	pop.grid = grid;
						                                    	pop.type = 'jumun',
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
				                            dataIndex: 'jumun_item_nm',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '상품명',
								            width: 100
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jumun_item_qty',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '규격',
								            width: 60
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jumun_item_danwi',
				                            style: 'text-align:center',
				                            sortable: false,
				                            text: '단위',
								            width: 60
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'jumun_su',
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
				                            dataIndex: 'jumun_dan',
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
						                                    	Global.isEnter = true;
						                                    }
						                                    if(e.getKey() == Ext.EventObject.TAB){
						                                    	Ext.Msg.alert("알림", '이동시 Enter키를 눌러주세요.');
						                                    	return false;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'jumun_amt',
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
				                            dataIndex: 'jumun_rem',
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
								        		fn: function(){
								        			if(!me.isModify) return false;
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
								               		id: 'odr_tot_am',
								               		fieldLabel: '합계금액',
								               		width: 150,
								               		labelAlign:'right',
								               		readOnly: true,
								               		labelSeparator: '',
								               		labelWidth: 50,
								               		labelCls: 'toolbar_label_tot',
								               		fieldCls: 'toolbar_field_tot',
								               		cls:'bottomChild'
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
    	Ext.getCmp('menu17_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu17_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		this.form = this.query('form')[0];
		Global.settingTax();
		this.tempRowInit();
		this.onMenu17_SearchBtnClick();
    },
    
    tempRowInit: function(isRemove)
    {
    	var store = StoreInfo.Menu17_Grid2;
    	var strCnt = store.getCount(); 
    	var now = new Date();
    	if(strCnt < 1) store.add(new Object());
    	else
    	{
    		if(store.last().get('jumun_item_cd')) store.add(new Object());
    	}
    	if(!isRemove) store.commitChanges();
    },
    
    //데이터 초기화
    resetData: function(){
    	this.form = this.query('form')[0];
    	this.form.setDisabled(false);
    	this.isModify = true;
    	this.form.getForm().reset(true);
    	this.form.record = null;
    	this.form.query('[xtype=datefield]')[0].setReadOnly(false);
    	StoreInfo.Menu17_Grid2.removeAll();
    	Ext.getCmp('odr_tot_am').setValue('0');
    	this.form.query('[xtype=textfield]')[1].focus();
    	this.tempRowInit();
   	},
   	
    openZipSearch: function()
   	{
   		var zipPopup = Ext.create('Common_Pop_Zip');
   		zipPopup.formId = 'order_head';
   		zipPopup.zip = 'jumun_zip';
   		zipPopup.name = 'jumun_addr';
   		zipPopup.show();
   	},
    
    //그리드 상세데이터를 수정한 후 체크로직
	onAfterEditCheck: function (editor, e, eOpts) {
		
    	var movePos = null;	//다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
    	
    	if(e.field == 'jumun_item_cd')
    	{
    		if(!e.value)
    		{
    			e.record.set('jumun_item_cd', '');
				e.record.set('jumun_item_nm', '');
				e.record.set('jumun_item_qty', '');
				e.record.set('jumun_item_danwi', '');
				e.record.set('jumun_su', '');
				e.record.set('jumun_dan', '');
				e.record.set('jumun_amt', '');
				e.record.set('jumun_rem', '');
    		}
    		else
    		{
    			var code = Ext.String.leftPad(e.value, 5, '0');
	    		var codeRecord = StoreInfo.Menu24_Grid.findRecord('item_cd', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			if(e.value == '')
	    			{
	    				e.record.set('jumun_item_cd', '');
	    				e.record.set('jumun_item_nm', '');
	    				e.record.set('jumun_item_qty', '');
	    				e.record.set('jumun_item_danwi', '');
	    				e.record.set('jumun_su', '');
	    				e.record.set('jumun_dan', '');
	    				e.record.set('jumun_amt', '');
	    				e.record.set('jumun_rem', '');
	    			} 
	    			else e.record.set('jumun_item_cd', e.originalValue); 
	    		}
	    		else
	    		{
	    			if( code != e.originalValue )
	    			{
						e.record.set('jumun_item_cd', codeRecord.get('item_cd'));
						e.record.set('jumun_item_nm', codeRecord.get('item_nm'));
						e.record.set('jumun_item_qty', codeRecord.get('item_qty'));
						e.record.set('jumun_item_danwi', codeRecord.get('item_danwi'));
						e.record.set('jumun_su', '');
						e.record.set('jumun_dan', codeRecord.get('item_out_danga'));
						e.record.set('jumun_amt', '');
						e.record.set('jumun_rem', '');    				
	    			}
	    			else e.record.set('jumun_item_cd', e.originalValue);
	    		}
    		}
    	}
    	else if(e.field == 'jumun_su' || e.field == 'jumun_dan')
    	{
    		var su = parseInt(e.record.get('jumun_su'), 10); 
    		var danga = parseInt(e.record.get('jumun_dan'), 10);
    		if(isNaN(su) || isNaN(danga) || su ==0 || danga == 0) e.record.set('jumun_amt', 0);
    		else e.record.set('jumun_amt', su*danga);
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
					Ext.getCmp('Menu17_Grid2').getStore().insert(e.rowIdx+1, new Object());	
				}
    			movePos = {row: e.rowIdx+1, column: 1};
    		} 
    		else
    		{
    			if(e.field == 'jumun_item_cd') movePos = {row: e.rowIdx, column: e.colIdx+4};
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
   		var sumAm = StoreInfo.Menu17_Grid2.sum('jumun_amt');
   		Ext.getCmp('odr_tot_am').setValue( Ext.util.Format.number(sumAm, '0,000'));
   	},
    
    //조회버튼을 눌렀을 경우
    onMenu17_SearchBtnClick: function(button, e, eOpts) {
		
		var thisObj = this;
		var fromDt = Ext.getCmp('menu17_date_str').getValue();
		var toDt = Ext.getCmp('menu17_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		Global.showMask(Ext.getBody());
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/jumun/jumun_m_list_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu17_Grid1.removeAll();
					StoreInfo.Menu17_Grid1.add(json.DATA);
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
    
    //주문 헤더에 대한 상세 정보 호출
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
		var thisObj = this;
		this.form.getForm().reset(true);
    	this.form.getForm().loadRecord(record);
    	this.form.record = record;
    	this.form.query('[xtype=datefield]')[0].setReadOnly(true);
    	var jumun_rec = StoreInfo.Menu09_Grid.findRecord('customer_id', record.get('jumun_tr_cd'), null, null, null, true);
    	if(jumun_rec) Ext.getCmp('menu17_tr_nm_field').setValue(jumun_rec.data.tr_nm);
    	
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/jumun/jumun_d_list_proc.php',
			params: {
				jumun_dt: record.get('jumun_dt').replace(/-/g,""),
				jumun_no: record.get('jumun_no')
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu17_Grid2.removeAll();
					StoreInfo.Menu17_Grid2.add(json.DATA);
					thisObj.sumTotal();
					(thisObj.isModifyCheck()) ?  thisObj.enablePage() : thisObj.disablePage(); 
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
	
	
	//출고번호가 있으면 수정/삭제불가 체크    
    isModifyCheck: function(){
    	var thisObj = this;
    	this.isModify = true;
    	/*
    	StoreInfo.Menu17_Grid2.each(function(record, i){
    		if(record.get('io_cd')) thisObj.isModify = false;
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
    		
    		if(values.jumun_tr_cd)
    		{
    			var detailArr = [];
				var modiArr = StoreInfo.Menu17_Grid2.getModifiedRecords();
				modiArr = Global.sortModelArr(modiArr);
				var len =  modiArr.length;
		    	for(var i=0; i<len; i++)
				{
					var record = modiArr[i];
					if(record.get('jumun_item_cd'))
					{
						detailArr.push({
							'io_cd': record.get('io_cd'),
							'jumun_item_cd': record.get('jumun_item_cd'),
							'jumun_seq': record.get('jumun_seq'),
							'jumun_su': record.get('jumun_su'),
							'jumun_dan': record.get('jumun_dan'),
							'jumun_amt': record.get('jumun_amt'),
							'jumun_rem': record.get('jumun_rem'),
							'row_idx': StoreInfo.Menu17_Grid2.indexOf(record)
						});		
					} 
				}
				
				if(detailArr.length > 0 || selRecord)
				{
					values['jumun_dt'] = values.jumun_dt.replace(/-/g,"");
					values['jumun_tamt'] = parseInt(Ext.getCmp('odr_tot_am').getValue().replace(/,/g,""), 10);
					values['data'] = JSON.stringify(detailArr);
					
					Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/jumun/jumun_register_proc.php',
						params: values,
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								values['jumun_no'] = json.DATA.jumun_no; 
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
    		}
    		else Ext.Msg.alert("", '거래처는 필수입력입니다.');
    	}
    	else Ext.Msg.alert("", '이 주문서는 이미 출고가 완료되었습니다.</br></br>출고가 완료된 주문내역은 수정할 수 없습니다.');
    },
    
    //저장 성공시 헤더 그리드에 데이터 추가
    sucessRowHeadAdd: function(values, selRecord, detailArr, seqObj){
    	//selRecord가 있으면 수정, 없으면 신규
    	for(var i=0; i<detailArr.length; i++)
    	{
    		var idx = detailArr[i].row_idx;
    		var detailRec = StoreInfo.Menu17_Grid2.getAt(idx);
    		detailRec.set('jumun_seq', seqObj[idx]);
    		StoreInfo.Menu17_Grid2.commitChanges();
    	}
    	
    	if(selRecord){
    		selRecord.set(values);
    		Ext.Msg.alert("", '수정되었습니다.');
    	}
    	else
    	{
    		var insertRec = StoreInfo.Menu17_Grid1.add(values);
    		this.form.record = insertRec[0]; 
    		this.form.getForm().setValues({
				'jumun_no': values.jumun_no			
			});
    		StoreInfo.Menu17_Grid1.sort('jumun_dt', 'ASC');
    		this.resetData();
    		Ext.Msg.alert("", '저장되었습니다.');
    	} 
    },
    
    //삭제하는 로직
    onDeleteCode: function(button, e, eOpts) {
    	
    	if(this.isModify)
    	{
	    	var thisObj = this;
	    	var store = StoreInfo.Menu17_Grid2;
	    	var selRecord = this.form.record;
    		var values = thisObj.form.getForm().getValues();
	    	var selRecArr = Ext.getCmp('Menu17_Grid2').getSelectionModel().getSelection();
	    	selRecArr = Global.sortModelArr(selRecArr);
	    	
	    	var modiArr = StoreInfo.Menu17_Grid2.getModifiedRecords();
	    	
	    	var len = selRecArr.length;
	    	
	    	if(!selRecord)
	    	{
    			for(var i=0; i<selRecArr.length; i++)
		    	{
		    		StoreInfo.Menu17_Grid2.remove(selRecArr[i]);
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
					    		if(record.get('jumun_item_cd'))
					    		{
									detailArr.push({
										"jumun_seq": record.get('jumun_seq'),
										"jumun_amt": record.get('jumun_amt'),
										"row_idx": record.get('jumun_seq')
									});  
					    		}
					    	}
					    	
					    	values['jumun_dt'] = values.jumun_dt.replace(/-/g,"");
							values['jumun_tamt'] = parseInt(Ext.getCmp('odr_tot_am').getValue().replace(/,/g,""), 10);
							values['data'] = JSON.stringify(detailArr);
							
					    	Global.showMask(Ext.getBody());
							Ext.Ajax.request({
								method: 'POST',
								url: './proc/account/jumun/jumun_delete_proc.php',
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
    		var delRec = StoreInfo.Menu17_Grid2.findRecord("jumun_seq", rowIdxArr[i]);
    		if(delRec) StoreInfo.Menu17_Grid2.remove(delRec);
    	}
    	
    	var isHeaderRemove = true;
    	
    	StoreInfo.Menu17_Grid2.each(function(record, i){
    		if(record.get('jumun_item_cd')) isHeaderRemove = false;
    	});
    	
    	if(isHeaderRemove)
    	{
    		StoreInfo.Menu17_Grid1.remove(selRecord);
    		this.resetData();
    		Ext.Msg.alert("", '상세정보가 모두 삭제되어 해당 주문정보가 삭제되었습니다.');
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
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(주문등록)', 'Menu17');
    }
});

