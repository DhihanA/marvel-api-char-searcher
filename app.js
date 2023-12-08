//Here is where you'll set up your server as shown in lecture code

// import {searchCharacterByName, searchCharacterById} from './data/characters.js';


import express from "express";
const app = express(); // creating an express application
import configRoutes from "./routes/index.js";
import exphbs from 'express-handlebars';

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
  
    // let the next middleware run:
    next();
};

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app); // configuring the routes

// creating a server that listens on port 3000
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});






// try {
//     const result = await searchCharacterByName('spider');
//     console.log(result);
// } catch (e) {
//     console.log(e);
// }

// try {
//     const result = await searchCharacterById('1009609');
//     console.log(result);
// } catch (e) {
//     console.log(e);
// }
