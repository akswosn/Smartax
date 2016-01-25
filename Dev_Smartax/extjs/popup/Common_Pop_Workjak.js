
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Workjak', {
    extend: 'Ext.window.Window',

    height: 400,
    width: 400,
    modal: true,
    title: '작목코드 조회',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    height: 320,
                    id:'jakmokgrid',
                    store: StoreInfo.Menu13_Grid,
                    autoScroll: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 80,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'jakmok_code',
                            text: '작목코드'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'jakmok_name',
                            text: '작목명'
                        }
                    ],
                    listeners:{
                    	itemdblclick: {
                            fn: me.onGridpanelItemDblClick,
                            scope: me
                        }
                    }
                    
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
                            text: '선택',
                            listeners:{
                            	click:{
                            		fn: me.onSelectClick,
                            		scope: me
                            	}
                            }
                        },
                        {
                            xtype: 'button',
                            margin: 5,
                            width: 50,
                            text: '추가',
                            listeners:{
                            	click:{
                            		fn: me.popAddCode,
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
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		StoreInfo.Menu13_Grid.filter("use_yn", "true");
		
		var thisObj = this;
		var gridView = this.down('gridpanel').getView();
   		setTimeout(function(){
   			gridView.select(0);
   		}, 100);
   		Global.setkeyEvent(gridView, 13, function(isEnter){
   			if(isEnter) thisObj.onSelectClick();
   		});
   		
   	},
    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	this.Cfield.setValue(record.get('jakmok_code'));
    	this.Vfield.setValue(record.get('jakmok_name'));
    	Global.isEnter = true;
    	this.Cfield.focus();
    	this.close();
    },
    
    popAddCode: function(){
		var addpop = Ext.create('Common_Pop_WorkJakAdd');
		addpop.show();	
    },
    
    onSelectClick: function() {
    	var selectData = this.items.items[0].getSelectionModel().getSelection()[0].data;
    	this.Cfield.setValue(selectData.jakmok_code);
    	this.Vfield.setValue(selectData.jakmok_name);
    	Global.isEnter = true;
    	this.Cfield.focus();
    	this.close();
    },

    onCloseClick: function(){
		this.close();    	
    }

});