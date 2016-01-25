/**
 * 기본정보  등록거래처 리스트 컨트롤러
 */
Ext.define('Smartax.controller.basic.CustomerInfoController',{
	extend: 'Ext.app.Controller',
	
    views: ['basic.CustomerInfo', 'basic.CustomerForm', 'popup.CommonPopCustomerMgr'],
    stores : ['basic.CustomerInfoStore'],
    refs : [
           {
        	   ref : 'customerInfo',
        	   selector : 'customerInfo'
           },{
        	   ref : 'customerForm',
        	   selector : 'customerForm'
           },{
        	   ref : 'commonPopCustomerMgr',
        	   selector : 'commonPopCustomerMgr'
           }
    ],
    
    init: function(app) {
    	this.control({
    		customerInfo : {
    			beforerender : function(obj){// container 렌더링 전 !!!!!
    				//refs setter/getter : this.getCustomerInfo()
    				
    				//store load!!
    				//var customerStore = Ext.create('Smartax.store.basic.CustomerInfoStore');
//    				if(this.getCustomerInfo().form == null){
//    					this.getCustomerInfo().form = Ext.create('Smartax.view.basic.CustomerForm');
//    				}
//    				
//    		    	Ext.getCmp('trd_reg').add(this.getCustomerInfo().form);
					this.onCustomerStoreLoad();
					
    			}
    		},
    		//그리드 검색
    		'button[id=customerSearch]':{ 
				click : function(button, e, eOpts) {
					this.onCustomerSearch(button, e, eOpts);
				}
			},
			//우편번호 검색 
    		'button[id=zipBtn]':{
				click : function(button, e, eOpts) {
					this.openZipSearch(button, e, eOpts);
				}
			},
			
			//Form reset btn
			'button[id=customerFormClearBtn]' : {
				click : function(button, e, eOpts) {
					this.resetForm();
				}
			},
			//거래처 정보 저장
			'button[id=customerFormRegistBtn]' : {
				click : function(button, e, eOpts){
					this.customerRegisterValidation();
				}
			},
			'button[id=customerFormDeleteBtn]' : {
				click : function(button, e, eOpts){
					this.customerDeleteProc();
				}
			},
			
			/**
			 * 공통 Excel 업로드~
			'button[id=upCustExcel]' : {
				click : function(){
					 var pop = Ext.create('Smartax.view.common.CommonExcepUpload');
	        		  pop.excelType = 'customer_add';
	        		  Global.openPopup(pop, "엑셀파일 업로드");
				}
			},
			commonPopCustomerMgr :{
				afterrender : function(){
					this.onLoadExcepUpPop();
				}
			}
			 * ***/
    	});
    },
    //폼 초기화
    resetForm: function() {
    	
 		var thisObj = this.getCustomerForm();
 		//console.log(thisObj);
 	    thisObj.getForm().reset(true);
    	var lastCode = this.getCustomerInfo().customerInfoStore.max('customer_id');
    	//	//console.log(this.getCustomerInfo().customerInfoStore);
 	   	if(!lastCode) lastCode = 0;
 	   	var newCode = Ext.String.leftPad(parseInt(lastCode, 10)+1, 5, '0');
 		thisObj.getForm().setValues({ customer_id: newCode });
 		
 		if(thisObj.txtField == null){
 			thisObj.txtField = thisObj.query('[xtype=textfield]')[0];
 			thisObj.txtField.setReadOnly(false);
 		}
 		else {
 			thisObj.txtField.setReadOnly(false);
 		}
 	   	setTimeout(function(){
 	   		thisObj.txtField.focus();	
 	   	},100);
    },
    
    
    //거래처 관리 그리드 생성 함수
    onLoadCustomerInfoGrid : function(dataArr){
    	//console.log(dataArr);
    	var viewObj = this.getCustomerInfo();
    	
//    	if(viewObj.customerSearchStore != null){
//    		viewObj.customerSearchStore.destroy();
//    		viewObj.customerSearchStore = null;
//    	}
    	
    	if(viewObj.customerSearchStore == null){
    		viewObj.customerSearchStore = Ext.create("Smartax.store.basic.CustomerInfoStore");
//    		viewObj.customerSearchStore = Ext.create("Smartax.store.basic.CustomerInfoStore", {
//    			proxy: {
//    				type: 'memory',
//    				enablePaging: true,
//    				data: dataArr,
//    				reader: {
//    					type: 'array'
//    				},
//    			},
//    			
//    			autoLoad : true,
//    			pageSize: 30000,
//    			remoteSort: true
//    		});
    	}
    	viewObj.customerSearchStore.add(dataArr);
    	
    	if(viewObj.customerInfo_Grid == null){
//    		viewObj.customerSearchStore = Ext.create("Smartax.store.basic.CustomerInfoStore");
//    		viewObj.customerSearchStore.add(dataArr);
//    		Ext.getCmp('customerInfoGridLay').removeAll();
    		
    		viewObj.customerInfo_Grid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'customerInfo_Grid',	
    			autoScroll:true,
    			
    			flex:1,
    			store: viewObj.customerSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', dataIndex: 'customer_id', align:'center', sortable: true, text: '거래처코드', width: '15%'},
    			          { xtype: 'gridcolumn', dataIndex: 'tr_nm', align:'center', sortable: true, text: '거래처명', width: '15%'},
    			          { xtype: 'gridcolumn', dataIndex: 'tr_daepyo', align:'center', sortable: true, text: '대표자', width: '15%' },
    			          { xtype: 'gridcolumn', dataIndex: 'tr_saup_no', align:'center', sortable: true, text: '사업자<br>등록번호', width: '25%' },
    			          { xtype: 'gridcolumn', dataIndex: 'tr_tel', align:'center', sortable: true, text: '전화번호', width: '13%' },
    			          { xtype: 'gridcolumn', dataIndex: 'tr_phone', align:'center', sortable: true, text: '핸드폰', width: '13%' },
//    			          { xtype: 'gridcolumn', dataIndex: 'tr_addr', style: 'text-align:center', sortable: true, text: '주소', minWidth: 250, flex:1 }
    			          ],
    			          dockedItems: [{
    			        	  xtype: 'toolbar',
    			        	  dock: 'bottom',
    			        	  items: [
    			        	          {
    			        	        	  xtype:'label',
    			        	        	  flex:1
    			        	          },
    			        	          {
    			        	        	  xtype:'button',
    			        	        	  text: '엑셀자료 올리기',
    			        	        	  cls:'bottomChild',
    			        	        	  id : 'upCustExcel',
    			        	        	  handler : function(){
    			        	        		  var pop = Ext.create('Smartax.view.common.CommonExcepUpload');
    			        	        		  pop.excelType = 'customer_add';
    			        	        		  Global.openPopup(pop, "엑셀파일 업로드");
    			        	        	  }
    			        	          
    			        	          },
    			        	          {
    			        	        	  xtype:'button',
    			        	        	  text: '인쇄',
    			        	        	  cls:'bottomChild',
    			        	        	  handler : function(){
    			        	        		  Ext.ux.grid.Printer.mainTitle = '[ 거래처코드 ]';
    			        	        		  Ext.ux.grid.Printer.print(this.up().up());
    			        	        	  }
    			        	          },
//    			        	          {
//    			        	        	  xtype: 'exporterbutton',
//    			        	        	  downloadName: '거래처코드',
//    			        	        	  cls:'bottomChild'
//    			        	          }
    			        	          ]
    			          }],
    			          selModel: {
    			        	  pruneRemoved: false
    			          },
    			          viewConfig: {
    			        	  trackOver: false
    			          },
    			          plugins : [         
    			                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
    			                     })
    			                     ],
    			                     listeners: {
    			                    	 itemclick: {
    			                    		 fn: this.onGridpanelItemClick,
    			                    		 scope: this.getCustomerForm()
    			                    	 }
    			                     }
    		});
    		Ext.getCmp('customerInfoGridLay').add(viewObj.customerInfo_Grid);
    	}
    },
    //
    
    //store load
    onCustomerStoreLoad : function(callPop, paging) {
    	var thisObj = this;
    	
    	if(thisObj.getCustomerInfo().customerInfoStore == null){
    		thisObj.getCustomerInfo().customerInfoStore = Ext.create('Smartax.store.basic.CustomerInfoStore');
    	}
		
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/tax/customer/customer_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					thisObj.getCustomerInfo().customerInfoStore.removeAll();
					if(json.DATA != null){
						thisObj.getCustomerInfo().customerInfoStore.add(json.DATA);
					}
					
					thisObj.onLoadCustomerInfoGrid(thisObj.getCustomerInfo().customerInfoStore.data.items);
					thisObj.resetForm();
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
    
    //가맹점 검색
    onCustomerSearch : function(button, e, option){
    	var search_tp = Ext.getCmp('search_tp').getValue();
    	var thisObj = this.getCustomerInfo();
    	
    	if(search_tp)
    	{
    		//초기화
    		thisObj.customerSearchStore = null;
    		thisObj.customerInfo_Grid = null;
    		Ext.getCmp('customerInfoGridLay').removeAll();
    		
    		if(search_tp == '00' || search_tp == '전체')
    		{
    			this.onLoadCustomerInfoGrid(thisObj.customerInfoStore.data.items);
    		}
    		else
    		{
    			var search_nm = Ext.getCmp('search_nm').getValue();
    			var dataArr = [];
    			for(var i=0; i<thisObj.customerInfoStore.getCount(); i++)
    			{
    				record = thisObj.customerInfoStore.getAt(i);
    				if(record.get(search_tp).indexOf(search_nm) > -1)
    				{
						dataArr.push(record);	    					
    				}
    			}
				this.onLoadCustomerInfoGrid(dataArr);				    			
    		} 
    	}
    },
    
    //가맹점 상세조회
    onGridpanelItemClick : function(dataview, record, item, index, e, eOpts) {
    	this.form.loadRecord(record);
    	var tr_tel = record.get('tr_tel').split('-');
    	var tr_phone = record.get('tr_phone').split('-');
    	var tr_fax = record.get('tr_fax').split('-');
    	
    	this.form.setValues({
    		tr_tel1: tr_tel[0],
    		tr_tel2: tr_tel[1],
    		tr_tel3: tr_tel[2],
            tr_phone1: tr_phone[0],
            tr_phone2: tr_phone[1],
            tr_phone3: tr_phone[2],
            tr_fax1: tr_fax[0],
            tr_fax2: tr_fax[1],
            tr_fax3: tr_fax[2]
    	});
    	this.txtField.setReadOnly(true);
    },
    
    //우편번호 검색(추후 구현)
    openZipSearch: function()
    {
			var width = 500; //팝업의 너비
			var height = 600; //팝업의 높이
    		new daum.Postcode({
    			width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
    		    height: height,
		        oncomplete: function(data) {
		        	 // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var fullAddr = ''; // 최종 주소 변수
	                var extraAddr = ''; // 조합형 주소 변수

	                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    fullAddr = data.roadAddress;

	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    fullAddr = data.jibunAddress;
	                }

	                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
	                if(data.userSelectedType === 'R'){
	                    //법정동명이 있을 경우 추가한다.
	                    if(data.bname !== ''){
	                        extraAddr += data.bname;
	                    }
	                    // 건물명이 있을 경우 추가한다.
	                    if(data.buildingName !== ''){
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
	                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
	                }

	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                Ext.getCmp('tr_zip').setValue(data.zonecode);
	                Ext.getCmp('tr_addr').setValue(fullAddr);

		        }
		    }).open({
		    	left: (window.screen.width / 2) - (width / 2),
		        top: (window.screen.height / 2) - (height / 2)
		    });
    },
    
    //거래처 번호, 거래처 명 중복여부 체크
    isModifyDataCheck: function(key, value){
    	var store = this.getCustomerInfo().customerInfoStore ;
		if(ValidateFunc.checkDupCode(store, key, value))
		{
			return true;
		} 
		else return false;
    },
    
    customerRegisterValidation : function(){
    	
    	var form = this.getCustomerForm().form;
    	
        if(form.isValid())
        {
        	var paging = Ext.getCmp('customerInfo_Grid').down('pagingtoolbar');
        	var controller = this;
        	
        	var values = form.getValues();
    		var customer_id = values.customer_id; 
            var tr_nm = values.tr_nm;
            var tr_tel = values.tr_tel1+'-'+values.tr_tel2+'-'+values.tr_tel3;
            if(tr_tel == '--') tr_tel =''; 
            var tr_phone = values.tr_phone1+'-'+values.tr_phone2+'-'+values.tr_phone3;
            if(tr_phone == '--') tr_phone ='';
            var tr_fax = values.tr_fax1+'-'+values.tr_fax2+'-'+values.tr_fax3;
            if(tr_fax == '--') tr_fax ='';
            var tr_daepyo = values.tr_daepyo;
            var tr_saup_no = values.tr_saup_no;
            var tr_jumin_no = values.tr_jumin_no;
            var tr_up = values.tr_up;
            var tr_jong = values.tr_jong;
            var tr_zip = values.tr_zip;
            var tr_addr = values.tr_addr;
            var tr_email = values.tr_email;
            var tr_bigo = values.tr_bigo;
            
            var addStoreData = {
				customer_id:  parseInt(customer_id, 10), 
	            tr_nm: tr_nm,
	            tr_tel: tr_tel, 
	            tr_phone: tr_phone,
	            tr_fax: tr_fax,
	            tr_daepyo: tr_daepyo,
	            tr_saup_no: tr_saup_no,
	            tr_jumin_no: tr_jumin_no,
	            tr_up: tr_up,
	            tr_jong: tr_jong,
	            tr_zip: tr_zip,
	            tr_addr: tr_addr,
	            tr_email: tr_email,
	            tr_bigo: tr_bigo
			};
            
	    	if(!this.getCustomerForm().txtField.readOnly)
			{
				if(this.isModifyDataCheck('customer_id', parseInt(customer_id, 10))){
	    			Ext.MessageBox.confirm('경고!', '중복된 코드입니다. 작성한 정보로 업데이트 하시겠습니까?', function(btn){
			            if(btn=='yes'){
			            	controller.customerRegisterProc(addStoreData, paging, null, 'U');
			            }
			        });
	    		}
	    		else if(this.isModifyDataCheck('tr_nm', tr_nm))
	    		{
	    			Ext.MessageBox.confirm('경고!', '이미추가된 거래처명입니다. 추가로 저장 하시겠습니까?', function(btn){
			            if(btn=='yes'){
			            	controller.customerRegisterProc(addStoreData, paging, null, 'I');
			            }
			        });
	    		}
	    		else{
	    			controller.customerRegisterProc(addStoreData, paging, null, 'I');
	    		} 
			}
			else {
				controller.customerRegisterProc(addStoreData, paging, null, 'U');
			}
    	
        		
		}
    	else {
//   		 	Ext.Msg.alert('필수 항목 미등록 ', '입력하신 정보를 확인해주세요');
    		parent.whenClick('입력하신 정보를 확인해주세요');
    		return;
    	}
    	
    },
    
    //폼 데이터 추가버튼 이벤트
    customerRegisterProc : function(data, pageing, callpop, flag){
    	var controller = this;
    	var store1 = this.getCustomerInfo().customerInfoStore;
		var store2 = this.getCustomerInfo().customerSearchStore;
    	Global.showMask(Ext.getBody());
    	
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/tax/customer/customer_insert_modify_proc.php',
			params: {
				customer_id: data.customer_id,
	            tr_nm: data.tr_nm,
	            tr_tel: data.tr_tel, 
	            tr_phone: data.tr_phone,
	            tr_fax: data.tr_fax,
	            tr_daepyo: data.tr_daepyo,
	            tr_saup_no: data.tr_saup_no,
	            tr_jumin_no: data.tr_jumin_no,
	            tr_up: data.tr_up,
	            tr_jong: data.tr_jong,
	            tr_zip: data.tr_zip,
	            tr_addr: data.tr_addr,
	            tr_email: data.tr_email,
	            tr_bigo: data.tr_bigo,
	            cid_tel1: 0,
				cid_tel2: 0,
				cid_tel3: 0,
			},
			success: function(response, opts) {
				Global.hideMask();
				//console.log(response.responseText);
				
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					
					if(flag == 'U'){
						var model = store1.findRecord('customer_id', data.customer_id, null, null, null, true);
						model.set(data);
						model.commit(); 
						var model2 = store2.findRecord('customer_id', data.customer_id, null, null, null, true);
						model2.set(data);
						model2.commit(); 
						Ext.Msg.alert("", '수정되었습니다.');
					}
					else {
						store1.add(data);
						store1.sort('customer_id', 'ASC');
						store2.add(data);
						store2.sort('customer_id', 'ASC');
						Ext.Msg.alert("", '저장되었습니다.');
					}
					
//    				if(paging) paging.moveLast();
//    				if(callPop){
//    					callPop.close();
//    				//} 
    				//else 
    				controller.resetForm();
				}
				else{
					Ext.Msg.alert("", '등록 실패!');
				}
			},
			failure: function(form, action) {
				Global.hideMask();
				Ext.Msg.alert("", '등록 실패!');
			}
		});	
    },
    customerDeleteProc : function(){
    	var thisObj = this;
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">거래처 정보</span>를 삭제하시겠습니까?', function(btn){
			if(btn=='yes')
			{
				
				var selection = Ext.getCmp('customerInfo_Grid').getSelectionModel().getSelection();
				var store1 = thisObj.getCustomerInfo().customerInfoStore;
				var store2 = thisObj.getCustomerInfo().customerSearchStore;
				
				if(selection.length < 1)
				{
//					Ext.Msg.alert("", '삭제할 코드를 선택해주세요.');
					parent.whenClick('삭제할 코드를 선택해주세요.');
					return;
				}				
				else
				{
					var customer_id = selection[0].data.customer_id;
			    	Global.showMask(Ext.getBody());
					Ext.Ajax.request({
						method: 'POST',
						url: './proc/tax/customer/customer_delete_proc.php',
						params: {
							customer_id : parseInt(customer_id, 10),
						},
						success: function(response, opts) {
							Global.hideMask();
							var json = Ext.JSON.decode(response.responseText);
							if(json.CODE == '00'){
			    				store1.removeAt(store1.find('customer_id', customer_id));
			    				store2.removeAt(store2.find('customer_id', customer_id));
			    				thisObj.resetForm();
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
			}
		});
    },
    
    
});