const express = require('express');
const recipe = {};

const app = express();
const port = process.env.PORT || 5000;

const recipeRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

let recipes = [
    {
        title: 'chicken pot pie',
        Ingredients: 'pie crust, peas, carrots, chicken',
        time: '1 hr',
        haveCooked: false
    },
    {
        title: 'ramen noodles',
        Ingredients: 'noodles, shrimp, dashi, mushrooms',
        time: '30 mins',
        haveCooked: true
    }
];

recipeRouter.route('/')
    .get(function(req, res) {
        res.render('recipes', {
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

recipeRouter.route('/quick')
    .get(function(req, res) {
        res.send('hello quick recipes');
    });

app.use('/Recipes', recipeRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'welcome to the recipe log',
        nav: [{
                Link: '/Recipes',
                Text: 'Recipes'
            }, {
                Link: '/Ingredients',
                Text: 'Ingredients'
            }]
    });
});

app.get('/Recipes', function(req, res){
    res.send('welcome to the recipe list');
});

app.listen(port, function(err) {
    console.log('running server on port ', port);
});

console.log(recipe);