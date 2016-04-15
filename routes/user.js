var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('Params: ', req.body);
  res.jsonp({pin:'998877', name:'User 1', manager:'Manager', contact: 'DDDD'});
});

router.get('/:pin', function(req, res) {
  console.log('GET', req.params.pin);
  // TODO validate if pin exists
  var pin = req.params.pin || 0;
  console.log('Current PIN: ', pin);
  if(pin !== 0){
    Siso.findOne({'pin': pin}, function(err, rec){
      if(err){
        res.json({'success':false, 'error':err});
      }else{
        res.json({'success': true, 'records':[rec]});
      }
    });
  }else{
    res.json({'success':false, 'error':'No PIN was received.'});
  }
});

module.exports = router;
