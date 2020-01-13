// given a client, display all the guilds and channels the client is in
exports.displayGuildsAndChannels = (client) => {
    client.guilds.forEach(guild => {
        console.log(guild.name);
        guild.channels.forEach(channel => {
            console.log(` - ${channel.name}: ${channel.type} ${channel.id}`);
        });
    });
}

exports.getGeneralTextChannel = (client) => {
    let textChannel = 'No General Text Channel'

    client.guilds.forEach(guild => {
        guild.channels.forEach(channel => {
            if(channel.name === 'general') textChannel = channel.id;
        });
    });

    return textChannel;
}

exports.helloWorld = (message, channel) => {
    channel.send(`Hello, ${message.author}`);
}