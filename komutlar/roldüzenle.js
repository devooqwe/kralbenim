const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
exports.run = async (client, message,args) => {

  let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
              if (!args[0]) return;
              if(args[0] === Object.keys(komutum[message.guild.id][i])[0]) {
                   
                                       
                    const embed = new Discord.RichEmbed()
                    .setDescription(":robot: Bu Komutu Böyle Düzenleyiniz. :robot:")
                    .setColor("GREEN")
                    .addField(`:star: Log Kanalı`, "!rol-log-kanal " + args[0] + " #logkanal")
                    .addField(":star: Rol Yöneticisi", `!rol-yetkilisi-ayarla ${args[0]} @rol`)
                    .addField(":star: Verilecek Rol", "!rol-verilecek-ayarla " + args[0] + " @rol")
                    .addField(":star: Otomatik Silinecek Rol", `
!rol-otomatik-silinecek-ayarla ${args[0]} @rol
Belirlenen Rol Verildikten Sonra Silinmesini İstediğiniz Bir Rol Var İse Onu Siler
Örnek Kayıtlı Üyeyi Vermeye Ayarlayıp Otomatik Silinecek Kısmınada Kayıtsız Üye Rolünü Ayarlarsınız.
(Ayarlamak Zorunda Değilsiniz.)`)
                    .addField(":star: Silmek için", `!rol-komut-sil ${args[0]}`)
                    return message.channel.send(embed)
                } else {
                 return message.channel.send(`${client.emojis.get("647760202875142154")} Böyle Bir Komut Bulamadım.
\`!rol-komutlar\` Yazarak Komutları Görebilirsiniz`)
                }
            }
        }
     
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rol-düzenle'],
  permLevel: 0
};

module.exports.help = {
  name: 'roldüzenle',
  description: '',
  usage: ''
};