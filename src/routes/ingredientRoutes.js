const express = require('express');
const ingredientRouter = express.Router();

const router = function(nav) {
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
    ingredientRouter.route('/')
        .get(function(req, res) {
            res.render('ingredientListView', {
                title: 'ingredient list',
                nav: nav,
                ingredients: ingredients
            });
        });

    ingredientRouter.route('/:id')
        .get(function(req, res) {
            let id = req.params.id;
            res.render('ingredientView', {
                title: 'ingredient',
                nav: nav,
                ingredients: ingredients[id]
            });
        });
    return ingredientRouter;
};
module.exports = router;