/* 매입/매출관리 - 상품등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu24_Page', {
    extend: 'Ext.container.Container',
    id:'Menu24_Page',
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
		                    id:'Menu24_Grid',
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
		                            locked: true,
		                            text: '상품코드',
						            width: 100
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_nm',
		                            style: 'text-align:center',
		                            locked: true,
		                            sortable: true,
		                            text: '상품명',
						            width: 150
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
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_in_danga',
		                            style: 'text-align:center',
		                            align:'right',
		                            sortable: true,
		                            text: '매입단가',
						            width: 80,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return Ext.util.Format.number(value, '0,000') ;
		                            }
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'item_out_danga',
		                            style: 'text-align:center',
		                            align:'right',
		                            sortable: true,
		                            text: '매출단가',
						            width: 80,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return Ext.util.Format.number(value, '0,000') ;
		                            }
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'itemgrp_cd',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '상품분류',
						            width: 150,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var showText = '';
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu23_Grid.findRecord('itemgrp_cd', value, null, null, null, true);
		                            		if(codeRecord) showText = codeRecord.get('itemgrp_nm');
		                            	}
										return showText ;
		                            }
		                        },
		                       	{
						            xtype: 'booleancolumn', 
						            text: '사용여부',
						            hidden: true,
						            sortable: true,
						            align:'center',
						            dataIndex: 'use_yn',
						            trueText: '<span style="color:blue;">사용</span>',
						            falseText: '<span style="color:red;">미사용</span>', 
						            width: 100
						            
						        },
						        {
		                            xtype: 'gridcolumn',
						            flex:1
		                        }
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
						               		text: '엑셀자료 올리기',
						               		cls:'bottomChild',
						               		handler : function(){
						               			var pop = Ext.create('Common_Pop_ExcelUpload');
						               			pop.excelType = 'items_reg';
					    						Global.openPopup(pop, "엑셀파일 업로드");
								            }
						               	},
										{
						               		xtype:'button',
						               		text: '인쇄',
						               		cls:'bottomChild',
						               		handler : function(){
						               			Ext.ux.grid.Printer.mainTitle = '[ 상품코드 ]';
								            	Ext.ux.grid.Printer.print(this.up().up());
							            	}
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '상품코드',
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
							id: 'item_reg',
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
    	this.form = Ext.create('Common_ItemReg');
    	Ext.getCmp('item_reg').add(this.form);
    	
       	this.addBtnClick();
    },
    
    addBtnClick: function(button, e, eOpts) {
    	this.form.resetData();
    },    
    
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	this.form.loadRecord(record);
    	this.form.txtField.setReadOnly(true);
    },
    
    onRegisterCode: function(button, e, eOpts){
    	var thisObj = this;
		if(!thisObj.form.txtField.readOnly)
		{
			if(this.form.isModifyCheck()){
    			Ext.MessageBox.confirm('경고!', '중복된 코드입니다. 작성한 정보로 업데이트 하시겠습니까?', function(btn){
		            if(btn=='yes'){
		            	thisObj.form.onRegisterCode();
		            }
		        });
    		}
    		else if(thisObj.form.isModifyNameCheck())
    		{
    			Ext.MessageBox.confirm('경고!', '이미추가된 상품명입니다. 추가로 저장 하시겠습니까?', function(btn){
		            if(btn=='yes'){
		            	thisObj.form.onRegisterCode();
		            }
		        });
    		}
    		else this.form.onRegisterCode();
		}
		else this.form.onRegisterCode();  
    },
    
    onDeleteCode: function(button, e, eOpts){
    	this.form.onDeleteCode();
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(분개장 입력)', 'Menu25');
    }
    
});

