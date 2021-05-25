const schema = require('../../models/command')

module.exports = {
    name: 'disable',
    usage: '[Command]',
    description: 'Disable command of a server',
    category: 'setup',
    aliases: ['dcm'],
    timeout: '5000',
    requirePermission: 'Manage Server',
    run : async(client, message, args) => {
        if(message.author.id == '806768080331210803') {
            const cmd = args[0];
        if(!cmd) return message.channel.send('Oops. You need to provide command to disable')
        if(!!client.commands.get(cmd) === false) return message.channel.send('Cannot find this command');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send('This command is disabled already');
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send(`Success ! **${cmd}** command was disabled.`)
        })
        } else {
        if(!message.member.hasPermission("MANAGE_GUILD")) return;
        const cmd = args[0];
        if(!cmd) return message.channel.send('Incorrect Usage.')
        if(!!client.commands.get(cmd) === false) return message.channel.send('Cannot find this command');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send('This command is disabled already');
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            message.channel.send(`Success ! **${cmd}** command was disabled.`)
        })
    }
}
}