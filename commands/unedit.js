const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'unedit',
    aliases: ['unedi'],
    description: "see the unedited message",
    execute(client, message, args){
        if (typeof edited === 'undefined') {
            
          } 
        else {
            if(edited){
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor(edited.author.username,edited.author.avatarURL({dynamic : true}))
                    .setDescription(edited.content)
                    .setTimestamp();
                message.channel.send({embeds: [embed]})
            }
        }
    }
}