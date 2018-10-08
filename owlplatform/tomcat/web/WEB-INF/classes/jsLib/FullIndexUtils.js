var IndexApi = new JavaImporter(
    Packages.net.xinshi.isone.lucene.util
);

FullIndexService = {};

FullIndexService.padInteger = function (longValue) {
    return IndexApi.FullIndexUtils.padInteger(longValue) + "";
};