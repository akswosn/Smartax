/**
 * 영업 - 가입 고객관리 컨트롤러
 */
Ext.define('Smartax.controller.basic.SaleCustomerByJoinInfoController',{
	extend: 'Ext.app.Controller',
	
    views: ['basic.SaleCustomerByJoinInfo', 'basic.SaleCustomerByJoinForm'],
    stores : ['basic.SaleCustomerByJoinInfoStore'],
    refs : [
           {
        	   ref : 'saleCustomerByJoinInfo',
        	   selector : 'saleCustomerByJoinInfo'
           },{
        	   ref : 'saleCustomerByJoinForm',
        	   selector : 'saleCustomerByJoinForm'
           }
    ],
    
    init: function(app) {
    	this.control({
    		saleCustomerByJoinInfo : {
    			beforerender : function(){
    				this.onSaleCustomerByJoinStore();
    			},
			},
			'[id=saleCustomerByJoinInfo_Grid]':{
				itemclick: function(dataview, record, item, index, e, eOpts){
					this.onGridPanelItemClick(dataview, record, item, index, e, eOpts);
				}
			},
			//검색
			'saleCustomerByJoinInfo > container > [id=saleCustomerByJoinSearch]':{
				click:function(){
					this.onSaleCustomerByJoinSearch();
				}
			},
			//등록버튼
			'saleCustomerByJoinInfo > [xtype=container] > [id=saleCustomerByJoinFormLay]> [xtype=toolbar]> button[id=saleCustomerByJoinFormRegistBtn]':{
				click:function(){
					this.onRegistSaleCust();
				}
			},
			//초기화버튼
			'saleCustomerByJoinInfo > [xtype=container] > [id=saleCustomerByJoinFormLay]> [xtype=toolbar]> button[id=saleCustomerByJoinFormClearBtn]':{
				click:function(){
					this.formReset();
				}
			},
			//삭제
			'saleCustomerByJoinInfo > [xtype=container] > [id=saleCustomerByJoinInfoGridLay] > [id=saleCustomerByJoinInfo_Grid]>toolbar>[id=delBtn]':{
				click:function(){
					this.onDeleteItems();
				}
			},
    	});
    },
    
    onSaleCustomerByJoinStore : function(){
    	var thisObj = this;
    	
    	if(thisObj.getSaleCustomerByJoinInfo().saleCustomerByJoinInfoStore == null){
    		thisObj.getSaleCustomerByJoinInfo().saleCustomerByJoinInfoStore = Ext.create('Smartax.store.basic.SaleCustomerByJoinInfoStore');
    	}
    	
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/tax/salecust/sale_customer_byjoin_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				//console.log(json);
				if(json.CODE == '00'){
					thisObj.getSaleCustomerByJoinInfo().saleCustomerByJoinInfoStore.removeAll();
					if(json.DATA != null){
						thisObj.getSaleCustomerByJoinInfo().saleCustomerByJoinInfoStore.add(json.DATA);
					}
					//console.log(json.DATA);
					thisObj.onLoadSaleCustomerByJoinInfoGrid(thisObj.getSaleCustomerByJoinInfo().saleCustomerByJoinInfoStore.data.items);
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
    onLoadSaleCustomerByJoinInfoGrid : function(dataArr){
    	var viewObj = this.getSaleCustomerByJoinInfo();
    	
    	if(viewObj.saleCustomerByJoinSearchStore != null){
    		viewObj.saleCustomerByJoinSearchStore.destroy();
    		viewObj.saleCustomerByJoinSearchStore = null;
    	}
    	//console.log(dataArr);
    	if(dataArr != null){
    		viewObj.saleCustomerByJoinSearchStore = Ext.create("Smartax.store.basic.SaleCustomerByJoinInfoStore", {
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
    	
    	//console.log(viewObj.saleCustomerByJoinSearchStore);
    	if(viewObj.saleCustomerByJoinInfo_Grid == null){
    		Ext.getCmp('saleCustomerByJoinInfoGridLay').removeAll();
    		
    		viewObj.saleCustomerByJoinInfo_Grid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'saleCustomerByJoinInfo_Grid',	
    			autoScroll:true,
    			flex:1,
    			store: viewObj.saleCustomerByJoinSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'sale_code', align:'center', sortable: true, text: '고객<br>코드', width: 50},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_id', style: 'textAlign:center', sortable: true, text: '회사<br>코드', width: 50},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_nm', style: 'textAlign:center', sortable: true, text: '상호', width: 100},
    			          { xtype: 'gridcolumn', align:'center' ,dataIndex: 'co_saup_no', style: 'text-align:center', sortable: true, text: '사업자번호', width: 100 },
    			          { xtype: 'gridcolumn', align:'center' , dataIndex: 'co_tel', style: 'text-align:center', sortable: true, text: '전화번호', width: 100 },
    			          {
    			        	  xtype: 'gridcolumn', align:'center', dataIndex: 'upload_saup_flag', style: 'text-align:center', sortable: true, text: '사업자<br/>등록증', width: 50, 
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    	                             if(value == 'y'){
    	                            	return '유';
    	                            }
    	                             else return '무' ;
    	                        }
    			          },
    			          { 
    			        	  xtype: 'gridcolumn', align:'center' , dataIndex: 'upload_deapyo_flag', style: 'text-align:center', sortable: true, text: '대표자<br/>신분증', width: 50,
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    			        		  if(value == 'y'){
  	                            	return '유';
  	                            }
  	                             else return '무' ;
  	                        }
    			           },
    			          { xtype: 'datecolumn', format:'m.d', align:'center' , dataIndex: 'reg_date', style: 'text-align:center', sortable: true, text: '등록일', minWidth: 100, flex:1 }
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
		Ext.getCmp('saleCustomerByJoinInfoGridLay').add(viewObj.saleCustomerByJoinInfo_Grid);
    },
    
    //고객정보 검색
    onSaleCustomerByJoinSearch : function(button, e, option){
    	var search_tp = Ext.getCmp('search_tp').getValue();
    	var thisObj = this.getSaleCustomerByJoinInfo();
    	
    	if(search_tp)
    	{
    		//초기화
    		thisObj.saleCustomerByJoinSearchStore = null;
    		thisObj.saleCustomerByJoinInfo_Grid = null;
    		Ext.getCmp('saleCustomerByJoinInfoGridLay').removeAll();
    		//console.log(search_tp);
    		if(search_tp == '00' || search_tp == '전체')
    		{
    			this.onLoadSaleCustomerByJoinInfoGrid(thisObj.saleCustomerByJoinInfoStore.data.items);
    		}
    		else
    		{
    			var search_nm = Ext.getCmp('search_nm').getValue();
    			var dataArr = [];
    			for(var i=0; i<thisObj.saleCustomerByJoinInfoStore.getCount(); i++)
    			{
    				record = thisObj.saleCustomerByJoinInfoStore.getAt(i);
    				if(record.get(search_tp).indexOf(search_nm) > -1)
    				{
						dataArr.push(record);	    					
    				}
    			}
				this.onLoadSaleCustomerByJoinInfoGrid(dataArr);				    			
    		} 
    	}
    },
    
    //상세조회
    onGridPanelItemClick : function(dataview, record, item, index, e, eOpts) {
    	this.formReset();
    	this.getSaleCustomerByJoinForm().form.loadRecord(record);
    	//console.log(record.data);
    	
    	if(record.data.upload_deapyo_flag == 'y'){//
    		$('#upload_deapyo_file-inputEl').val('file:///fakepath/'+record.data.upload_deapyo_file);
    	}
    	if(record.data.upload_saup_flag == 'y'){
    		$('#upload_saup_file-inputEl').val('file:///fakepath/'+record.data.upload_saup_file);
    	}
    },
    
    //삭제
    onDeleteItems : function(){
    	var thisObj = this.getSaleCustomerByJoinInfo();
    	var selRecArr = Ext.getCmp('saleCustomerByJoinInfo_Grid').getSelectionModel().getSelection();
    	var controller = this;
    	
    	var store1 = thisObj.saleCustomerByJoinInfoStore;
    	var store2 = thisObj.saleCustomerByJoinSearchStore;
    	
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
    			delList += this.data.co_uid +' , ';
    		});
    		delList = delList.substring(0, delList.length-2);
    		//console.log(delList);
//    		
    		Global.showMask(Ext.getBody());
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/tax/salecust/sale_customer_byjoin_delete_proc.php',
				params: {
					del : delList,
				},
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						var co_uid;
						//console.log(delList.indexOf(','));
						if(delList.indexOf(',') > -1){
							var co_uid = delList.split(',');
							for(var i = 0; i < co_uid.length; i++){
								
								store1.removeAt(store1.find('co_uid', Number(co_uid[i])));
								store2.removeAt(store2.find('co_uid',  Number(co_uid[i])));
							}
						}
						else {
							co_uid = delList;
							store1.removeAt(store1.find('co_uid',  Number(co_uid)));
							store2.removeAt(store2.find('co_uid',  Number(co_uid)));
						}
						
						controller.formReset();
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
    	var thisObj = this.getSaleCustomerByJoinForm();
 	    thisObj.getForm().reset(true);
    },
    
    //등록
    onRegistSaleCust : function(){
    	var thisObj = this.getSaleCustomerByJoinInfo();
    	var form = this.getSaleCustomerByJoinForm().form;
    	var controller = this;
    	var dataRecord = form.getRecord();
    	
		if(dataRecord){//update
    		if (form.isValid()) {
    			form.submit({
    				url: './proc/tax/salecust/sale_customer_byjoin_update_proc.php',
    				waitMsg: 'Uploading your file...',
    				success: function (response, opts) {
    					//console.log(response);
    					//초기화
    		    		thisObj.saleCustomerByJoinSearchStore = null;
    		    		thisObj.saleCustomerByJoinInfo_Grid = null;
    		    		Ext.getCmp('saleCustomerByJoinInfoGridLay').removeAll();
    					controller.onSaleCustomerByJoinStore();
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
//    		Ext.Msg.alert('', '변경하실 고객정보를 선택해주세요');
    		parent.whenClick('변경하실 고객정보를 선택해주세요');
    		return;
    	}
    },
    
});