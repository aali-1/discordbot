const distube = require('distube');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['stop','queue','skip','pl','q','3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave','pause','resume','np','remove','nowplaying'],
    description: "entire music bot",
    async execute(client, message, args, Discord, cmd){
    
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('join a vc first...');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You are not allowed to speak in this channel .');
        let queue = client.distube.getQueue(message);


        const arg = args.join(" ");
        if (['play', 'pl'].includes(cmd)){
            client.distube.play(voice_channel, arg,{
                message,
                textChannel:message.channel,
                member : message.member
            });
        }
        if (cmd == "pause") {
            client.distube.pause(message);
            message.reply({content:"Paused :pause_button:",allowedMentions: { repliedUser: false }});
        }
        if (cmd == "resume") {
            client.distube.resume(message);
            message.channel.send("resumed :arrow_forward:");
        }
        if (cmd == "remove"){
            try{
                if (arg==1){
                    message.reply({content:`Removed \`${queue.songs[arg-1].name}\` from the queue`,allowedMentions: { repliedUser: false }})
                    if (queue) {
                        if(queue.songs.length === 1 || queue.songs.length === 0) return client.distube.stop(message);    
                    }
                    client.distube.skip(message);
                }
                if (arg>1){
                    message.reply({content:`Removed \`${queue.songs[arg-1].name}\` from the queue`,allowedMentions: { repliedUser: false }})
                    queue.songs.splice(arg-1,1)
            
                }
            }
           catch(TypeError){
                message.reply({content:'queue is not that big',allowedMentions: { repliedUser: false }})
           }
            
        }
        if (cmd == "stop") {            if (!queue) return;
            client.distube.stop(message);
            message.channel.send("Stopped ur music");
        }
        if (cmd=="np" || cmd=="nowplaying"){
            if (!queue) return message.channel.send(`There is nothing in playing right now`)
            s=queue.songs[0]
            const np_embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setAuthor({
                    name: "Now playing:",
                    iconURL: client.user.avatarURL()
                })
                .setThumbnail(s.thumbnail)
                .setDescription(s.name+` - \`${s.formattedDuration}\``)
                .setURL(s.url);
            if (s.member.nickname==null){
                np_embed.setFooter({ text: `Requested by: ${s.user.username}#${s.user.discriminator}`});
            }
            else{
                np_embed.setFooter({ text: `Requested by: ${s.member.nickname} (${s.user.username}#${s.user.discriminator})`});
            }
            message.channel.send({embeds:[np_embed]});
        }
        if (cmd == "skip"){
            if (!queue) return;
            if(queue.songs.length==1){
                client.distube.stop(message)

            }
            else{
                try {
                    const song = queue.skip()
                    message.channel.send(`Skipped .`)
                } 
                catch (e) {
                    message.channel.send(`${client.emotes.error} | ${e}`)
                }
            }
        }
        if (['q', 'queue'].includes(cmd)) {
            let queue = client.distube.getQueue(message);
            if(!queue) return;
            const queuestring = String(queue.songs.map((song, id) =>`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 30).join("\n"));
            const q_embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Current Queue:')
                .setDescription(queuestring);
            message.channel.send({embeds:[q_embed]})
        }
        if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave'].includes(cmd)) {
            if (!queue) return message.channel.send(`There is nothing in the queue right now`)
            let filter = client.distube.setFilter(message, cmd);
            message.channel.send("Current queue filter: " + (filter || "Off"));
        }

    }
}