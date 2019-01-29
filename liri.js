
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

var command = process.argv[2];
var input = "";
//for loop for multiple word inputs so user doesn't need to put quotes around their movie, song, etc.
for (var i=3; i<process.argv.length; i++){
  if(i>3 && i<process.argv.length){
    input = input + "+" + process.argv[i];
  } else{
    input = input + process.argv[i];
  }
}

// switch case looks at what our command is and determines which function to run, if 

function switchCase() {
    switch (command) {
      case 'concert-this':
        concertThis(input);                   
        break;                          
      case 'spotify-this-song':
        spotSong(input);
        break;
      case 'movie-this':
        movieInfo(input);
        break;
      case 'do-what-it-says':
        doWhat();
        break;
        default:                            
        console.log("Invalid Input, please enter a valid command");
        break;
    }
  };
  
  function concertThis(input){

  var queryUrl = "https://rest.bandsintown.com/artists/"+input+"/events?app_id=codecademy";
  
  request(queryUrl, function(error, response, body) {
  
    if (!error && response.statusCode === 200) {
  
      var jsonData = JSON.parse(body);
      
      for (i = 0; i < jsonData.length; i++)
      {
        console.log("\n---------------------------------------------------\n");
        var date = moment(jsonData[i].datetime).format('MM/DD/YYYY');
        console.log("Date: " + date);
        console.log("Name: " + jsonData[i].venue.name);
        console.log("City: " + jsonData[i].venue.city);
        if (jsonData[i].venue.region !== "")
        {
          console.log("Country: " + jsonData[i].venue.region);
        }
        console.log("Country: " + jsonData[i].venue.country);
        console.log("\n---------------------------------------------------\n");
      }
    }
  });
  }

  function spotSong(input) {
  
    var trackSearch;
    if (input === "") {
      trackSearch = "The Sign ace of base";
    } else {
      trackSearch = input;
    }
  
    spotify.search({
      type: 'track',
      query: trackSearch
    }, function(error, data) {
      if (error) {
        console.log('Error occurred: ' + error);
        return;
      } else {
        console.log("\n---------------------------------------------------\n");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[3].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("\n---------------------------------------------------\n");
      }
    });
  };
  function movieInfo(input) {
  
  
    var findMovie;
    if (input === "") {
      findMovie = "Mr. Nobody";
    } else {
      findMovie = input;
    };
  
    var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function(err, res, body) {
        var bodyOf = JSON.parse(body);
      if (!err && res.statusCode === 200) {
        console.log("\n---------------------------------------------------\n");
        console.log("Title: " + bodyOf.Title);
        console.log("Release Year: " + bodyOf.Year);
        console.log("IMDB Rating: " + bodyOf.imdbRating);
        console.log("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
        console.log("Country: " + bodyOf.Country);
        console.log("Language: " + bodyOf.Language);
        console.log("Plot: " + bodyOf.Plot);
        console.log("Actors: " + bodyOf.Actors);
        console.log("\n---------------------------------------------------\n");
      }
    });
  };
  
  function doWhat() {
  fs.readFile('random.txt', "utf8", function(error, data){
  
      if (error) {
          return console.log(error);
        }
   
      var dataArr = data.split(",");
      command = dataArr[0];
      input = dataArr[1];
      switchCase();      
      });
  
  };
  

  
  switchCase();