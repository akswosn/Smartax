/**
 * @file :
 **/



$(document).ready(function() {

    /**
     * ������ vertical news ticker
     **/
    function header_vTicker() {
        $('.rolling').vTicker({
            speed: 500,
            pause: 3000,
            showItems: 1,
            animation: 'fade',
            mousePause: true,
            direction: 'up'
        });
    }

    /* ������ �Ѹ� */
    header_vTicker();

    /* sticky banner ���� */
    var stickyBanner = function(isInit) {
        var layerLeft = -90;
        var marginTop = 100;
        var currentTop = parseInt($("#wingLeftSticky").css("top"));
        var animateTime = 1000;

        if (isInit == true) {
            currentTop = marginTop;
        }

        //alert(currentTop);

        $("#wingLeftSticky").attr("style", "position:absolute; top:" + marginTop + "px; left:" + layerLeft + "px;");
        $("#wingRightSticky").attr("style", "position:absolute; top:100px; left:1008px;");

        $(window).scroll(function() {
            var position = $(window).scrollTop();
            var mov_pos;
            if (position < 255) {
                mov_pos = currentTop;
            }
            else {
                mov_pos = position - 130;
            }

            $("#wingLeftSticky").stop().animate({"top":mov_pos + "px"}, animateTime);
            $("#wingRightSticky").stop().animate({"top":mov_pos + "px"}, animateTime);
        });
    }

    stickyBanner(true);

});


/**
 * ���� ���θ���
 **/
var count_top_promotion = 0;
var index_top_promotion = 0;
var top_promotion_timer_id = 0;


function moveTopPromotion(action) {

    // ���θ��� ������ 1�� �����̸� �׳� ����
    if (count_top_promotion <= 1) return;

    // ���� Ÿ�̸Ӱ� ������ �������� �ʱ�ȭ
    if (top_promotion_timer_id) clearTimeout(top_promotion_timer_id);

    var obj = $('.item_promotion');
    obj.each(function() {
        $(this).hide();
    });

    if (action == 'prev') {
        index_top_promotion--;
        if (index_top_promotion < 0)
            index_top_promotion = count_top_promotion - 1;
    }
    else {
        index_top_promotion++;
        if (index_top_promotion >= count_top_promotion)
            index_top_promotion = 0;
    }

    /*
    alert(obj.size());
    obj.get(index_top_promotion).show();
    return;
    */

    // Ÿ�̸� ����
    if (count_top_promotion > 1)
        top_promotion_timer_id = setTimeout(function() { moveTopPromotion('next'); }, 3 * 1000); // 3 seconds

    obj.each(function(i, element) {
        if (i == index_top_promotion)
            $(element).show();
    });
    return;

    alert(index_top_promotion);
    obj[index_top_promotion].show();
    return;
}


/**
 * ���������� �ֻ��� ����
 **/
function closeTopmostBanner() {
    $('div#bannerTopmostBox').slideUp();
}


/**
 * Interworks ��������. ������������.
 * ���������� �ػ󵵿� ���� ���� ũ�Ⱑ �޶����Ƿ� �̸� �����Ѵ�.
 **/
function showWingInterworks() {
    //var document_width = $(document).width();
    var screen_width = screen.width;
    var css_left = null;
    var css_right = null;

    //if (document_width >= 1660) {
    if (screen_width >= 1680) {
        css_left = {'width': '220px', 'height': '600px'};
        css_right = {'width': '220px', 'height': '600px'};
    }
    //else if (document_width >= 1420 && document_width < 1660) {
    else if (screen_width >= 1440 && screen_width < 1680) {
        css_left = {'width': '200px', 'height': '600px'};
        css_right = {'width': '200px', 'height': '600px'};
    }
    //else if (document_width >= 1260 && document_width < 1420) {
    else if (screen_width >= 1280 && screen_width < 1440) {
        css_left = {'width': '130px', 'height': '600px'};
        css_right = {'width': '130px', 'height': '600px'};
    }
    else {
        return;
    }

    $('#wingLeftInterworks').css(css_left).show();
    $('#wingRightInterworks').css(css_right).show();
}

