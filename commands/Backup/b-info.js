const Discord = require('discord.js');
const backup = require('discord-backup');
const { success, error } = require('../../config.json')


module.exports = {
    name: 'b-info',
   description: "Shows Info of a backup",
  timeout: '3000',
  requirePermission: "User : Administrator",
  aliases: ['b-inf'],

 run: async(client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${error} You must be an Admin to use this command**`)

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(`${error} You need provide Backup ID to get information`);

   backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setThumbnail(backup.data.iconURL)
            .setTitle(`Backup Info`)
            .addField('Server Name', backup.data.name)
            .addField('Size', backup.size + ' KB')
            .addField('Created at', formattedDate)
            .addField('Backup ID', backup.id)
            .setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL({  dynamic:true}))
            .setColor("RANDOM");
        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send(`${error} I can't find that Backup ID.`);
        else
            return message.channel.send(`${error} An error occured:`+(typeof err === 'string') ? err : JSON.stringify(err));

    });

  }
}