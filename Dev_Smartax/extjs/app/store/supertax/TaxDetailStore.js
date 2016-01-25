/**
 * 부가세 매입/매출 공통 스토어
 */
 Ext.define('Smartax.store.supertax.TaxDetailStore', {
	extend: 'Ext.data.Store',
	storeId: 'taxDetailStore',
	fields: [
		        {name: 'header_id', type: 'int'},
		        {name: 'co_id', type: 'int'},
		        {name: 'customer_id', type: 'int'},
		 		{name: 'yyyymmdd', type: 'int'},
		 		{name: 'yyyy', type: 'int'},
		 		{name: 'mm', type: 'int'},
		 		{name: 'dd', type: 'int'},
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
		 		{name: 'reg_uid', type: 'string'},
		 		{name: 'reg_user_nm', type: 'string'},
		 		{name: 'item_tot', type: 'string'},
		 		{name: 'type', type: 'string'},
		 		{name: 'type_nm', type: 'string'},
		 		{name: 'item_standard', type: 'string'},//
		     ]
});