
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_StockCarried', {
    extend: 'Ext.window.Window',

    height: 170,
    width: 400,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'label',
                            style: {'font-size': '11px'},
                            html: '발생년도의 상품재고를 다음년도 기초재고로 이월합니다.<br>발생년도가 2014년 이면 12월말 재고를 2015년으로 이월합니다.' 
                        }
                    ]
                },
		   		{
                    xtype: 'form',
                    id:'form_StockCarried',
                    bodyPadding: 0,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyPadding: '10px 0 20px 0',
                    style: {'border-bottom': '1px solid #99bbe8'},
                    items: [
                        {
                            xtype: 'numberfield',
                            id: 'close_year',
                            name: 'close_year',
                            fieldLabel: '발생년도',
                            labelAlign: 'right',
                            labelWidth: 50,
                            labelSeparator: '',
                            name: 'numberfield',
                            width: 120,
                            maxLength: 4
                        }
					]
                },
                {
                    xtype: 'container',
                    //margin: 10,
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
                            text: '시작',
                            listeners:{
                            	click:{
                            		fn: me.onStartClick,
                            		scope: me
                            	}
                            }
                            
                        },
                        {
                            xtype: 'button',
                            margin: 5,
                            width: 50,
                            text: '닫기',
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
    	var close_year = Ext.getCmp('close_year')
    	, date = new Date()
    	, year = date.getFullYear();
    	
    	close_year.setValue(year);
    	//close_year.setMaxValue(year);
    },
    
    onStartClick: function(){
    	var thisObj = this;    	
    	var values = Ext.getCmp('form_StockCarried').getForm().getValues();
    	Global.showMask(this);
    	Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/close/stock_carried_over_proc.php',
			params: {
				close_year: Ext.getCmp('close_year').getValue()
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
				    Ext.Msg.alert("", '재고이월이 완료되었습니다');
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