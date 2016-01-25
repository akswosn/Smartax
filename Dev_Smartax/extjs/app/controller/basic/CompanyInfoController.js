/**
 * 기본정보 - 세무기본정보 컨트롤러
 */
Ext.define('Smartax.controller.basic.CompanyInfoController',{
	extend: 'Ext.app.Controller',
	
    
    views: ['basic.CompanyInfo'],
    store : ['basic.CompanyInfoStore'],
    
    refs : [
           {
        	   ref : 'companyInfo',
        	   selector : 'companyInfo'
           }
    ],
    
    
    init: function(app) {
    	this.control({
    		companyInfo : {
    			afterrender : function(obj){
    				this.onLoadCompanyInfoStore();
    			}
    		},
    		'button[id=cancelBtn]' : {
    			click : function(){
    				this.companyFormReset();
    			}
    		},
    		'button[id=saveBtn]' : {
    			click : function(){
    				this.customerSave();
    			}
    		},
    	});
    },
    
    /*
     * 세무 기본정보 조회 및 폼 초기화
     * */
    companyFormReset : function(){
    	
    	var thisObj = this.getCompanyInfo();
    	var store = thisObj.companyInfoStore;
    	thisObj.getForm().reset();
//    	//console.log(store.data.items[0].data);
    	
    	thisObj.getForm().setValues(store.data.items[0].data);
    },
    
    /* 
     * CompanyInfo Store load(최초 조회 및 수정후 해당 함수 실행)
     * */
    onLoadCompanyInfoStore : function(){
    	var thisObj = this.getCompanyInfo();
    	var controller = this;

    	if(thisObj.companyInfoStore == null){
    		thisObj.companyInfoStore = Ext.create('Smartax.store.basic.CompanyInfoStore');
    	}
		Global.showMask(Ext.getBody());
		Ext.Ajax.request({
			method: 'POST',
			url: './proc/company/mycom_select_proc.php',
			success: function(response, opts) {
				Global.hideMask();
				var json = Ext.JSON.decode(response.responseText);
				
				if(json.CODE == '00'){
					thisObj.companyInfoStore.removeAll();
					thisObj.companyInfoStore.add(json.DATA);
//					thisObj.getForm().setValues(json.DATA);
					controller.companyFormReset();
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
    
    /*
     * 세무기본정보 저장
     * */
	customerSave : function(){
		var thisObj = this.getCompanyInfo();
		var controller = this;
		var formData = thisObj.getForm().getValues();
		
		
		if(thisObj.getForm().isValid()){
			Ext.Ajax.request({
				method: 'POST',
				url: './proc/company/mycom_modify_proc.php',
				params : formData,
				success: function(response, opts) {
					Global.hideMask();
					var json = Ext.JSON.decode(response.responseText);
					
					if(json.CODE == '00'){
						//성공시 정보 재조회
						Ext.Msg.alert("", '등록 성공');
						controller.onLoadCompanyInfoStore();
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
	}
});