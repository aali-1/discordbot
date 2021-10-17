module.exports = {
    name: "repeat",
    aliases: ["loop", "repaet"],
    description: "repeat idk",
    execute: async (client, message, args, Discord, cmd) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing playing!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        if (mode == null){
            mode = 1;
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        message.channel.send(`:repeat: | Set repeat mode to \`${mode}\``)
    }
}