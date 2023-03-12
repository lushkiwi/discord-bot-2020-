module.exports = {
    name: "ignhist",
    description: "takes the in-game-name history of the specified user.",
    async execute(msg, args) {
        // npm libraries
        const Discord = require("discord.js");
        const axios = require("axios");

        // functions that need to be defined beforehand
        var botversion = "ver. 1.0.1";

        // code starts here
        if (!args[1]) {
            msg.channel.send("You need to include the MC username as the first argument");
        }
        let requestedmcuser = args[1];

        let getMCProfile = async () => {
            try {
                let MCProfileResponse = await axios.get("https://api.ashcon.app/mojang/v2/user/" + requestedmcuser);
                let MCProfile = MCProfileResponse.data;
                return MCProfile;
            } catch(error) {
                return msg.channel.send("Looks like we had a problem fetching that user!");
            }
        }
        var MCProfileValue = await getMCProfile();
        var mcignhist = JSON.stringify(MCProfileValue.username_history, null, " ");
        var mcignhistFormatted = mcignhist
        .replace(/{/g, "")
        .replace(/}/g, "")
        .replace(/]/g, "")
        .replace(/\[/g, "")
        .replace(/"/g, "")
        .replace(/,/g, "")
        .replace(/changed_at/g, "Changed At")
        .replace(/.000Z/g, "")
        .replace(/username/g, "Username")

        const embed =  new Discord.MessageEmbed()
        .setTitle("MC Username History")
        .addField("UUID", MCProfileValue.uuid)
        .addField("Current IGN", MCProfileValue.username)
        .addField("Username History", mcignhistFormatted)
        .setColor(0xd3e7c1)
        .setFooter(botversion + ", bot by lqshkiwi")

        const ignhistTEMPembed = new Discord.MessageEmbed()
        .setTitle("MC Username History")
        .addField("UUID", MCProfileValue.uuid)
        .addField("Current IGN", MCProfileValue.username)
        .setColor(0xd3e7c1)
        .setFooter(botversion + ", bot by lqshkiwi")

        
        if (mcignhistFormatted.length >= 1024) {
            embed.spliceFields(3, 1);
            msg.channel.send(ignhistTEMPembed);
            msg.channel.send("It seems that this user's IGN history is over 1024 characters. So, we have to send it as a seperate message!\n" + "**" + requestedmcuser + "'s IGN history:**");
            msg.channel.send(mcignhistFormatted);
        }

        msg.channel.send(embed);

    }
}