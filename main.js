const Discord = require('discord.js');
//const config = require('./config.json');
const client = new Discord.Client({partials:['MESSAGE'],intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MESSAGE_REACTIONS","GUILD_VOICE_STATES"]});

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const distube  = require('distube');
client.distube = new distube.default(client, {searchSongs: 1,leaveOnStop:true,plugins: [new SpotifyPlugin(), new SoundCloudPlugin()], emitNewSongOnly: true, youtubeCookie: 'VISITOR_INFO1_LIVE=AsfpqLRc_U4; PREF=tz=America.New_York&f6=40000000; LOGIN_INFO=AFmmF2swRQIgZIBDi6poio8L1ljjoimAM0D6ZvRMTYQWPwLhCqiBckICIQC6JDOvOK7DZ1wwfclUdRgAvrhMCZXNCHN5b-2QntNVNA:QUQ3MjNmdzMxWkl1LTFEV2pwOTFjSWY0Y294aXU1LXo3REQyYTJHOHFkYTVrbHNpTm15dHFqQ0phel80UFI5UlBGQnB6aE1fbVIxSGFOMjJ3aFo0UTV1WXhUTHl1ak4yeDYzLUdJOFlHZTU5OTBrdTZTazJMTFh6TERIQ3F5cWpLeDJLNnlGWDllbVJsMHRuWm93cVFmbTVETkd5eTNkNXdB; SID=FAgB1fB4SQnv5vHYkc-BdESvMusXhQd49zjEIp55zbKLYzkmE1E7-yOOHknIxmjbLqabSw.; __Secure-1PSID=FAgB1fB4SQnv5vHYkc-BdESvMusXhQd49zjEIp55zbKLYzkmn-BiOagRGgMvrtHXtzXI8g.; __Secure-3PSID=FAgB1fB4SQnv5vHYkc-BdESvMusXhQd49zjEIp55zbKLYzkmuNw0SDWH5bIZ8OrVisNypA.; HSID=AeeqQcJZGGwfHj9_R; SSID=AHrxryWYTOaJv42du; APISID=dtJMeZxoP9wF1aty/AZz_Fg4cPOTguhOCD; SAPISID=6vvgiw1R2esLo9Ik/At1pTFEivGlErqNMm; __Secure-1PAPISID=6vvgiw1R2esLo9Ik/At1pTFEivGlErqNMm; __Secure-3PAPISID=6vvgiw1R2esLo9Ik/At1pTFEivGlErqNMm; YSC=D2_yA0VJTYY; CONSISTENCY=AGDxDeP_jXoUp1JSABWxfSR3EdtBkH-juKmjZoe2t6S99fc_hm-ltkbFCXDm5zluVBrgb9ir2aU0WCxtXfupFhCZkuJ_vWmWPGwTPVwsXMsOPhUM26Gbbd2QKtj4IVDaI4XIgZYrMK3MFx0rU4ikHrU; SIDCC=AJi4QfE9LUCId9HL4xInuvjUOBZVjCzs0GMvshd2IHPCDAEBDDByzFvCKO8ncIH1Z-IJNUHL; __Secure-3PSIDCC=AJi4QfFRbT9K_58mFaog_236KtC3NZOapx0uA9mWEyZFM961liwMtEKWdTOdcCLkl-3_frE2'});

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
