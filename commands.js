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
                .setDescription('choose: t, T, d, D, f (default), F or R')
                .addChoices(
                    [
                        ['Short time', 't'],
                        ['Long time', 'T'],
                        ['Short date', 'd'],
                        ['Long date', 'D'],
                        ['Short date/time (default)', 'f'],
                        ['Long date/time', 'F'],
                        ['Relative time', 'R'],
                    ])
        )
        .addStringOption( option =>
            option.setName('timezone')
                .setDescription('choose Timezone')
                .addChoices([
                        ['ST', "Etc/UTC"],
                        ['Bruvs', 'Europe/London'],
                        ['Drazu pick this!!', 'Europe/Brussels'],
                        ['Finbois', 'Europe/Helsinki']
                    ])
        )
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

