const express = require('express');
const recipeRouter = express.Router();

const router = function(nav) {
    const recipeService = require('../services/food2forkService')();
    const recipeController = require('../controllers/recipeController')(recipeService, nav);
    recipeRouter.use(recipeController.middleware);
    recipeRouter.route('/')
        .get(recipeController.getIndex);

    recipeRouter.route('/:id')
        .get(recipeController.getById);
    return recipeRouter;
};
module.exports = router;