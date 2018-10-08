var FileApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.filemanagement.impl,
    Packages.net.xinshi.isone.modules.filemanagement.util,
    Packages.java.util
);
/**
 * 文件库相关方法
 * @namespace
 * @type {{getFiles: Function, getRelatedUrl: Function, getDefaultFileColumn: Function, getChildren: Function, getFileColumn: Function, hasChildren: Function, getAllColumnChildren: Function}}
 */
var FileService = {
    /**
     * 将一个zip文件里面的内容解压，然后上传到fileserver
     * @param url
     */
    expandZipFile: function (url) {
        var fileInfos = FileApi.Util.expandZipFile(url);
        var result = [];
        for (var i = 0; i < fileInfos.size(); i++) {
            var fileInfo = fileInfos.get(i);
            var fileId = "" + fileInfo.getFileId();
            var fileName = "" + fileInfo.getFileName();
            result.push({fileId: fileId, fileName: fileName});
        }
        return result;
    },
    /**
     * 添加文件到文件库
     * @param columnId
     * @param file
     * @returns {String}
     */
    addFile: function (columnId, file) {
        var jFile = $.toJavaJSONObject(file);
        var fileId = FileApi.IsoneBaseEngine.fileService.addFile(jFile, columnId);
        return fileId + "";
    },

    getFileObject:function(fileObjectId){
        var jfile = FileApi.IsoneBaseEngine.fileService.getFile(fileObjectId);
        if(jfile==null){
            return null;
        }
        var s = "" + jfile.toString();
        return JSON.parse(s);
    },
    /**
     * 根据encode的img上传图片
     * @param imageEncode
     * @param fileName
     * @returns {*}
     */
    addFileByBytes: function (imageEncode, fileName) {
        var json = FileApi.IsoneBaseEngine.fileService.uploadFile(imageEncode, fileName);
        if (!json) {
            return null;
        }
        return JSON.parse(json);
    },
    /**
     * 通过folderId获取文件列表
     * @param folderId
     * @returns {JSONObject}
     */
    getFiles: function (folderId) {
        var jFiles = FileApi.IsoneBaseEngine.fileService.getFiles(folderId);
        return JSON.parse(jFiles.toString());
    },
    /**
     * 获取文件真实路径
     * @param fileId
     * @param spec 生成大小图尺寸
     * @returns {string}
     */
    getRelatedUrl: function (fileId, spec) {
        return "" + FileApi.IsoneBaseEngine.fileService.getRelatedUrl(fileId, spec);
    },
    /**
     * 获取文件的外网真实路径
     * @param fileId
     * @returns {string}
     */
    getFullPath: function (fileId) {
        var s = FileApi.IsoneBaseEngine.fileService.getFullPath(fileId);
        if (!s) {
            return "";
        }
        return s + "";
    },

    /**
     * 获取文件的内网真实路径
     * @param fileId
     * @returns {string}
     */
    getInternalPath: function (fileId) {
        var s = FileApi.IsoneBaseEngine.fileService.getInternalPath(fileId);
        if (!s) {
            return "";
        }
        return s + "";
    },
    /**
     * 获取指定商家文件库columnId列表
     * @param merchantId
     * @returns {JSONObject}
     */
    getDefaultFileColumn: function (merchantId) {
        var jDefaultFileColumn = FileApi.IsoneBaseEngine.fileColumnService.getDefaultFileColumn(merchantId);
        return JSON.parse(jDefaultFileColumn.toString());
    },
    /**
     * 获取指定columnId的子栏目
     * @param fileColumnId
     * @returns {JSONObject}
     */
    getChildren: function (fileColumnId) {
        var children = FileApi.IsoneBaseEngine.fileColumnService.getChildrenObjects(fileColumnId);
        if (children) {
            return JSON.parse(FileApi.Util.bean2String(children));
        }
        return null;
    },

    getFileColumn: function (fileColumnId) {
        var c = FileApi.IsoneBaseEngine.fileColumnService.getFileColumn(fileColumnId);
        if (c) {
            return JSON.parse(c.toString());
        }
        return null;
    },
    /**
     * 判断栏目是否存在子栏目
     * @param columnId
     * @returns {boolean}
     */
    hasChildren: function (columnId) {
        var sortList = FileApi.IsoneBaseEngine.fileColumnService.getChildren(columnId);
        return (sortList.getSize() > 0);
    },
    /**
     * 获取指定栏目下的所有子栏目
     * @param fileColumnId
     * @returns {JSONObject}
     */
    getAllColumnChildren: function (fileColumnId) {
        var children = FileApi.IsoneBaseEngine.fileColumnService.getAllColumnChildren(fileColumnId);
        if (!children) {
            return null;
        }
        return JSON.parse(children.toString());
    },

    getUrlMd5: function (url) {
        return FileApi.Util.getUrlMd5(url);
    },
    /**
     * 读取text文件，返回一个集合
     * @param url 文件的URL
     * @param encode 编码，不传默认UTF-8
     */
    readTextFile: function (url, encode) {
        if (!url) {
            return null;
        }
        if (!encode) {
            encode = "UTF-8";
        }
        return $.java2Javascript(FileApi.FileReaderUtil.readTextFromUrl(url, encode));
    },
    /**
     * 把一个字符串写成文件到指定目录文件
     * @param fileFullName
     * @param content
     * @param append
     */
    writeStringToFile: function (fileFullName, content, append) {
        FileApi.Util.writeStringToFile(fileFullName, content, append)
    }

};