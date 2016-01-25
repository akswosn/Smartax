
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_TrdReg', {
    extend: 'Ext.form.Panel',
    bodyPadding: 20,
    id: 'Common_TrdReg',
    border: false,
    width:500,
    height:450,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                			name:'customer_id',
                			afterLabelTextTpl: Global.required,
                			fieldLabel: '거래처코드',
                			maxLength : 5,
				            allowBlank: false,
                			width:300,
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
	                                    	Ext.select('*[name=tr_nm]').focus();
	                                    }
	                                }
	                            }
                			}
                		},
                		{ xtype: 'label', cls:'accent', text:'(다섯자리까지 가능)'}
                	]
                },
                { xtype: 'textfield', name: 'tr_nm', afterLabelTextTpl: Global.required, selectOnFocus: true, fieldLabel: '거래처명', width:300, labelSeparator: '', labelWidth: 80,
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
                { xtype: 'textfield', name: 'tr_daepyo', fieldLabel: '대표자명', width:300, labelSeparator: '', labelWidth: 80 },
                {
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'textfield', name: 'tr_zip', fieldLabel: '우편번호', width:208, labelSeparator: '', labelWidth: 80, readOnly: true },
                		{ xtype: 'button', text:'우편번호 찾기', style:'margin-left:10px;',
                			listeners: {
				                click: {
				                    fn: me.openZipSearch,
				                    scope: me
				                }
				            }
			            }
                	]
                },
                { xtype: 'textfield', name: 'tr_addr', fieldLabel: '주소', width:435, labelSeparator: '', labelWidth: 80,
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
                		{ xtype: 'textfield', name: 'tr_tel1', fieldLabel: '전화번호', width:130, labelSeparator: '', labelWidth: 80, hideTrigger: true,
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
                		{ xtype: 'textfield', name: 'tr_phone1', fieldLabel: '핸드폰번호', width:130, labelSeparator: '', labelWidth: 80, hideTrigger: true,
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
                		{ xtype: 'textfield', name: 'tr_fax1', fieldLabel: 'FAX번호', width:130, labelSeparator: '', labelWidth: 80, hideTrigger: true,
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
                		{ xtype: 'textfield', name:'tr_saup_no', enableKeyEvents : true, fieldLabel: '사업자등록번호', width:208, labelSeparator: '', labelWidth: 80, hideTrigger: true,
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
                		{ xtype: 'textfield', name:'tr_jumin_no', enableKeyEvents : true, fieldLabel: '주민등록번호', width:228, labelSeparator: '', labelWidth: 100, labelAlign: 'right', hideTrigger: true,
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
                		{ xtype: 'textfield', name: 'tr_up', fieldLabel: '업태', width:208, labelSeparator: '', labelWidth: 80,
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
                		{ xtype: 'textfield', name: 'tr_jong', fieldLabel: '종목', width:228, labelSeparator: '', labelWidth: 100, labelAlign: 'right',
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
                { xtype: 'textfield', name: 'tr_manager', fieldLabel: '담당자명', width:300, labelSeparator: '', labelWidth: 80,
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
                { xtype: 'textfield', name: 'tr_email', fieldLabel: '이메일', width:435, labelSeparator: '', labelWidth: 80,
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
                { xtype: 'textfield', name: 'tr_homepage', fieldLabel: '홈페이지', width:435, labelSeparator: '', labelWidth: 80 },
                {
                	xtype:'container',
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'datefield', name: 'tr_sdate', fieldLabel: '거래시작일', format: 'Y-m-d', width:208, labelSeparator: '', labelWidth: 80 },
                		{ xtype: 'datefield', name: 'tr_edate', fieldLabel: '거래종료일', format: 'Y-m-d', width:228, labelSeparator: '', labelWidth: 100, labelAlign: 'right' }
                	]
                },
                {
                	xtype:'container',
                	hidden:true,
                	layout:'hbox',
                	style:'margin-bottom:5px;',
                	items:[
                		{ xtype: 'numberfield', name: 'tr_chuchun', fieldLabel: '추천인', width:208, labelSeparator: '', labelWidth: 80, hideTrigger: true },
                		{ xtype: 'button', text:'?', style:'margin-left:5px;' },
                		{ xtype: 'textfield', style:'margin-left:5px;', width:200, readOnly:true }
                	]
                	
                },
                { xtype: 'textfield', name: 'tr_bigo', fieldLabel: '비고', width:437, labelSeparator: '', labelWidth: 80 }
            ]
        });

        me.callParent(arguments);
   },
   
   openZipSearch: function()
   {
   		var zipPopup = Ext.create('Common_Pop_Zip');
   		zipPopup.formId = this.id;
   		zipPopup.zip = 'tr_zip';
   		zipPopup.name = 'tr_addr';
   		zipPopup.show();
   },
   
   isModifyCheck: function(){
    	var store = StoreInfo.Menu09_Grid;
		if(ValidateFunc.checkDupCode(store, 'customer_id', this.getForm().getValues().customer_id)) return true;
		else return false;
    },
    
    isModifyNameCheck: function(){
    	var store = StoreInfo.Menu09_Grid ;
		if(ValidateFunc.checkDupCode(store, 'tr_nm', this.getForm().getValues().tr_nm))
		{
			return true;
		} 
		else return false;
    },
    
     resetData: function(button, e, eOpts) {
    	
    	var thisObj = this;
		this.getForm().reset(true);
    	var lastCode = StoreInfo.Menu09_Grid.max('customer_id');
    	if(!lastCode) lastCode = 0;
    	var newCode = Ext.String.leftPad(parseInt(lastCode, 10)+1, 5, '0');
    	this.getForm().setValues({ customer_id: newCode });
    	this.txtField = this.query('[xtype=textfield]')[0];
    	this.txtField.setReadOnly(false);
    	setTimeout(function(){
    		thisObj.txtField.focus();	
    	},100);
    },
    
    onRegisterCode2: function(callPop, paging) {
    	console.log('onRegisterCode2');
    	var thisObj = this;
    	
    	if(thisObj.isModifyCheck()){
			Ext.MessageBox.confirm('경고!', '중복된 코드입니다. 작성한 정보로 업데이트 하시겠습니까?', function(btn){
	            if(btn=='yes'){
	            	thisObj.onUpdateCode();
	            }
	        });
		}
		else if(thisObj.isModifyNameCheck())
		{
			Ext.MessageBox.confirm('경고!', '이미추가된 거래처명입니다. 추가로 저장 하시겠습니까?', function(btn){
	            if(btn=='yes'){
	            	thisObj.onRegisterCode(callPop, paging);
	            }
	        });
		}
		else thisObj.onRegisterCode(callPop, paging);  	
    },
    
    onRegisterCode: function(callPop, paging) {
    	console.log('onRegisterCode');
    	var thisObj = this;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store1 = StoreInfo.Menu09_Grid;
			var store2 = StoreInfo.Menu09_Grid_SEARCH;
			
			var values = form.getValues();
			var customer_id = values.customer_id; 
            var tr_nm = values.tr_nm;
            var tr_tel = values.tr_tel1+'-'+values.tr_tel2+'-'+values.tr_tel3;
            if(tr_tel == '--') tr_tel =''; 
            var tr_phone = values.tr_phone1+'-'+values.tr_phone2+'-'+values.tr_phone3;
            if(tr_phone == '--') tr_phone ='';
            var tr_fax = values.tr_fax1+'-'+values.tr_fax2+'-'+values.tr_fax3;
            if(tr_fax == '--') tr_fax ='';
            var tr_daepyo = values.tr_daepyo;
            var tr_saup_no = values.tr_saup_no;
            var tr_jumin_no = values.tr_jumin_no;
            var tr_up = values.tr_up;
            var tr_jong = values.tr_jong;
            var tr_zip = values.tr_zip;
            var tr_addr = values.tr_addr;
            var tr_homepage = values.tr_homepage;
            var tr_email = values.tr_email;
            var tr_manager = values.tr_manager;
            var tr_sdate = values.tr_sdate;
            var tr_edate = values.tr_edate;
            var tr_bigo = values.tr_bigo;
			
			var addStoreData = {
				customer_id: customer_id, 
	            tr_nm: tr_nm,
	            tr_tel: tr_tel, 
	            tr_phone: tr_phone,
	            tr_fax: tr_fax,
	            tr_daepyo: tr_daepyo,
	            tr_saup_no: tr_saup_no,
	            tr_jumin_no: tr_jumin_no,
	            tr_up: tr_up,
	            tr_jong: tr_jong,
	            tr_zip: tr_zip,
	            tr_addr: tr_addr,
	            tr_homepage: tr_homepage,
	            tr_email: tr_email,
	            tr_manager: tr_manager,
	            tr_sdate: tr_sdate,
	            tr_edate: tr_edate,
	            tr_bigo: tr_bigo
			};
			
	    	Global.showMask(Ext.getBody());
	    	
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/customer/customer_register_proc.php',
				params: {
					customer_id: parseInt(customer_id, 10), 
		            tr_nm: tr_nm,
		            tr_tel: tr_tel, 
		            tr_phone: tr_phone,
		            tr_fax: tr_fax,
		            tr_daepyo: tr_daepyo,
		            tr_saup_no: tr_saup_no,
		            tr_jumin_no: tr_jumin_no,
		            tr_up: tr_up,
		            tr_jong: tr_jong,
		            tr_zip: tr_zip,
		            tr_addr: tr_addr,
		            tr_homepage: tr_homepage,
		            tr_email: tr_email,
		            tr_manager: tr_manager,
		            tr_sdate: tr_sdate.replace(/-/g,""),
		            tr_edate: tr_edate.replace(/-/g,""),
		            tr_bigo: tr_bigo,
		            cid_tel1: 0,
					cid_tel2: 0,
					cid_tel3: 0,
					tr_chuchun:0
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
	    				store1.add(addStoreData);
	    				store1.sort('customer_id', 'ASC');
	    				store2.add(addStoreData);
	    				store2.sort('customer_id', 'ASC');
	    				Ext.Msg.alert("", '저장되었습니다.');
	    				if(paging) paging.moveLast();
	    				if(callPop){
	    					callPop.close();
	    				} 
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
    
    onUpdateCode: function(callPop) {
    	console.log('onUpdateCode');
    	var thisObj = this;
    	var form = this.getForm();
    	
		if(form.isValid())
		{
			
			var store1 = StoreInfo.Menu09_Grid;
			var store2 = StoreInfo.Menu09_Grid_SEARCH;
			
			var values = form.getValues();
			var customer_id = values.customer_id; 
            var tr_nm = values.tr_nm;
			var tr_tel = values.tr_tel1+'-'+values.tr_tel2+'-'+values.tr_tel3;
            if(tr_tel == '--') tr_tel =''; 
            var tr_phone = values.tr_phone1+'-'+values.tr_phone2+'-'+values.tr_phone3;
            if(tr_phone == '--') tr_phone ='';
            var tr_fax = values.tr_fax1+'-'+values.tr_fax2+'-'+values.tr_fax3;
            if(tr_fax == '--') tr_fax ='';
            var tr_daepyo = values.tr_daepyo;
            var tr_saup_no = values.tr_saup_no;
            var tr_jumin_no = values.tr_jumin_no;
            var tr_up = values.tr_up;
            var tr_jong = values.tr_jong;
            var tr_zip = values.tr_zip;
            var tr_addr = values.tr_addr;
            var tr_homepage = values.tr_homepage;
            var tr_email = values.tr_email;
            var tr_manager = values.tr_manager;
            var tr_sdate = values.tr_sdate;
            var tr_edate = values.tr_edate;
            var tr_bigo = values.tr_bigo;
			
			var modifyData = {
				customer_id: customer_id, 
	            tr_nm: tr_nm,
	            tr_tel: tr_tel, 
	            tr_phone: tr_phone,
	            tr_fax: tr_fax,
	            tr_daepyo: tr_daepyo,
	            tr_saup_no: tr_saup_no,
	            tr_jumin_no: tr_jumin_no,
	            tr_up: tr_up,
	            tr_jong: tr_jong,
	            tr_zip: tr_zip,
	            tr_addr: tr_addr,
	            tr_homepage: tr_homepage,
	            tr_email: tr_email,
	            tr_manager: tr_manager,
	            tr_sdate: tr_sdate,
	            tr_edate: tr_edate,
	            tr_bigo: tr_bigo
			};
			
	    	Global.showMask(Ext.getBody());
	
			Ext.Ajax.request({
				method: 'POST',
				url: './/proc/account/customer/customer_edit_proc.php',
				params: {
					customer_id: parseInt(customer_id, 10), 
		            tr_nm: tr_nm,
		            tr_tel: tr_tel, 
		            tr_phone: tr_phone,
		            tr_fax: tr_fax,
		            tr_daepyo: tr_daepyo,
		            tr_saup_no: tr_saup_no,
		            tr_jumin_no: tr_jumin_no,
		            tr_up: tr_up,
		            tr_jong: tr_jong,
		            tr_zip: tr_zip,
		            tr_addr: tr_addr,
		            tr_homepage: tr_homepage,
		            tr_email: tr_email,
		            tr_manager: tr_manager,
		            tr_sdate: tr_sdate.replace(/-/g,""),
		            tr_edate: tr_edate.replace(/-/g,""),
		            tr_bigo: tr_bigo,
		            cid_tel1: 0,
					cid_tel2: 0,
					cid_tel3: 0,
					tr_chuchun:0
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						var model = store1.findRecord('customer_id', customer_id, null, null, null, true);
						model.set(modifyData);
						model.commit(); 
						var model2 = store2.findRecord('customer_id', customer_id, null, null, null, true);
						model2.set(modifyData);
						model2.commit(); 
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
    
    onDeleteCode: function() {
    	
    	var thisObj = this;
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">코드</span>를 삭제하시겠습니까?', function(btn){
			if(btn=='yes'){
				
				var selection = Ext.getCmp('Menu09_Grid').getSelectionModel().getSelection();
				var store1 = StoreInfo.Menu09_Grid;
				var store2 = StoreInfo.Menu09_Grid_SEARCH;
				
				if(selection.length < 1)
				{
					Ext.Msg.alert("", '삭제할 코드를 선택해주세요.');
					return;
				}				
				else
				{
					var customer_id = selection[0].data.customer_id;
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/customer/customer_delete_proc.php',
						params: {
							customer_id : parseInt(customer_id, 10),
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
			    				store1.removeAt(store1.find('customer_id', customer_id));
			    				store2.removeAt(store2.find('customer_id', customer_id));
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

