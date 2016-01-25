/**
 * 
 */
Ext.define('Smartax.store.admin.AdminUserInfoStore', {
	extend: 'Ext.data.Store',
	storeId: 'adminUserInfoStore',
	fields: [
	         {name: 'uid', type: 'int'},
	         {name: 'auth_id', type: 'string'},
	         {name: 'user_id', type: 'string'},
	         {name: 'user_pwd', type: 'string'},
	         {name: 'user_name', type: 'string'},
	         {name: 'user_jumin', type: 'string'},
	         {name: 'user_phone', type: 'string'},
	         {name: 'user_valid', type: 'string'},
	         {name: 'user_email', type: 'string'},
	         {name: 'user_zip', type: 'string'},
	         {name: 'user_addr', type: 'string'},
	         {name: 'user_tel', type: 'string'},
	         {name: 'user_fax', type: 'string'},
	         {name: 'user_homepage', type: 'string'},
		]
});
