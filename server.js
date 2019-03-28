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

//API Page for articles
app.get('/api/articles', function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle)
        }).catch(function (err) {
            res.json(err);
        });
});

//API Page for comments
app.get('/comments', function (req, res) {
    db.Comment.find({})
        .then(function (dbComment) {
            res.json(dbComment)
        }).catch(function (err) {
            res.json(err);
        });
});

//API Page for saved articles
app.get('/api/saved', function (req, res) {
    db.Article.find({ saved: true })
        .then(function (savedArticle) {
            res.json(savedArticle);
        }).catch(function (err) {
            res.json(err);
        });
});

//Render articles on homepage
app.get('/', function (req, res) {
    db.Article.find({}).sort({_id: -1}).populate("comment")
        .then(function (dbArticle) {
            const hbsObject = {
                article: dbArticle
            };
            console.log(dbArticle);
            res.render("index", hbsObject);
        }).catch(function (err) {
            res.json(err);
        });  
});


//Render saved articles on /saved
app.get('/saved', function (req, res) {
    db.Article.find({ saved: true })
        .then(function (savedArticle) {
            const hbsObject = {
                article: savedArticle
            };
            res.render("saved", hbsObject);
        }).catch(function (err) {
            res.json(err);
        });
});

//Save articles to saved API and update them in Mongo DB
app.post('/api/saved/:id', function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
        .then(function (article) {
            res.json(article)
        }).catch(function (error) {
            res.json(error)
        });
});
//Create a dummy route for deleted articles
app.post('/api/removed/:id', function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .then(function (article) {
            res.json(article)
        }).catch(function (error) {
            res.json(error)
        });
});


app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("comment")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

app.post("/comments/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    db.Comment.create(req.body)
        .then(function (dbComment) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

app.delete("/comments/:id", function (req, res){
    db.Comment.deleteOne({_id: req.params.id})
    .then(function (dbComment){
        res.json(dbComment);
    })
    .catch(function(err){
        res.json(err);
    });
});

//Start server
app.listen(PORT, function () {
    console.log(`Mongo Scrape is running on port ${PORT}.`);
});

