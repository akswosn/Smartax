/**
 * 관리자 회사관리 회사 수정 폼
 */
Ext.define('Smartax.view.admin.AdminCompMgrForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'adminCompMgrForm',
	id:'adminCompMgrForm',
	cls:'page',
	 bodyPadding: 20,	
	flex : 1,
	compStore : null,
	initComponent:  function(){
		var me = this;
		
		me.bodyPadding = 20;
        me.autoScroll = true;
        var h = window.innerHeight;
        me.height = h-200;
        me.region = 'center',
        me.layout = {
            type: 'vbox',
            align: 'stretch'
        };
        
        var field01 = { // 1. 필수항목 
			xtype:'fieldset',
			title:'필수항목',
			width : '100%',
			defaults : {
                labelWidth: 140,
                labelAlign: 'left',
                afterLabelTextTpl: Global.required
            },
			items : [{
				 xtype : 'textfield',
				 fieldLabel:'회사명',
				 name:'co_nm',
				 allowBlank: false,
//				 flex : 4
			 }]
		 };
        
        var field02 = {//2. 부가세 필수항목
			xtype:'fieldset',
			title:'부가세 필수항목',
			width : '100%',
			defaults : {
                labelWidth: 140,
                labelAlign: 'left',
                afterLabelTextTpl: Global.required,
                allowBlank: false,
            },
			 items : [{
				 xtype : 'textfield',
				 fieldLabel:'대표자',
				 name:'co_ceo_nm',
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[
					 {
						 xtype : 'textfield',
						 fieldLabel:'사업자번호',
						 name:'co_saup_no',
						 flex : 4,
						 listeners:{
		                		change:  {
		                            fn: function(field, e, options) {
		                            	field.setValue(Global.getSaupjaNumber(field.getValue()));
		                            }
		                       	},
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
						 xtype : 'label',
						 flex : 1
					 },
					 {
						 xtype : 'textfield',
						 fieldLabel:'법인등록번호',
						 name:'co_co_no',
						 flex : 4,
						 listeners:{
		                		change:  {
		                            fn: function(field, e, options) {
										field.setValue(Global.getJuminNumber(field.getValue()));
		                            }
		                       	},
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	Ext.select('*[name=tr_up]').focus();
		                                }
		                            }
		                        }
		        			}
					 }]
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[
					 {
						 xtype : 'textfield',
						 fieldLabel:'업태',
						 name:'co_up',
						 flex : 4
					 },
					 {
						 xtype : 'label',
						 flex : 1
					 },
					 {
						 xtype : 'textfield',
						 fieldLabel:'종목',
						 name:'co_jong',
						 flex : 4
					 }]
			 },
			 {
				 xtype : 'textfield',
				 fieldLabel:'사업장소재지',
				 name:'co_addr',
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[
					 {
						 xtype : 'textfield',
						 fieldLabel:'전화번호',
						 name:'co_tel',
						 flex : 4,
						 listeners:{
		                		change:  {
		                            fn: function(field, e, options) {
		                            	field.setValue(Global.getPhoneNumber(field.getValue()));
		                            }
		                       	},
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
						 xtype : 'label',
						 flex : 1
					 },
					 {
						 xtype : 'textfield',
						 fieldLabel:'핸드폰',
						 name:'co_handphone',
						 flex : 4,
						 listeners:{
		                		change:  {
		                            fn: function(field, e, options) {
		                            	field.setValue(Global.getPhoneNumber(field.getValue()));
		                            }
		                       	},
		        				specialkey: {
		                            fn: function(field, e, options) {
		                                if(e.getKey()==13){
		                                	this.next().focus();
		                                }
		                            }
		                        }
		        			}
					 }]
			 },
			 {
				 xtype : 'textfield',
				 fieldLabel:'이메일',
				 name:'co_email'
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[
					 {
						 xtype : 'textfield',
						 fieldLabel:'관할세무소',
						 name:'co_tax_office',
						 flex : 4
					 },
					 {
						 xtype : 'label',
						 flex : 1
					 },
					 {
						 xtype : 'textfield',
						 fieldLabel:'관할세무소 코드',
						 name:'co_tax_office_code',
						 flex : 4
					 }]
			 },
			 {
				 xtype : 'textfield',
				 fieldLabel:'관할세무소 계좌번호',
				 name:'co_tax_office_acc'
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[
					 {
						 xtype : 'textfield',
						 fieldLabel:'부가세환급금 거래은행',
						 name:'co_bank',
						 flex : 4
					 },
					 {
						 xtype : 'label',
						 flex : 1
					 },
					 {
						 xtype : 'textfield',
						 fieldLabel:'부가세환급금 지점',
						 name:'co_bank_branch',
						 flex : 4
					 }]
			 },
			 {
				 xtype : 'textfield',
				 fieldLabel:'부가세환급금 계좌번호',
				 name:'co_bank_acc'
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[
					 {
						 xtype : 'combobox',
						 fieldLabel:'과세유형',
						 name:'tax_type',
						 value: SmartaxCommonStore.TAXATION_TYPE.getAt(0),
						 flex : 4,
						 editable:false,
                        selectOnFocus: true,
                        displayField: 'TEXT',
                        queryMode: 'local',
                        store: SmartaxCommonStore.TAXATION_TYPE, 
                        valueField: 'CODE',
                        enableKeyEvents : true,
					 },
					 {
						 xtype : 'label',
						 flex : 1
					 },
					 {
						 xtype : 'combobox',
						 fieldLabel:'사업자타입',
						 name:'co_tax_type',
						 flex : 4,
						 value: SmartaxCommonStore.BUSINESS_TYPE.getAt(0),
						 editable:false,
                         selectOnFocus: true,
                         displayField: 'TEXT',
                         queryMode: 'local',
                         store: SmartaxCommonStore.BUSINESS_TYPE, 
                         valueField: 'CODE',
                         enableKeyEvents : true,
					 }]
			 },
			 {
				 xtype : 'container',
				 defaults : {
	                labelWidth: 140,
	                labelAlign: 'left',
	                afterLabelTextTpl: Global.required,
	                allowBlank: false
	            },
				 width : '100%',
				 layout : {
					 type: 'hbox'
				 },
				 items:[{
					 xtype : 'textfield',
					 fieldLabel:'홈텍스ID',
					 name:'hometax_id',
					 flex : 4
				 }, {
					 xtype : 'label',
					 flex : 1
				 },{
					 xtype : 'textfield',
					 fieldLabel:'홈텍스PWD',
					 name:'hometax_pwd',
					 flex : 4
				 }]
			 },
			 
			 {
				 xtype : 'combobox',
				 fieldLabel:'공동 사업 여부',
				 name:'co_joint',
				 value: SmartaxCommonStore.TAXATION_JOINT.getAt(0),
				 editable:false,
                 selectOnFocus: true,
                 displayField: 'TEXT',
                 queryMode: 'local',
                 store: SmartaxCommonStore.TAXATION_JOINT, 
                 valueField: 'CODE',
                 enableKeyEvents : true,
			 }]
		 };
        var field03 = { // 3. 사업자 추가항목 [사업장현황]
				xtype:'fieldset',
				defaults : {
	                labelWidth: 140,
	                labelAlign: 'left'
	            },
				width : '100%',
				title:'사업자 추가항목 [사업장현황]',
				 items : [
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox',
						 align : 'center'
					 },
					 items:[
						 {
							 xtype : 'combobox',
							 fieldLabel:'자가/타가(임대)',
							 name:'co_lease',
							 flex : 4,
							 value: SmartaxCommonStore.LEASE_TYPE.getAt(0),
							 editable:false,
	                         selectOnFocus: true,
	                         displayField: 'TEXT',
	                         queryMode: 'local',
	                         store: SmartaxCommonStore.LEASE_TYPE, 
	                         valueField: 'CODE',
	                         enableKeyEvents : true,
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'대지',
							 name:'co_area',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'건물[지하]',
							 name:'co_building_upstairs',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'지상',
							 name:'co_building_downstairs',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'건물[바닥면적]',
							 name:'co_building_t_area',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'면면적',
							 name:'co_building_area',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'객실수',
							 name:'co_room_cnt',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'의자수',
							 name:'co_chair_cnt',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'테이블수',
							 name:'co_table_cnt',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'combobox',
							 fieldLabel:'주차장',
							 name:'co_is_parking_area',
							 flex : 4,
							 value: SmartaxCommonStore.PARKING_YN.getAt(0),
							 editable:false,
	                         selectOnFocus: true,
	                         displayField: 'TEXT',
	                         queryMode: 'local',
	                         store: SmartaxCommonStore.PARKING_YN, 
	                         valueField: 'CODE',
	                         enableKeyEvents : true,
						 }]
				 },
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'차량[화물]',
							 name:'co_vehicle_truck',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'영업용차량',
							 name:'co_vehicle_car',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'textfield',
					 fieldLabel:'종업원수',
					 name:'co_vehicle_business'
				 },
				 {
					 xtype : 'textfield',
					 fieldLabel:'그 밖에 상황',
					 name:'co_employee_cnt'
				 }]
			 };
        
    	var field04 = { // 4. 사업자 추가 항목[월 평균 경비 추가항목]
				xtype:'fieldset',
				width : '100%',
				title:'사업자 추가 항목[월 평균 경비 현황]',
				defaults : {
	                labelWidth: 140,
	                labelAlign: 'left'
	            },
				items : [
				 {
					 xtype : 'container',
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'임차료[보증금]',
							 name:'co_expense_deposit',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'월세',
							 name:'co_expense_m_rent',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'container',
					 
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'전기, 가스료',
							 name:'co_expense_elect',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'수도료',
							 name:'co_expense_water',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'container',
					 width : '100%',
					 layout : {
						 type: 'hbox'
					 },
					 defaults : {
		                labelWidth: 140,
		                labelAlign: 'left'
		            },
					 items:[
						 {
							 xtype : 'textfield',
							 fieldLabel:'인건비',
							 name:'co_expense_man',
							 flex : 4
						 },
						 {
							 xtype : 'label',
							 flex : 1
						 },
						 {
							 xtype : 'textfield',
							 fieldLabel:'기타',
							 name:'co_expense_etc',
							 flex : 4
						 }]
				 },
				 {
					 xtype : 'textfield',
					 fieldLabel:'월 기본경비계',
					 name:''
				 }
			]
	 };
    	
    	Ext.applyIf(me, {
    		items : [
              {
            	  xtype:'panel',
//            	  height : '200px',
//            	  flex : 3,
            	  autoScroll : true,
            	  layout : {
                      type: 'vbox',
                      align: 'stretch'
                  },
            	  items : [field01, field02, field03, field04,{
					 xtype : 'hiddenfield',
					 name:'co_id',
					 id : 'co_id'
				 }],
                  dockedItems : [
                    {
	     				 xtype: 'toolbar',
	                      layout: {
	     			        align: 'middle',
	     			        type: 'hbox'
	                      },
	                      dock : 'bottom',
	//                      height:'200px',
	//                      cls:'bottomBar',
	                      items: [
	                      	{
	     	               		xtype:'label',
	     	               		flex:1
	     	               	},
	                      	{
	     	               		xtype:'button',
	     	               		text: '취소',
	     	               		cls:'bottomChild',
	     	               		id:'cancelCompBtn'
	     	               	},
	                      	{
	     	               		xtype:'button',
	     	               		text: '저장',
	     	               		cls:'bottomChild',
	     	               		id:'saveCompBtn'
	     	               	}]
	              	}]
              }]
    	});
    	me.callParent(arguments);
    	
	}
});