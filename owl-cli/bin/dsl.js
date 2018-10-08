function parseFieldType(fieldType) {
    if (fieldType.indexOf('string') >= 0 || fieldType.indexOf('number') >= 0) {
        var idx = fieldType.indexOf('(')
        var idx1 = fieldType.indexOf(')')
        var sNum = fieldType.substring(idx + 1, idx1)
        var fieldSize = parseInt(sNum)
        if (fieldType.indexOf('string') >= 0) {
            var t = 'string'
        }
        else {
            var t = 'number'
        }
        return {
            fieldType: t,
            fieldSize: fieldSize,
        }
    }
    else {
        return {
            fieldType: fieldType,
        }
    }
}


function parseFieldAttrs(fieldAttrs) {
    var attrs = fieldAttrs.split(',')
    var fieldType = attrs[0]
    var attrObj = parseFieldType(fieldType)
    for (var i = 1; i < attrs.length; i++) {
        var attr = attrs[i]
        var pair = attr.split(':')
        if (pair.length == 2) {
            attrObj[pair[0].trim()] = pair[1].trim()
        } else {
            attrObj[pair[0].trim()] = 'false'
        }
    }

    if (attrObj.fieldType == 'choice') {
        var values = attrObj.values
        var va = values.split('/')
        var options = va.map((v) => v.split('_'))
        attrObj.options = options
    }
    return attrObj
}

function parseSpec(specString) {
    var parts = specString.split(';')
    var fieldLabel = ''
    if (parts.length >= 2) {
        fieldLabel = parts[1]
        var specObj = parseFieldAttrs(parts[0])
        specObj['fieldLabel'] = fieldLabel

        /*if(specObj["defaultValue"]){
          let v = specObj["defaultValue"];
          v = getEnvValue(v);
          specObj.defaultValue = v;
        }*/
        return specObj
    }
    return null
}

function getFormSpecs(spec, parentKey) {
    var formSpec = {
        meta: {},
        _ft: 'subForm',
        fields: [],
    }

    for (var k in spec) {
        var v = spec[k]
        if (typeof(k) == 'number' || k == 0) {
            continue
        }
        var fullKey = k
        if (k == '#meta') {
            formSpec.meta = v
            formSpec.tab = v.tab || '99'
            formSpec.fieldLabel = v.fieldLabel || '请完善资料'
        }
        else {
            if (parentKey) {
                fullKey = parentKey + '.' + k
            }
            if (typeof v == 'object' && Array.isArray(v) == false) {
                var fieldSpec = getFormSpecs(v, fullKey)
                if (!fieldSpec) {
                    continue
                }
                fieldSpec['_ft'] = 'subform'
                fieldSpec.key = fullKey
                fieldSpec.origKey = k
                formSpec.fields.push(fieldSpec)
            }
            else if (typeof v == 'string') {
                var fieldSpec = parseSpec(v)
                if (!fieldSpec) {
                    continue
                }
                fieldSpec['_ft'] = 'field'
                fieldSpec.key = fullKey
                fieldSpec.origKey = k
                formSpec.fields.push(fieldSpec)
            }
            else if (typeof v == 'object' && Array.isArray(v)) {
                var subSpec = v[0]
                var fieldSpec = getFormSpecs(subSpec, fullKey)
                fieldSpec['_ft'] = 'array'
                fieldSpec.key = fullKey
                fieldSpec.origKey = k
                formSpec.fields.push(fieldSpec)
            }
        }
    }
    return formSpec
}

function tranverseFields(formSpec, callback, ctx) {
    formSpec.fields.forEach((field) => {
        if (field['_ft'] == 'field') {
            callback(field, ctx)
        }
        else if (field['_ft'] == 'subform') {
            let context = {parentField: field}
            tranverseFields(field, callback, context)
        }
        else if (field['_ft'] == 'array') {
            let context = {parentField: field}
            tranverseFields(field, callback, context)
        }
    })
}

function flattenFormSpecs(formSpec) {
    var flattened = {
        mainFields: [],
        details: [],
    }

    tranverseFields(formSpec, (field, ctx) => {
        if (ctx.parentField && ctx.parentField._ft == 'array') {
            //nothing
            var detailName = ctx.parentField.key
            //从details里面获取detail
            var curDetail = null
            for (var i = 0; i < flattened.details.length; i++) {
                var detail = flattened.details[i]
                if (detail.name == detailName) {
                    curDetail = detail;
                }
            }
            if(curDetail == null){
                curDetail = {name:detailName,fields:[]};
                flattened.details.push(curDetail);
            }
            else{
                curDetail.fields.push(field);
            }

        }
        else {
            flattened.mainFields.push(field)
        }
    }, {})

    flattened.mainFields.sort((f1, f2) => {
        var tab1 = (f1.listTab || '') + (f1.tab || '')
        var tab2 = (f2.listTab || '') + (f2.tab || '')

        if (tab1 > tab2) {
            return 1
        }
        if (tab1 == tab2) {
            return 0
        }
        if (tab1 < tab2) {
            return -1
        }
    })

    for(var i=0; i<flattened.details.length; i++){
        var detail = flattened.details[i];
        detail.fields.sort((f1, f2) => {
            var tab1 = (f1.listTab || '') + (f1.tab || '')
            var tab2 = (f2.listTab || '') + (f2.tab || '')

            if (tab1 > tab2) {
                return 1
            }
            if (tab1 == tab2) {
                return 0
            }
            if (tab1 < tab2) {
                return -1
            }
        })
    }
    return flattened;
}


module.exports = {
    getFormSpecs: getFormSpecs,
    flattenFormSpecs: flattenFormSpecs,
}