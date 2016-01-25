/**
 * 세무 매출자료 다운로드 메뉴 컨트롤러
 */
Ext.define('Smartax.controller.supertax.TaxDataDownloadController',{
	extend: 'Ext.app.Controller',
	id:'taxDataDownloadController',
    
    views: ['supertax.TaxDataDownloadMain'],
//    store : [],
//    
    refs : [
           {
        	   ref : 'taxDataDownloadMain',
        	   selector : 'taxDataDownloadMain'
           },
    ],
    
    
    init: function(app) {
		this.control({
			taxDataDownloadMain : {
				beforerender : function(){
					this.onCreateGrid();
				},
    			afterrender : function(){
    				this.onDefaultRender();
    				this.onStoreLoad();
    			},
			},
			'taxDataDownloadMain > container > [id=search_type]':{
				change : function(){
					this.onLabelChange();
				}
			},
			'taxDataDownloadMain > container > [id=searchBtn]':{
				click:function(){
					this.onSearchGridStoreLoad(Ext.getCmp('search_year').getValue(), Ext.getCmp('search_type').getValue());
				}
			},
			'taxDataDownloadMain > toolbar > [id=flagSaveBtn]':{
				click:function(){
					this.salesFlagUpdate();
				}
			},
//			'[id=taxDataUpload_Grid]':{
//				itemclick: function(dataview, record, item, index, e, eOpts){
//					this.onGridPanelItemClick(dataview, record, item, index, e, eOpts);
//				}
//			},
//			'button[id=pdfDelBtn]':{
//				click : function(){
//					this.onPdfDelete();
//				}
//			},
//			'button[id=pdfUpBtn]':{
//				click : function(){
//					this.onPdfReUpload();
//				}
//			},
			
    	});
    },
    
    onExcelDownload : function(grid, rowIndex, colIndex, item, e, record, type){
    	//type 
    	//1 - 매입
    	//2 - 매출
//    	console.log(record);
    	var thisObj = this.getTaxDataDownloadMain();
    	var date = new Date();
    	var action = '';
    	var code ='';
		var month, day;
    	
		if(date.getMonth() < 9){
    		month = '0' + (date.getMonth()+1);
    	}
    	if(date.getDate() < 10){
    		day = '0'+date.getDate();
    	}
		
		var fileName = date.getFullYear()+''+month+''+day+''
			+ '-'+record.data.co_id+'-'+record.data.co_nm;
    	
    	if(type == '1'){//매입세금계산서
    		 fileName += '-매입계산서.xlsx';
    		 action = '../../proc/tax/download/purchase_excel_download_proc.php';
    		 code = '51,53';
    		 
    		 if(record.data.purchase_count == 0){
//    			 Ext.Msg.alert("", '등록된 자료가 없습니다.');
    			 parent.whenClick('등록된 자료가 없습니다.');
    			 return;
    		 }
    	}
    	else if(type == '2'){
    		 fileName += '-매출계산서.xlsx';
    		 action = '../../proc/tax/download/sales_excel_download_proc.php';
    		 code = '11,13';
    		 
    		 if(record.data.sales_count == 0){
//    			 Ext.Msg.alert("", '등록된 자료가 없습니다.');
    			 parent.whenClick('등록된 자료가 없습니다.');
    			 return;
    		 }
    	}
    	
    	if($('#downloadIframe').length > 0){
    		$('#downloadIframe').remove();
    	}
    	
    	//다운로드 
    	Ext.Msg.confirm('Excel download', 'Excel Download : '+fileName, function(btn, text){
			//console.log(btn);
		    if (btn == 'yes'){
		    	
		    	Printer_Val = {
	    				action : action,
	    				method : 'POST',
	    				params : [
	    				     {name : 'co_id', value : record.data.co_id},
	    				     {name : 'atax_type', value : code},
	    				     {name : 'yyyy', value : record.data.yyyy},
	    				     {name : 'period_flag', value : record.data.period_flag},
	    				     {name : 'downFileName', value : fileName}
	    				]
	    		};
		    	
		        // process text value and close...
    		    Ext.DomHelper.append(document.body, { 
					tag: 'iframe', 
					id : 'downloadIframe',
					frameBorder: 0, 
					width: 0, 
					height: 0, 
					css: 'display:none;visibility:hidden;height:0px;', 
					src: './extjs/html/common_filedownload_submit.html',
				});
    		    
    		    Global.showMask(Ext.getBody(),"잠시후 파일이 다운로드 됩니다.");
    		    
		    	var check = setInterval(function() {
		    		Ext.Ajax.request({
    					method: 'GET',
    					url: './proc/tax/common/excel_download_check.php',
    					success: function(response, opts) {
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
							Global.hideMask();
							Ext.Msg.alert("", json.MSG);
							clearInterval(check);
    					},
    					failure: function(form, action) {
    						Global.hideMask();
    						clearInterval(check);
    						Ext.Msg.alert("", '로딩 실패!');
    					}
    				});
		    	}, 500);
		    }
		});
    	
    },
    salesFlagUpdate : function(){
    	var thisObj = this.getTaxDataDownloadMain();
    	var select = thisObj.taxDataDownloadGrid.getSelectionModel().getSelection()[0];
    	//console.log(select);
//    	//console.log(select.data);
    	
    	if(select){
    		//console.log(select.data.sales_upload_flag);
    		if(select.data.sales_upload_flag != 'y'){
//    			Ext.Msg.alert("", '매출자료 파일이 업로드 되어 있지 않습니다.');
    			parent.whenClick('매출자료 파일이 업로드 되어 있지 않습니다.');
    			return;
    		}
    		
    		Ext.Msg.confirm('수정', '선택하신 \"'+select.data.co_nm+'\" 처리여부를 변경 하시겠습니까?', function(btn, text){
    		    if (btn == 'yes'){
    		    	var param = {
    		    			co_id : select.data.co_id,
    		    			yyyy : select.data.yyyy,
    		    			period_flag : select.data.period_flag,
    		    			tax_complete_flag : select.data.tax_complete_flag
    		    	};
    		    	
    		    	var store1 = thisObj.taxDataDownloadFileStore;
    		    	var store2 = thisObj.taxDataDownloadGridStore;
    		    	
    		    	Ext.Ajax.request({
    					method: 'POST',
    					params: param,
    					url: './proc/tax/u_tax/tax_download_update_proc.php',
    					success: function(response, opts) {
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
    						if(json.CODE == '00'){
    							
    							var model = null;
    		         			Ext.each(store1.data.items, function(){
    		 	      	    			if(this.data.co_id == param.co_id 
    		 	      	    					&& this.data.yyyy == param.yyyy 
    		 	      	    					&& this.data.period_flag == param.period_flag){
    		 	      	    				model= this;
    		 	      	    			}
    		 	      	    	});
    		         			  
    		         			model.set(param);
    		      				model.commit(); 
    		      				
    			      			var model2 = null;
    			      			Ext.each(store2.data.items, function(){
    			      	    			if(this.data.co_id == param.co_id){
    			      	    				model2= this;
    			      	    			}
    			      	    	});
    			   				model2.set(param);
    			   				model2.commit(); 
    			   				
    			   				Ext.Msg.alert("", '수정되었습니다.');
//    							controller.onSearchGridStoreLoad(Ext.getCmp('search_year').getValue(), Ext.getCmp('search_type').getValue());
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
    		    }
    		});
    	}
    	else {
//    		Ext.Msg.alert("", '변경하실 정보를 선택해 주세요');
    		parent.whenClick('변경하실 정보를 선택해 주세요');
    	}
    	
    },
    //최초랜딩
    onDefaultRender : function(){
    	var date = new Date();
//    	
    	var this_mm = date.getMonth()+1;
    	if(this_mm > 6){
    		Ext.getCmp('search_type').setValue(SmartaxCommonStore.SEARCH_TYPE.getAt(1));
    	}
    	else {
    		Ext.getCmp('search_type').setValue(SmartaxCommonStore.SEARCH_TYPE.getAt(0));
    	}
    },
    
    //스토어 조회
    onStoreLoad : function(){
    	var thisObj = this.getTaxDataDownloadMain();
    	var controller = this;
    	if(thisObj.taxDataDownloadCompStore == null || thisObj.taxDataDownloadFileStore == null){
    		thisObj.taxDataDownloadCompStore = Ext.create('Smartax.store.supertax.TaxDataDownloadStore');
    		thisObj.taxDataDownloadFileStore = Ext.create('Smartax.store.supertax.TaxDataDownloadStore');
    	}
    	else {
    		thisObj.taxDataDownloadCompStore.removeAll();
    		thisObj.taxDataDownloadFileStore.removeAll();
    	}
    	
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			params: {type : '2'},
			url: './proc/tax/u_tax/tax_download_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				console.log(json);
				if(json.CODE == '00'){
					if(json.COMP){
						thisObj.taxDataDownloadCompStore.add(json.COMP);
					}
					if(json.DATA){
						thisObj.taxDataDownloadFileStore.add(json.DATA);
					}
					//console.log(json)
					controller.onSearchGridStoreLoad(Ext.getCmp('search_year').getValue(), Ext.getCmp('search_type').getValue());
					
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
    //pdf 다운로드
    onPdfDownload : function(grid, rowIndex, colIndex, item, e, record){
    	//console.log(record);
    	var thisObj = this.getTaxDataDownloadMain();
    	
    	if(record.data.sales_upload_flag == 'y'){
    		var url = "./upload/service/sales/" + record.data.sales_upload_pdf;
//    		window.open(url, '_blank');
    		
    		var date = new Date();
    		
    		var fileName = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate()
    			+ '-'+record.data.co_id+'-'+record.data.co_nm+'-신용매출.pdf';
    		
    		
    		Ext.Msg.confirm('PDF download', 'PDF Download : '+fileName, function(btn, text){
    			//console.log(btn);
    		    if (btn == 'yes'){
    		    	
    		    	Printer_Val = {
    	    				action : '../../proc/tax/download/sales_pdf_file_download.php',
    	    				method : 'POST',
    	    				params : [
    	    				     {name : 'fileName', value : record.data.sales_upload_pdf},
    	    				     {name : 'downFileName', value : fileName}
    	    				]
    	    		};
    		    	
    		    	if(Ext.getCmp('downloadIframe')){
    		    		Ext.getCmp('downloadIframe').destory();
    		    	}
    		    	
    		        // process text value and close...
	    		    Ext.DomHelper.append(document.body, { 
						tag: 'iframe', 
						id : 'downloadIframe',
						frameBorder: 0, 
						width: 0, 
						height: 0, 
						css: 'display:none;visibility:hidden;height:0px;', 
						src: './extjs/html/common_filedownload_submit.html',
					});
	    		    
    		    }
    		});
    		
    		
    	}
    	else {
//    		Ext.Msg.alert("", '등록된 파일이 존재하지 않습니다.');
    		parent.whenClick('등록된 파일이 존재하지 않습니다.');
    		return;
    	}
    	
    },
  //그리드 생성
    onCreateGrid : function(){
    	var contolloer = this;
    	var viewObj = this.getTaxDataDownloadMain();
    	Ext.getCmp('taxDataDownloadGridLay').removeAll();
    	
    	if(viewObj.taxDataDownloadGrid != null){
    		viewObj.taxDataDownloadGrid.destroy();
    		viewObj.taxDataDownloadGrid = null;
    	}
    	
    	if(viewObj.taxDataDownloadGridStore == null)viewObj.taxDataDownloadGridStore = Ext.create('Smartax.store.supertax.TaxDataDownloadStore'); 
    	else viewObj.taxDataDownloadGridStore.removeAll();
    	
    	viewObj.taxDataDownloadGrid = Ext.create('Ext.grid.Panel', {
    		cls:'grid',
    		id:'taxDataDownload_Grid',
//    		title:'입력리스트',
    		width:'100%',
    		height : window.innerHeight-280,
    		autoScroll:true,
    		flex:1,
    		store: viewObj.taxDataDownloadGridStore,
    		loadMask: true,
    		columns: [
    		          { xtype: 'gridcolumn', dataIndex: 'co_id', align:'center', sortable: true, text: '회사코드', width: '5%',},
    		          { xtype: 'gridcolumn', dataIndex: 'co_nm', align:'center', sortable: true, text: '상호', width: '10%',},
    		          { xtype: 'gridcolumn', dataIndex: 'co_saup_no', align:'center', sortable: true, text: '사업자번호', width: '11%'},
    		          { xtype: 'gridcolumn', dataIndex: 'co_tel', align:'center', sortable: true, text: '전화번호', width: '11%' },
    		          { 
    		        	  xtype: 'gridcolumn', dataIndex: 'sales_upload_flag', align:'center', sortable: true, text: '매출자료<br/>파일', width: '9%' 
		        		  ,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
	                            if (value == 'y') {
	                            	return '등록';
	                            }
	                            else return '미등록' ;
	                        }  
    		          },
    		          {
    		        	  xtype : 'actioncolumn',
    		              header : '매츨지료<br>다운로드',
    		              width : '12%',
    		              align : 'center',
    		              items : [
    		                  {
    		                      icon:'./extjs/img/download.png',
    		                      tooltip : '다운로드',
//    		                      id:'pdfUploadBtn',
    		                      handler : function (grid, rowIndex, colIndex, item, e, record) {
    		                    	  contolloer.onPdfDownload(grid, rowIndex, colIndex, item, e, record);
    		                      },
    		                  }
    		              ]
    		          },
    		          { xtype: 'gridcolumn', dataIndex: 'purchase_count', align:'center', sortable: true, text: '매입(세금) 계산서 입력건수', width: '9%' },
    		          {
    		        	  xtype : 'actioncolumn',
    		              header : '매입(세금) 계산서<br>다운로드',
    		              width : '8%',
    		              align : 'center',
    		              items : [
    		                  {
    		                      icon:'./extjs/img/download.png',
    		                      tooltip : '다운로드',
//    		                      id:'pdfUploadBtn',
    		                      handler : function (grid, rowIndex, colIndex, item, e, record) {
    		                    	  contolloer.onExcelDownload(grid, rowIndex, colIndex, item, e, record, '1');
    		                      },
    		                  }
    		              ]
    		          },
    		          { xtype: 'gridcolumn', dataIndex: 'sales_count', align:'center', sortable: true, text: '매출(세금) 계산서 입력건수', width: '8%' },
    		          {
    		        	  xtype : 'actioncolumn',
    		              header : '매출(세금) 계산서<br>다운로드',
    		              width : '8%',
    		              align : 'center',
    		              items : [
    		                  {
    		                      icon:'./extjs/img/download.png',
    		                      tooltip : '다운로드',
//    		                      id:'pdfUploadBtn',
    		                      handler : function (grid, rowIndex, colIndex, item, e, record) {
			                    	  contolloer.onExcelDownload(grid, rowIndex, colIndex, item, e, record, '2');
			                      },
    		                  }
    		              ]
    		          },
    		          { 
    		        	  xtype: 'gridcolumn', dataIndex: 'tax_complete_flag', align:'center', sortable: true, text: '처리여부', width: '8%' ,
    		        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
 			        		  if(value == 'y'){
	                            	return '처리';
	                            }
	                             else return '미처리' ;
	                        },
    		        	  editor: {
 	                    	 	xtype : 'combobox',
 	                    	 	store: Ext.create('Ext.data.Store',{
 	                   	    	fields: [
 	                   		            { name: 'CODE' },
 	                   		            { name: 'TEXT' }
 	                   		        ],
 	                   		        data:[
 	                   		        	{CODE: 'y', TEXT: '처리'},
 	                   		        	{CODE: 'n', TEXT: '미처리'},
 	                   		        ]
 	                   		    }),
							    editable:false,
							    selectOnFocus: true,
							    queryMode: 'local',
							    displayField: 'TEXT',
							    valueField: 'CODE',
							    enableKeyEvents : true,
							    listeners: {
							    	render : {
							    		fn : function(obj, e){
//							    			//console.log(this);
//							    			//console.log(obj.owner);
//							    			//console.log(e);
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
    		        		  
    		          },
    		          ],
			          selModel: {
			        	  pruneRemoved: false
			          },
//    		          viewConfig: {
//    		        	  trackOver: false
//    		          },
    		          plugins : [     
    		                 Ext.create('Ext.grid.plugin.CellEditing',         
								{             
								    clicksToEdit: 1,
								}),
		                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
		                     })
                     ],
//                     listeners: {
//                    	 itemclick: {
//                    		 fn: this.onGridPanelItemClick,
//                    		 scope: this.getTaxPerchaseMain()
//                    	 }
//                     }
    	});
    	Ext.getCmp('taxDataDownloadGridLay').add(viewObj.taxDataDownloadGrid);
    },
    
  //라벨 변경 이벤트
    onLabelChange : function(){
    	var v = Ext.getCmp('search_type').getValue();
    	
    	if(v == '1'){
    		Ext.getCmp('search_date').setText('[1월 1일 ~ 6월 30일]');
    	}
    	else {
    		Ext.getCmp('search_date').setText('[7월 1일 ~ 12월 31일]');
    	}
    },
  //grid store 셋
    onSearchGridStoreLoad:function(yyyy, type){
    	//console.log(yyyy);
    	//console.log(type);
    	var thisObj = this.getTaxDataDownloadMain();
//    	//console.log(thisObj.taxDataDownloadGridStore);
    	//console.log(thisObj.taxDataDownloadFileStore.data);
//    	//console.log(thisObj.taxDataDownloadCompStore);
    	
    	
		thisObj.taxDataDownloadGridStore.removeAll();
    	
    	if(thisObj.taxDataDownloadFileStore.data.length > 0){
			for(var j = 0; j < thisObj.taxDataDownloadCompStore.data.length; j++){
				var compData = thisObj.taxDataDownloadCompStore.data.items[j].data;
    			var isAdd = false;
    			for(var i = 0; i < thisObj.taxDataDownloadFileStore.data.length; i++){
    				var fileData = thisObj.taxDataDownloadFileStore.data.items[i].data;
    				if(fileData.co_id == compData.co_id){
    					if(fileData.yyyy+'' == yyyy+'' && fileData.period_flag+'' == type+''){
    						thisObj.taxDataDownloadGridStore.add(fileData);
    						isAdd = true;
    					}
    				}
    			}
    			if(!isAdd){
    				thisObj.taxDataDownloadGridStore.add(compData);
    			}
    		}
    	}
    	else {
    		thisObj.taxDataDownloadGridStore.add(thisObj.taxDataDownloadCompStore.data.items);
    	}
    	
    },
    
});