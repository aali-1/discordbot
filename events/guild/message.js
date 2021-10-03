module.exports = (Discord, client, message)=>{
    const prefix = '!';
    const prefix2 = '~';
    if(!message.content.startsWith(prefix) && !message.content.startsWith(prefix2) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    const channel = client.channels.cache.get(message.channel.id);
    if(command) command.execute(client, message, args, Discord, cmd);
}