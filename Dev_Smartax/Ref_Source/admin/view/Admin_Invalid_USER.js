
Ext.define('Admin_Invalid_USER', {
    extend: 'Ext.container.Container',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    cls:'tab_page',
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
                    store: StoreInfo.USERLIST_INVALID,
                    cls:'searchBar',
                    items:[
                    	/*
                        {
                            xtype: 'combobox',
                            id: 'user_kbn',
                            width: 180,
                            fieldLabel: '회원구분',
                            labelSeparator: '',
                            labelWidth: 50,
                            editable : false,
                            displayField: 'TEXT',
                            queryMode: 'local',
                            store:  StoreInfo.USER,
                            valueField: 'TYPE',
                            value: '전체',
                            listeners: {
                                change: {
	                                fn: function(field, e, options) {
	                                }
	                            }
                            }
                        },
                        */
                     	{
                            xtype: 'combobox',
                            id: 'search_type_invalid',
                            //margin: '0 0 0 20',
                            width: 180,
                            fieldLabel: '검색방법',
                            labelSeparator: '',
                            labelWidth: 50,
                            editable : false,
                            displayField: 'TEXT',
                            queryMode: 'local',
                            store:  StoreInfo.SEARCH,
                            valueField: 'TYPE',
                            value: StoreInfo.SEARCH.getAt(0),
                            listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                	me.searchUserList();
	                                }
	                            }
                            }
                       },
                       {
                       		xtype:'textfield',
                       		id:'searh_word_invalid',
                       		margin: '0 0 0 10',
                       		width:150,
                       		listeners: {
                                specialkey: {
	                                fn: function(field, e, options) {
	                                	me.searchUserList();
	                                }
	                            }
                            }
                       },
                       {
                       		xtype:'button',
                       		id:'searh_btn_invalid',
                       		margin: '0 0 0 10',
                       		text:'검색',
                       		listeners: {
                                click: {
	                                fn: me.searchUserList,
	                            }
                            }
                       }
                    ]
                },
                {
			    	xtype: 'gridpanel',
                    cls:'grid',
                    flex:1,
                    autoScroll:true,
                    store:  StoreInfo.USERLIST_INVALID,
                    loadMask: true,
                    id: 'user_grid_invalid',
                    /*
                    dockedItems: [{
				    	xtype: 'pagingtoolbar',
				        store: StoreInfo.Menu09_Grid,
				        dock: 'bottom',
				        pageSize: 20,
				        displayInfo: true
			        }],
			        */
                    veiwConfig: {
                        trackOver: false,
                        getRowClass: function(record, rowIndex, rowParams, store) {
                        	console.log('getRowClass');
                        }
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        pruneRemoved: false,
                        checkOnly: true,
                        mode: 'MULTI'
                    }),
			        
                    columns: [
                        //{ xtype: 'gridcolumn', dataIndex: 'auth_id', align:'center', sortable: true, text: '권한정보', width: 80, locked: true },
                        { xtype: 'gridcolumn', dataIndex: 'user_name', style: 'text-align:center', sortable: true, text: '가입자명칭', width: 100, locked: true},
                        { xtype: 'gridcolumn', dataIndex: 'user_id', style: 'text-align:center', sortable: true, text: '아이디', width: 100, locked: true},
                        { xtype: 'gridcolumn', dataIndex: 'user_pwd', style: 'text-align:center', sortable: true, text: '비밀번호', width: 100, locked: true },
                        { xtype: 'gridcolumn', dataIndex: 'user_farm_name', style: 'text-align:center', sortable: true, text: '농장명', width: 100 },
                        { xtype: 'gridcolumn', dataIndex: 'user_phone', style: 'text-align:center', sortable: true, text: '휴대폰', width: 100 },
                        { xtype: 'gridcolumn', dataIndex: 'last_login_time', style: 'text-align:center', sortable: true, text: '로그인일시', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: 'reg_date', style: 'text-align:center', sortable: true, text: '가입일자', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: '', style: 'text-align:center', sortable: true, text: '사용시작일', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: '', style: 'text-align:center', sortable: true, text: '사용종료일', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: '', style: 'text-align:center', sortable: true, text: '입금액', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: '', style: 'text-align:center', sortable: true, text: '유무료여부', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: 'user_nick', style: 'text-align:center', sortable: true, text: '성명', width: 100 },
                        { xtype: 'gridcolumn', dataIndex: 'user_email', style: 'text-align:center', sortable: true, text: '이메일', width: 150 },
                        { xtype: 'gridcolumn', dataIndex: 'user_zip', style: 'text-align:center', sortable: true, text: '우편번호', width: 100 },
                        { xtype: 'gridcolumn', dataIndex: 'user_addr', style: 'text-align:center', sortable: true, text: '주소', minWidth: 250, flex:1 },
                        { xtype: 'gridcolumn', dataIndex: 'user_tel', style: 'text-align:center', sortable: true, text: '연락처', width: 100 },
                        { xtype: 'gridcolumn', dataIndex: 'user_fax', style: 'text-align:center', sortable: true, text: '팩스', width: 100 },
                        { xtype: 'gridcolumn', dataIndex: 'user_homepage', style: 'text-align:center', sortable: true, text: '홈페이지', width: 150 }
                    ],
                    /*
                    listeners: {
                        itemclick: {
                            fn: me.onGridpanelItemClick,
                            scope: me
                        }
                    }
                    */
	           },
	           {
					xtype: 'toolbar',
					layout: {
                        pack: 'end',
                        type: 'hbox'
                    },
					dock: 'bottom',
					items: [
                    	{
		               		xtype:'label',
		               		flex:1
		               	},
		               	{
		               		xtype:'button',
		               		text: '복원',
		               		cls:'bottomChild',
		               		listeners: {
	                            click: {
	                                fn: me.onCancelDeleteBtn_Click,
	                                scope: me
	                            }
	                        }
		                },
						{
		               		xtype:'button',
		               		text: '인쇄',
		               		cls:'bottomChild',
		               		handler : function(){
				               			Ext.ux.grid.Printer.mainTitle = '[ 회원리스트 ]';
						            	//Ext.ux.grid.Printer.print(Ext.getCmp('user_grid').getValue(););
						            	Ext.ux.grid.Printer.print(Ext.getCmp('user_grid'));
						            }
		               },
		               /*
		              {
		               		xtype:'button',
		               		text: '인쇄',
		               		cls:'bottomChild',
		               },
		                */
		               {
		               		xtype: 'exporterbutton',
		               		downloadName: '회원리스트',
		               		cls:'bottomChild',
		               		store : StoreInfo.USERLIST_INVALID
		               }
					]
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
    
    
    
//***************************************  컨트롤러 ***************************************//

	//화면이 처음 보여질시 셋팅    
    onContainerAfterRender: function(component, eOpts) {
		this.searchUserList();    	
    },
    
    //회원검색
    searchUserList: function(field, e, options) {
    	var search_type = Ext.getCmp('search_type_invalid').getValue();
    	
    	if(search_type == '')
    	{
    		Ext.getBody().mask();

			Ext.Ajax.request({
				method: 'POST',
				url: './proc/member_invalid_list_proc.php',
				success: function(response, opts) {
					//console.log(response.responseText);
					Ext.getBody().unmask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						StoreInfo.USERLIST_INVALID.removeAll();
						StoreInfo.USERLIST_INVALID.add(json.DATA);
					}
				},
				failure: function(form, action) {
					Ext.getBody().unmask();
					Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
				}
			});
    	}
    	//내부local 검색
    	else
    	{
    		
    	}
		
    },
    
    //복원버튼을 눌렀을 경우
    onCancelDeleteBtn_Click: function(button, e, eOpts) {
    	var thisObj = this;
    	
    	var store = StoreInfo.USERLIST_INVALID;
    	var selRecArr = Ext.getCmp('user_grid_invalid').getSelectionModel().getSelection();
    	var sucCnt = 0;
    	var param = [], localGridIdx = [];
    	var len = selRecArr.length;
    	
    	for(var i=0; i<len; i++)
    	{
    		var record = selRecArr[i];
    		console.log(record.get('uid'));
    		param.push(record.get('uid'));
    		localGridIdx.push(record);
    	}
    	
    	Ext.Ajax.request({
			method: 'POST',
			url: './proc/member_change_flag.php',
			params: {
				data: JSON.stringify(param),
				flag : 'y'
			},
			success: function(response, opts) {
				//console.log(response.responseText);
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.sucessRowDelete(json.DATA, localGridIdx);
					Ext.Msg.alert("", '복원 완료! ');
				}
				else{
					Ext.Msg.alert("", '복원 실패! '+json.DATA);
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
			}
		});	
    },
    

    //서버삭제에 성공한 데이터는 그리드에서도 삭제, 서버삭제 실패한 경우가 있을경우 알림창을 띄움	
    sucessRowDelete: function(serverData, localData)
    {
    	for(var i=0; i<serverData.length; i++)
    	{
    		StoreInfo.USERLIST_INVALID.remove(localData[serverData[i]]);	
    	}
    },
    
});