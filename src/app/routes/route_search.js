var express = require('express');
var router = express.Router();


var PageSearchResult = require('../controllers/page_search_result');
/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  console.log('Register ROUTE GET');
  var pageSearchResultController = new PageSearchResult({
    dict: res.dict,
    session: session
  });
  //res.render('index', { title: 'Express' });
  //
    console.log('Cookies: ', req.cookies);
  //res.send(pageSearchResultController.render());
  pageSearchResultController.render(function(responseView) {
    res.send(responseView);
  });
});

router.post('/', function(req, res, next) {
  var session = req.session;
  console.log('Register ROUTE POST');
  console.log(req.body);
  var pageSearchResultController = new PageSearchResult({
    dict: res.dict,
    query: req.body.query,
    session: session
  });
  //res.render('index', { title: 'Express' });
  //
  //
  pageSearchResultController.render(function(responseView) {
    res.send(responseView);
  });
});

module.exports = router;
