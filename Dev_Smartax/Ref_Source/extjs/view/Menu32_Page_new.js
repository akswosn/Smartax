/*
 * @page 세금계산서합계표
 * @author 이교철
 * @history 2014.02.17 작성
 */

var gycode_Skey = -1; //49,50,51,52
var customer_SKey = -1;
var customer_StrKey = '';

Ext.define('Menu32_Page', { //클래스 정의
    extend: 'Ext.container.Container', //확장하려는 클래스 명시
    id: 'Menu32_Page',
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
                border: false,
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                cls: 'searchBar',
                items: [{ //조회조건 시작일(년도)
                    xtype: 'numberfield',
                    id: 'Menu32_From_Year',
                    cls: 'searchChild',
                    width: 120,
                    fieldLabel: '조회기간',
                    labelSeparator: '',
                    labelWidth: 50,
                    selectOnFocus: true
                },
                { //조회조건 시작일(월)
                    xtype: 'numberfield',
                    id: 'Menu32_From_Month',
                    cls: 'searchChild',
                    width: 50,
                    minValue : 1,
                    maxValue : 12,
                    selectOnFocus: true
                },
                { //조회조건 완료일(년도)
                    xtype: 'numberfield',
                    id: 'Menu32_To_Year',
                    cls: 'searchChild',
                    width: 80,
                    fieldLabel: '~',
                    labelSeparator: '',
                    labelWidth: 10,
                    selectOnFocus: true
                },
                { //조회조건 완료일(월)
                    xtype: 'numberfield',
                    id: 'Menu32_To_Month',
                    cls: 'searchChild',
                    width: 50,
                    minValue : 1,
                    maxValue : 12,
                    selectOnFocus: true,
                    listeners: {
                        change: function(field, newValue, oldValue, eOpts) {
                            var text;
                            
                            if (newValue > 0 && newValue <= 3) text = '1기예정';
                            if (newValue > 3 && newValue <= 6) text = '1기확정';
                            if (newValue > 6 && newValue <= 9) text = '2기예정';
                            if (newValue > 9 && newValue <= 12) text = '2기확정';
                            
                            Ext.getCmp('Menu32_Type_Text').setText(text);
                        }
                    }
                },
                { //완료일에 따라 텍스트 셋팅 (~3월: 1기예정, ~6월: 1기확정, ~9월: 2기예정, ~10월: 2기확정)
                    xtype: 'label',
                    id: 'Menu32_Type_Text',
                    text: '1기 예정',
                    style: {
                    	'padding': '0 5px 0 10px'
                    }
                },
                { //조회조건 (1.정기신고, 2.수정신고)
                    xtype: 'combobox',
                    id: 'Menu32_Type_Select',
                    cls:'searchChild',
                    queryMode: 'local',
                    valueField: 'value',
                    displayField: 'text',
                    editable: false,
                    selectOnFocus: true,
                    enableKeyEvents : true,
                    listeners: {
                        beforerender: me.onComboboxBeforeRender,
                        scope: me
                    }
                },
                {
                    xtype: 'button',
                    cls: 'searchChild',
                    text: '조회',
                    listeners: {
                        click: me.onRequestSumListButtonClick,
                        scope: me
                    }
                }]
            },
            {
                xtype: 'tabpanel',
                id: 'Menu32_Tab_Root',
                activeTab: 0,
                flex: 1,
                items: [{
                    xtype: 'panel',
                    itemId: 'type1',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    title: '매 출',
                    items: [{
	                        xtype: 'label',
	                        text: '매출 세금계산서 총합계',
	                        cls: 'grid-title',
	                        style: {'border-top': '0'}
	                    },
	                    {
	                        xtype: 'gridpanel',
	                        id: 'Menu32_Grid1',
	                        margin: '0',
	                        border: false,
	                        height: 44,
	                        scroll: false,
	                        loadMask: true,
	                        enableColumnMove: false,
	                        store: StoreInfo.Menu32_Grid1,
	                        columns: [{ //[ columnIndex: 1 ] 매출처수
	                            xtype: 'gridcolumn',
	                            dataIndex: 'custumer_cnt',
	                            text: '매출처수',
	                            style: {'text-align': 'center'}
	                        },
	                        { //[ columnIndex: 2 ] 매수
	                            xtype: 'gridcolumn',
	                            dataIndex: 'cnt',
	                            text: '매수',
	                            style: {'text-align': 'center'}
	                        },
	                        { //[ columnIndex: 3 ] 공급가액
	                            xtype: 'numbercolumn',
	                            dataIndex: 'atax_supply_price',
	                            text: '공급가액',
	                            style: {'text-align': 'center'},
	                            align: 'right',
	                            format: '0,000'
	                        },
	                        { //[ columnIndex: 4 ] 세액
	                            xtype: 'numbercolumn',
	                            dataIndex: 'atax_tax',
	                            text: '세액',
	                            style: {'text-align': 'center'},
	                            align: 'right',
	                            format: '0,000'
	                        }]
	                    },
	                    {
	                        xtype: 'label',
	                        text: '과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분',
	                        cls: 'grid-title'
	                    },
	                    {
	                        xtype: 'gridpanel',
	                        id: 'Menu32_Grid2',
	                        margin: '0',
	                        border: false,
	                        height: 44,
	                        scroll: false,
	                        loadMask: true,
	                        enableColumnMove: false,
	                        store: StoreInfo.Menu32_Grid2,
	                        columns: [{ //[ columnIndex: 1 ] 매출처수
	                            xtype: 'gridcolumn',
	                            dataIndex: 'custumer_cnt',
	                            text: '매출처수',
	                            style: {'text-align': 'center'}
	                        },
	                        { //[ columnIndex: 2 ] 매수
	                            xtype: 'gridcolumn',
	                            dataIndex: 'cnt',
	                            text: '매수',
	                            style: {'text-align': 'center'}
	                        },
	                        { //[ columnIndex: 3 ] 공급가액
	                            xtype: 'numbercolumn',
	                            dataIndex: 'atax_supply_price',
	                            text: '공급가액',
	                            style: {'text-align': 'center'},
	                            align: 'right',
	                            format: '0,000'
	                        },
	                        { //[ columnIndex: 4 ] 세액
	                            xtype: 'numbercolumn',
	                            dataIndex: 'atax_tax',
	                            text: '세액',
	                            style: {'text-align': 'center'},
	                            align: 'right',
	                            format: '0,000'
	                        }]
	                    },
	                    {
	                        xtype: 'label',
	                        text: '위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)',
	                        cls: 'grid-title'
	                    },
	                    {
	                        xtype: 'gridpanel',
	                        id: 'Menu32_Grid3',
	                        margin: '0',
	                        border: false,
	                        height: 44,
	                        scroll: false,
	                        loadMask: true,
	                        enableColumnMove: false,
	                        store: StoreInfo.Menu32_Grid3,
	                        columns: [{ //[ columnIndex: 1 ] 매출처수
	                            xtype: 'gridcolumn',
	                            dataIndex: 'custumer_cnt',
	                            text: '매출처수',
	                            style: {'text-align': 'center'}
	                        },
	                        { //[ columnIndex: 2 ] 매수
	                            xtype: 'gridcolumn',
	                            dataIndex: 'cnt',
	                            text: '매수',
	                            style: {'text-align': 'center'}
	                        },
	                        { //[ columnIndex: 3 ] 공급가액
	                            xtype: 'numbercolumn',
	                            dataIndex: 'atax_supply_price',
	                            text: '공급가액',
	                            style: {'text-align': 'center'},
	                            align: 'right',
	                            format: '0,000'
	                        },
	                        { //[ columnIndex: 4 ] 세액
	                            xtype: 'numbercolumn',
	                            dataIndex: 'atax_tax',
	                            text: '세액',
	                            style: {'text-align': 'center'},
	                            align: 'right',
	                            format: '0,000'
	                        }]
	                    },
                    {
                        xtype: 'tabpanel',
                        id: 'Menu32_Tab_Child1',
                        activeTab: 0,
                        bodyStyle: {
                            'border-left': '0',
                            'border-right': '0',
                            'border-bottom': '0'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            title: '과세기간 종료일 다음달 11일까지 (전자분)',
                            border: false,
                            items: [{ //세금계산서합계표 그리드
                                xtype: 'gridpanel',
                                id: 'Menu32_Grid4',
                                margin: '0',
                                border: false,
                                flex: 1,
                                autoScroll: true,
                                loadMask: true,
                                enableColumnMove: false,
                                store: StoreInfo.Menu32_Grid4,
                                columns: [{ //[ columnIndex: 1 ] 거래처코드
                                    xtype: 'gridcolumn',
                                    dataIndex: 'atax_customer_id',
                                    text: '거래처코드',
                                    style: {'text-align': 'center'},
                                    hidden: true
                                },
                                { //[ columnIndex: 2 ] 사업자등록번호
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_saup_no',
                                    text: '사업자등록번호',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 3 ] 거래처명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_nm',
                                    text: '거래처명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 4 ] 공급가액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_supply_price',
                                    text: '공급가액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 5 ] 세액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_tax',
                                    text: '세액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 6 ] 대표자성명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_daepyo',
                                    text: '대표자성명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 7 ] 업태
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_up',
                                    text: '업태',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 8 ] 종목
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_jong',
                                    text: '종목',
                                    style: {'text-align': 'center'}
                                }]
                            }]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            title: '과세기간 종료일 다음달 12일이후 (전자분), 그외',
                            border: false,
                            items: [{ //세금계산서합계표 그리드
                                xtype: 'gridpanel',
                                id: 'Menu32_Grid5',
                                margin: '0',
                                border: false,
                                flex: 1,
                                autoScroll: true,
                                loadMask: true,
                                enableColumnMove: false,
                                store: StoreInfo.Menu32_Grid5,
                                columns: [{ //[ columnIndex: 1 ] 거래처코드
                                    xtype: 'gridcolumn',
                                    dataIndex: 'atax_customer_id',
                                    text: '거래처코드',
                                    style: {'text-align': 'center'},
                                    hidden: true
                                },
                                { //[ columnIndex: 2 ] 사업자등록번호
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_saup_no',
                                    text: '사업자등록번호',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 3 ] 거래처명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_nm',
                                    text: '거래처명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 4 ] 공급가액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_supply_price',
                                    text: '공급가액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 5 ] 세액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_tax',
                                    text: '세액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 6 ] 대표자성명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_daepyo',
                                    text: '대표자성명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 7 ] 업태
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_up',
                                    text: '업태',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 8 ] 종목
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_jong',
                                    text: '종목',
                                    style: {'text-align': 'center'}
                                }]
                            }]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            title: '전체데이터',
                            border: false,
                            items: [{ //세금계산서합계표 그리드
                                xtype: 'gridpanel',
                                id: 'Menu32_Grid6',
                                margin: '0',
                                border: false,
                                flex: 1,
                                autoScroll: true,
                                loadMask: true,
                                enableColumnMove: false,
                                store: StoreInfo.Menu32_Grid6,
                                columns: [{ //[ columnIndex: 1 ] 거래처코드
                                    xtype: 'gridcolumn',
                                    dataIndex: 'atax_customer_id',
                                    text: '거래처코드',
                                    style: {'text-align': 'center'},
                                    hidden: true
                                },
                                { //[ columnIndex: 2 ] 사업자등록번호
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_saup_no',
                                    text: '사업자등록번호',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 3 ] 거래처명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_nm',
                                    text: '거래처명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 4 ] 공급가액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_supply_price',
                                    text: '공급가액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 5 ] 세액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_tax',
                                    text: '세액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 6 ] 대표자성명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_daepyo',
                                    text: '대표자성명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 7 ] 업태
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_up',
                                    text: '업태',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 8 ] 종목
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_jong',
                                    text: '종목',
                                    style: {'text-align': 'center'}
                                }]
                            }]
                        }]
                    }]
                },
                /*
                {
                    xtype: 'panel',
                    itemId: 'type2',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    title: '매 입',
                    items: [
								{
									title : '합계',
									//xtype: 'container',
									xtype: 'panel',
									//autoScroll: true,
									overflowY: 'scroll',
								    id:'Menu32_Sub_content',
								    layout:{
								    	 layout: 'fit'
								    },
								    flex:1
								}
                            ]
                	},
                	*/
                    {
                        xtype: 'tabpanel',
                        id: 'Menu32_Tab_Child2',
                        activeTab: 0,
                        bodyStyle: {
                            'border-left': '0',
                            'border-right': '0',
                            'border-bottom': '0'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            title: '과세기간 종료일 다음달 11일까지 (전자분)',
                            border: false,
                            items: [{ //세금계산서합계표 그리드
                                xtype: 'gridpanel',
                                id: 'Menu32_Grid10',
                                margin: '0',
                                border: false,
                                flex: 1,
                                autoScroll: true,
                                loadMask: true,
                                enableColumnMove: false,
                                store: StoreInfo.Menu32_Grid10,
                                columns: [{ //[ columnIndex: 1 ] 거래처코드
                                    xtype: 'gridcolumn',
                                    dataIndex: 'atax_customer_id',
                                    text: '거래처코드',
                                    style: {'text-align': 'center'},
                                    hidden: true
                                },
                                { //[ columnIndex: 2 ] 사업자등록번호
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_saup_no',
                                    text: '사업자등록번호',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 3 ] 거래처명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_nm',
                                    text: '거래처명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 4 ] 공급가액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_supply_price',
                                    text: '공급가액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 5 ] 세액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_tax',
                                    text: '세액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 6 ] 대표자성명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_daepyo',
                                    text: '대표자성명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 7 ] 업태
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_up',
                                    text: '업태',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 8 ] 종목
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_jong',
                                    text: '종목',
                                    style: {'text-align': 'center'}
                                }]
                            }]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            title: '과세기간 종료일 다음달 12일이후 (전자분), 그외',
                            border: false,
                            items: [{ //세금계산서합계표 그리드
                                xtype: 'gridpanel',
                                id: 'Menu32_Grid11',
                                margin: '0',
                                border: false,
                                flex: 1,
                                autoScroll: true,
                                loadMask: true,
                                enableColumnMove: false,
                                store: StoreInfo.Menu32_Grid11,
                                columns: [{ //[ columnIndex: 1 ] 거래처코드
                                    xtype: 'gridcolumn',
                                    dataIndex: 'atax_customer_id',
                                    text: '거래처코드',
                                    style: {'text-align': 'center'},
                                    hidden: true
                                },
                                { //[ columnIndex: 2 ] 사업자등록번호
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_saup_no',
                                    text: '사업자등록번호',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 3 ] 거래처명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_nm',
                                    text: '거래처명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 4 ] 공급가액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_supply_price',
                                    text: '공급가액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 5 ] 세액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_tax',
                                    text: '세액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 6 ] 대표자성명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_daepyo',
                                    text: '대표자성명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 7 ] 업태
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_up',
                                    text: '업태',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 8 ] 종목
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_jong',
                                    text: '종목',
                                    style: {'text-align': 'center'}
                                }]
                            }]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            title: '전체데이터',
                            border: false,
                            items: [{ //세금계산서합계표 그리드
                                xtype: 'gridpanel',
                                id: 'Menu32_Grid12',
                                margin: '0',
                                border: false,
                                flex: 1,
                                autoScroll: true,
                                loadMask: true,
                                enableColumnMove: false,
                                store: StoreInfo.Menu32_Grid12,
                                columns: [{ //[ columnIndex: 1 ] 거래처코드
                                    xtype: 'gridcolumn',
                                    dataIndex: 'atax_customer_id',
                                    text: '거래처코드',
                                    style: {'text-align': 'center'},
                                    hidden: true
                                },
                                { //[ columnIndex: 2 ] 사업자등록번호
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_saup_no',
                                    text: '사업자등록번호',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 3 ] 거래처명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_nm',
                                    text: '거래처명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 4 ] 공급가액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_supply_price',
                                    text: '공급가액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 5 ] 세액
                                    xtype: 'numbercolumn',
                                    dataIndex: 'atax_tax',
                                    text: '세액',
                                    style: {'text-align': 'center'},
                                    align: 'right',
                                    format: '0,000'
                                },
                                { //[ columnIndex: 6 ] 대표자성명
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_daepyo',
                                    text: '대표자성명',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 7 ] 업태
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_up',
                                    text: '업태',
                                    style: {'text-align': 'center'}
                                },
                                { //[ columnIndex: 8 ] 종목
                                    xtype: 'gridcolumn',
                                    dataIndex: 'tr_jong',
                                    text: '종목',
                                    style: {'text-align': 'center'}
                                }]
                            }]
                        }]
                }],
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
						                    xtype: 'button',
						                    text: '매출처별 세금계산서 합계표(갑) 인쇄',
						                    handler: function() {
						                    	Global.temp =  me.generateSumPrintData();
						                    	window.open("./extjs/print/add_tax/print_out_add_tax_sum1.html", "", "width=955, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
						                    }
						                },
								]
			     }],
                listeners: {
                    tabchange: {
                        fn: me.onTabpanelTabChange,
                        scope: me
                    }
                }
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
    
    //화면 렌더링 될때 초기값 셋팅
    onContainerAfterRender: function(component, eOpts) {
        //현재 날짜 기준으로 조회년월 셋팅
        var now = new Date();
        Ext.getCmp('Menu32_From_Year').setValue(now.getFullYear());
        Ext.getCmp('Menu32_From_Month').setValue(1);
        Ext.getCmp('Menu32_To_Year').setValue(now.getFullYear());
        Ext.getCmp('Menu32_To_Month').setValue(1);
        
        
      //하단 표 로드  
	    this.sub_page = new Ext.Component({
			cls:'page',
		    layout: {
		        align: 'stretch',
		        type: 'vbox'
		    },
		    width: '100%',
		    height: '100%',
		    flex:1,
		    html:'<iframe id="Menu32_iframe" src="./extjs/sub_view/add_claim_form.html" style="width:100%;height:100%" frameborder=0 scrolling="no" />'
        });
        
        //콜백함수 세팅  
        Menu32_Req_Callback = this.onRequestClaimButtonClick;
    	Ext.getCmp('Menu32_Sub_content').add(this.sub_page); 
        
    	
        //조회조건 초기 셋팅
        this.param = new Object();
        this.param.from_atax_yyyymm = now.getFullYear() + Ext.String.leftPad(1, 2, '0');
        this.param.to_atax_yyyymm = now.getFullYear() + Ext.String.leftPad(1, 2, '0');
        this.param.type1 = '11';
        this.param.type2 = '';
        
        //스토어 셋팅
        this.store = new Array();
        this.store[0] = { //매출
            total : StoreInfo.Menu32_Grid1,
            sumY : StoreInfo.Menu32_Grid2,
            sumN : StoreInfo.Menu32_Grid3,
            dataY : StoreInfo.Menu32_Grid4,
            dataN : StoreInfo.Menu32_Grid5,
            dataAll : StoreInfo.Menu32_Grid6
        };
        this.store[1] = { //매입
            total : StoreInfo.Menu32_Grid7,
            sumY : StoreInfo.Menu32_Grid8,
            sumN : StoreInfo.Menu32_Grid9,
            dataY : StoreInfo.Menu32_Grid10,
            dataN : StoreInfo.Menu32_Grid11,
            dataAll : StoreInfo.Menu32_Grid12
        };
        
        this.temp = new Object();
        this.temp.type = 0;
        this.temp.current = this.down('tabpanel').getActiveTab();
        this.temp.current.isCall = true;
        
        this.onRequestSumListButtonClick();
    },
    
    onComboboxBeforeRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
                { value: '1', text: '1.정기신고' },
                { value: '2', text: '2.수정신고' }
            ]
        });
        component.store = store;
        component.setValue('1');
    },
    
    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        this.temp.current = newCard;
        
        if (newCard.itemId == 'type1') {
            this.temp.type = 0;
            this.param.type1 = '11';
            this.param.type2 = '';
        }
        
        if (newCard.itemId == 'type2') {
            this.temp.type = 1;
            this.param.type1 = '51';
            this.param.type2 = '54';
        }
        
        if (!newCard.isCall) {
            this.onRequestSumListButtonClick();
            newCard.isCall = true;
        }
    },
    
    onRequestSumListButtonClick: function(button, e, eOpts) {
        var me = this;
        this.param.from_atax_yyyymm = Ext.getCmp('Menu32_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu32_From_Month').getValue(), 2, '0');
        this.param.to_atax_yyyymm = Ext.getCmp('Menu32_To_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu32_To_Month').getValue(), 2, '0');
        
        Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_sum_list_proc.php',
            params: me.param,
            success: function(response, opts) {
            	console.log(response.responseText);
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') {
                    me.setData(json.DATA, me.temp.type);
                }
                
                if (json.CODE == '99') {
                    Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 데이터 오류');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 네트워크 오류');
            }
        });
    },
    
    setData: function(data, type) {
    	
    	
        for (key in this.store[type]) {
        	 if(this.store[type][key]&& this.store[type][key].removeAll)this.store[type][key].removeAll();
        }
        //데이터가 없을때
        if(!data.total || data.total.cnt == 0 )return;
        
        this.store[type].total.add(data.total);
        
        if (data.y) {
            this.store[type].sumY.add(data.y.sum);
            this.store[type].dataY.add(data.y.data);
            this.store[type].dataAll.add(data.y.data);
        }
        
        if (data.n) {
            this.store[type].sumN.add(data.n.sum);
            this.store[type].dataN.add(data.n.data);
            this.store[type].dataAll.add(data.n.data);
        }
    },
   
    generateSumPrintData: function() {
    	console.log('generateSumPrintData');
		return null;
    },
});