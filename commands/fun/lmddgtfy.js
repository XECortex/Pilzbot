module.exports.exec = async function(client, message, args) {
	message.delete();
	message.channel.send(`https://lmddgtfy.net/?q=${args.join('+')}`);
}
module.exports.category = 'fun';