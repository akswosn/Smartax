/**
 * 공통 메뉴 컨트롤러
 * 공통 해더 뷰 이벤트에 대한 이벤트 처리를 담당한다
 */
Ext.define('Smartax.controller.CommonHeaderController',{
	extend: 'Ext.app.Controller',
	
    
    views: ['CommonHeader'],
    
    refs : [
           {
        	   ref : 'commonHeader',
        	   selector : 'commonHeader'
           }
    ],
    
    
    init: function(app) {
    	this.control({
    		//상단 버튼 이벤트 설정 시작>>>>>>>>>>>>>>>>>>>>>>>>>
        	'[id=menu_01_01]' : {	//메뉴 링크 이동 : 기본정보 < 세무기본정보
        		click : function(){
        			this.moveToMenuLink('menu_01_01');
        		}
        	},
        	'[id=menu_01_02]' : {//메뉴 링크 이동 : 기본정보 < 등록거래처 리스트
        		click : function(){
        			this.moveToMenuLink('menu_01_02');
        		}
        	},
        	'[id=menu_01_03]' : {//메뉴 링크 이동 : 기본정보 < 미가입 고객관리
        		click : function(){
        			this.moveToMenuLink('menu_01_03');
        		}
        	},
        	'[id=menu_01_04]' : {//메뉴 링크 이동 : 기본정보 < 가입 고객관리
        		click : function(){
        			this.moveToMenuLink('menu_01_04');
        		}
        	},
        	'[id=menu_01_05]' : {//메뉴 링크 이동 : 기본정보 < 세무 고객관리
        		click : function(){
        			this.moveToMenuLink('menu_01_05');
        		}
        	},
        	'[id=menu_01_06]' : {//메뉴 링크 이동 : 기본정보 < 운영 회사관리
        		click : function(){
        			this.moveToMenuLink('menu_01_06');
        		}
        	},
        	'[id=menu_01_07]' : {//메뉴 링크 이동 : 기본정보 < 운영 회원관리
        		click : function(){
        			this.moveToMenuLink('menu_01_07');
        		}
        	},
        	'[id=menu_02_01]' : {//메뉴 링크 이동 : 부가세 < 매출자료 입력 및 조회
        		click : function(){
        			this.moveToMenuLink('menu_02_01');
        		}
        	},
        	'[id=menu_02_02]' : {//메뉴 링크 이동 : 부가세 < 매입자료 입력 및 조회
        		click : function(){
        			this.moveToMenuLink('menu_02_02');
        		}
        	},
        	'[id=menu_02_03]' : {//메뉴 링크 이동 : 부가세 < 종이자료 입력 및 조회
        		click : function(){
        			this.moveToMenuLink('menu_02_03');
        		}
        	},
        	'[id=menu_02_04]' : {//메뉴 링크 이동 : 부가세 < 처리현황
        		click : function(){
        			this.moveToMenuLink('menu_02_04');
        		}
        	},
        	'[id=menu_02_05]' : {//메뉴 링크 이동 : 부가세 < 개인문의
        		click : function(){
        			this.moveToMenuLink('menu_02_05');
        		}
        	},
        	'[id=menu_02_06]' : {//메뉴 링크 이동 : 부가세 < 개인문의
        		click : function(){
        			this.moveToMenuLink('menu_02_06');
        		}
        	},
	    	'[id=menu_02_07]' : {//메뉴 링크 이동 : 부가세 < 개인문의
	    		click : function(){
	    			this.moveToMenuLink('menu_02_07');
	    		}
	    	},
        	'commonHeader > container[id=quick] > container[id=MenuClose]' : {//사이트로 이동
        		render : function(){
        			this.containerClickHandler('MenuClose');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu01]' : {//메인화면
        		render : function(){
        			this.containerClickHandler('Menu01');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu02]' : {//신고서 출력
        		render : function(){
        			this.containerClickHandler('Menu02');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu03]' : {//매출자료입력
        		render : function(){
        			this.containerClickHandler('Menu03');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu04]' : {//매입자료입력
        		render : function(){
        			this.containerClickHandler('Menu04');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu05]' : {//처리현황
        		render : function(){
        			this.containerClickHandler('Menu05');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu06]' : {//개인문의
        		render : function(){
        			this.containerClickHandler('Menu06');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu07]' : {//개인문의
        		render : function(){
        			this.containerClickHandler('Menu07');
        		}
        	},
        	'commonHeader > container[id=quick] > container[id=Menu08]' : {//개인문의
        		render : function(){
        			this.containerClickHandler('Menu08');
        		}
        	},
        	
        	//end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        });
    	
    },

	moveToMenuLink : function(menuId){
		//console.log('moveToMenuLink [ ' + menuId+' ]');
		var pageHandleView = Global.Page;
		
		switch(menuId){
			case	'MenuClose':	//<<<<사이트로 이동
				Smartax.app.moveToSite();
			break;
			
			case 'Menu01':		//<<<< 메인페이지로
				var viewObj = Ext.getCmp('mainView');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.MainView');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'Menu02':		//<<<< 신고서 출력
			break;
			
			case 'Menu03':		//<<<< 매출자료입력
				var viewObj = Ext.getCmp('taxSalesMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxSalesMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			case 'Menu04':		//<<<< 매입자료입력
				var viewObj = Ext.getCmp('taxPerchaseMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxPerchaseMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
				
			case 'Menu05':		//<<<< 처리현황
			break;
				
			case 'Menu06':		//<<<< 개인문의
			break;
			
			case 'Menu07':		//<<<< 매출자료업로드
				var viewObj = Ext.getCmp('taxDataUploadMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxDataUploadMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'Menu08':		//<<<< 매출자료업로드
				var viewObj = Ext.getCmp('taxDataDownloadMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxDataDownloadMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_01':	//<<<< 기본정보 > 세무기본정보
				var viewObj = Ext.getCmp('companyInfo');
				
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.basic.CompanyInfo');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_02':	//<<<< 기본정보 > 거래처 정보
				var viewObj = Ext.getCmp('customerInfo');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.basic.CustomerInfo');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_03':	//<<<< 기본정보 > 고객관리
				var viewObj = Ext.getCmp('saleCustomerInfo');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.basic.SaleCustomerInfo');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_04':	//<<<< 기본정보 > 고객관리
				var viewObj = Ext.getCmp('saleCustomerByJoinInfo');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.basic.SaleCustomerByJoinInfo');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_05':	//<<<< 기본정보 > 고객관리
				var viewObj = Ext.getCmp('taxCustomerInfo');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.basic.TaxCustomerInfo');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_06':	//<<<< 기본정보 > 운영 회사관리
				var viewObj = Ext.getCmp('adminCompMgrView');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.admin.AdminCompMgrView');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_01_07':	//<<<< 기본정보 > 운영 회원관리
				var viewObj = Ext.getCmp('adminUserMgrView');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.admin.AdminUserMgrView');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_02_01' : // 부가세 매입자료입력
				var viewObj = Ext.getCmp('taxSalesMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxSalesMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			
			case 'menu_02_02' : // 부가세 매입자료입력
				var viewObj = Ext.getCmp('taxPerchaseMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxPerchaseMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
			
			case 'menu_02_06' : // 부가세  매출자료업로드
				var viewObj = Ext.getCmp('taxDataUploadMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxDataUploadMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
				
			case 'menu_02_07' : // 부가세  매출/매입자료다운로드
				var viewObj = Ext.getCmp('taxDataDownloadMain');
				if(!viewObj){
					viewObj = Ext.create('Smartax.view.supertax.TaxDataDownloadMain');
				}
				pageHandleView.moveToPage(viewObj);
			break;
		}
	},
	
	//컨테이너는 tap, click 이벤트 불가로 우회하여 이벤트 처리함
    containerClickHandler : function(menuId){
    	var me = this;
    	var btn = Ext.getCmp(menuId);
    	
    	btn.el.on('click', function(){
    		me.moveToMenuLink(menuId);
    	});
    },
    
    
	
});