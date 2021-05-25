const db = require('../../reconDB')

module.exports = {
    name: 'daily',
    timeout: '86400000',
    aliases: ['dl'],
    description: 'Collect daily',
    category: 'economy',
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 10000) + 1;
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)
        message.channel.send(`Yay ! You earned ${coins}${currency} from your lucky`)
        client.add(message.author.id, coins)
    }
}
