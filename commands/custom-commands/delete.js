const schema = require('../../models/custom-command');

module.exports = {
    name: 'cdelete',
    aliases: ['cd'],
    description: "Remove a custom commands of a server",
    timeout: '10000',
    category: 'custom-commands',
    requirePermission: 'Manage Server',
    usage: '[Command]',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You don't have permission to use this command`);

        const name = args[0];

        if(!name) return message.channel.send('Incorrect Usage');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('Cannot find that custom command');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** as a custom command!`);
    }
}