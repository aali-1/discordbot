const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'replay',
    description: "replay a deleted message",
    execute(client, message, args){
        //console.log(message)
        deleted=global.Deleted[message.channel.id];
        if (typeof deleted === 'undefined') {
            
        }
        else{
            test=Array.from(deleted.attachments)
            if(message.channel.id == deleted.channel.id){
            if(test.length > 0){
                test=Array.from(deleted.attachments)
                const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setImage(test[0][1].proxyURL)
                .setAuthor({
                    name: deleted.author.username,
                    iconURL: deleted.author.avatarURL({dynamic : true})
                })
                .setDescription(deleted.content)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
            }
            else{
                const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setAuthor({
                    name: deleted.author.username,
                    iconURL: deleted.author.avatarURL({dynamic : true})
                })
                .setDescription(deleted.content)
                .setTimestamp();
                message.channel.send({embeds: [embed]})
                }
            }
        }
    }
}
