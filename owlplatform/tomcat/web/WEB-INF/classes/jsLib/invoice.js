//#import Util.js
var InvoiceApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.commons,
    Packages.org.json
);

var InvoiceService = {
    getUserInvoiceList : function(userId){
        var list = InvoiceApi.IsoneBaseEngine.invoiceService.getUserInvoiceList(userId);
        var s = "" + InvoiceApi.Util.bean2String(list);
        return JSON.parse(s);
    },
    deleteInvoice: function(userId,invoiceId) {
        InvoiceApi.IsoneBaseEngine.invoiceService.deleteInvoice(userId,invoiceId);
    },
    addInvoice:function(userId,invoice){
        var s = JSON.stringify(invoice);
        var bean = $.getBean("net.xinshi.isone.modules.invoice.bean.Invoice",invoice);
        return "" + InvoiceApi.IsoneBaseEngine.invoiceService.addInvoice(userId,bean);
    },
    updateInvoice:function(invoiceId,invoice){
        var s = JSON.stringify(invoice);
        var bean = $.getBean("net.xinshi.isone.modules.invoice.bean.Invoice",invoice);
        InvoiceApi.IsoneBaseEngine.invoiceService.updateInvoice(invoiceId,bean);
    },
    setDefaultInvoice:function(userId,invoiceId){
        InvoiceApi.IsoneBaseEngine.invoiceService.setDefaultInvoice(userId,invoiceId);
    },
    getDefaultInvoice : function(userId){
        var bean = InvoiceApi.IsoneBaseEngine.invoiceService.getDefaultInvoice(userId);
        if(bean==null){
            return null;
        }
        else{
            return $.java2Javascript(bean);
        }
    }
}