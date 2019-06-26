
require("dotenv").config();
//create a variable to access keys.js file to access API keys
//create varaialbes for required packages
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const axios = require('axios');
var fs = require("fs");
var moment = require("moment");


//grabs user command
var userCommand = process.argv[2].toLowerCase();
//grabs user search
var userSearch = process.argv.slice(3).join(" ").toLowerCase();


//create if statement in order to execute correct function
if (userCommand === "movie-this") {
    getMovie(userSearch);
}
else if (userCommand === "spotify-this-song") {
    getSong(userSearch)
}
else if (userCommand === "concert-this") {
    getBandDates(userSearch)
}
else if (userCommand === "do-what-it-says") {
    getRandom()
}
else {
    console.log(" Please choose either: concert-this, spotify-this-song, or movie-this")
}

//create function to run axios package

function getMovie(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
    }
    var movieQueryUrl = `http://www.omdbapi.com/?t= + ${movie} + &y=&plot=short&apikey=trilogy`;

    axios.get(movieQueryUrl).then(function (response) {

        console.log("/***********************/\r\n")
        console.log(`Title: ${response.data.Title} \r\n`);
        console.log(`Year Released: ${response.data.Year} \r\n`);
        console.log(`IMDB Rating: ${response.data.imdbRating} \r\n`);
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value} \r\n`);
        console.log(`Country: ${response.data.Country} \r\n`);
        console.log(`Language: ${response.data.Language} \r\n`);
        console.log(`Plot: ${response.data.Plot} \r\n`);
        console.log(`Actors: ${response.data.Actors} \r\n`);  
    })
}

function getSong(song) {
    if (!song) {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {

            return console.log('Error occurred: ' + err);
        }
        console.log("****************** \r\n");
        console.log(data.tracks.items[0]);
        console.log(`Artist: ${data.tracks.items[0].artists[0].name} \r\n`);
        console.log(`Song Name: ${data.tracks.items[0].name} \r\n`);
        console.log(`Preview Link: ${data.tracks.items[0].preview_url} \r\n`);
        console.log(`Album: ${data.tracks.items[0].album.name} \r\n`);
    });
}

function getBandDates(band) {
    var bandQueryUrl = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`;

    axios.get(bandQueryUrl).then(function (response) {
        console.log(response.data);
    });
}

function getRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        getSong(dataArr[1])
    })
};



