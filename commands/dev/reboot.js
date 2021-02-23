function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }

module.exports.exec = async function(client, message, args) {
	log('Restarting bot...');
	await message.channel.send('`Ok gonna reboot`');
	client.restart();
}
module.exports.category = 'dev';