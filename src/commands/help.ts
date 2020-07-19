import {config} from 'dotenv';
import {Message, MessageEmbed} from 'discord.js';

config();
const prefix = process.env.BOT_PREFIX || '->';

const run = async (message: Message) => {
    const embed = new MessageEmbed({
        title: 'Help wanted nigga?',
        description: 'Here you go. Now suck my dick!',
        fields: [
            {
                name: prefix + 'delete',
                value: 'Pass a link and it will go kaboom',
                inline: true
            }
        ]
    });

    await message.author.send(embed);
}

export default {
    run,
    name: 'help',
    description: 'Ma man, how about some help for you?'
}
