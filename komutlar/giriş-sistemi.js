const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  let mesaj = args.slice(0).join(' ');
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`); 
  if (mesaj.length <= 3) {
return message.channel.send(client.emojis.get("647760202875142154") + ` Giriş Sistemi İçin En Az 5 Karakter Belirtebilirsin. Örnek: !giriş-sistemi Hoşgeldin -uye- Bu Kayıt Olmak İçin \`!kayıt İsim Yaş\``) 
}

db.set(`kayitGM_${message.guild.id}`, mesaj)
  message.channel.send(`
${client.emojis.get("647746144155467786")} Sunucuya Yeni Üye Katılınca \`${mesaj}\` Kayıt Kanalına Bu Şekilde Karşılama Mesajı Atacağım.`)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["girişsistemi"], 
  permLevel: 0
};

exports.help = {
  name: 'giriş-sistemi',
  description: 'sayaç', 
  usage: 'sayaç'
};
