/**
 * 고객관리  Store
 */
Ext.define('Smartax.store.basic.TaxCustomerInfoStore', {
	extend: 'Ext.data.Store',
	storeId: 'taxCustomerInfoStore',
	fields: [
		        {name: 'co_id', type: 'int'},
		        {name: 'co_uid', type: 'int'},
		        {name: 'co_nm', type: 'string'},
		        {name: 'sale_code', type: 'string'},
		        {name: 'co_saup_no', type: 'string'},
		        {name: 'co_tel', type: 'string'},
		        {name: 'co_handphone', type: 'string'},
		        {name: 'upload_saup_flag', type: 'string'},
		        {name: 'upload_saup_file', type: 'string'},
		        {name: 'upload_deapyo_flag', type: 'string'},
		        {name: 'upload_deapyo_file', type: 'string'},
		        {name: 'reg_uid', type: 'string'},
		        {name: 'reg_date', type: 'string'},
		        {name: 'bigo', type: 'string'},
		        {name: 'tax_delegate_flag', type: 'string'},
		        {name: 'tax_account_flag', type: 'string'},
		        {name: 'tax_uid', type: 'string'},
		        {name: 'hometax_id', type: 'string'},
		        {name: 'hometax_pwd', type: 'string'},
		     ]
});
