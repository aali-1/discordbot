const Discord = require('discord.js');
console.log(Discord.version);
const client = new Discord.Client({partials:['MESSAGE']});
let port = process.env.PORT;

const distube = require('distube');
client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true,});

global.deleted = undefined;
global.edited = undefined;

const fs = require('fs');
const { url } = require('inspector');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})
 
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

client.login('NzcxMTkyMDc1ODE4NzYyMjcw.X5oilg.8Dgd9Pz8iHc_Pymodb-Fj32FabY');