module.exports = (client, message, edited)=>{
    console.log(edited.content);
    global.edited = edited;
}
