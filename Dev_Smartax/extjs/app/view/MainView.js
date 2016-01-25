/**
 *  서비스 메인 메뉴
 */
Ext.define('Smartax.view.MainView', {
	
	extend : 'Ext.container.Container',
	xtype : 'mainView',
	id:'mainView',
	autoScroll : true,
	cls:'page',
//	width: '100%',
//    height: '100%',
    flex : 1,
    padding:'0 25 0 0',
    initComponent : function(){
    	var me = this;
    	var today = new Date();
    	Ext.applyIf(me, {
    		layout:{
    			align: 'stretch', 
		        type: 'hbox'
    		},
			items:[{
				xtype:'container',
				flex : 1,
				layout:{
	    			align: 'stretch',
			        type: 'vbox'
	    		},
	    		items :[{
	    			xtype : 'panel',
	    			flex : 1,
	    			height:(window.innerHeight - 250)/3,
	    			html : "<div style='margin-left:20%;padding-top:20%;font-size:13px;'><span style='font-weight:bold;color:red'>"
	    				+Global.USER_NM +"</span><span style='color:#999'> 님 <br> 반갑습니다. </span><br/>"
	    				+"[ "+today.getFullYear()+"년"+(today.getMonth()+1)+"월 "+today.getDate()+"일 ]</div>",
	    			margin: 10,
//	    			bodyPadding: 20,
	    		},{
	    			xtype : 'panel',
	    			flex : 3,
	    			height:(window.innerHeight - 250)*2/3,
//	    			html : 'left 컨텐츠',
	    			margin: 10,
	    		}]
			},{
				xtype:'container',
				flex : 3,
				layout:{
	    			align: 'stretch',
			        type: 'vbox'
	    		},
	    		items :[{
	    			xtype : 'panel',
	    			flex : 1,
//	    			html :"right 컨텐츠 1",
	    			margin: 10,
	    		},{
	    			xtype : 'panel',
	    			flex : 1,
//	    			html : "right 컨텐츠 2",
	    			margin: 10,
	    		}]
    		}]
    	});
    	me.callParent(arguments);    
	},
});