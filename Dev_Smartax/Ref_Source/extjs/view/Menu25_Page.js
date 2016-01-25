/* 매입/매출관리 - 초기재고등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu25_Page', {
    extend: 'Ext.container.Container',
    id:'Menu25_Page',
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
                            id: 'menu25_year',
                            cls:'searchChild',
                            width: 180,
                            fieldLabel: '기초재고 발생연도',
                            labelSeparator: '',
                            labelWidth: 100,
                            selectOnFocus: true,
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu25_SearchBtnClick();
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
	                                fn: me.onMenu25_SearchBtnClick,
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
					xtype: 'container',
                    layout: {
				        type: 'hbox',
				        align: 'stretch'
				    },
				    flex:1,
				    items: [
		                {
		                    xtype: 'gridpanel',
		                    id:'Menu25_Grid',
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    store:  StoreInfo.Menu24_Grid,
		                    columns: [
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_cd',
		                            align:'center',
		                            sortable: true,
		                            text: '상품코드',
						            width: 100
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_nm',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '상품명',
						            width: 180
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_qty',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '규격',
						            width: 80
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_danwi',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '단위',
						            width: 80
		                        },
		                        {
		                            xtype: 'numbercolumn',
		                            dataIndex: 'io_su',
		                            style: 'text-align:center',
		                            width: 90,
		                            align: 'right',
		                            format:'0,000',
		                            text: '재고수량',
		                            editor: {
		                            	xtype: 'numberfield',
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
		                        }
		                    ],
		                    plugins: [Ext.create('Ext.grid.plugin.CellEditing',         
							{             
							    clicksToEdit: 1,
						        listeners: {
						            edit: function (editor, e, eOpts) {
					                    if(Global.isEnter) editor.startEditByPosition({row: e.rowIdx+1, column: 4});
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
						               		text: '전년재고 이월',
						               		cls:'bottomChild',
						               		listeners: {
				                                click: {
				                                    fn: me.onHoldoverBtnClick,
				                                    scope: me
				                                }
				                            }
						               	},
						               	{
						               		xtype:'label',
						               		flex:1
						               	},
						               	{
                                            xtype:'button',
                                            text: '엑셀자료 올리기',
                                            cls:'bottomChild',
                                            handler : function(){
                                                var pop = Ext.create('Common_Pop_ExcelUpload');
                                                pop.excelType = 'stock_reg';
                                                pop.io_yyyy = Ext.getCmp('menu25_year').getValue()+'';
                                                Global.openPopup(pop, "엑셀파일 업로드");
                                            }
                                        },
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
						               			var year = Ext.getCmp('menu25_year').getValue();
						               			Ext.ux.grid.Printer.mainTitle = '[ 기초재고 ]';
						               			Ext.ux.grid.Printer.subDate = '( '+year+' )';
								            	Ext.ux.grid.Printer.print(this.up().up());
								            }
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '기초재고',
						               		cls:'bottomChild'
						               	}
									]
								}
							]
		              	},
		               	{
				           	xtype: 'container',
							cls: 'right_content',
							width:300,
		                    layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
						     autoScroll:true
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
    	Ext.getCmp('menu25_year').setValue(new Date().getFullYear());
    	this.onMenu25_SearchBtnClick();
    },
    
    //조회버튼을 눌렀을 경우
    onMenu25_SearchBtnClick: function(button, e, eOpts) {
    	
		var thisObj = this;    
    	var io_yyyy = Ext.getCmp('menu25_year').getValue()+'';
    	
    	if(io_yyyy.length == 4)
    	{
	    	Global.showMask(Ext.getBody());
		
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/stock/stock_list_proc.php',
				params: {
					io_yyyy: parseInt(io_yyyy, 10)
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						thisObj.clearCnt();
	    				thisObj.updateCnt(json.DATA);
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
						    		
    	}
    	else  Ext.Msg.alert("", '년도를 정확히 입력해주세요'); 
    },
    
    //기초재고 초기화
    clearCnt: function(){
    	for(var i=0; i<StoreInfo.Menu24_Grid.getCount(); i++)
    		StoreInfo.Menu24_Grid.getAt(i).set('io_su', 0);	
    },
    
    //기초재고 업데이트
    updateCnt: function(jsonData, isForward){
    	for(var i=0; i<jsonData.length; i++)
    	{
    		var upRecord = StoreInfo.Menu24_Grid.findRecord('item_cd', jsonData[i].io_item_cd, null, null, null, true);
    		if(upRecord) upRecord.set('io_su', jsonData[i].io_su);
    		else StoreInfo.Menu11_Grid1.add({
    			'item_cd': jsonData[i].io_item_cd,
    			'io_su': jsonData[i].io_su
			});
    	}
    	if(!isForward) StoreInfo.Menu24_Grid.commitChanges();
    },
    
    
    //전년재고 이월
    onHoldoverBtnClick: function(button, e, eOpts) {
    	
		var thisObj = this;    
		var io_yyyy = Ext.getCmp('menu25_year').getValue();
		
		if((io_yyyy+'').length == 4)
		{
			Ext.MessageBox.confirm('경고!', '<span style="color:red;">'+(io_yyyy-1)+'</span><span>년도의 재고를</span> <span style="color:red;">'+io_yyyy+'</span><span>년도로 이월합니다.</span></br>전년재고 이월작업을 실행하시겠습니까?', function(btn){
	            if(btn=='yes'){
		    	
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/stock/stock_forward_proc.php',
						params: {
							io_yyyy: parseInt(io_yyyy, 10)
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								thisObj.clearCnt();
			    				thisObj.updateCnt(json.DATA, true);
							}
							else{
								Ext.Msg.alert("", '호출 실패!');
							}
						},
						failure: function(form, action) {
							Global.hideMask();
							Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
						}
					});
						
	            }
	         });			
		}
		else  Ext.Msg.alert("", '년도를 정확히 입력해주세요');
    },
	
	//저장     
	onSaveBtnClick: function(button, e, eOpts) {
		
		var thisObj = this;    
		
		Ext.MessageBox.confirm('경고!', '작성한 재고수량을 저장하시겠습니까?', function(btn){
            if(btn=='yes'){
            	var io_yyyy = Ext.getCmp('menu25_year').getValue()+'';
    	
		    	if(io_yyyy.length == 4)
		    	{
		    		
		    		var modiRecords = StoreInfo.Menu24_Grid.getModifiedRecords();
			    	var paramArr = [];
			    	if(modiRecords.length > 0)
			    	{
			    		Global.showMask(Ext.getBody());
			    		for(var i=0; i<modiRecords.length;i++)
			    		{
			    			paramArr.push({
			    				row_idx: modiRecords[i].get('item_cd'),
			    				io_item_cd: parseInt(modiRecords[i].get('item_cd'), 10),
								io_su: parseInt(modiRecords[i].get('io_su'), 10)	
			    			});
			    		}
			    		
						Ext.Ajax.request({
							method: 'POST',
							url: './proc/account/stock/stock_reg_edit_proc.php',
							params: {
								io_yyyy: parseInt(io_yyyy, 10),					
								data: JSON.stringify(paramArr)
							},
							success: function(response, opts) {
								Global.hideMask();
								var json = Ext.JSON.decode(response.responseText);
								if(json.CODE == '00'){
									thisObj.setCommitSuccessData(modiRecords, 'row_idx', json.DATA);
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
								    		
		    	}
		    	else  Ext.Msg.alert("", '년도를 정확히 입력해주세요');
            	
            }
		});
	},
	
	//성공한 데이터는 커밋 성공못한 데이터는 그대로 남겨두기
    setCommitSuccessData: function(modelArr, key, data){
    	var allSuc = true;
    	for(var i=0; i<modelArr.length;i++)
		{
			var result = data[modelArr[i].get(key)];
			if(result == -1)
			{
				allSuc = false;
			}
			else modelArr[i].commit(); 
		}
  
		if(allSuc) Ext.Msg.alert("", '저장되었습니다.');
		else Ext.Msg.alert("", '저장에 실패한 데이터가 존재합니다.');
		
    },
    
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	this.form.loadRecord(record);
    },
    
    onRegisterCode: function(button, e, eOpts){
    	this.form.onRegisterCode(); 
    },
    
    onDeleteCode: function(button, e, eOpts){
    	this.form.onDeleteCode();
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(초기재고등록)', 'Menu25');
    }
    
});

