const conn = require('../config/connection');

// constructor
const Users = function (users) {
  this.name = users.name;
  this.password = users.password;
  this.date_create = new Date();
};

Users.create = (newusers, result) => {
  conn.query('INSERT INTO users SET ?', newusers, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created users: ', { id: res.insertId, ...newusers });
    result(null, { id: res.insertId, ...newusers });
  });
};

Users.findById = (usersId, result) => {
  conn.query('SELECT * FROM users where id =' + usersId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found users: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found users with the id
    result({ kind: 'not_found' }, null);
  });
};

Users.getAll = (result) => {
  conn.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('userss: ', res);
    result(null, res);
  });
};

Users.updateById = (id, users, result) => {
  conn.query(
    'UPDATE users SET name = ?, password = ? WHERE id = ?',
    [users.email, users.name, users.active, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found users with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated users: ', { id: id, ...users });
      result(null, { id: id, ...users });
    }
  );
};

Users.remove = (id, result) => {
  conn.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found users with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted users with id: ', id);
    result(null, res);
  });
};

Users.removeAll = (result) => {
  conn.query('DELETE FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Users;
