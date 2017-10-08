const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

let recipes = [
    {
        title: 'chicken pot pie',
        ingredients: 'pie crust, peas, carrots, chicken',
        time: '1 hr',
        recipeId: '28921',
        haveCooked: false
    },
    {
        title: 'ramen noodles',
        ingredients: 'noodles, shrimp, dashi, mushrooms',
        time: '30 mins',
        recipeId: 'e33b45',
        haveCooked: true
    }
];

let ingredients = [
    {
        title: 'vegitable oil',
        brand: 'kroger'
    },
    {
        title: 'olive oil',
        brand: 'napolean'
    }
];

const router = function (nav) {

    adminRouter.route('/addRecipes')
        .get(function (req, res) {
            let url = 'mongodb://localhost:27017/recipeApp';
            mongodb.connect(url, function(err, db) {
                let collection = db.collection('recipes');
                collection.insertMany(recipes,
                    function(err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });
        });

    adminRouter.route('/addIngredients')
    .get(function (req, res) {
        let url = 'mongodb://localhost:27017/recipeApp';
        mongodb.connect(url, function(err, db) {
            let collection = db.collection('ingredients');
            collection.insertMany(ingredients,
                function(err, results) {
                    res.send(results);
                    db.close();
                }
            );
        });
    });

    return adminRouter;
};

module.exports = router;