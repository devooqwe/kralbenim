const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!db.fetch(`linkKR_${message.guild.id}`)) {
  return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`)
}
  db.delete(`linkKR_${message.guild.id}`)
  message.reply(`Bu özellik **başarıyla kapatıldı.** ${client.emojis.get("647760202875142154")}`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["reklam-kick-kapat"], 
  permLevel: 0
};

exports.help = {
  name: 'reklamkickkapat',
  description: 'sayaç', 
  usage: 'sayaç'
};
