const { MessageEmbed } = require('discord.js')
  module.exports = {
    name: 'permissions',
    description: "Lists all permissions of a member",
    aliases: ['pms'],
    usage: '[@Member]',
    timeout: '2000',
    category: 'info',
  run: async(client, message, [member = '']) => {
 
    if (!member.match(/\d{17,19}/)){
      member = message.author.id;
    };
 
    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);
 
    if (!member){
      return message.channel.send(`Incorrect Usage.`);
    };
 
    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();
 
    return message.channel.send(
      new MessageEmbed()
      .setColor(member.displayColor || 'RANDOM')
      .setTitle(`All Permissions Of ${member.user.username}`)
      .setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic:true }))
      .setDescription([
        '\\♨️ - This Server',
        '\\#️⃣ - The Current Channel',
        '```properties',
        '♨️ | #️⃣ | Permission',
        '========================================',
        `${Object.keys(sp).map(perm => [
          sp[perm] ? '✔️ |' : '❌ |',
          cp[perm] ? '✔️ |' : '❌ |',
          perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
        ].join(' ')).join('\n')}`,
        '```'
      ].join('\n'))
    );
  }
  }