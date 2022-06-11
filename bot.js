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

    if (commandName === 'timestamp') {
        let arg1 = interaction.options.getString('time');
        let arg2 = interaction.options.getString('format');
        let arg3 = interaction.options.getString('timezone');
        let arg4 = interaction.options.getString('message');
        let args = [];
        let message;
        let eph = true;
        let replyMessage;
        const regex = /^([a-zA-ZåäöÅÄÖ0-9-+_: ]{1,255})$/;
	console.log(arg1);
        if (regex.test(arg1)) {
            if (arg2 !== null) {
 		console.log(arg2);
                arg2 = "-f " + arg2;
                args.push(arg2);
            }
            if (arg3 !== null) {
	        console.log(arg3);
                arg3 = "-t " + arg3;
                args.push(arg3);
            }
            if (arg4 !== null) {
		console.log(arg4);
                eph = false;
                message = arg4;
            }
            arg1 = "\"" + arg1 + "\"";
	    args.push(arg1);
            replyMessage = getTime(args, eph);
            if (!eph) {
                replyMessage = replyMessage + message;
            }
	    console.log(replyMessage.toString());
            await interaction.reply({content: replyMessage.toString() , ephemeral: eph });

        }
        else {
            await interaction.reply({content:"Incorrect time string", ephemeral: true });
        }
    }
});


function getTime(args, eph = true) {
    args = args.join(' ');
    args = ' ' + args;
    console.log("./time.sh" + args);
    try {
        let output = execSync("./time.sh" + args);
        let message;
        message = eph ? output.toString() +"\n" + "\`\`\`" + output.toString() + "\`\`\`" : output.toString();
        return message;
    } catch(e) {
        console.log(e.message)
        return "Invalid time string, check https://www.gnu.org/software/coreutils/manual/html_node/Date-input-formats.html for more info";
    }
}


// Login to Discord with your client's token
client.login(token);
