const express = require('express');
const recipeRouter = express.Router();
// https://www.npmjs.com/package/mongodb
// const mongodb = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;
const recipeController = require('../controllers/recipeController');

const router = function(nav) {
    const recipeController = require('../controllers/recipeController')(null, nav);
    recipeRouter.use(recipeController.middleware);
    recipeRouter.route('/')
        .get(recipeController.getIndex);

    recipeRouter.route('/:id')
        .get(recipeController.getById);
    return recipeRouter;
};
module.exports = router;