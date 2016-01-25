
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    
Ext.define('Common_Pop_Items_Mgr', {
    extend: 'Ext.window.Window',

    height: 452,
    width: 800,
    modal: true,
    title: '상품 등록 최종확인',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id:'items_excel_grid',
                    cls:'grid',
                    height: 370,
                    autoScroll:true,
                    store: StoreInfo.Menu24_Grid_Excel,
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
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                    	pruneRemoved: false,
                    	checkOnly: true,
                		mode: 'MULTI' 
                    }),
                    listeners:{
                    	itemdblclick: {
                            fn: me.onGridpanelItemDblClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    margin: 10,
                    layout: {
                        align: 'middle',
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margin: 5,
                            width: 50,
                            text: '업로드',
                            listeners:{
                            	click:{
                            		fn: me.onSelectClick,
                            		scope: me
                            	}
                            }
                            
                        },
                        {
                            xtype: 'button',
                            margin: 5,
                            width: 50,
                            text: '취소',
                            listeners:{
                            	click:{
                            		fn: me.onCloseClick,
                            		scope: me
                            	}
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                 beforeclose: {
                    fn: me.onWindowBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		
		StoreInfo.Menu24_Grid_Excel.removeAll();
		
		var rowData = null;
		for(var i = 1; i<this.excelData.length; i++ )
		{
			rowData = this.excelData[i];
			
			var trTempObj = new Object();
			trTempObj['item_cd'] = Ext.String.leftPad(rowData[0], 6, "0"); 
			trTempObj['item_nm'] = rowData[1];
			trTempObj['item_danwi'] = rowData[2];
			trTempObj['item_qty'] = rowData[3];
			rowData[4] = rowData[4]+'';
			rowData[5] = rowData[5]+'';
			trTempObj['item_in_danga'] = parseInt(rowData[4].replace(/,/g, ""), 10);
			trTempObj['item_out_danga'] = parseInt(rowData[5].replace(/,/g, ""), 10);
			StoreInfo.Menu24_Grid_Excel.add(trTempObj);
		}
   	},
   	
   	onSendData: function(){
   		
   		if(this.regIdx >= this.selLen)
   		{
   			
   			StoreInfo.Menu24_Grid.sort('item_cd', 'ASC');
	    	
   			Global.hideMask();
	    	
	    	if(StoreInfo.Menu24_Grid_Excel.getCount() > 0)
	    	{
	    		if(this.isNotSuc) Ext.Msg.alert("", '상품코드나 상품명이 동일한 데이터는 저장되지 않습니다.');
	    		else Ext.Msg.alert("", '저장되었습니다.');
	    	} 
	    	else
	    	{
	    		this.close();
	    		Ext.Msg.alert("", '저장되었습니다.');
	    	}
   		}
   		else
   		{
   			var thisObj = this;
   			var rowModel = this.selection[this.regIdx];
   			var rowData = rowModel.data;
   			
   			if(!ValidateFunc.checkDupCode(StoreInfo.Menu24_Grid, 'item_cd', rowData.item_cd))
   			{
   				if(!ValidateFunc.checkDupCode(StoreInfo.Menu24_Grid, 'item_nm', rowData.item_nm))
   				{
   					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/item/item_reg_edit_proc.php',
						params: {
							item_cd: parseInt(rowData.item_cd, 10), 
				            item_nm: rowData.item_nm,
				            item_danwi: rowData.item_danwi, 
				            item_qty: rowData.item_qty,
				            item_in_danga: rowData.item_in_danga,
				           	item_out_danga: rowData.item_out_danga
						},
						success: function(response, opts) {
							
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00')
							{
								StoreInfo.Menu24_Grid.add(rowData);
								StoreInfo.Menu24_Grid_Excel.remove(rowModel);
								thisObj.regIdx++;
								
								//성공시 로우에서 삭제
			    				thisObj.onSendData();
							}
							else
							{
								thisObj.regIdx++;
								//실패시 로우에 원인 표시
								thisObj.onSendData();
							}
						},
						failure: function(form, action) {
							thisObj.regIdx++;
							//실패시 로우에 원인 표시
							thisObj.onSendData();
						}
					});	
   				}
   				else
   				{
   					//상품명이 동일할 경우
   					thisObj.isNotSuc = true;
   					thisObj.regIdx++;
			    	thisObj.onSendData();
   				}
   			}
   			else
   			{
   				//상품코드가 동일할 경우
   				thisObj.isNotSuc = true;
   				thisObj.regIdx++;
			    thisObj.onSendData();
   			}
   		}
   	},
    
    onSelectClick: function() {
    	
    	this.selection = null;
    	this.selLen = 0;
    	this.regIdx = 0;
    	this.isNotSuc = false;  
    	
    	this.selection = Ext.getCmp('items_excel_grid').getSelectionModel().getSelection();
    	this.selLen = this.selection.length;
    	
    	if(this.selLen > 0)
    	{
    		Global.showMask(Ext.getBody());
    		this.onSendData();
    	}
    	else Ext.Msg.alert("", '등록할 상품을 선택해주세요');
    	
    },

    onCloseClick: function(){
		this.close();    	
    },
    
    onWindowBeforeClose: function(panel, eOpts) {

    }

});