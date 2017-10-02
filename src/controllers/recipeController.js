const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const recipeController = function(recipeService, nav) {
    let middleware = function(req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };
    let getIndex = function(req, res) {
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
    };

    let getById = function(req, res) {
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
    };
    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    }
}

module.exports = recipeController;