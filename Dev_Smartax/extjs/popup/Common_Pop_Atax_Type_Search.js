
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Atax_Type_Search', {
    extend: 'Ext.window.Window',
    height: 400,
    width: 400,
    modal: true,
    title: '계정코드 조회',
    defaultFocus : 'ataxpop',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id:'ataxpop',
                    height: 320,
                    autoScroll: true,
                    store: StoreInfo.ADD_TAX_TYPE,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'atax_type',
                            text: '과세 유형 코드'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'atax_type_nm',
                            text: '과세 유형'
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
    		this.Cfield.setValue(record.get('atax_type'));
    		this.Vfield.setRawValue(record.get('atax_type_nm'));
    		this.close();	
    	}
    	else
    	{
    		var gycodeModiText = ValidateFunc.gycodeValidByGubun(this.record, record.get('atax_type'));
    		if(gycodeModiText != '') Ext.Msg.alert("", gycodeModiText);
    		else
    		{
    			this.record.set('atax_type', record.get('atax_type'));
	    		Global.isEnter = true;
	    		this.close();	
    		}
    	}
    	
    },
    
    onSelectClick: function() {
    	var selectData = this.items.items[0].getSelectionModel().getSelection()[0].data;
    	if(this.Cfield)
    	{
    		this.Cfield.setValue(selectData.gycode);
    		this.Vfield.setRawValue(selectData.gy_name);
    		this.close();
    	}
    	else
    	{
    		var gycodeModiText = ValidateFunc.gycodeValidByGubun(this.record, selectData.gycode);
    		if(gycodeModiText != '') Ext.Msg.alert("", gycodeModiText);
    		else
    		{
    			this.record.set('atax_type', selectData.atax_type);
    			Global.isEnter = true;
    			this.close();	
    		}
    		
    	}
    	
    },
    
    onCloseClick: function(){
		this.close();    	
    },
    
    onWindowBeforeClose: function(panel, eOpts) {
    	if(!this.Cfield)
    	{
    		//this.grid.getPlugin().completeEdit();
	    	var nextEditCell = Global.cellPos;
			if(Global.isEnter) nextEditCell.column += 1; 
			this.grid.getPlugin().startEditByPosition(nextEditCell);
		}
		else this.Cfield.focus();
    }

});