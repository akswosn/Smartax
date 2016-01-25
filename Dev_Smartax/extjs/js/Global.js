/**
 * @author kyun
 */



var Global =
{
	viewPort: null,		//Extjs viewPort
	nickname: null, 	//성명
	selTarget: null,	//대메뉴바에서 선택한 타겟 저장
	selGycode: null, 	//기초금액에서 선택한 계정코드 임시저장
	onPopup: null,		//현재 떠있는 팝업창
	cellPos: null,		//그리드 셀 수정중 팝업을 띄었을경우 수정중이던 셀 정보 저장 {row:'로우index', column:'셀 index'}
	isEnter: false,		//엔터키를 눌러서 포커스를 이동했는지를 판단하기 위해 필요
	isCtrl: false,		//컨트럴키를 눌렀는지 판단하기 위해 필요
	isModified: false,	//셀이 수정이 되었는지 여부
	isShift: false,		//쉬프트키를 눌렀는지 판단하기 위해 필요
	groupIdArr: [-1], 	//그룹아이디를 판단해서 그리드 색상을 다르게 표현
	groupIdArr2: [-1], 	//그룹아이디를 판단해서 그리드 색상을 다르게 표현
	mask: null,			//로딩 마스크
	groupMap: null,		//분개장에서 그룹을 묶어주는 맵
	excelTitle: '',		//엑셀 export시 타이틀 셋팅
	required: '<span style="color:red;font-weight:bold" data-qtip="필수입력">*</span>',
	config: null,		//환경설정 data
	current: null, //현재 메뉴 저장
	
	//쿠키 저장
	setCookie: function (cName, cValue, cDay){
      	var expire = new Date();
      	expire.setDate(expire.getDate() + cDay);
      	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
      	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
      	document.cookie = cookies;
    },

    // 쿠키 불러오기 
    getCookie: function(cName) {
		cName = cName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cName);
		var cValue = '';
		if(start != -1){
			start += cName.length;
	       	var end = cookieData.indexOf(';', start);
	       	if(end == -1)end = cookieData.length;
	       	cValue = cookieData.substring(start, end);
		}
		return unescape(cValue);
    },
    
    //레코드를 순서에 맞게 소팅(extjs4 버그로 순서가 섞임)
    sortRecords: function(store, records)
    {
    	var lastRec = records[records.length-1];
		var firstIdx = store.indexOf(records[0]);
		var lastIdx = store.indexOf(lastRec);
		if(firstIdx > lastIdx)
		{
			var newRecArr = [lastRec];
			records.pop();
			return newRecArr.concat(records);
		}
		else return records;
    },
    
    //사업자번호 포멧 리턴
    getSaupjaNumber: function(text)
    {
    	var Saupja = (text+'').replace(/-/g,"");;
    	var len = Saupja.length; 
    	if(len < 4) return Saupja;
    	else if(len < 6) return Saupja.substring(0,3)+'-'+Saupja.substring(3,5);  
    	else return Saupja.substring(0,3)+'-'+Saupja.substring(3,5)+'-'+Saupja.substring(5,10);    	
    },
    
    //주민등록번호 포멧 리턴
    getJuminNumber: function(text)
    {
    	var Jumin = (text+'').replace(/-/g,"");;
    	var len = Jumin.length; 
    	if(len < 7) return Jumin;
    	else return Jumin.substring(0,6)+'-'+Jumin.substring(6,13);
    },
    
    //전화번호 포멧 리턴
    getPhoneNumber: function(text)
    {
    	var phone = (text+'').replace(/-/g,"");
    	var len = phone.length; 
    	if(len == 10) {
    		return phone.substring(0,3)+'-'+phone.substring(3,6)+'-'+phone.substring(6,10);
    	}
    	else if(len >= 11){
    		return phone.substring(0,3)+'-'+phone.substring(3,7)+'-'+phone.substring(7, 11);
    	}
    	else return text
    },
    
    //인쇄용 서브 타이틀 만들기
    makeSubTitle: function(from, to)
    {
    	var resultTitle = '( ';
    	resultTitle += from.substring(0,4)+'.'+from.substring(4,6)+'.'+from.substring(6,8);
    	resultTitle += ' ~ ';
    	resultTitle += to.substring(0,4)+'.'+to.substring(4,6)+'.'+to.substring(6,8);
    	resultTitle += ' )';
		return resultTitle;
    },
    
    //특정 panel에 키이벤트 셋팅하기
    setkeyEvent: function(target, key, callback)
    {
    	new Ext.util.KeyMap({
		    target: target.getEl(),
		    binding: [{
		        key: key,
		        fn: function (key, e) {
		            callback(true);
		        }
		    }]
		});
    },
    
    //금액으로 표현하기
    formatAm: function(field, newValue, oldValue){
		var am = '';
		if(newValue == '-') am = '-';
		else am = Ext.util.Format.number(newValue.replace(/,/g, ''), '0,000');	
		field.setValue(am);
	},
	
    //금액텍스트를 숫자로 셋팅하기
    formatAmTextToNum: function(field, newValue, oldValue){
		field.setValue(parseInt(newValue.replace(/,/g, ''), 10));
	},
    
    //ExtJs4에서 셀렉트한 레코드를 가져오면 첫번째 그리드 로우값이 맨 마지막 배열로 들어가므로 마지막 배열을 첫번째 배열로 순서를 바꿔줌
    sortModelArr:function(modelArr)
    {
    	if(modelArr.length == 0) return [];
		var firstArr = modelArr.splice(modelArr.length-1, 1);
		return firstArr.concat(modelArr);
    },
	
	//과세구분 환경설정에 따른 보여주고 안보여주기 함수
	settingTax: function()
	{
		var taxKbn = Ext.ComponentQuery.query('[cls~=tax_kbn]');
		for(var i=0; i<taxKbn.length; i++)
		{
			if(Global.config)
			{
				if(Global.config.tax_use == 1) taxKbn[i].show();
				else taxKbn[i].hide();	
			}
			else taxKbn[i].hide();
		}
		
	},
	
	//그리드 스크롤 하단으로 이동
	//@grid (Ext.grid.Panel)
	setGridScrollTop: function(grid) {
	    //그리드에 layout 속성이 없어야함 (layout 속성이 있으면 node tree가 다름)
	    var dom = grid.body.dom
        , max = dom.getElementsByTagName('table')[0].scrollHeight
        , num = 0
        , loof = setInterval(function() {
            if (num < max) {
                num = num + 1000;
                dom.children[0].scrollTop = num;
            } else {
                clearInterval(loof);
            };
        }, 10);
    },
    
    //K.s  image  popup
    openImagePopup : function(src, title)
    {
    	if(Global.onPopup)
		{
			Global.onPopup.close();
			Global.onPopup = null;
		} 
    	
    	Global.onPopup = Ext.create('Ext.window.Window', {
    	    title : title,
    	    layout: 'fit',
    	    height: $(document).height() - 200,
    	    width: $(document).width() - 400,
    	    modal: true,
    	    items: {  // Let's put an empty grid in just to illustrate fit layout
    	        xtype: 'image',
    	        border: false,
    	        src : src
    	    }
    	});
    	
    	Global.onPopup.show();
    },
    
	//팝업 띄우기
	openPopup: function(newPopup, title, url)
	{
		//기존 팝업이 띄워져 있으면 닫고 클리어
		if(Global.onPopup)
		{
			Global.onPopup.close();
			Global.onPopup = null;
		} 
		Global.onPopup = newPopup;
		if(title) Global.onPopup.setTitle(title);
		
		//도움말 팝업의 경우 html에서 읽어서 팝업을 띄움  
		if(url)
		{
			Global.onPopup.items.items[0].add(new Ext.Component({
	           loader: {
	              url:'./extjs/popup/'+url+'_Help.html',
	           		autoLoad: true
	           }
	        }));
			
		}
		Global.onPopup.show();
	},
	showMask: function(target, text)
	{
		this.mask = null;
		var message = "Please wait...";
		if(text) message = text;
		this.mask = new Ext.LoadMask(target, {msg: message});
		this.mask.show();		
	},
	hideMask: function()
	{
	    if (this.mask) {
	        this.mask.hide();
            this.mask = null;
	    }
	},
	getCustomers: function(param)
	{
		alert(param);
	},
	
	numberPriceFormat : function(text){
		return (text+"").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	numberPriceFormatCancel : function(text){
		return (text+"").replace(/,/g, '');
	}
};

// @@@@@@@ 부가세 신고서
//page1 
//## 0. 상단 타이틀 [ 0 : 예정, 1 :확정, 2 : 기한후과세표준,  3: 영세율 등 조기환급 ]
//title.key

//## 1. 상단 기본 정보표
//# 신고 기한 -  년, 기, 월 , 일[From - to]  
//top_info.yyyy
//top_info.gi
//top_info.from_mouth
//top_info.from_day
//top_info.to_mouth
//top_info.to_day

//# 사업자 정보 -  상호, 성명, 사업자번호, 주민(법인)등록 번호, 전화번호[사업장, 주소지, 휴대전화 ], 사업장 주소, 전자우편 주소  
//top_info.co_nm
//top_info.daepyo_nm
//top_info.co_no
//top_info.co_reg_no
//top_info.tel.co
//top_info.tel.home
//top_info.tel.phone
//top_info.address
//top_info.email

//# 신고 내용 1 - 1~25 [tax1, price1...] + sum1, sum2

//#국세 환급금 계좌 신고 - 거래 은행 , 지점, 계좌번호
//bottom_info.bank_nm
//bottom_info.bank_branch
//bottom_info.bank_num

//#폐업 신고 - 폐업일 , 폐업 사유
//bottom_info.close_date
//bottom_info.close_reason

//#과세 표준 명세 - 업태1~4, 종목 1-4 , 업종코드 1-4, 금액 1-4
//bottom_info.uptea1~4
//bottom_info.jong1~4
//bottom_info.up_code1~4
//bottom_info.amt1~4

//#신고 날짜
//bottom_info.claim_yyyy
//bottom_info.claim_mm
//bottom_info.claim_dd
//bottom_info.claim_obj - 신고인

//#세무대리인 , 세무서
//bottom_info.tax_agent
//bottom_info.tax_claim_office

//#세무대리인 -  성명, 사업자등록번호, 전화번호
//bottom_info.tax_agent_nm
//bottom_info.tax_agent_num
//bottom_info.tax_agent_tel


//page2
//뒷면
//# 신고 내용 1 - 31~68 [tax1, price1...] 

//# 면세 사업 수입 금액 -  업태1~3, 종목 1-3 , 업종코드 1-3, 금액 1-3
//tax_free_info.uptea1~3
//tax_free_info.jong1~3
//tax_free_info.up_code1~3
//tax_free_info.amt1~3

//# 계산서 발급 금액 , 계산서 수취 금액
//claim.give_amt
//claim.receive_amt



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
//elect.adress

//# 세금 - 부가가치세, 교육세, 농어촌 특별세, 계,  납부기한 
//elect.add_tax
//elect.edu_tax
//elect.country_tax
//elect.sum
//elect.gihan_yyyy
//elect.gihan_mm
//elect.gihan_dd









