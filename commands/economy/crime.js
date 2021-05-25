const db = require('../../reconDB')

module.exports = {
    name: 'crime',
    timeout: '0',
    aliases: ['cr'],
    description: 'Use Crime',
    category: 'economy',
    run: async(client, message, args) => {
        const crimes = ['Yes','No']
        const crimeIndex = Math.floor(Math.random() * crimes.length)
        const coins = Math.floor(Math.random() * 10000) + 1;
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)

        if(crimes[crimeIndex] === 'Yes') {
            const messages = [`Congrats ! You robbed and no one see you. You robbed ${coins}${currency} coins from bank`,`When you pretend begging, a good person gives you ${coins}${currency} coins.`,`Congratulations ! While mining Bitcoins, you did not get discovered by the police and mined ${coins}${currency} coins`]
            const messageIndex = Math.floor(Math.random() * messages.length)
            message.channel.send(`${messages[messageIndex]}`)
            client.add(message.member.id, coins)
        }
        if(crimes[crimeIndex] === 'No') {
            const messages2 = [`Sorry ! You are trying to rob bank but you were unlucky. A police was saw you. You lost ${coins}${currency} coins`,`Oh no! When you were collaborating with an illegal organization, unfortunately ... You were arrested with the gang and lost ${coins}${currency} coins.`,`You have been robbed ${coins}${currency} coins. Unfortunately for you`]
            const messageIndex2 = Math.floor(Math.random() * messages2.length)
            message.channel.send(`${messages2[messageIndex2]}`)
            client.rmv(message.author.id, coins)
        }
    }
}
