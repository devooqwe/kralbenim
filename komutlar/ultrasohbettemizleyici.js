const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (db.fetch(`utsK_${message.channel.id+message.guild.id}`)) {
  return message.reply(`Sanırım bu özellik zaten açıkmış :slight_smile:`)
}
  db.set(`utsK_${message.channel.id+message.guild.id}`, message.channel.id)
  message.reply(`**Sadece bu sohbet kanalında** tüm botların mesajlarını ve bazı ön ekleri kullananların mesajlarını otomatik olarak sileceğim. ${client.emojis.get("647746144155467786")} **5 saniyede**
Bunu sadece sohbet kanalınızda kullanmanızı öneririz. Sunucunuzun sohbet temizliği için bunu kullanıyorsunuz.`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'ultrasohbettemizleyiciaç',
  description: 'sayaç', 
  usage: 'sayaç'
};
