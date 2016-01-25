/**
 *  서비스 메인 메뉴 Panel View
 *  
 */
Ext.define('Smartax.view.CommonFooter', {
	
	extend : 'Ext.Panel',
	
	xtype : 'commonFooter',
	id:'commonFooter',
	config : {
		
		layout : {
			//type:'card',
			//animation: 'slide'
		},
		
		items : [
		{//공통메뉴
		    xtype: 'container',
		    cls:'infoBar',
		    layout:{
		    	type:'hbox'
		    }
		}]
	}

});
