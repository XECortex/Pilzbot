const Discord = require('discord.js');

module.exports.exec = async function(client, message, args) {
	let ping = await message.channel.send('Pinging...');
	const pingEmbed = new Discord.MessageEmbed()
		.setColor(0x36393f)
		.setTitle(':ping_pong: Pong!')
		.setDescription(`Many data about stuff noone is interested in:\n\`\`\`\nPing: ${Math.round(client.ws.ping)} ms\nLatency: ${ping.createdTimestamp - message.createdTimestamp} ms\nUptime: ${Math.round(client.uptime / 1000 / 60)} minutes\n\`\`\`\n\nSuch debug stuff:\n\`\`\`\nArgs: ${args}\n\`\`\``);
	
	ping.delete();
	return message.channel.send(pingEmbed);
}
module.exports.category = 'dev';