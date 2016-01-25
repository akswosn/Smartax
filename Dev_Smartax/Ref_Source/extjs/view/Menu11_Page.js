/* 기초자료관리 - 기초금액등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu11_Page', {
    extend: 'Ext.container.Container',
    id:'Menu11_Page',
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
                            xtype: 'numberfield',
                            id: 'menu11_year',
                            cls:'searchChild',
                            width: 170,
                            fieldLabel: '기초잔액 발생연도',
                            labelSeparator: '',
                            labelWidth: 100,
                            selectOnFocus: true,
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu01_SearchBtnClick();
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
	                                fn: me.onMenu01_SearchBtnClick,
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
                            text: '대차표',
                            listeners: {
                                click: function() {
                                    var pop = Ext.create('Common_Pop_BalanceSheet');
                                    Global.openPopup(pop);    
                                }
                            }
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
                    id: 'tab_lay_gicho',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '계정별 잔액등록',
                            id: 'tab_lay0',
                            layout: {
						        type: 'hbox',
						        align: 'stretch'
						    },
						    flex:1,
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    cls:'tab_grid',
				                    flex:1,
				                    autoScroll:true,
				                    store:  StoreInfo.Menu11_Grid1,
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode',
				                            align:'center',
				                            sortable: true,
				                            text: '계정코드',
				                            width: 80
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gy_name',
				                            style: 'text-align:center',
				                            width: 110,
				                            text: '계정명'
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'gy_am',
				                            style: 'text-align:center',
				                            width: 90,
				                            align: 'right',
				                            format:'0,000',
				                            text: '잔액',
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
				                            	fieldStyle: 'text-align: right;',
								                minValue: 0,
								                format:'0,000',
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        },
				                        {
				                            xtype: 'gridcolumn',
								            flex:1
				                        }
				                        
				                    ],
				                    plugins: [Ext.create('Ext.grid.plugin.CellEditing',         
									{             
									    clicksToEdit: 1,
								        listeners: {
								        	beforeedit: function (editor, e, eOpts) {
								        		
												if(e.record.get('gycode') == 249 )
												{
													if(Global.isEnter) editor.startEditByPosition({row: e.rowIdx+1, column: 2});
													Global.isEnter = false;
													return false;	
												}
								        	},
								            edit: function (editor, e, eOpts) {
							                    if(Global.isEnter) editor.startEditByPosition({row: e.rowIdx+1, column: 2});
							                    Global.isEnter = false;
							                    return false;
								            }
								        }         
									})],
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
								               		text: '저장',
								               		cls:'bottomChild',
								               		listeners: {
										                click: {
										                    fn: me.onSaveBtnClick,
										                    scope: me
										                }
										            }
								              	},
												{
								               		xtype:'button',
								               		text: '인쇄',
								               		cls:'bottomChild',
								               		handler : function(){
								               			var year = Ext.getCmp('menu11_year').getValue();
								               			Ext.ux.grid.Printer.mainTitle = '[ 계정별 잔액 ]';
								               			Ext.ux.grid.Printer.subDate = '( '+year+' )';
										            	Ext.ux.grid.Printer.print(this.up().up());
										            }
								               	},
								               	{
								               		xtype: 'exporterbutton',
								               		downloadName: '계정별 잔액',
								               		cls:'bottomChild'
								               	}
											]
										}
									]
								},
								{
						           	xtype: 'container',
									cls: 'right_content',
									style:'background-color:#FAFAFA !important;margin-right:5px;margin-bottom:5px;',
				                    layout: {
				                    	align: 'stretch',
								        type: 'vbox'
								    },
								    width:300,
								    autoScroll:true,
								    items:[
										{
											xtype:'panel',
											margin: 20,
											bodyPadding: 20,
											html:'거래처별 기초잔액은 <br>'+
											'계정별 기초잔액을 먼저 입력하신후<br>'+
											'거래처별 잔액을 입력할수 있습니다.<br>'+
											'거래처별 잔액의 합계가<br>'+
											'계정별 잔액의 합보다 큰금액을<br>'+
											'입력할수 없습니다.<br>'
										},						    
										{
											xtype:'panel',
											margin: 20,
											bodyPadding: 20,
											html:'계정잔액을 지우시려면,<br>금액을 "0"으로 입력하고 저장하십시요.'
										}						    
								    ]
								}
							]
		               	},
                        {
                            xtype: 'panel',
                            title: '거래처별 잔액등록',
                            id: 'tab_lay1',
                            layout: {
						        type: 'hbox',
						        align: 'stretch'
						    },
						    flex:1,
                            items: [
				                {
				                    xtype: 'gridpanel',
				                    cls:'tab_grid',
				                    width:310,
				                    autoScroll:true,
				                    store:  StoreInfo.Menu11_Grid1,
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode',
				                            align:'center',
				                            sortable: true,
				                            text: '계정코드',
				                            width: 80
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gy_name',
				                            style: 'text-align:center',
				                            width: 110,
				                            text: '계정명'
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'gy_am',
				                            style: 'text-align:center',
				                            width: 90,
				                            align: 'right',
				                            format:'0,000',
				                            text: '잔액'
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            minWidth:10,
								            flex:1
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
				                    cls:'tab_grid',
				                    id: 'Menu11_Grid',
				                    flex:1,
				                    autoScroll:true,
				                    store:  StoreInfo.Menu11_Grid,
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'customer_id',
				                            style: 'text-align:center',
				                            width: 120,
				                            text: '거래처',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var code = Ext.String.leftPad(value, 5, '0');
				                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
				                        		if(codeRecord) return code+" "+codeRecord.get('tr_nm');
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu09_Grid,
											    //editable : false,
											    autoSelect: false,
											    minChars: 1,
											    hideTrigger: true,  
											    queryMode: 'local',
											    displayField: 'tr_nm',
											    valueField: 'customer_id',
											    enableKeyEvents : true,
											    listeners: {
											    	keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Trds');
						                                    	var grid = Ext.getCmp('Menu11_Grid');
						                                    	grid.getPlugin().cancelEdit();
						                                    	pop.grid = grid;
						                                    	pop.key = 'customer_id';
						                                    	pop.record = grid.getSelectionModel().getSelection()[0];
						                                    	Global.openPopup(pop);
						                                    	return false;
						                                    }
						                                }
						                            },
					                                specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
					                            }
											})
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'tr_am',
				                            width: 100,
				                            style: 'text-align:center',
				                            align: 'right',
				                            format:'0,000',
				                            text: '잔액',
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
				                            	fieldStyle: 'text-align: right;',
								                minValue: 0,
								                format:'0,000',
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                        },
				                        {
				                            xtype: 'gridcolumn',
								            flex:1
				                        }
				                    ],
				                    plugins: [Ext.create('Ext.grid.plugin.CellEditing',         
									{             
									    clicksToEdit: 1,
								        listeners: {
								            edit: function (editor, e, eOpts) {
								            	var movePos = null;
								            	
							                    if(Global.isEnter)
							                    {
							                    	//적요입력을 완료했을때 줄바꾸면서 column: 1부터 다시 에디트 포커스 주기
								            		if((e.grid.columns.length-2) == e.colIdx){
								            			if(e.grid.getStore().getCount() == (e.rowIdx+1)){
								            				StoreInfo.Menu11_Grid.add({ gycode: '', tr_am: 0 });
								            			}
								            			movePos = {row: e.rowIdx+1, column: 0};
								            		} 
								            		else movePos = {row: e.rowIdx, column: e.colIdx+1};
							                    	editor.startEditByPosition(movePos);
							                    } 
							                    Global.isEnter = false;
							                    me.amountSum();
							                    return false;
								            },
								            canceledit: function (editor, e, eOpts) {
								            	Global.cellPos = {row: e.rowIdx, column: e.colIdx};
								            }
								        }         
									})],
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
								               		text: '저장',
								               		cls:'bottomChild',
								               		listeners: {
										                click: {
										                    fn: me.onSaveBtnClick,
										                    scope: me
										                }
										            }
								              	},
												{
								               		xtype:'button',
								               		text: '인쇄',
								               		cls:'bottomChild',
								               		handler : function(){
								               			var year = Ext.getCmp('menu11_year').getValue();
								               			Ext.ux.grid.Printer.mainTitle = '[ 거래처별 잔액 ]';
								               			Ext.ux.grid.Printer.subDate = '( '+year+' )';
										            	Ext.ux.grid.Printer.print(this.up().up());
										            }
								               	},
								               	{
								               		xtype: 'exporterbutton',
								               		downloadName: '거래처별 잔액',
								               		cls:'bottomChild'
								               	}
											]
										}
									]
								},
								{
						           	xtype: 'container',
						           	cls: 'right_content',
									style:'background-color:#FAFAFA !important;margin-right:5px;margin-bottom:5px;',
				                    layout: {
				                    	align: 'stretch',
								        type: 'vbox'
								    },
								    width:300,
								    autoScroll:true,
								    items:[
										{
											xtype:'panel',
											layout:{
												align:'middle'
											},
											margin: 20,
											bodyPadding: 20,
											items:[
												{
													xtype: 'container',
													html:'인명잔액이 계정잔액을<br>초과할 수 없습니다.'
												},
												{
													xtype: 'container',
													height: 80,
													margin: '20 0',
													style:'border: 1px solid #99BCE8; background: #FAFAFA;',
													layout: {
													    type: 'vbox',
											            align: 'center',
												        pack: 'center'
													},
													items:[
														{
															xtype: 'textfield',
															id: 'tot_am', 
															fieldLabel: '계정잔액',
															fieldStyle: 'text-align:right',
															width:150,
															labelSeparator: '',
															labelWidth: 60,
															format:'0,000.0',
															readOnly: true,
															hideTrigger: true,
															align:'right'
														},
														{
															xtype: 'textfield',
															id: 'tot_tr_am', 
															fieldLabel: '인명잔액',
															fieldStyle: 'text-align:right',
															width:150,
															labelSeparator: '',
															labelWidth: 60,
															format:'0,000.0',
															readOnly: true,
															hideTrigger: true,
															align:'right',
															validator : function(){
																var totVal = Ext.getCmp('tot_am').getValue();
																totVal = parseInt(totVal.replace(/,/g, ''), 10);
														    	var sumVal = StoreInfo.Menu11_Grid.sum('tr_am');
														    	sumVal = parseInt(sumVal, 10);
														    	
														    	if(totVal>=0){
														    		if(sumVal > totVal) return false;
														    		else return true;
														    	}
														    	else
														    	{
														    		if(sumVal > 0) return false;
														    			
														    		if(sumVal < totVal) return false;
														    		else return true;
														    	}
														    	
															}
														}
													]
												}
											]
											
										},						    
										{
											xtype:'panel',
											margin: 20,
											bodyPadding: 20,
											html:'거래처를 삭제하시려면<br>거래처 잔액을 "0"으로 입력하고<br>저장하십시요.'
										}						    
								    ]
								}
							]
		               	}
		            ],
		           	listeners: {
		                beforetabchange: {
		                    fn: me.onTabpanelBeforeTabChange,
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
                /*
                beforeshow: {
                    fn: me.onContainerBeforeShow,
                    scope: me
                },
                
                beforehide: {
                    fn: me.onContainerBeforeHide,
                    scope: me
                }
                */
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//

	//화면이 처음 생성되고 난후  
    onContainerAfterRender: function(component, eOpts) {
		Ext.getCmp('menu11_year').setValue(new Date().getFullYear());
		this.doFilter();
		this.doSearch();
    },
    
    //계정코드 100~299번때 까지만 필터하기
    doFilter: function(){
    	
    	StoreInfo.Menu11_Grid1.removeAll();
    	for(var i=0; i<StoreInfo.Menu08_Grid.getCount(); i++)
    	{
    		var record = StoreInfo.Menu08_Grid.getAt(i);
    		var groupNum = parseInt(record.get('gy_group'), 10);
			if(groupNum < 3) StoreInfo.Menu11_Grid1.add(record);	
    	} 
    },
    
    //계정별 기초금액을 0원으로 초기화
    clearAm: function(jsonData){
    	for(var i=0; i<StoreInfo.Menu11_Grid1.getCount(); i++)
    		StoreInfo.Menu11_Grid1.getAt(i).set('gy_am', 0);	
    },
    
    //계정별 기초금액 업데이트
    updateAm: function(jsonData){
    	for(var i=0; i<jsonData.length; i++)
    	{
    		var upRecord = StoreInfo.Menu11_Grid1.findRecord('gycode', jsonData[i].gycode, null, null, null, true);
    		if(upRecord) upRecord.set('gy_am', jsonData[i].gy_am);
    		else StoreInfo.Menu11_Grid1.add({
    			'gycode': jsonData[i].gycode,
    			'gy_am': jsonData[i].gy_am
			});
    	}
    	StoreInfo.Menu11_Grid1.commitChanges();
    	StoreInfo.Menu11_Grid1.sort('gycode', 'ASC');
    },
    
    //계정별 기초금액 검색
    doSearch: function(){
    	
    	var thisObj = this;
    	var year = Ext.getCmp('menu11_year').getValue();
    	
    	Global.showMask(Ext.getBody());
	
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/gicho/gicho_m_list_proc.php',
			params: {
				year: parseInt(year, 10)
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.clearAm();
    				thisObj.updateAm(json.DATA);
				}
				else{
					Ext.Msg.alert("", '등록 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '등록 실패!');
			}
		});	
    },
    
    //기초계정금액 등록
    registerGyAmount: function(){
    	
    	var thisObj = this;
    	var year = Ext.getCmp('menu11_year').getValue();
    	
    	var modiArr = StoreInfo.Menu11_Grid1.getModifiedRecords();
    	var paramArr = [];
    	if(modiArr.length > 0)
    	{
    		Global.showMask(Ext.getBody());
    		for(var i=0; i<modiArr.length;i++)
    		{
    			paramArr.push({
    				gycode: parseInt(modiArr[i].get('gycode'), 10),
					gy_am: parseInt(modiArr[i].get('gy_am'), 10)	
    			});
    		}
    		
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/gicho/gicho_m_register_proc.php',
				params: {
					year: parseInt(year, 10),					
					data: JSON.stringify(paramArr)
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						thisObj.setCommitSuccessData(modiArr, 'gycode', json.DATA);
					}
					else{
						Ext.Msg.alert("", '변경 실패!');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '변경 실패!');
				}
			});
    	}
    },
    
      //기초금액 그리드의 row를 선택했을때
	onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
		
		//console.log('저장여부체크로직 필요후 서버콜');
		
		Global.showMask(this);
		var tot_tr_am = 0;
		var year = Ext.getCmp('menu11_year').getValue();
		Ext.getCmp('tot_am').setValue(Ext.util.Format.number(record.get('gy_am'), '0,000'));
		Ext.getCmp('tot_tr_am').setValue(Ext.util.Format.number(tot_tr_am, '0,000'));
		
		//상세 금액 등록에서 쓰임
		Global.selGycode = record.get('gycode');
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/gicho/gicho_d_list_proc.php',
			params: {
				gycode: parseInt(record.get('gycode'), 10),
				year:  year
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu11_Grid.removeAll();
					if(json.DATA.length > 0)
					{
						StoreInfo.Menu11_Grid.add(json.DATA);
						tot_tr_am = StoreInfo.Menu11_Grid.sum('tr_am');
					}
					StoreInfo.Menu11_Grid.add({ gycode: '', tr_am: 0 });
					StoreInfo.Menu11_Grid.commitChanges();	
					Ext.getCmp('tot_tr_am').setValue(Ext.util.Format.number(tot_tr_am, '0,000'));
				}
				else{
					Ext.Msg.alert("", '호출 실패');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '호출 실패');
			}
		});	
    	 
    },
    
	//거래처 상세잔액 저장
    registerDetailGyAmount: function(){
    	
    	var thisObj = this;
    	
		var year = Ext.getCmp('menu11_year').getValue();
	
    	var modiArr = StoreInfo.Menu11_Grid.getModifiedRecords();
    	modiArr = Global.sortModelArr(modiArr);
    	
    	var paramArr = [];
    	
    	if(modiArr.length > 0)
    	{
    		Global.showMask(Ext.getBody());
    		for(var i=0; i<modiArr.length;i++)
    		{
    			var cusId = modiArr[i].get('customer_id');
    			if(cusId)
    			{
    				paramArr.push({
	    				customer_id: parseInt(cusId, 10),
						tr_am: parseInt(modiArr[i].get('tr_am'), 10),
						row_idx: StoreInfo.Menu11_Grid.indexOf(modiArr[i])
	    			});	
    			}
    		}
    		
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/gicho/gicho_d_register_proc.php',
				params: {
					year: parseInt(year, 10),
					gycode: Global.selGycode,
					data: JSON.stringify(paramArr)
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						thisObj.sucessRowUpdate(json.DATA);
					}
					else{
						Ext.Msg.alert("", '변경 실패!');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '변경 실패!');
				}
			});
    	}
    	
    },
    
    //성공한 데이터는 그리드에 업데이트 실패한 경우가 있을경우 알림창을 띄움	
    sucessRowUpdate: function(data)
    {
    	var failCnt = 0;
    	var delArr = [];
    	
    	if(!data['cd']){
	   		 Ext.Msg.alert("", '<span style="color:red;">저장 오류 입니다.</span>');
	   		return;
    	}
    	
    	for(var i=0; i<data['cd'].length; i++)
    	{
    		var rowData = data['cd'][i];
    		if(rowData.cd == '-1') failCnt++;
    		else
    		{
				var record = StoreInfo.Menu11_Grid.getAt(rowData);
				if(record.get('tr_am') == 0 || record.get('tr_am') == '') delArr.push(record);
				record.commit();		
    		}
    	}
    	
    	for(var i=0; i<delArr.length; i++)
    	{
    		var delRecord = delArr[i];
    		StoreInfo.Menu11_Grid.remove(delRecord);
    		delRecord.commit();
    	}
    	
    	//StoreInfo.Menu11_Grid.sort('customer_id', 'ASC');
    	if(failCnt > 0) Ext.Msg.alert("", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 저장실패되었습니다.</span>');
    },
    
    //성공한 데이터는 커밋 성공못한 데이터는 그대로 남겨두기
    setCommitSuccessData: function(modelArr, key, data){
    	var allSuc = true;
    	var janSuc = true;
    	for(var i=0; i<modelArr.length;i++)
		{
			var result = data[modelArr[i].get(key)];
			if(result == '100' || result == '200' || result == '300')
			{
				modelArr[i].commit();	
			}
			else{
				allSuc = false;
				if(result == '999') janSuc = false;
			}
		}
		
		var sameValue = data['249'];
		if(sameValue)
		{
			var sameMdl = StoreInfo.Menu11_Grid1.findRecord('gycode', 249);
			sameMdl.set('gy_am', sameValue);
			sameMdl.commit();
		} 
		
		if(allSuc) Ext.Msg.alert("", '수정되었습니다.');
		else {
			if(janSuc)	Ext.Msg.alert("", '수정에 실패한 데이터가 존재합니다.');
			else 	Ext.Msg.alert("", '거래처별 잔액으로 인한 수정에 실패한 데이터가 존재합니다.');
		}
		
    },
    /*
    //화면이 보여지기전
    onContainerBeforeShow: function(component, eOpts) {
		this.doFilter();
    },
    
    
    //화면이 사라지기전
    onContainerBeforeHide: function(component, eOpts) {
		StoreInfo.Menu08_Grid.clearFilter();
    },
    */
    
    //조회버튼을 눌렀을 경우
    onMenu01_SearchBtnClick: function(button, e, eOpts) {
    	this.doFilter();
		this.doSearch();
    },
    
    //종료 버튼
    onClose_BtnClick: function(button, e, eOpts) {
    	var result = ValidateFunc.checkIsModifyStore([
    		StoreInfo.Menu11_Grid1
    	]);
    	if(result){
    		Ext.MessageBox.confirm('경고!', '수정된 내역이 있습니다. 무시하고 진행하시겠습니까?', function(btn){
                if(btn=='yes'){
                	result[0].rejectChanges();
                	alert('무시하고 종료!');
                }
            });
    	}
    	else alert('바로종료!!'); 
    },
    
    
    //탭을 체인지 할경우
    onTabpanelBeforeTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	
    	var store = null;
    	if(oldCard.id == 'tab_lay0') store = StoreInfo.Menu11_Grid1;
    	else if(oldCard.id == 'tab_lay1') store = StoreInfo.Menu11_Grid;
    	
    	var result = ValidateFunc.checkIsModifyStore([store]);
    	if(result){
    		
    		Ext.MessageBox.confirm('경고!', '수정된 내역이 있습니다. 무시하고 진행하시겠습니까?', function(btn){
                if(btn=='yes'){
                	result[0].rejectChanges();
                	tabPanel.setActiveTab(newCard);
                }
            });
    	} 
    	return !result;
    },
    
    //저장버튼을 눌렀을 경우
    onSaveBtnClick: function(button, e, eOpts) {
    	
    	var activeTab = Ext.getCmp('tab_lay_gicho').getActiveTab();
		if(activeTab.id == 'tab_lay1')
		{
			if(Ext.getCmp('tot_tr_am').isValid()) this.registerDetailGyAmount();
    		else Ext.Msg.alert("", '인명잔액이 계정잔액을 초과할수 없습니다.');	
		}
		else if(activeTab.id == 'tab_lay0') this.registerGyAmount();
    	
    },
    
	//인명잔액 합계 구하기    
    amountSum: function(){
    	Ext.getCmp('tot_tr_am').setValue(Ext.util.Format.number(StoreInfo.Menu11_Grid.sum('tr_am'), '0,000'));
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(기초잔액등록)', 'Menu11');
    },
});

