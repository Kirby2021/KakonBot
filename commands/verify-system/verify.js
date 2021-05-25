const Schema = require('../../models/verify.js')
const { MessageEmbed } = require('discord.js')
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name: 'verify',
    description: 'Verify that you are not a bot',
    category: 'setup',
    timeout: '180000',
    aliases: ['verify'],
    run: async(client, message, args) => {
        Schema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.reply(new MessageEmbed().setTitle(`Error`).setDescription(`Hey ${message.author}, This Server isn't enable this module`).setColor("RED"))
            } else {
                if(message.channel.id == data.Channel) {
               const role = await message.guild.roles.cache.find(role => role.id === data.Role)
               if(!role) {
                message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`Verify Role (${data.Role}) has been deleted . Now, automatically delete verify module...`).setColor("RED"))
                return data.delete()
               }
               if(message.member.roles.cache.get(role.id)) return message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`You have been verified already`).setColor("RED"))
               if(role.position >= message.guild.me.roles.highest.position) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Oops ! I can't give you ${role} role. Please check my permission and role order`).setTitle(`Error`))
               function generateRandomString(length){
                var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+><';
                var random_string = '';
                if(length > 0){
                  for(var i=0; i < length; i++){
                      random_string += chars.charAt(Math.floor(Math.random() * chars.length));
                  }   
        }
        return random_string  
        }
        const random = generateRandomString(10)
        await message.delete()
        await message.channel.send(new MessageEmbed().setDescription(`**Hey ${message.author} , this is the important step ! You need to provide the code I give you. Here is the code:\n\n||${random}||\n\nCaution: You have 1 minute.**`).setColor("YELLOW"))
        const filter = m => m.author.id == message.author.id
        try {
            let msg = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
            console.log(msg.first().content);
            await msg.delete()
            if(msg.first().content == random) {
                await message.member.roles.add(data.Role)
                .then(message.channel.send(new MessageEmbed().setTitle(`Congratulations`).setDescription(`**You provided correct code :tada: . I will give you ${role} role. Enjoy !**`).setColor("GREEN")))
            } else if(msg.first().content !== random) {
                message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`**Noo... You provided incorrect code !! You need to wait 3 minutes before make a new verify request.**`))
            }
          } catch (err) {
            console.log(err);
            message.channel.send(new MessageEmbed().setTitle(`Error`).setDescription(`**Oops ! You didn't provide my code in 1 minute. You must wait 3 minutes before make a new verify request.**`))
          }
            } else {
              return message.delete()
            }
        }
})
}
}