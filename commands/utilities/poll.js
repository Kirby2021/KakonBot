const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "poll",
  timeout: '10000',
  usage: '[Questions]',
  description: 'Make an infinity poll',
  requirePermission: 'Manage Messages',
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You don't have permission to use this command`)
    message.channel.send(`What is the topic of this poll ? || Type: \`\`cancel\`\` for cancel the command`)
    const filter = m => m.author.id == message.author.id;
    const embed = new MessageEmbed()
      .setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({dynamic:true}))
      .setColor('BLUE')
    try {
  let msg = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
  console.log(msg.first().content);
  if(msg.first().content == 'cancel') {
    return message.channel.send(`Cancelled the command`)
  }
  embed.setTitle(msg.first().content)
} catch (err) {
  console.log(err);
  message.channel.send(`Auto Cancelled the command. Run Again`)
}
  message.channel.send(`What is the first choice ? || Type: \`\`cancel\`\` for cancel the command`)
  try {
    let msg = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
    console.log(msg.first().content);
    if(msg.first().content == 'cancel') {
      return message.channel.send(`Cancelled the command`)
    }
    embed.addField(`🟡 First Choice`,msg.first().content)
  } catch (err) {
    console.log(err);
    message.channel.send(`Auto Cancelled the command. Run Again`)
  }
  message.channel.send(`What is the second choice ? || Type \`\`cancel\`\` for cancel the command`)
  try {
    let msg = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
    console.log(msg.first().content);
    if(msg.first().content == 'cancel') {
      return message.channel.send(`Cancelled the command`)
    }
    embed.addField(`🟣 Second Choice`,msg.first().content)
  } catch (err) {
    console.log(err);
    message.channel.send(`Auto Cancelled the command. Run Again`)
  }
  const msg = await message.channel.send(embed)
  await msg.react('🟡')
  await msg.react(`🟣`)
  }
};