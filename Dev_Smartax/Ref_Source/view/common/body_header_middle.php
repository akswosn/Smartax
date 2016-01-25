<div class="header-middle">
	<div class="header-middle-inner">
		<img class="header-middle-product-img" src="./img/common/img_product_02x648.png" alt="태극회계 프로그램 이미지">
		<img class="header-middle-product-txt" src="./img/common/txt_product_01.png" alt="세계 최초 현금출납장 복식회계 프로그램은 역시 태극회계!! 차변, 대변없이 입금, 출금에 계정만 입력하면 OK!!">
	<?
		if(!DBWork::isValidUser()) {
			?>
				<a id="btn-sample" href="#"><img src="./img/common/btn_sample_03.png" alt="태극회계 체험하기"></a>
			<?
		}
	?>	
	</div>
	<?
		if(DBWork::isValidUser()) {
			?>
				<div class="header-middle-start">
					<a id="btn-start" href="#"><img src="./img/common/btn_start_01.png" alt="태극회계 시작하기"></a>
				</div>
			<?
		}
	?>
</div>
<script>
(function() {
	// 회사코드 체크
	$("#btn-start").click(function() {
        var v = $("#co_select").val();
        
        if (v) {
            if (v == -1) {
                alert('회사를 등록해주세요.');
            }
            else {
                parent.openApp($("#co_select option:selected").text(), $("#nick_name").text());
            }
        }
    });
    
    $("#btn-sample").click(function() {
    	//세션에 임시 회사 키와 유저 키 세팅 + 플래그 세팅 
    	$asoo.requestData(
	    {
	        url: './proc/member/login_ex_proc.php',
	        //postData: ('key=1'),
	        success : function(code, data)
	        {
	            if(code=='y')
	            {
	            	//체험 플레그 넣기 - 닫을때 사용  
	            	parent.Global.Ex_Flag = true;
	            	//세션에 체험 고객아이디 넣기 
        			parent.openApp("체험고객", "체험고객");
	            }
	        }, 
	
	        error : function(xhr, status, error)
	        {
	        }
	    });
    });
    
}());
</script>