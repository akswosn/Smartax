/* 
 * [거래처 원장 팝업]
 * @param {String} from_yyyymmdd
 * @param {String} to_yyyymmdd
 * @param {String} gycode
 * @param {String} customer_id
 * @return {Json}
 * @exception
 * @author 김태훈
 */

//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_CustomersLedger', {
    extend: 'Ext.window.Window',

    height: 452,
    width: 722,
    layout: 'fit',
    modal: true,
    title: '거래원장',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                layout: {
                    type: 'hbox',
                    align: 'start',
                    pack: 'stretch'
                },
                overflowY: 'scroll',
                autoScroll: true,
                border: false,
                store: StoreInfo.Menu06_Grid2_Pop,
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
                columns: [{
                    xtype: 'gridcolumn',
                    dataIndex: 'jp_yyyymmdd',
                    style: 'text-align:center',
                    sortable: false,
                    text: '일자',
                    align: 'center',
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
		            flex: 1
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'credit',
                    style: 'text-align:center',
                    sortable: false,
                    width: 120,
                    align: 'right',
                    format: '0,000',
                    text: '입금/대변'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'debit',
                    style: 'text-align:center',
                    sortable: false,
                    width: 120,
                    align: 'right',
                    format: '0,000',
                    text: '출금/차변'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'sum',
                    style: 'text-align:center',
                    sortable: false,
                    width: 120,
                    align: 'right',
                    format: '0,000',
                    text: '잔액'
                },
                {
                    xtype: 'gridcolumn',
                    width: 16
                }]
            }],
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
		StoreInfo.Menu06_Grid2_Pop.removeAll();
		
		Global.showMask(Ext.getBody());
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/customer_ledger_proc.php',
			params: {
				from_yyyymmdd: this .from_yyyymmdd,
				to_yyyymmdd: this.to_yyyymmdd,
				gycode: this.gycode,
				customer_id : this.customer_id
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu06_Grid2_Pop.add(json.DATA);
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
   	onCloseClick: function(){
    	this.close();
    },
});