/**
 * 거래처 정보 화면
 * 
 */
Ext.define('Smartax.view.basic.CustomerInfo', {
	
	extend : 'Ext.container.Container',
	
//	cls:'page',
	customerInfo_Grid : null,
	
	xtype : 'customerInfo',
	id:'customerInfo',
	width: '100%',
    height: '100%',
    flex : 1,
	//Store
	customerInfoStore : null,
	customerSearchStore : null,
	padding:'0 25 0 0',	
	autoScroll : true,
	layout : {
            type: 'vbox',
            align: 'stretch'
    },
    
	initComponent:  function(){
		var me = this;
        
        var contents =  {
                xtype: 'container',
                layout: {
			        align: 'middle',
			        type: 'hbox'
			    },
//			    flex:1,
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
                        
                        value: SmartaxCommonStore.SEAR_TRD.getAt(0),
                        store: SmartaxCommonStore.SEAR_TRD, 
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
                        id : 'customerSearch',
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
        
        Ext.applyIf(me, {
        	items : [
        	         	contents,
		        	   {
						xtype: 'container',
		                layout: {
					        type: 'hbox',
					        align: 'stretch'
					    },
//					    flex:1,
					    items: [
				           {
					           	xtype: 'container',
								id: 'customerInfoGridLay',
								flex:1,
								height:(window.innerHeight - 250),
			                    layout: {
			                    	align: 'stretch',
							        type: 'vbox'
							    }
							},
				        	{
					           	xtype: 'panel',
								id: 'trd_reg',
								cls: 'right_content',
								autoScroll : true,
			                    layout: {
			                    	align: 'stretch',
							        type: 'vbox'
							    },
							    items:[
							    {
							    	xtype : 'customerForm',
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