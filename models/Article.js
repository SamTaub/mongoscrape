//Require Mongoose module
const mongoose = require('mongoose');

//Create reference to the Mongoose Schema constructor
const Schema = mongoose.Schema;

//Define a Schema for Articles
const ArticleSchema = new Schema({
    //Require a title string
    title: {
        type: String,
        required: true
    },
    //Require a link string
    link: {
        type: String,
        required: true
    },
    //Require a summary string
    summary: {
        type: String,
        required: true
    },
    //Create a reference to the associated comment
    comment: {
        type: Schema.Types.ObjectsId,
        ref: "Comment"
    }
});

//Create model for Articles
const Article = mongoose.model("Article", ArticleSchema);

//Export the Aricle Model
module.exports = Article;