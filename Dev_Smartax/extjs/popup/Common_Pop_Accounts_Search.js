
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Accounts_Search', {
    extend: 'Ext.window.Window',
    height: 400,
    width: 400,
    modal: true,
    title: '계정코드 조회',
    defaultFocus : 'gycodepop',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id:'gycodepop',
                    height: 320,
                    autoScroll: true,
                    store: StoreInfo.Menu08_Grid_SEAR,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 80,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'gycode',
                            text: '계정코드'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style: 'text-align:center',
                            align:'center',
                            dataIndex: 'gy_name',
                            text: '계정과목'
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
		
		StoreInfo.Menu08_Grid_SEAR.filterBy(function(rec){
			if(thisObj.gy_group){
	    		if(rec.get('gy_group') == thisObj.gy_group) return true;
		    	else return false;
		    }
		    return true;
		});  
		
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
    		this.Cfield.setValue(record.get('gycode'));
    		this.Vfield.setRawValue(record.get('gy_name'));
    		this.close();	
    	}
    	else
    	{
    		console.log(this.record);
    		console.log(record.get('gycode'));
    		var gycodeModiText = ValidateFunc.gycodeValidByGubun(this.record, record.get('gycode'));
    		if(gycodeModiText != '') Ext.Msg.alert("", gycodeModiText);
    		else
    		{
    			this.record.set('gycode', record.get('gycode'));
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
    			this.record.set('gycode', selectData.gycode);
    			Global.isEnter = true;
    			this.close();	
    		}
    		
    	}
    	
    },
    
	popAddCode: function(){
		var addpop = Ext.create('Common_Pop_AccountsAdd');
		addpop.show();	
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