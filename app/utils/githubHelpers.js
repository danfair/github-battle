var axios = require('axios');

// in case github rate limits us
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) {
	// returns a Promise
	return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
	// fetch username's repos
	return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
	// calculate all users for repos
	return repos.data.reduce(function(prev, current) {
		return prev + current.stargazers_count
	}, 0)
}

function getPlayersData(player) {
	// get repos
	// pass info to get total stars
	// return object with that data
	return getRepos(player.login)
		.then(getTotalStars)
		.then(function(totalStars) {
			return {
				followers: player.followers,
				totalStars: totalStars
			}
		})
}

function calculateScores(players) {
	// return array after doing some fancy calculations
	// to determine a winner
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars
	]
}

var helpers = {
	getPlayersInfo: function(players) {
		// axios.all takes an array of Promises
		// when all Promises are resolved, it runs then()
		return axios.all(players.map(function(username) {
			// players.map will loop over the array
			// and return an array of Promises since 
			// that is what getUserInfo returns
			return getUserInfo(username);
		})).then(function(info) {
			return info.map(function(user) {
				// this eventually returns a Promise so then
				// you can call then() on whatever calls getPlayersInfo
				return user.data;
			})
		}).catch(function(err) {
			// catches any errors in your Promise chain
			console.warn('Error in getPlayersInfo', err);
		})
	},
	battle: function(players) {
		var playerOneData = getPlayersData(players[0]);
		var playerTwoData = getPlayersData(players[1]);

		return axios.all([playerOneData, playerTwoData])
			.then(calculateScores)
			.catch(function(err) { console.warn('Error in getPlayersInfo: ', err)})
	}
};

module.exports = helpers;