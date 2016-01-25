/* 회계관리 - 결산서 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu07_Page', {
    extend: 'Ext.container.Container',
    id:'Menu07_Page',
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
                            id:'menu07_date_str',
                            readOnly: true,
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu07_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                       	 },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu07_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu07_SearchBtnClick();
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
	                                fn: me.onMenu07_SearchBtnClick,
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
                    xtype: 'tabpanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '재무상태표',
                            flex:1,
                           	layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
                            autoScroll:true,
                            items: [
                               {
				                    xtype: 'gridpanel',
				                    id:'Menu07_Grid1',
				                    border:0,
				                    flex:1,
				                    autoScroll:false,
				                    store:  StoreInfo.Menu07_Grid1,
				                    viewConfig: {
									    getRowClass: function(record, rowIndex, rowParams, store){
									    	var cls = "row-valid";
									    	if(record.get('type') == -1) cls = "row-month";
									    	if(record.get('type') == -2) cls = "row-profit";
									    	return cls;
									    }
									},
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode_debit',
				                            style: 'text-align:center;',
				                            sortable: false,
				                            text: '계정과목',
								            width: 150,
								            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                        		if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
				                            		if(codeRecord) showText += " "+codeRecord.get('gy_name');
				                            	}
				                            	return showText;
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'tr_am_debit',
				                            style: 'text-align:center;',
				                            sortable: false,
				                            width: 150,
				                            align: 'right',
				                            format:'0,000',
				                            text: '금액'
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode_credit',
				                            sortable: false,
				                            text: '계정과목',
				                            style: 'text-align:center;',
								            width: 150,
								            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                        		if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
				                            		if(codeRecord) showText += " "+codeRecord.get('gy_name');
				                            	}
												return showText;
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'tr_am_credit',
				                            sortable: false,
				                            style: 'text-align:center;',
				                            width: 150,
				                            align: 'right',
				                            format:'0,000',
				                            text: '금액'
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
						               					var fromDt = Ext.getCmp('menu07_date_str').getValue();
														var toDt = Ext.getCmp('menu07_date_end').getValue();
														var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
														var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
														
								               			Ext.ux.grid.Printer.mainTitle = '[ 재무상태표 ]';
								               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
										            	Ext.ux.grid.Printer.print(this.up().up());
										            }
								               	},
								               	{
								               		xtype: 'exporterbutton',
								               		downloadName: '재무상태표',
								               		cls:'bottomChild'
								               	}
											]
										}
									]
				              	}
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: '손익계산서',
                            flex:1,
                           	layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
                            autoScroll:true,
                            items: [
                                 {
				                    xtype: 'gridpanel',
				                    id:'Menu07_Grid2',
				                    flex:1,
				                    border:0,
				                    width:450,
				                    store:  StoreInfo.Menu07_Grid2,
				                    viewConfig: {
									    getRowClass: function(record, rowIndex, rowParams, store){
									    	var cls = "row-valid";
									    	var type = record.get('type');
									    	if(type == -3) cls = "row-sum";
									    	else if(type == -1) cls = "row-pre";
									    	else if(type == -2) cls = "row-pre";
									    	return cls;
									    }
									},
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode',
				                            sortable: false,
				                            text: '계정과목',
				                            style: 'text-align:center;',
								            width: 150,
								            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                        		if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
				                            		if(codeRecord) showText = showText+" "+codeRecord.get('gy_name');
				                            	}
												return showText ;
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'tr_am',
				                            sortable: false,
				                            width: 150,
				                            align: 'right',
				                            format:'0,000',
				                            style: 'text-align:center;',
				                            text: '금액'
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'sum',
				                            sortable: false,
				                            width: 150,
				                            align: 'right',
				                            format:'0,000',
				                            style: 'text-align:center;',
				                            text: '소계'
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
								               			
								               			var fromDt = Ext.getCmp('menu07_date_str').getValue();
														var toDt = Ext.getCmp('menu07_date_end').getValue();
														var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
														var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
														
								               			Ext.ux.grid.Printer.mainTitle = '[ 손익계산서 ]';
								               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
										            	Ext.ux.grid.Printer.print(this.up().up());
										            }
								               	},
								               	{
								               		xtype: 'exporterbutton',
								               		downloadName: '손익계산서',
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
                        tabchange: {
                            fn: me.onTabpanelTabChange,
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
		Ext.getCmp('menu07_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu07_date_end').setValue(now);
		this.onMenu07_SearchBtnClick();
		
    },
    
    //조회
    onMenu07_SearchBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	
		var toDt = Ext.getCmp('menu07_date_end').getValue();
		var to_yyyymm = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0');
		
		Ext.getCmp('menu07_date_str').setValue( new Date('1/1/'+toDt.getFullYear()));
    	
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/balance_sheet_proc.php',
			params:{
				to_yyyymm: to_yyyymm
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.settingStore(json);
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
    			
    },
    
    //제이슨 데이터 각 스토어에 분개하여 셋팅
    settingStore: function(data)
    {
    	StoreInfo.Menu07_Grid1.removeAll();
    	StoreInfo.Menu07_Grid1.add(data.debit);
    	
    	var debitData = data.debit;
    	var creditData = data.credit;
    	var maxLength = Math.max(data.debit.length, data.credit.length);
    	
    	StoreInfo.Menu07_Grid1.removeAll();
    	
    	for(var i=0; i<maxLength; i++)
    	{
    		
    		var gycode_debit = '';
    		var tr_am_debit = ''; 
    		var gycode_credit = '';
    		var tr_am_credit = '';
    		
    		var rowDebit = debitData[i];
    		var rowCredit = creditData[i];
    		if(rowDebit)
    		{
    			gycode_debit = rowDebit.gycode;
    			tr_am_debit = rowDebit.tr_am;
    		}   
    		if(rowCredit)
    		{
    			gycode_credit = rowCredit.gycode;
    			tr_am_credit = rowCredit.tr_am;
    		}   
    		
			StoreInfo.Menu07_Grid1.add({
				'gycode_debit': gycode_debit, 
				'tr_am_debit': tr_am_debit,
				'gycode_credit': gycode_credit,
				'tr_am_credit': tr_am_credit			
			});
    	}
    	
    	StoreInfo.Menu07_Grid1.add({
    		'type': -1,
			'gycode_debit': data.sum[0].gycode, 
			'tr_am_debit': data.sum[0].tr_am,
			'gycode_credit': data.sum[1].gycode,
			'tr_am_credit': data.sum[1].tr_am			
		});
		
		var lastRec = StoreInfo.Menu07_Grid1.getAt(StoreInfo.Menu07_Grid1.getCount()-2);
		if(lastRec)
		{
			lastRec.set({
				'type': -2,
				'gycode_credit': data.sum[2].gycode,
				'tr_am_credit': data.sum[2].tr_am
			});
			lastRec.commit();	
		}
    	
    	StoreInfo.Menu07_Grid2.removeAll();
    	StoreInfo.Menu07_Grid2.add(data.income.group1_sum);
    	StoreInfo.Menu07_Grid2.add(data.income.group1);
    	StoreInfo.Menu07_Grid2.add(data.income.group2_sum);
    	StoreInfo.Menu07_Grid2.add(data.income.group2);
    	StoreInfo.Menu07_Grid2.add(data.income.group_sum);
    	
    },
    
    //물음표버튼을 눌렀을 경우
    	
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(분개장 입력)', 'Menu07');
    }
    
});

