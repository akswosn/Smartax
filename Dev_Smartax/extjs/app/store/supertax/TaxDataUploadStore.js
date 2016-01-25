/**
 * 부가세 매입/매출 공통 스토어
 */
Ext.define('Smartax.store.supertax.TaxDataUploadStore', {
	extend: 'Ext.data.Store',
	storeId: 'taxDataUploadStore',
	fields: [
		        {name: 'co_id', type: 'int'},
		        {name: 'co_nm', type: 'string'},
		        {name: 'co_ceo_nm', type: 'string'},
		        {name: 'co_saup_no', type: 'string'},
		        {name: 'co_co_no', type: 'string'},
		        {name: 'co_tel', type: 'string'},
		        {name: 'atax_van_id', type: 'string'},
		        {name: 'yyyy', type: 'string'},
		        {name: 'sales_upload_flag', type: 'string'},
		        {name: 'period_flag', type: 'string'},
		        {name: 'sales_upload_pdf', type: 'string'},
		        {name: 'bigo', type: 'string'},
		        {name: 'reg_uid', type: 'string'},
		        {name: 'reg_date', type: 'string'},
		     ]
});
 
