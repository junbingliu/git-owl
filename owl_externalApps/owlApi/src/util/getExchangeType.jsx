//#import Util.js

(function () {
    var list = [
        {
            id: 'j1',
            name: '健一'
        },
        {
            id: 'zsd',
            name: '准时达'
        },
        {
            id: 'local',
            name: '本地（不入库）'
        }
    ];
    var ret = {
        state: 'ok',
        list: list,
        total: list.length
    };
    out.print(JSON.stringify(ret));
})();