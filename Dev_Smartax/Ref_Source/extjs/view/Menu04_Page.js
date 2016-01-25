/* 회계관리 - 현금출납장 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu04_Page', {
    extend: 'Ext.container.Container',
    id:'Menu04_Page',
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
                            id:'menu04_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu04_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu04_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu04_SearchBtnClick();
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
                                    fn: me.onMenu04_SearchBtnClick,
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
                    xtype: 'gridpanel',
                    id:'Menu04_Grid',
                    cls:'grid',
                    flex:1,
                    autoScroll:true,
                    store: StoreInfo.Menu04_Grid,
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
                            dataIndex: 'jp_yyyymmdd',
                            style: 'text-align:center',
                            sortable: false,
                            text: '일자',
                            align:'center',
				            width: 100,
				            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				            	if(value == -1 || value == '') return '';
				            	else return value.substring(0, 4)+'-'+value.substring(4, 6)+'-'+value.substring(6, 8);
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'jp_rem',
                            style: 'text-align:center',
                            sortable: false,
                            text: '적요',
				            width: 250
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'customer_id',
                            style: 'text-align:center',
                            width: 140,
                            sortable: false,
                            text: '거래처',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        		var code = Ext.String.leftPad(value, 5, '0');
                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                        		if(codeRecord) return code+" "+codeRecord.get('tr_nm');
                            },
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'credit',
                            style: 'text-align:center',
                            sortable: false,
                            width: 120,
                            align: 'right',
                            format:'0,000',
                            text: '입금'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'debit',
                            style: 'text-align:center',
                            sortable: false,
                            width: 120,
                            align: 'right',
                            format:'0,000',
                            text: '출금'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'sum',
                            style: 'text-align:center',
                            sortable: false,
                            width: 120,
                            align: 'right',
                            format:'0,000',
                            text: '잔액'
                        }
                    ],
                    plugins: [         
						Ext.create('Ext.grid.plugin.BufferedRenderer', {
						})
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
				               			
				               			var fromDt = Ext.getCmp('menu04_date_str').getValue();
										var toDt = Ext.getCmp('menu04_date_end').getValue();
										var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
										var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
										
				               			Ext.ux.grid.Printer.mainTitle = '[ 현금원장 ]';
				               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
						            	Ext.ux.grid.Printer.print(this.up().up());
						            }
				               	},
				               	{
				               		xtype: 'exporterbutton',
				               		downloadName: '현금원장',
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
		Ext.getCmp('menu04_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu04_date_end').setValue(new Date());
		
		this.onMenu04_SearchBtnClick();
    },
    
    //조회버튼을 눌렀을 경우
    onMenu04_SearchBtnClick: function(button, e, eOpts) {
    	
		var fromDt = Ext.getCmp('menu04_date_str').getValue();
		var toDt = Ext.getCmp('menu04_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		Global.showMask(Ext.getBody());

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/cash_report_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu04_Grid.removeAll();
					StoreInfo.Menu04_Grid.add(json.DATA);
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
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(현금출납장)', 'Menu04');
    },
});

