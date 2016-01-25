/**
 * 관리자  회사 관리 컨트롤러
 */
Ext.define('Smartax.controller.admin.AdminCompMgrController',{
	extend: 'Ext.app.Controller',
	
    
    views: ['admin.AdminCompMgrView', 'admin.AdminCompMgrForm'],
    
    refs : [
           {
        	   ref : 'adminCompMgrView',
        	   selector : 'adminCompMgrView'
           },
           {
        	   ref : 'adminCompMgrForm',
        	   selector : 'adminCompMgrForm'
           }
    ],
    
    
    init: function(app) {
    	this.control({
    		adminCompMgrView : {
    			beforerender : function(){
					this.onCompStore();
					this.onUserStore(false);
				},
    			afterrender : function(){
//    				this.onDefaultRender();
//    				this.onStoreLoad();
    			},
    		},
    		'adminCompMgrView > [id=compInfoGridLay] > [id=compInfoGrid]' : {
    			 itemclick: function(dataview, record, item, index, e, eOpts){
            		 this.onCompGridItemClick(dataview, record, item, index, e, eOpts);
            	 }
    		},
    		'adminCompMgrView > container > [id=compSearch]':{
    			click : function(){
    				this.createCompGrid(Ext.getCmp('search_tp').value,Ext.getCmp('search_nm').value);
    			}
    		},
    		'adminCompMgrView > toolbar > [id=radio_user_type]':{
    			change : function(){
    				var type = Ext.getCmp('radio_user_type').getValue().check_user_type;
    				var record = this.getAdminCompMgrView().compInfoGrid.getSelectionModel().getSelection()[0];
    				
    				//console.log(record);
    				this.createAllUserGrid(type);
    		    	this.createLinkUserGrid(record, type);
    			}
    		},
    		'adminCompMgrView > container > [id=allUserInfoGridLay] > [id=allUserInfoGrid] > toolbar > [id=addUserBtn]':{
    			click : function(){
    				var selRecArr = this.getAdminCompMgrView().allUserInfoGrid.getSelectionModel().getSelection();
    				if(selRecArr.length > 0){
    					this.addUserForComp(selRecArr);
    				}
    				else {
//    					Ext.Msg.alert("", '추가하실 고객 선택후 이용바랍니다.');
    					parent.whenClick('추가하실 고객 선택후 이용바랍니다.');
    				}
    			}
    		},
    		'adminCompMgrView > container > [id=linkUserInfoGridLay] > [id=linkUserInfoGrid] > toolbar > [id=removeUserBtn]':{
    			click : function(){
    				var selRecArr = this.getAdminCompMgrView().linkUserInfoGrid.getSelectionModel().getSelection();
    				if(selRecArr.length > 0){
    					this.removeUserForComp(selRecArr);
    				}
    				else {
//    					Ext.Msg.alert("", '삭제 하실 고객 선택후 이용바랍니다.');
    					parent.whenClick('삭제 하실 고객 선택후 이용바랍니다.');
    				}
    			}
    		},
    		'adminCompMgrView > toolbar > [id=userSearchBtn]' :{
    			click : function(){
    				//console.log('1');
    				var type = Ext.getCmp('radio_user_type').getValue().check_user_type;
    		    	
    		    	this.createAllUserGrid(type);
    			}
    		},
    		
    		
    		'adminCompMgrForm > panel > toolbar > [id=cancelCompBtn]' : {
    			click : function(){
    				this.compFormCancel();
    			}
    		},
    		'adminCompMgrForm > panel > toolbar > [id=saveCompBtn]' : {
    			click : function(){
    				this.compFormSubmit();
    			}
    		}
        });
    	
    },
    //회사 store 조회
    onCompStore : function(){
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	
    	if(thisObj.compInfoGridStore == null){//최초조회
    		thisObj.compInfoGridStore = Ext.create('Smartax.store.admin.AdminCompInfoStore');
    	}
    		
		Ext.Ajax.request({
			method: 'POST',
			params: {},
			url: './proc/tax/admin/admin_comp_select_proc.php',
			success: function(response, opts) {
				//console.log(response);
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.compInfoGridStore.removeAll();
					if(json.DATA != null){
						thisObj.compInfoGridStore.add(json.DATA);
					}
					
					//그리드 생성 호출
					controller.createCompGrid('00','전체');
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
    
    //전체고객 store 조회
    onUserStore : function(isgrid){
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	
    	if(thisObj.allUserInfoGridStore == null){//최초조회
    		thisObj.allUserInfoGridStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
    	
    	
		Ext.Ajax.request({
			method: 'POST',
			params: {},
			url: './proc/tax/admin/admin_alluser_select_proc.php',
			success: function(response, opts) {
				//console.log(response);
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.allUserInfoGridStore.removeAll();
					
					if(json.DATA != null){
						thisObj.allUserInfoGridStore.add(json.DATA);
					}
					
//					//console.log(thisObj.allUserInfoGridStore);
//					controller.createCompGrid('00','전체');
					
					//그리드 생성여부 에 따라 그리드 생성
					if(isgrid){
						var type = Ext.getCmp('radio_user_type').getValue().check_user_type;
	    				var record = thisObj.compInfoGrid.getSelectionModel().getSelection()[0];
	    				
	    				controller.createLinkUserGrid(record, type); // 그리드 생성 호출
					}
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
    
    //회사 그리드 생성
    createCompGrid : function(type, value){
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	//초기화
    	
    	if(thisObj.compInfoGridSearchStore == null){
//    		thisObj.compInfoGridSearchStore.destroy();
//    		thisObj.compInfoGridSearchStore = null;
    		thisObj.compInfoGridSearchStore = Ext.create('Smartax.store.admin.AdminCompInfoStore');
    	}
    	else {
    		thisObj.compInfoGridSearchStore.removeAll();
    	}
    	
    	
		//검색조건이 있을 경우 해당 검색 타겟에 해당되는 데이터 조회하여 그리드 적용
    	if(type && value){
    		if(type == '00' || value == '전체'){
    			thisObj.compInfoGridSearchStore.add(thisObj.compInfoGridStore.data.items);
    		}
    		else {
    			var dataArr = [];
    			for(var i=0; i<thisObj.compInfoGridStore.getCount(); i++)
    			{
    				record = thisObj.compInfoGridStore.getAt(i);
    				if(record.get(type).indexOf(value) > -1)
    				{
						dataArr.push(record);	    					
    				}
    			}
    			thisObj.compInfoGridSearchStore.add(dataArr);
    			
    		}
    		
    	}
    	else {
    		thisObj.compInfoGridSearchStore.add(thisObj.compInfoGridStore.data.items);
    	}
    	
    	//console.log(thisObj.compInfoGridSearchStore.data.items);
    	
    	if(!thisObj.compInfoGrid){//그리드 생성여부 조회
    		
    		thisObj.compInfoGrid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'compInfoGrid',	
    			autoScroll:true,
    			flex : 1,
    			store: thisObj.compInfoGridSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'sale_code', align:'center', sortable: true, text: '고객<br>코드', width: '7%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'co_id', align:'center', sortable: true, text: '회사<br>코드', width: '7%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_nm', align:'center', sortable: true, text: '상호', width: '12%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_saup_no', align:'center', sortable: true, text: '사업자번호', width: '12%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_tel', align:'center', sortable: true, text: '전회번호', width: '12%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_ceo_nm', align:'center', sortable: true, text: '대표자', width: '8%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_up', align:'center', sortable: true, text: '업종', width: '8%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'co_jong', align:'center', sortable: true, text: '종목', width: '8%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'hometax_id', align:'center', sortable: true, text: '홈텍스<br>ID', width: '9%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'hometax_pwd', align:'center', sortable: true, text: '홈텍스<br>PWD', width: '8%'},
    			          {
        		        	  xtype : 'actioncolumn',
        		              header : '수정',
        		              width : '8%',
        		              align : 'center',
        		              items : [
        		                  {
        		                      icon:'./extjs/img/update.png',
        		                      tooltip : '수정',
        		                      id:'pdfUploadBtn',
        		                      handler : function (grid, rowIndex, colIndex, item, e, record) {
        		                    	  controller.ocCompForm(grid, rowIndex, colIndex, item, e, record);
        		                      },
        		                  }
        		              ]
        		          }
    			          ],
    			          viewConfig: {
    			        	  trackOver: false
    			          },
    			          plugins : [         
    			                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
    			                     })
    			                     ],
    		});
    		
    		if(Ext.getCmp('compInfoGridLay')){
        		Ext.getCmp('compInfoGridLay').removeAll();
        	}
    		
    		Ext.getCmp('compInfoGridLay').add(thisObj.compInfoGrid);
    	}
    },
	//회사 그리드 상세조회
    onCompGridItemClick : function(dataview, record, item, index, e, eOpts){
//    	//console.log('onCompGridItemClick');
//    	//console.log(record);
//    	//console.log(Ext.getCmp('radio_user_type').getValue().check_user_type);
    	//type : 1 고객 2,세무
    	var type = Ext.getCmp('radio_user_type').getValue().check_user_type;
    	
    	this.createAllUserGrid(type); //모든유저 그리드 생성(이미 그리드 존재시 검색기능만 해당됨)
    	this.createLinkUserGrid(record, type);//연결 유저 그리드 생성(이미 그리드 존재시 검색기능만 해당됨)
    },
    
    //모든 유저 그리드 생성
    createAllUserGrid : function(utype){
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	//초기화
    	
    	if(thisObj.allUserInfoGridSearchStore == null){
    		thisObj.allUserInfoGridSearchStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
    	else {
    		thisObj.allUserInfoGridSearchStore.removeAll();
    	}
    	
    	var type = Ext.getCmp('search_type').value;
    	var value = Ext.getCmp('search_name').value;
    	
    	
    	//검색 기능 시작
    	var dataArr = [];
    	if(type && value){
    		if(type == '00' || value == '전체'){
    			for(var i=0; i<thisObj.allUserInfoGridStore.getCount(); i++)
    			{
    				record = thisObj.allUserInfoGridStore.getAt(i);
    				if(utype == '1'){
    					if(record.get('auth_id') == 100)
        				{
    						dataArr.push(record);	    					
        				}
        			}
        			else {
        				if(record.get('auth_id') == 300)
        				{
    						dataArr.push(record);	    					
        				}
        			}
    			}
    			thisObj.allUserInfoGridSearchStore.add(dataArr);
    		}
    		else {
    			for(var i=0; i<thisObj.allUserInfoGridStore.getCount(); i++)
    			{
    				record = thisObj.allUserInfoGridStore.getAt(i);
    				if(record.get(type).indexOf(value) > -1)
    				{
						dataArr.push(record);	    					
    				}
    			}
    			thisObj.allUserInfoGridSearchStore.add(dataArr);
    			
    		}
    		
    	}
    	else {
    		for(var i=0; i<thisObj.allUserInfoGridStore.getCount(); i++)
			{
				record = thisObj.allUserInfoGridStore.getAt(i);
				if(utype == '1'){
					if(record.get('auth_id') == 100)
    				{
						dataArr.push(record);	    					
    				}
    			}
    			else {
    				if(record.get('auth_id') == 300)
    				{
						dataArr.push(record);	    					
    				}
    			}
			}
			thisObj.allUserInfoGridSearchStore.add(dataArr);
    	}
    	//end
    	
    	if(!thisObj.allUserInfoGrid){//그리드 생성여부 조회
    		
    		thisObj.allUserInfoGrid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'allUserInfoGrid',	
    			autoScroll:true,
    			flex : 1,
    			store: thisObj.allUserInfoGridSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_id', align:'center', sortable: true, text: '아이디', width: '15%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'user_name', align:'center', sortable: true, text: '이름', width: '15%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_phone', align:'center', sortable: true, text: '폰번호', width: '15%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_tel', align:'center', sortable: true, text: '전화번호', width: '15%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_addr', align:'center', sortable: true, text: '주소', width: '36%'},
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
	        	        	  text: '추 가',
	        	        	  cls:'bottomChild',
	        	        	  id : 'addUserBtn',
	        	          },
	        	          ]
	          }],
	          viewConfig: {
	        	  trackOver: false
	          },
	          selModel: Ext.create('Ext.selection.CheckboxModel', {
	                    	pruneRemoved: false,
	                    	checkOnly: true,
	                		mode: 'MULTI' 
	                    }),
	          plugins : [    
	                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
	                     })
	                     ],
    		});
    		
    		if(Ext.getCmp('allUserInfoGridLay')){
        		Ext.getCmp('allUserInfoGridLay').removeAll();
        	}
    		
    		Ext.getCmp('allUserInfoGridLay').add(thisObj.allUserInfoGrid);
    	}
    	
    },
    
    // 회사 link 회원 그리드 생성
    createLinkUserGrid : function(record, type){
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	//초기화
    	var co_id = record.get('co_id');
    	var uid = record.get('tax_uid');
    	if(thisObj.linkUserInfoGridStore == null){//최초조회
    		thisObj.linkUserInfoGridStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
    	
    	if(Ext.getCmp('radio_user_type').getValue().check_user_type == '1'){
    		Ext.Ajax.request({
    			method: 'POST',
    			params: {co_id : co_id, uid:uid, type : 'C'},
    			url: './proc/tax/admin/admin_linkuser_select_proc.php',
    			success: function(response, opts) {
    				//console.log(response);
    				Global.hideMask();
    				var json = Ext.JSON.decode(response.responseText);
    				if(json.CODE == '00'){
    					thisObj.linkUserInfoGridStore.removeAll();
    					if(json.DATA != null){
    						thisObj.linkUserInfoGridStore.add(json.DATA);
    					}
    					
//    					//console.log(thisObj.allUserInfoGridStore);
    					controller.createLinkUserGrid2(type);//연결 회원 그리드 재생성
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
    	else {
    		Ext.Ajax.request({
    			method: 'POST',
    			params: {co_id : co_id, uid:uid, type : 'T'},
    			url: './proc/tax/admin/admin_linkuser_select_proc.php',
    			success: function(response, opts) {
    				Global.hideMask();
    				var json = Ext.JSON.decode(response.responseText);
    				console.log(json.DATA);
    				if(json.CODE == '00'){
    					thisObj.linkUserInfoGridStore.removeAll();
    					if(json.DATA != null){
    						thisObj.linkUserInfoGridStore.add(json.DATA);
    					}
    					
//    					//console.log(thisObj.allUserInfoGridStore);
    					controller.createLinkUserGrid2(type);//연결 회원 그리드 재생성
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
    createLinkUserGrid2 : function(utype){
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	
    	if(thisObj.linkUserInfoGridSearchStore == null){
    		thisObj.linkUserInfoGridSearchStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
    	else {
    		thisObj.linkUserInfoGridSearchStore.removeAll();
    	}
    	
    	var dataArr = [];
    	
    	//검색 기능 시작
//    	for(var i=0; i<thisObj.linkUserInfoGridStore.getCount(); i++)
//		{
//			record = thisObj.linkUserInfoGridStore.getAt(i);
//			console.log(record);
//			if(utype == '1'){
//				if(record.get('auth_id') == 100)
//				{
//					dataArr.push(record);	    					
//				}
//			}
//			else {
//				if(record.get('auth_id') == 300)
//				{
//					dataArr.push(record);	    					
//				}
//			}
//		}
//    	thisObj.linkUserInfoGridSearchStore.removeAll();
//		thisObj.linkUserInfoGridSearchStore.add(dataArr);
    	
    	if(!thisObj.linkUserInfoGrid){//그리드 생성여부 조회
    		
    		thisObj.linkUserInfoGrid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'linkUserInfoGrid',	
    			autoScroll:true,
    			flex : 1,
    			store: thisObj.linkUserInfoGridStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_id', align:'center', sortable: true, text: '아이디', width: '30%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'user_name', align:'center', sortable: true, text: '이름', width: '30%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_tel', align:'center', sortable: true, text: '폰번호', width: '32%'},
    			          ],
	          viewConfig: {
	        	  trackOver: false
	          },
	          selModel: Ext.create('Ext.selection.CheckboxModel', {
                			pruneRemoved: false,
                			checkOnly: true,
                			mode: 'MULTI' 
                }),
	          plugins : [         
	                     Ext.create('Ext.grid.plugin.BufferedRenderer', {
	                     })
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
	       	        	        	  text: '리스트에서 제거',
	       	        	        	  cls:'bottomChild',
	       	        	        	  id : 'removeUserBtn',
	       	        	          },
	       	        	          ]
	       	          }],
    		});
    		
    		if(Ext.getCmp('linkUserInfoGridLay')){
        		Ext.getCmp('linkUserInfoGridLay').removeAll();
        	}
    		
    		Ext.getCmp('linkUserInfoGridLay').add(thisObj.linkUserInfoGrid);
    	}
    },
    
    //회사 <- 회원 추가
    addUserForComp : function(arr){
    	var ulist = [];
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	var mem_level = '';
    	var co_mn = thisObj.compInfoGrid.getSelectionModel().getSelection()[0].get('co_nm');
    	var co_id = thisObj.compInfoGrid.getSelectionModel().getSelection()[0].get('co_id');
    	
    	
    	
    	//검색 타입에 따라 회원 레벨 책정
    	if(Ext.getCmp('radio_user_type').getValue().check_user_type == '1'){
    		mem_level = 1;
    		
    		for(var i = 0; i < arr.length; i++){//등록 회원 목록 uid추출
        		ulist.push(arr[i].data.uid);
        	}
    		
    		Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+co_mn+' ] 회사에</span> 선택하신 회원을 추가하시겠습니까?', function(btn){
    			if(btn=='yes')
    			{
    				Ext.Ajax.request({
    					method: 'POST',
    					params: {
    						type : 'R',
    						co_id : co_id,
    						mem_level :mem_level,
    						uidList : JSON.stringify(ulist)
    					},
    					url: './proc/tax/admin/admin_comp_user_modify_proc.php',
    					success: function(response, opts) {
    						//console.log(response);
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
    						if(json.CODE == '00'){
    							controller.onUserStore(true);
    							Ext.Msg.alert("", '등록되었습니다.');
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
    	else if(Ext.getCmp('radio_user_type').getValue().check_user_type == '2'){
    		mem_level = 3;
    		
    		if(thisObj.linkUserInfoGrid.getStore().getCount() > 0){
//    			Ext.Msg.alert("", '등록된 세무회원 삭제후 이용가능합니다.');
    			parent.whenClick('등록된 세무회원 삭제후 이용가능합니다.');
    			return;
    		}
    		
    		if(arr.length != 1){
//    			Ext.Msg.alert("", '세무회원은 한명만 등록 가능합니다.');
    			parent.whenClick('세무회원은 한명만 등록 가능합니다.');
    			return;
    		}
    		console.log(arr);
    		
    		Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+co_mn+' ] 회사에</span> 선택하신 회원을 추가하시겠습니까?', function(btn){
    			if(btn=='yes')
    			{
    				Ext.Ajax.request({
    					method: 'POST',
    					params: {
    						type : 'R',
    						co_id : co_id,
    						mem_level :mem_level,
    						uidList : arr[0].data.uid
    					},
    					url: './proc/tax/admin/admin_comp_user_modify_proc.php',
    					success: function(response, opts) {
    						//console.log(response);
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
    						if(json.CODE == '00'){
    							controller.onUserStore(true);
    							Ext.Msg.alert("", '등록되었습니다.');
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
    	
    	
    	
    	
    },
    // 회사 <- 회원 삭제
    removeUserForComp : function(arr){
    	var ulist = [];
    	var thisObj = this.getAdminCompMgrView();
    	var controller = this;
    	var mem_level = '';
    	
    	var co_id = thisObj.compInfoGrid.getSelectionModel().getSelection()[0].get('co_id');
    	var co_mn = thisObj.compInfoGrid.getSelectionModel().getSelection()[0].get('co_nm');
    	for(var i = 0; i < arr.length; i++){//등록 회원 목록 uid추출
    		ulist.push(arr[i].data.uid);
    	}
    	//검색 타입에 따라 회원 레벨 책정
    	if(Ext.getCmp('radio_user_type').getValue().check_user_type == '1'){
    		mem_level = 1;
    		Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+co_mn+' ] 회사에</span> 선택하신 회원을 삭제하시겠습니까?', function(btn){
    			if(btn=='yes')
    			{
    				Ext.Ajax.request({
    					method: 'POST',
    					params: {
    						type : 'D',
    						co_id : co_id,
    						mem_level :mem_level,
    						uidList : JSON.stringify(ulist)
    					},
    					url: './proc/tax/admin/admin_comp_user_modify_proc.php',
    					success: function(response, opts) {
    						//console.log(response);
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
    						if(json.CODE == '00'){
    							controller.onUserStore(true);
    							Ext.Msg.alert("", '삭제되었습니다.');
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
    	else if(Ext.getCmp('radio_user_type').getValue().check_user_type == '2'){
    		mem_level = 3;
    		Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+co_mn+' ] 회사에</span> 선택하신 회원을 삭제하시겠습니까?', function(btn){
    			if(btn=='yes')
    			{
    				console.log(co_id);
    				console.log(mem_level);
    				Ext.Ajax.request({
    					method: 'POST',
    					params: {
    						type : 'D',
    						co_id : co_id,
    						mem_level :mem_level,
    						uidList : 0
    					},
    					url: './proc/tax/admin/admin_comp_user_modify_proc.php',
    					success: function(response, opts) {
    						//console.log(response);
    						Global.hideMask();
    						var json = Ext.JSON.decode(response.responseText);
    						if(json.CODE == '00'){
    							controller.onUserStore(true);
    							Ext.Msg.alert("", '삭제되었습니다.');
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
    	
    },
    //회사 수정 폼 
    ocCompForm : function(grid, rowIndex, colIndex, item, e, record){
    	//console.log('ocCompForm');
    	var pageHandleView = Global.Page;
    	var viewObj = Ext.getCmp('adminCompMgrForm');
		if(!viewObj){
			viewObj = Ext.create('Smartax.view.admin.AdminCompMgrForm');
		}
		viewObj.form.setValues(record.data);
		if(viewObj.compStore == null){
			viewObj.compStore = Ext.create('Smartax.store.basic.CompanyInfoStore');
    	}
		viewObj.compStore.add(record.data)
		pageHandleView.moveToPage(viewObj);
    },
    
    //회사 정보 저장
    compFormSubmit : function(){
    	var thisObj = this.getAdminCompMgrForm();
		var controller = this;
		var formData = thisObj.getForm().getValues();
		
		//console.log(formData);
//		
		if(thisObj.getForm().isValid()){
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/tax/admin/admin_comp_modify_proc.php',
				params : formData,
				success: function(response, opts) {
					Global.hideMask();
					//console.log(response);
					var json = Ext.JSON.decode(response.responseText);
					if(json.CODE == '00'){
						//성공시 정보 재조회
						Ext.Msg.alert("", '등록 성공');
						controller.onLoadCompanyInfoStore();
						var pageHandleView = Global.Page;
						var viewObj = Ext.getCmp('adminCompMgrView');
						if(!viewObj){
							viewObj = Ext.create('Smartax.view.admin.AdminCompMgrView');
						}
						pageHandleView.moveToPage(viewObj);
					}
					else{
						Ext.Msg.alert("", '등록실패');
					}
				},
				failure: function(form, action) {
					Global.hideMask();
					Ext.Msg.alert("", '등록실패!');
				}
			});
		}
		else {
//   		 	Ext.Msg.alert('필수 항목 미등록 ', '입력하신 정보를 확인해주세요');
			parent.whenClick('입력하신 정보를 확인해주세요');
		}
    },
    
    //회사폼 초기화
    compFormCancel : function(){
    	var thisObj = this.getAdminCompMgrForm();
    	thisObj.form.setValues(thisObj.compStore.data.items[0].data);
    }
    
});