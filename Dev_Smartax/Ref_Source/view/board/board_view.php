<?php
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBBoardWork.php");
	
	$brdWork = new DBBoardWork();
	$brdPost = null;
	
	$contents = $_GET['contents'];
	
	try
	{
		$brdWork->createWork($_GET, $chk);
		$brdPost = $brdWork->requestPost(0);
		
		if ($brdPost==null) {
			throw new Exception('Board view error.');
		}
		
		$brdWork->destoryWork();
		$tblKind = $_GET['tbl_kind'];
	}
	catch (Exception $e)
	{
		$brdWork->destoryWork();
		echo $e->getMessage();
		exit;
	}
	
	function displayContetnsTitle() {
	    $tblKind = $_GET['tbl_kind'];
		switch ($tblKind) {
			case '1': ?><span>질의응답 Q&amp;A</span><?; break;
            case '11': ?><span>공지사항</span><?; break;
            case '21': ?><span>자료실</span><?; break;
            case '31': ?><span>FAQ</span><?; break;
            case '41': ?><span>경영컨설팅</span><?; break;
        }
	}
?>

<div class="content">
    <div class="content-title">
        <h2 class="content-title-inner">
            <? displayContetnsTitle() ?>
            <small>전국 농업인들의 사랑을 받는 태극회계 프로그램</small>
        </h2>   
    </div>
    <div class="content-inner">
        <div class="form-search-01">
            <form method="get" action="./route.php">
                <select name="stype" style="width: 80px;">
                    <option value="2">제목</option>
                    <option value="1">작성자</option>
                </select>
                <input type="text" name="svalue" style="width: 240px;">
                <input type="hidden" name="contents" value="<?=$_GET['contents']?>">
                <input type="hidden" name="tbl_kind" value="<?=$_GET['tbl_kind']?>">
                <input type="hidden" name="pg_inx" value="1">
                <input type="submit" class="btn-flow-black" value="검색">
            </form>
        </div>
        <table class="board-view-01">
            <caption>게시글 목록</caption>
            <colgroup>
                <col style="width:7%;">
                <col style="width:54%;">
                <col style="width:7%;">
                <col style="width:18%;">
                <col style="width:7%;">
                <col style="width:7%;">
            </colgroup>
            <thead>
                <tr>
                	<th scope="row">제목</th>
                    <th scope="col" colspan="5"><?=Util::changeHtmlSpecialchars($brdPost->post_title)?></th>
                </tr>
                <tr>
                    <th scope="row">글쓴이</th>
                    <td><?=$brdPost->poster_nick?></td>
                    <th scope="row">작성일</th>
                    <td><?=$brdPost->post_date?></td>
                    <th scope="row">조회수</th>
                    <td><?=$brdPost->readn?></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="board-view-contents alignL" colspan="6">
                        <?=$brdPost->post_message?>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="board-bottom">
            <div class="board-button">
                <a class="btn-flow-black" href="javascript:history.back()">목록</a>
                <? if (Util::isWriteTable($_GET['tbl_kind'])) { ?>
                <a class="btn-flow-black" href="./route.php?contents=202&wtype=2&post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>">답글</a>
                <a class="btn-flow-black" href="./route.php?contents=202&wtype=3&post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>&poster_uid=<?=$brdPost->poster_uid?>">수정</a>
                <a class="btn-flow-black" href="./proc/board/brd_delete_proc.php?post_id=<?=$brdPost->post_id?>&tbl_kind=<?=$tblKind?>&poster_uid=<?=$brdPost->poster_uid?>">삭제</a>
                <? } ?>
            </div>
        </div>
        <div id="board_comment_area">
			<div id="board_comment_list">
				<div class="board_comment_list_item">
					<span style="font-weight: bold; color:#3b3b3b;">&nbsp;</span>
					<span style="color:#b0b0b0;">&nbsp;</span>
					<p class="board_comment_list_contents"></p>
					<a class="board_comment_edit" href="./proc/board/cmt_edit_proc.php">수정</a>
					<a class="board_comment_delete color-02" href="./proc/board/cmt_delete_proc.php">삭제</a>
					<input type="hidden" value="0">
					<input type="hidden" value="0">
				</div>
			</div>
			
			<?   
				if(Util::isWriteTable($_GET['tbl_kind']))
				{
			?>
			<div id="board_comment_write">
				<textarea class="board_comment_write_contents"></textarea>
				<a class="board_comment_submit" href="./proc/board/cmt_insert_proc.php">등록</a>
			</div>
			<?
				}
			?>
			
			<input type="hidden" value="<?=$brdPost->post_id?>">
			<input type="hidden" value="<?=$tblKind?>">
			<input type="hidden" value="<?=$_SESSION['uid']?>">
			<input type="hidden" value="<?=$_SESSION['nickname']?>">
		</div>
    </div>
</div>
<script>
(function(){
	var cmtParam = 
	{
	    postid: 0,
	    tblkind: 0,
	    userid: 0,      //자신의 유저아이디
	    nickname: null  //자신의 성명
	};
	
	//댓글 리스트 객체
	var cmtItemList = null;//$asoo.ItemList
	
	
	$(document).ready(function()
	{
	    //댓글 리스트 객체
	    cmtItemList = new $asoo.ItemList('board_comment_list', 'vertical');
	    
	    var cmtValue = $('#board_comment_area > input');
	    
	    cmtParam.postid = cmtValue.eq(0).val();
	    cmtParam.tblkind = cmtValue.eq(1).val();
	    cmtParam.userid = cmtValue.eq(2).val();
	    cmtParam.nickname = cmtValue.eq(3).val();
	    
	    //댓글 리스트 요청
	    //['post_id'], ['tbl_kind'], ['pg_inx']
	    $asoo.requestData(
	    {
	        url: './proc/board/cmt_list_proc.php',
	        postData: ('post_id=' + cmtParam.postid + '&tbl_kind=' + cmtParam.tblkind + '&pg_inx=1'),
	    
	        success : function(code, data)
	        {
	            if(code!='y')
	            {
	                alert(data);
	                return;
	            }
	            
	            var cmtList = JSON.parse(data);
	            
	            //첫번째 원소로 댓글 전체 개수를 셋팅함
	            var total_count = cmtList.shift();
	            //화면에 전체 댓글 개수 셋팅
	            //$('#comment_total_count').text(total_count);
	            
	            if(total_count>0)
	            {
	                var items = cmtItemList.createListItems(cmtList.length, false);
	            
	                var item, cmt;
	                items.each(function(index)
	                {
	                    item = $(this);
	                    cmt = cmtList[index];
	
	                    item.find('span').eq(0).text(cmt.user_nickname);
	                    item.find('span').eq(1).text(cmt.comment_date);
	                    item.find('input').eq(0).val(cmt.comment_id);
	                    item.find('input').eq(1).val(cmt.user_id);
	
	                    cmt.message = $('<div/>').text(cmt.message).html();
	                    item.find('p').html(cmt.message.replace(/\n/g, '<br>'));
	
	                    cmtActionManage(item);
	                });
	            } 
	            
	            //iResizeManage();
	        }, 
	
	        error : function(xhr, status, error)
	        {
	            alert(status + ":" + xhr.status);
	        }
	    });
	    
	    //댓글 등록
	    $('#board_comment_write a').click(function()
	    {
	        var txtArea = $('#board_comment_write textarea');
	        var msg = $.trim(txtArea.val());
	        
	        if(msg=='') return false;
	        
	        var url = $(this).attr('href');
	        
	        //댓글 정보 전송
	        $asoo.requestData(
	        {
	            url: url,
	            
	            //['post_id'], ['tbl_kind'], ['cmt_message']
	            postData: ('post_id=' + cmtParam.postid + '&tbl_kind=' + cmtParam.tblkind + '&cmt_message=' + msg),
	            
	            //성공시 comment_id 가 온다.
	            success : function(code, data)
	            {
	                //댓글 등록 실패
	                if(code!='y')
	                {
	                    alert(data);
	                    return;
	                }
	                
	                txtArea.val('');
	                
	                //서버에 댓글 등록 성공시 클라이언트 화면에 동적으로 추가해 준다.
	                var items = cmtItemList.createListItems(1, true);
	                var now = new Date();
	                var cmtDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	
	                var item = items.eq(0);
	                item.find('span').eq(0).text(cmtParam.nickname);
	                item.find('span').eq(1).text(cmtDate);
	                item.find('input').eq(0).val(data);
	                item.find('input').eq(1).val(cmtParam.userid);
	
	                //like htmlspecialchar
	                msg = $('<div/>').text(msg).html();
	                item.find('p').append(msg.replace(/\n/g, '<br>'));
	
	                cmtActionManage(item);
	                
	                //댓글 개수 증가
	                var totCnt = $('#comment_total_count').text();
	                $('#comment_total_count').text(Number(totCnt)+1);
	                
	                //iResizeManage();
	            }, 
	            
	            error : function(xhr, status, error)
	            {
	                alert(status + ":" + xhr.status);
	            }
	        });
	       
	       return false; 
	    });
	    
	});
	
	function cmtActionManage(item)
	{
	    //댓글 수정
	    item.find('.board_comment_edit').click(function()
	    {
	        var cmtItem = $(this).parent();
	        var msgArea = cmtItem.children('p');
	        
	        if($(this).text()=='수정')
	        {
	            $(this).text('취소');
	            
	            var url = $(this).attr('href');
	
	            //취소를 위해 백업
	            this.cmtMsg = msgArea.html();
	            //수정을 위한 폼 추가        
	            msgArea.html('<textarea class="board_comment_write_contents">' + 
	                        this.cmtMsg.replace(/<br>/g, '\r\n') + '</textarea>' +
	                        '<a class="board_comment_submit" href="#">등록</a>');
				
				//iResizeManage();
	            
	            var thisAnc = this;
	
	            //------------------------------
	            //  수정 등록 버튼
	            //
	            msgArea.children('a').click(function()
	            {
	                var msg = $.trim(msgArea.children('textarea').val());
	        
	                if(msg=='') 
	                {
	                    alert('메시지를 입력해 주세요.');
	                    return false;
	                }
	                
	                var cmtid = cmtItem.children('input').eq(0).val();
	                var userid = cmtItem.children('input').eq(1).val();
	                
	                //댓글 정보 전송
	                $asoo.requestData(
	                {
	                    url: url,
	                    
	                    //['post_id'], ['tbl_kind'], ['cmt_message'], ['user_id'], ['comment_id']
	                    postData: ('post_id=' + cmtParam.postid + '&tbl_kind=' + cmtParam.tblkind + '&cmt_message=' + msg
	                                + '&user_id=' + userid + '&comment_id=' + cmtid),
	                    
	                    //성공시 
	                    success : function(code, data)
	                    {
	                        //수정 실패
	                        if(code!='y')
	                        {
	                            alert(data);
	                            msgArea.html(thisAnc.cmtMsg);
	                        }
	                        else
	                        {
	                            msg = $('<div/>').text(msg).html();
	                            msgArea.html(msg.replace(/\n/g, '<br>'));
	                        }
	                        
	                        $(thisAnc).text('수정');
	                        thisAnc.cmtMsg = undefined;
	                        
	                        //iResizeManage();
	                    }, 
	                    
	                    error : function(xhr, status, error)
	                    {
	                        alert(status + ":" + xhr.status);
	                    }
	                });
	                
	                return false;           
	            });
	            
	        }
	        else
	        {
	            $(this).text('수정');
	            
	            msgArea.html(this.cmtMsg);
	            this.cmtMsg = undefined;
	            
	            //iResizeManage();
	        }
	        
	        return false;
	    });
	    
	    //댓글 삭제
	    //['post_id'], ['tbl_kind'], [user_id], ['comment_id']
	    item.find('.board_comment_delete').click(function()
	    {
	        var url = $(this).attr('href');
	        var cmtItem = $(this).parent();
	        var cmtid = cmtItem.children('input').eq(0).val();
	        var userid = cmtItem.children('input').eq(1).val();
	        
	        //댓글 삭제 요청 전송
	        $asoo.requestData(
	        {
	            url: url,
	            postData: ('post_id=' + cmtParam.postid + '&tbl_kind=' + cmtParam.tblkind + '&user_id=' + userid + '&comment_id=' + cmtid),
	            
	            //성공시
	            success : function(code, data)
	            {
	                if(code=='y')
	                {
	                    cmtItemList.removeListItem(cmtItem);
	                
	                    //댓글 개수 감소
	                    var totCnt = $('#comment_total_count').text();
	                    $('#comment_total_count').text(Number(totCnt)-1);
	                
	                    //iResizeManage();
	                }
	                else alert(data);
	            }, 
	            
	            error : function(xhr, status, error)
	            {
	                alert(status + ":" + xhr.status);
	            }
	        });
	       
	        return false; 
	    });
	}
}())
</script>