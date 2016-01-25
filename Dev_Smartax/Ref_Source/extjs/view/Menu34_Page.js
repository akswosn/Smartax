/*
 * @page 세금계산서합계표검증표 
 * @author 이교철 
 * @history 2014.03.02
 */

var gycode_Skey = -1; //49,50,51,52
var customer_SKey = -1;
var customer_StrKey = '';

var Menu34_Req_Callback = null;

Ext.define('Menu34_Page', { //클래스 정의
    extend: 'Ext.container.Container', //확장하려는 클래스 명시
    id: 'Menu34_Page',
    cls: 'page',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    width: '100%',
    height: '100%',
    flex:1,
    initComponent: function() { //확장할 클래스의 기능을 재정의
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                border: false,
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'start'
                },
                cls: 'searchBar',
                items: [{ //조회조건 시작일(년도)
		                    xtype: 'numberfield',
		                    id: 'Menu34_From_Year',
		                    cls: 'searchChild',
		                    width: 120,
		                    fieldLabel: '조회기간',
		                    labelSeparator: '',
		                    labelWidth: 50,
		                    selectOnFocus: true
		                },
		                { //조회조건 시작일(월)
		                    xtype: 'numberfield',
		                    id: 'Menu34_From_Month',
		                    cls: 'searchChild',
		                    width: 50,
		                    minValue : 1,
		                    maxValue : 12,
		                    selectOnFocus: true
		                },
		                { //조회조건 완료일(년도)
		                    xtype: 'numberfield',
		                    id: 'Menu34_To_Year',
		                    cls: 'searchChild',
		                    width: 80,
		                    fieldLabel: '~',
		                    labelSeparator: '',
		                    labelWidth: 10,
		                    selectOnFocus: true
		                },
		                { //조회조건 완료일(월)
		                    xtype: 'numberfield',
		                    id: 'Menu34_To_Month',
		                    cls: 'searchChild',
		                    width: 50,
		                    minValue : 1,
		                    maxValue : 12,
		                    selectOnFocus: true,
		                    listeners: {
		                        change: function(field, newValue, oldValue, eOpts) {
		                            var text;
		                            
		                            if (newValue > 0 && newValue <= 3) text = '1기예정';
		                            if (newValue > 3 && newValue <= 6) text = '1기확정';
		                            if (newValue > 6 && newValue <= 9) text = '2기예정';
		                            if (newValue > 9 && newValue <= 12) text = '2기확정';
		                            
		                            //Ext.getCmp('Menu34_Type_Text').setText(text);
		                        }
		                    }
		                },
		                { //조회조건 (1.정기신고, 2.수정신고)
		                    xtype: 'combobox',
		                    id: 'Menu34_Type_Select',
		                    cls:'searchChild',
		                    queryMode: 'local',
		                    valueField: 'value',
		                    displayField: 'text',
		                    editable: false,
		                    selectOnFocus: true,
		                    enableKeyEvents : true,
		                    listeners: {
		                        beforerender: me.onComboboxBeforeRender,
		                        scope: me
		                    }
		                },
		                {
		                    xtype: 'button',
		                    cls: 'searchChild',
		                    text: '매출',
		                    listeners: {
		                        click: me.onRequestSumListButtonClick1,
		                        scope: me
		                    }
		                },
		                {
		                    xtype: 'button',
		                    cls: 'searchChild',
		                    text: '매입',
		                    listeners: {
		                        click: me.onRequestSumListButtonClick2,
		                        scope: me
		                    }
		                }]
            	},
        		 /*
	             * 표 
	             */
	            {
                    xtype: 'tabpanel',
                    itemId: 'tab_lay',
                    id: 'Menu34_Tab',
                    flex: 1,
                    activeTab: 0,
                    items: [{
                    			title : '합계',
	                    		xtype: 'container',
			                    id:'Menu34_Sub_content',
			                    layout:{
			                    	type:'vbox'
			                    },
			                    flex:1
				        	}],
				}],
	            listeners: {
	                afterrender: {
	                    fn: me.onContainerAfterRender,
	                    scope: me
	                }
	            }
        });

        me.callParent(arguments); //확장할 클래스의 initComponent 함수 호출하여 재정의한 내용을 전달
    },
    
    //화면 렌더링 될때 초기값 셋팅
    onContainerAfterRender: function(component, eOpts) {
        //현재 날짜 기준으로 조회년월 셋팅
        var now = new Date();
        Ext.getCmp('Menu34_From_Year').setValue(now.getFullYear());
        Ext.getCmp('Menu34_From_Month').setValue(1);
        Ext.getCmp('Menu34_To_Year').setValue(now.getFullYear());
        Ext.getCmp('Menu34_To_Month').setValue(1);
        
        //하단 표 로드  
	    this.sub_page = new Ext.Component({
			cls:'page',
		    layout: {
		        align: 'stretch',
		        type: 'vbox'
		    },
		    width: '100%',
		    height: '100%',
		    flex:1,
		    html:'<iframe id="menu34_iframe" src="./extjs/sub_view/add_sum_page.html" style="width:100%;height:100%" frameborder=0 scrolling="no" />'
        });
        
        //콜백함수 세팅  
        Menu34_Req_Callback = this.onRequestSumListButtonClick1;
    	Ext.getCmp('Menu34_Sub_content').add(this.sub_page); 
        
        //조회 호출 -- 서브페이지에서 콜백으로 호출   
        //this.onRequestSumListButtonClick();
    },
    
    onComboboxBeforeRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
                { value: '1', text: '1.정기신고' },
                { value: '2', text: '2.수정신고' }
            ]
        });
        component.store = store;
        component.setValue('1');
    },
    
    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        this.temp.current = newCard;
        
        if (newCard.itemId == 'type1') {
            this.temp.type = 0;
            this.param.type1 = '13';
            this.param.type2 = '';
        }
        
        if (newCard.itemId == 'type2') {
            this.temp.type = 1;
            this.param.type1 = '53';
        }
        
        if (!newCard.isCall) {
            this.onRequestSumListButtonClick();
            newCard.isCall = true;
        }
    },
    
    //매출 
    onRequestSumListButtonClick1: function(button, e, eOpts) {
    	
    	var me = this;
    	var param = {};
    	param.type1 = '13';
        param.from_atax_yyyymm = Ext.getCmp('Menu34_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu34_From_Month').getValue(), 2, '0');
        param.to_atax_yyyymm = Ext.getCmp('Menu34_To_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu34_To_Month').getValue(), 2, '0');
        
        Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_verify_sum_list_proc.php',
            params: param,
            success: function(response, opts) {
            	console.log(response.responseText);
            	
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') {
                	var ifr = $('#menu34_iframe').contents();
                	//값 초기화
                	ifr.find('.col_val').text('');
                		
                		
                	//합계에 기본값 넣
            		ifr.find('#col19_1').text(0);
            		ifr.find('#col19_2').text(0);
            		ifr.find('#col19_3').text(0);
            				
            		for(var i=0;i<json.DATA.length;i++)
            		{
            			console.log(i+' : '+json.DATA[i]);
            			if(json.DATA[i].flag == 'y')
            			{
            				ifr.find('#col1_1').text(json.DATA[i].cnt);
            				ifr.find('#col1_2').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#col1_3').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			else if(json.DATA[i].flag == 'n')
            			{
            				ifr.find('#col11_1').text(json.DATA[i].cnt);
            				ifr.find('#col11_2').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#col11_3').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			else if(json.DATA[i].flag == 'sum')
            			{
            				ifr.find('#col19_1').text(json.DATA[i].cnt);
            				ifr.find('#col19_2').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#col19_3').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            		}
          
                }
                
                if (json.CODE == '99') {
                    Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 데이터 오류');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 네트워크 오류');
            }
        });
    },
    
    //매입  
    onRequestSumListButtonClick2: function(button, e, eOpts) {
    	
    	var me = this;
    	var param = {};
    	param.type1 = '53';
        param.from_atax_yyyymm = Ext.getCmp('Menu34_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu34_From_Month').getValue(), 2, '0');
        param.to_atax_yyyymm = Ext.getCmp('Menu34_To_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu34_To_Month').getValue(), 2, '0');
        
        Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_verify_sum_list_proc.php',
            params: param,
            success: function(response, opts) {
            	console.log(response.responseText);
            	
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') {
                	var ifr = $('#menu34_iframe').contents();
                	//값 초기화
                	ifr.find('.col_val').text('');
                		
                		
                	//합계에 기본값 넣
            		ifr.find('#col19_1').text(0);
            		ifr.find('#col19_2').text(0);
            		ifr.find('#col19_3').text(0);
            				
            		for(var i=0;i<json.DATA.length;i++)
            		{
            			console.log(i+' : '+json.DATA[i]);
            			if(json.DATA[i].flag == 'y')
            			{
            				ifr.find('#col1_1').text(json.DATA[i].cnt);
            				ifr.find('#col1_2').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#col1_3').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            				
            			}
            			else if(json.DATA[i].flag == 'n')
            			{
            				ifr.find('#col11_1').text(json.DATA[i].cnt);
            				ifr.find('#col11_2').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#col11_3').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			else if(json.DATA[i].flag == 'sum')
            			{
            				ifr.find('#col19_1').text(json.DATA[i].cnt);
            				ifr.find('#col19_2').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#col19_3').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            		}
          
                }
                
                if (json.CODE == '99') {
                    Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 데이터 오류');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 네트워크 오류');
            }
        });
    },
});