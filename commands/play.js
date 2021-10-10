const distube = require('distube');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['stop','queue','skip','pl','q','3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave','pause','resume'],
    description: "entire music bot",
    async execute(client, message, args, Discord, cmd){
        
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('join a vc first...');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You are not allowed to speak in this channel .');
        
        const arg = args.join(" ");
        let queue = client.distube.getQueue(message);

        if (['play', 'pl'].includes(cmd)){
            client.distube.play(message, arg);
        }
        if (cmd == "pause") {
            client.distube.pause(message);
            message.reply({content:"Paused :pause_button:",allowedMentions: { repliedUser: false }});
        }
        if (cmd == "resume") {
            client.distube.resume(message);
            message.channel.send("resumed ur music");
        }
        if (cmd == "stop") {
            client.distube.stop(message);
            message.channel.send("Stopped ur music");
        }
        if (cmd == "skip"){
            if (queue) {
                if(queue.songs.length === 1 || queue.songs.length === 0) return client.distube.stop(message);    
            }

            client.distube.skip(message);
            message.channel.send("Skipped .");
        
        }
        if (['q', 'queue'].includes(cmd)) {
            
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 30).join("\n"));
        }

        if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave'].includes(cmd)) {
            let filter = client.distube.setFilter(message, cmd);
            message.channel.send("Current queue filter: " + (filter || "Off"));
        }

    }
}