<?
	require_once("./class/Utils.php");
	require_once("./class/DBWork.php");
	require_once("./class/DBMemberWork.php");
?>

<div class="header-top">
	<div class="header-top-inner">
		<h1 class="header-top-logo">
			<a href="./route.php?contents=100"><img src="./img/common/img_logo_01.png" alt="세계 최초 비차대 복식부기 시스템 산천경제연구소"></a>
		</h1>
		<span class="header-top-menu">
			<?
				if (DBWork::isValidUser())
				{
					$memWork = new DBMemberWork();
	
					try
					{
						$memWork->createWork(-1, false);
						$memWork->requestUserInfo();
						$memWork->destoryWork();
				 	}
				  	catch (Exception $e) 
					{
						$memWork->destoryWork();
						echo $e->getMessage();
						Util::serverLog($e);
						exit;
					}
					
					$userInfo = $_SESSION;
					?>
					<select id="co_select" value="<?=$co['co_id']?>">
						<?
							if (count($_SESSION['co_list']) > 0)
							{
								for ($idx = 0; $idx < count($_SESSION['co_list']); $idx++)
								{
									$co = $_SESSION['co_list'][$idx];
									?>
										<option value="<?=$co['co_id']?>"><?=$co['co_nm']?></option>";
									<?
								}
							}
							else
							{
								?><option value="-1">회사를 등록하세요.</option>'<?
							}
						?>
					</select>
					<a href="./proc/member/logout_proc.php">로그아웃</a>
					<a href="./route.php?contents=002"><span class="color-01" id="nick_name"><?=$userInfo['nickname']?></span>님정보</a>
					<a href="./route.php?contents=006">회사정보</a>
					<?
				}
				else
				{
					?>
					<a href="./route.php?contents=000">로그인</a>
					<a href="./route.php?contents=001">회원가입</a>
					<?
				}
			?>
			<!-- <a href="javascript:alert('즐겨찾기추가');">즐겨찾기추가</a> -->
		</span>
	</div>
</div>
<script>
(function() {
	//렌더될때 세션에 저장된 아이디값 셋팅
	<? if ($userInfo['co_id']) { ?> $("#co_select").val(<?=$userInfo['co_id']?>); <? } ?>
	
	//세션에 선택된 아이디값 셋팅
	function setCoId(value) {
		var v = value || $("#co_select option:selected").val();
		
		$.ajax({
	        type: 'POST',
	        url: './proc/member/user_change_coid.php',
	        data: { co_id: v },
	        dataType: 'text',
	        success : function(result) {
	            if (result != -1) {
	            	$('#co_select').val(result);
				}
	        },
	        error: function(xhr, status, error) {
	        	console.log(xhr+"//"+status+"//"+error);
	        }
	    });
	}
	
	setCoId();
	
	$("#co_select").change(function(){
		setCoId($(this).val());
	});
}());
</script>