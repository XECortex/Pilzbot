function log(data) { console.log(`\x1b[1m[INFO]\x1b[0m ${data}`); }

module.exports = async function(client) {
	log(`Client logged in as \x1b[32m${client.user.tag}\x1b[0m`);
	log('Ready for use!')
	log('');

	setInterval(function() {
		client.user.setPresence({ activity: { name: new Doge().get() }, status: 'idle' });
	}, 5000);
}

class Doge {
	constructor() {
		const date = new Date();
		
		if (date.getMonth() == 10 && date.getDate() > 17) this.words = ['halloween', 'scary', 'ghosts', 'boo', 'candy', 'tricks or treats', 'trick', 'treat', 'costume', 'dark', 'night'];
		else if (date.getMonth() == 10 && date.getDate() > 20 && date.getDate() < 26) this.words = ['christmas', 'xmas', 'candles', 'santa', 'merry', 'reindeers', 'gifts', 'jul', 'carol'];

		this.mode = Math.floor(Math.random() * 5);
	}

	get() {
		if (this.mode == 0) return 'wow';
		else if (this.mode == 1) return `${this.shuffleWords(this.prefixes)} ${this.shuffleWords(this.words)} ${this.shuffleWords(this.suffixes)}`;
		else if (this.mode == 2 || this.mode == 3) return `${this.shuffleWords(this.words)} ${this.shuffleWords(this.suffixes)}`;
		else return `${this.shuffleWords(this.prefixes)} ${this.shuffleWords(this.words)}`;
	}

	prefixes = ['wow', 'such', 'very', 'so much', 'many', 'lol', 'beautiful', 'all the', 'most', 'very much', 'pretty', 'so'];
	words = ['computer', 'hax0r', 'code', 'data', 'internet', 'server', 'hacker', 'terminal', 'doge', 'program', 'free software', 'loop', 'pretty', 'uptime', 'discord', 'bot'];
	suffixes = ['wow', 'lol', 'plz', 'lvl=100'];

	shuffleWords(words) { return words[~~(Math.random() * words.length)]; }
}