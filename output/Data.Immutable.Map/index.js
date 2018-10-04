"use strict";
var $foreign = require("./foreign.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Prelude = require("../Prelude/index.js");
var get = function (key) {
    return function (map) {
        return $foreign._get(key)(map)(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
    };
};
var functorForImMap = new Data_Functor.Functor($foreign._map);
var alter = function (f) {
    return function (k) {
        return function (m) {
            var v = f(get(k)(m));
            if (v instanceof Data_Maybe.Nothing) {
                return $foreign["delete"](k)(m);
            };
            if (v instanceof Data_Maybe.Just) {
                return $foreign.set(k)(v.value0)(m);
            };
            throw new Error("Failed pattern match at Data.Immutable.Map line 47, column 15 - line 49, column 39: " + [ v.constructor.name ]);
        };
    };
};

//- can be able to delete and update key with the value
var update = function (fn) {
    return function (key) {
        return function (map) {
            return alter(Data_Maybe.maybe(Data_Maybe.Nothing.value)(fn))(key)(map);
        };
    };
};
module.exports = {
    get: get,
    update: update,
    functorForImMap: functorForImMap,
    empty: $foreign.empty,
    size: $foreign.size,
    isMap: $foreign.isMap,
    set: $foreign.set,
    "delete": $foreign["delete"],
    deleteAll: $foreign.deleteAll,
    clear: $foreign.clear,
    filter: $foreign.filter,
    isKeyExists: $foreign.isKeyExists
};
