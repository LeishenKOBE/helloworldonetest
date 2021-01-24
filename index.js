(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.router = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function warn(condition, message) {
    if (process.env.NODE_ENV !== "production" && !condition) {
      typeof console !== "undefined" && console.warn("".concat(message));
    }
  }

  var encodeReserveRE = /[!'()*]/g;

  var encodeReserveReplacer = function encodeReserveReplacer(c) {
    return "%" + c.charCodeAt(0).toString(16);
  };

  var commaRE = /%2C/g;

  var encode = function encode(str) {
    return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ",");
  };

  function decode(str) {
    try {
      return decodeURIComponent(str);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        warn(false, "Error decoding \"".concat(str, "\". Leaving it intact."));
      }
    }

    return str;
  }
  function resolveQuery(query) {
    var extraQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _parseQuery = arguments.length > 2 ? arguments[2] : undefined;

    if (query.includes("?")) {
      query = query.split("?")[1];
    }

    var parse = _parseQuery || parseQuery;
    var parsedQuery;

    try {
      parsedQuery = parse(query || "");
    } catch (e) {
      process.env.NODE_ENV !== "production" && warn(false, e.message);
      parsedQuery = {};
    }

    for (var key in extraQuery) {
      var value = extraQuery[key];
      parsedQuery[key] = Array.isArray(value) ? value.map(castQueryParamValue) : castQueryParamValue(value);
    }

    return parsedQuery;
  }

  var castQueryParamValue = function castQueryParamValue(value) {
    return value == null || _typeof(value) === "object" ? value : String(value);
  };

  function parseQuery(query) {
    var res = {};
    query = query.trim().replace(/^(\?|#|&)/, "");

    if (!query) {
      return res;
    }

    query.split("&").forEach(function (param) {
      var parts = param.replace(/\+/g, " ").split("=");
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join("=")) : null;

      if (res[key] === undefined) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });
    return res;
  }

  function stringifyQuery(obj) {
    var res = obj ? Object.keys(obj).map(function (key) {
      var val = obj[key];

      if (val === undefined) {
        return "";
      }

      if (val === null) {
        return encode(key);
      }

      if (Array.isArray(val)) {
        var result = [];
        val.forEach(function (val2) {
          if (val2 === undefined) {
            return;
          }

          if (val2 === null) {
            result.push(encode(key));
          } else {
            result.push(encode(key) + "=" + encode(val2));
          }
        });
        return result.join("&");
      }

      return encode(key) + "=" + encode(val);
    }).filter(function (x) {
      return x.length > 0;
    }).join("&") : null;
    return res ? "?".concat(res) : "";
  }

  exports.decode = decode;
  exports.resolveQuery = resolveQuery;
  exports.stringifyQuery = stringifyQuery;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
