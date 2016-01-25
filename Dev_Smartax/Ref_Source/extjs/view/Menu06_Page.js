/* 회계관리 - 거래처원장 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu06_Page', {
    extend: 'Ext.container.Container',
    id:'Menu06_Page',
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
                            id:'menu06_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu06_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu06_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu06_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
						{
			                xtype: 'combobox',
			                id: 'menu06_gycode',
			                labelAlign: 'right',
			                cls:'searchChild',
			                width:250,
			                //value: StoreInfo.Menu08_Grid_SEAR.getAt(0),
							editable: false,
			                fieldLabel: '계정코드',
			                labelSeparator: '',
			                labelWidth: 60,
			                selectOnFocus: true,
			                displayField: 'gy_code_name',
			                queryMode: 'local',
			                store: StoreInfo.Menu08_Grid_SEAR,
			                valueField: 'gycode',
			                enableKeyEvents : true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=jakmok_cd]').focus();
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
                                    fn: me.onMenu06_SearchBtnClick,
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
		                    xtype: 'tabpanel',
		                    flex: 1,
		                    activeTab: 0,
		                    items: [
		                        {
		                            xtype: 'panel',
		                            title: '거래원장',
		                            layout:{
				                    	type:'hbox',
				        				align: 'stretch'
				                    },
		                            items: [
			                            {
						                    xtype: 'gridpanel',
						                    width: 200,
						                    autoScroll:true,
						                    margin: '5 5 5 5',
						                    store: StoreInfo.Menu06_Grid1,
						                    columns: [
						                        {
						                            xtype: 'gridcolumn',
						                            dataIndex: 'customer_id',
						                            align:'center',
						                            sortable: true,
						                            text: '거래처코드',
						                            width: 80
						                        },
						                        {
						                            xtype: 'gridcolumn',
						                            style: 'text-align:center',
						                            flex:1,
						                            text: '거래처명',
						                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
						                            	var customer_id = record.get('customer_id');
					                            		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', customer_id, null, null, null, true);
					                            		if(codeRecord) return codeRecord.get('tr_nm');
					                            		else return '';  
				                            		}
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
						                    flex:1,
						                    autoScroll:true,
						                    margin: '5 5 5 0',
						                    store: StoreInfo.Menu06_Grid2,
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
										            width: 400
						                        },
						                        {
						                            xtype: 'numbercolumn',
						                            dataIndex: 'credit',
						                            style: 'text-align:center',
						                            sortable: false,
						                            width: 120,
						                            align: 'right',
						                            format:'0,000',
						                            text: '입금/대변'
						                        },
						                        {
						                            xtype: 'numbercolumn',
						                            dataIndex: 'debit',
						                            style: 'text-align:center',
						                            sortable: false,
						                            width: 120,
						                            align: 'right',
						                            format:'0,000',
						                            text: '출금/차변'
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
										               			var fromDt = Ext.getCmp('menu06_date_str').getValue();
																var toDt = Ext.getCmp('menu06_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 거래원장 ]';
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
												            }
										               	},
										               	{
										               		xtype: 'exporterbutton',
										               		downloadName: '거래원장',
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
		                        },
		                        {
		                            xtype: 'panel',
		                            title: '잔액명세',
		                            layout:{
				                    	type:'hbox',
				        				align: 'stretch'
				                    },
		                            items: [
		                                 {
						                    xtype: 'gridpanel',
						                    id:'Menu06_Grid_3',
						                    flex:1,
						                    border: 0,
						                    autoScroll:true,
						                    store:  StoreInfo.Menu06_Grid3,
						                    viewConfig: {
											    getRowClass: function(record, rowIndex, rowParams, store){
											    	var cls = "row-valid";
											    	var type = record.get('type');
											    	if(type == 1) cls = "row-pre";
											    	return cls;
											    }
											},
						                    columns: [
						                        {
						                            xtype: 'gridcolumn',
						                            dataIndex: 'customer_id',
						                            style:'text-align:center;',
						                            sortable: false,
						                            text: '거래처',
										            width: 150,
										            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
						                        		var code = value;
						                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
						                        		if(codeRecord) code += ' '+codeRecord.get('tr_nm');
						                        		return code; 
						                            }
						                        },
						                        {
						                            xtype: 'numbercolumn',
						                            dataIndex: 'gicho',
						                            style:'text-align:center;',
						                            sortable: false,
						                            width: 120,
						                            align: 'right',
						                            format:'0,000',
						                            text: '기초잔액'
						                        },
						                        {
						                            xtype: 'numbercolumn',
						                            dataIndex: 'value_credit',
						                            style:'text-align:center;',
						                            sortable: false,
						                            width: 120,
						                            align: 'right',
						                            format:'0,000',
						                            text: '입금/대변'
						                        },
						                        {
						                            xtype: 'numbercolumn',
						                            dataIndex: 'value_debit',
						                            style:'text-align:center;',
						                            sortable: false,
						                            width: 120,
						                            align: 'right',
						                            format:'0,000',
						                            text: '출금/차변'
						                        },
						                        {
						                            xtype: 'numbercolumn',
						                            dataIndex: 'rest',
						                            style:'text-align:center;',
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
										               			var fromDt = Ext.getCmp('menu06_date_str').getValue();
																var toDt = Ext.getCmp('menu06_date_end').getValue();
																var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
																var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
																
										               			Ext.ux.grid.Printer.mainTitle = '[ 잔액명세 ]'; 
										               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
												            	Ext.ux.grid.Printer.print(this.up().up());
												            }
										               	},
										               	{
										               		xtype: 'exporterbutton',
										               		downloadName: '잔액명세',
										               		cls:'bottomChild'
										               	}
													]
												}
											],
						                    listeners: {
						                        celldblclick: {
						                            fn: me.onGridpanelCellDblClick,
						                            scope: me
						                        },
						                        itemdblclick: {
													fn: me.onGridpanelItemDblClick,
													scope: me
												},
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
		            ]
		        }
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                },
                show:{
                	fn: me.onContainerShowRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	
    },

    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
		var now = new Date();
		Ext.getCmp('menu06_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu06_date_end').setValue(new Date());
		
		//계정코드검색 데이터 셋팅
		this.onContainerShowRender();
		this.onMenu06_SearchBtnClick();
    },
    
    //화면이 숨겨졌다 보여질때
    onContainerShowRender: function(component, eOpts) {
    	var codeArr = StoreInfo.Menu08_Grid.data.items.slice(0);
    	var store = StoreInfo.Menu08_Grid_SEAR;
    	var value = Ext.getCmp('menu06_gycode').getValue();
    	
    	store.removeAll();
    	codeArr.splice(0, 1); //103 보통예금 제거(이유 모름)
		store.add(codeArr);
    	
    	//예비계정 삭제(사용되는 계정이 아니므로 옵션에서 제외)
    	store.remove(store.findRecord('gycode', '496'));
        store.remove(store.findRecord('gycode', '497'));
        
    	if(!value) Ext.getCmp('menu06_gycode').select(codeArr[0]);
    },
    
    /*
    onContainerBeforeHide: function(component, eOpts) {
    	StoreInfo.Menu08_Grid.clearFilter();
    },
    onContainerBeforeRender: function(component, eOpts) {
		StoreInfo.Menu08_Grid.filterBy(function(rec){
	    	if(rec.get('gycode') == '101') return false;
		    else return true;
		});    	
    },
    onContainerShow: function(component, eOpts) {
		StoreInfo.Menu08_Grid.filterBy(function(rec){
	    	if(rec.get('gycode') == '101') return false;
		    else return true;
		});    	
    },
    */
    
    //조회버튼을 눌렀을 경우
    onMenu06_SearchBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var fromDt = Ext.getCmp('menu06_date_str').getValue();
		var toDt = Ext.getCmp('menu06_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var gycode = Ext.getCmp('menu06_gycode').getValue();
		
		var params = {
			from_yyyymmdd: from_yyyymmdd,
			to_yyyymmdd: to_yyyymmdd,
			gycode: gycode
		};
		
		//그리드 삭제 
		StoreInfo.Menu06_Grid1.removeAll();
		StoreInfo.Menu06_Grid2.removeAll();
		
		Global.showMask(Ext.getBody());
		//console.log(params);
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/customer_list_proc.php',
			params: params,
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					//StoreInfo.Menu06_Grid1.removeAll();
					StoreInfo.Menu06_Grid1.add(json.DATA);
					thisObj.callCustomerBalance(params);
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
    
    //거래처 코드에 대한 상세 정보 호출
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	
    	var fromDt = Ext.getCmp('menu06_date_str').getValue();
		var toDt = Ext.getCmp('menu06_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var gycode = Ext.getCmp('menu06_gycode').getValue();
		var customer_id = record.get('customer_id');
		
		Global.showMask(Ext.getBody());
		console.log(from_yyyymmdd);
		console.log(to_yyyymmdd);
		
		Ext.Ajax.request({
			method: 'POST',
			//url: './proc/account/report/customer_ledger_proc.php',
			url: './proc/account/report/customer_ledger_adv_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd: to_yyyymmdd,
				gycode: gycode,
				customer_id :customer_id
			},
			success: function(response, opts) {
				Global.hideMask();
				console.log(response.responseText);
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu06_Grid2.removeAll();
					StoreInfo.Menu06_Grid2.add(json.DATA);
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
    
    //잔액명세 가져오기
    callCustomerBalance: function(params)
    {
    	
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/customer_balance_proc.php',
			params: params,
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu06_Grid3.removeAll();
					StoreInfo.Menu06_Grid3.add(json.DATA);
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
    // 거래처 원장 팝업 오픈
    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (record.get('type') == 1) return;
        
    	var pop = Ext.create('Common_Pop_CustomersLedger');
		 
		var fromDt = Ext.getCmp('menu06_date_str').getValue();
		var toDt = Ext.getCmp('menu06_date_end').getValue();
		pop.from_yyyymmdd = (fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'));
		pop.to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		pop.gycode = Ext.getCmp('menu06_gycode').getValue();
		pop.customer_id = record.get('customer_id');
		
		Global.openPopup(pop);
    },
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(거래처원장)', 'Menu06');
    },
});

