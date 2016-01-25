/**
 *  메출자료 업로드(영업) 메인 메뉴 Panel View
 *  
 */
Ext.define('Smartax.view.supertax.TaxDataUploadMain', {
	
	extend : 'Ext.container.Container',
	autoScroll : true,
	overflowX : 'hidden',
	cls:'page',
	xtype : 'taxDataUploadMain',
	id:'taxDataUploadMain',
	padding:'0 25 0 0',
	
	taxDataUploadGrid : null,
	taxDataUploadGridStore : null,
	taxDataUploadCompStore : null,
	taxDataUploadFileStore : null,
	
	taxDataUploadPopup : null,
	
	initComponent:  function(){
		var me = this;
		
		var searchBar = {
                xtype: 'container',
                border: false,
                layout: {
                    type: 'hbox',
                    align: 'middle',
//                    pack: 'start'
                },
                cls: 'searchBar',
                items: [{ //조회조건 시작일(년도)
		                    xtype: 'numberfield',
		                    id: 'search_year',
		                    cls: 'searchChild',
		                    width: 120,
		                    selectOnFocus: true,
		                    value : (new Date()).getFullYear()
		                    
		                },
		                { //완료일에 따라 텍스트 셋팅 (~3월: 1기예정, ~6월: 1기확정, ~9월: 2기예정, ~10월: 2기확정)
		                    xtype: 'combobox',
		                    id: 'search_type',
		                    labelSeparator: '',
	                        editable:false,
	                        selectOnFocus: true,
	                        displayField: 'TEXT',
	                        queryMode: 'local',
	                        store: SmartaxCommonStore.SEARCH_TYPE, 
	                        valueField: 'CODE',
	                        enableKeyEvents : true,
		                    style: {
		                    	'padding': '0 5px 0 10px'
		                    },
		                },
		                {
		                	xtype:'label',
		                	id:'search_date',
		                	margin : '0 10 0 5',
		                },
		                {
		                    xtype: 'button',
		                    cls: 'searchChild',
		                    text: '조회',
		                    id:'searchBtn'
		                },{
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
	                    }
		            ]
            	};
		
		Ext.applyIf(me, 
				{
				 items : [searchBar,{
					 	xtype: 'container',
		                layout: {
					        type: 'hbox',
					        align: 'stretch'
					    },
					    flex:1,
					    items: [
				           {
					           	xtype: 'container',
								id: 'taxDataGridLay',
								cls: 'left_content',
								flex:1,
								height : window.innerHeight-280,
			                    layout: {
			                    	align: 'stretch',
							        type: 'vbox'
							    }
							},
				        	{
					           	xtype: 'container',
								id: 'pdfViewer',
								cls: 'right_content',
								flex:1,
								height : window.innerHeight-280,
//								dockedItems: [],
//								autoScroll : true,
			                    layout: {
			                    	align: 'stretch',
							        type: 'vbox'
							    },
							    items:[{
							    	xtype : 'container',
							    	flex:1,
							    	html : '<div id="pdf_viewer"  style="width:100%;height:100%;border:1px solid;text-align:center;font-weight: bolder;line-height: 300px;">미리 보기</div>'
							    },
							    {
							    	xtype : 'container',
							    	width:'100%',
							    	layout: {
								        type: 'hbox',
								        align: 'stretch'
								    },
								    items : [{
								    	xtype : 'button',
								    	text : '파일삭제',
								    	flex:1,
								    	id:'pdfDelBtn'
								    },{
								    	xtype : 'button',
								    	text : '재업로드',
								    	flex:1,
								    	id:'pdfUpBtn'
								    }]
							    },{
							    	xtype : 'textareafield',
							    	fieldLabel:'비고',
									 name:'right_contents_bigo',
									 id : 'right_contents_bigo'
							    },{
									 xtype : 'hiddenfield',
									 name:'co_id',
									 id : 'right_contents_co_id'
								 },{
									 xtype : 'hiddenfield',
									 name:'atax_van_id',
									 id : 'right_contents_atax_van_id'
								 },{
									 xtype : 'hiddenfield',
									 name:'period_flag',
									 id : 'right_contents_period_flag'
								 },{
									 xtype : 'hiddenfield',
									 name:'yyyy',
									 id : 'right_contents_yyyy'
								 },
								 {
					                xtype: 'toolbar',
									layout: {
					                    pack: 'end',
					                    type: 'hbox'
					                },
									dock: 'bottom',
					                //  padding : '0 5 10 0',
					                  items: [
					                  	{
					                     		xtype:'label',
					                     		flex:1
					                     	},
//					                     	{
//					                     		xtype:'button',
//					                     		text: '초기화',
//					                     		cls:'bottomChild',
//					                     		id:'formClearBtn'
//					                     	},
					                     	{
					                     		xtype:'button',
					                     		text: '저장',
					                     		cls:'bottomChild',
					                     		id:'formSaveBtn'
					                     	},
					              	]
					      	    }]
				        	}]
				 }]
		});
		 
		 me.callParent(arguments);
	},
	

});
