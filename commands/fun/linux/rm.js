module.exports.exec = async (client, message, args) => {
	if (args[0] == '-rf' && args[1] == '/')
		if (args[2] == '--no-preserve-root')
			return message.channel.send('No such file or directory: \'/\'');
		else
			return message.channel.send('```rm: it is dangerous to operate recursively on \'/\'\nrm: use --no-preserve-root to override this failsafe```');
}
module.exports.category = 'fun';