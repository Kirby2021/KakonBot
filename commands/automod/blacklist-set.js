const { MessageEmbed } = require('discord.js')
const schema = require('../../models/n-word')
const { success, error } = require('../../config.json')

module.exports = {
  name: 'blacklist-set',
  description: "Settings Blacklist Words",
  aliases: ['blset'],
  timeout: '1000',
  usage: '[add/remove/display] <Words (only needed for add/remove option)>',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`**${error} You don't have permission to use this command**`)
    const query = args[0]
    if(!query) return message.channel.send(`${error} You need to provide query. \`add\` to add blacklisted words ; \`remove\` to remove blacklisted words ; \`display\` to display all blacklisted words (in embed)`)
    if(!(["add","remove","collect","display"]).includes(query)) return message.channel.send(`${error} You need to provide query. \`add\` to add blacklisted words ; \`remove\` to remove blacklisted words ; \`display\` to display all blacklisted words (in embed)`)
    const guild = { Guild: message.guild.id };
    if(query == 'add') {
      const word = args.slice(1).join(" ")
      if(!word) return message.channel.send(`${error} You need to provide blacklisted word to add`)
      if((["@everyone","@here"]).includes(word.toLowerCase())) return message.channel.send(`${error} Blacklisted Word can't includes \`@everyone\` or \`@here\``)

      schema.findOne(guild, async(err,data) => {
        if(err) throw err;
        if(data) {
          if(data.Words.includes(word)) return message.channel.send(`${error} \`${word}\` is already exist in blacklisted words`)
          data.Words.push(word)
          data.save()
          message.channel.send(new MessageEmbed().setDescription(`**${success} \`${word.toLowerCase()}\` has been added to blacklisted words**`).setColor("GREEN"))
        } else {
          new schema({
            Guild: message.guild.id,
            Words: word
          }).save();
          message.channel.send(new MessageEmbed().setDescription(`**${success} \`${word.toLowerCase()}\` has been added to blacklisted words**`).setColor("GREEN"))
        }
      })
    } else if(query.toLowerCase() == 'remove') {
      const word = args.slice(1).join(" ")
      if(!word) return message.channel.send(`${error} You need to provide blacklisted word to remove`)
      schema.findOne(guild, async(err,data) => {
        if(err) throw err;
        if(!data) return message.channel.send(`**${error} There is no word in blacklisted words**`)
        if(!data.Words.includes(word)) return message.channel.send(`**${error} \`${word}\` is not a blacklisted word**`)

        const filtered = data.Words.filter(target => target !== word);
        await schema.findOneAndUpdate(guild, {
          Guild: message.guild.id,
          Words: filtered
        })
      message.channel.send(new MessageEmbed().setDescription(`**${success} \`${word.toLowerCase()}\` has been removed from blacklisted words**`).setColor("GREEN"))
      })
    } else if(query.toLowerCase() == 'display') {
      schema.findOne(guild, async(err,data) => {
        if(err) throw err;
        if(!data) return message.channel.send(`**${error} There is no words in blacklisted words**`)
        message.channel.send(new MessageEmbed()
            .setTitle(`Blacklisted Words`)
            .setDescription(`\`` + data.Words.join(`\` \``) || `**${error} There is no word in blacklisted words**` + `\``)
            .setColor("RANDOM")
        )
      })
    }
  }
}