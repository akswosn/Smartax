/**
 * 부가세 매입/매출 공통 스토어
 */
 Ext.define('Smartax.store.supertax.TaxDataDownloadStore', {
		extend: 'Ext.data.Store',
		storeId: 'taxDataDownloadStore',
		fields: [
			        {name: 'co_id', type: 'int'},
			        {name: 'co_nm', type: 'string'},
			        {name: 'co_ceo_nm', type: 'string'},
			        {name: 'co_saup_no', type: 'string'},
			        {name: 'co_co_no', type: 'string'},
			        {name: 'co_tel', type: 'string'},
			        {name: 'yyyy', type: 'string'},
			        {name: 'period_flag', type: 'string'},
			        {name: 'sales_upload_flag', type: 'string'},
			        {name: 'sales_upload_pdf', type: 'string'},
			        {name: 'tax_complete_flag', type: 'string'},
			        {name: 'sales_count', type: 'int'},
			        {name: 'purchase_count', type: 'int'},
			     ]
	});
 
