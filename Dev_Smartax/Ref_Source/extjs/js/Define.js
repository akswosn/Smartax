/**
 * @author kyun
 */



var Define =
{
	JAK: 0, WJAK: 99, 					//0:작목 테이블 / 99:영농 작목 테이블
	FIRST:1, PREV:2, NEXT:3, LAST:4,	//페이징처리버튼 구분
	PAGESIZE: 20						//분개장에서 보여질 로우 수
};



var Localization_Han =
{
    //서버 요청시 오류 메시지
	Query_Error_Msg : [ '시스템 메시지' ,'서버 요청 오류입니다. 연구소로 전화주십시오.' ],
};

var MsgObj = Localization_Han;

//Ext.Msg.alert(MsgObj.Query_Error_Msg[0], MsgObj.Query_Error_Msg[1]);