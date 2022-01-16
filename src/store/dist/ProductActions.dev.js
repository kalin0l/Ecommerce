"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSingleProduct = fetchSingleProduct;
exports.fetchProductData = void 0;

var _ProductSlice = require("./Product-slice");

var fetchProductData = function fetchProductData() {
  return function _callee(dispatch) {
    var fetchData, items;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fetchData = function fetchData() {
              var res, data;
              return regeneratorRuntime.async(function fetchData$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(fetch("https://course-api.com/react-store-products"));

                    case 2:
                      res = _context.sent;

                      if (res.ok) {
                        _context.next = 5;
                        break;
                      }

                      throw new Error("There is no products");

                    case 5:
                      _context.next = 7;
                      return regeneratorRuntime.awrap(res.json());

                    case 7:
                      data = _context.sent;
                      return _context.abrupt("return", data);

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(fetchData());

          case 4:
            items = _context2.sent;
            dispatch(_ProductSlice.ProductActions.setData(items));
            dispatch(_ProductSlice.ProductActions.loadProducts(items));
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
};

exports.fetchProductData = fetchProductData;

function fetchSingleProduct(id) {
  return function _callee2(dispatch) {
    var fetchData, item;
    return regeneratorRuntime.async(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            fetchData = function fetchData() {
              var res, data;
              return regeneratorRuntime.async(function fetchData$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(fetch("https://course-api.com/react-store-single-product?id=".concat(id)));

                    case 2:
                      res = _context3.sent;

                      if (res.ok) {
                        _context3.next = 5;
                        break;
                      }

                      throw new Error("There is no product");

                    case 5:
                      _context3.next = 7;
                      return regeneratorRuntime.awrap(res.json());

                    case 7:
                      data = _context3.sent;
                      console.log(data);
                      return _context3.abrupt("return", data);

                    case 10:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            };

            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(fetchData());

          case 4:
            item = _context4.sent;
            dispatch(_ProductSlice.ProductActions.setSingleProd({
              singleProduct: item
            }));
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
}