/**
 * @author kyun
 */

var StoreInfo = 
{
	//---------------------------------------------------------------------------
   	// 거래처 검색조건
   	//---------------------------------------------------------------------------
    SEAR_TRD: Ext.create('Ext.data.Store',{
    	fields: [
            { name: 'CODE' },
            { name: 'TEXT' }
        ],
        data:[
        	{CODE: 'tr_nm', TEXT: '거래처명'},
        	{CODE: 'customer_id', TEXT: '거래처코드'},
        	{CODE: 'tr_daepyo', TEXT: '대표자'},
        	{CODE: 'tr_addr', TEXT: '주소'},
        	{CODE: 'tr_phone', TEXT: '핸드폰번호'},
        	{CODE: 'tr_tel', TEXT: '전화번호'}
        ]
    }),
    
   	//---------------------------------------------------------------------------
   	// 날씨구분
   	//---------------------------------------------------------------------------
    WEATH_KBN: Ext.create('Ext.data.Store',{
    	fields: [
            { name: 'weather_cd' },
            { name: 'weather_nm' }
        ],
        data:[
        	{weather_cd: 1, weather_nm: '맑음'},
        	{weather_cd: 2, weather_nm: '맑은 후 흐림'},
        	{weather_cd: 3, weather_nm: '맑은 후 비'},
        	{weather_cd: 4, weather_nm: '맑은 후 눈'},
        	{weather_cd: 5, weather_nm: '흐림'},
        	{weather_cd: 6, weather_nm: '흐린 후 비'},
        	{weather_cd: 7, weather_nm: '흐린 후 맑음'},
        	{weather_cd: 8, weather_nm: '흐린 후 눈'},
        	{weather_cd: 9, weather_nm: '비'},
        	{weather_cd: 10, weather_nm: '비온 후 갬'},
        	{weather_cd: 11, weather_nm: '비온 후 눈'},
        	{weather_cd: 12, weather_nm: '비온 후 흐림'},
        	{weather_cd: 13, weather_nm: '안개'},
        	{weather_cd: 14, weather_nm: '안개낀 후 맑음'},
        	{weather_cd: 15, weather_nm: '눈'},
        	{weather_cd: 16, weather_nm: '눈온 후 갬'},
        	{weather_cd: 17, weather_nm: '눈온 후 비'},
        	{weather_cd: 18, weather_nm: '눈온 후 흐림'},
        	{weather_cd: 19, weather_nm: '진눈깨비'},
        	{weather_cd: 20, weather_nm: '우박'}
        ]
    }),
    
   	//---------------------------------------------------------------------------
   	// 과세구분
   	//---------------------------------------------------------------------------
    TAX_KBN: Ext.create('Ext.data.Store',{
    	fields: [
            { name: 'tax_cd' },
            { name: 'tax_nm' }
        ],
        data:[
        	{tax_cd: 1, tax_nm: '1.과세'},
        	{tax_cd: 2, tax_nm: '2.면세'},
        	{tax_cd: 3, tax_nm: '3.영세'},
        	{tax_cd: 4, tax_nm: '4.카드'},
        	{tax_cd: 5, tax_nm: '5.기타'}
        ]
    }),
    
    //---------------------------------------------------------------------------
   	// 부가세 분개 유형
   	//---------------------------------------------------------------------------
    JP_KBN_ATAX : Ext.create('Ext.data.Store', {
	    fields: ['CODE', 'TEXT', 'TYPE'],
	    data :[
	       // { "CODE": 1, "TEXT":"1.현금출금", "TYPE": 2},
	       // { "CODE": 2, "TEXT":"2.현금입금", "TYPE": 1},
	        { "CODE": 3, "TEXT":"3.지출차변", "TYPE": 2},
	        { "CODE": 4, "TEXT":"4.수입대변", "TYPE": 1},
	       // { "CODE": 5, "TEXT":"5.예금지급", "TYPE": 2},
	       // { "CODE": 6, "TEXT":"6.예금수취", "TYPE": 1},
	       // { "CODE": 7, "TEXT":"7.카드매입", "TYPE": 2},
	       // { "CODE": 8, "TEXT":"8.카드매출", "TYPE": 1},
	       // { "CODE": 9, "TEXT":"9.외상매입", "TYPE": 2},
	       // { "CODE": 10, "TEXT":"10.외상매출", "TYPE": 1}
	    ]
	}),
    
    
	
    
    //---------------------------------------------------------------------------
   	//	전표구분 Store Type-2 :출금 / Type-1:  입금
   	//---------------------------------------------------------------------------
    
   	JP_KBN: Ext.create('Ext.data.Store', {
	    fields: ['CODE', 'TEXT', 'TYPE'],
	    data :[
	        { "CODE": 1, "TEXT":"1.현금출금", "TYPE": 2},
	        { "CODE": 2, "TEXT":"2.현금입금", "TYPE": 1},
	        { "CODE": 3, "TEXT":"3.지출차변", "TYPE": 2},
	        { "CODE": 4, "TEXT":"4.수입대변", "TYPE": 1},
	        { "CODE": 5, "TEXT":"5.예금지급", "TYPE": 2},
	        { "CODE": 6, "TEXT":"6.예금수취", "TYPE": 1},
	        { "CODE": 7, "TEXT":"7.카드매입", "TYPE": 2},
	        { "CODE": 8, "TEXT":"8.카드매출", "TYPE": 1},
	        { "CODE": 9, "TEXT":"9.외상매입", "TYPE": 2},
	        { "CODE": 10, "TEXT":"10.외상매출", "TYPE": 1}
	    ]
	}),
	
	
    //---------------------------------------------------------------------------
   	//	입력예제 스토어
   	//---------------------------------------------------------------------------
   	InputExam: Ext.create('Ext.data.Store', {
	    fields: [ 'kbn', 'type', 'jak', 'io', 'gycd', 'cre', 'deb', 'tr'],
	    data :[
			{ kbn: "현금거래", 	type: "	전기말 현금잔액입력	", jak: "	생략가능	", io: "	기초자료관리	", gycd: "	기초잔액 등록메뉴에서 입력	", cre: "", deb: "", tr: "	생략가능	" },
			{ kbn: "", type: "	현금 판매 수입 발생시	", jak: "", io: "	현금입금	", gycd: "	301 매출액	", cre: "	6000	", deb: "", tr: "" },
			{ kbn: "", type: "	현금 경비 지출 발생시	", jak: "", io: "	현금출금	", gycd: "	401 종묘비	", cre: "", deb: "	3000	", tr: "" },
			{ kbn: "", type: "	현금 경비 지출 발생시	", jak: "", io: "	현금출금	", gycd: "	403 농약비	", cre: "", deb: "	4000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	현금으로 차입금 수취	", jak: "", io: "	현금입금	", gycd: "	209 차입금	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "	현금으로 차입금 상환	", jak: "", io: "	현금출금	", gycd: "	209 차입금	", cre: "", deb: "	200	", tr: "" },
			{ kbn: "", type: "	현금으로 이자지급	", jak: "", io: "	현금출금	", gycd: "	432 지급이자	", cre: "", deb: "	20	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	현금으로 대여금 지급	", jak: "", io: "	현금출금	", gycd: "	113 대여금	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	현금으로 대여금 회수	", jak: "", io: "	현금입금	", gycd: "	113 대여금	", cre: "	800	", deb: "", tr: "" },
			{ kbn: "", type: "	현금으로 이자수취	", jak: "", io: "	현금입금	", gycd: "	307 수입이자	", cre: "	40	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	현금으로 토지 구입	", jak: "", io: "	현금출금	", gycd: "	151 토지	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	현금으로 기계 구입	", jak: "", io: "	현금출금	", gycd: "	154 기계장치	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	현금으로 외상대 지급	", jak: "", io: "	현금출금	", gycd: "	201 외상매입금	", cre: "", deb: "	500	", tr: "" },
			{ kbn: "", type: "	현금으로 외상대 수취	", jak: "", io: "	현금입금	", gycd: "	108 외상매출금	", cre: "	600	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "보통예금거래", type: "	전기말 보통예금 잔액입력	", jak: "", io: "	기초자료관리	", gycd: "	기초잔액 등록메뉴에서 입력	", cre: "", deb: "", tr: "" },
			{ kbn: "(이하 예금)", type: "	현금의 보통예금 예치	", jak: "", io: "	현금예치	", gycd: "	103 보통예금	", cre: "", deb: "	2000	", tr: "" },
			{ kbn: "", type: "	보통예금에서 현금인출	", jak: "", io: "	현금인출	", gycd: "	103 보통예금	", cre: "	1200	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	판매수입의 예금수취	", jak: "", io: "	예금수취	", gycd: "	301 매출액	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "	경비의 예금이체 지급	", jak: "", io: "	예금지급	", gycd: "	412 전기료	", cre: "", deb: "	200	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	예금으로 차입금 수취	", jak: "", io: "	예금수취	", gycd: "	209 차입금	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "	예금으로 차입금 상환	", jak: "", io: "	예금지급	", gycd: "	209 차입금	", cre: "", deb: "	600	", tr: "" },
			{ kbn: "", type: "	예금으로 이자지급	", jak: "", io: "	예금지급	", gycd: "	432 지급이자	", cre: "", deb: "	50	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	예금으로 대여금 지급	", jak: "", io: "	예금지급	", gycd: "	113 대여금	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	예금으로 대여금 회수	", jak: "", io: "	예금수취	", gycd: "	113 대여금	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "	예금으로 이자수취	", jak: "", io: "	예금수취	", gycd: "	307 수입이자	", cre: "	100	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	예금으로 외상대 지급	", jak: "", io: "	예금지급	", gycd: "	201 외상매입금	", cre: "", deb: "	200	", tr: "" },
			{ kbn: "", type: "	예금으로 외상대 수취	", jak: "", io: "	예금수취	", gycd: "	108 외상매출금	", cre: "	100	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "외상판매", type: "	외상판매 시점	", jak: "", io: "	외상매출	", gycd: "	301 판매수입	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "	외상대 현금회수	", jak: "", io: "	현금입금	", gycd: "	108 외상매출금	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "	외상대 예금으로 회수	", jak: "", io: "	예금수취	", gycd: "	108 외상매출금	", cre: "	1000	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "외상매입", type: "	외상매입 시점	", jak: "", io: "	외상매입 	", gycd: "	401~499	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	외상대 현금지급	", jak: "", io: "	현금출금	", gycd: "	201 외상매입금	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	외상대 예금으로 지급	", jak: "", io: "	예금지급	", gycd: "	201 외상매입금	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "신용카드매출", type: "	카드매출 시점	", jak: "", io: "	카드매출	", gycd: "	301 판매수입	", cre: "	2000	", deb: "", tr: "" },
			{ kbn: "", type: "	카드외상대 예금으로 회수	", jak: "", io: "	예금수취	", gycd: "	112 카드미수금	", cre: "	2000	", deb: "", tr: "" },
			{ kbn: "", type: "	카드매출 수수료 예금지급	", jak: "", io: "	예금지급	", gycd: "	431 지급수수료	", cre: "", deb: "	50	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "신용카드매입", type: "	카드매입시점	", jak: "", io: "	카드매입	", gycd: "	401~499	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	카드외상대 예금으로 지급	", jak: "", io: "	예금지급	", gycd: "	202 카드차입금	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "주요거래분개", type: "	대여금 지출 발생(대여)시 	", jak: "", io: "	현금출금	", gycd: "	113 대여금	", cre: "", deb: "	3000	", tr: "" },
			{ kbn: "(현금가정)", type: "	대여금 수입 발생(회수)시	", jak: "", io: "	현금입금	", gycd: "	113 대여금	", cre: "	2000	", deb: "", tr: "" },
			{ kbn: "", type: "	대여금 이자 수취시	", jak: "", io: "	현금입금	", gycd: "	307 이자수입	", cre: "	200	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	차입금 수입 발생(차입)시	", jak: "", io: "	현금입금	", gycd: "	209 차입금	", cre: "	5000	", deb: "", tr: "" },
			{ kbn: "", type: "	차입금 원금 지출(상환)시	", jak: "", io: "	현금출금	", gycd: "	209 차입금	", cre: "", deb: "	2000	", tr: "" },
			{ kbn: "", type: "	차입금 이자 지급시	", jak: "", io: "	현금출금	", gycd: "	432 지급이자	", cre: "", deb: "	500	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	정기적금 예입시	", jak: "", io: "	현금출금 	", gycd: "	104 정기적금	", cre: "", deb: "	2000	", tr: "" },
			{ kbn: "", type: "	정기적금 만기 수취시	", jak: "", io: "	현금입금	", gycd: "	104 정기적금	", cre: "	2000	", deb: "", tr: "" },
			{ kbn: "", type: "	정기적금 이자 수취시	", jak: "", io: "	현금입금	", gycd: "	307 이자수입	", cre: "	200	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	임직원 가불시	", jak: "", io: "	현금출금	", gycd: "	125 가지급금	", cre: "", deb: "	1000	", tr: "" },
			{ kbn: "", type: "	임직원 가불 회수시	", jak: "", io: "	현금입금	", gycd: "	125 가지급금	", cre: "	800	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	선급금 지급시	", jak: "", io: "	현금출금	", gycd: "	115 선급금	", cre: "", deb: "	900	", tr: "" },
			{ kbn: "", type: "	선급대가로 종묘 취득시	", jak: "", io: "	현금입금	", gycd: "	115 선급금	", cre: "	900	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "	현금출금	", gycd: "	401 종묘비	", cre: "", deb: "	900	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	선수금 수취시	", jak: "", io: "	현금입금	", gycd: "	207 선수금	", cre: "	20000	", deb: "", tr: "" },
			{ kbn: "", type: "	선수금 대가로 농산물 제공시	", jak: "", io: "	이체지출	", gycd: "	207 선수금	", cre: "", deb: "	20000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "	이체수입	", gycd: "	301 매출액	", cre: "	20000	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	경비 미지급 발생시	", jak: "", io: "	이체수입	", gycd: "	203 미지급금	", cre: "	4000	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "	이체지출	", gycd: "	418 임차료	", cre: "", deb: "	4000	", tr: "" },
			{ kbn: "", type: "	미지급금 지급시	", jak: "", io: "	현금출금	", gycd: "	203 미지급금	", cre: "", deb: "	3000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	자산 미지급 발생시	", jak: "", io: "	이체수입	", gycd: "	203 미지급금	", cre: "	10000	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "	이체지출	", gycd: "	153 기계장치	", cre: "", deb: "	10000	", tr: "" },
			{ kbn: "", type: "	미지급금 지급시	", jak: "", io: "	현금출금	", gycd: "	203 미지급금	", cre: "", deb: "	6000	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	초과수취 이자환급시	", jak: "", io: "	현금출금	", gycd: "	307 이자수입	", cre: "", deb: "	100	", tr: "" },
			{ kbn: "", type: "	초과수취 임대료환급	", jak: "", io: "	현금출금	", gycd: "	305 임대료수입	", cre: "	 	", deb: "	200	", tr: "" },
			{ kbn: "", type: "	초과지급 대금 환입시	", jak: "", io: "	현금입금	", gycd: "	401 종묘비	", cre: "	300	", deb: "", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	현금 서비스 발생시	", jak: "", io: "	현금입금	", gycd: "	209 차입금	", cre: "	3000	", deb: "", tr: "" },
			{ kbn: "", type: "	현금 서비스 상환시	", jak: "", io: "	현금출금	", gycd: "	209 차입금	", cre: "", deb: "	3000	", tr: "" },
			{ kbn: "", type: "	서비스 이자 지급시	", jak: "", io: "	현금출금	", gycd: "	432 지급이자	", cre: "", deb: "	400	", tr: "" },
			{ kbn: "", type: "", jak: "", io: "", gycd: "", cre: "", deb: "", tr: "" },
			{ kbn: "", type: "	할부미지급금 발생시	", jak: "", io: "	이체수입	", gycd: "	209 차입금	", cre: "	15000	", deb: "", tr: "" },
			{ kbn: "", type: "	(할부로 전액구입시)	", jak: "", io: "	이체지출	", gycd: "	155 차량운반구	", cre: "", deb: "	15000	", tr: "" },
			{ kbn: "", type: "	할부금 지급시	", jak: "", io: "	현금출금	", gycd: "	209 차입금	", cre: "", deb: "	1000	", tr: "" }
	    ]
	}),
	
    //---------------------------------------------------------------------------
   	//	입력도우미1 스토어
   	//---------------------------------------------------------------------------
   	InputHelper1: Ext.create('Ext.data.Store', {
	    fields: [ 'col1', 'col2', 'col3' ],
	    data :[
	    	{	col1: "1단계", col2: "월, 일 입력", col3:"3월이면 3 입력 후 엔터, 입력 칸 이동: 엔터 또는 마우스" },
	    	{	col1: "2단계", col2: "출/입 택일", col3:"숫자 1 또는 2 입력, 도움 키: 세모단추 눌러 선택가능" },
	    	{	col1: "3단계", col2: "작목(생략)", col3:"엔터 또는 마우스로 통과" },
	    	{	col1: "4단계", col2: "계정과목입력", col3:"도움키(F2)로 선택 입력가능, F2 (키보드 최상단 좌측에 위치)" },
	    	{	col1: "", col2: "매출 수취입금이면", col3:"301부터 399 선택(수익 계정)" },
	    	{	col1: "", col2: "경비 지급출금이면", col3:"401부터 499 선택(비용 계정)" },
	    	{	col1: "", col2: "차입 수취입금이면", col3:"201부터 299 선택(채무 계정)" },
	    	{	col1: "", col2: "재산 지급출금이면", col3:"103부터 199 선택(재산 계정)" },
	    	{	col1: "5단계", col2: "금액 입력", col3:"콤마 없이 입력" },
	    	{	col1: "6단계", col2: "거래처(생략)", col3:"엔터 또는 마우스로 통과" },
	    	{	col1: "7단계", col2: "적요 입력", col3:"품명, 규격, 인명 등 비망사항 입력" },
	    	{	col1: "8단계", col2: "엔터", col3:"적요란에서 엔터 누르면, 다음 행 이동과 동시에 자동저장" },
	    	{	col1: "", col2: "", col3:"" },
	    	{	col1: "", col2: "[필수입력 항목]", col3:"월/일/입출/계정과목/금액, 나머지는 생략가능" },
	    	{	col1: "", col2: "[생략가능 항목]", col3:"작목, 거래처, 적요 이 3가지임" },
	    	{	col1: "", col2: "", col3:"작목을 생략하면, 작목별 손익의 산출이 불가능함" },
	    	{	col1: "", col2: "", col3:"거래처를 생략하면, 거래처별 매출액, 지급액 등의 산출이 불가능하나," },
	    	{	col1: "", col2: "", col3:"농장전체의 손익, 재산과 채무, 그리고 계정별 잔액 등은 산출가능함" }
	    ]
	}),
	
    //---------------------------------------------------------------------------
   	//	입력도우미2 스토어
   	//---------------------------------------------------------------------------
   	InputHelper2: Ext.create('Ext.data.Store', {
	    fields: [ 'col1', 'col2' ],
	    data :[
	    	{ col1:"□", col2:"Check박스, 삭제시 마우스로 V 표시 후 하단 삭제단추 클릭" },
	    	{ col1:"월", col2:"입출거래 발생 월 입력" },
	    	{ col1:"일", col2:"입출거래 발생 일자 입력" },
	    	{ col1:"구분", col2:"입출 여부 식별기호, 출 1, 입 2 입력 또는 보조화면에서 선택가능" },
	    	{ col1:"", col2:"출금이란, 현금 및 보통예금으로 지급한 것을 의미하고," },
	    	{ col1:"", col2:"입금이란, 현금 및 보통예금으로 수취한 것을 의미함." },
	    	{ col1:"", col2:"보통예금으로 지급, 수취하는 것을 흔히 이체지급, 이체수취라고 함" },
	    	{ col1:"작목", col2:"초보자는 생략, 입력방법은 작목코드 등록메뉴의 해설 참조" },
	    	{ col1:"계정과목", col2:"현금입출의 원인항목명칭(비료비 등)을 기록하는 곳, F2 눌러 보조화면에서 선택가능" },
	    	{ col1:"금액", col2:"콤마 없이 숫자로만 입력" },
	    	{ col1:"거래처", col2:"초보자는 생략, 입출 거래처 번호를 입력하는 곳" },
	    	{ col1:"", col2:"초보자는 생략 후, 차후에 수정하는 방삭으로 작목, 거래처 번호 입력 가능" },
	    	{ col1:"적요", col2:"거래비망사항을 입력하는 곳" }
	    ]
	}),
	
    //---------------------------------------------------------------------------
   	//	입력도우미3 스토어
   	//---------------------------------------------------------------------------
   	InputHelper3: Ext.create('Ext.data.Store', {
	    fields: [ 'col1', 'col2' ],
	    data :[
	    	{ col1:"입력 칸 이동", col2:"해당 칸에서 엔터 또는 마우스로 이동" },
	    	{ col1:"입력 칸에 포커스 주기", col2:"마우스 좌측단추 누름" },
	    	{ col1:"도움 화면 부르기", col2:"해당 칸에서 F2 키 누름, 도움화면에서 해당번호 라인을 더블클릭하면 선택" },
	    	{ col1:"", col2:"도움 키 : 입출구분, 작목, 계정, 거래처 등의 입력 칸에서 사용가능" },
	    	{ col1:"", col2:"F2 : 등록저장된 모든 코드(번호)가 표시됨" },
	    	{ col1:"", col2:"숫자 4 입력 후 F2 : 4로 시작되는 모든 번호가 표시됨" },
	    	{ col1:"", col2:"" },
	    	{ col1:"거래기록의 추가", col2:"입력화면의 빈 행에 월, 일 순서로 입력, 최종칸에서 엔터 치면 자동저장" },
	    	{ col1:"거래기록의 수정", col2:"해당 거래 입력 칸을 마우스 눌러 포커스 준 후 수정" },
	    	{ col1:"", col2:"수정 후 엔터 누르면 수정 된 값으로 자동저장" },
	    	{ col1:"", col2:"수정 대상 : 월일 등 모든 입력 항목" },
	    	{ col1:"거래기록의 삭제", col2:"월 입력칸 좌측의 네모단추를 클릭하여 체크(√) 표시 후" },
	    	{ col1:"", col2:"화면하단의 삭제단추 클릭, 여러 줄을 체크 후 삭제단추 누르면 일괄삭제됨" },
	    	{ col1:"거래기록의 저장", col2:"입력 후 저장단추를 누르지 않아도 자동으로 저장되는 구조임" },
	    	{ col1:"", col2:"추가입력시에는 적요란에서 엔터를 누르면 자동으로 저장되고," },
	    	{ col1:"", col2:"수정 후에는 해당 칸에서 엔터로 이동하면 자동으로 저장되는 구조임" },
	    	{ col1:"", col2:"화면에 표시된 내용이 저장된 내용임" },
	    	{ col1:"", col2:"" },
	    	{ col1:"입력 월의 이동", col2:"입력 칸 바로 위의 달력으로 이동" },
	    	{ col1:"월일의 무순서 입력", col2:"월일 순서에 상관없이 입력가능하며," },
	    	{ col1:"", col2:"분개장 종료 후 다시 열면 날짜순 정렬 표시 됨" },
	    	{ col1:"", col2:"같은 화면에서 월을 달리하여 입력하는 것도 가능하며," },
	    	{ col1:"", col2:"이 경우 역시 종료 후 다시 열면 월별로 정렬표시 됨" },
	    	{ col1:"", col2:"" },
	    	{ col1:"[계정번호 체계]", col2:"" },
	    	{ col1:"(대분류)", col2:"내 역" },
	    	{ col1:"재산 104~199", col2:"받을 돈, 회수할 수 있는 금액" },
	    	{ col1:"", col2:"대여금, 외상매출금, 저축성예금(보험), 토지, 건물, 거액기계, 자동차 등" },
	    	{ col1:"채무 201~299", col2:"줄 돈, 주어야 할 금액" },
	    	{ col1:"", col2:"외상매입금, 차입금, 출자금, 자본금 등" },
	    	{ col1:"수익 301~399", col2:"대가성 수취액(매출대가, 이자대가 등)" },
	    	{ col1:"", col2:"매출액, 수입이자, 기타 찬조금수입 등" },
	    	{ col1:"비용 401~499", col2:"대가성 지급액(물품대가, 서비스 용역대가, 이자대가 등)" },
	    	{ col1:"", col2:"종묘비, 비료비, 인건비, 전기료, 전화료, 지급이자 등" }
	    ]
	}),
	
    //---------------------------------------------------------------------------
   	//	입력도우미4 스토어
   	//---------------------------------------------------------------------------
   	InputHelper4: Ext.create('Ext.data.Store', {
	    fields: [ 'col1', 'col2', 'col3' ],
	    data :[
	    	{ col1:"회계표", col2:"대차손익 전계정의 증감잔액 총괄표시", col3:"1월1일부터 지정일자까지 표시" },
	    	{ col1:"", col2:"(조회단추 클릭하여 관찰)", col3:"(세부요령은 해당메뉴의 도우미? 단추클릭)" },
	    	{ col1:"", col2:"", col3:"" },
	    	{ col1:"결산서", col2:"대차표 : 대차 계정 잔액만 표시", col3:"1월1일부터 지정일자까지 표시" },
	    	{ col1:"", col2:"손익서 : 손익 계정 잔액만 표시", col3:"1월1일부터 지정일자까지 표시" },
	    	{ col1:"", col2:"", col3:"" },
	    	{ col1:"월별손익", col2:"손익 계정 잔액을 월별.작목별로 표시", col3:"기간 기준으로 표시" },
	    	{ col1:"", col2:"", col3:"다년간에 걸쳐서도 표시 가능" },
	    	{ col1:"", col2:"", col3:"" },
	    	{ col1:"과목원장", col2:"각 계정별 증감내역을 일자별로 표시", col3:"각 계정별 발생내역 확인용" },
	    	{ col1:"", col2:"", col3:"" },
	    	{ col1:"거래처원장", col2:"거래처별 잔액을 일자별로 표시", col3:"거래처별 채권.채무 잔액 확인용" },
	    	{ col1:"", col2:"(거래처원장과 과목원장은 부분과 전체의 관계)", col3:"" },
	    	{ col1:"", col2:"", col3:"" },
	    	{ col1:"현금출납장", col2:"현금의 증감만을 일자별로 표시", col3:"현금 잔액의 확인용" }
	    ]
	}),
	
    //---------------------------------------------------------------------------
   	//	입력도우미5 스토어
   	//---------------------------------------------------------------------------
   	InputHelper5: Ext.create('Ext.data.Store', {
	    fields: [ 'col1', 'col2', 'col3', 'col4' ],
	    data :[
	    	{ col1: "	(현금거래)	", col2: "", col3: "", col4: "	실제 현금 및 보통예금으로 수취지급하는 거래	" },
			{ col1: "	매출 수취	", col2: "	현금입금	", col3: "	301 ~ 399	", col4: "	판매수취액, 이자수취액, 기타 수취액	" },
			{ col1: "	경비 지급	", col2: "	현금출금	", col3: "	401 ~ 499	", col4: "	전기료, 전화료 등 손실성 지급액	" },
			{ col1: "	차입 수취	", col2: "	현금입금	", col3: "	203 ~ 299	", col4: "	채무 및 출자 수취액	" },
			{ col1: "	재산 지급	", col2: "	현금출금	", col3: "	104 ~ 199	", col4: "	대여 출금액 및 토지.기계 등 재산성항목 구입지출액	" },
			{ col1: "", col2: "", col3: "", col4: "" },
			{ col1: "	(예금거래)	", col2: "", col3: "", col4: "	보통예금으로 대금을 수취 또는 지급하는 거래	" },
			{ col1: "	매출 수취	", col2: "	예금수취	", col3: "	301~399 	", col4: "	판매수취액, 이자수취액, 기타 수취액	" },
			{ col1: "	경비 지급	", col2: "	예금지급	", col3: "	401~499 	", col4: "	전기료, 전화료 등 손실성 지급액	" },
			{ col1: "	차입 수취	", col2: "	예금수취	", col3: "	203~299 	", col4: "	채무 및 출자 수취액	" },
			{ col1: "	재산 구입	", col2: "	예금지급	", col3: "	104~199 	", col4: "	대여 출금액 및 토지.기계 등 재산성 항목 구입 지출액	" },
			{ col1: "	현금 예치	", col2: "	현금예치	", col3: "	103(자동입력)	", col4: "	현금예치를 선택하면 103 계정이 자동입력됨	" },
			{ col1: "	현금 인출	", col2: "	현금인출	", col3: "	103(자동입력)	", col4: "	현금인출을 선택하면 103 계정이 자동입력됨	" },
			{ col1: "", col2: "", col3: "", col4: "" },
			{ col1: "	(외상거래)	", col2: "", col3: "", col4: "" },
			{ col1: "	외상판매	", col2: "	외상매출	", col3: "	301(판매수입)	", col4: "	외상매출을 선택하면 301 계정이 자동입력됨 	" },
			{ col1: "	외상대금 회수	", col2: "	현금입금	", col3: "	108(외상매출금)	", col4: "	현금으로 회수시, 현금증가, 외상매출금 잔액 감소	" },
			{ col1: "	외상대금 회수	", col2: "	예금수취	", col3: "	108(외상매출금)	", col4: "	예금잔액 증가, 외상매출금 잔액 감소	" },
			{ col1: "", col2: "", col3: "", col4: "" },
			{ col1: "	외상매입	", col2: "	외상매입	", col3: "	401~499	", col4: "	비용의 외상매입이므로 401~499 계정입력	" },
			{ col1: "	외상대금 지급	", col2: "	현금출금	", col3: "	201(외상매입금)	", col4: "	현금지급이므로 현금잔액 감소, 외상매입금 잔액감소	" },
			{ col1: "", col2: "	예금지급	", col3: "	201(외상매입금)	", col4: "	예금잔액 감소, 외상매입금 잔액 감소	" },
			{ col1: "", col2: "", col3: "", col4: "" },
			{ col1: "	(카드거래)	", col2: "", col3: "", col4: "" },
			{ col1: "	카드판매	", col2: "	카드매출	", col3: "	301(판매수입)	", col4: "	외상매출을 선택하면 301 계정이 자동입력됨	" },
			{ col1: "	대금 회수	", col2: "	예금수취	", col3: "	112(카드미수금)	", col4: "	카드미수금 잔액감소, 예금 잔액 증가	" },
			{ col1: "", col2: "", col3: "", col4: "" },
			{ col1: "	카드매입	", col2: "	카드매입	", col3: "	401~499	", col4: "	비용을 카드로 매입한 것이므로 비용계정 입력	" },
			{ col1: "	대금 지급	", col2: "	예금지급	", col3: "	202(카드차입금)	", col4: "	카드차입금 잔액 감소, 예금 잔액 감소	" },
			{ col1: "", col2: "", col3: "", col4: "" },
			{ col1: "	(이체거래)	", col2: "", col3: "", col4: "	초보자는 사용해서는 안됩니다.	" },
			{ col1: "", col2: "	이체지출	", col3: "	101~499	", col4: "	복식부기의 차변	" },
			{ col1: "", col2: "	이체수입	", col3: "	101~499	", col4: "	복식부기의 대변	" }

	    ]
	}),
	
	
    //---------------------------------------------------------------------------
   	//	계정체계도 스토어
   	//---------------------------------------------------------------------------
   	GycodeSystem: Ext.create('Ext.data.Store', {
	    fields: [ 'col1', 'col2', 'col3', 'col4' ]
	}),
    
    //---------------------------------------------------------------------------
   	//	원장스토어
   	//---------------------------------------------------------------------------
   	
   	Oridata_Grid: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
	    	{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_rem' },
			{ name: 'jp_no' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit'
	        },
			{ name: 'jp_match_id'},
			{ 
				convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
				name: 'sum'
			}
	    ]
	}),
	
   	//---------------------------------------------------------------------------
   	//	일반분개장 Store
   	//---------------------------------------------------------------------------
	
    Menu01_Grid: Ext.create('Ext.data.Store',{
    	fields: [
			{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_date_m' },
			{ name: 'jp_date_d' },
			{ name: 'jp_no' },
			{ name: 'jp_view_gubun', defaultValue: 1 },
			{ name: 'match_customer_id' },
			{ name: 'jakmok_code' },
			{ name: 'gycode' },
			{ name: 'customer_id' },
			{ name: 'debit', type: 'int' },
            { name: 'credit', type: 'int' },
			{ name: 'jp_rem' },
			{
				convert: function(v, rec) {
					var kbn = StoreInfo.JP_KBN.findRecord('CODE', rec.data.jp_view_gubun);
					if(kbn) return kbn.data.TYPE;
					else return 2;
                },
				defaultValue: 2,
				name: 'jp_gubun_type'
			},
			{ name: 'jp_group'},
			{ name: 'jp_match_id'},
			{ name: 'valid'}	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
        ]
    }),
    
    Menu28_Grid: Ext.create('Ext.data.Store',{
    	fields: [
			{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_date_y' },
			{ name: 'jp_date_m' },
			{ name: 'jp_date_d' },
			{ name: 'jp_no' },
			{ name: 'jp_view_gubun', defaultValue: 1 },
			{ name: 'jakmok_code' },
			{ name: 'gycode' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit',
                type: 'int'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit',
                type: 'int'
	        },
			{ name: 'jp_rem' },
			{
				convert: function(v, rec) {
					var kbn = StoreInfo.JP_KBN.findRecord('CODE', rec.data.jp_view_gubun);
					if(kbn) return kbn.data.TYPE;
					else return 2;
                },
				defaultValue: 2,
				name: 'jp_gubun_type'
			},
			{ name: 'jp_group'},
			{ name: 'jp_match_id'},
			{ name: 'match_customer_id' },
			{ name: 'valid'}	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
        ]
    }),
    
    
   	//---------------------------------------------------------------------------
   	//	복식부기 Store
   	//---------------------------------------------------------------------------
	
    Menu01_Grid2: Ext.create('Ext.data.Store',{
    	fields: [
			{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_date_m' },
			{ name: 'jp_date_d' },
			{ name: 'jp_no' },
			{ name: 'jp_view_gubun', defaultValue: 1 },
			{ name: 'jakmok_code' },
			{ name: 'gycode' },
			{ name: 'customer_id' },
			{ name: 'debit', type: 'int' },
            { name: 'credit', type: 'int' },
			{ name: 'jp_rem' },
			{
				convert: function(v, rec) {
					var kbn = StoreInfo.JP_KBN.findRecord('CODE', rec.data.jp_view_gubun);
					if(kbn) return kbn.data.TYPE;
					else return 2;
                },
				defaultValue: 2,
				name: 'jp_gubun_type'
			},
			{ name: 'jp_group'},
			{ name: 'jp_match_id'},
			{ name: 'valid'}	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
        ]
    }),
    
    
    //-------------test-------------------------
    Menu01_Grid1: Ext.create('Ext.data.Store', {
        fields: [
			{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_date_m' },
			{ name: 'jp_date_d' },
			{ name: 'jp_no' },
			{ name: 'jp_view_gubun', defaultValue: 1 },
			{ name: 'jakmok_code' },
			{ name: 'gycode' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit'
	        },
			{ name: 'jp_rem' },
			{
				convert: function(v, rec) {
					var kbn = StoreInfo.JP_KBN.findRecord('CODE', rec.data.jp_view_gubun);
					if(kbn) return kbn.data.TYPE;
					else return 2;
                },
				defaultValue: 2,
				name: 'jp_gubun_type'
			},
			{ name: 'jp_group'},
			{ name: 'jp_match_id'},
			{ name: 'valid'}	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
        ],
        pageSize: 20,
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: './proc/account/junpyo/junpyo_paginglist_proc.php',
            reader: {
            	type: 'json',
                root: 'DATA',
                totalProperty: 'TOTAL'
            }
            //simpleSortMode: true
        },
        autoLoad: false,
        listeners: {
            beforeload: {
                fn: function(store, operation, eOpts)
                {
                }
            },
            load: {
                fn: function(store, records, successful, eOpts) {
                }
            }
        }
        /*
        sorters: [{
            property: 'lastpost',
            direction: 'DESC'
        }]
        */
    }),
    
    //---------------------------------------------------------------------------
    //  차대전표 Store
    //---------------------------------------------------------------------------
    
    Menu01_Grid3: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'jp_view_gubun', defaultValue: 1 },
            { name: 'jakmok_code' },
            { name: 'gycode' ,type: 'string', defaultValue: '000'},
            { name: 'customer_id' },
            { name: 'debit', type: 'int' },
            { name: 'credit', type: 'int' },
            { name: 'jp_rem' }
        ]
    }),
    
    //---------------------------------------------------------------------------
   	//	회계표 Store
   	//---------------------------------------------------------------------------
    
    Menu02_Grid: Ext.create('Ext.data.TreeStore', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {name: 'type', type: 'int'},
            {
            	convert: function(v, rec) {
					var gyRec = StoreInfo.Menu08_Grid.findRecord('gycode', rec.data.gycode);
					if(gyRec) return rec.data.gycode+" "+gyRec.get('gy_name');
					else return rec.data.gycode;  
                },
				name: 'gy_fullname'
			},
            {name: 'gicho_am', type: 'string'},
            {name: 'debit', type: 'string'},
            {name: 'credit', type: 'string'},
            {name: 'balance_am', type: 'string'}
        ],
        autoload: false,
        //folderSort: true
	}),
    
    //---------------------------------------------------------------------------
   	//	일,월계표 Store
   	//---------------------------------------------------------------------------
    
    Menu29_Grid: Ext.create('Ext.data.TreeStore', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {name: 'type', type: 'int'},
            {
            	convert: function(v, rec) {
					var gyRec = StoreInfo.Menu08_Grid.findRecord('gycode', rec.data.gycode);
					if(gyRec) return rec.data.gycode+" "+gyRec.get('gy_name');
					else return rec.data.gycode;  
                },
				name: 'gy_fullname'
			},
            {name: 'balance_am', type: 'string'},
            {name: 'r_credit', type: 'string'},
            {name: 'r_debit', type: 'string'},
            {name: 'balance', type: 'string'}
        ],
        autoload: false,
        //folderSort: true
	}),
	
	Menu29_Grid_day: Ext.create('Ext.data.TreeStore', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {name: 'type', type: 'int'},
            {
            	convert: function(v, rec) {
					var gyRec = StoreInfo.Menu08_Grid.findRecord('gycode', rec.data.gycode);
					if(gyRec) return rec.data.gycode+" "+gyRec.get('gy_name');
					else return rec.data.gycode;  
                },
				name: 'gy_fullname'
			},
            {name: 'balance_am', type: 'string'},
            {name: 'r_credit', type: 'string'},
            {name: 'r_debit', type: 'string'},
            {name: 'balance', type: 'string'}
        ],
        autoload: false,
        //folderSort: true
	}),
	
	Menu29_Grid_month: Ext.create('Ext.data.TreeStore', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {name: 'type', type: 'int'},
            {
            	convert: function(v, rec) {
					var gyRec = StoreInfo.Menu08_Grid.findRecord('gycode', rec.data.gycode);
					if(gyRec) return rec.data.gycode+" "+gyRec.get('gy_name');
					else return rec.data.gycode;  
                },
				name: 'gy_fullname'
			},
            {name: 'balance_am', type: 'string'},
            {name: 'r_credit', type: 'string'},
            {name: 'r_debit', type: 'string'},
            {name: 'balance', type: 'string'}
        ],
        autoload: false,
        //folderSort: true
	}),
	
    //---------------------------------------------------------------------------
   	//	월별손익 Store 스토어를 동적으로 생성함
   	//---------------------------------------------------------------------------
    
    Menu03_Grid: null,
    
    //---------------------------------------------------------------------------
   	//	월별손익 작목코드 Store
   	//---------------------------------------------------------------------------
    Menu03_Jak: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'jakmok_code', type: 'string'},
            {name: 'jakmok_name', type: 'string'},
            {name: 'use_yn', type: 'boolean'},
            {
                convert: function(v, rec) {
					return rec.data.jakmok_code+" "+rec.data.jakmok_name;
                },
                name: 'jakmok_fullname'
            }
        ]
	}),
	
	//---------------------------------------------------------------------------
   	//	현금원장 Store
   	//---------------------------------------------------------------------------
	Menu04_Grid: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
	    	{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd'},
			{ name: 'jp_rem' },
			{ name: 'jp_no' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit', type: 'int'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit', type: 'int'
	        },
			{ name: 'jp_match_id'},
			{ name: 'sum', type: 'int'}
	    ]
	}),
	
	//---------------------------------------------------------------------------
   	//	과목원장 Header Store
   	//---------------------------------------------------------------------------
	Menu05_Grid1: Ext.create('Ext.data.Store', {
	    fields: [
			{ name: 'gycode' }
	    ]
	}),
	
	//---------------------------------------------------------------------------
   	//	과목원장 detail Store
   	//---------------------------------------------------------------------------
	Menu05_Grid2: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
	    	{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_rem' },
			{ name: 'jp_no' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit'
	        },
			{ name: 'jp_match_id'},
			{ name: 'sum'}
	    ]
	}),
	
	//---------------------------------------------------------------------------
   	//	거래처원장 -> header customerId Store
   	//---------------------------------------------------------------------------
	Menu06_Grid1: Ext.create('Ext.data.Store', {
	    fields: [
			{ name: 'customer_id' }
	    ]
	}),
	//---------------------------------------------------------------------------
   	//	거래처원장 -> 거래원장 Store
   	//---------------------------------------------------------------------------
	Menu06_Grid2: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
	    	{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_rem' },
			{ name: 'jp_no' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit'
	        },
			{ name: 'jp_match_id'},
			{ name: 'sum'}
	    ]
	}),
	Menu06_Grid2_Pop: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
	    	{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_rem' },
			{ name: 'jp_no' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'credit'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'debit'
	        },
			{ name: 'jp_match_id'},
			{ name: 'sum'}
	    ]
	}),
	
	//---------------------------------------------------------------------------
   	//	거래처원장 -> 잔액명세 Store
   	//---------------------------------------------------------------------------
	Menu06_Grid3: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
			{ name: 'customer_id' },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'gicho'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'value_credit'
	        },
			{
                convert: function(v, rec) {
                	if(v == 0) return '';
                	else return v; 
                },
                name: 'value_debit'
	        },
			{ name: 'rest'}
	    ]
	}),
	
	//---------------------------------------------------------------------------
   	//	결산서 -> 대차대조표 Store
   	//---------------------------------------------------------------------------
	Menu07_Grid1: Ext.create('Ext.data.Store', {
	    fields: [
			{ name: 'type' },
			{ name: 'gycode_debit' },
			{ name: 'tr_am_debit' },
			{ name: 'gycode_credit' },
			{ name: 'tr_am_credit' }
	    ]
	}),
	
	//---------------------------------------------------------------------------
   	//	결산서 -> 손익계산서 Store
   	//---------------------------------------------------------------------------
	Menu07_Grid2: Ext.create('Ext.data.Store', {
	    fields: [
	    	{ name: 'type' },
			{ name: 'gycode' },
			{ name: 'tr_am' },
			{ name: 'sum' }
	    ]
	}),
    
    //계정코드 스토어
    Menu08_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {
	            convert: function(v, rec) {
	            	return rec.data.gycode+' '+rec.data.gy_name;
                },
                name: 'gy_code_name', 
            },
            {name: 'gy_name', type: 'string'},
            {name: 'gy_rem', type: 'string'},
            {name: 'gy_group', type: 'string'},
            {name: 'gy_am', type: 'string', defaultValue: '0' },
            {name: 'modify_yn', type: 'boolean'},
            {name: 'use_yn', type: 'boolean'}
        ],
        groupField: 'gy_group',
        remoteGroup: false,
        autoLoad: false
	}),
	
	//계정코드 검색용
    Menu08_Grid_SEAR: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {
	            convert: function(v, rec) {
	            	return rec.data.gycode+' '+rec.data.gy_name;
                },
                name: 'gy_code_name', 
            },
            {name: 'gy_name', type: 'string'},
            {name: 'gy_rem', type: 'string'},
            {name: 'gy_group', type: 'string'},
            {name: 'gy_am', type: 'string', defaultValue: '0' },
            {name: 'modify_yn', type: 'boolean'},
            {name: 'use_yn', type: 'boolean'}
        ],
        autoLoad: false
	}),
	
	/*
	//계정코드 검색용
    Menu08_Grid_SEAR: Ext.create('Ext.data.Store', {
    	fields: [
            { name: 'gycode', type: 'string' },
            { name: 'gy_code_name', type: 'string' }
        ],
        autoLoad: false
	}),
    */
	//거래처코드 스토어	
    Menu09_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'customer_id', type: 'string'},
			{name: 'tr_nm', type: 'string'},
			{name: 'tr_daepyo', type: 'string'},
			{name: 'tr_zip', type: 'string'},
			{name: 'tr_addr', type: 'string'},
			{name: 'tr_tel', type: 'string'},
			{name: 'tr_phone', type: 'string'},
			{name: 'tr_fax', type: 'string'},
			{name: 'tr_saup_no', type: 'string'},
			{name: 'tr_jumin_no', type: 'string'},
			{name: 'tr_up', type: 'string'},
			{name: 'tr_jong', type: 'string'},
			{name: 'tr_manager', type: 'string'},
			{name: 'tr_email', type: 'string'},
			{name: 'tr_homepage', type: 'string'},
			{name: 'tr_sdate', type: 'string'},
			{name: 'tr_edate', type: 'string'},
			{name: 'tr_chuchun', type: 'string'},
			{name: 'tr_bigo', type: 'string'}
        ]
	}),
	
	//거래처코드 엑셀 등록 스토어	
    Menu09_Grid_Excel: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'customer_id', type: 'string'},
			{name: 'tr_nm', type: 'string'},
			{name: 'tr_daepyo', type: 'string'},
			{name: 'tr_zip', type: 'string'},
			{name: 'tr_addr', type: 'string'},
			{name: 'tr_tel', type: 'string'},
			{name: 'tr_phone', type: 'string'},
			{name: 'tr_fax', type: 'string'},
			{name: 'tr_saup_no', type: 'string'},
			{name: 'tr_jumin_no', type: 'string'},
			{name: 'tr_up', type: 'string'},
			{name: 'tr_jong', type: 'string'},
			{name: 'tr_manager', type: 'string'},
			{name: 'tr_email', type: 'string'},
			{name: 'tr_homepage', type: 'string'},
			{name: 'tr_sdate', type: 'string'},
			{name: 'tr_edate', type: 'string'},
			{name: 'tr_chuchun', type: 'string'},
			{name: 'tr_bigo', type: 'string'}
        ]
	}),
	
	//거래처코드 페이징 스토어
	Menu09_Grid_SEARCH: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'customer_id', type: 'string'},
			{name: 'tr_nm', type: 'string'},
			{name: 'tr_daepyo', type: 'string'},
			{name: 'tr_zip', type: 'string'},
			{name: 'tr_addr', type: 'string'},
			{name: 'tr_tel', type: 'string'},
			{name: 'tr_phone', type: 'string'},
			{name: 'tr_fax', type: 'string'},
			{name: 'tr_saup_no', type: 'string'},
			{name: 'tr_jumin_no', type: 'string'},
			{name: 'tr_up', type: 'string'},
			{name: 'tr_jong', type: 'string'},
			{name: 'tr_manager', type: 'string'},
			{name: 'tr_email', type: 'string'},
			{name: 'tr_homepage', type: 'string'},
			{name: 'tr_sdate', type: 'string'},
			{name: 'tr_edate', type: 'string'},
			{name: 'tr_chuchun', type: 'string'},
			{name: 'tr_bigo', type: 'string'}
        ]
	}),
	//회계작목코드 스토어
    Menu10_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'jakmok_code', type: 'string'},
            {name: 'jakmok_name', type: 'string'},
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//기초금액 스토어
    Menu11_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'gycode', type: 'string'},
            {name: 'gy_name', type: 'string'},
            {name: 'gy_am', type: 'string', defaultValue: '0' }
        ],
        autoLoad: false
	}),
	
	//거래처별 잔액 스토어
    Menu11_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'customer_id', type: 'string'},
            {name: 'tr_am', type: 'int'}
        ]
	}),
	
	//영농일지 스토어
    Menu12_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'id', type: 'string'},
            {name: 'work_date', type: 'string'},
            {name: 'jakmok_cd', type: 'string'},
            {name: 'work_cd', type: 'string'},
            {name: 'weather_cd', type: 'string'},
            {name: 'work_area', type: 'string'},
            {name: 'work_man', type: 'string'},
            {name: 'work_time', type: 'string'},
            {name: 'work_job', type: 'string'},
            {name: 'work_pic', type: 'string'}
        ]
	}),
	
	//영농작목코드 스토어
    Menu13_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'jakmok_code', type: 'string'},
            {name: 'jakmok_name', type: 'string'},
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//영농작목코드 검색스토어
	Menu13_Grid_SEAR: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'jakmok_code', type: 'string'},
            {name: 'jakmok_name', type: 'string'},
            {
                convert: function(v, rec) {
					return rec.data.jakmok_code+" "+rec.data.jakmok_name;
                },
                name: 'jakmok_fullname'
            }
        ]
	}),
	
	//영농작업코드 스토어
    Menu14_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'work_cd', type: 'string'},
            {name: 'work_nm', type: 'string'},
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//입고등록 해더
    Menu15_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
    		{
    			name: 'io_dt',
                convert: function(v, rec) {
					return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                }
           	},
           {name: 'io_no', type: 'string'},
           {name: 'io_tax_gubun', type: 'string'},
           {name: 'io_tr_cd',
           		convert: function(v, rec) {
           			if(v == '00000') return '';
           			else return v;
                }
           },
           {name: 'io_tamt', type: 'string'},
           {name: 'io_tax', type: 'string'},
           {name: 'io_tax_no', type: 'string'},
           {name: 'io_cash', type: 'string'},
           {name: 'io_pay_customer_id',
           		convert: function(v, rec) {
           			if(v == '00000') return '';
           			else return v;
                }
           },
           {name: 'io_bigo', type: 'string'},
           {name: 'jp_no', type: 'string'}
        ]
	}),
	
	//입고등록 상세
    Menu15_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'io_seq', type: 'string'},
            {name: 'io_item_cd', type: 'string'},
            {
            	name: 'io_item_nm',
                convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_nm');
					else return '';  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
            {name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt', type:'int' },
            {name: 'io_rem' }
        ]
	}),
	
	//일자별  입고현황
	Menu16_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt' },
            {name: 'io_rem' }
        ]
	}),
	
	//거래처별  입고현황
	Menu16_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt' },
            {name: 'io_rem' }
        ]
	}),
	
	//상품별  입고현황
	Menu16_Grid3: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt' },
            {name: 'io_rem' }
        ]
	}),
	
	//주문등록 스토어
    Menu17_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
					return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                },
                name: 'jumun_dt'
           	},
			{name: 'jumun_no'},
			{name: 'jumun_tr_cd'},
			{name: 'jumun_tamt'},
			{name: 'jumun_bigo'},
			{name: 'jumun_man'},
			{name: 'jumun_zip'},
			{name: 'jumun_addr'}
        ]
	}),
	
	//주문등록 상세
    Menu17_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'jumun_seq', type: 'string'},
            {name: 'io_cd', type: 'string'},
            {name: 'jumun_item_cd', type: 'string'},
            {name: 'jumun_seq', type: 'string'},
            {
            	name: 'jumun_item_nm',
                convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_nm');
					else return '';  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
            {name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt', type:'int' },
            {name: 'jumun_rem' }
        ]
	}),
	
	
	//일자별 주문현황 스토어
    Menu18_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'jumun_dt'
           	},
			{name: 'type'},
			{name: 'jumun_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'jumun_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt' },
            {name: 'jumun_rem' }
        ]
	}),
	
	//거래처별 주문현황 스토어
    Menu18_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'jumun_dt'
           	},
			{name: 'type'},
			{name: 'jumun_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'jumun_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt' },
            {name: 'jumun_rem' }
        ]
	}),
	
	//상품별 주문현황 스토어
    Menu18_Grid3: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'jumun_dt'
           	},
			{name: 'type'},
			{name: 'jumun_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'jumun_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt' },
            {name: 'jumun_rem' }
        ]
	}),
	
	//주문대비  출고현황
	Menu18_Grid4: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'jumun_dt'
           	},
			{name: 'type'},
			{name: 'jumun_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'jumun_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt' },
            {name: 'jumun_rem' },
            {
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
           	{name: 'parcel_com' },
           	{name: 'parcel_no' }
        ]
	}),
	
	
	//주문대비  미출고현황
	Menu18_Grid5: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'jumun_dt'
           	},
			{name: 'type'},
			{name: 'jumun_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'jumun_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt' },
            {name: 'jumun_rem' }
        ]
	}),
	
	
	//주문서 리스트
    OrderList: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'jumun_seq', type: 'string'},
            {name: 'jumun_dt', type: 'string'},
            {name: 'jumun_no', type: 'string'},
            {name: 'jumun_tr_cd', type: 'string'},
            {name: 'io_cd', type: 'string'},
            {name: 'jumun_item_cd', type: 'string'},
            {name: 'jumun_seq', type: 'string'},
            {
            	name: 'jumun_item_nm',
                convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_nm');
					else return '';  
                }
			},
            {
            	name: 'jumun_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'jumun_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.jumun_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
            {name: 'jumun_su' },
            {name: 'jumun_dan' },
            {name: 'jumun_amt', type:'int' },
            {name: 'jumun_rem' }
        ]
	}),
	
	
	//출고등록 해더
    Menu19_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
    		{
    			name: 'io_dt',
                convert: function(v, rec) {
					return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                }
           	},
           {name: 'io_no', type: 'string'},
           {name: 'jp_no', type: 'string'},
           {name: 'io_tax_gubun', type: 'string'},
           {name: 'io_tr_cd',
           		convert: function(v, rec) {
           			if(v == '00000') return '';
           			else return v;
                }
           },
           {name: 'io_tamt', type: 'string'},
           {name: 'io_tax', type: 'string'},
           {name: 'io_tax_no', type: 'string'},
           {name: 'io_cash', type: 'string'},
           {name: 'io_pay_customer_id',
           		convert: function(v, rec) {
           			if(v == '00000') return '';
           			else return v;
                }
           },
           {name: 'io_bigo', type: 'string'},
           {name: 'parcel_com', type: 'string'},
           {name: 'parcel_no', type: 'string'}
        ]
	}),
	
	//출고등록 상세
    Menu19_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'io_seq', type: 'string'},
            {name: 'io_item_cd', type: 'string'},
            {
            	name: 'io_item_nm',
                convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_nm');
					else return '';  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
            {name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt', type:'int' },
            {name: 'io_rem' },
            {name: 'jumun_seq', type: 'string'},
            {name: 'jumun_dt', type: 'string'},
            {name: 'jumun_no', type: 'string'}
        ]
	}),
	
	
	//일자별  출고현황
	Menu20_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt' },
            {name: 'io_rem' }
        ]
	}),
	
	//거래처별  출고현황
	Menu20_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt' },
            {name: 'io_rem' }
        ]
	}),
	
	//상품별  출고현황
	Menu20_Grid3: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_tr_cd',
				convert: function(v, rec) {
        			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', v);
					if(trRec) return trRec.get('tr_nm');
					else return v;	
                }
			},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt' },
            {name: 'io_rem' }
        ]
	}),
	
	//일별 출고집계
	Menu20_Grid4: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 8)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6)+'-'+v.substring(6, 8);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_amt' }
        ]
	}),
	
	//월별 출고집계
	Menu20_Grid5: Ext.create('Ext.data.Store', {
    	fields: [
    		{
                convert: function(v, rec) {
                	if(v.length == 6)
                	{
                		if(v) return v.substring(0, 4)+'-'+v.substring(4, 6);
                		else return '';	
                	}
                	else return v;
                	
                },
                name: 'io_dt'
           	},
			{name: 'type'},
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: 'io_su' },
            {name: 'io_amt' }
        ]
	}),
	
	//상품별 출고집계
	Menu20_Grid6: Ext.create('Ext.data.Store', {
    	fields: [
			{name: 'type'},
			{name: 'su_sum', type: 'int' },
			{name: 'amt_sum', type: 'int' },
			{name: 'io_item_cd',
				convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', v);
					if(gyRec) return gyRec.get('item_nm');
					else return v;  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
			{name: '01', type: 'int' },
			{name: '02', type: 'int' },
			{name: '03', type: 'int' },
			{name: '04', type: 'int' },
			{name: '05', type: 'int' },
			{name: '06', type: 'int' },
			{name: '07', type: 'int' },
			{name: '08', type: 'int' },
			{name: '09', type: 'int' },
			{name: '10', type: 'int' },
			{name: '11', type: 'int' },
			{name: '12', type: 'int' }
        ]
	}),
	
	//재고현황 스토어
    Menu21_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'io_item_cd' },
            {
            	name: 'io_item_nm',
                convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_nm');
					else return '';  
                }
			},
            {
            	name: 'io_item_qty',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_qty');
					else return '';
                }
			},
            {
            	name: 'io_item_danwi',
                convert: function(v, rec) {
					var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_danwi');
					else return '';
                }
			},
            {name: 'gicho' },
            {name: 'input' },
            {name: 'output'},
            {name: 'sum' }
        ]
	}),
	
    Menu22_Grid2: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'io_dt' },
            {name: 'io_tr_cd' },
            {name: 'io_tr_nm',
            	convert: function(v, rec) {
            		if(rec.data.io_dt == -1) return '전월이월';
            		else if(rec.data.io_dt == -2) return '월계';
            		else if(rec.data.io_dt == -3) return '누계';
            		else
            		{
            			var trRec = StoreInfo.Menu09_Grid.findRecord('customer_id', rec.data.io_tr_cd);
						if(trRec) return trRec.get('tr_nm');
						else return v;	
            		}
                }
            },
            {name: 'in_su' },
            {name: 'in_dan' },
            {name: 'in_amt' },
            {name: 'out_su' },
            {name: 'out_dan' },
            {name: 'out_amt' },
            {name: 'rest' },
            {name: 'io_rem' }
        ]
	}),
	
	//상품수불부 스토어
    Menu22_Grid1: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'io_item_cd' },
            {
            	name: 'io_item_nm',
                convert: function(v, rec) {
                	var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
					if(gyRec) return gyRec.get('item_nm');
					else return '';  
                }
			}
        ]
	}),
	
	//상품분류코드 스토어
    Menu23_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'itemgrp_cd', type: 'string'},
            {name: 'itemgrp_nm', type: 'string'},
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//상품분류코드 스토어
    Menu23_Grid_SEAR: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'itemgrp_cd', type: 'string'},
            {name: 'itemgrp_nm', type: 'string'},
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//상품코드 스토어
    Menu24_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'item_cd', type: 'string'},
            {name: 'item_nm', type: 'string'},
            {name: 'item_qty', type: 'string'},
            {name: 'item_danwi', type: 'string'},
            {name: 'item_in_danga', type: 'string'},
            {name: 'item_out_danga', type: 'string'},
            {name: 'itemgrp_cd', type: 'string'},
            {name: 'io_su', type: 'int' },
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//상품코드 스토어
    Menu24_Grid_SEAR: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'item_cd', type: 'string'},
            {name: 'item_nm', type: 'string'},
            {name: 'item_qty', type: 'string'},
            {name: 'item_danwi', type: 'string'},
            {name: 'item_in_danga', type: 'string'},
            {name: 'item_out_danga', type: 'string'},
            {name: 'itemgrp_cd', type: 'string'},
            {name: 'io_su', type: 'int' },
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//상품코드 스토어
    Menu24_Grid_Excel: Ext.create('Ext.data.Store', {
    	fields: [
            {name: 'item_cd', type: 'string'},
            {name: 'item_nm', type: 'string'},
            {name: 'item_qty', type: 'string'},
            {name: 'item_danwi', type: 'string'},
            {name: 'item_in_danga', type: 'string'},
            {name: 'item_out_danga', type: 'string'},
            {name: 'itemgrp_cd', type: 'string'},
            {name: 'io_su', type: 'int' },
            {name: 'use_yn', type: 'boolean'}
        ]
	}),
	
	//일정관리
    Menu26_Grid: Ext.create('Ext.data.Store', {
    	fields: [
            { name: '_id' },
            { name: 'input_type' },
            { name: 'yyyymmdd' },
            { name: 'memorial'},
            { name: 'user_nick', type:'string'}
        ]
	}),
	
	//---------------------------------------------------------------------------
    // 마감년도
    //---------------------------------------------------------------------------
    CloseYear: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'close_year' },
            { name: 'status' }
        ]
    }),
    
    //---------------------------------------------------------------------------
    // 부가세
    //---------------------------------------------------------------------------
    Menu30_Grid1: Ext.create('Ext.data.Store',{ //db_table(add_tax)
        fields: [
            { name: 'atax_id', type: 'string' }, //부가세 전표 아이디
            //{ name: 'co_id', type: 'string' }, //회사 코드
            { name: 'atax_yyyymmdd', type: 'string' }, //날짜
            { name: 'atax_date_m', type: 'int' }, //월
            { name: 'atax_date_d', type: 'int' }, //일
            { name: 'atax_no', type: 'string' }, //일 기준으로 부가세 번호 생성
            { name: 'atax_type', type: 'string', defaultValue: 11 }, //부가세 타입
            { name: 'atax_item_nm', type: 'string', defaultValue: '' }, //아이템 이름 (적요)
            { name: 'atax_item_cnt', type: 'int', defaultValue: 0 }, //수량
            { name: 'atax_item_danga', type: 'int', defaultValue: 0 }, //단가
            { name: 'atax_supply_price', type: 'int', defaultValue: 0 }, //공급가액
            { name: 'atax_tax', type: 'int', defaultValue: 0 }, //부가세
            { name: 'atax_type_ratio', type: 'int', defaultValue: 0 }, //부가세 비율
            { name: 'atax_item_sum', type: 'int', defaultValue: 0 }, //총액
            { name: 'atax_customer_id', type: 'string', defaultValue: '' }, //거래처 코드
            { name: 'atax_customer_nm', type: 'string' }, //거래처명
            { name: 'atax_elect_flag', type: 'string', defaultValue: 'n' }, //전자세금계산서 발행여부 (Y, N)
            { name: 'atax_jp_flag', type: 'string', defaultValue: '0' }, //전표 유형 (0: 없음, 1: 현금, 2: 외상, 3: 카드,  4: 예금, 5: 기타)
            { name: 'atax_jp_no', type: 'string', defaultValue: '0' }, //전표 번호
            {
	            convert: function(v, rec) {
	            	//console.log('rec.data.isModify --> '+rec.data.isModify);
	            	if(!v && rec.data.isModify) return '전표수정됨';
	            	if(rec.data.atax_jp_no != 0) return rec.data.atax_yyyymmdd+'-'+rec.data.atax_jp_no;
	            	else return '';
                },
                name: 'atax_jp_no_view', 
            },//전표 번호 보이는것
            { name: 'valid'},	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
            //{ name: 'atax_bank_card_id', type: 'string' } //예금 코드
            { name: 'isModify'},	//수정 여부 표현
        	{ name: 'jp_valid'},	//전표 맞는지 여부
        ]
    }),
    
    Menu30_Grid2: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'jp_view_gubun', defaultValue: 3 },
            { name: 'jakmok_code' },
            { name: 'gycode' ,type: 'string', defaultValue: '000'},
            { name: 'customer_id' },
            { name: 'debit', type: 'int' },
            { name: 'credit', type: 'int' },
            { name: 'jp_rem' },
            { name: 'jp_group'},
			{ name: 'jp_match_id'},
			
			//추가
			{ name: 'valid'},	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
			{ name: 'jp_id' },
			{ name: 'match_customer_id' },
			{ name: 'gycode_sub' },
			{
				convert: function(v, rec) {
					var kbn = StoreInfo.JP_KBN_ATAX.findRecord('CODE', rec.data.jp_view_gubun);
					if(kbn) return kbn.data.TYPE;
					else return 2;
                },
				defaultValue: 2,
				name: 'jp_gubun_type'
			},
			{ name: 'jp_match_id'},
        ]
    }),
    /*
    Menu01_Grid: Ext.create('Ext.data.Store',{
    	fields: [
			{ name: 'jp_id' },
			{ name: 'jp_yyyymmdd' },
			{ name: 'jp_date_m' },
			{ name: 'jp_date_d' },
			{ name: 'jp_no' },
			{ name: 'jp_view_gubun', defaultValue: 1 },
			{ name: 'match_customer_id' },
			{ name: 'jakmok_code' },
			{ name: 'gycode' },
			{ name: 'gycode_sub' },
			{ name: 'customer_id' },
			{ name: 'debit', type: 'int' },
            { name: 'credit', type: 'int' },
			{ name: 'jp_rem' },
			{
				convert: function(v, rec) {
					var kbn = StoreInfo.JP_KBN.findRecord('CODE', rec.data.jp_view_gubun);
					if(kbn) return kbn.data.TYPE;
					else return 2;
                },
				defaultValue: 2,
				name: 'jp_gubun_type'
			},
			{ name: 'jp_group'},
			{ name: 'jp_match_id'},
			{ name: 'valid'}	//분개장 작성시 각 row 마다의 validation 체크 통과여부(0:실패, 1: 통과)
        ]
    }),
    */
  //---------------------------------------------------------------------------
    // 부가세 거래유형 코드
    //---------------------------------------------------------------------------
    //계정코드 스토어
    ADD_TAX_TYPE: Ext.create('Ext.data.Store', {
    	sorters: [
    		{
		        property: 'atax_type',
		        direction: 'ASC'
	    	}
	    ],
    	fields: [
            {name: 'atax_type', type: 'string'},
            {name: 'atax_type_nm', type: 'string'},
            {name: 'atax_type_ratio', type: 'string'},
            {name: 'atax_type_show', type: 'string'},
            {
	            convert: function(v, rec) {
	            	return rec.data.atax_type+' '+rec.data.atax_type_nm;
                },
                name: 'atax_type_name', 
            },
        ],
        autoLoad: false
	}),
	
	 //계정코드 스토어- 조회
    ADD_TAX_TYPE_SEAR: Ext.create('Ext.data.Store', {
    	sorters: [
    		{
		        property: 'atax_type',
		        direction: 'ASC'
	    	}
	    ],
    	fields: [
            {name: 'atax_type', type: 'string'},
            {name: 'atax_type_nm', type: 'string'},
            {name: 'atax_type_ratio', type: 'string'},
            {name: 'atax_type_show', type: 'string'},
            {
	            convert: function(v, rec) {
	            	return rec.data.atax_type+' '+rec.data.atax_type_nm;
                },
                name: 'atax_type_name', 
            },
        ],
        autoLoad: false
	}),
    //---------------------------------------------------------------------------
    // 전표 유형
    //---------------------------------------------------------------------------
    ADD_JP_TYPE: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_jp_flag' }, //전표 유형 코드
            { name: 'atax_jp_nm' } //전표 유형 명칭
        ],
        data: [
					{atax_jp_flag: '0', atax_jp_nm: '0 없음', atax_jp_key: '없음'},
					{atax_jp_flag: '1', atax_jp_nm: '1 현금', atax_jp_key: '현금'},
					{atax_jp_flag: '2', atax_jp_nm: '2 외상', atax_jp_key: '외상'},
					{atax_jp_flag: '3', atax_jp_nm: '3 카드', atax_jp_key: '카드'},
					{atax_jp_flag: '4', atax_jp_nm: '4 예금', atax_jp_key: '예금'},
           // {atax_jp_flag: '5', atax_jp_nm: '5 기타'}
        ]
    }),
    
    /*
    ADD_JP_TYPE: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_jp_flag' }, //전표 유형 코드
            { name: 'atax_jp_nm' } //전표 유형 명칭
        ],
        data: [
            {atax_jp_flag: '0', atax_jp_nm: '없음'},
            {atax_jp_flag: '1', atax_jp_nm: '현금'},
            {atax_jp_flag: '2', atax_jp_nm: '외상'},
            {atax_jp_flag: '3', atax_jp_nm: '카드'},
            {atax_jp_flag: '4', atax_jp_nm: '예금'},
            {atax_jp_flag: '5', atax_jp_nm: '기타'}
        ]
    }),
	*/
    
    //---------------------------------------------------------------------------
    // 전자세금계산서 발행여부
    //---------------------------------------------------------------------------
    ATAX_ELECT_FLAG: Ext.create('Ext.data.Store',{
        fields: [
            {name: 'atax_elect_flag'},
            {name: 'atax_elect_flag_nm'}
        ],
        data: [
            {atax_elect_flag: 'y', atax_elect_flag_nm: '1. 여'},
            {atax_elect_flag: 'n', atax_elect_flag_nm: '2. 부'}
        ]
    }),
    
    //---------------------------------------------------------------------------
    //  수지표
    //---------------------------------------------------------------------------
    Menu31_Grid1: Ext.create('Ext.data.Store', {
        fields: [
            { name: 'type' },
            { name: 'debit_gycode' },
            { name: 'debit_balance_am' },
            { name: 'credit_gycode' },
            { name: 'credit_balance_am' }
        ]
    }),
    
    Menu31_Grid2: Ext.create('Ext.data.Store', {
        fields: [
            { name: 'type' },
            { name: 'debit_gycode' },
            { name: 'debit_balance_am' },
            { name: 'credit_gycode' },
            { name: 'credit_balance_am' }
        ]
    }),
    
    //---------------------------------------------------------------------------
    //  외상채권, 외상채무 거래명세표
    //---------------------------------------------------------------------------
    Menu05_Grid2_Pop: Ext.create('Ext.data.Store', {
        fields: [
            {name: 'io_seq', type: 'string'},
            {name: 'io_item_cd', type: 'string'},
            {
                name: 'io_item_nm',
                convert: function(v, rec) {
                    var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
                    if(gyRec) return gyRec.get('item_nm');
                    else return '';  
                }
            },
            {
                name: 'io_item_qty',
                convert: function(v, rec) {
                    var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
                    if(gyRec) return gyRec.get('item_qty');
                    else return '';
                }
            },
            {
                name: 'io_item_danwi',
                convert: function(v, rec) {
                    var gyRec = StoreInfo.Menu24_Grid.findRecord('item_cd', rec.data.io_item_cd);
                    if(gyRec) return gyRec.get('item_danwi');
                    else return '';
                }
            },
            {name: 'io_su' },
            {name: 'io_dan' },
            {name: 'io_amt', type:'int' },
            {name: 'io_rem' }
        ]
    }),
    
    //---------------------------------------------------------------------------
    //  대차표
    //---------------------------------------------------------------------------
    BalanceSheet_Pop: Ext.create('Ext.data.Store', {
        fields: [
            {name: 'credit_gycode', type: 'string'},
            {name: 'credit_name', type: 'string'},
            {name: 'credit_am', type: 'string', defaultValue: '0' },
            {name: 'debit_gycode', type: 'string'},
            {name: 'debit_name', type: 'string'},
            {name: 'debit_am', type: 'string', defaultValue: '0' }
        ]
    }),
    
    //---------------------------------------------------------------------------
    // 세금계산서합계표
    //---------------------------------------------------------------------------
    // 매출 : [Total] 매세금계산서 총합계
    Menu32_Grid1: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumY] 과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분
    Menu32_Grid2: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumN] 위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)
    Menu32_Grid3: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [DataY] 과세기간 종료일 다음달 11일까지 (전자분)
    Menu32_Grid4: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매출 : [DataN] 과세기간 종료일 다음달 12일이후 (전자분), 그외
    Menu32_Grid5: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매출 : [SumAll] 전체데이터
    Menu32_Grid6: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    
    // 매입 : [Total] 매세금계산서 총합계
    Menu32_Grid7: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumY] 과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분
    Menu32_Grid8: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumN] 위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)
    Menu32_Grid9: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [DataY] 과세기간 종료일 다음달 11일까지 (전자분)
    Menu32_Grid10: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매입 : [DataN] 과세기간 종료일 다음달 12일이후 (전자분), 그외
    Menu32_Grid11: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매입 : [SumAll] 전체데이터
    Menu32_Grid12: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    
    //---------------------------------------------------------------------------
    // 계산서합계표
    //---------------------------------------------------------------------------
    // 매출 : [Total] 매세금계산서 총합계
    Menu37_Grid1: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumY] 과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분
    Menu37_Grid2: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumN] 위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)
    Menu37_Grid3: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [DataY] 과세기간 종료일 다음달 11일까지 (전자분)
    Menu37_Grid4: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매출 : [DataN] 과세기간 종료일 다음달 12일이후 (전자분), 그외
    Menu37_Grid5: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매출 : [SumAll] 전체데이터
    Menu37_Grid6: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    
    // 매입 : [Total] 매세금계산서 총합계
    Menu37_Grid7: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumY] 과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분
    Menu37_Grid8: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumN] 위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)
    Menu37_Grid9: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [DataY] 과세기간 종료일 다음달 11일까지 (전자분)
    Menu37_Grid10: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매입 : [DataN] 과세기간 종료일 다음달 12일이후 (전자분), 그외
    Menu37_Grid11: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    // 매입 : [SumAll] 전체데이터
    Menu37_Grid12: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' },
            { name: 'cnt' },
        ]
    }),
    
    
    //---------------------------------------------------------------------------
    // 세금계산서집계표
    //---------------------------------------------------------------------------
    // 매출 : [Total] 매세금계산서 총합계
    Menu33_Grid1: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumY] 과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분
    Menu33_Grid2: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumN] 위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)
    Menu33_Grid3: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [DataY] 과세기간 종료일 다음달 11일까지 (전자분)
    Menu33_Grid4: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [DataN] 과세기간 종료일 다음달 12일이후 (전자분), 그외
    Menu33_Grid5: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매출 : [SumAll] 전체데이터
    Menu33_Grid6: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    
    // 매입 : [Total] 매세금계산서 총합계
    Menu33_Grid7: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumY] 과세기간 종료일 다음달 11일까지 전송된 전자세금계산서 발급분
    Menu33_Grid8: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumN] 위 전자세금계산서 외의 발급분 (종이발급분 + 과세기간 종료일 다음달 12일 이후분)
    Menu33_Grid9: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'custumer_cnt' },
            { name: 'cnt' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [DataY] 과세기간 종료일 다음달 11일까지 (전자분)
    Menu33_Grid10: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [DataN] 과세기간 종료일 다음달 12일이후 (전자분), 그외
    Menu33_Grid11: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    }),
    // 매입 : [SumAll] 전체데이터
    Menu33_Grid12: Ext.create('Ext.data.Store',{
        fields: [
            { name: 'atax_customer_id' },
            { name: 'tr_nm' },
            { name: 'tr_daepyo' },
            { name: 'tr_saup_no' },
            { name: 'tr_up' },
            { name: 'tr_jong' },
            { name: 'atax_supply_price' },
            { name: 'atax_tax' }
        ]
    })
};