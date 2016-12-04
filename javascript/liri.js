function printMovieListing(movieData){
	"use strict";
	var info = JSON.parse(movieData);
	var output = "Movie Title: " + info.Title + "\n" + "Year Released: " + info.Year + "\n" + "IMDB Rating: " + info. imdbRating + "\n" + "Produced in: " + info.Country + "\n" + "Native Language: " + info.Language + "\n" + "Plot: " + info.Plot + "\n" + "Actors: " + info.Actors + "\n" + "Rotten Tomatoes Score: " + info.tomatoUserMeter + "\n" + "URL: " + info.tomatoURL + "\n";
	console.log(output);
}
function printSongList(songData){
	"use strict";
	var info = JSON.parse(songData).tracks.items[0].album;
	var artistName = JSON.parse(songData).tracks.items[0].album.artists[0].name;
	var trackName = JSON.parse(songData).tracks.items[0].name;
	var albumName = JSON.parse(songData).tracks.items[0].album.name;
	var previewLink = JSON.parse(songData).tracks.items[0].album.preview_url;
	//console.log(info);
	console.log(previewLink);
	//var output = "Artist: " + artistName + "\n" + "Song Title: " + + "\n" + "Preview Link: " + info.spotify + "\n" + "Album: " + ;
}


var keys = require("./keys.js");
var request = require ("request");
//console.log(keys);

var input = process.argv;
input = input.splice(2);
console.log(input);

if (input[0] === "my-tweets"){
	console.log("open access to twitter and pull 10 most recent tweets.");
}
else if (input[0] === "spotify-this-song"){
	console.log("Time to rock out to some tunes.");
	var spotifyQuery = "https://api.spotify.com/v1/search?q=";
	var bandName = input[1];
	spotifyQuery += bandName + "&type=track";
	
	request(spotifyQuery, function(error, response, body){
		"use strict";
		if (error){
			return console.log("Something errored out in the spotify call.");
		}
		if (response.statusCode !== 200){
			return console.log("Request timed out or server was busy.");
		}
		if (!error && response.statusCode === 200){
			console.log("Success!");
			printSongList(body);
		}
	});
}
else if (input[0] === "movie-this"){
	console.log("Lets look up a movie.");
	var movieURL = "http://omdbapi.com/?t=";
	var searchTerm = input[1];
	movieURL += searchTerm + "&tomatoes=true";
	
	request(movieURL, function(error, response, body){
		"use strict";
		if (error){
			return console.log("Something errored out in the omdb call.");
		}
		if (response.statusCode !== 200){
			return console.log("Request timed out or server was busy.");
		}
		if (!error && response.statusCode === 200){
			console.log("Succesful server call was made.");
			printMovieListing(body);
		}
	});
	
	
}
else if (input[0] === "do-what-it-says"){
	console.log("Wildcard.");
}
else{
	return console.log("Something else happened. Abort.");
}