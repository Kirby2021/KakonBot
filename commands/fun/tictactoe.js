const { tictactoe } = require('reconlx')
//do npm i reconlx in the terminal before using the code!
module.exports = {
  description: "Plays Tic Tac Toe with someone",
  timeout:'1000',
  aliases: ['ttt'],  
    name : 'tictactoe',
    run : async(client, message, args) => {
      if(!message.channel.permissionsFor(message.guild.me).has(["MANAGE_MESSAGES"])) return message.channel.send(`I need \`MANAGE_MESSAGES\` permission to run tictactoe game`)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
            if(!member)  return  message.channel.send('Oops, you need to mention member to play')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}