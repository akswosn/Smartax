
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_CloseYear', {
    extend: 'Ext.window.Window',

    height: 300,
    width: 400,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    style: {'border-bottom': '1px solid #99BBE8'},
                    layout: {
                        type: 'hbox',
                        align: 'left',
                        pack: 'start'
                    },
                    items: [{
                        xtype: 'gridpanel',
                        store: StoreInfo.CloseYear,
                        width: 150,
                        height: 234,
                        scroll: true,
                        autoScroll: true,
                        border: false,
                        style: {'border-right': '1px solid #99BBE8'},
                        columns: [{
                            xtype: 'gridcolumn',
                            dataIndex: 'close_year',
                            align: 'center',
                            sortable: true,
                            text: '마감년도',
                            width: 82
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'status',
                            align: 'center',
                            sortable: true,
                            text: '상태',
                            width: 50
                        }]
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        height: 234,
                        bodyPadding: 10,
                        border: false,
                        layout: {
                            type: 'vbox',
                            align: 'stretch',
                            pack: 'start'
                        },
                        items: [{
                            xtype: 'label',
                            padding: '0 0 10 0',
                            style: {'font-size': '11px', 'line-height':'18px'},
                            html: '마감된 년도의 자료는 추가, 수정, 삭제할 수<br>없습니다.'
                        },
                        {
                            xtype: 'container',
                            padding: 10,
                            style: {'border': '1px solid #99BBE8'},
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'start'
                            },
                            items: [{
                                xtype: 'form',
                                id: 'form_CloseYear',
                                border: false,
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                bodyPadding: 0,
                                items: [{
                                    xtype: 'numberfield',
                                    id: 'close_year',
                                    name: 'close_year',
                                    fieldLabel: '발생년도',
                                    labelAlign: 'right',
                                    labelWidth: 50,
                                    labelSeparator: '',
                                    width: 120,
                                    maxLength: 4
                                }]
                            },
                            {
                                xtype: 'container',
                                padding: 5,
                                border: false,
                                padding: '10px 0 0 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'center'
                                },
                                items: [{
                                    xtype: 'button',
                                    width: 70,
                                    margin: '0 10px 0 0',
                                    text: '마감',
                                    listeners: {
                                        click: {
                                            fn: me.onCloseYearRegisterClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 70,
                                    text: '마감취소',
                                    listeners: {
                                        click: {
                                            fn: me.onCloseYearDeleteClick,
                                            scope: me
                                        }
                                    }
                                }]
                            }]
                        }],
                    }]
                },
		   		{
                    xtype: 'container',
                    layout: {
                        align: 'middle',
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [{
                        xtype: 'button',
                        margin: 5,
                        width: 50,
                        text: '닫기',
                        listeners:{
                        	click:{
                        		fn: me.onCloseClick,
                        		scope: me
                        	}
                        }
                    }]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
    	var thisObj = this
    	, close_year = Ext.getCmp('close_year')
    	, date = new Date()
    	, year = date.getFullYear();
    	
    	close_year.setValue(year);
    	//close_year.setMaxValue(year);
    	
        thisObj.setCloseYearList();
    },
    
    //마감년도 리스트 셋팅
    setCloseYearList: function() {
        var thisObj = this;
        
        Global.showMask(this);
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/close/close_year_list_proc.php',
            success: function(response, opts) {
                Global.hideMask();
                var json = Ext.JSON.decode(response.responseText);
                if (json.CODE == '00') {
                    StoreInfo.CloseYear.removeAll();
                    //데이터가 배열로 들어와서 스토어에 직접 추가함
                    for (var i = 0, len = json.DATA.length ; i < len; i++) {
                        StoreInfo.CloseYear.insert(i, {
                            close_year: json.DATA[i],
                            status: '마감'
                        });
                    }
                }
                else {
                    Ext.Msg.alert("", '로딩 실패!');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("", '로딩 실패!');
            }
        });
    },
    
    //마감 이벤트
    onCloseYearRegisterClick: function() {
    	var thisObj = this;    	
    	var values = Ext.getCmp('form_CloseYear').getForm().getValues();
    	
    	Global.showMask(this);
    	
    	Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/close/close_year_register_proc.php',
			params: values,
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
				    thisObj.setCloseYearList();
				    Ext.Msg.alert("", '마감이 완료되었습니다');
				}
				else{
					Ext.Msg.alert("", '로딩 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '로딩 실패!');
			}
		});
    },
    
    //마감 취소 이벤트
    onCloseYearDeleteClick: function() {
        var thisObj = this;      
        var values = Ext.getCmp('form_CloseYear').getForm().getValues();
        Global.showMask(this);
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/close/close_year_delete_proc.php',
            params: values,
            success: function(response, opts) {
                Global.hideMask();
                var json = Ext.JSON.decode(response.responseText);
                if(json.CODE == '00'){
                    thisObj.setCloseYearList();
                    Ext.Msg.alert("", '마감취소가 완료되었습니다');
                }
                else{
                    Ext.Msg.alert("", '로딩 실패!');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("", '로딩 실패!');
            }
        });
    },
    
    onCloseClick: function() {
        //분개장화면 초기화
        var page = Ext.getCmp('Menu01_Page');
        
        if (page) {
            page.onMenu01_Grid2BtnClick();
            page.onMenu01_SearchBtnClick();
        }
        
        this.close();
    }
});