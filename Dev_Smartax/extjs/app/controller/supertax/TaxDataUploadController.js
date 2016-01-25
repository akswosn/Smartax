/**
 * 영업 매출자료 업로드 메뉴 컨트롤러
 */
Ext.define('Smartax.controller.supertax.TaxDataUploadController',{
	extend: 'Ext.app.Controller',
	id:'taxDataUploadController',
    
    views: ['supertax.TaxDataUploadMain'],
//    store : [],
//    
    refs : [
           {
        	   ref : 'taxDataUploadMain',
        	   selector : 'taxDataUploadMain'
           },
    ],
    
    
    init: function(app) {
		this.control({
			taxDataUploadMain : {
				beforerender : function(){
//					this.onDefaultRender();
//    				this.onStoreLoad();
					this.onCreateGrid();
				},
    			afterrender : function(){
    				this.onDefaultRender();
    				this.onStoreLoad();
    			},
			},
			'taxDataUploadMain > container > [id=search_type]':{
				change : function(){
					this.onLabelChange();
				}
			},
			'taxDataUploadMain > container > [id=searchBtn]':{
				click:function(){
					this.onSearchGridStoreLoad(Ext.getCmp('search_year').getValue(), Ext.getCmp('search_type').getValue());
				}
			},
			'[id=taxDataUpload_Grid]':{
				itemclick: function(dataview, record, item, index, e, eOpts){
					this.onGridPanelItemClick(dataview, record, item, index, e, eOpts);
				}
			},
			'button[id=pdfDelBtn]':{
				click : function(){
					this.onPdfDelete();
				}
			},
			'button[id=pdfUpBtn]':{
				click : function(){
					this.onPdfReUpload();
				}
			},
//			'button[id=formClearBtn]':{
//				click : function(){
//					this.formClean();
//				}
//			},
			'button[id=formSaveBtn]':{
				click : function(){
					this.formSave();
				}
			}
			
    	});
    },
    formSave : function(){
    	var thisObj = this.getTaxDataUploadMain();
    	var select = thisObj.taxDataUploadGrid.getSelectionModel().getSelection()[0];
    	var controller = this;
    	var gridStore = thisObj.taxDataUploadGridStore;
     	var fileStore = thisObj.taxDataUploadFileStore;
     	var bigo = Ext.getCmp('right_contents_bigo').getValue()
    	if(select){
    		console.log(select);
    		Ext.Ajax.request({
    			method: 'POST',
    			params	 : {
    				bigo : bigo,
    				atax_van_id : select.data.atax_van_id
    			} ,
    			url: './proc/tax/u_sales/tax_upload_update_proc.php',
    			success: function(response, opts) {
    				Global.hideMask();
    				var json = Ext.JSON.decode(response.responseText);
    				//console.log(json);
    				if(json.CODE == '00'){
    					var model = gridStore.findRecord('atax_van_id',select.data.atax_van_id, null, null, null, true);
						model.set({bigo : bigo});
						model.commit(); 
						var model2 = fileStore.findRecord('atax_van_id', select.data.atax_van_id, null, null, null, true);
						model2.set({bigo : bigo});
						model2.commit(); 
             			  
    	   				controller.formClean();
    	         		Ext.Msg.alert('', '정상적으로 저장 되었습니다.');
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
    },
    formClean : function(){
    	$('#pdf_viewer > object').remove();
		$('#pdf_viewer').text('미리 보기');
		Ext.getCmp('right_contents_bigo').setValue('');
    	Ext.getCmp('right_contents_co_id').setValue('');
    	Ext.getCmp('right_contents_yyyy').setValue('');
    	Ext.getCmp('right_contents_period_flag').setValue('');
    },
    
    onGridPanelItemClick : function(dataview, record, item, index, e, eOpts){
    	//console.log(record);
    	var filepath = './upload/service/sales/'+record.data.sales_upload_pdf;
    	
    	if(record.data.sales_upload_flag == 'y'){
    		//pdf 이미지 뷰어
    		var myPDF = new PDFObject({ 
				
			      url: filepath,
			      pdfOpenParams: { view: 'FitH' }
			
			    }).embed('pdf_viewer');  
    	}
    	else {
    		$('#pdf_viewer > object').remove();
    		$('#pdf_viewer').text('미리 보기');
    	}
    	//console.log(record.data.bigo);
    	
    	Ext.getCmp('right_contents_bigo').setValue(record.data.bigo);
    	Ext.getCmp('right_contents_co_id').setValue(record.data.co_id);
    	Ext.getCmp('right_contents_yyyy').setValue(record.data.yyyy);
    	Ext.getCmp('right_contents_period_flag').setValue(record.data.period_flag);
    	Ext.getCmp('right_contents_atax_van_id').setValue(record.data.atax_van_id);
    	
    	//console.log(Ext.getCmp('bigo'));
    },
    
    //그리드 생성
    onCreateGrid : function(){
    	var contolloer = this;
    	var viewObj = this.getTaxDataUploadMain();
    	Ext.getCmp('taxDataGridLay').removeAll();
    	
    	if(viewObj.taxDataUploadGrid != null){
    		viewObj.taxDataUploadGrid.destroy();
    		viewObj.taxDataUploadGrid = null;
    	}
    	
    	if(viewObj.taxDataUploadGridStore == null)viewObj.taxDataUploadGridStore = Ext.create('Smartax.store.supertax.TaxDataUploadStore'); 
    	else viewObj.taxDataUploadGridStore.removeAll();
    	
    	viewObj.taxDataUploadGrid = Ext.create('Ext.grid.Panel', {
    		cls:'grid',
    		id:'taxDataUpload_Grid',
//    		title:'입력리스트',
    		width:'100%',
    		autoScroll:true,
    		flex:1,
    		store: viewObj.taxDataUploadGridStore,
    		loadMask: true,
    		columns: [
    		          { xtype: 'gridcolumn', dataIndex: 'co_id', align:'center', sortable: true, text: '회사코드', width: '12%',},
    		          { xtype: 'gridcolumn', dataIndex: 'co_nm', align:'center', sortable: true, text: '상호', width: '20%',},
    		          { xtype: 'gridcolumn', dataIndex: 'co_saup_no', align:'center', sortable: true, text: '사업자번호', width: '16%'},
    		          { xtype: 'gridcolumn', dataIndex: 'co_tel', align:'center', sortable: true, text: '전화번호', width: '17%' },
    		          { 
    		        	  xtype: 'gridcolumn', dataIndex: 'sales_upload_flag', align:'center', sortable: true, text: '매출자료<br/>파일', width: '12%' 
		        		  ,renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
	                            if (value == 'y') {
	                            	return '등록';
	                            }
	                            else return '미등록' ;
	                        }  
    		          },
    		          { xtype: 'datecolumn', format:'m.d', dataIndex: 'reg_date', align:'center', sortable: true, text: '등록일', width: '10%' 
    		          },
    		          {
    		        	  xtype : 'actioncolumn',
    		              header : '업로드',
    		              width : '12%',
    		              align : 'center',
    		              items : [
    		                  {
    		                      icon:'./extjs/img/upload.png',
    		                      tooltip : '업로드',
    		                      id:'pdfUploadBtn',
    		                      handler : function (grid, rowIndex, colIndex, item, e, record) {
    		                    	  contolloer.onPdfUpload(grid, rowIndex, colIndex, item, e, record);
    		                      },
    		                  }
    		              ]
    		          }
    		          ],
			          selModel: {
			        	  pruneRemoved: false
			          },
//    		          viewConfig: {
//    		        	  trackOver: false
//    		          },
    		          plugins : [         
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
    	Ext.getCmp('taxDataGridLay').add(viewObj.taxDataUploadGrid);
    },
    //
    onPdfReUpload:function(){
    	var co_id = Ext.getCmp('right_contents_co_id').getValue();
    	var bigo =	Ext.getCmp('right_contents_bigo').getValue();
    	var yyyy = Ext.getCmp('right_contents_yyyy').getValue();
    	var period_flag = Ext.getCmp('right_contents_period_flag').getValue();
    	var thisObj = this.getTaxDataUploadMain();
    	var atax_van_id =  Ext.getCmp('right_contents_atax_van_id').getValue();
    	
    	if(co_id == '' || co_id == null){
    		//console.log('미선택');
    		return;
    	}
    	if(yyyy == '' || yyyy == null){
    		yyyy = Ext.getCmp('search_year').getValue()
    	}
    	
    	if(period_flag == '' || period_flag ==null){
    		period_flag = Ext.getCmp('search_type').getValue();
    	}
    	
    	var pdfWindow = Ext.create('Smartax.view.popup.CommonPopSalesPDFUpload');
    	pdfWindow.items.get(0).getForm().setValues({
    		co_id : co_id,
    		yyyy : yyyy,
    		period_flag : period_flag,
    		bigo : bigo,
    	});
    	atax_van_id : atax_van_id
    	Global.openPopup(pdfWindow, "PDF 업로드");
    	
    	
    },
    onPdfDelete : function(){
    	var atax_van_id =  Ext.getCmp('right_contents_atax_van_id').getValue();
    	var co_id = Ext.getCmp('right_contents_co_id').getValue();
    	var bigo =	Ext.getCmp('right_contents_bigo').getValue();
    	var yyyy = Ext.getCmp('right_contents_yyyy').getValue();
    	var period_flag = Ext.getCmp('right_contents_period_flag').getValue();
    	var thisObj = this.getTaxDataUploadMain();
    	var controller = this;
    	var gridStore = thisObj.taxDataUploadGridStore;
     	var fileStore = thisObj.taxDataUploadFileStore;
     	
     	if(atax_van_id == '' || atax_van_id == null){
    		//console.log('미선택');
    		return;
    	}	
    	
    	if($('#pdf_viewer > object').length == 0){
    		//console.log('이미지 없음');
    		return;
    	}
    	
    	
    	Ext.Msg.confirm('삭제', '등록하신 매출자료를 삭제하시겠습니까?', function(btn, text){
		    if (btn == 'yes'){
		    	Global.showMask(Ext.getBody());
		    	Ext.Ajax.request({
					method: 'POST',
					params	 : {
						co_id : co_id,
						bigo : bigo,
						yyyy : yyyy,
						period_flag : period_flag,
						atax_van_id : atax_van_id
					} ,
					url: './proc/tax/u_sales/tax_upload_pdf_insert_proc.php',
					success: function(response, opts) {
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						//console.log(json);
						if(json.CODE == '00'){
		                 	//파일 삭제
		                 	var model = null;
		         			Ext.each(fileStore.data.items, function(){
		 	      	    			if(this.data.co_id == co_id 
		 	      	    					&& this.data.yyyy == yyyy 
		 	      	    					&& this.data.period_flag == period_flag){
		 	      	    				model= this;
		 	      	    			}
		 	      	    	});
		         			  
		         			model.set(json.DATA[0]);
		      				model.commit(); 
		      				
			      			var model2 = null;
			      			Ext.each(gridStore.data.items, function(){
			      	    			if(this.data.co_id == co_id){
			      	    				model2= this;
			      	    			}
			      	    	});
			   				model2.set(json.DATA[0]);
			   				model2.commit(); 
			   				controller.formClean();
			         		Ext.Msg.alert('', '정상적으로 삭제 되었습니다.');
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
		
    },
    onPdfUpload:function(grid, rowIndex, colIndex, item, e, record){
    	var thisObj = this.getTaxDataUploadMain();
    	//팝업 
//    	//console.log(e.getXY());
//    	thisObj.taxDataUploadPopup.showAt(e.getXY());
    	var pdfWindow = Ext.create('Smartax.view.popup.CommonPopSalesPDFUpload');
    	//console.log(record);
    	pdfWindow.items.get(0).getForm().setValues({
    		co_id : record.data.co_id,
    		yyyy : Ext.getCmp('search_year').getValue(),
    		period_flag : Ext.getCmp('search_type').getValue(),
    		bigo : record.data.bigo,
    		atax_van_id : record.data.atax_van_id
    	});
    	//console.log(pdfWindow.items.get(0).getForm().getValues());
//    	pdfWindow.co_id = record.data.co_id;
//    	pdfWindow.yyyy= Ext.getCmp('search_year').getValue();
//        pdfWindow.period_flag= Ext.getCmp('search_type').getValue();
//        
    	Global.openPopup(pdfWindow, "PDF 업로드");
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
    
    //grid store 셋
    onSearchGridStoreLoad:function(yyyy, type){
    	var thisObj = this.getTaxDataUploadMain();
//    	//console.log(thisObj.taxDataUploadGridStore);
//    	//console.log(thisObj.taxDataUploadFileStore);
//    	//console.log(thisObj.taxDataUploadCompStore);
    	
    	
		thisObj.taxDataUploadGridStore.removeAll();
    	
    	if(thisObj.taxDataUploadFileStore.data.length > 0){
			for(var j = 0; j < thisObj.taxDataUploadCompStore.data.length; j++){
				var compData = thisObj.taxDataUploadCompStore.data.items[j].data;
    			var isAdd = false;
    			for(var i = 0; i < thisObj.taxDataUploadFileStore.data.length; i++){
    				var fileData = thisObj.taxDataUploadFileStore.data.items[i].data;
    				if(fileData.co_id == compData.co_id){
    					if(fileData.yyyy+'' == yyyy+'' && fileData.period_flag+'' == type+''){
    						thisObj.taxDataUploadGridStore.add(fileData);
    						isAdd = true;
    					}
    				}
    			}
    			if(!isAdd){
    				thisObj.taxDataUploadGridStore.add(compData);
    			}
    		}
    	}
    	else {
    		thisObj.taxDataUploadGridStore.add(thisObj.taxDataUploadCompStore.data.items);
    	}
    	
    },
    
    //스토어 로드
    onStoreLoad : function(){
    	var thisObj = this.getTaxDataUploadMain();
    	var controller = this;
    	if(thisObj.taxDataUploadCompStore == null || thisObj.taxDataUploadFileStore == null){
    		thisObj.taxDataUploadCompStore = Ext.create('Smartax.store.supertax.TaxDataUploadStore');
    		thisObj.taxDataUploadFileStore = Ext.create('Smartax.store.supertax.TaxDataUploadStore');
    	}
    	else {
    		thisObj.taxDataUploadCompStore.removeAll();
    		thisObj.taxDataUploadFileStore.removeAll();
    	}
    	
    	Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			params: {type : '2'},
			url: './proc/tax/u_sales/tax_upload_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					if(json.COMP){
						thisObj.taxDataUploadCompStore.add(json.COMP);
					}
					
					if(json.DATA){
						thisObj.taxDataUploadFileStore.add(json.DATA);
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
    }
});