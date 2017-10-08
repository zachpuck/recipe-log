const http = require('http');

const recipeService = function() {
    let getRecipeById = function(id, cb) {

        let options = {
            host: 'food2fork.com',
            path: `/api/get?key=${process.env.FOOD_2_FORK_API_KEY}&rId=` + id,
        };

        let callback = function(response) {
            let str = '';

            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function(err, result) {
                let recipeResult = JSON.parse(str);
                cb(null, recipeResult);
            });
        };
        http.request(options, callback).end();
    };

    return {
        getRecipeById: getRecipeById
    };
};

module.exports = recipeService;