const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix

module.exports = {
    name : 'resetprefix',
    category: 'setup',
    description: 'Reset a prefix for a server',
    timeout: '5000',
    requirePermission: 'Manage Server',

    run : async(client, message) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have permission to use this command")
                await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                message.reply(`Reset Prefix Command was completed. Now, Server Prefix is **\`\`${prefix}\`\`**`)
    }
}