const Discord = require('discord.js');
//const config = require('./config.json');
const client = new Discord.Client({partials:['MESSAGE'],intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_VOICE_STATES"]});

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const distube  = require('distube');
client.distube = new distube.default(client, {searchSongs: 1,leaveOnStop:true,plugins: [new SpotifyPlugin(), new SoundCloudPlugin()], emitNewSongOnly: true, youtubeCookie: 'VISITOR_INFO1_LIVE=AsfpqLRc_U4; PREF=tz=America.New_York&f6=40000000; __Secure-3PSID=HggB1Zw5cR2kQ32aaemwew4PupSAPgRriadXeB6En2PLG7b3ahXfw9Etv59FqahRAi6REA.; __Secure-3PAPISID=kIx_5NKNiwbjs6H2/ADX4WhwG7BuE655vF; GPS=1; LOGIN_INFO=AFmmF2swRgIhAOMK56T_jPJBMLemZlBm_NykxC0O1_CRPYKDyLMU0bu5AiEAwlCviumkedRfxJ9Q3gWuzt8CvOz4ifRsj9sJqnJFwzc:QUQ3MjNmeEpDY1RSdl9Sb0lXUFFVdjJVb1pnUVRjT1IxSmROM3Uwd3AtXzQzaFZ4NXR1ck5JajJRekMyTmY0QTczZk14Mllqb3VVM1VlSkVGQjcxdlM4OXFfNUdOaVRZWEZKaXpoTUE4RzJaS2hvbmhBbnRCRTRfWEFQcnB2VlRoNTY1dENVWXk3YUFDbzlwMkNvUjFhYzA2MVZUYjBzLWtR; YSC=ziBssTIT4mU; __Secure-3PSIDCC=AJi4QfEWWWEGqzBtWAB7cgQrNHUiCMktBAHvZxVeH8n5s1ifTfNEee0fW3WarhEApuq2eJWmXg'});

global.deleted = undefined;
global.edited = undefined;

const fs = require('fs');
const { url } = require('inspector');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})
 

client.login(process.env.DJS_TOKEN);
