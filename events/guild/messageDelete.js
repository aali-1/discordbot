module.exports = (client, message, deleted)=>{
    if(deleted.author.bot) return;
    if(deleted.content==='.') return;
    global.deleted = deleted;
}

