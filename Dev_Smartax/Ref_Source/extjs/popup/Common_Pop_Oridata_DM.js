
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_Oridata_DM', {
    extend: 'Ext.window.Window',

    height: 400,
    width: 900,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
	                xtype: 'gridpanel',
	                id: 'grid',
	                height: 365,
	                autoScroll:true,
	                border:0,
	                store: StoreInfo.Oridata_Grid,
	                viewConfig: {
					    getRowClass: function(record, rowIndex, rowParams, store){
					    	var cls = "row-valid";
					    	var type = record.get('type');
					    	if(type == 1) cls = "row-hide";
					    	else if(type == 2) cls = "row-month";
					    	else if(type == 3) cls = "row-sum";
					    	else if(type == 4) cls = "row-pre";
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
                            dataIndex: 'customer_id',
                            style: 'text-align:center',
                            width: 100,
                            sortable: false,
                            text: '거래처',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        		var code = Ext.String.leftPad(value, 5, '0');
                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                        		if(codeRecord) return code+" "+codeRecord.get('tr_nm');
                            }
                        },
	                    
	                    {
	                        xtype: 'gridcolumn',
	                        dataIndex: 'jp_rem',
	                        style: 'text-align:center',
	                        sortable: false,
	                        flex:1,
	                        text: '적요'
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'credit',
	                        style: 'text-align:center',
	                        sortable: false,
	                        width: 120,
	                        align: 'right',
	                        format:'0,000',
	                        text: '입금액'
	                    },
	                    {
	                        xtype: 'numbercolumn',
	                        dataIndex: 'debit',
	                        style: 'text-align:center',
	                        sortable: false,
	                        width: 120,
	                        align: 'right',
	                        format:'0,000',
	                        text: '출금액'
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
				               			Ext.ux.grid.Printer.mainTitle = me.title;
				               			Ext.ux.grid.Printer.subDate = Global.makeSubTitle(me.from_yyyymmdd, me.to_yyyymmdd); 
						            	Ext.ux.grid.Printer.print(this.up().up());
						            }
				               	},
				               	{
				               		xtype: 'exporterbutton',
				               		downloadName: '계정별원장',
				               		cls:'bottomChild'
				               	},
				               	{
				               		xtype:'button',
				               		text: '종료',
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
	                    celldblclick: {
	                        fn: me.onGridpanelCellDblClick,
	                        scope: me
	                    }
	                }
	          	}
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		
		//수정
		var jakmok_code = '';
		if(this.record.get('jakmok_code'))jakmok_code = this.record.get('jakmok_code');
		if(this.jakmok_code) jakmok_code = this.jakmok_code;
		var gycode = this.record.get('gycode');
		var from_yyyymmdd = this.from_yyyymmdd;
		var to_yyyymmdd = this.to_yyyymmdd;
		var flag = this.flag;
		
		var url;
		if(gycode == 101) {
            //계정코드가 101일경우 현금원장 호출
            url = './proc/account/report/cash_report_DM_proc.php';
        }
        else {
            url = './proc/account/report/gycode_report_DM_proc.php';
            Ext.getCmp('grid').columns[3].setText('입금/대변');
            Ext.getCmp('grid').columns[4].setText('출금/차변');
            
        }
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: url,
			params: {
				from_yyyymmdd: from_yyyymmdd,
				to_yyyymmdd:  to_yyyymmdd,
				gycode :gycode,
				//수정
				jakmok_code : jakmok_code,
				flag : flag,
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Oridata_Grid.removeAll();
					StoreInfo.Oridata_Grid.add(json.DATA);
					var firstRec = StoreInfo.Oridata_Grid.getAt(0); 
					
					var gicho_obj = {
						'jp_rem': '전월잔액',
						//'credit': json.DATA[0]['credit'],
						//'debit': json.DATA[0]['debit'],
						//'sum': json.DATA[0]['sum'],
						'type':4
					};
					
					if(flag == 'd') gicho_obj.jp_rem = '전일잔액';
					
					firstRec.set(gicho_obj);
					firstRec.commit();
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
   	
    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    	this.onSelectModifyClick();
    },
    
    onSelectModifyClick: function() {
    	/*
    	var selectData = this.items.items[0].getSelectionModel().getSelection()[0].data;
    	if(this.key == 'customer_id')
    	{
    		var preRec = StoreInfo.Menu11_Grid.findRecord('customer_id', selectData.customer_id, null, null, null, true);
    		if(preRec){
    			Ext.Msg.alert("", '이미 거래처가 등록되어 있습니다.');
    			Global.isEnter = false;
    		}
    		else
    		{
    			this.record.set('customer_id', selectData.customer_id);
    			Global.isEnter = true;
    		}
    	}
    	else
    	{
    		if(this.Cfield)
	    	{
	    		this.Cfield.setValue(selectData.customer_id);
	    		this.Vfield.setValue(selectData.tr_nm);	
	    	}
	    	else
	    	{
	    		this.record.set('customer_id', selectData.customer_id);
	    		Global.isEnter = true;	
	    	}
    	}
    	*/
    },

    onCloseClick: function(){
    	StoreInfo.Oridata_Grid.removeAll();
		this.close();    	
    }
});