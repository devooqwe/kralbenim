const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  const sec = args[0]  

if (!sec) {
  return message.reply(`Anti Raid Bot Sistemi Nedir?
Eğer Açarsanız Sunucu Sahibinin İzni Olmadan Sunucuya Başka Bot Sokmaz. Giren Botlar Otomatik Atılır.
Örnek Kullanımı \`!anti-raid-bot-sistemi aç/kapat #logkanalı\`
`)
}
  
  if (sec == "aç") {
    const kanal = message.mentions.channels.first()
    if (db.has(`premium_${message.guild.id}`) == false) {
    return message.channel.send(`<@${message.author.id}> Maalesef Premium Süresi Bitmiştir. Hizmetimizden Memnun Olduysanız Tekrar Alabilirsiniz \`!premium\``)
  } else {
  if (!kanal) {
    return message.reply(`Anti Raid Bot Sistemi Örnek Kullanımı \`!anti-raid-bot-sistemi aç/kapat #logkanalı\``)
  }
    db.set(`antiraidK_${message.guild.id}`, kanal.id)
    return message.channel.send(`${client.emojis.get("647746144155467786")} Kayıt Kanalını ${kanal} Olarak Ayarladım.`)
      }
    
  }
  
    if (sec == "kapat") {
    const kanal = message.mentions.roles.first()
    if (db.has(`premium_${message.guild.id}`) == false) {
    return message.channel.send(`<@${message.author.id}> Maalesef Premium Süresi Bitmiştir. Hizmetimizden Memnun Olduysanız Tekrar Alabilirsiniz \`!premium\``)
  } else {
    db.delete(`antiraidK_${message.guild.id}`)
    return message.channel.send(`${client.emojis.get("647746144155467786")} Kayıt Kanalını Başarıyla Kapattım.`)
  
  }
    
  }
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['antiraidbotsistemi'], 
  permLevel: 0
};

exports.help = {
  name: 'anti-raid-bot-sistemi',
  description: 'taslak', 
  usage: 'sayac-hg-msg'
};