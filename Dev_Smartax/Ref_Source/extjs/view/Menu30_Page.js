/*
 * @page 부가세
 * @author 이교철
 * @history 2015.04.03 작성
 */
//console.log = function(){};

var gycode_Skey = -1; //49,50,51,52
var customer_SKey = -1;
var customer_StrKey = '';
var isToGrid2 = false;


Ext.define('Menu30_Page', { //클래스 정의
    extend: 'Ext.container.Container', //확장하려는 클래스 명시
    id: 'Menu30_Page',
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
                cls: 'searchBar',
                items: [{
                    xtype: 'numberfield',
                    id: 'Menu30_Year',
                    cls: 'searchChild',
                    width: 120,
                    fieldLabel: '거래일자',
                    labelSeparator: '',
                    labelWidth: 50,
                    selectOnFocus: true,
                    listeners: {
                        specialkey: {
                            fn: function(field, e, options) {
                                if(e.getKey()==13){
                                    me.onMenu30_Grid1SearchClick();
                                }
                            }
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    id: 'Menu30_Month',
                    cls: 'searchChild',
                    width: 50,
                    minValue : 1,
                    maxValue : 12,
                    selectOnFocus: true,
                    listeners: {
                        specialkey: {
                            fn: function(field, e, options) {
                                if(e.getKey()==13){
                                    me.onMenu30_Grid1SearchClick();
                                }
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    id: 'Menu30_Type',
                    cls:'searchChild',
                    store: StoreInfo.ADD_TAX_TYPE_SEAR,
                    queryMode: 'local',
                    valueField: 'atax_type',
                    displayField: 'atax_type_nm',
                    editable: false,
                    selectOnFocus: true,
                    enableKeyEvents : true,
                    fieldLabel: '과세유형',
                    labelWidth: 60,
                    labelAlign: 'right',
                    labelSeparator: '',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var showText = '';
                        if (value) {
                            var codeRecord = StoreInfo.ADD_TAX_TYPE_SEAR.findRecord('atax_type', value, null, null, null, true);
                            if(codeRecord) showText = codeRecord.get('atax_type_nm');
                        }
                        return showText;
                    },
                    editor: new Ext.create('Ext.form.ComboBox', {
                        store: StoreInfo.ADD_TAX_TYPE_SEAR,
                        selectOnFocus:true,
                        autoSelect: false,
                        queryMode: 'local',
                        displayField: 'atax_type_nm',
                        valueField: 'atax_type',
                        enableKeyEvents : true
                    })
                },
                {
                    xtype: 'button',
                    cls: 'searchChild',
                    text: '조회',
                    listeners: {
                        click: {
                            fn: me.onMenu30_Grid1SearchClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'label',
                    flex: 1
                },
                { //전표 사용여부
                    xtype: 'checkbox',
                    id: 'Menu30_isGrid2',
                    fieldLabel: '전표사용',
                    width: 76,
                    style: {
                        'border-radius': '2px',
                        'background': '#99BBE8'
                    },
                    labelAlign: 'right',
                    labelSeparator: '',
                    labelWidth: 54,
                    checked: true,
                    listeners: {
                        change: function(field, newValue, oldValue, eOpts) {
                            //체크값에 따라 전표그리드 표시, 숨김
                            var grid1AtaxJpId = Ext.getCmp('Menu30_Grid1_AtaxJpFlag');
                            var grid2Wrapper = Ext.getCmp('Menu30_Grid2_Wrap');
                            if (newValue) {
                                grid1AtaxJpId.show();
                                grid2Wrapper.show();
                            } else {
                                grid1AtaxJpId.hide();
                                grid2Wrapper.hide();
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    cls: 'searchChild',
                    text: '사용방법',
                    listeners: {
                        click: function() {
                            Ext.Msg.alert("알림", "준비중입니다.");
                        }
                    }
                }]
            },
            { //부가세 그리드
                xtype: 'gridpanel',
                id: 'Menu30_Grid1',
                margin: '5px 0 0 0',
                flex: 1,
                autoScroll: true,
                loadMask: true,
                enableColumnMove: false,
                store: StoreInfo.Menu30_Grid1,
                viewConfig: {
                    trackOver: false,
                    getRowClass: function(record, rowIndex, rowParams, store){
				    	var cls = "row-error";
			    		if(record.get("valid") == 11) cls = "row-valid";	
			    		else cls = "row-error";
				        return cls;
				    }
                },
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                    pruneRemoved: false,
                    checkOnly: true,
                    mode: 'MULTI'
                }),
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing',
                    {
                    	pluginId: 'cellplugin',
                        ptype: 'cellediting',
                        clicksToEdit: 1,
                        listeners: {
                            beforeedit: {
                                fn: me.onBeforeEditCheck,
                                scope: me
                            },
                            edit:{
                                fn: me.onAfterEditCheck,
                                scope: me
                            },
                            canceledit: function (editor, e, eOpts) {
                                Global.cellPos = {row: e.rowIdx, column: e.colIdx};
                            }
                        }
                    })
                ],
                listeners: {
                    cellclick :
                    {
                    	fn : function ( view, td, index, record, tr, rowIndex, e, eOpts )
                    	{
                    		//console.log('index - > '+index);
                    		//console.log('rowIndex - > '+rowIndex);
                    		
                    		 var date = Ext.getCmp('Menu30_Year').getValue() + '년 ';
                             date += record.get('atax_date_m') + '월 ';
                             date += record.get('atax_date_d') + '일';
                             
                             //전표 영역에 전표번호, 날짜 셋팅
                             Ext.getCmp('Menu30_Grid2_Info_JpNo').setText(record.get('atax_jp_no_view'));
                             Ext.getCmp('Menu30_Grid2_Info_Date').setText(date);
                             Ext.getCmp('Menu30_Grid2_Info_IDX').setText(rowIndex);
                             
                             console.log(me.DataMap[rowIndex]);
                             
                             if (me.DataMap[rowIndex] && me.DataMap[rowIndex].detail)
                             { //선택한 로우의 전표데이터가 데이터맵에 있을 경우
                                 //DataMap에서 데이터 가져온 후 전표 그리드 정보 셋팅
                            	 console.log('map');
                                 me.setMenu30_Grid2Data(rowIndex, record, 'map');
                             }
                             else
                             { //선택한 로우의 전표데이터가 테이터맵에 없을 경우
                                 //DB에서 데이터 가져온 후 전표 그리드 정보 셋팅
                            	 console.log('db');
                                 me.setMenu30_Grid2Data(rowIndex, record, 'db');
                             }
                             
                             //전표그리드에서 선택된 부가세 로우 식별을 위해 셋팅
                             me.rowIdx = rowIndex;
                    	}
                    }
                },
                columns: [{ //[ columnIndex: 1 ] 부가세 전표 아이디 (히든컬럼)
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_id',
                    hidden: true
                },
                { //[ columnIndex: 2 ] 회사 코드 (히든컬럼)
                    xtype: 'gridcolumn',
                    dataIndex: 'co_id',
                    hidden: true
                },
                { //[ columnIndex: 3 ] 월
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_date_m',
                    width: 43,
                    align: 'center',
                    text: '월',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        selectOnFocus: true,
                        minValue: 1,
                        maxValue: 12,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if (e.getKey()==13) {
                                        var value = field.getValue();
                                        var date = new Date;
                                        if(!value) field.setValue(date.getMonth()+1);
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    }
                },
                { //[ columnIndex: 4 ] 일
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_date_d',
                    width: 43,
                    align: 'center',
                    text: '일',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        selectOnFocus: true,
                        minValue: 1,
                        maxValue: 31,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        var value = field.getValue();
                                        var date = new Date;
                                        if(!value) field.setValue(date.getDate());
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    }
                },
                { //[ columnIndex: 5 ] 저장될 때 서버에서 생성. 에디트 안됨
                    xtype: 'gridcolumn',
                    //dataIndex: 'atax_jp_no',
                    dataIndex: 'atax_jp_no_view',
                    text: '전표번호',
                    width: 115,
                    style: {'text-align': 'center'},
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var showText = value;
                        if (value == 0) {
                        		showText = '';
                        }
                        return showText ;
                    },
                },
                { //[ columnIndex: 6 ] 과세유형 (ADD_TAX_TYPE 연동)
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_type',
                    sortable: false,
                    style: 'text-align:center',
                    text: '과세유형',
                    width: 155,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var showText = '';
                        if (value) {
                            var codeRecord = StoreInfo.ADD_TAX_TYPE.findRecord('atax_type', value, null, null, null, true);
                            if (codeRecord) {
                                //showText = codeRecord.get('atax_type_nm');
                            	showText = codeRecord.get('atax_type_name');
                            }
                        }
                        return showText ;
                    },
                    editor: new Ext.create('Ext.form.ComboBox', {
                        store: StoreInfo.ADD_TAX_TYPE,
                        autoSelect: false,
                        selectOnFocus:true,
                        queryMode: 'local',
                        //displayField: 'atax_type_nm',
                        displayField: 'atax_type_name',
                        valueField: 'atax_type',
                        enableKeyEvents : true,
                        listeners: {
                        	keydown: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==113){
                                    	var pop = Ext.create('Common_Pop_Atax_Type_Search');
                                    	var grid = Ext.getCmp('Menu30_Grid1'); 
                                    	grid.getPlugin().cancelEdit();
                                    	pop.grid = grid;
                                    	pop.record = grid.getSelectionModel().getSelection()[0];
                                    	Global.openPopup(pop);
                                    	return false;
                                    }
                                }
                            },
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    })
                },
                { //[ columnIndex: 7 ] 부가세 비율 (히든컬럼)
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_type_ratio',
                    hidden: true
                },
                { //[ columnIndex: 8 } 아이템 이름
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_item_nm',
                    text: '품목',
                    minWidth : 180,
                    flex: 1,
                    style: {'text-align': 'center'},
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus:true,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    }
                },
                { //[ columnIndex: 9 ] 아이템 수량
                    xtype: 'numbercolumn',
                    dataIndex: 'atax_item_cnt',
                    text: '수량',
                    width: 60,
                    style: {'text-align': 'center'},
                    align: 'right',
                    format: '0',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus:true,
                        enableKeyEvents : true,
                        listeners: {
                        	keyup: {
                                fn: function(field, e, options) {
                                	if(e.getKey() == 107)
                                	{
                                		console.log(field.getValue());
                                		var value = field.getValue();
                                		field.setValue(value.replace('+', '')+'000');
                                	}
                                }
                        	},
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    }
                },
                { //[ columnIndex: 10 ] 아이템 단가
                    xtype: 'numbercolumn',
                    dataIndex: 'atax_item_danga',
                    text: '단가',
                    width: 80,
                    style: {'text-align': 'center'},
                    align: 'right',
                    format: '0,000',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return (value) ? Ext.util.Format.number(value, '0,000') : '';
                    },
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus:true,
                        enableKeyEvents : true,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            },
                            keyup: {
                                fn: function(field, e, options) {
                                	if(e.getKey() == 107)
                                	{
                                		console.log(field.getValue());
                                		var value = field.getValue();
                                		field.setValue(value.replace('+', '')+'000');
                                	}
                                }
                        	},
                        }
                    }
                },
                { //[ columnIndex: 11 ] 수량, 단가 기준 합산
                    xtype: 'numbercolumn',
                    dataIndex: 'atax_supply_price',
                    text: '공급가액',
                    width: 90,
                    style: {'text-align': 'center'},
                    align: 'right',
                    format: '0,000',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return (value) ? Ext.util.Format.number(value, '0,000') : '';
                    },
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus:true,
                        enableKeyEvents : true,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            },
                            keyup: {
                                fn: function(field, e, options) {
                                	if(e.getKey() == 107)
                                	{
                                		console.log(field.getValue());
                                		var value = field.getValue();
                                		field.setValue(value.replace('+', '')+'000');
                                	}
                                }
                        	},
                        }
                    }
                },
                { //[ columnIndex: 12 ] 거래유형 타입 테이블 연동
                    xtype: 'numbercolumn',
                    dataIndex: 'atax_tax',
                    text: '부가세',
                    width: 80,
                    style: {'text-align': 'center'},
                    align: 'right',
                    format: '0,000',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return (value) ? Ext.util.Format.number(value, '0,000') : '0';
                    },
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus:true,
                        enableKeyEvents : true,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            },
                            keyup: {
                                fn: function(field, e, options) {
                                	if(e.getKey() == 107)
                                	{
                                		console.log(field.getValue());
                                		var value = field.getValue();
                                		field.setValue(value.replace('+', '')+'000');
                                	}
                                }
                        	},
                        }
                    }
                },
                { //[ columnIndex: 5 ] 저장될 때 서버에서 생성. 에디트 안됨
                    xtype: 'numbercolumn',
                    dataIndex: 'atax_item_sum',
                    text: '총액',
                    width: 90,
                    style: {'text-align': 'center'},
                    align: 'right',
                    format: '0,000'
                },
                /*
                { //[ columnIndex: 13 ] 공급가액, 부가세 기준 합산
                    xtype: 'numbercolumn',
                    dataIndex: 'atax_item_sum',
                    text: '총액',
                    width: 80,
                    style: {'text-align': 'center'},
                    align: 'right',
                    format: '0,000',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value ? Ext.util.Format.number(value, '0,000') : '';
                    },
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        selectOnFocus:false,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    }
                },
                */
                { //[ columnIndex: 14 ] 거래처
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_customer_id',
                    width: 120,
                    text: '거래처',
                    style: {'text-align': 'center'},
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var code = Ext.String.leftPad(value, 5, '0');
                        var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                        if(codeRecord) return code + " " + codeRecord.get('tr_nm');
                    },
                    editor: new Ext.create('Ext.form.ComboBox', {
                        store: StoreInfo.Menu09_Grid,
                        autoSelect: false,
                        selectOnFocus: true,
                        hideTrigger: true,
                        queryMode: 'local',
                        
                        triggerAction: 'all',
                        lastQuery: '',
                        
                        displayField: 'tr_nm',
                        valueField: 'customer_id',
                        enableKeyEvents : true,
                        listeners: {
                            keydown: {
                                fn: function(field, e, eOpts) {
                                    if(e.getKey()==113){
                                        var pop = Ext.create('Common_Pop_Trds_Search');
                                        var grid = Ext.getCmp('Menu30_Grid1');
                                        grid.getPlugin().cancelEdit();
                                        pop.grid = grid;
                                        pop.record = grid.getSelectionModel().getSelection()[0];
                                        pop.dataIndex = 'atax_customer_id';

                                        if(customer_SKey>47 && customer_SKey<58){
                                            pop.customer_SKey = customer_SKey - 48;
                                            pop.customer_StrKey = customer_StrKey;
                                        }
                                        else if(customer_SKey>95 && customer_SKey<106){
                                            pop.customer_SKey = customer_SKey - 96;
                                            pop.customer_StrKey = customer_StrKey;
                                        }
                                        else pop.customer_SKey = false;

                                        customer_SKey = -1;
                                        customer_StrKey = '';

                                        Global.openPopup(pop);
                                        return false;
                                    }
                                    else
                                    {
                                        customer_SKey = e.getKey();
                                        if(customer_SKey>47 && customer_SKey<58){
                                            customer_StrKey += (customer_SKey - 48);
                                        }

                                        if(customer_SKey>95 && customer_SKey<106){
                                            customer_StrKey += (customer_SKey - 96);
                                        }
                                    }
                                }
                            },
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        Global.isEnter = true;
                                    }
                                }
                            },
                            beforequery: {
                                fn: function ( queryPlan, eOpts ) {
                                	//한글자 라도 일치시 찾기
                                	queryPlan.query = new RegExp(queryPlan.query,'g');
                                }
                            },
                        }
                    })
                },
                { //[ columnIndex: 16 ] 전자세금계산서 발행여부 (Y, N)
                    xtype: 'gridcolumn',
                    dataIndex: 'atax_elect_flag',
                    width: 70,
                    text: '전자',
                    //style: {'text-align': 'center'},
                    align: 'center',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var showText = '';
                        if (value) {
                        	if(value == 1) value = 'y';
                        	else value = 'n';
                        	
                            var codeRecord = StoreInfo.ATAX_ELECT_FLAG.findRecord('atax_elect_flag', value, null, null, null, true);
                            if(codeRecord) showText = codeRecord.get('atax_elect_flag_nm');
                        }
                        return showText ;
                    },
                    editor: new Ext.create('Ext.form.ComboBox', {
                        store: StoreInfo.ATAX_ELECT_FLAG,
                        autoSelect: false,
                        selectOnFocus: true,
                        queryMode: 'local',
                        displayField: 'atax_elect_flag_nm',
                        valueField: 'atax_elect_flag',
                        enableKeyEvents : true,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            }
                        }
                    })
                },
                { //[ columnIndex: 15 ] 전표 유형 (0: 없음, 1: 현금, 2: 외상, 3: 카드,  4: 예금, 5: 기타)
                    xtype: 'gridcolumn',
                    id: 'Menu30_Grid1_AtaxJpFlag',
                    dataIndex: 'atax_jp_flag',
                    width: 70,
                    text: '분개',
                    align: 'center',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var showText = '';
                        if (value) {
                            var codeRecord = StoreInfo.ADD_JP_TYPE.findRecord('atax_jp_flag', value, null, null, null, true);
                            //var codeRecord = StoreInfo.ADD_JP_TYPE.findRecord('atax_jp_key', new RegExp(value,'g'), null, null, null, null );
                        	//var codeRecord = StoreInfo.ADD_JP_TYPE.findRecord('atax_jp_key', '외상', null, null, null, true);
                            if(codeRecord) showText = codeRecord.get('atax_jp_nm');
                        }
                        return showText ;
                    },
                    editor: new Ext.create('Ext.form.ComboBox', {
                        id: 'Menu30_Grid1_AtaxJpFlag_Editor',
                        store: StoreInfo.ADD_JP_TYPE,
                        selectOnFocus:true,
                        autoSelect: false,
                        queryMode: 'local',
                        displayField: 'atax_jp_nm',
                        valueField: 'atax_jp_flag',
                        enableKeyEvents : true,
                        listeners: {
                            specialkey: {
                                fn: function(field, e, options) {
                                    if(e.getKey()==13){
                                        field.clearInvalid();
                                        Global.isEnter = true;
                                    }
                                }
                            },
                            keydown: {
                                fn: function(field, e, options) {
                                	console.log(e.getKey());
                                	if(e.getKey()!=13 
                                			&& ((e.getKey()>48 && e.getKey()<52) || (e.getKey()>96 && e.getKey()<101)))
                                	{
                                		isToGrid2 = true;
                                		console.log(isToGrid2);
                                	}
                                }
                            },
                            beforeselect: {
                                fn: function(combo,record,index,eOpts) {
                                }
                            },
                            /*
                            beforequery: {
                                fn: function ( queryPlan, eOpts ) {
                                	//한글자 라도 일치시 찾기
                                	queryPlan.query = new RegExp(queryPlan.query,'g');
                                }
                            },
                            */
                        }
                    })
                },
               ],
                dockedItems: [{
                    xtype: 'toolbar',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    dock: 'bottom',
                    items: [{
                        xtype: 'button',
                        text: '저장',
                        listeners: {
                            click: me.onMenu30_Grid1SaveClick,
                            scope: me
                        }
                    },
                    {
                        xtype: 'button',
                        text: '삭제',
                        listeners: {
                            click: me.onMenu30_Grid1DeleteClick,
                            scope: me
                        }
                    },
                    {
                        xtype: 'button',
                        text: '세금계산서 현재라인 인쇄',
                        handler : function(){
                            var record = Ext.getCmp('Menu30_Grid1').getSelectionModel().getSelection();

                            if (record.length > 1) {
                                Ext.Msg.alert("알림", "인쇄할 라인을 하나만 선택해주세요");
                            }
                            else if (record.length < 1) {
                                Ext.Msg.alert("알림", "인쇄할 라인을 선택해주세요");
                            }
                            else {
                                Global.temp = {record: record[0]};
                                //과세구분(면세 or 과세)에 따라 분기
                                switch (record[0].get('atax_type')) {
                                    case '11': //과세매출
                                    case '17': //카드과세매출
                                    case '22': //현금영수증과세매출
                                    case '51': //과세매입
                                    case '57': //카드과세매입
                                    window.open("./extjs/print/print_output_Menu30_1_atax.html", "", "width=700, height=960, toolbar=no, menubar=no, scrollbars=yes, location=no" );
                                    break;
                                    case '12': //영세율매출
                                    case '13': //면세매출
                                    case '18': //카드면세매출
                                    case '19': //카드영세매출
                                    case '23': //현금면세매출
                                    case '24': //현금영세매출
                                    case '52': //영세매입
                                    case '53': //면세매입
                                    case '58': //카드면세매입
                                    case '59': //카드영세매입
                                    window.open("./extjs/print/print_output_Menu30_1_free.html", "", "width=700, height=960, toolbar=no, menubar=no, scrollbars=yes, location=no" );
                                    break;
                                    default:
                                }
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        text: '전표 현재라인 인쇄',
                        handler: function() {
                            var record = Ext.getCmp('Menu30_Grid1').getSelectionModel().getSelection();

                            if (record.length > 1) {
                                Ext.Msg.alert("알림", "인쇄할 라인을 하나만 선택해주세요");
                            }
                            else if (record.length < 1) {
                                Ext.Msg.alert("알림", "인쇄할 라인을 선택해주세요");
                            }
                            else {
                                Global.temp = {record: StoreInfo.Menu30_Grid2};
                                window.open("./extjs/print/print_output_Menu30_2.html", "", "width=700, height=430, toolbar=no, menubar=no, scrollbars=yes, location=no" );
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Excel',
                        listeners: {
                            click: function() {
                                Ext.Msg.alert("알림", "준비중입니다.");
                            }
                        }
                    }]
                }]
            },
            {
                xtype: 'container',
                id: 'Menu30_Grid2_Wrap',
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                height: 225,
                items: [{ //전표 정보
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'start'
                    },
                    margin: '5px 0 0 0',
                    padding: '5px',
                    style: {
                        'border-radius': '3px',
                        'background': '#99BBE8'
                    },
                    items: [{
                        xtype: 'label',
                        width: 60,
                        text: '전표번호 :',
                        style: {'text-align': 'right'}
                    },
                    {
                        xtype: 'label',
                        id: 'Menu30_Grid2_Info_JpNo',
                        width: 150,
                        style: {'margin-left': '5px'}
                    },
                    {
                        xtype: 'label',
                        flex: 1,
                        text: '( 대체 ) 전 표',
                        style: {
                            'text-align': 'center',
                            'font-weight': 'bold'
                        }
                    },
                    {
                        xtype: 'label',
                        width: 50,
                        text: '일자 :',
                        style: {'text-align': 'right'}
                    },
                    {
                        xtype: 'label',
                        width: 100,
                        id: 'Menu30_Grid2_Info_Date',
                        style: {'margin-left': '5px'}
                    },
                    {
                        xtype: 'label',
                        width: 100,
                        id: 'Menu30_Grid2_Info_IDX',
                        hidden : true
                    }]
                },
                { //전표 그리드
                    xtype: 'gridpanel',
                    id: 'Menu30_Grid2',
                    margin: '5px 0 0 0',
                    flex: 1,
                    autoScroll: true,
                    loadMask: true,
                    enableColumnMove: false,
                    store: StoreInfo.Menu30_Grid2,
                    viewConfig: {
                        trackOver: false,
					    getRowClass: function(record, rowIndex, rowParams, store){
					    	var cls = "row-error";
					    	var groupId = record.get('jp_group');
				    		if(groupId)
				    		{
				    			var index = Global.groupIdArr.indexOf(groupId);
				    			if(index < 0)
				    			{
				    				Global.groupIdArr.push(groupId);
				    				index = Global.groupIdArr.indexOf(groupId);
				    			}
				    			if(record.get("valid") == 11) cls = "row-group-valid-"+(index%6);
				    			else cls = "row-group-error-"+(index%6);
				    		}
				    		else
				    		{
				    			if(record.get("valid") == 11) cls = "row-valid";	
				    			else cls = "row-error";
				    		}
					        return cls;
					    }
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        pruneRemoved: false,
                        checkOnly: true,
                        mode: 'MULTI'
                    }),
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing',
                        {
                        	pluginId: 'cellplugin',
                            ptype: 'cellediting',
                            clicksToEdit: 1,
                            listeners: {
                                edit:{
                                    fn: me.onAfterEditCheckGrid2,
                                    scope: me
                                },
                                beforeedit: {
                                    fn: me.onBeforeEditCheckGrid2,
                                    scope: me
                                },
                                canceledit: function (editor, e, eOpts) {
                                    Global.cellPos = {row: e.rowIdx, column: e.colIdx};
                                }
                            }
                        })
                    ],
                    columns: [{
                        xtype: 'gridcolumn',
                        dataIndex: 'jp_view_gubun',
                        width: 100,
                        style: 'text-align:center',
                        text: '거래구분',
                        sortable: false,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var showText = '';
                            if (value) {
                                var codeRecord = StoreInfo.JP_KBN_ATAX.findRecord('CODE', value, null, null, null, true);
                                if(codeRecord) showText = codeRecord.get('TEXT');
                            }
                            return showText ;
                        },
                        editor: new Ext.create('Ext.form.ComboBox', {
                            store: StoreInfo.JP_KBN_ATAX,
                            selectOnFocus:true,
                            autoSelect: false,
                            minChars: 1,
                            queryMode: 'local',
                            displayField: 'TEXT',
                            valueField: 'CODE',
                            enableKeyEvents : true,
                            listeners: {
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        })
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'jakmok_code',
                        sortable: false,
                        style: 'text-align:center',
                        text: '사업부',
                        hidden  : true,
                        width: 100,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var showText = value;
                            if(value)
                            {
                                var code = Ext.String.leftPad(value, 2, '0');
                                var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', code, null, null, null, true);
                                if(codeRecord) showText = code+" "+codeRecord.get('jakmok_name');
                            }
                            return showText ;
                        },
                        editor: new Ext.create('Ext.form.ComboBox', {
                            store: StoreInfo.Menu10_Grid,
                            autoSelect: false,
                            minChars: 1,
                            selectOnFocus: true,
                            hideTrigger: true,
                            queryMode: 'local',
                            displayField: 'jakmok_name',
                            valueField: 'jakmok_code',
                            enableKeyEvents : true,
                            listeners: {
                                focus: {
                                    fn: function(field, e, options) {
                                        field.lastSelection = [];
                                    }
                                },
                                keydown: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==113){
                                            var pop = Ext.create('Common_Pop_Jakmok');
                                            var grid = Ext.getCmp('Menu30_Grid2');
                                            grid.getPlugin().cancelEdit();
                                            pop.grid = grid;
                                            pop.record = grid.getSelectionModel().getSelection()[0];
                                            Global.openPopup(pop);
                                            return false;
                                        }
                                    }
                                },
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            field.clearInvalid();
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        })
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'gycode',
                        width: 120,
                        style: 'text-align:center',
                        text: '계정과목',
                        sortable: false,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var showText = value;
                            if (value) {
                                var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
                                if(codeRecord) showText += " "+codeRecord.get('gy_name');
                            }
                            if (value == '0') showText = '000';
                            return showText;
                        },
                        editor: new Ext.create('Ext.form.ComboBox', {
                            store: StoreInfo.Menu08_Grid,
                            autoSelect: false,
                            minChars: 1,
                            selectOnFocus: true,
                            hideTrigger: true,
                            queryMode: 'local',
                            displayField: 'gy_name',
                            valueField: 'gycode',
                            enableKeyEvents : true,
                            listeners: {
                                keydown: {
                                    fn: function(field, e, options) {
                                        if (e.getKey() == 113) {
                                            var pop = Ext.create('Common_Pop_Accounts_Search');
                                            var grid = Ext.getCmp('Menu30_Grid2');
                                            grid.getPlugin().cancelEdit();
                                            pop.grid = grid;
                                            pop.record = grid.getSelectionModel().getSelection()[0];
                                            switch(gycode_Skey)
                                            {
                                                case 49 : pop.gy_group = 1; break;
                                                case 50 : pop.gy_group = 2; break;
                                                case 51 : pop.gy_group = 3; break;
                                                case 52 : pop.gy_group = 4; break;
                                                default : pop.gy_group = false; break;
                                            }
                                            gycode_Skey = -1;
                                            Global.openPopup(pop);
                                            return false;
                                        }
                                        else
                                        {
                                            gycode_Skey = e.getKey();
                                        }
                                    }
                                },
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            Global.isEnter = true;
                                            gycode_Skey = -1;
                                        }
                                    }
                                }
                            }
                        })
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'credit',
                        width: 120,
                        align: 'right',
                        style: {'text-align': 'center'},
                        text: '대변(입금)',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            return (value) ? Ext.util.Format.number(value, '0,000') : '';
                        },
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false,
                            selectOnFocus:true,
                            listeners: {
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            field.clearInvalid();
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'debit',
                        width: 120,
                        align: 'right',
                        style: {'text-align': 'center'},
                        text: '차변(출금)',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            return (value) ? Ext.util.Format.number(value, '0,000') : '';
                        },
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false,
                            selectOnFocus:true,
                            listeners: {
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            field.clearInvalid();
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'customer_id',
                        width: 120,
                        style: {'text-align': 'center'},
                        text: '거래처',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var code = Ext.String.leftPad(value, 5, '0');
                            var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                            if(codeRecord) return code + " " + codeRecord.get('tr_nm');
                        },
                        editor: new Ext.create('Ext.form.ComboBox', {
                            store: StoreInfo.Menu09_Grid,
                            autoSelect: false,
                            selectOnFocus: true,
                            hideTrigger: true,
                            queryMode: 'local',
                            displayField: 'tr_nm',
                            valueField: 'customer_id',
                            enableKeyEvents : true,
                            listeners: {
                                keydown: {
                                    fn: function(field, e, eOpts) {
                                        if(e.getKey()==113){
                                            var pop = Ext.create('Common_Pop_Trds_Search');
                                            var grid = Ext.getCmp('Menu30_Grid1');
                                            grid.getPlugin().cancelEdit();
                                            pop.grid = grid;
                                            pop.record = grid.getSelectionModel().getSelection()[0];
                                            pop.dataIndex = 'customer_id';

                                            if(customer_SKey>47 && customer_SKey<58){
                                                pop.customer_SKey = customer_SKey - 48;
                                                pop.customer_StrKey = customer_StrKey;
                                            }
                                            else if(customer_SKey>95 && customer_SKey<106){
                                                pop.customer_SKey = customer_SKey - 96;
                                                pop.customer_StrKey = customer_StrKey;
                                            }
                                            else pop.customer_SKey = false;

                                            customer_SKey = -1;
                                            customer_StrKey = '';

                                            Global.openPopup(pop);
                                            return false;
                                        }
                                        else
                                        {
                                            customer_SKey = e.getKey();
                                            if(customer_SKey>47 && customer_SKey<58){
                                                customer_StrKey += (customer_SKey - 48);
                                            }

                                            if(customer_SKey>95 && customer_SKey<106){
                                                customer_StrKey += (customer_SKey - 96);
                                            }
                                        }
                                    }
                                },
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        })
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'jp_rem',
                        style: {'text-align': 'center'},
                        text: '적요',
                        flex: 1,
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false,
                            selectOnFocus:true,
                            listeners: {
                                specialkey: {
                                    fn: function(field, e, options) {
                                        if(e.getKey()==13){
                                            field.clearInvalid();
                                            Global.isEnter = true;
                                        }
                                    }
                                }
                            }
                        }
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        layout: {
                            type: 'hbox',
                            //align: 'end',
                            pack: 'start'
                        },
                        dock: 'bottom',
                        items: [
						{
						    xtype: 'container',
						    flex: 1,
						    maxWidth: 400,
						    minWidth: 400,
						    margin: '0 50px 0 0',
						    layout: {
						        type: 'hbox',
						        pack: 'start',
						        align: 'stretch'
						    },
						    items: [{
						        xtype: 'textfield', 
						        id: 'sum_credit',
						        fieldLabel: '대변합계',
						        flex: 1,
						        labelAlign:'right',
						        readOnly: true,
						        labelSeparator: '',
						        labelWidth: 50,
						        cls:'bottomChild'
						    },
						    {
						        xtype: 'textfield', 
						        id: 'sum_debit',
						        fieldLabel: '차변합계',
						        flex: 1,
						        labelAlign:'right',
						        readOnly: true,
						        labelSeparator: '',
						        labelWidth: 50,
						        cls:'bottomChild'
						    }]
						},        
                        {
                            xtype: 'label',
                            id: 'Menu30_Grid2_HelpText',
                            flex: 1,
                            style: {'color': 'red'}
                        },
                        {
                            xtype: 'button',
                            id: 'Menu30Grid2_btnDel',
                            text: '전표 라인 삭제',
                            listeners: {
                            	click: {
	                                fn: me.onDeletBtn_Click,
	                                scope: me
	                            }
                            }
                        },
                        {
                            xtype: 'button',
                            text: '조회전표 모두 인쇄',
                            listeners: {
                                click: function() {
                                    Ext.Msg.alert("알림", "준비중입니다.");
                                }
                            }
                        }]
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

    //부가세 화면 렌더링 될때 초기값 셋팅
    onContainerAfterRender: function() {
        //현재 날짜 기준으로 조회 초기값(년도, 월) 셋팅
        var now = new Date();
        Ext.getCmp('Menu30_Year').setValue(now.getFullYear());
        Ext.getCmp('Menu30_Month').setValue(now.getMonth()+1);
        Ext.getCmp('Menu30_Type').setValue('');

        //데이터맵 초기 셋팅
        this.DataMap = new Object();

        //전표 벨리데이션 체크
        this.valid = true;

        //부가세 로우 인덱스
        this.rowIdx = null;

        //셋팅된 초기값으로 부가세 리스트 조회
        this.onMenu30_Grid1SearchClick();
    },

    //부가세 그리드 데이터 수정하기 전
    onBeforeEditCheck: function(editor, e, eOpts) {
    	//위에 값 복사 - 첫째줄은 예외
        if(e.rowIdx > 0)
        {
        	//저장된 값은 예외
        	if(!StoreInfo.Menu30_Grid1.getAt((e.rowIdx)).getData()['atax_id'])
        	{
        		var tmp = StoreInfo.Menu30_Grid1.getAt((e.rowIdx-1)).getData();
            	//console.log(tmp);
            	//console.log(StoreInfo.Menu30_Grid1.getAt((e.rowIdx)).getData());
            	
            	if(e.field != 'atax_item_cnt' && e.field != 'atax_item_danga' && e.field != 'atax_item_sum'
            		&& e.field != 'atax_supply_price' && e.field != 'atax_tax') 
            	{
            		e.record.set(e.field, tmp[e.field]);
            	}
        	}
        }
    },
    
    //부가세 그리드 데이터 수정하기 전
    onBeforeEditCheckGrid2 : function(editor, e, eOpts) {
    	/*
    	//상단 그리드에 해당 행 선택시키기
    	var grid1_idx = Ext.getCmp('Menu30_Grid2_Info_IDX').text;
    	console.log(grid1_idx);
    	var model = Ext.getCmp('Menu30_Grid1').getSelectionModel();
    	model.select(StoreInfo.Menu30_Grid1.getAt(grid1_idx));    	
    	*/
    	
    	//위에 값 복사 - 첫째줄은 예외
        if(e.rowIdx > 0)
        {
        	//저장된 값은 예외
        	if(!StoreInfo.Menu30_Grid2.getAt((e.rowIdx)).getData()['jp_id'])
        	{
        		var tmp = StoreInfo.Menu30_Grid2.getAt((e.rowIdx-1)).getData();
            	//console.log(tmp);
            	//console.log(StoreInfo.Menu30_Grid1.getAt((e.rowIdx)).getData());
            	if(e.field == 'jp_rem' || e.field == 'customer_id')  	e.record.set(e.field, tmp[e.field]);
            	
        	}
        }
        //console.log(e.field +'-->'+e.record.get('jp_gubun_type'));
        //구분타입이 입금(1) / 출금(2)일 경우 에디트를 못하게 막음		
		if(e.field == 'debit' && e.record.get('jp_gubun_type') == 1 )
		{
			if(Global.isEnter)
			{
				editor.startEditByPosition({row: e.rowIdx, column: e.colIdx-1});
				Global.isModified = true;
			}
			return false; 
		}
		else if(e.field == 'credit' && e.record.get('jp_gubun_type') == 2 )
		{
			if(Global.isEnter)
			{
				editor.startEditByPosition({row: e.rowIdx, column: e.colIdx+1});
				Global.isModified = true;
			}
			return false; 
		}	
    },

    //부가세 그리드 상세데이터 수정한 후
    onAfterEditCheck: function(editor, e, eOpts) {
        //다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
        var movePos = null
        //전표사용 여부에 따라 마지막 컬럼값 셋팅
        , lastIdx = Ext.getCmp('Menu30_Grid1_AtaxJpFlag').isHidden() ? 15 : 16;
        
        //부가세유형 변경시 데이터 셋팅
        if (e.field == 'atax_type') {
            this.setAtaxTypeData(e);
        }
        
        //날짜 변경시 yyyymmdd 값 수정
        if (e.field == 'atax_date_m' || e.field == 'atax_date_d' ) {
            e.record.set('atax_yyyymmdd', Ext.getCmp('Menu30_Year').getValue() + Ext.String.leftPad(e.record.get('atax_date_m'), 2, '0') + Ext.String.leftPad(e.record.get('atax_date_d'), 2, '0'));
        }

    	//수량, 단가 입력시 공급가액, 부가세, 총액 계산
        if (!StoreInfo.Menu30_Grid1.getAt((e.rowIdx)).getData()['atax_id'] && e.field == 'atax_item_danga') {
            e.record.set('atax_supply_price', e.record.get('atax_item_cnt') * e.record.get('atax_item_danga'));
            e.record.set('atax_tax', Math.floor(e.record.get('atax_supply_price') * e.record.get('atax_type_ratio') / 100));
            e.record.set('atax_item_sum', e.record.get('atax_supply_price') + e.record.get('atax_tax'));
        }

        //if(!StoreInfo.Menu30_Grid1.getAt((e.rowIdx)).getData()['atax_id']) 
        
        //공급가액 입력시 부가세, 총액 계산
        if (!StoreInfo.Menu30_Grid1.getAt((e.rowIdx)).getData()['atax_id'] && e.field == 'atax_supply_price') {
            e.record.set('atax_tax', Math.floor(e.record.get('atax_supply_price') * e.record.get('atax_type_ratio') / 100));
        }
        
        if (e.field == 'atax_supply_price') {
            e.record.set('atax_item_sum', e.record.get('atax_supply_price') + e.record.get('atax_tax'));
        }
        
        
        //부가세 입력시 총액 계산
        if (e.field == 'atax_tax') {
            //e.record.set('atax_tax', Math.floor(e.record.get('atax_supply_price') * e.record.get('atax_type_ratio') / 100));
            //e.record.set('atax_item_sum', e.record.get('atax_supply_price') + e.record.get('atax_tax'));
        	 e.record.set('atax_item_sum', e.record.get('atax_supply_price') + e.record.get('atax_tax'));
        }
        
        /*
        //총액 입력시 공급가액, 부가세 계산
        if (e.field == 'atax_item_sum') {
            e.record.set('atax_supply_price', Math.floor(e.value / (e.record.get('atax_type_ratio') + 100) * 100));
            e.record.set('atax_tax', Math.floor(e.record.get('atax_supply_price') * e.record.get('atax_type_ratio') / 100));
            e.record.set('atax_supply_price', e.value - e.record.get('atax_tax'));
        }
        */
        
        //부가세 그리드 변경된 값이 있을 경우
        //Object.keys() 메서드는 IE9이상만 지원함(추후수정)
        if (!!Object.keys(e.record.getChanges()).length) {
            //부가세 데이터를 데이터맵에 등록
        	
        	//기존 데이터 없으면
        	if(!this.DataMap[e.rowIdx])
        	{
        		this.DataMap[e.rowIdx] = new Object();
                this.DataMap[e.rowIdx].master = e.record.getData();
                
                //console.log(e.record.get('atax_jp_flag'));
                //분개 컬럼이 없음(0)이 아닌경우
                if (e.record.get('atax_jp_flag') != '0')
                {
                    //변경된 컬럼이 전표그리드 데이터에 영향을 주는 경우
                    if (e.record.isModified('atax_supply_price') || e.record.isModified('atax_tax') || e.record.isModified('atax_item_sum') || e.record.isModified('atax_customer_id') || e.record.isModified('atax_jp_flag'))
                    {
                        StoreInfo.Menu30_Grid2.removeAll();
                        
                        var date = Ext.getCmp('Menu30_Year').getValue() + '년 ';
                        date += e.record.get('atax_date_m') + '월 ';
                        date += e.record.get('atax_date_d') + '일';
                        
                        //전표 영역에 전표번호, 날짜 셋팅
                        Ext.getCmp('Menu30_Grid2_Info_JpNo').setText(e.record.get('atax_jp_no'));
                        Ext.getCmp('Menu30_Grid2_Info_Date').setText(date);
                        Ext.getCmp('Menu30_Grid2_Info_IDX').setText(e.rowIdx);

                        //데이터맵에 해당 로우의 데이터와 전표분개 그리드 데이터 추가
                        this.DataMap[e.rowIdx].detail = this.getGrid2Model(e.record);

                        //전표분개 그리드에 데이터 셋팅 + 추가줄 넣기(미완)
                        if(this.DataMap[e.rowIdx].detail) {
                        	StoreInfo.Menu30_Grid2.add(this.DataMap[e.rowIdx].detail);
                        	this.jpValidCheck();
                        }
                        else
                        {
                        	e.record.set('atax_jp_flag', 0);
                        }
                    }
                }
        	}
        	//기존 데이터 있으면
        	else
        	{
        		var old_atax_jp_flag = this.DataMap[e.rowIdx].master.atax_jp_flag;
        		
        		if (e.record.get('atax_jp_flag') == '0')
                {
        			console.log('remove1');
        			StoreInfo.Menu30_Grid2.removeAll();

        			this.DataMap[e.rowIdx].master = e.record.getData();
        			this.DataMap[e.rowIdx].detail = null;
                }
        		else if (e.record.get('atax_jp_flag') == old_atax_jp_flag)
        		{
        			/*
        			console.log('remove2');
        			StoreInfo.Menu30_Grid2.removeAll();
        			*/
        			this.DataMap[e.rowIdx].master = e.record.getData();
        			
        			/*
        			if(this.DataMap[e.rowIdx].detail) {
                     	StoreInfo.Menu30_Grid2.add(this.DataMap[e.rowIdx].detail);
                     	this.jpValidCheck();
                    }
                    */
        		}
        		else if (e.record.get('atax_jp_flag') != old_atax_jp_flag)
        		{
        			console.log('remove3');
                    StoreInfo.Menu30_Grid2.removeAll();
                    
                    var date = Ext.getCmp('Menu30_Year').getValue() + '년 ';
                    date += e.record.get('atax_date_m') + '월 ';
                    date += e.record.get('atax_date_d') + '일';
                    
                    //전표 영역에 전표번호, 날짜 셋팅
                    Ext.getCmp('Menu30_Grid2_Info_JpNo').setText(e.record.get('atax_jp_no'));
                    Ext.getCmp('Menu30_Grid2_Info_Date').setText(date);
                    Ext.getCmp('Menu30_Grid2_Info_IDX').setText(e.rowIdx);

                    //데이터맵에 해당 로우의 데이터와 전표분개 그리드 데이터 추가
                    this.DataMap[e.rowIdx].detail = this.getGrid2Model(e.record);

                    //전표분개 그리드에 데이터 셋팅 + 추가줄 넣기(미완)
                    if(this.DataMap[e.rowIdx].detail) {
                    	StoreInfo.Menu30_Grid2.add(this.DataMap[e.rowIdx].detail);
                    	this.jpValidCheck();
                    }
                    else
                    {
                    	e.record.set('atax_jp_flag', 0);
                    }
        		}
        	}
            
        }

        //필수값 체크
        this.setRequiredMsg(e);

        //공급가액 미입력시 이동 불가
    	if (Global.isEnter && e.field == 'atax_supply_price' && (e.record.get('atax_supply_price') == ''|| e.record.get('atax_supply_price') == 0))
    	{
    		movePos = {row: e.rowIdx, column: e.colIdx};
    		editor.startEditByPosition(movePos);
    		Global.isEnter = false;
            return false;
    	}
    	
    	//분개컬럼의 경우, [ 저장 안된 상태이고 + 분개 값이 0이 아니면 ] 하단분개창으로 커서 이동
    	if (Global.isEnter && e.field == 'atax_jp_flag')
    	{
    		if(isToGrid2)
    		{
    			var grid2 = Ext.getCmp('Menu30_Grid2');
    			var edit = grid2.getPlugin('cellplugin');
				edit.startEditByPosition({row: 0, column: 1});
				isToGrid2 = false;
				return true;
    		}
    	}
    	
        //다음 수정할 셀에 포커스 줌
        if (Global.isEnter) {
        	
        	
        	
    		//현재 컬럼이 마지막 컬럼일 경우
            if (e.grid.columns.length == e.colIdx) {
                //현재 로우가 마지막 로우인 경우
                if(e.grid.getStore().getCount() == (e.rowIdx+1)) {
                    //새 로우 추가
                    this.tempRowInit(e.grid.getStore());
                }
                ///////////////
                //하단 전표 그리드 삭제 
                var tmp_record = Ext.getCmp('Menu30_Grid1').getStore().getAt((e.rowIdx+1));
        		console.log(tmp_record);
        		
        		StoreInfo.Menu30_Grid2.removeAll();
        		
        		 var date = Ext.getCmp('Menu30_Year').getValue() + '년 ';
                 date += tmp_record.get('atax_date_m') + '월 ';
                 date += tmp_record.get('atax_date_d') + '일';
        		
        		 //전표 영역에 전표번호, 날짜 셋팅
                Ext.getCmp('Menu30_Grid2_Info_JpNo').setText(tmp_record.get('atax_jp_no_view'));
                Ext.getCmp('Menu30_Grid2_Info_Date').setText(date);
                Ext.getCmp('Menu30_Grid2_Info_IDX').setText(e.rowIdx+1);
                
        		if(this.DataMap[e.rowIdx+1])
        		{
        			//로컬
        			if (tmp_record.get('atax_jp_flag') != '0')
                    {
        				if(this.DataMap[e.rowIdx+1].detail) {
                         	StoreInfo.Menu30_Grid2.add(this.DataMap[e.rowIdx+1].detail);
                         	this.jpValidCheck();
                        }
        				else if( tmp_record.get('atax_id') != '')
        				{
        					this.setMenu30_Grid2Data(e.rowIdx+1, tmp_record, 'db');
        				}
                    }
        		}
        		else if( tmp_record.get('atax_id') != '')
        		{
        			//서버
        			this.setMenu30_Grid2Data(e.rowIdx+1, tmp_record, 'db');
        		}
        		/////////////////////
        		//자동저장[라인 이동시] 
        		this.DataMap[e.rowIdx].master = e.record.getData();
        		this.onMenu30_Grid1SaveClick(true);
        		//
        		//////////////////////
        		
            	movePos = {row: e.rowIdx+1, column: 1};
            }
	        //현재 컬럼이 마지막 컬럼이 아닌 경우
	        else {
	            if (e.field == 'atax_date_d' || e.field == 'atax_tax')
	            {
	                movePos = {row: e.rowIdx, column: e.colIdx+2};
	            }
	            else movePos = {row: e.rowIdx, column: e.colIdx+1};
	        }
	        editor.startEditByPosition(movePos);
	    }
        Global.isEnter = false;
        return true;
    },
    
    //부가세유형 변경시 데이터 셋팅
    //@e (Object) Extjs Context Object (required)
    setAtaxTypeData: function(e) {
        var storeJpType = StoreInfo.ADD_JP_TYPE
        , recordAtaxType = StoreInfo.ADD_TAX_TYPE.findRecord('atax_type', e.value);
        
        //유형코드에 따라 분개플래그 목록 변경
        storeJpType.removeAll();
        
        switch (e.record.get('atax_type')) {
            case '11': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //과세매출
            case '12': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //영세율매출
            case '13': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //면세매출
            case '17': storeJpType.add(this.getJpType([0, 3])); break; //카드과세매출
            case '18': storeJpType.add(this.getJpType([0, 3])); break; //카드면세매출
            case '19': storeJpType.add(this.getJpType([0, 3])); break; //카드영세매출
            case '22': storeJpType.add(this.getJpType([0, 1])); break; //현금영수증과세매출
            case '23': storeJpType.add(this.getJpType([0, 1])); break; //현금면세매출
            case '24': storeJpType.add(this.getJpType([0, 1])); break; //현금영세매출
            case '51': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //과세매입
            case '52': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //영세매입
            case '53': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //면세매입
            case '54': storeJpType.add(this.getJpType([0, 1, 2, 4])); break; //불공제매입
            case '57': storeJpType.add(this.getJpType([0, 3])); break; //카드과세매입
            case '58': storeJpType.add(this.getJpType([0, 3])); break; //카드면세매입
            case '59': storeJpType.add(this.getJpType([0, 3])); break; //카드영세매입
        }

        
        /* 기타 추가
        switch (e.record.get('atax_type')) {
            case '11': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //과세매출
            case '12': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //영세율매출
            case '13': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //면세매출
            case '17': storeJpType.add(this.getJpType([0, 3, 5])); break; //카드과세매출
            case '18': storeJpType.add(this.getJpType([0, 3, 5])); break; //카드면세매출
            case '19': storeJpType.add(this.getJpType([0, 3, 5])); break; //카드영세매출
            case '22': storeJpType.add(this.getJpType([0, 1, 5])); break; //현금영수증과세매출
            case '23': storeJpType.add(this.getJpType([0, 1, 5])); break; //현금면세매출
            case '24': storeJpType.add(this.getJpType([0, 1, 5])); break; //현금영세매출
            case '51': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //과세매입
            case '52': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //영세매입
            case '53': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //면세매입
            case '54': storeJpType.add(this.getJpType([0, 1, 2, 4, 5])); break; //불공제매입
            case '57': storeJpType.add(this.getJpType([0, 3, 5])); break; //카드과세매입
            case '58': storeJpType.add(this.getJpType([0, 3, 5])); break; //카드면세매입
            case '59': storeJpType.add(this.getJpType([0, 3, 5])); break; //카드영세매입
        }
        */
        
        //부가세 비율 셋팅
        if(recordAtaxType) e.record.set('atax_type_ratio', recordAtaxType.get('atax_type_ratio'));
        //else Ext.Msg.alert("경고", '부가세 조회 실패 : ' + json.DATA);
    },
    
    //분개플래그 목록 가져옴
    //@arr (Array) 분개 플래그 타입 (ex) [0, 1, 2]
    getJpType: function(arr) {
        var array = arr || [0, 1, 2, 3, 4, 5]
        , result = new Array()
        , type = [
						{atax_jp_flag: '0', atax_jp_nm: '0 없음', atax_jp_key: '없음'},
						{atax_jp_flag: '1', atax_jp_nm: '1 현금', atax_jp_key: '현금'},
						{atax_jp_flag: '2', atax_jp_nm: '2 외상', atax_jp_key: '외상'},
						{atax_jp_flag: '3', atax_jp_nm: '3 카드', atax_jp_key: '카드'},
						{atax_jp_flag: '4', atax_jp_nm: '4 예금', atax_jp_key: '예금'},
            //{atax_jp_flag: '5', atax_jp_nm: '5 기타'}
        ];

        for (var i = 0; i < array.length; i++) {
            result.push(type[array[i]]);
        }

        return result;
    },

    //과세유형 및 분개플래그에 따라 전표분개 모델 가져옴
    //@record (Ext.data.Model) 전표에 셋팅할 데이터 (Required)
    getGrid2Model: function(record) {
        var atax_type = record.get('atax_type')
        , atax_jp_flag = record.get('atax_jp_flag')
        , customer_id = record.get('atax_customer_id') || ''
        , atax_supply_price = record.get('atax_supply_price') || ''
        , atax_tax = record.get('atax_tax') || ''
        , atax_item_sum = record.get( 'atax_item_sum') || ''
        , jp_rem = '[부가세] ' + record.get('atax_item_nm')
        , valid = 11;
        
        /*
        console.log(atax_jp_flag);
        if(atax_jp_flag == '현금') atax_jp_flag = 1;
        else if(atax_jp_flag == '외상') atax_jp_flag = 2;
        else if(atax_jp_flag == '카드') atax_jp_flag = 3;
        else if(atax_jp_flag == '예금') atax_jp_flag = 4;
        
        console.log(atax_jp_flag);
        */
        var data = {
            '11': {
                '1': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '206', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '101', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '206', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '108', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '206', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '12': {
                '1': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '101', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '108', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '13': {
                '1': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '101', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '108', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '301', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '17': {
                '3': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '302', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '206', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '112', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '18': {
                '3': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '302', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '112', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '19': {
                '3': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '302', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '112', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '22': {
                '1': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '303', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '206', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '101', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '23': {
                '1': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '303', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '101', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '24': {
                '1': [
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '303', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '101', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '51': {
                '1': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '117', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '117', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '201', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '117', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '52': {
                '1': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '201', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '53': {
                '1': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '201', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '54': {
                '1': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '000', credit: 0, debit: atax_supply_price + atax_tax, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '101', credit: atax_item_sum, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '2': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '000', credit: 0, debit: atax_supply_price + atax_tax, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '204', credit: atax_item_sum, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ],
                '4': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '000', credit: 0, debit: atax_supply_price + atax_tax, customer_id: customer_id, jp_rem: jp_rem ,valid : valid},
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '103', credit: atax_item_sum, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '57': {
                '3': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '117', credit: atax_tax, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '202', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '58': {
                '3': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem ,valid : valid },
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '202', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            },
            '59': {
                '3': [
                    { jp_view_gubun: '3', jakmok_code: '', gycode: '130', credit: atax_supply_price, debit: 0, customer_id: customer_id, jp_rem: jp_rem  ,valid : valid},
                    { jp_view_gubun: '4', jakmok_code: '', gycode: '202', credit: 0, debit: atax_item_sum, customer_id: customer_id, jp_rem: jp_rem ,valid : valid }
                ]
            }
        };

        return data[atax_type][atax_jp_flag];
    },
    
    //필수값 체크
    //@e (Object) Extjs Context Object (required)
    setRequiredMsg: function(e) {
        var view = e.grid.getView();
        var required = {
            atax_item_nm: {
                target: view.getCellByPosition({row: e.rowIdx, column: 8}),
                value: ' '
            },
            atax_supply_price: {
                target: view.getCellByPosition({row: e.rowIdx, column: 11}),
                value: 0
            },
            atax_customer_id: {
                target: view.getCellByPosition({row: e.rowIdx, column: 14}),
                value: ''
            }
        };

        var i=0;
        for (key in required) {
            if (e.record.get(key) == required[key].value) {
            	i++;
                required[key].target.addCls('cell-error').child('.x-grid-cell-inner').setHTML('필수입력');
            }
        }
        if(i == 0) e.record.set('valid', 11);
        	
    },
    
  //전표 그리드 상세데이터 수정한 후
    onAfterEditCheckGrid2: function(editor, e, eOpts) {
    	
    	//상단에 수정 표시 하기
    	var grid1 = Ext.getCmp('Menu30_Grid1')
    	, grid1_rowIdx = parseInt(Ext.getCmp('Menu30_Grid2_Info_IDX').text, 10)
    	, grid1_record = StoreInfo.Menu30_Grid1.getAt(grid1_rowIdx);
    	//grid1_record.set('atax_jp_no',  '전표수정됨');
    	grid1_record.set('atax_jp_no_view',  '전표수정됨');
    	
    	//grid1_record.set('atax_jp_flag',  grid1_record.get('atax_jp_flag'));
    	//grid1_record.set('atax_jp_flag', 1);
    	//grid1_record.setDirty();
    	//grid1_record.commit();
    	
    	//markDirty() 
    	//grid1_record.modified['atax_jp_flag'] = grid1_record.get('atax_jp_flag');
    	
    	//grid1.getStore().sync();
    	//grid1.disable();
        
    	//console.log('grid1_record.modified');
    	//console.log(grid1_record.modified);
    	
    	//StoreInfo.Menu30_Grid1.commitChanges();
    	
    	//
    	var valid = this.jpValidCheck();

    	//포커스 이동
        //다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
        var movePos = null;
        //다음 수정할 셀에 포커스 줌
        if (Global.isEnter) {
        	//extjs4.2에서의 e.colIdx와 4.2 미만 버전의 e.colIdx는 1씩 차이가남
        	//f(e.grid.columns.length == e.colIdx){
    		if(e.grid.columns.length == e.colIdx){
				if(e.grid.getStore().getCount() == (e.rowIdx+1))
				{
					//var jp_no = grid1_record.get('atax_jp_no');
					//console.log(jp_no)
					if(!valid) this.tempRowInitGrid2();
					else 
					{
						//자동 저장후
						this.DataMap[grid1_rowIdx].master = grid1_record.getData();
						this.onMenu30_Grid1SaveClick(true);
						
						//상단로우로 포커스 이동
						//최하단 로우가 없으면 넣기
						//현재 로우가 마지막 로우인 경우
		                if(grid1.getStore().getCount() == (grid1_rowIdx+1)) {
		                    //새 로우 추가
		                    this.tempRowInit(grid1.getStore());
		                }
						
						//[grid1_rowIdx+1] 이동
						var edit = grid1.getPlugin('cellplugin');
						edit.startEditByPosition({row: grid1_rowIdx+1, column: 1});
						return true;
					}
				}
				movePos = {row: e.rowIdx+1, column: 1};
    		} 
    		else
    		{
    			//extjs4.2 두번 호출되는 버그로 인한 대응( 4.2 미만 버전은 e.colIdx+1만 해주면됌)
    			if(Global.isModified)
    			{
    				if(e.field == 'debit') movePos = {row: e.rowIdx, column: e.colIdx};
    				else if(e.field == 'credit') movePos = {row: e.rowIdx, column: e.colIdx+2};
    				Global.isModified = false;
    			}
    			else movePos = {row: e.rowIdx, column: e.colIdx+1};
    			
    		} 
        	editor.startEditByPosition(movePos);
        }
        Global.isEnter = false;
        
        if(e.field == 'jp_view_gubun')
        {
        	if(e.record.get('jp_view_gubun') == 3) e.record.set('jp_gubun_type', 2);
        	else e.record.set('jp_gubun_type', 1);
        }
        	
        return true;
    },
    
    
    //전표분개 그리드에 데이터 셋팅
    //@rowIdx (int) 부가세 그리드에서 선택된 로우 인덱스
    //@record (Ext.data.Model) 부가세 그리드에서 선택된 로우 데이터
    //@type (string) 데이터의 셋팅 유형 (new, map, db)
    setMenu30_Grid2Data : function(rowIdx, record, type) {
    	
    	var thisObj = this;
        var store = StoreInfo.Menu30_Grid2
        , year = Ext.getCmp('Menu30_Year').getValue()
        , date = year + Ext.String.leftPad(record.get('atax_date_m'), 2, '0') + Ext.String.leftPad(record.get('atax_date_d'), 2, '0');

        store.removeAll();

        if (type == 'db') {
            Ext.Ajax.request({
                method: 'POST',
                url: './proc/account/addtax/add_tax_jp_list_proc.php',
                params: {
                    atax_yyyymmdd: date,
                    jp_no: record.get('atax_jp_no')
                },
                success: function(response, opts) {
                    var json = Ext.JSON.decode(response.responseText)
                    , store = StoreInfo.Menu30_Grid2;
                    
                    console.log(json);

                    if (json.CODE == '00') {
                        //스토어에 조회된 데이타 업데이트
                        store.add(json.DATA);
                        store.commitChanges();
                        
                        thisObj.jpValidCheck();
                    }
                    else {
                        Ext.Msg.alert("경고", '부가세 조회 실패 : ' + json.DATA);
                    }
                },
                failure: function(form, action) {
                    Global.hideMask();
                    Ext.Msg.alert("경고", '부가세 조회 실패 : 네트 워크 오류');
                }
            });
        }
        else {
            store.add(this.DataMap[rowIdx].detail);
        }
    },

    //스토어에 로우 추가
    //@store (Ext.data.Store) 로우를 추가할 스토어(Required)
    //@date (Object) 추가될 때 셋팅할 날짜 (ex) {year: yyyy, month: mm, day: dd}
    //@commit (Boolean) 스토어에 커밋할지 여부
    tempRowInit: function(store, date, commit) {
        var model = new Object()
        , now = new Date()
        , save = commit || false;

        model.atax_date_d = date ? date.day : now.getDate();
        model.atax_date_m = date ? date.month : now.getMonth() + 1;
        model.atax_yyyymmdd = date ? date.year : now.getFullYear();
        model.atax_yyyymmdd += Ext.String.leftPad(model.atax_date_m, 2, '0');
        model.atax_yyyymmdd += Ext.String.leftPad(model.atax_date_d, 2, '0');
        model.atax_no = '';
        model.atax_type = '11';
        model.atax_item_nm = ' ';
        model.atax_item_cnt = 0;
        model.atax_item_danga = 0;
        model.atax_supply_price = 0;
        model.atax_tax = 0;
        model.atax_type_ratio = 10;
        model.atax_item_sum = 0;
        model.atax_customer_id = '';
        model.atax_customer_nm = '';
        model.atax_elect_flag = 'n';
        model.atax_jp_flag = '0';
        model.atax_jp_no = '0';
        model.valid = 22;

        if (store) store.add(model);
        if (save) store.commitChanges();
    },
    
    tempRowInitGrid2: function()
    {
    	var store = StoreInfo.Menu30_Grid2;
    	var strCnt = store.getCount();
    	
    	store.add({
			'jp_id' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : ''
			, 'jp_match_id' : '' , 'jp_view_gubun': 3, 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
		});
    	
    	/*
    	if(strCnt < 1)
    	{
    		store.add({
				'jp_id' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : ''
				, 'jp_match_id' : '', 'jp_view_gubun': 1, 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
			});
    	}
    	else
    	{
    		if(store.last().get('valid') == 11)
    		{
    			store.add({
					'jp_id' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : ''
					, 'jp_match_id' : '','jp_view_gubun': 1, 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
				});
    		}
    	}
    	*/
    	store.commitChanges();
		
    },
    

    //부가세 리스트 조회
    onMenu30_Grid1SearchClick: function(button, e, eOpts, page) {
        var thisObj = this
        , year = Ext.getCmp('Menu30_Year').getValue()
        , month = Ext.getCmp('Menu30_Month').getValue()
        , date = year + Ext.String.leftPad(month, 2, '0')
        , type = Ext.getCmp('Menu30_Type').getValue() || '';

        Global.showMask(Ext.getBody());

        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_list_proc.php',
            params: {
                atax_yyyymm: date,
                type: type
            },
            success: function(response, opts) {
                var json = Ext.JSON.decode(response.responseText)
                , store1 = StoreInfo.Menu30_Grid1
                , store2 = StoreInfo.Menu30_Grid2;

                if (Global.mask) Global.hideMask();

                if (json.CODE == '00') {
                    //스토어에 추가하기전에 총액컬럼 셋팅함.
                    //gridcolumn renderer에서 스토어에 셋팅할 경우 에러가 있음. 원인알수없음.
                    //총액을 DB에 갖고있는편이 좋을듯함.
                    for (var i = 0; i < json.DATA.length; i++) {
                        json.DATA[i]['atax_item_sum'] = Number(json.DATA[i].atax_supply_price) + Number(json.DATA[i].atax_tax);
                        json.DATA[i].valid = 11;
                    }

                    //스토어에 조회된 데이타 업데이트
                    store1.removeAll();
                    store1.add(json.DATA);
                    store1.commitChanges();

                    //스토어에 새로운 로우 추가
                    thisObj.tempRowInit(store1, {year: year, month: month, day: new Date().getDate()});

                    //스크롤 하단으로 이동
                    Global.setGridScrollTop(Ext.getCmp('Menu30_Grid1'));

                    //데이터맵 초기화
                    thisObj.DataMap = new Object();

                    //전표 그리드 초기화
                    store2.removeAll();
                }
                else {
                    Ext.Msg.alert("경고", '부가세 조회 실패 : ' + json.DATA);
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("경고", '부가세 조회 실패 : 네트 워크 오류');
            }
        });
    },

    //부가세 추가, 수정된 로우 저장
    onMenu30_Grid1SaveClick: function(isAutoSave) {
    	console.log('onMenu30_Grid1SaveClick');
    	
        var thisObj = this
        , param = new Object();
        
        var modiArr = StoreInfo.Menu30_Grid1.getModifiedRecords();
        modiArr = Global.sortModelArr(modiArr);
        var len =  modiArr.length;
        
        //필수값 체크 
        // 및 수정 값 찾아서 세팅
        for (var key in this.DataMap) {
            var master = this.DataMap[key].master
            , detail = this.DataMap[key].detail
            , valid = true;
            
            //console.log('before : master --> '+master); 
            //console.log('before : detail --> '+detail); 
            
            //부가세 데이터
            if (master.atax_item_nm == ' ') valid = false;
            if (master.atax_supply_price == 0) valid = false;
            if (master.atax_customer_id == '') valid = false;
            
            //전표 데이터
            if (detail) {
            	//console.log('detail.length ->'+ detail.length);
                for (var i = detail.length; i >=0 ; i--) {
                	//값이 없는 행 삭제
                	//console.log(detail[i].gycode+" : "+detail[i].debit+" : "+detail[i].credit+" : "+detail[i].customer_id);
                	console.log(detail[i]);
                    if (!detail[i] || !detail[i].gycode ||  (!detail[i].debit && !detail[i].credit) || !detail[i].customer_id ||
                    		detail[i].gycode == '' || (detail[i].debit == '' && detail[i].credit == '')
                    		|| detail[i].customer_id == '')
                    {
                    	//delete detail[i];
                    	detail.splice(i, 1);
                    	//console.log('aa : detail.length ->'+ detail.length);
                    }
                }
            }
           //console.log('after : detail --> '+detail); 
           //console.log('valid --> '+valid);
           
           //console.log('key --> '+key);
           //console.log(master);
           //수정된 값인지 구분
           //console.log(len);
            
           for(var i=0; i<len; i++)
           {
        	   //console.log(modiArr[i]);
        	   //console.log(StoreInfo.Menu30_Grid1.indexOf(modiArr[i]));
        	   if(StoreInfo.Menu30_Grid1.indexOf(modiArr[i]) == key)
        	   {
        		   if (valid) param[key] = this.DataMap[key];
        	   }
           }
        }
        //console.log('param -->' );
       // console.log(param);
        //console.log('Object.keys(param).length -->'+Object.keys(param).length);
        //데이터맵에 데이터가 없는경우
        if (Object.keys(param).length == 0) {
        	if(isAutoSave) return ; 
        	else return Ext.Msg.alert("알림", "저장할 데이터가 없습니다.");
        }

        if(!isAutoSave) Global.showMask(Ext.getBody());
       //console.log(param);
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_reg_adv_proc.php',
            params: {
                data: JSON.stringify(param)
            },
            success: function(response, opts) {
            	
                var json = Ext.JSON.decode(response.responseText);

                if (Global.mask) Global.hideMask();

                if (json.CODE == '00') {
                    //저장된 데이터 그리드에 적용
                	if(isAutoSave) thisObj.sucessRowUpdate(json.DATA, false);
                	else thisObj.sucessRowUpdate(json.DATA, true);
                    //thisObj.onMenu30_Grid1SearchClick();
                    //데이터맵 초기화
                	if(!isAutoSave) thisObj.DataMap = new Object();
                }
                else {
                    if(isAutoSave) Ext.Msg.alert("경고", '부가세 자동 저장 실패 : ' + json.DATA); 
                    else Ext.Msg.alert("경고", '부가세 저장 실패 : ' + json.DATA);
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                if(isAutoSave) Ext.Msg.alert("경고", '부가세 자동 저장 실패 : 네트 워크 오류');
                else Ext.Msg.alert("경고", '부가세 저장 실패 : 네트 워크 오류');
            }
        });
    },
    
    //삭제버튼을 눌렀을 경우 - 미완
    onDeletBtn_Click: function(button, e, eOpts) {
    	var store = StoreInfo.Menu30_Grid2;
    	var selRecArr = Ext.getCmp('Menu30_Grid2').getSelectionModel().getSelection();
    	var len = selRecArr.length;
    	if(len > 0)
    	{
        	for(var i=0; i<len; i++)
	    	{
	    		var record = selRecArr[i];
	    		store.remove(record);
	    		this.jpValidCheck();
	    		//var rowIdx = StoreInfo.Menu30_Grid2.indexOf(record);
	    	}
    	}
    	else Ext.Msg.alert("", '삭제할 전표 라인을 선택해주세요.');
    },
    
    //하단 전표 발리드 체크
    jpValidCheck : function() {
    	var grid1 = Ext.getCmp('Menu30_Grid1')
    	, grid1_rowIdx = parseInt(Ext.getCmp('Menu30_Grid2_Info_IDX').text, 10)
    	, grid1_record = StoreInfo.Menu30_Grid1.getAt(grid1_rowIdx)
        , store = StoreInfo.Menu30_Grid2
        , label = Ext.getCmp('Menu30_Grid2_HelpText')
        , data = new Array()
        , valid = false
        , msg = '';
        var debTot = 0, creTot = 0;
        
		store.each(function(record,id) {
			
			if(record.get('jp_view_gubun') == 3) record.set('credit', 0);  
			if(record.get('jp_view_gubun') == 4) record.set('debit', 0);
			
        	var deb = parseInt(record.get('debit'), 10);
        	if(!deb) deb = 0;  
        	var cre = parseInt(record.get('credit'), 10);
        	if(!cre) cre= 0;
        	
        	if(record.get('jp_view_gubun') == 3 &&  deb == 0) isZero = true;
        	else if(record.get('jp_view_gubun') == 4 &&  cre == 0) isZero = true;
        	
        	debTot += deb;
        	creTot += cre;
	    });
		
		//합계 세팅		
		Ext.getCmp('sum_credit').setValue(Ext.util.Format.number(debTot, '0,000'));
        Ext.getCmp('sum_debit').setValue(Ext.util.Format.number(creTot, '0,000'));
		
		if(debTot == creTot)
	    {
	    	store.each(function(record,id) {
	    		record.set('valid' ,11)
		    });
	    	valid = true;
	    }
	    else
	    {
	    	store.each(function(record,id) {
	    		record.set('valid' ,22)
		    });
	    	msg = '차변(출금) 합계금액과 대변(입금) 합계금액은 일치해야 합니다.';
	    }
		 
		//상단 수정 플래그 세우기
        grid1_record.set('isModify',true);
       
        if (valid) {
            grid1.enable();
            grid1.removeCls('grid-disabled');
            label.setText('');
            
            console.log('valid!! -> '+grid1_rowIdx);
            //부가세 및 전표 데이터를 데이터맵에 등록
            this.DataMap[grid1_rowIdx] = new Object();
    
            for (var i = 0, len = store.getCount(); i < len; i++) {
            	//console.log(store.getAt(i).getData());
                data.push(store.getAt(i).getData());
            }
            //console.log(grid1_record);
            //console.log(grid1_record.getData());
            
            //전표 맞는거 플래그 세우기
            grid1_record.set('jp_valid',true);
            
            this.DataMap[grid1_rowIdx].master = grid1_record.getData();
            this.DataMap[grid1_rowIdx].detail = data;
            
            console.log(this.DataMap[grid1_rowIdx]);
        }
        else {
        	grid1_record.set('jp_valid',false);
            grid1.disable();
            grid1.addCls('grid-disabled');
            label.setText(msg);
        }
        
        return valid;
    },
    

    //성공한 데이터 그리드에 업데이트
    sucessRowUpdate: function(data, isMsg) {
        var store1 = StoreInfo.Menu30_Grid1
        , store2 = StoreInfo.Menu30_Grid2;

        console.log(data);
        for (var key in data) {
            var record = store1.getAt(key);
            
            record.set('atax_id', data[key].master.atax_id);
            record.set('atax_jp_no', data[key].master.atax_jp_no);
            record.set('atax_no', data[key].master.atax_no);
            record.set('isModify', false);
            record.set('atax_jp_no_view', true);
            
            record.commit();
        }
        store1.commitChanges();
        
        
        store2.commitChanges();

        if (isMsg) Ext.Msg.alert("알림", '저장되었습니다.');
    },

    //부가세 선택된 로우 삭제
    onMenu30_Grid1DeleteClick: function() {
        var thisObj = this
        , store = StoreInfo.Menu30_Grid1
        , selRecArr = Ext.getCmp('Menu30_Grid1').getSelectionModel().getSelection()
        , sucCnt = 0
        , localGridIdx = []
        , param = new Object()
        , len = selRecArr.length;

        if (len > 0) {
            for (i = 0; i < len; i++) {
                var record = selRecArr[i];
                var rowIdx = StoreInfo.Menu30_Grid1.indexOf(record);

                if (record.get('atax_id')) {
                    param[sucCnt] = {
                        "atax_id": record.get('atax_id'),
                        "atax_jp_no": record.get('atax_jp_no'),
                        "atax_yyyymmdd": record.get('atax_yyyymmdd'),
                        "row_idx": rowIdx
                    };
                    sucCnt++;
                }
                else {
                    localGridIdx.push(record);
                }
            }

            Global.showMask(Ext.getBody());

            Ext.Ajax.request({
                method: 'POST',
                url: './proc/account/addtax/add_tax_del_proc.php',
                params: {
                    data: JSON.stringify(param)
                },
                success: function(response, opts) {
                    var json = Ext.JSON.decode(response.responseText);

                    if (Global.mask) Global.hideMask();

                    if (json.CODE == '00') {
                        thisObj.sucessRowDelete(store, json.DATA, localGridIdx);
                    }
                    else {
                        Ext.Msg.alert("경고", '부가세 삭제 실패 : '+json.DATA);
                    }
                },
                failure: function(form, action) {
                    Global.hideMask();
                    Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
                }
            });
        }
        else {
            Ext.Msg.alert("", '삭제할 정보를 선택해주세요.');
        }
    },

    //서버삭제에 성공한 데이터는 그리드에서도 삭제, 서버삭제 실패한 경우가 있을경우 알림창을 띄움
    sucessRowDelete: function(store, serverData, localData) {
        var thisObj = this
        , failCnt = 0;

        for (var i = 0; i < serverData.length; i++) {
            var rowData = serverData[i];

            if (rowData.code == -99 || rowData.code == -999) {
                failCnt++;
            }
            else {
                var record = store.getAt(rowData.row_idx);
                localData.push(record);
            }
        }

        for(var i=0; i<localData.length; i++) {
            store.remove(localData[i]);
        }

        if (failCnt > 0) {
            Ext.Msg.alert("알림", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 삭제실패되었습니다.</span>');
        }
    }
});