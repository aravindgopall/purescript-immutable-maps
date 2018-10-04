var imMap = require('immutable');

exports["empty"] = imMap.Map();

exports["size"] = function(map){
    return imMap.Map.size(map);
}

exports["isMap"]= function(map){
   return imMap.Map.isMap(map);
}

exports["set"] = function(key){
    return function(val){
        return function(map){
            return map.set(key, val);
        }
    }
}

exports["_get"]= function(key){
    return function(map){
        return function(just){
            return function(nothing){
                var val = map.get(key);
                if(typeof val != undefined && val != undefined) return just(val);
                return nothing;
            }
        }
    }
}

exports["delete"]= function(key){
    return function(map){
        return map.delete(key);
    }
}

exports["deleteAll"]= function(keys){
    return function(map) {
        return map.deleteAll(keys);
    }
}

exports["clear"] = function(map){
    return map.clear();
}

// exports["_update"] =function(fn){
//     return  function(key){
//         return  function(val){
//             return function(map){
//                 return map.update(key,function(value){ return fn(value)(val)});
//             }
//         }
//     }
// }

exports["_map"]= function(fn){
    return function(map){
        return map.map(fn);
    }
}

exports["filter"]= function(fn){
    return function(map){
        return map.filter(fn);
    }
}

exports["isKeyExists"]= function(key){
    return function(map){
        return map.has(key);
    }
}
