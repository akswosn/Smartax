/**
 * 세무 고객관리 컨트롤러
 */
Ext.define('Smartax.controller.basic.TaxCustomerInfoController',{
	extend: 'Ext.app.Controller',
	
    views: ['basic.TaxCustomerInfo'],
    stores : ['basic.TaxCustomerInfoStore'],
    refs : [
           {
        	   ref : 'taxCustomerInfo',
        	   selector : 'taxCustomerInfo'
           }
    ],
    
    init: function(app) {
    	this.control({
    		taxCustomerInfo : {
    			beforerender : function(){
    				this.onTaxCustomerStore();
    			},
			},
			'[id=taxCustomerInfo_Grid]':{
				itemclick: function(dataview, record, item, index, e, eOpts){
					this.onGridPanelItemClick(dataview, record, item, index, e, eOpts);
				}
			},
			
			//검색
			'taxCustomerInfo > container > [id=taxCustomerSearch]':{
				click:function(){
					this.onTaxCustomerSearch();
				}
			},
			//인쇄
			'taxCustomerInfo > container > toolbar > [id=saup_print_btn]':{
				click:function(){
					this.imagePrint(Ext.get('imgview_saup'));
				}
			},
			//인쇄
			'taxCustomerInfo > container > toolbar > [id=deapyo_print_btn]':{
				click:function(){
					this.imagePrint(Ext.get('imgview_deapyo'));
				}
			},
			'taxCustomerInfo > container > toolbar > [id=save_btn]':{
				click:function(){
					this.onSaveCust(Ext.get('imgview_deapyo'));
				}
			},
			
//			//등록버튼
//			'saleCustomerInfo > [xtype=container] > [id=saleCustomerFormLay]> [xtype=toolbar]> button[id=saleCustomerFormRegistBtn]':{
//				click:function(){
//					this.onRegistSaleCust();
//				}
//			},
//			//초기화버튼
//			'saleCustomerInfo > [xtype=container] > [id=saleCustomerFormLay]> [xtype=toolbar]> button[id=saleCustomerFormClearBtn]':{
//				click:function(){
//					this.formReset();
//				}
//			},
//			//삭제
//			'saleCustomerInfo > [xtype=container] > [id=saleCustomerInfoGridLay] > [id=saleCustomerInfo_Grid]>toolbar>[id=delBtn]':{
//				click:function(){
//					this.onDeleteItems();
//				}
//			},
    	});
    },
    onSaveCust : function(){
    	var controller = this;
    	var thisObj = this.getTaxCustomerInfo();
    	var selector = thisObj.taxCustomerInfo_Grid.getSelectionModel().getSelection()[0];
    	//console.log(selector);
    	
    	var param = {
    			co_id : selector.data.co_id,
				bigo : selector.data.bigo,
				tax_account_flag: selector.data.tax_account_flag,
				tax_delegate_flag: selector.data.tax_delegate_flag
		};
    	//console.log(param);
    	
    	var store1 = thisObj.taxCustomerSearchStore;
    	var store2 = thisObj.taxCustomerInfoStore;
    	
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			params : param,
			url: './proc/tax/u_tax/tax_customer_update_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				//console.log(response.responseText);
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					var model = store1.findRecord('co_id', param.co_id, null, null, null, true);
					model.set(selector);
					model.commit(); 
					var model2 = store2.findRecord('co_id', param.co_id, null, null, null, true);
					model2.set(selector);
					model2.commit(); 
					Ext.Msg.alert("", '수정되었습니다.');
					
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
    
    imagePrint : function(obj){
    	if(obj.dom.src.indexOf('upload') > -1){
    		var title='';
    		if(obj.dom.src.indexOf('saup') > -1){
    			title  ='사업자등록증';
    		}
    		else if (obj.dom.src.indexOf('deapyo') > -1){
    			title  ='대표자신분증';
    		}
    		
    		Printer_Val = {};
    		Printer_Val.src = obj.dom.src;
    		window.open(
    				"./extjs/html/print/print_out_type1_output.html"
    				, title
    				, "width=680, height=800, toolbar=no, menubar=no, scrollbars=yes, location=no"
    		);
    	}
    	else {
//    		Ext.Msg.alert("", '출력할 이미지가 선택되지 않았습니다.');
    		parent.whenClick('출력할 이미지가 선택되지 않았습니다.');
    	}
    	
    },
    
    onTaxCustomerSearch : function(){
    	
    	var chk_delegate_search = Ext.getCmp('chk_delegate_search').getValue();
    	var chk_account_search = Ext.getCmp('chk_account_search').getValue();
    	
    	var search_tp = Ext.getCmp('search_tp').getValue();
    	var thisObj = this.getTaxCustomerInfo();
    	//console.log(chk_delegate_search || chk_account_search);
    	if(search_tp)
    	{
    		//초기화
    		thisObj.taxCustomerSearchStore = null;
    		thisObj.taxCustomerInfo_Grid = null;
    		Ext.getCmp('taxCustomerInfoGridLay').removeAll();
    		if(search_tp == '00' || search_tp == '전체')
    		{
    			if(chk_delegate_search || chk_account_search)
    			{
    				var dataArr = [];
    				for(var i=0; i<thisObj.taxCustomerInfoStore.getCount(); i++)
        			{
        				record = thisObj.taxCustomerInfoStore.getAt(i);
        				if(chk_delegate_search)
        				{
        					if(record.get('tax_delegate_flag') == 'y'){
        						dataArr.push(record);	    					
        					}
        				}
        				else {
    						dataArr.push(record);	    					
    					}
        				
        				if(chk_account_search)
        				{
        					if(record.get('tax_account_flag') == 'y'){
        						dataArr.push(record);	    					
        					}
        				}
        				else {
    						dataArr.push(record);	    					
    					}
        			}
    				this.onLoadTaxCustomerInfoGrid(dataArr);				 
    			}
    			else {
    				this.onLoadTaxCustomerInfoGrid(thisObj.taxCustomerInfoStore.data.items);
    			}
    		}
    		else
    		{
    			var search_nm = Ext.getCmp('search_nm').getValue();
    			var dataArr = [];
    			for(var i=0; i<thisObj.taxCustomerInfoStore.getCount(); i++)
    			{
    				record = thisObj.taxCustomerInfoStore.getAt(i);
    				if(record.get(search_tp).indexOf(search_nm) > -1)
    				{
    					if(chk_delegate_search || chk_account_search)
        				{
    						if(record.get('tax_account_flag') == 'y'){
        						dataArr.push(record);	    					
        					}
    						
    						if(record.get('tax_delegate_flag') == 'y'){
        						dataArr.push(record);	    					
        					}
        				}
    					else {
    						dataArr.push(record);	    					
    					}
    				}
    			}
    			this.onLoadTaxCustomerInfoGrid(dataArr);				    			
    		} 
    	}
    },
    
    //세무 관리 회원 조회
    onTaxCustomerStore : function(){
    	var thisObj = this;
    	
    	if(thisObj.getTaxCustomerInfo().taxCustomerInfoStore == null){
    		thisObj.getTaxCustomerInfo().taxCustomerInfoStore = Ext.create('Smartax.store.basic.TaxCustomerInfoStore');
    	}
    	
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/tax/u_tax/tax_customer_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				//console.log(response.responseText);
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					console.log(json.DATA);
					
					thisObj.getTaxCustomerInfo().taxCustomerInfoStore.removeAll();
					if(json.DATA != null){
						thisObj.getTaxCustomerInfo().taxCustomerInfoStore.add(json.DATA);
					}
					//console.log(json.DATA);
					thisObj.onLoadTaxCustomerInfoGrid(thisObj.getTaxCustomerInfo().taxCustomerInfoStore.data.items);
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
    
    //그리드 생성
    onLoadTaxCustomerInfoGrid : function (dataArr){
    	var viewObj = this.getTaxCustomerInfo();
    	
    	if(viewObj.taxCustomerSearchStore != null){
    		viewObj.taxCustomerSearchStore.destroy();
    		viewObj.taxCustomerSearchStore = null;
    	}
    	//console.log(dataArr);
    	if(dataArr != null){
    		viewObj.taxCustomerSearchStore = Ext.create("Smartax.store.basic.TaxCustomerInfoStore", {
    			proxy: {
    				type: 'memory',
    				enablePaging: true,
    				data: dataArr,
    				reader: {
    					type: 'array'
    				},
    			},
    			
    			autoLoad : true,
    			pageSize: 30000,
    			remoteSort: true
    		});
    	}
    	
    	//console.log(viewObj.taxCustomerSearchStore);
    	if(viewObj.taxCustomerInfo_Grid == null){
    		Ext.getCmp('taxCustomerInfoGridLay').removeAll();
    		
    		viewObj.taxCustomerInfo_Grid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'taxCustomerInfo_Grid',	
    			autoScroll:true,
    			flex:1,
    			store: viewObj.taxCustomerSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'sale_code', align:'center', sortable: true, text: '고객<br>코드', width: '5%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_id', style: 'textAlign:center', sortable: true, text: '회사<br>코드', width: '5%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_nm', style: 'textAlign:center', sortable: true, text: '상호', width: '15%'},
    			          { xtype: 'gridcolumn', align:'center' ,dataIndex: 'co_saup_no', style: 'text-align:center', sortable: true, text: '사업자번호', width: '10%' },
    			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'co_tel', style: 'text-align:center', sortable: true, text: '전화번호', width: '10%' },
    			          {
    			        	  xtype: 'gridcolumn', align:'center', dataIndex: 'upload_saup_flag', style: 'text-align:center', sortable: true, text: '사업자<br/>등록증', width: '5%', 
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    	                             if(value == 'y'){
    	                            	return '유';
    	                            }
    	                             else return '무' ;
    	                        }
    			          },
    			          { 
    			        	  xtype: 'gridcolumn', align:'center' , dataIndex: 'upload_deapyo_flag', style: 'text-align:center', sortable: true, text: '대표자<br/>신분증', width: '5%',
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    			        		  if(value == 'y'){
  	                            	return '유';
  	                            }
  	                             else return '무' ;
  	                        }
    			           },
      			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'hometax_id', style: 'text-align:center', sortable: true, text: '홈텍스<br>ID', width: '8%' },
     			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'hometax_pwd', style: 'text-align:center', sortable: true, text: '홈텍스<br>PWD', width: '8%' },
    			           { 
     			        	  xtype: 'gridcolumn', align:'center' , dataIndex: 'tax_delegate_flag', style: 'text-align:center', sortable: true, text: '수임<br/>동의', width: '7%',
     			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
     			        		  if(value == 'y'){
   	                            	return '처리';
   	                            }
   	                             else return '미처리' ;
   	                        },
	   	                     editor: {
	   	                    	 	xtype : 'combobox',
	   	                    	 	store: SmartaxCommonStore.TAX_PROCESS_YN,
								    editable:false,
								    selectOnFocus: true,
								    queryMode: 'local',
								    displayField: 'TEXT',
								    valueField: 'CODE',
								    enableKeyEvents : true,
								    listeners: {
								    	render : {
								    		fn : function(obj, e){
//								    			//console.log(this);
//								    			//console.log(obj.owner);
//								    			//console.log(e);
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
								},
     			           },
     			          { 
     			        	  xtype: 'gridcolumn', align:'center' , dataIndex: 'tax_account_flag', style: 'text-align:center', sortable: true, text: '계정생성<br/>(세무프로그램)', width: '14%',
     			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
     			        		  if(value == 'y'){
   	                            	return '처리';
   	                            }
   	                             else return '미처리' ;
   	                        },
   	                     editor: {
	                    	 	xtype : 'combobox',
	                    	 	store: SmartaxCommonStore.TAX_PROCESS_YN,
							    editable:false,
							    selectOnFocus: true,
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
							},
     			           },
     			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'bigo', style: 'text-align:center', sortable: true, text: '영업요청', width: '7%' ,
     			        	  editor: {
	                            	xtype: 'textfield',
	                            	selectOnFocus:true,
									fieldStyle: 'text-align: right;',
									enableKeyEvents : true,
					                listeners: {
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
     			          },
    			          ],
//    			          dockedItems: [{
//    			        	  xtype: 'toolbar',
//    			        	  dock: 'bottom',
//    			        	  layout: {
//  			                    pack: 'end',
//  			                    type: 'hbox'
//  			                  },
//    			        	  items: [
//    			        	          {
//    			        	        	  xtype:'button',
//    			        	        	  text: '삭제',
//    			        	        	  cls:'bottomChild',
//    			        	        	  id : 'delBtn',
//    			        	          },
//    			        	          ]
//    			          }],
//    			          selModel: Ext.create('Ext.selection.CheckboxModel', {
//	                    	pruneRemoved: false,
//	                    	checkOnly: true,
//	                		mode: 'MULTI' 
//	                    }),
    			          viewConfig: {
    			        	  trackOver: false
    			          },
    			          plugins: [         
									Ext.create('Ext.grid.plugin.CellEditing',         
									{             
									    clicksToEdit: 1,
//								        listeners: {
//								        	beforeedit:{
//								        		fn: me.onBeforeEditCheck,
//								        		scope: me 
//							              	},
//								            edit:{
//								        		fn: me.onAfterEditCheck,
//								        		scope: me 
//							              	},
//							              	canceledit: function (editor, e, eOpts) {
//										    	Global.cellPos = {row: e.rowIdx, column: e.colIdx};
//										    } 
//								        }         
									}),
									Ext.create('Ext.grid.plugin.BufferedRenderer', {
									})
								]
    		});
    	}
		Ext.getCmp('taxCustomerInfoGridLay').add(viewObj.taxCustomerInfo_Grid);
    },
   
    
    onGridPanelItemClick : function(dataview, record, item, index, e, eOpts){
    	var controller = this;
    	var imgview_saup = Ext.get('imgview_saup');
    	var imgview_deapyo = Ext.get('imgview_deapyo');
    	
    	//console.log(imgview_saup);
    	
    	if(record.data.upload_saup_flag == 'y'){
    		imgview_saup.dom.src = './upload/service/saup/'+record.data.upload_saup_file;
    		imgview_saup.on('click', function(btn, el){
    			controller.openPopup(imgview_saup);
    		});
    	}
    	else {
    		imgview_saup.dom.src = '';
    	}
    	
    	if(record.data.upload_deapyo_flag == 'y'){
    		imgview_deapyo.dom.src = ('./upload/service/deapyo/'+record.data.upload_deapyo_file);
    		imgview_deapyo.on('click', function(btn, el){
    			controller.openPopup(imgview_deapyo);
    		});
    	}
    	else {
    		imgview_deapyo.dom.src = '';
    	}
    	
    },
    openPopup : function(obj){
    	//console.log('openPopup');
    	//console.log(obj.dom.src);
    	
    	if(obj.dom.src.indexOf('upload') > -1){
    		var title='';
    		if(obj.dom.src.indexOf('saup') > -1){
    			title  ='사업자등록증';
    		}
    		else if (obj.dom.src.indexOf('deapyo') > -1){
    			title  ='대표자신분증';
    		}
    		
    		Global.openImagePopup(obj.dom.src, title);
    	}
    }
});