const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
exports.run = async (client, message,args) => {

  let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
              if (!args[0]) return message.channel.send(`${client.emojis.get("647760202875142154")} Silinecek Rolü Ayarlamak İçin, Belirlenen Rolü Etiketlemelisiniz
Örnek: \`!rol-otomatik-silinecek-ayarla komutismi @rol\`

Eğer Etiketlenmiyorsa Rol Ayarlarından \`O Role Herkese Bu Rolden Bahsetme Yetkisi Tanı Vermelisiniz.\``)
              if(args[0] === Object.keys(komutum[message.guild.id][i])[0]) {
                   
                    const rol = message.mentions.roles.first()
                    if (!rol) {
                      return message.channel.send(`${client.emojis.get("647760202875142154")} Silinecek Rolü Ayarlamak İçin, Belirlenen Rolü Etiketlemelisiniz
Örnek: \`!rol-otomatik-silenicek-ayarla ${args[0]} @rol\`

Eğer Etiketlenmiyorsa Rol Ayarlarından \`O Role Herkese Bu Rolden Bahsetme Yetkisi Tanı Vermelisiniz.\``)
                    }
                    db.set(`rolkomut-${args[0]}-srol_${message.guild.id}`, rol.id)
                    
                    const embed = new Discord.RichEmbed()
                    .setDescription(":robot: Rol Yetkilisinin Komutla Vereceği Rolü Ayarladım! :robot:")
                    .setColor("GREEN")
                    .addField(`${client.emojis.get("647746144155467786")}: Verildi`, rol)
                    return message.channel.send(embed)
                } else {
                 return message.channel.send(`${client.emojis.get("647760202875142154")} Silinecek Rolü Ayarlamak İçin, Belirlenen Rolü Etiketlemelisiniz
Örnek: \`!rol-otomatik-silinecek-ayarla komutismi @rol\`

Eğer Etiketlenmiyorsa Rol Ayarlarından \`O Role Herkese Bu Rolden Bahsetme Yetkisi Tanı Vermelisiniz.\``)
                }
            }
        }
     
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolotomatiksilinicekayarla'],
  permLevel: 0
};

module.exports.help = {
  name: 'rol-otomatik-silinecek-ayarla',
  description: '',
  usage: ''
};