/**
 * 등록거래처리스트 폼 화면
 * **/
Ext.define('Smartax.view.basic.CustomerForm', {
    extend: 'Ext.form.Panel',
    bodyPadding: 20,
    xtype:'customerForm',
    id: 'customerForm',
    border: false,
	padding:'0 25 0 0',	
//    width:500,
//    flex:1,
//    height:'100%',
    height:(window.innerHeight - 258),
    layout: {
    	align: 'stretch',
        type: 'vbox'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
        	dockedItems:[
					{
					    xtype: 'toolbar',
						layout: {
					        pack: 'end',
					        type: 'hbox'
					    },
						dock: 'bottom',
					    //  padding : '0 5 10 0',
					      items: [
					      	{
					         		xtype:'label',
					         		flex:1
					         	},
					      	{
					         		xtype:'button',
					         		text: '초기화',
					         		id:'customerFormClearBtn',
					         		cls:'bottomChild',
					         	},
					      	{
					         		xtype:'button',
					         		text: '저장',
					         		id:'customerFormRegistBtn',
					         		cls:'bottomChild',
					         	},
					      	{
					         		xtype:'button',
					         		text: '삭제',
					         		id:'customerFormDeleteBtn',
					         		cls:'bottomChild',
					         	}
					  	]
					  }        
			    ],
            items: [
            	
            	{
                	xtype:'container',
                	layout:{
                		type:'hbox',
                		align: 'middle'
                	},
                	style:'margin-bottom:5px;',
                	items:[
                		{
                			xtype: 'textfield',
                			id:'customer_id',
                			name:'customer_id',
                			afterLabelTextTpl: Global.required,
                			fieldLabel: '거래처코드',
                			maxLength : 5,
				            allowBlank: false,
                			width:300,
                			labelSeparator: '',
                			labelWidth: 90,
                			listeners:{
                				blur:{
                					fn: function(field, e, options) {
                						var res = ValidateFunc.checkCode(field, 5, "0");
                                    	if(!res) field.setValue('');
                                    	else field.setValue(res);
                					}
                				},
                				specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.select('*[name=tr_nm]').focus();
	                                    }
	                                }
	                            }
                			}
                		},
                		{ xtype: 'label', cls:'accent', text:'(다섯자리까지 가능)'}
                	]
                },
                { xtype: 'textfield', name: 'tr_nm', afterLabelTextTpl: Global.required,  fieldLabel: '거래처명', width:300, labelSeparator: '', labelWidth: 90,
                	selectOnFocus: true, allowBlank: false, maxLength : 45,
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
                { xtype: 'textfield', name: 'tr_daepyo', fieldLabel: '대표자명', width:300, labelSeparator: '', labelWidth: 90 },
                {
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', name: 'tr_zip', id:'tr_zip', fieldLabel: '우편번호', width:208, labelSeparator: '', labelWidth: 90, readOnly: true },
                		{ xtype: 'button', id:"zipBtn", text:'우편번호 찾기', style:'margin-left:10px;'       }
                	]
                },
                { xtype: 'textfield', name: 'tr_addr', id:'tr_addr',fieldLabel: '주소', width:435, labelSeparator: '', labelWidth: 90,
                	listeners:{
        				specialkey: {
                            fn: function(field, e, options) {
                                if(e.getKey()==13){
                                	Ext.select('*[name=tr_tel1]').focus();
                                }
                            }
                        }
        			}
        		},
        		{
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', name: 'tr_tel1', fieldLabel: '전화번호', width:130, labelSeparator: '', labelWidth: 90, hideTrigger: true,
                			maxLength: 3,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                            	if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                       },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			this.next().focus();
			                       		}
			                       	}
		                       }
		                    }
		        		},
                		{ xtype: 'textfield', name: 'tr_tel2', fieldLabel: '-', width:85, labelSeparator: '', labelWidth: 20, hideTrigger: true,
                			labelStyle:'text-align:center;', maxLength: 4,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			this.next().focus();
			                       		}
			                       	}
		                       }
		        			}
		        		},
                		{ xtype: 'textfield', name: 'tr_tel3', fieldLabel: '-', width:85, labelSeparator: '', labelWidth: 20, hideTrigger: true,
                			labelStyle:'text-align:center;', maxLength: 4,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=tr_phone1]').focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			Ext.select('*[name=tr_phone1]').focus();
			                       		}
			                       	}
		                       }
		        			}
		        		}
                	]
                },
        		{
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', name: 'tr_phone1', fieldLabel: '핸드폰번호', width:130, labelSeparator: '', labelWidth: 90, hideTrigger: true,
                			maxLength: 3,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			this.next().focus();
			                       		}
			                       	}
		                       }
		        			}
		        		},
                		{ xtype: 'textfield', name: 'tr_phone2', fieldLabel: '-', width:85, labelSeparator: '', labelWidth: 20, hideTrigger: true,
                			labelStyle:'text-align:center;', maxLength: 4,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			this.next().focus();
			                       		}
			                       	}
		                       }
		        			}
		        		},
                		{ xtype: 'textfield', name: 'tr_phone3', fieldLabel: '-', width:85, labelSeparator: '', labelWidth: 20, hideTrigger: true,
                			labelStyle:'text-align:center;', maxLength: 4,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=tr_fax1]').focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			Ext.select('*[name=tr_fax1]').focus();
			                       		}
			                       	}
		                       }
		        			}
		        		}
                	]
                },
        		{
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', name: 'tr_fax1', fieldLabel: 'FAX번호', width:130, labelSeparator: '', labelWidth: 90, hideTrigger: true,
                			maxLength: 3,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			this.next().focus();
			                       		}
			                       	}
		                       }
		        			}
		        		},
                		{ xtype: 'textfield', name: 'tr_fax2', fieldLabel: '-', width:85, labelSeparator: '', labelWidth: 20, hideTrigger: true,
                			labelStyle:'text-align:center;', maxLength: 4,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			this.next().focus();
			                       		}
			                       	}
		                       }
		        			}
		        		},
                		{ xtype: 'textfield', name: 'tr_fax3', fieldLabel: '-', width:85, labelSeparator: '', labelWidth: 20, hideTrigger: true,
                			labelStyle:'text-align:center;', maxLength: 4,
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=tr_saup_no]').focus();
		                                }
		                            }
		                        },
		                       change: {
			                       	fn: function(field, e, options) {
			                       		if(this.getValue().length == this.maxLength) {
			                       			Ext.select('*[name=tr_saup_no]').focus();
			                       		}
			                       	}
		                       }
		        			}
		        		}
                	]
                },
                {
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', afterLabelTextTpl: Global.required, allowBlank: false, name:'tr_saup_no', enableKeyEvents : true, fieldLabel: '사업자등록번호', width:208, labelSeparator: '', labelWidth: 90, hideTrigger: true,
		                	listeners:{
		                		change:  {
		                            fn: function(field, e, options) {
		                            	field.setValue(Global.getSaupjaNumber(field.getValue()));
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
                		{ xtype: 'textfield', afterLabelTextTpl: Global.required, allowBlank: false, name:'tr_jumin_no', enableKeyEvents : true, fieldLabel: '주민등록번호', width:228, labelSeparator: '', labelWidth: 100, labelAlign: 'right', hideTrigger: true,
		                	listeners:{
		                		change:  {
		                            fn: function(field, e, options) {
										field.setValue(Global.getJuminNumber(field.getValue()));
		                            }
		                       	},
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=tr_up]').focus();
		                                }
		                            }
		                        }
		        			}
		        		}
                	]
                },
                {
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', afterLabelTextTpl: Global.required, allowBlank: false, name: 'tr_up', fieldLabel: '업태', width:208, labelSeparator: '', labelWidth: 90,
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
                		{ xtype: 'textfield', afterLabelTextTpl: Global.required, allowBlank: false, name: 'tr_jong', fieldLabel: '종목', width:228, labelSeparator: '', labelWidth: 100, labelAlign: 'right',
		                	listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=tr_manager]').focus();
		                                }
		                            }
		                        }
		        			}
		        		}
                	]
                },
                /*
                { xtype: 'textfield', name: 'tr_manager', fieldLabel: '담당자명', width:300, labelSeparator: '', labelWidth: 90,
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
                 * */
                { xtype: 'textfield', name: 'tr_email', fieldLabel: '이메일', width:435, labelSeparator: '', labelWidth: 90,
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
                /*
                { xtype: 'textfield', name: 'tr_homepage', fieldLabel: '홈페이지', width:435, labelSeparator: '', labelWidth: 90 },
                {
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'datefield', name: 'tr_sdate', fieldLabel: '거래시작일', format: 'Y-m-d', width:208, labelSeparator: '', labelWidth: 90 },
                		{ xtype: 'datefield', name: 'tr_edate', fieldLabel: '거래종료일', format: 'Y-m-d', width:228, labelSeparator: '', labelWidth: 100, labelAlign: 'right' }
                	]
                },
                {
                	xtype:'container',
                	hidden:true,
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'numberfield', name: 'tr_chuchun', fieldLabel: '추천인', width:208, labelSeparator: '', labelWidth: 90, hideTrigger: true },
                		{ xtype: 'button', text:'?', style:'margin-left:5px;' },
                		{ xtype: 'textfield', style:'margin-left:5px;', width:200, readOnly:true }
                	]
                	
                },
        		 * */
                { xtype: 'textfield', name: 'tr_bigo', fieldLabel: '비고', width:437, labelSeparator: '', labelWidth: 90 },
//                {
//					xtype: 'container',
//                    layout: {
//				        align: 'middle',
//				        type: 'hbox'
//				    },
//                    cls:'bottomBar',
//                    items: [
//                    	{
//		               		xtype:'label',
//		               		flex:1
//		               	},
//                    	{
//		               		xtype:'button',
//		               		text: '초기화',
//		               		id:'customerFormClearBtn',
//		               		cls:'bottomChild',
//		               	},
//                    	{
//		               		xtype:'button',
//		               		text: '저장',
//		               		id:'customerFormRegistBtn',
//		               		cls:'bottomChild',
//		               	},
//                    	{
//		               		xtype:'button',
//		               		text: '삭제',
//		               		id:'customerFormDeleteBtn',
//		               		cls:'bottomChild',
//		               	}
//	            	]
//            	}
            ],
        });

        me.callParent(arguments);
   },
});

