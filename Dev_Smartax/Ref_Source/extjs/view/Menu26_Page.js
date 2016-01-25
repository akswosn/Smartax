/* 일정관리 - 일정관리 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu26_Page', {
    extend: 'Ext.container.Container',
    id:'Menu26_Page',
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
                            id:'menu26_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu26_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu26_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu26_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                        {
                            xtype: 'textfield',
                            cls:'searchChild',
                            fieldLabel: '조회내용',
                            labelAlign: 'right',
                            id:'search_diary_cont',
                            width:300,
                            labelSeparator: '',
                            labelWidth: 80,
                            selectOnFocus: true,
                            enableKeyEvents : true,
                            listeners: {
	                            specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	me.onMenu26_SearchBtnClick();
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
                                    fn: me.onMenu26_SearchBtnClick,
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
                    flex:1,
                    layout: {
				        align: 'stretch',
				        type: 'hbox'
				    },
				    items:[
					    {
		                    xtype: 'gridpanel',
		                    id:'Menu26_Grid',
		                    cls:'grid',
		                    enableColumnMove : false,
		                    flex:1,
		                    autoScroll:true,
		                    store: StoreInfo.Menu26_Grid,
		                    loadMask: true,
		                    columns: [
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'input_type',
		                            width: 50,
		                            sortable: true,
		                            align: 'center',
		                            format: '0',
		                            text: '기기',
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										if(value == 2) return 'Phone';
										else return 'PC';
					                }
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'user_nick',
		                            width: 100,
		                            sortable: true,
		                            align: 'center',
		                            format: '0',
		                            text: '작성자'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'yyyymmdd',
		                            width: 100,
		                            sortable: true,
		                            align: 'center',
		                            format: '0',
		                            text: '일자'
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'memorial',
		                            style: 'text-align:center',
		                            sortable: true,
		                            minWidth: 200,
		                            flex:1,
		                            text: '일정 또는 경조사내역 및 기념일',
		                            editor: {
		                            	xtype: 'textfield',
						                listeners: {
				                            specialkey: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==13){
				                                    	Global.isCtrl = e.ctrlKey;
				                                    	Global.isEnter = true;
				                                    }
				                                }
				                            }
				                        }
		                            }
		                        }
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
							               		var fromDt = Ext.getCmp('menu26_date_str').getValue();
												var toDt = Ext.getCmp('menu26_date_end').getValue();
												var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
												var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
												
						               			Ext.ux.grid.Printer.mainTitle = '[ 일정관리 ]';
						               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
								            	Ext.ux.grid.Printer.print(this.up().up());
											}
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '일정관리',
						               		cls:'bottomChild'
						               	}
									]
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
				           	xtype: 'form',
							cls: 'right_content',
							bodyPadding: 10,
							border:0,
		                    layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
						    items:[
						    
							    { xtype: 'datefield', name: 'yyyymmdd',  fieldLabel: '일자', tabIndex:1, width:212, labelSeparator: '', labelWidth: 30, format:'Y-m-d', selectOnFocus: true,
				                	enableKeyEvents : true,
									allowBlank: false,
									value: new Date(),
				            		listeners:{
				        				specialkey: {
				                            fn: function(field, e, options) {
				                                if(e.getKey()==13){
				                                	this.next().focus();
				                                }
				                            }
				                        }
				        			}
						        },
						        { xtype: 'textarea', name: 'memorial', fieldLabel: '일정', tabIndex:2, width:212, height: 200, labelSeparator: '', labelWidth: 30, selectOnFocus: true }
						        
						    ],
						    autoScroll:true
						}
				    ]
               	},
               	{
					xtype: 'container',
                    layout: {
				        align: 'middle',
				        pack:'end',
				        type: 'hbox'
				    },
                    cls:'bottomBar',
                    items: [
		               	{
		               		xtype:'button',
		               		text: '추가',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: function(){
                                    	me.down('form').getForm().reset(true);
                                    	me.selRec = null;
                                    }
                                    
                                }
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
		               		text: '삭제',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: me.onDeleteBtnClick,
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
		/*		
		Ext.getCmp('menu26_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu26_date_end').setValue(new Date());
		*/
		
		Ext.getCmp('menu26_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu26_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		this.onMenu26_SearchBtnClick();
		
    },
    
    //화면의 로우를 선택했을때
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	this.selRec = record;
    	this.down('form').loadRecord(record);
    },
    
    //조회버튼을 눌렀을 경우
    onMenu26_SearchBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var fromDt = Ext.getCmp('menu26_date_str').getValue();
		var toDt = Ext.getCmp('menu26_date_end').getValue();
		
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		var search = Ext.getCmp('search_diary_cont').getValue();
		
		Global.showMask(Ext.getBody());

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/memorial/memorial_list_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd,
				search:search
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					
					thisObj.down('form').getForm().reset(true);
					StoreInfo.Menu26_Grid.removeAll();
					StoreInfo.Menu26_Grid.add(json.DATA);
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
    
    //서버 전송버튼을 눌렀을 경우
    onSaveBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
		var fromDt = Ext.getCmp('menu26_date_str').getValue();
		var toDt = Ext.getCmp('menu26_date_end').getValue();
		
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		var values = this.down('form').getForm().getValues();
		
		var selRec = this.selRec;
		var url = './proc/account/memorial/memorial_register_proc.php';
		var param = {
			yyyymmdd: values.yyyymmdd.replace(/-/g,""),
			memorial: values.memorial,
			type:1
		};
		
		if(selRec)
		{
			if(this.selRec.get('user_nick') == Global.nickname)
			{
				url = './proc/account/memorial/memorial_edit_proc.php';
				param['_id'] = selRec.get('_id');
			}
			else
			{
				Ext.Msg.alert("", '다른사람이 작성한 정보는 수정할 수 없습니다.');
				return;
			} 
			 
		}
		
		if(values.memorial)
		{
			Global.showMask(Ext.getBody());
			Ext.Ajax.request({
				method: 'POST',
				url: url,
				params: param,
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						if(selRec)
						{
							selRec.set({
					            'input_type': 1,
					            'yyyymmdd': values.yyyymmdd,
					            'memorial': values.memorial
							});
							selRec.commit();
							StoreInfo.Menu26_Grid.sort('yyyymmdd', 'ASC');
						}
						else
						{
							StoreInfo.Menu26_Grid.add({
								'_id': json.DATA,
					            'input_type': 1,
					            'yyyymmdd': values.yyyymmdd,
					            'memorial': values.memorial,
					            'user_nick': Global.nickname   		
					    	});
					    	StoreInfo.Menu26_Grid.sort('yyyymmdd', 'ASC');
					    	thisObj.down('form').getForm().reset(true);
							thisObj.selRec = null;	
						}
					}
					else{
						Ext.Msg.alert("", '저장 실패 :'+json.DATA);
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
				}
			});	
		}
		else Ext.Msg.alert("", '저장할 정보가 없습니다.');
		
    },
	
    //삭제버튼을 눌렀을 경우
    onDeleteBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var store = StoreInfo.Menu26_Grid;
    	var delRec = Ext.getCmp('Menu26_Grid').getSelectionModel().getSelection()[0];
    	if(delRec)
    	{
    		Ext.MessageBox.confirm('경고!', '선택한 일정정보를 삭제하시겠습니까?', function(btn){
	            if(btn=='yes'){
	            	
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/memorial/memorial_delete_proc.php',
						params: {
							_id: delRec.get('_id')
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								StoreInfo.Menu26_Grid.remove(delRec);
								thisObj.down('form').getForm().reset(true);
								thisObj.selRec = null;
							}
							else{
								Ext.Msg.alert("", '삭제 실패! '+json.DATA);
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
    	else Ext.Msg.alert("", '삭제할 정보를 선택해주세요.');
    },
        
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(일정관리)', 'Menu26');
    }
    
});

