module.exports = (client, message, deleted)=>{
    //console.log(deleted.author);
    if(deleted.author.bot) return;
    if(deleted.content.length==1) return;
    var id = deleted.channel.id;
    global.Deleted[id]=deleted;
    //console.log(global.Deleted);
}

