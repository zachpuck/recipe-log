const express = require('express');

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
const ingredientRouter = require('./src/routes/ingredientRoutes')(nav);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/Recipes', recipeRouter);
app.use('/Ingredients', ingredientRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'welcome to the recipe log',
        nav: nav
    });
});

app.listen(port, function(err) {
    console.log('running server on port ', port);
});
