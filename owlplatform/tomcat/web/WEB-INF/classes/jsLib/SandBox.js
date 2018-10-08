/**
 * Created by zhengxiangyang on 16/3/25.
 */
var SandBoxApi = new JavaImporter(
    Packages.net.xinshi.isone.commons
);

var SandBox = {
    appendLine:function(fileName,line){
        SandBoxApi.SandBoxUtils.appendLine(fileName,line);
    },

    saveFile:function(fileName,content){
        SandBoxApi.SandBOxUtils.saveFile(fileName,content);
    },

    readFile:function(fileName){
        return "" + SandBoxApi.SandBOxUtils.readFile(fileName);
    }

};