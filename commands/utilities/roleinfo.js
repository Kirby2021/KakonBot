const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports = {
  name: 'roleinfo',
  aliases: ['rinfo'],
  description: "Shows info of a role",
  timeout: '1000',
  run: async(client , message, args) => {
    let role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(rol => rol.name == args[0]);
    if(!role) return message.channel.send(`You need provide role to fetch info`);
    const roleEmbed = new MessageEmbed()
  .setAuthor(`Role Information`)
  .setColor(role.hexColor.toUpperCase())
  .addField(`Name`, role.name ,true)
  .addField(`Color`, role.hexColor.toUpperCase(), true)
  .addField(`Members`, role.members.size , true)
  .addField(`Created at`, moment(role.createdAt).format('MM/DD/YYYY'), true)
  .addField(`Position`, (message.guild.roles.cache.size - role.position) ,true)
  .addField(`Permissions`, `\`\`\`${role.permissions.toArray()}\`\`\``)
  message.channel.send(roleEmbed)
    }
}