var express = require('express');
var router = express.Router();


var PageHome = require('../controllers/page_home');
/* GET home page. */


router.get('/', function(req, res, next) {
  goHome(req, res, next);
});

router.get('/home', function(req, res, next) {
  goHome(req, res, next);
});


function goHome(req, res, next) {
  var session = req.session;
  console.log('ROOT ROUTE');
  console.log(req.session.login);
  var pageHomeController = new PageHome({
    dict: res.dict,
    session: session
  });
  //res.render('index', { title: 'Express' });
  //
  console.log('Cookies: ', req.cookies);

  pageHomeController.render(function(responseView) {
    res.send(responseView);
  });
  //res.send(pageHomeController.render());
}

module.exports = router;

// includi bootstrap!!!
