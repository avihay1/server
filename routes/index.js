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

router.post('/login', function (req, res, next){

  //ctrls.userCtrl.loginHandler(id, name, age, pictureUrl, email, GPSLocation, following, pushNotificationsToken);
  ctrls.userCtrl.loginHandler(req.body);
  console.log('User logged in ' + JSON.stringify(req.body));
  res.sendStatus(200);
});

router.post('/post', function(req, res, next){
  if (req.busboy) {
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      var postImageStream = ctrls.postCtrl.createFileWriteStream();
      console.log('id: ' + postImageStream.imgId);
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function (data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        postImageStream.imgWriteStream.write(data);
      });
      file.on('end', function () {
        console.log('File [' + fieldname + '] Finished');
        postImageStream.imgWriteStream.end();
        req.body.photoPath = postImageStream.imgId;
        ctrls.postCtrl.createPost(req.body, function (postCreated){
          if (postCreated)
            res.send("Successfully created.");
          else
            res.send("Could not create post.");
        });
      });
    });
  }
  /*
  ctrls.postCtrl.createPost(req.body, function (postCreated){
    if (postCreated)
      res.send("Successfully created.");
    else
      res.send("Could not create post.");
  });*/
});

router.post('/updateProfile', function(req, res, next){

});


module.exports = router;
