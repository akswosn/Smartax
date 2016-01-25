/**
 * @author kyun
 */

var StoreInfo = 
{
	
   	//---------------------------------------------------------------------------
   	// 회원
   	//---------------------------------------------------------------------------
    USER: Ext.create('Ext.data.Store',{
    	fields: [
            { name: 'TYPE' },
            { name: 'TEXT' },
        ],
        data:[
        	{ TYPE: '00', TEXT:'전체'},
        	{ TYPE: '01', TEXT:'유료회원'},
        	{ TYPE: '02', TEXT:'무료회원'}
        ]
    }),
    
	
   	//---------------------------------------------------------------------------
   	// 회원검색 조건
   	//---------------------------------------------------------------------------
    SEARCH: Ext.create('Ext.data.Store',{
    	fields: [
            { name: 'TYPE' },
            { name: 'TEXT' }
        ],
        data:[
        	{ TYPE: '', TEXT:'전체'},
        	{ TYPE: 'user_id', TEXT:'아이디'},
        	{ TYPE: 'user_name', TEXT:'이름'},
        	{ TYPE: 'user_nick', TEXT:'성명'},
        	{ TYPE: 'user_phone', TEXT:'핸드폰'},
        	{ TYPE: 'user_addr', TEXT:'주소'}
        ]
    }),
    
    
   	//---------------------------------------------------------------------------
   	// 회원리스트
   	//---------------------------------------------------------------------------
   	
    USERLIST: Ext.create('Ext.data.Store',{
    	fields: [
    	    { name: 'uid' },
            { name: 'auth_id' },
            { name: 'user_id' },
            { name: 'user_pwd' },
            { name: 'user_name' },
            { name: 'user_nick' },
            { name: 'last_login_time' },
            { name: 'user_email' },
            { name: 'reg_date' },
            { name: 'user_farm_name' },
            { name: 'user_zip' },
            { name: 'user_addr' },
            { name: 'user_tel' },
            { name: 'user_phone' },
            { name: 'user_fax' },
            { name: 'user_homepage' }
        ]
    }),
    
	//---------------------------------------------------------------------------
   	// 회원리스트2
   	//---------------------------------------------------------------------------
   	
    USERLIST_INVALID: Ext.create('Ext.data.Store',{
    	fields: [
    	    { name: 'uid' },
            { name: 'auth_id' },
            { name: 'user_id' },
            { name: 'user_pwd' },
            { name: 'user_name' },
            { name: 'user_nick' },
            { name: 'last_login_time' },
            { name: 'user_email' },
            { name: 'reg_date' },
            { name: 'user_farm_name' },
            { name: 'user_zip' },
            { name: 'user_addr' },
            { name: 'user_tel' },
            { name: 'user_phone' },
            { name: 'user_fax' },
            { name: 'user_homepage' }
        ]
    }),
    
};
