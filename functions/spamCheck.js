function spamCheck(msg, set, time, MessageEmbed, spamSchema, role, action, messages, reason, warnSchema, client) {
    let bool = false // the bool will be set to true if a member was found in the set object

    // 'times' is the amount of messages
    let user = { id: msg.author.id, time: Date.now(), times: messages }

    for (let u of set) {
        // sometimes the 'times' would say that it was not a number. this fixes it
        if (isNaN(u.times)) u.times = 4

        // if the u.id coincides with the msg.author.id, then run the following code
        if (u.id === msg.author.id) {
            bool = true // the bool was set to true because the member was found

            if (u.times >= messages) {
              if(action == 'ban') {
                if(msg.member.bannable) return msg.channel.send(`**[KAKON AUTO MODERATION] I can't ban ${msg.member}**`)
                msg.guild.members.ban(msg.member, {
                  reason: reason
                })
                msg.channel.send(`Banned ${msg.member} with reason **${reason}**`)
              } else if(action == 'kick') {
                 if(msg.member.kickable) return message.channel.send(`**[KAKON AUTO MODERATION] I can't kick ${msg.member}**`)
                msg.member.kick(reason)
                msg.channel.send(`Kicked ${msg.member} with reason **${reason}**`)
              } else if(action == 'mute') {
                 if(role.deleteable) return msg.channel.send(`**[KAKON AUTO MODERATION] I can't mute ${msg.member} (Cannot add Mute role manual)**`)
                msg.member.roles.add(role)
                msg.channel.send(`Muted ${msg.member} with reason **${reason}**`)
              } else if(action == 'unmute') {
                 if(role.deleteable) return msg.channel.send(`**[KAKON AUTO MODERATION] I can't unmute ${msg.member} (Cannot remove Mute role manual)**`)
                msg.member.roles.remove(role)
                msg.channel.send(`Unmuted ${msg.member} with reason **${reason}**`)
              } else if(action == 'warn') {
      function generateRandomString(length){
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
        var random_string = '';
        if(length > 0){
          for(var i=0; i < length; i++){
              random_string += chars.charAt(Math.floor(Math.random() * chars.length));
          }   
}
return random_string  
}
const random = generateRandomString(10)
        warnSchema.findOne({ guildid: msg.guild.id, user: msg.member.user.id}, async(err, data2) => {
            if(err) throw err;
            if(!data2) {
                data2 = new warnSchema({
                    guildid: msg.guild.id,
                    user : msg.member.user.id,

                    content : [
                        {
                            moderator : client.user.id,
                            reason : reason,
                            ID: random,
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator : client.user.id,
                    reason : reason,
                    ID: random,
                }
                data2.content.push(obj)
            }
            data2.save()
        });
	   msg.channel.send(new MessageEmbed()
        	.setDescription(`**${msg.author.tag} was warned with reason \`${reason}\` | Punishment ID \`${random}\`**`)
        .setColor("GREEN")
        )
    }
    setTimeout(() => {
                        set.delete(u)
                    }, 1000);
            } else if ((Date.now() - u.time) <= 0) {
                // if the amount of time is less then 'time', then...
                u.times++
                u.time = Date.now()
            }
        }
    }

    // if this bool remains false, then add the user to the set
    if (bool === false) {
        set.add(user)
    }
}

// export this file so we can require it in another file, in this case bot.js
module.exports = { spamCheck }