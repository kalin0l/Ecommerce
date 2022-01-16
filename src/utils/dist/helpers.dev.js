"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUniqueValues = exports.formatPrice = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var formatPrice = function formatPrice(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number / 100);
};

exports.formatPrice = formatPrice;

var getUniqueValues = function getUniqueValues(data, type) {
  var unique = data.map(function (item) {
    return item[type];
  });

  if (type === 'colors') {
    unique = unique.flat();
  }

  return ['all'].concat(_toConsumableArray(new Set(unique)));
};

exports.getUniqueValues = getUniqueValues;