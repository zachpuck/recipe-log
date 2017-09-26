const express = require('express');
const recipe = {};

const app = express();
const port = process.env.PORT || 5000;

const nav = [{
    Link: '/Recipes',
    Text: 'Recipes'
}, {
    Link: '/Ingredients',
    Text: 'Ingredients'
}];

const recipeRouter = require('./src/routes/recipeRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');



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