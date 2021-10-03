const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'replay',
    description: "replay a deleted message",
    execute(client, message, args){
        if (typeof deleted === 'undefined') {
            
        }
        else{
            if(message.channel.id == deleted.channel.id){
            if(deleted.attachments.array().length > 0){
                const result = deleted.attachments.array()
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setImage(result[0].proxyURL)
                .setAuthor(deleted.author.username,deleted.author.avatarURL({dynamic : true}))
                .setDescription(deleted.content)
                .setTimestamp();
                message.channel.send(embed)  
            }
            else{
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(deleted.author.username,deleted.author.avatarURL({dynamic : true}))
                .setDescription(deleted.content)
                .setTimestamp();
                message.channel.send(embed)
                }
            }
        }
    }
}
