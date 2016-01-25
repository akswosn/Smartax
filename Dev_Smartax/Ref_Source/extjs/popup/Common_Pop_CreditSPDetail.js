/* 
 * [외상채권, 외상채무 거래명세표 팝업]
 * @param {String} gycode
 * @param {String} jp_no
 * @param {String} jp_yyyymmdd
 * @author 김태훈
 */

//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_CreditSPDetail', {
    extend: 'Ext.window.Window',

    height: 452,
    width: 722,
    layout: 'fit',
    modal: true,
    title: '거래명세표',

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
                store: StoreInfo.Menu05_Grid2_Pop,
                columns: [{
                    xtype: 'gridcolumn',
                    dataIndex: 'io_item_cd',
                    style: 'text-align:center',
                    sortable: false,
                    text: '코드',
                    align:'center',
                    width: 50
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'io_item_nm',
                    style: 'text-align:center',
                    sortable: false,
                    text: '상품명',
                    width: 100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'io_item_qty',
                    style: 'text-align:center',
                    sortable: false,
                    text: '규격',
                    width: 60
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'io_item_danwi',
                    style: 'text-align:center',
                    sortable: false,
                    text: '단위',
                    width: 60
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'io_su',
                    width: 50,
                    sortable: false,
                    style: 'text-align:center',
                    align: 'right',
                    format:'0,000',
                    text: '수량'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'io_dan',
                    style: 'text-align:center',
                    sortable: false,
                    align: 'right',
                    format:'0,000',
                    text: '단가',
                    width: 90
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'io_amt',
                    style: 'text-align:center',
                    sortable: false,
                    align: 'right',
                    format:'0,000',
                    text: '금액',
                    width: 90
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'io_rem',
                    style: 'text-align:center',
                    sortable: false,
                    minWidth: 200,
                    flex:1,
                    text: '적요',
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
	    var store = StoreInfo.Menu05_Grid2_Pop;
		store.removeAll();
		
		Global.showMask(Ext.getBody());
		
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/report/credit_sale_purchase_detail_proc.php',
			params: {
				gycode: this.gycode,
				jp_no: this.jp_no,
				jp_yyyymmdd: this.jp_yyyymmdd,
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					store.add(json.DATA);
				}
				else{
					Ext.Msg.alert("알림", '거래명세서 조회 실패');
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