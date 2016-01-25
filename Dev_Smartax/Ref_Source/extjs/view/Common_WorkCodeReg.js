
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_WorkCodeReg', {
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
										Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(영농작업코드등록)', 'WorkCodeReg');
								    }
		                        }
		                    }
		               	}
            		]
            	},
            	{
		            xtype: 'fieldset',
		            flex: 1,
		            title: '작업코드 정보',
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
		                			name:'work_cd',
		                			afterLabelTextTpl: Global.required,
		                			fieldLabel: '작업코드',
		                			maxLength : 3,
						            allowBlank: false,
		                			width:150,
		                			labelSeparator: '',
		                			labelWidth: 80,
		                			listeners:{
		                				blur:{
		                					fn: function(field, e, options) {
		                						var res = ValidateFunc.checkCode(field, 3, "0");
		                                    	if(!res) field.setValue('');
		                                    	else field.setValue(res);
		                					}
		                				},
		                				specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	Ext.select('*[name=work_nm]').focus();
			                                    }
			                                }
			                            }
		                			}
		                		},
		                		{ xtype: 'label', cls:'accent', text:'(세자리까지 가능)'}
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
		                			name:'work_nm',
		                			afterLabelTextTpl: Global.required,
		                			fieldLabel: '작업명',
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
    
    isModifyCheck: function(){
    	var store = StoreInfo.Menu14_Grid;
		if(ValidateFunc.checkDupCode(store, 'work_cd', this.getForm().getValues().work_cd)) return true;
		else return false;
    },
    
	isModifyNameCheck: function(){
    	var store = StoreInfo.Menu14_Grid ;
		if(ValidateFunc.checkDupCode(store, 'work_nm', this.getForm().getValues().work_nm))
		{
			return true;
		} 
		else return false;
    },
    
	resetData: function() {
    	var thisObj = this;
    	this.getForm().reset(true);
        var lastCode = StoreInfo.Menu14_Grid.max('work_cd');
        if(!lastCode) lastCode = 0;
    	var newCode = Ext.String.leftPad(parseInt(lastCode, 10)+1, 3, '0');
    	this.getForm().setValues({ work_cd: newCode });
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
			
			var store = StoreInfo.Menu14_Grid;
			
			var values = form.getValues();
			var work_cd = values.work_cd;
			var work_nm = values.work_nm;
			
			var use_yn = 1;
			//if(!values.use_yn) use_yn = 0;
			
			var addStoreData = {
				work_cd : work_cd,
				work_nm: work_nm,
				use_yn: use_yn
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: 'proc/account/work_cd/workcd_register_proc.php',
				params: {
					work_cd : parseInt(work_cd, 10),
					work_nm: work_nm,
					use_yn: use_yn
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
	    				store.add(addStoreData);
	    				store.sort('work_cd', 'ASC');
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
					Ext.Msg.alert("", '등록 실패!');
				}
			});	
		}
		else Ext.Msg.alert("", '정확한 정보를 입력해주세요.');
    },
    
    onUpdateCode: function() {
    	var thisObj = this;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = StoreInfo.Menu14_Grid;
			
			var values = form.getValues();
			var work_cd = values.work_cd;
			var work_nm = values.work_nm;
			var use_yn = 1;
			if(!values.use_yn) use_yn = 0;
			
			var modifyData = {
				work_cd : work_cd,
				work_nm: work_nm,
				use_yn: use_yn
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/work_cd/workcd_edit_proc.php',
				params: {
					work_cd : parseInt(work_cd, 10),
					work_nm: work_nm,
					use_yn: use_yn
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						var model = store.findRecord('work_cd', work_cd, null, null, null, true); 
						model.set(modifyData);
						model.commit();
						Ext.Msg.alert("", '수정되었습니다.');
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
    
    onDeleteCode: function() {
    	
    	var thisObj = this;
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">코드</span>를 삭제하시겠습니까?', function(btn){
			if(btn=='yes'){
				
				var selection = Ext.getCmp('Menu14_Grid').getSelectionModel().getSelection();
				var store = StoreInfo.Menu14_Grid;
				
				if(selection.length < 1)
				{
					Ext.Msg.alert("", '삭제할 코드를 선택해주세요.');
					return;
				}				
				else
				{
					var work_cd = selection[0].data.work_cd;
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/work_cd/workcd_delete_proc.php',
						params: {
							work_cd : parseInt(work_cd, 10)
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
			    				store.removeAt(store.find('work_cd', work_cd));
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

