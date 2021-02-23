'use strict';

function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }
function warn(data) { console.log('\x1b[33m\x1b[1m[WARN]\x1b[0m\x1b[33m', data, '\x1b[0m'); }
function error(data) { console.log('\x1b[31m\x1b[1m[ERROR]\x1b[0m\x1b[31m', data, '\x1b[0m'); }

const fs = require('fs');
const path = require('path');
const root = '/var/node/pilzbot/';
const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require(`${root}config.json`);

log('Starting...');

client.load = function() {
	log('Loading event files...');

	const eventFiles = getFilesRecursive(`${root}events`);

	for (const file of eventFiles) {
		const event = require(file);
		var eventName = path.basename(file);

		if (!eventName.endsWith('.js')) {
			warn(`Invalid event file: \x1b[2m${eventName}\x1b[0m`);
			continue;
		} else eventName = eventName.split('.')[0];

		log(`Event \x1b[2m"${eventName}"\x1b[0m loaded`);
		client.on(eventName, event.bind(null, client));
	}

	log('');
	log('Loading command files...');

	client.commands = new Discord.Collection();
	const commandFiles = getFilesRecursive(`${root}commands`);

	for (const file of commandFiles) {
		const command = require(file);
		var commandName = path.basename(file);

		if (!commandName.endsWith('.js')) {
			warn(`Invalid command file: \x1b[2m${commandName}\x1b[0m`);
			continue;
		} else commandName = commandName.split('.')[0];

		log(`Command \x1b[2m"${commandName}"\x1b[0m loaded`);
		client.commands.set(commandName, command);
	}

	log('');

	client.login(client.config.token);
}
client.restart = async function() {
	await client.destroy();
	process.on('exit', function (code) {
		if(code != 300) return;

		require('child_process').spawn(process.argv.shift(), process.argv, {
			cwd: process.cwd(),
			detached : true,
			stdio: 'inherit'
		});
	});
    process.exit(300);
}
client.load();

function getFilesRecursive(dirPath, files = []) {
	const result = fs.readdirSync(dirPath);
	
	for (const file of result)
		if (fs.statSync(dirPath + '/' + file).isDirectory() && file != 'node_modules') files = getFilesRecursive(dirPath + '/' + file, files);
		else files.push(path.join(dirPath, '/', file));
	
	return files;
}