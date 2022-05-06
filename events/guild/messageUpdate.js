module.exports = (client, message, edited)=>{
    var id=edited.channel.id;
    global.Edited[id] = edited;
}
