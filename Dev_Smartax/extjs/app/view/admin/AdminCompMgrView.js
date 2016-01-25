/**
 * 관리자 회사관리 화면
 */
Ext.define('Smartax.view.admin.AdminCompMgrView', {
	
	extend : 'Ext.container.Container',
	
	xtype : 'adminCompMgrView',
	id:'adminCompMgrView',
	padding:'0 25 0 0',
	cls:'page',
	flex : 1,
	//회사 grid
	compInfoGrid:null,
	compInfoGridStore : null,
	compInfoGridSearchStore:null,
	
	//전체회원 grid
	allUserInfoGrid:null,
	allUserInfoGridStore : null,
	allUserInfoGridSearchStore:null,
	
	//회사 연결 회원 grid
	linkUserInfoGrid:null,
	linkUserInfoGridStore : null,
	linkUserInfoGridSearchStore:null,
	
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
        
        var search =  {
                xtype: 'container',
                layout: {
			        align: 'middle',
			        type: 'hbox'
			    },
                cls:'searchBar',
                items: [
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
                        value: SmartaxCommonStore.SEAR_SC.getAt(0),
                        store: SmartaxCommonStore.SEAR_SC, 
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
                        id : 'compSearch',
                        text: '조회',
                    },
                    {
                        xtype: 'label',
                        flex:1,
                    },
                    {
                        xtype: 'button',
                        cls:'searchChild',
                        text: '사용방법',
                    }],
        };
        
        Ext.applyIf(me,{
        	items:[
        	       search,
        	       {
        	    	   xtype: 'container',
        	    	   id: 'compInfoGridLay',
        	    	   flex:1,
        	    	   height : (window.innerHeight-250) /2,
	                   layout: {
	                	   align: 'stretch',
					       type: 'vbox'
					   }
        	       },
        	       {
		                xtype: 'toolbar',
						layout: {
		                    pack: 'end',
		                    type: 'hbox'
		                },
		                width:'100%',
						dock: 'bottom',
						items : [{
				            xtype: 'radiogroup',
//				            fieldLabel: 'Toppings',
//				            defaultType: 'checkboxfield',
				            id:'radio_user_type',
				            layout: {
			                    pack: 'end',
			                    type: 'hbox'
			                },
			                columns: 1,
				            items: [
				                {
				                    boxLabel  : '고객',
				                    name      : 'check_user_type',
				                    inputValue: '1',
				                    checked   : true,
				                    id        : 'check_cust',
				                    labelWidth: 50,
				                    width: 70,
				                }, {
				                    boxLabel  : '세무',
				                    name      : 'check_user_type',
				                    inputValue: '2',
				                    id        : 'check_sales',
				                    labelWidth: 50,
				                    width: 70,
				                }
				            ]
				        },{
	                        xtype: 'label',
	                        flex:1,
	                    },{//1. 검색영역
	                        xtype: 'combobox',
	                        cls:'searchChild',
	                        width: 100,
	                        id:'search_type',
	                        labelSeparator: '',
	                        editable:false,
	                        selectOnFocus: true,
	                        displayField: 'TEXT',
	                        queryMode: 'local',
	                        value: SmartaxCommonStore.SEAR_COM_USER.getAt(0),
	                        store: SmartaxCommonStore.SEAR_COM_USER, 
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
	                        id:'search_name',
	                        width:200,
	                        labelSeparator: '',
	                        selectOnFocus: true,
	                        enableKeyEvents : true,
	                    },
	                    {
	                        xtype: 'button',
	                        cls:'searchChild',
	                        id : 'userSearchBtn',
	                        text: '조회',
	                    }]
       	    	   },
        	       {
       	    	   xtype: 'container',
       	    	   layout: {
    			       		type: 'hbox',
    			       		align: 'stretch'
       	    	   },
       	    	   flex:1,
       	    	   items : [{
       	    		   xtype: 'container',
           	    	   id: 'linkUserInfoGridLay',
           	    	   height : (window.innerHeight-300) /2,
           	    	   flex:2,
   	                   layout: {
   	                	   align: 'stretch',
   					       type: 'vbox'
   					   }
       	    	   },{
       	    		   xtype: 'container',
           	    	   id: 'allUserInfoGridLay',
           	    	   flex:5,
           	    	   height : (window.innerHeight-300) /2,
   	                   layout: {
   	                	   align: 'stretch',
   					       type: 'vbox'
   					   }
       	    	   }]
       	       }
        	]
        	
        });
        
//        Ext.applyIf(me, {items : [contents,{
//				xtype: 'container',
//                layout: {
//			        type: 'hbox',
//			        align: 'stretch'
//			    },
//			    flex:1,
//			    items: [
//		           {
//			           	xtype: 'container',
//						id: 'saleCustomerInfoGridLay',
//						flex:1,
//	                    layout: {
//	                    	align: 'stretch',
//					        type: 'vbox'
//					    }
//					},
//		        	{
//			           	xtype: 'container',
//						id: 'saleCustomerFormLay',
//						cls: 'right_content',
//						flex:1,
////						dockedItems: [
////			           ],
//						autoScroll : true,
//	                    layout: {
//	                    	align: 'stretch',
//					        type: 'vbox'
//					    },
//					    items:[
//					    {
//					    	xtype : 'saleCustomerForm',
//					    },
//					    {
//			                xtype: 'toolbar',
//							layout: {
//			                    pack: 'end',
//			                    type: 'hbox'
//			                },
//							dock: 'bottom',
//			                //  padding : '0 5 10 0',
//			                  items: [
//			                  	{
//			                     		xtype:'label',
//			                     		flex:1
//			                     	},
//			                     	{
//			                     		xtype:'button',
//			                     		text: '초기화',
//			                     		id:'saleCustomerFormClearBtn',
//			                     		cls:'bottomChild',
//			                     	},
//			                     	{
//			                     		xtype:'button',
//			                     		text: '저장',
//			                     		id:'saleCustomerFormRegistBtn',
//			                     		cls:'bottomChild',
//			                     	},
////			                     	{
////			                     		xtype:'button',
////			                     		text: '삭제',
////			                     		id:'saleCustomerFormDeleteBtn',
////			                     		cls:'bottomChild',
////			                     	}
//			              	]
//			      	    }
//			           ],
//					}
//			    ],
//        	}]
//        });
        
    	me.callParent(arguments);
	},
});