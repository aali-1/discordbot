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
 


client.login('NzcxMTkyMDc1ODE4NzYyMjcw.X5oilg.8Dgd9Pz8iHc_Pymodb-Fj32FabY');