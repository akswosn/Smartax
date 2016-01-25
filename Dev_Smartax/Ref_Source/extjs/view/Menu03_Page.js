/* 회계관리 - 월별손익 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu03_Page', {
    extend: 'Ext.container.Container',
    id:'Menu03_Page',
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
                            id: 'menu03_year_from',
                            cls:'searchChild',
                            width: 120,
                            fieldLabel: '조회기간',
                            labelSeparator: '',
                            labelWidth: 50,
                            selectOnFocus: true,
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
                            xtype: 'numberfield',
                            id: 'menu03_month_from',
                            margin: '0 0 0 5',
                            width: 50,
                            minValue : 1,
                            maxValue : 12,
                            selectOnFocus: true,
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
                            xtype: 'numberfield',
                            id: 'menu03_year_to',
                            margin: '0 0 0 5',
                            cls:'searchChild',
                            width: 80,
                            fieldLabel: '~',
                            labelSeparator: '',
                            labelWidth: 10,
                            selectOnFocus: true,
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
                            xtype: 'numberfield',
                            id: 'menu03_month_to',
                            margin: '0 0 0 5',
                            width: 50,
                            minValue : 1,
                            maxValue : 12,
                            selectOnFocus: true,
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
	                        xtype: 'combobox',
	                        id: 'jakmokcdarr',
	                        cls:'searchChild',
	                        labelAlign: 'right',
	                        width: 200,
	                        value: '전체',
	                        fieldLabel: '작목코드',
	                        labelSeparator: '',
	                        labelWidth: 80,
	                        selectOnFocus: true,
	                        displayField: 'jakmok_fullname',
	                        queryMode: 'local',
	                        store: StoreInfo.Menu03_Jak,
	                        //tpl: '<tpl for="."> {jakmok_code} {jakmok_name}</tpl>',
	                        valueField: 'jakmok_code'
							
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
                    id:'Menu03_Grid_Lay',
                    flex:1,
                    layout: {
                    	align: 'stretch',
				        type: 'vbox'
				    }
              	}
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                },
                show: {
                    fn: me.onContainerShow,
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
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		Ext.getCmp('menu03_year_from').setValue(year);
		Ext.getCmp('menu03_month_from').setValue(1);
		Ext.getCmp('menu03_year_to').setValue(year);
		Ext.getCmp('menu03_month_to').setValue(month);
		
		this.onContainerShow();
		this.onMenu02_SearchBtnClick();
		 
    },
    
    //화면이 숨겨졌다 다시 보여질시
    onContainerShow: function(component, eOpts) {
    	StoreInfo.Menu03_Jak.removeAll();
		StoreInfo.Menu03_Jak.insert(0, {'jakmok_code':'', 'jakmok_name':'전체'});
		var copyRecs = StoreInfo.Menu10_Grid.getNewRecords();
		for(var i=0; i<copyRecs.length; i++)
			StoreInfo.Menu03_Jak.insert(i+1, {'jakmok_code':copyRecs[i].get('jakmok_code'), 'jakmok_name':copyRecs[i].get('jakmok_name')});
    },
    
    //조회버튼을 눌렀을 경우
    onMenu02_SearchBtnClick: function(button, e, eOpts) {
    	
		var year_from = parseInt(Ext.getCmp('menu03_year_from').getValue());
		var month_from = parseInt(Ext.getCmp('menu03_month_from').getValue());
		var year_to = parseInt(Ext.getCmp('menu03_year_to').getValue());
		var month_to = parseInt(Ext.getCmp('menu03_month_to').getValue());
		var monthCnt = (year_to - year_from)*12+(month_to - month_from)+1;
		
		var strDt = new Date(month_from+'/1/'+year_from);
		var endDt = new Date(month_to+'/31/'+year_to);
		
		var distanceDt = endDt - strDt;
		
		if(distanceDt > -1)
		{
			distanceDt = distanceDt/1000/60/60/24;
			if(distanceDt <= 1825) this.createGridByDate(year_from, month_from, monthCnt);
			else Ext.Msg.alert("", '조회는 5년 이하의 기간만 가능합니다.'); 
		}
		else Ext.Msg.alert("", '조회시작일자가 조회마지막일자를 넘을수 없습니다.');
		
    },
	
	//월 차이를 이용하여 그리드를 만들기    
    createGridByDate: function(strYear, strMonth, monthCnt)
    {
    	
		StoreInfo.Menu03_Grid = null;
		StoreInfo.Menu03_Grid = Ext.create('Ext.data.Store', {
	    	 fields: [
	            {name: 'gycode', type: 'string'},
	            {name: 'sum', type: 'int'},
	            {name: 'group', type: 'int'}
	        ],
	        groupField: 'group',
            remoteGroup: false
		});
		var columnArr = [
			{
				xtype: 'gridcolumn', //this is so we know which column will show the tree
	            dataIndex: 'gycode',
	            style: 'text-align:center',
	            text: '계정코드',
	            width: 120,
	            locked: true,
	            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                	var showText = value;
                	if(value)
                	{
                		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
                		if(codeRecord) showText = showText+" "+codeRecord.get('gy_name');
                	}
					return showText ;
                }
			},
			{
				xtype: 'numbercolumn',
	            dataIndex: 'sum',
	            style: 'text-align:center',
	            text: '합계',
	            locked: true,
	            align: 'right',
                format:'0,000',
	            width: 130,
	            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
					return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
                },
	            summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return '<span style="color:red;">'+Ext.util.Format.number(value, '0,000')+'</span>';
                }
			}
		];
		for(var i=0; i<monthCnt; i++)
		{
			var date = strYear+"-"+Ext.String.leftPad(strMonth, 2, '0');
			StoreInfo.Menu03_Grid.model.prototype.fields.add(date, Ext.create("Ext.data.Field", { name: date, type: 'int' }));
			columnArr.push({
				xtype: 'numbercolumn',
				style: 'text-align:center',
                text: date,
                dataIndex:  date,
                align: 'right',
                format:'0,000',
                width: 100,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
					return (value == 0) ? '': Ext.util.Format.number(value, '0,000') ;
                },
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return (value == 0) ? '': '<span style="color:red;">'+Ext.util.Format.number(value, '0,000')+'</span>';
                }
            });
			if(strMonth == 12)
			{
				strYear += 1;
				strMonth = 0;	
			}
			strMonth++;
		}
		var pivotGrid = Ext.create('Ext.grid.Panel', {
            autoScroll:true,
            id:'Menu03_Grid',
            flex:1,
            cls:'grid',
            store:  StoreInfo.Menu03_Grid,
            features: [{
		        ftype: 'groupingsummary',
		         groupHeaderTpl: Ext.create('Ext.XTemplate', '{name:this.group_name}', {
				    group_name: function(val) {
				    	var resStr = '';
				    	switch(val)
				    	{
				    		case 3:
				    			resStr = '수익합계';
				    		break;
				    		
				    		case 4:
				    			resStr = '비용합계';
				    		break;
				    		
				    		case 5:
				    			resStr = '월별손익';
				    		break;
				    	}
				    	return resStr;
				    }
				})
		    }],
		    viewConfig: {
			    getRowClass: function(record, rowIndex, rowParams, store){
			    	if(record.get("gycode") == 'TOTAL') return "row-hide";
			    	else return ( parseInt(record.get("gycode"), 10) > 0) ? "row-valid" : "row-am";	
			    }
			},
		    columns: columnArr,
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
		               		width: 450,
		               		cls:'bottomChild',
		               		value: '해당월의 금액을 더블클릭하면 세부화면이 표시됩니다.',
		               		readOnly : true
		               	},
                    	{
		               		xtype:'label',
		               		flex:1
		               	},
						{
		               		xtype:'button',
		               		text: '인쇄',
		               		cls:'bottomChild',
		               		handler : function(){
	               				var year_from = Ext.getCmp('menu03_year_from').getValue();
								var month_from = Ext.getCmp('menu03_month_from').getValue();
								var year_to = Ext.getCmp('menu03_year_to').getValue();
								var month_to = Ext.getCmp('menu03_month_to').getValue();
						    	
		               			Ext.ux.grid.Printer.mainTitle = '[ 월별손익 ]';
		               			Ext.ux.grid.Printer.subDate = year_from+'.'+month_from+' ~ '+year_to+'.'+month_to; 
				            	Ext.ux.grid.Printer.print(this.up().up());
				            }
		               	},
		               	{
		               		xtype: 'exporterbutton',
		               		downloadName: '월별손익',
		               		cls:'bottomChild'
		               	}
					]
				}
			],
		    listeners: {
                celldblclick: {
                    fn: this.onGridpanelCellDblClick,
                    scope: this
                }
            }
		});
		Ext.getCmp('Menu03_Grid_Lay').removeAll();
		Ext.getCmp('Menu03_Grid_Lay').add(pivotGrid);
		this.callData();
    	
    },
    
    //서버에서 데이터 호출
    callData: function()
    {
    	
    	var year_from = Ext.getCmp('menu03_year_from').getValue();
		var month_from = Ext.getCmp('menu03_month_from').getValue();
		var year_to = Ext.getCmp('menu03_year_to').getValue();
		var month_to = Ext.getCmp('menu03_month_to').getValue();
		var jakmok_code = Ext.getCmp('jakmokcdarr').getValue();
		
		if(jakmok_code == '전체') jakmok_code = '';
    	
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/month_profit_proc.php',
			params: {
				from_yyyymm: year_from+Ext.String.leftPad(month_from, 2, '0'),
				to_yyyymm: year_to+Ext.String.leftPad(month_to, 2, '0'),
				jakmok_code: jakmok_code 
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu03_Grid.removeAll();
					StoreInfo.Menu03_Grid.add(json.DATA);
				}
				else{
					Ext.Msg.alert("", '호출 실패! '+json.DATA);
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '네트 워크 오류!');
			}
		});	
    },
    
    //그리드 아이템을 더블클릭했을때
    onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    	
		var year_from = Ext.getCmp('menu03_year_from').getValue();
		var month_from = Ext.getCmp('menu03_month_from').getValue();
		var year_to = Ext.getCmp('menu03_year_to').getValue();
		var month_to = Ext.getCmp('menu03_month_to').getValue();
		var jakmok_code = Ext.getCmp('jakmokcdarr').getValue();
		
		var nowYear = new Date().getFullYear();
    		
		if(year_from != year_to )
		{
			Ext.Msg.alert("", '보조원장 조회는 동일한 회계년도만 가능합니다.');				
		}
		else
		{
			/*
			var columns = tableview.headerCt.getGridColumns();
	    	var yearmonth = columns[cellIndex].text;
	    	var yearmonth = yearmonth.replace(/-/g,"");
	    	if(yearmonth.length == 6)
		   	{
		   	*/
	   		var pop = Ext.create('Common_Pop_Oridata');
			pop.record = record;
			pop.from_yyyymmdd = year_from+Ext.String.leftPad(month_from, 2, '0')+'01';
			pop.to_yyyymmdd = year_to+Ext.String.leftPad(month_to, 2, '0')+'32';
			
			if(parseInt(jakmok_code)) pop.jakmok_code = jakmok_code;
			
			var code = record.get('gycode');
			var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', code, null, null, null, true);
	    	if(codeRecord) title = '계정별원장 ( '+code+' : '+codeRecord.get('gy_name')+' )';	
	    	Global.openPopup(pop, title);
		}
    },
    
    
    onTreepanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	
    	
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(월별손익)', 'Menu03');
    }
});

