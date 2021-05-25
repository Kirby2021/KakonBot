const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'create-invite',
  aliases: ['civ'],
  timeout: '5000',
  description: "Create an invite of the server",
  run: async(client, message, args) => {
    if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send(`I don't have permission to create invite`)
    const invite = await message.channel.createInvite({
      temporary: false,
      maxAge: 0,
      maxUses: 100,
      reason: `Created by: ${message.author.tag}`,
    })
    await message.channel.send(new MessageEmbed()
      .setTitle(`Created Invite`)
      .setDescription(`**Invite: ${invite.code}\n Settings:\nTemporary: false\nExpires: Invite Forever\nMaximum Users: 100 users**`)
      .setColor("GREEN")
    )
  }
}