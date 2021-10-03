const Discord = require('discord.js');
const client = new Discord.Client({partials:['MESSAGE']});
let port = process.env.PORT;
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