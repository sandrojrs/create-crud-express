var express = require('express');
var router = express.Router();
const app = require('../controllers/indexController');

router.get('/', function (req, res, next) {
  return res.render('cad_user');
});

// Create a new Customer
router.post('/', app.create);
router.get('/find', app.findAll);
router.get('/find/:userId', app.findOne);
router.post('/update/ :userId', app.update);
router.get('/delete/:userId', app.delete);
router.get('/deleteall', app.deleteAll);

module.exports = router;
