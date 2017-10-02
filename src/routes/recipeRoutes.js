const express = require('express');
const recipeRouter = express.Router();
// https://www.npmjs.com/package/mongodb
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const router = function(nav) {

    recipeRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });
    recipeRouter.route('/')
        .get(function(req, res) {
            let url = 'mongodb://localhost:27017/recipeApp';
            mongodb.connect(url, function(err, db) {
                let collection = db.collection('recipes');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render('recipeListView', {
                            title: 'recipe list',
                            nav: nav,
                            recipes: results
                        });
                    });
            });
        });

    recipeRouter.route('/:id')
        .get(function(req, res) {
            let id = new ObjectId(req.params.id);
            let url = 'mongodb://localhost:27017/recipeApp';
            mongodb.connect(url, function(err, db) {
                let collection = db.collection('recipes');
                collection.findOne({_id: id},
                    function (err, results) {
                        res.render('recipeView', {
                            title: 'recipe',
                            nav: nav,
                            recipe: results
                        });
                    });
            });
        });
    return recipeRouter;
};
module.exports = router;