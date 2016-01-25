
var ExcelMgr = {};

ExcelMgr.excelImport = function(domEl, callback)
{
	var files = domEl.files;
    var i,f;
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        var csv;
 
        reader.onload = function(e) {
            var data = e.target.result;
            if (name.indexOf('.csv') > -1){
                csv = data;
            }else if(name.indexOf('.xlsx') > -1){
                var workbook = XLSX.read(data, {type: 'binary'});
                csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
            }else if(name.indexOf('.xls') > -1 && name.indexOf('.xlsx')==-1){
                var workbook = XLS.read(data, {type: 'binary'});
                csv = XLS.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
            }
            callback(CSV.parse(csv));
        };
        if (name.indexOf('.csv') > -1){
            reader.readAsText(f, 'GB18030');
        }else{
        	if(typeof FileReader.prototype.readAsBinaryString !== "undefined")
        		reader.readAsBinaryString(f);
        	
        	else reader.readAsArrayBuffer(f);
            
        }
     }
};