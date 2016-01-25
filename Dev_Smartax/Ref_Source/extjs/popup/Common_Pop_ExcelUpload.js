
//***************************************  뷰  ***************************************// 컨트롤러는 하단에    
    

Ext.define('Common_Pop_ExcelUpload', {
    extend: 'Ext.window.Window',

    height: 300,
    width: 600,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
                    xtype: 'container',
                    margin: '10 10 20 10',
                    layout: {
                        align: 'middle',
                        type: 'hbox'
                    },
                    items: [
	                    {
		            		xtype: 'filefield',
		            		id:'excelfilefield',
		            		flex:1,
		            		emptyText: '엑셀파일을 선택해주세요',
		            		fieldLabel: '엑셀파일',
		            		labelAlign: 'right',
		            		labelWidth: 60,
		            		buttonText: '파일선택',
		            		listeners:{
                            	change:{
                            		fn: me.onSaveClick,
                            		scope: me
                            	}
                            }
		            	}
                    ]
		   		},
				{
                    xtype: 'container',
                    margin: 10,
                    layout: {
                        align: 'right',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
	                    {
		            		xtype: 'label',
		            		style: 'text-align:center;',
		            		width: '100%',
		            		margin: '0 0 10 0',
		            		text: '아래와 같은 양식으로 엑셀파일을 작성해주세요.'
		            	},
		            	{ 
		            		xtype: 'image',
		            		id: 'excelImg',
		            		width: '100%',
		            		height: 140,
		            		src:''
		            	},
		            	{
                            xtype: 'button',
                            margin: 5,
                            text: '예제양식받기',
                            listeners:{
                            	click:{
                            		fn: me.onSampleDown,
                            		scope: me
                            	}
                            }
                            
                        }
                    ]
		   		},
            ],
            listeners: {
                afterrender: {
                    fn: me.onContainerAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },
    
    //화면이 처음 보여질시 셋팅
    onContainerAfterRender: function(component, eOpts) {
    	
    	Ext.getCmp('excelImg').setSrc('./extjs/img/' + this.excelType + '_img.png');
    },
    
    //엑셀파일 스토어로 변환
    onSaveClick: function(){
    	
    	if(!Ext.getCmp('excelfilefield').getValue())
		{
			Ext.Msg.alert("", '엑셀 파일을 선택해 주세요.');
			return;
		}
    	else
    	{
    		var thisObj = this;
    		ExcelMgr.excelImport(Ext.getDom('excelfilefield-button-fileInputEl'),
    		function(excelData)
    		{
    			var winName = '';
    			var winTitle = '';
    			if(thisObj.excelType == 'trds_reg')
    			{
    				winName = 'Common_Pop_Trds_Mgr';
    				winTitle = '거래처 엑셀 등록';
    			}
    			else if(thisObj.excelType == 'items_reg')
    			{
    				winName = 'Common_Pop_Items_Mgr';
    				winTitle = '상품 엑셀 등록';
    			}
    			else if(thisObj.excelType == 'stock_reg')
                {
                    winName = 'Common_Pop_Stock_Mgr';
                    winTitle = '초기재고 엑셀 등록';
                }
    			var pop = Ext.create(winName);
    			pop.excelData = excelData;
    			if(thisObj.excelType == 'stock_reg') pop.io_yyyy = thisObj.io_yyyy;
    			Global.openPopup(pop, winTitle);
			});
    	}
    },
    
    onSampleDown: function(){
		window.location = './extjs/excelsample/' + this.excelType + '.xlsx';	
    }
});