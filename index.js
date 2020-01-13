const Discord = require('discord.js');
const { token } = require('./credential');
const { displayGuildsAndChannels, getGeneralTextChannel, 
    checkProfanity,
    helloWorld, kick, terrible, help } = require('./functions');

const client = new Discord.Client();
let channel =  null;

client.on('ready', () => {
    console.log(`Dad Bot is now live: Logged in as ${client.user.tag}!`);
    client.user.setActivity("with your mom");

    // log all guilds and channels, find the general text channel and then send message
    displayGuildsAndChannels(client);
    channelID = getGeneralTextChannel(client);

    if(channelID !== 'No General Text Channel') {
        channel = client.channels.get(channelID);
        channel.send('Dad has arrived');
    }
});

client.on('message', message => {
    // if the message is from Dad Bot do nothing
    if(message.author == client.user) return;

    // if the message does not have a guild do nothing
    if (!message.guild) return;

    // check for bad words
    checkProfanity(message, channel);

    // check commands
    if      (message.content.startsWith('!kick'))   kick(message);
    else if (message.content.startsWith('!hello'))  helloWorld(message, channel);
    else if (message.content.startsWith('!help'))   help(channel);
    else if (message.content.startsWith('!terrible')) terrible(channel);
});

client.login(token);