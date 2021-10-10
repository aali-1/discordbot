const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'replay',
    description: "replay a deleted message",
    execute(client, message, args){
        test=Array.from(deleted.attachments)
        if (typeof deleted === 'undefined') {
            
        }
        else{
            if(message.channel.id == deleted.channel.id){
            if(test.length > 0){
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setImage(test[0][1].proxyURL)
                .setAuthor(deleted.author.username,deleted.author.avatarURL({dynamic : true}))
                .setDescription(deleted.content)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }
            else{
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setAuthor(deleted.author.username,deleted.author.avatarURL({dynamic : true}))
                .setDescription(deleted.content)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
                }
            }
        }
    }
}
