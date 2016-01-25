
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_TrdsAdd', {
    extend: 'Ext.window.Window',

    height: 540,
    width: 500,
    modal: true,
    title: '거래처 추가',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
            		xtype:'container',
            		id:'trd_add'
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
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                 beforeclose: {
                    fn: me.onWindowBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		this.form = Ext.create('Common_TrdReg');
		Ext.getCmp('trd_add').add(this.form);	
		this.form.resetData();
   	},

    onSaveClick: function(){
    	this.form.onRegisterCode2(this, this.toolbar);   	
    },
    
    onCloseClick: function(){
		this.close();
    },
    
    onWindowBeforeClose: function(panel, eOpts) {
        
    }
});