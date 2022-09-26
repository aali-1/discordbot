const Discord = require('discord.js');
const config = require('./config.json');
//const config = require('./config.json');
const client = new Discord.Client({partials:['Partials.Channel'],intents: [
    "Guilds", 
    "GuildMembers", 
    "GuildVoiceStates",
    "MessageContent",
    "GuildMessageReactions",
    "GuildMessages"
]});

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const { DisTube } = require('distube');

client.distube = new DisTube(client, {
    searchSongs: 1,
    leaveOnEmpty: false,
    leaveOnFinish: true,
    leaveOnStop: true,
    plugins: [new SpotifyPlugin({parallel:true}), 
    new SoundCloudPlugin()], 
    emitNewSongOnly: true, 
    nsfw:true,
    youtubeCookie: 'VISITOR_INFO1_LIVE=AsfpqLRc_U4; PREF=tz=America.New_York&f6=40000000; LOGIN_INFO=AFmmF2swRgIhAOMK56T_jPJBMLemZlBm_NykxC0O1_CRPYKDyLMU0bu5AiEAwlCviumkedRfxJ9Q3gWuzt8CvOz4ifRsj9sJqnJFwzc:QUQ3MjNmeEpDY1RSdl9Sb0lXUFFVdjJVb1pnUVRjT1IxSmROM3Uwd3AtXzQzaFZ4NXR1ck5JajJRekMyTmY0QTczZk14Mllqb3VVM1VlSkVGQjcxdlM4OXFfNUdOaVRZWEZKaXpoTUE4RzJaS2hvbmhBbnRCRTRfWEFQcnB2VlRoNTY1dENVWXk3YUFDbzlwMkNvUjFhYzA2MVZUYjBzLWtR; SID=IggB1QUgsxjduK_GjWYe0F2u2vPRcTMjTaI5Hmawis0FC3_iA9LByK2Y_I82TUF3J1LIAA.; __Secure-1PSID=IggB1QUgsxjduK_GjWYe0F2u2vPRcTMjTaI5Hmawis0FC3_iUiL9iwcWYCoWjRtiKGLH4Q.; __Secure-3PSID=IggB1QUgsxjduK_GjWYe0F2u2vPRcTMjTaI5Hmawis0FC3_i6FySvfQ4aFQZ5_sedWbLGQ.; HSID=Akkr9PZR1YWTFnfEn; SSID=ADdmQWZIXrK3hgNY2; APISID=YMGcYi4FuW1IN6wA/A4vuzaexd8A-EKMU9; SAPISID=dHteBhpOuMa98TPb/ARR9rFlFMWaqVwBAE; __Secure-1PAPISID=dHteBhpOuMa98TPb/ARR9rFlFMWaqVwBAE; __Secure-3PAPISID=dHteBhpOuMa98TPb/ARR9rFlFMWaqVwBAE; YSC=cQm32jEqsPc; CONSISTENCY=AGDxDeNqCxKaIZvXFpvkc0ve_yTIjh0PEnfgj89LTVE5ATlAwsZLIQgLAfKvJho9P4TKREDeSzYJJDUz7ZP0rSbJer9wRDVNYU4gGBZLw5Xq6PbSjuCzGRVqK188tTWAF1pn-Km669YEEoBEBICIw4s; SIDCC=AJi4QfHgHm5GoO9w3gCZNKMYkvu_ixYcFj3cCGJUzIUTMASRM7QOr7if65TNFhObQ3gIZPXV; __Secure-3PSIDCC=AJi4QfF2P0jKAB0JLdRu2Cfx8ClXdXxc78hKbR6w1mDaB6Q_nBS6y3GB0wTYQE_HZkwr296YJw'
});
global.Deleted = {};
global.Edited = {};

const fs = require('fs');
const { url } = require('inspector');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

//test
client.login(config.token);
