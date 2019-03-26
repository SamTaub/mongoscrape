//Require Express to run the server
const express = require('express');

//Initialize Express
const app = express();

//Configure Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//Require Mongoose to interact with the database
const mongoose = require('mongoose');

//Require models for the database
const db = require('./models');

//Establish a Port for the application use
const PORT = process.env.PORT || 3000;

//Establish connection to Mongo Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscrape";

mongoose.connect(MONGODB_URI);

//Require Cheerio to scrape webpage
const cheerio = require('cheerio');

//Require Axios to make 'GET' and 'POST' requests
const axios = require('axios');

//Require Express Handlebars to utilize as the templating engine
const exphbs = require('express-handlebars');

//Set Express Handlebars as the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Scrape profootballfocus.com
app.get('/', function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            const hbsObject = {
                article: dbArticle
            };
            res.render("index", hbsObject);
        }).catch(function (err) {
            res.json(err);
        });
});

//Scrape profootballfocus.com
app.get('/scrape', function (req, res) {
    axios.get('https://www.profootballfocus.com/').then(function (response) {

        const $ = cheerio.load(response.data);

        $('div.news-item').each(function (i, element) {

            let result = {};
            result.title = $(this).children('div.content').children('a').children('h5').text();
            result.link = 'https://www.profootballfocus.com/' + $(this).children('div.content').children('a').attr('href');
            result.summary = $(this).children('div.content').children('p').text();

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        console.log('Scrape complete');
        res.redirect('/');
    });
});

//Get saved articles
app.get('/saved', function(req, res){
    db.Article.find({saved: true})
    .then(function(savedArticle){
        const hbsObject = {
            article: savedArticle
        };
        res.render("saved", hbsObject);
    }).catch(function (err) {
        res.json(err);
    });
});

//Start server
app.listen(PORT, function () {
    console.log(`Mongo Scrape is running on port ${PORT}.`);
});

