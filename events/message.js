const Discord = require('discord.js');

module.exports = async function(client, message) {
	if (message.author.bot) return;

	if (message.guild) {
		if (message.content.replace(/[^A-Z]/g, '').length > message.content.length / 1.5 && message.content.length > 5) {
			message.channel.send(message.author.toString() + ', YOU ARE sending TOO MANY CAPS in YOUR MESSAGES! :unamused:')
				.then(msg => { msg.delete({ timeout: 10000 }); });
			return message.delete();
		}

		const prefixRegex = new RegExp(`^<@!?${client.user.id}>\\s*`);

		if (prefixRegex.test(message.content)) return message.channel.send(`My prefix is \`${client.config.prefix}\``);
		if (!(message.content.startsWith(client.config.prefix))) return;

		const args = message.content.substr(client.config.prefix.length).split(' ');
		const command = args[0].toLowerCase();
		const commandModule = client.commands.get(command);

		args.shift();

		if (commandModule)
			if (commandModule.category != 'dev' || message.author.id == '480060529407164426') commandModule.exec(client, message, args);
			else {
				const permissionEmbed = new Discord.MessageEmbed()
					.setColor(0xf93a2f)
					.setTitle(':no_entry_sign: No permission')
					.setDescription(`${message.author.toString()}, only bot developers can use this command`);
			
				return message.channel.send(permissionEmbed)
					.then(msg => {
						message.delete({ timeout: 10000 });
						msg.delete({ timeout: 10000 });
					});
			}
	}
}