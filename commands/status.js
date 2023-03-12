module.exports = {
    name: "status",
    description: "shows the status of the bot",
    execute(msg, args) {
        // npm libraries
        const Discord = require("discord.js");

        // functions that need to be defined beforehand
        var botversion = "ver. 1.0.1";

        // code starts here
        msg.channel.send("im online");
    }
}