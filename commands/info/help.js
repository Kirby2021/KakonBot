const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;
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
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  timeout: '3000',
  run: async (client, message, args) => {
    const p = await client.prefix(message)
    const roleColor =
      message.guild.me.displayHexColor === "RANDOM"
        ? "RANDOM"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toLowerCase(),
          value: cmds.length === 0 ? "Sorry. This category is in coding" : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("All Commands")
        .addFields(categories)
        .setDescription(
          `Type \`${p}help\` with command name for more details of that command. Example: \`${p}help ping\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(`RANDOM`);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Error`)
          .setDescription(`I cannot find command \`\`${args[0]}\`\` on my command list ! Type \`\`${p}help\`\` with no arguements to see all my commands`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("RANDOM");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle(`Command Info`)
                .addField(`Information`, [
                    `Command: ${command.name || 'No Command Name'}`,
                    `Description: ${command.description || 'No Command Description'}`,
                    `Usage: ${p + command.name + " " + command.usage || `No Command Usage`}`,
                    `Prefix: ${p}`,
                    `Aliases: \`${command.aliases.join("` `")}\``,
                    `Cooldown: ${command.timeout || "No Command Timeout"}`,
                    `Permissions: ${command.requirePermission || "No Permissions Required For This Command"}`
                ])
                .setFooter(`<> Means Optional , [] Means Required`)
                .setColor("RANDOM")
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM');
      return message.channel.send(embed);
    }
  },
};
