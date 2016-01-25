/**
 *  메출자료 업로드(영업) 메인 메뉴 Panel View
 *  
 */
Ext.define('Smartax.view.supertax.TaxDataDownloadMain', {
	
	extend : 'Ext.container.Container',
	autoScroll : true,
	cls:'page',
	xtype : 'taxDataDownloadMain',
	id:'taxDataDownloadMain',
	padding:'0 25 0 0',
	flex : 1,
	taxDataDownloadGrid : null,
	taxDataDownloadGridStore : null,
	taxDataDownloadCompStore : null,
	taxDataDownloadFileStore : null,
	
	taxDataDownloadPopup : null,
	
	initComponent:  function(){
		var me = this;
		me.bodyPadding = 20;
        me.autoScroll = true;
//        var h = window.innerHeight;
//        me.height = h-150;
        me.region = 'center',
        
        me.layout = {
            type: 'vbox',
            align: 'stretch'
        };
        
		var searchBar = {
				xtype: 'container',
                layout: {
			        align: 'middle',
			        type: 'hbox'
			    },
                cls:'searchBar',
                items: [{ //조회조건 시작일(년도)
		                    xtype: 'numberfield',
		                    id: 'search_year',
		                    cls: 'searchChild',
		                    width: 120,
		                    selectOnFocus: true,
		                    value : (new Date()).getFullYear()
		                    
		                },
		                { //완료일에 따라 텍스트 셋팅 (~3월: 1기예정, ~6월: 1기확정, ~9월: 2기예정, ~10월: 2기확정)
		                    xtype: 'combobox',
		                    id: 'search_type',
		                    labelSeparator: '',
	                        editable:false,
	                        selectOnFocus: true,
	                        displayField: 'TEXT',
	                        queryMode: 'local',
	                        store: SmartaxCommonStore.SEARCH_TYPE, 
	                        valueField: 'CODE',
	                        enableKeyEvents : true,
		                    style: {
		                    	'padding': '0 5px 0 10px'
		                    },
		                },
		                {
		                	xtype:'label',
		                	id:'search_date',
		                	margin : '0 10 0 5',
		                },
		                {
		                    xtype: 'button',
		                    cls: 'searchChild',
		                    text: '조회',
		                    id:'searchBtn'
		                },{
	                        xtype: 'label',
	                        cls:'searchChild',
	                        margin: '4 0 0 10',
	                        flex:1,
	                        text: '화면 갱신은 조회단추를 다시 눌러주세요.'
	                    },
	                    {
	                        xtype: 'button',
	                        cls:'searchChild',
	                        text: '사용방법',
	                    }
		            ]
            	};
		
		Ext.applyIf(me, 
				{
				 items : [searchBar,
				          {
					           	xtype: 'container',
								id: 'taxDataDownloadGridLay',
								cls: 'left_content',
								flex:1,
			                    layout: {
			                    	align: 'stretch',
							        type: 'vbox'
						       }
				          },{
					    	   xtype: 'toolbar',
								layout: {
				                    pack: 'end',
				                    type: 'hbox'
				                },
				                dock: 'bottom',
			                    items: [
			                        {
			                     		xtype:'label',
			                     		flex:1
			                     	},
			                     	{
			                     		xtype:'button',
			                     		text: '저장',
			                     		cls:'bottomChild',
			                     		id:'flagSaveBtn'
			                     	}]
					       	}]
		});
		 me.callParent(arguments);
	},
	

});
