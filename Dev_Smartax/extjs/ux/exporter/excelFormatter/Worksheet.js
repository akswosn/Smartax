/**
 * @class Ext.ux.Exporter.ExcelFormatter.Worksheet
 * @extends Object
 * Represents an Excel worksheet
 * @cfg {Ext.data.Store} store The store to use (required)
 */
Ext.define("Ext.ux.exporter.excelFormatter.Worksheet", {

	constructor : function(store, config) {
		config = config || {};

		this.store = store;

		var storeType = 1;
		//1:스토어 2:트리스토어
		var cols = store.fields == undefined ? {} : store.fields.items;
		if (config.type == 'tree')
			storeType = 2, cols = store.ownerTree == undefined ? {} : store.ownerTree.columns;

		Ext.applyIf(config, {
			hasTitle : true,
			hasHeadings : true,
			stripeRows : true,
			storeType : storeType,
			//title : Global.excelTitle,
			title : config.downloadName,
			columns : cols
		});

		Ext.apply(this, config);

		Ext.ux.exporter.excelFormatter.Worksheet.superclass.constructor.apply(this, arguments);
	},

	/**
	 * @property dateFormatString
	 * @type String
	 * String used to format dates (defaults to "Y-m-d"). All other data types are left unmolested
	 */
	dateFormatString : "Y-m-d",

	worksheetTpl : new Ext.XTemplate('<ss:Worksheet ss:Name="{title}">', '<ss:Names>', '<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />', '</ss:Names>', '<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">', '{columns}', '<ss:Row ss:Height="38">', '<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">', '<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">', '<html:B><html:U><html:Font html:Size="15">{title}', '</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />', '</ss:Cell>', '</ss:Row>', '<ss:Row ss:AutoFitHeight="1">', '{header}', '</ss:Row>', '{rows}', '</ss:Table>', '<x:WorksheetOptions>', '<x:PageSetup>', '<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />', '<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />', '<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />', '</x:PageSetup>', '<x:FitToPage />', '<x:Print>', '<x:PrintErrors>Blank</x:PrintErrors>', '<x:FitWidth>1</x:FitWidth>', '<x:FitHeight>32767</x:FitHeight>', '<x:ValidPrinterInfo />', '<x:VerticalResolution>600</x:VerticalResolution>', '</x:Print>', '<x:Selected />', '<x:DoNotDisplayGridlines />', '<x:ProtectObjects>False</x:ProtectObjects>', '<x:ProtectScenarios>False</x:ProtectScenarios>', '</x:WorksheetOptions>', '</ss:Worksheet>'),

	/**
	 * Builds the Worksheet XML
	 * @param {Ext.data.Store} store The store to build from
	 */
	render : function(store) {
		
		var rows = this.buildRows().join("");

		return this.worksheetTpl.apply({
			header : this.buildHeader(),
			columns : this.buildColumns().join(""),
			rows : rows,
			colCount : this.columns.length,
			rowCount : rows.length + 2,
			title : this.title
		});
	},

	buildColumns : function() {
		var cols = [];
		Ext.each(this.columns, function(column) {
			cols.push(this.buildColumn(column.width));
		}, this);
		return cols;
	},

	buildColumn : function(width) {
		return Ext.String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />', width || 100);
	},

	buildRows : function() {
		var rows = [];

		//트리그리드 데이터 셋팅
		if (this.storeType == 2) {
			rows = this.buildTreeRows(this.store.getRootNode());
		}

		//일반 그리드 데이터 셋팅
		else {
			this.store.each(function(record, index) {
				rows.push(this.buildRow(record, index));
			}, this);
		}
		return rows;
	},

	buildTreeRows : function(parentNode) {
		var resTreeRows = [];
		this.treeNodeSearch(parentNode, resTreeRows);
		return resTreeRows;
	},
	
	treeNodeSearch: function(parentNode, resTreeRows)
	{
		var thisObj = this;
		parentNode.eachChild(function(child) {
			if (child.isLeaf())
			{
				resTreeRows.push(thisObj.treeMakeRows(child));	
			}
			else
			{
				resTreeRows.push(thisObj.treeMakeRows(child));
				thisObj.treeNodeSearch(child, resTreeRows);
			}
		});
	},
	
	treeMakeRows: function(record)
	{
		var thisObj = this;
		this.rowStyle = (this.rowStyle == 'odd') ? 'even' : 'odd'; 
		var cells = [];
		
		Ext.each(this.columns, function(col) {
			var name = col.name || col.dataIndex;
			if (name) {
				var value = record.get(name), type = "String";
				if(col.xtype == "numbercolumn")
				{
					type = "Number";
					if(value == '0' || value == '') value = '', type = "String";		
				}
				cells.push(this.buildCell(value, type, thisObj.rowStyle).render());
			}
		}, this);
		return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
	},
	
	buildHeader : function() {
		var cells = [];

		Ext.each(this.columns, function(col) {
			var title;
			if (col.text != undefined) {
				title = col.text;
			} else if (col.name) {
				title = col.name.replace(/_/g, " ");
				title = Ext.String.capitalize(title);
			}

			cells.push(Ext.String.format('<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>', title));
		}, this);
		return cells.join("");
	},

	buildRow : function(record, index) {
		var style, cells = [];
		if (this.stripeRows === true)
			style = index % 2 == 0 ? 'even' : 'odd';

		Ext.each(this.columns, function(col) {
			var name = col.name || col.dataIndex;
			if (name) {
				//if given a renderer via a ColumnModel, use it and ensure data type is set to String
				if (Ext.isFunction(col.renderer)) {
					var value = col.renderer(record.get(name), null, record), type = "String";
				} else {
					var value = record.get(name), type = this.typeMappings[col.type || record.fields.get(name).type.type];
				}
				if(col.xtype == "numbercolumn")
				{
					type = "Number";
					if(value == '0' || value == '') value = '', type = "String";		
				}
				cells.push(this.buildCell(value, type, style).render());
			}
		}, this);

		return Ext.String.format("<ss:Row>{0}</ss:Row>", cells.join(""));
	},

	buildCell : function(value, type, style) {
		if (type == "DateTime" && Ext.isFunction(value.format))
			value = value.format(this.dateFormatString);
		return new Ext.ux.exporter.excelFormatter.Cell({
			value : value,
			type : type,
			style : style
		});
	},

	/**
	 * @property typeMappings
	 * @type Object
	 * Mappings from Ext.data.Record types to Excel types
	 */
	typeMappings : {
		'int' : "Number",
		'string' : "String",
		'float' : "Number",
		'date' : "DateTime"
	}
});
