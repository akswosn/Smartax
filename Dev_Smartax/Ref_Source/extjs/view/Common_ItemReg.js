
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_ItemReg', {
    extend: 'Ext.form.Panel',
    bodyPadding: 20,
    border: false,
    width:350,

    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items: [
            	{
		            xtype: 'fieldset',
		            flex: 1,
		            title: '상품코드 정보',
		            defaultType: 'checkbox', // each item will be a checkbox
		            layout: 'anchor',
		            defaults: {
		                anchor: '100%',
		                hideEmptyLabel: false
		            },
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
		                			name:'item_cd',
		                			afterLabelTextTpl: Global.required,
		                			fieldLabel: '상품코드',
		                			maxLength : 5,
						            allowBlank: false,
		                			width:150,
		                			labelSeparator: '',
		                			labelWidth: 80,
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
			                                    	Ext.select('*[name=item_nm]').focus();
			                                    }
			                                }
			                            }
		                			}
		                		},
		                		{ xtype: 'label', cls:'accent', text:'(다섯자리까지 가능)'}
		                	]
		                },
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
		                			name:'item_nm',
		                			afterLabelTextTpl: Global.required,
		                			fieldLabel: '상품명',
		                			selectOnFocus: true,
						            allowBlank: false,
						            maxLength : 45,
		                			width:210,
		                			labelSeparator: '',
		                			labelWidth: 80,
		                			listeners:{
		                				specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	Ext.select('*[name=item_qty]').focus();
			                                    }
			                                }
			                            }
		                			}
		                		},
		                		{ xtype: 'label', cls:'accent', text:'(필수입력)'}
		                	]
		                },
		                {
                			xtype: 'textfield',
                			name:'item_qty',
                			fieldLabel: '규격',
                			selectOnFocus: true,
                			width:20,
                			labelSeparator: '',
                			labelWidth: 80,
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
		                {
                			xtype: 'textfield',
                			name:'item_danwi',
                			fieldLabel: '단위',
                			selectOnFocus: true,
                			width:20,
                			labelSeparator: '',
                			labelWidth: 80,
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
		                {
                			xtype: 'textfield',
                			name:'item_in_danga',
                			fieldLabel: '매입단가',
                			selectOnFocus: true,
                			width:20,
                			labelSeparator: '',
                			labelWidth: 80,
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
		                {
                			xtype: 'textfield',
                			name:'item_out_danga',
                			fieldLabel: '매출단가',
                			selectOnFocus: true,
                			width:20,
                			labelSeparator: '',
                			labelWidth: 80,
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
            			{
			                xtype: 'combobox',
			                name: 'itemgrp_cd',
			                tabIndex:2, 
			                width:300,
							editable: false,
			                fieldLabel: '상품분류',
			                labelSeparator: '',
			                labelWidth: 80,
			                selectOnFocus: true,
			                displayField: 'itemgrp_nm',
			                queryMode: 'local',
			                store:  StoreInfo.Menu23_Grid,
			                valueField: 'itemgrp_cd',
			                enableKeyEvents : true,
			                hidden: true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                }
		                            }
		                        }
		        			}
			            },
	                	{ xtype: 'checkboxfield', name:'use_yn', fieldLabel: '사용여부', width:300, boxLabel:'사용함', labelSeparator: '', labelWidth: 80, checked: true, hidden: true }
	                ]
				}
            ]
        });

        me.callParent(arguments);
    },
    
    isModifyCheck: function(){
		var store = StoreInfo.Menu24_Grid;
		if(ValidateFunc.checkDupCode(store, 'item_cd', this.getForm().getValues().item_cd)) return true;
		else return false;
    },
    
    isModifyNameCheck: function(){
    	var store = StoreInfo.Menu24_Grid ;
		if(ValidateFunc.checkDupCode(store, 'item_nm', this.getForm().getValues().item_nm))
		{
			return true;
		} 
		else return false;
    },
    
    resetData: function() {
    	var thisObj = this;
    	this.getForm().reset(true);
      	var lastCode = StoreInfo.Menu24_Grid.max('item_cd');
      	if(!lastCode) lastCode = 0;
    	var newCode = Ext.String.leftPad(parseInt(lastCode, 10)+1, 5, '0');
    	this.getForm().setValues({ item_cd: newCode });
    	this.txtField = this.query('[xtype=textfield]')[0];
    	this.txtField.setReadOnly(false);
    	setTimeout(function(){
    		thisObj.txtField.focus();	
    	},100);
    },    
    
    onRegisterCode: function(callPop) {
    	
    	var thisObj = this;
    	var isModify = false;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = StoreInfo.Menu24_Grid;
			
			var values = form.getValues();
			var item_cd = values.item_cd;
			var item_nm = values.item_nm;
			var item_qty = values.item_qty;
			var item_danwi = values.item_danwi;
			var item_in_danga = values.item_in_danga;
			var item_out_danga = values.item_out_danga;
			var itemgrp_cd = values.itemgrp_cd;
			var use_yn = 1;
			//if(!values.use_yn) use_yn = 0;
			
			var addStoreData = {
				item_cd: item_cd, 
				item_nm: item_nm, 
				item_qty: item_qty, 
				item_danwi: item_danwi,
				item_in_danga: item_in_danga, 
				item_out_danga: item_out_danga, 
				itemgrp_cd: itemgrp_cd, 
				use_yn: use_yn
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/item/item_reg_edit_proc.php',
				params: {
					item_cd: parseInt(item_cd, 10),
					item_nm: item_nm, 
					item_qty: item_qty, 
					item_danwi: item_danwi,
					item_in_danga: parseInt(item_in_danga, 10), 
					item_out_danga: parseInt(item_out_danga, 10), 
					itemgrp_cd: parseInt(itemgrp_cd, 10), 
					use_yn: use_yn
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						if(thisObj.isModifyCheck())
						{
							var upRec = store.findRecord('item_cd', item_cd);
							upRec.set(addStoreData);
							upRec.commit();
						}
						else
						{
							store.add(addStoreData);
	    					store.sort('item_cd', 'ASC');	
						}
	    				Ext.Msg.alert("", '저장되었습니다.');
	    				if(callPop) callPop.close(); 
	    				else thisObj.resetData();
					}
					else Ext.Msg.alert("", '등록 실패!');
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '등록 실패!');
				}
			});	
		}
		else Ext.Msg.alert("", '정확한 정보를 입력해주세요.');
    },
    
    onDeleteCode: function(type) {
    	
    	var thisObj = this;
    	
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">코드</span>를 삭제하시겠습니까?', function(btn){
			if(btn=='yes'){
				
				var selection = Ext.getCmp('Menu24_Grid').getSelectionModel().getSelection(); 
				var store = StoreInfo.Menu24_Grid;
				
				if(selection.length < 1)
				{
					Ext.Msg.alert("", '삭제할 코드를 선택해주세요.');
					return;
				}				
				else
				{
					var item_cd = selection[0].data.item_cd;
					var itemgrp_cd = selection[0].data.itemgrp_cd;
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/item/item_delete_proc.php',
						params: {
							item_cd: parseInt(item_cd, 10)
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								if(json.DATA == '1'){
									store.removeAt(store.find('item_cd', item_cd));
									thisObj.resetData();
									Ext.Msg.alert("", '삭제되었습니다.');
								} 
								else Ext.Msg.alert("", '사용중인 코드는 삭제할 수 없습니다.');
							}
							else Ext.Msg.alert("", '사용중인 코드는 삭제할 수 없습니다.');
						},
						failure: function(form, action) {
							Global.hideMask();
							Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
						}
					});					
				}
			}
		});
    }

});

