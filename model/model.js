'use strict';

var mongoose = require('mongoose');

var model = function(){};
var schemas = {};
var models = {};

model.prototype = {
    'init': function (){

        mongoose.connect('mongodb://localhost/Data',
            {user: 'dataWriter', pass: 'Aa1234567'}
        );
        mongoose.connection.on("error", function(err){
            console.log(err+'ERROR!! Could not connect to database [mongoHandler]');
        });
        mongoose.connection.once("open", function() {
            console.log("Connected.");
        });

        schemas.userSchema = new mongoose.Schema({
            _id: String,
            pushNotificationsToken: String,
            name: String,
            age: String,
            pictureUrl: String,
            email: String,
            GPSLocation: String,
            favorites: [{postID: {type: mongoose.Schema.Types.String, ref: 'Post'}}],
            following: [{userID: {type: mongoose.Schema.Types.String, ref: 'User'}}]
        });
        schemas.postSchema = new mongoose.Schema({
            _id: String,
            postedBy: {type: mongoose.Schema.Types.String, ref: 'User'},
            photoPath: String,
            price: String,
            feedback: [{userID: {type: mongoose.Schema.Types.String, ref: 'User'}, like: Number}],
            createdOn: { type: Date, default: Date.now },
            privacy: Number
        });

        models.User = mongoose.model('User', schemas.userSchema);
        models.Post = mongoose.model('Post', schemas.postSchema);
    }
};

var instance = new model();

module.exports = {
    instance: instance,
    models: models
}