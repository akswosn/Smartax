
Ext.define('Admin_Page', {
    extend: 'Ext.container.Container',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    flex:1,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
	            {
	            	xtype:'container',
	            	height:25,
	            	style:'background:#323E58;padding:5px;color:white;',
	            	html:'관리자모드'
	            },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    height: 250,
                    width: 400,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '회원리스트',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            flex:1,
                            items: [
                            	Ext.create('Admin_USER')	
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: '입금리스트',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            flex:1,
                            items: [
                            	Ext.create('Admin_Payment')
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: '삭제회원리스트',
                            layout: {
                                align: 'stretch',
                                type: 'vbox'
                            },
                            flex:1,
                            items: [
                            	Ext.create('Admin_Invalid_USER')	
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});