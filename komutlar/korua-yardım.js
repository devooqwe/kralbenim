const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message,args) => {
  
const embed = new Discord.RichEmbed()
     .setAuthor("MC-EŞEK",client.user.avatarURL)
     .setTitle('MC-EŞEK BOT')
     .setURL('https://discord.gg/bWjWHK')
     .setColor('BLUE')
     .setDescription("Sunucu koruma sistemlerinin bulunduğu bölüm;")     //ula enayi stark setDesctipyion varken niye addfield ile ortalığı karıştırdın :D
     .addField('!koruma-log #logkanal', ' ```Koruma kayıtlarının gönderileceği kanalı belirler.```')
     .addField('!koruma-banlimit <sayı>', '```Sunucuda birisi 10 dakika içerisinde belirlenen sayının üzerinde ban atarsa o üyeyi sunucundan atar. (kickler) Yönetici yetkisini ve botlarıda görür. (TAM KORUMA İÇİN İDEALDİR) ```')
     .addField('!koruma-kanallimit <sayı>','```30 dakika içerisinde bir üye tarafından belirtilen sayıdan fazla kanal silerse üye sunucudan atılır.```')
     .addField('!koruma-rollimit <sayı>','```30 dakika içerisinde bir üye tarafından belirtilen sayıdan fazla rol silinirse silen üye sunucudan atılır.```') 
     .addField('!koruma-banlimit-sistemi-kapat','Ban koruma özelliğini açar kapatır.')
     .addField('!koruma-kanal-sistemi-kapat','Kanal koruma özelliğini açar kapatır.')
     .addField('!koruma-rollimit-sistemi-kapat','Rol koruma özelliğini açar kapatır.') 
     .addField('!koruma-sistemi-sil','Sunucunuzun verilerini veritabanından siler. (ayarları baştan yapmanız gerekir)')
     .addField('!spambotkorumasi','Spambot korumasını gösterir.')
     .addField('!güvenlikseviyesi','Sunucuya katılan üyelerin güvenilir olup olmadığını gösterir.')
     .setFooter('© STARK-ZEHİR',client.user.avatarURL)
     .setTimestamp()
     message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['güvenlikk','koruma'],
  permLevel: 0
};

module.exports.help = {
  name: 'güvenlik',
  description: '',
  usage: ''
};