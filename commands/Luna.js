module.exports = {
    name: 'luna',
    aliases: 'bisharp',
    description: "Luna is washed",
    execute(client, message, args, Discord, cmd){
        if(cmd==="luna")
            message.reply({content:"https://media.discordapp.net/attachments/231417330083692544/888517557265522728/unknown-10.png",allowedMentions: { repliedUser: false }});
        if(cmd==="bisharp")
            message.reply({content:'https://cdn.discordapp.com/attachments/827067376301244416/827256518386384936/bisharpmoment.gif',allowedMentions: { repliedUser: false }});
    }
}