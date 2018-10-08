var EmailApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.org.json
);

var EmailService = {
    /**
     *
     * @param sendMail(toEmail,subject,body,retry:default 0,loginId,merchantId)
     */
    sendEmailQue: function (sendMail) {
        if(!sendMail){
            return;
        }
        var jSendMail = new EmailApi.JSONObject(JSON.stringify(sendMail));
        EmailApi.IsoneModulesEngine.emailService.sendEmailQue(jSendMail);
    }
};