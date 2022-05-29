const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('time')
        .setDescription('Replies with timestamp')
        .addStringOption(option =>
            option.setName('time')
                .setRequired(true)
                .setDescription('Enter a time string, for example: now, now + 2 hours, next monday 12:00 UTC, 2021-01-01T12:00+02:00')
        )
        .addStringOption(option =>
            option.setName('format')
                .setRequired(false)
                .setDescription('Choose how timestamp is displayed')
                .addChoices(
                    [
                        ['Short date/time (default)', 'f'],
                        ['Long date/time', 'F'],
                        ['Short time, HH:MM', 't'],
                        ['Long time, HH:MM:SS', 'T'],
                        ['Short date', 'd'],
                        ['Long date', 'D'],
                        ['Relative time', 'R'],
                    ])
        )
        .addStringOption( option =>
            option.setName('timezone')
                .setDescription('choose Timezone (use if you input time in relative format)')
                .addChoices([
                    ['GMT-12', "GMT+12"],
                    ['GMT-11', "GMT+11"],
                    ['GMT-10', "GMT+10"],
                    ['GMT-9', "GMT+2"],
                    ['GMT-8', "GMT+2"],
                    ['GMT-7', "GMT+2"],
                    ['GMT-6', "GMT+2"],
                    ['GMT-5', "GMT+2"],
                    ['GMT-4', "GMT+2"],
                    ['GMT-3', "GMT+2"],
                    ['GMT-2', "GMT+2"],
                    ['GMT-1', "GMT+2"],
                    ['GMT', "GMT"],
                    ['GMT+1', "GMT-1"],
                    ['GMT+2', "GMT-2"],
                    ['GMT+3', "GMT-3"],
                    ['GMT+4', "GMT-4"],
                    ['GMT+5', "GMT-5"],
                    ['GMT+6', "GMT-6"],
                    ['GMT+7', "GMT-7"],
                    ['GMT+8', "GMT-8"],
                    ['GMT+9', "GMT-9"],
                    ['GMT+10', "GMT-10"],
                    ['GMT+11', "GMT-11"],
                    ['GMT+12', "GMT-12"],
                ])
        )
        .addStringOption(option =>
            	option
                	.setName("message")
			.setDescription('type message to the channel')
        )
        .addMentionableOption(option =>
            	option
                	.setName("ping")
			.setDescription('ping a role/person')
        )
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

