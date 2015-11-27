/**
 * Created by avihay on 11/17/2015.
 */
var model = require("../model/model");
var postController = {};

function sendGCM() {
    var gcm = require('node-gcm');
    var reg_id = //'APA91bH06YFRYy2t_GKJLRlCIqmEsDd1nxZeehxPpKBl0CNI06n29UIjNISPlsYPrM8d4ZuBv_HNXWVORFekY0jlV873fXyiYJbXHKrBw_scIsW8QBG_uUYE02OMI-AedcmiwbvrJ9Zt'
        'APA91bG1Pl_ISwAJCVxSbOQVk-XRhxqalBis2zT86qmCbcfN3YnwFIspz5jUznnfrmKCZ-NLqJcjwqGdkNv_4lRClyxEwakhBtOYIp6A4X8LFk8v2nVQI3q3z3L9QuDjkr7RgXdEKC7E';
    var message = new gcm.Message();
    message.addData('message', 'Noded!');
    message.addData('title', 'Opinio');
    var apiKey = "AIzaSyADsPRDItAeMmYn4ERE0PE5Rbx_xvp1tb8";
    var regTokens = [reg_id];

// Set up the sender with you API key
    var sender = new gcm.Sender(apiKey);

// Now the sender can be used to send messages
    sender.send(message, { registrationTokens: regTokens }, function (err, result) {
        if(err) console.error(err);
        else    console.log(result);
    });
}

postController.createPost = function (postData, callback) {
    var post = new model.models.Post();
    post._id = post.postID = Date.now().toString();
    post.postedBy = postData.userID;
    post.photoPath = postData.photoPath;
    post.price = postData.price;
    post.feedback = [];
    post.privacy = postData.privacy;

    post.save(function(err){
       if (!err){
           console.log("[postController.createPost] Successfully saved post! ");
           callback(true);
           sendGCM();
       } else {
           console.log("[postController.createPost] Could not save post. Error : " + err);
           callback(false);
       }
    });
};

module.exports = postController;