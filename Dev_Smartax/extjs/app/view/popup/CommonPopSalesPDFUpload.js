

Ext.define('Smartax.view.popup.CommonPopSalesPDFUpload', {
    extend: 'Ext.window.Window',
    xtype : 'commonPopCustomerMgr',
    height: 145,
    width: 410,
    modal: true,
    title: 'PDF Upload',
    initComponent: function() {
    	 var me = this;
         
         Ext.applyIf(me, {
        	 items:[{
 				xtype:'form',
 				title: 'Upload a PDF',
 			    width: 400,
 			    bodyPadding: 10,
 			    frame: true,
 			    renderTo: Ext.getBody(),    
 			    items: [{
					 xtype : 'hiddenfield',
					 name:'co_id',
					 id : 'co_id'
				 },{
					 xtype : 'hiddenfield',
					 name:'atax_van_id',
					 id : 'atax_van_id'
				 },{
					 xtype : 'hiddenfield',
					 name:'period_flag',
					 id : 'period_flag'
				 },{
					 xtype : 'hiddenfield',
					 name:'yyyy',
					 id : 'yyyy'
				 },{
					 xtype : 'hiddenfield',
					 name:'bigo',
					 id : 'bigo'
				 },{
 			        xtype: 'filefield',
 			        name: 'pdf',
 			        fieldLabel: 'PDF',
 			        labelWidth: 50,
 			        msgTarget: 'side',
 			        allowBlank: true,
 			        anchor: '100%',
 			        buttonText: 'Select PDF...',
 			        listeners : {
 			        	change : function(){
 			        		var msgbox = Ext.Msg.prompt("PDF File Password", "", function(btnText, sInput){
 			                   if(btnText === 'ok'){
 			                	   me.items.get(0).getForm().setValues({pdf_password : sInput});
// 			                       Ext.Msg.alert("Status", "You entered:" + sInput);
 			                   }
 			                }, this);
 			        		msgbox.textField.inputEl.dom.type = 'password';
 			        	}
 			        }
 			    },/*{
 			    	xtype : 'label',
 			    	text : 'PDF에 비밀번호가 설정이 되어있는경우 비밀번호 입력 바랍니다.'	
 			    },*/{
 			        xtype: 'hiddenfield',
 			        name: 'pdf_password',
// 			        inputType: 'password',
// 			        fieldLabel: 'PDF PW',
// 			        labelWidth: 50,
// 			        msgTarget: 'side',
// 			        anchor: '100%',
 			    }],

 			    buttons: [{
 			        text: '저장',
 			        handler: function() {
 			            me.uploadPDFFile();
 			        }
 			    },{
 			    	 text: '취소',
 			    	 handler: function() {
 			    		 me.close();
 			    	 }
 			    }]
        	 }]
         });
         
         me.callParent(arguments);
    },
    uploadPDFFile : function(){
    	var form = this.items;
    	console.log(form);
    	var parentObj = Ext.getCmp('taxDataUploadMain');
   		var thisObj = this;
   		
   		if(form){
   			form = form.get(0).getForm();
   			if(form.isValid()){
       		 form.submit({
                     url: './proc/tax/u_sales/tax_upload_pdf_insert_proc.php',
                     waitMsg: 'Uploading your PDF...',
                     success: function(fp, o) {
                      console.log(fp);
                      console.log(o);
                   	  var compStore = parentObj.taxDataUploadCompStore;
                   	  var gridStore = parentObj.taxDataUploadGridStore;
                   	  var fileStore = parentObj.taxDataUploadFileStore;
                   	  var formData = form.getValues();
               		  var json = Ext.JSON.decode(o.response.responseText);
               		  
           			  var model = null;
           			  Ext.each(fileStore.data.items, function(){
   	      	    			if(this.data.co_id == formData.co_id 
   	      	    					&& this.data.yyyy == formData.yyyy 
   	      	    					&& this.data.period_flag == formData.period_flag){
   	      	    				model= this;
   	      	    			}
   	      	    	  });
           			  var data = {};
           			  if(!model){
           				  data = {
           						  tax_van_id : json.DATA[0].yyyy,
           						  bigo : json.DATA[0].bigo, 
           						  co_id : json.DATA[0].co_id, 
           						  period_flag : json.DATA[0].period_flag,
           						  reg_date : json.DATA[0].reg_date, 
           						  reg_uid : json.DATA[0].reg_uid,
           						  sales_upload_flag : json.DATA[0].sales_upload_flag, 
           						  sales_upload_pdf : json.DATA[0].sales_upload_pdf,
           						  yyyy : json.DATA[0].yyyy
           				  };
           				  console.log(data);
           				  
           				  //see object object push() 안됨 ㅡㅡ 노가다 시작
//           				  data.push(compStore.findRecord('co_id', formData.co_id, null, null, null, true).getData());
           				  var data2 = compStore.findRecord('co_id', formData.co_id, null, null, null, true).getData()
           				  data.co_ceo_nm = data2.co_ceo_nm;
           				  data.co_co_no = data2.co_co_no;
           				  data.co_nm = data2.co_nm;
           				  data.co_saup_no = data2.co_saup_no;
           				  data.co_tel = data2.co_tel;
           				  
           				  
           				  fileStore.add(data);
           			  }
           			  else {
           				  model.set(json.DATA[0]);
           				  model.commit(); 
           			  }
           			  
   	  				  var model2 = gridStore.findRecord('co_id', formData.co_id, null, null, null, true);
         				  model2.set(json.DATA[0]);
         				  model2.commit(); 
         				  
               		  Ext.Msg.alert('등록 성공', '정상적으로 등록되었습니다.');
               		  thisObj.close();
                     },
                     failure: function (f, a) {
     					console.log(f);
     					console.log(a);
     					Ext.Msg.alert('등록 실패입니다. ', a.result.msg);
     				}
       		 });
       	}
   		}
    	
    },
});

