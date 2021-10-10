const distube = require('distube');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['stop','queue','skip','pl','q',`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`,'pause','resume'],
    description: "entire music bot",
    async execute(client, message, args, Discord, cmd){
        const arg = args.join(" ");
        if (['play', 'pl'].includes(cmd)){
            client.distube.play(message, arg);
        }
        if (cmd == "pause") {
            client.distube.pause(message);
            message.channel.send("Paused :pause_button:");
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
            client.distube.skip(message);
            message.channel.send("Skipped .")
        }
        if (['q', 'queue'].includes(cmd)) {
            let queue = client.distube.getQueue(message);
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 30).join("\n"));
        }
        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(cmd)) {
            let filter = client.distube.setFilter(message, command);
            message.channel.send("Current queue filter: " + (filter || "Off"));
        }
        
    }
}