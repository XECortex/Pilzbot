/*
 * Call the client restart function (defined main.js)
 */
function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }

module.exports.exec = async (client, message, args) => {
	log('Restarting...');
	await message.channel.send('Shutting down, please wait some seconds...');
	client.restart();
}
module.exports.category = 'dev';