const Discord = require('discord.js');
const { profanity } = require('./profanity');

// given a client, display all the guilds and channels the client is in
exports.displayGuildsAndChannels = (client) => {
    client.guilds.forEach(guild => {
        console.log(guild.name);
        guild.channels.forEach(channel => {
            console.log(` - ${channel.name}: ${channel.type} ${channel.id}`);
        });
    });
}

// return the text channel id number, it none then return 'No General Text Channel'
exports.getGeneralTextChannel = (client) => {
    let textChannel = 'No General Text Channel'

    client.guilds.forEach(guild => {
        if(guild.name === 'Scotts Tots') {
            guild.channels.forEach(channel => {
                if(channel.name === 'general') {
                    textChannel = channel.id;
                }
            });
        }
    });

    return textChannel;
}

// check for bad words
exports.checkProfanity = (message, channel) => {
    const messageWords = message.content.split(' ');

    profanity.forEach(word => {
        messageWords.forEach(mesWord => {
            if(mesWord === word) channel.send(`${message.author} don\'t say no-no words`);
        });
    });
}

// if user types !hello, reply 
exports.helloWorld = (message, channel) => {
    channel.send(`Hello, ${message.author}`);
}

// if user types !kick, then kick the user
exports.kick = (message) => {
    const user = message.mentions.users.first();

    // if user isn't a mod then user doesn't have kick authority
    if(!message.member.roles.find(r => r.name === "GOAT")) {
        message.reply('You don\'t have kick permission, dumbass');
        return;
    }

    if (user) {
        const member = message.guild.member(user);

        if (member) {
          member.kick(`${user.tag} was kicked`).then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          }).catch(err => {
            message.reply('Dad couldn\'t kick the member');
            console.error(err);
          });
        } else {
          message.reply('That user isn\'t in this guild, dumbass!');
        }
    } else {
        message.reply('You didn\'t mention a user to kick, dumbass!');
    }

    message.reply('Kick function is being worked on right now. Be patient');
}

exports.terrible = (channel) => {
    const attachment = new Discord.Attachment('terrible.JPG');
    channel.send(attachment);
}

// gives the user the commands you can type
exports.help = (channel) => {
    let commands = '!hello\n!kick\n!help';
    channel.send(`Here are the commands:\n${commands}`);
}