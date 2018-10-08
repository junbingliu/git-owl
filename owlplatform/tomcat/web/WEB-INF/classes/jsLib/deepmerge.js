//#import underscore.js
function deepMerge(dest){
  _.each(_.rest(arguments), function(source){
    var sourceVal, destVal;
    for (var prop in source){
      sourceVal = source[prop];
      destVal = dest[prop];
      if (prop in dest && _.isObject(sourceVal) && _.isObject(destVal) && _.isArray(sourceVal)==false){
        deepMerge(destVal, sourceVal);
      } else {
        dest[prop] = sourceVal;
      }
    }
  });
  return dest;
}