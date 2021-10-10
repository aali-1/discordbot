const Discord = require('discord.js');
console.log(Discord.version);
const client = new Discord.Client({partials:['MESSAGE'],intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_VOICE_STATES"]});

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const distube  = require('distube');
client.distube = new distube.default(client, {searchSongs: 0,plugins: [new SpotifyPlugin(), new SoundCloudPlugin()], emitNewSongOnly: true, youtubeCookie: 'VISITOR_INFO1_LIVE=AsfpqLRc_U4; PREF=tz=America.New_York&f6=40000000; GPS=1; YSC=JD_v0x9SGnc; SID=CwgB1fCdMC7fEoHZD9YRwvqq97dqBdHriA4jC4Fe_B0Z9EChusijA_wvpAN4klr8gLNmqQ.; __Secure-1PSID=CwgB1fCdMC7fEoHZD9YRwvqq97dqBdHriA4jC4Fe_B0Z9ECh3yqmKxwczXH4vJBRfSmoBg.; __Secure-3PSID=CwgB1fCdMC7fEoHZD9YRwvqq97dqBdHriA4jC4Fe_B0Z9EChZsKohgjjG5YCcI8Gl8jI5w.; HSID=AFSuV1F1iqnN1bphx; SSID=Ay9nh4nMibQTwqgQH; APISID=fGDOrNpWocAv5uF1/ATrtVFyEXS0j_L7jb; SAPISID=0UKKTd8P5DgFsfpF/AD_OEQCTdZoMryON3; __Secure-1PAPISID=0UKKTd8P5DgFsfpF/AD_OEQCTdZoMryON3; __Secure-3PAPISID=0UKKTd8P5DgFsfpF/AD_OEQCTdZoMryON3; LOGIN_INFO=AFmmF2swRQIgZIBDi6poio8L1ljjoimAM0D6ZvRMTYQWPwLhCqiBckICIQC6JDOvOK7DZ1wwfclUdRgAvrhMCZXNCHN5b-2QntNVNA:QUQ3MjNmdzMxWkl1LTFEV2pwOTFjSWY0Y294aXU1LXo3REQyYTJHOHFkYTVrbHNpTm15dHFqQ0phel80UFI5UlBGQnB6aE1fbVIxSGFOMjJ3aFo0UTV1WXhUTHl1ak4yeDYzLUdJOFlHZTU5OTBrdTZTazJMTFh6TERIQ3F5cWpLeDJLNnlGWDllbVJsMHRuWm93cVFmbTVETkd5eTNkNXdB; CONSISTENCY=AGDxDeP74bVEJvyqQ9icMssoZK4Zvb1z5vTozbE3P6grrBMdsDlYNgs9IGcedvUsYpVaNELSUjHY_yja4a5Al56koPoBvUXoFxCfWBiJnz4hhbViZ6PQUamYLN8eRwAO5zoZQDil_sk6grSjB1CtokydfwugXw_NkYWdwh7nME_eYRKBeRCgntrXY_2J7QhQiQQv0-FMCRQHSCGB6L3IM8F6; SIDCC=AJi4QfHK8RZbjEJVsF76-meZIBHOwX3y9tDDxDDkVnsGSwkj5oGcbBKy9Gb2TXvEkEXmvFuS; __Secure-3PSIDCC=AJi4QfFHFke_sD8LLtB9LzgbJ-qyWwrMUp4IoHkcNTj8Q-vVdWYh_xUcoOxE7MHJUdJm-UAu'});

global.deleted = undefined;
global.edited = undefined;

const fs = require('fs');
const { url } = require('inspector');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})
 
const status = (queue) => `Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
    .on("playSong", (queue, song) => {
        let msg = `Playing \`${song.name}\` - \`${song.formattedDuration}\``
        if (song.playlist) msg = `Playlist: ${song.playlist.name}\n${msg}`
        queue.textChannel.send(msg)
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
    })
    .on("addSong", (queue, song) => queue.textChannel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue`
    ))
    .on("playList", (queue, playlist, song) => queue.textChannel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("error", (channel, e) => {
        console.error(e)
        channel.send("An error encountered: " + e);
    })
    .on("finish", queue => queue.textChannel.send("No more songs in queue"));

client.login('NzcxMTkyMDc1ODE4NzYyMjcw.X5oilg.8Dgd9Pz8iHc_Pymodb-Fj32FabY');