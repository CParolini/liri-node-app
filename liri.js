//Required Variables/Dependencies
var fs = require("fs");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var twitterKeys = keys.twitterKeys;

// //input variables
var userInput = process.argv[2];
var alternateUserInput = process.argv[3];

console.log('Enter "tweets", "song", "movie" or "other"');

// //**********SWITCH CASE COMMAND**********

switch (userInput) {
    case 'tweets':
        twitterFunction();
        break;

    case 'song':
        spotifyFunction();
        break;

    case 'movie':
        movieFunction();
        break;

    case 'other':
        otherFunction();
        break;

    default:
        console.log("Enter 'myTwitter', 'spotifyThisSong', 'movieThis', or 'Other'");
}

//This is the function to be called when user inputs node app.js tweets.  This function will pull 20 twitter posts and print them in the terminal
function twitterFunction() {
    //for user based authentication.  Var client now holds the twitter keys that are stored in keys.js
    var client = new twitter(twitterKeys);
    //passing the endpoint and parameters.
    client.get("statuses/user_timeline", {
            count: 20
        }, function(error, tweets, response) {
            if (!error)
            //object"tweets".methodName"forEach"--->using forEach method to execute the function
                tweets.forEach(function(tweet) {
                //console.logging tweet text, creation time, times favorited, times retweeted
                console.log(tweet.text);
                console.log("Created: " + tweet.created_at);
                console.log("Favorited: " + tweet.favorite_count + " times");
                console.log("Retweeted: " + tweet.retweet_count + " times");
                console.log("***********************************");
            });
        })
        //the user input will append to the log.txt file(ex. my tweets)
    fs.appendFile("log.txt", ", " + userInput);
};
