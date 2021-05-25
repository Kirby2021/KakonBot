const schema = require('../../models/command')

module.exports = {
    name : 'enable',
    usage: '[Command]',
    description: 'Enable command of a server',
    category: 'setup',
    aliases: ['ecm'],
    timeout: '5000',
    requirePermission: 'Manage Server',
    run: async(client, message, args) => {
        if(message.author.id == '806768080331210803') {
            const cmd = args[0];
        if(!cmd) return message.channel.send('Oops. You need to provide command to enable')
        if(!!client.commands.get(cmd) === false) return message.channel.send('Cannot find this command');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  message.channel.send(`Success ! **${cmd}** command was enabled.`)
              }  else return message.channel.send('This command is enabled already')
          }
        })
        } else {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You don't have permission to use this command`)
        const cmd = args[0];
        if(!cmd) return message.channel.send('Incorrect Usage.')
        if(!!client.commands.get(cmd) === false) return message.channel.send('Cannot find this command');
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  message.channel.send(`Success ! **${cmd}** command was enabled.`)
              }  else return message.channel.send('This command is enabled already')
          }
        })
    }
    }
}