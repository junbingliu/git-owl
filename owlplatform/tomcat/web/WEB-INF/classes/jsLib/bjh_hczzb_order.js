
var OrderApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.functions.order
);


var OrderService = {
    getHCZZBOrderList: function (userCode, phone, start, pageLimit, currentPage) {
        var listOfJSON = OrderApi.OrderFunction.getHCZZBOrderList(userCode, phone, start, pageLimit, currentPage);
        var orders = JSON.parse(listOfJSON.toString());
        /* var result = {
         list:orders,
         count:size,
         pageCount:pageCount,
         page:page+1,
         number:number
         };*/
        return orders;
        /*} catch (e) {
         return {state:'error',msg:'exception.'};
         }*/
    }
}