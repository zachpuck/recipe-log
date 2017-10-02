const express = require('express');
const authRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

const router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
            let url = 'mongodb://localhost:27017/recipeApp';
            mongodb.connect(url, function(err, db) {
                let collection = db.collection('users');
                let user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user,
                    function(err, results) {
                        req.login(results.ops[0], function() {
                            res.redirect('/auth/profile');
                        });
                    });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;