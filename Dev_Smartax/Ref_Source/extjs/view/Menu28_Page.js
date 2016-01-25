/* 통장 입력 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu28_Page', {
    extend: 'Ext.container.Container',
    id:'Menu28_Page',
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
        Ext.applyIf(me , {
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
	                    			xtype: 'container',
	                    			margin: '0 15 0 0',
			                    	layout: {
								        type: 'hbox',
								        align: 'stretch'
								    },
								    items:[
									    { xtype: 'textfield', name: 'io_tr_cd', fieldLabel: '통장 코드 :', tabIndex:3, width:120, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
				                			id : 'io_tr_cd',
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
						                            	this.next().setRawValue(textVal);
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
							                            	this.next().setRawValue(textVal);
						                            	
					                                    	//Global.isEnter = true;
					                                    	//Ext.select('*[name=io_bigo]').focus();
					                                    	
					                                    }
					                                }
					                            }
					                        }
					                    },		
				                		{ 	xtype: 'combobox',
				                			id: 'menu28_tr_nm_field',
				                			width:192,
				                			tabIndex:4,
				                			margin: '0 0 0 5',
				                			store: StoreInfo.Menu09_Grid,
				                			emptyText: '통장명으로 검색',
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
				                		//,{ xtype: 'label', text:'()', cls:'label_help' }
				                	]
					           	},
		                      	{
			                    xtype: 'form',
			                    fileUpload: true,
			                    itemId: 'form_upload',
			                    width: 480,
			                    items: [	
			                    	{
							        xtype: 'filefield',
							        name: 'file',
							        id : 'uploadCmp',
							        fieldLabel: '엑셀 파일',
							        labelWidth: 60,
							        width: 400,
							        //msgTarget: 'side',
							        //allowBlank: false,
							        anchor: '100%',
							        buttonText: '엑셀파일 선택'
							       }
							       ,{
							     	  xtype: 'button',
								      text: '파일 시트에 올리기',
								      handler: me.onUploadFileData
								   },
								   {
			                            xtype: 'label',
			                            cls:'searchChild',
			                            margin: '4 0 0 10',
			                            flex:1,
			                            text: '업로드할 엑셀 파일을 선택한 후에 업로드 버튼을 눌러 주세요. '
			                        },
							   ]
						     },
						 {
                            xtype: 'label',
                            cls:'searchChild',
                            margin: '4 0 0 10',
                            flex:1,
                            text: ''
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '분개입력사전',
                            listeners: {
                                click: {
                                    fn: function(){
                                    	var pop = Ext.create('Common_Pop_InputExam');
    									Global.openPopup(pop, "분개입력사전");	
                                    }
                                }
                            }
                            
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '입력 도우미',
                            listeners: {
                                click: {
                                    fn: function(){
                                    	var pop = Ext.create('Common_Pop_InputHelper');
    									Global.openPopup(pop, "입력 도우미");	
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '계정체계도',
                            listeners: {
                                click: {
                                    fn: me.showGyCodePopup,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '사용방법',
                            listeners: {
                                click: {
                                    fn: me.onMenu28_DescriptBtnClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tab_lay',
                    flex: 1,
                    activeTab: 0,
                    items: [
                    	{
                            xtype: 'panel',
                            title: '통장 내역',
                            itemId: 'grid1',
                            layout: {
						        type: 'vbox',
						        align: 'stretch'
						    },
						    flex:1,
                            items: [
                            	{
				                    xtype: 'gridpanel',
				                    id:'Menu28_Grid',
				                    border:0,
				                    enableColumnMove : false,
				                    flex:1,
				                    autoScroll:true,
				                    store: StoreInfo.Menu28_Grid,
				                    loadMask: true,
				                    viewConfig: {
				                    	trackOver: false,
									    getRowClass: function(record, rowIndex, rowParams, store){
									    	var cls = "row-error";
									    	var groupId = record.get('jp_group');
								    		if(groupId)
								    		{
								    			var index = Global.groupIdArr.indexOf(groupId);
								    			if(index < 0)
								    			{
								    				Global.groupIdArr.push(groupId);
								    				index = Global.groupIdArr.indexOf(groupId);
								    			}
								    			if(record.get("valid") == 11) cls = "row-group-valid-"+(index%6);
								    			else cls = "row-group-error-"+(index%6);
								    		}
								    		else
								    		{
								    			if(record.get("valid") == 11) cls = "row-valid";	
								    			else cls = "row-error";
								    		}
									        return cls;
									    }
									},
				                    columns: [
				                    	{
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_y',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '년도'
				                            /*
				                            ,editor: {
				                            	xtype: 'numberfield',
								                allowBlank: false,
								                selectOnFocus:true,
								                minValue: 1800,
								                maxValue: 3000,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	var value = field.getValue();
						                                    	var date = new Date;
																if(!value) field.setValue(date.getYear()+1);
																Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_m',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '월'
				                            //,disabled : true
				                            /*
				                           ,editor: {
				                            	xtype: 'numberfield',
								                allowBlank: false,
								                selectOnFocus:true,
								                minValue: 1,
								                maxValue: 12,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                	
						                                    if(e.getKey()==13){
						                                    	var value = field.getValue();
						                                    	var date = new Date;
																if(!value) field.setValue(date.getMonth()+1);
																Global.isEnter = true;
						                                    }
						                                    else
						                                    {
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_d',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '일'
				                            /*
				                            ,editor: {
				                            	xtype: 'numberfield',
								                allowBlank: false,
								                selectOnFocus:true,
								                minValue: 1,
								                maxValue: 31,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	var value = field.getValue();
						                                    	var date = new Date;
																if(!value) field.setValue(date.getDate());
																Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_view_gubun',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '거래구분',
								            width: 100,
								            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = '';
				                            	if(value)
				                            	{
				                            		var codeRecord = StoreInfo.JP_KBN.findRecord('CODE', value, null, null, null, true);
				                            		if(codeRecord) showText = codeRecord.get('TEXT');
				                            	}
												return showText ;
				                            }
				                            /*
								            ,editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.JP_KBN,
											    selectOnFocus:true,
											    autoSelect: false,
											    minChars: 1,
											    queryMode: 'local',
											    displayField: 'TEXT',
											    valueField: 'CODE',
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
											})
											*/
				                        },
				                        
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'credit',
				                            width: 100,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            format:'0,000',
				                            text: '이체수취액'
				                            /*
				                            ,editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												enableKeyEvents : true,
								                listeners: {
													change: Global.formatAm,
													specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                            /*
				                            editor: {
				                            	xtype: 'numberfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												minValue: 0,
												enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
				        										//field.fireEvent('specialkey',field, e);
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'debit',
				                            width: 100,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            format:'0,000',
				                            text: '이체지급액'
				                            /*
				                            ,editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												enableKeyEvents : true,
								                listeners: {
													change: Global.formatAm,
													specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                            /*
				                            editor: {
				                            	xtype: 'numberfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												minValue: 0,
												enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
				        										//field.fireEvent('specialkey',field, e);
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
										},
										{
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jakmok_code',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '작목',
				                            width: 100,
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                            	if(value)
				                            	{
				                            		var code = Ext.String.leftPad(value, 2, '0');
				                            		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', code, null, null, null, true);
				                            		if(codeRecord) showText = code+" "+codeRecord.get('jakmok_name');
				                            	}
												return showText ;
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu10_Grid,
											    autoSelect: false,
											    minChars: 1,
											    selectOnFocus: true,
											    hideTrigger: true,  
											    queryMode: 'local',
											    displayField: 'jakmok_name',
											    valueField: 'jakmok_code',
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
						                                    	var pop = Ext.create('Common_Pop_Jakmok');
						                                    	var grid = Ext.getCmp('Menu28_Grid');
						                                    	grid.getPlugin().cancelEdit();
						                                    	pop.grid = grid;
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
				                            dataIndex: 'gycode',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '계정과목',
				                            width: 100,
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                        		if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
				                            		if(codeRecord) showText += " "+codeRecord.get('gy_name');
				                            	}
												return showText ;
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu08_Grid,
											    autoSelect: false,
											    minChars: 1,
											    selectOnFocus: true,
											    hideTrigger: true,  
											    queryMode: 'local',
											    displayField: 'gy_name',
											    valueField: 'gycode',
											    enableKeyEvents : true,
											    listeners: {
											    	keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Accounts_P28');
						                                    	var grid = Ext.getCmp('Menu28_Grid'); 
						                                    	grid.getPlugin().cancelEdit();
						                                    	pop.grid = grid;
						                                    	pop.record = grid.getSelectionModel().getSelection()[0];
						                                    	Global.openPopup(pop);
						                                    	return false;
						                                    }
						                                }
						                            },
					                                specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
					                            }
				                            })
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'customer_id',
				                            style: 'text-align:center',
				                            width: 100,
				                            sortable: false,
				                            text: '거래처',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                        		var code = Ext.String.leftPad(value, 5, '0');
				                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
				                        		if(codeRecord) return code+" "+codeRecord.get('tr_nm');
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu09_Grid,
											    autoSelect: false,
											    minChars: 1,
											    selectOnFocus: true,
											    hideTrigger: true,  
											    queryMode: 'local',
											    displayField: 'tr_nm',
											    valueField: 'customer_id',
											    enableKeyEvents : true,
											    listeners: {
											    	keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Trds');
						                                    	var grid = Ext.getCmp('Menu28_Grid');
						                                    	grid.getPlugin().cancelEdit();
						                                    	pop.grid = grid;
						                                    	pop.record = grid.getSelectionModel().getSelection()[0];
						                                    	Global.openPopup(pop);
						                                    	return false;
						                                    }
						                                }
						                            },
					                                specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
					                            }
											})
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_rem',
				                            style: 'text-align:center',
				                            sortable: false,
				                            minWidth: 200,
				                            flex:1,
				                            text: '적요',
				                            editor: {
				                            	xtype: 'textfield',
				                            	//style:'IME-MODE:ACTIVE',
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isCtrl = e.ctrlKey;
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        }
				                    ],
				                    dockedItems: [
										{
											xtype: 'toolbar',
											layout: {
						                        pack: 'end',
						                        type: 'hbox'
						                    },
											dock: 'bottom',
											items: [
												{
								               		xtype:'label',
								               		flex:1
								               	},
												{
								               		xtype:'textfield',
								               		width: 450,
								               		id:'munu28_helpText',
								               		fieldCls: 'toolbar_field_help',
								               		cls:'bottomChild',
								               		readOnly : true
								               	},
												{
								               		xtype:'button',
								               		text: '삭제',
								               		cls:'bottomChild',
								               		listeners: {
							                            click: {
							                                fn: me.onDeletBtn_Click,
							                                scope: me
							                            }
							                        }
								               	},
								               	{
								               		xtype:'button',
								               		text: '통장 내역을 분개장에 저장',
								               		cls:'bottomChild',
								               		listeners: {
							                            click: {
							                                fn: me.onSaveBtn_Click,
							                                scope: me
							                            }
							                        }
						
								               	}
											]
										}
									],
				                    selModel: Ext.create('Ext.selection.CheckboxModel', {
				                    	pruneRemoved: false,
				                    	checkOnly: true,
				                		mode: 'MULTI' 
				                    }),
				                    plugins: [         
										Ext.create('Ext.grid.plugin.CellEditing',         
										{             
										    clicksToEdit: 1,
									        listeners: {
									        	beforeedit:{
									        		fn: me.onBeforeEditCheck,
									        		scope: me 
								              	},
									            edit:{
									        		fn: me.onAfterEditCheck,
									        		scope: me 
								              	},
								              	canceledit: function (editor, e, eOpts) {
											    	Global.cellPos = {row: e.rowIdx, column: e.colIdx};
											    } 
									        }         
										}),
										Ext.create('Ext.grid.plugin.BufferedRenderer', {
										})
									]
				               	}
                            ]
                       	},
                    ],
                    listeners: {
                        tabchange: {
                            fn: me.onTabpanelTabChange,
                            scope: me
                        }
                    }
                }
                
            ],
            listeners: {
            	
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                },
                 beforehide: {
                    fn: me.onContainerBeforeHide,
                    scope: me
                }
                
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//
	//파일 업로드
	onUploadFileData : function(){
			//console.log(Ext.getCmp('io_tr_cd').getValue());
			if(!Ext.getCmp('io_tr_cd').getValue())
			{
				Ext.Msg.alert("", '통장 코드를 입력해주세요.');
				return;
			}
			if(!Ext.getCmp('uploadCmp').getValue())
			{
				Ext.Msg.alert("", '엑셀 파일을 선택해 주세요.');
				return;
			}
			
			
			var thisObj = this;
	        var form = this.up('form').getForm();
	        
	        if (form.isValid()) {
	          form.submit({
	            url: './proc/fileupload_proc.php',
	            waitMsg: 'Uploading your file...',
	            success: function (f, a) {
	              //console.log(a.result);
	              var result = a.result, data = result.data,
	                name = data.name, size = data.size,
	                message = Ext.String.format('<b>Message:</b> {0}<br>' +
	                '<b>FileName:</b> {1}<br>' +
	                '<b>FileSize:</b> {2}',
	                result.msg, name, size);
	              
	              //Ext.Msg.alert('엑셀 파일 업로드 성공입니다. ', message);
	             Ext.Msg.alert('','엑셀 파일 업로드 성공입니다. ');
	             
	              //해당 경로의 파일 시트에 호출
	              var thisObj = this;
    			  var customer_id =  Ext.getCmp('io_tr_cd').getValue();
    			  if(!customer_id) customer_id = 0;
			      Ext.Ajax.request({
						method: 'POST',
						url: './proc/junpyo_file_load_proc.php',
						params: {
							filePath: name,
							match_customer_id : customer_id
						},
						success: function(response, opts) {
							//console.log(response.responseText);
							
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								var store = StoreInfo.Menu28_Grid;
								store.removeAll();
								store.add(json.DATA.reverse());
								var now = new Date();
								store.commitChanges();	
								thisObj.searchValues = null;
							}
							else{
								Ext.Msg.alert("", '조회 실패! '+json.DATA);
							}
							
						},
						failure: function(form, action) {
							
							//Global.hideMask();
							Ext.Msg.alert("", '네트 워크 오류!');
						}
					});	
	             
	            },
	            failure: function (f, a) {
	              console.log(a.result);
	              console.log(f);
	              console.log(a);
	              Ext.Msg.alert('엑셀 파일 업로드 실패입니다. ', a.result.msg);
	            }
	          });
	        }
	      },

    //사라지기전 작성중인 데이터 저장 처리
    onContainerBeforeHide: function(component, eOpts) {
    	//this.doSave(false);
    },
    
    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	this.curTab = newCard;
    	if(!newCard.isCall)
    	{
    		if(newCard.itemId == 'grid1')
    		{
    			this.onMenu01_SearchBtnClick();	
    		}
    		else
    		{
    			this.onMenu28_Grid2BtnClick();
    		}
    		newCard.isCall = true;
    	}
    },

	//화면이 처음 보여질시 셋팅    
    onContainerAfterRender: function(component, eOpts) {
    	var store = StoreInfo.Menu28_Grid;
		store.removeAll();
								
    	/*
    	Global.groupIdArr = [-1];
    	var now = new Date();
		Ext.getCmp('menu01_year').setValue(now.getFullYear());
		Ext.getCmp('menu01_month').setValue(now.getMonth()+1);
		this.down('#curPage').setValue(1);
		this.curTab = this.down('tabpanel').getActiveTab();
		this.curTab.isCall = true;
		this.onMenu01_SearchBtnClick();
		*/
    },
    
    
    //그리드 상세데이터를 수정하기 전 valid 체크
    onBeforeEditCheck: function(editor, e, eOpts) {
		
		//자동분개인 경우 수정이 안되게 막기
		if(parseInt(e.record.get('jp_no'),10) > 4999) return false;
		else
		{
			this.setHelpText(e.field);
			
			//구분타입이 입금(1) / 출금(2)일 경우 에디트를 못하게 막음		
			if(e.field == 'debit' && e.record.get('jp_gubun_type') == 1 )
			{
				if(Global.isEnter)
				{
					editor.startEditByPosition({row: e.rowIdx, column: 6});
					Global.isModified = true;
				}
				return false; 
			}
			else if(e.field == 'credit' && e.record.get('jp_gubun_type') == 2 )
			{
				if(Global.isEnter)
				{
					editor.startEditByPosition({row: e.rowIdx, column: e.colIdx+1});
					Global.isModified = true;
				}
				return false; 
			}	
		}
	},
	
	//수정시 화면 하단에 헬프 문구를 셋팅
	setHelpText: function(type)
	{
		var helpText = '';
		switch(type)
		{
			case 'jp_date_m':
			case 'jp_date_d':
				helpText = '엔터를 누르면 현재의 월, 일이 표시됩니다.';
			break;
			case 'jp_view_gubun':
				helpText = '출금 =1, 입금=2를 입력하거나, 옆의 단추를 눌러 선택하십시오.';
			break;
			case 'jakmok_code':
				helpText = '작목코드를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.';
			break;
			case 'gycode':
				helpText = '계정코드를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.';
			break;
			case 'debit':
			case 'credit':
				helpText = '금액을 콤마 없이 입력하십시오.';
			break;
			case 'customer_id':
				helpText = '거래처코드를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.';
			break;
			case 'jp_rem':
				helpText = '비망사항 입력 후 엔터를 누르면 새로운 줄이 추가됩니다.';
			break;
		}
		Ext.getCmp('munu28_helpText').setValue(helpText);
				               		
	},
	
	//그리드 상세데이터를 수정한 후 체크로직
	onAfterEditCheck: function (editor, e, eOpts) {
		
    	var movePos = null;	//다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
    	var groupId = e.record.get('jp_group');
    	var gubun = e.record.get('jp_view_gubun');
    	
    	//1. 거래 구분변경일 경우 입금(1)/출금(2)여부에 따라서 jp_gubun_type을 셋팅해주고 기존 데이터를 클리어
    	if(e.field == 'jp_view_gubun'){
    		
    		var gycodeModiText = ValidateFunc.gycodeValidByGubun2(e.record, e.record.get('gycode'));
    		if(gycodeModiText != '')
    		{
    			e.record.set('jp_view_gubun', e.originalValue);
    			Ext.Msg.alert("", gycodeModiText);
    			return false;
    		}
    		
    		if(gubun == 8 || gubun == 10) e.record.set('gycode', 301);
    		
    		var codeRec = StoreInfo.JP_KBN.findRecord('CODE', e.value, null, null, null, true);
    		if(!codeRec) e.record.set('jp_view_gubun', e.originalValue);
    		else
    		{
    			//거래구분이 3~4일 경우 다른 구분으로 바뀔수 없음 
	    		if(groupId && groupId != -1)
	    		{
	    			if(e.value == 3 || e.value == 4){}
	    			else
	    			{
	    				e.record.set('jp_view_gubun', e.originalValue);
	    				Ext.Msg.alert("", '거래구분을 변경할 수 없습니다.');
	    				return false;
	    			}	
	    		} 
	    		else if(e.record.get('jp_id'))
	    		{
	    			if(e.value == 3 || e.value == 4)
	    			{
	    				e.record.set('jp_view_gubun', e.originalValue);
	    				Ext.Msg.alert("", '거래구분을 변경할 수 없습니다.');
	    				return false;
	    			}
	    		}
	    		
	    		var type = codeRec.get('TYPE');
	    		e.record.set('jp_gubun_type', type);
	    		if(type == 1) e.record.set('debit', '');
	    		else if(type == 2) e.record.set('credit', '');
    			
    		}
    	}
    	
    	//날짜 변경시 그룹아이디가 존재하면 그룹전체의 날짜를 동일하게 변경
    	else if(e.field == 'jp_date_m' || e.field == 'jp_date_d')
    	{
    		if(groupId)	ValidateFunc.syncGroupDate(e.record.get('jp_date_m'), e.record.get('jp_date_d'), groupId); 
    	}
    	
    	//계정코드 벨리데이션
    	else if(e.field == 'gycode')
    	{
    		if(e.value)
    		{
    			var gycodeModiText = ValidateFunc.gycodeValidByGubun2(e.record, e.value);
	    		if(gycodeModiText != '')
	    		{
	    			e.record.set('gycode', e.originalValue);
	    			Ext.Msg.alert("", gycodeModiText);
	    			return false;
	    		} 
	    		else
	    		{
	    			var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', e.value, null, null, null, true);
	        		if(codeRecord) ValidateFunc.changeValidAt(e.record, 0, 10);
	        		else
	        		{
	        			var codeRecord = StoreInfo.Menu08_Grid.findRecord('gy_name', e.value, null, null, null, true);
		    			if(!codeRecord) e.record.set('gycode', e.originalValue);
			    		else
			    		{
			    			e.record.set('gycode', codeRecord.get('gycode'));
			    			ValidateFunc.changeValidAt(e.record, 0, 10);
			    		}  
	        		}  
	    		} 
    		}
    		else e.record.set('gycode', e.originalValue);
    	}
    	//작목코드 벨리데이션
    	else if(e.field == 'jakmok_code')
    	{
    		if(e.value)
    		{
    			var code = Ext.String.leftPad(e.value, 2, '0');
	    		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_name', e.value, null, null, null, true);
	    			if(!codeRecord)
		    		{
		    			if(e.value == '') e.record.set('jakmok_code', '');
		    			else e.record.set('jakmok_code', e.originalValue); 
		    		}
		    		else e.record.set('jakmok_code', codeRecord.get('jakmok_code')); 
	    		}	
    		}
    		else e.record.set('jakmok_code', '');
    	}
    	
    	//거래처코드 벨리데이션
    	else if(e.field == 'customer_id')
    	{
    		if(e.value)
    		{
    			var code = Ext.String.leftPad(e.value, 5, '0');
	    		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			var codeRecord = StoreInfo.Menu09_Grid.findRecord('tr_nm', e.value, null, null, null, true);
	    			if(!codeRecord)
		    		{
		    			if(e.value == undefined || e.value == '') e.record.set('customer_id', '');
		    			else e.record.set('customer_id', e.originalValue);
		    		} 
	    			else e.record.set('customer_id', codeRecord.get('customer_id'));
	    		}
    		}
    		else e.record.set('customer_id', '');
    	}
    	
    	//출금 벨리데이션
    	else if(e.field == 'debit')
    	{
    		var debNum = parseInt((e.record.get('debit')+'').replace(/,/g, ''), 10);
    		if(!debNum) debNum = 0;
    		e.record.set('debit', debNum);
    	}
    		
    	
    	//입금 벨리데이션
    	else if(e.field == 'credit')
    	{
    		var creNum = parseInt((e.record.get('credit')+'').replace(/,/g, ''), 10);
    		if(!creNum) creNum = 0;
    		e.record.set('credit', creNum);
    	}
    		
    	
		//2. 입금(1)/출금(2)여부에 따라서 금액이 0원인지를 체크		                    	
    	var type = e.record.get('jp_gubun_type');
    	
    	var debAm = parseInt(e.record.get('debit'), 10);
    	var creAm = parseInt(e.record.get('credit'), 10);
    	if(!debAm) debAm = 0;
    	if(!creAm) creAm = 0;
    	var checkAm = 0;
    	if(type == 2) checkAm = debAm;
    	else if(type == 1) checkAm = creAm;
    	
    	if(checkAm != 0) ValidateFunc.changeValidAt(e.record, 1, 1);
		else ValidateFunc.changeValidAt(e.record, 1, 2);
		
    	//3. 거래구분이 3~4일경우 그룹id 생성 및 합계금액 일치여부 판단
		if(gubun == 3 || gubun == 4)
		{
			//전표아이디가 없거나 그룹번호가 없으면 공통그룹번호 -1을 셋팅해줌 
			if(!e.record.get('jp_id') && !groupId)	e.record.set('jp_group', -1);
			ValidateFunc.checkGroupSum(e.grid.getStore(), groupId);
			ValidateFunc.syncGroupDate(e.record.get('jp_date_m'), e.record.get('jp_date_d'), groupId);
    	}
		else e.record.set('jp_group', '');
		
		//4. 적요입력을 완료했을때 줄바꾸면서 column: 1부터 다시 에디트 포커스 주기		                    		
        if(Global.isEnter)
        {
        	//extjs4.2에서의 e.colIdx와 4.2 미만 버전의 e.colIdx는 1씩 차이가남
    		if(e.grid.columns.length == e.colIdx){
    			
    			//5. 컨트롤키를 누르고 엔터를 눌렀을시 중간에 행삽입
    			if(Global.isCtrl)
				{
					if(gubun == 3 || gubun == 4)
					{
						var now = new Date();
						Ext.getCmp('Menu28_Grid').getStore().insert(e.rowIdx+1, { 
							'jp_id' : '', 'jp_yyyymmdd' : e.record.get('jp_yyyymmdd'), 'jp_no' : e.record.get('jp_no'), 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
							'jp_view_gubun': gubun, 'jp_date_m': e.record.get('jp_date_m'), 'jp_date_d': e.record.get('jp_date_d'), 'jp_gubun_type': e.record.get('jp_gubun_type'), 'jp_group': e.record.get('jp_group'),  'valid': 22
						});	
						
						if(groupId)
						{
							ValidateFunc.checkGroupSum(e.grid.getStore(), groupId);
							ValidateFunc.syncGroupDate(e.record.get('jp_date_m'), e.record.get('jp_date_d'), groupId);	
						}
					}
					movePos = {row: e.rowIdx+1, column: 1};
				}
				else
				{
					
					if(e.grid.getStore().getCount() == (e.rowIdx+1))
					{
						/*
						var now = new Date();
    					Ext.getCmp('Menu28_Grid').getStore().insert(e.rowIdx+1, {
    						'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
							'jp_view_gubun': gubun, 'jp_date_m': e.record.get('jp_date_m'), 'jp_date_d': e.record.get('jp_date_d'), 'jp_gubun_type':  e.record.get('jp_gubun_type'), 'jp_group': '',  'valid': 22
						});
						*/
						movePos = {row: e.rowIdx, column: 7};
					}
					else
					{
						movePos = {row: e.rowIdx+1, column: 7};
					}
					editor.startEditByPosition(movePos);
					Global.isEnter = false;
        			return true;
				}
    		} 
    		else
    		{
    			//extjs4.2 두번 호출되는 버그로 인한 대응( 4.2 미만 버전은 e.colIdx+1만 해주면됌)
    			if(Global.isModified)
    			{
    				//console.log('Global.isModified');
    				//console.log(e.field );
    				if(e.field == 'debit') movePos = {row: e.rowIdx, column: 8};
    				else if(e.field == 'credit') movePos = {row: e.rowIdx, column: 7};
    				else if(e.field == 'gycode') movePos = {row: e.rowIdx, column: 9};
    				Global.isModified = false;
    			}
    			else movePos = {row: e.rowIdx, column: e.colIdx+1};
    		} 
    		
        	editor.startEditByPosition(movePos);
        } 
        Global.isEnter = false;
        return true;
   	},
   
	//업로드 함수 - 나중에 옮기
	onMenu01_uploadBtn: function()
	{
		console.log('onMenu01_uploadBtn');
	},
    
    
    //저장 로직
    doSave: function(isSucShow){	//저장성공여부 팝업창 띄울지 여부
    	
    	var thisObj = this;
    	var sucCnt = 0;
    	var param = new Object();
    	var tempGroupId = [];
		var modiArr = StoreInfo.Menu28_Grid.getModifiedRecords();
		modiArr = Global.sortModelArr(modiArr);
		var len =  modiArr.length;
		if(len > 0)
		{
	    	for(var i=0; i<len; i++)
			{
				if(modiArr[i].get('valid') == 11)
				{
					var detailData = [];
					var record = modiArr[i];
					var isMdfDate = false;
					if(record.modified.jp_date_m || record.modified.jp_date_d) isMdfDate = true; 
					var groupId = record.get('jp_group');
					if(groupId)
					{
						var index = tempGroupId.indexOf(groupId);
		    			if(index > -1) continue;
						else
						{
							var resultArr = ValidateFunc.getRecordsByGroupId(StoreInfo.Menu28_Grid, groupId, true);
							for(var j=0; j<resultArr.length; j++)
							{
								var arrRec = resultArr[j];
								detailData.push({
									'row_idx': StoreInfo.Menu28_Grid.indexOf(arrRec),
									'jp_id': arrRec.get('jp_id'),
									'customer_id': arrRec.get('customer_id'),
									'gycode': arrRec.get('gycode'),
									'jakmok_code': arrRec.get('jakmok_code'),
									'jp_no': arrRec.get('jp_no'),
									'jp_view_gubun': arrRec.get('jp_view_gubun'),
									'jp_rem': arrRec.get('jp_rem'),
									'debit': arrRec.get('debit'),
									'credit': arrRec.get('credit'),
									'jp_match_id': arrRec.get('jp_match_id'),
									'pre_date': (isMdfDate) ? arrRec.get('jp_yyyymmdd') : '',
									'jp_yyyymmdd': arrRec.get('jp_yyyymmdd'),
									'match_customer_id': arrRec.get('match_customer_id')
								});	
							}
							tempGroupId.push(groupId);	
						}
					}
					else
					{
						detailData.push({
							'row_idx': StoreInfo.Menu28_Grid.indexOf(record), 
							'jp_id': record.get('jp_id'),
							'customer_id': record.get('customer_id'),
							'gycode': record.get('gycode'),
							'jakmok_code': record.get('jakmok_code'),
							'jp_no': record.get('jp_no'),
							'jp_view_gubun': record.get('jp_view_gubun'),
							'jp_rem': record.get('jp_rem'),
							'debit': record.get('debit'),
							'credit': record.get('credit'),
							'jp_match_id': record.get('jp_match_id'),
							'pre_date': (isMdfDate) ? record.get('jp_yyyymmdd') : '',
							'jp_yyyymmdd': record.get('jp_yyyymmdd'),
							'match_customer_id': record.get('match_customer_id')
						});					
					}
					
					param[sucCnt] =  detailData;	
					sucCnt++;
				}
			}
			
			Global.showMask(Ext.getBody());
			
			//Debug
			console.log(param);
			//Debug
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/junpyo/junpyo_bankdata_reg_proc.php',
				params: {
					data: JSON.stringify(param)
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					console.log(json);
					if(json.CODE == '00'){
						thisObj.sucessRowUpdate(json.DATA, isSucShow);
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
    },
    
    //서버 전송버튼을 눌렀을 경우
    onSaveBtn_Click: function(button, e, eOpts) {
    	var thisObj = this;
		Ext.MessageBox.confirm('경고!', '<span>행 전체가 </span><span style="color:red;">빨간글씨</span><span>로 표시된 것은</span><br>계정과목부터 다시 엔터키를 눌러서,<br>검은색으로 만든 후 저장버튼을 눌러주세요.<br><br>현재까지 입력한 분개장을 저장하시겠습니까?', function(btn){
            if(btn=='yes'){
            	thisObj.doSave(true);
            }
        });
    },
    
	//성공한 데이터는 그리드에 업데이트 실패한 경우가 있을경우 알림창을 띄움	
    sucessRowUpdate: function(data, isSucShow)
    {
    	var failCnt = 0;
    	var removeData = [];
    	
    	for(var i=0; i<data.length; i++)
    	{
    		//console.log('i -------> '+i);
    		var rowData = data[i];
    		
    		if(rowData.cd == -99) failCnt++;
    		else
    		{
    			//console.log(rowData);
    			
    			//저장된 기록 삭제 
				var record = StoreInfo.Menu28_Grid.getAt(rowData.cd);
				if(record) removeData.push(record);

				//StoreInfo.Menu28_Grid.remove(record);
				
				/*
				//record.set('jp_id', rowData.jp_id);	
				//record.set('jp_match_id', rowData.jp_match_id);	
				//record.set('jp_no', rowData.jp_no);
				//record.set('jp_yyyymmdd', rowData.jp_yyyymmdd);
				//record.commit();
				*/		
    		}
    	}
    	
    	for(var i=0; i<removeData.length; i++)
    	{
    		StoreInfo.Menu28_Grid.remove(removeData[i]);
    	}
    	
    	
    	
    	//this.tempRowInit();
    	if(failCnt > 0) Ext.Msg.alert("", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 저장실패되었습니다.</span>');
    	else{
    		if(isSucShow) Ext.Msg.alert("", '저장되었습니다.');
    	}
    },
    
    //삭제버튼을 눌렀을 경우
    onDeletBtn_Click: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var store = StoreInfo.Menu28_Grid;
    	var selRecArr = Ext.getCmp('Menu28_Grid').getSelectionModel().getSelection();
    	var sucCnt = 0;
    	var tempGroupId = [];
    	var localGridIdx = [];
    	var param = new Object();
    	var len = selRecArr.length;
    	if(len > 0)
    	{
    		Ext.MessageBox.confirm('경고!', '<span style="color:red;">그룹으로 묶인정보는 그룹 전체가 삭제됩니다.</span><br>선택한 정보를 삭제하시겠습니까?</span>', function(btn){
	            if(btn=='yes'){
	            	
	            	for(var i=0; i<len; i++)
			    	{
			    		var record = selRecArr[i];
			    		if(parseInt(record.get('jp_no'), 10) > 4999) continue;
			    		
			    		var rowIdx = StoreInfo.Menu28_Grid.indexOf(record);
			    		var groupId = record.get('jp_group');
			    		if(groupId)
						{
							var index = tempGroupId.indexOf(groupId);
			    			if(index > -1) continue;
							else
							{
								if(record.get('jp_id'))
					    		{
					    			param[sucCnt] =  {"jp_yyyymmdd":record.get('jp_yyyymmdd'),"jp_no":record.get('jp_no'), 'row_idx': rowIdx};	
									sucCnt++;
					    		}
					    		else localGridIdx.push(record);		    			
								tempGroupId.push(groupId);
							}
						}
						else
						{
							if(record.get('jp_id'))
							{ 
				    			param[sucCnt] =  {"jp_yyyymmdd":record.get('jp_yyyymmdd'),"jp_no":record.get('jp_no'), 'row_idx': rowIdx};	
								sucCnt++;
				    		}
				    		else localGridIdx.push(record);
						}
			    	}
			    	
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/junpyo/junpyo_delete_proc.php',
						params: {
							data: JSON.stringify(param)
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								thisObj.sucessRowDelete(json.DATA, localGridIdx);
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
    },
    
    //서버삭제에 성공한 데이터는 그리드에서도 삭제, 서버삭제 실패한 경우가 있을경우 알림창을 띄움	
    sucessRowDelete: function(serverData, localData)
    {
    	var thisObj = this;
    	var failCnt = 0;
    	for(var i=0; i<serverData.length; i++)
    	{
    		var rowData = serverData[i];
    		if(rowData.cd == -99) failCnt++;
    		else
    		{
				var record = StoreInfo.Menu28_Grid.getAt(rowData.cd);
				localData.push(record);
    		}
    	}
    	for(var i=0; i<localData.length; i++)
    	{
			thisObj.deleteGridData(localData[i]);
    	}
    	//thisObj.tempRowInit();
    	if(failCnt > 0) Ext.Msg.alert("", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 삭제실패되었습니다.</span>');
    },
    
    //삭제하는 로직 그룹일경우와 단일일경우 분개
    deleteGridData: function(record)
    {
    	if(record)
    	{
    		var groupId = record.get('jp_group'); 
			if(groupId)
			{
				var resultArr = ValidateFunc.getRecordsByGroupId(StoreInfo.Menu28_Grid, groupId);
				StoreInfo.Menu28_Grid.remove(resultArr);
			}
			else StoreInfo.Menu28_Grid.remove(record);	
    	}
    },

		 //물음표버튼을 눌렀을 경우
    onMenu28_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '통장입력 메뉴얼', 'Menu28');
    }
    
});

