"use strict";

var express = require('express');

var router = express.Router();

var controller = require('../controllers/indexController');

router.get('/', function (req, res, next) {
  return res.render('./login/login');
});
router.get('/home', function (req, res, next) {
  return res.render('index');
});
router.post('/', controller.create);
router.post('/login', controller.login);
router.get('/find', controller.findAll);
router.get('/find/:userId', controller.findOne);
router.post('/update/ :userId', controller.update);
router.get('/delete/:userId', controller["delete"]);
router.get('/deleteall', controller.deleteAll);
module.exports = router;