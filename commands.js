const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { timezones } = require('./timezones.json');

const commands = [
    new SlashCommandBuilder()
        .setName('timestamp')
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
                .setDescription('choose Timezone')
                .addChoices(timezones)
        )
        .addStringOption(option =>
            	option
                	.setName("message")
			.setDescription('type a message to the channel')
        )
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

