/**
 * 고객관리 정보 화면
 * 
 */
Ext.define('Smartax.view.basic.TaxCustomerInfo', {
	
	extend : 'Ext.container.Container',
	
	cls:'page',
	padding:'0 25 0 0',
	xtype : 'taxCustomerInfo',
	id:'taxCustomerInfo',
	flex : 1,
	//Store
	taxCustomerInfoStore : null,
	taxCustomerSearchStore : null,
	taxCustomerInfo_Grid : null,
	
	autoScroll : true,
	
	initComponent:  function(){
		var me = this;
		
		me.bodyPadding = 20;
        me.autoScroll = true;
//        var h = window.innerHeight;
//        me.height = h-150;
        me.region = 'center',
        
        me.layout = {
            type: 'vbox',
            align: 'stretch'
        };
        
        var contents =  {
                xtype: 'container',
                layout: {
			        align: 'middle',
			        type: 'hbox'
			    },
                cls:'searchBar',
                items: [
                    {
                    	 xtype:'checkboxfield',
	                	 id: 'chk_delegate_search',
	                	 fieldLabel: '수임동의',
	                     width: 100,
	                     style: {
	                         'margin-left': '8px',
	                         'border-radius': '2px',
	                         'background': '#99BBE8'
	                     },
	                     labelAlign: 'right',
	                     labelSeparator: '',
	                     labelWidth: 78,
                    },
                    {
                    	 xtype:'checkboxfield',
	                	 id: 'chk_account_search',
	                	 fieldLabel: '계정생성',
	                     width: 100,
	                     style: {
	                         'margin-left': '8px',
	                         'border-radius': '2px',
	                         'background': '#99BBE8'
	                     },
	                     labelAlign: 'right',
	                     labelSeparator: '',
	                     labelWidth: 78,
                   },
                    {//1. 검색영역
                        xtype: 'combobox',
                        cls:'searchChild',
                        width: 100,
                        id:'search_tp',
                        labelSeparator: '',
                        editable:false,
                        selectOnFocus: true,
                        displayField: 'TEXT',
                        queryMode: 'local',
                        value: SmartaxCommonStore.SEAR_TAX_SC.getAt(0),
                        store: SmartaxCommonStore.SEAR_TAX_SC, 
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
                    },
                    {
                        xtype: 'button',
                        cls:'searchChild',
                        id : 'taxCustomerSearch',
                        text: '조회',
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
                    }],
        };
        
        Ext.applyIf(me, {items : [contents,{
				xtype: 'container',
                layout: {
			        type: 'vbox',
			        align: 'stretch'
			    },
			    flex:1,
			    items: [
		           {
			           	xtype: 'container',
						id: 'taxCustomerInfoGridLay',
						flex:1,
						height : (window.innerHeight-250) /2,
	                    layout: {
	                    	align: 'stretch',
					        type: 'vbox'
					    }
					},
		           //이미지 영역
		           {
		        	   xtype : 'container',
		        	   layout: {
					        type: 'hbox',
					        align: 'middle'
					    },
					    flex:1,
					    items : [{
					    	xtype : 'image',
					    	id:'imgview_saup',
					    	 flex:1,
				    	     width: 400,
				    	     height :  (window.innerHeight-300) /2,
				    	     padding : '3px'
					    },{
					    	xtype : 'image',
					    	id:'imgview_deapyo',
					    	 flex:1,
				    	     width: 400,
				    	     height : (window.innerHeight-300) /2,
				    	     padding : '3px'
					    }]
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
		                     	{
		                     		xtype:'button',
		                     		text: '사업자등록증 증빙 인쇄',
		                     		id:'saup_print_btn',
		                     		cls:'bottomChild',
		                     	},
		                     	{
		                     		xtype:'button',
		                     		text: '대표자신분증 증빙 인쇄',
		                     		id:'deapyo_print_btn',
		                     		cls:'bottomChild',
		                     	},
		                     	{
		                     		xtype:'button',
		                     		text: '저장',
		                     		id:'save_btn',
		                     		cls:'bottomChild',
		                     	}
		              	]
		      	    }
			    ],
        	}]
        });
        
    	me.callParent(arguments);
	}

});