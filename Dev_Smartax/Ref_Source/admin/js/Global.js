/**
 * @author kyun
 */



var Global =
{
	viewPort: null,		//Extjs viewPort
	selTarget: null,	//대메뉴바에서 선택한 타겟 저장
	onPopup: null,		//현재 떠있는 팝업창
	cellPos: null,		//그리드 셀 수정중 팝업을 띄었을경우 수정중이던 셀 정보 저장 {row:'로우index', column:'셀 index'}
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
	}	
};


