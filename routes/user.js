var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('Params: ', req.body);
  res.jsonp({pin:'998877', name:'User 1', manager:'Manager', contact: 'DDDD'});
});

router.get('/:pin', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('Pin received: ', req.params.pin);
  if(req.params.pin === '0'){
      res.jsonp({pin:'', name:'', manager:'', contact: ''});
  }else{
      res.jsonp({pin:'558899', name:'User 1', manager:'Manager', contact: 'DDDD'});
  }
});

module.exports = router;
