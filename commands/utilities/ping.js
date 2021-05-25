const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'utilities',
    timeout: '2000',
    aliases : ['ping-pong','pong'],
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`Checking WebSocket ping and Message edit ping ...`)
        setTimeout(async function() {
            const embed = new MessageEmbed()
            .setTitle('🏓 Pong')
            .setDescription(`WebSocket ping is ${client.ws.ping}ms\nMessage edit ping is ${Math.floor(msg.createdAt - message.createdAt)}ms`)
            .setColor("GREEN")
            msg.delete()
            await message.channel.send(embed)
        }, 1000)
    }
}
