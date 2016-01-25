
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_InputHelper', {
    extend: 'Ext.window.Window',

    height: 520,
    width: 700,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
                    xtype: 'tabpanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '입력순서도(초보자용)',
						    height:410,
						    layout:{
						    	align: 'stretch',
								type: 'vbox'
						    },
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    flex:1,
				                    border:0,
				                    autoScroll:true,
				                    store:  StoreInfo.InputHelper1,
				                    columns: [
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col1', text: '단계', width: 80	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col2', text: '입력내용', width: 160	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col3', text: '비고', flex:1	}
				                    ]
								}
							]
		               	},
                        {
                            xtype: 'panel',
                            title: '입력 항목 해설',
						    height:410,
						    layout:{
						    	align: 'stretch',
								type: 'vbox'
						    },
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    flex:1,
				                    border:0,
				                    autoScroll:true,
				                    store:  StoreInfo.InputHelper2,
				                    columns: [
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col1', text: '항목구분', width: 80	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col2', text: '비고', flex:1	}
				                    ]
								}
							]
		               	},
                        {
                            xtype: 'panel',
                            title: '키보드 조작법',
						    height:410,
						    layout:{
						    	align: 'stretch',
								type: 'vbox'
						    },
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    flex:1,
				                    border:0,
				                    autoScroll:true,
				                    store:  StoreInfo.InputHelper3,
				                    columns: [
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col1', text: '구분', width: 160	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col2', text: '사용법', flex:1	}
				                    ]
								}
							]
		               	},
                        {
                            xtype: 'panel',
                            title: '활용 및 분석',
						    height:410,
						    layout:{
						    	align: 'stretch',
								type: 'vbox'
						    },
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    flex:1,
				                    border:0,
				                    autoScroll:true,
				                    store:  StoreInfo.InputHelper4,
				                    columns: [
				                         {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col1', text: '장부의 명칭', width: 80	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col2', text: '장부의 기능', flex:1	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col3', text: '비고', flex:1	}
				                    ]
								}
							]
		               	},
                        {
                            xtype: 'panel',
                            title: '거래유형별 입력요령',
						    height:410,
						    layout:{
						    	align: 'stretch',
								type: 'vbox'
						    },
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    flex:1,
				                    border:0,
				                    autoScroll:true,
				                    store:  StoreInfo.InputHelper5,
				                    columns: [
				                         {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col1', text: '거래유형', width: 100	},
				                         {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col2', text: '거래구분', width: 80	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col3', text: '선택가능과목', width: 100	},
				                        {	xtype: 'gridcolumn', style:'text-align:center;', sortable: false, dataIndex: 'col4', text: '내용해설', flex:1	}
				                    ]
								}
							]
		               	}
	               	]
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
                            text: '종료',
                            listeners:{
                            	click:{
                            		fn: me.onCloseClick,
                            		scope: me
                            	}
                            }
                            
                        }
                    ]
                }
	        ]
        });
        me.callParent(arguments);
    },

    onCloseClick: function(){
		this.close();    	
    }
});