
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    
Ext.define('Common_Pop_Stock_Mgr', {
    extend: 'Ext.window.Window',

    height: 452,
    width: 800,
    modal: true,
    title: '초기재고 등록 최종확인',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id:'stock_excel_grid',
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
                            width: 180
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
                            xtype: 'numbercolumn',
                            dataIndex: 'io_su',
                            style: 'text-align:center',
                            width: 90,
                            align: 'right',
                            format:'0,000',
                            text: '재고수량',
                            editor: {
                                xtype: 'numberfield',
                                selectOnFocus:true,
                                fieldStyle: 'text-align: right;',
                                minValue: 0,
                                format:'0,000',
                                listeners: {
                                    specialkey: {
                                        fn: function(field, e, options) {
                                            if(e.getKey()==13){
                                                Global.isEnter = true;
                                            }
                                        }
                                    }
                                }
                            }
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
            trTempObj['item_qty'] = rowData[2];
            trTempObj['item_danwi'] = rowData[3];
            trTempObj['io_su'] = rowData[4];
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
                if(this.isNotSuc) Ext.Msg.alert("", '등록되지 않은 상품의 데이터는 저장되지 않습니다.');
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
                //상품코드가 없을 경우
                thisObj.isNotSuc = true;
                thisObj.regIdx++;
                thisObj.onSendData();
            }
            else
            {
                Ext.Ajax.request({
                    method: 'POST',
                    url: './proc/account/stock/stock_reg_proc.php',
                    params: {
                        io_yyyy: thisObj.io_yyyy,
                        io_item_cd: parseInt(rowData.item_cd, 10),
                        io_su: rowData.io_su
                    },
                    success: function(response, opts) {
                        
                        var json = Ext.JSON.decode(response.responseText);
                        var rowIdx = StoreInfo.Menu24_Grid.find('item_cd', Ext.String.leftPad(rowData.item_cd, 5, '0')); 
                        
                        if(json.CODE == '00')
                        {
                            StoreInfo.Menu24_Grid.getAt(rowIdx).set('io_su', rowData.io_su);
                            StoreInfo.Menu24_Grid.commitChanges();
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
        }
    },
    
    onSelectClick: function() {
        
        this.selection = null;
        this.selLen = 0;
        this.regIdx = 0;
        this.isNotSuc = false;  
        
        this.selection = Ext.getCmp('stock_excel_grid').getSelectionModel().getSelection();
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