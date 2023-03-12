const Discord = require("discord.js");
const bot = new Discord.Client();
const axios = require("axios").default;
const ping = require("minecraft-server-util");
const mcinfo = require("mcinfo");
const fetch = require('node-fetch');
var objectPath = require("object-path");
const fs = require('fs'),
    nbt = require('prismarine-nbt');
const Hypixel = require('hypixel-api-reborn');
const Jimp = require('jimp');
const sizeOf = require('image-size');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// ERROR CODES:

// 0001: Invalid Argument... User has used a command that isnt in the command list
// 0002: 2nd Argument needed to purge... in order to purge, User needs to specify the amount of messages user wants to purge. e.g. user want to clear 2 messages, so user would type !kiwipurge 2
// 0003: Server IP address needed... User needs to include the server IP as the second argument
// 0004: Server Port needed. User needs to include the server Port as the third argument
// 0005: Server IP or Port doesn't exist... The Server IP or Port the user has entered does not exist
// 0006: MC username needed as second argument... You need to include the MC username of the profile you want ot search for.
// 0007: Missing 3rd Argument... In the function mcuser, you need to have a 3rd argument validity

const token = "NzAzMDc2NzQzMjk2MDU3Mzc0.Xt7-Ew.DwBhUpJKWdwrMR3FdZLaUoGC9ck";

const PREFIX = "kt!";

bot.on("ready", () => {
    console.log("This Bot is ONLINE!");
});

// functions and variables for later use in commands

function getRandomInt(max) {
    // number randomizer, "max" is the amount of number u want to randomize. e.g. getRandomInt(2) will give u a random number between 0 and 1
    return Math.floor(Math.random()* Math.floor(max));
}

var botversion = "ver. 1.0.1";

//commands
bot.on("message", async msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        
        case "status":
            try {
                bot.commands.get("status").execute(msg, args);
            } catch(error) {
                throw error;
            }
        break;

        case "meme":
            try {
                bot.commands.get("meme").execute(msg, args);
            } catch(error) {
                console.log(error);
            }
        break;

        case "eval":
            bot.commands.get("eval").execute(msg, args);
        break;

        case "ignhist":
            try {
                bot.commands.get("ignhist").execute(msg, args)
            } catch(error) {
                console.log(error);
            }
        break;

        case "mcserver":
            // shows info on selected minecraft server

            if (!args[1]) {
                return msg.channel.send("Minecraft Server IP needed [error code 0003]")
            }
            if (!args[2]) {
                return msg.channel.send("Minecraft Server Port needed (usually 25565) [error code 0004]")
            }

            ping(args[1], parseInt(args[2]), (error, response) => {
                if(error) {
                    msg.reply("Server IP or Port doesn't exist (usually the Port is 25565) [error code 0005]")
                }
                const mcserverembed = new Discord.MessageEmbed()
                .setTitle("MC Server Status")
                .addField("Server IP", response.host)
                .addField("Minecraft Version Req", response.version)
                .addField("Online PLayers", response.onlinePlayers)
                .addField("Max Players", response.maxPlayers)
                .setColor(0xd3e7c1)
                .setFooter(botversion + ", bot by lqshkiwi")


                msg.channel.send(mcserverembed);
            });
        break;


        case "myinfo":
            // shows the embed text effect with some user information
            const myinfoEmbed = new Discord.MessageEmbed()
            .setTitle("User Information", true)
            .addField("User", msg.author.username, true)
            .addField("User Tag", msg.author.tag, true)
            .addField("Current Server", msg.guild.name)
            .setColor(0xd3e7c1)
            .setThumbnail(msg.author.displayAvatarURL())
            .setFooter(botversion + ", bot by lqshkiwi")

            msg.channel.send(myinfoEmbed);
        break;

        case "hello":
            // prints a simple "hello world"-esque statement
            msg.channel.send("hey loser");
        break;
        
        case "vibe":
            // randomizes numbers 0 & 1, and associates whether you are vibing with 0 or one
            var vibeYorN = getRandomInt(2);
            if (vibeYorN == 0) {
                msg.reply("thou art not vibing (lmao absolute clown)");
            } else {
                msg.reply("thou art vibing (woah dude, ur vibing)");
            }
        break;
        
        case "cool":
            // determines whether you are cool with a randomizer function
            var coolYorN = getRandomInt(2);
            if (coolYorN == 0) {
                msg.reply("ur not cool");
            } else {
                msg.reply("look at this chad");
            }
        break;

        case "yt":
            // plugs my yt channel
            msg.channel.send("https://www.youtube.com/channel/UC4CMiIhar9LFw4TKBo-MCzw");
        break;
        
        case "twt":
            // plugs my twitter
            msg.channel.send("https://twitter.com/lqshkiwi");
        break;
        
        case "info":
            // shows some important info like version, author, etc.

            const infoembed = new Discord.MessageEmbed()
            .setTitle("Bot Information", true)
            .addField("Bot Version", botversion)
            .addField("Author", "lqshkiwi, and his tag is kiwi#8368")
            .addField("Current Server", msg.guild.name)
            .setColor(0xd3e7c1)
            .setFooter(botversion + ", bot by lqshkiwi")

            msg.channel.send(infoembed)
        break;
    }
});

bot.login(token);