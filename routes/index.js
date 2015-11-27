var express = require('express');
var router = express.Router();
var ctrls = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/push', function(req, res, next){

  res.send("Got " + req.body.notification);
});

router.post('/post', function(req, res, next){
  ctrls.postCtrl.createPost(req.body, function (postCreated){
    if (postCreated)
      res.send("Successfully created.");
    else
      res.send("Could not create post.");
  });
});

module.exports = router;
