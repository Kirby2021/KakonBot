const schema = require('../../models/custom-command');

module.exports = {
    name: 'ccreate',
    aliases: ['cc'],
    description: "Create a custom command for a server",
    usage: '[Command] [Response]',
    timeout: '10000',
    category: 'custom-commands',
    requirePermission: 'Manage Server',

    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You don't have permissions to use this command`);

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name');
        if(!response) return message.channel.send('Please specify a response');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Created **${name}** as a custom command!`);
    }
}