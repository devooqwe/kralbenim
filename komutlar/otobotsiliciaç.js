const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (db.fetch(`otobsilici_${message.channel.id+message.guild.id}`)) {
  return message.reply(`Sanırım bu özellik zaten açıkmış :slight_smile:`)
}
  db.set(`otobsilici_${message.channel.id+message.guild.id}`, message.channel.id)
  message.reply(`**Sadece bu sohbet kanalında** tüm botların mesajlarını bot mesaj attıktan **2 dakika** sonra sileceğim şu anda bu özellik aktif. ${client.emojis.get("647746144155467786")}
 Sunucunuzun sohbet temizliği için bunu kullanıyorsunuz.`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'otobotsiliciaç',
  description: 'sayaç', 
  usage: 'sayaç'
};
