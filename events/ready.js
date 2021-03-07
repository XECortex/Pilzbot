const fs = require('fs');
request = new (require("rss-parser"))();

function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }

module.exports = async function(client) {
	log(`Client logged in as \x1b[32m${client.user.tag}\x1b[0m`);
	log('Ready for use!')
	log('');

	const rndmzr = require(`${client.root}rndmzr.js`);

	setInterval(function() {
		client.user.setPresence({ activity: { name: new rndmzr.Doge().wow() }, status: 'idle' });
	}, 5000);

	setInterval(() => {
		request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.ytChannelId}`)
			.then(data => {
				lastYId = fs.readFileSync('./config/lastyid');

				if (lastYId != data.items[0].id) {
					fs.writeFile('./config/lastyid', data.items[0].id, 'utf-8', () => {});
					client.channels.cache.find(channel => channel.id === client.config.announcementChannelId).send(`||@everyone|| Neues Video: ${data.items[0].title}\n${data.items[0].link}`);
				}
			});
	}, 60000);
}