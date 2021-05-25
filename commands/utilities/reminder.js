const ms = require('ms')

module.exports = {
    name: 'reminder',
    description: "Create A Reminder",
    aliases: ['rmd'],
    timeout: "2000",
    usage: '[Time] [Name]',
    run: async(client, message, args) => {
        const time = args[0]; const name = args.slice(1).join(" ")
        if(!time || !name) return message.channel.send(`Incorrect Usage`)
        message.channel.send(`You will get reminder \`\`${name}\`\` after \`\`${time}\`\` . Make sure your DMs is on`)
        setTimeout(async function()  {
            message.author.send(`**:alarm_clock: Time for Reminder \`\`${name}\`\` is up. **`)
        }, ms(time))
    }
}