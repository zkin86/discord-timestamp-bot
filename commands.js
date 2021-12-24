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
                .setDescription('Enter format: t, T, d, D, f (default), F or R')
        )
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

