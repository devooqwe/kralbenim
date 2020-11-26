const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
exports.run = async (client, message,args) => {

  let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
              if (!args[0]) return;
              if(args[0] === Object.keys(komutum[message.guild.id][i])[0]) {
                   
                    const kanal = message.mentions.channels.first()
                    if (!kanal) {
                      return message.channel.send(`${client.emojis.get("647760202875142154")} Bu Özelliği Ayarlamam İçin Bir Kanal Etiketlemelisin Örnek: \`!rol-log-kanal ${args[0]} #kanal\``)
                    }
                    db.set(`rolkomut-${args[0]}-logkanal_${message.guild.id}`, kanal.id)
                    message.channel.send(`${client.emojis.get("647746144155467786")} Rol Verirkenki Log Kanalımı ${kanal} Olarak Ayarladım!`)
                    return
                } else {
                  return;
                }
            }
        }
     
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rollogkanal'],
  permLevel: 0
};

module.exports.help = {
  name: 'rol-log-kanal',
  description: '',
  usage: ''
};