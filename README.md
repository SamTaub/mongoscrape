# CScrape: Scrape the latest from CNET

![Image of Home Page](/assets/mongopreview1.png)

## Description

CScrape uses the web scraping technique to generate the latest tech news and rumors from cnet.com. Users can scrape for more news, find links to the lastest news, leave comments, and save articles to read for later.

[Deployed Version](https://murmuring-coast-63656.herokuapp.com/)

## Instructions

- Scraping

  - Click the "Scrape" button to refresh the page for the latest articles from ProFootballFocus

- Commenting
- Click on "Comment" to leave a comment on an article seen on the home page
- Click "Delete" to remove the comment from the article

- Saving
  - Click "Save" to save an article to read later
  - Click "View Saved" at the top of the page to view your saved articles
  - Click "Remove from" to remove an article from your saved list

![Image of Saved Page](/assets/mongopreview2.png)

## Technology used

- HTML5
- CSS3
- Bootstrap
- jQuery
- Express-handlebars
- Express
- Node
- Axios
- Cheerio
- mLab provision for mongoDB
- MongoDB
- Heroku

## Contributions

Contributions to this project are welcome. Feel free to fix current issues or add new features by git cloning the repository and submitting a pull request.

## Current issues

- Duplicate articles are allowed in the database
- Users are unable to comment on articles once they are saved
- The text area in the comment modal stretches outside the modal

## Future versions

- Improve current interface for a more pleasent experience and easier navigation
- Improve the saved articles page by allowing comments
