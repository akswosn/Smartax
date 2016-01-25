/**
 *  서비스 메인 메뉴
 */
Ext.define('Smartax.view.PageView', {
	
	extend : 'Ext.container.Container',
	
	xtype : 'pageView',
	id:'pageView',
	//cls : 'content',
	pageTitle : null,
	layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex : 1,
	config : {
		items : [{
			xtype:'container',
			//height : '100%',
			id:'content',
			//cls:'content',
			flex:1,
			width: '100%',
		    height: '100%',
		    cls:'page'
		}]
	},
	initComponent : function(){
		//페이지 타이틀 설정
		if(!this.pageTitle){
			this.pageTitle = new Ext.util.HashMap();
			this.pageTitle.add('mainView', '부가세서비스 메인');
			this.pageTitle.add('companyInfo', '세무 기본 정보');
			this.pageTitle.add('customerInfo', '등록거래처 리스트');
			this.pageTitle.add('taxPerchaseMain', '매입자료입력');
			this.pageTitle.add('taxSalesMain', '매출자료입력');
			this.pageTitle.add('saleCustomerInfo', '미가입 고객관리');
			this.pageTitle.add('saleCustomerByJoinInfo', '가입 고객관리');
			this.pageTitle.add('taxDataUploadMain', '매출자료업로드');
			this.pageTitle.add('taxCustomerInfo', '세무 고객관리');//
			this.pageTitle.add('taxDataDownloadMain', '매출/매입 자료 다운로드');
			this.pageTitle.add('adminCompMgrView', '회사 관리');
			this.pageTitle.add('adminUserMgrView', '회원 관리');
		}
		
		this.callParent(arguments);    
	},
	
	onDestory : function(){
		this.destory();
		this.items[0].destory();
		
		this.items[0] = null;
		//this.callParent(arguments);  
	},
	
	// 페이지 이동시 사용
	moveToPage : function(obj){
		var title = this.pageTitle.get(obj.getXType());
		this.prevPageDestory(obj);
		this.thisPage = obj;
		
		Global.Header.setTitleName(title);
		var pageContent = this.getItems().items[0];
		pageContent.add(obj);
	},
	
	//현재 페이지 제거
	prevPageDestory : function(obj){
		
		if(this.thisPage == null){
			//최초 페이지의 경우 삭제 없음
			return;
		}
		console.log(this.thisPage);

		if(this.thisPage.getXType() != obj.getXType()){
			var pageContent = this.getItems().items[0];
			//pageContent.remove(this.thisPage);
			this.thisPage.destroy();
			this.thisPage = null;
		}
	}
});