module.exports = {
    name: "server-name",
    description: "Set The Server Name",
    timeout: '10000',
    aliases: ['sn'],
    run: async(client, message, args) => {
        const name = args.join(" ")
        if(message.member.id !== message.guild.ownerID) return message.channel.send(`Only Server Owner can use this command`)
        if(!name) return message.channel.send(`Incorrect Usage`)
        message.guild.setName(name)
        message.channel.send(`Changed server name to ${name}`)
    }
}