/**
 * Created by avihay on 12/29/2015.
 */
var userController = {};
var userModel = require('../model/model').models.User;

userController.loginHandler = function (user) {

    userModel.findOne({_id: user.id}, function (err, results) {
        if (!err) {
            if (results) {

                userModel.findOneAndUpdate({"_id": user.id}, user, {}, function (err) {
                    if (!err) {
                        console.log("User : " + user.name + " was updated successfully.");
                    } else {
                        console.log("Error updating user " + user.name + " Details: " + err);
                    }
                });
             } else {
                var newUser = new userModel(user);
                newUser._id = user.id;
                newUser.save(function (err) {
                    if (!err) {
                        console.log("User : " + user.name + " was added successfully.");
                    } else {
                        console.log("Error adding user " + user.name + ".");
                    }
                });
            }
        }
    });
};

module.exports = userController;