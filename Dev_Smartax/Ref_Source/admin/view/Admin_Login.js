
Ext.application({
	name:'',
	launch:function(){
		
		Ext.Loader.setConfig({ enabled: true });
		Ext.Loader.setPath('Ext.ux', '../extjs/ux');
			
		Ext.require([
			'Ext.ux.exporter.Base64',
			'Ext.ux.exporter.Button_admin',
			'Ext.ux.exporter.Formatter',
			'Ext.ux.exporter.csvFormatter.CsvFormatter',
			'Ext.ux.exporter.excelFormatter.Workbook',
			'Ext.ux.exporter.excelFormatter.Worksheet',
			'Ext.ux.exporter.excelFormatter.Cell',
			'Ext.ux.exporter.excelFormatter.Style',
			'Ext.ux.exporter.excelFormatter.ExcelFormatter',
			'Ext.ux.exporter.Exporter',
			'Ext.ux.grid.Printer',
        	'Ext.ux.RowExpander'
		]);
		Ext.create('Admin_Login');
	}
});	

/********************************** View **********************************/

Ext.define('Admin_Login', {
    extend: 'Ext.container.Viewport',
	id:'root',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    id:'loginview',
                    flex: 1,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'form',
                            height: 200,
                            width: 300,
                            bodyPadding: 30,
                            title: '관리자 로그인',
                            items: [
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    id:'adminid',
                                    fieldLabel: '아이디',
                                    labelSeparator: '',
                                    labelWidth: 60,
                                    listeners:{
			                            specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	me.doLogin();
			                                    }
			                                }
			                            }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    id:'adminpw',
                                    fieldLabel: '패스워드',
                                    inputType: 'password',
                                    labelSeparator: '',
                                    labelWidth: 60,
                                    listeners:{
			                            specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	me.doLogin();
			                                    }
			                                }
			                            }
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    margin: '0 0 0 160',
                                    id:'saveid',
                                    boxLabel: '아이디저장',
                                     listeners: {
                                        change: {
                                            fn: me.onCheckboxfieldChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    height: 30,
                                    margin: '20 0 0 0',
                                    width: 240,
                                    text: '로그인',
                                    listeners:{
                                    	click:{
                                    		fn: me.doLogin,
                                    		scoup: me
                                    	}
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
        		afterrender: function(){
            		var adminid = Ext.util.Cookies.get('ADMIN_ID');
            		Ext.getCmp('adminid').setValue(adminid);
            		if(!Ext.isEmpty(adminid)){
            			Ext.getCmp('saveid').setValue(true);
            		}
        		}
    		}
        });

        me.callParent(arguments);
    },
    
    doLogin: function(){
    	
		var adminid = Ext.getCmp('adminid').getValue();
		var adminpw = Ext.getCmp('adminpw').getValue();
		var saveid = Ext.getCmp('saveid').getValue();
		
		if(saveid) Ext.util.Cookies.set('ADMIN_ID', adminid);
		else Ext.util.Cookies.clear('ADMIN_ID');
		
    	Ext.getBody().mask();

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/login_proc.php',
			params: {
				login_id : adminid,
				login_pw: adminpw
			},
			success: function(response, opts) {
				Ext.getBody().unmask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					Ext.getCmp('loginview').hide();
					Ext.getCmp('root').add(Ext.create('Admin_Page'));
				}
				else if(json.CODE == '77'){
					Ext.Msg.alert("", '아이디가 존재하지 않습니다.');
				}
				else if(json.CODE == '88'){
					Ext.Msg.alert("", '비밀번호가 일치하지 않습니다.');
				}
				else{
					Ext.Msg.alert("", '로그인에 실패하였습니다.');
				}
				
			},
			failure: function(form, action) {
				Ext.getBody().unmask();
				Ext.Msg.alert("", '로그인에 실패하였습니다.');
			}
		});
    },
    
    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
		if(newValue) Ext.util.Cookies.set('ADMIN_ID', Ext.getCmp('adminid').getValue());
		else Ext.util.Cookies.clear('ADMIN_ID');
    }
});

