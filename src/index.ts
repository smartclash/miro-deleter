import {join} from 'path';
import {config} from 'dotenv';
import {readdirSync} from 'fs';
import {Client} from 'discord.js';

config();
const bot = new Client();
const prefix = process.env.BOT_PREFIX || '->';

const commandDiscovery = () => {
    const commandRegistry = {};
    const commandFiles = readdirSync(join(__dirname, '/commands'));
    for (const file of commandFiles) {
        const handler = require(join(__dirname, '/commands/', file));
        commandRegistry[handler.name] = { ...handler };
    }

    return commandRegistry;
}

bot.once('ready', () => {
    console.log('The bot is ready to fucking kill people');
});

bot.on('message', (message) => {
    if (message.channel.id !== '640601166597849110') return;

    // Remove irc username suffix
    const messageContent = message.content.replace(/<.*> /, '');
    const args = messageContent.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();
    const realMessage = args.join(' ');

    const commands = commandDiscovery();
    commands[command].run(realMessage);
});

bot.login(process.env.BOT_TOKEN);
