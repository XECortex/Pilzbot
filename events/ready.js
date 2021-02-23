function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }

module.exports = async function(client) {
	log(`Client logged in as \x1b[32m${client.user.tag}\x1b[0m`);
	log('Ready for use!')
	log('');

	const rndmzr = require(`${client.root}rndmzr.js`);

	setInterval(function() {
		client.user.setPresence({ activity: { name: new rndmzr.Doge().wow() }, status: 'idle' });
	}, 5000);
}