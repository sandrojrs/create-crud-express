const Users = require('../models/indexModel');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//cadastrar dados
exports.create = (req, res) => {
  // VValidar request
  if (!req.body) {
    res.status(400).send({
      message: 'dados vazio!',
    });
  }
  // Criar usuario
  const users = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date_create: '',
  });
  // Salvar no banco de dados
  Users.create(users, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Ocorreu algum erro ao criar clientes.',
      });
    else res.send(data);
  });
};
//login
exports.login = (req, res) => {
  Users.login(req.body.email, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Usuario não encontrado email: ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: 'Senha ou email incorreto',
        });
      }
    } else {
      // res.session.loggedin = true;
      // res.session.res.body.email = res.body.email;
      res.render('index');
    }
  });
};

// todos os registros
exports.findAll = (req, res) => {
  Users.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Ocorreu algum erro ao recuperar clientes.',
      });
    else res.send(data);
  });
};

// recuperar registro por id
exports.findOne = (req, res) => {
  Users.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Usuario não encontrado id: ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Erro ao recuperar o cliente com id ' + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

//atualiza registro por id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Users.updateById(req.params.userId, new Users(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'não encontrado') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Customer with id ' + req.params.customerId,
        });
      }
    } else res.send(data);
  });
};
//exclui registro por parametros
exports.delete = (req, res) => {
  Users.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Customer with id ' + req.params.userId,
        });
      }
    } else
      res.send({
        message: `Customer was deleted successfully!`,
      });
  });
};
//exclui todos os usuarios
exports.deleteAll = (req, res) => {
  Users.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Ocorreu um erro ao excluir usuarios.',
      });
    else
      res.send({
        message: `Todos os usuarios foram deletados com sucesso!`,
      });
  });
};