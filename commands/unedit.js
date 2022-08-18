const {EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'unedit',
    aliases: ['unedi'],
    description: "see the unedited message",
    execute(client, message, args){
        edited=global.Edited[message.channel.id];
        if (typeof edited === 'undefined') {
            return;
          } 
        else {
            if(edited.channel.id===message.channel.id){
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setAuthor({
                        name: edited.author.username,
                        iconURL: edited.author.avatarURL({dynamic : true})
                    })
                    .setDescription(edited.content)
                    .setTimestamp();
                message.channel.send({embeds: [embed]})
            }
        }
    }
}