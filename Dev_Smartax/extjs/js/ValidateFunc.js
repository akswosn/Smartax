/**
 * @author kyun
 */

var ValidateFunc = 
{
	//년도 검증
	checkYear: function(target){
		var year = target.getValue();
		var len = year.length;
		if(len > 4) return false;
		else if(year.length == 1 || year.length == 3) return false;
		else
		{
			year = Ext.String.leftPad(year, 4, '20');
			target.setValue(year);
			return year;
		}	
	},
	
	//월 검증
	checkMonth: function(target){
		var month = target.getValue();
		if(parseInt(month, 10) > 12 || parseInt(month, 10) == 0) return false;
		else
		{
			var len = month.length;
			if(len > 2 && len < 1) return false;
			else
			{
				month = Ext.String.leftPad(month, 2, '0');
				target.setValue(month);
				return month;
			}	
		}
	},
	
	//숫자로만 되어 있는지 검증
	checkOnlyNumber: function(str){
		var num_regx=/^[0-9]*$/;
		return num_regx.test(str);
	},
	
	//코드 검증		
	checkCode: function(target, len, str){
		var value = target.getValue();
		if(value.length > len || value.length == 0) return false;
		else
		{
			if(!this.checkOnlyNumber(value)) return false;
			else return Ext.String.leftPad(value, len, str);
		}
	},
	
	//코드 중복 체크
	checkDupCode: function(store, codeKey, value){
		var resRec = store.findRecord(codeKey, value, null, null, null, true);
		if(resRec) return true;
		else return false;		
	},
	
	//계정코드 체크
	checkAccountCode: function(value)
	{
		var valueNum = parseInt(value);
		if(valueNum > 499 || valueNum < 100) return false;
		else
		{
			if(!this.checkOnlyNumber(value)) return false;
			else return value;
		}
	},
	
	//저장이 안된 스토어가 있는지를 체크
	checkIsModifyStore: function(storeArr)
	{
		var modiArr = [];
		for(var i=0; i<storeArr.length; i++)
		{
			 if(storeArr[i].getModifiedRecords().length > 0){
				modiArr.push(storeArr[i]); 	
	        }
		}
		if(modiArr.length == 0) modiArr=null;
		return modiArr;
	},
	
	//분개장 입력시 row의 작목, 계정코드, 작목, 금액의 validation을 변경함(11일시 전부통과)
	changeValidAt: function(record, index, validTp)
	{
		var valid = record.get('valid');
		var result = null;
		if(index == 0) result = parseInt(valid%10)+validTp;
		else if(index == 1) result = parseInt(valid/10)*10+validTp; 
		record.set('valid', result);
	},
	
	//거래구분이 3,4일 경우 출금과 입금의 합계가 맞는지 여부 체크(groupId가 없을 경우 전체 group에 대한 금액 체크)
	checkGroupSum: function(store, groupId)
	{
		var isPass = true;
		if(groupId)
		{
			var groupArr = [];
			var isZero = false;
			var debTot = 0, creTot = 0;
			store.each(function(record,id) {
		        if(record.get('jp_group') == groupId) {
		        	var deb = parseInt(record.get('debit'), 10);
		        	if(!deb) deb = 0;  
		        	var cre = parseInt(record.get('credit'), 10);
		        	if(!cre) cre= 0;
		        	
		        	if(record.get('jp_view_gubun') == 3 &&  deb == 0) isZero = true;
		        	else if(record.get('jp_view_gubun') == 4 &&  cre == 0) isZero = true;
		        	
		        	debTot += deb;
		        	creTot += cre;
		        	groupArr.push(record);
		        }
		    });
		    
		    if(debTot == creTot)
		    {
		    	var newGroupId = groupId; 
		    	//금액이 0이 아니고 그룹아이디가 임시번호-1일경우 new Date().getTime()으로 새로 부여하기
		    	if(!isZero && groupId == -1) newGroupId = new Date().getTime();   
		    	
				for(var i=0; i<groupArr.length; i++)
				{
					ValidateFunc.changeValidAt(groupArr[i], 1, (isZero)?2:1);
					groupArr[i].set('jp_group', newGroupId);
				}
		    }
		    else
		    {
		    	for(var i=0; i<groupArr.length; i++)
		    		ValidateFunc.changeValidAt(groupArr[i], 1, 2);
		    }
		}
		
		return isPass;
	},
	
	//그룹아이디로 records를 배열로 리턴하기(거래구분이 3번 4번일 경우 필요) 
	getRecordsByGroupId: function(store, groupId, isValid)
	{
		if(!store) store = StoreInfo.Menu01_Grid;
		var resultArr = [];
		if(groupId)
		{
			store.each(function(record,id) {
		        if(record.get('jp_group') == groupId) {
		        	if(isValid)
		        	{
		        		if(record.get('valid') != 11) return [];
		        		else resultArr.push(record);	
		        	}
		        	else resultArr.push(record);
		        }
		    });	
		}
	    return resultArr;
	},
	
	//그룹아이디가 일치하는 로우의 날짜를 동일하게 변경
	syncGroupDate: function(month, day, groupId)
	{
		var groupArr = ValidateFunc.getRecordsByGroupId(null, groupId);
		for(var i=0; i<groupArr.length; i++)
		{
			groupArr[i].set('jp_date_m', month);	
			groupArr[i].set('jp_date_d', day);	
		}
	},
	
	//계정구분에 따른 계정코드 입력 가능 여부
	gycodeValidByGubun: function(record, value)
	{
		var resStr = '';
		var kbn = record.get('jp_view_gubun');
		if(kbn == 7 && value == 202) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if(kbn == 8 && value == 112) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if(kbn == 9 && value == 201) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if(kbn == 10 && value == 108) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if((kbn == 1 || kbn == 2) && value == 101) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if((kbn == 5 || kbn == 6) && value == 103) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		
		return resStr;		
	},
	
	//계정구분에 따른 계정코드 입력 가능 여부
	gycodeValidByGubun2: function(record, value)
	{
		var resStr = '';
		var kbn = record.get('jp_view_gubun');
		if(kbn == 7 && value == 202) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if(kbn == 8 && value == 112) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if(kbn == 9 && value == 201) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if(kbn == 10 && value == 108) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		else if((kbn == 1 || kbn == 2) && value == 101) resStr = '상품 또는 비용계정을 입력해 주십시오.';
		//else if((kbn == 5 || kbn == 6) && value == 103) resStr = '설정할수 없는 값입니다.';
		
		return resStr;		
	}
	
};
