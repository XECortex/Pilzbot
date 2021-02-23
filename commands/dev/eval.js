/*
 * Execute the given JavaScript expression
 */

const Discord = require('discord.js');
const util = require('util');

module.exports.exec = async (client, message, args) => {
	const code = args.join(' ');
	const evalEmbed = new Discord.MessageEmbed()
		.setTitle('Eval')
		.addField(':inbox_tray: Code:', `\`\`\`js\n${code}\n\`\`\``);

	// Try to execute the given expresseion and send the result, else send the error
	try {
		let evaled = eval(code);

		if (typeof evaled != 'string')
			evaled = util.inspect(evaled);

		evalEmbed.setColor(0x00d166);
		evalEmbed.addField(':outbox_tray: Output:', `\`\`\`bash\n${clean(evaled)}\n\`\`\``);
	} catch (error) {
		evalEmbed.setColor(0xf93a2f);
		evalEmbed.addField(':no_entry_sign: Error:', `\`\`\`bash\n${clean(error)}\n\`\`\``);
	}

	message.channel.send(evalEmbed);

	function clean(text) {
		if (typeof(text) == 'string')
			return text.replace(/`/g, '`' + String.fromCharCode(8203 /* ZERO WIDTH SPACE */)).replace(/@/g, '@' + String.fromCharCode(8203));
		else
			return text;
	}
}
module.exports.category = 'dev';