const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message,args) => {
  
const embed = new Discord.RichEmbed()
     .setAuthor("MC-EŞEK",client.user.avatarURL)
     .setTitle('MC-EŞEK BOT')
     .setURL('https://discord.gg/bWjWHK')
     .setColor('BLUE')
     .setDescription(`Rol Sistemi Kullanımı
**Rolleri Yönet Yetkisini Üyeye Vermeden Rol Verme Sistemi!**
Komutunuz Kısmına Oluşturduğunuz Komutu Girmezseniz Çalışmaz.
Örnek \`!rol-komut-oluştur bayanüye\` Yaptınız Diyelim
Onu Editlemek İçin \`!rol-yetkilisi-ayarla bayanüye @rolyetkilisi\``) 
     .addField(`• \`!rol-komut-oluştur Komut\`》`, `Komutu Oluşturunuz Oluşturulan Komut \`!komutunuz @üye Şeklinde Çalışacaktır\``)
     .addField(`• \`!rol-düzenle komutunuz\`》`, `! işareti olmadan Oluşturduğunuz Komutunuzu Giriniz.`)
     .addField(`• \`!rol-log-kanal komutunuz #kanal\`》`, `
Bir Üye Diğer Bir Üyeye Rol Verirse Hangi Kanala Log Tutsun.`)
     .addField(`• \`!rol-yetkilisi-ayarla komutunuz @rol\`》`,`Bu Rolü Ayarladığınız Kişi Verilecek Rolü İstenilen Üyeye Bot Aracılığı İle Verebilecektir.`) 
     .addField(`• \`!rol-verilecek-ayarla komutunuz @rol\`》`, `Rol Yetkilisinin O Komut İle Verebileceği Rolü Ayarlarsınız Örnek Bay Üye / Bayan üye`)
     .addField(`• \`!rol-otomatik-silinecek-ayarla komutunuz @rol\`》`, `Belirlenen Rol Verildikten Sonra Silinmesini İstediğiniz Bir Rol Var İse Onu Siler
Örnek Örnek Kayıtlı Üyeyi Vermeye Ayarlayıp Otomatik Silinecek Kısmınada Kayıtsız Üye Rolünü Ayarlarsınız.
(Ayarlamak Zorunda Değilsiniz.)`)
     .addField(`• \`!rol-komutları\`》`, `Eğer Sunucudaki Komutlarınızı Unuttuysanız Bu Komut İle Tüm Komutları Listeleyip Görebilirsiniz.`) 
     .addField(`• \`!rol-komut-sil komutunuz\`》`,`İstediğiniz Bir Komutu Veritabanından Silmeye Yarar.
Komutu ! İşareti Olmadan Yazınız.`)
     .addField(`• \`!Komutunuz @üye\`》`, `Komutu Tam Olarak Ayarlayınca Örnek Kullanım
Rol Yetkilisi Etiketlenen Kullanıcıya Verilecek Rolü Vermiş Olur`)
     .addField(`• \`!Komutunuzsil @üye\`》`, `
Verilen Rolü Üyeden Geri Çekmeye Yarar. Verme Komutunun Yanına Sil Eklerseniz Geri Alma İşlemi Başarılı Olur.`)
     .setFooter('© STARK-ZEHİR',client.user.avatarURL)
     .setTimestamp()
     message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolsistemi','rolsistem'],
  permLevel: 0
};

module.exports.help = {
  name: 'rol-sistemi',
  description: '',
  usage: ''
};