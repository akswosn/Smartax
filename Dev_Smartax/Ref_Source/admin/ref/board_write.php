<?php
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBBoardWork.php");

	$brdWork = new DBBoardWork();
	$brdPost = null;

	$title = '';
	$message = '';
	
	try
	{
		//wtype 이 수정하기 이면 puid 값이 셋팅된다.
		//$_GET : wtype, tbl_kind, pid, [puid]
		//wtype : 1(새글쓰기), 2(답글쓰기), 3(수정하기) 
		$brdWork->createWork($_GET, true);
		
		$wType = (int)$_GET['wtype'];
		$tblKind = $_GET['tbl_kind'];
		//수정인 경우는 수정하려는 게시글의 아이디 
		//답글인 경우는 원본의 게시글 아이디(새글인 경우는 0)
		$postid = (int)$_GET['post_id'];			
		$puid = (int)$_GET['poster_uid'];	//게시글 작성자 아이디(수정인 경우만 넘어옴)
		
		//수정인 경우는 자신의 글인지 체크
		if($wType==3)
		{
			$uid = (int)($_SESSION['uid']);
			if($uid==0) throw new Exception('Invalid Session.');
			if($uid!=$puid && $_SESSION[DBWork::adminKey]==9001 ) throw new Exception('Invalid request');
		}

		//답글이나 수정인 경우는 원본의 내용을 얻어온다.
		//2 or 3
		if($wType > 1) 
		{
			$brdPost = $brdWork->requestPost(1);//수정, 답글용으로 얻어온다.
			if($brdPost==null) throw new Exception('Board error.');
		}
		
		$brdWork->destoryWork();
	}
	catch (Exception $e)
	{
		$brdWork->destoryWork();
		echo $e->getMessage();
		exit;
	}

	//-----------------------------------------------
	//	답글이나 수정인 경우는 원본의 내용을 셋팅한다.
	//-----------------------------------------------
	//답글
	if ($wType == 2)
	{
		$title = "Re:" . Util::changeHtmlSpecialchars($brdPost->post_title);
		$message = ">>\n" . Util::changeHtmlSpecialchars($brdPost->post_message);
	}
	//수정
	else if ($wType == 3)
	{
		$title = Util::changeHtmlSpecialchars($brdPost->post_title);
		$message = Util::changeHtmlSpecialchars($brdPost->post_message);
	}
	
?>
<script src="./js/vendor/jquery.form.js"></script>
<div class="content">
    <div class="content-title">
        <h2 class="content-title-inner">
            
            <small>전국 농업인들의 사랑을 받는 태극회계 프로그램</small>
        </h2>   
    </div>
    <div class="content-inner">
        <form action="./proc/board/brd_write_proc.php" method="post">
	        <table class="board-view-01">
	            <caption>게시글 목록</caption>
	            <colgroup>
	                <col style="width:12%;">
	                <col style="width:88%;">
	            </colgroup>
	            <thead>
	                <tr>
	                    <th scope="row"><label for="brd_title">제목</label></th>
	                    <td colspan=""><input type="text" id="brd_title" name="brd_title" style="width: 860px;" value="<?=$title?>"/></td>
	                </tr>
	            </thead>
	            <tbody>
	                <tr>
	                    <td colspan="2">
							<textarea id="board_ckeditor1" name="brd_message"><?=$message?></textarea>
							<script src="./js/ckeditor/ckeditor.js"></script>
							<script>CKEDITOR.replace( 'board_ckeditor1', { width: '1022px', height: 400 });</script>
						</td>
	                </tr>
	            </tbody>
	            <tfoot>
	            	<tr>
	                    <td scope="row">
	                    	파일 업로드
	                    </td>
	                    <td colspan="">           
	                    		&nbsp;
	                    </td>
	                </tr>
	            </tfoot>
	        </table>
	        <div class="board-bottom">
	            <div class="board-button">
	                <input type="hidden" name="tbl_kind" value="<?=$tblKind?>">
					<input type="hidden" name="post_id" value="<?=$postid?>">
					<input type="hidden" name="poster_uid" value="<?=$puid?>">
					<input type="submit" class="btn-flow-black" value="저장">
					<input type="button" class="btn-flow-white" onclick="javascript:history.back();" value="취소">
	            </div>
	        </div>
        </form>
        <script>
        var file_name = "";
		function afterSuccess()
		{
			console.log("afterSuccess --> " +file_name);
			
			$('#uploadFileList').show();
			$('#uploadFileList').append("<div> http://www.uclid.co.kr/upload/"+file_name+"</div>");
		}
		
		//function to check file size before uploading.
		function beforeSubmit(){
		    //check whether browser fully supports all File API
		   if (window.File && window.FileReader && window.FileList && window.Blob)
			{
				if( !$('#uploadFile').val()) //check empty input filed
				{
					alert("파일을 선택해 주세요.")
					return false;
				}
				
				var fsize = $('#uploadFile')[0].files[0].size; //get file size
				file_name = $('#uploadFile')[0].files[0].name; //get file size
				console.log('file_name -->'+file_name);
		
				if(fsize>12000000)
				{
					alert("파일이 큽니다.");
					return false;
				}
						
				//$('#submit-btn').hide(); //hide submit button
				//$("#output").html("");  
			}
			else
			{
				//Output error to older unsupported browsers that doesn't support HTML5 File API
				alert("Please upgrade your browser, because your current browser lacks some new features we need!");
				return false;
			}
		}
				
		$(document).ready(function()
			{
				console.log("onload!!!");
				
				$('#uploadForm').submit(function() { 
					console.log('uploadForm!!');
            		file_name = '';
            		$(this).ajaxSubmit(options);  			
            		// always return false to prevent standard browser submit and page navigation 
            		return false; 
            	});
            	
            	var options = { 
        			target:   '#response',   // target element(s) to be updated with server response 
        			beforeSubmit:  beforeSubmit,  // pre-submit callback 
        			success:       afterSuccess,  // post-submit callback 
        			//uploadProgress: OnProgress, //upload progress callback 
        			resetForm: true        // reset the form after successful submit 
        		};  
			});

		</script>
		
        <div id="upload_div">
        	<form id="uploadForm" method="post" enctype="multipart/form-data" action="/proc/board/processupload.php">
				<input name="uploadFile" id="uploadFile" type="file" />
				<input type="submit" name="action" value="Upload" />
			</form>
			<div id="uploadFileList" name="uploadFileList" style="display:none;"></div>
			<div id="response" style="display:none;"></div>
        </div>
      
    </div>
</div>