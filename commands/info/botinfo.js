const { MessageEmbed } = require('discord.js')
const ownerIDE = require('../../config.json').ownerID
const package = require('../../package.json')

module.exports = {
    name: 'botinfo',
    aliases: ['bi'],
    description: "Show info of bot",
    timeout: '1000',
    run: async(client,message,args) => {
      const owner = await client.users.cache.get('736636650796351559')
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
        const embed = new MessageEmbed()
            .setTitle(`My Info`)
            .setColor("RANDOM")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`[Click Here To Support Server](https://discord.gg/avKeDfEy6U)** || **[Click Here To Invite Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2080894207)`)
            .addField(`ID`,`${client.user.id}`)
            .addField(`Tag`,`${client.user.tag}`)
            .addField(`Created`,new Date(client.user.createdTimestamp).toLocaleDateString())
            .addField(`Guilds Count`,client.guilds.cache.size)
            .addField(`Channels Count`,client.channels.cache.size)
            .addField(`Members Count`,client.users.cache.size)
            .addField(`Owner`, `\`${owner.tag}\` (${owner.id})`)
            .addField(`Uptime`, `${hours}:${minutes}:${seconds}`)
            .addField(`Language`, `Discord.JS`)
            .addField(`Bot Version`, package.version)
            .addField(`Discord.JS Version`, '12.5.1')
            .addField(`Avatar`,`[Click Here](${client.user.displayAvatarURL({ dynamic: true })})`)
        message.member.send(embed)
    }
}