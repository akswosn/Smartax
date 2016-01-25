
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Search', {
    extend: 'Ext.window.Window',

    width: 400,
    height: 290,
    modal: true,
    title: '전표 조회',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
                    xtype: 'form',
                    id:'search_detail_form',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            style:'margin-bottom:5px;',
                            items: [
                                { xtype: 'datefield', name: 'search_date_from', tabIndex:1, fieldLabel: '발생일자', width:190, labelSeparator: '', labelWidth: 60, format:'Y-m-d', selectOnFocus: true,
				                	enableKeyEvents : true,
									allowBlank: false,
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
                                { xtype: 'datefield', name: 'search_date_to',  tabIndex:2, fieldLabel: '~', width:150, labelSeparator: '', labelWidth: 10, format:'Y-m-d', selectOnFocus: true,
                                	margin: '0 0 0 10',
				                	enableKeyEvents : true,
									allowBlank: false,
				            		listeners:{
				        				specialkey: {
				                            fn: function(field, e, options) {
				                                if(e.getKey()==13){
				                                	Ext.select('*[name=jp_gubun]').focus();
				                                }
				                            }
				                        }
				        			}
						        }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            store: StoreInfo.JP_KBN,
                            name: 'jp_view_gubun',
                            tabIndex:3,
                            fieldLabel: '전표구분', width:190, labelSeparator: '', labelWidth: 60,
						    selectOnFocus:true,
						    queryMode: 'local',
						    displayField: 'TEXT',
						    valueField: 'CODE',
						    enableKeyEvents : true,
						    listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.select('*[name=jakmok_code]').focus();
	                                    	Global.isEnter = true;
	                                    }
	                                }
	                            }
                            }
                        },
                        {
		                	xtype: 'container',
		                	layout:'hbox',
		                	style:'margin-bottom:5px;',
		                	items:[
		                		{ xtype: 'textfield', name: 'jakmok_code', fieldLabel: '작목코드', width:190, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
			            			enableKeyEvents : true,
			            			listeners: {
			                            blur: {
			                                fn: function(field, e, options) {
			                                    var value = field.getValue();
			                                    var textVal = '';
			                                    var modiVal = Ext.String.leftPad(value, 2, '0');
				                            	if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', modiVal, null, null, null, true);
				                            		if(codeRecord)
				                            		{
				                            			value = modiVal;
				                            			textVal = codeRecord.data.jakmok_name;
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
			                                    	var pop = Ext.create('Common_Pop_Jakmok');
			                                    	pop.Cfield = this;
			                                    	pop.Vfield = this.next();
			                                    	pop.show();
			                                    	return false;
			                                    }
			                                }
			                            },
			                            specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	this.next().focus();
			                                    }
			                                }
			                            }
			                        }
			                    },		
			            		{ 	xtype: 'combobox',
			            			width:155,
			            			margin: '0 0 0 5',
			            			store: StoreInfo.Menu10_Grid,
			            			emptyText: '작목코드명 검색',
								    autoSelect: false,
								    minChars: 1,
								    hideTrigger: true,  
								    queryMode: 'local',
								    displayField: 'jakmok_name',
								    valueField: 'jakmok_code',
								    enableKeyEvents : true,
								    listeners: {
								    	select: {
			                                fn: function(field, e, options) {
			                                    var value = field.getValue();
			                                    var textVal = '';
				                            	if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', value, null, null, null, true);
				                            		if(codeRecord)
				                            		{
				                            			value = codeRecord.data.jakmok_code;
				                            			textVal = codeRecord.data.jakmok_name;
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
				                            		Ext.select('*[name=gycode]').focus();	
				                            	}, 100);
			                                }
			                            },
								    	keydown: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==113){
			                                    	var pop = Ext.create('Common_Pop_Jakmok');
			                                    	pop.Cfield = this.prev();
			                                    	pop.Vfield = this;
			                                    	pop.show();
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
					                            		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_name', value, null, null, null, true);
					                            		if(codeRecord)
					                            		{
															value = codeRecord.data.jakmok_code;
				                            				textVal = codeRecord.data.jakmok_name;
				                            			}
					                            		else
					                            		{
					                            			value = '';
					                            			textVal = '';
					                            		}
					                            	}
					                            	field.setRawValue(textVal);
					                            	this.prev().setValue(value); 
			                                    	Ext.select('*[name=gycode]').focus();
			                                    }
			                                }
			                            }
			                        }
							    }
		                	]
		                },
		                {
		                	xtype: 'container',
		                	layout:'hbox',
		                	style:'margin-bottom:5px;',
		                	items:[
		                		{
				                	xtype: 'container',
				                	layout:'hbox',
				                	style:'margin-bottom:5px;',
				                	items:[
				                		{ xtype: 'textfield', name: 'gycode', fieldLabel: '계정코드', width:190, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
					            			enableKeyEvents : true,
					            			listeners: {
					                            blur: {
					                                fn: function(field, e, options) {
					                                    var value = field.getValue();
					                                    var textVal = '';
					                                    var modiVal = Ext.String.leftPad(value, 3, '0');
						                            	if(value)
						                            	{
						                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', modiVal, null, null, null, true);
						                            		if(codeRecord)
						                            		{
						                            			value = modiVal;
						                            			textVal = codeRecord.data.gy_name;
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
					                                    	var pop = Ext.create('Common_Pop_Accounts');
					                                    	pop.Cfield = this;
					                                    	pop.Vfield = this.next();
					                                    	pop.show();
					                                    	return false;
					                                    }
					                                }
					                            },
					                            specialkey: {
					                                fn: function(field, e, options) {
					                                    if(e.getKey()==13){
					                                    	this.next().focus();
					                                    }
					                                }
					                            }
					                        }
					                    },		
					            		{ 	xtype: 'combobox',
					            			width:155,
					            			margin: '0 0 0 5',
					            			store: StoreInfo.Menu08_Grid,
					            			emptyText: '계정코드명 검색',
										    autoSelect: false,
										    minChars: 1,
										    hideTrigger: true,  
										    queryMode: 'local',
										    displayField: 'gy_name',
										    valueField: 'gycode',
										    enableKeyEvents : true,
										    listeners: {
										    	select: {
					                                fn: function(field, e, options) {
					                                    var value = field.getValue();
					                                    var textVal = '';
						                            	if(value)
						                            	{
						                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
						                            		if(codeRecord)
						                            		{
						                            			value = codeRecord.data.gycode;
						                            			textVal = codeRecord.data.gy_name;
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
						                            		Ext.select('*[name=min_amt]').focus();	
						                            	}, 100);
					                                }
					                            },
										    	keydown: {
					                                fn: function(field, e, options) {
					                                    if(e.getKey()==113){
					                                    	var pop = Ext.create('Common_Pop_Accounts');
					                                    	pop.Cfield = this.prev();
					                                    	pop.Vfield = this;
					                                    	pop.show();
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
							                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gy_name', value, null, null, null, true);
							                            		if(codeRecord)
							                            		{
																	value = codeRecord.data.gycode;
						                            				textVal = codeRecord.data.gy_name;
						                            			}
							                            		else
							                            		{
							                            			value = '';
							                            			textVal = '';
							                            		}
							                            	}
							                            	field.setRawValue(textVal);
							                            	this.prev().setValue(value); 
					                                    	Ext.select('*[name=min_amt]').focus();
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
		                	layout:'hbox',
		                	style:'margin-bottom:5px;',
		                	items:[
		                		{ xtype: 'numberfield', name: 'min_amt', fieldLabel: '금액', width:190, labelSeparator: '', labelWidth: 60, format:'0,000.0', align:'right', 
		                			selectOnFocus: true, enableKeyEvents : true, minValue:0,
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
		                		{ xtype: 'numberfield', name: 'max_amt', fieldLabel: '~', width:150, labelAlign:'right', labelSeparator: '', labelWidth: 10, format:'0,000.0',
		                			margin: '0 0 0 10',
		                			selectOnFocus: true, enableKeyEvents : true, minValue:0,
					                listeners:{
				        				specialkey: {
				                            fn: function(field, e, options) {
				                                if(e.getKey()==13){
				                                	Ext.select('*[name=customer_id]').focus();
				                                }
				                            }
				                        }
				        			}
				        		}
		                	]
		                },
		                {
		                	xtype: 'container',
		                	layout:'hbox',
		                	style:'margin-bottom:5px;',
		                	items:[
		                		{ xtype: 'textfield', name: 'customer_id', fieldLabel: '거래처코드', width:190, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
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
			                                    	pop.show();
			                                    	return false;
			                                    }
			                                }
			                            },
			                            specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	this.next().focus();
			                                    }
			                                }
			                            }
			                        }
			                    },		
			            		{ 	xtype: 'combobox',
			            			width:155,
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
				                            		Ext.select('*[name=jp_rem]').focus();	
				                            	}, 100);
			                                }
			                            },
								    	keydown: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==113){
			                                    	var pop = Ext.create('Common_Pop_Trds');
			                                    	pop.Cfield = this.prev();
			                                    	pop.Vfield = this;
			                                    	pop.show();
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
			                                    	Ext.select('*[name=jp_rem]').focus();
			                                    }
			                                }
			                            }
			                        }
							    }
		                	]
		                },
		                { 
		                	xtype: 'textfield',
		                	name: 'jp_rem',
                            fieldLabel: '적요',
                            width:350,
                            labelSeparator: '',
                            labelWidth: 60,
						    selectOnFocus:true
						 }
                    ]
               	},
                {
                    xtype: 'container',
                    margin: 10,
                    layout: {
                        align: 'middle',
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margin: 5,
                            width: 50,
                            text: '조회',
                            listeners:{
                            	click:{
                            		fn: me.onSelectClick,
                            		scope: me
                            	}
                            }
                            
                        },
                        {
                            xtype: 'button',
                            margin: 5,
                            width: 50,
                            text: '취소',
                            listeners:{
                            	click:{
                            		fn: me.onCloseClick,
                            		scope: me
                            	}
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		var form = Ext.getCmp('search_detail_form').getForm();
		
		var now = new Date();
		var search_date_from = new Date(now.getFullYear(), 0, 1);
    	
    	form.setValues({
			search_date_from: search_date_from,
			search_date_to: now
		});
		
    	/*
    	  
    	 var now = new Date();
		form.setValues({
			search_date_from: Ext.Date.getFirstDateOfMonth( now ),
			search_date_to: Ext.Date.getLastDateOfMonth( now )
		});
		*/
   	},
   	
   	onSelectClick: function(){
   		var form = Ext.getCmp('search_detail_form').getForm();
   		var values = form.getValues();
   		
   		if(values.search_date_from.substring(0, 4) != values.search_date_to.substring(0, 4))
		{
			Ext.Msg.alert("", '같은 년도로만 검색 가능합니다.');
		}
		else
		{
			if(form.isValid())
			{
				if(this.preComp.curTab.itemId == 'grid2'){
				    this.preComp.searchValuesGrid2 = values;
					this.preComp.searchDetailGrid2(1);
				} 
				else{
					this.preComp.searchValues = values;					
					this.preComp.searchDetail(1);
				} 
				this.close();	
			}
		}
    }, 
    
    onCloseClick: function(){
    	this.preComp = null;
		this.close();    	
    }
    
});