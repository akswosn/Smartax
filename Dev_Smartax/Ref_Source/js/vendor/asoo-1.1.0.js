/*

1. 브라우저 체크
$.browser.msie : 익스플로러인지를 확인. IE라면 true를 반환 아니라면 false를 반환합니다.
$.browser.mozilla : 파이어폭스인지 확인. 반환값은 위와 같습니다.
$.browser.safari : 사파리인지를 확인. 크롬의 경우도 해당합니다. 반환값은 위와 같습니다.
$.browser.opera : 오페라인지를 확인. 반환값은 위와 같습니다.


2. 브라우저 버전 체크

$.browser.version : 각각의 브라우저의 버전을 알아옵니다. 브라우저의 종류는 알아오지 않습니다.
*/












//===========================================================================
//	asoo 전역 유틸 함수군.
//===========================================================================

var $asoo = {};




//클래스 상속 관련 처리를 해준다.
$asoo.extendsClass = function(childClass, parentClass)
{
    //이미 상속처리가 되어져 있는 경우는 리턴
    if(childClass.prototype.superClass) return;

    //상속 받을 부모의 프로토 타입 객체를 생성한다.
    var superProto = new parentClass(); //파라미터 없이 호출한다.
    for(var p in superProto) 
        if(superProto.hasOwnProperty(p)) delete superProto[p];
    
    childClass.prototype = superProto;
    childClass.prototype.constructor = childClass;
    childClass.prototype.superClass = parentClass;
};

$asoo.getUrlParameter = function ()
{  
    var ParameterObject = new Object();  
    var locate = location.href;  
 
    if(locate.indexOf("?")==-1)  
        return ParameterObject;  
 
    var parameter = locate.split("?")[1];  
    var paramAreay = parameter.split("&");  
    for ( var i=0; i<paramAreay.length; i++ )  
    {  
        var tem = paramAreay[i].split("=");  
        ParameterObject[tem[0]] = tem[1];  
    }

    return ParameterObject;  
};  




//----------------------------------------------------------------------------
//  서버로 부터 수신된 데이터를 콜백으로 넘겨 준다.
//----------------------------------------------------------------------------
$asoo.requestData = function(jparam)//url, postData, success, error
{
    $.ajax(
    {
        type: 'POST',
        url: jparam.url,
        data: jparam.postData,
        dataType: 'xml',
        timeout: jparam.timeout,
        success: function(result)
        {
            if(jparam.success)
            {
                var code = $(result).find('code').text();
                var data = $(result).find('data').text();
                jparam.success(code, data);
            }
        },
        
        error: function(xhr, status, error)
        {
            if(jparam.error)
                jparam.error(xhr, status, error);
        }
        
    });
};


//--------------------------------------------------------------------------------
//	생성된 윈도우 객체의 메모리 해제 관련 처리
//
//
//--------------------------------------------------------------------------------
//팝업된 윈도우 자바스크립트 객체들을 모아 둔다.
//해제시 사용
$asoo.wndList = new Array();

//fb.ui.Window 팝업창을 닫는다.
$asoo.windowClose = function(id)
{
	var gwnd = null;
	var length = $asoo.wndList.length;

	for(var i=0; i<length; i++)
	{
		gwnd = $asoo.wndList[i];
	
		if(gwnd && gwnd.id==id)
		{
			gwnd.delete_wnd();
			$asoo.wndList.splice(i,1);
		
			break;
		}
	}
};

$asoo.pushWindowList = function(id, wnd)
{
	var gwnd = null;
	var length = $asoo.wndList.length;

	for(var i=0; i<length; i++)
	{
		gwnd = $asoo.wndList[i];
		if(gwnd && gwnd.id==id) return false;
	}
	
	$asoo.wndList.push(wnd);
	return true;
};

$asoo.reportBackKeyEvent = function()
{
	if($asoo.wndList.length==0) return false;
	
	var gwnd = $asoo.wndList[$asoo.wndList.length-1];
	
	if(gwnd.listener.backKeyListener)
	{
		gwnd.listener.backKeyListener();
		return true;
	}
	else return false;
};

$asoo.reportKeyEvent = function(keyValue)
{
	if($asoo.wndList.length==0) return false;
	
	var gwnd = $asoo.wndList[$asoo.wndList.length-1];
	
	if(gwnd.listener.keyEventListener)
	{
		gwnd.listener.keyEventListener(keyValue);
		return true;
	}
	else return false;
};





//--------------------------------------------------------------------------------------
//	Window class
//
//	팝업 윈도우를 생성하는 클래스
//	윈도우 내부의 컨텐츠는 contentsUrl 로 채운다. 
//  isElement 가 참이면 contentsUrl 을 element 로 취급한다. 
//	content div 에 overflow:scroll 값을 지정하지 말것.(기본 스크롤바가 생기지 않도록)
//	실제로 들어가는 컨텐츠에서 자신의 사이즈 및 스크롤 할지를 세팅한다.
//--------------------------------------------------------------------------------------
$asoo.Window = function(id, contentsUrl, isElement)
{
	this.id = id;
	this.contentsUrl = contentsUrl;
	this.isElement = isElement;
	
	this.winObj = null;
	this.modalBg = null;
	this.isDelayShow = false;//showWindow 에서 delay 를 주었는지 
	
	this.jOption =
	{
		isDraggable: true,
		isResizable: false,
		isModal: false,
		isFocusLostClose: false,
		isFocusLostHide: false,
		//focusCallback: null,
		modalBgOption: 'none',//none, light, dark
		windowStyle: null,//{'border':'1px solid gray'}
		dragAreaId: null,
		isMobile: false
	};
	
	this.listener =
	{
		backKeyListener : null,	//android back key event
		keyEventListener : null
	};
	
	
	//윈도우가 open 됐는지, show, hide 와는 별개이다.
	this.isOpen = false;
};

$asoo.Window.prototype =
{
	getContainerId: function()
	{
		return 'asoo_wnd_' + this.id;
	},
	
	//isDraggable, isResizable, isModal, isFocusLostClose(모달인 경우 포커스를 잃을 때 창을 닫을지 ), modalBgOption(모달인 경우 배경을 어둡게 할지)
	//isFocusLostHide, focusCallback(isFocusLostClose, isFocusLostHide 인 경우, 창이 숨겨질 경우의 콜백)
	setWindowOption: function(jOption)
	{
        for(var p in jOption)
        { 
            if(jOption[p]!=undefined)
                this.jOption[p] = jOption[p];
        }
	},
	
	setEventListener: function(listener)
	{
        for(var p in listener)
        { 
            if(listener[p]!=undefined)
                this.listener[p] = listener[p];
        }
	},
	
	//윈도우가 모달 모드인 경우의 처리
	modalManage: function(zIndex)
	{
		var modalBg = $('<div id="asoo_wnd_modalbg_' + this.id + '"></div>');
		
		this.modalBg = modalBg;
		
		$('body').append(modalBg);
		
		modalBg.css(
		{
			'background-color':'#000000',
			'width':'100%', 'height':'100%',
			'position':'absolute',
			'top':'0', 'left':'0',
			'z-index':zIndex, 'display':'none'
		});

		//모달로 윈도우가 떴을 때 배경 효과 처리
		if(this.jOption.modalBgOption=='none')
		{
			modalBg.css('opacity','0');
			modalBg.show();
		}
		else 
		{
			if(this.jOption.modalBgOption=='light') modalBg.css('opacity','0.3');
			//drak
			else modalBg.css('opacity','0.7');
			
			modalBg.fadeIn('fast');
		}
		
		var thisObj = this;

		function bgClickManage(e)
		{
			e.preventDefault();
			e.stopPropagation();
				
			if(thisObj.jOption.isFocusLostClose) thisObj.close();
			else if(thisObj.jOption.isFocusLostHide) thisObj.hideWindow();
		}
		
		if(this.jOption.isMobile)
		{
			/*
			modalBg.bind('touchstart', function(e)
			{
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
			*/
			
		    modalBg.bind('touchstart', function(e)
		    {
		    	//if(thisObj.jOption.focusCallback) thisObj.jOption.focusCallback('before');
		    	bgClickManage(e);
		    	//if(thisObj.jOption.focusCallback) thisObj.jOption.focusCallback('after');
		    	
				return false;
		    });
		}
		else
		{
			modalBg.mousedown(function(e)
			{
				//if(thisObj.jOption.focusCallback) thisObj.jOption.focusCallback('before');
				bgClickManage(e);
				//if(thisObj.jOption.focusCallback) thisObj.jOption.focusCallback('after');
				return false;
			});
			
			modalBg.bind("contextmenu", function(e)
			{
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
	},
	
	//얼럿 박스와 같이 동작되도록 설정
	openAsAlert: function(x, y, width, height, callback)
	{
		this.setWindowOption({isModal: true});
		this.open(x, y, width, height, callback);
	},
	
	//컨텍스트 메뉴와 같이 동작되도록 설정
	openAsContextMenu: function(x, y, width, height, callback)
	{
		this.setWindowOption(
		{
			isDraggable: false,
			isModal: true,
			isFocusLostClose: true
		});
		
		this.open(x, y, width, height, callback);
	},
	
	//윈도우 창을 연다. width, height 값이 0 이면 컨텐츠 사이즈 만큼 윈도우 사이즈가 잡힌다.
	open: function(x, y, width, height, callback, zIndex)
	{
		//$asoo.wndList.push(this);
		if(!$asoo.pushWindowList(this.id, this)) return;
		
		this.isOpen = true;
		
		//윈도우 창이 로드 완료된 후 추가되도록 밑으로 옮김.
		//if(this.jOption.isModal) this.modalManage();
      
		var winObj = $('<div id="asoo_wnd_' + this.id + '" style="overflow:hidden;"></div>');
		$('body').append(winObj);
		
		this.winObj = winObj;
		
		/*
		//우클릭 컨텍스트 메뉴 막음.
		winObj.bind("contextmenu", function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
		*/
		
		if(!zIndex) zIndex  = 1000 + $asoo.wndList.length*100;

		//window position size
		winObj.css( { 'position':'absolute', 'left':x+'px', 'top':y+'px', 'z-index':zIndex });
		
		if(width) winObj.width(width);
		if(height) winObj.height(height);
			
		if(this.jOption.windowStyle)//윈도우 스타일 설정
			winObj.css(this.jOption.windowStyle);
		
		//window resizable
		if(this.jOption.isResizable)
		{
			//winObj.resizable({ handles: 'n, e, s, w, se, sw', alsoResize: cid });
			winObj.resizable({ handles: 'n, e, s, w, se, sw' });
		}
      
		//window draggable
		if(this.jOption.isDraggable)
		{
			if(this.jOption.dragAreaId && this.jOption.dragAreaId!='') 
				winObj.draggable( { handle: '#'+this.jOption.dragAreaId } );
			else winObj.draggable( { handle: '#asoo_wnd_' + this.id } );
		}
		
		
		if(this.isElement) 
		{
			winObj.append(this.contentsUrl);
			
			if(this.jOption.isModal) this.modalManage(zIndex-1);
			
	        //로드 완료시 처리할 것.
		    //if(callback) callback(this.id);
		}
		else
		{
		    var thisObj = this;
		    
		    //content html load
		    winObj.load(this.contentsUrl, function() 
		    {
		    	if(thisObj.jOption.isModal) thisObj.modalManage(zIndex-1);
		    	
		        //로드 완료시 처리할 것.
			    if(callback) callback(thisObj.id);
		    });
		}
		
	},
	
	//윈도우 창을 닫는다.
	close: function()
	{
		$asoo.windowClose(this.id);
	},
	
    showWindow: function(delay)
    {
        if(this.jOption.isModal) this.modalBg.show();
        
        if(delay)
        {
        	var thisObj = this;
        	this.isDelayShow = true;
        	
        	setTimeout(function() 
        	{
        		if(thisObj.isDelayShow) 
        			thisObj.winObj.show();
        	}, delay);
        }
        else this.winObj.show();
    },
	
	hideWindow: function()
	{
		this.isDelayShow = false;
        this.winObj.hide();
	    if(this.jOption.isModal) this.modalBg.hide();
	},
	
	moveWindow: function(x, y)
	{
	    this.winObj.css( { 'left':x+'px', 'top':y+'px' });
	},
	
	isShowWindow: function()
	{
		return this.winObj.is(":visible");
	},
	
	//메모리 해제 관련
	delete_wnd: function()
	{
        this.isOpen = false;

        $('#asoo_wnd_'+this.id).remove();
		if(this.jOption.isModal) $('#asoo_wnd_modalbg_'+this.id).remove();
	}
};








//-----------------------------------------------------------------------------------------------------
//	탭에 캐시 옵션을 주어서
//	참이면 탭이 바뀔 경우 이전 탭을 remove 하지 말고 display:none 시켜준다.
//	로드가 되었는지 여부를 각 탭이 저장하고 있다가 다시 활성화 될 때 display:visible 로 변경해 준다.
//-------------------------------------------------------------------------------------------------------














//-----------------------------------------------------------------------------------------
//	Tab class
//
//	containerId 내부에 탭 컨트롤을 생성한다.
//	content div 에 overflow:scroll 값을 지정하지 말것.(기본 스크롤바가 생기지 않도록)
//	실제로 들어가는 컨텐츠에서 자신의 사이즈 및 스크롤 할지를 세팅한다.
//-----------------------------------------------------------------------------------------
$asoo.Tab = function(containerId, nTabHeight)
{
	this.tabId = containerId;
	this.nTabHeight = nTabHeight;
	this.selected = null;
	this.normalTxtColor = '#000000';
	this.overTxtColor = '#0000FF';
	//탭이 밑으로 내려가면서 동적으로
	//컨텐츠의 높이를 조정하기 위한 변수
	this.oldGap = -1;
	
	this.jOption =
	{
		tabChanged: null,
		isContainerStaticHeight: true		
	};

	$('#'+this.tabId).append('<ul></ul><div class="fb_ui_tab_contents"></div>');
	$('#'+this.tabId+' ul').css( { 'list-style':'none', 'margin':'0', 'padding':'0' } );
};

$asoo.Tab.prototype = 
{
	//tabChanged, isContainerStaticHeight(컨테이너의 높이를 정적으로 고정할 지, 정적인 경우 탭 컨텐츠의 height 를 고정 셋팅한다.)
	setTabOption: function(jOption)
	{
        for(var p in jOption)
        { 
            if(jOption[p]!=undefined) 
            	this.jOption[p] = jOption[p];
        }
	},

	//탭컨트롤 내부에 탭버튼을 추가한다. contentsUrl 은 탭버튼 클릭시 보여줄 컨텐츠이다. 
	addTab: function(name, contentsUrl)
	{
		$('#'+this.tabId+' > ul').append('<li><a href="' + contentsUrl + '">' + name + '</a></li>');
	},
	
	setTabPadding: function(nPaddingX, nPaddingY)
	{
        if($.browser.msie) nPaddingY += 2;
	    
		this.nPaddingX = nPaddingX;
		this.nPaddingY = nPaddingY;
	},
	
	setTabImages: function(nlImg, nrImg, olImg, orImg)
	{
		this.nlImg = nlImg;
		this.nrImg = nrImg;
		this.olImg = olImg;
		this.orImg = orImg;
	},

	setTabImages: function(images)
	{
		this.nlImg = images[0];
		this.nrImg = images[1];
		this.olImg = images[2];
		this.orImg = images[3];
	},
	
	//normal, over 시의 텍스트 색깔을 지정한다.
	//텍스트 색깔만 변경되며 폰트사이즈 및 다른 속성은 setTextStyle~ 함수를 이용
	setTextColor: function(normalColor, overColor)
	{
		this.normalTxtColor = normalColor;
		this.overTxtColor = overColor;
	},

	//텍스트 색깔은 지정해도 변하지 않는다.
	//정의된 스타일을 셋팅한다.(param : 클래스 아이디)
	//ex) 
	//	.tab_text_style
	//	{
	//		font-weight: bold;
	//		font-size: 12px;
	//	}
	//	tab.setTextStyleClass('tab_text_style');
	//
	setTextStyleClass: function(textStyleClass)
	{
		$('#'+this.tabId+' a').addClass(textStyleClass);
	},
	
	//텍스트 색깔은 지정해도 변하지 않는다.
	//탭의 텍스트 스타일을 셋팅한다.(param : 스타일 정보)
	//ex) tab.setTextStyle('{font-weight:bold, font-size:12px}'); 
	setTextStyle: function(textStyle)
	{
		$('#'+this.tabId+' a').css(textStyle);
	},
	
	colculHeight: function()
	{
		var tid = '#'+this.tabId;
		var contentsId = tid + ' .fb_ui_tab_contents';
		
		var first = $(tid+' a:eq(0)').position().top;
		var last = $(tid+' a:last').position().top;
		
		var gap = last-first;
		
		if(this.oldGap!=gap)
		{
			$(contentsId).css('height',$(tid).height()-(this.nTabHeight+gap));
			this.oldGap = gap;
		}
	},
	
	//탭버튼에 적용될 정보들을 셋팅한다.
	applyTab: function()
	{
		var tid = '#'+this.tabId;
		var contentsId = tid + ' .fb_ui_tab_contents';
		
		$(tid+' li').css({'float':'left', 'background':'url(' + this.nlImg + ') no-repeat -1px top' });//라인이 두줄 생기지 않도록 1픽셀 숨김
		$(tid+' a').css({'display':'block', 'text-decoration':'none', 'color':this.normalTxtColor, 
			'height':(this.nTabHeight-this.nPaddingY), 'background':'url(' + this.nrImg + ') no-repeat right top',
			'padding-left':this.nPaddingX, 'padding-right':this.nPaddingX, 'padding-top':this.nPaddingY  });
		//첫번째 탭은 1픽셀 숨김 해제.
		$(tid+' li').eq(0).css('background-position','0px top');

		$(contentsId).css('clear','left');
		
		//컨텐츠의 높이를 정적으로 고정할 지
		if(this.jOption.isContainerStaticHeight) this.colculHeight();
		
		var thisTab = this;
		
		$(tid+' a').hover
		(
			//over
			function()
			{
				$(this).parent().css('background-image', 'url('+thisTab.olImg+')');
				$(this).css({ 'background-image':'url('+thisTab.orImg+')', 'color':thisTab.overTxtColor});
			},
			
			//out
			function()
			{
				if(thisTab.selected!=this)
				{
					$(this).parent().css('background-image', 'url('+thisTab.nlImg+')');
					$(this).css({'background-image':'url('+thisTab.nrImg+')', 'color':thisTab.normalTxtColor});
				}
			}
		);
		
		$(tid+' a').click(function()
		{
			if(thisTab.selected===this) return false;
			
			if(thisTab.selected!=null)
			{
				$(thisTab.selected).parent().css('background-image', 'url('+thisTab.nlImg+')');
				$(thisTab.selected).css({'background-image':'url('+thisTab.nrImg+')', 'color':thisTab.normalTxtColor});
			}
			
			thisTab.selected = this;
			
			$(contentsId).children().remove();
			
            $(contentsId).load($(this).attr('href'), function()
            {
                if (thisTab.jOption.tabChanged) 
                {
                    thisTab.jOption.tabChanged($(tid+' a').index(thisTab.selected) , thisTab.selected);
                }
            });
            
			
			return false;
		});
		
	},
	
	selectTab: function(index)
	{
		var sel = $('#'+this.tabId+' a').eq(index);
		sel.mouseover();
		sel.click();
	}
	
};




//-----------------------------------------------------------------------------------------
//  ItemList class
//
//-----------------------------------------------------------------------------------------
$asoo.ItemList = function(containerId, arrangeType)
{
    this.container = $('#'+containerId);
    this.oriItem = this.container.children().eq(0);
    this.oriItem.css('display', 'none');
    
    if(arrangeType) this.arrangeType = arrangeType;
    else this.arrangeType = 'auto';
};

$asoo.ItemList.prototype =
{
    //---------------------------------------------------------------------------------------------------------------
    //  containerId 내부의 리스트 아이템 템플릿을 복사하여 완성된 리스트 항목 만든다.
    //  jparam : arrangeType, itemCount, isAppend
    //          - arrangeType : horizontal(가로 스크롤), vertical(세로 스크롤) ,auto(가로로 배치하다 공간이 없으면 세로로 추가)
    //          - itemCount : 생성할 아이템 개수
    //          - isAppend : true(기존 아이템에 이어서 추가), false(기존 아이템이 있을 경우 지우고 추가)
    //  rtag : repeat tag(반복할 영역을 담고 있는 태그 이름(ex, div, tr...))
    //---------------------------------------------------------------------------------------------------------------
    
    createListItems: function(itemCount, isAppend, pre)
    {
        //아이템 가로 스크롤 배치
        if(this.arrangeType=='horizontal')
        {
            this.container.css('position','relative');
            this.oriItem.css({'position':'absolute', 'left':'0px', 'top':'0px'});
        }
        
        //셋팅 모드이면 
        if(!isAppend)
        {
            //기존에 추가되어 있던 항목들이 있다면 제거한 후 추가한다.
            this.removeAllItems();
        }
        
        //현재 추가되어져 있는 아이템
        var curListItems = this.container.children();
        //추가할 아이템의 시작과 끝 인덱스
        var start = 0;
        if(!pre)
        	start = curListItems.length - 1;
        
        var end = start + itemCount;
        
        //아이템 가로 스크롤 배치시 계산할 변수
        var itemWidth = this.oriItem.width();
    
        //원본 템플릿의 아이템
        //복사한 아이템을 담고 있을 변수
        var cloneItem = null;
        //요청한 개수만큼 생성한다.
        for(var i=start; i<end; i++)
        {
            cloneItem = this.oriItem.clone();
            cloneItem.css('display','block');
            if(pre)
            	//this.container.insertAfter(cloneItem);
            	cloneItem.insertAfter(this.oriItem);
            else
            	this.container.append(cloneItem);
    
            //아이템 가로 스크롤 배치 
            if(this.arrangeType=='horizontal')
                cloneItem.css({'left':(itemWidth*i)+'px', 'top':'0px'});
        }
        
        //복사하여 추가된 아이템들만 얻어온다.
        if(pre) curListItems = this.container.children(':gt(0):lt(' + (end+1) + ')');
        else curListItems = this.container.children(':gt('+start+')');

        //가로로 배치하다 가로사이즈를 넘기면 자동으로 밑으로 추가
        if(this.arrangeType=='auto') curListItems.css('float','left');
    
        return curListItems;
    },
    
    getListItems: function()
    {
        return this.container.children(':gt(0)');
    },
    
    removeListItem: function(item)
    {
        item.remove();
    },
    
    removeListItemByIndex: function(index)
    {
        this.getListItems().eq(index).remove();
    },
    
    removeAllItems: function()
    {
        this.getListItems().remove();
    }

};


//-----------------------------------------------------------------------------------------
//  Button class
//  jOption : text, textStyle, btnImg, clickListener, overListener, outListener
//-----------------------------------------------------------------------------------------
$asoo.Button = function(btnId, width, height)
{
    if(typeof(btnId)=="string")
    {
        this.btnId = btnId;
        this.btnObj = $('#'+btnId);
    }
    //직접 $('<input type="button">') input 객체가 넘어오는 경우
    else
    {
        this.btnId = '';
        this.btnObj = btnId;
    }
    
    this.isEnable = true;
    this.width = width;
    this.height = height;
    this.btnImg = null;
    this.imgCount = 2;
    this.listener = { click: null, over: null, out: null };
    
    this.isChecked = false;
    this.checkImg = null;
};

$asoo.Button.prototype = 
{
    setText: function(text)
    {
        if(text) this.btnObj.attr('value', text);
    },
    
    setTextStyle: function(style)
    {
        if(style) this.btnObj.css(style);
    },
    
    setCheckImg: function(chkImg)
    {
        this.checkImg = chkImg;
    },
    
    setCheck: function(check)
    {
        if(this.checkImg)
        {
            this.isChecked = check;

            if (this.isChecked) this.btnObj.css('background-image', 'url("' + this.checkImg + '")');
            else this.btnObj.css('background-image', 'url("' + this.btnImg + '")');
        }
    },
    
    setBtnImg: function(btnImg, imgCount)
    {
        if(btnImg)
        {
            this.btnImg = btnImg;
            if(imgCount) this.imgCount = imgCount;
            this.btnObj.css({'background-image':'url("'+this.btnImg+'")', 'background-color':'transparent'});
        }
    },
    
    setEventListener: function(clickListener, overListener, outListener)
    {
        if(clickListener) this.listener.click = clickListener;
        if(overListener) this.listener.over = overListener;
        if(outListener) this.listener.out = outListener;
    },
    
    applyButton: function(jOption)
    {
        //text, textStyle, btnImg, clickListener, overListener, outListener
        if(jOption)
        {
            this.setText(jOption.text);
            this.setTextStyle(jOption.textStyle);
            this.setBtnImg(jOption.btnImg, jOption.imgCount);
            this.setEventListener(jOption.clickListener, jOption.overListener, jOption.outListener);
        }
        
        if(this.btnImg)
        {
            this.btnObj.css(
            {
                border:'none', outline: 'none',//cursor:'pointer', 
                padding: '0px'
            });

            if(this.width) this.btnObj.width(this.width);
            if(this.height) this.btnObj.height(this.height);
        }
                
        var thisObj = this;
                
        this.btnObj.mouseover(function()
        {
            if(!thisObj.isEnable) return;
            if(thisObj.btnImg && thisObj.imgCount>2) thisObj.btnObj.css('background-position', '-' + (thisObj.width*2) + 'px 0px');
            if(thisObj.listener.over) thisObj.listener.over(thisObj, thisObj.btnId);
            
            return false;
        });
        
        
        this.btnObj.mousedown(function(e)
        {
            //우클릭 스킵
            if(!thisObj.isEnable || e.which==3) return;
            if(thisObj.btnImg) thisObj.btnObj.css('background-position', '-' + thisObj.width + 'px 0px');
            
            return false;
        });

        this.btnObj.mouseout(function()
        {
            if(!thisObj.isEnable) return;
            if(thisObj.btnImg) thisObj.btnObj.css('background-position', '0px 0px');
            if(thisObj.listener.out) thisObj.listener.out(thisObj, thisObj.btnId);
            
            return false;
        });
        
        //버튼 클릭시 이벤트 콜백 호출.
        this.btnObj.click(function()
        {
            if(!thisObj.isEnable) return;
            if(thisObj.btnImg) 
            {
                $(this).css('background-position', '0px 0px');
                
                if(thisObj.checkImg)
                {
                    thisObj.isChecked = !thisObj.isChecked;
                     
                    if(thisObj.isChecked) thisObj.btnObj.css('background-image','url("'+thisObj.checkImg+'")');
                    else thisObj.btnObj.css('background-image','url("'+thisObj.btnImg+'")');
                }
            }
            
            if(thisObj.listener.click) thisObj.listener.click(thisObj, thisObj.btnId);
            
            return false;
        });
    },
    
    enableButton: function(isEnable)
    {
        this.isEnable = isEnable;
        if(this.btnImg)
        {
            if(this.isEnable) this.btnObj.css('background-position', '0px 0px');
            else if(this.imgCount>3) this.btnObj.css('background-position', '-' + (this.width*3) + 'px 0px');
        }
        
        //else this.btnObj.enabled = isEnable;
    },
    
    click: function()
    {
    	this.btnObj.click();
    }
};


//-----------------------------------------------------------------------------------------
//  Progress class
//  jOption : bgImg, prgImg, paddingX, paddingY, textStyle
//-----------------------------------------------------------------------------------------
$asoo.Progress = function(prgId, width, height)
{
    this.prgId = prgId;
    this.width = width;
    this.height = height;
    this.prgValue = 0.0;
    
    this.prgObj = $('#'+this.prgId);
    this.valObj = $('<div></div>');
    this.prgObj.append(this.valObj);
};

$asoo.Progress.prototype = 
{
    getPrgValue: function() { return this.prgValue; },
    
    setPrgValue: function(value)
    {
        this.prgValue = value;
        this.valObj.width(this.width * this.prgValue);
    },
    
    addPrgValue: function(value)
    {
        this.prgValue += value;
        this.valObj.width(this.width * this.prgValue);
    },
    
    setPrgImg: function(bgImg, prgImg)
    {
        this.prgObj.css('background', 'url("'+bgImg+'")');
        this.valObj.css('background', 'url("'+prgImg+'")');
    },
    
    setPadding: function(paddingX, paddingY)
    {
        this.prgObj.css('padding', paddingY + 'px ' + paddingX + 'px ' + paddingY + 'px ' + paddingX + 'px');
        this.width -= (paddingX*2);
        this.height -= (paddingY*2);
    },
    
    setText: function(text) { this.valObj.text(text); },
    setTextStyle: function(textStyle) { this.valObj.css(textStyle); },
    
    applyProgress: function(jOption)
    {
        if(jOption)
        {
            this.setPrgImg(jOption.bgImg, jOption.prgImg);
            this.setPadding(jOption.paddingX, jOption.paddingY);
            this.setTextStyle(jOption.textStyle);
        }
        
        this.prgObj.width(this.width);
        this.prgObj.height(this.height);
        this.valObj.height(this.height);//height 값은 패딩이 계산된 값이므로 
        this.valObj.css({'line-height':this.height+'px', 'text-align':'center'});//상하 중앙정렬
        this.setPrgValue(this.prgValue);
    }
};


//--------------------------------------------------------------------------------
//  Accordion class
//
//  특정 구조(p,div)로 된 태그 정보를 파라미터로 받아 accordion 메뉴를 구성한다.
//--------------------------------------------------------------------------------
$asoo.Accordion = function(menuClass, contentsClass, menuHeight)
{
    this.menu = $(menuClass);
    this.contents = $(contentsClass);
    this.menuHeight = menuHeight;
    //현재 컨텐츠가 보여지고 있는 메뉴의 Element Node 포인터
    this.selected = null;
    
    this.jOption =
    {
    	showContent: false,
        speed: 'fast',
        isSingleShow: true,
        isAnimation: true,
        isShowToggle: true,
        showEvent: 'click',
        mouseOverEventDelay: 0,
        
        beforeShow: null,
        afterShow: null,
        beforeHide: null,
        afterHide: null,
        //isMobile: false
    };
};

$asoo.Accordion.prototype = 
{
    //speed(에니메이션 속도), isSingleShow(하나의 메뉴만 펼칠지),  isAnimation, isShowToggle(펼쳐진 항목 다시 클릭시 숨길지), showEvent(bind event name)
    setAccordionOption: function(jOption)
    {
        for(var p in jOption)
        { 
            if(jOption[p]!=undefined) 
            	this.jOption[p] = jOption[p];
        }
    },
    
    setMenuPadding: function(paddingX, paddingY)
    {
        this.paddingX = paddingX;
        this.paddingY = paddingY;
    },
    
    setMenuBgImage: function(bgImage, option)
    {
        //this.bgImage = bgImage;
        this.menu.css('background','url(' + bgImage + ') '+ option);
    },
    
    //파라미터 newSel 은 클릭되어진 메뉴의 Element Node 포인터
    showHideManage: function(newSel)
    {
        var thisObj = this;
        
       	if(newSel.isOpen) 
       	{
       		if(!this.jOption.isShowToggle) return;
       		_hideContents(newSel);
       	}
       	else 
       	{
       		if(this.jOption.isSingleShow && this.selected) _hideContents(this.selected);
       		
       		_showContents(newSel);
       	}
        
        /////////////////////////////////////
        
        function _hideContents(menu)
        {
        	if(thisObj.jOption.beforeHide) thisObj.jOption.beforeHide(menu);
        	
            var citem = $(menu).next();
            if(thisObj.jOption.isAnimation) 
            {
            	citem.slideUp(thisObj.jOption.speed, function() 
            	{
            		if(thisObj.jOption.afterHide) thisObj.jOption.afterHide(menu);
            	});
            }
            else 
            {
            	citem.hide();
            	if(thisObj.jOption.afterHide) thisObj.jOption.afterHide(menu);
            }
            
            menu.isOpen = false;
            thisObj.selected = null;
        }
        
        function _showContents(menu)
        {
        	if(thisObj.jOption.beforeShow) thisObj.jOption.beforeShow(menu);
        	
            var citem = $(menu).next();
            if(thisObj.jOption.isAnimation) 
            {
            	citem.slideDown(thisObj.jOption.speed, function() 
            	{ 
            		if(thisObj.jOption.afterShow) thisObj.jOption.afterShow(menu);
            	});
            }
            else 
            {
            	citem.show();
            	if(thisObj.jOption.afterShow) thisObj.jOption.afterShow(menu);
            }
            
            menu.isOpen = true;
            thisObj.selected = menu;
        }
        
    },

    //메뉴의 속성 및 적용될 정보들을 셋팅한다.
    applyAccordion: function()
    {
        this.menu.css({'height':this.menuHeight+'px', 'padding-left':this.paddingX+'px',
                                  'padding-top':this.paddingY+'px', 'padding-right':this.paddingX+'px'});
        
        var thisAcc = this;
        var isTrigger = false;
        var timeoutVal = null;
        
        this.menu.each(function()
        {
        	this.isOpen = thisAcc.jOption.showContent;
        });
        
        if(!this.jOption.showContent) this.contents.css('display','none');
        
        //각각의 이벤트 타입에 따라 컨텐츠 메뉴를 보여주고 숨기는 로직 처리
        this.menu.bind(this.jOption.showEvent, function()
        {
            //mouseover delay 값이 지정된 경우 delay 후에 이벤트가 발생하도록 처리
            if(thisAcc.jOption.mouseOverEventDelay>0)
            {
                if(!isTrigger) //트리거로 이벤트를 발생시켰는지
                {
                    var thisEvent = this;
                    
                    timeoutVal = setTimeout(function()
                    {
                        isTrigger = true;
                        $(thisEvent).trigger('mouseover');
                    }, 
                    thisAcc.jOption.mouseOverEventDelay);
                    
                    return;
                }
                
                isTrigger = false;
                timeoutVal = null;
            }
            
            //현재 메뉴를 다시 클릭했을 때 토글 옵션이 없으면
            //아무 작동도 되지 않는다.
            //if(this==thisAcc.selected && !thisAcc.jOption.isShowToggle) return;
            
            //citem 은 클릭 시 새로 보여질 아이템
            var citem = $(this).next();
            var link = citem.attr('data-url');
    
            if(link && link!='' && this!=thisAcc.selected)//같은 항목은 다시 로드 하지 않는다.
            {
                var thisMenu = this;

                citem.load(link, function()
                {
                    thisAcc.showHideManage(thisMenu);
                });
            }
            
            else thisAcc.showHideManage(this);
        });
        
        //mouseover delay 값이 지정된 경우 mouseout 발생하면 이벤트를 발생시키지 않는다.
        if(this.jOption.mouseOverEventDelay>0)
        {
            this.menu.mouseout(function()
            {
                if(timeoutVal) 
                {
                    clearTimeout(timeoutVal);
                    timeoutVal = null;
                }
            }); 
        }
        
    },
    
    showHideByIndex: function(index, isAnimation)
    {
    	var backUp = null;
    	
    	if(isAnimation!=undefined)
    	{
    		backUp = this.jOption.isAnimation;
    		this.jOption.isAnimation = isAnimation;
    	}
    	
    	var eventMenu = this.menu.eq(index);
		if(eventMenu) eventMenu.trigger(this.jOption.showEvent);
    	
    	if(isAnimation!=undefined)
    		this.jOption.isAnimation = backUp;
    }
};



//-----------------------------------------------------------------------------------
//여기부터 jQuery 확장 함수들 모음.

//특정 element 에 스크롤바가 생겼는지 여부
(function($) 
{
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    };
})(jQuery);
