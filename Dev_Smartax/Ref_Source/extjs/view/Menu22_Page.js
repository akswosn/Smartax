/* 매입/매출관리 - 상품수불부 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu22_Page', {
    extend: 'Ext.container.Container',
    id:'Menu22_Page',
    cls:'page',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex:1,
    initComponent: function() {
        var me = this;
	    
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
				        align: 'middle',
				        type: 'hbox'
				    },
                    cls:'searchBar',
                    items: [
                         {
                            xtype: 'datefield',
                            fieldLabel: '조회기간',
                            id:'menu22_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu22_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu22_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu22_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '조회',
                            listeners: {
                                click: {
                                    fn: me.onMenu22_SearchBtnClick,
                                    scope: me
                                }	
                            }
                            
                        },
                        {
                            xtype: 'label',
                            cls:'searchChild',
                            margin: '4 0 0 10',
                            flex:1,
                            text: '화면 갱신은 조회단추를 다시 눌러주세요.'
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            style:'float:right',
                            text: '사용방법',
                            listeners: {
                                click: {
                                    fn: me.onMenu01_DescriptBtnClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
				        type: 'hbox',
				        align: 'stretch'
				    },
				    flex:1,
				    items:[
				   		{
		                    xtype: 'gridpanel',
		                    cls:'grid',
		                    width: 200,
		                    autoScroll:true,
		                    style: 'margin-right:5px;',
		                    store: StoreInfo.Menu22_Grid1,
		                    columns: [
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'io_item_cd',
		                            align:'center',
		                            sortable: true,
		                            text: '상품코드',
		                            width: 80
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'io_item_nm',
		                            style: 'text-align:center',
		                            flex:1,
		                            text: '상품명'
		                        }
		                    ],
		                    listeners: {
		                        itemclick: {
		                            fn: me.onGridpanelItemClick,
		                            scope: me
		                        }
		                    }
						},
					  	{
		                    xtype: 'gridpanel',
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    store: StoreInfo.Menu22_Grid2,
		                    viewConfig: {
							    getRowClass: function(record, rowIndex, rowParams, store){
							    	var cls = "row-valid";
							    	var type = record.get('io_dt');
							    	if(type == -1) cls = "row-pre";
							    	else if(type == -2) cls = "row-month";
							    	else if(type == -3) cls = "row-sum";
							    	return cls;
							    }
							},
		                    columns: [
		                       	{	xtype: 'gridcolumn', dataIndex: 'io_dt', style:'text-align:center;', align:'center', text: '거래일자', width: 80,
		                       		renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var len = value.length;
		                            	if(len == 8) return value.substring(0,4)+'-'+value.substring(4,6)+'-'+value.substring(6,8); 
										else return '';
		                            }
		                       	},
		                        {	xtype: 'gridcolumn', dataIndex: 'io_tr_nm', style:'text-align:center;', text: '거래처명', width: 120	},
		                        {   xtype: 'numbercolumn', dataIndex: 'in_su', style:'text-align:center;', text: '입고수량', align: 'right', format:'0,000', width: 80 },
		                        {   xtype: 'numbercolumn', dataIndex: 'in_dan', style:'text-align:center;', text: '입고단가', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'in_amt', style:'text-align:center;', text: '입고금액', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'out_su', style:'text-align:center;', text: '출고수량', align: 'right', format:'0,000', width: 80 },
		                        {   xtype: 'numbercolumn', dataIndex: 'out_dan', style:'text-align:center;', text: '출고단가', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'out_amt', style:'text-align:center;', text: '출고금액', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'rest', style:'text-align:center;', text: '재고수량', align: 'right', format:'0,000', width: 80 },
		                        {	xtype: 'gridcolumn', dataIndex: 'io_rem', style:'text-align:center;', text: '비고', width: 120 }
		                    ],
		                    plugins: [ Ext.create('Ext.grid.plugin.BufferedRenderer', {}) ],
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
						               			var fromDt = Ext.getCmp('menu22_date_str').getValue();
												var toDt = Ext.getCmp('menu22_date_end').getValue();
												var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
												var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
												
						               			Ext.ux.grid.Printer.mainTitle = '[ 상품수불부 ]';
						               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
								            	Ext.ux.grid.Printer.print(this.up().up());
							            	}
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '상품수불부',
						               		cls:'bottomChild'
						               	}
									]
								}
							],
		                    listeners: {
		                        celldblclick: {
		                            fn: me.onGridpanelCellDblClick,
		                            scope: me
		                        }
		                    }
		              	}
				    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//

	//화면이 처음 보여질시 셋팅    
    onContainerAfterRender: function(component, eOpts) {
    	var now = new Date();
    	Ext.getCmp('menu22_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu22_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		this.onMenu22_SearchBtnClick();
    },
    
    //조회버튼을 눌렀을 경우
    onMenu22_SearchBtnClick: function(button, e, eOpts) {
		
		var fromDt = Ext.getCmp('menu22_date_str').getValue();
		var toDt = Ext.getCmp('menu22_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		Global.showMask(Ext.getBody());

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/stock/stock_io_list_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu22_Grid1.removeAll();
					StoreInfo.Menu22_Grid1.add(json.DATA);
				}
				else{
					Ext.Msg.alert("", '조회 실패');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
    },
    
    //계정코드에 대한 상세 정보 호출
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	
    	var fromDt = Ext.getCmp('menu22_date_str').getValue();
		var toDt = Ext.getCmp('menu22_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var io_item_cd = record.get('io_item_cd');
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/stock/stock_io_report_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd,
				item_cd :io_item_cd, 
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu22_Grid2.removeAll();
					StoreInfo.Menu22_Grid2.add(json.DATA);
				}
				else{
					Ext.Msg.alert("", '조회 실패');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(상품수불부)', 'Menu22');
    }
});

