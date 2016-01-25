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
    autoScroll: true,
    initComponent: function() { //확장할 클래스의 기능을 재정의
        var me = this;
        
        Ext.applyIf(me, {
            items: [{ //수지표 타이틀
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'middle'
                },
                height: 24,
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
                },
                
                {
                    xtype: 'label',
                    text: '수익',
                    style: {
                        'text-align': 'center',
                        'font-weight': 'bold'
                    },
                    flex: 1
                },
                {
                    xtype: 'label',
                    text: '비용',
                    style: {
                        'text-align': 'center',
                        'font-weight': 'bold'
                    },
                    flex: 1
                }]
            },
            { // 수지표 그리드(자산, 부채)
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                //flex: 1,
                height: 296,
                items: [{
                    xtype: 'gridpanel',
                    id: 'Menu31_Grid1',
                    flex: 1,
                    bodyStyle: {
                        'border-right': '0',
                        'border-bottom': '0'
                    },
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
                        style: {'text-align': 'center'},
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
                        style: {'text-align': 'center'},
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
                        style: {'text-align': 'center'},
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
                        style: {'text-align': 'center'},
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
                { //수지표 그리드(수익, 비용)
                    xtype: 'gridpanel',
                    id: 'Menu31_Grid2',
                    flex: 1,
                    bodyStyle: {
                        'border-left': '0',
                        'border-bottom': '0'
                    },
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
                        dataIndex: 'debit_gycode',
                        style: {'text-align': 'center'},
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
                        style: {'text-align': 'center'},
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
                        style: {'text-align': 'center'},
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
                        style: {'text-align': 'center'},
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
                }]
            },
            { //수지표 합계
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                height: 24,
                style: {
                    'background': '#FFD7D7',
                    'border-right': '1px solid #99BBE8',
                    'border-bottom': '1px solid #99BBE8',
                    'border-left': '1px solid #99BBE8'
                },
                items: [{
                    xtype: 'label',
                    id: 'Menu31_SumDebit',
                    style: {
                        'padding-right': '25px',
                        'text-align': 'right',
                        'font-weight': 'bold'
                    },
                    flex: 3
                },
                {
                    xtype: 'label',
                    id: 'Menu31_SumCredit',
                    style: {
                        'padding-right': '25px',
                        'text-align': 'right',
                        'font-weight': 'bold'
                    },
                    flex: 1
                }]
            },
            { //일정관리 그리드
                xtype: 'container',
                margin: '10px 0 0 0',
                height: 300,
                items: [{
                    xtype: 'gridpanel',
                    id: 'Menu31_Grid3',
                    height: 300,
                    overflowY: 'auto',
                    autoScroll: true,
                    loadMask: true,
                    enableColumnMove: false,
                    store: StoreInfo.Menu26_Grid,
                    columns: [{
                        xtype: 'gridcolumn',
                        dataIndex: 'input_type',
                        width: 50,
                        sortable: true,
                        align: 'center',
                        format: '0',
                        text: '기기',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            if(value == 2) return 'Phone';
                            else return 'PC';
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'user_nick',
                        width: 100,
                        sortable: true,
                        align: 'center',
                        format: '0',
                        text: '작성자'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'yyyymmdd',
                        width: 100,
                        sortable: true,
                        align: 'center',
                        format: '0',
                        text: '일자'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'memorial',
                        style: 'text-align:center',
                        sortable: true,
                        minWidth: 200,
                        flex:1,
                        text: '일정 또는 경조사내역 및 기념일',
                        editor: {
                            xtype: 'textfield',
                            listeners: {
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            Global.isCtrl = e.ctrlKey;
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        }
                    }]
                }]
            },
            { //영농일지 그리드
                xtype: 'container',
                margin: '10px 0 0 0',
                height: 300,
                items: [{
                    xtype: 'gridpanel',
                    id: 'Menu31_Grid4',
                    height: 300,
                    overflowY: 'auto',
                    autoScroll: true,
                    loadMask: true,
                    enableColumnMove: false,
                    store: StoreInfo.Menu12_Grid,
                    columns: [{
                        xtype: 'gridcolumn',
                        dataIndex: 'work_date',
                        width: 90,
                        sortable: true,
                        align: 'center',
                        format: '0',
                        text: '작업일자'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'jakmok_cd',
                        style: 'text-align:center',
                        sortable: true,
                        text: '작목코드',
                        width: 100,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var showText = value;
                            if(value)
                            {
                                var codeRecord = StoreInfo.Menu13_Grid.findRecord('jakmok_code', value, null, null, null, true);
                                if(codeRecord) showText += " "+codeRecord.get('jakmok_name');
                            }
                            return showText ;
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'work_cd',
                        style: 'text-align:center',
                        sortable: true,
                        text: '작업코드',
                        width: 100,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var showText = value;
                            if(value)
                            {
                                var codeRecord = StoreInfo.Menu14_Grid.findRecord('work_cd', value, null, null, null, true);
                                if(codeRecord) showText += " "+codeRecord.get('work_nm');
                            }
                            return showText ;
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'work_area',
                        width: 60,
                        align: 'center',
                        format:'0,000.0',
                        text: '작업면적'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'work_man',
                        width: 60,
                        align: 'center',
                        format:'0,000',
                        text: '작업인원'
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'work_time',
                        width: 60,
                        align: 'center',
                        format:'0,000.0',
                        text: '작업시간'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'weather_cd',
                        style: 'text-align:center',
                        width: 100,
                        text: '날씨',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var showText = value;
                            if(value)
                            {
                                var codeRecord = StoreInfo.WEATH_KBN.findRecord('weather_cd', value, null, null, null, true);
                                if(codeRecord) showText = codeRecord.get('weather_nm');
                            }
                            return showText ;
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'work_job',
                        style: 'text-align:center',
                        minWidth:250,
                        flex:1,
                        text: '작업내용'
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
    
    //수지표 화면 렌더링 될때 초기값 셋팅
    onContainerAfterRender: function() {
        var thisObj = this
        //현재날짜 기준으로 조회값 셋팅
        , now = new Date()
        , to = new Date(now.getFullYear(), now.getMonth() + 3)
        //수지표 조회값
        , date = now.getFullYear() + Ext.String.leftPad((now.getMonth()+1), 2, '0') + Ext.String.leftPad(now.getDate(), 2, '0')
        //일정관리, 영농일지 조회값
        , fromDt = now.getFullYear() + Ext.String.leftPad((now.getMonth()+1), 2, '0') + '01'
        , toDt = to.getFullYear() + Ext.String.leftPad((to.getMonth() + 1), 2, '0') + '31';
         
        Global.showMask(Ext.getBody());
        
        //수지표 데이터 가져오기
        Ext.Ajax.request({
            method: 'GET',
            url: './proc/account/report/acct_report_proc.php',
            params: { 'jp_yyyymm': date },
            success: function(response, opts) {
                var json = Ext.JSON.decode(response.responseText);
                
                if (Global.mask) Global.hideMask();
                
                if (json.CODE == '00') {
                    //스토어에 데이터 셋팅
                    thisObj.settingStore(json.children);
                }
                else {
                    Ext.Msg.alert("경고", '수지표 조회 실패 : ' + json.DATA);
                }
            },
            failure: function(form, action) {
                if (Global.mask) Global.hideMask();
                Ext.Msg.alert("경고", '수지표 조회 실패 : 네트 워크 오류');
            }
        });
        
        //일정관리 데이터 가져오기
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/memorial/memorial_list_proc.php',
            params: {
                from_yyyymmdd: fromDt,
                to_yyyymmdd: toDt,
                search: ''
            },
            success: function(response, opts) {
                var json = Ext.JSON.decode(response.responseText);
                
                if (Global.mask) Global.hideMask();
                
                if (json.CODE == '00') {
                    //스토어에 데이터 셋팅
                    StoreInfo.Menu26_Grid.removeAll();
                    StoreInfo.Menu26_Grid.add(json.DATA);
                }
                else {
                    Ext.Msg.alert("경고", '일정관리 조회 실패 : ' + json.DATA);
                }
            },
            failure: function(form, action) {
                if (Global.mask) Global.hideMask();
                Ext.Msg.alert("경고", '일정관리 조회 실패 : 네트 워크 오류');
            }
        });
        
        //영농일지 데이터 가져오기
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/workdiary/workdiary_list_proc.php',
            params: {
                from_work_date: fromDt,
                to_work_date: toDt,
                jakmok_cd: ''
            },
            success: function(response, opts) {
                var json = Ext.JSON.decode(response.responseText);

                if (Global.mask) Global.hideMask();
                
                if(json.CODE == '00'){
                    //스토어에 데이터 셋팅
                    StoreInfo.Menu12_Grid.removeAll();
                    StoreInfo.Menu12_Grid.add(json.DATA);
                }
                else{
                    Ext.Msg.alert("경고", '영농일지 조회 실패 : ' + json.DATA);
                }
            },
            failure: function(form, action) {
                if (Global.mask) Global.hideMask();
                Ext.Msg.alert("경고", '영농일지 조회 실패 : 네트 워크 오류');
            }
        }); 
    },
    
    //수지표 스토어에 데이터 분기하여 셋팅
    settingStore: function(data) {
        //자산, 부채, 수익, 비용 데이터 중 최대 로우값 셋팅
        var maxLength = Math.max(data[0].children.length, data[1].children.length, data[2].children.length, data[3].children.length)
        , store1 = StoreInfo.Menu31_Grid1 //자산, 부채 스토어
        , store2 = StoreInfo.Menu31_Grid2 //수익, 비용 스토어
        , store1Sum = new Object() //자산, 부채 총계 모델
        , store2Sum = new Object() //수익, 비용 총계 모델
        , sumDebit = 0 //차변 총계
        , sumCredit = 0; //대변 총계
        
        store1.removeAll();
        store2.removeAll();
        
        for (var i = 0; i < maxLength; i++) {
            var grid1model = new Object() //자산, 부채 데이터 모델
            , grid2model = new Object(); //수익, 비용 데이터 모델
            
            //각각의 모델에 데이터 셋팅
            if (data[0].children[i]) { //자산
                grid1model.debit_gycode = data[0].children[i].gycode;
                grid1model.debit_balance_am = data[0].children[i].balance_am;
            }
            
            if (data[1].children[i]) { //부채
                grid1model.credit_gycode = data[1].children[i].gycode;
                grid1model.credit_balance_am = data[1].children[i].balance_am;
            }
            
            if (data[2].children[i]) { //비용
                grid2model.debit_gycode = data[2].children[i].gycode;
                grid2model.debit_balance_am = data[2].children[i].balance_am;
            }
            
            if (data[3].children[i]) { //수익
                grid2model.credit_gycode = data[3].children[i].gycode;
                grid2model.credit_balance_am = data[3].children[i].balance_am;
            }
            
            //스토어에 데이터 셋팅
            store1.add(grid1model);
            store2.add(grid2model);
        }
        
        //자산, 부채 총계 모델 데이터 셋팅
        store1Sum.type = -1;
        store1Sum.debit_gycode = '자산총계';
        store1Sum.debit_balance_am = store1.sum('debit_balance_am');
        store1Sum.credit_gycode = '부채 및 자본총계';
        store1Sum.credit_balance_am = store1.sum('credit_balance_am');
        
        //수익, 비용 총계 모델 데이터 셋팅
        store2Sum.type = -1;
        store2Sum.debit_gycode = '수익총계';
        store2Sum.debit_balance_am = store2.sum('debit_balance_am');
        store2Sum.credit_gycode = '비용총계';
        store2Sum.credit_balance_am = store2.sum('credit_balance_am');
        
        //스토어에 총계 셋팅
        store1.add(store1Sum);
        store2.add(store2Sum);
        
        //차변, 대변 총계 셋팅
        sumDebit = Number(store1Sum.debit_balance_am) + Number(store2Sum.credit_balance_am);
        sumCredit = Number(store1Sum.credit_balance_am) + Number(store2Sum.debit_balance_am);
        Ext.getCmp('Menu31_SumDebit').setText('차변총계 : ' + Ext.util.Format.number(sumDebit, '0,000'));
        Ext.getCmp('Menu31_SumCredit').setText('대변총계 : ' + Ext.util.Format.number(sumCredit, '0,000'));
    }
});