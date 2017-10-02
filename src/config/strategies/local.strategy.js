const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        let url = 'mongodb://localhost:27017/recipeApp';
        mongodb.connect(url, function(err, db) {
            let collection = db.collection('users');
            collection.findOne({
                    username: username
                },
                function(err, results) {
                    if(results.password === password) {
                        let user = results;
                        done(null, user);
                    } else {
                        done(null, false, {message: 'Bad password'});
                    }
                });
        });
    }));
};