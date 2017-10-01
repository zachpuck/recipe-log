const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

let recipes = [
    {
        title: 'chicken pot pie',
        ingredients: 'pie crust, peas, carrots, chicken',
        time: '1 hr',
        haveCooked: false
    },
    {
        title: 'ramen noodles',
        ingredients: 'noodles, shrimp, dashi, mushrooms',
        time: '30 mins',
        haveCooked: true
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
            // res.send('inserting recipes');
        });

    return adminRouter;
};

module.exports = router;