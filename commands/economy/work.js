const db = require('../../reconDB')

module.exports = {
    name: 'work',
    timeout: '10000',
    aliases: ['we'],
    description: 'Work a job',
    category: 'economy',
    run: async(client, message, args) => {
        const jobs = ['Developer','Youtuber','Waiter','Chef','Builder','Taxi Driver','Bus Driver','Doctor','Mechanic','Nurse']
        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 1000) + 1;
        let currency = await db.get(`currency-${message.guild.id}+${client.user.id}`)
        message.channel.send(`Congrats ! You worked as **${jobs[jobIndex]}** and earned **${coins}${currency}** coins for hard-working.`)
        client.add(message.author.id, coins)
    }
}
