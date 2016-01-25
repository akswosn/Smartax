/**
 * 관리자 고객 관리 컨트롤러
 */
Ext.define('Smartax.controller.admin.AdminUserMgrController',{
	extend: 'Ext.app.Controller',
	
    
    views: ['admin.AdminUserMgrView'],
    
    refs : [
           {
        	   ref : 'adminUserMgrView',
        	   selector : 'adminUserMgrView'
           },
    ],
    
    
    init: function(app) {
    	this.control({
    		adminUserMgrView : {
    			beforerender : function(){
					this.onMainUserStore();
//					this.onUserStore(false);
				},
    			afterrender : function(){
//    				this.onDefaultRender();
//    				this.onStoreLoad();
    			},
    		},
    		'adminUserMgrView > container > [id=mainUserSearch]':{
    			click : function(){
    				this.createMainUserGrid(Ext.getCmp('search_tp').value , Ext.getCmp('search_nm').value);
    			}
    		},
    		'adminUserMgrView > [id=mainUserInfoGridLay] > [id=mainUserInfoGrid]' : {
    			 itemclick: function(dataview, record, item, index, e, eOpts){
//    				 //console.log('item click');
            		 this.onCompGridItemClick(dataview, record, item, index, e, eOpts);
            	 }
    		},
    		'adminUserMgrView > [id=mainUserInfoGridLay] > [id=mainUserInfoGrid] > toolbar > [id=mainSaveBtn]' : {
	   			 click: function(dataview, record, item, index, e, eOpts){
	   				 this.mainUserModify();
	           	 }
	   		},
    		'adminUserMgrView > container > [id=allUserInfoGridLay] > [id=allUserInfoGrid] > toolbar > [id=addUserBtn]':{
    			click : function(){
    				var selRecArr = this.getAdminUserMgrView().allUserInfoGrid.getSelectionModel().getSelection();
    				if(selRecArr.length > 0){
    					this.addUserForMain(selRecArr);
    				}
    				else {
    					Ext.Msg.alert("", '추가하실 고객 선택후 이용바랍니다.');
    				}
    			}
    		},
    		'adminUserMgrView > container > [id=linkUserInfoGridLay] > [id=linkUserInfoGrid] > toolbar > [id=removeUserBtn]':{
    			click : function(){
    				var selRecArr = this.getAdminUserMgrView().linkUserInfoGrid.getSelectionModel().getSelection();
    				if(selRecArr.length > 0){
    					this.removeUserForMain(selRecArr);
    				}
    				else {
    					Ext.Msg.alert("", '삭제 하실 고객 선택후 이용바랍니다.');
    				}
    			}
    		},
    		'adminUserMgrView > toolbar > [id=allUserSearchBtn]' :{
    			click : function(){
    		    	this.createAllUserGrid();
    			}
    		},
        });
    	
    },
    //메인 회원 그리드  수정
    mainUserModify : function(){
    	var thisObj = this.getAdminUserMgrView();
    	var controller = this;
    	
    	var record = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0];
    	
    	//폼데이터 재설정
    	if(record.data.user_phone.indexOf('-') < 0){
    		record.data.user_phone=Global.getPhoneNumber(record.data.user_phone);
    	}
    	if(record.data.user_tel.indexOf('-') < 0){
    		record.data.user_tel=Global.getPhoneNumber(record.data.user_tel);
    	}
    	if(record.data.user_fax.indexOf('-') < 0){
    		record.data.user_fax=Global.getPhoneNumber(record.data.user_fax);
    	}
    	if(record.data.user_zip.length > 7){
    		record.data.user_zip=record.data.user_zip.substring(0,7);
    	}
    	//console.log(record.data);
//    	//console.log(record.data);
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+record.data.user_name+' ] </span> 수정하시겠습니까?', function(btn){
			if(btn=='yes')
			{
				Ext.Ajax.request({
					method: 'POST',
					params: record.data,
					url: './proc/tax/admin/admin_main_user_modify_proc.php',
					success: function(response, opts) {
						//console.log(response);
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
							var model = thisObj.mainUserInfoGridStore.findRecord('uid', record.data.uid, null, null, null, true);
							model.set(record.data);
							model.commit(); 
							var model2 = thisObj.allUserInfoGridStore.findRecord('uid', record.data.uid, null, null, null, true);
							model2.set(record.data);
							model2.commit(); 
							Ext.Msg.alert("", '수정되었습니다.');
							
							controller.createMainUserGrid('00','전체');
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
    //메인 회원 조회
    onMainUserStore : function(){
    	var thisObj = this.getAdminUserMgrView();
    	var controller = this;
    	
    	if(thisObj.mainUserInfoGridStore == null){//최초조회
    		thisObj.mainUserInfoGridStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
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
					thisObj.mainUserInfoGridStore.removeAll();
					thisObj.allUserInfoGridStore.removeAll();
					thisObj.mainUserInfoGridStore.add(json.DATA);
					thisObj.allUserInfoGridStore.add(json.DATA);
					controller.createMainUserGrid('00','전체');//메인그리드 재생성
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
    
  //메인그리드 생성
    createMainUserGrid : function(type, value){
    	var thisObj = this.getAdminUserMgrView();
    	var controller = this;
    	//초기화
    	
    	if(thisObj.mainUserInfoGridSearchStore == null){
//    		thisObj.mainUserInfoGridSearchStore.destroy();
//    		thisObj.mainUserInfoGridSearchStore = null;
    		thisObj.mainUserInfoGridSearchStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
    	else {
    		thisObj.mainUserInfoGridSearchStore.removeAll();
    	}
    	var mainType = Ext.getCmp('check_user_type').getValue().check_user_type;
    	if(mainType){
    		//console.log(mainType.length);
    	}
		
    	var dataArr = [];
    	if(type && value){
    		if(type == '00' || value == '전체'){
    			if(mainType){
    				for(var i=0; i<thisObj.mainUserInfoGridStore.getCount(); i++)
        			{
        				record = thisObj.mainUserInfoGridStore.getAt(i);
        				if(mainType.length == 1){
        					if(mainType == 1 && record.get('auth_id') == 100){
        						dataArr.push(record);
        					}
        					else if(mainType == 2 && record.get('auth_id') == 200){
        						dataArr.push(record);
        					}
        					else if(mainType == 3  && record.get('auth_id') == 300){
        						dataArr.push(record);
        					}
        				}
        				else {
        					for(var j = 0 ; j < mainType.length; j++){
        						if(mainType[j] == 1 && record.get('auth_id') == 100){
            						dataArr.push(record);
            					}
            					else if(mainType[j] == 2 && record.get('auth_id') == 200){
            						dataArr.push(record);
            					}
            					else if(mainType[j] == 3  && record.get('auth_id') == 300){
            						dataArr.push(record);
            					}
        					}
        				}
        			}
        			thisObj.mainUserInfoGridSearchStore.add(dataArr);
    			}
    			else{
    				thisObj.mainUserInfoGridSearchStore.add(thisObj.mainUserInfoGridStore.data.items);
    			}
    			
    		}
    		else {
    			for(var i=0; i<thisObj.mainUserInfoGridStore.getCount(); i++)
    			{
    				record = thisObj.mainUserInfoGridStore.getAt(i);
    				if(record.get(type).indexOf(value) > -1)
    				{
    					if(mainType){
    						if(mainType.length == 1){
    	    					if(mainType == 1 && record.get('auth_id') == 100){
    	    						dataArr.push(record);
    	    					}
    	    					else if(mainType == 2 && record.get('auth_id') == 200){
    	    						dataArr.push(record);
    	    					}
    	    					else if(mainType == 3  && record.get('auth_id') == 300){
    	    						dataArr.push(record);
    	    					}
    	    				}
    	    				else {
    	    					for(var j = 0 ; j < mainType.length; j++){
    	    						if(mainType[j] == 1 && record.get('auth_id') == 100){
    	        						dataArr.push(record);
    	        					}
    	        					else if(mainType[j] == 2 && record.get('auth_id') == 200){
    	        						dataArr.push(record);
    	        					}
    	        					else if(mainType[j] == 3  && record.get('auth_id') == 300){
    	        						dataArr.push(record);
    	        					}
    	    					}
    	    				}
    					}
    					else {
    						dataArr.push(record);	    					
    					}
    				}
    			}
    			thisObj.mainUserInfoGridSearchStore.add(dataArr);
    			
    		}
    		
    	}
    	else {
    		if(mainType){
    			for(var i=0; i<thisObj.mainUserInfoGridStore.getCount(); i++)
    			{
    				record = thisObj.mainUserInfoGridStore.getAt(i);
    				if(mainType.length == 1){
    					if(mainType == 1 && record.get('auth_id') == 100){
    						dataArr.push(record);
    					}
    					else if(mainType == 2 && record.get('auth_id') == 200){
    						dataArr.push(record);
    					}
    					else if(mainType == 3  && record.get('auth_id') == 300){
    						dataArr.push(record);
    					}
    				}
    				else {
    					
    					for(var j = 0 ; j < mainType.length; j++){
    						if(mainType[j] == 1 && record.get('auth_id') == 100){
        						dataArr.push(record);
        					}
        					else if(mainType[j] == 2 && record.get('auth_id') == 200){
        						dataArr.push(record);
        					}
        					else if(mainType[j] == 3  && record.get('auth_id') == 300){
        						dataArr.push(record);
        					}
    					}
    				}
    			}
    			thisObj.mainUserInfoGridSearchStore.add(dataArr);
			}
			else{
				thisObj.mainUserInfoGridSearchStore.add(thisObj.mainUserInfoGridStore.data.items);
			}
    	}
    	
    	//console.log(thisObj.mainUserInfoGridSearchStore.data.items);
    	
    	if(!thisObj.mainUserInfoGrid){//그리드 생성여부 조회
    		
    		thisObj.mainUserInfoGrid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'mainUserInfoGrid',	
    			autoScroll:true,
    			flex : 1,
    			store: thisObj.mainUserInfoGridSearchStore,
    			loadMask: true,
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
     	        	        	  text: '저장',
     	        	        	  cls:'bottomChild',
     	        	        	  id : 'mainSaveBtn',
     	        	          },
     	        	          ]
     	          }],
    			columns: [
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'uid', sortable: true, text: 'uid', width: '7%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'user_name', sortable: true, text: '이름', width: '8%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'user_id', sortable: true, text: '아이디', width: '8%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_jumin', sortable: true, text: '주민번호', width: '10%',
    			        	  renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
    			        		  if(value.length > 6){//
    			        			  return value.substring(0,value.length-5)+'******';
    			        		  }
    			        		  return value;
  	                        },
    			          },
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'auth_id', sortable: true, text: '회원등급', width: '8%',
    			        	  editor: {
	 	                    	 	xtype : 'combobox',
	 	                    	 	store: Ext.create('Ext.data.Store',{
	 	                   	    	fields: [
	 	                   		            { name: 'CODE' },
	 	                   		            { name: 'TEXT' }
	 	                   		        ],
	 	                   		        data:[
	 	                   		        	{CODE: '100', TEXT: '고객'},
	 	                   		        	{CODE: '200', TEXT: '영업'},
	 	                   		        	{CODE: '300', TEXT: '세무'},
	 	                   		        	{CODE: '9001', TEXT: '관리자'},
	 	                   		        ]
	 	                   		    }),
								    editable:false,
								    selectOnFocus: true,
								    queryMode: 'local',
								    displayField: 'TEXT',
								    valueField: 'CODE',
								    enableKeyEvents : true,
								    listeners: {
//								    	render : {
//								    		fn : function(obj, e){
//  								    			//console.log(this);
//  								    			//console.log(obj.owner);
//  								    			//console.log(e);
//								    		}
//								    	},
		                                specialkey: {
			                                fn: function(field, e, options) {
			                                    if(e.getKey()==13){
			                                    	Global.isEnter = true;
			                                    }
			                                }
			                            }
	 	                     		}
								},
	    			        	  renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
	    			        		  if(value == '100'){
	    			        			  return "고객";
	    			        		  }
	    			        		  else  if(value == '200'){
	    			        			  return "영업";
	    			        		  }
	    			        		  else if(value == '300'){
	    			        			  return "세무";
	    			        		  }
	    			        		  else if(value == '9001'){
	    			        			  return "관리자";
	    			        		  }
	    			        		  else {
	    			        			  return value;
	    			        		  }
	    			        	  }
    			          },
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_phone', sortable: true, text: '폰번호', width: '8%',
    			        	  editor: {
    			        		  xtype : 'textfield'
    			        	  },
    			        	  renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
    			        		  return (Global.getPhoneNumber(value));
    			        	  }
    			          },
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_tel', sortable: true, text: '전회번호', width: '8%',
    			        	  editor: {
    			        		  xtype : 'textfield'
    			        	  } ,
    			        	  renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
    			        		  return (Global.getPhoneNumber(value));
    			        	  } 
    			          },
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_fax',  sortable: true, text: '펙스<br>번호', width: '9%',
    			        	  editor: {
    			        		  xtype : 'textfield'
    			        	  },
    			        	  renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
    			        		  return (Global.getPhoneNumber(value));
    			        	  }
    			          },
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_email', sortable: true, text: '이메일', width: '10%',
    			        	  editor: {
    			        		  xtype : 'textfield'
    			        	  }
    			          },
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_zip',  sortable: true, text: '우편번호', width: '8%',
    			        	  editor: {
    			        		  xtype : 'textfield'
    			        	  }
    			          },
    			          { 
    			        	  xtype: 'gridcolumn', align:'center',dataIndex: 'user_addr',  sortable: true, text: '주소', width: '10%',
    			        	  editor: {
    			        		  xtype : 'textfield'
    			        	  }
    			          },
    			          { 
    			        	  xtype: 'gridcolumn', align:'center',dataIndex: 'user_valid', sortable: true, text: 'flag', width: '8%',
			        		  editor: {
	 	                    	 	xtype : 'combobox',
	 	                    	 	store: Ext.create('Ext.data.Store',{
	 	                   	    	fields: [
	 	                   		            { name: 'CODE' },
	 	                   		            { name: 'TEXT' }
	 	                   		        ],
	 	                   		        data:[
	 	                   		        	{CODE: 'y', TEXT: 'y'},
	 	                   		        	{CODE: 'n', TEXT: 'n'},
	 	                   		        ]
	 	                   		    }),
								    editable:false,
								    selectOnFocus: true,
								    queryMode: 'local',
								    displayField: 'TEXT',
								    valueField: 'CODE',
								    enableKeyEvents : true,
								    listeners: {
//								    	render : {
//								    		fn : function(obj, e){
//    								    			//console.log(this);
//    								    			//console.log(obj.owner);
//    								    			//console.log(e);
//								    		}
//								    	},
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
    			          viewConfig: {
    			        	  trackOver: false
    			          },
    			          plugins : [
    			                     Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit: 1}),         
    			                     Ext.create('Ext.grid.plugin.BufferedRenderer', {})
    			                     ],
    		});
    		
    		if(Ext.getCmp('mainUserInfoGridLay')){
        		Ext.getCmp('mainUserInfoGridLay').removeAll();
        	}
    		
    		Ext.getCmp('mainUserInfoGridLay').add(thisObj.mainUserInfoGrid);
    	}
    	else {
    		//console.log(thisObj.mainUserInfoGrid);
//    		thisObj.mainUserInfoGrid.setStore(thisObj.mainUserInfoGridSearchStore);
//    		thisObj.mainUserInfoGrid.render();
    	}
    },
  //상세조회
    onCompGridItemClick : function(dataview, record, item, index, e, eOpts){
//    	//console.log('onCompGridItemClick');
//    	//console.log(record);
//    	//console.log(Ext.getCmp('radio_user_type').getValue().check_user_type);
    	//type : 1 고객 2,영업, 3세무
//    	var type = Ext.getCmp('radio_user_type').getValue().check_user_type;
    	//선택 고객확인
    	var type = record.data.auth_id;
//    	Ext.getCmp('radio_sub_user_type').setValue({check_sub_user_type:'1'});
    	
    	
    	if(type == '100'){
    		Ext.getCmp('radio_sub_user_type').setValue({check_sub_user_type:'200'});
//    		Ext.getCmp('check_sub_sales').checked = true;
//    		//console.log(Ext.getCmp('check_sub_sales'));
    	}
    	else if(type == '200'){
    		Ext.getCmp('radio_sub_user_type').setValue({check_sub_user_type:'100'});
//    		Ext.getCmp('check_sub_cust').checked = true;
//    		//console.log(Ext.getCmp('check_sub_cust'));
    	}
    	else if(type == '300'){
    		//세무고객일경우 action 없음
    		Ext.getCmp('radio_sub_user_type').setValue({check_sub_user_type:'0'});
    	}
    	else {
    		//관리자 고객일 경우 action 없음
    		Ext.getCmp('radio_sub_user_type').setValue({check_sub_user_type:'0'});
    	}
    	
    	this.createAllUserGrid();
    	this.createLinkUserGrid(record);//admin_linkuser_user_select_proc
    },
    
    // 고객 -> 고객 스토어 조회
  createLinkUserGrid : function(record){
		var thisObj = this.getAdminUserMgrView();
		var controller = this;
		//초기화
		var uid = record.get('uid');
		if(thisObj.linkUserInfoGridStore == null){//최초조회
			thisObj.linkUserInfoGridStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
		}
			
		Ext.Ajax.request({
			method: 'POST',
			params: {
				uid : uid,
				member_level : Ext.getCmp('radio_sub_user_type').getValue().check_sub_user_type
			},
			url: './proc/tax/admin/admin_linkuser_user_select_proc.php',
			success: function(response, opts) {
				//console.log(response);
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				if(json.CODE == '00'){
					thisObj.linkUserInfoGridStore.removeAll();
					thisObj.linkUserInfoGridStore.add(json.DATA);
	//				//console.log(thisObj.allUserInfoGridStore);
					controller.createLinkUserGrid2();
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
  
  //고객 -> 고객 그리드생성
  createLinkUserGrid2 : function(){
		var thisObj = this.getAdminUserMgrView();
		var controller = this;
		
		if(thisObj.linkUserInfoGridSearchStore == null){
			thisObj.linkUserInfoGridSearchStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
		}
		else {
			thisObj.linkUserInfoGridSearchStore.removeAll();
		}
		
		var utype = Ext.getCmp('radio_sub_user_type').getValue().check_sub_user_type;
		var dataArr = [];
		
		for(var i=0; i<thisObj.linkUserInfoGridStore.getCount(); i++)
		{
			record = thisObj.linkUserInfoGridStore.getAt(i);
			if(utype){
				if(utype == 100){
					if(record.get('auth_id') == 100)
					{
						dataArr.push(record);	    					
					}
				}
				else if(utype == 200){
					if(record.get('auth_id') == 200)
					{
						dataArr.push(record);	    					
					}
				}
			}
		}
		thisObj.linkUserInfoGridSearchStore.add(dataArr);
		
		if(!thisObj.linkUserInfoGrid){//그리드 생성여부 조회
			
			thisObj.linkUserInfoGrid = Ext.create('Ext.grid.Panel', {
				cls:'grid',
				id:'linkUserInfoGrid',	
				autoScroll:true,
				flex : 1,
				store: thisObj.linkUserInfoGridSearchStore,
				loadMask: true,
				columns: [
				          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_id', align:'center', sortable: true, text: '아이디', width: '30%'},
				          { xtype: 'gridcolumn', align:'center', dataIndex: 'user_name', align:'center', sortable: true, text: '이름', width: '30%'},
				          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_tel', align:'center', sortable: true, text: '폰번호', width: '36%'},
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
    
	//전체 고객 그리드 생성
    createAllUserGrid : function(){
    	var thisObj = this.getAdminUserMgrView();
    	var controller = this;
    	//초기화
    	
    	if(thisObj.allUserInfoGridSearchStore == null){
    		thisObj.allUserInfoGridSearchStore = Ext.create('Smartax.store.admin.AdminUserInfoStore');
    	}
    	else {
    		thisObj.allUserInfoGridSearchStore.removeAll();
    	}
    	
    	var utype = Ext.getCmp('radio_sub_user_type').getValue().check_sub_user_type;
    	//console.log(utype);
    	var type = Ext.getCmp('search_type').value;
    	var value = Ext.getCmp('search_name').value;
    	
    	var dataArr = [];
    	if(type && value){
    		if(type == '00' || value == '전체'){
    			for(var i=0; i<thisObj.allUserInfoGridStore.getCount(); i++)
    			{
    				record = thisObj.allUserInfoGridStore.getAt(i);
    				if(utype){
    					if(utype == 100){
    						if(record.get('auth_id') == 100)
    						{
    							dataArr.push(record);	    					
    						}
    					}
    					else if(utype == 200){
    						if(record.get('auth_id') == 200)
    						{
    							dataArr.push(record);	    					
    						}
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
    					if(utype){
        					if(utype == 100){
        						if(record.get('auth_id') == 100)
        						{
        							dataArr.push(record);	    					
        						}
        					}
        					else if(utype == 200){
        						if(record.get('auth_id') == 200)
        						{
        							dataArr.push(record);	    					
        						}
        					}
            			}				
    				}
    			}
    			thisObj.allUserInfoGridSearchStore.add(dataArr);
    		}
    	}
    	else {
    		for(var i=0; i<thisObj.allUserInfoGridStore.getCount(); i++)
			{
				record = thisObj.allUserInfoGridStore.getAt(i);
				if(utype){
					if(utype == 100){
						if(record.get('auth_id') == 100)
						{
							dataArr.push(record);	    					
						}
					}
					else if(utype == 200){
						if(record.get('auth_id') == 200)
						{
							dataArr.push(record);	    					
						}
					}
    			}
			}
			thisObj.allUserInfoGridSearchStore.add(dataArr);
    	}
    	
    	//console.log(dataArr);
    	
    	if(!thisObj.allUserInfoGrid){//그리드 생성여부 조회
    		
    		thisObj.allUserInfoGrid = Ext.create('Ext.grid.Panel', {
    			cls:'grid',
    			id:'allUserInfoGrid',	
    			autoScroll:true,
    			flex : 1,
    			store: thisObj.allUserInfoGridSearchStore,
    			loadMask: true,
    			columns: [
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_id', align:'center', sortable: true, text: '아이디', width: '20%'},
    			          { xtype: 'gridcolumn', align:'center', dataIndex: 'user_name', align:'center', sortable: true, text: '이름', width: '20%'},
    			          { xtype: 'gridcolumn', align:'center',dataIndex: 'user_tel', align:'center', sortable: true, text: '폰번호', width: '20%'},
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
    
    //회원 간 링크 추가
	addUserForMain : function(arr){
		var ulist = [];
		var thisObj = this.getAdminUserMgrView();
		var controller = this;
		var auth_id = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0].get('auth_id');;
		var user_name = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0].get('user_name');
		var mainUser = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0].get('uid');
		
		for(var i = 0; i < arr.length; i++){
			ulist.push(arr[i].data.uid);
		}
		
		
		Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+user_name+' ] 에</span> 선택하신 회원을 추가하시겠습니까?', function(btn){
			if(btn=='yes')
			{
				Ext.Ajax.request({
					method: 'POST',
					params: {
						type : 'R',
						mainUser : mainUser,
						auth_id :auth_id,
						uidList : JSON.stringify(ulist)
					},
					url: './proc/tax/admin/admin_user_modify_proc.php',
					success: function(response, opts) {
						//console.log(response);
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
//							controller.onUserStore(true);
							controller.createLinkUserGrid(thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0]);
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
	},
	//회원간 링크 제거
	removeUserForMain : function(arr){
		var ulist = [];
		var thisObj = this.getAdminUserMgrView();
		var controller = this;
		var auth_id = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0].get('auth_id');;
		var user_name = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0].get('user_name');
		var mainUser = thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0].get('uid');
		
    	for(var i = 0; i < arr.length; i++){
    		ulist.push(arr[i].data.uid);
    	}
    	
    	Ext.MessageBox.confirm('Confirm', '<span style="color:red;">[ '+user_name+' ] 에</span> 선택하신 회원을 삭제하시겠습니까?', function(btn){
			if(btn=='yes')
			{
				Ext.Ajax.request({
					method: 'POST',
					params: {
						type : 'D',
						mainUser : mainUser,
						auth_id :auth_id,
						uidList : JSON.stringify(ulist)
					},
					url: './proc/tax/admin/admin_user_modify_proc.php',
					success: function(response, opts) {
						//console.log(response);
						Global.hideMask();
						var json = Ext.JSON.decode(response.responseText);
						if(json.CODE == '00'){
							controller.createLinkUserGrid(thisObj.mainUserInfoGrid.getSelectionModel().getSelection()[0]);
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
    	
    },
});