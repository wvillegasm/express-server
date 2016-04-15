var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/siso';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(){
  console.log('Mongoose connection error: ' + dbURI);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected ');
});

var recordSchema = mongoose.Schema({
  pin: {type: String, strict: true},
  status: {type: String, strict: true},
  contact: {type: String, strict: true},
  locationId: {type: Number, strict: true},
  signInTime: {type: String, strict: true},
  signOutTime: {type: String, default: ''},
  insertedDate : {type: Date, default: Date.now },
  updatedDate: {type: Date}
});

var UserSchema = mongoose.Schema({
  pin : {type: String, unique: true, required: true, dropDups: true },
  name : {type: String, String,required: true},
  manager : {type: String, String,required: true},
  contact :{type: String,  Stringrequired: true}
});

var Siso = mongoose.model('SISO', recordSchema);
var UserSchema = mongoose.model('User', UserSchema);

/* GET home page. */
router.post('/', function(req, res) {
  console.log('Accessing server');

  console.log('Values: ', req.body);
  var _id = req.body._id || 0;
  if(_id === 0){
    console.log('\n\n\nNew Record');
    var rec = new Siso(req.body);
    rec.save(function(err){
      if(err){
          res.json({'success':false, 'error':err});
      }else{
        console.log(rec);
        res.json({'success': true, 'records':[{'_id':rec._id, '__v':rec.__v}]});
      }
    });
  }else{
    console.log('\n\n\nUpdate');
  }

});

router.put('/id/:id', function(req, res){
  console.log('Values: ', req.params);
  console.log('Values: ', req.body);
  var id    = req.params.id,
      body  = req.body;

  //res.send({success: true, id: req.params.id});

  Siso.findById(
    id,
    function(err, rec){
      if(err) res.json({'success':false, 'error':err});

      if(!rec){
        return res.status(404).json({success: false, error: 'Record with id: ' + id + ' cannot be found.'})
      }
      rec.update(body, function(err, result){
        if(err) return res.json({success: false});
        res.json(result);
      });

    }
  );


});

router.get('/:pin/status/:status', function(req, res){
  console.log('GET params: ', req.params.pin, req.params.status);
  //res.send({success: true, msg: 'Searching the last record'});
  var pin = req.params.pin || 0;
  if(pin !== 0){
    Siso.findOne({'pin': pin, 'status': req.params.status}, function(err, rec){
      if(err){
        res.json({'success':false, 'error':err});
      }else{
        res.json({'success': true, 'records':(rec !== null)? [rec]:[]});
      }
    });
  }
});

router.get('/:pin', function(req, res){
  console.log('GET', req.params.pin);
  // TODO validate if id exists
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

router.get('/list/:pin', function(req, res){
  var pin = req.params.pin || 0;
  console.log('Current PIN: ', pin);
  if(pin !== 0){
    Siso.find({'pin': pin}).
    sort({insertedDate: -1}).
    limit(5).
    exec(function(err, records){
      if(err){
        res.json({'success':false, 'error':err});
      }else{
        res.json({'success': true, 'records':records});
      }
    });
  }else{
    res.json({'success':false, 'error':'No PIN was received.'});
  }
});

router.get('/user/:pin', function(req, res){
  var pin = req.params.pin || 0;
  console.log('Current PIN: ', pin);
  if(pin !== 0){
    UserSchema.findOne({'pin': pin}).
    exec(function(err, record){
      if(err){
        res.json({'success':false, 'error':err});
      }else{
        res.json({'success': true, 'record':record});
      }
    });
  }else{
    res.json({'success':false, 'error':'No PIN was received.'});
  }
});

router.post('/user', function(req, res){
  console.log('Values: ', req.body);
  var _id = req.body._id || 0;
  if(_id === 0){
    console.log('\n\n\nNew Record');
    var user = new UserSchema(req.body);
    user.save(function(err){
      if(err){
          res.json({'success':false, 'error':err});
      }else{
        console.log(user);
        res.json({'success': true, 'records':[{'_id':user._id, '__v':user.__v}]});
      }
    });
  }else{
    console.log('\n\n\nUpdate');
  }
});

module.exports = router;
