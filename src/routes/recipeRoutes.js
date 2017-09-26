const express = require('express');
const recipeRouter = express.Router();

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

recipeRouter.route('/')
    .get(function(req, res) {
        res.render('recipeListView', {
            title: 'recipe list',
            nav: [{
                    Link: '/Recipes',
                    Text: 'Recipes'
                }, {
                    Link: '/Ingredients',
                    Text: 'Ingredients'
                }],
            recipes: recipes
        });
    });

recipeRouter.route('/:id')
    .get(function(req, res) {
        let id = req.params.id;
        res.render('recipeView', {
            title: 'recipe list',
            nav: [{
                    Link: '/Recipes',
                    Text: 'Recipes'
                }, {
                    Link: '/Ingredients',
                    Text: 'Ingredients'
                }],
            recipes: recipes[id]
        });
    });

module.exports = recipeRouter;