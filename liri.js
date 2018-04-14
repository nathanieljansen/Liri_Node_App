require("dotenv").config();
const keys = require("./keys.js")
const Twitter = require("twitter");
const request = require("request");
const Spotify = require("node-spotify-api");
const fs = require('fs');


var spotify = new Spotify(keys.Spotify);
var client = new Twitter(keys.Twitter);

const action = process.argv[2];
const movieName = process.argv[3]
const spotifySong = process.argv[3]

switch (action) {
  case "movie-name":
    return movie(movieName);

  case "my-tweets":
    return tweets();

  case "spotify-this-song":
    return spotify1();

  case "do-what-it-says":
    return doThis();
}

function movie(movie) {

  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body));
    }
  });
}

function movie(movie) {
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body));
    }
  });
}

function tweets() {
  const params = {
    screen_name: 'SippinWhat'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      tweets.forEach(tweet => console.log(tweet.text))
    }
  });
}

function spotify1() {

  spotify.search({
    type: 'track',
    query: spotifySong
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      console.log(data.tracks.items[0].album.artists[0].name)
      console.log(data.tracks.items[0].name)
      console.log(data.tracks.items[0].album.name)
      console.log(data.tracks.items[0].external_urls.spotify)
    }
  })
}

function doThis() {
  fs.readFile("./random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    } else
      var dataArr = data.split(",");
    dataArr.forEach(function (item) {
      // console.log(item) 
        spotify.search({
          type: 'track',
          query: item
        }, function (err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } else {
            console.log(data.tracks.items[0].album.artists[0].name)
            console.log(data.tracks.items[0].name)
            console.log(data.tracks.items[0].album.name)
            console.log(data.tracks.items[0].external_urls.spotify)
            console.log("WTF was that EL FREEZE?")
          }
        })
    })
  })
}