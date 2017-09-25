const express = require('express');
const recipe = {};

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res){
    res.send('welcome to the recipe log website');
});

app.get('/recipes', function(req, res){
    res.send('welcome to the recipe list');
});

app.listen(port, function(err) {
    console.log('running server on port ', port);
});

console.log(recipe);