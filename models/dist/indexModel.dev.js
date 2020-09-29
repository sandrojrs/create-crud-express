"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var conn = require('../config/connection'); // constructor


var Users = function Users(users) {
  this.name = users.name;
  this.email = users.email;
  this.password = users.password;
  this.date_create = new Date();
};

Users.create = function (newusers, result) {
  conn.query('INSERT INTO users SET ?', newusers, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created users: ', _objectSpread({
      id: res.insertId
    }, newusers));
    result(null, _objectSpread({
      id: res.insertId
    }, newusers));
  });
};

Users.login = function (email, password, result) {
  if (email && password) {
    conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (err, res) {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      result({
        kind: 'usuario não encontrado'
      }, null);
    });
  }
};

Users.findById = function (usersId, result) {
  conn.query('SELECT * FROM users where id =' + usersId, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found users: ', res[0]);
      result(null, res[0]);
      return;
    } // not found users with the id


    result({
      kind: 'not_found'
    }, null);
  });
};

Users.getAll = function (result) {
  conn.query('SELECT * FROM users', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('users: ', res);
    result(null, res);
  });
};

Users.updateById = function (id, users, result) {
  conn.query('UPDATE users SET name = ?, email = ? password = ? WHERE id = ?', [users.name, users.email, users.password, id], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found users with the id
      result({
        kind: 'not_found'
      }, null);
      return;
    }

    console.log('usuario atualizado: ', _objectSpread({
      id: id
    }, users));
    result(null, _objectSpread({
      id: id
    }, users));
  });
};

Users.remove = function (id, result) {
  conn.query('DELETE FROM users WHERE id = ?', id, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found users with the id
      result({
        kind: 'not_found'
      }, null);
      return;
    }

    console.log('usuario deletado: ', id);
    result(null, res);
  });
};

Users.removeAll = function (result) {
  conn.query('DELETE FROM users', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log("deletado ".concat(res.affectedRows, " users"));
    result(null, res);
  });
};

module.exports = Users;