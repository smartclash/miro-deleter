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

});

bot.on('message', (message) => {
    if (message.channel.id !== '640601166597849110') return;
    
    const commands = commandDiscovery();
});

bot.login(process.env.BOT_TOKEN)
