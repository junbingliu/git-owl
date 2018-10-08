var FTPClientApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.ftpclient
);

/**
 *
 * @type {{uploadFile: Function}}
 */
var FTPClientService = {

    /**
     *
     * @param ftpHost
     * @param ftpPort
     * @param ftpUserName
     * @param ftpPassword
     * @param remotePath
     * @param fileName
     * @param input
     * @param autoClose
     * @returns {*}
     */
    uploadFile: function (ftpHost, ftpPort, ftpUserName, ftpPassword, remotePath, fileName, input, autoClose) {
        var ftp = new FTPClientApi.FTPClientUtil();
        ftp.setHost(ftpHost);
        ftp.setPort(ftpPort);
        ftp.setUsername(ftpUserName);
        ftp.setPassword(ftpPassword);
        ftp.setBinaryTransfer(false);
        ftp.setPassiveMode(false);
        ftp.setEncoding("utf-8");
        return ftp.uploadFile(remotePath, fileName, input, autoClose);
    }

};