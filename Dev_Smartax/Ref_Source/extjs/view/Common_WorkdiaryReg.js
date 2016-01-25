
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_WorkdiaryReg', {
    extend: 'Ext.form.Panel',
    bodyPadding: 20,
    border: false,
    width:350,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                { xtype: 'datefield', id:'workdate_field', name: 'work_date',  fieldLabel: '작업일자', tabIndex:1, width:300, labelSeparator: '', labelWidth: 60, format:'Y-m-d', selectOnFocus: true,
                	enableKeyEvents : true,
                	value: new Date(),
                	afterLabelTextTpl: Global.required,
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
                {
	                xtype: 'combobox',
	                name: 'weather_cd',
	                tabIndex:2, 
	                width:300,
	                value: StoreInfo.WEATH_KBN.findRecord('weather_cd', 1, null, null, null, true),
					editable: false,
	                fieldLabel: '날씨코드',
	                labelSeparator: '',
	                labelWidth: 60,
	                selectOnFocus: true,
	                displayField: 'weather_nm',
	                queryMode: 'local',
	                store:  StoreInfo.WEATH_KBN,
	                valueField: 'weather_cd',
	                enableKeyEvents : true,
	                listeners:{
        				specialkey: {
                            fn: function(field, e, options) {
                                if(e.getKey()==13){
                                	Ext.select('*[name=jakmok_cd]').focus();
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
                		{ xtype: 'textfield', name: 'jakmok_cd', fieldLabel: '작목코드', tabIndex:3, width:150, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
                			enableKeyEvents : true,
                			afterLabelTextTpl: Global.required,
							allowBlank: false,
                			listeners: {
	                            blur: {
	                                fn: function(field, e, options) {
	                                    var value = field.getValue();
	                                    var textVal = '';
	                                    var modiVal = Ext.String.leftPad(value, 2, '0');
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu13_Grid.findRecord('jakmok_code', modiVal, null, null, null, true);
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
		                            	Ext.getCmp('workjakmok_field').setValue(textVal);
	                                }
	                            },
	                            keydown: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==113){
	                                    	var pop = Ext.create('Common_Pop_Workjak');
	                                    	pop.Cfield = this;
	                                    	pop.Vfield = Ext.getCmp('workjakmok_field');
	                                    	Global.openPopup(pop);
	                                    	return false;
	                                    }
	                                }
	                            },
	                            specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.select('*[name=work_cd]').focus();
	                                    }
	                                }
	                            }
	                        }
	                     },		
                		{ xtype: 'textfield', id: 'workjakmok_field', width:145, readOnly: true, margin: '0 0 0 5', }	
                	]
                },
                {
                	xtype: 'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', name: 'work_cd', fieldLabel: '작업코드', tabIndex:4, width:150, labelSeparator: '', labelWidth: 60, selectOnFocus: true,
                			enableKeyEvents : true,
                			afterLabelTextTpl: Global.required,
							allowBlank: false,
                			listeners: {
	                            blur: {
	                                fn: function(field, e, options) {
	                                    var value = field.getValue();
	                                    var textVal = '';
	                                    var modiVal = Ext.String.leftPad(value, 3, '0');
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu14_Grid.findRecord('work_cd', modiVal, null, null, null, true);
		                            		if(codeRecord)
		                            		{
		                            			value = modiVal;
		                            			textVal = codeRecord.data.work_nm;
		                            		} 
		                            		else
		                            		{
		                            			value = '';
		                            			textVal = '';
		                            		}  
		                            	}
		                            	field.setValue(value);
		                            	Ext.getCmp('workcd_field').setValue(textVal);
	                                }
	                            },
	                            keydown: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==113){
	                                    	var pop = Ext.create('Common_Pop_Workcode');
	                                    	pop.Cfield = this;
	                                    	pop.Vfield = Ext.getCmp('workcd_field');
	                                    	Global.openPopup(pop);
	                                    	return false;
	                                    }
	                                }
	                            },
	                            specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.select('*[name=work_area]').focus();
	                                    }
	                                }
	                            }
	                        }
	                    },		
                		{ xtype: 'textfield', id: 'workcd_field', width:145, readOnly: true, margin: '0 0 0 5', }	
                	]
                },
                {
                	xtype: 'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'numberfield', name: 'work_area', fieldLabel: '작업면적', tabIndex:5, width:140, labelSeparator: '', labelWidth: 60, format:'0,000.0', align:'right', 
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
                		{ xtype: 'numberfield', name: 'work_man', fieldLabel: '인원', tabIndex:6, width:80, labelAlign:'right', labelSeparator: '', labelWidth: 30, format:'0,000.0',
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
                		{ xtype: 'numberfield', name: 'work_time', fieldLabel: '시간', tabIndex:7, width:80, labelAlign:'right', labelSeparator: '', labelWidth: 30, format:'0,000.0',
                			selectOnFocus: true, enableKeyEvents : true, minValue:0,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=work_job]').focus();
		                                }
		                            }
		                        }
		        			}
		        		},
                	]
                },
                { xtype: 'textarea', name: 'work_job', fieldLabel: '작업내용', tabIndex:8, width:300, height: 200, labelSeparator: '', labelWidth: 60, selectOnFocus: true, }
                /* 
                { xtype: 'filefield', name: '',  fieldLabel: '사진등록', width:300, labelSeparator: '', labelWidth: 80, hidden:true,
                inputAttrTpl: 'accept="image/*"',
                listeners: {
                        change: {
                            fn: me.onFilefieldChange,
                            scope: me
                        }
                    }
                },
                { xtype: 'image', id:"work_img", width:300, src:'http://img.naver.net/static/www/u/2013/0819/nmms_111143893.gif', hidden:true }
                */
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
    
    onFilefieldChange: function(filefield, value, eOpts) {
    	//URL.createObjectURL(e.target.files[0])
    	Ext.getCmp('work_img').setSrc(value);
    },
    
    onContainerAfterRender: function(){
    	this.onInitData();
    },
    
    onInitData: function(){
    	this.getForm().reset(true);
    	this.workId = null;
    	this.query('[xtype=textfield]')[0].focus();
    },
    
    onRegisterCode: function() {
    	
    	var thisObj = this;
    	
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = StoreInfo.Menu12_Grid ;
			var values = form.getValues();
			
			var work_date = values.work_date;
			var jakmok_cd = values.jakmok_cd;
			var work_cd = values.work_cd;
			var weather_cd = values.weather_cd;
			var work_area = values.work_area;
			var work_man = values.work_man;
			var work_time = values.work_time;
			var work_job = values.work_job;
			
			var newData = {
				id: null,
				work_date: work_date,
				jakmok_cd: jakmok_cd,
				work_cd: work_cd,
				weather_cd: weather_cd,
				work_area: work_area,
				work_man: work_man,
				work_time: work_time,
				work_job: work_job
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/workdiary/workdiary_register_proc.php',
				params: {
					work_date: work_date.replace(/-/g,""),
					jakmok_cd: jakmok_cd,
					weather_cd: weather_cd,
					work_cd: work_cd,
					work_area: work_area,
					work_man: work_man,
					work_time: work_time,
					work_job: work_job
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						newData.id = json.DATA;
	    				store.add(newData);
	    				store.sort('work_date', 'ASC');
	    				thisObj.onInitData();
	    				Ext.Msg.alert("", '저장되었습니다.');
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
    
     onUpdateCode: function() {
    	var thisObj = this;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store = StoreInfo.Menu12_Grid ;
			var values = form.getValues();
			
			var work_date = values.work_date;
			var jakmok_cd = values.jakmok_cd;
			var work_cd = values.work_cd;
			var weather_cd = values.weather_cd;
			var work_area = values.work_area;
			var work_man = values.work_man;
			var work_time = values.work_time;
			var work_job = values.work_job;
			
			var newData = {
				work_date: work_date,
				jakmok_cd: jakmok_cd,
				weather_cd: weather_cd,
				work_cd: work_cd,
				work_area: work_area,
				work_man: work_man,
				work_time: work_time,
				work_job: work_job
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/workdiary/workdiary_edit_proc.php',
				params: {
					_id: thisObj.workId,
					work_date: work_date.replace(/-/g,""),
					jakmok_cd: jakmok_cd,
					weather_cd: weather_cd,
					work_cd: work_cd,
					work_area: work_area,
					work_man: work_man,
					work_time: work_time,
					work_job: work_job
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						var model = store.findRecord('id', thisObj.workId, null, null, null, true); 
						model.set(newData);
						model.commit();
						store.sort('work_date', 'ASC');
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
    
    onDeleteCode: function(type) {
    	
    	var thisObj = this;
    	
    	Ext.MessageBox.confirm('Confirm', '일지를 삭제하시겠습니까?', function(btn){
			if(btn=='yes'){
				
				var selection = Ext.getCmp('Menu12_Grid').getSelectionModel().getSelection();
				var store = StoreInfo.Menu12_Grid ;
				
				if(selection.length < 1)
				{
					Ext.Msg.alert("", '삭제할 일지를 선택해주세요.');
					return;
				}				
				else
				{
					var id = selection[0].data.id;
			    	Global.showMask(Ext.getBody());
			    	
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/workdiary/workdiary_delete_proc.php',
						params: {
							_id: id,
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
			    				store.removeAt(store.find('id', id));
			    				thisObj.onInitData();
			    				Ext.Msg.alert("", '삭제되었습니다.');
							}
							else{
								Ext.Msg.alert("", '삭제 실패!');
							}
						},
						failure: function(form, action) {
							Global.hideMask();
							Ext.Msg.alert("", '삭제 실패!');
						}
					});					
				}
			}
		});
    }

});

