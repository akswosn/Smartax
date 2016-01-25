
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Order', {
    extend: 'Ext.window.Window',

    height: 500,
    width: 768,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
	               	xtype: 'gridpanel',
	                id:'OrderList',
	                height: 410,
	                autoScroll:true,
	                store: StoreInfo.OrderList,
	                viewConfig: {
					    getRowClass: function(record, rowIndex, rowParams, store){
					    	var cls = "row-valid";
					    	var type = record.get('type');
					    	if(type == 1) cls = "row-pre";
					    	else if(type == 2) cls = "row-month";
					    	else if(type == 3) cls = "row-sum";
					    	return cls;
					    }
					},
	                columns: [
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jumun_dt',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '주문일자',
	                        align:'center',
				            width: 80,
				            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                				return value.substring(0,4)+'-'+value.substring(4,6)+'-'+value.substring(6,8);
                    		}
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jumun_item_nm',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '상품명',
				            width: 100
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jumun_item_qty',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '규격',
				            width: 60
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jumun_item_danwi',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '단위',
				            width: 60
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'jumun_su',
	                        width: 50,
	                        sortable: false,
	                        style: 'text-align:center',
	                        align: 'right',
	                        format:'0,000',
	                        text: '수량'
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'jumun_dan',
	                        style: 'text-align:center',
	                        sortable: false,
	                        align: 'right',
	                        format:'0,000',
	                        text: '단가',
	                        width: 90
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'jumun_amt',
	                        style: 'text-align:center',
	                        sortable: false,
	                        align: 'right',
	                        format:'0,000',
	                        text: '금액',
	                        width: 90
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jumun_rem',
	                        style: 'text-align:center',
	                        sortable: false,
	                        minWidth: 200,
	                        text: '적요'
	                    }
	                ],
	                plugins: [         
						Ext.create('Ext.grid.plugin.BufferedRenderer', {
						})
					],
	                selModel: Ext.create('Ext.selection.CheckboxModel', {
	                	pruneRemoved: false,
	                	checkOnly: true,
	            		mode: 'MULTI' 
	                })
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
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		
   	},
   	
    //선택
    onSelectClick: function(){
		var selRecArr = Ext.getCmp('OrderList').getSelectionModel().getSelection();
		
		for(var i=0; i<selRecArr.length; i++)
		{
			var findIdx = StoreInfo.Menu19_Grid2.findBy(function(record){
				if(record.get('jumun_seq') == selRecArr[i].get('jumun_seq') && record.get('jumun_dt') == selRecArr[i].get('jumun_dt') && record.get('jumun_no') == selRecArr[i].get('jumun_no'))
				{
					return true;
				}
				else return false;
			});
			
			if(findIdx < 0)
			{
				var addRec = StoreInfo.Menu19_Grid2.insert(StoreInfo.Menu19_Grid2.getCount()-1, {
		            'io_item_cd': selRecArr[i].get('jumun_item_cd'),
		            'io_item_nm': selRecArr[i].get('jumun_item_nm'),
		            'io_item_qty': selRecArr[i].get('jumun_item_qty'),
		            'io_item_danwi': selRecArr[i].get('jumun_item_danwi'),
		            'io_su': selRecArr[i].get('jumun_su'),
		            'io_dan': selRecArr[i].get('jumun_dan'),
		            'io_amt': selRecArr[i].get('jumun_amt'),
		            'io_rem': selRecArr[i].get('jumun_rem'),
		            'jumun_seq': selRecArr[i].get('jumun_seq'),
		            'jumun_dt': selRecArr[i].get('jumun_dt'),
		            'jumun_no': selRecArr[i].get('jumun_no')
				});
			}
		}
		this.outview.sumTotal();
		this.close();
    },
    
    onCloseClick: function(){
    	StoreInfo.OrderList.removeAll();
		this.close();    	
    }
});