
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    
Ext.define('Common_Pop_Trds_Mgr', {
    extend: 'Ext.window.Window',

    height: 452,
    width: 800,
    modal: true,
    title: '거래처등록 최종확인',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'trds_excel_grid',
                    height: 370,
                    autoScroll: true,
                    store: StoreInfo.Menu09_Grid_Excel,
                    columns: [
                        { xtype: 'gridcolumn', dataIndex: 'customer_id', align:'center', sortable: true, text: '거래처코드', width: 100},
                		{ xtype: 'gridcolumn', dataIndex: 'tr_nm', style: 'text-align:center', sortable: true, text: '거래처명', width: 100},
                		{ xtype: 'gridcolumn', dataIndex: 'tr_daepyo', style: 'text-align:center', sortable: true, text: '대표자', width: 100 },
                		{ xtype: 'gridcolumn', dataIndex: 'tr_tel', style: 'text-align:center', sortable: true, text: '전화번호', width: 100 },
                		{ xtype: 'gridcolumn', dataIndex: 'tr_phone', style: 'text-align:center', sortable: true, text: '핸드폰', width: 100 },
                		{ xtype: 'gridcolumn', dataIndex: 'tr_addr', style: 'text-align:center', sortable: true, text: '주소', minWidth: 250, flex:1 }
                		/*
                		{
			                xtype: 'actioncolumn',
			                width: 30,
			                sortable: false,
			                menuDisabled: true,
			                items: [{
			                    icon: 'resources/images/icons/fam/delete.gif',
			                    tooltip: 'Delete Plant',
			                    scope: this,
			                    handler: this.onRemoveClick
			                }]
			            },
			            {
			                xtype: 'actioncolumn',
			                width: 30,
			                sortable: false,
			                menuDisabled: true,
			                items: [{
			                    icon: 'resources/images/icons/fam/delete.gif',
			                    tooltip: 'Delete Plant',
			                    scope: this,
			                    handler: this.onRemoveClick
			                }]
			            }
			            */
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
		
		StoreInfo.Menu09_Grid_Excel.removeAll();
		
		for(var i = 1; i<this.excelData.length; i++ )
		{
			rowData = this.excelData[i];
			
			var trTempObj = new Object();
			trTempObj['customer_id'] = Ext.String.leftPad(rowData[0], 5, "0"); 
			trTempObj['tr_nm'] = rowData[1];
			trTempObj['tr_daepyo'] = rowData[2];
			trTempObj['tr_tel'] = rowData[3];
			trTempObj['tr_phone'] = rowData[4];
			trTempObj['tr_addr'] = rowData[5];
			StoreInfo.Menu09_Grid_Excel.add(trTempObj);
		}
		
   	},
   	
   	onSendData: function(){
   		
   		if(this.regIdx >= this.selLen)
   		{
   			
   			StoreInfo.Menu09_Grid.sort('customer_id', 'ASC');
	    	StoreInfo.Menu09_Grid_SEARCH.sort('customer_id', 'ASC');
	    	
   			Global.hideMask();
	    	
	    	if(StoreInfo.Menu09_Grid_Excel.getCount() > 0)
	    	{
	    		if(this.isNotSuc) Ext.Msg.alert("", '거래처코드나 거래처명이 동일한 데이터는 저장되지 않습니다.');
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
   			
   			if(!ValidateFunc.checkDupCode(StoreInfo.Menu09_Grid, 'customer_id', rowData.customer_id))
   			{
   				if(!ValidateFunc.checkDupCode(StoreInfo.Menu09_Grid, 'tr_nm', rowData.tr_nm))
   				{
   					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/customer/customer_register_proc.php',
						params: {
							customer_id: parseInt(rowData.customer_id, 10), 
				            tr_nm: rowData.tr_nm,
				            tr_tel: rowData.tr_tel, 
				            tr_phone: rowData.tr_phone,
				            tr_daepyo: rowData.tr_daepyo,
				           	tr_fax: rowData.tr_fax,
				            tr_saup_no: rowData.tr_saup_no,
				            tr_jumin_no: rowData.tr_jumin_no,
				            tr_up: rowData.tr_up,
				            tr_jong: rowData.tr_jong,
				            tr_zip: rowData.tr_zip,
				            tr_addr: rowData.tr_addr,
				            tr_homepage: rowData.tr_homepage,
				            tr_email: rowData.tr_email,
				            tr_manager: rowData.tr_manager,
				            tr_sdate: rowData.tr_sdate.replace(/-/g,""),
				            tr_edate: rowData.tr_edate.replace(/-/g,""),
				            tr_bigo: rowData.tr_bigo,
				            cid_tel1: 0,
							cid_tel2: 0,
							cid_tel3: 0,
							tr_chuchun: 0
						},
						success: function(response, opts) {
							
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00')
							{
								StoreInfo.Menu09_Grid.add(rowData);
								StoreInfo.Menu09_Grid_SEARCH.add(rowData);
								StoreInfo.Menu09_Grid_Excel.remove(rowModel);
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
   					//거래처명이 동일할 경우
   					thisObj.isNotSuc = true;
   					thisObj.regIdx++;
			    	thisObj.onSendData();
   				}
   			}
   			else
   			{
   				//거래처코드가 동일할 경우
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
    	
    	this.selection = Ext.getCmp('trds_excel_grid').getSelectionModel().getSelection();
    	this.selLen = this.selection.length;
    	
    	if(this.selLen > 0)
    	{
    		Global.showMask(Ext.getBody());
    		this.onSendData();
    	}
    	else Ext.Msg.alert("", '등록할 거래처를 선택해주세요');
    	
    },

    onCloseClick: function(){
		this.close();    	
    },
    
    onWindowBeforeClose: function(panel, eOpts) {

    }

});