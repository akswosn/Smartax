
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Config', {
    extend: 'Ext.window.Window',

    height: 130,
    width: 400,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
		   		{
                    xtype: 'form',
                    id:'form_config',
                    bodyPadding: 10,
                    items: [
                    	{
                            xtype: 'radiogroup',
                            tabIndex:2,
                            width:250, 
                            defaults: {
                                name: 'tax_use'
                            },
                            fieldLabel: '과세구분 사용여부',
                            labelSeparator: '',
                            labelWidth: 120,
                            items: [
                                { boxLabel: '사용', inputValue: '1'},
                                { boxLabel: '미사용', inputValue: '0', checked: true }
                            ]
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
                            text: '저장',
                            listeners:{
                            	click:{
                            		fn: me.onSaveClick,
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
                    fn: me.onContainerAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
    	Ext.getCmp('form_config').getForm().setValues(Global.config);
    },
    
    //환경설정 저장(서버로 저장)
    onSaveClick: function(){
    	
		var thisObj = this;    	
    	var values = Ext.getCmp('form_config').getForm().getValues();
    	Global.showMask(this);
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/config_set_proc.php',
			params: {
				config: JSON.stringify(values)
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					Global.config = values;
					Global.settingTax();
    				thisObj.close(); 
				}
				else{
					Ext.Msg.alert("", '로딩 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '로딩 실패!');
			}
		});	
    },
    
    onCloseClick: function(){
		this.close();    	
    }
});