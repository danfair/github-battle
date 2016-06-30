var axios = require('axios');

// in case github rate limits us
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) {
	// returns a Promise
	return axios.get('https://api.github.com/users/' + username + param);
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
	}
};

module.exports = helpers;