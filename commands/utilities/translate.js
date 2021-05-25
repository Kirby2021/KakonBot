const { MessageEmbed } = require('discord.js')
const translate = require("@iamtraction/google-translate");

const prefix = require("../../config.json").prefix;

module.exports= {
    name : 'translate',
    description: 'Translate messages',
    usage: '[Code] [Message]',
    timeout: '4000',
    aliases: ['tr'],
    run : async(client, message, args) => {
        const codeD = args[0]
        const messageD = args.slice(1).join(" ")
        if(!codeD) return message.channel.send(new MessageEmbed()
            .setDescription(`**Incorrect Usage. Type \`\`${prefix}help translate\`\` for more usage**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        )
        if(!messageD) return message.channel.send(new MessageEmbed()
        .setDescription(`**Incorrect Usage. Type \`\`${prefix}help translate\`\` for more usage**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
        translate(messageD, { to: codeD }).then(res => { 
           message.channel.send(new MessageEmbed()
                 .addField("Translate", messageD)
                 .addField("To", codeD)
                 .setColor("RANDOM")
                 .addField("Result", res.text)
                 .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
           );
        }).catch(err => { 
            message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setDescription("**Sorry, The language code you specified was incorrect. **")
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
            );
            console.log(err)
       });
       }
    }