/**
 * 거래처 Store
 */
Ext.define('Smartax.store.basic.CustomerInfoStore', {
	extend: 'Ext.data.Store',
	storeId: 'customerInfoStore',
	fields: [
		        {name: 'customer_id', type: 'int'},
		        {name: 'co_id', type: 'string'},
		        {name: 'tr_nm', type: 'string'},
		 		{name: 'tr_daepyo', type: 'string'},
		 		{name: 'tr_saup_no', type: 'string'},
		 		{name: 'tr_jumin_no', type: 'string'},
		 		{name: 'tr_up', type: 'string'},
		 		{name: 'tr_jong', type: 'string'},
		 		{name: 'tr_zip', type: 'string'},
		 		{name: 'tr_addr', type: 'string'},
		 		{name: 'tr_tel', type: 'string'},
		 		{name: 'tr_phone', type: 'string'},
		 		{name: 'tr_fax', type: 'string'},
		 		{name: 'tr_email', type: 'string'},
		 		{name: 'tr_bigo', type: 'string'},
		 		{name: 'reg_date', type: 'string'},
		 		{name: 'reg_uid', type: 'string'},
		     ]
   
});
