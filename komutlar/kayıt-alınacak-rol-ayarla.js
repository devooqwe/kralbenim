const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
let rol = message.mentions.roles.first() 
let kanal = message.mentions.channels.first()
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
 
 if(!rol) return message.channel.send(`${client.emojis.get("647760202875142154")} Selam Kayıt Tamamlandığı Zaman Alınacak Rolü Ayarlamak İçin Bir Rol Etiketlemelisiniz Örnek: \`!kayit-verilecek-rol-ayarla @üyeler\``)
 
  message.channel.send(`${client.emojis.get("647746144155467786")} Kayıt Olan Kullanıcılardan Alınacak Otomatik Rol **${rol}** Şeklinde Ayarlandı.`)

 
  db.set(`kayitAR_${message.guild.id}`, rol.id)  
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'kayit-alınacak-rol-ayarla',
  description: 'taslak', 
  usage: 'Otorol-ayarla'
};
