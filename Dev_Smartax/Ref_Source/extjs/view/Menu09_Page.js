/* 기초자료관리 - 거래처등록 */
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Menu09_Page', {
    extend: 'Ext.container.Container',
    id:'Menu09_Page',
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
	                        xtype: 'combobox',
	                        cls:'searchChild',
	                        width: 100,
	                        value: StoreInfo.SEAR_TRD.getAt(0),
	                        id:'search_tp',
	                        labelSeparator: '',
	                        editable:false,
	                        selectOnFocus: true,
	                        displayField: 'TEXT',
	                        queryMode: 'local',
	                        store: StoreInfo.SEAR_TRD, 
	                        valueField: 'CODE',
	                        enableKeyEvents : true,
                            listeners: {
	                            specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        }
		                    }
	                    },
                        {
                            xtype: 'textfield',
                            cls:'searchChild',
                            id:'search_nm',
                            width:200,
                            labelSeparator: '',
                            selectOnFocus: true,
                            enableKeyEvents : true,
                            listeners: {
	                            specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	me.onMenu_SearchBtnClick();
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
                                    fn: me.onMenu_SearchBtnClick,
                                    scope: me
                                }	
                            }
                            
                        },
                        {
                            xtype: 'label',
                            cls:'searchChild',
                            margin: '4 0 0 10',
                            flex:1,
                            text: '화면 갱신은 조회단추를 다시 눌러주세요.'
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
					xtype: 'container',
                    layout: {
				        type: 'hbox',
				        align: 'stretch'
				    },
				    flex:1,
				    items: [
			           {
				           	xtype: 'container',
							id: 'Menu09_Grid_Lay',
							flex:1,
		                    layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
						},
			        	{
				           	xtype: 'container',
							id: 'trd_reg',
							cls: 'right_content',
		                    layout: {
		                    	align: 'stretch',
						        type: 'vbox'
						    },
						     autoScroll:true
						}
				    ]
				},
                {
					xtype: 'container',
                    layout: {
				        align: 'middle',
				        type: 'hbox'
				    },
                    cls:'bottomBar',
                    items: [
                    	{
		               		xtype:'label',
		               		flex:1
		               	},
                    	{
		               		xtype:'button',
		               		text: '추가',
		               		cls:'bottomChild',
		               		listeners: {
                                click: {
									fn: me.addBtnClick,
                                    scope: me
                                }
                            }
		               	},
                    	{
		               		xtype:'button',
		               		text: '저장',
		               		cls:'bottomChild',
		               		 listeners: {
		                        click: {
		                            fn: me.onRegisterCode,
		                            scope: me
		                        }
		                    }
		               	},
                    	{
		               		xtype:'button',
		               		text: '삭제',
		               		cls:'bottomChild',
		               		listeners: {
		                        click: {
		                            fn: me.onDeleteCode,
		                            scope: me
		                        }
		                    }
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
    	this.form = Ext.create('Common_TrdReg');
    	Ext.getCmp('trd_reg').add(this.form);
    	
    	//처음보여질시 전체 거래처를 셋팅
    	this.setCustomerGrid(StoreInfo.Menu09_Grid.data.items);
    	this.addBtnClick();
    },
    
    addBtnClick: function(button, e, eOpts) {
    	this.form.resetData();
    },
    
    //그리드화면 셋팅하기
    setCustomerGrid: function(dataArr)
    {
    	var thisObj = this;
    	Ext.getCmp('Menu09_Grid_Lay').removeAll();
    	StoreInfo.Menu09_Grid_SEARCH = Ext.create('Ext.data.Store', {
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
	       
	        proxy: {
	            type: 'memory',
	            enablePaging: true,
	            data: dataArr,
	            reader: {
	                type: 'array'
	            }
	        },
	        
	        pageSize: 30000,
	        remoteSort: true,
	       
		});
		
		var grid = Ext.create('Ext.grid.Panel', {
            cls:'grid',
            id:'Menu09_Grid',
            autoScroll:true,
            flex:1,
            store: StoreInfo.Menu09_Grid_SEARCH,
            loadMask: true,
            dockedItems: [{
            	/*
		    	xtype: 'pagingtoolbar',
		        store: StoreInfo.Menu09_Grid_SEARCH,
		        pageSize: 30,
		        */
		       	xtype: 'toolbar',
		        dock: 'bottom',
		        items: [
					{
	               		xtype:'label',
	               		flex:1
	               	},
	               	{
	               		xtype:'button',
	               		text: '엑셀자료 올리기',
	               		cls:'bottomChild',
	               		handler : function(){
	               			var pop = Ext.create('Common_Pop_ExcelUpload');
	               			pop.excelType = 'trds_reg';
    						Global.openPopup(pop, "엑셀파일 업로드");
			            }
	               		
	               		
	               	},
					{
	               		xtype:'button',
	               		text: '인쇄',
	               		cls:'bottomChild',
	               		handler : function(){
	               			Ext.ux.grid.Printer.mainTitle = '[ 거래처코드 ]';
			            	Ext.ux.grid.Printer.print(this.up().up());
			            }
	               	},
	               	{
	               		xtype: 'exporterbutton',
	               		downloadName: '거래처코드',
	               		cls:'bottomChild'
	               	}
				]
	        }],
	        selModel: {
	            pruneRemoved: false
	        },
	        viewConfig: {
	            trackOver: false
	        },
            columns: [
                { xtype: 'gridcolumn', dataIndex: 'customer_id', align:'center', sortable: true, text: '거래처코드', width: 100},
                { xtype: 'gridcolumn', dataIndex: 'tr_nm', style: 'text-align:center', sortable: true, text: '거래처명', width: 100},
                { xtype: 'gridcolumn', dataIndex: 'tr_daepyo', style: 'text-align:center', sortable: true, text: '대표자', width: 100 },
                { xtype: 'gridcolumn', dataIndex: 'tr_tel', style: 'text-align:center', sortable: true, text: '전화번호', width: 100 },
                { xtype: 'gridcolumn', dataIndex: 'tr_phone', style: 'text-align:center', sortable: true, text: '핸드폰', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_addr', style: 'text-align:center', sortable: true, text: '주소', minWidth: 250, flex:1 }
                /*
                { xtype: 'gridcolumn', dataIndex: 'tr_fax', style: 'text-align:center', sortable: true, text: '팩스번호', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_saup_no', style: 'text-align:center', sortable: true, text: '사업자등록번호', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_up', style: 'text-align:center', sortable: true, text: '업태', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_jong', style: 'text-align:center', sortable: true, text: '종목', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_zip', style: 'text-align:center', sortable: true, text: '우편번호', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_homepage', style: 'text-align:center', sortable: true, text: '홈페이지', width: 250 },
                { xtype: 'gridcolumn', dataIndex: 'tr_email', style: 'text-align:center', sortable: true, text: '이메일', width: 250 },
                { xtype: 'gridcolumn', dataIndex: 'tr_manager', style: 'text-align:center', sortable: true, text: '거래담당자', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_sdate', style: 'text-align:center', sortable: true, text: '거래시작일', width: 150 },
                { xtype: 'gridcolumn', dataIndex: 'tr_edate', style: 'text-align:center', sortable: true, text: '거래종료일', width: 150 },
                //{ xtype: 'gridcolumn', dataIndex: 'tr_chuchun', style: 'text-align:center', sortable: true, text: '추천인코드', width: 150, hidden:true },
                //{ xtype: 'gridcolumn', dataIndex: 'tr_chuchun', style: 'text-align:center', sortable: true, text: '추천인', width: 150, hidden:true },
                { xtype: 'gridcolumn', dataIndex: 'tr_bigo', style: 'text-align:center', sortable: true, text: '비고', width: 150 }
                */
            ],
            plugins: [         
				Ext.create('Ext.grid.plugin.BufferedRenderer', {
				})
			],
            listeners: {
                itemclick: {
                    fn: thisObj.onGridpanelItemClick,
                    scope: thisObj
                }
            }
       	});
       
       	StoreInfo.Menu09_Grid_SEARCH.load(1);
		Ext.getCmp('Menu09_Grid_Lay').add(grid);
		this.form.resetData();
	},
    
  	onGridpanelItemClick: function(dataview, record, item, index, e, eOpts) {
    	this.form.loadRecord(record);
    	var tr_tel = record.get('tr_tel').split('-');
    	var tr_phone = record.get('tr_phone').split('-');
    	var tr_fax = record.get('tr_fax').split('-');
    	
    	this.form.getForm().setValues({
    		tr_tel1: tr_tel[0],
    		tr_tel2: tr_tel[1],
    		tr_tel3: tr_tel[2],
            tr_phone1: tr_phone[0],
            tr_phone2: tr_phone[1],
            tr_phone3: tr_phone[2],
            tr_fax1: tr_fax[0],
            tr_fax2: tr_fax[1],
            tr_fax3: tr_fax[2]
    	});
    	this.form.txtField.setReadOnly(true);
    },
    
    //조회버튼을 눌렀을 경우
    onMenu_SearchBtnClick: function(button, e, eOpts) {
    	
    	var search_tp = Ext.getCmp('search_tp').getValue();
    	if(search_tp)
    	{
    		if(search_tp == '00' || search_tp == '전체')
    		{
    			this.setCustomerGrid(StoreInfo.Menu09_Grid.data.items);
    		}
    		else
    		{
    			var search_nm = Ext.getCmp('search_nm').getValue();
    			var dataArr = [];
    			for(var i=0; i<StoreInfo.Menu09_Grid.getCount(); i++)
    			{
    				record = StoreInfo.Menu09_Grid.getAt(i);
    				if(record.get(search_tp).indexOf(search_nm) > -1)
    				{
						dataArr.push(record);	    					
    				}
    			}
				this.setCustomerGrid(dataArr);				    			
    		} 
    	}
    },
    
    //저장버튼을 눌렀을 경우
    onRegisterCode: function(button, e, eOpts) {
    	
    	var thisObj = this;

		if(!thisObj.form.txtField.readOnly)
		{
			
			var paging = Ext.getCmp('Menu09_Grid').down('pagingtoolbar');
			if(this.form.isModifyCheck()){
    			Ext.MessageBox.confirm('경고!', '중복된 코드입니다. 작성한 정보로 업데이트 하시겠습니까?', function(btn){
		            if(btn=='yes'){
		            	thisObj.form.onUpdateCode();
		            }
		        });
    		}
    		else if(thisObj.form.isModifyNameCheck())
    		{
    			Ext.MessageBox.confirm('경고!', '이미추가된 거래처명입니다. 추가로 저장 하시겠습니까?', function(btn){
		            if(btn=='yes'){
		            	thisObj.form.onRegisterCode(null, paging);
		            }
		        });
    		}
    		else this.form.onRegisterCode(null, paging);
		}
		else this.form.onUpdateCode();
    },
    
    onDeleteCode: function(button, e, eOpts) {
    	this.form.onDeleteCode(); 
    },
    
    //물음표버튼을 눌렀을 경우
    onMenu01_DescriptBtnClick: function(button, e, eOpts) {
		Global.openPopup(Ext.create('Common_Pop_Help'), '도움말(거래처등록)', 'Trds');
    }
    
});

