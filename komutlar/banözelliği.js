const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
const embed = new Discord.RichEmbed()  
.setAuthor("EŞŞEK-AT", client.user.avatarURL)
.setColor('BLUE')
.setTimestamp()
.setDescription("Merhaba Öncelikle Sunucunuzdaki Herkesi Banlama Riski Olan Üyelerin Önüne Geçmek İçin Bunu Kullanın")
.addField("• !banlimit 3 》", "Ban Atan Kişi 10 Dakika İçinde Ayarlanılan Rakamı Geçerse Üyenin Ban Atabilme Yetkisi Alınır.")
.addField("• !yasaklama-yetkilisi @Rol 》", "Bu Rolü Ayarlayın Ve Ban Atmasını İstediğiniz Kişilere Verin Bu Role Kim Sahipse Bot İle Ban Atabilir (BU ROLE BAN YETKİSİ VERMİCEKSİNİZ BAN ATMASINI İSTEDİĞİNİZ KİŞİYE VERİLECEK)")
.addField("• !yasaklama-kanal-ayarla #kanal 》", "Bu Ayarladığınız Kanala Ban Atılınca Kim Kime Ban Atmış İd si Profil Fotosu Ne Hepsini Oraya Kayıt Eder")
.addField("• !banci-sistemi-kapat 》", "Yaptığınız Tüm Ban Sistemini Siler (Tekrardan Yapmanız Gerekir.)")
.addField("• !ban @uye 》", "Etiketlenen Kişiyi Yasaklar")
.addField("• !kick @uye 》", "Etiketlenen Kişiyi Sunucudan Atar")
.addField("• !unban Userid 》", "İd Ye Sahip Kişinin Yasağını Kaldırır")
.setFooter("© Mcadventuretime.com", client.user.avatarURL)
 message.channel.send(embed) 
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['ban-özelliği'], 
  permLevel: 0
};

exports.help = {
  name: 'banözelliği',
  description: 'taslak', 
  usage: 'sayac-hg-msg'
};