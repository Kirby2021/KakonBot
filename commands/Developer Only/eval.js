const Discord = require('discord.js');
const owner = require('../../config.json')

module.exports = {
    name: 'eval',
    description: "Eval Command",
    usage: '[Code]',
    aliases: ['eval'],
    timeout: '3000',
    run: async(client, message, args) => {
   if (!message.author.id.includes(owner)){
      return message.channel.send(
        `Only the Bot Creator can use this command`
      );
    }
        let process = args.join(' ');
        if (!process) {
            return message.channel.send('Please give a code to evaluate!');
        }
        let e;
        try {
            e = eval(process);
        } catch (err) {
            e = err;
        }
        let embed = new Discord.MessageEmbed()
            .setColor('00fff8')
            .addField(':inbox_tray: Input', `\`\`\`${process}\`\`\``)
            .addField(':outbox_tray: Output', `\`\`\`${e}\`\`\``)
            .addField('Type Of', `\`\`\`${typeof e}\`\`\``);
        message.channel.send(embed);
    }
};