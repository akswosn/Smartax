
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_AccountsAdd', {
    extend: 'Ext.window.Window',

    height: 430,
    width: 360,
    modal: true,
    title: '계정코드 추가',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
            		xtype: 'container',
            		id:'acc_add'
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
		this.form = Ext.create('Common_AccountReg');
		Ext.getCmp('acc_add').add(this.form);
		this.form.resetData();
   	},

    onSaveClick: function(){
		if(this.form.isModifyPossible())
    	{
    		if(this.form.isModifyCheck()) Ext.Msg.alert("", '이미추가된 코드입니다.');
    		else this.form.onRegisterCode(this);	
    	}
    	else Ext.Msg.alert("", '변경할 수 없는 코드입니다.');    	
    },
    
    onCloseClick: function(){
		this.close();    	
    },
    
    onWindowBeforeClose: function(panel, eOpts) {

    }

});