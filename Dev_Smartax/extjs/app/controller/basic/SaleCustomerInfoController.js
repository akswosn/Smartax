/**
 * 영업 고객관리 컨트롤러
 */
Ext.define('Smartax.controller.basic.SaleCustomerInfoController',{
	extend: 'Ext.app.Controller',
	
    views: ['basic.SaleCustomerInfo', 'basic.SaleCustomerForm'],
    stores : ['basic.SaleCustomerInfoStore'],
    refs : [
           {
        	   ref : 'saleCustomerInfo',
        	   selector : 'saleCustomerInfo'
           },{
        	   ref : 'saleCustomerForm',
        	   selector : 'saleCustomerForm'
           }
    ],
    
    init: function(app) {
    	this.control({
    		saleCustomerInfo : {
    			beforerender : function(){
    				this.onSaleCustomerStore();
    			},
			},
			//삭제버튼
//			'saleCustomerInfo > [xtype=container] > [id=saleCustomerFormLay]> [xtype=toolbar]> button[id=saleCustomerFormDeleteBtn]':{
//				click:function(){
//					//console.log('dd');
//				}
//			},
			//등록버튼
			'saleCustomerInfo > [xtype=container] > [id=saleCustomerFormLay]> [xtype=toolbar]> button[id=saleCustomerFormRegistBtn]':{
				click:function(){
					this.onRegistSaleCust();
				}
			},
			//초기화버튼
			'saleCustomerInfo > [xtype=container] > [id=saleCustomerFormLay]> [xtype=toolbar]> button[id=saleCustomerFormClearBtn]':{
				click:function(){
					this.formReset();
				}
			},
			//삭제
			'saleCustomerInfo > [xtype=container] > [id=saleCustomerInfoGridLay] > [id=saleCustomerInfo_Grid]>toolbar>[id=delBtn]':{
				click:function(){
					this.onDeleteItems();
				}
			},
			//검색
			'saleCustomerInfo > container > [id=saleCustomerSearch]':{
				click:function(){
					this.onSaleCustomerSearch();
				}
			},
			'[id=saleCustomerInfo_Grid]':{
				itemclick: function(dataview, record, item, index, e, eOpts){
					this.onGridPanelItemClick(dataview, record, item, index, e, eOpts);
				}
			}
    	});
    },
    
    onSaleCustomerStore : function(){
    	//console.log('onSaleCustomerStore');
    	var thisObj = this;
    	
    	if(thisObj.getSaleCustomerInfo().saleCustomerInfoStore == null){
    		thisObj.getSaleCustomerInfo().saleCustomerInfoStore = Ext.create('Smartax.store.basic.SaleCustomerInfoStore');
    	}
    	
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/tax/salecust/sale_customer_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					thisObj.getSaleCustomerInfo().saleCustomerInfoStore.removeAll();
					
					if(json.DATA != null){
						thisObj.getSaleCustomerInfo().saleCustomerInfoStore.add(json.DATA);
					}
					//console.log(json.DATA);
					thisObj.onLoadSaleCustomerInfoGrid(thisObj.getSaleCustomerInfo().saleCustomerInfoStore.data.items);
					thisObj.formReset();
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
    onLoadSaleCustomerInfoGrid : function(dataArr){
    	//console.log('onLoadSaleCustomerInfoGrid');
    	var viewObj = this.getSaleCustomerInfo();
    	
    	if(viewObj.saleCustomerSearchStore != null){
    		viewObj.saleCustomerSearchStore.destroy();
    		viewObj.saleCustomerSearchStore = null;
    	}
    	if(dataArr != null){
    		viewObj.saleCustomerSearchStore = Ext.create("Smartax.store.basic.SaleCustomerInfoStore", {
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
    	else {
    		viewObj.saleCustomerSearchStore = Ext.create("Smartax.store.basic.SaleCustomerInfoStore");
    	}    	
    	
    	//console.log(viewObj.saleCustomerSearchStore);
    	if(viewObj.saleCustomerInfo_Grid == null){
    		Ext.getCmp('saleCustomerInfoGridLay').removeAll();
    		
    		viewObj.saleCustomerInfo_Grid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'saleCustomerInfo_Grid',	
    			autoScroll:true,
    			flex:1,
    			store: viewObj.saleCustomerSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'sale_code', align:'center', sortable: true, text: '고객코드', width: 70},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_nm', style: 'textAlign:center', sortable: true, text: '상호', width: 100},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_saup_no', style: 'text-align:center', sortable: true, text: '사업자번호', width: 100 },
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_tel', style: 'text-align:center', sortable: true, text: '전화번호', width: 100 },
    			          {
    			        	  xtype: 'gridcolumn', align:'center', dataIndex: 'upload_saup_flag', style: 'text-align:center', sortable: true, text: '사업자<br/>등록증', width: 50, 
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    	                            if (value == 'n') {
    	                            	return '무';
    	                            }
    	                            else if(value == 'y'){
    	                            	return '유';
    	                            }
    	                            return value ;
    	                        }
    			          },
    			          { 
    			        	  xtype: 'gridcolumn', align:'center' , dataIndex: 'upload_deapyo_flag', style: 'text-align:center', sortable: true, text: '대표자<br/>신분증', width: 50,
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
  	                            if (value == 'n') {
  	                            	return '무';
  	                            }
  	                            else if(value == 'y'){
  	                            	return '유';
  	                            }
  	                            return value ;
  	                        }
    			           },
    			          { xtype: 'datecolumn', format:'m.d', align:'center', dataIndex: 'reg_date', style: 'text-align:center', sortable: true, text: '등록일', minWidth: 100, flex:1 }
    			          ],
    			          dockedItems: [{
    			        	  xtype: 'toolbar',
    			        	  dock: 'bottom',
    			        	  layout: {
  			                    pack: 'end',
  			                    type: 'hbox'
  			                  },
    			        	  items: [
    			        	          {
    			        	        	  xtype:'button',
    			        	        	  text: '삭제',
    			        	        	  cls:'bottomChild',
    			        	        	  id : 'delBtn',
    			        	          },
    			        	          ]
    			          }],
    			          selModel: Ext.create('Ext.selection.CheckboxModel', {
	                    	pruneRemoved: false,
	                    	checkOnly: true,
	                		mode: 'MULTI' 
	                    }),
    			          viewConfig: {
    			        	  trackOver: false
    			          },
    			          plugins : [         
    			                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
    			                     })
    			                     ],
//    			                     listeners: {
//    			                    	 itemclick: {
//    			                    		 fn: this.onGridPanelItemClick,
//    			                    		 scope: this.getSaleCustomerForm()
//    			                    	 }
//    			                     }
    		});
    	}
		Ext.getCmp('saleCustomerInfoGridLay').add(viewObj.saleCustomerInfo_Grid);
    },
    
    //고객정보 검색
    onSaleCustomerSearch : function(button, e, option){
    	var search_tp = Ext.getCmp('search_tp').getValue();
    	var thisObj = this.getSaleCustomerInfo();
    	
    	if(search_tp)
    	{
    		//초기화
    		thisObj.saleCustomerSearchStore = null;
    		thisObj.saleCustomerInfo_Grid = null;
    		Ext.getCmp('saleCustomerInfoGridLay').removeAll();
    		//console.log(search_tp);
    		if(search_tp == '00' || search_tp == '전체')
    		{
    			this.onLoadSaleCustomerInfoGrid(thisObj.saleCustomerInfoStore.data.items);
    		}
    		else
    		{
    			var search_nm = Ext.getCmp('search_nm').getValue();
    			var dataArr = [];
    			for(var i=0; i<thisObj.saleCustomerInfoStore.getCount(); i++)
    			{
    				record = thisObj.saleCustomerInfoStore.getAt(i);
    				if(record.get(search_tp).indexOf(search_nm) > -1)
    				{
						dataArr.push(record);	    					
    				}
    			}
				this.onLoadSaleCustomerInfoGrid(dataArr);				    			
    		} 
    	}
    },
    
    //상세조회
    onGridPanelItemClick : function(dataview, record, item, index, e, eOpts) {
    	this.formReset();
    	this.getSaleCustomerForm().form.loadRecord(record);
    	//console.log(record.data);
    	
    	if(record.data.upload_deapyo_flag == 'y'){//
    		//console.log($('#upload_saup_file-inputEl'));
    		$('#upload_deapyo_file-inputEl').val('file:///fakepath/'+record.data.upload_deapyo_file);
    	}
    	if(record.data.upload_saup_flag == 'y'){
    		$('#upload_saup_file-inputEl').val('file:///fakepath/'+record.data.upload_saup_file);
    	}
    },
    
    //삭제
    onDeleteItems : function(){
    	var thisObj = this.getSaleCustomerInfo();
    	var selRecArr = Ext.getCmp('saleCustomerInfo_Grid').getSelectionModel().getSelection();
    	var controller = this;
    	//console.log(selRecArr);
    	if(1 > selRecArr.length){
//    		Ext.Msg.alert('', '삭제할 고객정보를 선택해 주세요');
    		parent.whenClick('삭제할 고객정보를 선택해 주세요');
    		return;
    	}
    	else {
    		var delList = '';
    		Ext.each(selRecArr, function(){
//    			//console.log(this);
    			delList += this.data.sale_id +' , ';
    		});
    		delList = delList.substring(0, delList.length-2);
    		//console.log(delList);
    		
    		Global.showMask(Ext.getBody());
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/tax/salecust/sale_customer_delete_proc.php',
				params: {
					del : delList,
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						thisObj.saleCustomerSearchStore = null;
    		    		thisObj.saleCustomerInfo_Grid = null;
    		    		Ext.getCmp('saleCustomerInfoGridLay').removeAll();
    					controller.onSaleCustomerStore();
	    				Ext.Msg.alert("", '삭제되었습니다.');
					}
					else{
						Ext.Msg.alert("", '삭제 실패하였습니다.');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);
				}
			});
    	}
    },
    
    formReset : function(){
    	var thisObj = this.getSaleCustomerForm();
 	    thisObj.getForm().reset(true);
    },
    
    //등록
    onRegistSaleCust : function(){
    	var thisObj = this.getSaleCustomerInfo();
    	var form = this.getSaleCustomerForm().form;
    	var controller = this;
    	var dataRecord = form.getRecord();
    	
		if(dataRecord){//update
    		//console.log('update');
    		if (form.isValid()) {
    			form.submit({
    				url: './proc/tax/salecust/sale_customer_update_proc.php',
    				waitMsg: 'Uploading your file...',
    				success: function (response, opts) {
    					//console.log(response);
    					//초기화
    		    		thisObj.saleCustomerSearchStore = null;
    		    		thisObj.saleCustomerInfo_Grid = null;
    		    		Ext.getCmp('saleCustomerInfoGridLay').removeAll();
    					controller.onSaleCustomerStore();//파일 및 고객코드확인 불가로 재조회
						Ext.Msg.alert('', '정상처리 되었습니다.');
    					
    				},
    				failure: function (f, a) {
    					//console.log(f);
    					//console.log(a);
    					Ext.Msg.alert('등록 실패입니다. ', a.result.msg);
    				}
    			});
    		}
    		else {
//    			Ext.Msg.alert('필수 항목 미등록 ', '입력하신 정보를 확인해주세요');
    			parent.whenClick('입력하신 정보를 확인해주세요');
    		}
    	}
    	else {//insert
    		
    		if (form.isValid()) {
    			form.submit({
    				url: './proc/tax/salecust/sale_customer_insert_proc.php',
    				waitMsg: 'Uploading your file...',
    				success: function (response, opts) {
    					
    					//초기화
    		    		thisObj.saleCustomerSearchStore = null;
    		    		thisObj.saleCustomerInfo_Grid = null;
    		    		Ext.getCmp('saleCustomerInfoGridLay').removeAll();
    					controller.onSaleCustomerStore();//파일 및 고객코드확인 불가로 재조회
						Ext.Msg.alert('', '정상처리 되었습니다.');
    					
    				},
    				failure: function (f, a) {
    					//console.log(f);
    					//console.log(a);
    					Ext.Msg.alert('등록 실패입니다. ', a.result.msg);
    				}
    			});
    		}
    		else {
//    			Ext.Msg.alert('필수 항목 미등록 ', '입력하신 정보를 확인해주세요');
    			parent.whenClick('입력하신 정보를 확인해주세요');
    		}
    	}
    },
    
});