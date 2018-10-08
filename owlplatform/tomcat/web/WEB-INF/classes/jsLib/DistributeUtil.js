var OrderDistributeUtil = {
    //itemPrices放着每个订单行的价格，payRecs放着每个支付方式的价格
    distribute: function (itemPrices, payRecs) {
        var sumItemPrices = 0;
        var sumPayRecs = 0;
        var itemPayRecs = [];
        itemPrices.forEach(function (itemPrice) {
            sumItemPrices += Number(itemPrice);
            itemPayRecs.push([]);
        });
        payRecs.forEach(function(payRec){
            sumPayRecs  += Number(payRec);
        });
        if(sumPayRecs!=sumItemPrices){
            var ratio = sumPayRecs/sumItemPrices;
            itemPrices = itemPrices.map(function(price){
                return Number((price*ratio).toFixed(2));
            });
            sumItemPrices = 0;
            itemPrices.forEach(function (itemPrice) {
                sumItemPrices += Number(itemPrice);
            });
            var left = sumPayRecs - sumItemPrices;
            if(left != 0){
                itemPrices[itemPrices.length-1]+=left;
                itemPrices[itemPrices.length-1]=Number(itemPrices[itemPrices.length-1].toFixed(2));
            }
        }



        for (var i = 0; i < itemPrices.length - 1; i++) {
            var itemPrice = itemPrices[i];
            var left = itemPrice;
            for (var j = 0; j < payRecs.length - 1; j++) {
                var payRec = payRecs[j];
                itemPayRecs[i][j] = Number((payRec * itemPrice / sumItemPrices + 0.00001).toFixed(2));
                left -= Number(itemPayRecs[i][j]);
            }
            //最后一个item用倒逼法
            itemPayRecs[i][payRecs.length - 1] = Number(left.toFixed(2));
        }
        for (var j = 0; j < payRecs.length; j++) {
            var payRec = payRecs[j];
            var left = payRec;
            for (var i = 0; i < itemPrices.length - 1; i++) {
                left -= itemPayRecs[i][j]
            }
            itemPayRecs[itemPrices.length - 1][j] = Number(left.toFixed(2));
        }
        return itemPayRecs;
    }
}