module.exports.exec = async function(client, message, args) {
	if (args[0] == '-rf' && args[1] == '/')
		if (args[2] == '--no-preserve-root') return message.channel.send('Pah denkste dir hier gibts löschung oder was?');
		else return message.channel.send('```rm: Es ist gefährlich, rekursiv auf \'/\' zu arbeiten.\nrm: Benutzen Sie --no-preserve-root, um diese Sicherheitsmaßnahme zu umgehen.```');
}
module.exports.category = 'fun';