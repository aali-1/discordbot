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
            client.distube.on("playSong", (message, queue, song) => message.channel.send(
                `🎶 Now playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${message.author.username}\n${status(queue)}`
            ))
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
        const status = (queue) => `Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
        client.distube
            .on("initQueue", queue => {
                queue.autoplay = false;
            })
            .on("addSong", (message, queue, song) => message.channel.send(
                `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${message.author.username}`
            ))
            .on("playList", (message, queue, playlist, song) => message.channel.send(
                `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${message.author.username}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
            ))
            .on("addList", (message, queue, playlist) => message.channel.send(
                `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
            ))
            .on("error", (message, e) => {
                console.error(e)
                message.channel.send("An error encountered: " + e);
            })
            .on("finish", message => message.channel.send("No more songs in queue"));
    }
}