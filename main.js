const Discord = require('discord.js');
console.log(Discord.version);
const client = new Discord.Client({partials:['MESSAGE']});
let port = process.env.PORT;

const distube = require('distube');
client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true, youtubeCookie: '__Secure-3PSID=BwhgkAsDP-wTiFKfz6CURJhcJzZigL4oFEUzp0AN3Nem9iO5DiFgu2_3L7dnwHoqiX_9ig.; __Secure-3PAPISID=Q-rvtOqhjX3ub8BV/AnYmj2CedsM1H4IhN; GPS=1; VISITOR_INFO1_LIVE=AsfpqLRc_U4; YSC=vCcgzerhboU; PREF=tz=America.New_York&f6=40000000' });

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