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
