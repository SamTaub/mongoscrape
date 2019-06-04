//Require Mongoose module
const mongoose = require("mongoose");

//Create reference to the Mongoose Schema constructor
const Schema = mongoose.Schema;

//Define a Schema for Comments
const CommentSchema = new Schema({
  //Defines the body of the comment as a string
  body: String
});

//Create model for Comments
const Comment = mongoose.model("Comment", CommentSchema);

//Export Comments model
module.exports = Comment;
