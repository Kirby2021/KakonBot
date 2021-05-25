const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../../models/report')
const schema2 = require('../../models/report2s')
const client = require('../../index')
client.prefix = async function(message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild : message.guild.id })
  
  if(data) {
      custom = data.Prefix;
  } else {
      custom = prefix;
  }
  return custom;
}
module.exports = {
    name : 'report',
    category : 'utilities',
    aliases: ['rm'],
    timeout: '4000',
    description : 'Reports a member',
    usage: '[@Member] [Reason]',

    run : async(client, message, args) => {
        const prefix = await client.prefix(message)
        const member = message.mentions.members.first()
        if(!member) return message.channel.send(`Incorrect Usage`)
        const reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`Incorrect Usage`)
        function generateRandomString(length){
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
            var random_string = '';
            if(length > 0){
              for(var i=0; i < length; i++){
                  random_string += chars.charAt(Math.floor(Math.random() * chars.length));
              }   
    }
    return random_string  
    }
    const random = generateRandomString(10)
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.channel.send(`Sorry for that. Report Module for this server is not enabled`)
            }
            if(data) {
                const channel = message.guild.channels.cache.find(channel => channel.id === data.Channel)
                if(!channel) return message.channel.send(`The report channel for this server is deleted ! DM Server Staff for set report channel again`)
                const title = new MessageEmbed()
                    .setTitle(`:warning: Report System :warning:`)
                    .setDescription(`\`\`${prefix}report-accept ${random}\`\` for Accept. \`\`${prefix}report-decline ${random}\`\` for decline`)
                    .addField(`Reported: `, member)
                    .addField(`By: `,message.author.tag)
                    .addField(`Reason`,reason)
                    .addField(`Report ID`,random)
                    .setColor("YELLOW")
                    .setFooter(`Report Channel: ${message.channel.name}`)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                message.channel.send(`Success ! Your Report ID: ${random} has been sent to Report Channel`)
                channel.send(title)
                
            }
            schema2.findOne({ ID: random , Guild: message.guild.id }, async(err, data2) => {
                if(err) throw err;
                if(!data2) {
                    data2 = new schema2({
                        ID: random,
                        Guild : message.guild.id,
                        User: member.user.id,
                        Reason: reason,
                        Author: message.author.id,
                        Channel: message.channel.id,
                        Status: 'Pending',
                    })
                } else {
                    message.channel.send(`The Report ID: ${random} has been made before. Try again !`)
                }
                data2.save()
            });
        })
    }
}