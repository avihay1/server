/**
 * Created by avihay on 11/2/2015.
 */

var model = require("./model/model");

var demoUser = function (){
    var user = new model.models.User();
    user._id = user.userID = Date.now().toString();
    user.pushNotificationsToken = "sdfdj";
    user.name = "Avishay";
    user.dateOfBirth = "3/8/94";
    user.pictureUrl = "";
    user.GPSLocation = "BS";
    user.favorites = [];
    user.following = [{userID: "1446488490378"}];

    user.save(function(err, rowsaffected){
        if (!err)
            console.log("New user add!");
        else
            console.log(err);
    });

    var post = new model.models.Post();
    post._id = post.postID = Date.now().toString();
    post.postedBy = "1446488490378";
    post.photoPath = "";
    post.price = new Date().getMinutes();
    post.feedback = [{userID: "1446488490378", like: 1}];
    post.privacy = 3;

    post.save(function(err, rowsaffected){
        if (!err)
            console.log("New post add!");
        else
            console.log(err);
    });

};



module.exports = demoUser;