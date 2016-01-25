/**
 *  서비스 메인 메뉴 View
 *  서비스 메뉴 화면을 구성한다
 */
Ext.define('Smartax.view.CommonHeader', {
	
	extend : 'Ext.Panel',
	
	menuList01 : null ,
	menuList02 : null,
	
	titleName : '',
	
	 xtype : 'commonHeader',
	 id:'commonHeader',
	 initComponent : function() {    
        var me = this;
        var topMenu = null;
        var menu_01_01 = {
    		id:'menu_01_01',
    		text : '세무 기본 정보',
    	};
        var menu_01_02 = {
        		id:'menu_01_02',
        		text : '등록 거래처 리스트',
        	};
        var menu_01_03 = {
        		id:'menu_01_03',
        		text : '미가입 고객관리',
        	};
        var menu_01_04 = {
        		id:'menu_01_04',
        		text : '가입 고객관리',
        	};
        var menu_01_05 = {
        		id:'menu_01_05',
        		text : '세무 고객관리',
        	};
        
        var menu_01_06 = {
        		id:'menu_01_06',
        		text : '관리자 회사관리',
        	};
        var menu_01_07 = {
        		id:'menu_01_07',
        		text : '관리자 회원관리',
        	};
        
        var menu_02_01 = {
        		id:'menu_02_01',
        		text : '매출자료 입력 및 조회',
        	};
        var menu_02_02 = {
        		id:'menu_02_02',
        		text : '매출자료 입력 및 조회',
        	};
        var menu_02_03 = {
        		id:'menu_02_03',
        		text : '종이자료 입력 및 조회',
        	};
        var menu_02_04 = {
        		id:'menu_02_04',
        		text : '처리현황',
        	};
        var menu_02_05 = {
        		id:'menu_02_05',
        		text : '개인문의',
        	};
        var menu_02_06 = {
        		id:'menu_02_06',
        		text : '매출 자료 업로드',
        	};
        var menu_02_07 = {
        		id:'menu_02_07',
        		text : '매출/매입 자료 다운로드',
        	};
        
        
        var mainMenu = [
		      {	//공통 퀵 메뉴
                     xtype: 'container',
                     cls: 'mainBtn',
                     id: 'MenuClose',
                     width: 80,
                     layout: {
                         align: 'center',
                         pack: 'center',
                         type: 'vbox'
                     },
                     items: [
                         {
                             xtype: 'image',
                             height: 50,
                             //margin: '0 0 5 0',
                             width: 50,
                             src: './extjs/img/home.png'
                         },{
                         	xtype: 'label',
                             text: '사이트로이동'
                         }]
                     },
                     {
                         xtype: 'image',
                         height: 60,
                         margin: '5 0 5 0',
                         width: 6,
                         src: './extjs/img/divisionline.png'
                     },
					{
                         xtype: 'container',
                         cls: 'mainBtn',
                         id: 'Menu01',
                         width: 80,
                         height:70,
                         layout: {
                             align: 'center',
                             pack: 'center',
                             type: 'vbox'
                         },
                         items: [
                             {
                                 xtype: 'image',
                                 height: 30,
                                 margin: '0 0 5 0',
                                 width: 30,
                                 src: './extjs/img/menu3.png'
                             },
                             {
                                 xtype: 'label',
                                 text: '메인화면'
                             }
                         ]
                     }
          ];
        
        if(Global.USER_TYPE == 'C'){ 
        	//고객회원
        	 this.menuList01 = Ext.create('Ext.menu.Menu', {
	             	id:'menuList01',
	         		items: [menu_01_01, menu_01_02],
	         		isteners:{
	       			 hide: {
	                       fn: function(){
	                       	this.hide();
	                      }
	                   }
	       		}
	       	});
        	 
        	 this.menuList02 = Ext.create('Ext.menu.Menu', {
             	id:'menuList02',
         		items: [menu_02_01,menu_02_02],
         		listeners:{
         			 hide: {
                         fn: function(){
                         	this.hide();
                        }
                     }
         		}
         	});
        	 topMenu = [{
          		xtype:'label',
  	        	cls: 'menu',
  	        	id: 'menu_01',
  	        	text:'기본정보',
  	        },
  	        {
  	        	xtype:'label',
  	        	cls: 'menu',
  	        	id: 'menu_02',
  	        	text:'부가세',
  	        }];
        	 mainMenu.push({
                 xtype: 'container',
                 cls: 'mainBtn',
                 id: 'Menu03',
                 width: 80,
                 height:70,
                 layout: {
                     align: 'center',
                     pack: 'center',
                     type: 'vbox'
                 },
                 items: [
                     {
                         xtype: 'image',
                         height: 30,
                         margin: '0 0 5 0',
                         width: 30,
                         src: './extjs/img/menu2.png'
                     },
                     {
                         xtype: 'label',
                         text: '매출 자료입력'
                     }
                 ]
             });
        	 mainMenu.push({
                 xtype: 'container',
                 cls: 'mainBtn',
                 id: 'Menu04',
                 width: 80,
                 height:70,
                 layout: {
                     align: 'center',
                     pack: 'center',
                     type: 'vbox'
                 },
                 items: [
                     {
                         xtype: 'image',
                         height: 30,
                         margin: '0 0 5 0',
                         width: 30,
                         src: './extjs/img/menu2.png'
                     },
                     {
                         xtype: 'label',
                         text: '매입 자료입력'
                     }
                 ]
             });
        }
        else if(Global.USER_TYPE == 'S'){	
        	//영업회원
        	this.menuList01 = Ext.create('Ext.menu.Menu', {
             	id:'menuList01',
         		items: [menu_01_01, menu_01_03, menu_01_04],
         		isteners:{
       			 hide: {
                       fn: function(){
                       	this.hide();
                      }
                   }
	       		}
	       	});
        	
        	 this.menuList02 = Ext.create('Ext.menu.Menu', {
              	id:'menuList02',
          		items: [menu_02_06],
          		listeners:{
          			 hide: {
                          fn: function(){
                          	this.hide();
                         }
                      }
          		}
          	});
        	 
        	 mainMenu.push({
                 xtype: 'container',
                 cls: 'mainBtn',
                 id: 'Menu07',
                 width: 100,
                 height:70,
                 layout: {
                     align: 'center',
                     pack: 'center',
                     type: 'vbox'
                 },
                 items: [
                     {
                         xtype: 'image',
                         height: 30,
                         margin: '0 0 5 0',
                         width: 30,
                         src: './extjs/img/menu2.png'
                     },
                     {
                         xtype: 'label',
                         text: '매출자료업로드'
                     }
                 ]
             });
        	 
        	 topMenu = [{
          		xtype:'label',
  	        	cls: 'menu',
  	        	id: 'menu_01',
  	        	text:'기본정보',
  	        },
  	        {
  	        	xtype:'label',
  	        	cls: 'menu',
  	        	id: 'menu_02',
  	        	text:'부가세',
  	        }];
        	 
        }
        else if(Global.USER_TYPE == 'T'){ 
        	//세무회원
        	this.menuList01 = Ext.create('Ext.menu.Menu', {
             	id:'menuList01',
         		items: [menu_01_01, menu_01_05],
         		isteners:{
       			 hide: {
                       fn: function(){
                       	this.hide();
                      }
                   }
	       		}
	       	});
        	
        	 this.menuList02 = Ext.create('Ext.menu.Menu', {
              	id:'menuList02',
          		items: [menu_02_07],
          		listeners:{
          			 hide: {
                          fn: function(){
                          	this.hide();
                         }
                      }
          		}
          	});
        	 
        	 topMenu = [{
             		xtype:'label',
     	        	cls: 'menu',
     	        	id: 'menu_01',
     	        	text:'기본정보',
     	        },
     	        {
     	        	xtype:'label',
     	        	cls: 'menu',
     	        	id: 'menu_02',
     	        	text:'부가세',
     	        }];
        	 
        	 mainMenu.push({
                 xtype: 'container',
                 cls: 'mainBtn',
                 id: 'Menu08',
                 width: 120,
                 height:70,
                 layout: {
                     align: 'center',
                     pack: 'center',
                     type: 'vbox'
                 },
                 items: [
                     {
                         xtype: 'image',
                         height: 30,
                         margin: '0 0 5 0',
                         width: 30,
                         src: './extjs/img/menu2.png'
                     },
                     {
                         xtype: 'label',
                         text: '매출/매입 다운로드'
                     }
                 ]
             });
        }
        else{//관리자
        	this.menuList01 = Ext.create('Ext.menu.Menu', {
             	id:'menuList01',
         		items: [menu_01_06,menu_01_07],
//             	items: [menu_01_01,menu_01_02,menu_01_03,menu_01_04,menu_01_05,menu_01_06,menu_01_07],
         		isteners:{
       			 hide: {
                       fn: function(){
                       	this.hide();
                      }
                   }
	       		}
	       	});
        	
        	 this.menuList02 = Ext.create('Ext.menu.Menu', {
              	id:'menuList02',
          		items: [],
//              	items:[menu_02_01,menu_02_02,menu_02_03,menu_02_04,menu_02_05,menu_02_06,menu_02_07],
          		listeners:{
          			 hide: {
                          fn: function(){
                          	this.hide();
                         }
                      }
          		}
          	});
        	topMenu = [{
	         	xtype:'label',
	 	        	cls: 'menu',
	 	        	id: 'menu_01',
	 	        	text:'기본정보',
 	        },
// 	        {
// 	        	xtype:'label',
// 	        	cls: 'menu',
// 	        	id: 'menu_02',
// 	        	text:'부가세',
// 	        }
 	        ];
        }
        
        Ext.applyIf(me, {
    		items : [
    		 		{//공통메뉴
    		 			xtype : 'container',
    		 		    cls:'infoBar',
    		 		    layout:{
    		 		    	type:'hbox'
    		 		    },
    		 		    listeners: {
	 			        	afterrender: {
	                            fn: me.showContextMenu,
	                            scope: me
	                        }
	 	                },
    		 		    items: topMenu
    		 		}
    		 		,
    		 		{
    		 			xtype: 'container',
    		 			cls:'infoBar',
    		 			 cls:'mainBar',
    		              id: 'quick',
    		              layout: {
    		                  align: 'stretch',
    		                  type: 'hbox'
    		              },
    		 			items: mainMenu
    		 		},
    		         {//타이틀영역
    		         	xtype: 'container',
    		         	cls:'titleBar',
    		         	width:'100%',
    		         	layout: {
    				        align: 'middle',
    				        type: 'hbox'
    				    },
    		 		    items: [{
    		 		    	xtype:'label',
    		 		    	width:'100%',
    		 		    	cls: 'menu_title',
    		 	        	id: 'menu_title',
    		 	        	text:'',
    		 		    }]
    		         }]
        });
        
        me.callParent(arguments);    
    },
    
    destory:function(){
//    	this.menuList01.destory();
//    	this.menuList02.destory();
//    	this.menuList01 = null;
//    	this.menuList02 = null;
    	this.destory();
    },

  	//컨텍스트 메뉴 만들기
	showContextMenu: function(component, eOpts) 
  	{
		var menuList01 = this.menuList01;
		var menuList02 = this.menuList02;
		
		//component 내 라벨 정보 검색
		Ext.each(this.query('label[cls="menu"]'), function(){
			var thisBtn = this;
			thisBtn.el.on('mouseover', function(){
				var pos = this.getXY();
				var menuId = this.id;
		    	pos[1] += 15;
		    	
		    	if(menuId == 'menu_01'){
		    		if(menuList02.isVisible())
		    		{
		    			menuList02.hide();
		    		}
		    		
		    		if(!menuList01.isVisible())
		    		{
		    			menuList01.showAt(pos, false);
		    		}
		    	}
		    	else {
		    		if(menuList01.isVisible())
		    		{
		    			menuList01.hide();
		    		}
		    		
		    		if(!menuList02.isVisible())
		    		{
		    			menuList02.showAt(pos, false);
		    		}
		    	}
			});
			
			thisBtn.el.on('click', function(){
				var pos = this.getXY();
				var menuId = this.id;
				
		    	pos[1] += 15;
		    	if(menuId == 'menu_01'){
		    		menuList01.showAt(pos, false);
		    	}
		    	else {
		    		menuList02.showAt(pos, false);
		    	}
			});
		});
  	},
    
    setTitleName : function(title){
    	this.titleName = title;
    	Ext.getCmp('menu_title').setText(title);
    }

});