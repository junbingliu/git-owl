CertificateApi = new JavaImporter(
    Packages.net.xinshi.isone.commons.CertificateUtil
);

var CertificateUtil = {
    /**
     * 验证身份证是否合法
     * @param idCard
     * @returns {*}
     */
    validate: function (idCard) {
        if (!idCard) {
            return false;
        }
        return CertificateApi.CertificateUtil.isIDCard(idCard);
    }
};