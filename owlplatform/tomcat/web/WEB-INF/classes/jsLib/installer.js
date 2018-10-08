var InstallerApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.merchant,
    Packages.net.xinshi.isone.modules.appmarket
);

var InstallerService = {
    install : function(appId,mid){
        InstallerApi.Is1AppMarketEngine.installer.installApps(appId,mid);
    },

    installApp:function(app,saasId,merchantId){
        var javaApp = $.getBean("net.xinshi.is1.appmarket.bean.App",app);
        InstallerApi.Is1AppMarketEngine.installer.installApp(javaApp,saasId,merchantId);

    }
}