var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.isAuth = true;
  console.log(req.session.id)
 // res.render('index', { title: 'Express' });
 res.send("Credential Error")
});

module.exports = router;
