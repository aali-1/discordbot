module.exports = (client, message, deleted)=>{
    if(deleted.author.id === client.user.id) return;
    if(deleted.content==='.') return;
    global.deleted = deleted;
}

