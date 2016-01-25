/* 회계관리 - 분개장 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
var gycode_Skey = -1;		//49,50,51,52 
var customer_SKey = -1;
var customer_StrKey = '';

Ext.define('Menu01_Page', {
    extend: 'Ext.container.Container',
    id:'Menu01_Page',
    cls:'page',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex:1,
    initComponent: function() {
        var me = this;
	    
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
				        align: 'middle',
				        type: 'hbox'
				    },
                    cls:'searchBar',
                    items: [
                        {
                            xtype: 'numberfield',
                            id: 'menu01_year',
                            cls:'searchChild',
                            width: 120,
                            fieldLabel: '거래일자',
                            labelSeparator: '',
                            labelWidth: 50,
                            selectOnFocus: true,
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu01_SearchKbn();
	                                    }
	                                }
	                            }
	                        }
                        },
                        {
                            xtype: 'numberfield',
                            id: 'menu01_month',
                            margin: '0 0 0 5',
                            width: 50,
                            minValue : 1,
                            maxValue : 12,
                            selectOnFocus: true,
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                    if(e.getKey()==13){
	                                    	me.onMenu01_SearchKbn();
	                                    }
	                                }
	                            }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '조회',
                            listeners: {
                                click: {
	                                fn: me.onMenu01_SearchKbn,
	                                scope: me
	                            }
                            }
                        },
                        {
                            xtype: 'label',
                            cls:'searchChild',
                            margin: '4 0 0 10',
                            flex:1,
                            text: '작목, 계정과목, 거래처코드 조회시 해당칸에서 \'F2\'를 누르십시오.'
                        },
                        { //통장코드입력 사용여부
                            xtype: 'checkbox',
                            id: 'Menu01_isMatchCustomerId',
                            fieldLabel: '통장코드입력',
                            width: 100,
                            style: {
                                'margin-right': '8px',
                                'border-radius': '2px',
                                'background': '#99BBE8'
                            },
                            labelAlign: 'right',
                            labelSeparator: '',
                            labelWidth: 78,
                            listeners: {
                                change: function(field, newValue, oldValue, eOpts) {
                                    var column = Ext.getCmp('Menu30_Grid1_MatchCustomerId');
                                    
                                    //체크값에 따라 통장코드 컬럼 표시, 숨김
                                    (newValue) ? column.show() : column.hide();
                                }
                            }
                        },
                        { //차대전표 사용여부
                            xtype: 'checkbox',
                            id: 'Menu01_isGrid3',
                            fieldLabel: '차대전표보기',
                            width: 100,
                            style: {
                                'border-radius': '2px',
                                'background': '#99BBE8'
                            },
                            labelAlign: 'right',
                            labelSeparator: '',
                            labelWidth: 78,
                            listeners: {
                                change: function(field, newValue, oldValue, eOpts) {
                                    var grid = Ext.getCmp('Menu01_Grid3');
                                    
                                    //체크값에 따라 차대전표 표시, 숨김
                                    (newValue) ? grid.show() : grid.hide();
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '분개입력사전',
                            listeners: {
                                click: {
                                    fn: function(){
                                    	var pop = Ext.create('Common_Pop_InputExam');
    									Global.openPopup(pop, "분개입력사전");	
                                    }
                                }
                            }
                            
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '입력 도우미',
                            listeners: {
                                click: {
                                    fn: function(){
                                    	var pop = Ext.create('Common_Pop_InputHelper');
    									Global.openPopup(pop, "입력 도우미");	
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '계정체계도',
                            listeners: {
                                click: {
                                    fn: me.showGyCodePopup,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'searchChild',
                            text: '사용방법',
                            listeners: {
                                click: {
                                    fn: me.onMenu01_DescriptBtnClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tab_lay',
                    id: 'Menu01_Tab',
                    flex: 1,
                    activeTab: 0,
                    items: [
                    	{
                            xtype: 'panel',
                            title: '일반분개',
                            itemId: 'grid1',
                            layout: {
						        type: 'vbox',
						        align: 'stretch'
						    },
						    flex:1,
                            items: [
                            	{
				                    xtype: 'gridpanel',
				                    id:'Menu01_Grid',
				                    border:0,
				                    enableColumnMove : false,
				                    flex:1,
				                    autoScroll:true,
				                    store: StoreInfo.Menu01_Grid,
				                    loadMask: true,
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
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_m',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '월',
				                            editor: {
				                            	xtype: 'numberfield',
								                allowBlank: false,
								                selectOnFocus:true,
								                minValue: 1,
								                maxValue: 12,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
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
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_d',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '일',
				                            editor: {
				                            	xtype: 'numberfield',
								                allowBlank: false,
								                selectOnFocus:true,
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
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_view_gubun',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '거래구분',
								            width: 100,
								            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = '';
				                            	if(value)
				                            	{
				                            		var codeRecord = StoreInfo.JP_KBN.findRecord('CODE', value, null, null, null, true);
				                            		if(codeRecord) showText = codeRecord.get('TEXT');
				                            	}
												return showText ;
				                            },
								            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.JP_KBN,
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
                                            id: 'Menu30_Grid1_MatchCustomerId',
                                            dataIndex: 'match_customer_id',
                                            style: 'text-align:center',
                                            width: 100,
                                            sortable: false,
                                            text: '통장코드',
                                            hidden: true,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var code = Ext.String.leftPad(value, 5, '0');
                                                var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
                                                if(codeRecord) return code+" "+codeRecord.get('tr_nm');
                                            },
                                            editor: new Ext.create('Ext.form.ComboBox', {
                                                store: StoreInfo.Menu09_Grid,
                                                autoSelect: false,
                                                minChars: 1,
                                                selectOnFocus: true,
                                                hideTrigger: true,
                                                queryMode: 'local',
                                                displayField: 'tr_nm',
                                                valueField: 'customer_id',
                                                enableKeyEvents : true,
                                                listeners: {
                                                    keydown: {
                                                        fn: function(field, e, options) {
                                                            if(e.getKey()==113){
                                                                var pop = Ext.create('Common_Pop_Trds_Search');
                                                                var grid = Ext.getCmp('Menu01_Grid');
                                                                grid.getPlugin().cancelEdit();
                                                                pop.grid = grid;
                                                                pop.record = grid.getSelectionModel().getSelection()[0];
                                                                pop.dataIndex = 'match_customer_id';
                                                                
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
				                            dataIndex: 'jakmok_code',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '작목',
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
						                                    	var grid = Ext.getCmp('Menu01_Grid');
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
											/*
				                            editor: {
				                            	xtype: 'textfield',
								                selectOnFocus:true,
								                enableKeyEvents : true,
								                listeners: {
						                            keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Jakmok');
						                                    	var grid = Ext.getCmp('Menu01_Grid'); 
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
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '계정과목',
				                            width: 100,
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                        		if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
				                            		if(codeRecord) showText += " "+codeRecord.get('gy_name');
				                            	}
												return showText ;
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu08_Grid,
											    autoSelect: false,
											    selectOnFocus: true,
											    queryMode: 'local',
											    displayField: 'gy_name',
											    valueField: 'gycode',
											    enableKeyEvents : true,
											    listeners: {
											    	keydown: {
						                                fn: function(field, e, options) {
						                                	console.log('1 : e.getKey() --> '+e.getKey());
						                                	
						                                	if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Accounts_Search');
						                                    	var grid = Ext.getCmp('Menu01_Grid'); 
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
						                                    	return false;
						                                    }
						                                }
						                            },
					                                specialkey: {
						                                fn: function(field, e, options) {
						                                	
						                                	console.log('2 : e.getKey() --> '+e.getKey());
						                                	
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
				                            xtype: 'numbercolumn',
				                            dataIndex: 'credit',
				                            width: 100,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            text: '입금',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return (value) ? Ext.util.Format.number(value, '0,000') : '';
                                            },
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												enableKeyEvents : true,
								                listeners: {
													change: Global.formatAm,
													specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            /*
				                            editor: {
				                            	xtype: 'numberfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												minValue: 0,
												enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
				        										//field.fireEvent('specialkey',field, e);
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'debit',
				                            width: 100,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            text: '출금',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return (value) ? Ext.util.Format.number(value, '0,000') : '';
                                            },
				                            editor: {
				                            	xtype: 'textfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												enableKeyEvents : true,
								                listeners: {
													change: Global.formatAm,
													specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            /*
				                            editor: {
				                            	xtype: 'numberfield',
				                            	selectOnFocus:true,
												fieldStyle: 'text-align: right;',
												minValue: 0,
												enableKeyEvents : true,
								                listeners: {
						                            specialkey: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==13){
						                                    	//e.keyCode = e.TAB;
				        										//field.fireEvent('specialkey',field, e);
						                                    	Global.isEnter = true;
						                                    }
						                                }
						                            }
						                        }
				                            }
				                            */
										},
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'customer_id',
				                            style: 'text-align:center',
				                            width: 100,
				                            sortable: false,
				                            text: '거래처',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                        		var code = Ext.String.leftPad(value, 5, '0');
				                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
				                        		if(codeRecord) return code+" "+codeRecord.get('tr_nm');
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu09_Grid,
											    autoSelect: false,
											    minChars: 1,
											    selectOnFocus: true,
											    hideTrigger: true,
											    queryMode: 'local',
											    displayField: 'tr_nm',
											    valueField: 'customer_id',
											    enableKeyEvents : true,
											    listeners: {
											    	keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Trds_Search');
						                                    	var grid = Ext.getCmp('Menu01_Grid');
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
				                            style: 'text-align:center',
				                            sortable: false,
				                            minWidth: 200,
				                            flex:1,
				                            text: '적요',
				                            editor: {
				                            	xtype: 'textfield',
				                            	//style:'IME-MODE:ACTIVE',
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
				                        }
				                    ],
				                    dockedItems: [
										{
											xtype: 'toolbar',
											layout: {
						                        pack: 'end',
						                        type: 'hbox'
						                    },
											dock: 'bottom',
											items: [
											   /*
												{
								               		xtype:'button',
								               		icon:'img/page-first.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNum(Define.FIRST);	
							                                }
							                            }
							                        }
								               	},
												{
								               		xtype:'button',
								               		icon:'img/page-prev.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNum(Define.PREV);	
							                                }
							                            }
							                        }
								               	},
								               	{
								               		xtype:'numberfield',
								               		width: 30,
								               		fieldStyle: 'text-align: right;',
								               		itemId: 'curPage',
								               		hideTrigger: true,
								               		minValue: 1,
								               		listeners: {
							                            specialkey: {
							                                fn: function(field, e, options) {
							                                    if(e.getKey()==13){
							                                    	me.changePagingNum(0);
							                                    }
							                                }
							                            }
							                        }
								               	},
								               	{
								               		xtype:'label',
								               		style:'font-size:12px;',
								               		text:'/'
								               	},
								               	{
								               		xtype:'label',
								               		style:'font-size:12px;',
								               		itemId: 'maxPage'
								               	},
								               	{
								               		xtype:'button',
								               		icon:'img/page-next.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNum(Define.NEXT);	
							                                }
							                            }
							                        }
								               	},
								               	{
								               		xtype:'button',
								               		icon:'img/page-last.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNum(Define.LAST);	
							                                }
							                            }
							                        }
								               	},
								               	*/
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
                                                        id: 'sum_credit1',
                                                        fieldLabel: '입금합계',
                                                        flex: 1,
                                                        labelAlign:'right',
                                                        readOnly: true,
                                                        hidden: true,
                                                        labelSeparator: '',
                                                        labelWidth: 50,
                                                        cls:'bottomChild'
                                                    },
                                                    {
                                                        xtype: 'textfield', 
                                                        id: 'sum_debit1',
                                                        fieldLabel: '출금합계',
                                                        flex: 1,
                                                        labelAlign:'right',
                                                        readOnly: true,
                                                        hidden: true,
                                                        labelSeparator: '',
                                                        labelWidth: 50,
                                                        cls:'bottomChild'
                                                    }]
                                                },
                                                {
                                                    xtype:'button',
                                                    text: '전표조회',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onPopup_DetailSearch,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype:'textfield',
                                                    flex: 1,
                                                    id:'munu01_helpText',
                                                    fieldCls: 'toolbar_field_help',
                                                    cls:'bottomChild',
                                                    readOnly : true
                                                },
								               	{
								               		xtype:'button',
								               		id: 'btnSaveGrid1',
								               		text: '저장',
								               		cls:'bottomChild',
								               		listeners: {
							                            click: {
							                                fn: me.onSaveBtn_Click,
							                                scope: me
							                            }
							                        }
						
								               	},
								               	{
								               		xtype:'button',
								               		id: 'btnDelGrid1',
								               		text: '삭제',
								               		cls:'bottomChild',
								               		listeners: {
							                            click: {
							                                fn: me.onDeletBtn_Click,
							                                scope: me
							                            }
							                        }
								               	},
												{
								               		xtype:'button',
								               		text: '인쇄',
								               		cls:'bottomChild',
								               		handler : function(){
								               			var subDate = '';
								               			if(me.from) subDate = Global.makeSubTitle(me.from, me.to);
								               			else
								               			{
								               				var year = ValidateFunc.checkYear(Ext.getCmp('menu01_year'));
				    										var month = ValidateFunc.checkMonth(Ext.getCmp('menu01_month'));
								               				subDate = '('+year+'.'+month+')';
								               			}
								               			Ext.ux.grid.Printer.mainTitle = '[ 분개장 ]';
								               			Ext.ux.grid.Printer.subDate = subDate;
										            	Ext.ux.grid.Printer.print(this.up().up());
										            }
								               	},
								               	{
								               		xtype: 'exporterbutton',
								               		downloadName: '분개장',
								               		cls:'bottomChild'
								               	}
											]
										}
									],
				                    selModel: Ext.create('Ext.selection.CheckboxModel', {
				                    	pruneRemoved: false,
				                    	checkOnly: true,
				                		mode: 'MULTI' 
				                    }),
				                    plugins: [         
										Ext.create('Ext.grid.plugin.CellEditing',         
										{             
										    clicksToEdit: 1,
									        listeners: {
									        	beforeedit:{
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
										}),
										Ext.create('Ext.grid.plugin.BufferedRenderer', {
										})
									],
									listeners: {
                                        select: {
                                            fn: me.onGrid1panelSelect,
                                            scope: me
                                        }
                                    }
				                }
				            ]
                       	},
                    	{
                            xtype: 'panel',
                            title: '계좌입력',
                            itemId: 'grid2',
                            hidden: true,
                            layout: {
						        type: 'vbox',
						        align: 'stretch'
						    },
						    flex:1,
                            items: [
                            	{
				                    xtype: 'gridpanel',
				                    id:'Menu01_Grid2',
				                    border:0,
				                    enableColumnMove : false,
				                    flex:1,
				                    autoScroll:true,
				                    store: StoreInfo.Menu01_Grid2,
				                    loadMask: true,
				                    viewConfig: {
				                    	trackOver: false,
									    getRowClass: function(record, rowIndex, rowParams, store){
									    	var cls = "row-error";
									    	var groupId = record.get('jp_group');
								    		if(groupId)
								    		{
								    			var index = Global.groupIdArr2.indexOf(groupId);
								    			if(index < 0)
								    			{
								    				Global.groupIdArr2.push(groupId);
								    				index = Global.groupIdArr2.indexOf(groupId);
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
				                    columns: [
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_m',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '월'
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_date_d',
				                            width: 50,
				                            sortable: false,
				                            align: 'center',
				                            format: '0',
				                            text: '일'
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jp_view_gubun',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '거래구분',
								            width: 100,
								            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = '';
				                            	if(value)
				                            	{
				                            		var codeRecord = StoreInfo.JP_KBN.findRecord('CODE', value, null, null, null, true);
				                            		if(codeRecord) showText = codeRecord.get('TEXT');
				                            	}
												return showText ;
				                            }
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'jakmok_code',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '작목',
				                            width: 100,
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                            	if(value)
				                            	{
				                            		var code = Ext.String.leftPad(value, 2, '0');
				                            		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', code, null, null, null, true);
				                            		if(codeRecord) showText = code+" "+codeRecord.get('jakmok_name');
				                            	}
												return showText;
				                            }
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'gycode',
				                            sortable: false,
				                            style: 'text-align:center',
				                            text: '계정과목',
				                            width: 100,
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                            	var showText = value;
				                        		if(value)
				                            	{
				                            		var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', value, null, null, null, true);
				                            		if(codeRecord) showText += " "+codeRecord.get('gy_name');
				                            	}
												return showText ;
				                            }
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'credit',
				                            width: 100,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            text: '대변',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return (value) ? Ext.util.Format.number(value, '0,000') : '';
                                            },
				                        },
				                        {
				                            xtype: 'numbercolumn',
				                            dataIndex: 'debit',
				                            width: 100,
				                            sortable: false,
				                            style: 'text-align:center',
				                            align: 'right',
				                            text: '차변',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return (value) ? Ext.util.Format.number(value, '0,000') : '';
                                            },
				                        },
				                        {
				                            xtype: 'gridcolumn',
				                            dataIndex: 'customer_id',
				                            style: 'text-align:center',
				                            width: 100,
				                            sortable: false,
				                            text: '거래처',
				                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				                        		var code = Ext.String.leftPad(value, 5, '0');
				                        		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
				                        		if(codeRecord) return code+" "+codeRecord.get('tr_nm');
				                            },
				                            editor: new Ext.create('Ext.form.ComboBox', {
											    store: StoreInfo.Menu09_Grid,
											    autoSelect: false,
											    minChars: 1,
											    selectOnFocus: true,
											    hideTrigger: true,  
											    queryMode: 'local',
											    displayField: 'tr_nm',
											    valueField: 'customer_id',
											    enableKeyEvents : true,
											    listeners: {
											    	keydown: {
						                                fn: function(field, e, options) {
						                                    if(e.getKey()==113){
						                                    	var pop = Ext.create('Common_Pop_Trds');
						                                    	var grid = Ext.getCmp('Menu01_Grid2');
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
				                            style: 'text-align:center',
				                            sortable: false,
				                            minWidth: 200,
				                            flex:1,
				                            text: '적요',
				                        }
				                    ],
				                    dockedItems: [
										{
											xtype: 'toolbar',
											layout: {
						                        pack: 'end',
						                        type: 'hbox'
						                    },
											dock: 'bottom',
											items: [
											/*
												{
								               		xtype:'button',
								               		icon:'img/page-first.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNumGrid2(Define.FIRST);	
							                                }
							                            }
							                        }
								               	},
												{
								               		xtype:'button',
								               		icon:'img/page-prev.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNumGrid2(Define.PREV);	
							                                }
							                            }
							                        }
								               	},
								               	{
								               		xtype:'numberfield',
								               		width: 30,
								               		fieldStyle: 'text-align: right;',
								               		itemId: 'curPageGrid2',
								               		hideTrigger: true,
								               		minValue: 1,
								               		listeners: {
							                            specialkey: {
							                                fn: function(field, e, options) {
							                                    if(e.getKey()==13){
							                                    	me.changePagingNumGrid2(0);
							                                    }
							                                }
							                            }
							                        }
								               	},
								               	{
								               		xtype:'label',
								               		style:'font-size:12px;',
								               		text:'/'
								               	},
								               	{
								               		xtype:'label',
								               		style:'font-size:12px;',
								               		itemId: 'maxPageGrid2'
								               	},
								               	{
								               		xtype:'button',
								               		icon:'img/page-next.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNumGrid2(Define.NEXT);	
							                                }
							                            }
							                        }
								               	},
								               	{
								               		xtype:'button',
								               		icon:'img/page-last.gif',
								               		listeners: {
							                            click: {
							                                fn: function(){
							                                	me.changePagingNumGrid2(Define.LAST);	
							                                }
							                            }
							                        }
								               	},
								               	*/
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
                                                        id: 'sum_credit2',
                                                        fieldLabel: '대변합계',
                                                        flex: 1,
                                                        labelAlign:'right',
                                                        readOnly: true,
                                                        hidden: true,
                                                        labelSeparator: '',
                                                        labelWidth: 50,
                                                        cls:'bottomChild'
                                                    },
                                                    {
                                                        xtype: 'textfield', 
                                                        id: 'sum_debit2',
                                                        flex: 1,
                                                        fieldLabel: '차변합계',
                                                        labelAlign:'right',
                                                        readOnly: true,
                                                        hidden: true,
                                                        labelSeparator: '',
                                                        labelWidth: 50,
                                                        cls:'bottomChild'
                                                    }]
                                                },
                                                {
                                                    xtype:'button',
                                                    text: '전표조회',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onPopup_DetailSearch,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype:'textfield',
                                                    flex: 1,
                                                    fieldCls: 'toolbar_field_help',
                                                    cls:'bottomChild',
                                                    readOnly : true
                                                },
								               	{
								               		xtype:'button',
								               		id: 'btnSaveGrid2',
								               		text: '저장',
								               		cls:'bottomChild',
								               		listeners: {
							                            click: {
							                                fn: me.onSaveGrid2_Click,
							                                scope: me
							                            }
							                        }
						
								               	},
												{
								               		xtype:'button',
								               		text: '인쇄',
								               		cls:'bottomChild',
								               		handler : function(){
								               			var subDate = '';
								               			if(me.fromGrid2) subDate = Global.makeSubTitle(me.fromGrid2, me.toGrid2);
								               			else
								               			{
								               				var year = ValidateFunc.checkYear(Ext.getCmp('menu01_year'));
				    										var month = ValidateFunc.checkMonth(Ext.getCmp('menu01_month'));
								               				subDate = '('+year+'.'+month+')';
								               			}
								               			Ext.ux.grid.Printer.mainTitle = '[ 복식부기 ]';
								               			Ext.ux.grid.Printer.subDate = subDate;
										            	Ext.ux.grid.Printer.print(this.up().up());
										            }
								               	},
								               	{
								               		xtype: 'exporterbutton',
								               		downloadName: '복식부기',
								               		cls:'bottomChild'
								               	}
											]
										}
									],
									selModel: Ext.create('Ext.selection.CheckboxModel', {
				                    	pruneRemoved: false,
				                    	checkOnly: true,
				                		mode: 'MULTI' 
				                    }),
				                    plugins: [         
										Ext.create('Ext.grid.plugin.CellEditing',         
										{             
										    clicksToEdit: 1,
									        listeners: {
									        	beforeedit:{
									        		fn: me.onBeforeEditGrid2,
									        		scope: me 
								              	},
									            edit:{
									        		fn: me.onAfterEditGrid2,
									        		scope: me 
								              	},
								              	canceledit: function (editor, e, eOpts) {
											    	Global.cellPos = {row: e.rowIdx, column: e.colIdx};
											    } 
									        }         
										}),
										Ext.create('Ext.grid.plugin.BufferedRenderer', {
										})
									]
				               	}
                            ]
                        }
                    ],
                    listeners: {
                        tabchange: {
                            fn: me.onTabpanelTabChange,
                            scope: me
                        }
                    }
                },
                { //전표 그리드
                    xtype: 'gridpanel',
                    id: 'Menu01_Grid3',
                    margin: '5px 0 0 0',
                    height: 90,
                    autoScroll: true,
                    loadMask: true,
                    enableColumnMove: false,
                    store: StoreInfo.Menu01_Grid3,
                    hidden: true,
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
                                var codeRecord = StoreInfo.JP_KBN.findRecord('CODE', value, null, null, null, true);
                                if(codeRecord) showText = codeRecord.get('TEXT');
                            }
                            return showText ;
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'jakmok_code',
                        sortable: false,
                        style: 'text-align:center',
                        text: '작목',
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
                        }
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
                        }
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
                        }
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'jp_rem',
                        style: {'text-align': 'center'},
                        text: '적요',
                        flex: 1
                    }],
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                },
                beforehide: {
                    fn: me.onContainerBeforeHide,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    
    
//***************************************  컨트롤러 ***************************************//

    //사라지기전 작성중인 데이터 저장 처리
    onContainerBeforeHide: function(component, eOpts) {
    	this.doSave(false);
    },
    
    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
    	this.curTab = newCard;
    	if(!newCard.isCall)
    	{
    		if(newCard.itemId == 'grid1')
    		{
    			this.onMenu01_SearchBtnClick();	
    		}
    		else
    		{
    			this.onMenu01_Grid2BtnClick();
    		}
    		newCard.isCall = true;
    	}
    },

	//화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
    	Global.groupIdArr = [-1];
    	var now = new Date();
		Ext.getCmp('menu01_year').setValue(now.getFullYear());
		Ext.getCmp('menu01_month').setValue(now.getMonth()+1);
		//this.down('#curPage').setValue(1);
		this.curTab = this.down('tabpanel').getActiveTab();
		this.curTab.isCall = true;
		this.year = now.getFullYear();
        this.onMenu01_SearchBtnClick();
    },
    
    tempRowInit: function()
    {
    	var store = StoreInfo.Menu01_Grid;
    	var strCnt = store.getCount(); 
    	var now = new Date();
    	if(strCnt < 1)
    	{
    		store.add({
				'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
				'jp_view_gubun': 1, 'jp_date_m': now.getMonth()+1, 'jp_date_d': now.getDate(), 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
			});
    	}
    	else
    	{
    		if(store.last().get('valid') == 11)
    		{
    			store.add({
					'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
					'jp_view_gubun': 1, 'jp_date_m': now.getMonth()+1, 'jp_date_d': now.getDate(), 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
				});
    		}
    	}
    	store.commitChanges();
		
    },
    
    //그리드 상세데이터를 수정하기 전 valid 체크
    onBeforeEditCheck: function(editor, e, eOpts) {
        //마감년도일 경우 추가 수정 안되게 막기
        if (this.isCloseYear(this.year)) return false;
        
        //통장코드입력 여부 및 거래구분에 따라 통장코드 입력 막기
        if (e.field == 'match_customer_id') {
            if (e.record.get('jp_view_gubun') < 5 || e.record.get('jp_view_gubun') > 8) {
                if (Global.isEnter) {
                    editor.startEditByPosition({row: e.rowIdx, column: e.colIdx+1});
                    Global.isEnter = false;
                }
            }
        }
        
        //자동분개인 경우 수정이 안되게 막기
		if (parseInt(e.record.get('jp_no'),10) > 4999)
		{
		    this.setHelpText('disable');
            return false;
		}
		else if(!e.record.get('gycode'))
		{
			if(e.field == 'debit' || e.field == 'credit' || e.field == 'customer_id' || e.field == 'jp_rem')
			{
				editor.startEditByPosition({row: e.rowIdx, column: 4});
				return false;
    		}
		}
		else
		{
			this.setHelpText(e.field);
			
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
		}
	},
	
	//수정시 화면 하단에 헬프 문구를 셋팅
	setHelpText: function(type)
	{
		var helpText = '';
		switch(type)
		{
			case 'jp_date_m':
			case 'jp_date_d':
				helpText = '엔터를 누르면 현재의 월, 일이 표시됩니다.';
			break;
			case 'jp_view_gubun':
				helpText = '출금 =1, 입금=2를 입력하거나, 옆의 단추를 눌러 선택하십시오.';
			break;
			case 'jakmok_code':
				helpText = '작목코드를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.';
			break;
			case 'gycode':
				helpText = '계정코드를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.';
			break;
			case 'debit':
			case 'credit':
				helpText = '금액을 콤마 없이 입력하십시오.';
			break;
			case 'customer_id':
				helpText = '거래처코드를 입력하십시오. 모르면 F2키를 눌러 보조화면에서 선택하십시오.';
			break;
			case 'jp_rem':
				helpText = '비망사항 입력 후 엔터를 누르면 새로운 줄이 추가됩니다.';
			break;
			case 'disable':
                helpText = '수정 불가능한 전표입니다.';
            break;
		}
		Ext.getCmp('munu01_helpText').setValue(helpText);
				               		
	},
	
	//그리드 상세데이터를 수정한 후 체크로직
	onAfterEditCheck: function (editor, e, eOpts) {
		var movePos = null;	//다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
    	var groupId = e.record.get('jp_group');
    	var gubun = e.record.get('jp_view_gubun');
    	
    	//1. 거래 구분변경일 경우 입금(1)/출금(2)여부에 따라서 jp_gubun_type을 셋팅해주고 기존 데이터를 클리어
    	if(e.field == 'jp_view_gubun'){
    		var gycodeModiText = ValidateFunc.gycodeValidByGubun(e.record, e.record.get('gycode'));
    		if(gycodeModiText != '')
    		{
    			e.record.set('jp_view_gubun', e.originalValue);
    			Ext.Msg.alert("", gycodeModiText);
    			return false;
    		}
    		
    		if(gubun == 8 || gubun == 10) e.record.set('gycode', 301);
    		
    		var codeRec = StoreInfo.JP_KBN.findRecord('CODE', e.value, null, null, null, true);
    		if(!codeRec) e.record.set('jp_view_gubun', e.originalValue);
    		else
    		{
    			//거래구분이 3~4일 경우 다른 구분으로 바뀔수 없음 
	    		if(groupId && groupId != -1)
	    		{
	    			if(e.value == 3 || e.value == 4){}
	    			else
	    			{
	    				e.record.set('jp_view_gubun', e.originalValue);
	    				Ext.Msg.alert("", '거래구분을 변경할 수 없습니다.');
	    				return false;
	    			}	
	    		} 
	    		else if(e.record.get('jp_id'))
	    		{
	    			if(e.value == 3 || e.value == 4)
	    			{
	    				e.record.set('jp_view_gubun', e.originalValue);
	    				Ext.Msg.alert("", '거래구분을 변경할 수 없습니다.');
	    				return false;
	    			}
	    		}
	    		
	    		var type = codeRec.get('TYPE');
	    		e.record.set('jp_gubun_type', type);
	    		if(type == 1) e.record.set('debit', '');
	    		else if(type == 2) e.record.set('credit', '');
    			
    		}
    	}
    	
    	//날짜 변경시 그룹아이디가 존재하면 그룹전체의 날짜를 동일하게 변경
    	else if(e.field == 'jp_date_m' || e.field == 'jp_date_d')
    	{
    		if(groupId)	ValidateFunc.syncGroupDate(e.record.get('jp_date_m'), e.record.get('jp_date_d'), groupId); 
    	}
    	
    	//계정코드 벨리데이션
    	else if(e.field == 'gycode')
    	{
    	    if(e.value)
    		{
    			var gycodeModiText = ValidateFunc.gycodeValidByGubun(e.record, e.value);
	    		if(gycodeModiText != '')
	    		{
	    			e.record.set('gycode', e.originalValue);
	    			Ext.Msg.alert("", gycodeModiText);
	    			return false;
	    		} 
	    		else
	    		{
	    			var codeRecord = StoreInfo.Menu08_Grid.findRecord('gycode', e.value, null, null, null, true);
	        		if(codeRecord) ValidateFunc.changeValidAt(e.record, 0, 10);
	        		else
	        		{
	        			var codeRecord = StoreInfo.Menu08_Grid.findRecord('gy_name', e.value, null, null, null, true);
		    			if(!codeRecord) e.record.set('gycode', e.originalValue);
			    		else
			    		{
			    			e.record.set('gycode', codeRecord.get('gycode'));
			    			ValidateFunc.changeValidAt(e.record, 0, 10);
			    		}  
	        		}  
	    		} 
    		}
    		else e.record.set('gycode', e.originalValue);
    	}
    	//작목코드 벨리데이션
    	else if(e.field == 'jakmok_code')
    	{
    		if(e.value)
    		{
    			var code = Ext.String.leftPad(e.value, 2, '0');
	    		var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_code', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			var codeRecord = StoreInfo.Menu10_Grid.findRecord('jakmok_name', e.value, null, null, null, true);
	    			if(!codeRecord)
		    		{
		    			if(e.value == '') e.record.set('jakmok_code', '');
		    			else e.record.set('jakmok_code', e.originalValue); 
		    		}
		    		else e.record.set('jakmok_code', codeRecord.get('jakmok_code')); 
	    		}	
    		}
    		else e.record.set('jakmok_code', '');
    	}
    	
    	//거래처코드 벨리데이션
    	else if(e.field == 'customer_id')
    	{
    		if(e.value)
    		{
    			var code = Ext.String.leftPad(e.value, 5, '0');
	    		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			var codeRecord = StoreInfo.Menu09_Grid.findRecord('tr_nm', e.value, null, null, null, true);
	    			if(!codeRecord)
		    		{
		    			if(e.value == undefined || e.value == '') e.record.set('customer_id', '');
		    			else e.record.set('customer_id', e.originalValue);
		    		} 
	    			else e.record.set('customer_id', codeRecord.get('customer_id'));
	    		}
    		}
    		else e.record.set('customer_id', '');
    	}
    	
    	//출금 벨리데이션
    	else if(e.field == 'debit')
    	{
    		var debNum = parseInt((e.record.get('debit')+'').replace(/,/g, ''), 10);
    		if(!debNum) debNum = 0;
    		e.record.set('debit', debNum);
    		//합계 금액 셋팅
            this.setSumAmount(1, StoreInfo.Menu01_Grid);
    	}
    		
    	//입금 벨리데이션
    	else if(e.field == 'credit')
    	{
    		var creNum = parseInt((e.record.get('credit')+'').replace(/,/g, ''), 10);
    		if(!creNum) creNum = 0;
    		e.record.set('credit', creNum);
    		//합계 금액 셋팅
            this.setSumAmount(1, StoreInfo.Menu01_Grid);
    	}
    		
    	
		//2. 입금(1)/출금(2)여부에 따라서 금액이 0원인지를 체크		                    	
    	var type = e.record.get('jp_gubun_type');
    	
    	var debAm = parseInt(e.record.get('debit'), 10);
    	var creAm = parseInt(e.record.get('credit'), 10);
    	if(!debAm) debAm = 0;
    	if(!creAm) creAm = 0;
    	var checkAm = 0;
    	if(type == 2) checkAm = debAm;
    	else if(type == 1) checkAm = creAm;
    	
    	if(checkAm != 0) ValidateFunc.changeValidAt(e.record, 1, 1);
		else ValidateFunc.changeValidAt(e.record, 1, 2);
		
    	//3. 거래구분이 3~4일경우 그룹id 생성 및 합계금액 일치여부 판단
		if(gubun == 3 || gubun == 4)
		{
			//전표아이디가 없거나 그룹번호가 없으면 공통그룹번호 -1을 셋팅해줌 
			if(!e.record.get('jp_id') && !groupId)	e.record.set('jp_group', -1);
			ValidateFunc.checkGroupSum(e.grid.getStore(), groupId);
			ValidateFunc.syncGroupDate(e.record.get('jp_date_m'), e.record.get('jp_date_d'), groupId);
    	}
		else e.record.set('jp_group', '');
		
		//4. 적요입력을 완료했을때 줄바꾸면서 column: 1부터 다시 에디트 포커스 주기		                    		
        if(Global.isEnter)
        {
        	//extjs4.2에서의 e.colIdx와 4.2 미만 버전의 e.colIdx는 1씩 차이가남
    		if(e.grid.columns.length == e.colIdx){
    			
    			//5. 컨트롤키를 누르고 엔터를 눌렀을시 중간에 행삽입
    			if(Global.isCtrl)
				{
					if(gubun == 3 || gubun == 4)
					{
						var now = new Date();
						Ext.getCmp('Menu01_Grid').getStore().insert(e.rowIdx+1, { 
							'jp_id' : '', 'jp_yyyymmdd' : e.record.get('jp_yyyymmdd'), 'jp_no' : e.record.get('jp_no'), 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
							'jp_view_gubun': gubun, 'jp_date_m': e.record.get('jp_date_m'), 'jp_date_d': e.record.get('jp_date_d'), 'jp_gubun_type': e.record.get('jp_gubun_type'), 'jp_group': e.record.get('jp_group'),  'valid': 22
						});	
						
						if(groupId)
						{
							ValidateFunc.checkGroupSum(e.grid.getStore(), groupId);
							ValidateFunc.syncGroupDate(e.record.get('jp_date_m'), e.record.get('jp_date_d'), groupId);	
						}
					}
				}
				else
				{
					if(e.grid.getStore().getCount() == (e.rowIdx+1))
					{
						var now = new Date();
    					Ext.getCmp('Menu01_Grid').getStore().insert(e.rowIdx+1, {
    						'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
							'jp_view_gubun': gubun, 'jp_date_m': e.record.get('jp_date_m'), 'jp_date_d': e.record.get('jp_date_d'), 'jp_gubun_type':  e.record.get('jp_gubun_type'), 'jp_group': '',  'valid': 22
						});	
					}
				}
    			movePos = {row: e.rowIdx+1, column: 1};
    		} 
    		else
    		{
    			//extjs4.2 두번 호출되는 버그로 인한 대응( 4.2 미만 버전은 e.colIdx+1만 해주면됌)
    			if(Global.isModified)
    			{
    				if(e.field == 'debit') {
    				    movePos = {row: e.rowIdx, column: e.colIdx};
    				}
    				else if(e.field == 'credit') {
    				    movePos = {row: e.rowIdx, column: e.colIdx+2};
    				}
    				
    				Global.isModified = false;
    			}
    			else movePos = {row: e.rowIdx, column: e.colIdx+1};
    		} 
    		editor.startEditByPosition(movePos);
        } 
        Global.isEnter = false;
        return true;
   	},
   
    //상세 전표조회 버튼을 눌렀을시
    onPopup_DetailSearch: function(button, e, eOpts) {
    	var detPop = Ext.create('Common_Pop_Search');
    	detPop.preComp = this;
    	Global.openPopup(detPop);
    },
    
    //페이징툴바에서 버튼을 눌렀을경우
    changePagingNum: function(btnType)
    {
    	var pageInput = this.down('#curPage');
    	var curNum = pageInput.getValue();
    	if(!curNum) curNum = 1;
    	
    	if(btnType == Define.FIRST) curNum = 1;
    	else if(btnType == Define.PREV)
    	{
    		curNum--;
    		if(curNum < 1) curNum = 1; 
    	}
    	else if(btnType == Define.NEXT)
    	{
    		curNum++;
    		if(curNum > this.MAXPAGE ) curNum = this.MAXPAGE;
    	}
    	else if(btnType == Define.LAST) curNum = this.MAXPAGE;
    	if(this.searchValues) this.searchDetail(curNum);
    	else this.onMenu01_SearchBtnClick(null, null, null, curNum); 
    },
	
	//페이징툴바 Max 페이지를 셋팅    
    settingMaxPage: function(totCnt){
    	this.MAXPAGE = Math.ceil(totCnt/Define.PAGESIZE);
    	if(this.MAXPAGE < 1){
    		this.down('#curPage').setValue(1);
    		this.MAXPAGE = 1;
    	}  
    	this.down('#maxPage').setText(this.MAXPAGE);
    },
    
    //전표 상세조회
    searchDetail: function(page){
    	
    	/*
    	var thisObj = this;
		var values = this.searchValues;
		
		this.down('#curPage').setValue(page);
		
		var fromDt = values.search_date_from.replace(/-/g,"");
		var toDt = values.search_date_to.replace(/-/g,"");
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/junpyo/junpyo_pagingsearch_proc.php',
			params: {
				from_jp_yyyymmdd: fromDt,
				to_jp_yyyymmdd: toDt,
				jp_view_gubun: values.jp_view_gubun,
				jakmok_code: values.jakmok_code,
				gycode: values.gycode,
				min_amt: values.min_amt,
				max_amt: values.max_amt,
				customer_id: values.customer_id,
				jp_rem: values.jp_rem,
				page: page,
				size: Define.PAGESIZE
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					var now = new Date();
					StoreInfo.Menu01_Grid.removeAll();
                	StoreInfo.Menu01_Grid.add(json.DATA.reverse());
                	StoreInfo.Menu01_Grid.commitChanges();
                	StoreInfo.Menu01_Grid.add(
						{
							'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
							'jp_view_gubun': 1, 'jp_date_m': now.getMonth()+1, 'jp_date_d': now.getDate(), 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
						}
					);
					thisObj.from = fromDt;
					thisObj.to = toDt;
					thisObj.settingMaxPage(json.TOTAL);
				}
				else{
					Ext.Msg.alert("", '검색 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
		*/
		
		var thisObj = this;
		var values = this.searchValues;
		
		var fromDt = values.search_date_from.replace(/-/g,"");
		var toDt = values.search_date_to.replace(/-/g,"");
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			//url: './proc/account/junpyo/junpyo_search_proc.php',
			url: './proc/account/junpyo/junpyo_search_adv_proc.php',
			params: {
				from_jp_yyyymmdd: fromDt,
				to_jp_yyyymmdd: toDt,
				jp_view_gubun: values.jp_view_gubun,
				jakmok_code: values.jakmok_code,
				gycode: values.gycode,
				min_amt: values.min_amt,
				max_amt: values.max_amt,
				customer_id: values.customer_id,
				jp_rem: values.jp_rem,
			},
			success: function(response, opts) {
			    if (Global.mask) Global.hideMask();
			    var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
				    var now = new Date();
					StoreInfo.Menu01_Grid.removeAll();
                	StoreInfo.Menu01_Grid.add(json.DATA.reverse());
                	
                	//마감년도 체크
                    thisObj.year = fromDt.substring(0, 4);
                    var check = thisObj.isCloseYear(thisObj.year);
                    
                    //마감년도 그리드 셋팅
                    thisObj.setGridStyle(Ext.getCmp('Menu01_Grid'), 1, check);
                    
                    //마감년도가 아닐 경우 로우 추가
                    if (!check) {
                        StoreInfo.Menu01_Grid.add({
                            'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
                            'jp_view_gubun': 1, 'jp_date_m': now.getMonth()+1, 'jp_date_d': now.getDate(), 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
                        });
                    }
                    StoreInfo.Menu01_Grid.commitChanges();
                    
                    thisObj.from = fromDt;
                    thisObj.to = toDt;
                	
					//합계금액 셋팅
					Ext.getCmp('sum_credit1').show();
                    Ext.getCmp('sum_debit1').show();
                    thisObj.setSumAmount(1, StoreInfo.Menu01_Grid);
                }
				else{
					Ext.Msg.alert("", '검색 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});
		
	},
	
	//활성화된 탭에 따른 검색 함수 다르게 호출
	onMenu01_SearchKbn: function()
	{
		//검색여부 초기화
		Ext.each(this.curTab.up().items.items, function(tab){
			tab.isCall = null;
		});
		if(this.curTab.itemId == 'grid2') {
		    this.onMenu01_Grid2BtnClick();
		}
		else {
		    this.onMenu01_SearchBtnClick();
		}
		this.curTab.isCall = true;
	},
    
    //조회버튼을 눌렀을 경우
    onMenu01_SearchBtnClick: function(button, e, eOpts, page) {
    	//페이징 처리
    	/*
    	//Global.excelTitle = '테스트엑셀타이틀';
    	
    	var thisObj = this;
    	
    	//전표상제 조회가 아니면 this.preComp 널 셋팅(출력시 타이틀 셋팅하기위해 필요) 
    	this.from = null;
    	this.to = null;
    	
    	var year = ValidateFunc.checkYear(Ext.getCmp('menu01_year'));
    	var month = ValidateFunc.checkMonth(Ext.getCmp('menu01_month'));
    	
    	if(year && month)
    	{
    		var date = year+month;
    		if(date.length == 6)
    		{
    			if(!page) page = 1;
    			this.down('#curPage').setValue(page);
    			
    			Global.showMask(Ext.getBody());
				Ext.Ajax.request({
					method: 'POST',
					url: './proc/account/junpyo/junpyo_paginglist_proc.php',
					params: {
						jp_yyyymm: date,
						page: page,
						size: Define.PAGESIZE
					},
					success: function(response, opts) {
						//console.log(response.responseText);
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
							var store = StoreInfo.Menu01_Grid;
							store.removeAll();
							store.add(json.DATA.reverse());
							thisObj.settingMaxPage(json.TOTAL);
							var now = new Date();
	    					store.add({
	    						'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
								'jp_view_gubun': 1, 'jp_date_m': now.getMonth()+1, 'jp_date_d': now.getDate(), 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
							});
							store.commitChanges();	
							thisObj.searchValues = null;
						}
						else{
							Ext.Msg.alert("", '조회 실패! '+json.DATA);
						}
					},
					failure: function(form, action) {
						Global.hideMask();
						Ext.Msg.alert("", '네트 워크 오류!');
					}
				});	
    		}
    		else Ext.Msg.alert("", '날짜를 정확히 입력해주세요');
    	} 
    	else Ext.Msg.alert("", '날짜를 정확히 입력해주세요'); 
    	*/
    	
    	//페이징 처리 안함
    	var thisObj = this;
    	
    	//전표상제 조회가 아니면 this.preComp 널 셋팅(출력시 타이틀 셋팅하기위해 필요) 
    	this.from = null;
    	this.to = null;
    	
    	var year = ValidateFunc.checkYear(Ext.getCmp('menu01_year'));
    	var month = ValidateFunc.checkMonth(Ext.getCmp('menu01_month'));
    	
    	if(year && month)
    	{
    		var date = year+month;
    		if(date.length == 6)
    		{
    			/*
	    		StoreInfo.Menu01_Grid.setProxy({
	    			type: 'ajax',
			        url: './proc/account/junpyo/junpyo_list_proc.php',
			        extraParams: {'jp_yyyymm': date },
			        pageSize: 1,
	                reader: {
	                  type: 'json',
	                  root: 'DATA'
	                }
	    		});
    			StoreInfo.Menu01_Grid.load();
				*/    	
    			Global.showMask(Ext.getBody());
				Ext.Ajax.request({
					method: 'POST',
					//url: './proc/account/junpyo/junpyo_list_proc.php',
					url: './proc/account/junpyo/junpyo_list_adv_proc.php',
					params: {
						jp_yyyymm: date
					},
					success: function(response, opts) {
						if (Global.mask) Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
						    var grid = Ext.getCmp('Menu01_Grid');
							var store = grid.getStore();
							store.removeAll();
							var now = new Date();
							store.add(json.DATA);
							var now = new Date();
							
	    					//마감년도 체크
                            thisObj.year = year;
                            var check = thisObj.isCloseYear(thisObj.year);
                            
                            //마감년도 그리드 셋팅
                            thisObj.setGridStyle(Ext.getCmp('Menu01_Grid'), 1, check);
                            
                            //마감년도가 아닐 경우 로우 추가
                            if (!check) {
                                store.add({
                                    'jp_id' : '', 'jp_yyyymmdd' : '', 'jp_no' : '', 'jakmok_code' : '', 'gycode' : '', 'customer_id' : '', 'debit' : '', 'credit' : '', 'jp_rem' : '', 'jp_match_id' : '',
                                    'jp_view_gubun': 1, 'jp_date_m': now.getMonth()+1, 'jp_date_d': now.getDate(), 'jp_gubun_type': 2, 'jp_group': '',  'valid': 22
                                });
                            }
                            store.commitChanges();
                            
                            //그리드 스크롤 하단으로 이동
                            Global.setGridScrollTop(grid);
                            
                            //합계금액 감추기
                            Ext.getCmp('sum_credit1').hide();
                            Ext.getCmp('sum_debit1').hide();
	    				}
						else{
							Ext.Msg.alert("", '조회 실패! '+json.DATA);
						}
					},
					failure: function(form, action) {
						Global.hideMask();
						Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
					}
				});	
    		}
    		else Ext.Msg.alert("", '날짜를 정확히 입력해주세요');
    	} 
    	else Ext.Msg.alert("", '날짜를 정확히 입력해주세요'); 
    },
    
    //저장 로직
    doSave: function(isSucShow){	//저장성공여부 팝업창 띄울지 여부
        var thisObj = this;
    	var year = Ext.getCmp('menu01_year').getValue();
    	var sucCnt = 0;
    	var param = new Object();
    	var tempGroupId = [];
		var modiArr = StoreInfo.Menu01_Grid.getModifiedRecords();
		modiArr = Global.sortModelArr(modiArr);
		var len =  modiArr.length;
		if(len > 0)
		{
	    	for(var i=0; i<len; i++)
			{
				if(modiArr[i].get('valid') == 11)
				{
					var detailData = [];
					var record = modiArr[i];
					var isMdfDate = false;
					if(record.modified.jp_date_m || record.modified.jp_date_d) isMdfDate = true; 
					var groupId = record.get('jp_group');
					if(groupId)
					{
						var index = tempGroupId.indexOf(groupId);
		    			if(index > -1) continue;
						else
						{
							var resultArr = ValidateFunc.getRecordsByGroupId(StoreInfo.Menu01_Grid, groupId, true);
							for(var j=0; j<resultArr.length; j++)
							{
								var arrRec = resultArr[j];
								detailData.push({
									'row_idx': StoreInfo.Menu01_Grid.indexOf(arrRec),
									'jp_id': arrRec.get('jp_id'),
									'customer_id': arrRec.get('customer_id'),
									'gycode': arrRec.get('gycode'),
									'jakmok_code': arrRec.get('jakmok_code'),
									'jp_no': arrRec.get('jp_no'),
									'jp_view_gubun': arrRec.get('jp_view_gubun'),
									'match_customer_id': arrRec.get('match_customer_id'),
									'jp_rem': arrRec.get('jp_rem'),
									'debit': arrRec.get('debit'),
									'credit': arrRec.get('credit'),
									'jp_match_id': arrRec.get('jp_match_id'),
									'pre_date': (isMdfDate) ? arrRec.get('jp_yyyymmdd') : '',
									'jp_yyyymmdd': year+Ext.String.leftPad(arrRec.get('jp_date_m'), 2, '0')+Ext.String.leftPad(arrRec.get('jp_date_d'), 2, '0')
								});	
							}
							tempGroupId.push(groupId);	
						}
					}
					else
					{
						detailData.push({
							'row_idx': StoreInfo.Menu01_Grid.indexOf(record), 
							'jp_id': record.get('jp_id'),
							'customer_id': record.get('customer_id'),
							'gycode': record.get('gycode'),
							'jakmok_code': record.get('jakmok_code'),
							'jp_no': record.get('jp_no'),
							'jp_view_gubun': record.get('jp_view_gubun'),
							'match_customer_id': record.get('match_customer_id'),
							'jp_rem': record.get('jp_rem'),
							'debit': record.get('debit'),
							'credit': record.get('credit'),
							'jp_match_id': record.get('jp_match_id'),
							'pre_date': (isMdfDate) ? record.get('jp_yyyymmdd') : '',
							'jp_yyyymmdd': year+Ext.String.leftPad(record.get('jp_date_m'), 2, '0')+Ext.String.leftPad(record.get('jp_date_d'), 2, '0')
						});					
					}
					
					param[sucCnt] =  detailData;	
					sucCnt++;
				}
			}
			
			Global.showMask(Ext.getBody());
			
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/account/junpyo/junpyo_reg_proc.php',
				params: {
					data: JSON.stringify(param)
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						thisObj.sucessRowUpdate(json.DATA, isSucShow);
					}
					else{
						Ext.Msg.alert("", '저장 실패 :'+json.DATA);
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
				}
			});	
		}
    },
    
    //서버 전송버튼을 눌렀을 경우
    onSaveBtn_Click: function(button, e, eOpts) {
    	var thisObj = this;
    	
    	//마감년도일 경우 저장할 수 없음
    	if (thisObj.isCloseYear(thisObj.year)) return Ext.Msg.alert("경고", "마감된 년도의 데이터는 저장할 수 없습니다.");
        
		Ext.MessageBox.confirm('경고!', '<span>행 전체가 </span><span style="color:red;">빨간글씨</span><span>로 표시된 것은</span><br>계정과목부터 다시 엔터키를 눌러서,<br>검은색으로 만든 후 저장버튼을 눌러주세요.<br><br>현재까지 입력한 분개장을 저장하시겠습니까?', function(btn){
            if(btn=='yes'){
            	thisObj.doSave(true);
            }
        });
    },
    
	//성공한 데이터는 그리드에 업데이트 실패한 경우가 있을경우 알림창을 띄움	
    sucessRowUpdate: function(data, isSucShow)
    {
    	var failCnt = 0;
    	for(var i=0; i<data.length; i++)
    	{
    		var rowData = data[i];
    		if(rowData.cd == -99 || rowData.cd == -999) failCnt++;
    		else
    		{
				var record = StoreInfo.Menu01_Grid.getAt(rowData.cd);
				
				record.set('jp_id', rowData.jp_id);	
				record.set('jp_match_id', rowData.jp_match_id);	
				record.set('jp_no', rowData.jp_no);
				record.set('jp_yyyymmdd', rowData.jp_yyyymmdd);
				record.commit();		
    		}
    	}
    	this.tempRowInit();
    	if(failCnt > 0) Ext.Msg.alert("", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 저장실패되었습니다.</span>');
    	else{
    		if(isSucShow) Ext.Msg.alert("", '저장되었습니다.');
    	}
    },
    
    //삭제버튼을 눌렀을 경우
    onDeletBtn_Click: function(button, e, eOpts) {
    	var thisObj = this;
    	
    	//마감년도일 경우 삭제할 수 없음
        if (thisObj.isCloseYear(thisObj.year)) return Ext.Msg.alert("경고", "마감된 년도의 데이터는 삭제할 수 없습니다.");
    	
    	var store = StoreInfo.Menu01_Grid;
    	var selRecArr = Ext.getCmp('Menu01_Grid').getSelectionModel().getSelection();
    	var sucCnt = 0;
    	var tempGroupId = [];
    	var localGridIdx = [];
    	var param = new Object();
    	var len = selRecArr.length;
    	if(len > 0)
    	{
    		Ext.MessageBox.confirm('경고!', '<span style="color:red;">그룹으로 묶인정보는 그룹 전체가 삭제됩니다.</span><br>선택한 정보를 삭제하시겠습니까?</span>', function(btn){
	            if(btn=='yes'){
	            	
	            	for(var i=0; i<len; i++)
			    	{
			    		var record = selRecArr[i];
			    		if(parseInt(record.get('jp_no'), 10) > 4999) continue;
			    		
			    		var rowIdx = StoreInfo.Menu01_Grid.indexOf(record);
			    		var groupId = record.get('jp_group');
			    		if(groupId)
						{
							var index = tempGroupId.indexOf(groupId);
			    			if(index > -1) continue;
							else
							{
								if(record.get('jp_id'))
					    		{
					    			param[sucCnt] =  {"jp_yyyymmdd":record.get('jp_yyyymmdd'),"jp_no":record.get('jp_no'), 'row_idx': rowIdx};	
									sucCnt++;
					    		}
					    		else localGridIdx.push(record);		    			
								tempGroupId.push(groupId);
							}
						}
						else
						{
							if(record.get('jp_id'))
							{ 
				    			param[sucCnt] =  {"jp_yyyymmdd":record.get('jp_yyyymmdd'),"jp_no":record.get('jp_no'), 'row_idx': rowIdx};	
								sucCnt++;
				    		}
				    		else localGridIdx.push(record);
						}
			    	}
			    	
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/account/junpyo/junpyo_delete_proc.php',
						params: {
							data: JSON.stringify(param)
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
								thisObj.sucessRowDelete(json.DATA, localGridIdx);
							}
							else{
								Ext.Msg.alert("", '삭제 실패! '+json.DATA);
							}
						},
						failure: function(form, action) {
							Global.hideMask();
							Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
						}
					});	
	            }
	        });
    	}
    	else Ext.Msg.alert("", '삭제할 정보를 선택해주세요.');
    },
    
    //서버삭제에 성공한 데이터는 그리드에서도 삭제, 서버삭제 실패한 경우가 있을경우 알림창을 띄움	
    sucessRowDelete: function(serverData, localData)
    {
    	var thisObj = this;
    	var failCnt = 0;
    	for(var i=0; i<serverData.length; i++)
    	{
    		var rowData = serverData[i];
    		if(rowData.cd == -99 || rowData.cd == -999) failCnt++;
    		else
    		{
				var record = StoreInfo.Menu01_Grid.getAt(rowData.cd);
				localData.push(record);
    		}
    	}
    	for(var i=0; i<localData.length; i++)
    	{
			thisObj.deleteGridData(localData[i]);
    	}
    	thisObj.tempRowInit();
    	if(failCnt > 0) Ext.Msg.alert("", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 삭제실패되었습니다.</span>');
    },
    
    //삭제하는 로직 그룹일경우와 단일일경우 분개
    deleteGridData: function(record)
    {
    	if(record)
    	{
    		var groupId = record.get('jp_group'); 
			if(groupId)
			{
				var resultArr = ValidateFunc.getRecordsByGroupId(StoreInfo.Menu01_Grid, groupId);
				StoreInfo.Menu01_Grid.remove(resultArr);
			}
			else StoreInfo.Menu01_Grid.remove(record);	
    	}
    },
    
    //차대전표 조회
    onGrid1panelSelect: function(model, record, index, eOpts) {
        if (Ext.getCmp('Menu01_isGrid3').getValue())
        { //차대전표보기 체크일 경우
            Global.showMask(Ext.getBody());
        
            Ext.Ajax.request({
                method: 'POST',
                url: './proc/account/junpyo/junpyo_bocksik_transaction_proc.php',
                params: {
                    jp_yyyymmdd: record.get('jp_yyyymmdd'),
                    jp_no: record.get('jp_no')
                },
                success: function(response, opts) {
                    var json = Ext.JSON.decode(response.responseText);
                    
                    if (Global.mask) Global.hideMask();
                    
                    if(json.CODE == '00'){
                        StoreInfo.Menu01_Grid3.removeAll();
                        StoreInfo.Menu01_Grid3.add(json.DATA.reverse());
                    }
                    else{
                        Ext.Msg.alert("경고", '차대전표 검색 실패!' + json.DATA);
                    }
                },
                failure: function(form, action) {
                    Global.hideMask();
                    Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
                }
            });
        } 
    },
    
    /***********************************   복식부기 그리드 컨트롤러    ***********************************/
   
   //복식부기 데이터 호출
    onMenu01_Grid2BtnClick: function(button, e, eOpts, page) {
    	/*
    	var thisObj = this;
    	
    	//전표상제 조회가 아니면 this.preComp 널 셋팅(출력시 타이틀 셋팅하기위해 필요) 
    	this.fromGrid2 = null;
    	this.toGrid2 = null;
    	
    	var year = ValidateFunc.checkYear(Ext.getCmp('menu01_year'));
    	var month = ValidateFunc.checkMonth(Ext.getCmp('menu01_month'));
    	
    	if(year && month)
    	{
    		var date = year+month;
    		if(date.length == 6)
    		{
    			if(!page) page = 1;
    			this.down('#curPageGrid2').setValue(page);
    			
    			Global.showMask(Ext.getBody());
				Ext.Ajax.request({
					method: 'POST',
					url: './proc/account/junpyo/junpyo_print_paginglist_proc.php',
					params: {
						jp_yyyymm: date,
						page: page,
						size: Define.PAGESIZE
					},
					success: function(response, opts) {
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
							var store = Ext.getCmp('Menu01_Grid2').getStore();
							store.removeAll();
							store.add(json.DATA.reverse());
							thisObj.settingMaxPageGrid2(json.TOTAL);
							store.commitChanges();	
							thisObj.searchValuesGrid2 = null;
						}
						else{
							Ext.Msg.alert("", '조회 실패! '+json.DATA);
						}
					},
					failure: function(form, action) {
						Global.hideMask();
						Ext.Msg.alert("", '네트 워크 오류!');
					}
				});	
    		}
    		else Ext.Msg.alert("", '날짜를 정확히 입력해주세요');
    	} 
    	else Ext.Msg.alert("", '날짜를 정확히 입력해주세요'); 
    	
    	*/
    	
    	var thisObj = this;
    	
    	//전표상제 조회가 아니면 this.preComp 널 셋팅(출력시 타이틀 셋팅하기위해 필요) 
    	this.fromGrid2 = null;
    	this.toGrid2 = null;
    	
    	var year = ValidateFunc.checkYear(Ext.getCmp('menu01_year'));
    	var month = ValidateFunc.checkMonth(Ext.getCmp('menu01_month'));
    	
    	if(year && month)
    	{
    		var date = year+month;
    		if(date.length == 6)
    		{
    			Global.showMask(Ext.getBody());
				Ext.Ajax.request({
					method: 'POST',
					url: './proc/account/junpyo/junpyo_bocksik_paginglist_proc.php',
					params: {
						jp_yyyymm: date
					},
					success: function(response, opts) {
						if (Global.mask) Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
							var store = Ext.getCmp('Menu01_Grid2').getStore();
							store.removeAll();
							store.add(json.DATA.reverse());
							//thisObj.settingMaxPageGrid2(json.TOTAL);
							store.commitChanges();	
							thisObj.searchValuesGrid2 = null;
							
                            //마감년도 체크
                            thisObj.year = year;
                            var check = thisObj.isCloseYear(thisObj.year);
                            
                            //마감년도 그리드 셋팅
                            thisObj.setGridStyle(Ext.getCmp('Menu01_Grid2'), 2, check);
                            
                            //합계금액 감추기
                            Ext.getCmp('sum_credit2').hide();
                            Ext.getCmp('sum_debit2').hide();
                        }
						else{
							Ext.Msg.alert("", '조회 실패! '+json.DATA);
						}
					},
					failure: function(form, action) {
						Global.hideMask();
						Ext.Msg.alert("", '네트 워크 오류!');
					}
				});	
    		}
    		else Ext.Msg.alert("", '날짜를 정확히 입력해주세요');
    	} 
    	else Ext.Msg.alert("", '날짜를 정확히 입력해주세요'); 
    	
    },
    
    //복식부기 전표 상세조회
    searchDetailGrid2: function(page){
    	
    	/*
    	var thisObj = this;
		var values = this.searchValuesGrid2;
		
		this.down('#curPageGrid2').setValue(page);
		
		var fromDt = values.search_date_from.replace(/-/g,"");
		var toDt = values.search_date_to.replace(/-/g,"");
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/junpyo/junpyo_print_pagingsearch_proc.php',
			params: {
				from_jp_yyyymmdd: fromDt,
				to_jp_yyyymmdd: toDt,
				jp_view_gubun: values.jp_view_gubun,
				jakmok_code: values.jakmok_code,
				gycode: values.gycode,
				min_amt: values.min_amt,
				max_amt: values.max_amt,
				customer_id: values.customer_id,
				jp_rem: values.jp_rem,
				page: page,
				size: Define.PAGESIZE
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu01_Grid2.removeAll();
                	StoreInfo.Menu01_Grid2.add(json.DATA.reverse());
                	StoreInfo.Menu01_Grid2.commitChanges();
					thisObj.fromGrid2 = fromDt;
					thisObj.toGrid2 = toDt;
					thisObj.settingMaxPageGrid2(json.TOTAL);
				}
				else{
					Ext.Msg.alert("", '검색 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
		*/
		var thisObj = this;
		var values = this.searchValuesGrid2;
		
		var fromDt = values.search_date_from.replace(/-/g,"");
		var toDt = values.search_date_to.replace(/-/g,"");
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/junpyo/junpyo_bocksik_search_proc.php',
			params: {
				from_jp_yyyymmdd: fromDt,
				to_jp_yyyymmdd: toDt,
				jp_view_gubun: values.jp_view_gubun,
				jakmok_code: values.jakmok_code,
				gycode: values.gycode,
				min_amt: values.min_amt,
				max_amt: values.max_amt,
				customer_id: values.customer_id,
				jp_rem: values.jp_rem,
			},
			success: function(response, opts) {
				if (Global.mask) Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					StoreInfo.Menu01_Grid2.removeAll();
                	StoreInfo.Menu01_Grid2.add(json.DATA.reverse());
                	StoreInfo.Menu01_Grid2.commitChanges();
					thisObj.fromGrid2 = fromDt;
					thisObj.toGrid2 = toDt;
					//thisObj.settingMaxPageGrid2(json.TOTAL);
					
					//마감년도 체크
                    thisObj.year = fromDt.substring(0, 4);
                    var check = thisObj.isCloseYear(thisObj.year);
                    
                    //마감년도 그리드 셋팅
                    thisObj.setGridStyle(Ext.getCmp('Menu01_Grid2'), 2, check);
                    
                    //합계금액 셋팅
					Ext.getCmp('sum_credit2').show();
                    Ext.getCmp('sum_debit2').show();
                    thisObj.setSumAmount(2, StoreInfo.Menu01_Grid2);
				}
				else{
					Ext.Msg.alert("", '검색 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
	},
    
    //복식부기 거래처수정하기전 체크
    onBeforeEditGrid2: function(editor, e, eOpts) {
    	//마감년도일 경우 추가 수정 안되게 막기
        if (this.isCloseYear(this.year)) return false;
        
    	//자동분개일경우 수정 불가
    	if(parseInt(e.record.get('jp_no'), 10) > 4999) return false;
		else
		{
			//구분타입이 5~8이면 수정가능
			var gubun = parseInt(e.record.get('jp_view_gubun'), 10);
			if( gubun > 4 && gubun < 9) return true;
			else return false;
		}
	},
	
	//복식부기 상세데이터를 수정한 후 체크로직
	onAfterEditGrid2: function (editor, e, eOpts) {
		
    	var movePos = null;	//다음으로 수정할 셀에 포커스를 주기 위해 필요한 position 객체
    	var groupId = e.record.get('jp_group');
    	var gubun = e.record.get('jp_view_gubun');
    	
    	//거래처코드 벨리데이션
    	if(e.field == 'customer_id')
    	{
    		if(e.value)
    		{
    			var code = Ext.String.leftPad(e.value, 5, '0');
	    		var codeRecord = StoreInfo.Menu09_Grid.findRecord('customer_id', code, null, null, null, true);
	    		if(!codeRecord)
	    		{
	    			var codeRecord = StoreInfo.Menu09_Grid.findRecord('tr_nm', e.value, null, null, null, true);
	    			if(!codeRecord)
		    		{
		    			if(e.value == undefined || e.value == '') e.record.set('customer_id', '');
		    			else e.record.set('customer_id', e.originalValue);
		    		} 
	    			else e.record.set('customer_id', codeRecord.get('customer_id'));
	    		}
    		}
    		else e.record.set('customer_id', '');
    	}
    	
        if(Global.isEnter)
        {
        	editor.startEditByPosition({row: e.rowIdx+1, column: e.colIdx});
        } 
        Global.isEnter = false;
        return true;
   },
   
   //저장 로직
    doSaveGrid2: function(isSucShow){	//저장성공여부 팝업창 띄울지 여부
    	
    	var thisObj = this;
    	var year = Ext.getCmp('menu01_year').getValue();
    	var detailData = [];
		var modiArr = StoreInfo.Menu01_Grid2.getModifiedRecords();
		modiArr = Global.sortModelArr(modiArr);
		var len =  modiArr.length;
		
		if(len > 0)
		{
	    	for(var i=0; i<len; i++)
			{
				var record = modiArr[i];
				detailData.push({
					'row_idx': StoreInfo.Menu01_Grid2.indexOf(record), 
					'jp_id': record.get('jp_id'),
					'customer_id': record.get('customer_id')
				});					
			}
		}
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/account/junpyo/junpyo_print_update_proc.php',
			params: {
				data: JSON.stringify(detailData)
			},
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.sucessRowUpdateGrid2(json.DATA, isSucShow);
				}
				else{
					Ext.Msg.alert("", '저장 실패 :'+json.DATA);
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
    },
    
    sucessRowUpdateGrid2: function(data, isSucShow)
    {
    	var failCnt = 0;
    	for(var i=0; i<data.length; i++)
    	{
    		var rowData = data[i];
    		if(rowData.cd == -99 || rowData.cd == -999) failCnt++;
    		else
    		{
				var record = StoreInfo.Menu01_Grid2.getAt(rowData.cd);
				record.commit();		
    		}
    	}
    	this.tempRowInit();
    	if(failCnt > 0) Ext.Msg.alert("", '<span style="color:red;">'+failCnt+'</span><span>건의 정보가 저장실패되었습니다.</span>');
    	else{
    		if(isSucShow) Ext.Msg.alert("", '저장되었습니다.');
    	}
    },
    
    //페이징툴바에서 버튼을 눌렀을경우
    changePagingNumGrid2: function(btnType)
    {
    	var pageInput = this.down('#curPageGrid2');
    	var curNum = pageInput.getValue();
    	if(!curNum) curNum = 1;
    	
    	if(btnType == Define.FIRST) curNum = 1;
    	else if(btnType == Define.PREV)
    	{
    		curNum--;
    		if(curNum < 1) curNum = 1; 
    	}
    	else if(btnType == Define.NEXT)
    	{
    		curNum++;
    		if(curNum > this.MAXPAGE2 ) curNum = this.MAXPAGE2;
    	}
    	else if(btnType == Define.LAST) curNum = this.MAXPAGE2;
    	if(this.searchValuesGrid2) this.searchDetailGrid2(curNum);
    	else this.onMenu01_Grid2BtnClick(null, null, null, curNum); 
    },
	
	//페이징툴바 Max 페이지를 셋팅    
    settingMaxPageGrid2: function(totCnt){
    	this.MAXPAGE2 = Math.ceil(totCnt/Define.PAGESIZE);
    	if(this.MAXPAGE2 < 1){
    		this.down('#curPageGrid2').setValue(1);
    		this.MAXPAGE2 = 1;
    	}  
    	this.down('#maxPageGrid2').setText(this.MAXPAGE2);
    },
    
    //서버 전송버튼을 눌렀을 경우
    onSaveGrid2_Click: function(button, e, eOpts) {
        //마감년도일 경우 추가 수정 안되게 막기
        if (this.isCloseYear(this.year)) return Ext.Msg.alert("경고", "마감된 년도의 데이터는 수정할 수 없습니다.");
        
    	var thisObj = this;
		Ext.MessageBox.confirm('경고!', '현재까지 입력한 거래처 정보를 저장하시겠습니까?', function(btn){
            if(btn=='yes'){
            	thisObj.doSaveGrid2(true);
            }
        });
    },
   	
    //계정체계도 팝업 띄우기
    showGyCodePopup: function(button, e, eOpts) {
    	var pop = Ext.create('Common_Pop_ShowAccounts');
    	Global.openPopup(pop);
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
        var activeTab = Ext.getCmp('Menu01_Tab').getActiveTab().getItemId();
        //그리드별 도움말 분기
        if (activeTab == 'grid1') {
            Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(일반분개)', 'Menu01Grid1');
        }
        else {
            Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(계좌입력)', 'Menu01Grid2');
        }
    },
    
    //합계 금액 셋팅
    setSumAmount: function(type, store) {
        Ext.getCmp('sum_credit' + type).setValue(Ext.util.Format.number(store.sum('credit'), '0,000'));
        Ext.getCmp('sum_debit' + type).setValue(Ext.util.Format.number(store.sum('debit'), '0,000'));
    },
    
    //마감년도 체크
    isCloseYear: function(value) {
        var chk = StoreInfo.CloseYear.find('close_year', value);
        return (chk == -1) ? false : true; 
    },
    
    //마감년도 그리드 셋팅
    setGridStyle: function(grid, type, check) {
        if (check) {
            grid.addCls('grid-close');
            Ext.getCmp('btnSaveGrid' + type).disable();
            if (type == 1) Ext.getCmp('btnDelGrid' + type).disable();
        }
        else {
            grid.removeCls('grid-close');
            Ext.getCmp('btnSaveGrid' + type).enable();
            if (type == 1) Ext.getCmp('btnDelGrid' + type).enable();
        }
    }
});