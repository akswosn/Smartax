/**
 * 고객관리 정보 화면
 * 
 */
Ext.define('Smartax.view.basic.SaleCustomerByJoinInfo', {
	
	extend : 'Ext.container.Container',
	
	cls:'page',
	padding:'0 25 0 0',
	xtype : 'saleCustomerByJoinInfo',
	id:'saleCustomerByJoinInfo',
	flex : 1,
	//Store
	saleCustomerByJoinInfoStore : null,
	saleCustomerByJoinSearchStore : null,
	saleCustomerByJoinInfo_Grid : null,
	
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
                        id : 'saleCustomerByJoinSearch',
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
			        type: 'hbox',
			        align: 'stretch'
			    },
			    flex:1,
			    items: [
		           {
			           	xtype: 'container',
						id: 'saleCustomerByJoinInfoGridLay',
						flex:1,
						height : (window.innerHeight - 250),
	                    layout: {
	                    	align: 'stretch',
					        type: 'vbox'
					    }
					},
		        	{
			           	xtype: 'container',
						id: 'saleCustomerByJoinFormLay',
						cls: 'right_content',
						flex:1,
//						dockedItems: [
//			           ],
						autoScroll : true,
	                    layout: {
	                    	align: 'stretch',
					        type: 'vbox'
					    },
					    items:[
					    {
					    	xtype : 'saleCustomerByJoinForm',
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
			                     		text: '초기화',
			                     		id:'saleCustomerByJoinFormClearBtn',
			                     		cls:'bottomChild',
			                     	},
			                     	{
			                     		xtype:'button',
			                     		text: '저장',
			                     		id:'saleCustomerByJoinFormRegistBtn',
			                     		cls:'bottomChild',
			                     	},
//			                     	{
//			                     		xtype:'button',
//			                     		text: '삭제',
//			                     		id:'saleCustomerByJoinFormDeleteBtn',
//			                     		cls:'bottomChild',
//			                     	}
			              	]
			      	    }
			           ],
					}
			    ],
        	}]
        });
        
    	me.callParent(arguments);
	},
	destory : function(){
		
	}

});