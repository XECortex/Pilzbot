/*
 * Measure the ping of the bot
 */
const Discord = require('discord.js');

module.exports.exec = async (client, message, args) => {
	let ping = await message.channel.send('Pinging...');

	const pingEmbed = new Discord.MessageEmbed()
		.setColor(0x36393f)
		.setTitle(':ping_pong: Pong!')
		.setDescription(`\
\`\`\`\n\
Ping: ${Math.round(client.ws.ping)} ms\n\
Latency: ${ping.createdTimestamp - message.createdTimestamp} ms\n\
Uptime: ${Math.round(client.uptime / 1000 / 60)} minutes\n\
\`\`\`\n\
\`\`\`\nArgs: ${args}\n\`\`\`\
		`);
	
	ping.delete();
	return message.channel.send(pingEmbed);
}
module.exports.category = 'dev';