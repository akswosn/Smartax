/*
 * @page 세금계산서합계표
 * @author 이교철
 * @history 2014.02.17 작성
 */
var thisObj = null;

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
                items: [
                        { //조회조건 시작일(년도)
		                    xtype: 'numberfield',
		                    id: 'Menu32_From_Year',
		                    cls: 'searchChild',
		                    width: 120,
		                    fieldLabel: '조회기간 ',
		                    labelSeparator: '',
		                    labelWidth: 50,
		                    selectOnFocus: true
		                },
		                { //조회조건 (1.정기신고, 2.수정신고)
		                    xtype: 'combobox',
		                    id: 'Menu32_From_Month',
		                    cls:'searchChild',
		                    queryMode: 'local',
		                    valueField: 'value',
		                    displayField: 'text',
		                    width: 70,
		                    editable: false,
		                    selectOnFocus: true,
		                    enableKeyEvents : true,
		                    listeners: {
		                        beforerender: me.onComboboxBeforeRender0,
		                        scope: me
		                    }
		                },
		                { //조회조건 완료일(년도)
		                    xtype: 'numberfield',
		                    id: 'Menu32_To_Year',
		                    cls: 'searchChild',
		                    width: 10,
		                    fieldLabel: '~',
		                    labelSeparator: '',
		                    labelWidth: 10,
		                    selectOnFocus: true
		                },
		                { //조회조건 (1.정기신고, 2.수정신고)
		                    xtype: 'combobox',
		                    id: 'Menu32_To_Month',
		                    cls:'searchChild',
		                    queryMode: 'local',
		                    valueField: 'value',
		                    displayField: 'text',
		                    width: 70,
		                    editable: false,
		                    selectOnFocus: true,
		                    enableKeyEvents : true,
		                    listeners: {
		                        beforerender: me.onComboboxBeforeRender00,
		                        scope: me,
		                        change: function(field, newValue, oldValue, eOpts) {
		                            var text;
		                            if (newValue == 3) text = '1기예정';
		                            if (newValue == 6) text = '1기확정';
		                            if (newValue == 9) text = '2기예정';
		                            if (newValue == 12) text = '2기확정';
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
		                {
		                    xtype: 'button',
		                    cls: 'searchChild',
		                    text: '조회',
		                    listeners: {
		                        click: me.onRequestSumListButtonClick,
		                        scope: me
		                    }
		                },
		                ]
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
	                    items: [
						{
							title : '매 출 합 계',
							xtype: 'container',
							//xtype: 'panel',
							//autoScroll: true,
							//overflowY: 'scroll',
							height: 245,
						    id:'Menu32_Sub_content0',
						    layout:{
						    	 layout: 'vbox'
						    },
						   // flex:1
						},
	                            //
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
	                                    dataIndex: 'cnt',
	                                    text: '매수',
	                                    style: {'text-align': 'center'},
	                                    align: 'right',
	                                    format: '0'
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
	                                    dataIndex: 'cnt',
	                                    text: '매수',
	                                    style: {'text-align': 'center'},
	                                    align: 'right',
	                                    format: '0'
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
	                                    dataIndex: 'cnt',
	                                    text: '매수',
	                                    style: {'text-align': 'center'},
	                                    align: 'right',
	                                    format: '0'
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
							title : '매 입 합 계',
							xtype: 'container',
							//xtype: 'panel',
							//autoScroll: true,
							//overflowY: 'scroll',
							height: 245,
						    id:'Menu32_Sub_content1',
						    layout:{
						    	 layout: 'vbox'
						    },
						   // flex:1
						},
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
	                                    dataIndex: 'cnt',
	                                    text: '매수',
	                                    style: {'text-align': 'center'},
	                                    align: 'right',
	                                    format: '0'
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
	                                    dataIndex: 'cnt',
	                                    text: '매수',
	                                    style: {'text-align': 'center'},
	                                    align: 'right',
	                                    format: '0'
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
	                                    dataIndex: 'cnt',
	                                    text: '매수',
	                                    style: {'text-align': 'center'},
	                                    align: 'right',
	                                    format: '0'
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
							                    text: '매출처별 세금계산서 합계표 인쇄',
							                    id : 'Menu32_print_btn',
							                    handler: function() {
							                    	if(thisObj.temp.type == 0)
							                    	{
							                    		//매출처별 세금계산서 합계표
							                    		thisObj.onRequestBasicInfo(function(){
								                    		Global.temp = me.generateSalesSumPrintData();
								                    		console.log(Global.temp);
								                    		window.open("./extjs/print/add_tax/print_out_add_tax_sales_sum.html", "", "width=955, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
								                    	});
							                    	}
							                    	else
						                    		{
							                    		//매입처별 세금계산서 합계표
							                    		thisObj.onRequestBasicInfo(function(){
							                    			Global.temp = me.generatePurchaseSumPrintData();
								                    		console.log(Global.temp);
								                    		window.open("./extjs/print/add_tax/print_out_add_tax_purchase_sum.html", "", "width=955, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
								                    	});
						                    		}
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
    	
    	console.log('onContainerAfterRender');
    	Global.tmp_list = {};
    	thisObj = this;
    	
        //현재 날짜 기준으로 조회년월 셋팅
        var now = new Date();
        Ext.getCmp('Menu32_From_Year').setValue(now.getFullYear());
        //Ext.getCmp('Menu32_From_Month').setValue(1);
        //Ext.getCmp('Menu32_To_Year').setValue(now.getFullYear());
        //Ext.getCmp('Menu32_To_Month').setValue(1);
        
        //조회조건 초기 셋팅
        thisObj.param = new Object();
        thisObj.param.from_atax_yyyymm = now.getFullYear() + Ext.String.leftPad(Ext.getCmp('Menu32_From_Month').getValue(), 2, '0');
        thisObj.param.to_atax_yyyymm = now.getFullYear() + Ext.String.leftPad(Ext.getCmp('Menu32_To_Month').getValue(), 2, '0');
        thisObj.param.type1 = '11';
        thisObj.param.type2 = '';
        
        console.log(thisObj.param);
        
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
        
        thisObj.temp = new Object();
        thisObj.temp.type = 0;
        thisObj.temp.current = this.down('tabpanel').getActiveTab();
        thisObj.temp.current.isCall = true;
        
        //상단 표 로드  
	    this.sub_page0 = new Ext.Component({
			cls:'page',
		    layout: {
		        align: 'stretch',
		        type: 'vbox'
		    },
		    width: '100%',
		    height: '100%',
		    flex:1,
		    html:'<iframe id="Menu32_iframe0" src="./extjs/sub_view/add_tax_sales_sum.html" style="width:100%;height:100%" frameborder=0 scrolling="no" />'
        });
        
        //콜백함수 세팅  
        Menu32_Req_Callback0 = this.onRequestSumListButtonClick;
    	Ext.getCmp('Menu32_Sub_content0').add(this.sub_page0); 
    },
    
    
    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	console.log('onTabpanelTabChange');
    	thisObj.temp.current = newCard;
        
        if (newCard.itemId == 'type1') {
        	thisObj.temp.type = 0;
        	thisObj.param.type1 = '11';
        	thisObj.param.type2 = '';
        	
        	//하단 인쇄 타이틀 변경
        	Ext.getCmp('Menu32_print_btn').setText('매출처별 세금계산서 합계표 인쇄');
        }
        
        if (newCard.itemId == 'type2') {
        	thisObj.temp.type = 1;
        	thisObj.param.type1 = '51';
        	thisObj.param.type2 = '54';
        	
        	//하단 인쇄 타이틀 변경
        	Ext.getCmp('Menu32_print_btn').setText('매입처별 세금계산서 합계표 인쇄');
        }
        
        
        if (!newCard.isCall) {
        	
        	//상단 표 로드  
    	    this.sub_page1 = new Ext.Component({
    			cls:'page',
    		    layout: {
    		        align: 'stretch',
    		        type: 'vbox'
    		    },
    		    width: '100%',
    		    height: '100%',
    		    flex:1,
    		    html:'<iframe id="Menu32_iframe1" src="./extjs/sub_view/add_tax_income_sum.html" style="width:100%;height:100%" frameborder=0 scrolling="no" />'
            });
    	    Ext.getCmp('Menu32_Sub_content1').add(this.sub_page1); 
    	    
    	    Menu32_Req_Callback1 = this.onRequestSumListButtonClick;
            //this.onRequestSumListButtonClick();
            newCard.isCall = true;
        }
    },
    
    onRequestSumListButtonClick: function(button, e, eOpts) {
    	
    	console.log('onRequestSumListButtonClick');
        thisObj.param.from_atax_yyyymm = Ext.getCmp('Menu32_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu32_From_Month').getValue(), 2, '0');
        thisObj.param.to_atax_yyyymm = Ext.getCmp('Menu32_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu32_To_Month').getValue(), 2, '0');
        
        console.log(thisObj.param);
        
        Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_sum_list_proc.php',
            params: thisObj.param,
            success: function(response, opts) {
            	console.log(response.responseText);
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') {
                	thisObj.setData(json.DATA, thisObj.temp.type);
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
        	 if(this.store[type][key]&& this.store[type][key].removeAll) this.store[type][key].removeAll();
        }
        //데이터가 없을때
        if(!data.total || data.total.cnt == 0 ) return;
        
        this.store[type].total.add(data.total);
        console.log('#Menu32_iframe -> '+type);
        
        var ifr = $('#Menu32_iframe'+type).contents();
    	var sum_cnt = 0;
    	var sum_price = 0;
    	var sum_tax = 0;
    	var sum_customer = 0;
    	
        if (data.y) {
        	
        	console.log(data.y);
        	
    		ifr.find('#val1_1').text((data.y.sum.custumer_cnt) ? Ext.util.Format.number(data.y.sum.custumer_cnt, '0,000') : '0');
    		ifr.find('#val1_2').text((data.y.sum.cnt) ? Ext.util.Format.number(data.y.sum.cnt, '0,000') : '0');
    		ifr.find('#val1_3').text((data.y.sum.atax_supply_price) ? Ext.util.Format.number(data.y.sum.atax_supply_price, '0,000') : '0');
    		ifr.find('#val1_4').text((data.y.sum.atax_tax) ? Ext.util.Format.number(data.y.sum.atax_tax, '0,000') : '0');
    		
    		ifr.find('#val3_1').text((data.y.sum.custumer_cnt) ? Ext.util.Format.number(data.y.sum.custumer_cnt, '0,000') : '0');
    		ifr.find('#val3_2').text((data.y.sum.cnt) ? Ext.util.Format.number(data.y.sum.cnt, '0,000') : '0');
    		ifr.find('#val3_3').text((data.y.sum.atax_supply_price) ? Ext.util.Format.number(data.y.sum.atax_supply_price, '0,000') : '0');
    		ifr.find('#val3_4').text((data.y.sum.atax_tax) ? Ext.util.Format.number(data.y.sum.atax_tax, '0,000') : '0');
    		
    		sum_cnt += data.y.sum.cnt;
    		sum_price += data.y.sum.atax_supply_price;
    		sum_tax += data.y.sum.atax_tax;
    		sum_customer += data.y.sum.custumer_cnt;
        	
            this.store[type].sumY.add(data.y.sum);
            
            this.store[type].dataY.add(data.y.data);
            this.store[type].dataAll.add(data.y.data);
            
            //프린터 데이터 전역에 세팅
            Global.tmp_list[type] = data.y.data;
        }
        
        if (data.n) {
        	
        	console.log(data.n);
        	
    		ifr.find('#val4_1').text((data.n.sum.custumer_cnt) ? Ext.util.Format.number(data.n.sum.custumer_cnt, '0,000') : '0');
    		ifr.find('#val4_2').text((data.n.sum.cnt) ? Ext.util.Format.number(data.n.sum.cnt, '0,000') : '0');
    		ifr.find('#val4_3').text((data.n.sum.atax_supply_price) ? Ext.util.Format.number(data.n.sum.atax_supply_price, '0,000') : '0');
    		ifr.find('#val4_4').text((data.n.sum.atax_tax) ? Ext.util.Format.number(data.n.sum.atax_tax, '0,000') : '0');
    		
    		ifr.find('#val6_1').text((data.n.sum.custumer_cnt) ? Ext.util.Format.number(data.n.sum.custumer_cnt, '0,000') : '0');
    		ifr.find('#val6_2').text((data.n.sum.cnt) ? Ext.util.Format.number(data.n.sum.cnt, '0,000') : '0');
    		ifr.find('#val6_3').text((data.n.sum.atax_supply_price) ? Ext.util.Format.number(data.n.sum.atax_supply_price, '0,000') : '0');
    		ifr.find('#val6_4').text((data.n.sum.atax_tax) ? Ext.util.Format.number(data.n.sum.atax_tax, '0,000') : '0');
    		
    		sum_cnt += data.n.sum.cnt;
    		sum_price += data.n.sum.atax_supply_price;
    		sum_tax += data.n.sum.atax_tax;
    		sum_customer += data.n.sum.custumer_cnt;
            
            this.store[type].dataN.add(data.n.data);
            this.store[type].dataAll.add(data.n.data);
            
        }
        
        ifr.find('#sum1').text((sum_customer) ? Ext.util.Format.number(sum_customer, '0,000') : '0');
		ifr.find('#sum2').text((sum_cnt) ? Ext.util.Format.number(sum_cnt, '0,000') : '0');
		ifr.find('#sum3').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
		ifr.find('#sum4').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
        
		//
		Global.temp = data;
		
		var sum = {};
		sum.sum_customer = sum_customer;
		sum.sum_cnt = sum_cnt;
		sum.sum_price = sum_price;
		sum.sum_tax = sum_tax;
		
		Global.temp.sum = sum ;
		
		var info = {};
		
		//년
		info.yyyy = Ext.getCmp('Menu32_To_Year').getValue();
		
		//기
		if(Number(Ext.getCmp('Menu32_To_Month').getValue())<7) info.gi = 1;
		else info.gi = 2;
		
		//사업자등록번호
		info.co_num = '140-81-06261';
		
		//상호
		info.co_nm = '(주) 포근한세상';
		
		//대표자
		info.co_deapyo = '박흥서';
		
		//주소
		info.co_address = '충청북도 괴산군 청안면 칠보로 368-69';
		
		//거래기간 
		info.s_from_yyyy =  Ext.getCmp('Menu32_To_Year').getValue();
		info.s_from_mm = Ext.String.leftPad(Ext.getCmp('Menu32_From_Month').getValue(), 2, '0');
		info.s_from_dd = '01';
		
		info.s_to_yyyy =  Ext.getCmp('Menu32_To_Year').getValue();
		info.s_to_mm = Ext.String.leftPad(Ext.getCmp('Menu32_To_Month').getValue(), 2, '0');
		if(Ext.getCmp('Menu32_To_Month').getValue() == '6' || Ext.getCmp('Menu32_To_Month').getValue() == '9') info.s_to_dd = '30';
		else info.s_to_dd = '31';
		
		//작성일자
		var now = new Date();
		info.reg_yyyy =  now.getFullYear();
		info.reg_mm = now.getMonth() + 1;
		info.reg_dd = now.getDate();
		
		// -- 값 전역에 세팅
		Global.temp.info = info;
		
		var price = sum.sum_price+'';
		console.log(price);
		var idx = 0;
		var j = 1;
		for(var i=price.length;i>0;i-=3)
		{
			if((i-3)<0) idx =0;
			else idx = i-3;
			console.log(j+' --> '+price.substring(idx,i));
			j++;
		}
    },
    
    onComboboxBeforeRender0: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
                { value: '1', text: '01.01' },
                { value: '4', text: '04.01' },
                { value: '9', text: '09.01' },
            ]
        });
        component.store = store;
        component.setValue('1');
    },
    
    onComboboxBeforeRender00: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
						{ value: '3', text: '03.31' },
						{ value: '6', text: '06.30' },
						{ value: '9', text: '09.30' },
						{ value: '12', text: '12.31' },
				  ]
        });
        component.store = store;
        component.setValue('3');
    },
    
    //
    onRequestBasicInfo: function(callback) {
    	
    	Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/member/cur_company_data_proc.php',
            //params: param,
            success: function(response, opts) {
            	console.log(response.responseText);
            	//$('#Menu32_iframe').parent().css('overflow','auto');
            	
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') 
                {
                	json.co_up_code = Ext.String.leftPad(json.co_up_code, 6, '0');
                	Global.BasicInfo = json;
                	if(callback) callback();
                }
                
                if (json.CODE == '99') {
                    Ext.Msg.alert("알림", '기본정보 조회 오류');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("알림", '기본정보 조회 오류');
            }
        });
    },
    
    generateSalesSumPrintData: function() {
    	console.log('generateSalesSumPrintData');
    	var ret = {};
    	var page1 = {}, page2 = {};
    	var ifr = $('#Menu32_iframe0').contents();
    	
    	ret.page1 = page1;
    	ret.page2 = page2;
    	
    	/*
		"co_nm":"\uc0d8\ud50c\ud68c\uc0ac"
		,"co_ceo_nm":"\uc0d8\ud50c"
		,"co_saup_no":"123-456-7890"
		,"co_co_no":"123456-9999999"
		,"co_up":"\uc11c\ube44\uc2a4"
		,"co_up_code":"98765"
		,"co_jong":"\uc18c\ud504\ud2b8\uc6e8\uc5b4"
		,"co_zip":"435-060"
		,"co_addr":"\uacbd\uae30 \uad70\ud3ec\uc2dc \ub300\uc57c\ubbf8\ub3d9   643-3"
		,"co_tel":"010-2222-3333"
		,"co_tel_juso":"010-4444-5555"
		,"co_handphone":"010-6666-7777"
		,"co_email":"uclid@uclid.co.kr"
		,"co_fax":"--"
		,"co_tax_office":"\uc591\ucc9c"
		,"co_tax_office_code":"312"
		,"co_tax_office_acc":"000312"
		,"co_bank":"\uad6d\ubbfc"
		,"co_bank_branch":"\ubaa9\ub3d9"
		,"co_bank_acc":"444-555-666-777"
		Global.BasicInfo.co_tax_office
    	 */
    	
		// @@@@@@@ 매출처별 세금계산서합계표(갑)
		//page1 
    	page1.title = {};
    	
    	//년도
    	page1.title.yyyy = Ext.getCmp('Menu32_From_Year').getValue();
    	//기수
    	page1.title.gi = 1;
    	if(Ext.getCmp('Menu32_To_Month').getValue() == 9 ||Ext.getCmp('Menu32_To_Month').getValue() == 12) page1.title.gi = 2;
		
		//## 1. 상단 기본 정보표
		//# 사업자 등록번호, 상호, 성명, 사업장 소재지, 거래기간, 작성일
    	//top_info.co_nm
		//top_info.daepyo_nm
		//top_info.co_no
    	//top_info.address
    	//top_info.yyyy
    	//top_info.mm
    	//top_info.dd
    	//top_info.from_yyyy
		//top_info.from_mouth
		//top_info.from_day
    	//top_info.to_yyyy
		//top_info.to_mouth
		//top_info.to_day
    	
		page1.top_info = {};
		
		page1.top_info.co_nm = Global.BasicInfo.co_nm;		
		page1.top_info.daepyo_nm = Global.BasicInfo.co_ceo_nm;
		page1.top_info.co_no = Global.BasicInfo.co_saup_no;			//사업자 번호
		page1.top_info.co_addr = Global.BasicInfo.co_addr;
		
		var now = new Date();
		page1.top_info.yyyy = now.getFullYear();
		page1.top_info.mm = now.getMonth() + 1;
		page1.top_info.dd = now.getDate();
		
		page1.top_info.from_yyyy =  Ext.getCmp('Menu32_From_Year').getValue();
		page1.top_info.to_yyyy =  Ext.getCmp('Menu32_From_Year').getValue();
		
		var tmp0 = Ext.getCmp('Menu32_From_Month').getValue();
		var tmp1 = Ext.getCmp('Menu32_To_Month').getValue();
		
		page1.top_info.from_day = 1;
		
		if(tmp1 == 3 || tmp1 == 12) page1.top_info.to_day = 31;
		else page1.top_info.to_day = 30;
		
		page1.top_info.from_mouth = tmp0;
		page1.top_info.to_mouth = tmp1;
		
		
		//2. 매출세금계산서 총합계 
		page1.sum_data = {}; 
		for(var i=1; i<=4; i++)
		{
			page1.sum_data['sum'+i] = ifr.find('#sum'+i).text();
			page1.sum_data['val1_'+i] = ifr.find('#val1_'+i).text();
			page1.sum_data['val2_'+i] = ifr.find('#val2_'+i).text();
			page1.sum_data['val3_'+i] = ifr.find('#val3_'+i).text();
			page1.sum_data['val4_'+i] = ifr.find('#val4_'+i).text();
			page1.sum_data['val5_'+i] = ifr.find('#val5_'+i).text();
			page1.sum_data['val6_'+i] = ifr.find('#val6_'+i).text();
		}

		//3. 
		//리스트 값
		page2.tmp_list = Global.tmp_list[0];
		
		page2.num = 1;
		if(page2.tmp_list && page2.tmp_list.length>5)
		{
			//(을)서식 붙임 + 매수
			//년도
			page2.yyyy = Ext.getCmp('Menu32_From_Year').getValue();
	    	//기수
			page2.gi = 1;
	    	if(Ext.getCmp('Menu32_To_Month').getValue() == 9 ||Ext.getCmp('Menu32_To_Month').getValue() == 12) page1.title.gi = 2;
			
	    	//사업자등록번호
	    	page2.co_saup_no = Global.BasicInfo.co_saup_no;
	    	
	    	//페이지 갯수
	    	page2.num = Math.floor((page2.tmp_list.length-5)/15+1);
		}
		console.log(page2.num);
		
		console.log(JSON.stringify(ret));
		console.log(ret);
		
		return ret;
		
    },
    
    generatePurchaseSumPrintData: function() {
    	console.log('generatePurchaseSumPrintData');
    	var ret = {};
    	var page1 = {}, page2 = {};
    	var ifr = $('#Menu32_iframe1').contents();
    	
    	ret.page1 = page1;
    	ret.page2 = page2;
    	
    	/*
		"co_nm":"\uc0d8\ud50c\ud68c\uc0ac"
		,"co_ceo_nm":"\uc0d8\ud50c"
		,"co_saup_no":"123-456-7890"
		,"co_co_no":"123456-9999999"
		,"co_up":"\uc11c\ube44\uc2a4"
		,"co_up_code":"98765"
		,"co_jong":"\uc18c\ud504\ud2b8\uc6e8\uc5b4"
		,"co_zip":"435-060"
		,"co_addr":"\uacbd\uae30 \uad70\ud3ec\uc2dc \ub300\uc57c\ubbf8\ub3d9   643-3"
		,"co_tel":"010-2222-3333"
		,"co_tel_juso":"010-4444-5555"
		,"co_handphone":"010-6666-7777"
		,"co_email":"uclid@uclid.co.kr"
		,"co_fax":"--"
		,"co_tax_office":"\uc591\ucc9c"
		,"co_tax_office_code":"312"
		,"co_tax_office_acc":"000312"
		,"co_bank":"\uad6d\ubbfc"
		,"co_bank_branch":"\ubaa9\ub3d9"
		,"co_bank_acc":"444-555-666-777"
		Global.BasicInfo.co_tax_office
    	 */
    	
		// @@@@@@@ 매입처별 세금계산서합계표(갑)
		//page1 
    	page1.title = {};
    	
    	//년도
    	page1.title.yyyy = Ext.getCmp('Menu32_From_Year').getValue();
    	//기수
    	page1.title.gi = 1;
    	if(Ext.getCmp('Menu32_To_Month').getValue() == 9 ||Ext.getCmp('Menu32_To_Month').getValue() == 12) page1.title.gi = 2;
		
		//## 1. 상단 기본 정보표
		//# 사업자 등록번호, 상호, 성명, 사업장 소재지, 거래기간, 작성일
    	//top_info.co_nm
		//top_info.daepyo_nm
		//top_info.co_no
    	//top_info.address
    	//top_info.yyyy
    	//top_info.mm
    	//top_info.dd
    	//top_info.from_yyyy
		//top_info.from_mouth
		//top_info.from_day
    	//top_info.to_yyyy
		//top_info.to_mouth
		//top_info.to_day
    	
		page1.top_info = {};
		
		page1.top_info.co_nm = Global.BasicInfo.co_nm;		
		page1.top_info.daepyo_nm = Global.BasicInfo.co_ceo_nm;
		page1.top_info.co_no = Global.BasicInfo.co_saup_no;			//사업자 번호
		page1.top_info.address = Global.BasicInfo.co_addr;
		
		var now = new Date();
		page1.top_info.yyyy = now.getFullYear();
		page1.top_info.mm = now.getMonth() + 1;
		page1.top_info.dd = now.getDate();
		
		page1.top_info.from_yyyy =  Ext.getCmp('Menu32_From_Year').getValue();
		page1.top_info.to_yyyy =  Ext.getCmp('Menu32_From_Year').getValue();
		
		var tmp0 = Ext.getCmp('Menu32_From_Month').getValue();
		var tmp1 = Ext.getCmp('Menu32_To_Month').getValue();
		
		page1.top_info.from_day = 1;
		
		if(tmp1 == 3 || tmp1 == 12) page1.top_info.to_day = 31;
		else page1.top_info.to_day = 30;
		
		page1.top_info.from_mouth = tmp0;
		page1.top_info.to_mouth = tmp1;
		
		
		//2. 매출세금계산서 총합계 
		page1.sum_data = {}; 
		for(var i=1; i<=4; i++)
		{
			page1.sum_data['sum'+i] = ifr.find('#sum'+i).text();
			page1.sum_data['val1_'+i] = ifr.find('#val1_'+i).text();
			page1.sum_data['val2_'+i] = ifr.find('#val2_'+i).text();
			page1.sum_data['val3_'+i] = ifr.find('#val3_'+i).text();
			page1.sum_data['val4_'+i] = ifr.find('#val4_'+i).text();
			page1.sum_data['val5_'+i] = ifr.find('#val5_'+i).text();
			page1.sum_data['val6_'+i] = ifr.find('#val6_'+i).text();
		}
		
		//3. 
		//리스트 값
		page2.tmp_list = Global.tmp_list[0];
		
		page2.num = 1;
		if(page2.tmp_list && page2.tmp_list.length>5)
		{
			//(을)서식 붙임 + 매수
			//년도
			page2.yyyy = Ext.getCmp('Menu32_From_Year').getValue();
	    	//기수
			page2.gi = 1;
	    	if(Ext.getCmp('Menu32_To_Month').getValue() == 9 ||Ext.getCmp('Menu32_To_Month').getValue() == 12) page1.title.gi = 2;
			
	    	//사업자등록번호
	    	page2.co_saup_no = Global.BasicInfo.co_saup_no;
	    	
	    	//페이지 갯수
	    	page2.num = Math.floor((page2.tmp_list.length-5)/15+1);
		}
		console.log(page2.num);
		
		console.log(JSON.stringify(ret));
		console.log(ret);
		
		return ret;
    },
});