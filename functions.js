const Discord = require('discord.js');
const axios = require('axios');
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

// return picture for terrible comment
exports.terrible = (channel) => {
    const attachment = new Discord.Attachment('terrible.JPG');
    channel.send(attachment);
}

// if I call for ban, then ban 
exports.ban = (message) => {
    // 633847834801602565 is my id number; only I have the authority to ban someone
    if(message.member.user.id !== '633847834801602565') {
        message.reply('I don\'t listen to betas. Sorry');
    } else {

        const user = message.mentions.users.first();
        if(user) {
            const member = message.guild.member(user);

            if (member) {
                member.ban({
                  reason: 'Dad told me to',
                }).then(() => {
                  message.reply(`Yes Dad, I ban-hammered ${user.tag}`);
                }).catch(err => {
                  message.reply('Sorry Dad, I was unable to ban the member');
                  console.error(err);
                });
            } else {
                message.reply('Dad, that user isn\'t in this guild!');
            }
        } else {
            message.reply('Dad, You didn\'t mention a user to ban-hammer');
        }
    }
}

// returns a random dad joke from api
exports.joke = (message) => {
    axios.get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes').then(res => {
        message.reply(`${res.data.setup}...\n${res.data.punchline}`);
    }).catch(err => {
        console.log(err);
        message.reply('Dad Bot can\'t think of a joke right now...');
    });
}

// user gives a bad command 
exports.badCommand = (message) => {
    message.reply('Son, that\'s a bad command. Try typing !help for some real commands');
}

// gives the user the commands you can type
exports.help = (channel) => {
    let commands = '!hello\n!kick\n!ban\n!terrible\n!joke\n!help';
    channel.send(`Here are the commands:\n${commands}`);
}