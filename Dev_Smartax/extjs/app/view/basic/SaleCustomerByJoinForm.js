/**
 * 고객관리 폼
 * */
Ext.define('Smartax.view.basic.SaleCustomerByJoinForm', {
    extend: 'Ext.form.Panel',
    bodyPadding: 20,
    xtype:'saleCustomerByJoinForm',
    id: 'saleCustomerByJoinForm',
    border: false,
    width:400,
    height : (window.innerHeight - 285),
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
            	xtype:'fieldset',
				title:'고객정보',
				width : '100%',
				defaults : {
	                labelWidth: 90,
	                labelAlign: 'left',
	            },
				items : [{
					 xtype : 'hiddenfield',
					 name:'sale_code',
				 },{
					 xtype : 'hiddenfield',
					 name:'co_id',
				 },{
					 xtype : 'textfield',
					 fieldLabel:'- 상호',
					 name:'co_nm',
					 width : 400,
					 id:'co_nm',
					 allowBlank: false,
					 afterLabelTextTpl: Global.required
				 },{
					 xtype : 'textfield',
					 width : 400,
					 fieldLabel:'- 사업자번호',
					 name:'co_saup_no',
					 id:'co_saup_no',
					 afterLabelTextTpl: Global.required,
					 allowBlank: false,
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
						 
				 },{
					 xtype : 'textfield',
					 width : 400,
					 fieldLabel:'- 전화번호',
					 name:'co_tel',
					 id:'co_tel',
					 afterLabelTextTpl: Global.required,
					 allowBlank: false,
					 listeners:{
	                		change:  {
	                            fn: function(field, e, options) {
	                            	field.setValue(Global.getPhoneNumber(field.getValue()));
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
				 },{
					 xtype : 'textfield',
					 width : 400,
					 fieldLabel:'- 휴대폰번호',
					 name:'co_handphone',
					 id:'co_handphone',
					 afterLabelTextTpl: Global.required,
					 allowBlank: false,
					 listeners:{
	                		change:  {
	                            fn: function(field, e, options) {
	                            	field.setValue(Global.getPhoneNumber(field.getValue()));
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
				 },{
					 xtype : 'filefield',reference: 'basicFile',
					 width : 400,
					 fieldLabel:'- 사업자등록증',
					 buttonText: '파일 선택',
					 name:'upload_saup_file',
					 id:'upload_saup_file',
				 },{
					 xtype : 'filefield',reference: 'basicFile',
					 width : 400,
					 fieldLabel:'- 대표자신분증',
					 buttonText: '파일 선택',
					 name:'upload_deapyo_file',
					 id:'upload_deapyo_file',
				 },{
					 xtype : 'textareafield',
					 width : 400,
					 fieldLabel:'- 비고',
					 name:'bigo',
					 id:'bigo'
				 }]
            }]
        });
        me.callParent(arguments);
   },
});

