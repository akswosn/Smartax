
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Items_Output', {
    extend: 'Ext.window.Window',

    height: 400,
    width: 400,
    modal: true,
    title: '상품코드 조회',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    height: 320,
                    autoScroll: true,
                    store: StoreInfo.Menu24_Grid,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 80,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'item_cd',
                            text: '상품코드'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'item_nm',
                            text: '상품명'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'item_out_danga',
                            text: '단가'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'item_qty',
                            text: '규격'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            dataIndex: 'item_danwi',
                            text: '단위'
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
    		this.Cfield.setValue(record.get('item_cd'));
    		this.Vfield.setValue(record.get('item_nm'));
    		this.close();	
    	}
    	else
    	{
    		var type = this.type;
    		this.record.set(type+'_item_cd', record.get('item_cd'));
			this.record.set(type+'_item_nm', record.get('item_nm'));
			this.record.set(type+'_item_qty', record.get('item_qty'));
			this.record.set(type+'_item_danwi', record.get('item_danwi'));
			this.record.set(type+'_su', '');
			this.record.set(type+'_dan', record.get('item_out_danga'));
			this.record.set(type+'_amt', '');
			this.record.set(type+'_rem', '');
    		Global.isEnter = true;
    		this.close();	
    	}
    	
    },
    
    onSelectClick: function() {
    	var selectData = this.items.items[0].getSelectionModel().getSelection()[0].data;
    	if(this.Cfield)
    	{
    		this.Cfield.setValue(selectData.item_cd);
    		this.Vfield.setValue(selectData.item_nm);
    		this.close();
    	}
    	else
    	{
    		var type = this.type;
    		this.record.set(type+'_item_cd', selectData.item_cd);
			this.record.set(type+'_item_nm', selectData.item_nm);
			this.record.set(type+'_item_qty', selectData.item_qty);
			this.record.set(type+'_item_danwi', selectData.item_danwi);
			this.record.set(type+'_su', '');
			this.record.set(type+'_dan', selectData.item_out_danga);
			this.record.set(type+'_amt', '');
			this.record.set(type+'_rem', '');
    		Global.isEnter = true;
    		this.close();
    	}
    	
    },
    
	popAddCode: function(){
		var addpop = Ext.create('Common_Pop_ItemsAdd');
		addpop.show();	
    },
    

    onCloseClick: function(){
		this.close();    	
    },
    
    onWindowBeforeClose: function(panel, eOpts) {
    	if(!this.Cfield)
    	{
	    	var nextEditCell = Global.cellPos;
			if(Global.isEnter) nextEditCell.column += 4; 
			this.grid.getPlugin().startEditByPosition(nextEditCell);
		}
		else this.Cfield.focus();
    }

});