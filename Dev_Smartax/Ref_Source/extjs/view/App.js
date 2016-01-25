function openApp(co_name, nick_name)
{
	Ext.application({
		
		name:'',
		launch:function(){
			
			Ext.Loader.setConfig({ enabled: true });
			Ext.Loader.setPath('Ext.ux', './extjs/ux');
				
			Ext.require([
				'Ext.ux.exporter.Base64',
				'Ext.ux.exporter.Button',
				'Ext.ux.exporter.Formatter',
				'Ext.ux.exporter.csvFormatter.CsvFormatter',
				'Ext.ux.exporter.excelFormatter.Workbook',
				'Ext.ux.exporter.excelFormatter.Worksheet',
				'Ext.ux.exporter.excelFormatter.Cell',
				'Ext.ux.exporter.excelFormatter.Style',
				'Ext.ux.exporter.excelFormatter.ExcelFormatter',
				'Ext.ux.exporter.Exporter',
				'Ext.ux.grid.Printer',
            	'Ext.ux.RowExpander'
			]);
			
	
			/** 영문 문구 한글로 바꾸기 **/
						
			//메세지 팝업창 
			Ext.window.MessageBox.prototype.buttonText = {
			    ok: "확인", cancel: "취소", yes: "예", no: "아니오"
			};
			
			//달력 팝업
			Ext.Date.monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
	        Ext.Date.dayNames = ["일", "월", "화", "수", "목", "금", "토"];
			
			//어플리케이션 실행
			Ext.get('web_site_area').hide();
			Global.viewPort = Ext.create('App');
			Ext.getCmp('user_id').setText(co_name);
			
			Global.co_name = co_name.replace(/\s*$/,'');
			Global.nickname = nick_name.replace(/\s*$/,'');
			
		}
	});	
}

/********************************** View **********************************/

Ext.define('App', {
    extend: 'Ext.container.Viewport',
	cls:'root',
	autoCreateViewPort:false,
	layout: {
        align: 'stretch',
        type: 'vbox'
    },
	renderTo: Ext.get('app_area'),
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
            	{
                    xtype: 'container',
                    cls:'infoBar',
                    layout:{
                    	type:'hbox'
                    },
                    items: [
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_01',
	                    	text:'회계관리'
	                    },
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_02',
	                    	text:'기초자료관리'
	                    },
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_07',
	                    	text:'부가세'
	                    },
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_03',
	                    	text:'영농일지관리'
	                    },
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_04',
	                    	text:'매입/매출관리'
	                    },
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_05',
	                    	text:'일정관리'
	                    },
	                    {
	                    	xtype:'label',
	                    	cls: 'menu',
	                    	id: 'menu_06',
	                    	text:'환경설정'
	                    },
	                    {
	                    	xtype:'label',
	                    	flex:1
	                    },
	                    {
	                    	xtype:'label',
	                    	id:'user_id',
	                    	style:'color:yellow;'
	                    },
	                    {
	                    	xtype:'label',
	                    	text:' 님 환영합니다.'
	                    }
                    ]
               	},
                {
                    xtype: 'container',
                    cls:'mainBar',
                    id: 'quick',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'MenuClose',
                            width: 80,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 50,
                                    margin: '0 0 5 0',
                                    width: 50,
                                    src: './extjs/img/home.png'
                                }
                            ]
                        },
                        {
                            xtype: 'image',
                            height: 60,
                            margin: '5 0 5 0',
                            width: 6,
                            src: './extjs/img/divisionline.png'
                        },
						{
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu01',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu3.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '분개장'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu28',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu3.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '통장 입력'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu02',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu4.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '회계표'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu29',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu4.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '일월계표'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu03',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu5.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '월별손익'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu04',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu6.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '현금출납장'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu05',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu7.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '계정별원장'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu06',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu8.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '거래처원장'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            cls: 'mainBtn',
                            id: 'Menu07',
                            width: 80,
                            height:70,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'image',
                                    height: 30,
                                    margin: '0 0 5 0',
                                    width: 30,
                                    src: './extjs/img/menu9.png'
                                },
                                {
                                    xtype: 'label',
                                    text: '결산서'
                                }
                            ]
                       	}
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onQuickAfterRender,
                            scope: me
                        }
                    }
                },
              	{
                    xtype: 'container',
                    id:'content',
                    layout:{
                    	type:'vbox'
                    },
                    flex:1
	            }
	            /*
              	{
                    xtype: 'container',
                    cls:'banner_lay',
                    layout:{
                    	type:'hbox'
                    },
                    items:[
                    	{
                    		xtype:'container',
                    		width:300,
                    		height:100,
                    		style:'border: 1px solid gray;margin-right:10px;',
                    		html: 'banner1'
                    	},
                    	{
                    		xtype:'container',
                    		width:300,
                    		height:100,
                    		style:'border: 1px solid gray;margin-right:10px;',
                    		html: 'banner2'
                    	},
                    	{
                    		xtype:'container',
                    		width:300,
                    		height:100,
                    		style:'border: 1px solid gray;margin-right:10px;',
                    		html: 'banner3'
                    	},
                    	{
                    		xtype:'container',
                    		width:300,
                    		height:100,
                    		style:'border: 1px solid gray;margin-right:10px;',
                    		html: 'banner4'
                    	}
                    ]
                }
                */
            ]
        });

        me.callParent(arguments);
    },

    onQuickAfterRender: function(component, eOpts) {
    	
    	var thisObj = this;
    	var menu = null;
		Ext.each(this.query('label[cls="menu"]'), function(){
			var thisBtn = this;
			thisBtn.el.on('mouseover', function(){
				if(menu)
				{
					if(menu.isVisible())
					{
						if(thisObj.preMenu) thisObj.preMenu.removeCls('menu_ov');
						thisBtn.addCls('menu_ov');
						thisObj.preMenu = thisBtn;
						
						menu = thisObj.makeContextMenu(thisBtn.id, thisObj, menu);
						var pos = this.getXY();
				    	pos[1] += 15;
				        menu.showAt(pos, true);							
					}	
				}
			});
			
			thisBtn.el.on('click', function(){
				
				if(thisObj.preMenu) thisObj.preMenu.removeCls('menu_ov');
				thisBtn.addCls('menu_ov');
				thisObj.preMenu = thisBtn;
				
				if(menu)
				{
					if(thisBtn.getEl().getAttribute('class').indexOf('menu_ov') > -1)
					{
						
						if(!menu.isVisible())
						{
							menu = thisObj.makeContextMenu(thisBtn.id, menu);
							var pos = this.getXY();
					    	pos[1] += 15;
					        menu.showAt(pos, true);
						}
						else
						{
							thisBtn.removeCls('menu_ov');
							menu.hide();
							menu = null;							
						}
					}
					else
					{
						menu = thisObj.makeContextMenu(thisBtn.id, menu);
						var pos = this.getXY();
				    	pos[1] += 15;
				        menu.showAt(pos, true);	
					}
				}
				else
				{
					menu = thisObj.makeContextMenu(thisBtn.id, menu);
					var pos = this.getXY();
			    	pos[1] += 15;
			        menu.showAt(pos, true);
				}				
			});
		});
		
    	 Ext.each(Ext.ComponentQuery.query('#quick container[cls="mainBtn"]'), function(){
			this.el.on('click', function(){
				var thisBtn = this;
				if(Global.selTarget){
					Global.selTarget.removeCls('selBtn');
					thisObj.selId = Global.selTarget.id;
				} 
				this.addCls('selBtn');
				Global.selTarget = this;
				thisObj.changeContent(this.id, true);	
			});
			
		});
		
		/*
		Ext.getCmp('content').add(new Ext.Component({
			id:'Noti_Page',
           	loader: {
            	url:'./extjs/popup/Notification.html',
           		autoLoad: true
           	}
        }));
        */
		
		//환경설정 및 모든 코드정보 불러오기	
		this.callConfig();	
		
    },
    
    //컨텍스트 메뉴 만들기
	makeContextMenu: function(id, menu)
	{
		var thisObj = this;
		var items = null;
		switch(id)
		{
			case 'menu_01':
				items = [
					{ text: '분개장', handler: function() {thisObj.changeContent('Menu01');} },
					{ text: '회계표', handler: function() {thisObj.changeContent('Menu02');} },
					{ text: '월별손익', handler: function() {thisObj.changeContent('Menu03');} },
					{ text: '현금출납장', handler: function() {thisObj.changeContent('Menu04');} },
					{ text: '계정별원장', handler: function() {thisObj.changeContent('Menu05');} },
					{ text: '거래처원장', handler: function() {thisObj.changeContent('Menu06');} },
					{ text: '결산서', handler: function() {thisObj.changeContent('Menu07');} }
				];
			break;
			
			case 'menu_07':
				items = [
                    { text: '부가세', handler: function() {thisObj.changeContent('Menu30');} },
                    { text: '부가가치세신고서', handler: function() {thisObj.changeContent('Menu35');} },
                    { text: '세금계산서합계표', handler: function() {thisObj.changeContent('Menu32');} },
                    { text: '세금계산서집계표', handler: function() {thisObj.changeContent('Menu33');} },
                    { text: '세금계산서합계표데이터검증', handler: function() {thisObj.changeContent('Menu34');} },
                    { text: '계산서합계표', handler: function() {thisObj.changeContent('Menu37');} },
                    { text: '신용카드매출전표등발행금액집계표', handler: function() {thisObj.changeContent('Menu36');} },
				];
			break;
			
			case 'menu_02':
				items = [
					{ text: '계정코드등록', handler: function() {thisObj.changeContent('Menu08');} },
					{ text: '거래처등록', handler: function() {thisObj.changeContent('Menu09');} },
					{ text: '작목등록', handler: function() {thisObj.changeContent('Menu10');} },
					{ text: '기초금액등록', handler: function() {thisObj.changeContent('Menu11');} },
					{ text: '잔액이월', handler: function() {thisObj.changeContent('BalanceCarried');} },
					{ text: '마감작업', handler: function() {thisObj.changeContent('CloseYear');} },
				];
			break;
			case 'menu_03':
				items = [
					{ text: '영농일지', handler: function() {thisObj.changeContent('Menu12');} },
					{ text: '영농작목등록', handler: function() {thisObj.changeContent('Menu13');} },
					{ text: '작업코드등록', handler: function() {thisObj.changeContent('Menu14');} }
				];
			break;
			case 'menu_04':
				items = [
					{ text: '입고등록', handler: function() {thisObj.changeContent('Menu15');} },
					{ text: '입고현황', handler: function() {thisObj.changeContent('Menu16');} },
					{ xtype: 'menuseparator' },
					{ text: '주문등록', handler: function() {thisObj.changeContent('Menu17');} },
					{ text: '주문현황', handler: function() {thisObj.changeContent('Menu18');} },
					{ xtype: 'menuseparator' },
					{ text: '출고등록', handler: function() {thisObj.changeContent('Menu19');} },
					{ text: '출고현황', handler: function() {thisObj.changeContent('Menu20');} },
					{ xtype: 'menuseparator' },
					{ text: '재고현황', handler: function() {thisObj.changeContent('Menu21');} },
					{ text: '상품수불부', handler: function() {thisObj.changeContent('Menu22');} },
					{ xtype: 'menuseparator' },
					//{ text: '상품분류등록', handler: function() {thisObj.changeContent('Menu23');} },
					{ text: '상품등록', handler: function() {thisObj.changeContent('Menu24');} },
					{ text: '초기재고등록', handler: function() {thisObj.changeContent('Menu25');} },
					{ text: '재고이월', handler: function() {thisObj.changeContent('StockCarried');} }
				];
			break;
			case 'menu_05':
				items = [
					{ text: '일정관리', handler: function() {thisObj.changeContent('Menu26');} }
				];
			break;
			case 'menu_06':
				items = [
					{ text: '환경설정', handler: function() {thisObj.changeContent('MenuConfig');} }
				];
			break;
		}
		var selMenu = Ext.create('Ext.menu.Menu', {
			items: items,
			listeners:{
				 hide: {
                    fn: function(){
                    	menu = null;
                    }
                }
			}
		}); 
		return selMenu;
	},
    
    //컨텐츠영역 내용변경 
    changeContent: function(curBtnId, isQuick) {
        // 분개장메뉴에서 다른 메뉴로 이동시 작석중 데이터 저장
    	if (Global.current == 'Menu01') {
            Ext.getCmp('Menu01_Page').doSave(false);
        }
    	
    	if(this.preMenu) this.preMenu.removeCls('menu_ov');
    	
    	if(curBtnId == 'MenuClose')
    	{
    		//체험고객인지 확인  
    		if(parent.Global.Ex_Flag)
    		{
    			Ext.Ajax.request({
		            method: 'POST',
		            url: './proc/member/logout_ex_proc.php',
		            //params:{ to_yyyymmdd: to_yyyymmdd },
		            success: function(response, opts) {
		                var json = Ext.JSON.decode(response.responseText);
		                if (json.CODE == 'y') 
		                {
		                	parent.Global.Ex_Flag = false;
			            	Ext.get('web_site_area').show();
							Global.viewPort.destroy();
							Global.viewPort = null;
		                }
		            },
		            failure: function(form, action) {
		            }
		        });	
    		}
    		else
    		{
	    		Ext.get('web_site_area').show();
				Global.viewPort.destroy();
				Global.viewPort = null;
    		}
    	}
    	else if(curBtnId == 'BalanceCarried'){
    	    Global.openPopup(Ext.create('Common_Pop_BalanceCarried'), '잔액이월');
    	}
    	else if(curBtnId == 'StockCarried'){
    	    Global.openPopup(Ext.create('Common_Pop_StockCarried'), '재고이월');
    	}
    	else if(curBtnId == 'CloseYear'){
    	    Global.openPopup(Ext.create('Common_Pop_CloseYear'), '마감작업');
    	}
    	else if(curBtnId == 'MenuConfig')
    	{
    		Global.openPopup(Ext.create('Common_Pop_Config'), '환경설정');
    	}
    	else
    	{
    		var contChildren = Ext.getCmp('content').items.items;
    		for(var i=0; i<contChildren.length; i++)
    		{
    			var contChild = contChildren[i]; 
    			if(!contChild.hidden) contChild.hide();	
    		}
    		
    		if(Ext.getCmp(curBtnId+'_Page')) {
    			if(Ext.getCmp(curBtnId+'_Page').onContainerReShow)	Ext.getCmp(curBtnId+'_Page').onContainerReShow();
    			Ext.getCmp(curBtnId+'_Page').show();
    		}
	    	else Ext.getCmp('content').add(Ext.create(curBtnId+'_Page'));
	    	
	    	if(!isQuick && Global.selTarget) Global.selTarget.removeCls('selBtn');
    	}
    	
    	//현재 메뉴명을 저장함
    	Global.current = curBtnId;
    },
    
    callConfig: function()
    {
    	var thisObj = this;
    	Global.showMask(this);
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/config_get_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					if(json.DATA) Global.config = eval("("+json.DATA+")");
					thisObj.callGyCode(); 
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
    
    callGyCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/gycode/gycode_list_proc.php',
			success: function(response, opts) {
				
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu08_Grid.removeAll();
                	StoreInfo.Menu08_Grid.add(json.DATA);
                	StoreInfo.Menu08_Grid.sort('gycode', 'ASC');
                	
                	StoreInfo.Menu08_Grid_SEAR.removeAll();
                	StoreInfo.Menu08_Grid_SEAR.add(json.DATA);
                	StoreInfo.Menu08_Grid_SEAR.sort('gycode', 'ASC');
                	
                	thisObj.callCusCode();
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
    
    callCusCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/customer/customer_list_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu09_Grid.removeAll();
					StoreInfo.Menu09_Grid.add(json.DATA);
					thisObj.callJakCode();
					/*
					StoreInfo.Menu09_Grid = Ext.create('Ext.data.Store', {
				    	fields: [
				            {name: 'customer_id', type: 'string'},
							{name: 'tr_nm', type: 'string'},
							{name: 'tr_daepyo', type: 'string'},
							{name: 'tr_zip', type: 'string'},
							{name: 'tr_addr', type: 'string'},
							{name: 'tr_tel', type: 'string'},
							{name: 'tr_phone', type: 'string'},
							{name: 'tr_fax', type: 'string'},
							{name: 'tr_saup_no', type: 'string'},
							{name: 'tr_jumin_no', type: 'string'},
							{name: 'tr_up', type: 'string'},
							{name: 'tr_jong', type: 'string'},
							{name: 'tr_manager', type: 'string'},
							{name: 'tr_email', type: 'string'},
							{name: 'tr_homepage', type: 'string'},
							{name: 'tr_sdate', type: 'string'},
							{name: 'tr_edate', type: 'string'},
							{name: 'tr_chuchun', type: 'string'},
							{name: 'tr_bigo', type: 'string'}
				        ],
				        data: json.DATA,
				        remoteSort: true,
				        proxy: {
				            type: 'pagingmemory'
				        },
				        pageSize: 20
				     });
				     */
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
    
    callJakCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/jakmok/jakmok_list_proc.php',
			params: {
				in_type : Define.JAK
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu10_Grid.removeAll();
                	StoreInfo.Menu10_Grid.add(json.DATA);
                	thisObj.callWorkJakCode();
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
    
    callWorkJakCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/jakmok/jakmok_list_proc.php',
			params: {
				in_type : Define.WJAK
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu13_Grid.removeAll();
                	StoreInfo.Menu13_Grid.add(json.DATA);
                	thisObj.callWorkCode();
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
    
    callWorkCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/work_cd/workcd_list_proc.php',
			
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu14_Grid.removeAll();
                	StoreInfo.Menu14_Grid.add(json.DATA);
                	thisObj.callItemgrpCode();
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
    
    callItemgrpCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/itemgrp/itemgrp_list_proc.php',
			
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu23_Grid.removeAll();
                	StoreInfo.Menu23_Grid.add(json.DATA);
                	thisObj.callItemCode();
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
    
    callItemCode: function()
    {
    	var thisObj = this;
    	Global.showMask(this);

		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/item/item_list_proc.php',
			
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					StoreInfo.Menu24_Grid.removeAll();
                	StoreInfo.Menu24_Grid.add(json.DATA);
                	thisObj.callCloseYear();
				}
				else{
					Ext.Msg.alert("", '등록 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '등록 실패!');
			}
		});
    },
    
    //마감년도 데이터 셋팅
    callCloseYear: function()
    {
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
                    thisObj.callTaxTypeList();
                }
                else{
                    Ext.Msg.alert("", '마감년도 데이터 등록 실패!');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("", '마감년도 데이터 등록 실패!');
            }
        });
    },
    
    //부가세 유형 데이터 셋팅
    callTaxTypeList: function()
    {
        var thisObj = this;
        Global.showMask(this);

        Ext.Ajax.request({
            method: 'GET',
            url: './proc/account/addtax/add_type_list_proc.php',
            
            success: function(response, opts) {
                Global.hideMask();
                var json = Ext.JSON.decode(response.responseText);
                
                if (json.CODE == '00') {
                    StoreInfo.ADD_TAX_TYPE.removeAll();
                    StoreInfo.ADD_TAX_TYPE.add(json.DATA);

                    StoreInfo.ADD_TAX_TYPE_SEAR.removeAll();
                    StoreInfo.ADD_TAX_TYPE_SEAR.add({atax_type: "", atax_type_nm: "전체", atax_type_ratio: "0"});
                    StoreInfo.ADD_TAX_TYPE_SEAR.add(json.DATA);
                    
                    thisObj.changeContent('Menu31');
                }
                else{
                    Ext.Msg.alert("", '부가세 유형 데이터 등록 실패!');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("", '부가세 유형 데이터 등록 실패!');
            }
        });
    }
});

