/**
 * smartax 서비스 Root
 * 서비스 Root 객체 및 전역변수를 관리 한다 
 * */


function openApp(user_name, co_name, user_type, target, projectRoot)
{		
		var appPath = projectRoot+'/extjs/app';
		Ext.application({
			
			 name : 'Smartax',
			 appFolder : appPath,
			 
		     views: [
		             //공통
		             'CommonHeader', 'CommonFooter', 'PageView',
		             
		             //화면
		             //메인
		             'MainView',
		             
		             //1.메뉴(기본정보)
		             //세무기본정보
		             'basic.CompanyInfo',
		             
		             //거래처관리
		             'basic.CustomerInfo', 'basic.CustomerForm',
		             
		             //고객관리
		             'basic.SaleCustomerInfo', 'basic.SaleCustomerForm',
		             'basic.SaleCustomerByJoinInfo', 'basic.SaleCustomerByJoinForm',
		             'basic.TaxCustomerInfo',
		             //2.메뉴(부가세)
		             //매입자료입력
		             'supertax.TaxPerchaseMain',
		             //매출자료입력
		             'supertax.TaxSalesMain',
		             //매출자료업로드(영업)
		             'supertax.TaxDataUploadMain',
		             //매출/매입 자료다운로드(세무)
		             'supertax.TaxDataDownloadMain',
		             	
		             //2. 공통화면
		             'common.CommonExcepUpload', 'common.CommonPopZip',
		             'popup.CommonPopCustomerMgr',
		             'popup.CommonPopSalesPDFUpload',
		             
		             //3.관리자
		             'admin.AdminCompMgrView', 'admin.AdminCompMgrForm', 'admin.AdminUserMgrView',
		     ],
		
		      controllers: [
		              //Header 메뉴 컨트롤러
		              'CommonHeaderController',
		              
		              //세무기본정보  컨트롤러
		              'basic.CompanyInfoController',
		              
		              //거래처 정보 관리 컨트롤러
		              'basic.CustomerInfoController',
		              
		              'basic.SaleCustomerInfoController',
		              
		              'basic.SaleCustomerByJoinInfoController',
		              
		              'basic.TaxCustomerInfoController',
		              
		              //매입자료입력 컨트롤러
		              'supertax.TaxPerchaseController',
		              
		              //매출자료입력 컨트롤러
		              'supertax.TaxSalesController',
		              
		              //매출자료 업로드 컨트롤러
		              'supertax.TaxDataUploadController',
		              //애입/매출자료 다운로드 컨트롤러
		              'supertax.TaxDataDownloadController',
		              //관리자 회사관리
		              'admin.AdminCompMgrController',
		              'admin.AdminUserMgrController',
		      ],
		      //공통 js관리
		      stores: [
		               //세무기본정보 관리 스토어
		               'basic.CompanyInfoStore',
		               
		               //거래처 정보 관리 스토어
		               'basic.CustomerInfoStore', 
		               
		               //거래처 정보 관리 스토어
		               'basic.SaleCustomerInfoStore', 
		               'basic.SaleCustomerByJoinInfoStore', 
		               'basic.TaxCustomerInfoStore',
		               //부가세 매입/매출 스토어
		               'supertax.TaxListStore',
		               'supertax.TaxDetailStore',
		               'supertax.TaxDataUploadStore',
		               'supertax.TaxDataDownloadStore',
		               //관리자
		               'admin.AdminCompInfoStore',
		               'admin.AdminUserInfoStore',
		               
		      ],
		      
		      
			 launch:function(){
				
				Ext.Loader.setConfig({ enabled: true });
				Ext.Loader.setPath('Ext.ux', './extjs/ux');
					
				Ext.require([
					'Ext.ux.exporter.Base64',
					'Ext.ux.exporter.Button',
					'Ext.ux.exporter.Formatter',
					'Ext.ux.exporter.csvFormatter.CsvFormatter',
					'Ext.ux.exporter.excelFormatter.Workbook',
					'Ext.ux.exporter.excelFormatter.Worksheet',
					'Ext.ux.exporter.excelFormatter.Cell',
					'Ext.ux.exporter.excelFormatter.Style',
					'Ext.ux.exporter.excelFormatter.ExcelFormatter',
					'Ext.ux.exporter.Exporter',
					'Ext.ux.grid.Printer',
	            	'Ext.ux.RowExpander'
				]);
				
		
				/** 영문 문구 한글로 바꾸기 **/
							
				//메세지 팝업창 
				Ext.window.MessageBox.prototype.buttonText = {
				    ok: "확인", cancel: "취소", yes: "예", no: "아니오"
				};
				
				//달력 팝업
				Ext.Date.monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
		        Ext.Date.dayNames = ["일", "월", "화", "수", "목", "금", "토"];
				
		        Global.USER_NM = user_name;
		        Global.CO_NM = co_name;
		        Global.USER_TYPE = user_type;
		        
		        
		        if(target){
        			Global.DefaultPage = Ext.create(target);
		        }
		        else{
		        	Global.DefaultPage = Ext.create('Smartax.view.MainView');
		        }
		        
		        
		        Ext.get('web_site_area').hide();
		        //최초메인페이지 호출
	        	Global.ViewPort = Ext.create('SmartaxVP');
	        	//co_name, nick_name, user_type 처리 필요
	        	
		        //Ext.create('Smartax.view.MainView')
			},
			
			moveToSite : function(){
				Ext.get('web_site_area').show();
				//Ext.get('app_area').hide();
				
//				Global.Header.destroy();
//				Global.Footer.destroy();
//				Global.DefaultPage.destroy();
//				Global.Page.destroy();
//				Global.ViewPort.destroy();
//
//				Global.Header = null;
//				Global.Footer = null;
//				Global.DefaultPage = null;
//				Global.Page = null;
//				Global.ViewPort = null;
				
//				Global.ViewPort.onDestroy();
				
				//Global.DefaultPage.destroy();
				
				//사이트로 이동
				window.location.href='./';
			},
			
			setUserName : function(userName){
				this.userName;
			},
			
			getUserName : function(userName){
				return this.userName;
			},
			
			setUserType : function(userType){
				this.userType;
			},
			
			getUserType : function(userType){
				return this.userType;
			}
			
		});
		
}

/********************************** Viewport **********************************/
//Default ViewPort !!!!
Ext.define('SmartaxVP', {
    extend: 'Ext.container.Viewport',
	cls:'root',
	id:'SmartaxVP',
	layout: {
        align: 'stretch',
        type: 'vbox'
    },
	renderTo: Ext.get('app_area'),
	initComponent : function(){
		var me = this;
		Global.Header = Ext.create('Smartax.view.CommonHeader');
		Global.Page = Ext.create('Smartax.view.PageView');
		Global.Footer = Ext.create('Smartax.view.CommonFooter');
//		Global.DefaultPage = Ext.create('Smartax.view.basic.CompanyInfo');
		
		Ext.applyIf(me, {
		//	items : [ Global.Header , Global.Page , Global.Footer  ]
			items : [ Global.Header , Global.Page  ]
		});
		
		if(Global.DefaultPage == null){
			Global.DefaultPage = Ext.create('Smartax.view.MainView');
		}
		
		Global.Page.moveToPage(Global.DefaultPage);
        
        me.callParent(arguments);
	},
	onDestroy:function(){
		Global.Header.destroy();
		Global.Footer.destroy();
		Global.Page.destroy();
		Global.DefaultPage.destroy();
		Global.ViewPort.destroy();

		Global.Header = null;
		Global.Footer = null;
		Global.Page = null;
		Global.DefaultPage = null;
		Global.ViewPort = null;
		//this.callParent();
	}
});



