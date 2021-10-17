module.exports = (Discord, client, message)=>{
    client.user.setActivity(`Currently in ${client.guilds.cache.size} servers`);
}