/**
 * 고객관리  Store
 */
Ext.define('Smartax.store.basic.SaleCustomerInfoStore', {
	extend: 'Ext.data.Store',
	storeId: 'salesCustomerInfoStore',
	fields: [
		        {name: 'sale_id', type: 'int'},
		        {name: 'uid', type: 'string'},
		        {name: 'sale_uid', type: 'string'},
		 		{name: 'sale_code', type: 'string'},
		 		{name: 'co_nm', type: 'string'},
		 		{name: 'co_saup_no', type: 'string'},
		 		{name: 'co_tel', type: 'string'},
		 		{name: 'upload_saup_flag', type: 'string'},
		 		{name: 'upload_saup_file', type: 'string'},
		 		{name: 'upload_deapyo_flag', type: 'string'},
		 		{name: 'upload_deapyo_file', type: 'string'},
		 		{name: 'bigo', type: 'string'},
		 		{name: 'complain_comment', type: 'string'},
		 		{name: 'complain_flag', type: 'string'},
		 		{name: 'reg_date', type: 'string'},
		 		{name: 'reg_uid', type: 'string'},
		 		{name: 'tax_uid', type: 'string'},
		 		{name: 'tax_delegate', type: 'string'},
		 		{name: 'tax_account', type: 'string'},
		     ]
   
});
