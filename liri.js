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

console.log('Enter "node liri.js + tweets, song "song title", movie "move title" or "other""');

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

//This function will get information pertaining to the song name that the user types in and print the song information in the terminal
function spotifyFunction() {
    //variable used to hold the selected track information
    var track;
    //if variable alternateUserInput is not defined variable track will default to "The Sign"
    if (alternateUserInput === undefined) {
        track = "Yellow";
        //else variable track = variable alternateUserInput
    } else {
        track = alternateUserInput;
    }
    //from Spotify documentation.  type: track, query: value of track which is determined by alternateUserInput variable
    spotify.search({
        type: 'track',
        query: track
    }, function(err, data) {
        //if error occurs console.log Error message
        if (err) {
            console.log('Error occurred: ' + err);
            return;
            //else console.log the Artist, Song, Preview, and Album
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
            console.log("Explicit Content: " + data.tracks.items[0].explicit);
        }
    });
    //the user input will append to the log.txt file(ex. song + song title)
    fs.appendFile("log.txt", ", " + userInput + " " + alternateUserInput);
};

// This function will have the user enter a movie title and pull information which will print to the terminal.
function movieFunction() {
    //console.log when entering the function
    console.log("Entering Movie Function");

    //variable to store the movie title the user inputs
    //if user does not put in any input the movie will default to Mr.Nobody
    var movieTitle;
    if (alternateUserInput === undefined) {
        movieTitle = "Mr. Nobody";
    } else {
        movieTitle = alternateUserInput;
    };


    //Request Code line found in OMDB in class assignment
    //var movieTitle is put in the middle of the URL where the movie title is requested
    request("http://www.omdbapi.com/?t=" + movieTitle + "&plot=short&r=json &tomatoes=true", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var json = JSON.parse(body);
            //Model Fields found at = https://media.readthedocs.org/pdf/omdbpy/latest/omdbpy.pdf
            console.log("Title: " + json.Title);
            console.log("Release Year: " + json.Year);
            console.log("Rating: " + json.imdbRating);
            console.log("Production Country: " + json.Country);
            console.log("Available Languages: " + json.Language);
            console.log("Plot:  " + json.Plot);
            console.log("Cast: " + json.Actors);
            //ROTTEN TOMATOES RATING AND WEBSITE
            console.log("Rotten Tomatoes Score: " + json.tomatoRating);
            console.log("Rotten Tomatoes URl: " + json.tomatoURL);
        }
    });
    //The user input will append to the log.txt file(ex. movie + movie title)
    fs.appendFile("log.txt", ", " + userInput + " " + alternateUserInput);
};

// // //Function needed for other
function otherFunction() {
    fs.readFile("random.txt", "utf8", function(error, body) {
            console.log(body);
            var bodyArr = body.split(",");
            console.log(bodyArr[0]);
            if (bodyArr[0] === "tweets") {
                twitterFunction();
            } else if (bodyArr[0] === "song") {
                spotifyFunction();
            } else if (bodyArr[0] === "movie") {
                movieFunction();
            }

        })
        //The user input will append to the log.txt file(ex. other + my tweets)
    fs.appendFile("log.txt", ", " + userInput + " " + alternateUserInput);
};
