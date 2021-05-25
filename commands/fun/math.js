const math = require('mathjs');
//Do npm i mathjs in the terminal before pasting the code
const Discord = require('discord.js');

module.exports = {
    name: "calculate",
    description: "Get the answer to a math problem",
    aliases: ['math'],
    timeout: '1000',
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please provide a question');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a valid question')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Math')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}