var GraphicsApi = new JavaImporter(
    Packages.net.xinshi.isone.commons
);

GraphicsService = {
    combine:function(backgroundFileId,fileIds,dimension){
        return GraphicsApi.GraphicsUtils.combine(backgroundFileId,fileIds,dimension);
    }
}