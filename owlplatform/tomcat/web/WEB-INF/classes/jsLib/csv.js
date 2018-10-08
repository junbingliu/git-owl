CsvApi = new JavaImporter(
    Packages.net.xinshi.isone.commons,
    Packages.java.util,
    Packages.org.json
);

var Csv = {
    parse:function(url,charset){
        var result = [];
        var stringArray = CsvApi.Util.parseCsv(url,charset);
        for(var i=0; i<stringArray.size(); i++){
            var jRow = stringArray.get(i);
            var row = [];
            for(var j=0; j<jRow.length;j++){
                row.push("" + jRow[j]);
            }
            result.push(row);
        }
        return result;
    }
};