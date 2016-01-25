/* 
 * [대차표 팝업]
 * 
 * @param {Number} year
 * @author 김태훈
 */

Ext.define('Common_Pop_BalanceSheet', {
    //VIEW
    extend: 'Ext.window.Window',
    height: 452,
    width: 722,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    modal: true,
    title: '대차표',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{ //대차표 그리드
                xtype: 'gridpanel',
                flex: 1,
                border: false,
                store: StoreInfo.BalanceSheet_Pop,
                columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'debit_gycode',
                    align:'center',
                    sortable: true,
                    text: '계정코드',
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'debit_name',
                    style: 'text-align:center',
                    flex: 1,
                    text: '계정명'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'debit_am',
                    style: 'text-align:center',
                    flex: 1,
                    align: 'right',
                    format:'0,000',
                    text: '잔액'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'credit_gycode',
                    align:'center',
                    sortable: true,
                    text: '계정코드',
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'credit_name',
                    style: 'text-align:center',
                    flex: 1,
                    text: '계정명'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'credit_am',
                    style: 'text-align:center',
                    flex: 1,
                    align: 'right',
                    format:'0,000',
                    text: '잔액'
                }],
            },
            { //대차표 합계
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                height: 24,
                style: {
                    'background': '#FFD7D7'
                },
                items: [{
                    xtype: 'label',
                    id: 'Pop_BalanceSheet_SumDebit',
                    style: {
                        'padding-right': '25px',
                        'text-align': 'right',
                        'font-weight': 'bold'
                    },
                    flex: 1
                },
                {
                    xtype: 'label',
                    id: 'Pop_BalanceSheet_SumCredit',
                    style: {
                        'padding-right': '25px',
                        'text-align': 'right',
                        'font-weight': 'bold'
                    },
                    flex: 1
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
    
    //CONTROLLER
    onWindowAfterRender: function(component, eOpts) {
        var data = this.getEachData(StoreInfo.Menu11_Grid1)
        , store = StoreInfo.BalanceSheet_Pop
        , sumDebit = 0
        , sumCredit = 0;
        
        //스토어 클리어
        store.removeAll();
        
        for (var i = 0; i < data.length; i++) {
            //스토어 데이터 셋팅
            store.add({
                'debit_gycode': (data.debit[i]) ? data.debit[i].gycode : '',
                'debit_name': (data.debit[i]) ? data.debit[i].gy_name : '',
                'debit_am': (data.debit[i]) ? data.debit[i].gy_am : '',
                'credit_gycode': (data.credit[i]) ? data.credit[i].gycode : '',
                'credit_name': (data.credit[i]) ? data.credit[i].gy_name : '',
                'credit_am': (data.credit[i]) ? data.credit[i].gy_am : ''
            });
            
            //합계금액 계산
            sumDebit += (data.debit[i]) ? parseInt(data.debit[i].gy_am) : 0;
            sumCredit += (data.credit[i]) ? parseInt(data.credit[i].gy_am) : 0;
        }
        
        //합계금액 셋팅
        Ext.getCmp('Pop_BalanceSheet_SumDebit').setText('자산총계 : ' + Ext.util.Format.number(sumDebit, '0,000'));
        Ext.getCmp('Pop_BalanceSheet_SumCredit').setText('부채및자본총계 : ' + Ext.util.Format.number(sumCredit, '0,000'));
    },
    
    //기초금액 스토어 데이터 분기
    getEachData: function(store) {
        var result = new Object();
        result.debit = new Array();
        result.credit = new Array();
        result.length = null;
        
        store.each(function(record) {
            if (parseInt(record.getData().gycode) < 200)
            { //계정코드 200 미만 항목
                result.debit.push(record.getData());
            }
            else
            { //계정코드 200 이상 항목
                result.credit.push(record.getData());
            };
        });
        
        result.length = Math.max(result.debit.length, result.credit.length);
        
        return result;
    },
    
    onCloseClick: function(){
        this.close();
    },
});