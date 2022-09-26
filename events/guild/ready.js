module.exports = (Discord, client, message)=>{
    client.user.setActivity(`Currently in ${client.guilds.cache.size} servers`);
    const status = (queue) => `Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
    const thing = process.env.tok
    console.log(thing)
client.distube
    .on("playSong", (queue, song) => {
        let msg = `Playing \`${song.name}\` - \`${song.formattedDuration}\` requested by ${queue.songs[0].user.username}#${song.user.discriminator}`
        if (song.playlist) msg = `Playlist: ${song.playlist.name}\n${msg}`
        queue.textChannel.send(msg)
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
    })
    .on("addSong", (queue, song) => queue.textChannel.send(
        `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue`
    ))
    .on("playList", (queue, playlist, song) => queue.textChannel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
    .on("error", (channel, e) => {
        console.error(e)
        channel.send("An error encountered: " + e);
    })
    .on("finish", queue => queue.textChannel.send("No more songs in queue"));
}