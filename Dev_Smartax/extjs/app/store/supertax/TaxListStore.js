/**
 * 부가세 매입/매출 공통 스토어
 */
 Ext.define('Smartax.store.supertax.TaxListStore', {
	extend: 'Ext.data.Store',
	storeId: 'taxListStore',
	fields: [
		        {name: 'header_id', type: 'int'},
		        {name: 'co_id', type: 'int'},
		        {name: 'customer_id', type: 'int'},
		 		{name: 'yyyymmdd', type: 'string'},
		 		{name: 'amt_supply_value', type: 'string'},
		 		{name: 'amt_atax', type: 'string'},
		 		{name: 'type', type: 'string'},
		 		{name: 'bigo', type: 'string'},
		 		{name: 'reg_date', type: 'string'},
		 		{name: 'reg_uid', type: 'string'},
		 		{name: 'co_saup_no', type: 'string'},
		 		{name: 'co_nm', type: 'string'},
		 		{name: 'co_ceo_nm', type: 'string'},
		 		{name: 'co_addr', type: 'string'},
		 		{name: 'co_up', type: 'string'},
		 		{name: 'co_jong', type: 'string'},
		 		{name: 'tr_saup_no', type: 'string'},
		 		{name: 'tr_nm', type: 'string'},
		 		{name: 'tr_daepyo', type: 'string'},
		 		{name: 'tr_addr', type: 'string'},
		 		{name: 'tr_up', type: 'string'},
		 		{name: 'tr_jong', type: 'string'},
		 		{name: 'detail_id', type: 'string'},
		 		{name: 'atax_id', type: 'string'},
		 		{name: 'item_nm', type: 'string'},
		 		{name: 'item_cnt', type: 'string'},
		 		{name: 'item_danga', type: 'string'},
		 		{name: 'item_supply_value', type: 'string'},
		 		{name: 'item_atax', type: 'string'},
		 		{name: 'item_bigo', type: 'string'},
		 		{name: 'atax_type_nm', type: 'string'},
		 		{name: 'atax_type', type: 'string'},
		 		{name: 'atax_elect_flag', type: 'string'},
		 		{name: 'atax_elect_no', type: 'string'},
		 		{name: 'reg_user_nm', type: 'string'},
		 		{name: 'item_tot', type: 'string'},
		 		{name: 'item_standard', type: 'string'},//
		     ]
   
});