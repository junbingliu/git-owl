//#import pigeon.js
//#import eventBus.js
//#import Util.js
//#import base64.js
//#import deepmerge.js
//#import underscore.js
//#import HttpUtil.js
//#import jobs.js
//#import DigestUtil.js
//#import moment.min.js

function trim(s){
    if(s){
        return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
    return ""
}

var @projectCodeService = (function (pigeon) {
    var objPrefix = '@projectCode'
    var listPrefix = '@projectCode'

    var spec = @spec

    var formSpecs = @formSpecs

    var flattenedSpecs = @flattenedSpecs

    var idFunc = @idFunc
    var lockFunc = @lockFunc

    var f = {
        /**
         * 添加
         */
        getId: function (data) {
            //默认实现是直接返回一个递增的Id
            //其他实现方式包括从data中获取数据构造出一个Id

            //@idOrig
            if (idFunc) {
                return objPrefix + '_' + idFunc(data)
            }
            else {
                var seq = pigeon.getId(objPrefix)
                return objPrefix + '_' + seq
            }
        },

        getLock: function (data) {
            //@lockOrig
            if (lockFunc) {
                return lockFunc(data)
            }
            else {
                return data['id']
            }
        },


        getAllListName: function (data) {
            return listPrefix + '_all'
        },

        getValue: function (fullkey, data) {
            var path = fullkey.split('.')
            var curData = data
            for (var i = 0; i < path.length; i++) {
                var curKey = path[i]
                if (typeof(curData) == 'object' && curData != null) {
                    curData = curData[curKey]
                }
                else {
                    return null
                }
            }
            return curData
        },

        setValue: function (fullkey, value, data) {
            var path = fullkey.split('.')
            var curData = data
            var objPath = [data]
            for (var i = 0; i < path.length; i++) {
                var curKey = path[i]
                if (i == path.length - 1) {
                    curData[curKey] = value
                    return
                }

                var subData = curData[curKey]
                if (!subData) {
                    curData[curKey] = value
                    return
                }
                curData = subData
            }

        },

        getEnvValue: function (v, env) {
            if (!v) {
                return v
            }
            if (v.indexOf('$') == 0) {
                var fullkey = v.substring(1)
                return f.getValue(fullkey, env)
            }
            return v
        },



        getUniqueObj:function(key,value){
            var pigeonKey = objPrefix+ '_' + key + '_' + DigestUtil.md5(value)
            var obj = pigeon.getObject(pigeonKey);
            if(obj==null){
                return null;
            }
            var id = obj.id;
            return pigeon.getObject(id);
        },

        isDuplicated: function (id, key, value) {
            var pigeonKey = objPrefix + '_' + key + '_' + DigestUtil.md5(value)
            var obj = pigeon.getObject(pigeonKey);
            if (obj == null) {
                return false
            }
            if (obj.id === id) {
                return false
            }
            return true
        },

        saveUniqueValue: function (objId, key, value) {
            var md5 = DigestUtil.md5(value)
            var pigeonKey = objPrefix + '_' + key + '_' + md5
            var obj = {
                id: objId,
                key: key,
                value: value,
                md5: md5,
            }
            pigeon.saveObject(pigeonKey, obj)
        },

        removeUniqueValue: function (id, key, value) {
            var md5 = DigestUtil.md5(value)
            var pigeonKey = objPrefix + '_' + key + '_' + md5
            pigeon.saveObject(pigeonKey, null)
        },

        validate: function (data, env) {
            //TODO:需要实现validate 服务器端
            var fields = flattenedSpecs.mainFields
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i]
                var value = f.getValue(field.key, data)
                if (!value || (typeof(value) == 'string' && value.indexOf('$') == 0)) {
                    value = f.getEnvValue(field.defaultValue, env)
                    if (value) {
                        f.setValue(field.key, value, data)
                    }
                }
                if (!value && field.required == 'true') {
                    throw {'state': 'err', msg: field.fieldLabel + '不能为空。', code: 'required'}
                }
                //对于unique的字段，检查有没有重复
                if (field.unique === 'true') {
                    if (f.isDuplicated(data.id, field.key, value)) {
                        throw {'state': 'err', msg: field.fieldLabel + '不能重复。' + value, code: 'duplicated'}
                    }
                }
            }
            return {'state': 'ok'}
        },

        saveUniqueFields: function (data, env) {
            var fields = flattenedSpecs.mainFields
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i]
                //对于unique的字段，检查有没有重复
                if (field.unique === 'true') {
                    var value = f.getValue(field.key, data)
                    if (!value || (typeof(value) == 'string' && value.indexOf('$') == 0)) {
                        value = f.getEnvValue(field.defaultValue, env)
                        if (value) {
                            f.setValue(field.key, value, data)
                        }
                    }
                    if (!value && field.required == 'true') {
                        throw {'state': 'err', msg: field.fieldLabel + '不能为空。', code: 'required'}
                    }

                    if (f.isDuplicated(data.id, field.key, value)) {
                        throw {'state': 'err', msg: field.fieldLabel + '不能重复。', code: 'duplicated'}
                    }

                    //对于没有重复的数据，保存起来
                    f.saveUniqueValue(data.id, field.key, value)
                }


            }
        },

        removeUniqueFields: function (data, env) {
            var fields = flattenedSpecs.mainFields
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i]
                //对于unique的字段，检查有没有重复
                if (field.unique === 'true') {
                    var value = f.getValue(field.key, data)
                    if (!value || (typeof(value) == 'string' && value.indexOf('$') == 0)) {
                        value = f.getEnvValue(field.defaultValue, env)
                        if (value) {
                            f.setValue(field.key, value, data)
                        }
                    }

                    //对于没有重复的数据，保存起来
                    f.removeUniqueValue(data.id, field.key, value)
                }


            }
        },

        addToList: function (data) {
            var key = pigeon.getRKey(data['_createTime'], 13)
            pigeon.addToList(f.getAllListName(), key, data.id)

            var t = data['_createTime']
            var d = new Date(t)
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            var day = d.getDate()

            var listName = listPrefix + '_' + year + '_' + month + '_' + day

            pigeon.addToList(listName, key, data.id)
            //如果这里有子系统的Id则加入子系统list
            if (data['subplatformId']) {
                var listName = listPrefix + '_' + data['subplatformId']
                pigeon.addToList(listName, key, data.id)
            }

            //如果这里有店铺id,则加入店铺list
            if (data['shopId']) {
                var listName = listPrefix + '_' + data['shopId']
                pigeon.addToList(listName, key, data.id)
            }
        },

        tranverseFields: function (formSpec, callback, ctx) {
            formSpec.fields.forEach(function (field) {
                if (field['_ft'] == 'field') {
                    callback(field, ctx)
                }
                else if (field['_ft'] == 'subform') {
                    var context = {parentField: field}
                    f.tranverseFields(field, callback, context)
                }
                else if (field['_ft'] == 'array') {
                    var context = {parentField: field}
                    f.tranverseFields(field, callback, context)
                }
            })
        },

        normalizeValue: function (value, spec) {
            if (value == null) {
                return null
            }
            switch (spec.fieldType) {
                case 'string':
                    return value + ''
                case 'number':
                    if (isNaN(value)) {
                        return null
                    }
                    else {
                        value = Number(value)
                        return value
                    }
                case 'date':
                    return moment(value)
                case 'choice':
                    return value
                default:
                    return value
            }
        },


        getNormalizedDoc: function (data) {
            var obj = JSON.parse(JSON.stringify(data))
            f.tranverseFields(formSpecs, function (field, ctx) {
                if (ctx.parentField && ctx.parentField._ft == 'array') {
                    var items = f.getValue(ctx.parentField.key, obj)
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i]
                            var value = item[field.origKey]
                            value = f.normalizeValue(value, field)
                            item[field.origKey] = value
                        }
                    }
                }
                else {
                    var value = f.getValue(field.key, obj)
                    value = f.normalizeValue(value, field)
                    f.setValue(field.key, value, obj)
                }
            }, {})
            return obj
        },

        index: function (doc) {
            var data = f.getNormalizedDoc(doc)
            var m = []
            m.push(data.m)
            if (data['subplatformId']) {
                m.push(data['subplatformId'])
            }
            if (data['shopId']) {
                m.push(data['shopId'])
            }
            data._m = m
            var elasticSearchUrl = $.getEnv('elasticSearchUrl')

            var headers = {'Content-Type': 'application/json;charset=utf-8'}
            var elasticSearchUser = $.getEnv('elasticSearchUser')
            var elasticSearchPass = $.getEnv('elasticSearchPass')
            if (elasticSearchUser && elasticSearchPass) {
                var auth = Base64.encode(elasticSearchUser + ':' + elasticSearchPass)
                var basicAuth = 'Basic ' + auth
                headers['Authorization'] = basicAuth
            }
            var searchUrl = elasticSearchUrl + '/@projectCode/allinone/' + data.id
            var sndTxt = JSON.stringify(data)
            var s = HttpUtils.postRaw(searchUrl, sndTxt, headers)
            s = JSON.parse(s)
            if (!s.result) {
                $.log(data.id + ',index error:' + JSON.stringify(s))
            }
            else {
                $.log('index ok...')
            }
        },

        add: function (data, env) {
            env = env || {}
            f.validate(data, env)
            data.id = f.getId(data)
            data['_createTime'] = new Date().getTime()
            data['_v'] = 0
            data['_t'] = spec['_t']
            try {
                pigeon.lock(f.getLock(data))
                EventBusService.fire(spec['_t'] + '_add_before', {data: data, env: env})
                pigeon.saveObject(data.id, data)
                f.saveUniqueFields(data, env)
                f.addToList(data)
                f.index(data)
                EventBusService.fire(spec['_t'] + '_add_after', {data: data, env: env})
                return data
            }
            finally {
                pigeon.unlock(f.getLock(data))
            }

        },

        get: function (id) {
            return pigeon.getObject(id)
        },

        saveTempData: function (key, data) {
            return pigeon.saveObject(objPrefix + key, data)

        },

        getTempData: function (key) {
            return pigeon.getObject(objPrefix + key)
        },

        getObjects: function (ids) {
            return pigeon.getObjects(ids)
        },

        update: function (data, env) {
            env = env || {}
            var id = data.id

            try {
                pigeon.lock(f.getLock(data))
                var obj = f.get(data.id)
                if (!obj) {
                    throw {msg: '对象不存在!id=' + data.id, code: 'notFound'}
                }
                if (obj._v != data._v) {
                    throw {code: 'concurrentupdate', msg: '对象已经修改过，本次修改被拒绝。old._v=' + obj._v + ',new._v=' + data._v}
                }
                var oldObj = JSON.parse(JSON.stringify(obj))
                //深度合并
                //obj = deepMerge(obj,data);//深度合并会引起 编辑出现bug
                obj = data
                obj['_v'] = obj['_v'] + 1
                f.validate(obj, env)
                data._v = obj._v
                EventBusService.fire(spec['_t'] + '_update_before', {old: oldObj, data: obj, env: env})
                f.addToList(obj)
                f.removeUniqueFields(oldObj, env)
                pigeon.saveObject(id, obj)
                f.saveUniqueFields(data, env)
                f.index(obj)
                EventBusService.fire(spec['_t'] + '_update_after', {old: oldObj, data: obj, env: env})
                return data
            }
            finally {
                pigeon.unlock(f.getLock(data))
            }
        },

        del: function (id) {
            //只做软删除
            var data = f.get(id)
            if (!data) {
                throw '对象不存在!id=' + id
            }
            var key = pigeon.getRKey(data['_createTime'], 13)
            pigeon.deleteFromList(f.getAllListName(), key, id)
            if (data['subplatformId']) {
                var listName = listPrefix + '_' + data['subplatformId']
                pigeon.deleteFromList(listName, key, id)
            }

            //如果这里有店铺id,则加入店铺list
            if (data['shopId']) {
                var listName = listPrefix + '_' + data['shopId']
                pigeon.deleteFromList(listName, key, id)
            }

            var t = data['_createTime']
            var d = new Date(t)
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            var day = d.getDate()

            var listName = listPrefix + '_' + year + '_' + month + '_' + day

            EventBusService.fire(spec['_t'] + '_delete_before', {data: data})
            pigeon.deleteFromList(listName, key, id)

            var deletedList = listPrefix + '_deleted'
            pigeon.addToList(deletedList, key, id)
            data.del = 'T'
            f.index(data)
            pigeon.saveObject(data.id, data)
            f.removeUniqueFields(data, {})

            EventBusService.fire(spec['_t'] + '_delete_after', {data: data})
        },
        getList: function (listName, start, limit) {
            if (!listName) {
                return null
            }
            if (!start) {
                start = 0
            }
            if (!limit) {
                limit = 10
            }
            return pigeon.getListObjects(listName, start, limit)
        },

        getExportRunningList: function () {
            return listPrefix + '_exportRunning'
        },

        getExportFinishedList: function () {
            return listPrefix + '_exportFinished'
        },

        addExportTask: function (query, env) {
            var now = new Date().getTime()
            var taskInfo = {
                loginUser: f.getEnvValue('$loginUser', env),
                submitTime: now,
                startTime: 0,
                processState: 'processing',
                percent: 0,
                _v: 0,
            }
            //这个key如果不多加一个export，会把原有的单据数据覆盖
            var taskInfoId = objPrefix + '_export_' + pigeon.getId()
            var taskId = JobsService.submitExportTask('@projectCode', 'tasks/export.jsx', {
                query: query,
                env: env,
                taskInfoId: taskInfoId,
            }, now)
            taskInfo.taskId = '' + taskId
            taskInfo.id = taskInfoId
            var key = pigeon.getRKey(taskInfo.submitTime, 13)
            pigeon.addToList(f.getExportRunningList(), key, taskInfoId)
            pigeon.saveObject(taskInfoId, taskInfo)

            return taskInfoId
        },

        addDocExportTask: function (docId, env) {
            var now = new Date().getTime()
            var taskInfo = {
                loginUser: f.getEnvValue('$loginUser', env),
                submitTime: now,
                startTime: 0,
                processState: 'processing',
                percent: 0,
                total: 1,
                _v: 0,
            }
            //这个key如果不多加一个export，会把原有的单据数据覆盖
            var taskInfoId = objPrefix + '_export_' + pigeon.getId()
            var taskId = JobsService.submitExportTask('@projectCode', 'tasks/exportDoc.jsx', {
                id: docId,
                env: env,
                taskInfoId: taskInfoId,
            }, now)
            taskInfo.taskId = '' + taskId
            taskInfo.id = taskInfoId
            var key = pigeon.getRKey(taskInfo.submitTime, 13)
            pigeon.addToList(f.getExportRunningList(), key, taskInfoId)
            pigeon.saveObject(taskInfoId, taskInfo)

            return taskInfoId
        },

        getExportTaskInfo: function (taskInfoId) {
            return pigeon.getObject(taskInfoId)
        },

        updateExportTaskInfo: function (taskInfoId, taskInfo) {
            var oInfo = f.getExportTaskInfo(taskInfoId)
            if (oInfo._v == taskInfo._v) {
                taskInfo._v += 1
                pigeon.saveObject(taskInfoId, taskInfo)
            }
        },


        reindexAll: function () {
            var listName = f.getAllListName()
            var count = pigeon.getListSize(listName)
            var pos = 0
            while (count > 0) {
                var indexCount = 2000
                if (indexCount > count) {
                    indexCount = count
                }
                var objs = pigeon.getListObjects(listName, pos, indexCount)
                objs.forEach(function (data) {
                    try {
                        f.index(data)
                    } catch (e) {
                        $.log('重建索引异常:' + data.id)
                    }
                })
                pos += indexCount
                count -= indexCount
            }
        },
        search:function(m, searchArgs, keyword,from, pageSize, sort){
            //生成filters
            delete searchArgs.keyword;
            var filters = [];
            for(var k in searchArgs){
                var v = searchArgs[k];
                if(typeof(v)=='object' && Array.isArray(v)){
                    var range={}
                    range[k] = {
                        'gte':v[0],
                        'lte':v[1]
                    }
                    filters.push({range:range});
                }
                else{
                    var term = {};
                    if(v){
                        term[k+".keyword"] = trim('' + v)
                        filters.push({term:term})
                    }

                }
            }

            if(m !== '0'){
                filters = filters.concat([
                    {"term": { "_m.keyword": m }},
                    {"term":{"_t":spec["_t"]}}
                ]);
            }
            else{
                //如果m === '0'，代表是平台
                filters = filters.concat([
                    {"term":{"_t":spec["_t"]}}
                ]);
            }

            //getKeyword query
            var keywordQuery = "";
            if(keyword && trim(keyword).length>0){
                keywordQuery = "\"" + trim(keyword) + "\""
            }
            else{
                keywordQuery = "*"
            }

            var effectiveSort = [{_createTime:{order:"desc"}}];
            if(sort){
                effectiveSort = sort;
            }

            var query = {
                "query": {
                    "bool": {
                        "must": {
                            "query_string": {
                                "query":keywordQuery
                            }
                        },
                        "must_not": {
                            "match": {
                                "del": "T"
                            }
                        },
                        "filter": filters
                    }
                },
                "from" : from, "size" : pageSize,
                sort:effectiveSort
            }

            var elasticSearchUrl = $.getEnv( "elasticSearchUrl" );

            var headers = { "Content-Type": "application/json;charset=utf-8" };
            var elasticSearchUser = $.getEnv("elasticSearchUser");
            var elasticSearchPass = $.getEnv("elasticSearchPass");
            if(elasticSearchUser && elasticSearchPass){
                var auth =Base64.encode(elasticSearchUser + ":" + elasticSearchPass);
                var basicAuth = "Basic " + auth;
                headers["Authorization"] = basicAuth;
            }
            var searchUrl = elasticSearchUrl+"/@projectCode/_search";

            var sndTxt = JSON.stringify(query);


            var s = HttpUtils.postRaw( searchUrl, sndTxt, headers);
            var result = JSON.parse(s);

            var hits = result.hits.hits;
            var total = result.hits.total;

            var objs = hits.map(function(hit){return hit._source});


            var ret = {
                state:'ok',
                list:objs,
                total:total
            }

            return ret;

        }
    }
    return f
})($S);