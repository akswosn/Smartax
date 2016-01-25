/* 
 * @page 메인 - 수지표
 * @author 김태훈
 * @history 2014.12.16 작성
 */

var gycode_Skey = -1; //49,50,51,52
var customer_SKey = -1;
var customer_StrKey = '';

Ext.define('Menu31_Page', { //클래스 정의
    extend: 'Ext.container.Container', //확장하려는 클래스 명시
    id: 'Menu31_Page',
    cls: 'page',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex:1,
    initComponent: function() { //확장할 클래스의 기능을 재정의
        var me = this;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                height: 22,
                style: {'background': '#99BBE8'},
                items: [{
                    xtype: 'label',
                    text: '자산',
                    style: {
                        'text-align': 'center',
                        'font-weight': 'bold'
                    },
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: '부채',
                    style: {
                        'text-align': 'center',
                        'font-weight': 'bold'
                    },
                    flex: 1
                }]
            },
            {
                xtype: 'gridpanel',
                id: 'Menu31_Grid1',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                flex: 1,
                hideHeaders: true,
                overflowY: 'auto',
                autoScroll: true,
                loadMask: true,
                enableColumnMove: false,
                store: StoreInfo.Menu31_Grid1,
                viewConfig: {
                    getRowClass: function(record, rowIndex, rowParams, store){
                        var cls = "row-valid";
                        if(record.get('type') == -1) cls = "row-month";
                        if(record.get('type') == -2) cls = "row-profit";
                        return cls;
                    }
                },
                columns: [{
                    xtype: 'gridcolumn',
                    dataIndex: 'debit_gycode',
                    style: 'text-align:center;',
                    sortable: false,
                    text: '자산',
                    flex: 1,
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
                    dataIndex: 'debit_balance_am',
                    style: 'text-align:center;',
                    sortable: false,
                    align: 'right',
                    format: '0,000',
                    text: '금액',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 20
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'credit_gycode',
                    style: 'text-align:center;',
                    sortable: false,
                    text: '부채',
                    flex: 1,
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
                    dataIndex: 'credit_balance_am',
                    style: 'text-align:center;',
                    sortable: false,
                    align: 'right',
                    format: '0,000',
                    text: '금액',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 20
                }]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                height: 22,
                style: {'background': '#99BBE8'},
                items: [{
                    xtype: 'label',
                    text: '비용',
                    style: {
                        'text-align': 'center',
                        'font-weight': 'bold'
                    },
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: '수익',
                    style: {
                        'text-align': 'center',
                        'font-weight': 'bold'
                    },
                    flex: 1
                }]
            },
            {
                xtype: 'gridpanel',
                id: 'Menu31_Grid2',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                flex: 1,
                hideHeaders: true,
                overflowY: 'auto',
                autoScroll: true,
                loadMask: true,
                enableColumnMove: false,
                store: StoreInfo.Menu31_Grid2,
                viewConfig: {
                    getRowClass: function(record, rowIndex, rowParams, store){
                        var cls = "row-valid";
                        if(record.get('type') == -1) cls = "row-month";
                        if(record.get('type') == -2) cls = "row-profit";
                        return cls;
                    }
                },
                columns: [{
                    xtype: 'gridcolumn',
                    dataIndex: 'credit_gycode',
                    style: 'text-align:center;',
                    sortable: false,
                    text: '수익',
                    flex: 1,
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
                    dataIndex: 'credit_balance_am',
                    style: 'text-align:center;',
                    sortable: false,
                    align: 'right',
                    format: '0,000',
                    text: '금액',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 20
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'debit_gycode',
                    style: 'text-align:center;',
                    sortable: false,
                    text: '비용',
                    flex: 1,
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
                    dataIndex: 'debit_balance_am',
                    style: 'text-align:center;',
                    sortable: false,
                    align: 'right',
                    format: '0,000',
                    text: '금액',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    width: 20
                }]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                height: 22,
                style: {'background': '#FFD7D7'},
                items: [{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'start'
                    },
                    flex: 1,
                    items: [{
                        xtype: 'label',
                        text: '차변총계',
                        style: {
                            'padding-left': '10px',
                            'text-align': 'left'
                        },
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        id: 'Menu31_SumDebit',
                        style: {
                            'padding-right': '25px',
                            'text-align': 'right'
                        },
                        flex: 1
                    }]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'start'
                    },
                    flex: 1,
                    items: [{
                        xtype: 'label',
                        text: '대변총계',
                        style: {
                            'padding-left': '10px',
                            'text-align': 'left'
                        },
                        flex: 1
                        
                    },
                    {
                        xtype: 'label',
                        id: 'Menu31_SumCredit',
                        style: {
                            'padding-right': '25px',
                            'text-align': 'right'
                        },
                        flex: 1
                    }]
                }]
            }],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                }
            }
        });
        
        me.callParent(arguments); //확장할 클래스의 initComponent 함수 호출하여 재정의한 내용을 전달
    },
    
    onContainerAfterRender: function() {
        var thisObj = this;
        var now = new Date();
        var year = now.getFullYear(); 
        var month = Ext.String.leftPad((now.getMonth()+1), 2, '0');
        var day = Ext.String.leftPad(now.getDate(), 2, '0');
        var date = year + month + day;
        
        Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'GET',
            url: './proc/account/report/acct_report_proc.php',
            params: { 'jp_yyyymm': date },
            success: function(response, opts) {
                if (Global.mask) Global.hideMask();
                
                var json = Ext.JSON.decode(response.responseText);
                
                if (json.CODE == '00') {
                    thisObj.settingStore(json.children);
                }
            },
            failure: function(form, action) {
                Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
            }
        });
    },
    
    settingStore: function(data) {
        
        var store1 = StoreInfo.Menu31_Grid1;
        var store2 = StoreInfo.Menu31_Grid2;
        var store1Len = Math.max(data[0].children.length, data[1].children.length);
        var store2Len = Math.max(data[2].children.length, data[3].children.length);
        var store1Sum = new Object();
        var store2Sum = new Object();
        
        store1.removeAll();
        store2.removeAll();
        
        for (var i = 0; i < store1Len; i++) {
            var grid1model = new Object();
            
            if (data[0].children[i]) { //자산
                grid1model.debit_gycode = data[0].children[i].gycode;
                grid1model.debit_balance_am = data[0].children[i].balance_am;
            }
            
            if (data[1].children[i]) { //부채
                grid1model.credit_gycode = data[1].children[i].gycode;
                grid1model.credit_balance_am = data[1].children[i].balance_am;
            }
            
            store1.add(grid1model);
        }
        
        for (var i = 0; i < store2Len; i++) {
            var grid2model = new Object();
            
            if (data[2].children[i]) { //비용
                grid2model.debit_gycode = data[2].children[i].gycode;
                grid2model.debit_balance_am = data[2].children[i].balance_am;
            }
            
            if (data[3].children[i]) { //수익
                grid2model.credit_gycode = data[3].children[i].gycode;
                grid2model.credit_balance_am = data[3].children[i].balance_am;
            }
            
            store2.add(grid2model);
        }
        
        store1Sum.type = -1;
        store1Sum.debit_gycode = '자산총계';
        store1Sum.debit_balance_am = store1.sum('debit_balance_am');
        store1Sum.credit_gycode = '부채총계';
        store1Sum.credit_balance_am = store1.sum('credit_balance_am');
        
        store2Sum.type = -1;
        store2Sum.debit_gycode = '비용총계';
        store2Sum.debit_balance_am = store2.sum('debit_balance_am');
        store2Sum.credit_gycode = '수익총계';
        store2Sum.credit_balance_am = store2.sum('credit_balance_am');
        
        store1.add(store1Sum);
        store2.add(store2Sum);
        
        var SumDebit = Number(store1Sum.debit_balance_am) + Number(store2Sum.credit_balance_am);
        var SumCredit = Number(store1Sum.credit_balance_am) + Number(store2Sum.debit_balance_am);
        
        Ext.getCmp('Menu31_SumDebit').setText(Ext.util.Format.number(SumDebit, '0,000'));
        Ext.getCmp('Menu31_SumCredit').setText(Ext.util.Format.number(SumCredit, '0,000'));
    }
});