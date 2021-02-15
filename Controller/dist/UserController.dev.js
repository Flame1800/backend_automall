"use strict";

"use strict";

var response = require('../response');

var _require = require('../models'),
    User = _require.User;

exports.users = function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findAll());

        case 3:
          users = _context.sent;
          response.status(200, users, res);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          response.error(500, 'Connection error', res);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.add = function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.create({
            phone: req.query.phone
          }));

        case 3:
          users = _context2.sent;
          response.status(200, users, res);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          response.error(500, 'Connection error', res);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.sendCode = function _callee3(req, res) {
  var message, users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (req.query.code && req.query.phone) {
            message = "Code or phone not send";
            response.error(401, message, res);
          } else {}

          _context3.next = 4;
          return regeneratorRuntime.awrap(User.create({
            phone: req.query.phone
          }));

        case 4:
          users = _context3.sent;
          response.status(200, users, res);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          response.error(500, 'Connection error', res);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};