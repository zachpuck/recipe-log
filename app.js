const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

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
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'oatmeal'}));
require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Recipes', recipeRouter);
app.use('/Ingredients', ingredientRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'welcome to the recipe log',
        nav: nav
    });
});

app.listen(port, function(err) {
    console.log('running server on port ', port);
});
