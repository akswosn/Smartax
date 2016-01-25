<?
	require_once("./class/Defines.php");
	require_once("./class/Page.php");
	require_once("./class/PageTemplate.php");
	require_once("./class/PageTemplateExpansion.php");
	
	$template = new PageTemplateExpansion();
	$contents = $_GET['contents'];
	$url = "";
	
	switch ($contents) {
		//000 ~ 099 회원관리
		case '000' : $url = './view/member/login.php'; break; //로그인
		case '001' : $url = './view/member/join.php'; break; //회원가입
		case '002' : $url = './view/member/user_info.php'; break; //내정보
		case '003' : $url = './view/member/payment_log.php'; break; //결제내역
		case '004' : $url = './view/member/point_log.php'; break; //포인트내역
		case '005' : $url = './view/member/payment.php'; break; //포인트결제
		case '006' : $url = './view/member/company_info.php'; break; //회사정보
		case '007' : $url = './view/member/company_reg.php'; break; //회사정보
		case '008' : $url = './view/member/service_info.php'; break; //서비스정보
		case '009' : $url = './view/member/service.php'; break; //서비스신청
		case '010' : $url = './view/member/password_find.php'; break; //비밀번호찾기
		
		//100 ~ 199 컨텐츠
		case '100' : $url = './view/main.php'; break; //메인
		case '101' : $url = './view/contents/company.php'; break; //산천경제연구소
		case '102' : $url = './view/contents/story.php'; break; //태극회계이야기
		case '103' : $url = './view/contents/review.php'; break; //사용후기
		case '104' : $url = './view/contents/manual.php'; break; //메뉴얼
		case '105' : $url = './view/contents/price.php'; break; //요금체계
		//200 ~ 202 게시판 (일반)
		case '200' : $url = './view/board/board_list.php'; break;
		case '201' : $url = './view/board/board_view.php'; break;
		case '202' : $url = './view/board/board_write.php'; break;
		//203 ~ 205 게시판 (FAQ)
		case '203' : $url = './view/board/faq_list.php'; break;
		case '204' : $url = './view/board/faq_view.php'; break;
		case '205' : $url = './view/board/faq_write.php'; break;
		
		default: $url = './view/main.php';
	}
	
	$template->templateContentsUrl = $url;
	$template->display();
	
	if (!$contents || $contents == '100') {
		$user_id = 0;
		$user_nick = "";
	
		if (DBWork::isValidUser()) {
			$user_id = $_SESSION[DBWork::sessionKey];
			$user_nick = $_SESSION['nickname'];
		}
	}
?>