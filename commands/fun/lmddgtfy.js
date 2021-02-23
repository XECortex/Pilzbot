/*
 * For the people who don't know how to use a search engine
 */

module.exports.exec = async function(client, message, args) {
	message.delete();
	message.channel.send(`https://lmddgtfy.net/?q=${args.join('+')}\nRTFM`);
}
module.exports.category = 'fun';