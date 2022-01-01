module.exports = (client, message, deleted)=>{
    //console.log(deleted.author);
    if(deleted.author.bot) return;
    if(deleted.content.length==1) return;
    global.deleted = deleted;
}

