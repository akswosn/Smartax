/**
 *  매입자료입력 메인
 *  
 */
Ext.define('Smartax.view.supertax.TaxPerchaseMain', {
	
	extend : 'Ext.container.Container',
	xtype : 'taxPerchaseMain',
	id:'taxPerchaseMain',
	
	autoScroll : true,
	cls:'page',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex:1,
	
	padding:'0 25 0 0',
	perchaseInvoicePage : null,
	perchaseCheckPage : null,
	
	perchaseInvoiceStore:null,
	perchaseCheckStore:null,
	
	perchaseInvoiceGridStore:null,
	perchaseCheckGridStore:null,
	
	perchaseGrid : null,
	thisSelectTabId : null,
	searchGridStore:null,
    
	initComponent:  function(){
		 var me = this;
		 
		 
		 this.perchaseInvoicePage = new Ext.Component({
			cls:'page',
		    layout: {
		        align: 'stretch',
		        type: 'vbox'
		    },
//		    width: '100%',
//		    height: '100%',
		    flex:1,
		    html:'<iframe id="perchaseInvoiceFrameView" src="./extjs/html/supertax/taxPerchaseInvoice.html" style="width:100%;height:100%" frameborder=0 scrolling="yes" />'
        });
		 
		 this.perchaseCheckPage = new Ext.Component({
				cls:'page',
			    layout: {
			        align: 'stretch',
			        type: 'vbox'
			    },
//			    width: '100%',
//			    height: '100%',
			    flex:1,
			    html:'<iframe id="perchaseCheckFrameView" src="./extjs/html/supertax/taxPerchaseCheck.html" style="width:100%;height:100%" frameborder=0 scrolling="yes" />'
	        });
		 
		 var searchBar = {
	                xtype: 'container',
	                border: false,
	                layout: {
	                    type: 'hbox',
	                    align: 'middle',
//	                    pack: 'start'
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
		                        value: SmartaxCommonStore.SEARCH_TYPE.getAt(0),
		                        valueField: 'CODE',
		                        enableKeyEvents : true,
			                    style: {
			                    	'padding': '0 5px 0 10px'
			                    }
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
                 xtype: 'tabpanel',
                 itemId: 'tab_lay',
                 id:'taxTab',
                 flex: 1,
                 activeTab: 0,
                 items: [{
                     			title : '종이세금계산서',
// 	                    		xtype: 'panel',
                     			xtype: 'container',
 	                    		id:'perchaseInvoiceTab',
 	                    		//autoScroll: true,
// 	                    		overflowY: 'scroll',
 	                    		height : 456,
 			                    layout:{
 			                    	 layout: 'fit'
 			                    },
 			                    flex:1
 				        	},{
                     			title : '종이계산서',
                     			xtype: 'container',
 	                    		id:'perchaseCheckTab',
//                     			xtype: 'panel',
 	                    		//autoScroll: true,
// 	                    		overflowY: 'scroll',
 	                    		height : 456,
 			                    layout:{
 			                    	 layout: 'fit'
 			                    },
 			                    flex:1
 				        	}],
 				   dockedItems: [
							{
								xtype: 'toolbar',
								layout: {
			                        pack: 'end',
			                        type: 'hbox'
			                    },
								dock: 'bottom',
								items: [
//									{
//									    xtype: 'button',
//									    id:'formResetBtn',
//									    text: '초기화',
//									}, 
								 	{
					                    xtype: 'button',
					                    text: '삭제',
					                    id:'formDelBtn'
// 						                    handler: function() {
// 						                    	me.onRequestBasicInfo(function(){
// 						                    		Global.temp =  me.generateClaimPrintData();
// 						                    		//window.open("./extjs/print/add_tax/print_out_add_tax_claim.html", "", "width=795, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
// 						                    		window.open("./extjs/print/add_tax/print_out_add_tax_claim2.html", "", "width=940, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
// 						                    	});
// 						                    }
					                },
					                {
					                    xtype: 'button',
					                    text: '저장',
					                    id:'formSavetBtn'
// 						                    handler: function() {
// 						                    	console.log('generateNabuPrintData');
// 						                    	me.onRequestBasicInfo(function(){
// 						                    		Global.temp =  me.generateNabuPrintData();
// 						                    		window.open("./extjs/print/add_tax/print_out_add_tax_nabbu.html", "", "width=940, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
// 						                    	});
// 						                    }
					                },
								]
	 				     }],
			 },
			 {
	           	xtype: 'container',
				id: 'perchaseGridLay',
				flex:1,
				layout: {
             	align: 'stretch',
			        type: 'vbox'
			    }
			}]
		 });
		 
		 me.callParent(arguments);
	},

});
