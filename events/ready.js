const fs = require('fs');
const request = new (require('rss-parser'))();
const https = require('https');

function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }
function error(data) { console.log('\x1b[31m\x1b[1m[ERROR]\x1b[0m\x1b[31m', data, '\x1b[0m'); }

var wasLive = false;

module.exports = async function(client) {
	log(`Client logged in as \x1b[32m${client.user.tag}\x1b[0m`);
	log('Ready for use!')
	log('');

	const rndmzr = require(`${client.root}rndmzr.js`);

	// Update status
	setInterval(function() {
		client.user.setPresence({ activity: { name: new rndmzr.Doge().wow() }, status: 'idle' });
	}, 5000);

	// Media notivications
	setInterval(() => {
		// YouTube
		request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.ytChannelId}`)
			.then(data => {
				lastYId = fs.readFileSync('./config/lastyid');

				if (lastYId != data.items[0].id) {
					fs.writeFile('./config/lastyid', data.items[0].id, 'utf-8', () => {});
					client.channels.cache.find(channel => channel.id === client.config.announcementChannelId).send(`||@everyone|| ${data.items[0].link}`);
				}
			});
		
		// Twitch
		https.get({ host: 'api.twitch.tv', path: `helix/search/channels?query=${client.config.twitch.query}`, headers: {'client-id': client.config.twitch.clientId, 'Authorization': `Bearer ${client.config.twitch.token}`}}, (res) => {
			var body = '';

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				var json;

				try {
					json = JSON.parse(body);
				} catch (err) {
					error(`Twitch API error: ${err}`);
					return;
				}

				if (json.status == 404) {
					error(`Twitch streamer not found: ${client.config.twitch.query}`)
				} else {
					// log(require('util').inspect(json));
					for (channel of json.data) {
						if (channel.broadcaster_login == client.config.twitch.channel) {
							live = channel.is_live;

							if (live && !wasLive) {
								client.channels.cache.find(channel => channel.id === client.config.announcementChannelId).send(`||@everyone|| https://www.twitch.tv/${client.config.twitch.channel}`);
							}
						
							wasLive = live;
						}
					}					
				}
			});

			res.on('error', (err) => {
				error(`Twitch API error: ${err}`);
			});
		});
	}, 1000);
}