function openDialog(title, url, width, height, callback)
{
    var _win = new $asoo.Window('asoo_win', url);
    var conId = _win.getContainerId();
    
    _win.setWindowOption(
    {
        isModal : true,
        dragAreaId : 'pop_title', //특정 드래그 영역을 지정한다.
    });
    
    var cenX = $(window).width()/2 - width/2;
    var cenY = $(window).height()/2 - height/2;
    
    //팝업 오픈
    _win.open(cenX, cenY, width, height, function()
    {
		$('#'+conId + ' input[type="text"]').keydown(function(e)
    	{
    		e.stopPropagation();
    	});    	
    	
        $('.popup_title label').text(title);
        
        var btn = new $asoo.Button('popup_close_btn', 13, 13);
        btn.setBtnImg('./img/close_btn.png');
        btn.setEventListener(function(ele, btnId)
        {
            _win.close();
        });
        btn.applyButton();
        callback();
    });
    
    return _win;
}


function requestData(jparam)//url, postData, success, error ,dataType
{
    $.ajax(
    {
        type: 'POST',
        url: jparam.url,
        data: jparam.postData,
        dataType: jparam.dataType,
        success : function(result)
        {
            if(jparam.success)
            {
           	 	jparam.success(result);	
            }
        },
        
        error: function(xhr, status, error)
        {
        	console.log(xhr+"//"+status+"//"+error);
            //if(jparam.error)jparam.error(xhr, status, error);
        }
        
    });
};
