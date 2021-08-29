const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const client = new Discord.Client({partials:['MESSAGE']});
let port = process.env.PORT;


const prefix = '!';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
});
 
client.on('messageDelete', message => {
    help=message
});

client.on('messageUpdate', (oldMessage, newMessage) => { 
    edited=oldMessage
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    if(command === 'replay'){
        console.log('replay')
        const channel = client.channels.cache.get(message.channel.id);
        if(help){
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(help.author.username,help.author.avatarURL({dynamic : true}))
                .setDescription(help.content)
                .setTimestamp();
            channel.send(embed);
        }
    } 
    if(command.includes('randomize')){
        client.commands.get('randomize').execute(message, args);
    }
    if(command.includes('unedit')){
        const channel = client.channels.cache.get(message.channel.id);
        if (typeof edited === 'undefined') {
            
          } 
        else {
            if(edited){
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor(edited.author.username,edited.author.avatarURL({dynamic : true}))
                    .setDescription(edited.content)
                    .setTimestamp();
                channel.send(embed);
            }
          }
    }
    if(command.includes('randomise')){
        client.commands.get('randomize').execute(message, args);
    }
});
 

client.login('NzcxMTkyMDc1ODE4NzYyMjcw.X5oilg.KNMJRmBxNMYjA_b08SXgy5YDMfs');