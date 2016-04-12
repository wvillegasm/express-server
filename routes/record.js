var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  res.jsonp({locationId: 0, signInTime: '', signOutTime: '', status: 'Non-Signed', saved: false});
});

module.exports = router;
