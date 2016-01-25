/* 회계관리 - 계정별원장 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu05_Page', {
    extend: 'Ext.container.Container',
    id:'Menu05_Page',
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
                            id:'menu05_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu05_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu05_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu05_SearchBtnClick();
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
                                    fn: me.onMenu05_SearchBtnClick,
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
		                    xtype: 'gridpanel',
		                    id: 'menu05_grid1',
		                    cls:'grid',
		                    width: 200,
		                    autoScroll:true,
		                    style: 'margin-right:5px;',
		                    store: StoreInfo.Menu05_Grid1,
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
		                            style: 'text-align:center',
		                            flex:1,
		                            text: '계정명',
		                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
		                            	var gycode = record.get('gycode');
	                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', gycode, null, null, null, true);
	                            		if(codeRecord) return codeRecord.get('gy_name');
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
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    store: StoreInfo.Menu05_Grid2,
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
						            width: 250
		                        },
		                        {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'customer_id',
                                    align:'center',
                                    sortable: true,
                                    text: '거래처코드',
                                    width: 80,
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value > 0) ? Ext.util.Format.leftPad(value, 5, ['0']) : '';
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    style: 'text-align:center',
                                    flex:1,
                                    text: '거래처명',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var customer_id = Ext.util.Format.leftPad(record.get('customer_id'), 5, ['0']);
                                        var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', customer_id, null, null, null, true);
                                        return (codeRecord) ? codeRecord.get('tr_nm') : '';
                                    }
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
						               		    window.open("./extjs/print/print_output_type3.html", "", "width=680, height=800, toolbar=no, menubar=no, scrollbars=yes, location=no" ); 
						               		}
						               	},
						               	{
						               		xtype: 'exporterbutton',
						               		downloadName: '과목원장',
						               		cls:'bottomChild'
						               	}
									]
								}
							],
		                    listeners: {
		                        celldblclick: {
		                            fn: me.onGrid2panelCellDblClick,
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
		Ext.getCmp('menu05_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu05_date_end').setValue(new Date());
		this.onMenu05_SearchBtnClick();
		this.temp = new Object();
    },
    
    //화면이 다시 보여질때 호출    
    onContainerReShow: function() {
    	console.log('onContainerReShow');
    	
    	var now = new Date();
		Ext.getCmp('menu05_date_str').setValue( new Date('1/1/'+now.getFullYear()));
		Ext.getCmp('menu05_date_end').setValue(new Date());
		
		this.onMenu05_SearchBtnClick();
		this.temp = new Object();
    },
    
    
    //조회버튼을 눌렀을 경우
    onMenu05_SearchBtnClick: function(button, e, eOpts) {
		
		var fromDt = Ext.getCmp('menu05_date_str').getValue();
		var toDt = Ext.getCmp('menu05_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		
		StoreInfo.Menu05_Grid1.removeAll();
		StoreInfo.Menu05_Grid2.removeAll();
		
		Global.showMask(Ext.getBody());

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/gycode_list_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu05_Grid1.add(json.DATA);
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
    
    //계정코드에 대한 상세 정보 호출
    onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	
    	var fromDt = Ext.getCmp('menu05_date_str').getValue();
		var toDt = Ext.getCmp('menu05_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var gycode = record.get('gycode');
		this.temp.gycode = record.get('gycode');
		
		StoreInfo.Menu05_Grid2.removeAll();
		
		//인쇄팝업에서 호출할 임시 데이터
		Global.temp = {
		    user_id: user_id.textContent,
		    gycode: record.get('gycode'),
		    from_yyyymmdd: from_yyyymmdd,
		    to_yyyymmdd: to_yyyymmdd
		};
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/gycode_report_proc.php',
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd,
				gycode :gycode, 
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu05_Grid2.add(json.DATA);
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
    
    //외상채권, 외상채무 거래명세표 팝업
    onGrid2panelCellDblClick: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (this.temp.gycode == '108' || this.temp.gycode == '201')
        { //계정코드 108(외상채권), 201(외상채무)일 경우
            if (parseInt(record.get('jp_no')) >= 5000 && parseInt(record.get('jp_no')) <= 10000)
            { //전표번호 5000 ~ 10000(자동분개)일 경우
                //팝업 클래스 생성
                var pop = Ext.create('Common_Pop_CreditSPDetail');
                
                //param 값 셋팅
                pop.gycode = this.temp.gycode;
                pop.jp_no = record.get('jp_no');
                pop.jp_yyyymmdd = record.get('jp_yyyymmdd');
                
                //팝업 오픈
                Global.openPopup(pop);
            }
        }
    },
	    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(계정별원장)', Global.selTarget.id);
    }
});

