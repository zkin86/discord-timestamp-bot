// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { execSync } = require('child_process')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'time') {
        const arg1 = interaction.options.getString('time');
        const arg2 = interaction.options.getString('format');
        let arguments = [];
        arguments.push("\"" + arg1 + "\"");
        if (arg2 !== null) {
            arguments.push(arg2);
        }
        await interaction.reply({ content: getTime(arguments), ephemeral: true });
    }
});


function getTime(args) {
    if (args.length < 3 && args.length > 0) {
        if (args.length === 1) {
            args.push('f');
        }
        args = args.join(' ');
        args = ' ' + args;
        console.log(args);
        let child = execSync("./time.sh" + args);
        console.log(child.toString());
        return child.toString() +"\n" + "\`\`\`" + child.toString() + "\`\`\`";
    } else return 'failed to get time, check time string';
}


// Login to Discord with your client's token
client.login(token);
