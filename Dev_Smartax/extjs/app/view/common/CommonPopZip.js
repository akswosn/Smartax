/********************************** View **********************************/

Ext.define('Smartax.view.common.CommonPopZip', {
    extend: 'Ext.window.Window',
    
	width: 500,
    height: 400,
    modal: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    defaultFocus : 'addressdong',
    title: '주소검색',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '☞동/읍/면을 입력해주세요.',
                            labelSeparator: '',
                            labelWidth:160,
                            flex: 1,
                            id:'addressdong',
                            margin: '5 5 5 5',
                            listeners: {
	                            specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	Ext.getCmp('btnsearch').fireEvent('click');
	                                    }
	                                }
	                            }
                            }
                        },
                        {
                            xtype: 'button',
                            margin: '5 5 5 5',
                            text: '검색',
                            id:'btnsearch',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    margin: '5 5 5 5',
                    id: 'ziplist',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            dataIndex: 'postcd',
                            text: '우편번호',
                            sortable: true
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'address',
                            text: '주소',
                            sortable: true
                        }
                    ],
                    store:  Ext.create('Ext.data.Store',{
                    	fields: [
                    		{ name: 'postcd' },
				            { name: 'address' }
			            ]
                    }),
                    listeners:{
                    	celldblclick:{
                    		fn: me.onSelectRow,
                    		scope:me
                    	}
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
    
/********************************** Controller **********************************/

    onButtonClick: function(button, e, options) {
		var text = Ext.getCmp('addressdong').getValue();
		if(text.length < 1){
			Ext.Msg.alert("", "검색할 주소를 한자리이상 넣어주세요.");
		}
		else{
			var store = Ext.getCmp('ziplist').getStore();
			Global.showMask(this); 
			Ext.Ajax.request({
	            method: 'GET',
	            url: './proc/popup/zipsearch-action.php',
	            params: {
	                query: text,
	                app: 'json'
	            },
	            success: function(response, opts) {
	            	Global.hideMask();
	            	if(parseInt(response.responseText) == -99)
	            	{
	            		store.removeAll();
	            		Ext.Msg.alert("안내", "검색된 결과가 없습니다.");
	            	} 
	            	else
	            	{
	            		var json = Ext.JSON.decode(response.responseText);
	            		store.removeAll();
	                	store.add(json);
	            	}
	            },
	            failure: function(response, opts) {
	                Global.hideMask();
	                Ext.Msg.alert("Load failed", action.result.errorMessage);
	            }
	        });	
		}
    },
    
    onSelectRow: function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(this.formId){
			var valObj = new Object();
			valObj[this.zip] = record.get('postcd');
			valObj[this.name] = record.get('address');
			Ext.getCmp(this.formId).getForm().setValues(valObj);
			
			if(this.name) Ext.select('*[name='+this.name).focus();
			this.close();
    	}
    }
});
