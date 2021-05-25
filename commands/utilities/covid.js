const get = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'covid',
    description: 'Shows the current info of covid-19',
    aliases: ['icv'],
    timeout: '5000',
    run: async(client, message, args) => {
      if(!args[0]) {
        get('https://corona.lmao.ninja/v3/covid-19/all')
        .then(response => response.json())
        .then(d => {
            let cases = d.cases.toLocaleString();
            let recov = d.recovered.toLocaleString();
            let deaths = d.deaths.toLocaleString();
            const coronaembed = new MessageEmbed()
            .addFields(
                { name: "Cases", value: cases, inline: true},
                { name: "Recovered", value: recov, inline: true},
                { name: "Deaths", value: deaths, inline: true}
            )
            .setColor("RED");
            message.channel.send(coronaembed)
        });
      }
    }
}