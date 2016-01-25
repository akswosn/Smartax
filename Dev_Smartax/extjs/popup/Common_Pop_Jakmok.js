
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Jakmok', {
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
                    store: StoreInfo.Menu10_Grid,
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
                       },
                       specialkey: {
	                        fn: function(field, e, options) {
	                            if(e.getKey()==13){
	                            }
	                        }
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
		StoreInfo.Menu10_Grid.filter("use_yn", "true");
		
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
    	if(this.Cfield)
    	{
    		this.Cfield.setValue(record.get('jakmok_code'));
    		this.Vfield.setRawValue(record.get('jakmok_name'));	
    	}
    	else
    	{
    		this.record.set('jakmok_code', record.get('jakmok_code'));
    		Global.isEnter = true;	
    	}
    	this.close();
    },
    
    onSelectClick: function() {
    	
    	var selectData = this.items.items[0].getSelectionModel().getSelection()[0].data;
    	
    	if(this.Cfield)
    	{
    		this.Cfield.setValue(selectData.jakmok_code);
    		this.Vfield.setRawValue(selectData.jakmok_name);	
    	}
    	else
    	{
    		this.record.set('jakmok_code', selectData.jakmok_code);
    		Global.isEnter = true;	
    	}
    	
    	this.close();
    },

    popAddCode: function(){
		var addpop = Ext.create('Common_Pop_JakmokAdd');
		addpop.show();	
    },
    
    onCloseClick: function(){
		this.close();    	
    },
    
    onWindowBeforeClose: function(panel, eOpts) {
    	
    	if(!this.Cfield)
    	{
    		var nextEditCell = Global.cellPos;
			if(Global.isEnter) nextEditCell.column += 1; 
			this.grid.getPlugin().startEditByPosition(nextEditCell);	
    	}
    	else this.Cfield.focus();
    }

});