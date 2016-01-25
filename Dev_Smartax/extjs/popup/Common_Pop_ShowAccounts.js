
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_ShowAccounts', {
    extend: 'Ext.window.Window',

    height: 600,
    width: 500,
    modal: false,
    title: '계정체계도',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    height: 566,
                    autoScroll: true,
                    store: StoreInfo.GycodeSystem,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style:'text-align:center;',
                            dataIndex: 'col1',
                            text: '대여(자산)'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style:'text-align:center;',
                            dataIndex: 'col2',
                            text: '차입(부채)'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style:'text-align:center;',
                            dataIndex: 'col3',
                            text: '이익(수익)'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex:1,
                            style:'text-align:center;',
                            dataIndex: 'col4',
                            text: '손실(비용)'
                        }
                    ],
                    dockedItems: [
						{
							xtype: 'toolbar',
							layout: {
		                        pack: 'end',
		                        type: 'hbox'
		                    },
							dock: 'bottom',
							items: [
								{
				               		xtype:'button',
				               		text: '인쇄',
				               		cls:'bottomChild',
				               		handler : function(){
				               			Ext.ux.grid.Printer.mainTitle = me.title;
						            	Ext.ux.grid.Printer.print(this.up().up());
						            }
				               	},
				               	{
				               		xtype: 'exporterbutton',
				               		downloadName: '계정체계도',
				               		cls:'bottomChild'
				               	},
				               	{
				               		xtype:'button',
				               		text: '종료',
				               		listeners:{
				               			click:{
				               				fn: me.onCloseClick,
				               				scope: me	
				               			}
				               		}
				               	}
							]
						}
					]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
	onWindowAfterRender: function(component, eOpts) {
		
		var lengh1 = [], lengh2 = [], lengh3 = [], lengh4 = [];
		
		StoreInfo.Menu08_Grid.each(function(record, idx){
			var gycode = record.get('gycode');
			var codeType = parseInt((parseInt(gycode, 10)/100), 10);
			var fullName = gycode+" "+record.get('gy_name');  
			if(codeType == 1) lengh1.push(fullName);
			else if(codeType == 2) lengh2.push(fullName);
			else if(codeType == 3) lengh3.push(fullName);
			else if(codeType == 4) lengh4.push(fullName);
		});
		
		
		StoreInfo.GycodeSystem.removeAll();
		
		var max = Math.max(lengh1.length, lengh2.length, lengh3.length, lengh4.length);
		for(var i=0; i<max; i++)
		{
			var col1 = '', col2 = '', col3 = '', col4 = '';
			if(lengh1[i]) col1 = lengh1[i];			
			if(lengh2[i]) col2 = lengh2[i];			
			if(lengh3[i]) col3 = lengh3[i];			
			if(lengh4[i]) col4 = lengh4[i];
			StoreInfo.GycodeSystem.add({
				'col1': col1, 'col2': col2, 'col3': col3, 'col4': col4
			});
		}
   	},
    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
    },
    onCloseClick: function(){
		this.close();    	
    }

});