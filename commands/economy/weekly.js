const db = require('../../reconDB')
const ms = require('ms')

module.exports = {
    name: 'weekly',
    timeout: `${ms(`1w`)}`,
    aliases: ['dl'],
    description: 'Collect weekly',
    category: 'economy',
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 50000) + 1;
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)
        message.channel.send(`Yay ! You claimed ${coins}${currency} from your Weekly Box`)
        client.add(message.author.id, coins)
    }
}
