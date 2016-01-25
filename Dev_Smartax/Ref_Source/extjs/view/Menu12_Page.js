/* 영농일지관리 - 영농일지 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu12_Page', {
    extend: 'Ext.container.Container',
    id:'Menu12_Page',
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
                            id:'menu12_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.doSearch();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu12_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.doSearch();
	                                    }
	                                }
	                            }
                            }
                        },
						{
			                xtype: 'combobox',
			                id: 'menu12_jakmok',
			                labelAlign: 'right',
			                cls:'searchChild',
			                width:220,
							editable: false,
							value:'전체',
			                fieldLabel: '작목코드',
			                labelSeparator: '',
			                labelWidth: 60,
			                selectOnFocus: true,
			                displayField: 'jakmok_fullname',
			                queryMode: 'local',
			                store: StoreInfo.Menu13_Grid_SEAR,
			                valueField: 'jakmok_code',
			                enableKeyEvents : true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	me.doSearch();
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
	                                fn: me.doSearch,
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
		                    id:'Menu12_Grid',
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    store:  StoreInfo.Menu12_Grid,
		                    columns: [
			                    {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'work_date',
		                            width: 90,
		                            sortable: true,
		                            align: 'center',
		                            format: '0',
		                            text: '작업일자'
		                            /*
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var resStr = value;
										return value ;
		                            }
		                            */
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'jakmok_cd',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '작목코드',
		                            width: 100,
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var showText = value;
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu13_Grid.findRecord('jakmok_code', value, null, null, null, true);
		                            		if(codeRecord) showText += " "+codeRecord.get('jakmok_name');
		                            	}
										return showText ;
		                            },
		                            editor: {
		                            	xtype: 'textfield',
						                selectOnFocus:true,
						                enableKeyEvents : true,
						                listeners: {
				                            keydown: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==113){
				                                    	var pop = Ext.create('Common_Pop_Jakmok');
				                                    	var grid = Ext.getCmp('Menu12_Grid'); 
				                                    	grid.getPlugin().cancelEdit();
				                                    	pop.grid = grid;
				                                    	pop.record = grid.getSelectionModel().getSelection()[0];
				                                    	Global.openPopup(pop);
				                                    	
				                                    	return false;
				                                    }
				                                }
				                            }
				                        }
		                            }
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'work_cd',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '작업코드',
		                            width: 100,
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var showText = value;
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu14_Grid.findRecord('work_cd', value, null, null, null, true);
		                            		if(codeRecord) showText += " "+codeRecord.get('work_nm');
		                            	}
										return showText ;
		                            },
		                            editor: {
		                            	xtype: 'textfield',
						                selectOnFocus:true,
						                enableKeyEvents : true,
						                listeners: {
				                            keydown: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==113){
				                                    	var pop = Ext.create('Menu01_Pop_Crops');
				                                    	Ext.getCmp('Menu01_Grid').getPlugin().cancelEdit();
				                                    	pop.record = Ext.getCmp('Menu01_Grid').getSelectionModel().getSelection()[0];
				                                    	Global.openPopup(pop);
				                                    	return false;
				                                    }
				                                }
				                            }
				                        }
		                            }
		                        },
		                        {
		                            xtype: 'numbercolumn',
		                            dataIndex: 'work_area',
		                            width: 60,
		                            align: 'center',
		                            format:'0,000.0',
		                            text: '작업면적',
		                            editor: {
		                            	xtype: 'numberfield',
		                            	selectOnFocus:true,
						                minValue: 0,
						                format:'0,000.0',
						                listeners: {
				                            specialkey: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==13){
				                                    }
				                                }
				                            }
				                        }
		                            }
		                        },
		                        {
		                            xtype: 'numbercolumn',
		                            dataIndex: 'work_man',
		                            width: 60,
		                            align: 'center',
		                            format:'0,000',
		                            text: '작업인원',
		                            editor: {
		                            	xtype: 'numberfield',
						                selectOnFocus:true,
						                minValue: 0,
						                format:'0,000',
						                listeners: {
				                            specialkey: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==13){
				                                    }
				                                }
				                            }
				                        }
		                            }
		                        },
		                        {
		                            xtype: 'numbercolumn',
		                            dataIndex: 'work_time',
		                            width: 60,
		                            align: 'center',
		                            format:'0,000.0',
		                            text: '작업시간',
		                            editor: {
		                            	xtype: 'numberfield',
		                            	selectOnFocus:true,
						                minValue: 0,
						                format:'0,000.0',
						                listeners: {
				                            specialkey: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==13){
				                                    }
				                                }
				                            }
				                        }
		                            }
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'weather_cd',
		                            style: 'text-align:center',
		                            width: 100,
		                            text: '날씨',
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var showText = value;
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.WEATH_KBN.findRecord('weather_cd', value, null, null, null, true);
		                            		if(codeRecord) showText = codeRecord.get('weather_nm');
		                            	}
										return showText ;
		                            }
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'work_job',
		                            style: 'text-align:center',
		                            minWidth:250,
		                            flex:1,
		                            text: '작업내용',
		                            editor: {
		                            	xtype: 'textfield',
						                listeners: {
				                            specialkey: {
				                                fn: function(field, e, options) {
				                                    if(e.getKey()==113){
				                                    	
				                                    }
				                                }
				                            }
				                        }
		                            }
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
					               				var fromDt = Ext.getCmp('menu12_date_str').getValue();
												var toDt = Ext.getCmp('menu12_date_end').getValue();
												var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
												var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
												
						               			Ext.ux.grid.Printer.mainTitle = '[ 영농일지 ]';
						               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
								            	Ext.ux.grid.Printer.print(this.up().up());
								            }
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '영농일지',
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
				           	xtype: 'container',
							id: 'diary_reg',
							cls: 'right_content',
		                    layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
						     autoScroll:true
						}
		            ]
		        },
               	{
					xtype: 'container',
                    layout: {
				        align: 'middle',
				        type: 'hbox'
				    },
                    cls:'bottomBar',
                    items: [
		               	{
		               		xtype:'textfield',
		               		width: 450,
		               		cls:'bottomChild',
		               		value: '작목번호를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.',
		               		readOnly : true
		               	},
		               	{
		               		xtype:'label',
		               		flex:1
		               	},
		               	{
		               		xtype:'button',
		               		text: '추가',
		               		cls:'bottomChild',
		               		listeners: {
	                            click: {
	                                fn: function() {
	                                    me.form.onInitData();
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
	                                fn: function() {
	                                    me.onRegisterCode();
	                                }
	                            }
	                        }
		               	},
		               	{
		               		xtype:'button',
		               		text: '삭제',
		               		cls:'bottomChild',
		               		listeners: {
	                            click: {
	                                fn: function() {
	                                    me.onDeleteCode();
	                                }
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


	//화면이 처음 보여질시 셋팅    
    onContainerAfterRender: function(component, eOpts) {
    	var now = new Date();
    	/*
    	Ext.getCmp('menu12_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu12_date_end').setValue(new Date());
		*/
		Ext.getCmp('menu12_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu12_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		this.form = Ext.create('Common_WorkdiaryReg');
    	Ext.getCmp('diary_reg').add(this.form);
    	
    	this.onContainerShowRender();
    	this.doSearch();
    	
    },
    
    onContainerShowRender: function(component, eOpts) {
    	StoreInfo.Menu13_Grid_SEAR.removeAll();
    	StoreInfo.Menu13_Grid_SEAR.insert(0, {'jakmok_code':'', 'jakmok_name':'전체'});
		var copyRecs = StoreInfo.Menu13_Grid.getNewRecords();
		for(var i=0; i<copyRecs.length; i++)
			StoreInfo.Menu13_Grid_SEAR.insert(i+1, {'jakmok_code':copyRecs[i].get('jakmok_code'), 'jakmok_name':copyRecs[i].get('jakmok_name')});
    },
    
    //검색 함수
    doSearch: function(){
    	
    	var thisObj = this;
    	var fromDt = Ext.getCmp('menu12_date_str').getValue();
		var toDt = Ext.getCmp('menu12_date_end').getValue();
		var from_work_date = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_work_date = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var jakmok_cd = Ext.getCmp('menu12_jakmok').getValue();
		if(jakmok_cd == '전체') jakmok_cd = '';
		
    	Global.showMask(Ext.getBody());
    	
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/workdiary/workdiary_list_proc.php',
			params: {
				from_work_date: from_work_date,
				to_work_date: to_work_date,
				jakmok_cd: jakmok_cd
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu12_Grid.removeAll();
                	StoreInfo.Menu12_Grid.add(json.DATA);
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
    
    //리스트 로우를 선택했을때
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	//수정인지 신규등록인지를 구별하기 위해 id저장
    	this.form.workId = record.get('id');	
    	this.form.loadRecord(record);
    	this.form.form.setValues({
    		weather_cd: StoreInfo.WEATH_KBN.findRecord('weather_cd', record.get('weather_cd'), null, null, null, true)
    	});
    	var jakmok_rec =  StoreInfo.Menu13_Grid.findRecord('jakmok_code', record.get('jakmok_cd'), null, null, null, true);
    	if(jakmok_rec) Ext.getCmp('workjakmok_field').setValue(jakmok_rec.data.jakmok_name);
    	var work_rec = StoreInfo.Menu14_Grid.findRecord('work_cd', record.get('work_cd'), null, null, null, true);
    	if(work_rec) Ext.getCmp('workcd_field').setValue(work_rec.data.work_nm);
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(영농일지)', 'Menu12');
    },
    
    onRegisterCode: function(button, e, eOpts) {
    	if(this.form.workId) this.form.onUpdateCode();
    	else  this.form.onRegisterCode();
    },
     
    onDeleteCode: function(button, e, eOpts) {
    	this.form.onDeleteCode();
    } 
});

