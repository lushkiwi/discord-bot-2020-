module.exports = {
    name: "eval",
    description: "evaluates the expression",
    execute(msg, args) {
        // npm libraries
        const Discord = require("discord.js");

        // functions that need to be defined beforehand
        var botversion = "ver. 1.0.1";

        // code starts here
        if (msg.author.tag == "kiwi#8368") {
            msg.channel.send("hey dad");
            try {
                var evaloutput = eval(args.slice(1).join(" "))
                return;
            } catch (error) {
                msg.channel.send("```" + error + "```")
            }
        } else {
            msg.channel.send("you dont have perms for this, only my creator does");
        }
    }
}