const db = require('../../models/notes')
const { Message, MessageEmbed } = require('discord.js')
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
    name :'set-note',
    description:'Set note for a member',
    usage: '[Member] [Note]',
    timeout: '4000',
    aliases: ['ssn','note'],
    category: 'note-system',
    requirePermission: 'Manage Server',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const prefix = await client.prefix(message)
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed()
            .setDescription("You don't have permission to use this command")
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
        const user = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send(new MessageEmbed()
            .setDescription(`You need to mention member to set note`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        )
        const reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(new MessageEmbed()
        .setDescription(`You need to provide note`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
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
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,

                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason,
                            ID: random,
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason,
                    ID: random,
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(`You have been added a note \`${reason}\` by ${message.author.tag}`)
        message.channel.send(`Added a note \`${reason}\` to ${user.user.tag}`)
    }
}