const { _parseSearchResultInitialData } = require("yt-search");

module.exports = (client, message, deleted)=>{
    //console.log(deleted.author);
    try{
        if(deleted.author.bot) return;
        if(deleted.content.length==1) return;
    }
    catch{
        return;
    }
    var id = deleted.channel.id;
    global.Deleted[id]=deleted;
    //console.log(global.Deleted);
}

