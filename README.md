# Pilzbot
A Discord bot for Pilzschaf's [Discord server](https://discord.com/invite/RS9CuJt)
![Avatar](https://raw.githubusercontent.com/XECortex/Pilzbot/main/pilzbot.png)

# Config
```json
{
    // The directory where the source files are inside
	"root": "/var/node/pilzbot/",
    // Discord bot token
	"token": "xxx",
    // Command prefix, like !, / or -
	"prefix": "sudo ",
    // YouTube Channel ID for YouTube notifications
	"ytChannelId": "xxx",
    // Twitch stream notifications
	"twitch": {
        // Name of Twitch channel (not displayname)
		"channel": "xe_cortex",
        // Search query, most likely your channel name (Your channel should appear on https://www.twitch.tv/search when you search the query)
		"query": "xe%20cortex",
        // Twitch App client ID (https://dev.twitch.tv/docs/api/)
		"clientId": "xxx",
        // Generated secret token (https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#oauth-client-credentials-flow)
		"token": "xxx"
	},
    // Discord channel ID for announcements
	"announcementChannelId": "xxx"
}
```