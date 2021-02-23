/*
 * Destroy the client and kill the process without automatically restarting it
 */
function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }

module.exports.exec = async (client, message, args) => {
	log('Shutting down...');
	await message.channel.send('Bye, see you soon!');
	process.exit(0);
}
module.exports.category = 'dev';