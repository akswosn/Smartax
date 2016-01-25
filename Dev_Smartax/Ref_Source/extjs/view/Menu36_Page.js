/*
 * @page 신용카드매출전표등발행금액집계표 
 * @author 이교철 
 * @history 2014.03.02
 */
var Menu36_Req_Callback = null;
var thisObj = null;
Ext.define('Menu36_Page', { //클래스 정의
    extend: 'Ext.container.Container', //확장하려는 클래스 명시
    id: 'Menu36_Page',
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
		                items: [
		                        { //조회조건 시작일(년도)
				                    xtype: 'numberfield',
				                    id: 'Menu36_From_Year',
				                    cls: 'searchChild',
				                    width: 120,
				                    fieldLabel: '조회기간 ',
				                    labelSeparator: '',
				                    labelWidth: 50,
				                    selectOnFocus: true
				                },
				                { //조회조건 (1.정기신고, 2.수정신고)
				                    xtype: 'combobox',
				                    id: 'Menu36_From_Month',
				                    cls:'searchChild',
				                    queryMode: 'local',
				                    valueField: 'value',
				                    displayField: 'text',
				                    width: 70,
				                    editable: false,
				                    selectOnFocus: true,
				                    enableKeyEvents : true,
				                    listeners: {
				                        beforerender: me.onComboboxBeforeRender0,
				                        scope: me
				                    }
				                },
				                { //조회조건 완료일(년도)
				                    xtype: 'numberfield',
				                    id: 'Menu36_To_Year',
				                    cls: 'searchChild',
				                    width: 10,
				                    fieldLabel: '~',
				                    labelSeparator: '',
				                    labelWidth: 10,
				                    selectOnFocus: true
				                },
				                { //조회조건 (1.정기신고, 2.수정신고)
				                    xtype: 'combobox',
				                    id: 'Menu36_To_Month',
				                    cls:'searchChild',
				                    queryMode: 'local',
				                    valueField: 'value',
				                    displayField: 'text',
				                    width: 70,
				                    editable: false,
				                    selectOnFocus: true,
				                    enableKeyEvents : true,
				                    listeners: {
				                        beforerender: me.onComboboxBeforeRender00,
				                        scope: me,
				                        change: function(field, newValue, oldValue, eOpts) {
				                            var text;
				                            if (newValue == 3) text = '1기예정';
				                            if (newValue == 6) text = '1기확정';
				                            if (newValue == 9) text = '2기예정';
				                            if (newValue == 12) text = '2기확정';
				                            Ext.getCmp('Menu36_Type_Text').setText(text);
				                        }
				                    }
				                },
				                { //완료일에 따라 텍스트 셋팅 (~3월: 1기예정, ~6월: 1기확정, ~9월: 2기예정, ~10월: 2기확정)
				                    xtype: 'label',
				                    id: 'Menu36_Type_Text',
				                    text: '1기 예정',
				                    style: {
				                    	'padding': '0 5px 0 10px'
				                    }
				                },
				                {
				                    xtype: 'button',
				                    cls: 'searchChild',
				                    text: '조회',
				                    listeners: {
				                        click: me.onRequestSumResultClick,
				                        scope: me
				                    }
				                },
				                ]
            	},
        		 /*
	             * 표 
	             */
	            {
                    xtype: 'tabpanel',
                    itemId: 'tab_lay',
                    id: 'Menu36_Tab',
                    flex: 1,
                    activeTab: 0,
                    items: [{
                    			title : '합계',
	                    		//xtype: 'container',
	                    		xtype: 'panel',
	                    		//autoScroll: true,
	                    		overflowY: 'scroll',
			                    id:'Menu36_Sub_content',
			                    layout:{
			                    	 layout: 'fit'
			                    },
			                    flex:1
				        	}],
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
						                    xtype: 'button',
						                    text: '신용카드매출전표등발행금액집계표',
						                    handler: function() {
						                    	Global.temp =  me.generateCraditSalesPrintData();
						                    	window.open("./extjs/print/add_tax/print_out_add_tax_credit_sum.html", "", "width=955, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
						                    }
						                },
									]
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
    	thisObj = this;
    	
    	var now = new Date();
        Ext.getCmp('Menu36_From_Year').setValue(now.getFullYear());
        
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
		    html:'<iframe id="Menu36_iframe" src="./extjs/sub_view/add_tax_credit_sum.html" style="width:100%;height:100%" frameborder=0 scrolling="no" />'
        });
        
        //콜백함수 세팅  
        Menu36_Req_Callback = this.onRequestSumResultClick;
    	Ext.getCmp('Menu36_Sub_content').add(this.sub_page); 
    },
    
    onComboboxBeforeRender0: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
                { value: '1', text: '01.01' },
                { value: '4', text: '04.01' },
                { value: '9', text: '09.01' },
            ]
        });
        component.store = store;
        component.setValue('1');
    },
    
    onComboboxBeforeRender00: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
						{ value: '3', text: '03.31' },
						{ value: '6', text: '06.30' },
						{ value: '9', text: '09.30' },
						{ value: '12', text: '12.31' },
				  ]
        });
        component.store = store;
        component.setValue('3');
    },

    onRequestSumResultClick: function(button, e, eOpts) {
    	
    	var me = this;
    	Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/member/cur_company_data_proc.php',
            //params: param,
            success: function(response, opts) {
            	console.log(response.responseText);
            	//$('#Menu37_iframe').parent().css('overflow','auto');
            	
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') 
                {
                	json.co_up_code = Ext.String.leftPad(json.co_up_code, 6, '0');
                	Global.BasicInfo = json;
                	
                	console.log(json);
                	
                	$('#Menu36_iframe').height($('#Menu36_iframe').contents().find('.tbl-wrap').height()+20);
                	
                	//세팅
                	var ifr = $('#Menu36_iframe').contents();
                	
                	//상호
                	ifr.find('#co_nm').text(json.co_nm);
                	//성명
                	ifr.find('#co_deapyo').text(json.co_ceo_nm);
                	//사업자등록번호
                	ifr.find('#co_num').text(json.co_saup_no);
                	//사업장소재지
                	ifr.find('#co_address').text(json.co_addr);

                	//추가 호출
                	var param = {};
                    
                    param.from_atax_yyyymmdd = Ext.getCmp('Menu36_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu36_From_Month').getValue(), 2, '0') + '01';
                    
                    var to_day = '30';
                    if(Ext.getCmp('Menu36_To_Month').getValue()=='3' ||Ext.getCmp('Menu36_To_Month').getValue()=='12') to_day = '31';
                    param.to_atax_yyyymmdd = Ext.getCmp('Menu36_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu36_To_Month').getValue(), 2, '0')+ to_day;
                    
                    Global.showMask(Ext.getBody());
                    
                	Ext.Ajax.request({
                        method: 'POST',
                        url: './proc/account/addtax/add_tax_type_sum_proc.php',
                        params: param,
                        success: function(response, opts) {
                        	console.log(response.responseText);
                        	Global.hideMask();
                        	
                        	var json = Ext.JSON.decode(response.responseText);
                        	 	if(json.CODE == '00') 
                        	 	{
                        		 	//세팅
                        		 	thisObj.dataSet(json.DATA);
                        	 	}
                        },
                        failure: function(form, action) {
                            Global.hideMask();
                            Ext.Msg.alert("알림", '세금계산서합계표 조회 실패 : 네트워크 오류');
                        }
                    });
                }
                
                if (json.CODE == '99') {
                    Ext.Msg.alert("알림", '기본정보 조회 오류');
                }
            },
            failure: function(form, action) {
                Global.hideMask();
                Ext.Msg.alert("알림", '기본정보 조회 오류');
            }
        });
        
        
    },
    
    dataSet: function(data) {
    	
    	console.log('dataSet');
    	
    	var info = {}, tmp = null;
    	for(var i=0;i<data.length;i++)
    	{
    		tmp = data[i];
    		
    		console.log(tmp);
    		info[tmp.type] = {};
    		info[tmp.type][tmp.flag] = {};
    		info[tmp.type][tmp.flag]['sum_price'] = tmp.sum_price;
    		info[tmp.type][tmp.flag]['sum_tax'] = tmp.sum_tax;
    	}
    	
    	var ifr = $('#Menu36_iframe').contents();

    	/*
    	var val2_1 = info[17].y.sum_price + info[17].y.sum_tax +  info[17].n.sum_price + info[17].n.sum_tax;
    	var val3_1 = info[18].y.sum_price + info[18].y.sum_tax +  info[18].n.sum_price + info[18].n.sum_tax;
    	var val1_3 = info[22].y.sum_price + info[22].y.sum_tax +  info[22].n.sum_price + info[22].n.sum_tax;
    	
    	var val5_1 = info[17].y.sum_price + info[17].y.sum_tax;
    	var val5_2 = info[18].y.sum_price + info[18].y.sum_tax;
    	*/
    	console.log(info);
    	
    	function checkSum(type, isOnlyY)
    	{
    		var ret = 0;
    		if(info[type])
    		{
    			if(info[type].y)
    			{
    				ret  += Number(info[type].y.sum_price) +Number( info[type].y.sum_tax);
    			}
    			
    			if(!isOnlyY && info[type].n)
    			{
    				ret  += Number(info[type].n.sum_price) +Number( info[type].n.sum_tax);
    			}
    		}
    		
    		return ret;
    	}
    	
    	var val2_1 = checkSum(17);
    	var val3_1 = checkSum(18);
    	var val1_3 = checkSum(22);
    	
    	var val5_1 = checkSum(17,true);
    	var val5_2 = checkSum(18,true);
    	
    	ifr.find('#val2_1').text(val2_1 != 0 ? Ext.util.Format.number(val2_1, '0,000') : '');
    	ifr.find('#val3_1').text(val3_1 != 0 ? Ext.util.Format.number(val3_1, '0,000') : '');
    	ifr.find('#val1_3').text(val1_3 != 0 ? Ext.util.Format.number(val1_3, '0,000') : '');
     	
    	ifr.find('#val5_1').text(val5_1 != 0 ? Ext.util.Format.number(val5_1, '0,000') : '');
    	ifr.find('#val5_2').text(val5_2 != 0 ? Ext.util.Format.number(val5_2, '0,000') : '');
    },
    
    generateCraditSalesPrintData: function() {
    	console.log('generateCraditSalesPrintData');
    	var ret = {};
    	var page1 = {};
    	var ifr = $('#Menu36_iframe').contents();
    	
    	ret.page1 = page1;
    	
		// @@@@@@@ 부가세 신고서
		//page1 
    	//## 0. 상단 타이틀 [ 1 : 예정, 2 :확정, 3 : 기한후과세표준,  4: 영세율 등 조기환급 ]
    	//title.key
		page1.top_info = {};
		page1.top_info.yyyy = Ext.getCmp('Menu36_From_Year').getValue();
		
		var tmp0 = Ext.getCmp('Menu36_From_Month').getValue();
		var tmp1 = Ext.getCmp('Menu36_To_Month').getValue();
		
		if(tmp1>=6) page1.top_info.gi =  2;
		else page1.top_info.gi = 1;
		
		if(tmp0 == 3) page1.top_info.from_day = 31;
		else page1.top_info.from_day = 30;
		
		if(tmp1 == 3 || tmp1 == 12) page1.top_info.to_day = 31;
		else page1.top_info.to_day = 30;
		
		//초기에 데이터 베이스에서 가져오기
		page1.top_info.co_nm = Global.BasicInfo.co_nm;		
		page1.top_info.daepyo_nm = Global.BasicInfo.co_ceo_nm;
		page1.top_info.co_no = Global.BasicInfo.co_saup_no;			//사업자 번호
		page1.top_info.co_addr = Global.BasicInfo.co_addr;
		
		//# 신고 내용 1 - 1~25 [tax1, price1...] + sum1, sum2 ---> 완료 
		page1.values = {}; 
		
		for(var i=1;i<6;i++)
		{
			page1.values['val'+i+'_1'] = ifr.find('#val'+i+'_1').text();
			page1.values['val'+i+'_2'] = ifr.find('#val'+i+'_2').text();
			page1.values['val'+i+'_3'] = ifr.find('#val'+i+'_3').text();
		}
		
		console.log(JSON.stringify(ret));
		console.log(ret);
		
		return ret;
    },
});