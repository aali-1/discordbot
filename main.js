const Discord = require('discord.js');
//const config = require('./config.json');
const client = new Discord.Client({partials:['MESSAGE'],intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_VOICE_STATES"]});

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const distube  = require('distube');
client.distube = new distube.default(client, {searchSongs: 1,leaveOnStop:true,plugins: [new SpotifyPlugin(), new SoundCloudPlugin()], emitNewSongOnly: true, youtubeCookie: 'VISITOR_INFO1_LIVE=AsfpqLRc_U4; PREF=tz=America.New_York&f6=40000000; SID=HggB1Zw5cR2kQ32aaemwew4PupSAPgRriadXeB6En2PLG7b3Mne3rF61sLkbgx91Xm-yJg.; __Secure-1PSID=HggB1Zw5cR2kQ32aaemwew4PupSAPgRriadXeB6En2PLG7b3-jxPRXK6nRzMkkGu29qpaw.; __Secure-3PSID=HggB1Zw5cR2kQ32aaemwew4PupSAPgRriadXeB6En2PLG7b3ahXfw9Etv59FqahRAi6REA.; HSID=A69QBeD_XRWfTs4bd; SSID=AFIISn9THSB1lt9hs; APISID=DKXTTnlifftLnnEf/AIIf0FrkfBMGBl4kd; SAPISID=kIx_5NKNiwbjs6H2/ADX4WhwG7BuE655vF; __Secure-1PAPISID=kIx_5NKNiwbjs6H2/ADX4WhwG7BuE655vF; __Secure-3PAPISID=kIx_5NKNiwbjs6H2/ADX4WhwG7BuE655vF; YSC=Bd_239e-ZnI; CONSISTENCY=AGDxDePoVR-gSOMVdQbilXY3mKc96lGOiFZOkNMfoAWSuRvhqhlxYFyQ1aOUvFmSNv1t_0bZ00hOhQ1A2yN6e0Kto6szEID0rQo4rusMMECT-JiTWDe5kkynAFHs-sYy3Npbf1fmueiXStascEEI68E; LOGIN_INFO=AFmmF2swRQIhAPouGnCzXGLcgcDP8EB_TppYz-OYcoE0v5ZmxmDe8cfaAiBmU6IjWk3oYNyKp3Y64x9vGWLvHPBalt4X433EvyByGg:QUQ3MjNmeDRQR3VmekdwNENnazVtNHhpckE4R3IySlBSQ0EyclQzX1JaWXFraTVjNVBLMjJSR0gyRnJQWGR6REhZSjgySGhZRlZnajdqUjR6WHRMQUZjYzdIeHdlUXRUYXFQeDR2U1VRS1pHdzdIcXNXNVpxQ3dsLThlMU82aC1HYThxSkhWVnZsY21mY0tITllGWWtZNUZ2S29OUW45TVpR; SIDCC=AJi4QfFa1v7E0Yhf2Gs6gHnDwQoyRrP7v8cvay9FQe2g5MFx2iO6c6042daPJHPSf8hnzcFAaA; __Secure-3PSIDCC=AJi4QfGi0KF2aYnQdWaFrv1Q6zhqk-gD9RVPx6ii4GX-qc58dwIXV8sRluAoHTXixEqLfwXjWQ'});

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
