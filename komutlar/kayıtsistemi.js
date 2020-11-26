const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
const embed = new Discord.RichEmbed()  
.setAuthor("EŞŞEK-AT", client.user.avatarURL)
.setColor('BLUE')
.setTitle(`MC-EŞŞEK BOT`)
.setURL("https://discord.gg/jRzZB7")
.addField(`• \`!kayit-kanal-ayarla #kanal\`》`, "Üyelerin Kayıt Olacağı Kanal")
.addField(`• \`!kanal-ayarla #kanal\`》`, "Üyeler Kayıt Olunca Bildirim Yollanan Kanal")
.addField(`• \`!isim-sistemi -uye- -yas-\`》`, `
Üye İsim Sistemi Özgürce Yerleştirin Değişkenler -uye- -yas-
Sadece Yaş Seçeneği Eklemezseniz Yaşı Sormayacaktır.
`)
.addField(`• \`!kayit-verilecek-rol-ayarla @rol\`》`, "Kayıt Olan Kullanıcıya Otomatik Verilecek Rol")
.addField(`• \`!kayıt-alınacak-rol-ayarla @rol\`》`, "Kayıt Olan Kullanıcıdan Otomatik Alınacak (Silinecek) Rol")
.addField(`• \`!kayit-sistemi-kapat\`》`, "Kayıt Sistemini Kapatır Ve Tüm Ayarları Sıfırlar.")
.addField(`• \`!giriş-sistemi Hoşgeldin -uye- Kayıt Olmak İçin !kayıt mahmut 18\`》`, "Giriş Mesajını Özgürce Editleyebilirsiniz Değişkenler -uye- -uyetag-")
.addField(`• \`!isim-temizleyici-ac\`》 **PREMIUM SUNUCULAR İÇİN**`, "Üyeler İsimlerinde A-Z Harici Kelime Kullanamazlar")
.addField(`• \`!isim-temizleyici-kapat\`》 **PREMIUM SUNUCULAR İÇİN**`, "Üyeler İsimlerinde A-Z Harici Kelime Kullanabilirler")
.setDescription(`
KAYIT Sistemi Kullanımı
`)
.setTimestamp()
.setFooter('© STARK-ZEHİR',client.user.avatarURL)

 message.channel.send(embed) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["kayıt-sistemi"], 
  permLevel: 0
};

exports.help = {
  name: 'kayıtsistemi',
  description: 'sayaç', 
  usage: 'sayaç'
};
