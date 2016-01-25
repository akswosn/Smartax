/* 기초자료관리 - 계정코드등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu08_Page', {
    extend: 'Ext.container.Container',
    id:'Menu08_Page',
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
				        type: 'hbox',
				        align: 'stretch'
				    },
				    flex:1,
				    items: [
		               {
		                    xtype: 'gridpanel',
		                    id:'Menu08_Grid',
					        store: StoreInfo.Menu08_Grid,
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    loadMask: true,
					        selModel: {
					            pruneRemoved: false
					        },
					        viewConfig: {
					            trackOver: false,
					            getRowClass: function(record, rowIndex, rowParams, store){
						    		if(!record.get('modify_yn')) return 'row-dis';
						    		else return 'row-vis';
							    }
					        },
		                    features: [{
				                ftype: 'grouping',
				                groupHeaderTpl: Ext.create('Ext.XTemplate', '{name:this.group_name}', {
								    group_name: function(val) {
								    	var resStr = '';
								    	switch(val)
								    	{
								    		case '1':
								    			resStr = '자산';
								    		break;
								    		
								    		case '2':
								    			resStr = '부채';
								    		break;
								    		
								    		case '3':
								    			resStr = '수익';
								    		break;
								    		
								    		case '4':
								    			resStr = '사업비';
								    		break;
								    		default:
								    			resStr = '기타';
							    			break;
								    		
								    	}
								    	return resStr;
								    }
								}),
				                hideGroupedHeader: true,
				                enableGroupingMenu: false
				            }],
		                    columns: [
			                    {
						            xtype: 'gridcolumn',
						            text: '계정코드',
						            width:80,
						            align:'center',
						            sortable: true,
						            dataIndex: 'gycode'
						        },
						        {
						        	xtype: 'gridcolumn',
						            text: '계정명',
						            style: 'text-align:center',
						            width:120,
						            sortable: true,
						            dataIndex: 'gy_name',
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
						            	return value;
		                            }
						        },
						        {
						        	xtype: 'gridcolumn',
						            text: '계정설명',
						            style: 'text-align:center',
						            flex: 1,
						            dataIndex: 'gy_rem',
						            sortable: true
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
						               			Ext.ux.grid.Printer.mainTitle = '[ 계정코드 ]';
								            	Ext.ux.grid.Printer.print(this.up().up());
								            }
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '계정코드',
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
							id: 'accounts_reg',
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
		               		xtype:'label',
		               		flex:1
		               	},
		               	{
		               		xtype:'button',
		               		text: '추가',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: me.addBtnClick,
                                    scope: me
                                }
                            }
		               	},
		               	{
		               		xtype:'button',
		               		text: '저장',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
                                    fn: me.onRegisterCode,
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
                                    fn: me.onDeleteCode,
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
    	this.form = Ext.create('Common_AccountReg');
    	Ext.getCmp('accounts_reg').add(this.form);
    	StoreInfo.Menu08_Grid.clearFilter();
    	this.addBtnClick();
    },
    
    addBtnClick: function(button, e, eOpts) {
    	this.form.resetData();
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(분개장 입력)', Global.selTarget.id);
    },
    
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	this.form.loadRecord(record);
    	this.form.txtField.setReadOnly(true);
    },
    
    onRegisterCode: function(button, e, eOpts) {
    	var thisObj = this;
    	if(this.form.isModifyPossible())
    	{
    		if(!this.form.txtField.readOnly)
    		{
				if(this.form.isModifyCheck()){
	    			Ext.MessageBox.confirm('경고!', '중복된 코드입니다. 작성한 정보로 업데이트 하시겠습니까?', function(btn){
			            if(btn=='yes'){
			            	thisObj.form.onUpdateCode();
			            }
			        });
	    		}
	    		else if(thisObj.form.isModifyNameCheck())
	    		{
	    			Ext.MessageBox.confirm('경고!', '이미추가된 계정명입니다. 추가로 저장 하시겠습니까?', function(btn){
			            if(btn=='yes'){
			            	thisObj.form.onRegisterCode();
			            }
			        });
	    		}
	    		else this.form.onRegisterCode();
    		}
    		else this.form.onUpdateCode();
    	}
    	else Ext.Msg.alert("", '변경할 수 없는 코드입니다.');
    	
    },
    
    onDeleteCode: function(button, e, eOpts) {
    	if(this.form.isModifyPossible()) this.form.onDeleteCode();	
    	else Ext.Msg.alert("", '삭제할 수 없는 코드입니다.');
    	
    }
});

