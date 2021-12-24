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
        let arg1 = interaction.options.getString('time');
        let arg2 = interaction.options.getString('format');
        let arg3 = interaction.options.getString('timezone')
        let arguments = [];
        const regex = /^([a-zA-ZåäöÅÄÖ0-9-+_: ]{1,255})$/;
        const regex2 = /^([fFdDtTR]{1})$/;
        console.log(regex.test(arg1));
        if (regex.test(arg1)) {
            arg1 = "\"" + arg1 + "\"";
            if (arg2 !== null && regex2.test(arg2)) {
                arg2 = "-f " + arg2;
                arguments.push(arg2);
            }
            if (arg3 !== null) {
                arg3 = "-t " + arg3;
                arguments.push(arg3);
            }
            arguments.push(arg1)
            await interaction.reply({ content: getTime(arguments), ephemeral: true });
        }
        else {
            await interaction.reply("Incorrect time string");
        }
    }
});


function getTime(args) {
    console.log(args);
    args = args.join(' ');
    args = ' ' + args;
    console.log(args);
    console.log("./time.sh" + args);
    try {
        let output = execSync("./time.sh" + args);
        console.log(output.toString());
        return output.toString() +"\n" + "\`\`\`" + output.toString() + "\`\`\`";
    } catch(e) {
        console.log(e.message)
        return e.stderr.toString();
    }
}


// Login to Discord with your client's token
client.login(token);
