const Discord = require('discord.js');

module.exports = async (client, message) => {
	if (message.author.bot)
		return;

	if (message.guild) {
		if (message.content.replace(/[^A-Z]/g, '').length > message.content.length / 1.5 && message.content.length > 5) {
			message.channel.send(message.author.toString() + ', YOU ARE sending TOO MANY CAPS in YOUR MESSAGES! :unamused:')
				.then(msg => { msg.delete({ timeout: 10000 }); });
			return message.delete();
		}

		const prefixRegex = new RegExp(`^<@!?${client.user.id}>\\s*`);

		if (prefixRegex.test(message.content))
			return message.channel.send(`My prefix is \`${client.config.prefix}\``);
		if (!(message.content.startsWith(client.config.prefix)))
			return;

		const args = message.content.substr(client.config.prefix.length).split(' ');
		const command = args[0].toLowerCase();
		const commandModule = client.commands.get(command);

		args.shift();

		if (commandModule) {
			if (checkPermission(client, command, commandModule, message))
				commandModule.exec(client, message, args);
			else {
				const permissionEmbed = new Discord.MessageEmbed()
					.setColor(0xf93a2f)
					.setTitle(':no_entry_sign: No permission')
					.setDescription(`${message.author.toString()}, you have no permission to execute this command`);
			
				return message.channel.send(permissionEmbed).then(msg => {
					message.delete({ timeout: 10000 });
					msg.delete({ timeout: 10000 });
				});
			}
		}
	}
}

function checkPermission(client, command, commandModule, message) {
	// If the user has permissions for...
	// ...the category
	if (commandModule.category in client.permissions.users.categories)
		if (client.permissions.users.categories[commandModule.category].includes(message.author.id))
			return true;

	// ...the command itself
	if (command in client.permissions.users.commands)
		if (client.permissions.users.commands[command].includes(message.author.id))
			return true;
	
	// If the roles has permissions for...
	// ...the category
	if (commandModule.category in client.permissions.roles.categories) {
		for (role of client.permissions.roles.categories[commandModule.category]) {
			if (message.member.roles.cache.find(r => r.id == role))
				return true;
		}
	}

	// ...the command itslef
	if (command in client.permissions.users.categories) {
		for (id of client.permissions.users.categories[command]) {
			if (message.author.id == id)
				return true;
		}
	}
	
	return false;
}