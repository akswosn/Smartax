/* 매입/매출관리 - 재고현황 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu21_Page', {
    extend: 'Ext.container.Container',
    id:'Menu21_Page',
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
                            id:'menu21_date_str',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:190,
                            labelWidth: 50,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu21_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: '~',
                            id:'menu21_date_end',
                            cls:'searchChild',
                            labelSeparator: '',
                            width:150,
                            labelWidth: 10,
                            format: 'Y년 m월 d일',
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu21_SearchBtnClick();
	                                    }
	                                }
	                            }
                            }
                        },
						{
			                xtype: 'combobox',
			                id: 'menu21_itemgrp_cd',
			                labelAlign: 'right',
			                cls:'searchChild',
			                width:130,
			                value: '전체',
							editable: false,
			                fieldLabel: '상품',
			                labelSeparator: '',
			                labelWidth: 40,
			                selectOnFocus: true,
			                displayField: 'itemgrp_nm',
			                queryMode: 'local',
			                store: StoreInfo.Menu23_Grid_SEAR,
			                valueField: 'itemgrp_cd',
			                enableKeyEvents : true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                }
		                            }
		                      	}
		                      	/*
			                    select: {
			                    	fn: me.onComboboxSelect,
			                        scope: me
			                    }
			                    */
		        			}
			            },
						{
			                xtype: 'combobox',
			                id: 'menu21_item_cd',
			                labelAlign: 'right',
			                cls:'searchChild',
			                width:100,
			                value: '전체',
							editable: false,
							hidden:true,
			                labelSeparator: '',
			                selectOnFocus: true,
			                displayField: 'item_nm',
			                queryMode: 'local',
			                store: StoreInfo.Menu24_Grid_SEAR,
			                valueField: 'item_cd',
			                enableKeyEvents : true,
			                listeners:{
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
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
                                    fn: me.onMenu21_SearchBtnClick,
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
		                    id:'Menu21_Grid_1',
		                    cls:'grid',
		                    flex:1,
		                    autoScroll:true,
		                    store:  StoreInfo.Menu21_Grid,
		                    viewConfig: {
							    getRowClass: function(record, rowIndex, rowParams, store){
							    	var cls = "row-valid";
							    	var type = record.get('type');
							    	if(type == 1) cls = "row-pre";
							    	return cls;
							    }
							},
		                    columns: [
		                        {	xtype: 'gridcolumn', dataIndex: 'io_item_cd', style:'text-align:center;', text: '코드', width: 60  },
		                        {	xtype: 'gridcolumn', dataIndex: 'io_item_nm', style:'text-align:center;', text: '상품명', width: 120 },
		                        {	xtype: 'gridcolumn', dataIndex: 'io_item_qty', style:'text-align:center;', text: '규격', width: 60 },
		                        {	xtype: 'gridcolumn', dataIndex: 'io_item_danwi', style:'text-align:center;', text: '단위', width: 60 },
		                        {   xtype: 'numbercolumn', dataIndex: 'gicho', style:'text-align:center;', text: '이월재고수량', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'input', style:'text-align:center;', text: '입고수량', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'output', style:'text-align:center;', text: '출고수량', align: 'right', format:'0,000', width: 100 },
		                        {   xtype: 'numbercolumn', dataIndex: 'sum', style:'text-align:center;', text: '재고수량', align: 'right', format:'0,000', width: 100 }
		                    ],
		                    plugins: [ Ext.create('Ext.grid.plugin.BufferedRenderer', {}) ],
		     				dockedItems: [
								{
									xtype: 'toolbar',
									layout: { pack: 'end', type: 'hbox' },
									dock: 'bottom',
									items: [
										{ xtype:'button', text: '인쇄', cls:'bottomChild',
											handler : function(){
						               			var fromDt = Ext.getCmp('menu21_date_str').getValue();
												var toDt = Ext.getCmp('menu21_date_end').getValue();
												var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
												var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
												
						               			Ext.ux.grid.Printer.mainTitle = '[ 재고현황 ]';
						               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(from_yyyymmdd, to_yyyymmdd); 
								            	Ext.ux.grid.Printer.print(this.up().up());
							            	}
							            },
						               	{ xtype: 'exporterbutton', downloadName: '재고현황', cls:'bottomChild'}
									]
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

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	
    },

    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
		var now = new Date();
		Ext.getCmp('menu21_date_str').setValue(Ext.Date.getFirstDateOfMonth( now ));
		Ext.getCmp('menu21_date_end').setValue(Ext.Date.getLastDateOfMonth( now ));
		
		//계정코드검색 데이터 셋팅
		this.onContainerShowRender();
		this.onMenu21_SearchBtnClick();
    },
    
    //화면이 숨겨졌다 보여질때
    onContainerShowRender: function(component, eOpts) {
    	
    	var kbnVal = Ext.getCmp('menu21_itemgrp_cd').getValue();
    	var itemVal = Ext.getCmp('menu21_item_cd').getValue();
    	
    	StoreInfo.Menu23_Grid_SEAR.removeAll();
    	StoreInfo.Menu23_Grid_SEAR.insert(0, {'itemgrp_cd':'', 'itemgrp_nm':'전체'});
		var copyRecs = StoreInfo.Menu23_Grid.getNewRecords();
		for(var i=0; i<copyRecs.length; i++)
			StoreInfo.Menu23_Grid_SEAR.insert(i+1, {'itemgrp_cd':copyRecs[i].get('itemgrp_cd'), 'itemgrp_nm':copyRecs[i].get('itemgrp_nm')});
		
		//이전에 선택된 데이터가 없으면 상품목록 초기화    	
    	if(itemVal == '' || itemVal == '전체')
    		if(kbnVal == '' || kbnVal == '전체') this.onComboboxSelect();
    		
    },
    
    onComboboxSelect: function(combo, records, eOpts) {
    	
    	var selVal = Ext.getCmp('menu21_itemgrp_cd').getValue();
    	StoreInfo.Menu24_Grid_SEAR.removeAll();
    	StoreInfo.Menu24_Grid_SEAR.insert(0, {'item_cd':'', 'item_nm':'전체'});
    	
    	if(selVal == '전체' || selVal == '')
    	{
			var copyRecs = StoreInfo.Menu24_Grid.getNewRecords();
			for(var i=0; i<copyRecs.length; i++)
				StoreInfo.Menu24_Grid_SEAR.insert(i+1, {'item_cd':copyRecs[i].get('item_cd'), 'item_nm':copyRecs[i].get('item_nm')});
    	}
    	else
    	{
    		StoreInfo.Menu24_Grid.each(function(item, index, count){
    			if(item.get('itemgrp_cd') == selVal)
    				StoreInfo.Menu24_Grid_SEAR.add({'item_cd':item.get('item_cd'), 'item_nm':item.get('item_nm')});
    		});
    		Ext.getCmp('menu21_item_cd').setValue('전체');
    	}
    },

    //조회버튼을 눌렀을 경우
    onMenu21_SearchBtnClick: function(button, e, eOpts) {
    	
    	var thisObj = this;
    	var fromDt = Ext.getCmp('menu21_date_str').getValue();
		var toDt = Ext.getCmp('menu21_date_end').getValue();
		var from_yyyymmdd = fromDt.getFullYear()+Ext.String.leftPad((fromDt.getMonth()+1), 2, '0')+Ext.String.leftPad(fromDt.getDate(), 2, '0'); 
		var to_yyyymmdd = toDt.getFullYear()+Ext.String.leftPad((toDt.getMonth()+1), 2, '0')+Ext.String.leftPad(toDt.getDate(), 2, '0');
		var item_grp = Ext.getCmp('menu21_itemgrp_cd').getValue();
		if(item_grp == '전체') item_grp = '';
		
		var params = {
			from_yyyymmdd: from_yyyymmdd,
			to_yyyymmdd: to_yyyymmdd,
			item_grp: item_grp
		};
		
		Global.showMask(Ext.getBody());

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/stock/stock_report_proc.php',
			params: params,
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu21_Grid.removeAll();
					StoreInfo.Menu21_Grid.add(json.DATA);
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
    
  	//물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(재고현황)', 'Menu21');
    }
});

