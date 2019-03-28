# ProFootballFocus Scrape

Heroku Deployment [https://murmuring-coast-63656.herokuapp.com/]

## Description

ProFootballFocus Scrape uses Cheerio to scrape the latest NFL news and analysis from profootballfocus.com.  It is a full stack web application that utilizes technologies such as node, express, and mongoDB.

## How to use ProFootballFocus Scrape

* Click on the 'scrape' button which will provide you with the latest news.

* Want to comment?  Click on the 'comment' button to leave your thoughts about the story.

* Regret that comment?  Click on delete to remove your comment from the story.

* Click 'save' to save an article to read later.

* Click on 'View saved' to view your saved articles.  Click on 'remove from saved' to remove a story from the list.

## Technology

* jquery
* express-handlebars
* express
* node
* axios
* cheerio
* bootstrap
* mLab provision for mongoDB
* mongoDB
* Heroku

## Current issues

* Duplicate articles are allowed in the database
* Users are unable to comment on their saved articles
* Comments only clear from the comments collection - their populated article retains the comment ID but the value is changed null until updated.

## Future versions

* Polish frontend UI
* Fix current issues