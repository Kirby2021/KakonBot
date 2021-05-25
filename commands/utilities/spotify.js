const Discord = require("discord.js")

module.exports = {
    name : 'spotify',
    aliases : ['spoti' , 'sot'],
    description : 'Checks Spotify Song',
    timeout: '1000',
    run : async(client, message, args) => {
  let user;

  if (message.mentions.users.first()) {
    user = await message.mentions.users.first();
  } else if (args[0]) {
    user = await message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.member;
  }

let status;
if (user.presence.activities.length === 1) status = user.presence.activities[0];
else if (user.presence.activities.length > 1) status = user.presence.activities[1];

if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
  return message.channel.send("This user is not listening music");
}

if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
  let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
      name = status.details,
      artist = status.state,
      album = status.assets.largeText;

const card = new Discord.MessageEmbed()
    .setTitle(name)
    .setDescription(`**Album: ${album}\nAuthor: ${artist}\nStart: ${status.timestamps.start}\nEnd: ${status.timestamps.end}**`)
    .setColor("RANDOM")
    .setThumbnail(image)
await message.channel.send(card)
}
}
    }