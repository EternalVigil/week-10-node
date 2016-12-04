function printMovieListing(movieData) {
	"use strict";
	var info = JSON.parse(movieData);
	var output = "Movie Title: " + info.Title + "\n" + "Year Released: " + info.Year + "\n" + "IMDB Rating: " + info.imdbRating + "\n" + "Produced in: " + info.Country + "\n" + "Native Language: " + info.Language + "\n" + "Plot: " + info.Plot + "\n" + "Actors: " + info.Actors + "\n" + "Rotten Tomatoes Score: " + info.tomatoUserMeter + "\n" + "URL: " + info.tomatoURL + "\n";
	console.log(output);
}

function printSongList(songData) {
	"use strict";
	var info = JSON.parse(songData).tracks.items[0].album;
	var artistName = JSON.parse(songData).tracks.items[0].album.artists[0].name;
	var trackName = JSON.parse(songData).tracks.items[0].name;
	var albumName = JSON.parse(songData).tracks.items[0].album.name;
	var previewLink = JSON.parse(songData).tracks.items[0].album.href;
	var output = "Artist: " + artistName + "\n" + "Song Title: " + trackName + "\n" + "Preview Link: " + previewLink + "\n" + "Album: " + albumName;
	console.log(output);
}

function liriCommand(input) {

	if (input[0] === "my-tweets") {
		console.log("open access to twitter and pull 10 most recent tweets.");
		var twitterURL = "https://api.twitter.com/1.1/status/user_timeline.json?screen_name=VigiltheEternal&count=10";

		var client = new Twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret
		});

		client.get("search/tweets", {
			q: "node.js"
		}, function (error, response, body) {
			"use strict";
			if (error) {
				console.log(error);
				return console.log("Something errored out in the Twitter call.");
			}
			if (response.statusCode !== 200) {
				return console.log("Server timed out or Auth was bad.");
			}
			if (!error && response.statusCode === 200) {
				console.log(body);
			}
		});

	} else if (input[0] === "spotify-this-song") {
		console.log("Time to rock out to some tunes.");
		var spotifyQuery = "https://api.spotify.com/v1/search?q=";
		var bandName = input[1];
		spotifyQuery += bandName + "&type=track";

		request(spotifyQuery, function (error, response, body) {
			"use strict";
			if (error) {
				return console.log("Something errored out in the spotify call.");
			}
			if (response.statusCode !== 200) {
				return console.log("Request timed out or server was busy.");
			}
			if (!error && response.statusCode === 200) {
				console.log("Success!");
				printSongList(body);
			}
		});
	} else if (input[0] === "movie-this") {
		console.log("Lets look up a movie.");
		var movieURL = "http://omdbapi.com/?t=";
		var searchTerm = input[1];
		movieURL += searchTerm + "&tomatoes=true";

		request(movieURL, function (error, response, body) {
			"use strict";
			if (error) {
				return console.log("Something errored out in the omdb call.");
			}
			if (response.statusCode !== 200) {
				return console.log("Request timed out or server was busy.");
			}
			if (!error && response.statusCode === 200) {
				console.log("Succesful server call was made.");
				printMovieListing(body);
			}
		});


	} else if (input[0] === "do-what-it-says") {
		console.log("Wildcard.");
		fs.readFile("../random.txt", function (error, data) {
			"use strict";
			if (error) {
				return console.log("File Read Error.");
			}
			if (!error) {
				console.log("File has been read successfully.");
				data = data.toString();
				data = data.split(",");
				console.log(data);
				liriCommand(data);
			}
		});
	} else {
		return console.log("Something else happened. Abort.");
	}
}

var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var fs = require("fs");
var input = process.argv;
input = input.splice(2);
console.log(input);

liriCommand(input);
