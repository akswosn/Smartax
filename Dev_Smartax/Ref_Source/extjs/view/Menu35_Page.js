/*
 * @page 부가가치세신고서
 * @author 이교철 
 * @history 2014.03.02
 */
var Menu35_Req_Callback = null;

Ext.define('Menu35_Page', { //클래스 정의
    extend: 'Ext.container.Container', //확장하려는 클래스 명시
    id: 'Menu35_Page',
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
		                    id: 'Menu35_From_Year',
		                    cls: 'searchChild',
		                    width: 120,
		                    fieldLabel: '조회기간 ',
		                    labelSeparator: '',
		                    labelWidth: 50,
		                    selectOnFocus: true
		                    
		                },
		                { //조회조건 (1.정기신고, 2.수정신고)
		                    xtype: 'combobox',
		                    id: 'Menu35_From_Month',
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
		                    id: 'Menu35_To_Year',
		                    cls: 'searchChild',
		                    width: 10,
		                    fieldLabel: '~',
		                    labelSeparator: '',
		                    labelWidth: 10,
		                    selectOnFocus: true
		                },
		                { //조회조건 (1.정기신고, 2.수정신고)
		                    xtype: 'combobox',
		                    id: 'Menu35_To_Month',
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
		                            Ext.getCmp('Menu35_Type_Text').setText(text);
		                        }
		                    }
		                    
		                },
		                { //완료일에 따라 텍스트 셋팅 (~3월: 1기예정, ~6월: 1기확정, ~9월: 2기예정, ~10월: 2기확정)
		                    xtype: 'label',
		                    id: 'Menu35_Type_Text',
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
		                        click: me.onRequestClaimButtonClick,
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
                    id: 'Menu35_Tab',
                    flex: 1,
                    activeTab: 0,
                    items: [{
                    			title : '합계',
	                    		//xtype: 'container',
	                    		xtype: 'panel',
	                    		//autoScroll: true,
	                    		overflowY: 'scroll',
			                    id:'Menu35_Sub_content',
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
						                    text: '신고서 인쇄',
						                    handler: function() {
						                    	me.onRequestBasicInfo(function(){
						                    		Global.temp =  me.generateClaimPrintData();
						                    		//window.open("./extjs/print/add_tax/print_out_add_tax_claim.html", "", "width=795, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
						                    		window.open("./extjs/print/add_tax/print_out_add_tax_claim2.html", "", "width=940, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
						                    	});
						                    }
						                },
						                {
						                    xtype: 'button',
						                    text: '납부서 인쇄',
						                    handler: function() {
						                    	console.log('generateNabuPrintData');
						                    	me.onRequestBasicInfo(function(){
						                    		Global.temp =  me.generateNabuPrintData();
						                    		window.open("./extjs/print/add_tax/print_out_add_tax_nabbu.html", "", "width=940, height=1000, toolbar=no, menubar=no, scrollbars=yes, location=no" );
						                    	});
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
        var now = new Date();
        Ext.getCmp('Menu35_From_Year').setValue(now.getFullYear());
        //Ext.getCmp('Menu35_From_Month').setValue(1);
        //Ext.getCmp('Menu35_From_Day').setValue(1);
        //Ext.getCmp('Menu35_To_Year').setValue(now.getFullYear());
        //Ext.getCmp('Menu35_To_Month').setValue(1);
        //Ext.getCmp('Menu35_To_Day').setValue(31);
        
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
		    html:'<iframe id="Menu35_iframe" src="./extjs/sub_view/add_claim_form.html" style="width:100%;height:100%" frameborder=0 scrolling="no" />'
        });
        
        //콜백함수 세팅  
        Menu35_Req_Callback = this.onRequestClaimButtonClick;
    	Ext.getCmp('Menu35_Sub_content').add(this.sub_page); 
        
        //조회 호출 -- 서브페이지에서 콜백으로 호출   
        //this.onRequestSumListButtonClick();
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
    
    onComboboxBeforeRender2: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: [
                { name: 'value', type: 'string' },
                { name: 'text', type: 'string' }
            ],
            data: [
                { value: '1', text: '제1기' },
                { value: '2', text: '제2기' },
            ]
        });
        component.store = store;
        component.setValue('1');
    },
    
    onRequestClaimButtonClick: function(button, e, eOpts) {
    	
    	var me = this;
    	var param = {};
    	
        param.from_atax_yyyymmdd = Ext.getCmp('Menu35_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu35_From_Month').getValue(), 2, '0') + '01';
       
        var to_day = '30';
        if(Ext.getCmp('Menu35_To_Month').getValue()=='3' ||Ext.getCmp('Menu35_To_Month').getValue()=='12') to_day = '31';
        param.to_atax_yyyymmdd = Ext.getCmp('Menu35_From_Year').getValue() + Ext.String.leftPad(Ext.getCmp('Menu35_To_Month').getValue(), 2, '0')+ to_day;
        
        Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/account/addtax/add_tax_claim_proc.php',
            params: param,
            success: function(response, opts) {
            	console.log(response.responseText);
            	//$('#Menu35_iframe').parent().css('overflow','auto');
            	console.log($('#Menu35_iframe').contents().find('.tbl-wrap').height());
            	$('#Menu35_iframe').height($('#Menu35_iframe').contents().find('.tbl-wrap').height()+20);
            	
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                Global.tax_free_sale = 0;
                Global.tax_free_buy = 0;
                
                if (json.CODE == '00') {
                	var ifr = $('#Menu35_iframe').contents();
                	//값 초기화
                	ifr.find('.col_val').text('');
                	ifr.find('input').val('');
                	
            		for(var i=0;i<json.DATA.length;i++)
            		{
            			//과세 매출 세금계산서 발급분 - 11  
            			if(json.DATA[i].type == '11')
            			{
            				ifr.find('#price1').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax1').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			//영세 매출 세금계산서 발급분[카드과세, 현금영수증 ] - 17,22 
            			else if(json.DATA[i].type == '17' ||json.DATA[i].type == '22')
            			{
            				price = Number(ifr.find('#price3').text().replace(/,/g, ''), 10)+Number(json.DATA[i].price);
            				tax = Number(ifr.find('#tax3').text().replace(/,/g, ''), 10)+Number(json.DATA[i].tax);
            				ifr.find('#price3').text((price) ? Ext.util.Format.number(price, '0,000') : '0');
            				ifr.find('#tax3').text((tax) ? Ext.util.Format.number(tax, '0,000') : '0');
            			}
            			//기타(정규영수증외매출분) - 15 
            			else if(json.DATA[i].type == '15')
            			{
            				ifr.find('#price4').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax4').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			//영세 매출 세금계산서 발급분 - 12 
            			else if(json.DATA[i].type == '12')
            			{
            				ifr.find('#price5').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax5').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			//영세 기타  - 13 
            			else if(json.DATA[i].type == '13')
            			{
            				ifr.find('#price6').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax6').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			//과세 매입 세금계산서 발급분 - 51  -- 임시 100
            			else if(json.DATA[i].type == '100')
            			{
            				ifr.find('#price10').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax10').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			 //과세 매입 고정자산매입 - 51 [계정과목 체크]  -- 임시 101
            			else if(json.DATA[i].type == '101')
            			{
            				ifr.find('#price11').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax11').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			else if(json.DATA[i].type == '54')
            			{
            				ifr.find('#price16').text((json.DATA[i].price) ? Ext.util.Format.number(json.DATA[i].price, '0,000') : '0');
            				ifr.find('#tax16').text((json.DATA[i].tax) ? Ext.util.Format.number(json.DATA[i].tax, '0,000') : '0');
            			}
            			//기타 값 채우
            			
            			//면세 더해서 글로벌에 저장  - 매출
            			else if(json.DATA[i].type == '13' || json.DATA[i].type == '18' || json.DATA[i].type == '23')
            			{
            				 Global.tax_free_sale += json.DATA[i].price;
            			}
            			//면세 더해서 글로벌에 저장  - 매입
            			else if(json.DATA[i].type == '53' || json.DATA[i].type == '58' || json.DATA[i].type == '62')
            			{
            	             Global.tax_free_buy += json.DATA[i].price;
            			}
            		}
            		//parseInt(newValue.replace(/,/g, ''), 10)
            		//합계 값 넣기
            		
            		var sum_func = function(){
	            		//1. 과세표준및 매출세액 합계 
	            		var sum_price = 0;
	            		var sum_tax = 0;
	            		for(var i=1;i<=8;i++)
	            		{
	            			sum_price+=Number(ifr.find('#price'+i).text().replace(/,/g, ''), 10);
	            			sum_tax+=Number(ifr.find('#tax'+i).text().replace(/,/g, ''), 10);
	            		}
	            		ifr.find('#price9').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
	          			ifr.find('#tax9').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
	          			
	          			//2. 매입세액 합계 
	          			sum_price = 0;
	            		sum_tax = 0;
	            		for(var i=10;i<=14;i++)
	            		{
	            			sum_price+=Number(ifr.find('#price'+i).text().replace(/,/g, ''), 10);
	            			sum_tax+=Number(ifr.find('#tax'+i).text().replace(/,/g, ''), 10);
	            		}
	            		ifr.find('#price15').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
	          			ifr.find('#tax15').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
	          			
	          			sum_price = 0;
	            		sum_tax = 0;
	            		
            			sum_price+=Number(ifr.find('#price15').text().replace(/,/g, ''), 10);
            			sum_tax+=Number(ifr.find('#tax15').text().replace(/,/g, ''), 10);
            			sum_price-=Number(ifr.find('#price16').text().replace(/,/g, ''), 10);
            			sum_tax-=Number(ifr.find('#tax16').text().replace(/,/g, ''), 10);
	          			
	          			ifr.find('#price17').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
	          			ifr.find('#tax17').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
	          			
	          			
	          			
	            		//3. 납부(환급)세액 
	            		sum_tax = Number(ifr.find('#tax9').text().replace(/,/g, ''), 10)-Number(ifr.find('#tax17').text().replace(/,/g, ''), 10);
	          			ifr.find('#tax-sum1').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
	          			
	          			//4. 기타경감.공제세액 + 신용카드매출전표등발행공제등  
	          			sum_price = 0;
	            		sum_tax = 0;
	            		for(var i=18;i<=19;i++)
	            		{
	            			sum_price+=Number(ifr.find('#price'+i).text().replace(/,/g, ''), 10);
	            			sum_tax+=Number(ifr.find('#tax'+i).text().replace(/,/g, ''), 10);
	            		}
	          			ifr.find('#price20').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
	          			ifr.find('#tax20').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
	          			
	          			//5. 차가감하여 납부할세액 (환급받을세액 )
	            		sum_tax = 0;
	            		sum_tax += Number(ifr.find('#tax-sum1').text().replace(/,/g, ''), 10);
	          			sum_tax -= Number(ifr.find('#tax20').text().replace(/,/g, ''), 10);
	          			sum_tax -= Number(ifr.find('#tax21').text().replace(/,/g, ''), 10);
	          			sum_tax -= Number(ifr.find('#tax22').text().replace(/,/g, ''), 10);
	          			sum_tax -= Number(ifr.find('#tax23').text().replace(/,/g, ''), 10);
	          			sum_tax -= Number(ifr.find('#tax24').text().replace(/,/g, ''), 10);
	          			sum_tax += Number(ifr.find('#tax25').text().replace(/,/g, ''), 10);
	          			
	          			ifr.find('#tax-sum2').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          			};
          			
          			sum_func();
          			
          			//7. 인풋값에 대한 이벤트 함수
          			var sum_func7 = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=32;i<=35;i++)
              			{
          					sum_price+=Number(ifr.find('#price'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price36').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax36').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				
          				ifr.find('#price7').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax7').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=32;i<=35;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax'+i+'_val');
          				
          				if(i==34||i==35)
          				{
          					//인풋 값에 따른 체인지 이벤트 
              				tmp_price_Obj.change(function() {
                  				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
        						sum_func12();
        					});
        					
              				tmp_tax_Obj.change(function() {
        						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
        						sum_func12();
        					});
          				}
          				else
          				{
          					//인풋 값에 따른 체인지 이벤트 
              				tmp_price_Obj.change(function() {
              					var tax_Obj = ifr.find('#tax'+$(this).attr('id').replace(/[^0-9]/g, '')+'_val');
                  				var value = Number($(this).val().replace(/,/g, ''));
                  				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
        						tax_Obj.val((value/10) ? Ext.util.Format.number((value/10), '0,000') : '');
        						sum_func7();
        					});
        					
              				tmp_tax_Obj.change(function() {
              					var price_Obj = ifr.find('#price'+$(this).attr('id').replace(/[^0-9]/g, '')+'_val');
        						var value = Number($(this).val().replace(/,/g, ''));
        						price_Obj.val((value*10) ? Ext.util.Format.number(value*10, '0,000') : '');
        						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
        						sum_func7();
        					});
          				}
          			}
          			
          			
          			//12. 매입(예정신고 누락분)
          			var sum_func12 = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=37;i<=38;i++)
              			{
          					sum_price+=Number(ifr.find('#price'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price398').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax39').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				
          				ifr.find('#price12').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax12').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=36;i<=37;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax'+i+'_val');
          				
          				//인풋 값에 따른 체인지 이벤트 
          				tmp_price_Obj.change(function() {
              				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func12();
    					});
    					
          				tmp_tax_Obj.change(function() {
    						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func12();
    					});
          			}
          			
          			// 예정누락분 기타
          			var sum_func12e = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=1;i<=8;i++)
              			{
          					sum_price+=Number(ifr.find('#price-etc'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax-etc'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price-etc9').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax-etc9').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=1;i<=8;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price-etc'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax-etc'+i+'_val');
          				
          				//인풋 값에 따른 체인지 이벤트 
          				tmp_price_Obj.change(function() {
              				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func12e();
    					});
    					
          				tmp_tax_Obj.change(function() {
    						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func12e();
    					});
          			}
          			
          			//14. 기타공제매입세액
          			var sum_func14 = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=40;i<=47;i++)
              			{
          					sum_price+=Number(ifr.find('#price'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price48').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax48').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				
          				ifr.find('#price14').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax14').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=40;i<=48;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax'+i+'_val');
          				
          				//인풋 값에 따른 체인지 이벤트 
          				tmp_price_Obj.change(function() {
              				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func14();
    					});
    					
          				tmp_tax_Obj.change(function() {
    						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func14();
    					});
          			}
          			
          			//16. 기타공제매입세액
          			var sum_func16 = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=49;i<=51;i++)
              			{
          					sum_price+=Number(ifr.find('#price'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price52').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax52').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				
          				ifr.find('#price16').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax16').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=49;i<=51;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax'+i+'_val');
          				
          				//인풋 값에 따른 체인지 이벤트 
          				tmp_price_Obj.change(function() {
              				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func16();
    					});
    					
          				tmp_tax_Obj.change(function() {
    						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func16();
    					});
          			}
          			
          			//18. 기타경감공제세액
          			var sum_func18 = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=53;i<=57;i++)
              			{
          					sum_price+=Number(ifr.find('#price'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price58').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax58').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				
          				ifr.find('#price18').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax18').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=53;i<=57;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax'+i+'_val');
          				
          				//인풋 값에 따른 체인지 이벤트 
          				tmp_price_Obj.change(function() {
              				$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func18();
    					});
    					
          				tmp_tax_Obj.change(function() {
    						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
    						sum_func18();
    					});
          			}
          			
          			
          			//24. 가산세명세
          			var sum_func24 = function(){
          				sum_price = 0;
          				sum_tax = 0;
          				for(var i=59;i<=76;i++)
              			{
          					sum_price+=Number(ifr.find('#price'+i+'_val').val().replace(/,/g, ''), 10);
            				sum_tax+=Number(ifr.find('#tax'+i+'_val').val().replace(/,/g, ''), 10);
              			}
          				ifr.find('#price77').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax77').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				
          				ifr.find('#price24').text((sum_price) ? Ext.util.Format.number(sum_price, '0,000') : '0');
          				ifr.find('#tax24').text((sum_tax) ? Ext.util.Format.number(sum_tax, '0,000') : '0');
          				sum_func();
          			}
          			
          			for(var i=59;i<=76;i++)
          			{
          				var tmp_price_Obj = ifr.find('#price'+i+'_val');
          				var tmp_tax_Obj = ifr.find('#tax'+i+'_val');
          				
          				var rate = 0;
          				if(i == 59 || i == 60 || i == 65|| i == 73 || i == 74) rate = 100;
          				else if(i == 61 || i == 62) rate = 50;
          				else if(i == 63) rate = 1000;
          				else if(i == 64) rate = 1000/3;
          				else if(i == 66 ||i == 72) rate = 1000/5;
          				
          				//인풋 값에 따른 체인지 이벤트 
          				tmp_price_Obj.change(function() {
          					var tax_Obj = ifr.find('#tax'+$(this).attr('id').replace(/[^0-9]/g, '')+'_val');
              				var value = Number($(this).val().replace(/,/g, ''));
              				
              				if(rate != 0)
              				{
              					$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
        						tax_Obj.val((value/rate) ? Ext.util.Format.number((value/10), '0,000') : '');
              				}
              				else
              				{
              					$(this).val((value)  ? Ext.util.Format.number(value, '0,000') : '');
              				}
    						sum_func24();
    					});
    					
          				tmp_tax_Obj.change(function() {
          					var price_Obj = ifr.find('#price'+$(this).attr('id').replace(/[^0-9]/g, '')+'_val');
    						var value = Number($(this).val().replace(/,/g, ''));
    						
              				if(rate != 0)
              				{
              					price_Obj.val((value*rate) ? Ext.util.Format.number(value*10, '0,000') : '');
        						$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
              				}
              				else
              				{
              					$(this).val((value) ? Ext.util.Format.number(value, '0,000') : '');
              				}
    						sum_func24();
    					});
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
    
    generateNabuPrintData: function() {
    	console.log('generateNabuPrintData');
    	var ret = {};

		// @@@@@@@ 부가세 납부서 
		//# 납부번호 - 분류기호, 서코드, 납부년월, 결정구분, 세목 , 수입징수관서, 계좌번호 , 성명, 주민/사업자번호, 회계연도, 주소
		//elect.giho
		//elect.office_code
		//elect.yymm
		//elect.gubun
		//elect.semok
		//elect.office_nm
		//elect.bank_num
		//elect.co_nm
		//elect.co_num
		//elect.acc_year
		//elect.address
    	/*
    		"co_nm":"\uc0d8\ud50c\ud68c\uc0ac"
    		,"co_ceo_nm":"\uc0d8\ud50c"
			,"co_saup_no":"123-456-7890"
			,"co_co_no":"123456-9999999"
			,"co_up":"\uc11c\ube44\uc2a4"
			,"co_up_code":"98765"
			,"co_jong":"\uc18c\ud504\ud2b8\uc6e8\uc5b4"
			,"co_zip":"435-060"
			,"co_addr":"\uacbd\uae30 \uad70\ud3ec\uc2dc \ub300\uc57c\ubbf8\ub3d9   643-3"
			,"co_tel":"010-2222-3333"
			,"co_tel_juso":"010-4444-5555"
			,"co_handphone":"010-6666-7777"
			,"co_email":"uclid@uclid.co.kr"
			,"co_fax":"--"
			,"co_tax_office":"\uc591\ucc9c"
			,"co_tax_office_code":"312"
			,"co_tax_office_acc":"000312"
			,"co_bank":"\uad6d\ubbfc"
			,"co_bank_branch":"\ubaa9\ub3d9"
			,"co_bank_acc":"444-555-666-777"
    	*/
		ret.elect = {};
		//국세 - 기본값
		ret.elect.giho = '0126';
		//세무서코드 - 가져오기 --미완
		ret.elect.office_code = Global.BasicInfo.co_tax_office_code;
		//납부년월, 기
		var tmp1 = Ext.getCmp('Menu35_To_Month').getValue();
		
		ret.elect.yymm = (Ext.getCmp('Menu35_From_Year').getValue()+'').substring(2,4)+Ext.String.leftPad((Number(tmp1)+1), 2, '0');
		if(tmp1>=6) ret.elect.gubun = '2';
		else ret.elect.gubun = '1';

		//세목 - 부가세(41)기본값
		ret.elect.semok = '41';
		
		//--미완 - 가져오기 --미완
		ret.elect.office_nm = Global.BasicInfo.co_tax_office+' 세무서';
		
		//--미완 - 가져오기 --미완
		ret.elect.bank_num = Global.BasicInfo.co_tax_office_acc;
		
		//--미완 - 가져오기 --미완
		ret.elect.co_nm = Global.BasicInfo.co_nm;
		
		//--미완 - 가져오기 --미완
		ret.elect.co_num = Global.BasicInfo.co_saup_no;
		
		//회계연도 
		ret.elect.acc_year = Ext.getCmp('Menu35_From_Year').getValue();
		
		//--미완 - 가져오기 --미완
		ret.elect.address = Global.BasicInfo.co_addr;
		
		//# 세금 - 귀속연도/기분, 부가가치세, 교육세, 농어촌 특별세, 계,  납부기한 , 지점
		//tax_val.add_tax
		//tax_val.edu_tax
		//tax_val.country_tax
		//tax_val.sum
		//tax_val.gihan_yyyy
		//tax_val.gihan_mm
		//tax_val.gihan_dd
		//tax_val.bank_gisum
		
		ret.tax_val = {};
		
		var t_text = "예정";
		if(tmp1 == 6 || tmp1 == 12)t_text = "확정";
		ret.tax_val.include_gi = Ext.getCmp('Menu35_From_Year').getValue()+'년'+' 귀속 '+ret.elect.gubun+'기 '+t_text;
		
		var ifr = $('#Menu35_iframe').contents();
		ret.tax_val.add_tax = ifr.find('#tax-sum2').text();
		ret.tax_val.edu_tax = '';
		ret.tax_val.country_tax = '';
		ret.tax_val.sum = ifr.find('#tax-sum2').text();
		
		if(tmp1 == 12)
		{
			ret.tax_val.gihan_yyyy = Ext.getCmp('Menu35_From_Year').getValue()+1;
			ret.tax_val.gihan_mm = '01';
			ret.tax_val.gihan_dd = '25';
		}
		else
		{
			ret.tax_val.gihan_yyyy = Ext.getCmp('Menu35_From_Year').getValue();
			ret.tax_val.gihan_mm = Number(tmp1)+1;
			ret.tax_val.gihan_dd = 25;
		}
		//ret.tax_val.bank_gisum = '';

		return ret;
    },
    
    generateClaimPrintData: function() {
    	console.log('generateClaimPrintData');
    	var ret = {};
    	var page1 = {}, page2 = {};
    	var ifr = $('#Menu35_iframe').contents();
    	
    	ret.page1 = page1;
    	ret.page2 = page2;
    	
    	/*
		"co_nm":"\uc0d8\ud50c\ud68c\uc0ac"
		,"co_ceo_nm":"\uc0d8\ud50c"
		,"co_saup_no":"123-456-7890"
		,"co_co_no":"123456-9999999"
		,"co_up":"\uc11c\ube44\uc2a4"
		,"co_up_code":"98765"
		,"co_jong":"\uc18c\ud504\ud2b8\uc6e8\uc5b4"
		,"co_zip":"435-060"
		,"co_addr":"\uacbd\uae30 \uad70\ud3ec\uc2dc \ub300\uc57c\ubbf8\ub3d9   643-3"
		,"co_tel":"010-2222-3333"
		,"co_tel_juso":"010-4444-5555"
		,"co_handphone":"010-6666-7777"
		,"co_email":"uclid@uclid.co.kr"
		,"co_fax":"--"
		,"co_tax_office":"\uc591\ucc9c"
		,"co_tax_office_code":"312"
		,"co_tax_office_acc":"000312"
		,"co_bank":"\uad6d\ubbfc"
		,"co_bank_branch":"\ubaa9\ub3d9"
		,"co_bank_acc":"444-555-666-777"
		Global.BasicInfo.co_tax_office
    	 */
    	
		// @@@@@@@ 부가세 신고서
		//page1 
    	//## 0. 상단 타이틀 [ 1 : 예정, 2 :확정, 3 : 기한후과세표준,  4: 영세율 등 조기환급 ]
    	//title.key
    	page1.title = {};
    	page1.title.key = 1;
    	if(Ext.getCmp('Menu35_To_Month').getValue() == 6 ||Ext.getCmp('Menu35_To_Month').getValue() == 12) page1.title.key = 2;
    		
		
		//## 1. 상단 기본 정보표
		//# 신고 기한 -  년, 기, 월 , 일[From - to]  
		//top_info.yyyy
		//top_info.gi
		//top_info.from_mouth
		//top_info.from_day
		//top_info.to_mouth
		//top_info.to_day
		page1.top_info = {};
		page1.top_info.yyyy = Ext.getCmp('Menu35_From_Year').getValue();
		
		var tmp0 = Ext.getCmp('Menu35_From_Month').getValue();
		var tmp1 = Ext.getCmp('Menu35_To_Month').getValue();
		
		if(tmp1>=6) page1.top_info.gi =  2;
		else page1.top_info.gi = 1;
		
		if(tmp0 == 3) page1.top_info.from_day = 31;
		else page1.top_info.from_day = 30;
		
		if(tmp1 == 3 || tmp1 == 12) page1.top_info.to_day = 31;
		else page1.top_info.to_day = 30;
		
		page1.top_info.from_mouth = Ext.String.leftPad(tmp0, 2, '0');
		page1.top_info.to_mouth = Ext.String.leftPad(tmp1, 2, '0');
		
		//# 사업자 정보 -  상호, 성명, 사업자번호, 주민(법인)등록 번호, 전화번호[사업장, 주소지, 휴대전화 ], 사업장 주소, 전자우편 주소
		//@@있음  - 상호, 성명, 전화번호, 주소지 전화번호,  
		//@@없음  - 사업자번호, 주민등록번호[사업자번호], 
		
		//top_info.co_nm
		//top_info.daepyo_nm
		//top_info.co_no
		//top_info.co_reg_no
		//top_info.tel.co
		//top_info.tel.home
		//top_info.tel.phone
		//top_info.address
		//top_info.email
		
		//초기에 데이터 베이스에서 가져오기
		page1.top_info.co_nm = Global.BasicInfo.co_nm;		
		page1.top_info.daepyo_nm = Global.BasicInfo.co_ceo_nm;
		page1.top_info.co_no = Global.BasicInfo.co_saup_no;			//사업자 번호
		page1.top_info.co_reg_no = Global.BasicInfo.co_co_no;	//법인 번호 및 주민번호
		page1.top_info.tel_co = Global.BasicInfo.co_tel;
		page1.top_info.tel_home = Global.BasicInfo.co_tel_juso;
		page1.top_info.tel_phone = Global.BasicInfo.co_handphone;
		page1.top_info.address = Global.BasicInfo.co_addr;
		page1.top_info.email = Global.BasicInfo.co_email;
		
		//# 신고 내용 1 - 1~25 [tax1, price1...] + sum1, sum2 ---> 완료 
		page1.claim_amt = {}; 
		for(var i=1; i<=25; i++)
		{
			page1.claim_amt['price'+i] = ifr.find('#price'+i).text();
			page1.claim_amt['tax'+i] = ifr.find('#tax'+i).text();
		
		}
		page1.claim_amt.sum1 = ifr.find('#tax-sum1').text();
		page1.claim_amt.sum2 = ifr.find('#tax-sum2').text();
		
		//#국세 환급금 계좌 신고 - 거래 은행 , 지점, 계좌번호
		//bottom_info.bank_nm
		//bottom_info.bank_branch
		//bottom_info.bank_num
		
		//초기에 데이터 베이스에서 가져오기
		page1.bottom_info = {};
		page1.bottom_info.bank_nm = Global.BasicInfo.co_bank;
		page1.bottom_info.bank_branch = Global.BasicInfo.co_bank_branch;
		page1.bottom_info.bank_num = Global.BasicInfo.co_bank_acc;
		
		//#폐업 신고 - 폐업일 , 폐업 사유
		page1.bottom_info.close_date = '';
		page1.bottom_info.close_reason = '';
		
		//#과세 표준 명세 - 업태1~4, 종목 1-4 , 업종코드 1-4, 금액 1-4
		//bottom_info.uptea1~4
		//bottom_info.jong1~4
		//bottom_info.up_code1~4
		//bottom_info.amt1~4
		
		//초기에 데이터 베이스에서 가져오기
		page1.bottom_info.uptea1 = Global.BasicInfo.co_up;
		page1.bottom_info.jong1 = Global.BasicInfo.co_jong;
		page1.bottom_info.up_code1 = Global.BasicInfo.co_up_code;
		page1.bottom_info.amt1 = ifr.find('#tax-sum2').text();
		
		page1.bottom_info.uptea2 = '';
		page1.bottom_info.jong2 = '';
		page1.bottom_info.up_code2 = '';
		page1.bottom_info.amt2 = '';
		
		page1.bottom_info.uptea3 = '';
		page1.bottom_info.jong3 = '';
		page1.bottom_info.up_code3 = '';
		page1.bottom_info.amt3 = '';
		
		page1.bottom_info.uptea4 = '';
		page1.bottom_info.jong4 = '';
		page1.bottom_info.up_code4 = '';
		page1.bottom_info.amt4 = '';
		
		page1.bottom_info.amt_sum = ifr.find('#tax-sum2').text();
		
		//#신고 날짜
		//bottom_info.claim_yyyy = 
		//bottom_info.claim_mm
		//bottom_info.claim_dd
		//bottom_info.claim_obj - 신고인
		
		page1.bottom_info.claim_yyyy = '2015';
		page1.bottom_info.claim_mm = '03';
		page1.bottom_info.claim_dd = '31';
		page1.bottom_info.claim_obj = Global.BasicInfo.co_nm;
		
		//#세무대리인 , 세무서
		//bottom_info.tax_claim_office
		page1.bottom_info.tax_claim_office  = Global.BasicInfo.co_tax_office;
		
		//#세무대리인 -  성명, 사업자등록번호, 전화번호
		//bottom_info.tax_agent_nm
		//bottom_info.tax_agent_num
		//bottom_info.tax_agent_tel
		page1.bottom_info.tax_agent_nm = '';
		page1.bottom_info.tax_agent_num = '';
		page1.bottom_info.tax_agent_tel = '';
		
		//page2
		//뒷면
		//# 신고 내용 1 - 31~68 [tax1, price1...] 
		page2.claim_amt = {}; 
		for(var i=32; i<=77; i++)
		{
			if(i== 36 || i== 39 || i== 48 || i== 52 || i== 58 || i== 77)
			{
				page2.claim_amt['price'+i] = ifr.find('#price'+i).text();
				page2.claim_amt['tax'+i] = ifr.find('#tax'+i).text();
			}
			else
			{
				page2.claim_amt['price'+i] = ifr.find('#price'+i+'_val').val();
				page2.claim_amt['tax'+i] = ifr.find('#tax'+i+'_val').val();
			}
		}
		
		//# 면세 사업 수입 금액 -  업태1~3, 종목 1-3 , 업종코드 1-3, 금액 1-3
		//tax_free_info.uptea1~3
		//tax_free_info.jong1~3
		//tax_free_info.up_code1~3
		//tax_free_info.amt1~3
		
		page2.tax_free_info = {};
		
		page2.tax_free_info.uptea1 = Global.BasicInfo.co_up;
		page2.tax_free_info.jong1 = Global.BasicInfo.co_jong;
		page2.tax_free_info.up_code1 = Global.BasicInfo.co_up_code;
		page2.tax_free_info.amt1 = Global.tax_free_sale;
		
		page2.tax_free_info.uptea2 = '';
		page2.tax_free_info.jong2 = '';
		page2.tax_free_info.up_code2 = '';
		page2.tax_free_info.amt2 = '';
		
		//page2.tax_free_info.uptea3 = '제조';
		page2.tax_free_info.jong3 = '';
		page2.tax_free_info.up_code3 = '';
		page2.tax_free_info.amt3 = '';
		
		page2.tax_free_info.amt_sum = Global.tax_free_sale;
		
		//# 계산서 발급 금액 , 계산서 수취 금액
		//claim.give_amt
		//claim.receive_amt
		
		page2.claim = {};
		
		//계산서 발급 금액
		//page2.claim.give_amt = ifr.find('#tax-sum2').text();
		//page2.claim.receive_amt =  ifr.find('#tax-sum2').text();
		
		page2.claim.give_amt = '';
		page2.claim.receive_amt = '';
		
		
		console.log(JSON.stringify(ret));
		console.log(ret);
		
		return ret;
    },
    
    //
    onRequestBasicInfo: function(callback) {
    	
    	Global.showMask(Ext.getBody());
        
        Ext.Ajax.request({
            method: 'POST',
            url: './proc/member/cur_company_data_proc.php',
            //params: param,
            success: function(response, opts) {
            	console.log(response.responseText);
            	//$('#Menu35_iframe').parent().css('overflow','auto');
            	
                var json = Ext.JSON.decode(response.responseText);
                
                Global.hideMask();
                
                if (json.CODE == '00') 
                {
                	json.co_up_code = Ext.String.leftPad(json.co_up_code, 6, '0');
                	Global.BasicInfo = json;
                	if(callback) callback();
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
});