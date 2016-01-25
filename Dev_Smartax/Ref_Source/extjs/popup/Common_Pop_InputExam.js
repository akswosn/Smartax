
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_InputExam', {
    extend: 'Ext.window.Window',

    height: 400,
    width: 800,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
	                xtype: 'gridpanel',
	                height: 365,
	                autoScroll:true,
	                border:0,
	                store: StoreInfo.InputExam,
	                columns: [
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'kbn',
	                        style: 'text-align:center',
	                        sortable: false,
	                         width: 80,
	                        text: '대분류'
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'type',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '거래유형',
	                        width: 140
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jak',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '작목'
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'io',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '거래구분'
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'gycd',
	                        style: 'text-align:center',
	                        sortable: false,
	                        text: '계정과목',
	                        width: 170
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'cre',
	                        style: 'text-align:center',
	                        sortable: false,
	                        width: 60,
	                        align: 'right',
	                        format:'0,000',
	                        text: '입금액'
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'deb',
	                        style: 'text-align:center',
	                        sortable: false,
	                        width: 60,
	                        align: 'right',
	                        format:'0,000',
	                        text: '출금액'
	                    },
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'tr',
	                        style: 'text-align:center',
	                        sortable: false,
	                        width: 60,
	                        text: '거래처'
	                    }
	                ],
	 				dockedItems: [
						{
							xtype: 'toolbar',
							layout: {
		                        pack: 'end',
		                        type: 'hbox'
		                    },
							dock: 'bottom',
							items: [
								{
				               		xtype:'button',
				               		text: '인쇄',
				               		cls:'bottomChild',
				               		handler : function(){
				               			Ext.ux.grid.Printer.mainTitle = '[ 입력예제 ]';
						            	Ext.ux.grid.Printer.print(this.up().up());
						            }
				               	},
				               	{
				               		xtype: 'exporterbutton',
				               		downloadName: '입력예제',
				               		cls:'bottomChild'
				               	},
				               	{
				               		xtype:'button',
				               		text: '종료',
				               		listeners:{
				               			click:{
				               				fn: me.onCloseClick,
				               				scope: me	
				               			}
				               		}
				               	},
							]
						}
					]
	          	}
            ]
        });

        me.callParent(arguments);
    },

    onCloseClick: function(){
    	StoreInfo.Oridata_Grid.removeAll();
		this.close();    	
    }
});