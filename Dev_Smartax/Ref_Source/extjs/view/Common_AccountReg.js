
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_AccountReg', {
    extend: 'Ext.form.Panel',
    bodyPadding: 20,
    border: false,
    width:350,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
            		xtype:'container',
            		layout: {
				        type: 'hbox',
				        pack:'end'
				    },
				    flex:1,
            		items:[
	            		{
		                    xtype: 'button',
		                    text: '사용방법',
		                    listeners: {
		                        click: {
		                            fn: function(button, e, eOpts) {
										Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(계정코드관리)', 'AccountReg');
								    }
		                        }
		                    }
		               	}
            		]
            	},
            	{
		            xtype: 'fieldset',
		            flex: 1,
		            title: '계정코드 등록',
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
		                			name:'gycode',
		                			fieldLabel: '계정코드',
		                			maxLength : 3,
		                			minLength : 3,
		                			disabledCls: 'disfield',
		                			afterLabelTextTpl: Global.required,
						            allowBlank: false,
						            selectOnFocus: true,
		                			width:150,
		                			labelSeparator: '',
		                			labelWidth: 80,
		                			listeners:{
		                				blur:{
		                					fn: function(field, e, options) {
		                						var res = ValidateFunc.checkAccountCode(field.getValue());
		                                    	if(!res) field.setValue('');
		                                    	else field.setValue(res);
		                					}
		                				},
		                				specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	Ext.select('*[name=gy_name]').focus();
			                                    }
			                                }
			                            }
		                			}
		                		},
		                		{ xtype: 'label', cls:'accent', text:'(세자리숫자만 가능)'}
		                	]
		                },
		                {
                			xtype: 'textfield',
                			name:'gy_name',
                			afterLabelTextTpl: Global.required,
                			fieldLabel: '계정명',
                			selectOnFocus: true,
				            allowBlank: false,
				            maxLength : 8,
                			width:210,
                			labelSeparator: '',
                			labelWidth: 80,
                			emptyText: '8자리까지 가능',
                			listeners:{
                				specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.select('*[name=gy_rem]').focus();
	                                    }
	                                }
	                            }
                			}
            			},
	                	{ xtype: 'textfield', name:'gy_rem', selectOnFocus: true, fieldLabel: '계정설명', width:300, labelSeparator: '', labelWidth: 80, emptyText: '입력을 생략해도 됩니다.' }
	                ]
				},
            	{
		            xtype: 'fieldset',
		            flex: 1,
		            title: '계정코드 부여 규칙',
		            defaultType: 'checkbox', // each item will be a checkbox
		            layout: 'anchor',
		            defaults: {
		                anchor: '100%',
		                hideEmptyLabel: false
		            },
		            items: [
		            
		            	{ xtype: 'displayfield', fieldLabel: '자  산', width:300, labelWidth: 40,  value:'101~199까지 사용합니다.'},
		            	{ xtype: 'displayfield', fieldLabel: '부  채', width:300, labelWidth: 40,  value:'201~299까지 사용합니다.'},
		            	{ xtype: 'displayfield', fieldLabel: '수  익', width:300, labelWidth: 40,  value:'301~399까지 사용합니다.'},
		            	{ xtype: 'displayfield', fieldLabel: '사업비', width:300, labelWidth: 40,  value:'401~499까지 사용합니다.'},
		            	{
							xtype:'button',
							text:'계정 체계도 확인',
							margin: '10 40',
							flex: 1,
							listeners:{
                				click:{
                					fn: function(field, e, options) {
                						var pop = Ext.create('Common_Pop_ShowAccounts');
    									Global.openPopup(pop);
                					}
                				}
                			}
						}
	                ]
				}
            ]
        });

        me.callParent(arguments);
    },
    
    isModifyCheck: function(){
    	var store = StoreInfo.Menu08_Grid ;
		if(ValidateFunc.checkDupCode(store, 'gycode', this.getForm().getValues().gycode))
		{
			return true;
		} 
		else return false;
    },
    
    isModifyNameCheck: function(){
    	var store = StoreInfo.Menu08_Grid ;
		if(ValidateFunc.checkDupCode(store, 'gy_name', this.getForm().getValues().gy_name))
		{
			return true;
		} 
		else return false;
    },
    
    isModifyPossible: function(){
    	var record = StoreInfo.Menu08_Grid.findRecord('gycode', this.getForm().getValues().gycode);
    	if(record)
    	{
    		if(record.get('modify_yn')) return true;
			else return false;	
    	}
    	else return true;
		
    },
    
	resetData: function(button, e, eOpts) {
    	var thisObj = this;
    	this.getForm().reset(true);
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
			
			var store = StoreInfo.Menu08_Grid;
			var store2 = StoreInfo.Menu08_Grid_SEAR;
			
			var values = form.getValues();
			var gycode = values.gycode;
			var gy_name = values.gy_name;
			var gy_rem = values.gy_rem;
			var gy_group = values.gycode.substring(0, 1);
			var use_yn = 1;
			
			var newData = {
				gycode : gycode,
				gy_name: gy_name,
				gy_rem: gy_rem,
				gy_group: gy_group,
				modify_yn: true,
				use_yn: use_yn,
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/gycode/gycode_register_proc.php',
				params: {
					gycode : parseInt(gycode, 10),
					gy_name: gy_name,
					gy_rem: gy_rem,
					use_yn: use_yn,
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
	    				store.add(newData);
	    				store.commitChanges();
	    				store.sort('gycode', 'ASC');
	    				store2.add(newData);
                        store2.commitChanges();
                        store2.sort('gycode', 'ASC');
	    				Ext.Msg.alert("", '저장되었습니다.');
	    				if(callPop) callPop.close();
	    				else thisObj.resetData();
					}
					else{
						Ext.Msg.alert("", '등록 실패!');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '실패실패실패!');
				}
			});	
		}
		else Ext.Msg.alert("", '정확한 정보를 입력해주세요.');
    },
    
     onUpdateCode: function(callPop) {
    	var thisObj = this;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = StoreInfo.Menu08_Grid;
			
			var values = form.getValues();
			var gycode = values.gycode;
			var gy_name = values.gy_name;
			var gy_rem = values.gy_rem;
			var gy_group = values.gycode.substring(0, 1);
			var use_yn = 1;
			
			var newData = {
				gycode : gycode,
				gy_name: gy_name,
				gy_rem: gy_rem,
				gy_group: gy_group,
				use_yn: use_yn,
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/gycode/gycode_edit_proc.php',
				params: {
					gycode : parseInt(gycode, 10),
					gy_name: gy_name,
					gy_rem: gy_rem,
					use_yn: use_yn,
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						var model = store.findRecord('gycode', gycode, null, null, null, true); 
						model.set(newData);
						model.commit();
						Ext.Msg.alert("", '수정되었습니다.');
						if(callPop) callPop.close();
					}
					else{
						Ext.Msg.alert("", '수정 실패!');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '수정 실패!');
				}
			});	
		}
		else Ext.Msg.alert("", '정확한 정보를 입력해주세요.');
    },
    
    onDeleteCode: function(type) {
    	
    	var thisObj = this;
    	
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">코드</span>를 삭제하시겠습니까?', function(btn){
			if(btn=='yes'){
				
				var selection = Ext.getCmp('Menu08_Grid').getSelectionModel().getSelection();
				var store = StoreInfo.Menu08_Grid ;
				
				if(selection.length < 1)
				{
					Ext.Msg.alert("", '삭제할 코드를 선택해주세요.');
					return;
				}				
				else
				{
					var gycode = selection[0].data.gycode;
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/gycode/gycode_delete_proc.php',
						params: {
							gycode : parseInt(gycode, 10),
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
			    				store.removeAt(store.find('gycode', gycode));
			    				thisObj.resetData();
			    				Ext.Msg.alert("", '삭제되었습니다.');
							}
							else{
								Ext.Msg.alert("", '사용중인 코드는 삭제할 수 없습니다.');
							}
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

