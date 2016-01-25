/* 회계관리 - 회계표 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu02_Page', {
    extend: 'Ext.container.Container',
    id:'Menu02_Page',
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
                            fieldLabel: '조회일자',
                            id:'menu02_date',
                            cls:'searchChild',
                            width:190,
                            labelSeparator: '',
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu02_SearchBtnClick();
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
                                    fn: me.onMenu02_SearchBtnClick,
                                    scope: me
                                }	
                            }
                            
                        },
                        {
                            xtype: 'label',
                            cls:'searchChild',
                            margin: '4 0 0 10',
                            flex:1,
                            text: '조회기간은 매년 1월1일부터 선택일자까지 입니다. 조회 단추를 다시 누르면 갱신표시 됩니다.'
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
				        type: 'hbox',
				        align: 'stretch'
				    },
                    items: [
		                {
		                    xtype: 'treepanel',
		                    id:'Menu02_Grid',
		                    cls:'grid',
		                    flex:1,
		                    store:  StoreInfo.Menu02_Grid,
					        rootVisible: false,
					        singleExpand: false,
					        autoScroll:true,
		                    useArrows: true,
					        multiSelect: true,
					        loadMask: new Ext.LoadMask(me, {
								msg: "loading,Please wait..."
							}),
					        viewConfig: {
							    getRowClass: function(record, rowIndex, rowParams, store){
							        return ( record.get("type") == -1) ?  "row-am" : "row-valid";
							    }
							},
					        columns: [
					        	{
						            xtype: 'treecolumn', //this is so we know which column will show the tree
						            dataIndex: 'gy_fullname',
						            style: 'text-align:center',
						            text: '계정코드',
						            width: 150,
						            sortable: false
						            /*
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var showText = value;
		                            	if(value)
		                            	{
		                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
		                            		if(codeRecord) showText += " "+codeRecord.get('gy_name');
		                            	}
										return showText ;
		                            }
		                            */
						        },
					        	{
					        		xtype: 'numbercolumn',
						            dataIndex: 'gicho_am',
						            style: 'text-align:center',
						            text: '기초금액',
						            align: 'right',
		                            format:'0,000',
						            width: 105,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
					                }
					        	},
					        	{
					        		xtype: 'numbercolumn',
						            dataIndex: 'credit',
						            style: 'text-align:center',
						            text: '출금/차변',
						            align: 'right',
		                            format:'0,000',
						            width: 105,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
					                }
					        	},
					        	{
					        		xtype: 'numbercolumn',
						            dataIndex: 'debit',
						            style: 'text-align:center',
						            text: '입금/대변',
						            align: 'right',
		                            format:'0,000',
						            width: 105,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
					                }
					        	},
					        	{
					        		xtype: 'numbercolumn',
						            dataIndex: 'balance_am',
						            style: 'text-align:center',
						            text: '잔액',
						            align: 'right',
		                            format:'0,000',
						            width: 105,
						            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
										return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
					                }
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
						               		xtype:'textfield',
						               		width: 400,
						               		cls:'bottomChild',
						               		value: '계정번호가 있는 행을 더블클릭하면 세부화면이 표시됩니다.',
						               		readOnly : true
						               	},
				                    	{
						               		xtype:'label',
						               		flex:1
						               	},
										{
						               		xtype:'button',
						               		text: '인쇄',
						               		hidden: true,
						               		cls:'bottomChild'
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		type:'tree',
						               		id : 'Menu02_excel',
						               		downloadName: '회계표',
						               		cls:'bottomChild',
						               		text:'엑셀 인쇄',
						               		listeners: {
				                                click: {
					                                fn: me.Menu02_Print,
					                            }
				                            }
						               	}
									]
								}
							],
		                    listeners: {
		                        itemdblclick: {
		                            fn: me.onTreepanelItemDblClick,
		                            scope: me
		                        },
		                        load: {
		                            fn: me.onTreepanelLoad,
		                            scope: me
		                        }
		                    }
		               	},
		               	{
				           	xtype: 'container',
							cls: 'right_content',
							style:'background-color:#FAFAFA !important;',
		                    layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
						    width:300,
						    autoScroll:true,
						    items:[
								{
									xtype:'panel',
									title:'계정잔액 산출 및 표시방법',
									margin: 20,
									bodyPadding: 20,
									html:'<span style="color:blue;">자산(101~199) / 비용(401~499)</span></br>'+
    									'잔액 = 기초잔액 + 차변금액 – 대변금액</br>'+
										'차변 = 증가변, 대변 = 차감변</br></br>'+
										'<span style="color:blue;">부채(201~299) / 수익(301~399)</span></br>'+
    									'잔액 = 기초잔액 + 대변금액 – 차변금액</br>'+
										'대변 = 증가변, 차변 = 감소변'
								},						    
								{
									xtype:'panel',
									margin: 20,
									bodyPadding: 20,
									html:'계정과목이 (자산/비용) 또는 (부채/수익)</br>'+ 
										'어느 그룹에 속하느냐에 따라</br>'+
										'증가변이 달라집니다.</br>'+
										'자산/비용은 차변이 증가변,</br>'+
										'부채/수익은 대변이 증가변입니다.</br>'+
										'증가변에만 유의하시면 됩니다.'
								}						    
						    ]
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
    	
    	//var excel_Btn = Ext.getCmp('Menu02_excel');
    	//excel_Btn.setWidth(84);
    	//excel_Btn.setText('엑셀인쇄');
    	//$('#Menu02_excel').append('<span>엑셀인쇄</span>');
    	
    	var thisObj = this;
    	this.totDeb = 0; 
		this.totCre = 0;
		Ext.getCmp('menu02_date').setValue(new Date());
		
		this.onMenu02_SearchBtnClick();
    },
    
    amSum: function(parentNode)
    {
    	var thisObj = this;
    	var kbnBalAm = 0;
    	parentNode.eachChild(function(child){
    		if(child.isLeaf())
    		{
    			var debAm = parseInt(child.get('debit'), 10);
    			if(!debAm) debAm = 0; 
    			thisObj.totDeb += debAm; 
    			var creAm = parseInt(child.get('credit'), 10);
    			if(!creAm) creAm = 0; 
				thisObj.totCre += creAm;
    			kbnBalAm += parseInt(child.get('balance_am'), 10);
    		} 
    		else thisObj.amSum(child);	
		});
		parentNode.set('balance_am', kbnBalAm);
		parentNode.commit();
		 
    },
    
    onTreepanelLoad: function(treestore, node, records, successful, eOpts) {
    	var thisObj = this;
    	if(node.childNodes.length > 0)
    	{
    		this.totDeb = 0;
    		this.totCre = 0;
    		this.amSum(Ext.getCmp('Menu02_Grid').getRootNode());
			Ext.getCmp('Menu02_Grid').getRootNode().appendChild({
	    		gycode:'입출합계',
	    		type: -1,
		        gicho_am: '',
		        debit: thisObj.totDeb,
		        credit: thisObj.totCre,
		        sumrow: '1',
		        balance_am: ''
			});
			Ext.getCmp('Menu02_Grid').expandAll();	
    	}
    },

    //조회버튼을 눌렀을 경우
    onMenu02_SearchBtnClick: function(button, e, eOpts) {
		
    	var searchDate = Ext.getCmp('menu02_date').getValue();
    	var year = searchDate.getFullYear(); 
    	var month = Ext.String.leftPad((searchDate.getMonth()+1), 2, '0');
    	var day = Ext.String.leftPad(searchDate.getDate(), 2, '0');
    	
    	if(year && month && day)
    	{
    		var date = year+month+day;
    		StoreInfo.Menu02_Grid.setProxy({
    			type: 'ajax',
		        url: './proc/account/report/acct_report_proc.php',
		        extraParams: {'jp_yyyymm': date },
		        reader: {
		            root: 'children',
		            expanded: false
		        }
    		});
    		StoreInfo.Menu02_Grid.load();
    	}
    	else Ext.Msg.alert("", '정확한 날짜를 입력해주세요.');
    },
    
    //그리드 아이템을 더블클릭했을때
    onTreepanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	
    	var searchDate = Ext.getCmp('menu02_date').getValue();
    	var year = searchDate.getFullYear(); 
    	var month = Ext.String.leftPad((searchDate.getMonth()+1), 2, '0');
    	var day = Ext.String.leftPad(searchDate.getDate(), 2, '0');
    	
		var pop = Ext.create('Common_Pop_Oridata');
        pop.record = record; 
        pop.from_yyyymmdd = year+'0101';
        pop.to_yyyymmdd = year+month+day;
        
		var code = record.get('gycode');
        var title = '현금원장';
        if(code > -1)
        {
            if(code != 101)
            {
                var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', code, null, null, null, true);
                if(codeRecord) title = '계정별원장 ( '+code+' : '+codeRecord.get('gy_name')+' )';    
            }
            Global.openPopup(pop, title);   
        }
	},
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(회계표)', 'Menu02');
    },
    
    
    Menu02_Print: function() {
    	console.log('인쇄');
    	console.log($("#Menu02_excel").find('object').attr('id'));
    },
    
	
    
});

