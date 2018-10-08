//#import Util.js
//#import login.js
//#import session.js
//#import HttpUtil.js
//#import $@projectCode:services/modelService.jsx

var spec = @spec;

var backendUserId = LoginService.getBackEndLoginUserId();
if (!backendUserId) {
    out.print("请登录后再操作");
} else {
    var id = $.params.id;
    if (id) {
        var obj = @projectCodeService.get(id);
        @projectCodeService.index(obj);
        out.print(id + ":重建索引成功");
    } else {
        var start = $.params.start;
        var limit = $.params.limit;
        if (start != null && limit != null) {
            var listName = @projectCodeService.getAllListName();
            var list = @projectCodeService.getList(listName, start, limit);
            for (var i = 0; i < list.length; i++) {
                try {
                    @projectCodeService.index(list[i]);
                } catch (e) {
                    try {
                        out.print(list[i].id + ",重建索引失败，异常信息:" + JSON.stringify(e) + "<br>");
                    } catch (e1) {
                        out.print(list[i].id + ",重建索引失败，异常信息:" + e1 + "<br>");
                    }
                }
            }
            out.print(spec["_t"] + "重建索引成功:"+list.length);
        }else{
            try {
            @projectCodeService.reindexAll();
            } catch (e) {
                out.print("重建索引失败，异常信息:" + e + "<br>");
            }
            /*var list = @projectCodeService.getList(@projectCodeService.getAllListName(), 0, -1);
            list.forEach(function (value) {
                try{
                    @projectCodeService.index(value);
                }catch(e){
                    try {
                        out.print(value.id + ",重建索引失败，异常信息:" + JSON.stringify(e)+"<br>");
                    } catch (e1) {
                        out.print(value.id + ",重建索引失败，异常信息:" + e1+"<br>");
                    }
                }
            });*/
            out.print(spec["_t"] + "重建索引成功:");
        }
    }
}