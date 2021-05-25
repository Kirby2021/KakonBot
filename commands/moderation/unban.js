const { MessageEmbed, DiscordAPIError } = require('discord.js');
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
    name : 'unban',
    category : 'moderation',
    aliases: ['ub'],
    timeout: '4000',
    description : 'Unbans a member from the server',
    usage: '[Member ID]',
    requirePermission: 'Ban Members',

    run : async(client, message, args) => {
      const prefix = await client.prefix(message)
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed()
        .setDescription("**I don't have permission to unban that user**")
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed()
        .setDescription("**You don't have permission to use this command**")
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    )

      let userID = args[0]

      if (!args[0]) return message.channel.send()
      if(isNaN(args[0])) return message.channel.send("User ID was specified is not a number");

      message.guild.fetchBans().then(async bans => {
        if(bans.size == 0) return message.channel.send("This server hasn't banned any member !")
        let bUser = bans.find(b => b.user.id == userID);
        if(!bUser) return message.channel.send(`That member hasn't banned from a server`)
        try{
            await message.guild.members.unban(bUser.user)
            await message.channel.send(new MessageEmbed()
            .setDescription(`**Done. ${bUser.user.tag} was unbanned**`)
            .setColor("GREEN")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
            )
        }catch(err){
            console.log(err)
            return message.channel.send(new MessageEmbed()
                .setDescription(`**An error occured when unbanning that member.**`)
                .setColor("RED")
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
            )
        }
      client.modlogs({
          Member: bUser,
          Action: "Unbanned",
          Color: "GREEN",
          Reason: `No Reason for this command`
        }, message)
      })

    }
}