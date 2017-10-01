const express = require('express');
const ingredientRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const router = function(nav) {
    ingredientRouter.route('/')
        .get(function(req, res) {
            let url = 'mongodb://localhost:27017/recipeApp';
            mongodb.connect(url, function(err, db) {
                let collection = db.collection('ingredients');
                collection.find({}).toArray(
                    function(err, results) {
                        res.render('ingredientListView', {
                            title: 'ingredient list',
                            nav: nav,
                            ingredients: results
                        });
                    });
            });
        });

    ingredientRouter.route('/:id')
        .get(function(req, res) {
            let id = new ObjectId(req.params.id);
            let url = 'mongodb://localhost:27017/recipeApp';
            mongodb.connect(url, function(err, db) {
                let collection = db.collection('ingredients');
                collection.findOne({_id: id},
                    function(err, results) {
                        res.render('ingredientView', {
                            title: 'ingredient',
                            nav: nav,
                            ingredient: results
                        });
                    });
            });
        });
    return ingredientRouter;
};
module.exports = router;