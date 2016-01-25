/* 매입/매출관리 - 상품분류등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu23_Page', {
    extend: 'Ext.container.Container',
    id:'Menu23_Page',
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
		                    id:'Menu23_Grid',
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    store:  StoreInfo.Menu23_Grid,
		                    columns: [
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'itemgrp_cd',
		                            align:'center',
		                            sortable: true,
		                            text: '분류코드',
						            width: 100
		                        },
		                        {
		                            xtype: 'gridcolumn',
		                            dataIndex: 'itemgrp_nm',
		                            style: 'text-align:center',
		                            sortable: true,
		                            text: '분류명',
						            width: 200
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
						               		text: '인쇄',
						               		cls:'bottomChild',
											handler : function(){
						               			Ext.ux.grid.Printer.mainTitle = '[ 상품분류코드 ]';
								            	Ext.ux.grid.Printer.print(this.up().up());
							            	}
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '상품분류코드',
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
							id: 'itemgrp_reg',
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
    	this.form = Ext.create('Common_ItemgrpReg');
    	Ext.getCmp('itemgrp_reg').add(this.form);
    	
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
    			Ext.MessageBox.confirm('경고!', '이미추가된 상품분류명입니다. 추가로 저장 하시겠습니까?', function(btn){
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
    
});

