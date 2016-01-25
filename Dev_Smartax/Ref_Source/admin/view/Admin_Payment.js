
Ext.define('Admin_Payment', {
   extend: 'Ext.container.Container',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    cls:'tab_page',
    flex:1,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        align: 'middle',
                        type: 'hbox'
                    },
                    cls:'searchBar',
                    items:[
                        {
                            xtype: 'combobox',
                            width: 180,
                            fieldLabel: '회원구분',
                            labelSeparator: '',
                            labelWidth: 50,
                            editable : false,
                            displayField: 'TEXT',
                            queryMode: 'local',
                            store:  StoreInfo.USER,
                            valueField: 'TYPE',
                            value: '전체',
                            listeners: {
                                change: {
	                                fn: function(field, e, options) {
	                                }
	                            }
                            }
                        },
                     	{
                            xtype: 'combobox',
                            margin: '0 0 0 20',
                            width: 180,
                            fieldLabel: '검색방법',
                            labelSeparator: '',
                            labelWidth: 50,
                            editable : false,
                            displayField: 'TEXT',
                            queryMode: 'local',
                            store:  StoreInfo.SEARCH,
                            valueField: 'TYPE',
                            value: '이름',
                            listeners: {
                                change: {
	                                fn: function(field, e, options) {
	                                	
	                                }
	                            }
                            }
                       },
                       {
                       		xtype:'textfield',
                       		margin: '0 0 0 10',
                       		width:150,
                       		listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                	if(e.getKey() == 13) alert('고고');
	                                }
	                            }
                            }
                       },
                       {
                       		xtype:'button',
                       		margin: '0 0 0 10',
                       		text:'검색',
                       		listeners: {
                                click: {
	                                fn: function(field, e, options) {
	                                	var user_kbn = Ext.getCmp('user_kbn').getValue();
	                                	var search_type = Ext.getCmp('search_type').getValue();
	                                	if(user_kbn == '전체') user_kbn = '00';
	                                	if(search_type == '이름') search_type = '00';
	                                	alert(user_kbn+" / "+search_type);
	                                }
	                            }
                            }
                       }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    cls:'grid',
                    flex: 1,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'String'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'number',
                            text: 'Number'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'date',
                            text: 'Date'
                        },
                        {
                            xtype: 'booleancolumn',
                            dataIndex: 'bool',
                            text: 'Boolean'
                        }
                    ]
                }
            ]
        }),
        me.callParent(arguments);
    }
});