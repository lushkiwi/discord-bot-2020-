module.exports = {
    name: "meme",
    description: "meme maker",
    execute(msg, args) {
        // npm libraries
        const Discord = require("discord.js");
        const Jimp = require('jimp');
        const fs = require('fs');

        // functions that need to be defined beforehand
        var botversion = "ver. 1.0.1";

        // code starts here
        if (!args[1]) return msg.channel.send("You need to give the text you want to apply to the image!");
            if (!msg.attachments.first()) return msg.channel.send("You need to provide an image!");
            try {
                const [topText, bottomText] = args.slice(1).join(" ").split(",");
                msg.channel.startTyping();
                Jimp.read(msg.attachments.first(), (err, lenna) => {
                    Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then(font => {
                        var yAxisMove = 900;
                        if (bottomText.length > 10) {
                            var yAxisMove = 720;
                        }
                        if (err) console.log(err);
                        lenna
                        .resize(1280, 1080)
                        .quality(100) // set quality
                        .print(font, 75, 20, {
                            text: topText,
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                        }, 1100)
                        .print(font, 75, yAxisMove, {
                            text: bottomText,
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                        }, 1100)
                        .write("./tmp/" + msg.author.id +".jpg"); // save
                    });
                });
                if (!bottomText) {
                    let noBottomText = msg.channel.send("You need to add a bottom text! If you dont want a bottom text, just add a period.");
                    let stoptyping = msg.channel.stopTyping();
                    return [noBottomText, stoptyping];
                }
                for (i = 0; i < (1); i++) {
                    setTimeout(function() {
                        msg.channel.send({
                            files: ["./tmp/" + msg.author.id + ".jpg"]
                        })
                        msg.channel.stopTyping();
                        for (i = 0; i < (1); i++) {
                            setTimeout(function() {
                                fs.unlinkSync("./tmp/" + msg.author.id + ".jpg")
                            }, 3 * 1000)
                        }
                    }, 3 * 1000)
                }
            } catch(e) {
                console.warn("There was a problem with the meme command.")
            }
    }
}