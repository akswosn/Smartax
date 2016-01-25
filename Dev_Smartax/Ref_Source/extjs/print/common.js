
/* ��ũ�� ���� �˾� */
function open_pop(url, pop_width, pop_height) {
	var width = pop_width;
	var height = pop_height;
	var left = (screen.availWidth - width) / 2;
	var top = (screen.availHeight - height) / 2;

	optString = "some_options, width=" + width +", height=" + height + ", left=" + left + ", top=" + top;

	window.open(url, "etnews_pop", optString).focus();
}

/* ��ũ�� �ִ� �˾� */
function open_pop_scroll(url, pop_width, pop_height) {
	var width = pop_width;
	var height = pop_height;
	var left = (screen.availWidth - width) / 2;
	var top = (screen.availHeight - height) / 2;

	optString = "some_options, scrollbars=yes, width=" + width +", height=" + height + ", left=" + left + ", top=" + top;

	window.open(url, "etnews_pop", optString).focus();
}

/**
 * �������� ���ڼ��� Ȯ���ؼ� euc-kr�� �ƴ� ���쿡�� euc-kr�� ����
 * �Ҽȴ��۷� ���� �ӽ���ġ
 **/
function checkCharset() {
    if (navigator.appName.charAt(0) == "M") {
        var ver = getInternetVersion("MSIE");
        if (ver < 8) {
            document.charset = 'euc-kr';
        }
    }
}



/**
 * @�÷��� �ε��� ���� �Լ�
 **/
// flashLoad(���ϰ���, ����, ����, ���̵�, ������, ����, ����������)
function flashLoad(url,w,h,id,bg,vars,win) {

	win = "transparent";

	// �÷��� �ڵ� ����
	var flashStr=
	"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,1,102,64' width='"+w+"' height='"+h+"' id='"+id+"' align='middle'>"+
	"<param name='allowScriptAccess' value='always' />"+
	"<param name='movie' value='"+url+"' />"+
	"<param name='FlashVars' value='"+vars+"' />"+
	"<param name='wmode' value='"+win+"' />"+
	"<param name='menu' value='false' />"+
	"<param name='quality' value='high' />"+
	"<param name='bgcolor' value='"+bg+"' />"+
	"<param name='base' value='.'>"+
	"<embed src='"+url+"' FlashVars='"+vars+"' wmode='"+win+"' menu='false' base='.' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' name='"+id+"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
	"</object>";

	// �÷��� �ڵ� ����
	document.write(flashStr);

	//Flash�� ExternalInterface�� Form Tag������ �������� ���׸� �ذ��ϴ� �ڵ�
	eval("window." + id + " = document.getElementById('" + id + "');");
}



/**
 * �˾� �Լ�
 * /tools/popup.js.html ���� ȣ��
 **/
function openPopup(popup_id, width, height, pos_top, pos_left, check_cookie) {
	var popup_name = popup_id + '_popup';

	//if (check_cookie && getCookie(popup_name) == 'check') { // check cookie
	if (check_cookie && $.cookie('popup_name') == 'check') { // check cookie
		return;
	}

	var obj_popup;
	obj_popup = window.open('/tools/popup_open.html?popup_id=' + popup_id, '_' + popup_name, 'width=' + width + ',height=' + height + ',scrollbars=no,resizable=no,menubar=no,top=' + pos_top + ',left=' + pos_left);
	if (obj_popup) {
		obj_popup.opener = self;
		obj_popup.focus();
	}
}



/**
 * �ѱ� ���ڿ� �ڸ���
 **/
function str_cut(str, len) {
    var l = 0;
    for (var i = 0; i < str.length; i++) {
            l += (str.charCodeAt(i) > 128) ? 2 : 1;
            if (l > len) return str.substring(0, i);
    }
    return str;
}
