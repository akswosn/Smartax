
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Trds', {
    extend: 'Ext.window.Window',

    height: 452,
    width: 800,
    modal: true,
    title: '거래처코드 조회',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
		           	xtype: 'container',
					id: 'Menu09_Grid_Pop_Lay',
					height: 371,
                    layout: {
                    	align: 'stretch',
				        type: 'vbox'
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
                            		fn: me.onAddClick,
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
		this.setCustomerGrid(StoreInfo.Menu09_Grid.data.items);
   	},
   	
   	//그리드화면 셋팅하기
    setCustomerGrid: function(dataArr)
    {
    	var thisObj = this;
    	
    	Ext.getCmp('Menu09_Grid_Pop_Lay').removeAll();
    	StoreInfo.Menu09_Grid_SEARCH = Ext.create('Ext.data.Store', {
	    	fields: [
	            {name: 'customer_id', type: 'string'},
				{name: 'tr_nm', type: 'string'},
				{name: 'tr_daepyo', type: 'string'},
				{name: 'tr_zip', type: 'string'},
				{name: 'tr_addr', type: 'string'},
				{name: 'tr_tel', type: 'string'},
				{name: 'tr_phone', type: 'string'},
				{name: 'tr_fax', type: 'string'},
				{name: 'tr_saup_no', type: 'string'},
				{name: 'tr_jumin_no', type: 'string'},
				{name: 'tr_up', type: 'string'},
				{name: 'tr_jong', type: 'string'},
				{name: 'tr_manager', type: 'string'},
				{name: 'tr_email', type: 'string'},
				{name: 'tr_homepage', type: 'string'},
				{name: 'tr_sdate', type: 'string'},
				{name: 'tr_edate', type: 'string'},
				{name: 'tr_chuchun', type: 'string'},
				{name: 'tr_bigo', type: 'string'}
	        ],
	        proxy: {
	            type: 'memory',
	            enablePaging: true,
	            data: dataArr,
	            reader: {
	                type: 'array'
	            }
	        },
	        pageSize: 15,
	        remoteSort: true,
		});
		
		var grid = Ext.create('Ext.grid.Panel', {
            id:'Menu09_Grid_Pop',
            autoScroll:true,
            flex:1,
            store: StoreInfo.Menu09_Grid_SEARCH,
            dockedItems: [{
		    	xtype: 'pagingtoolbar',
		        store: StoreInfo.Menu09_Grid_SEARCH,
		        dock: 'bottom',
		        pageSize: 15
	        }],
	        selModel: {
	            pruneRemoved: false
	        },
	        viewConfig: {
	            trackOver: false
	        },
            columns: [
                { xtype: 'gridcolumn', dataIndex: 'customer_id', align:'center', sortable: true, text: '거래처코드', width: 100},
                { xtype: 'gridcolumn', dataIndex: 'tr_nm', style: 'text-align:center', sortable: true, text: '거래처명', width: 100},
                { xtype: 'gridcolumn', dataIndex: 'tr_daepyo', style: 'text-align:center', sortable: true, text: '대표자', width: 100 },
                { xtype: 'gridcolumn', dataIndex: 'tr_tel', style: 'text-align:center', sortable: true, text: '전화번호', width: 100 },
                { xtype: 'gridcolumn', dataIndex: 'tr_phone', style: 'text-align:center', sortable: true, text: '핸드폰', width: 100 },
                { xtype: 'gridcolumn', dataIndex: 'tr_addr', style: 'text-align:center', sortable: true, text: '주소', minWidth: 250, flex:1 }
            ],
            listeners:{
            	itemdblclick: {
                    fn: thisObj.onGridpanelItemDblClick,
                    scope: thisObj
                }
            }
       	});
       	
       	StoreInfo.Menu09_Grid_SEARCH.load(1);
		Ext.getCmp('Menu09_Grid_Pop_Lay').add(grid);
		
		setTimeout(function(){
			grid.getSelectionModel().select(0);
			Global.setkeyEvent(Ext.getCmp('Menu09_Grid_Pop').getView(), 13, function(isEnter){
	   			if(isEnter) thisObj.onSelectClick();
	   		});
		}, 100);
    	
    },
   	
    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	
    	if(this.key == 'customer_id')
    	{
    		var preRec = StoreInfo.Menu11_Grid.findRecord('customer_id', record.get('customer_id'), null, null, null, true);
    		if(preRec){
    			Ext.Msg.alert("", '이미 거래처가 등록되어 있습니다.');
    			Global.isEnter = false;
    		}
    		else
    		{
    			this.record.set(this.key, record.get('customer_id'));
    			Global.isEnter = true;
    		}
    	}
    	else
    	{
    		if(this.Cfield)
	    	{
	    		this.Cfield.setValue(record.get('customer_id'));
	    		this.Vfield.setRawValue(record.get('tr_nm'));	
	    	}
	    	else
	    	{
	    		this.record.set('customer_id', record.get('customer_id'));
	    		Global.isEnter = true;	
	    	}
    	}
    	
    	this.close();
    },
    
    onAddClick: function() {
    	console.log('onAddClick');
    	var trd_pop = Ext.create('Common_Pop_TrdsAdd');
    	trd_pop.toolbar = Ext.getCmp('Menu09_Grid_Pop_Lay').down('pagingtoolbar');
    	trd_pop.show();
    },
    
    onSelectClick: function() {
    	var selectData = Ext.getCmp('Menu09_Grid_Pop').getSelectionModel().getSelection()[0].data;
    	if(this.key == 'customer_id')
    	{
    		var preRec = StoreInfo.Menu11_Grid.findRecord('customer_id', selectData.customer_id, null, null, null, true);
    		if(preRec){
    			Ext.Msg.alert("", '이미 거래처가 등록되어 있습니다.');
    			Global.isEnter = false;
    		}
    		else
    		{
    			this.record.set('customer_id', selectData.customer_id);
    			Global.isEnter = true;
    		}
    	}
    	else
    	{
    		if(this.Cfield)
	    	{
	    		this.Cfield.setValue(selectData.customer_id);
	    		this.Vfield.setRawValue(selectData.tr_nm);	
	    	}
	    	else
	    	{
	    		this.record.set('customer_id', selectData.customer_id);
	    		Global.isEnter = true;	
	    	}
    	}
    	
    	this.close();
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