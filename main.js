'use strict';

// Logger functions
function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }
function warn(data) { console.log('\x1b[33m\x1b[1m[WARN]\x1b[0m\x1b[33m', data, '\x1b[0m'); }
function error(data) { console.log('\x1b[31m\x1b[1m[ERROR]\x1b[0m\x1b[31m', data, '\x1b[0m'); }

// Imports
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

// Create the Discord client
const client = new Discord.Client();

//! Bot source directory
// Don't forget the trailing slash
client.config = require('./config/config.json');
client.permissions = require('./config/permissions.json');
client.root = client.config.root;

log('Starting...');
log('')

// Load events and commands
client.load = () => {
	log('Loading event files...');
	const eventFiles = getFilesRecursive(`${client.root}events`);

	for (const file of eventFiles) {
		// Register the new event
		const event = require(file);
		var eventName = path.basename(file);

		if (!eventName.endsWith('.js')) {
			warn(`Invalid event file: \x1b[2m${eventName}\x1b[0m`);
			continue;
		} else
			eventName = eventName.split('.')[0];

		log(`Event \x1b[2m"${eventName}"\x1b[0m loaded`);

		// Bind the event to the client
		client.on(eventName, event.bind(null, client));
	}

	log('');
	log('Loading command files...');

	// Save the commands in a collection so we can access them later
	client.commands = new Discord.Collection();
	const commandFiles = getFilesRecursive(`${client.root}commands`);

	for (const file of commandFiles) {
		const command = require(file);
		var commandName = path.basename(file);

		if (!commandName.endsWith('.js')) {
			warn(`Invalid command file: \x1b[2m${commandName}\x1b[0m`);
			continue;
		} else
			commandName = commandName.split('.')[0];

		log(`Command \x1b[2m"${commandName}"\x1b[0m loaded`);
		client.commands.set(commandName, command);
	}

	// After all events and commands are loaded, the client can log into the bot account
	log('');
	client.login(client.config.token);
}

// Destroy the client, exit the process and respawn it
client.restart = async () => {
	await client.destroy();

	process.on('exit', function (code) {
		if(code != 300)
			return;

		require('child_process').spawn(process.argv.shift(), process.argv, {
			cwd: process.cwd(),
			detached : true,
			stdio: 'inherit'
		});
	});
    process.exit(300);
}

function getFilesRecursive(dirPath, files = []) {
	const result = fs.readdirSync(dirPath);
	
	for (const file of result)
		if (fs.statSync(dirPath + '/' + file).isDirectory() && file != 'node_modules')
			files = getFilesRecursive(dirPath + '/' + file, files);
		else
			files.push(path.join(dirPath, '/', file));
	
	return files;
}

// And this line starts the fun!
client.load();