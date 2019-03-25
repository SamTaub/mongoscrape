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

//Application Routing


//Start server
app.listen(PORT, function() {
    console.log(`Mongo Scrape is running on port ${PORT}.`);
});

