<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Smartax Service</title>
	<link rel="shortcut icon" href="./css/main/smartax.png">
	<!-- <link rel="stylesheet" href="./css/register_agreements.css"> -->
	<script type="text/javascript">
		//다음페이지로 이동
		function nextPage(){
			if(!$('#check1').is(':checked')){
				alert('이용약관에 동의해주세요');
				return;
			}	
			if(!$('#check2').is(':checked')){
				alert('개인정보 수집 및 이용에 동의해주세요');
				return;
			}
			window.location.href = './route.php?contents=003';
		}

	</script>
</head>

<body>
		<div class="bdwrap">

		<div class="mid">
			<img src="images/register/register_head.png" width="1100" height="95">

		</div>
</div>


<!-- 상단 네이게이션, 사진바 종료 -->

<!-- 게시판 시작 -->
		<div class="menuwrap">
			<div class="agr_img">
			<img class="regi_process_img" src="images/register/register.png" style="height: 96px;">
				<div class="agr_title">
				<img src="images/register/agreement.png" />
				</div>
			</div>

			<div class="agrwrap">
				<div class="agr1">
					<div class="agr1_1">
							<div class="legalBody">
							  <div class="chapter">
							    <h1 id="##">제 1 장 총칙</h1>
							
							    <div class="clause">
							      <h2>제1조 목적</h2>
							      <p>이 약관은 TAXEN(이하 “회사” 라고 합니다)가 인터넷사이트(http://www.smartax.com)를 통하여 제공하는 이벤트관리 서비스 및 기타 정보서비스(이하 “서비스”라고 합니다.)와 관련하여 회사와 회원간의 권리와 의무, 책임사항 및 회원의 서비스이용절차에 관한 사항을 규정함을 목적으로 합니다. </p>
							    </div>
							
							    <div class="clause">
							      <h2>제2조 용어정의</h2>
							      <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
							      <p class="legalItem wide">가. "서비스"라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 "회원"이 이용할 수 있는 스마택스 및 스마택스 관련 제반 서비스를 의미합니다.</p>
							      <p class="legalItem wide">나. "회원"이라 함은 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다.</p>
							      <p class="legalItem wide">다. "아이디(ID)"라 함은 "회원"의 식별과 "서비스" 이용을 위하여 "회원"이 정하고 "회사"가 승인하는 문자와 숫자의 조합을 의미합니다.</p>
							      <p class="legalItem wide">라. "비밀번호"라 함은 "회원"이 부여 받은 "아이디와 일치되는 "회원"임을 확인하고 비밀보호를 위해 "회원" 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</p>
							      <p class="legalItem wide">마. "유료서비스"라 함은 "회사"가 유료로 제공하는 서비스를 의미합니다.</p>
							      <p class="legalItem wide">바. "포인트"라 함은 서비스의 효율적 이용을 위해 회사가 임의로 책정 또는 지급, 조정할 수 있는 재산적 가치가 없는 "서비스" 상의 가상 데이터를 의미합니다.</p>
							      <p class="legalItem wide">사. "게시물"이라 함은 "회원"이 "서비스"를 이용함에 있어 "서비스상"에 게시한 부호ㆍ문자ㆍ음성ㆍ음향ㆍ화상ㆍ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</p>
							      <p class="legalItem wide">아. “제휴업체”란 회사와 별도의 계약을 맺고 회사와 함께, 또는 회사로부터 위탁을 받아 서비스를 제공하는 개인, 단체 또는 회사를 말합니다.</p>
							    </div>
							
							    <div class="clause">
							      <h2>제3조 약관의 명시, 효력 및 변경</h2>
							      <p class="legalItem wide">가. 회사는 이 약관을 서비스를 이용하고자 하는 자와 회원이 알 수 있도록 서비스가 제공되는 인터넷사이트 (http://www.smartax.com) 화면에 게시합니다.</p>
							      <p class="legalItem wide">나. 회사는 본 약관을 관련법령을 위배하지 않는 범위에서 수시로 개정할 수 있습니다. 개정된 약관은 온라인에 명시됨으로써 효력을 발생하며 가 항과 같은 방식으로 공시합니다.</p>
							      <p class="legalItem wide">다. 본 약관에 동의하는 것은 정기적으로 서비스를 방문하여 본 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 회사에서 책임지지 않습니다.</p>
							      <p class="legalItem wide">라. 회사가 이 약관을 개정하는 경우에는 개정된 약관의 적용일자 및 개정사유를 명시하여 그 적용일자 7일 이전부터 적용일자 전일까지 위 가항의 방법으로 공지합니다.</p>
							      <p class="legalItem wide">마. 회원이 개정된 약관에 동의하지 않는 경우 회원은 탈퇴(해지)를 할 수 있으며. 변경된 약관의 효력 발생일로부터 7일 이후에도 거부의사를 표시하지 아니하고 서비스를 계속 이용할 경우 개정된 약관에 동의한 것으로 간주합니다.</p>
							      <p class="legalItem wide">바. 이 약관은 회사와 회원간에 성립되는 서비스이용계약의 기본약정입니다. 회사는 필요한 경우 특정 서비스에 관하여 적용될 사항(이하 "개별약관"이라고 합니다)을 정하여 미리 공지할 수 있습니다. 회원이 이러한 개별약관에 동의하고 특정 서비스를 이용하는 경우에는 개별약관이 우선적으로 적용되고, 이 약관은 보충적인 효력을 갖습니다. 개별약관의 변경에 관해서는 위 나 항을 준용합니다.</p>
							    </div>
							
							    <div class="clause">
							      <h2>제4조 약관 외 준칙</h2>
							      <p class="legalItem wide">가. 본 약관은 회사가 제공하는 서비스에 관한 별도의 이용안내와 함께 적용합니다.</p>
							      <p class="legalItem wide">나. 이 약관에 명시되지 않은 사항에 대해서는 관계법령 및 회사가 정한 서비스의 세부이용지침 등의 규정에 의합니다.</p>
							    </div>
							
							    <div class="clause">
							      <h2>제5조 회원에 대한 통지</h2>
							      <p class="legalItem wide">가. 회사 및 회사와 제휴한 업체가 회원에게 통지하는 경우, 회원에게 전자우편 및 기타 방법을 통해 할 수 있습니다. 이 때 회원이 회사에 알린 연락처 중 가장 최근의 정보를 활용하여 통지하며, 이로써 적법한 통지를 완료한 것으로 봅니다.</p>
							      <p class="legalItem wide">나. 회사 및 제휴업체가 불특정 다수의 회원에 대한 통지를 하는 경우는 7일 이상의 기간 동안 인터넷사이트에 공지함으로써 제1항에 따른 개별 통지에 갈음할 수 있습니다.</p>
							    </div>
							  
							  </div>
							
							
							<br />
							  <div class="chapter">
							    <h1 id="##">제 2 장 서비스이용계약의 체결</h1>
							
							    <div class="clause">
							      <h2>제6조 서비스이용계약의 체결</h2>
							      <p class="legalItem wide">가. 이용계약은 회원으로 등록하여 서비스를 이용하려는 자(이하 가입신청자)의 본 약관 내용에 대한 동의와 가입신청에 대하여 회사가 이용을 승낙함으로써 성립합니다.</p>
							      <p class="legalItem wide">나. 회원으로 등록하여 서비스를 이용하려는 자는 서비스 가입신청 시 본 약관을 읽고 아래에 있는 "약관 동의"를 체크하는 것으로 본 약관에 대한 동의 의사 표시를 합니다.</p>
							      <p class="legalItem wide">다. 약관을 읽지 않음으로 발생할 수 있는 피해의 책임은 전적으로 회원에게 있습니다.</p>
							      <p class="legalItem wide">라. 이용계약의 성립 시기는 "회사"가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.</p>
							      <p class="legalItem wide">마. "회사"는 "회원"에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제7조 서비스이용신청</h2>
							      <p class="legalItem wide">가. 서비스를 이용하고자 하는 자는 아래 사항을 회사가 온라인으로 제공하는 가입신청양식에 따라 기재하여야 합니다. 가입신청시 기재사항은 이용신청자가 개인, 외국인 또는 사업자인지 여부에 따라 구분됩니다.</p>
							      <div class="clause">
							        <p class="legalItem">A. 개인회원의 경우 필수기재항목</p>
							        <div class="clause">
							          <p class="legalItem">i. 성명</p>
							          <p class="legalItem">ii. 아이디(E-MAIL주소)</p>
							          <p class="legalItem">iii. 비밀번호</p>
							          <p class="legalItem">iv. 휴대전화번호</p>
							        </div>
							        <p class="legalItem">B. 사업자회원인 경우 필수기재항목</p>
							        <div class="clause">
							          <p class="legalItem">i. 상호명</p>
							          <p class="legalItem">ii. 대표자성명</p>
							          <p class="legalItem">iii. 사업장주소</p>
							          <p class="legalItem">iv. 전화번호</p>
							          <p class="legalItem">v. 담당자휴대전화번호</p>
							          <p class="legalItem">vi. 팩스번호</p>
							          <p class="legalItem">vii. 아이디 (E-MAIL주소)</p>
							          <p class="legalItem">viii. 비밀번호</p>
							          <p class="legalItem">ix. 사업자등록번호(개인사업자, 법인포함) 또는 법인등록번호(법인인 경우)</p>
							          <p class="legalItem">x. 업태</p>
							          <p class="legalItem">xi. 종목</p>
							          <p class="legalItem">xii. 사업자등록증 사본</p>
							          <p class="legalItem">xiii. 결제정산금액 입금통장 사본</p>
							        </div>
							      </div>
							      <p class="legalItem wide">나. 회원으로 등록하여 서비스를 이용하려는 자는 반드시 본인의 정보를 거짓없이 기재하여야 합니다. 
							        본인의 정보로 등록하지 않은 회원은 법적인 보호를 받을 수 없으며, 서비스 이용 시에 불이익을 당할 수 있습니다. 또한 서비스에서의 어떠한 권리도 주장할 수 없습니다.</p>
							      <p class="legalItem wide">다. 회사는 회원가입시의 실명확인을 위하여 실명확인 조치를 할 수 있습니다.</p>
							      <p class="legalItem wide">라. 타인의 명의(이름, 회사명, 단체명)를 도용하여 이용신청을 한 회원의 모든 ID는 삭제되며, 관계법령에 따라 처벌을 받을 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제8조 이용신청의 승낙</h2>
							      <p class="legalItem wide">가. "회사"는 "가입신청자"의 신청에 대하여 "서비스" 이용을 승낙함을 원칙으로 합니다. 다만, "회사"는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.</p>
							      <div class="clause">
							        <p class="legalItem">A. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만, 회원자격 상실 후 1년이 경과한 자로서 "회사"의 회원 재가입 승낙을 얻은 경우에는 예외로 함.</p>
							        <p class="legalItem">B. 실명이 아니거나 타인의 명의를 이용한 경우</p>
							        <p class="legalItem">C. 허위의 정보를 기재하거나, "회사"가 제시하는 내용을 기재하지 않은 경우</p>
							        <p class="legalItem">D. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</p>
							      </div>
							      <p class="legalItem wide">나. 제 “가” 항에 따른 신청에 있어 "회사"는 "회원"의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.</p>
							      <p class="legalItem wide">다. "회사"는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</p>
							      <p class="legalItem wide">라. 제2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, "회사"는 원칙적으로 이를 가입신청자에게 알리도록 합니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제9조 서비스의 위탁</h2>
							      <p>회사는 필요하다고 인정하는 경우 서비스의 일부를 제휴업체에 위탁할 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제10조 개인정보보호정책</h2>
							      <p class="legalItem wide">가. 회사는 관계법령이 정하는 바에 따라 회원등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력을 합니다.</p>
							      <p class="legalItem wide">나. 회원의 개인정보보호에 관하여 관계법령 및 회사가 정하는 개인정보취급방침에 정한 바에 따릅니다. 
							          단, 회원의 귀책사유로 인해 노출된 정보에 대해 회사는 일체의 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">다. 회사는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 파일 등 위법한 자료를 등록 배포할 경우 관련기관의 요청이 있을 시 회원의 자료를 열람 및 해당 자료를 관련기관에 제출할 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제11조 회원정보의 변경</h2>
							      <p class="legalItem wide">가. "회원"은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 실명, 아이디 등은 수정이 불가능합니다.</p>
							      <p class="legalItem wide">나. "회원"은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 "회사"에 대하여 그 변경사항을 알려야 합니다.</p>
							      <p class="legalItem wide">다. 제2항의 변경사항을 "회사"에 알리지 않아 발생한 불이익에 대하여 "회사"는 책임지지 않습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제12조 이용자ID 부여 및 변경 등</h2>
							      <p class="legalItem wide">가. 회사는 이용고객에 대하여 약관에 정하는 바에 따라 이용자 ID를 부여합니다.</p>
							      <p class="legalItem wide">나. 이용자ID는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경하고자 하는 경우에는 해당 ID를 해지하고 재가입해야 합니다.</p>
							      <p class="legalItem wide">다. 이용자ID는 이용자 본인의 동의 하에 회사가 운영하는 자사 사이트의 회원ID와 연결될 수 있습니다.</p>
							      <p class="legalItem wide">라. 이용자ID는 다음 각 호에 해당하는 경우에는 이용고객 또는 회사의 요청으로 변경할 수 있습니다.</p>
							      <div class="clause">
							        <p class="legalItem">A. 타인에게 혐오감을 주거나 미풍양속에 어긋나는 경우</p>
							        <p class="legalItem">B. 기타 합리적인 사유가 있는 경우</p>
							      </div>
							      <p class="legalItem wide">마. 서비스 이용자ID 및 비밀번호의 관리책임은 이용자에게 있습니다. 
							          이를 소홀이 관리하여 발생하는 서비스 이용상의 손해 또는 제3자에 의한 부정이용 등에 대한 책임은 이용자에게 있으며 회사는 그에 대한 책임을 일절 지지 않습니다.</p>
							      <p class="legalItem wide">바. 기타 이용자 개인정보 관리 및 변경 등에 관한 사항은 서비스별 안내에 정하는 바에 의합니다.</p>
							    </div>
							  </div>
							
							
							<br />
							  <div class="chapter">
							    <h1 id="x453ef778legal-agreement-3">제 3 장 계약 당사자의 의무</h1>
							
							    <div class="clause">
							      <h2>제13조 회사의 의무</h2>
							      <p class="legalItem wide">가. 회사는 관련법과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다합니다.</p>
							      <p class="legalItem wide">나. 회사는 회원이 안전하게 서비스를 이용할 수 있도록 보안 시스템을 구축하며 개인정보보호정책을 공시하고 준수합니다.</p>
							      <p class="legalItem wide">다. 회사는 회원이 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.</p>
							      <p class="legalItem wide">라. 회사는 서비스 제공과 관련하여 알고 있는 회원의 신상정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 단, 관계법령에 의한 수사상의 목적으로 관계기관으로부터 요구 받은 경우나 방송통신심의위원회의 요청이 있는 경우 등 법률의 규정에 따른 적법한 절차에 의한 경우에는 그러하지 않습니다.</p>
							      <p class="legalItem wide">마. 회사는 정보통신망 이용촉진 및 정보보호에 관한 법률, 통신비밀보호법 등 서비스의 운영, 유지와 관련 있는 법규를 준수합니다.</p>
							    </div>
							
							    <div class="clause">
							      <h2>제14조 이용자의 의무</h2>
							      <p class="legalItem wide">가. 이용자는 회원가입 신청 또는 회원정보 변경시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며, 허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다.</p>
							      <p class="legalItem wide">나. 회원은 본 약관에서 규정하는 사항과 기타 회사가 정한 제반 규정, 공지사항 등 회사가 공지하는 사항 및 관계법령을 준수하여야 하며, 기타 회사의 업무에 방해가 되는 행위, 회사의 명예를 손상시키는 행위를 해서는 안됩니다.</p>
							      <p class="legalItem wide">다. 회원은 주소, 연락처, 전자우편 주소 등 이용계약사항이 변경된 경우에 해당 절차를 거쳐 이를 회사에 즉시 알려야 합니다.</p>
							      <p class="legalItem wide">라. 회사가 관계법령 및 '개인정보 보호정책'에 의거하여 그 책임을 지는 경우를 제외하고 회원에게 부여된 ID의 비밀번호 관리소홀, 부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다.</p>
							      <p class="legalItem wide">마. 회원은 회사의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며, 그 영업활동의 결과에 대해 회사는 책임을 지지 않습니다. 또한 회원은 이와 같은 영업활동으로 회사가 손해를 입은 경우, 회원은 회사에 대해 손해배상의무를 지며, 회사는 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다.</p>
							      <p class="legalItem wide">바. 회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며 이를 담보로 제공할 수 없습니다.</p>
							      <p class="legalItem wide">사. 회원은 회사 및 제 3자의 지적 재산권을 침해해서는 안됩니다.</p>
							      <p class="legalItem wide">아. 회원은 다음 각 호에 해당하는 행위를 하여서는 안되며, 해당 행위를 하는 경우에 회사는 사전통보 없이 회원의 서비스 이용제한 및 적법 조치를 포함한 제재를 가할 수 있습니다.</p>
							      <div class="clause">
							        <p class="legalItem">A. 회원가입 신청 또는 회원정보 변경 시 허위내용을 등록하는 행위</p>
							        <p class="legalItem">B. 다른 이용자의 ID, 비밀번호, E-MAIL, 연락처를 도용하는 행위</p>
							        <p class="legalItem">C. 이용자 ID를 타인과 거래하는 행위</p>
							        <p class="legalItem">D. 회사의 운영진, 직원 또는 관계자를 사칭하는 행위</p>
							        <p class="legalItem">E. 회사로부터 특별한 권리를 부여받지 않고 회사의 클라이언트 프로그램을 변경하거나, 회사의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위</p>
							        <p class="legalItem">F. 서비스에 위해를 가하거나 고의로 방해하는 행위</p>
							        <p class="legalItem">G. 본 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 서비스 이용 외의 목적으로 복제하거나, 이를 출판 및 방송 등에 사용하거나, 제 3자에게 제공하는 행위</p>
							        <p class="legalItem">H. 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</p>
							        <p class="legalItem">I. 모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</p>
							        <p class="legalItem">J. 용도에 대한 자세하고 정확한 설명 없이 Active X, 스파이웨어, 애드웨어등을 무조건 설치하도록 유도하는 행위</p>
							        <p class="legalItem">K. 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위</p>
							        <p class="legalItem">L. 회사의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위</p>
							        <p class="legalItem">M. 범죄와 결부된다고 객관적으로 판단되는 행위</p>
							        <p class="legalItem">N. 본 약관을 포함하여 기타 회사가 정한 제반 규정 또는 이용 조건을 위반하는 행위</p>
							        <p class="legalItem">O. 기타 관계법령에 위배되는 행위</p>
							      </div>
							    </div>
							  </div>
							
							<br />
							  <div class="chapter">
							    <h1 id="x453ef778legal-agreement-4">제 4 장 서비스 이용</h1>
							
							    <div class="clause">
							      <h2>제15조 서비스 이용시간</h2>
							      <p class="legalItem wide">가. 서비스 이용시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, 회사는 시스템 정기점검, 증설 및 교체를 위해 회사가 정한 날이나 시간에 서비스를 일시 중단할 수 있으며 예정된 작업으로 인한 서비스 일시 중단은 사전에 공지합니다.</p>
							      <p class="legalItem wide">나. 회사는 다음 경우에 대하여 사전 공지나 예고 없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.</p>
							        <p class="legalItem">A. 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우</p>
							        <p class="legalItem">B. 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우</p>
							        <p class="legalItem">C. 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우</p>
							      <p class="legalItem wide">다. 전항에 의한 서비스 중단의 경우 회사는 사전에 공지사항 등을 통하여 회원에게 통지합니다. 단, 회사가 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 예외로 합니다.</p>
							      <p class="legalItem wide">라. 회사는 서비스를 특정범위로 분할하여 범위 별로 이용가능시간을 별도로 지정할 수 있으며 이 경우 그 내용을 사전 공지합니다.</p>
							    </div>
							
							      
							    <div class="clause">
							      <h2>제16조 서비스 이용해지</h2>
							      <p class="legalItem wide">가. 회원이 이용계약을 해지하고자 하는 경우에는 회원 본인이 온라인을 통하여 등록 해지 신청을 하여야 합니다.</p>
							      <p class="legalItem wide">나. 회사가 제3자에게 합병 또는 분할 합병되거나 서비스를 제3자에게 양도함으로써 서비스의 제공 주체가 변경되는 경우, 회사는 사전에 이메일과 공지 사항으로 회원에게 통지합니다. 이 경우 합병, 분할합병, 서비스 양도에 반대하는 회원은 서비스 이용계약을 해지할 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제17조 서비스 이용제한</h2>
							      <p class="legalItem wide">가. 회원은 다음 각 호에 해당하는 행위를 하여서는 아니 되며 해당 행위를 한 경우에 회사는 사전통보 없이 회원의 서비스 이용 제한 및 적법한 조치를 취할 수 있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수 있습니다. (제14조 “아”항과 동일)</p>
							      <div class="clause">
							        <p class="legalItem">A. 회원가입 신청 또는 회원정보 변경 시 허위내용을 등록하는 행위</p>
							        <p class="legalItem">B. 다른 이용자의 ID, 비밀번호, E-MAIL, 연락처를 도용하는 행위</p>
							        <p class="legalItem">C. 이용자 ID를 타인과 거래하는 행위</p>
							        <p class="legalItem">D. 회사의 운영진, 직원 또는 관계자를 사칭하는 행위</p>
							        <p class="legalItem">E. 회사로부터 특별한 권리를 부여받지 않고 회사의 클라이언트 프로그램을 변경하거나, 회사의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위</p>
							        <p class="legalItem">F. 서비스에 위해를 가하거나 고의로 방해하는 행위</p>
							        <p class="legalItem">G. 본 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 서비스 이용 외의 목적으로 복제하거나, 이를 출판 및 방송 등에 사용하거나, 제 3자에게 제공하는 행위</p>
							        <p class="legalItem">H. 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</p>
							        <p class="legalItem">I. 모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</p>
							        <p class="legalItem">J. 용도에 대한 자세하고 정확한 설명 없이 Active X, 스파이웨어, 애드웨어등을 무조건 설치하도록 유도하는 행위</p>
							        <p class="legalItem">K. 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위</p>
							        <p class="legalItem">L. 회사의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위</p>
							        <p class="legalItem">M. 범죄와 결부된다고 객관적으로 판단되는 행위</p>
							        <p class="legalItem">N. 본 약관을 포함하여 기타 회사가 정한 제반 규정 또는 이용 조건을 위반하는 행위</p>
							        <p class="legalItem">O. 기타 관계법령에 위배되는 행위</p>
							      </div>
							      <p class="legalItem wide">나. 회원은 전항의 귀책사유로 인하여 회사나 다른 회원에게 입힌 손해를 배상할 책임이 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제18조 게시물의 관리</h2>
							      <p class="legalItem wide">가. 회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수 있습니다.</p>
							      <div class="clause">
							        <p class="legalItem">A. 다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우</p>
							        <p class="legalItem">B. 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우</p>
							        <p class="legalItem">C. 불법복제 또는 해킹을 조장하는 내용인 경우</p>
							        <p class="legalItem">D. 영리를 목적으로 하는 광고일 경우</p>
							        <p class="legalItem">E. 범죄와 결부된다고 객관적으로 인정되는 내용일 경우</p>
							        <p class="legalItem">F. 다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인 경우</p>
							        <p class="legalItem">G. 회사에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우</p>
							        <p class="legalItem">H. 기타 관계법령에 위배된다고 판단되는 경우</p>
							      </div>
							      <div class="clause">
							        <h3>[모임 게시물 원칙]</h3>
							        <p class="legalItem wide">모임 게시물의 범위는 모임페이지 개설을 위해서 작성되는 모든 내용에 해당합니다.</p>
							        <p class="legalItem">A. 온오프믹스 내에서 접수하지 않는 모임은 '외부접수'로 판단합니다.</p>
							        <p class="legalItem">B. '모임요약내용' 또는 '모임세부설명'에 외부접수페이지로 가능 링크가 존재할 경우 '외부접수'로 판단합니다.</p>
							        <p class="legalItem">C. 외부접수를 사용하는 모임은 '외부접수' 로 분류하여 관리합니다.</p>
							        <p class="legalItem">D. 무료모임을 개설하고 '모임요약내용' 또는 '모임세부설명'에 비용을 받는 것으로 확인되어 지는 경우 유료모임으로 판단하여 유료모임으로 분류하여 관리 합니다.</p>
							      </div>
							    </div>
							
							
							    <div class="clause">
							      <h2>제19조 게시물에 대한 저작권</h2>
							      <p class="legalItem wide">가. 회원이 서비스 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 회사는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지 아니하며, 또한 서비스 내의 게재권을 갖습니다.</p>
							      <p class="legalItem wide">나. 회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.</p>
							      <p class="legalItem wide">다. 회사는 회원이 게시하거나 등록하는 서비스 내의 내용물, 게시 내용에 대해 제15조 각 호에 해당한다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제20조 서비스 내 링크에 대한 보증</h2>
							      <p class="legalItem wide">가. 회사가 제공하는 서비스 내에는 다양한 배너와 링크(Link)를 포함하고 있습니다. 많은 경우 타 사이트의 페이지와 연결되어 있으며, 이는 광고주와의 계약관계에 의하거나 제공받은 콘텐츠의 출처를 밝히기 위한 조치입니다. 서비스 내에 포함되어 있는 링크를 클릭하여 타 사이트의 페이지로 옮겨갈 경우 해당 사이트의 개인정보보호정책은 회사와 무관하므로 새로 방문한 사이트의 정책을 검토하셔야 합니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제21조 정보의 제공</h2>
							      <p class="legalItem wide">가. 회사는 회원에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신우편 등의 방법으로 회원에게 제공할 수 있습니다.</p>
							      <p class="legalItem wide">나. 회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 추가적인 개인 정보를 요구할 수 있습니다.</p>
							    </div>
							
							
							    <div class="clause">
							      <h2>제22조 광고게재 및 광고주와의 거래</h2>
							      <p class="legalItem wide">가. 회사가 회원에게 서비스를 제공할 수 있는 서비스 투자기반의 일부는 광고게재를 통한 수익으로부터 나옵니다. 회원은 서비스 이용시 노출되는 광고게재에 대해 동의합니다.</p>
							      <p class="legalItem wide">나. 회사는 서비스상에 게재되어 있거나 본 서비스를 통한 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다.</p>
							    </div>
							  </div>
							
							<br />
							  <div class="chapter">
							    <h1 id="x453ef778legal-agreement-5">제 5 장 손해배상 및 기타사항</h1>
							
							    <div class="clause">
							      <h2>제23조 손해배상</h2>
							      <p>회사는 서비스에서 무료로 제공하는 서비스의 이용과 관련하여 개인정보보호정책에서 정하는 내용에 해당하지 않는 사항에 대하여는 어떠한 손해도 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">가. 회사는 회사의 고의나 중대한 과실로 인하여 회원이나 제3자에게 발생한 손해에 대하여 회원이 회사에 지급한 이용료의 범위 내에서만 손해를 배상합니다. 예를 들어 회원이 회사의 서비스를 이용하여 수행하는 영업행위와 관련된 손해, 회원이 저장, 전송하는 정보의 가치에 해당하는 손해, 회원이 회사의 서비스를 통하여 입게 되는 회원의 컴퓨터나 기타 하드웨어나 소프트웨어, 자료 등의 손상으로 인한 손해 등에 대해서는 회원이 미리 회사에 그 사실을 알렸다 하더라도 회사는 손해배상을 하지 않습니다.</p>
							      <p class="legalItem wide">나. 본 서비스로 인해 손해배상 청구를 하고자 할 때 회원은 손해배상 청구사유가 발생한 날로부터 3개월 이내에 손해배상 청구사유, 금액, 산출근거를 기재하여 회사에 서면으로 제출하여야 합니다.</p>
							      <p class="legalItem wide">다. 회원이 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 이 약관을 위반한 회원은 회사에 발생하는 모든 손해를 배상하여야 합니다.</p>
							    </div>
							      
							    <div class="clause">
							      <h2>제24조 면책조항</h2>
							      <p class="legalItem wide">가. 회사는 천재지변, 전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다.</p>
							      <p class="legalItem wide">나. 회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.</p>
							      <p class="legalItem wide">다. 회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.</p>
							      <p class="legalItem wide">라. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">마. 회사는 이용자의 컴퓨터 오류에 의해 손해가 발생한 경우, 또는 회원이 신상정보 및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">바. 회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">사. 회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다. 또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게 되는 정신적 피해에 대하여 보상할 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">아. 회사는 회원이 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을 지지 않습니다.</p>
							      <p class="legalItem wide">자. 회사는 이용자 상호간 및 이용자와 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.</p>
							      <p class="legalItem wide">차. 회사에서 회원에게 무료로 제공하는 서비스의 이용과 관련해서는 어떠한 손해도 책임을 지지 않습니다.</p>
							    </div>
							      
							    <div class="clause">
							      <h2>제25조 분쟁의 해결</h2>
							      <p class="legalItem wide">가. 회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 노력을 합니다.</p>
							      <p class="legalItem wide">나. 회사는 회원으로부터 제출되는 불만사항 및 의견을 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 회원께 그 사유와 처리 일정을 즉시 통보해 드립니다.</p>
							    </div>
							      
							    <div class="clause">
							      <h2>제26조 재판권 및 준거법</h2>
							      <p class="legalItem wide">가. 이 약관에 명시되지 않은 사항은 대한민국 관계법령과 상관습에 따릅니다.</p>
							      <p class="legalItem wide">나. 회사의 정액 서비스 회원 및 기타 유료 서비스 이용 회원의 경우 회사가 별도로 정한 약관 및 정책에 따릅니다.</p>
							      <p class="legalItem wide">다. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 회사의 본점 소재지를 관할하는 법원을 관할 법원으로 합니다.</p>
							    </div>
							  </div>
							    
							  <div class="supplementary">
							    <h2>[부칙] (2007. 10. 20)</h2>
							    <div class="legalItem">(시행일) 본 약관은 2007년 10월 20일부터 시행합니다.</div>
							  </div>
							  <div class="supplementary">
							    <h2>[부칙] (2010. 06. 18)</h2>
							    <div class="legalItem">(시행일) 본 약관은 2010년 06월 18일부터 시행합니다.</div>
							  </div>
							  <div class="supplementary">
							    <h2>[부칙] (2013. 02. 14)</h2>
							    <div class="legalItem">(시행일) 본 약관은 2013년 02월 14일부터 시행합니다.</div>
							  </div>
							  <div class="supplementary">
							    <h2>[부칙] (2014. 04. 10)</h2>
							    <div class="legalItem">(시행일) 본 약관은 2014년 04월 10일부터 시행합니다.</div>
							  </div>
							  <div class="supplementary">
							    <h2>[부칙] (2014. 06. 02)</h2>
							    <div class="legalItem">전자금융거래이용약관이 삭제 되었습니다.</div>
							    <div class="legalItem">(시행일) 본 약관은 2014년 06월 02일부터 시행합니다.</div>
							  </div>
							
							</div>

					</div><br>
					<input class="chktext" type="checkbox" id="check1"> 
					<label for="check1">이용약관에 동의 합니다.</label>
				</div>
				<div class="agr2">
					<div class="agr2_1">
							  <div class="legalToc">
							    <p>[목차]</p>
							    <p>0. <a href="#legal-privacyMin-0">수집하는 개인정보의 항목</a></p>
							    <p>1. <a href="#legal-privacyMin-1">개인정보의 수집 및 이용목적</a></p>
							    <p>2. <a href="#legal-privacyMin-2">개인정보의 보유 및 이용기간</a></p>
							
							
							</div><!-- .legalToc end -->
							
							<div class="legalBody">
							  <div class="clause">
							    <h2 id="legal-privacyMin-0"> 수집하는 개인정보의 항목</h2>
							
							    <p>1. 회원구분에 따라서 다음의 목적을 위해서 회원정보를 수집, 이용하고 있습니다.  </p>
							  </div>
							  <div class="clause">
							    <p>가. 모든 회원공통</p>
							    <div class="clause">
							      <p class="legalItem extraWide">필수 : 성명, E-MAIL, 비밀번호, 휴대전화번호, 마이페이지주소</p>
							      <p class="legalItem extraWide">선택 : 이용정보 - 성별,나이,거주지역, 참여가능한 행사시간, 관심카테고리, 홈페이지, SNS 정보 ( 페이스북, 트위터, 구글, 미투데이, 요즘 )</p>
							    </div>
							
							    <p>나. 개설자회원 (개인)</p>
							    <div class="clause">
							      <p class="legalItem extraWide">필수 : 정산정보 - 신분증 사본, 결제 정산용 통장사본</p>
							    </div>
							
							    <p>다. 개설자회원 (법인) </p>
							    <div class="clause">
							      <p class="legalItem extraWide">필수 : 기업정보 - 회사명, 회사주소, 회사전화번호, 회사 FAX, 대표자명, 사업자등록번호, 업태, 종목, 담당자 이름, 담당자 E-MAIL, 담당자 휴대전화</p>
							    </div>
							    <p>라. 참석자회원</p>
							
							    <div class="clause">
							      <p>개인정보의 수집 및 이용목적</p>
							    </div>
							
							    <p class="legalItem wide">2. 기타 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다. </p>
							    <div class="clause">
							      <p class="legalItem wide">- 서비스 이용기록, 접속 로그, 쿠키, 접속IP 정보, 결제기록: 부정 이용 방지, 비인가 사용 방지 등</p>
							    </div>
							    <p class="legalItem wide">3. 회원님의 기본적 인권 침해의 우려가 있는 민감정보 (범죄경력, 유전정보 등)를 수집하지 않습니다.</p>
							    <p class="legalItem wide">4. 회원님이 제공하신 모든 정보는 상기 목적에 필요한 용도 이외로는 사용되지 않으며, 수집정보의 범위나 사용목적, 용도가 변경될 시에는 반드시 회원님들께 사전동의를 구할 것 입니다. </p>
							  </div>
							  <div class="clause">
							    <h2 id="legal-privacyMin-1">개인정보의 보유 및 이용목적</h2>
							
							    <p>1.개인정보의 수집 및 이용 목적</p>
							    <div class="clause">
							
							      <p>"개인정보"라 함은 생존하는 개인에 관한 정보로, 성명, 이메일 주소, 전화번호 등 개인을 식별할 수 있는 정보를 말합니다.</p>
							      <p>대부분의 온오프믹스 서비스는 별도의 사용자 등록이 없이 언제든지 볼 수 있습니다.</p>
							      <p>그러나 회사는 회원서비스(이벤트 생성과 같이 현재 제공 중이거나 향후 제공될 로그인 기반의 서비스)등을 통하여 이용자들에게 맞춤 식 서비스를 비롯한 보다 더 향상된 양질의 서비스를 제공하기 위하여 이용자 개인의 정보를 수집하고 있습니다.</p>
							      <p>회사는 이용자의 사전 동의 없이는 이용자의 개인 정보를 공개하지 않으며, 수집된 정보는 아래와 같이 이용하고 있습니다.</p>
							      
							      <div class="clause">
							        <p class="legalItem wide">가. 이용자들의 개인정보를 기반으로 보다 더 유용한 서비스를 개발할 수 있습니다. 회사는 신규 서비스개발이나 콘텐츠의 확충 시에 기존 이용자들이 회사에 제공한 개인정보를 바탕으로 개발해야 할 서비스의 우선 순위를 보다 더 효율적으로 정하고, 회사는 이용자들이 필요로 할 콘텐츠를 합리적으로 선택하여 제공할 수 있습니다.</p>
							        <p class="legalItem wide">나. 회사가 제공하는 각종 정보 및 서비스 등은 대부분 무료입니다. 회사는 이러한 무료 서비스를 제공하기 위해 광고를 유치할 수 있으며 이때 이용자들에 대한 정확한 개인정보를 바탕으로 각 서비스나 메뉴 등에 적절하게 광고와 내용들을 전달할 수 있습니다. 회사는 광고주들로부터 광고를 받아 광고주들이 대상으로 하려는 이용자의 유형에 맞게 광고를 보여줄 뿐, 광고주들에게는 절대로 이용자들의 개인정보를 보여주거나 제공하지 않습니다.</p>
							        <p class="legalItem wide">다. 회사가 제공하는 서비스의 원활한 이용을 위하여 회원은 적법한 동의절차를 거쳐 SNS 업체가 연결을 위한 정보를 회사에 제공하도록 할 수 있습니다. 회사는 연결된 SNS 를 원활한 서비스 제공을 위해 사용자에게서 권한이 허락된 범위 안에서 이를 활용할 수 있으며, 허락되지 않은 범위에 대해서는 절대 활용하지 않습니다. 서비스 이용을 위하여 회원으로부터 추가적인 권한의 요청을 필요로 할 경우, 각 SNS의 인증서비스를 통하여 이에 대한 사전 동의를 반드시 구할 것 입니다.</p>
							      </div>
							    </div>
							  </div>
							  <div class="clause">
							    <h2 id="legal-privacyMin-2">개인정보의 보유 및 이용기간</h2>
							    <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 개인정보를 지체 없이 파기합니다.</p>
							    <p>단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존 합니다.</p>
							    <div class="clause">
							      <p class="legalItem wide">- 보존 항목 : 쿠키,세션</p>
							      <p class="legalItem wide">- 보존 근거 : 회사의 서비스이용약관 및 개인정보취급방침에 동의</p>
							      <p class="legalItem wide">- 보존 기간 : 로그아웃 시 삭제</p>
							    </div>
							
							    <p>그리고 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
							    <div class="clause">
							      <p class="legalItem wide">- 보존 항목 : 이름, E-MAIL, 휴대전화번호, 비밀번호, 이용정보, 정산정보, 기업정보</p>
							      <p class="legalItem wide">- 보존 근거 : 회사의 서비스이용약관 및 개인정보취급방침에 동의</p>
							      <p class="legalItem wide">- 보존 기간 : 회원으로서의 자격을 유지하는 동안</p>
							    </div>
							
							    <p>[기타] </p>
							    <div class="clause">
							
							      <p class="legalItem">1) 계약 또는 청약철회 등에 관한 기록</p>
							      <div class="clause">
							        <p class="legalItem">- 보존근거: 전자상거래 등에서의 소비자보호에 관한 법률</p>
							        <p class="legalItem">- 보존기간: 5년
							          <br />( 모임/행사 참가신청 정보는 계약 정보에 해당 합니다. )</p>
							      </div>
							
							      <p class="legalItem">2) 대금결제 및 재화 등의 공급에 관한 기록</p>
							      <div class="clause">
							        <p class="legalItem">- 보존근거: 전자상거래 등에서의 소비자보호에 관한 법률</p>
							        <p class="legalItem">- 보존기간: 5년</p>
							      </div>
							
							      <p class="legalItem">3) 소비자의 불만 또는 분쟁처리에 관한 기록</p>
							      <div class="clause">
							        <p class="legalItem">- 보존근거: 전자상거래등에서의 소비자보호에 관한 법률</p>
							        <p class="legalItem">- 보존기간: 3년</p>
							      </div>
							
							      <p class="legalItem">4) 웹사이트 방문기록</p>
							      <div class="clause">
							        <p class="legalItem">-보존근거: 통신비밀보호법</p>
							        <p class="legalItem">-보존기간: 3개월</p>
							      </div>
							    </div>
							  </div>
							</div><!-- .legalBody end -->    					       	
					</div><br>
					<input class="chktext" type="checkbox" id="check2"> 
					<label for="check2">개인정보 수집 및 이용에 동의 합니다.</label>
					<br>
					<div class="regi_btn1" onclick="javascript:nextPage();">동의함 </div>
					<div class="regi_btn2" onclick="window.location.href='./route.php';">동의안함 </div>
				</div>
			</div>
		</div>
 </body>

</html>
