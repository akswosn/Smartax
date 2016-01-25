
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_JakmokReg', {
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
										Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(작목코드등록)', 'JakmokReg');
								    }
		                        }
		                    }
		               	}
            		]
            	},
            	{
		            xtype: 'fieldset',
		            flex: 1,
		            title: '작목코드 정보',
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
		                			name:'jakmok_code',
		                			afterLabelTextTpl: Global.required,
		                			fieldLabel: '작목코드',
		                			maxLength : 2,
						            allowBlank: false,
		                			width:150,
		                			labelSeparator: '',
		                			labelWidth: 80,
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
		                		},
		                		{ xtype: 'label', cls:'accent', text:'(두자리까지 가능)'}
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
		                			name:'jakmok_name',
		                			afterLabelTextTpl: Global.required,
		                			fieldLabel: '작목명',
		                			selectOnFocus: true,
						            allowBlank: false,
						            maxLength : 45,
		                			width:210,
		                			labelSeparator: '',
		                			labelWidth: 80 },
		                		{ xtype: 'label', cls:'accent', text:'(필수입력)'}
		                	]
		                },
	                	{ xtype: 'checkboxfield', name:'use_yn', fieldLabel: '사용여부', width:300, boxLabel:'사용함', labelSeparator: '', labelWidth: 80, checked: true, hidden: true }
	                ]
				}
            ]
        });

        me.callParent(arguments);
    },
    
    isModifyCheck: function(type){
    	var store = null ;
		//회계 작목등록일 경우
		if(type == 0) store = StoreInfo.Menu10_Grid;
		//영농 작목등록일 경우
		else store = StoreInfo.Menu13_Grid;
		if(ValidateFunc.checkDupCode(store, 'jakmok_code', this.getForm().getValues().jakmok_code)) return true;
		else return false;
    },
    
     isModifyNameCheck: function(type){
     	var store = null ;
    	//회계 작목등록일 경우
		if(type == 0) store = StoreInfo.Menu10_Grid;
		//영농 작목등록일 경우
		else store = StoreInfo.Menu13_Grid;
		
		if(ValidateFunc.checkDupCode(store, 'jakmok_name', this.getForm().getValues().jakmok_name))
		{
			return true;
		} 
		else return false;
    },
    
	resetData: function(type) {
    	var thisObj = this;
    	this.getForm().reset(true);
    	
    	var store = null;
    	if(type == 0) store = StoreInfo.Menu10_Grid;
			//영농 작목등록일 경우
		else store = StoreInfo.Menu13_Grid;
			
    	var lastCode = store.max('jakmok_code');
    	if(!lastCode) lastCode = 0;
    	var newCode = Ext.String.leftPad(parseInt(lastCode, 10)+1, 2, '0');
    	this.getForm().setValues({ jakmok_code: newCode });
    	this.txtField = this.query('[xtype=textfield]')[0];
    	this.txtField.setReadOnly(false);
    	setTimeout(function(){
    		thisObj.txtField.focus();	
    	},100);
    },
    
    onRegisterCode: function(type,  callPop) {
    	
    	var thisObj = this;
    	var isModify = false;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = null ;
			
			//회계 작목등록일 경우
			if(type == 0) store = StoreInfo.Menu10_Grid;
			//영농 작목등록일 경우
			else store = StoreInfo.Menu13_Grid;
				
			var values = form.getValues();
			var jakmok_code = values.jakmok_code;
			
			var jakmok_name = values.jakmok_name;
			var use_yn = 1;
			//if(!values.use_yn) use_yn = 0;
			
			var addStoreData = {
				jakmok_code : jakmok_code,
				jakmok_name: jakmok_name,
				use_yn: use_yn,
				modify_yn: 0,
				in_type : type,
				
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/jakmok/jakmok_register_proc.php',
				params: {
					jakmok_code : parseInt(jakmok_code, 10),
					jakmok_name: jakmok_name,
					use_yn: use_yn,
					in_type : type
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
	    				store.add(addStoreData);
	    				store.sort('jakmok_code', 'ASC');
	    				Ext.Msg.alert("", '저장되었습니다.');
	    				if(callPop) callPop.close(); 
	    				else thisObj.resetData(type);
					}
					else{
						Ext.Msg.alert("", '등록 실패!');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '등록 실패!');
				}
			});	
		}
		else Ext.Msg.alert("", '정확한 정보를 입력해주세요.');
    },
    
    onUpdateCode: function(type, callPop) {
    	var thisObj = this;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = null ;
			//회계 작목등록일 경우
			if(type == 0) store = StoreInfo.Menu10_Grid;
			//영농 작목등록일 경우
			else store = StoreInfo.Menu13_Grid;
			
			var values = form.getValues();
			var jakmok_code = values.jakmok_code;
			var jakmok_name = values.jakmok_name;
			var use_yn = 1;
			if(!values.use_yn) use_yn = 0;
			
			var modifyData = {
				jakmok_code : jakmok_code,
				jakmok_name: jakmok_name,
				use_yn: use_yn,
				in_type : type
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/jakmok/jakmok_edit_proc.php',
				params: {
					jakmok_code : parseInt(jakmok_code, 10),
					jakmok_name: jakmok_name,
					use_yn: use_yn,
					in_type : 0
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						var model = store.findRecord('jakmok_code', jakmok_code, null, null, null, true); 
						model.set(modifyData);
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
				
				
				var selection = null;
				var store = null ;
				
				//회계 작목 삭제일 경우
				if(type == 0)
				{
					selection = Ext.getCmp('Menu10_Grid').getSelectionModel().getSelection(); 
					store = StoreInfo.Menu10_Grid;
				}
				//영농 작목 삭제일 경우
				else
				{
					selection = Ext.getCmp('Menu13_Grid').getSelectionModel().getSelection(); 
					store = StoreInfo.Menu13_Grid;
				}
				
				if(selection.length < 1)
				{
					Ext.Msg.alert("", '삭제할 코드를 선택해주세요.');
					return;
				}				
				else
				{
					var jakmok_code = selection[0].data.jakmok_code;
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/jakmok/jakmok_delete_proc.php',
						params: {
							jakmok_code : parseInt(jakmok_code, 10),
							in_type : type
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
			    				store.removeAt(store.find('jakmok_code', jakmok_code));
			    				thisObj.resetData(type);
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

